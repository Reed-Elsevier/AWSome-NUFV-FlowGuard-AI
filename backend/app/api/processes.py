from typing import List, Dict, Any
from fastapi import APIRouter
from backend.app.data.connection import get_db

router = APIRouter(prefix="/api/processes", tags=["processes"])

@router.get("", response_model=List[Dict[str, Any]])
def get_processes():
    """Returns available operational processes with metadata and filters."""
    con = get_db()
    query = """
    SELECT 
        process_id,
        process_name,
        division_id,
        source_table,
        sla_hours,
        has_event_log,
        standard_path
    FROM process_definitions
    ORDER BY 
        CASE WHEN process_id = 'PRC005' THEN 1 -- Hero scenario first
             WHEN has_event_log = TRUE THEN 2
             ELSE 3 END,
        process_id
    """
    rows = con.execute(query).fetchall()
    processes = []

    for r in rows:
        pid, name, div, src, sla, has_log, std_path = r
        proc_data = {
            "process_id": pid,
            "process_name": name,
            "division_id": div,
            "source_table": src,
            "sla_hours": float(sla) if sla else 72.0,
            "has_event_log": bool(has_log),
            "standard_path": std_path,
            "is_hero": pid == "PRC005"
        }

        # Provide access_type filters for Hero process PRC005
        if pid == "PRC005":
            proc_data["supported_filters"] = {
                "access_type": [
                    "Data Access - PII",
                    "Data Access - Analytics",
                    "Elevated",
                    "Standard"
                ]
            }
        else:
            proc_data["supported_filters"] = {}

        processes.append(proc_data)

    return processes
