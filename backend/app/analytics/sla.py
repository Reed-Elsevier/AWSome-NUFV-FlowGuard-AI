from typing import Dict, Any, Optional
from backend.app.data.connection import get_db

# Official baseline turnaround metrics from _docs/05_hackathon_package.md
OFFICIAL_BASELINES = {
    "PRC005": {
        "Data Access - Analytics": 154.9,
        "Data Access - PII": 181.1,
        "Elevated": 27.9,
        "Standard": 12.0,
        "All": 20.3
    },
    "PRC001": {"All": 734.4}, # Publishing production
    "PRC002": {"All": 96.0},  # Invoice-to-pay
    "PRC004": {"All": 15.5}   # Support cases
}

def calculate_sla(
    process_id: str,
    sla_hours: float,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    access_type: Optional[str] = None
) -> Dict[str, Any]:
    """
    Calculates deterministic SLA attainment, breach rates, breach magnitudes,
    and compares calculated outcomes with official hackathon package baselines.
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
    WITH case_durations AS (
        SELECT 
            pel.case_id,
            epoch(max(pel.event_ts) - min(pel.event_ts)) / 3600.0 as duration_hours
        FROM process_event_log pel
        {join_clause}
        WHERE {where_sql}
        GROUP BY pel.case_id
    )
    SELECT 
        count(*) as total_cases,
        sum(CASE WHEN duration_hours <= {sla_hours} THEN 1 ELSE 0 END) as met_cases,
        sum(CASE WHEN duration_hours > {sla_hours} THEN 1 ELSE 0 END) as breached_cases,
        COALESCE(quantile_cont(CASE WHEN duration_hours > {sla_hours} THEN duration_hours - {sla_hours} ELSE NULL END, 0.5), 0.0) as median_breach_hours,
        COALESCE(quantile_cont(duration_hours, 0.5), 0.0) as calculated_median_turnaround,
        COALESCE(quantile_cont(duration_hours, 0.9), 0.0) as p90_turnaround
    FROM case_durations
    """

    res = con.execute(query, params).fetchone()
    total = res[0] if res else 0
    met = res[1] if res else 0
    breached = res[2] if res else 0
    med_breach = round(float(res[3]), 1) if res and res[3] is not None else 0.0
    calc_median = round(float(res[4]), 1) if res else 0.0
    p90 = round(float(res[5]), 1) if res else 0.0

    attainment_rate = round(met / total, 4) if total > 0 else 1.0
    breach_rate = round(breached / total, 4) if total > 0 else 0.0

    # Retrieve official baseline if available
    official_baseline_val = None
    if process_id in OFFICIAL_BASELINES:
        mapping = OFFICIAL_BASELINES[process_id]
        if access_type and access_type in mapping:
            official_baseline_val = mapping[access_type]
        elif "All" in mapping:
            official_baseline_val = mapping["All"]

    comparison = None
    if official_baseline_val is not None:
        diff = round(calc_median - official_baseline_val, 1)
        comparison = {
            "official_baseline_hours": official_baseline_val,
            "calculated_median_hours": calc_median,
            "difference_hours": diff,
            "explanation": (
                f"Calculated median ({calc_median}h) aligns closely with the official baseline ({official_baseline_val}h). "
                f"Minor differences can result from selected date filtering or completed vs in-flight case treatment."
                if abs(diff) < 20 else
                f"Calculated median ({calc_median}h) differs from overall baseline ({official_baseline_val}h) due to specific filters applied ({access_type or 'all types'}, date range)."
            )
        }

    return {
        "sla_target_hours": sla_hours,
        "total_cases": total,
        "met_cases": met,
        "breached_cases": breached,
        "attainment_rate": round(attainment_rate * 100.0, 1),
        "breach_rate": round(breach_rate * 100.0, 1),
        "median_breach_hours": med_breach,
        "p90_turnaround_hours": p90,
        "baseline_comparison": comparison
    }
