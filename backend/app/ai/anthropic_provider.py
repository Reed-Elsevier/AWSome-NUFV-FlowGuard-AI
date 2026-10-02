import json
from typing import Dict, Any
from anthropic import AsyncAnthropic
from backend.app.config import settings
from backend.app.ai.provider import AIProvider, compute_evidence_hash, _EXPLANATION_CACHE, _ASK_CACHE, get_fallback_explanation, get_fallback_ask
from backend.app.ai.prompts import SYSTEM_PROMPT, EXPLAIN_USER_PROMPT, ASK_USER_PROMPT
from backend.app.ai.schemas import AnalysisExplanationResponse, AskQuestionResponse

class AnthropicProvider(AIProvider):
    def __init__(self):
        self.api_key = settings.ANTHROPIC_API_KEY
        self.model = settings.active_model
        self.client = AsyncAnthropic(api_key=self.api_key) if self.api_key else None

    async def explain(self, evidence: Dict[str, Any]) -> AnalysisExplanationResponse:
        if not self.client or not self.api_key:
            return get_fallback_explanation(evidence, reason="unconfigured")

        # Check cache
        cache_key = compute_evidence_hash({"type": "explain", "model": self.model, "evidence": evidence})
        if cache_key in _EXPLANATION_CACHE:
            return _EXPLANATION_CACHE[cache_key]

        try:
            evidence_str = json.dumps(evidence, indent=2, default=str)
            user_msg = EXPLAIN_USER_PROMPT.format(evidence_json=evidence_str)

            response = await self.client.messages.create(
                model=self.model,
                max_tokens=1500,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": user_msg}]
            )

            raw_text = response.content[0].text.strip()
            # Handle potential markdown code fencing in LLM response
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:]
            if raw_text.startswith("```"):
                raw_text = raw_text[3:]
            if raw_text.endswith("```"):
                raw_text = raw_text[:-3]
            parsed = json.loads(raw_text.strip())

            result = AnalysisExplanationResponse(**parsed)
            _EXPLANATION_CACHE[cache_key] = result
            return result
        except Exception as e:
            print(f"[Warning] Anthropic explanation request failed: {e}")
            return get_fallback_explanation(evidence, reason=f"API error: {type(e).__name__}")

    async def ask(self, question: str, evidence: Dict[str, Any]) -> AskQuestionResponse:
        if not self.client or not self.api_key:
            return get_fallback_ask(question, evidence, reason="unconfigured")

        cache_key = compute_evidence_hash({"type": "ask", "q": question, "evidence": evidence})
        if cache_key in _ASK_CACHE:
            return _ASK_CACHE[cache_key]

        try:
            evidence_str = json.dumps(evidence, indent=2, default=str)
            user_msg = ASK_USER_PROMPT.format(user_question=question, evidence_json=evidence_str)

            response = await self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": user_msg}]
            )

            raw_text = response.content[0].text.strip()
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:]
            if raw_text.startswith("```"):
                raw_text = raw_text[3:]
            if raw_text.endswith("```"):
                raw_text = raw_text[:-3]
            parsed = json.loads(raw_text.strip())

            result = AskQuestionResponse(**parsed)
            _ASK_CACHE[cache_key] = result
            return result
        except Exception as e:
            print(f"[Warning] Anthropic ask request failed: {e}")
            return get_fallback_ask(question, evidence, reason=f"API error: {type(e).__name__}")
