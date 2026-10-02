from typing import Dict, Any, Optional
import math
from backend.app.data.connection import get_db

def calculate_process_metrics(
    process_id: str,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    access_type: Optional[str] = None
) -> Dict[str, Any]:
    """
    Computes deterministic cycle time and cost metrics for a given process.
    Handles general processes via process_event_log and specialized access request filters.
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

    # If access_type is provided and this is PRC005, join with access_requests
    join_clause = ""
    if process_id == "PRC005" and access_type:
        join_clause = "JOIN access_requests ar ON pel.case_id = ar.access_request_id"
        where_clauses.append("ar.access_type = ?")
        params.append(access_type)

    where_sql = " AND ".join(where_clauses)

    # 1. Case-level cycle times & costs
    query_cases = f"""
    WITH case_agg AS (
        SELECT 
            pel.case_id,
            min(pel.event_ts) as start_ts,
            max(pel.event_ts) as end_ts,
            epoch(max(pel.event_ts) - min(pel.event_ts)) / 3600.0 as cycle_hours,
            count(*) as event_count,
            sum(COALESCE(pel.cost_php, 0.0)) as case_cost_php
        FROM process_event_log pel
        {join_clause}
        WHERE {where_sql}
        GROUP BY pel.case_id
    )
    SELECT
        count(*) as total_cases,
        COALESCE(quantile_cont(cycle_hours, 0.5), 0.0) as median_cycle_hours,
        COALESCE(avg(cycle_hours), 0.0) as mean_cycle_hours,
        COALESCE(quantile_cont(cycle_hours, 0.75), 0.0) as p75_cycle_hours,
        COALESCE(quantile_cont(cycle_hours, 0.90), 0.0) as p90_cycle_hours,
        COALESCE(quantile_cont(cycle_hours, 0.95), 0.0) as p95_cycle_hours,
        COALESCE(sum(case_cost_php), 0.0) as total_cost_php,
        COALESCE(quantile_cont(case_cost_php, 0.5), 0.0) as median_cost_php,
        COALESCE(min(start_ts), '1970-01-01') as min_ts,
        COALESCE(max(end_ts), '1970-01-01') as max_ts
    FROM case_agg
    """

    res = con.execute(query_cases, params).fetchone()
    total_cases = res[0] if res else 0

    if total_cases == 0:
        return {
            "cases": 0,
            "median_turnaround_hours": 0.0,
            "mean_turnaround_hours": 0.0,
            "p75_turnaround_hours": 0.0,
            "p90_turnaround_hours": 0.0,
            "p95_turnaround_hours": 0.0,
            "total_cost_php": 0.0,
            "median_cost_php": 0.0,
            "date_range": {"from": date_from or "", "to": date_to or ""},
            "health": "Insufficient Data"
        }

    median_hours = round(float(res[1]), 2)
    mean_hours = round(float(res[2]), 2)
    p75_hours = round(float(res[3]), 2)
    p90_hours = round(float(res[4]), 2)
    p95_hours = round(float(res[5]), 2)
    total_cost = round(float(res[6]), 2)
    median_cost = round(float(res[7]), 2)
    min_date = str(res[8])[:10]
    max_date = str(res[9])[:10]

    return {
        "cases": total_cases,
        "median_turnaround_hours": median_hours,
        "mean_turnaround_hours": mean_hours,
        "p75_turnaround_hours": p75_hours,
        "p90_turnaround_hours": p90_hours,
        "p95_turnaround_hours": p95_hours,
        "total_cost_php": total_cost,
        "median_cost_php": median_cost,
        "date_range": {
            "from": date_from or min_date,
            "to": date_to or max_date
        }
    }
