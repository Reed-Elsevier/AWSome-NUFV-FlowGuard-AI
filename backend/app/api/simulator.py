from typing import Dict, Any, Optional
from pydantic import BaseModel, Field
from fastapi import APIRouter
from backend.app.analytics.simulator import run_fix_simulation

router = APIRouter(prefix="/api/simulate", tags=["simulator"])

class SimulateRequest(BaseModel):
    process_id: str = Field("PRC005", description="Process ID to simulate")
    stage_reduction_pct: float = Field(25.0, ge=0.0, le=100.0, description="Percentage reduction in bottleneck stage wait")
    rework_reduction_pct: float = Field(50.0, ge=0.0, le=100.0, description="Percentage reduction in rework loop frequency")
    target_stage: Optional[str] = Field("Privacy", description="Target stage or approval step name")
    date_from: Optional[str] = None
    date_to: Optional[str] = None
    access_type: Optional[str] = None

@router.post("")
def simulate_scenario(req: SimulateRequest):
    """Executes transparent deterministic scenario simulation."""
    return run_fix_simulation(
        process_id=req.process_id,
        stage_reduction_pct=req.stage_reduction_pct,
        rework_reduction_pct=req.rework_reduction_pct,
        target_stage=req.target_stage,
        date_from=req.date_from,
        date_to=req.date_to,
        access_type=req.access_type
    )
