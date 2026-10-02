from typing import Dict, Any, List
from backend.app.data.connection import get_db

REQUIRED_SCHEMA_CHECKS = {
    "process_event_log": ["event_id", "case_id", "process_id", "activity", "event_ts"],
    "process_definitions": ["process_id", "process_name", "sla_hours"],
    "process_activities": ["activity_id", "process_id", "activity_name"],
    "automation_candidates": ["process_id", "activity_id", "rule_based_pct"],
    "access_requests": ["access_request_id", "access_type", "requested_at", "turnaround_hours"],
    "access_request_approvals": ["access_request_id", "approval_step", "assigned_at", "decided_at"],
    "ai_use_cases": ["use_case_id", "use_case_name", "process_id", "stage"],
    "ai_use_case_kpis": ["use_case_id", "kpi_name", "baseline_value", "current_value"]
}

def validate_datasets() -> Dict[str, Any]:
    """Validates presence and required schemas of all datasets on startup."""
    con = get_db()
    validation_results = {
        "status": "valid",
        "tables": {},
        "errors": []
    }

    for table, req_cols in REQUIRED_SCHEMA_CHECKS.items():
        try:
            # Check column existence
            cols_info = con.execute(f"DESCRIBE SELECT * FROM {table} LIMIT 1").fetchall()
            existing_cols = {col[0] for col in cols_info}
            missing_cols = [c for c in req_cols if c not in existing_cols]

            if missing_cols:
                err_msg = f"Table '{table}' missing required columns: {missing_cols}"
                validation_results["errors"].append(err_msg)
                validation_results["tables"][table] = {"status": "error", "error": err_msg}
            else:
                count = con.execute(f"SELECT count(*) FROM {table}").fetchone()[0]
                validation_results["tables"][table] = {
                    "status": "ok",
                    "row_count": count,
                    "columns": list(existing_cols)
                }
        except Exception as e:
            err_msg = f"Failed validating table '{table}': {str(e)}"
            validation_results["errors"].append(err_msg)
            validation_results["tables"][table] = {"status": "error", "error": err_msg}

    # Verify timestamp parseability in process_event_log
    try:
        sample_ts = con.execute("SELECT min(event_ts), max(event_ts) FROM process_event_log").fetchone()
        if not sample_ts or sample_ts[0] is None:
            validation_results["errors"].append("process_event_log event_ts could not be parsed.")
    except Exception as e:
        validation_results["errors"].append(f"process_event_log timestamp check failed: {e}")

    if validation_results["errors"]:
        validation_results["status"] = "error"

    return validation_results
