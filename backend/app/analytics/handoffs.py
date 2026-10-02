from typing import Dict, Any, Optional
from backend.app.data.connection import get_db

def calculate_handoffs(
    process_id: str,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    access_type: Optional[str] = None
) -> Dict[str, Any]:
    """
    Computes handoffs per case based on resource or department changes across consecutive steps.
    Strictly aggregates at stage/process level (NO individual employee rankings).
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

    query = f"""
    WITH ordered_events AS (
        SELECT 
            pel.case_id,
            pel.resource_employee_id,
            lead(pel.resource_employee_id) OVER (PARTITION BY pel.case_id ORDER BY pel.event_ts) as next_resource
        FROM process_event_log pel
        {join_clause}
        WHERE {where_sql}
    ),
    case_handoffs AS (
        SELECT 
            case_id,
            sum(CASE WHEN next_resource IS NOT NULL AND resource_employee_id != next_resource THEN 1 ELSE 0 END) as handoff_count
        FROM ordered_events
        GROUP BY case_id
    )
    SELECT 
        count(*) as total_cases,
        COALESCE(quantile_cont(handoff_count, 0.5), 0) as median_handoffs,
        COALESCE(quantile_cont(handoff_count, 0.9), 0) as p90_handoffs,
        COALESCE(avg(handoff_count), 0.0) as mean_handoffs,
        COALESCE(max(handoff_count), 0) as max_handoffs
    FROM case_handoffs
    """

    res = con.execute(query, params).fetchone()
    total_cases = res[0] if res else 0

    return {
        "median": round(float(res[1]), 1) if res else 0.0,
        "p90": round(float(res[2]), 1) if res else 0.0,
        "mean": round(float(res[3]), 1) if res else 0.0,
        "max": int(res[4]) if res else 0,
        "total_cases": total_cases
    }
