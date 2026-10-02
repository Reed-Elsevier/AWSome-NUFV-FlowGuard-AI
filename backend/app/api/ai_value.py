from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException
from backend.app.analytics.ai_value import list_ai_use_cases, audit_ai_use_case

router = APIRouter(prefix="/api/ai-value", tags=["ai-value"])

@router.get("", response_model=List[Dict[str, Any]])
def get_ai_portfolio():
    """Returns all AI initiatives in portfolio with stage, primary KPI, and reported value."""
    return list_ai_use_cases()

@router.get("/{use_case_id}")
def get_ai_audit_detail(use_case_id: str):
    """Returns in-depth AI Value Audit comparing portfolio claims against operational data."""
    audit = audit_ai_use_case(use_case_id)
    if "error" in audit:
        raise HTTPException(status_code=404, detail=audit["error"])
    return audit
