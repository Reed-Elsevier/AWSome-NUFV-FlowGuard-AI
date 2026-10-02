from typing import Dict, Any, List, Optional
from backend.app.data.connection import get_db

def calculate_variants(
    process_id: str,
    sla_hours: float,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    access_type: Optional[str] = None,
    top_n: int = 6
) -> List[Dict[str, Any]]:
    """
    Computes top ordered process execution paths with duration, SLA attainment, and rework metrics.
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
            pel.activity,
            pel.event_ts,
            row_number() OVER (PARTITION BY pel.case_id ORDER BY pel.event_ts) as rn
        FROM process_event_log pel
        {join_clause}
        WHERE {where_sql}
    ),
    case_paths AS (
        SELECT 
            case_id,
            string_agg(activity, ' > ' ORDER BY rn) as variant_path,
            count(*) as event_count,
            count(DISTINCT activity) as unique_activities,
            epoch(max(event_ts) - min(event_ts)) / 3600.0 as duration_hours
        FROM ordered_events
        GROUP BY case_id
    )
    SELECT 
        variant_path,
        count(*) as case_count,
        round(count(*) * 100.0 / sum(count(*)) OVER (), 1) as percentage,
        COALESCE(quantile_cont(duration_hours, 0.5), 0.0) as median_duration_hours,
        COALESCE(quantile_cont(duration_hours, 0.9), 0.0) as p90_duration_hours,
        COALESCE(avg(CASE WHEN duration_hours <= {sla_hours} THEN 1.0 ELSE 0.0 END) * 100.0, 0.0) as sla_attainment_pct,
        COALESCE(avg(CASE WHEN event_count > unique_activities THEN 1.0 ELSE 0.0 END) * 100.0, 0.0) as rework_rate_pct
    FROM case_paths
    GROUP BY variant_path
    ORDER BY case_count DESC
    LIMIT {top_n}
    """

    rows = con.execute(query, params).fetchall()
    variants = []
    for r in rows:
        path, count, pct, med_dur, p90_dur, sla_att, rew_pct = r
        variants.append({
            "variant": path,
            "case_count": count,
            "percentage": round(float(pct), 1),
            "median_duration_hours": round(float(med_dur), 1),
            "p90_duration_hours": round(float(p90_dur), 1),
            "sla_attainment_pct": round(float(sla_att), 1),
            "rework_rate_pct": round(float(rew_pct), 1)
        })

    return variants
