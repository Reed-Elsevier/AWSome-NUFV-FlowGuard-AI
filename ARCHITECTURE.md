# FlowGuard AI — System Architecture

FlowGuard AI ("Waze for Business Operations") is engineered around a core architectural principle:
> **Python/DuckDB determines WHAT happened with deterministic mathematical rigor.**  
> **The LLM explains WHY it matters and WHAT may be investigated next in plain business language.**  
> **The LLM is NEVER the source of numerical truth.**

---

## 1. High-Level Architecture Diagram

```
+--------------------------------------------------------------------------+
|                        REPH OPERATIONAL DATA                             |
|  - process_event_log.parquet (I_process)                                 |
|  - process_definitions.parquet & process_activities.parquet              |
|  - automation_candidates.parquet (2023 Survey)                           |
|  - access_requests.parquet & access_request_approvals.parquet            |
|  - ai_use_cases.parquet & ai_use_case_kpis.parquet (J_ai_portfolio)       |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
|                        DUCKDB ANALYTICS ENGINE                           |
|  - Predicate pushdown over Parquet files                                 |
|  - Deterministic cycle time distributions (Median, P75, P90, P95)        |
|  - Transition & approval waiting queues                                  |
|  - Largest bottleneck detection (delay share, affected cases)            |
|  - Rework loops and backward transition tracking                         |
|  - Stage-level handoffs (Zero individual employee scoring)               |
|  - SLA attainment and official baseline reconciliation                   |
|  - 2023 Automation Survey vs Current Evidence comparative audit          |
|  - Scenario Fix Simulator (transparent arithmetic, no fake ML)           |
|  - AI Value Audit (Pre/Post deployment windows & portfolio comparison)   |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
|                       STRUCTURED EVIDENCE JSON                           |
|  - Compact, token-efficient payload (< 1 KB)                             |
|  - Zero raw logs transmitted to external providers                       |
|  - Deterministic SHA-256 hash caching for identical requests             |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
|                           LLM PROVIDER LAYER                             |
|  - Abstract Provider Interface (Anthropic Claude & OpenAI)               |
|  - Strict prompt constraints: Grounded in evidence only, no invented KPIs|
|  - Complete offline resilience: Fallback mode if API key not configured  |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
|                       PLAIN LANGUAGE EXPLANATIONS                        |
|  - Executive summaries translated for non-technical operations managers  |
|  - Distinguishes observed correlation from speculative causality         |
|  - Actionable proposals prepared for human review                        |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
|                    FLOWGUARD REACT / VITE FRONTEND                       |
|  - Operations Overview (10-second operational scan)                      |
|  - Process Flow Diagram with visual bottleneck spotlight                 |
|  - Fix Simulator with interactive sliders & visible formula              |
|  - AI Value Audit with side-by-side reported vs observed reality         |
|  - Traceable Evidence Drawer verifying underlying metrics                |
|  - Ask FlowGuard grounded natural-language Q&A                           |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
|                              HUMAN REVIEW                                |
|  - Human-in-the-loop decision buttons:                                   |
|    [Accept for Investigation] [Needs More Evidence] [Dismiss]            |
|  - Never mutates business systems automatically                          |
+--------------------------------------------------------------------------+
```

---

## 2. Component Structure

### Backend (`/backend/app`)
- **`config.py`**: Reads `.env` and environment variables. Handles provider toggling and key state.
- **`data/connection.py`**: DuckDB singleton connection manager, recursively discovering parquet files and building in-memory views.
- **`data/validation.py`**: Startup schema check ensuring required tables, columns, and timestamp integrity.
- **`analytics/`**:
  - `process_metrics.py`: Case cycle times, medians, percentiles, and cost indicators.
  - `bottlenecks.py`: Transition queue calculation, stage delays, and delay share %.
  - `rework.py`: Loop detection (A -> B -> A) and case rework frequency.
  - `handoffs.py`: Consecutive resource changes aggregated strictly at stage level.
  - `variants.py`: Most frequent ordered path sequences with SLA and rework rates.
  - `sla.py`: Target compliance and official hackathon baseline comparison.
  - `automation.py`: 2023 Survey candidate validation against observed operations.
  - `simulator.py`: Deterministic scenario modeling with published arithmetic.
  - `ai_value.py`: Empirical pre/post deployment audit of AI portfolio claims.
- **`ai/`**:
  - `provider.py`: Base class, evidence hash caching, and fallback generators.
  - `anthropic_provider.py`: Anthropic Claude integration.
  - `openai_provider.py`: OpenAI API integration.
  - `prompts.py`: Constrained system and user prompt definitions.
  - `schemas.py`: Pydantic validation schemas.
- **`api/`**:
  - `processes.py`: GET `/api/processes`
  - `analysis.py`: POST `/api/analyze`, POST `/api/explain`
  - `simulator.py`: POST `/api/simulate`
  - `ai_value.py`: GET `/api/ai-value`, GET `/api/ai-value/{use_case_id}`
  - `ask.py`: POST `/api/ask`
  - `main.py`: FastAPI application entrypoint with `/health` and static frontend hosting.

### Frontend (`/frontend/src`)
- **`components/Navbar.tsx`**: Navigation tabs, health status badge, Ask FlowGuard launcher.
- **`components/HeaderFilters.tsx`**: Process selector (Hero PRC005 featured), Access Type dropdown, date range filters, and analyze button.
- **`components/MetricsGrid.tsx`**: 6 scannable executive KPI cards with official baseline comparison.
- **`components/BottleneckCard.tsx`**: Primary bottleneck highlight card with plain-language explanation and simulate fix launcher.
- **`components/ProcessFlowDiagram.tsx`**: Visual sequential flow diagram highlighting delays and stage metrics.
- **`components/VariantsTable.tsx`**: Ranked top variants table with duration and SLA metrics.
- **`components/AutomationSection.tsx`**: 2023 Survey vs current operational reality comparison cards.
- **`components/AIExplanationSection.tsx`**: Plain-language executive interpretation with human review action buttons.
- **`components/FixSimulatorView.tsx`**: Interactive sliders, side-by-side current vs scenario cards, and transparent calculation methodology.
- **`components/AIValueAuditView.tsx`**: AI portfolio explorer, pre/post deployment audit table, and verified status badges.
- **`components/EvidenceDrawer.tsx`**: Traceable data ledger modal verifying data provenance and exact metrics.
- **`components/AskFlowGuardModal.tsx`**: Natural-language operational Q&A modal grounded in evidence.

---

## 3. Data Integrity & Responsible AI Guardrails

1. **Zero Employee Scoring**: All performance and delay analyses are aggregated exclusively at the stage, process, and transition level. Individual employees are never ranked or evaluated.
2. **Deterministic Truth**: The LLM is restricted to explanation and proposal generation. All metrics are calculated deterministically via DuckDB.
3. **Transparent Methodology**: Every simulation publishes its arithmetic formula. Every recommendation is traceable to underlying operational metrics via the Evidence Drawer.
4. **Data Security**: REPH datasets and API credentials are kept out of Git via `.gitignore`.
