from typing import Dict, Any, List, Optional
from backend.app.data.connection import get_db

def calculate_rework(
    process_id: str,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    access_type: Optional[str] = None
) -> Dict[str, Any]:
    """
    Identifies rework loops, repeated activities, and backward movements in process execution.
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

    # 1. Detect repeated activities per case
    query_repeats = f"""
    WITH deduped_events AS (
        -- Group identical consecutive timestamps to avoid duplicate record artifacts
        SELECT DISTINCT pel.case_id, pel.activity, pel.event_ts
        FROM process_event_log pel
        {join_clause}
        WHERE {where_sql}
    ),
    activity_counts AS (
        SELECT case_id, activity, count(*) as act_cnt
        FROM deduped_events
        GROUP BY case_id, activity
    ),
    rework_cases AS (
        SELECT case_id, sum(act_cnt - 1) as total_repeats
        FROM activity_counts
        WHERE act_cnt > 1
        GROUP BY case_id
    )
    SELECT 
        count(DISTINCT rc.case_id) as cases_with_rework,
        COALESCE(avg(rc.total_repeats), 0.0) as avg_repeats,
        COALESCE(max(rc.total_repeats), 0) as max_repeats
    FROM rework_cases rc
    """

    res_repeats = con.execute(query_repeats, params).fetchone()
    cases_with_rework = res_repeats[0] if res_repeats else 0
    avg_repeats = round(float(res_repeats[1]), 2) if res_repeats else 0.0
    max_repeats = int(res_repeats[2]) if res_repeats else 0

    # Total cases in this filter
    query_total_cases = f"""
    SELECT count(DISTINCT pel.case_id)
    FROM process_event_log pel
    {join_clause}
    WHERE {where_sql}
    """
    total_cases = con.execute(query_total_cases, params).fetchone()[0]
    rework_rate = round(cases_with_rework / total_cases, 4) if total_cases > 0 else 0.0

    # 2. Identify top rework loops (e.g. Activity A -> Activity B -> Activity A)
    query_loops = f"""
    WITH ordered_events AS (
        SELECT 
            pel.case_id,
            pel.activity,
            lead(pel.activity, 1) OVER (PARTITION BY pel.case_id ORDER BY pel.event_ts) as step2,
            lead(pel.activity, 2) OVER (PARTITION BY pel.case_id ORDER BY pel.event_ts) as step3
        FROM process_event_log pel
        {join_clause}
        WHERE {where_sql}
    ),
    loops AS (
        SELECT 
            case_id,
            activity || ' > ' || step2 || ' > ' || step3 as loop_path
        FROM ordered_events
        WHERE step3 IS NOT NULL AND activity = step3 AND activity != step2
    )
    SELECT 
        loop_path,
        count(*) as occurrences,
        count(DISTINCT case_id) as affected_cases
    FROM loops
    GROUP BY loop_path
    ORDER BY occurrences DESC
    LIMIT 5
    """

    top_loops_raw = con.execute(query_loops, params).fetchall()
    top_loops = []
    top_loop_name = "None detected"

    for r in top_loops_raw:
        path, occ, aff = r
        top_loops.append({
            "loop": path,
            "occurrences": occ,
            "affected_cases": aff,
            "share_of_rework_cases": round((aff / cases_with_rework * 100.0), 1) if cases_with_rework > 0 else 0.0
        })

    if top_loops:
        top_loop_name = top_loops[0]["loop"]
    elif cases_with_rework > 0:
        # Check repeated activities directly
        query_top_repeated_act = f"""
        WITH activity_counts AS (
            SELECT pel.case_id, pel.activity, count(*) as act_cnt
            FROM process_event_log pel
            {join_clause}
            WHERE {where_sql}
            GROUP BY pel.case_id, pel.activity
            HAVING act_cnt > 1
        )
        SELECT activity, count(DISTINCT case_id) as aff
        FROM activity_counts
        GROUP BY activity
        ORDER BY aff DESC
        LIMIT 1
        """
        top_act = con.execute(query_top_repeated_act, params).fetchone()
        if top_act:
            top_loop_name = f"Repeated {top_act[0]} ({top_act[1]} cases)"

    return {
        "rate": rework_rate,
        "rate_pct": round(rework_rate * 100.0, 1),
        "affected_cases": cases_with_rework,
        "total_cases": total_cases,
        "avg_repeat_count": avg_repeats,
        "max_repeat_count": max_repeats,
        "top_loop": top_loop_name,
        "top_loops": top_loops
    }
