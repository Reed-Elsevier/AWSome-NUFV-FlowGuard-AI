import abc
import hashlib
import json
from typing import Dict, Any, Optional
from backend.app.config import settings
from backend.app.ai.schemas import AnalysisExplanationResponse, AskQuestionResponse

class AIProvider(abc.ABC):
    @abc.abstractmethod
    async def explain(self, evidence: Dict[str, Any]) -> AnalysisExplanationResponse:
        """Generates plain language executive explanation from structured evidence."""
        pass

    @abc.abstractmethod
    async def ask(self, question: str, evidence: Dict[str, Any]) -> AskQuestionResponse:
        """Answers operational question grounded purely in structured evidence."""
        pass

_EXPLANATION_CACHE: Dict[str, AnalysisExplanationResponse] = {}
_ASK_CACHE: Dict[str, AskQuestionResponse] = {}

def compute_evidence_hash(data: Any) -> str:
    """Computes SHA-256 hash of JSON-serializable evidence for deterministic caching."""
    serialized = json.dumps(data, sort_keys=True, default=str)
    return hashlib.sha256(serialized.encode("utf-8")).hexdigest()

def get_ai_provider() -> AIProvider:
    """Factory creating the configured provider (Anthropic or OpenAI)."""
    if settings.AI_PROVIDER == "openai":
        from backend.app.ai.openai_provider import OpenAIProvider
        return OpenAIProvider()
    else:
        from backend.app.ai.anthropic_provider import AnthropicProvider
        return AnthropicProvider()

def get_fallback_explanation(evidence: Dict[str, Any], reason: str = "unconfigured") -> AnalysisExplanationResponse:
    """Provides a deterministic, safe fallback when AI provider is unconfigured or unavailable."""
    cases = evidence.get("cases", 0)
    med_turn = evidence.get("median_turnaround_hours", 0.0)
    sla_pct = evidence.get("sla", {}).get("attainment_rate", 0.0)
    b_neck = evidence.get("largest_bottleneck", {})
    b_act = b_neck.get("activity", "Unknown")
    b_wait = b_neck.get("median_wait_hours", 0.0)
    rework_rate = evidence.get("rework", {}).get("rate_pct", 0.0)

    if reason == "unconfigured":
        msg = "Operational analysis completed. AI explanation is unavailable until an AI provider is configured in .env."
    else:
        msg = f"Operational analysis completed. AI explanation is temporarily unavailable ({reason})."

    return AnalysisExplanationResponse(
        executive_summary=f"{msg} Analysis of {cases} cases indicates a median turnaround of {med_turn}h with {sla_pct}% SLA attainment. The primary observed bottleneck is {b_act} ({b_wait}h median wait), with an observed rework rate of {rework_rate}%.",
        likely_causes=[
            f"Waiting time at {b_act} stage ({b_wait} hours median wait)",
            f"Rework loop cycles affecting {evidence.get('rework', {}).get('affected_cases', 0)} cases ({rework_rate}%)"
        ],
        business_implications=[
            f"SLA breach rate at {100.0 - sla_pct:.1f}% contributes to turnaround backlog and delayed operational delivery."
        ],
        recommended_actions=[
            f"Investigate process handoffs and pre-requisite validation prior to {b_act}.",
            "Review root causes of repeated rework loops with process owners."
        ],
        evidence_summary=[
            f"Total cases analyzed: {cases}",
            f"Median turnaround: {med_turn} hours",
            f"Largest bottleneck: {b_act} with {b_wait}h median wait",
            f"Rework rate: {rework_rate}%"
        ],
        limitations=[
            "Fallback explanation generated from deterministic operational rules. Real LLM explanation requires active API key."
        ],
        confidence="medium"
    )

def get_fallback_ask(question: str, evidence: Dict[str, Any], reason: str = "unconfigured") -> AskQuestionResponse:
    b_act = evidence.get("largest_bottleneck", {}).get("activity", "N/A")
    b_wait = evidence.get("largest_bottleneck", {}).get("median_wait_hours", 0.0)
    rework_rate = evidence.get("rework", {}).get("rate_pct", 0.0)
    top_loop = evidence.get("rework", {}).get("top_loop", "N/A")
    sla_pct = evidence.get("sla", {}).get("attainment_rate", 0.0)

    q_lower = question.lower()
    if "slow" in q_lower or "bottleneck" in q_lower or "stuck" in q_lower:
        ans = f"Based on operational event logs, work slows down most at '{b_act}', where requests spend a median of {b_wait} hours waiting."
        refs = [f"Bottleneck: {b_act} ({b_wait}h median wait)", f"Total waiting time contribution: {evidence.get('largest_bottleneck', {}).get('delay_share', 0)*100:.1f}%"]
    elif "rework" in q_lower or "loop" in q_lower or "repeat" in q_lower:
        ans = f"Rework affects {rework_rate}% of cases. The primary repeated loop is '{top_loop}'."
        refs = [f"Rework rate: {rework_rate}%", f"Top loop: {top_loop}"]
    elif "sla" in q_lower or "deadline" in q_lower:
        ans = f"The process currently achieves {sla_pct}% SLA compliance against its defined target of {evidence.get('sla', {}).get('sla_target_hours', 0)} hours."
        refs = [f"SLA Attainment: {sla_pct}%", f"Target: {evidence.get('sla', {}).get('sla_target_hours', 0)}h"]
    else:
        ans = f"Operational data shows {evidence.get('cases', 0)} cases with {b_act} as the largest waiting stage ({b_wait}h wait) and {rework_rate}% rework."
        refs = [f"Cases: {evidence.get('cases', 0)}", f"Median turnaround: {evidence.get('median_turnaround_hours', 0)}h"]

    return AskQuestionResponse(
        answer=ans,
        evidence_references=refs,
        confidence="medium",
        grounded=True
    )
