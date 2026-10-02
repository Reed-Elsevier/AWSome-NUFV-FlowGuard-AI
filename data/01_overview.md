# REPH Digital Operations & Knowledge Ecosystem

*AI Summit 2026 - Academe Hackathon data package. 100% synthetic.*

## The Center
The **Center** is a fictional Philippine-based global shared services and technology center with two sites: **Quezon City Technohub Center** (Manila) and **Iloilo Business Park Center**. It runs operations, technology and knowledge work for five fictional divisions of a global information and analytics group:

| Division | What the Center does for it |
|---|---|
| Lumina Scholarly & Health Publishing | Journal operations, peer review, content production, XML conversion, research integrity |
| Veritas Legal & Professional | Case law indexing, headnotes, statutes & regulations, regulatory monitoring, legal QA |
| Sentinel Risk & Business Analytics | Identity verification, fraud and AML alert handling, KYC, due diligence |
| Agora Exhibitions & Events | Exhibitor services, visitor registration, lead delivery, event customer service |
| Group Shared Services | Finance (AP/AR/procurement), HR & learning, IT, customer service hub, DXO and the Data Science & AI CoE |

Teams work Day (APAC), Mid (EMEA) and Night (Americas) shifts to follow their clients.

## The transformation story (2022 to Sep 2026)
* **2022-2023: Manual and rules-based.** High-volume work runs on people, spreadsheets and rule engines. Alert rules generate a lot of false positives, invoices come in by email, and knowledge sits in SOPs that go out of date.
* **2023-2024: Experimentation.** A GenAI assistant (REPH Copilot) and an AI use-case intake process are launched. Hundreds of ideas are logged, and a fraud alert prioritisation model goes to production.
* **2025: Pilots to scale.** A CX case copilot scales to customer-service teams, a legal auto-classification pilot starts, and the XML tool is upgraded. Governance reviews (PIA, threat model, Secure-by-Design) become mandatory. An AI capability assessment places staff at Level 1 User, Level 2 Practitioner or Level 3 Expert.
* **2026: Toward agentic operations.** A knowledge RAG assistant, an AP exception agent and an XML validator agent are in pilot. Leaders now need to know what is actually working, what is not, and where to automate next.

Results are mixed, on purpose: some AI work clearly pays off, some looks good on one KPI and hurts another, and some opportunities are hidden in the logs.

## Scale of this build
* Tables: **116** across 11 domains
* Rows generated in this run: **8,898,307** (scale = 0.2)
* Target rows at scale 1.0: **~42,771,135**
* Time span: Jan 2022 - Sep 2026 (as-of date 2026-09-30)

## Folder layout
* `<domain>/<table>.csv|.parquet`: curated tables
* `raw/<table>_raw.csv`: dirty versions of employees, customers, suppliers, support_cases and invoices
* `_docs/`: this overview, data dictionary, ERD, sample rows, hackathon package, data-quality plan, validation report
* `_judges_only/`: hidden-insight answer key and judge test cases (**do not share with teams**)
