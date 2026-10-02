from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
from backend.app.data.connection import get_db

def list_ai_use_cases() -> List[Dict[str, Any]]:
    """Lists all AI use cases with process mappings and status summary."""
    con = get_db()
    query = """
    SELECT 
        u.use_case_id,
        u.use_case_name,
        u.process_id,
        pd.process_name,
        u.archetype,
        u.stage,
        u.primary_kpi,
        u.pilot_date,
        u.scaled_date,
        u.expected_annual_value_usd,
        u.realized_annual_value_usd,
        u.hours_saved_annual,
        u.fte_capacity_released
    FROM ai_use_cases u
    LEFT JOIN process_definitions pd ON u.process_id = pd.process_id
    ORDER BY 
        CASE WHEN u.stage = 'Scaled' THEN 1
             WHEN u.stage = 'Pilot' THEN 2
             WHEN u.stage = 'PoC' THEN 3
             ELSE 4 END,
        u.realized_annual_value_usd DESC
    """
    rows = con.execute(query).fetchall()
    results = []
    for r in rows:
        uid, name, pid, pname, arch, stage, kpi, p_date, s_date, exp_val, real_val, hrs, fte = r
        results.append({
            "use_case_id": uid,
            "use_case_name": name,
            "process_id": pid,
            "process_name": pname or pid,
            "archetype": arch,
            "stage": stage,
            "primary_kpi": kpi,
            "pilot_date": str(p_date)[:10] if p_date else None,
            "scaled_date": str(s_date)[:10] if s_date else None,
            "portfolio_value": {
                "expected_annual_value_usd": float(exp_val) if exp_val else 0.0,
                "realized_annual_value_usd": float(real_val) if real_val else 0.0,
                "hours_saved_annual": float(hrs) if hrs else 0.0,
                "fte_capacity_released": float(fte) if fte else 0.0
            }
        })
    return results

def audit_ai_use_case(use_case_id: str) -> Dict[str, Any]:
    """
    Performs comprehensive AI Value Audit comparing portfolio-reported metrics
    with empirical pre/post operational data in process_event_log.
    """
    con = get_db()

    # 1. Fetch Use Case Details
    query_uc = """
    SELECT 
        u.use_case_id,
        u.use_case_name,
        u.process_id,
        pd.process_name,
        u.archetype,
        u.stage,
        u.primary_kpi,
        u.pilot_date,
        u.scaled_date,
        u.expected_annual_value_usd,
        u.realized_annual_value_usd,
        u.hours_saved_annual,
        u.fte_capacity_released
    FROM ai_use_cases u
    LEFT JOIN process_definitions pd ON u.process_id = pd.process_id
    WHERE u.use_case_id = ?
    """
    uc_row = con.execute(query_uc, [use_case_id]).fetchone()
    if not uc_row:
        return {"error": f"Use case {use_case_id} not found."}

    uid, name, pid, pname, arch, stage, kpi_name, p_date, s_date, exp_val, real_val, hrs, fte = uc_row

    # 2. Fetch Reported KPIs from ai_use_case_kpis
    query_kpis = """
    SELECT kpi_id, kpi_name, baseline_value, current_value, measured_date
    FROM ai_use_case_kpis
    WHERE use_case_id = ?
    """
    kpi_rows = con.execute(query_kpis, [use_case_id]).fetchall()
    reported_kpis = []
    for k in kpi_rows:
        k_id, k_name, b_val, c_val, m_date = k
        pct_change = round(((c_val - b_val) / b_val * 100.0), 1) if b_val and b_val != 0 else 0.0
        reported_kpis.append({
            "kpi_id": k_id,
            "kpi_name": k_name,
            "baseline_value": float(b_val) if b_val is not None else None,
            "current_value": float(c_val) if c_val is not None else None,
            "measured_date": str(m_date)[:10] if m_date else None,
            "reported_pct_change": pct_change
        })

    # 3. Operational Pre/Post Comparison
    # Pick target deployment date: prefer scaled_date, otherwise pilot_date
    dep_date = s_date or p_date
    pre_post_analysis = None
    evidence_status = "INSUFFICIENT EVIDENCE"
    explanation = ""

    if dep_date is not None and pid:
        # Standard window: 180 days before and after deployment
        dep_str = str(dep_date)[:10]
        try:
            # Query operational metrics pre vs post
            query_pre_post = f"""
            WITH case_durations AS (
                SELECT 
                    case_id,
                    min(event_ts) as start_ts,
                    epoch(max(event_ts) - min(event_ts)) / 3600.0 as dur_hours,
                    count(*) as event_count,
                    count(DISTINCT activity) as unique_act,
                    sum(COALESCE(cost_php, 0.0)) as cost_php
                FROM process_event_log
                WHERE process_id = '{pid}'
                GROUP BY case_id
            )
            SELECT 
                'PRE' as period,
                count(*) as case_count,
                COALESCE(quantile_cont(dur_hours, 0.5), 0.0) as median_duration,
                COALESCE(quantile_cont(dur_hours, 0.9), 0.0) as p90_duration,
                COALESCE(avg(CASE WHEN event_count > unique_act THEN 1.0 ELSE 0.0 END) * 100.0, 0.0) as rework_pct,
                COALESCE(avg(cost_php), 0.0) as avg_cost
            FROM case_durations
            WHERE start_ts < '{dep_str}' AND start_ts >= ('{dep_str}'::TIMESTAMP - INTERVAL '180 days')
            UNION ALL
            SELECT 
                'POST' as period,
                count(*) as case_count,
                COALESCE(quantile_cont(dur_hours, 0.5), 0.0) as median_duration,
                COALESCE(quantile_cont(dur_hours, 0.9), 0.0) as p90_duration,
                COALESCE(avg(CASE WHEN event_count > unique_act THEN 1.0 ELSE 0.0 END) * 100.0, 0.0) as rework_pct,
                COALESCE(avg(cost_php), 0.0) as avg_cost
            FROM case_durations
            WHERE start_ts >= '{dep_str}' AND start_ts <= ('{dep_str}'::TIMESTAMP + INTERVAL '180 days')
            """
            pp_rows = con.execute(query_pre_post).fetchall()
            pre_data = next((r for r in pp_rows if r[0] == "PRE"), None)
            post_data = next((r for r in pp_rows if r[0] == "POST"), None)

            if pre_data and post_data and pre_data[1] >= 10 and post_data[1] >= 10:
                pre_cases, pre_med, pre_p90, pre_rew, pre_c = pre_data[1:]
                post_cases, post_med, post_p90, post_rew, post_c = post_data[1:]

                speed_change_pct = round(((post_med - pre_med) / pre_med * 100.0), 1) if pre_med > 0 else 0.0
                rework_diff_pct = round(post_rew - pre_rew, 1)

                pre_post_analysis = {
                    "deployment_anchor_date": dep_str,
                    "window_days": 180,
                    "pre_period": {
                        "cases": pre_cases,
                        "median_turnaround_hours": round(float(pre_med), 1),
                        "p90_turnaround_hours": round(float(pre_p90), 1),
                        "rework_rate_pct": round(float(pre_rew), 1),
                        "avg_cost_php": round(float(pre_c), 1)
                    },
                    "post_period": {
                        "cases": post_cases,
                        "median_turnaround_hours": round(float(post_med), 1),
                        "p90_turnaround_hours": round(float(post_p90), 1),
                        "rework_rate_pct": round(float(post_rew), 1),
                        "avg_cost_php": round(float(post_c), 1)
                    },
                    "observed_changes": {
                        "median_turnaround_change_pct": speed_change_pct,
                        "rework_rate_point_change": rework_diff_pct
                    }
                }

                # Status determination
                # If speed improved (negative change %) and rework did not worsen significantly
                if speed_change_pct <= -5.0 and rework_diff_pct <= 2.0:
                    evidence_status = "SUPPORTED BY AVAILABLE EVIDENCE"
                    explanation = (
                        f"Operational logs reflect a {abs(speed_change_pct)}% reduction in median turnaround time "
                        f"following deployment, with stable rework rates across {post_cases} completed cases."
                    )
                elif speed_change_pct <= -5.0 and rework_diff_pct > 2.0:
                    evidence_status = "PARTIALLY SUPPORTED"
                    explanation = (
                        f"Operational evidence supports an improvement in speed ({abs(speed_change_pct)}% faster median), "
                        f"but rework increased by {rework_diff_pct} percentage points, indicating potential quality trade-offs."
                    )
                elif speed_change_pct > 5.0:
                    evidence_status = "CONFLICTING EVIDENCE"
                    explanation = (
                        f"Operational turnaround increased by {speed_change_pct}% after deployment anchor date ({dep_str}), "
                        f"conflicting with reported throughput or handling time improvements."
                    )
                else:
                    evidence_status = "PARTIALLY SUPPORTED"
                    explanation = (
                        f"Turnaround shifted by {speed_change_pct}% with slight metric variance. Evidence is neutral to moderate."
                    )
            else:
                evidence_status = "INSUFFICIENT EVIDENCE"
                explanation = "Insufficient operational event volume before or after the designated deployment window to draw a verifiable conclusion."
        except Exception as e:
            evidence_status = "INSUFFICIENT EVIDENCE"
            explanation = f"Could not perform pre/post window analysis: {str(e)}"
    else:
        evidence_status = "INSUFFICIENT EVIDENCE"
        explanation = "Initiative has no recorded pilot or scaled deployment date in the AI portfolio registry."

    return {
        "use_case_id": uid,
        "use_case_name": name,
        "process_id": pid,
        "process_name": pname or pid,
        "archetype": arch,
        "stage": stage,
        "primary_kpi": kpi_name,
        "portfolio_reported": {
            "title": "Portfolio-Reported Business Value (Self-Reported)",
            "expected_annual_value_usd": float(exp_val) if exp_val else 0.0,
            "realized_annual_value_usd": float(real_val) if real_val else 0.0,
            "hours_saved_annual": float(hrs) if hrs else 0.0,
            "fte_capacity_released": float(fte) if fte else 0.0,
            "reported_kpis": reported_kpis
        },
        "observed_operations": {
            "title": "Observed in Operational Event Data",
            "pre_post_analysis": pre_post_analysis,
            "evidence_status": evidence_status,
            "explanation": explanation
        }
    }
