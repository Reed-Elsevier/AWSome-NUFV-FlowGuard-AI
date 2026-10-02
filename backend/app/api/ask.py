from typing import Dict, Any, Optional
from fastapi import APIRouter, HTTPException
from backend.app.ai.schemas import AskQuestionRequest, AskQuestionResponse
from backend.app.ai.provider import get_ai_provider
from backend.app.analytics.process_metrics import calculate_process_metrics
from backend.app.analytics.bottlenecks import calculate_waiting_and_bottlenecks
from backend.app.analytics.rework import calculate_rework
from backend.app.analytics.sla import calculate_sla
from backend.app.analytics.automation import evaluate_automation_opportunities
from backend.app.analytics.ai_value import audit_ai_use_case
from backend.app.data.connection import get_db

router = APIRouter(prefix="/api/ask", tags=["ask"])

@router.post("", response_model=AskQuestionResponse)
async def ask_flowguard(req: AskQuestionRequest):
    """
    Answers operational questions strictly grounded in calculated evidence.
    Does not query raw data directly with LLM.
    """
    con = get_db()
    proc_row = con.execute("SELECT process_name, sla_hours FROM process_definitions WHERE process_id = ?", [req.process_id]).fetchone()
    if not proc_row:
        raise HTTPException(status_code=404, detail=f"Process {req.process_id} not found.")

    process_name = proc_row[0]
    sla_hours = float(proc_row[1]) if proc_row[1] else 72.0

    # Retrieve relevant deterministic evidence based on the process and filters
    metrics = calculate_process_metrics(
        process_id=req.process_id,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=req.access_type
    )

    bottlenecks = calculate_waiting_and_bottlenecks(
        process_id=req.process_id,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=req.access_type
    )

    rework = calculate_rework(
        process_id=req.process_id,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=req.access_type
    )

    sla = calculate_sla(
        process_id=req.process_id,
        sla_hours=sla_hours,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=req.access_type
    )

    # Check if question asks about automation
    automation_candidates = []
    if "automation" in req.question.lower() or "candidate" in req.question.lower() or "rpa" in req.question.lower():
        automation_candidates = evaluate_automation_opportunities(
            process_id=req.process_id,
            date_from=req.date_from,
            date_to=req.date_to,
            access_type=req.access_type
        )

    # Assemble concise evidence
    evidence = {
        "process_id": req.process_id,
        "process_name": process_name,
        "filter": {"access_type": req.access_type} if req.access_type else {},
        "cases": metrics.get("cases", 0),
        "median_turnaround_hours": metrics.get("median_turnaround_hours", 0.0),
        "p90_turnaround_hours": metrics.get("p90_turnaround_hours", 0.0),
        "sla": {
            "sla_target_hours": sla_hours,
            "attainment_rate": sla.get("attainment_rate", 0.0),
            "breach_rate": sla.get("breach_rate", 0.0)
        },
        "largest_bottleneck": bottlenecks.get("largest_bottleneck", {}),
        "rework": {
            "rate_pct": rework.get("rate_pct", 0.0),
            "top_loop": rework.get("top_loop", "None"),
            "affected_cases": rework.get("affected_cases", 0)
        },
        "automation_candidates": [
            {
                "activity": a["activity_name"],
                "assessment": a["assessment"],
                "rationale": a["rationale"]
            } for a in automation_candidates[:3]
        ] if automation_candidates else []
    }

    ai_provider = get_ai_provider()
    return await ai_provider.ask(req.question, evidence)
