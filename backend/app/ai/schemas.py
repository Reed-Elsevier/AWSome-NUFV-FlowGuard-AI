from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class AnalysisExplanationResponse(BaseModel):
    executive_summary: str = Field(..., description="High-level operational finding in plain business language")
    likely_causes: List[str] = Field(default_factory=list, description="Observed operational drivers grounded in evidence")
    business_implications: List[str] = Field(default_factory=list, description="Downstream business impacts of delays/rework")
    recommended_actions: List[str] = Field(default_factory=list, description="Actionable recommendations for human review")
    evidence_summary: List[str] = Field(default_factory=list, description="Direct citations of metrics from the evidence object")
    limitations: List[str] = Field(default_factory=list, description="Data boundaries or caveats")
    confidence: str = Field("medium", description="high|medium|low based on evidence strength")

class AskQuestionRequest(BaseModel):
    process_id: str
    question: str
    date_from: Optional[str] = None
    date_to: Optional[str] = None
    access_type: Optional[str] = None

class AskQuestionResponse(BaseModel):
    answer: str
    evidence_references: List[str] = Field(default_factory=list)
    confidence: str = "medium"
    grounded: bool = True
