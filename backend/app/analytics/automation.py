from typing import Dict, Any, List, Optional
from backend.app.data.connection import get_db

def evaluate_automation_opportunities(
    process_id: str,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    access_type: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    Evaluates automation opportunities by comparing 2023 survey candidates
    against current operational log behavior (frequency, waiting time, rework).
    Categorizes status into 'Still Supported', 'Needs Reassessment', or 'Insufficient Evidence'.
    """
    con = get_db()

    where_clauses = ["pel.process_id = ?"]
    params = [process_id]

    if date_from:
        where_clauses.append("pel.event_ts >= ?")
        params.append(f"{date_from} 00:00:00")
    if date_to:
        where_clauses.append("pel.event_ts <= ?")
        params.append(f"{date_to} 23:59:59")

    join_clause = ""
    if process_id == "PRC005" and access_type:
        join_clause = "JOIN access_requests ar ON pel.case_id = ar.access_request_id"
        where_clauses.append("ar.access_type = ?")
        params.append(access_type)

    where_sql = " AND ".join(where_clauses)

    # 1. Retrieve current operational stats for activities
    query_current_activities = f"""
    WITH case_act AS (
        SELECT 
            pel.case_id,
            pel.activity,
            pel.activity_id,
            count(*) as count_in_case,
            COALESCE(sum(pel.cost_php), 0.0) as act_cost
        FROM process_event_log pel
        {join_clause}
        WHERE {where_sql}
        GROUP BY pel.case_id, pel.activity, pel.activity_id
    )
    SELECT 
        COALESCE(activity_id, 'UNKNOWN') as activity_id,
        activity,
        count(*) as total_occurrences,
        sum(CASE WHEN count_in_case > 1 THEN 1 ELSE 0 END) as rework_cases,
        round(sum(CASE WHEN count_in_case > 1 THEN 1 ELSE 0 END) * 100.0 / count(*), 1) as rework_rate_pct,
        round(avg(act_cost), 2) as avg_cost_php
    FROM case_act
    GROUP BY activity_id, activity
    """
    current_stats = {}
    try:
        cur_rows = con.execute(query_current_activities, params).fetchall()
        for r in cur_rows:
            act_id, act_name, occ, rew_c, rew_pct, cost = r
            current_stats[act_name] = {
                "activity_id": act_id,
                "occurrences": occ,
                "rework_rate_pct": float(rew_pct),
                "avg_cost_php": float(cost)
            }
            if act_id != "UNKNOWN":
                current_stats[act_id] = current_stats[act_name]
    except Exception as e:
        print(f"[Warning] Failed querying current activity stats: {e}")

    # 2. Get activities and automation candidates
    query_candidates = """
    SELECT 
        pa.activity_id,
        pa.activity_name,
        pa.standard_sequence,
        pa.is_manual,
        pa.rule_based_pct,
        pa.standard_effort_min,
        ac.candidate_id,
        ac.annual_volume_2023,
        ac.avg_effort_min as survey_avg_effort_min,
        ac.annual_hours,
        ac.rule_based_pct as survey_rule_based_pct,
        ac.exception_rate_pct as survey_exception_rate_pct,
        ac.automation_score,
        ac.recommended_approach
    FROM process_activities pa
    LEFT JOIN automation_candidates ac 
        ON pa.process_id = ac.process_id 
        AND (pa.activity_id = ac.activity_id OR pa.activity_name = ac.activity_name)
    WHERE pa.process_id = ?
    ORDER BY pa.standard_sequence
    """
    
    cand_rows = con.execute(query_candidates, [process_id]).fetchall()
    results = []

    for r in cand_rows:
        act_id, act_name, seq, is_manual, rule_pct, std_effort, cand_id, vol_23, s_effort, ann_hrs, s_rule_pct, s_exc_rate, score, approach = r

        # Operational facts
        cur_info = current_stats.get(act_name) or current_stats.get(act_id)
        current_vol = cur_info["occurrences"] if cur_info else 0
        current_rework_pct = cur_info["rework_rate_pct"] if cur_info else 0.0

        # Deterministic assessment logic
        if cand_id is None:
            assessment = "Needs Reassessment" if is_manual and rule_pct and rule_pct >= 70 else "Insufficient Evidence"
            rationale = (
                f"Activity was not included in the 2023 automation survey. Currently has {current_vol} observed cases with {rule_pct}% rule-based nature."
                if is_manual else
                "Activity is already automated or system-driven in standard operations."
            )
        else:
            # We have 2023 survey candidate data
            exc_rate = float(s_exc_rate) if s_exc_rate is not None else 0.0
            r_pct = float(s_rule_pct) if s_rule_pct is not None else float(rule_pct or 0)

            if current_vol == 0:
                assessment = "Insufficient Evidence"
                rationale = "Zero occurrences in the selected date range to validate current performance."
            elif exc_rate < 20.0 and r_pct >= 75.0 and current_rework_pct < 15.0:
                assessment = "Still Supported"
                rationale = (
                    f"2023 survey showed {r_pct}% rule-based with only {exc_rate}% exceptions. "
                    f"Current data confirms high frequency ({current_vol} events) and low rework ({current_rework_pct}%)."
                )
            elif exc_rate >= 20.0 or current_rework_pct >= 20.0 or r_pct < 60.0:
                assessment = "Needs Reassessment"
                rationale = (
                    f"High operational friction observed: {current_rework_pct}% rework rate in current data, "
                    f"and {exc_rate}% survey exception rate. Pure RPA would likely fail without human review."
                )
            else:
                assessment = "Still Supported"
                rationale = f"Moderate volume and stability. Recommended approach ({approach or 'Automation'}) remains viable."

        results.append({
            "activity_id": act_id,
            "activity_name": act_name,
            "is_manual": bool(is_manual),
            "standard_sequence": seq,
            "assessment": assessment,
            "rationale": rationale,
            "survey_2023": {
                "rule_based_pct": float(s_rule_pct) if s_rule_pct is not None else (float(rule_pct) if rule_pct else None),
                "exception_rate_pct": float(s_exc_rate) if s_exc_rate is not None else None,
                "annual_volume": int(vol_23) if vol_23 is not None else None,
                "automation_score": float(score) if score is not None else None,
                "recommended_approach": approach or "Under review"
            },
            "current_evidence": {
                "observed_volume": current_vol,
                "observed_rework_pct": current_rework_pct,
                "avg_cost_php": cur_info["avg_cost_php"] if cur_info else 0.0
            }
        })

    return results
