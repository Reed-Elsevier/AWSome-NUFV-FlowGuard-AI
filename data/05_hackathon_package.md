# Hackathon Package - REPH AI Summit 2026 (Academe)

## Challenge brief

**Use AI to make the Center's knowledge work faster, safer, and smarter.**

The Center handles millions of transactions a year: manuscripts, legal updates, fraud alerts, customer cases, invoices, event leads and IT tickets. Some of its AI investments work, some don't, and some of its biggest opportunities are still hidden in the data. Pick a track (or combine tracks), build a working AI-powered prototype on the REPH-provided data, and show a full scenario from input to outcome.

**Rules recap:** use the REPH-provided data as the primary dataset. Disclose any transformations, models, APIs and generated data. Keep a human in the loop for risk decisions. Do not rank individual employees.

## Challenge tracks

### 1. Publishing Integrity
*Goal:* Detect paper mills, reviewer rings and citation manipulation before publication.

*Key tables:* manuscripts, peer_review_assignments, research_papers_published, paper_authors, citations, authors, institutions, research_integrity_flags

*Starter questions:*
1. Which reviewers keep reviewing each other's manuscripts, and how fast and how positively?
2. Can you find groups of papers with near-identical abstracts and shared institutions?
3. Which signals (turnaround, similarity, author network) best predict an integrity flag?
4. How many suspicious papers have not been flagged yet?

### 2. Content Production Copilot
*Goal:* Reduce rework and SLA breaches in copyedit -> XML -> proofing -> release.

*Key tables:* content_production_jobs, xml_conversion_defects, research_papers_published, teams, applications

*Starter questions:*
1. Which stage is the bottleneck and when did it start?
2. What changed around the bottleneck (tool version, vendor, team)?
3. Can an agent pre-check XML and predict defects before QA?
4. What is the SLA impact downstream of XML rework?

### 3. Legal Research Assistant
*Goal:* Answer legal research questions and keep content current.

*Key tables:* legal_documents, legal_citations, regulatory_updates, regulatory_update_impacts, editorial_tasks, jurisdictions, courts, practice_areas

*Starter questions:*
1. Is a given case still good law (check citation treatment)?
2. Which jurisdictions miss the 72-hour content currency SLA most?
3. Did the auto-classification pilot really improve outcomes, or only speed?
4. Summarise a regulatory update and list affected documents.

### 4. Fraud & Identity Intelligence
*Goal:* Find fraud rings, shell structures and noisy rules.

*Key tables:* individuals, identity_attributes, addresses, devices, accounts, transactions, watchlists, business_entities, ownership_links, alert_rules, risk_alerts, investigations, analyst_actions

*Starter questions:*
1. Which identities share devices, addresses or phones, and what do their transactions look like?
2. Which ownership chains lead to a watchlisted entity?
3. Which alert rules generate mostly false positives?
4. Can you score a new transaction in real time with an explanation?

### 5. Customer Support Agent
*Goal:* Triage, draft and resolve customer cases with grounded answers.

*Key tables:* support_cases, case_interactions, customers, products, subscriptions, product_usage_monthly, knowledge_articles, churn_events

*Starter questions:*
1. Route and prioritise a new case from its text.
2. Which customers show churn signals in the last 90 days?
3. Did the CX copilot reduce handling time without hurting CSAT?
4. Which KB articles lead to reopened cases?

### 6. Invoice-to-Pay Automation
*Goal:* Automate AP and catch leakage.

*Key tables:* invoices, invoice_lines, invoice_exceptions, payments, purchase_orders, suppliers, supplier_enrollment_requests, cost_centers

*Starter questions:*
1. Can you detect split and duplicate invoices?
2. When and why do exceptions spike?
3. Which suppliers deserve enhanced due diligence based on ownership?
4. Which AP steps are ready for straight-through processing?

### 7. Process Intelligence & Automation Discovery
*Goal:* Mine the event log to find bottlenecks and automation value.

*Key tables:* process_event_log, process_definitions, process_activities, automation_candidates, access_request_approvals

*Starter questions:*
1. What are the most common variants and where are the rework loops?
2. Where do handoffs explode and why?
3. Which approval step drives access-request turnaround?
4. Is the 2023 automation survey still right?

### 8. Workforce Skills & AI Enablement
*Goal:* Plan capability building (aggregate, team-level insights only).

*Key tables:* employees (aggregated), employee_skills, skills, skill_taxonomy, learning_records, learning_paths, ai_capability_levels, job_requisitions, requisition_skills, performance_metrics_aggregate

*Starter questions:*
1. Where is demand for AI/data skills outgrowing supply?
2. Which learning paths move people from Level 1 to Level 2?
3. Which team-level factors relate to attrition (shift, learning activity)?
4. Recommend a learning journey for a capability profile.

### 9. Enterprise Knowledge RAG
*Goal:* Build a grounded assistant over SOPs, KB, documents and meetings.

*Key tables:* knowledge_articles, knowledge_article_versions, sops, documents, meetings, action_items, search_logs, chat_messages, emails

*Starter questions:*
1. Answer a how-to question with citations, and handle conflicting articles.
2. Which searches return no results (knowledge gaps)?
3. Summarise decisions and open actions for a project.
4. Detect stale SOPs that need review.

### 10. Event Lead Intelligence
*Goal:* Score and route exhibitor leads.

*Key tables:* events, exhibitors, visitors, registrations, badge_scans, leads, session_attendance, event_feedback, customers

*Starter questions:*
1. Which leads become customers, and what predicts conversion?
2. Which events and industries produce the best leads?
3. What does feedback text say about the visitor experience?
4. Recommend which exhibitors to upsell.

## Baseline metrics to beat

| Area | Metric | Current baseline |
|---|---|---|
| Customer support | Average handling time (min), pre-copilot | 15.5 |
| Customer support | Case reopen rate | 8.5% |
| Customer support | Resolution SLA attainment | 66.6% |
| Customer support | Average CSAT (1-5) | 3.87 |
| Risk | Alert false-positive rate (closed alerts) | 84.2% |
| Publishing | XML conversion rework rate (jobs with rework >= 1) | 59.8% |
| Publishing | Production SLA attainment (all stages) | 63.8% |
| Publishing | Median days to first decision | 30.6 |
| Legal | Classification accuracy (all teams) | 0.948 |
| Legal | Median minutes per classification | 21.8 |
| Finance | Invoice exception rate | 19.5% |
| Finance | Invoices without PO | 6.1% |
| Technology | Median access-request turnaround (h): Data Access - Analytics | 154.9 |
| Technology | Median access-request turnaround (h): Data Access - PII | 181.1 |
| Technology | Median access-request turnaround (h): Elevated | 27.9 |
| Technology | Median access-request turnaround (h): Standard | 12.0 |
| Knowledge | Zero-result search rate (all time) | 6.2% |
| Events | Lead-to-customer conversion | 7.22% |

## Cross-domain ideas (for ambitious teams)

* **Supplier risk 360:** join suppliers -> business_entities -> ownership_links -> watchlists.
* **Customer health:** combine product usage, support cases, renewals and event leads in one score.
* **AI value audit:** compare ai_use_case_kpis claims with operational tables (cases, editorial_tasks, content_production_jobs).
* **Knowledge gap closer:** use zero-result searches plus rising case categories to auto-draft new KB articles for review.
* **Multi-agent operations:** an agent that reads the event log, finds a bottleneck, drafts an SOP change and opens a project.

## Responsible AI notes

* All data is **synthetic**. Names are randomly recombined. Any resemblance to real people or organisations is coincidental.
* **No individual performance ranking.** Workforce insights must be at team or aggregate level. performance_metrics_aggregate is team-month only.
* **Human review for risk decisions.** Fraud, KYC, integrity and supplier-risk outputs must be recommendations with explanations, not automatic actions.
* **Ground generated answers.** RAG and agents should cite knowledge_article IDs and say when no source exists.
* **Disclose limitations:** simulated components, data transformations and model choices.
