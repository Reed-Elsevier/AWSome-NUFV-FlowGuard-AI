from typing import Dict, Any, List, Optional
from backend.app.data.connection import get_db

def calculate_waiting_and_bottlenecks(
    process_id: str,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    access_type: Optional[str] = None
) -> Dict[str, Any]:
    """
    Calculates waiting times across transitions and determines the largest bottleneck
    with complete evidence (median, p90, affected cases, delay share).
    """
    con = get_db()

    # Base WHERE clauses for process_event_log
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

    # Calculate consecutive event wait times
    query_transitions = f"""
    WITH ordered_events AS (
        SELECT 
            pel.case_id,
            pel.activity,
            pel.event_ts,
            lead(pel.activity) OVER (PARTITION BY pel.case_id ORDER BY pel.event_ts) as next_activity,
            lead(pel.event_ts) OVER (PARTITION BY pel.case_id ORDER BY pel.event_ts) as next_ts
        FROM process_event_log pel
        {join_clause}
        WHERE {where_sql}
    ),
    transition_waits AS (
        SELECT 
            case_id,
            activity as from_activity,
            next_activity as to_activity,
            activity || ' -> ' || next_activity as transition,
            epoch(next_ts - event_ts) / 3600.0 as wait_hours
        FROM ordered_events
        WHERE next_activity IS NOT NULL
    )
    SELECT 
        from_activity,
        to_activity,
        transition,
        count(*) as occurrences,
        count(DISTINCT case_id) as affected_cases,
        COALESCE(quantile_cont(wait_hours, 0.5), 0.0) as median_wait_hours,
        COALESCE(quantile_cont(wait_hours, 0.9), 0.0) as p90_wait_hours,
        COALESCE(sum(wait_hours), 0.0) as total_wait_hours
    FROM transition_waits
    WHERE wait_hours >= 0
    GROUP BY from_activity, to_activity, transition
    ORDER BY total_wait_hours DESC
    """

    transitions_raw = con.execute(query_transitions, params).fetchall()

    total_waiting_time = sum(t[7] for t in transitions_raw) if transitions_raw else 0.0

    transitions: List[Dict[str, Any]] = []
    for t in transitions_raw:
        from_act, to_act, trans_name, occ, aff_cases, med_w, p90_w, tot_w = t
        share = round((tot_w / total_waiting_time * 100.0), 1) if total_waiting_time > 0 else 0.0
        transitions.append({
            "from_activity": from_act,
            "to_activity": to_act,
            "transition": trans_name,
            "occurrences": occ,
            "affected_cases": aff_cases,
            "median_wait_hours": round(float(med_w), 2),
            "p90_wait_hours": round(float(p90_w), 2),
            "total_wait_hours": round(float(tot_w), 2),
            "delay_share_pct": share
        })

    # If PRC005, also get approval step breakdown from access_request_approvals
    approval_steps: List[Dict[str, Any]] = []
    if process_id == "PRC005":
        appv_where = []
        appv_params = []
        appv_join = ""
        if access_type:
            appv_join = "JOIN access_requests ar ON a.access_request_id = ar.access_request_id"
            appv_where.append("ar.access_type = ?")
            appv_params.append(access_type)
        if date_from:
            appv_where.append("a.assigned_at >= ?")
            appv_params.append(f"{date_from} 00:00:00")
        if date_to:
            appv_where.append("a.assigned_at <= ?")
            appv_params.append(f"{date_to} 23:59:59")

        appv_where_sql = ("WHERE " + " AND ".join(appv_where)) if appv_where else ""

        query_appv = f"""
        SELECT 
            a.approval_step,
            count(*) as count,
            count(DISTINCT a.access_request_id) as affected_cases,
            COALESCE(quantile_cont(epoch(a.decided_at - a.assigned_at)/3600.0, 0.5), 0.0) as median_wait_hours,
            COALESCE(quantile_cont(epoch(a.decided_at - a.assigned_at)/3600.0, 0.9), 0.0) as p90_wait_hours,
            COALESCE(sum(epoch(a.decided_at - a.assigned_at)/3600.0), 0.0) as total_wait_hours
        FROM access_request_approvals a
        {appv_join}
        {appv_where_sql}
        GROUP BY a.approval_step
        ORDER BY total_wait_hours DESC
        """
        try:
            appv_rows = con.execute(query_appv, appv_params).fetchall()
            tot_appv_wait = sum(r[5] for r in appv_rows) if appv_rows else 0.0
            for r in appv_rows:
                step_name, cnt, aff_c, med_w, p90_w, tot_w = r
                share = round((tot_w / tot_appv_wait * 100.0), 1) if tot_appv_wait > 0 else 0.0
                approval_steps.append({
                    "step_name": step_name,
                    "count": cnt,
                    "affected_cases": aff_c,
                    "median_wait_hours": round(float(med_w), 2),
                    "p90_wait_hours": round(float(p90_w), 2),
                    "total_wait_hours": round(float(tot_w), 2),
                    "delay_share_pct": share
                })
        except Exception as e:
            print(f"[Warning] Approval steps query failed: {e}")

    # Determine largest bottleneck
    largest_bottleneck = None
    if approval_steps and process_id == "PRC005":
        # Identify top bottleneck by median wait and total delay
        top_step = sorted(approval_steps, key=lambda x: (x["median_wait_hours"], x["total_wait_hours"]), reverse=True)[0]
        largest_bottleneck = {
            "activity": f"{top_step['step_name']} Review",
            "median_wait_hours": top_step["median_wait_hours"],
            "p90_wait_hours": top_step["p90_wait_hours"],
            "affected_cases": top_step["affected_cases"],
            "delay_share": top_step["delay_share_pct"] / 100.0,
            "plain_language_summary": f"Requests spend more time waiting before {top_step['step_name']} approval ({top_step['median_wait_hours']}h median) than at any other stage."
        }
    elif transitions:
        top_t = sorted(transitions, key=lambda x: x["total_wait_hours"], reverse=True)[0]
        largest_bottleneck = {
            "activity": top_t["transition"],
            "median_wait_hours": top_t["median_wait_hours"],
            "p90_wait_hours": top_t["p90_wait_hours"],
            "affected_cases": top_t["affected_cases"],
            "delay_share": top_t["delay_share_pct"] / 100.0,
            "plain_language_summary": f"Work spends an average of {top_t['median_wait_hours']}h waiting in transition '{top_t['transition']}', accounting for {top_t['delay_share_pct']}% of total delay."
        }
    else:
        largest_bottleneck = {
            "activity": "None detected",
            "median_wait_hours": 0.0,
            "p90_wait_hours": 0.0,
            "affected_cases": 0,
            "delay_share": 0.0,
            "plain_language_summary": "No significant bottlenecks identified for the selected criteria."
        }

    return {
        "largest_bottleneck": largest_bottleneck,
        "transitions": transitions[:12],
        "approval_steps": approval_steps,
        "total_waiting_hours": round(total_waiting_time, 2)
    }
