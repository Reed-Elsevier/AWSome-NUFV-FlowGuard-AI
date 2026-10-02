from typing import Dict, Any, Optional
from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException
from backend.app.data.connection import get_db
from backend.app.analytics.process_metrics import calculate_process_metrics
from backend.app.analytics.bottlenecks import calculate_waiting_and_bottlenecks
from backend.app.analytics.rework import calculate_rework
from backend.app.analytics.handoffs import calculate_handoffs
from backend.app.analytics.variants import calculate_variants
from backend.app.analytics.sla import calculate_sla
from backend.app.analytics.automation import evaluate_automation_opportunities
from backend.app.ai.provider import get_ai_provider
from backend.app.ai.schemas import AnalysisExplanationResponse

router = APIRouter(prefix="/api", tags=["analysis"])

class AnalyzeRequest(BaseModel):
    process_id: str = Field("PRC005", description="Process identifier, e.g. PRC005")
    date_from: Optional[str] = Field(None, description="Start date YYYY-MM-DD")
    date_to: Optional[str] = Field(None, description="End date YYYY-MM-DD")
    filters: Optional[Dict[str, Any]] = Field(default_factory=dict, description="e.g. {'access_type': 'Data Access - PII'}")

class ExplainRequest(BaseModel):
    evidence: Dict[str, Any]

@router.post("/analyze")
async def analyze_process(req: AnalyzeRequest):
    """
    Main operational intelligence endpoint. Computes deterministic process metrics via DuckDB
    and generates an LLM plain-language explanation grounded purely in calculated evidence.
    """
    con = get_db()
    
    # 1. Fetch process definition
    proc_row = con.execute(
        "SELECT process_name, sla_hours, standard_path FROM process_definitions WHERE process_id = ?",
        [req.process_id]
    ).fetchone()
    
    if not proc_row:
        raise HTTPException(status_code=404, detail=f"Process '{req.process_id}' not found.")
        
    process_name = proc_row[0]
    sla_hours = float(proc_row[1]) if proc_row[1] else 72.0
    standard_path = proc_row[2] or ""

    access_type = req.filters.get("access_type") if req.filters else None

    # 2. Execute deterministic analytics
    metrics = calculate_process_metrics(
        process_id=req.process_id,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=access_type
    )

    bottlenecks = calculate_waiting_and_bottlenecks(
        process_id=req.process_id,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=access_type
    )

    rework = calculate_rework(
        process_id=req.process_id,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=access_type
    )

    handoffs = calculate_handoffs(
        process_id=req.process_id,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=access_type
    )

    sla = calculate_sla(
        process_id=req.process_id,
        sla_hours=sla_hours,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=access_type
    )

    variants = calculate_variants(
        process_id=req.process_id,
        sla_hours=sla_hours,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=access_type
    )

    automation = evaluate_automation_opportunities(
        process_id=req.process_id,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=access_type
    )

    # 3. Transparent health classification rules
    total_cases = metrics.get("cases", 0)
    sla_rate = sla.get("attainment_rate", 100.0)
    rework_rate_pct = rework.get("rate_pct", 0.0)

    if total_cases < 5:
        health_status = "Insufficient Data"
    elif sla_rate < 50.0 or rework_rate_pct > 25.0:
        health_status = "Critical"
    elif sla_rate < 80.0 or rework_rate_pct > 10.0:
        health_status = "Needs Attention"
    else:
        health_status = "Healthy"

    # 4. Construct compact structured evidence object for LLM
    evidence = {
        "process_id": req.process_id,
        "process_name": process_name,
        "period": metrics.get("date_range", {}),
        "filter": req.filters or {},
        "cases": total_cases,
        "median_turnaround_hours": metrics.get("median_turnaround_hours", 0.0),
        "p90_turnaround_hours": metrics.get("p90_turnaround_hours", 0.0),
        "sla_target_hours": sla_hours,
        "sla_attainment_pct": sla_rate,
        "sla_breach_rate": sla.get("breach_rate", 0.0),
        "largest_bottleneck": bottlenecks.get("largest_bottleneck", {}),
        "rework": {
            "rate_pct": rework_rate_pct,
            "affected_cases": rework.get("affected_cases", 0),
            "top_loop": rework.get("top_loop", "None")
        },
        "handoffs": {
            "median": handoffs.get("median", 0.0),
            "p90": handoffs.get("p90", 0.0)
        }
    }

    # 5. Generate AI Explanation
    ai_provider = get_ai_provider()
    explanation = await ai_provider.explain(evidence)

    return {
        "process_id": req.process_id,
        "process_name": process_name,
        "standard_path": standard_path,
        "health_status": health_status,
        "metrics": metrics,
        "bottlenecks": bottlenecks,
        "rework": rework,
        "handoffs": handoffs,
        "sla": sla,
        "variants": variants,
        "automation": automation,
        "evidence": evidence,
        "ai_explanation": explanation
    }

@router.post("/explain", response_model=AnalysisExplanationResponse)
async def explain_evidence(req: ExplainRequest):
    """Re-analyzes and explains an existing structured evidence object."""
    ai_provider = get_ai_provider()
    return await ai_provider.explain(req.evidence)
