# FlowGuard AI
### AI-Powered Process Intelligence and AI Value Audit

**Official Track:** Track 7 - Process Intelligence & Automation  
**Cross-Domain Differentiator:** AI Value Audit  
**Product Concept:** *"Waze for business operations."*

---

## 1. Overview & Business Problem

The organization processes high-volume transactions across multiple business divisions (Publishing, Technology, Shared Services, Legal, and Risk). However, operations managers consistently encounter operational friction:
- Work gets delayed in opaque queues across cross-departmental approval chains.
- Outliers and extreme queues cause significant SLA breaches.
- Rework loops and repeated reviews create hidden operational waste.
- Historical automation recommendations (such as 2023 RPA surveys) are out of date or misaligned with current reality.
- Millions of dollars in AI investments are reported to have produced savings, but business leaders lack an independent way to verify whether operational logs substantiate these claims.

**FlowGuard AI** translates raw event logs into actionable operational intelligence. It tells an operations manager:
1. **Where is work getting stuck?**
2. **Why is it getting stuck?**
3. **What should we investigate or improve?**
4. **Which steps are suitable for automation?**
5. **Are existing AI initiatives actually improving operations?**

---

## 2. Primary User & Persona

- **Primary Persona:** Operations Manager / Process Owner (non-technical decision maker).
- **Secondary Users:** Transformation Leads, AI Centre of Excellence (CoE), Technology Managers, Team Leads, Process Analysts.
- **Design Philosophy:** Designed for rapid executive comprehension — a manager can understand the core bottleneck and operational friction within **10 seconds**.

---

## 3. Key Features

- **Operations Overview Dashboard:** Instant visibility into case turnaround distributions, SLA attainment health states (*Critical*, *Needs Attention*, *Healthy*), cost indicators, and bottleneck spotlights.
- **Process Flow Diagram:** Intuitive visualization of process stages with visual bottleneck highlighting, median queue times, and expandable transition matrices.
- **Explain Why & Grounded AI Insights:** Plain-language executive interpretation using real LLMs (Anthropic Claude / OpenAI) grounded strictly in structured evidence without hallucinations.
- **Traceable Evidence Drawer:** One-click auditable verification showing exact record counts, median wait times, P90 queues, and source table provenance.
- **Human-in-the-Loop Review:** Decision makers can interactively review recommendations: `[Accept for Investigation]`, `[Needs More Evidence]`, or `[Dismiss]`.
- **Automation Opportunity Discovery:** Compares 2023 Automation Survey scores with current operational logs to classify candidate viability (*Still Supported*, *Needs Reassessment*, *Insufficient Evidence*).
- **Scenario Fix Simulator:** Deterministic what-if modeling allowing managers to simulate reductions in stage waiting times or rework loops, with transparent arithmetic formulas.
- **AI Value Audit (Cross-Domain Differentiator):** Empirically compares portfolio-reported AI claims with observed operational data before and after deployment (180-day pre/post window), assigning auditable statuses (*Supported*, *Partially Supported*, *Conflicting*, *Insufficient Evidence*).
- **Ask FlowGuard (Natural-Language Q&A):** Interactive text input where operations managers can ask questions in plain English and receive evidence-grounded answers with citations.

---

## 4. Architecture

```
REPH PARQUET DATA
        |
        v
DUCKDB ANALYTICS ENGINE
        |
        +-- Case Cycle Time & Percentiles (Median, P75, P90, P95)
        +-- Transition & Approval Waiting Times
        +-- Transparent Bottleneck Detection
        +-- Rework & Loop Detection (A > B > A)
        +-- Stage-Level Handoffs (No employee scoring)
        +-- SLA Attainment & Official Baseline Comparison
        +-- 2023 Survey vs Current Reality Automation Discovery
        +-- Scenario Fix Simulator (Deterministic arithmetic)
        +-- AI Value Audit (Pre/Post Deployment Window Analysis)
        |
        v
STRUCTURED EVIDENCE JSON (< 1 KB)
        |
        v
LLM API (Anthropic Claude / OpenAI)
        |
        +-- Plain-language business translation
        +-- Grounded recommendations for human review
        |
        v
REACT / VITE ENTERPRISE UI
        |
        v
HUMAN REVIEW & INVESTIGATION
```

---

## 5. Datasets Used

FlowGuard AI uses only the required curated datasets:
- **Core Process Intelligence:**
  - `I_process/process_event_log.parquet`
  - `I_process/process_definitions.parquet`
  - `I_process/process_activities.parquet`
  - `I_process/automation_candidates.parquet`
- **Hero Scenario:**
  - `H_technology/access_requests.parquet`
  - `H_technology/access_request_approvals.parquet`
- **AI Value Audit:**
  - `J_ai_portfolio/ai_use_cases.parquet`
  - `J_ai_portfolio/ai_use_case_kpis.parquet`
- **Governance (Optional):**
  - `J_ai_portfolio/ai_governance_reviews.parquet`

*Note: In accordance with hackathon rules, raw datasets are kept out of source control via `.gitignore`.*

---

## 6. AI Integration & API Key Configuration

FlowGuard AI provides an abstract provider layer supporting **Anthropic Claude** and **OpenAI**.

### Resilience & Offline Mode
If no API key is configured or an external provider request fails, **the application does not crash**. FlowGuard delivers complete, deterministic operational analytics and presents a safe fallback explanation generated from transparent business rules:
> *"Operational analysis completed. AI explanation is unavailable until an AI provider is configured in .env."*

### Adding Your API Key
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and enter your API key:
   ```env
   AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=sk-ant-api03-...
   # Or for OpenAI:
   # AI_PROVIDER=openai
   # OPENAI_API_KEY=sk-proj-...
   ```
3. Restart the backend service. FlowGuard will immediately use the configured model (`claude-3-5-sonnet-20241022` or `gpt-4o-mini`).

---

## 7. Analytics & Calculation Methodologies

### Case Cycle Time
For each case: `cycle_time = max(event_ts) - min(event_ts)`. We calculate total case volume, median, mean, P75, P90, and P95 turnaround hours.

### Waiting Time & Bottlenecks
For consecutive steps within each case: `wait = next_event_ts - current_event_ts`. Bottlenecks are identified by median wait time and total delay contribution (`step_wait / total_observed_waiting * 100`).

### Official Baseline Reconciliation
For the Hero Process (**Access Requests PRC005**), FlowGuard calculates metrics independently and reconciles against official hackathon baselines:
- **Data Access - PII:** Official Baseline: `181.1h` | FlowGuard Calculated: `184.7h`
- **Data Access - Analytics:** Official Baseline: `154.9h` | FlowGuard Calculated: `158.9h`
- **Elevated:** Official Baseline: `27.9h` | FlowGuard Calculated: `28.6h`
- **Standard:** Official Baseline: `12.0h` | FlowGuard Calculated: `12.2h`

### Fix Simulator Arithmetic
The Fix Simulator is **not a machine learning black box**. It calculates:
$$\text{Estimated Median} = \text{Current Median} - (\text{Stage Wait} \times \text{Stage Reduction \%}) - (\text{Rework Penalty} \times \text{Rework Reduction \%})$$
Every assumption and intermediate term is visibly disclosed to the user.

### AI Value Audit Logic
1. Identifies linked process (`process_id`).
2. Retrieves owner-reported baseline and current values from `ai_use_case_kpis`.
3. Establishes a comparable window (180 days before vs. 180 days after deployment anchor date).
4. Calculates observed shift in turnaround, volume, and rework rates.
5. Produces an auditable status:
   - `SUPPORTED BY AVAILABLE EVIDENCE`
   - `PARTIALLY SUPPORTED`
   - `CONFLICTING EVIDENCE`
   - `INSUFFICIENT EVIDENCE`

---

## 8. Responsible AI Principles

- **No Individual Employee Ranking:** Strictly stage- and process-level aggregation. Zero employee evaluations or ranking dashboards.
- **Evidence-Grounded Insights:** The LLM cannot invent numbers or alter calculated metrics.
- **Human Oversight:** Recommendations require human confirmation; no automated workflow modifications occur.
- **Uncertainty Disclosure:** The system explicitly distinguishes observed association from causal certainty.

---

## 9. Local Setup & Running the Application

### Prerequisites
- Python 3.11+
- Node.js 18+ and npm
- REPH parquet datasets in `./data/`

### 1. Install Backend Dependencies
```bash
# Using uv or python venv:
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
# source .venv/bin/activate

pip install -r requirements.txt
```

### 2. Install Frontend Dependencies & Build
```bash
cd frontend
npm install
npm run build
cd ..
```

### 3. Run Backend (Single Unified Application)
FastAPI serves both the backend API and the compiled React frontend on port `8000`:
```bash
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000
```
Open `http://localhost:8000` in your browser.

### 4. Running Frontend in Dev Mode (Optional)
If modifying UI code with hot-reloading:
```bash
cd frontend
npm run dev
```
Open `http://localhost:3000`.

---

## 10. Running Tests

Execute the comprehensive deterministic test suite (17 tests covering analytics, SLA, rework, simulator, AI value, and API endpoints):
```bash
# From workspace root:
python -m pytest backend/tests/ -v
```

---

## 11. AWS Deployment (EC2 or ECS)

FlowGuard AI is packaged for single-container deployment on AWS EC2 or ECS.

### Docker Build & Run
```bash
# Build container:
docker build -t flowguard-ai .

# Run container mounting local data directory:
docker run -p 8000:8000 \
  -v $(pwd)/data:/app/data:ro \
  -e AI_PROVIDER=anthropic \
  -e ANTHROPIC_API_KEY=your_key_here \
  flowguard-ai
```
Access health status at `http://<ec2-ip>:8000/health`.

---

## 12. Hero Demo Flow

1. **Open FlowGuard AI** (`http://localhost:8000` or `http://localhost:3000`).
2. **Observe Operations Overview:** Default Hero Scenario (`Access Request Fulfilment - PRC005`, filter: `Data Access - PII`) loads automatically.
3. **Review 10-Second Executive Summary:** Notice the `Critical` status badge, `184.7h` median turnaround vs. `72h` SLA target, and the spotlight bottleneck card.
4. **Inspect Process Flow Diagram:** Notice the visual queue highlighting `Data Owner Review (128.9h)` and `Privacy Review (20.7h)`.
5. **Review AI Plain-Language Explanation:** Read the executive summary and observed drivers. Test the human review actions (`[Investigate]`, `[More Evidence]`, `[Dismiss]`).
6. **Open View Evidence Drawer:** Show the verified data provenance and the compact JSON evidence object passed to the LLM.
7. **Click Simulate Fix:** Adjust the sliders to simulate a 30% reduction in Privacy review wait and a 50% reduction in rework loops. Observe the real-time scenario savings (`-18.8h saved`).
8. **Navigate to AI Value Audit:** Select a scaled AI initiative. Show the clear separation between *Portfolio-Reported Claims* and *Observed in Operational Data*.
9. **Launch Ask FlowGuard:** Ask *"Where is work getting stuck?"* or click a quick prompt to demonstrate grounded answers with direct metric citations.

---

## 13. Known Limitations & Prototype Declaration

- **Prototype Declaration:** FlowGuard AI is an operational intelligence prototype built for the REPH AI Summit 2026 Academe Hackathon.
- **Historical Survey Data:** The 2023 Automation Survey is static; FlowGuard supplements it with current operational log metrics.
- **Single Process Focus for In-Depth Approvals:** The granular sub-step approvals dataset (`access_request_approvals`) specifically maps to the Hero Process (PRC005 Access Requests). General processes utilize the comprehensive `process_event_log` table.
