# Data Dictionary

Generated at scale 0.2. *Target rows* are for scale 1.0. Ranges and null rates are measured on the generated data.

## A. Organization & Workforce

### `sites`

* **Domain:** A. Organization & Workforce
* **Description:** Physical delivery sites of the Center.
* **Target rows (scale 1.0):** 2 | **Rows in this build:** 2
* **Primary key:** `site_id`
* **Foreign keys:** none (parent table)
* **Referenced by:** cost_centers, departments, divisions, employees, job_requisitions, teams
* **File:** `A_workforce/sites.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `site_id` | string | SITE01, SITE02 | 0.0 | Identifier (site). |
| `site_name` | string | Iloilo Business Park Center, Quezon City Technohub Center | 0.0 | Site name. |
| `city` | string | Iloilo City, Quezon City | 0.0 | City. |
| `region` | string | NCR, Western Visayas | 0.0 | Region. |
| `floors` | integer | 4.00 to 6.00 | 0.0 | Floors. |
| `seat_capacity` | integer | 1,800.00 to 3,200.00 | 0.0 | Seat capacity. |
| `opened_date` | date | 2012-03-01 00:00:00 to 2016-08-15 00:00:00 | 0.0 | Date: opened date. |
| `timezone` | string | Asia/Manila | 0.0 | Timezone. |

### `divisions`

* **Domain:** A. Organization & Workforce
* **Description:** Fictional business divisions supported by the Center.
* **Target rows (scale 1.0):** 5 | **Rows in this build:** 5
* **Primary key:** `division_id`
* **Foreign keys:** `center_site_id` -> sites
* **Referenced by:** ai_use_cases, applications, cost_centers, customers, departments, employees, knowledge_articles, opex_budget_vs_actual, process_definitions, products, projects, support_cases, teams
* **File:** `A_workforce/divisions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Identifier (division). |
| `division_name` | string | Agora Exhibitions & Events, Group Shared Services, Lumina Scholarly & Health Publishing, Sentinel Risk & Business Analytics, Veritas Legal & Professional | 0.0 | Division name. |
| `short_code` | string | AEX, GSS, LPI, RBA, SHP | 0.0 | Short code. |
| `global_hq_city` | string | Amsterdam, Atlanta, London, Quezon City, Singapore | 0.0 | Global hq city. |
| `primary_client_region` | string | APAC, Americas, EMEA | 0.0 | Primary client region. |
| `center_site_id` | string | SITE01, SITE02 | 0.0 | Foreign key to sites. |

### `departments`

* **Domain:** A. Organization & Workforce
* **Description:** Departments within each division.
* **Target rows (scale 1.0):** 40 | **Rows in this build:** 40
* **Primary key:** `department_id`
* **Foreign keys:** `division_id` -> divisions, `primary_site_id` -> sites
* **Referenced by:** cost_centers, employees, job_requisitions, learning_paths, process_definitions, roles, teams
* **File:** `A_workforce/departments.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `department_id` | string | free text / identifier | 0.0 | Identifier (department). |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Foreign key to divisions. |
| `department_name` | string | free text / identifier | 0.0 | Department name. |
| `job_family` | string | Customer Service, Data & AI, Editorial, Events Operations, Finance, HR, Legal Editorial, Publishing Operations, Risk Operations, Technology, Transformation | 0.0 | Job family. |
| `primary_site_id` | string | SITE01, SITE02 | 0.0 | Foreign key to sites. |

### `roles`

* **Domain:** A. Organization & Workforce
* **Description:** Role catalogue with level and salary band (synthetic).
* **Target rows (scale 1.0):** 441 | **Rows in this build:** 441
* **Primary key:** `role_id`
* **Foreign keys:** `department_id` -> departments
* **Referenced by:** career_paths, employees, internal_mobility, job_requisitions
* **File:** `A_workforce/roles.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `role_id` | string | free text / identifier | 0.0 | Identifier (role). |
| `role_title` | string | free text / identifier | 0.0 | Role title. |
| `department_id` | string | free text / identifier | 0.0 | Foreign key to departments. |
| `job_family` | string | Customer Service, Data & AI, Editorial, Events Operations, Finance, HR, Legal Editorial, Publishing Operations, Risk Operations, Technology, Transformation | 0.0 | Job family. |
| `job_level` | string | Associate, Director, Manager, Senior Associate, Senior Manager, Specialist, Team Lead | 0.0 | Job level. |
| `min_salary_php` | decimal | 22,000.00 to 207,400.00 | 0.0 | Min salary (PHP). |
| `max_salary_php` | decimal | 34,100.00 to 321,500.00 | 0.0 | Max salary (PHP). |
| `is_ai_data_role` | boolean | False, True | 0.0 | Flag: ai data role. |

### `employees`

* **Domain:** A. Organization & Workforce
* **Description:** Employee master with reporting hierarchy (manager_id self-reference), shift, tenure and attrition.
* **Target rows (scale 1.0):** 25,000 | **Rows in this build:** 5,000
* **Primary key:** `employee_id`
* **Foreign keys:** `site_id` -> sites, `division_id` -> divisions, `department_id` -> departments, `team_id` -> teams, `role_id` -> roles, `manager_id` -> employees
* **Referenced by:** access_request_approvals, access_requests, action_items, ai_capability_levels, ai_feedback, ai_governance_reviews, ai_usage_events, ai_use_cases, analyst_actions, case_interactions, changes, chat_messages, content_production_jobs, customers, documents, editorial_tasks, emails, employee_skills, exhibitors, innovation_ideas, internal_mobility, investigations, invoice_exceptions, invoices, it_tickets, job_requisitions, knowledge_article_versions, knowledge_articles, kyc_cases, learning_records, manuscripts, meetings, process_event_log, project_members, project_risks, project_tasks, projects, prompts_library, purchase_orders, regulatory_update_impacts, renewal_opportunities, research_integrity_flags, risk_alerts, search_logs, sops, supplier_enrollment_requests, support_cases, system_events, teams
* **File:** `A_workforce/employees.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `employee_id` | string | free text / identifier | 0.0 | Identifier (employee). |
| `first_name` | string | free text / identifier | 0.0 | First name. |
| `last_name` | string | free text / identifier | 0.0 | Last name. |
| `full_name` | string | free text / identifier | 0.0 | Full name. |
| `email` | string | free text / identifier | 0.0 | Email. |
| `site_id` | string | SITE01, SITE02 | 0.0 | Foreign key to sites. |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Foreign key to divisions. |
| `department_id` | string | free text / identifier | 0.0 | Foreign key to departments. |
| `team_id` | string | free text / identifier | 0.9 | Foreign key to teams. |
| `role_id` | string | free text / identifier | 0.0 | Foreign key to roles. |
| `job_family` | string | Customer Service, Data & AI, Editorial, Events Operations, Finance, HR, Legal Editorial, Publishing Operations, Risk Operations, Technology, Transformation | 0.0 | Job family. |
| `job_level` | string | Associate, Director, Manager, Senior Associate, Senior Manager, Senior Specialist, Specialist, Team Lead | 0.0 | Job level. |
| `manager_id` | string | free text / identifier | 0.0 | Employee ID of the direct manager (self-reference to employees). |
| `hire_date` | date | 2012-10-03 00:00:00 to 2026-06-20 00:00:00 | 0.0 | Date: hire date. |
| `employment_type` | string | Contractual, Probationary, Project-based, Regular | 0.0 | Employment type. |
| `shift` | string | Day, Mid, Night | 0.0 | Work shift aligned to client time zone: Day (APAC), Mid (EMEA), Night (Americas). |
| `work_arrangement` | string | Hybrid, Onsite | 0.0 | Work arrangement. |
| `tenure_months` | integer | 0.00 to 167.00 | 0.0 | Tenure months. |
| `attrition_flag` | boolean | False, True | 0.0 | True if the employee has left the Center. |
| `exit_date` | date | 2022-01-03 00:00:00 to 2026-09-29 00:00:00 | 82.1 | Date: exit date. |
| `exit_reason` | string | Career growth, Compensation, Further studies, Health, Overseas opportunity, Relocation, Work schedule | 82.1 | Exit reason. |

### `teams`

* **Domain:** A. Organization & Workforce
* **Description:** Delivery teams with shift, client region and AI copilot go-live date.
* **Target rows (scale 1.0):** 600 | **Rows in this build:** 120
* **Primary key:** `team_id`
* **Foreign keys:** `department_id` -> departments, `division_id` -> divisions, `site_id` -> sites, `team_lead_employee_id` -> employees
* **Referenced by:** ai_models, ai_use_cases, alert_rules, applications, chat_channels, content_production_jobs, editorial_tasks, employees, events, innovation_ideas, internal_mobility, it_tickets, job_requisitions, journals, knowledge_articles, meetings, performance_metrics_aggregate, projects, support_cases
* **File:** `A_workforce/teams.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `team_id` | string | free text / identifier | 0.0 | Identifier (team). |
| `department_id` | string | free text / identifier | 0.0 | Foreign key to departments. |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Foreign key to divisions. |
| `site_id` | string | SITE01, SITE02 | 0.0 | Foreign key to sites. |
| `shift` | string | Day, Mid, Night | 0.0 | Work shift aligned to client time zone: Day (APAC), Mid (EMEA), Night (Americas). |
| `client_region` | string | APAC, Americas, EMEA | 0.0 | Client region. |
| `team_name` | string | free text / identifier | 0.0 | Team name. |
| `formed_date` | timestamp | 2016-01-05 08:49:23 to 2024-06-21 14:36:48 | 0.0 | Date: formed date. |
| `ai_copilot_go_live` | date | 2025-01-15 00:00:00 to 2025-04-01 00:00:00 | 90.0 | Date the AI copilot was switched on for the team (null = not live). |
| `team_lead_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |

### `skill_taxonomy`

* **Domain:** A. Organization & Workforce
* **Description:** Two-level skill hierarchy (Domain > Cluster); skills attach to clusters.
* **Target rows (scale 1.0):** 36 | **Rows in this build:** 36
* **Primary key:** `taxonomy_id`
* **Foreign keys:** `parent_taxonomy_id` -> skill_taxonomy
* **Referenced by:** skills
* **File:** `A_workforce/skill_taxonomy.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `taxonomy_id` | string | free text / identifier | 0.0 | Identifier (taxonomy). |
| `node_level` | string | Cluster, Domain | 0.0 | Node level. |
| `node_name` | string | free text / identifier | 0.0 | Node name. |
| `parent_taxonomy_id` | string | TAX001, TAX005, TAX009, TAX013, TAX017, TAX020, TAX023, TAX026, TAX029, TAX032, TAX034 | 30.6 | Foreign key to skill_taxonomy. |

### `skills`

* **Domain:** A. Organization & Workforce
* **Description:** Skill catalogue (~800) mapped to taxonomy clusters.
* **Target rows (scale 1.0):** 800 | **Rows in this build:** 800
* **Primary key:** `skill_id`
* **Foreign keys:** `cluster_id` -> skill_taxonomy, `domain_id` -> skill_taxonomy
* **Referenced by:** employee_skills, learning_content, requisition_skills
* **File:** `A_workforce/skills.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `skill_id` | string | free text / identifier | 0.0 | Identifier (skill). |
| `skill_name` | string | free text / identifier | 0.0 | Skill name. |
| `cluster_id` | string | free text / identifier | 0.0 | Foreign key to skill_taxonomy. |
| `domain_id` | string | TAX001, TAX005, TAX009, TAX013, TAX017, TAX020, TAX023, TAX026, TAX029, TAX032, TAX034 | 0.0 | Foreign key to skill_taxonomy. |
| `is_emerging` | boolean | False, True | 0.0 | Flag: emerging. |
| `market_demand_trend` | string | Declining, Rising, Rising fast, Stable | 0.0 | Market demand trend. |

### `employee_skills`

* **Domain:** A. Organization & Workforce
* **Description:** Employee-to-skill proficiency (1-5) with assessment source.
* **Target rows (scale 1.0):** 200,000 | **Rows in this build:** 38,429
* **Primary key:** `employee_skill_id`
* **Foreign keys:** `employee_id` -> employees, `skill_id` -> skills
* **Referenced by:** -
* **File:** `A_workforce/employee_skills.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `employee_skill_id` | string | free text / identifier | 0.0 | Identifier (employee skill). |
| `employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `skill_id` | string | free text / identifier | 0.0 | Foreign key to skills. |
| `proficiency` | integer | 1.00 to 5.00 | 0.0 | Proficiency. |
| `last_assessed_date` | date | 2023-01-02 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Date: last assessed date. |
| `source` | string | Certification, Manager validation, Self-assessment, Skills assessment | 0.0 | Source. |

### `learning_content`

* **Domain:** A. Organization & Workforce
* **Description:** Learning catalogue (videos, courses, labs) tagged to skills.
* **Target rows (scale 1.0):** 8,000 | **Rows in this build:** 1,600
* **Primary key:** `content_id`
* **Foreign keys:** `skill_id` -> skills
* **Referenced by:** learning_path_items, learning_records
* **File:** `A_workforce/learning_content.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `content_id` | string | free text / identifier | 0.0 | Identifier (content). |
| `skill_id` | string | free text / identifier | 0.0 | Foreign key to skills. |
| `format` | string | Article, Assessment, Book, Course, Hands-on Lab, Video | 0.0 | Format. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `provider` | string | CloudPath Academy (fictional), DXO Enablement, LearnBridge (fictional), REPH Internal Academy, SkillForge (fictional) | 0.0 | Provider. |
| `difficulty` | string | Advanced, Beginner, Intermediate | 0.0 | Difficulty. |
| `duration_minutes` | integer | 5.00 to 512.00 | 0.0 | Duration minutes (minutes). |
| `language` | string | English, Filipino | 0.0 | Language. |
| `published_date` | date | 2020-01-02 00:00:00 to 2026-09-28 00:00:00 | 0.0 | Date: published date. |

### `learning_paths`

* **Domain:** A. Organization & Workforce
* **Description:** Curated learning journeys incl. DRA-style AI Level 1/2/3 pathways.
* **Target rows (scale 1.0):** 150 | **Rows in this build:** 150
* **Primary key:** `path_id`
* **Foreign keys:** `owner_department_id` -> departments
* **Referenced by:** ai_capability_levels, learning_path_items, learning_records
* **File:** `A_workforce/learning_paths.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `path_id` | string | free text / identifier | 0.0 | Identifier (path). |
| `skill_domain` | string | AI & Machine Learning, Automation, Customer Experience, Data & Analytics, Editorial & Publishing, Events & Marketing, Finance & Accounting, Leadership & Change, Legal Content, Risk & Compliance, Software & Cloud | 0.0 | Skill domain. |
| `target_level` | string | Functional, Level 1 User, Level 2 Practitioner, Level 3 Expert | 0.0 | Target level. |
| `path_name` | string | free text / identifier | 0.0 | Path name. |
| `owner_department_id` | string | DEP033, DEP039, DEP040 | 0.0 | Foreign key to departments. |
| `estimated_hours` | integer | 5.00 to 55.00 | 0.0 | Estimated hours. |

### `learning_path_items`

* **Domain:** A. Organization & Workforce
* **Description:** Ordered content items within a learning path.
* **Target rows (scale 1.0):** 1,000 | **Rows in this build:** 1,000
* **Primary key:** `path_item_id`
* **Foreign keys:** `path_id` -> learning_paths, `content_id` -> learning_content
* **Referenced by:** -
* **File:** `A_workforce/learning_path_items.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `path_item_id` | string | free text / identifier | 0.0 | Identifier (path item). |
| `path_id` | string | free text / identifier | 0.0 | Foreign key to learning_paths. |
| `content_id` | string | free text / identifier | 0.0 | Foreign key to learning_content. |
| `sequence_no` | integer | 1.00 to 9.00 | 0.0 | Sequence no. |

### `learning_records`

* **Domain:** A. Organization & Workforce
* **Description:** Enrolment and completion records per employee and content item.
* **Target rows (scale 1.0):** 250,000 | **Rows in this build:** 50,000
* **Primary key:** `learning_record_id`
* **Foreign keys:** `employee_id` -> employees, `content_id` -> learning_content, `path_id` -> learning_paths
* **Referenced by:** -
* **File:** `A_workforce/learning_records.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `learning_record_id` | string | free text / identifier | 0.0 | Identifier (learning record). |
| `employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `content_id` | string | free text / identifier | 0.0 | Foreign key to learning_content. |
| `path_id` | string | free text / identifier | 82.1 | Foreign key to learning_paths. |
| `enrolled_at` | timestamp | 2022-01-01 01:00:00 to 2026-09-28 12:00:00 | 0.0 | Timestamp: enrolled. |
| `completed_at` | timestamp | 2022-01-02 17:26:49 to 2026-09-30 12:55:49 | 30.3 | Timestamp: completed. |
| `status` | string | Completed, Dropped, In Progress, Not Started | 0.0 | Lifecycle status of the record. |
| `score` | decimal | 44.00 to 100.00 | 30.3 | Score. |
| `hours_spent` | decimal | 0.00 to 11.77 | 0.0 | Hours spent. |

### `ai_capability_levels`

* **Domain:** A. Organization & Workforce
* **Description:** AI capability assessment placing employees into Level 1 User / Level 2 Practitioner / Level 3 Expert.
* **Target rows (scale 1.0):** 20,000 | **Rows in this build:** 4,000
* **Primary key:** `assessment_id`
* **Foreign keys:** `employee_id` -> employees, `recommended_path_id` -> learning_paths
* **Referenced by:** -
* **File:** `A_workforce/ai_capability_levels.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `assessment_id` | string | free text / identifier | 0.0 | Identifier (assessment). |
| `employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `assessment_date` | date | 2025-06-02 00:00:00 to 2026-09-15 00:00:00 | 0.0 | Date: assessment date. |
| `prompting_score` | decimal | 0.00 to 100.00 | 0.0 | Prompting score. |
| `data_literacy_score` | decimal | 3.90 to 100.00 | 0.0 | Data literacy score. |
| `automation_score` | decimal | 0.00 to 100.00 | 0.0 | Automation score. |
| `ai_governance_score` | decimal | 3.10 to 100.00 | 0.0 | Ai governance score. |
| `overall_score` | decimal | 23.00 to 91.10 | 0.0 | Overall score. |
| `capability_level` | string | Level 1 User, Level 2 Practitioner, Level 3 Expert | 0.0 | AI capability level: Level 1 User, Level 2 Practitioner, Level 3 Expert. |
| `recommended_path_id` | string | free text / identifier | 0.0 | Foreign key to learning_paths. |

### `career_paths`

* **Domain:** A. Organization & Workforce
* **Description:** Role-to-role progression paths with typical months.
* **Target rows (scale 1.0):** 481 | **Rows in this build:** 481
* **Primary key:** `career_path_id`
* **Foreign keys:** `from_role_id` -> roles, `to_role_id` -> roles
* **Referenced by:** -
* **File:** `A_workforce/career_paths.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `career_path_id` | string | free text / identifier | 0.0 | Identifier (career path). |
| `from_role_id` | string | free text / identifier | 0.0 | Foreign key to roles. |
| `to_role_id` | string | free text / identifier | 0.0 | Foreign key to roles. |
| `path_type` | string | Cross-skilling to AI/Data, Vertical | 0.0 | Path type. |
| `typical_months` | integer | 14.00 to 47.00 | 0.0 | Typical months. |
| `observed_moves` | integer | 0.00 to 0.00 | 0.0 | Observed moves. |

### `internal_mobility`

* **Domain:** A. Organization & Workforce
* **Description:** Promotions and lateral / cross-skilling moves.
* **Target rows (scale 1.0):** 6,000 | **Rows in this build:** 1,200
* **Primary key:** `move_id`
* **Foreign keys:** `employee_id` -> employees, `from_role_id` -> roles, `to_role_id` -> roles, `from_team_id` -> teams, `to_team_id` -> teams
* **Referenced by:** -
* **File:** `A_workforce/internal_mobility.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `move_id` | string | free text / identifier | 0.0 | Identifier (move). |
| `employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `from_role_id` | string | free text / identifier | 0.0 | Foreign key to roles. |
| `to_role_id` | string | free text / identifier | 0.0 | Foreign key to roles. |
| `from_team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `to_team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `effective_date` | date | 2022-03-03 00:00:00 to 2026-09-29 00:00:00 | 0.0 | Date: effective date. |
| `move_type` | string | Cross-division, Promotion | 0.0 | Move type. |

### `job_requisitions`

* **Domain:** A. Organization & Workforce
* **Description:** Hiring requisitions with time-to-fill.
* **Target rows (scale 1.0):** 3,000 | **Rows in this build:** 600
* **Primary key:** `requisition_id`
* **Foreign keys:** `role_id` -> roles, `department_id` -> departments, `team_id` -> teams, `site_id` -> sites, `hiring_manager_id` -> employees
* **Referenced by:** requisition_skills
* **File:** `A_workforce/job_requisitions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `requisition_id` | string | free text / identifier | 0.0 | Identifier (requisition). |
| `role_id` | string | free text / identifier | 0.0 | Foreign key to roles. |
| `department_id` | string | free text / identifier | 0.0 | Foreign key to departments. |
| `team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `site_id` | string | SITE01, SITE02 | 0.0 | Foreign key to sites. |
| `hiring_manager_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `opened_date` | date | 2022-01-01 00:00:00 to 2026-08-28 00:00:00 | 0.0 | Date: opened date. |
| `filled_date` | date | 2022-02-02 00:00:00 to 2026-09-26 00:00:00 | 3.3 | Date: filled date. |
| `status` | string | Cancelled, Filled, Open | 0.0 | Lifecycle status of the record. |
| `time_to_fill_days` | decimal | 11.00 to 294.00 | 3.3 | Time to fill days. |
| `candidates_screened` | integer | 3.00 to 146.00 | 0.0 | Date: candidates screened. |

### `requisition_skills`

* **Domain:** A. Organization & Workforce
* **Description:** Skills required per requisition.
* **Target rows (scale 1.0):** 1,794 | **Rows in this build:** 1,794
* **Primary key:** `requisition_skill_id`
* **Foreign keys:** `requisition_id` -> job_requisitions, `skill_id` -> skills
* **Referenced by:** -
* **File:** `A_workforce/requisition_skills.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `requisition_skill_id` | string | free text / identifier | 0.0 | Identifier (requisition skill). |
| `requisition_id` | string | free text / identifier | 0.0 | Foreign key to job_requisitions. |
| `skill_id` | string | free text / identifier | 0.0 | Foreign key to skills. |
| `requirement_type` | string | Preferred, Required | 0.0 | Requirement type. |

### `performance_metrics_aggregate`

* **Domain:** A. Organization & Workforce
* **Description:** Team-month operational KPIs (aggregate only; no individual performance ratings).
* **Target rows (scale 1.0):** 6,161 | **Rows in this build:** 6,161
* **Primary key:** `metric_id`
* **Foreign keys:** `team_id` -> teams
* **Referenced by:** -
* **File:** `A_workforce/performance_metrics_aggregate.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `metric_id` | string | free text / identifier | 0.0 | Identifier (metric). |
| `team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `month` | date | 2022-01-01 00:00:00 to 2026-09-01 00:00:00 | 0.0 | Month. |
| `headcount` | integer | 18.00 to 174.00 | 0.0 | Headcount. |
| `cases_handled` | decimal | 62.00 to 148.00 | 85.0 | Cases handled. |
| `avg_handle_time_min` | decimal | 9.15 to 18.88 | 85.0 | Avg handle time min (minutes). |
| `avg_csat` | decimal | 3.43 to 4.31 | 85.0 | Avg csat. |
| `sla_met_rate` | decimal | 0.49 to 0.85 | 85.0 | Sla met rate. |
| `ai_assisted_share` | decimal | 0.00 to 1.00 | 0.0 | Ai assisted share. |
| `productivity_index` | decimal | 85.90 to 157.70 | 0.0 | Productivity index. |
| `quality_score` | decimal | 68.60 to 100.00 | 0.0 | Quality score. |
| `utilization_pct` | decimal | 60.40 to 100.00 | 0.0 | Utilization (%). |

## B. Scholarly & Health Publishing Operations

### `institutions`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Fictional research institutions (link authors, customers, papers).
* **Target rows (scale 1.0):** 15,000 | **Rows in this build:** 3,000
* **Primary key:** `institution_id`
* **Foreign keys:** none (parent table)
* **Referenced by:** author_affiliations, authors, customers, paper_authors, research_papers_published
* **File:** `B_publishing/institutions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `institution_id` | string | free text / identifier | 0.0 | Identifier (institution). |
| `institution_name` | string | free text / identifier | 0.0 | Institution name. |
| `institution_type` | string | Corporate R&D, Government Lab, Hospital, Research Institute, University | 0.0 | Institution type. |
| `country` | string | Australia, Brazil, Canada, China, France, Germany, India, Japan, Netherlands, Philippines, Singapore, South Korea, United Kingdom, United States | 0.0 | Country. |
| `research_tier` | string | Tier 1, Tier 2, Tier 3 | 0.0 | Research tier. |

### `authors`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Synthetic author/researcher identities.
* **Target rows (scale 1.0):** 400,000 | **Rows in this build:** 80,000
* **Primary key:** `author_id`
* **Foreign keys:** `primary_institution_id` -> institutions
* **Referenced by:** author_affiliations, journals, manuscripts, paper_authors, peer_review_assignments
* **File:** `B_publishing/authors.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `author_id` | string | free text / identifier | 0.0 | Identifier (author). |
| `first_name` | string | free text / identifier | 0.0 | First name. |
| `last_name` | string | free text / identifier | 0.0 | Last name. |
| `full_name` | string | free text / identifier | 0.0 | Full name. |
| `author_ref_id` | string | free text / identifier | 0.0 | Identifier (author ref). |
| `country` | string | China, Germany, India, Japan, Netherlands, Philippines, United Kingdom, United States | 0.0 | Country. |
| `primary_institution_id` | string | free text / identifier | 0.0 | Foreign key to institutions. |
| `h_index` | integer | 0.00 to 140.00 | 0.0 | H index. |
| `first_publication_year` | integer | 1,975.00 to 2,026.00 | 0.0 | First publication year. |
| `is_reviewer` | boolean | False, True | 0.0 | Flag: reviewer. |

### `author_affiliations`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Author-to-institution affiliations over time.
* **Target rows (scale 1.0):** 104,053 | **Rows in this build:** 104,053
* **Primary key:** `affiliation_id`
* **Foreign keys:** `author_id` -> authors, `institution_id` -> institutions
* **Referenced by:** -
* **File:** `B_publishing/author_affiliations.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `affiliation_id` | string | free text / identifier | 0.0 | Identifier (affiliation). |
| `author_id` | string | free text / identifier | 0.0 | Foreign key to authors. |
| `institution_id` | string | free text / identifier | 0.0 | Foreign key to institutions. |
| `is_primary` | boolean | False, True | 0.0 | Flag: primary. |
| `start_year` | integer | 1,990.00 to 2,026.00 | 0.0 | Start year. |
| `end_year` | decimal | 1,992.00 to 2,026.00 | 80.0 | End year. |

### `journals`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Fictional journal portfolio with subject, tier and OA model.
* **Target rows (scale 1.0):** 2,500 | **Rows in this build:** 500
* **Primary key:** `journal_id`
* **Foreign keys:** `managing_team_id` -> teams, `editor_in_chief_author_id` -> authors
* **Referenced by:** manuscripts, research_papers_published
* **File:** `B_publishing/journals.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `journal_id` | string | free text / identifier | 0.0 | Identifier (journal). |
| `journal_title` | string | free text / identifier | 0.0 | Journal title. |
| `subject_area` | string | Agricultural Science, Cardiology, Chemistry, Civil Engineering, Economics, Education Research, Energy Systems, Environmental Science, Immunology, Machine Learning, Materials Science, Neuroscience, Nursing, Oncology, Phar | 0.0 | Subject area. |
| `imprint` | string | Aurora Open, Helix Medical, Lumina Press, Meridian Academic, Northgate Science | 0.0 | Imprint. |
| `impact_tier` | string | Q1, Q2, Q3, Q4 | 0.0 | Impact tier. |
| `open_access_model` | string | Gold OA, Hybrid, Subscription | 0.0 | Open access model. |
| `launch_year` | integer | 1,950.00 to 2,025.00 | 0.0 | Launch year. |
| `issues_per_year` | integer | 0.00 to 24.00 | 0.0 | Issues per year. |
| `managing_team_id` | string | TM0001, TM0042, TM0073 | 0.0 | Foreign key to teams. |
| `editor_in_chief_author_id` | string | free text / identifier | 0.0 | Foreign key to authors. |

### `manuscripts`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Manuscript submissions with editorial decisions and turnaround.
* **Target rows (scale 1.0):** 300,000 | **Rows in this build:** 60,000
* **Primary key:** `manuscript_id`
* **Foreign keys:** `journal_id` -> journals, `corresponding_author_id` -> authors, `handling_editor_author_id` -> authors, `ops_coordinator_employee_id` -> employees
* **Referenced by:** peer_review_assignments, research_integrity_flags, research_papers_published
* **File:** `B_publishing/manuscripts.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `manuscript_id` | string | free text / identifier | 0.0 | Identifier (manuscript). |
| `journal_id` | string | free text / identifier | 0.0 | Foreign key to journals. |
| `corresponding_author_id` | string | free text / identifier | 0.0 | Foreign key to authors. |
| `handling_editor_author_id` | string | free text / identifier | 0.0 | Foreign key to authors. |
| `ops_coordinator_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `article_type` | string | Case Report, Data Article, Letter, Original Research, Review, Short Communication, Systematic Review | 0.0 | Article type. |
| `subject_area` | string | Agricultural Science, Cardiology, Chemistry, Civil Engineering, Economics, Education Research, Energy Systems, Environmental Science, Immunology, Machine Learning, Materials Science, Neuroscience, Nursing, Oncology, Phar | 0.0 | Subject area. |
| `topic` | string | free text / identifier | 0.0 | Topic. |
| `submitted_at` | timestamp | 2022-01-01 07:21:33 to 2026-09-25 00:00:00 | 0.0 | Timestamp: submitted. |
| `first_decision_at` | timestamp | 2022-01-05 10:54:45 to 2026-09-30 23:43:24 | 2.2 | Timestamp: first decision. |
| `final_decision_at` | timestamp | 2022-01-05 10:54:45 to 2026-09-30 22:59:53 | 3.9 | Timestamp: final decision. |
| `final_decision` | string | Accepted, Desk Rejected, Rejected, Under Review, Withdrawn | 0.0 | Editorial outcome of the manuscript. |
| `revision_rounds` | integer | 0.00 to 3.00 | 0.0 | Revision rounds. |
| `turnaround_days` | decimal | 0.50 to 595.70 | 3.9 | Turnaround days. |
| `similarity_score_pct` | decimal | 1.10 to 63.50 | 0.0 | Text similarity vs. prior literature (plagiarism screen), %. |

### `peer_review_assignments`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Reviewer invitations, responses, timeliness and recommendations.
* **Target rows (scale 1.0):** 900,000 | **Rows in this build:** 155,283
* **Primary key:** `assignment_id`
* **Foreign keys:** `manuscript_id` -> manuscripts, `reviewer_author_id` -> authors
* **Referenced by:** -
* **File:** `B_publishing/peer_review_assignments.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `assignment_id` | string | free text / identifier | 0.0 | Identifier (assignment). |
| `manuscript_id` | string | free text / identifier | 0.0 | Foreign key to manuscripts. |
| `reviewer_author_id` | string | free text / identifier | 0.0 | Foreign key to authors. |
| `invited_at` | timestamp | 2022-01-02 07:16:45 to 2026-09-29 23:54:45 | 0.0 | Timestamp: invited. |
| `responded_at` | timestamp | 2022-01-04 00:43:04 to 2026-09-30 23:54:45 | 15.1 | Timestamp: responded. |
| `response` | string | Accepted, Awaiting response, Declined, No Response | 0.0 | Response. |
| `due_at` | timestamp | 2022-01-25 00:43:04 to 2026-10-21 23:54:45 | 15.1 | Timestamp: due. |
| `review_submitted_at` | timestamp | 2022-01-12 19:03:25 to 2026-09-30 23:23:27 | 46.0 | Timestamp: review submitted. |
| `is_overdue` | boolean | False, True | 0.0 | Flag: overdue. |
| `recommendation` | string | Accept, Major Revision, Minor Revision, Reject | 46.0 | Recommendation. |
| `review_quality_score` | decimal | 1.00 to 5.00 | 46.0 | Review quality score. |
| `review_word_count` | decimal | 40.00 to 4,000.00 | 46.0 | Count of review word. |

### `research_papers_published`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Published articles with generated title/abstract/keywords and fictional DOI-like IDs.
* **Target rows (scale 1.0):** 100,000 | **Rows in this build:** 18,085
* **Primary key:** `paper_id`
* **Foreign keys:** `manuscript_id` -> manuscripts, `journal_id` -> journals, `institution_id` -> institutions
* **Referenced by:** citations, content_production_jobs, paper_authors, research_integrity_flags, xml_conversion_defects
* **File:** `B_publishing/research_papers_published.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `paper_id` | string | free text / identifier | 0.0 | Identifier (paper). |
| `manuscript_id` | string | free text / identifier | 0.0 | Foreign key to manuscripts. |
| `journal_id` | string | free text / identifier | 0.0 | Foreign key to journals. |
| `published_date` | date | 2022-03-11 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Date: published date. |
| `doi` | string | free text / identifier | 0.0 | Doi. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `abstract` | string | free text / identifier | 0.0 | Abstract. |
| `keywords` | string | free text / identifier | 0.0 | Keywords. |
| `subject_area` | string | Agricultural Science, Cardiology, Chemistry, Civil Engineering, Economics, Education Research, Energy Systems, Environmental Science, Immunology, Machine Learning, Materials Science, Neuroscience, Nursing, Oncology, Phar | 0.0 | Subject area. |
| `topic` | string | free text / identifier | 0.0 | Topic. |
| `article_type` | string | Case Report, Data Article, Letter, Original Research, Review, Short Communication, Systematic Review | 0.0 | Article type. |
| `open_access` | boolean | False, True | 0.0 | Open access. |
| `page_count` | integer | 2.00 to 53.00 | 0.0 | Count of page. |
| `downloads_total` | integer | 10.00 to 43,594.00 | 0.0 | Downloads total. |
| `citation_count` | integer | 0.00 to 5,980.00 | 0.0 | Count of citation. |
| `institution_id` | string | free text / identifier | 0.0 | Foreign key to institutions. |

### `paper_authors`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Author list per paper with position and affiliation at time of publication.
* **Target rows (scale 1.0):** 81,873 | **Rows in this build:** 81,873
* **Primary key:** `paper_author_id`
* **Foreign keys:** `paper_id` -> research_papers_published, `author_id` -> authors, `affiliation_institution_id` -> institutions
* **Referenced by:** -
* **File:** `B_publishing/paper_authors.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `paper_author_id` | string | free text / identifier | 0.0 | Identifier (paper author). |
| `paper_id` | string | free text / identifier | 0.0 | Foreign key to research_papers_published. |
| `author_id` | string | free text / identifier | 0.0 | Foreign key to authors. |
| `author_position` | integer | 1.00 to 15.00 | 0.0 | Author position. |
| `is_corresponding` | boolean | False, True | 0.0 | Flag: corresponding. |
| `affiliation_institution_id` | string | free text / identifier | 0.0 | Foreign key to institutions. |

### `citations`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Paper-to-paper citation graph (cited paper always published earlier).
* **Target rows (scale 1.0):** 1,500,000 | **Rows in this build:** 295,594
* **Primary key:** `citation_id`
* **Foreign keys:** `citing_paper_id` -> research_papers_published, `cited_paper_id` -> research_papers_published
* **Referenced by:** -
* **File:** `B_publishing/citations.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `citation_id` | string | free text / identifier | 0.0 | Identifier (citation). |
| `citing_paper_id` | string | free text / identifier | 0.0 | Foreign key to research_papers_published. |
| `cited_paper_id` | string | free text / identifier | 0.0 | Foreign key to research_papers_published. |
| `citation_year` | integer | 2,022.00 to 2,026.00 | 0.0 | Citation year. |
| `context_section` | string | Discussion, Introduction, Methods, Results | 0.0 | Context section. |

### `content_production_jobs`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Per-stage production jobs (copyedit -> release) with SLA and rework.
* **Target rows (scale 1.0):** 250,000 | **Rows in this build:** 49,998
* **Primary key:** `job_id`
* **Foreign keys:** `paper_id` -> research_papers_published, `team_id` -> teams, `assignee_employee_id` -> employees
* **Referenced by:** xml_conversion_defects
* **File:** `B_publishing/content_production_jobs.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `job_id` | string | free text / identifier | 0.0 | Identifier (job). |
| `paper_id` | string | free text / identifier | 0.0 | Foreign key to research_papers_published. |
| `stage` | string | Copyedit, Proofing, QA, Release, Typeset, XML Conversion | 0.0 | Lifecycle stage. |
| `stage_order` | integer | 1.00 to 6.00 | 0.0 | Stage order. |
| `team_id` | string | TM0003, TM0004, TM0059, TM0071, TM0077, TM0086, TM0120 | 0.0 | Foreign key to teams. |
| `vendor_name` | string | DataConv Services B (fictional), In-house, Typeset Partners A (fictional) | 0.0 | Vendor name. |
| `started_at` | timestamp | 2024-10-30 14:11:58 to 2026-09-27 11:16:27 | 0.0 | Timestamp: started. |
| `completed_at` | timestamp | 2024-10-31 17:20:10 to 2026-09-27 15:20:25 | 0.0 | Timestamp: completed. |
| `sla_hours` | integer | 8.00 to 72.00 | 0.0 | Sla hours. |
| `assignee_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `elapsed_hours` | decimal | 0.64 to 631.55 | 0.0 | Elapsed hours. |
| `sla_met` | boolean | False, True | 0.0 | True if resolved within SLA (null while open). |
| `rework_count` | integer | 0.00 to 7.00 | 0.0 | Number of times the job was sent back for rework. |
| `tool_version` | string | XConvert 3.8, XConvert 4.0 | 83.3 | Version of the XML conversion tool used (XML Conversion stage only). |
| `status` | string | Completed | 0.0 | Lifecycle status of the record. |

### `xml_conversion_defects`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Defects found in XML conversion / QA with detection method (human, rule, AI).
* **Target rows (scale 1.0):** 180,000 | **Rows in this build:** 36,000
* **Primary key:** `defect_id`
* **Foreign keys:** `job_id` -> content_production_jobs, `paper_id` -> research_papers_published
* **Referenced by:** -
* **File:** `B_publishing/xml_conversion_defects.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `defect_id` | string | free text / identifier | 0.0 | Identifier (defect). |
| `job_id` | string | free text / identifier | 0.0 | Foreign key to content_production_jobs. |
| `paper_id` | string | free text / identifier | 0.0 | Foreign key to research_papers_published. |
| `defect_type` | string | Figure, Math/Equation, Metadata, Reference, Tagging | 0.0 | Defect type. |
| `severity` | string | Critical, Major, Minor | 0.0 | Severity. |
| `detected_at` | timestamp | 2024-11-03 04:10:02 to 2026-09-26 13:20:43 | 0.0 | Timestamp: detected. |
| `detected_by` | string | AI Validator, Human QA, Rule Engine | 0.0 | Detected by. |
| `fixed_at` | timestamp | 2024-11-03 08:06:01 to 2026-09-27 19:20:42 | 0.0 | Timestamp: fixed. |
| `root_cause` | string | Conversion rule gap, Manual keying error, Source file quality, Template mismatch, Unknown | 0.0 | Root cause. |

### `research_integrity_flags`

* **Domain:** B. Scholarly & Health Publishing Operations
* **Description:** Research integrity concerns raised on papers/manuscripts (partial detection).
* **Target rows (scale 1.0):** 6,000 | **Rows in this build:** 1,200
* **Primary key:** `flag_id`
* **Foreign keys:** `paper_id` -> research_papers_published, `manuscript_id` -> manuscripts, `assigned_employee_id` -> employees
* **Referenced by:** -
* **File:** `B_publishing/research_integrity_flags.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `flag_id` | string | free text / identifier | 0.0 | Identifier (flag). |
| `paper_id` | string | free text / identifier | 0.0 | Foreign key to research_papers_published. |
| `flag_type` | string | Authorship dispute, Citation manipulation, Data fabrication concern, Image duplication, Plagiarism, Reviewer manipulation, Suspected paper mill, Undisclosed conflict of interest | 0.0 | Flag type. |
| `manuscript_id` | string | free text / identifier | 0.0 | Foreign key to manuscripts. |
| `flagged_at` | timestamp | 2022-05-25 13:09:29 to 2026-09-29 10:03:38 | 0.0 | Timestamp: flagged. |
| `detected_by` | string | Editor, Integrity team audit, Reader report, Screening tool | 0.0 | Detected by. |
| `status` | string | Cleared, Corrected, Open, Retracted, Under Investigation | 0.0 | Lifecycle status of the record. |
| `assigned_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `evidence_summary` | string | Co-author claims contribution was not acknowledged., Disproportionate citations to a small group of authors., Funding source not declared., High similarity with prior publication without attribution., Overlapping western | 0.0 | Evidence summary. |

## C. Legal & Professional Content Operations

### `jurisdictions`

* **Domain:** C. Legal & Professional Content Operations
* **Description:** Fictional jurisdictions.
* **Target rows (scale 1.0):** 60 | **Rows in this build:** 60
* **Primary key:** `jurisdiction_id`
* **Foreign keys:** none (parent table)
* **Referenced by:** courts, legal_documents, regulatory_updates
* **File:** `C_legal/jurisdictions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `jurisdiction_id` | string | free text / identifier | 0.0 | Identifier (jurisdiction). |
| `jurisdiction_name` | string | free text / identifier | 0.0 | Jurisdiction name. |
| `jurisdiction_code` | string | free text / identifier | 0.0 | Jurisdiction code. |
| `legal_system` | string | Civil Law, Common Law, Mixed | 0.0 | Legal system. |
| `region` | string | APAC, Americas, EMEA | 0.0 | Region. |
| `official_language` | string | Dutch, English, French, German, Japanese, Spanish | 0.0 | Official language. |

### `courts`

* **Domain:** C. Legal & Professional Content Operations
* **Description:** Courts and tribunals per jurisdiction.
* **Target rows (scale 1.0):** 900 | **Rows in this build:** 900
* **Primary key:** `court_id`
* **Foreign keys:** `jurisdiction_id` -> jurisdictions
* **Referenced by:** legal_documents
* **File:** `C_legal/courts.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `court_id` | string | free text / identifier | 0.0 | Identifier (court). |
| `jurisdiction_id` | string | free text / identifier | 0.0 | Foreign key to jurisdictions. |
| `court_name` | string | free text / identifier | 0.0 | Court name. |
| `court_level` | string | Appellate, Supreme, Trial, Tribunal | 0.0 | Court level. |
| `court_code` | string | free text / identifier | 0.0 | Court code. |

### `practice_areas`

* **Domain:** C. Legal & Professional Content Operations
* **Description:** Legal practice areas taxonomy.
* **Target rows (scale 1.0):** 80 | **Rows in this build:** 80
* **Primary key:** `practice_area_id`
* **Foreign keys:** none (parent table)
* **Referenced by:** legal_documents, regulatory_updates
* **File:** `C_legal/practice_areas.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `practice_area_id` | string | free text / identifier | 0.0 | Identifier (practice area). |
| `practice_area_name` | string | free text / identifier | 0.0 | Practice area name. |
| `practice_group` | string | Corporate & Commercial, Disputes, Finance, Private Client, Public Law, Regulatory | 0.0 | Practice group. |

### `legal_documents`

* **Domain:** C. Legal & Professional Content Operations
* **Description:** Fictional case law, statutes, regulations and practice notes with summaries and headnotes.
* **Target rows (scale 1.0):** 200,000 | **Rows in this build:** 40,000
* **Primary key:** `doc_id`
* **Foreign keys:** `jurisdiction_id` -> jurisdictions, `court_id` -> courts, `practice_area_id` -> practice_areas
* **Referenced by:** editorial_tasks, legal_citations, regulatory_update_impacts
* **File:** `C_legal/legal_documents.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `doc_id` | string | free text / identifier | 0.0 | Identifier (doc). |
| `doc_type` | string | Case Law, Commentary, Practice Note, Regulation, Statute | 0.0 | Doc type. |
| `jurisdiction_id` | string | free text / identifier | 0.0 | Foreign key to jurisdictions. |
| `practice_area_id` | string | free text / identifier | 0.0 | Foreign key to practice_areas. |
| `court_id` | string | free text / identifier | 37.9 | Foreign key to courts. |
| `decision_or_enacted_date` | date | 1975-01-03 00:00:00 to 2026-09-27 00:00:00 | 0.0 | Date: decision or enacted date. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `citation_ref` | string | free text / identifier | 0.0 | Citation ref. |
| `summary` | string | free text / identifier | 0.0 | Summary. |
| `headnote` | string | free text / identifier | 37.9 | Headnote. |
| `word_count` | integer | 300.00 to 120,000.00 | 0.0 | Count of word. |
| `status` | string | Amended, Current, Overruled, Repealed | 0.0 | Lifecycle status of the record. |
| `last_updated_at` | timestamp | 1975-03-25 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Timestamp: last updated. |

### `legal_citations`

* **Domain:** C. Legal & Professional Content Operations
* **Description:** Document-to-document citations with treatment (followed, distinguished, overruled...).
* **Target rows (scale 1.0):** 800,000 | **Rows in this build:** 159,981
* **Primary key:** `legal_citation_id`
* **Foreign keys:** `citing_doc_id` -> legal_documents, `cited_doc_id` -> legal_documents
* **Referenced by:** -
* **File:** `C_legal/legal_citations.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `legal_citation_id` | string | free text / identifier | 0.0 | Identifier (legal citation). |
| `citing_doc_id` | string | free text / identifier | 0.0 | Foreign key to legal_documents. |
| `cited_doc_id` | string | free text / identifier | 0.0 | Foreign key to legal_documents. |
| `treatment` | string | Applied, Cited, Considered, Distinguished, Followed, Overruled | 0.0 | How the citing document treats the cited one (Followed, Distinguished, Overruled...). |
| `citation_date` | date | 1975-05-15 00:00:00 to 2026-09-27 00:00:00 | 0.0 | Date: citation date. |

### `editorial_tasks`

* **Domain:** C. Legal & Professional Content Operations
* **Description:** Editorial work items (classify, summarize, headnote, update, QA) with effort, accuracy and AI assistance.
* **Target rows (scale 1.0):** 400,000 | **Rows in this build:** 80,000
* **Primary key:** `task_id`
* **Foreign keys:** `doc_id` -> legal_documents, `team_id` -> teams, `editor_employee_id` -> employees, `model_id` -> ai_models
* **Referenced by:** -
* **File:** `C_legal/editorial_tasks.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `task_id` | string | free text / identifier | 0.0 | Identifier (task). |
| `doc_id` | string | free text / identifier | 0.0 | Foreign key to legal_documents. |
| `task_type` | string | Classify, Headnote, QA, Summarize, Update | 0.0 | Task type. |
| `team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `editor_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `created_at` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 23:59:59 | 0.0 | Timestamp: created. |
| `ai_assisted` | boolean | False, True | 0.0 | Ai assisted. |
| `model_id` | string | MDL0001, MDL0096 | 95.9 | Foreign key to ai_models. |
| `minutes_spent` | decimal | 2.80 to 240.50 | 0.0 | Minutes spent. |
| `completed_at` | timestamp | 2022-01-01 01:22:00 to 2026-09-30 23:22:43 | 0.0 | Timestamp: completed. |
| `accuracy_score` | decimal | 0.70 to 1.00 | 0.0 | QA-measured accuracy of the editorial output (0-1). |
| `qa_passed` | boolean | False, True | 0.0 | Qa passed. |
| `status` | string | Completed, Open | 0.0 | Lifecycle status of the record. |

### `regulatory_updates`

* **Domain:** C. Legal & Professional Content Operations
* **Description:** Regulatory changes captured from (fictional) regulators.
* **Target rows (scale 1.0):** 40,000 | **Rows in this build:** 8,000
* **Primary key:** `update_id`
* **Foreign keys:** `jurisdiction_id` -> jurisdictions, `practice_area_id` -> practice_areas
* **Referenced by:** regulatory_update_impacts
* **File:** `C_legal/regulatory_updates.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `update_id` | string | free text / identifier | 0.0 | Identifier (update). |
| `jurisdiction_id` | string | free text / identifier | 0.0 | Foreign key to jurisdictions. |
| `practice_area_id` | string | free text / identifier | 0.0 | Foreign key to practice_areas. |
| `source_body` | string | free text / identifier | 0.0 | Source body. |
| `update_type` | string | Amendment, Consultation, Court Rule Change, Enforcement Notice, Guidance, New Regulation | 0.0 | Date: update type. |
| `published_at` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 17:00:08 | 0.0 | Timestamp: published. |
| `effective_date` | date | 2022-01-02 00:00:00 to 2027-03-19 00:00:00 | 0.0 | Date: effective date. |
| `captured_at` | timestamp | 2022-01-01 14:48:18 to 2026-09-30 23:59:59 | 0.0 | Timestamp: captured. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `summary` | string | free text / identifier | 0.0 | Summary. |

### `regulatory_update_impacts`

* **Domain:** C. Legal & Professional Content Operations
* **Description:** Documents affected by each regulatory update; content currency latency and SLA breach.
* **Target rows (scale 1.0):** 20,065 | **Rows in this build:** 20,065
* **Primary key:** `impact_id`
* **Foreign keys:** `update_id` -> regulatory_updates, `doc_id` -> legal_documents, `editor_employee_id` -> employees
* **Referenced by:** -
* **File:** `C_legal/regulatory_update_impacts.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `impact_id` | string | free text / identifier | 0.0 | Identifier (impact). |
| `update_id` | string | free text / identifier | 0.0 | Foreign key to regulatory_updates. |
| `doc_id` | string | free text / identifier | 0.0 | Foreign key to legal_documents. |
| `sla_hours` | integer | 72.00 to 72.00 | 0.0 | Sla hours. |
| `content_updated_at` | timestamp | 2022-01-02 00:39:22 to 2026-09-30 23:36:16 | 0.1 | Timestamp: content updated. |
| `latency_hours` | decimal | 2.90 to 982.90 | 0.1 | Hours from regulatory change capture to content update. |
| `sla_breached` | boolean | False, True | 0.0 | True if the SLA was breached. |
| `editor_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |

## D. Risk & Business Analytics Operations

### `business_entities`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Fictional companies; shared master for risk subjects, customers, exhibitors and suppliers.
* **Target rows (scale 1.0):** 50,000 | **Rows in this build:** 10,000
* **Primary key:** `entity_id`
* **Foreign keys:** none (parent table)
* **Referenced by:** accounts, customers, exhibitors, kyc_cases, ownership_links, suppliers, visitors, watchlists
* **File:** `D_risk/business_entities.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `entity_id` | string | free text / identifier | 0.0 | Identifier (entity). |
| `legal_name` | string | free text / identifier | 0.0 | Legal name. |
| `registration_number` | string | free text / identifier | 0.0 | Registration number. |
| `country` | string | free text / identifier | 0.0 | Country. |
| `industry` | string | free text / identifier | 0.0 | Industry. |
| `entity_type` | string | Corporation, Foundation, Government Body, LLC, Non-profit, Partnership, Trust | 0.0 | Entity type. |
| `incorporation_date` | date | 1810-07-06 00:00:00 to 2025-09-11 00:00:00 | 0.0 | Date: incorporation date. |
| `employee_band` | string | 1-10, 1001-5000, 11-50, 201-1000, 5000+, 51-200 | 0.0 | Employee band. |
| `annual_revenue_usd` | decimal | 1,400.00 to 2,283,583,000.00 | 0.0 | Annual revenue (USD). |
| `status` | string | Active, Dissolved, Dormant | 0.0 | Lifecycle status of the record. |
| `is_listed` | boolean | False, True | 0.0 | Flag: listed. |

### `ownership_links`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Corporate ownership graph (parent owns child).
* **Target rows (scale 1.0):** 120,000 | **Rows in this build:** 23,871
* **Primary key:** `ownership_link_id`
* **Foreign keys:** `parent_entity_id` -> business_entities, `child_entity_id` -> business_entities
* **Referenced by:** -
* **File:** `D_risk/ownership_links.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `ownership_link_id` | string | free text / identifier | 0.0 | Identifier (ownership link). |
| `parent_entity_id` | string | free text / identifier | 0.0 | Foreign key to business_entities. |
| `child_entity_id` | string | free text / identifier | 0.0 | Foreign key to business_entities. |
| `ownership_pct` | decimal | 1.50 to 100.00 | 0.0 | Share of the child entity owned by the parent (%). |
| `link_type` | string | Direct, Indirect, Nominee | 0.0 | Link type. |
| `effective_date` | date | 2010-01-01 00:00:00 to 2026-09-29 00:00:00 | 0.0 | Date: effective date. |

### `individuals`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Synthetic natural-person identities (risk subjects).
* **Target rows (scale 1.0):** 300,000 | **Rows in this build:** 60,000
* **Primary key:** `individual_id`
* **Foreign keys:** none (parent table)
* **Referenced by:** accounts, addresses, devices, identity_attributes, kyc_cases, watchlists
* **File:** `D_risk/individuals.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `individual_id` | string | free text / identifier | 0.0 | Identifier (individual). |
| `first_name` | string | free text / identifier | 0.0 | First name. |
| `last_name` | string | free text / identifier | 0.0 | Last name. |
| `date_of_birth` | date | 1946-10-01 00:00:00 to 2007-09-30 00:00:00 | 0.0 | Date: date of birth. |
| `nationality` | string | China, Germany, India, Japan, Netherlands, Philippines, United Kingdom, United States | 0.0 | Nationality. |
| `gender` | string | F, M, X | 0.0 | Gender. |
| `occupation` | string | Business owner, Employee, Public official, Retired, Self-employed, Student, Unemployed | 0.0 | Occupation. |
| `created_at` | timestamp | 2018-01-01 10:25:46 to 2026-09-30 00:00:00 | 0.0 | Timestamp: created. |

### `addresses`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Address history per individual.
* **Target rows (scale 1.0):** 330,000 | **Rows in this build:** 66,000
* **Primary key:** `address_id`
* **Foreign keys:** `individual_id` -> individuals
* **Referenced by:** -
* **File:** `D_risk/addresses.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `address_id` | string | free text / identifier | 0.0 | Identifier (address). |
| `individual_id` | string | free text / identifier | 0.0 | Foreign key to individuals. |
| `address_line` | string | free text / identifier | 0.0 | Address line. |
| `city` | string | free text / identifier | 0.0 | City. |
| `country` | string | China, Germany, India, Japan, Netherlands, Philippines, United Kingdom, United States | 0.0 | Country. |
| `postal_code` | string | free text / identifier | 0.0 | Postal code. |
| `address_type` | string | Mailing, Previous, Residential | 0.0 | Address type. |
| `valid_from` | date | 2015-01-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Valid from. |

### `identity_attributes`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Hashed identity attributes (IDs, phone, email) with verification.
* **Target rows (scale 1.0):** 180,026 | **Rows in this build:** 180,026
* **Primary key:** `attribute_id`
* **Foreign keys:** `individual_id` -> individuals
* **Referenced by:** -
* **File:** `D_risk/identity_attributes.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `attribute_id` | string | free text / identifier | 0.0 | Identifier (attribute). |
| `individual_id` | string | free text / identifier | 0.0 | Foreign key to individuals. |
| `attribute_type` | string | Driver Licence, Email, National ID, Passport, Phone, Tax ID | 0.0 | Attribute type. |
| `attribute_value_hash` | string | free text / identifier | 0.0 | Attribute value hash. |
| `verified` | boolean | False, True | 0.0 | Verified. |
| `verification_method` | string | Biometric, Database match, Document check, OTP | 20.0 | Verification method. |
| `verified_at` | timestamp | 2018-01-01 18:15:24 to 2026-09-30 22:57:27 | 20.1 | Timestamp: verified. |

### `devices`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Devices observed per individual with fingerprint (shared fingerprints = risk signal).
* **Target rows (scale 1.0):** 400,000 | **Rows in this build:** 80,000
* **Primary key:** `device_id`
* **Foreign keys:** `individual_id` -> individuals
* **Referenced by:** transactions
* **File:** `D_risk/devices.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `device_id` | string | free text / identifier | 0.0 | Identifier (device). |
| `individual_id` | string | free text / identifier | 0.0 | Foreign key to individuals. |
| `device_fingerprint` | string | free text / identifier | 0.0 | Hashed device fingerprint; the same fingerprint on different identities is a risk signal. |
| `device_type` | string | Desktop, Mobile, Tablet | 0.0 | Device type. |
| `os` | string | Android, Linux, Windows, iOS, macOS | 0.0 | Os. |
| `first_seen_at` | timestamp | 2018-01-02 20:49:47 to 2026-09-30 21:57:57 | 0.0 | Timestamp: first seen. |
| `last_seen_at` | timestamp | 2018-01-21 08:04:14 to 2026-09-30 23:59:59 | 0.0 | Timestamp: last seen. |
| `ip_country` | string | free text / identifier | 0.0 | Ip country. |

### `accounts`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Financial accounts screened on behalf of Risk-division clients (FIs).
* **Target rows (scale 1.0):** 500,000 | **Rows in this build:** 100,000
* **Primary key:** `account_id`
* **Foreign keys:** `individual_id` -> individuals, `entity_id` -> business_entities, `client_customer_id` -> customers
* **Referenced by:** risk_alerts, transactions
* **File:** `D_risk/accounts.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `account_id` | string | free text / identifier | 0.0 | Identifier (account). |
| `holder_type` | string | Entity, Individual | 0.0 | Holder type. |
| `individual_id` | string | free text / identifier | 19.9 | Foreign key to individuals. |
| `entity_id` | string | free text / identifier | 80.1 | Foreign key to business_entities. |
| `client_customer_id` | string | free text / identifier | 0.0 | Foreign key to customers. |
| `account_type` | string | Business current, Credit card, Current, E-wallet, Merchant, Savings, Trade finance | 0.0 | Account type. |
| `currency` | string | EUR, GBP, JPY, PHP, USD | 0.0 | Currency. |
| `opened_at` | timestamp | 2016-01-01 13:24:09 to 2026-09-30 00:00:00 | 0.0 | Timestamp: opened. |
| `status` | string | Active, Closed, Dormant, Frozen | 0.0 | Lifecycle status of the record. |
| `risk_rating` | string | High, Low, Medium | 0.0 | Risk rating. |

### `transactions`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Card, wallet, transfer and wire transactions (USD-normalised).
* **Target rows (scale 1.0):** 1,000,000 | **Rows in this build:** 200,000
* **Primary key:** `txn_id`
* **Foreign keys:** `account_id` -> accounts, `counterparty_account_id` -> accounts, `device_id` -> devices
* **Referenced by:** risk_alerts
* **File:** `D_risk/transactions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `txn_id` | string | free text / identifier | 0.0 | Identifier (txn). |
| `account_id` | string | free text / identifier | 0.0 | Foreign key to accounts. |
| `counterparty_account_id` | string | free text / identifier | 70.4 | Foreign key to accounts. |
| `device_id` | string | free text / identifier | 60.5 | Foreign key to devices. |
| `channel` | string | ATM, Branch, Card, Mobile wallet, Online transfer, Wire | 0.0 | Channel. |
| `merchant_category` | string | Crypto exchange, Dining, Electronics, Fuel, Gaming, Groceries, Online marketplace, Travel | 62.0 | Merchant category. |
| `currency` | string | EUR, GBP, JPY, PHP, USD | 0.0 | Currency. |
| `amount` | decimal | 0.93 to 26,863,879.99 | 0.0 | Amount. |
| `amount_usd` | decimal | 0.87 to 305,796.22 | 0.0 | Amount converted to USD at a fixed synthetic FX rate. |
| `txn_country` | string | free text / identifier | 0.0 | Txn country. |
| `is_cross_border` | boolean | False, True | 0.0 | Flag: cross border. |
| `txn_ts` | timestamp | 2024-01-01 07:03:33 to 2026-09-30 01:00:00 | 0.0 | Timestamp: txn. |
| `status` | string | Declined, Pending, Reversed, Settled | 0.0 | Lifecycle status of the record. |

### `watchlists`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Fictional sanctions-like, PEP-like and adverse-media-like list entries.
* **Target rows (scale 1.0):** 20,000 | **Rows in this build:** 4,006
* **Primary key:** `watchlist_entry_id`
* **Foreign keys:** `individual_id` -> individuals, `entity_id` -> business_entities
* **Referenced by:** -
* **File:** `D_risk/watchlists.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `watchlist_entry_id` | string | free text / identifier | 0.0 | Identifier (watchlist entry). |
| `subject_type` | string | Entity, Individual | 0.0 | Subject type. |
| `individual_id` | string | free text / identifier | 39.7 | Foreign key to individuals. |
| `entity_id` | string | free text / identifier | 60.3 | Foreign key to business_entities. |
| `list_type` | string | Adverse media-like, Law enforcement-like, PEP-like, Sanctions-like | 0.0 | List type. |
| `list_source` | string | Adverse Media Index (fictional), Global Restricted Parties List (fictional), Politically Exposed Persons Register (fictional), Regional Enforcement Bulletin (fictional) | 0.0 | List source. |
| `listed_date` | date | 2015-01-03 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Date: listed date. |
| `reason` | string | Asset freeze, Fraud allegations in media, Senior public function, Under investigation | 0.0 | Reason. |

### `alert_rules`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Transaction-monitoring and screening rules (rule-based and model-based).
* **Target rows (scale 1.0):** 40 | **Rows in this build:** 40
* **Primary key:** `rule_id`
* **Foreign keys:** `model_id` -> ai_models, `owner_team_id` -> teams
* **Referenced by:** risk_alerts
* **File:** `D_risk/alert_rules.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `rule_id` | string | free text / identifier | 0.0 | Identifier (rule). |
| `rule_name` | string | free text / identifier | 0.0 | Rule name. |
| `rule_type` | string | Model-based, Rule-based | 0.0 | Rule type. |
| `threshold` | decimal | 0.50 to 0.94 | 0.0 | Threshold. |
| `model_id` | string | MDL0005 | 75.0 | Foreign key to ai_models. |
| `owner_team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `created_date` | date | 2019-01-16 00:00:00 to 2023-09-04 00:00:00 | 0.0 | Date: created date. |

### `risk_alerts`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Alerts generated by monitoring rules with disposition and false-positive flag.
* **Target rows (scale 1.0):** 150,000 | **Rows in this build:** 30,000
* **Primary key:** `alert_id`
* **Foreign keys:** `rule_id` -> alert_rules, `txn_id` -> transactions, `account_id` -> accounts, `analyst_employee_id` -> employees
* **Referenced by:** investigations
* **File:** `D_risk/risk_alerts.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `alert_id` | string | free text / identifier | 0.0 | Identifier (alert). |
| `rule_id` | string | free text / identifier | 0.0 | Foreign key to alert_rules. |
| `txn_id` | string | free text / identifier | 0.0 | Foreign key to transactions. |
| `account_id` | string | free text / identifier | 0.0 | Foreign key to accounts. |
| `created_at` | timestamp | 2024-01-01 11:40:03 to 2026-09-30 09:07:23 | 0.0 | Timestamp: created. |
| `score` | decimal | 0.00 to 1.00 | 0.0 | Score. |
| `is_false_positive` | boolean | False, True | 0.1 | True if the alert was closed as a false positive (null while open). |
| `disposition` | string | Closed - False Positive, Closed - Monitoring, Closed - True Positive, Escalated to investigation, Open | 0.0 | Disposition. |
| `analyst_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `closed_at` | timestamp | 2024-01-01 15:31:47 to 2026-09-30 23:52:24 | 0.1 | Timestamp: closed. |

### `kyc_cases`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** KYC onboarding and periodic reviews performed for FI clients.
* **Target rows (scale 1.0):** 80,000 | **Rows in this build:** 16,000
* **Primary key:** `kyc_case_id`
* **Foreign keys:** `client_customer_id` -> customers, `subject_individual_id` -> individuals, `subject_entity_id` -> business_entities, `analyst_employee_id` -> employees
* **Referenced by:** investigations
* **File:** `D_risk/kyc_cases.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `kyc_case_id` | string | free text / identifier | 0.0 | Identifier (kyc case). |
| `client_customer_id` | string | free text / identifier | 0.0 | Foreign key to customers. |
| `subject_type` | string | Entity, Individual | 0.0 | Subject type. |
| `subject_individual_id` | string | free text / identifier | 35.6 | Foreign key to individuals. |
| `subject_entity_id` | string | free text / identifier | 64.4 | Foreign key to business_entities. |
| `case_type` | string | Event-driven Review, Onboarding, Periodic Review | 0.0 | Case type. |
| `opened_at` | timestamp | 2023-01-02 07:46:54 to 2026-09-30 00:00:00 | 0.0 | Timestamp: opened. |
| `analyst_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `documents_requested` | integer | 0.00 to 12.00 | 0.0 | Documents requested. |
| `closed_at` | timestamp | 2023-01-05 07:09:34 to 2026-09-30 20:30:05 | 1.0 | Timestamp: closed. |
| `risk_level` | string | High, Low, Medium | 0.0 | Risk level. |
| `outcome` | string | Approved, Approved with EDD, Exited, In Progress, Rejected | 0.0 | Final outcome / result of the record. |

### `investigations`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Investigations opened from escalated alerts with outcome and time-to-decision.
* **Target rows (scale 1.0):** 25,000 | **Rows in this build:** 2,132
* **Primary key:** `investigation_id`
* **Foreign keys:** `alert_id` -> risk_alerts, `kyc_case_id` -> kyc_cases, `lead_analyst_employee_id` -> employees
* **Referenced by:** analyst_actions
* **File:** `D_risk/investigations.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `investigation_id` | string | free text / identifier | 0.0 | Identifier (investigation). |
| `alert_id` | string | free text / identifier | 0.0 | Foreign key to risk_alerts. |
| `kyc_case_id` | string | free text / identifier | 79.3 | Foreign key to kyc_cases. |
| `lead_analyst_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `opened_at` | timestamp | 2024-01-01 15:31:47 to 2026-09-30 16:16:39 | 0.0 | Timestamp: opened. |
| `closed_at` | timestamp | 2024-01-02 12:35:42 to 2026-09-29 14:35:22 | 0.7 | Timestamp: closed. |
| `time_to_decision_hours` | decimal | 4.50 to 760.90 | 0.7 | Time to decision hours. |
| `outcome` | string | Account exited, Enhanced monitoring, No further action, Open, Suspicious activity report filed (SAR-like) | 0.0 | Final outcome / result of the record. |
| `steps_count` | integer | 7.00 to 90.00 | 0.0 | Count of steps. |

### `analyst_actions`

* **Domain:** D. Risk & Business Analytics Operations
* **Description:** Step-level event log of analyst investigation actions.
* **Target rows (scale 1.0):** 600,000 | **Rows in this build:** 120,042
* **Primary key:** `action_id`
* **Foreign keys:** `investigation_id` -> investigations, `analyst_employee_id` -> employees
* **Referenced by:** -
* **File:** `D_risk/analyst_actions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `action_id` | string | free text / identifier | 0.0 | Identifier (action). |
| `investigation_id` | string | free text / identifier | 0.0 | Foreign key to investigations. |
| `sequence_no` | integer | 1.00 to 90.00 | 0.0 | Sequence no. |
| `action_type` | string | Check device & address links, Decision recorded, Draft narrative, Open case, Pull transaction history, QC review, Request client information, Review alert details, Screen against watchlists | 0.0 | Action type. |
| `action_ts` | timestamp | 2024-01-01 15:50:50 to 2026-09-30 23:49:34 | 0.0 | Timestamp: action. |
| `analyst_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `duration_min` | decimal | 0.60 to 249.40 | 0.0 | Duration min (minutes). |
| `tool_used` | string | AI Investigation Assistant, Email, KYCDesk, SentinelScreen, Spreadsheet | 0.0 | Tool used. |
| `note` | string | free text / identifier | 0.0 | Note. |

## E. Exhibitions & Events

### `events`

* **Domain:** E. Exhibitions & Events
* **Description:** Fictional trade shows and conferences.
* **Target rows (scale 1.0):** 400 | **Rows in this build:** 80
* **Primary key:** `event_id`
* **Foreign keys:** `organizer_team_id` -> teams
* **Referenced by:** event_feedback, event_sessions, exhibitors, leads, registrations
* **File:** `E_events/events.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `event_id` | string | free text / identifier | 0.0 | Identifier (event). |
| `industry` | string | Automotive & Mobility, Beauty & Wellness, Construction & Infrastructure, Education & EdTech, Energy & Utilities, Fintech & Banking, Food & Beverage, Healthcare & Life Sciences, Legal & Compliance Tech, Logistics & Supply | 0.0 | Industry. |
| `city` | string | Amsterdam, Bangkok, Dubai, Frankfurt, Ho Chi Minh City, Jakarta, Kuala Lumpur, Las Vegas, London, Manila, Mumbai, Shanghai, Singapore, Sydney, Tokyo | 0.0 | City. |
| `country` | string | Australia, China, Germany, India, Indonesia, Japan, Malaysia, Netherlands, Philippines, Singapore, Thailand, UAE, United Kingdom, United States, Vietnam | 0.0 | Country. |
| `start_date` | date | 2022-03-28 00:00:00 to 2026-12-15 00:00:00 | 0.0 | Date: start date. |
| `end_date` | date | 2022-03-31 00:00:00 to 2026-12-17 00:00:00 | 0.0 | Date: end date. |
| `event_name` | string | free text / identifier | 0.0 | Event name. |
| `venue` | string | free text / identifier | 0.0 | Venue. |
| `format` | string | Hybrid, In-person | 0.0 | Format. |
| `expected_visitors` | integer | 1,220.00 to 31,252.00 | 0.0 | Expected visitors. |
| `status` | string | Completed, Scheduled | 0.0 | Lifecycle status of the record. |
| `organizer_team_id` | string | TM0022, TM0023, TM0024, TM0025, TM0026, TM0046, TM0052, TM0064, TM0081, TM0083, TM0093, TM0094, TM0095, TM0112 | 0.0 | Foreign key to teams. |

### `event_sessions`

* **Domain:** E. Exhibitions & Events
* **Description:** Conference sessions per event.
* **Target rows (scale 1.0):** 1,585 | **Rows in this build:** 1,585
* **Primary key:** `session_id`
* **Foreign keys:** `event_id` -> events
* **Referenced by:** session_attendance
* **File:** `E_events/event_sessions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `session_id` | string | free text / identifier | 0.0 | Identifier (session). |
| `event_id` | string | free text / identifier | 0.0 | Foreign key to events. |
| `track` | string | Innovation Stage, Keynote, Regulatory Update, Startup Pitch, Technical, Workshop | 0.0 | Track. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `start_ts` | timestamp | 2022-03-28 09:00:00 to 2026-12-17 14:00:00 | 0.0 | Timestamp: start. |
| `capacity` | integer | 50.00 to 1,500.00 | 0.0 | Capacity. |

### `exhibitors`

* **Domain:** E. Exhibitions & Events
* **Description:** Exhibitor participations (company x event) with package and contract value.
* **Target rows (scale 1.0):** 30,000 | **Rows in this build:** 6,000
* **Primary key:** `exhibitor_id`
* **Foreign keys:** `event_id` -> events, `entity_id` -> business_entities, `account_manager_employee_id` -> employees
* **Referenced by:** badge_scans, leads
* **File:** `E_events/exhibitors.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `exhibitor_id` | string | free text / identifier | 0.0 | Identifier (exhibitor). |
| `event_id` | string | free text / identifier | 0.0 | Foreign key to events. |
| `entity_id` | string | free text / identifier | 0.0 | Foreign key to business_entities. |
| `package_tier` | string | Premium, Shell scheme, Space only, Sponsor | 0.0 | Package tier. |
| `booth_size_sqm` | integer | 9.00 to 200.00 | 0.0 | Booth size sqm. |
| `contract_value_usd` | decimal | 1,340.00 to 179,560.00 | 0.0 | Contract value (USD). |
| `signed_date` | date | 2021-05-03 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Date: signed date. |
| `account_manager_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |

### `visitors`

* **Domain:** E. Exhibitions & Events
* **Description:** Event visitor profiles.
* **Target rows (scale 1.0):** 500,000 | **Rows in this build:** 100,000
* **Primary key:** `visitor_id`
* **Foreign keys:** `company_entity_id` -> business_entities
* **Referenced by:** leads, registrations
* **File:** `E_events/visitors.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `visitor_id` | string | free text / identifier | 0.0 | Identifier (visitor). |
| `first_name` | string | free text / identifier | 0.0 | First name. |
| `last_name` | string | free text / identifier | 0.0 | Last name. |
| `job_title` | string | CEO, Compliance Officer, Consultant, Engineer, Legal Counsel, Librarian, Marketing Manager, Operations Director, Procurement Manager, Product Manager, Researcher, Student | 0.0 | Job title. |
| `company_entity_id` | string | free text / identifier | 35.0 | Foreign key to business_entities. |
| `country` | string | China, Germany, India, Japan, Netherlands, Philippines, United Kingdom, United States | 0.0 | Country. |
| `email_domain_hash` | string | free text / identifier | 0.0 | Email domain hash. |
| `created_at` | timestamp | 2019-10-27 11:11:17 to 2026-09-30 00:00:00 | 0.0 | Timestamp: created. |

### `registrations`

* **Domain:** E. Exhibitions & Events
* **Description:** Visitor registrations per event with attendance.
* **Target rows (scale 1.0):** 700,000 | **Rows in this build:** 131,983
* **Primary key:** `registration_id`
* **Foreign keys:** `visitor_id` -> visitors, `event_id` -> events
* **Referenced by:** badge_scans, event_feedback, session_attendance
* **File:** `E_events/registrations.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `registration_id` | string | free text / identifier | 0.0 | Identifier (registration). |
| `visitor_id` | string | free text / identifier | 0.0 | Foreign key to visitors. |
| `event_id` | string | free text / identifier | 0.0 | Foreign key to events. |
| `registered_at` | timestamp | 2019-10-27 11:11:17 to 2026-09-30 23:55:03 | 0.0 | Timestamp: registered. |
| `ticket_type` | string | Delegate, Press, Student, VIP, Visitor | 0.0 | Ticket type. |
| `attended` | boolean | False, True | 3.5 | Attended. |
| `checked_in_at` | timestamp | 2022-03-28 08:00:02 to 2026-09-14 11:59:01 | 30.6 | Timestamp: checked in. |

### `badge_scans`

* **Domain:** E. Exhibitions & Events
* **Description:** Badge scans at booths/meetings during events.
* **Target rows (scale 1.0):** 2,000,000 | **Rows in this build:** 400,000
* **Primary key:** `scan_id`
* **Foreign keys:** `registration_id` -> registrations, `exhibitor_id` -> exhibitors
* **Referenced by:** leads
* **File:** `E_events/badge_scans.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `scan_id` | string | free text / identifier | 0.0 | Identifier (scan). |
| `registration_id` | string | free text / identifier | 0.0 | Foreign key to registrations. |
| `exhibitor_id` | string | free text / identifier | 0.0 | Foreign key to exhibitors. |
| `scan_ts` | timestamp | 2022-03-28 09:00:12 to 2026-09-17 17:59:46 | 0.0 | Timestamp: scan. |
| `scan_type` | string | Booth visit, Demo, Lead capture, Meeting | 0.0 | Scan type. |

### `leads`

* **Domain:** E. Exhibitions & Events
* **Description:** Exhibitor leads captured at events with score and conversion to customers.
* **Target rows (scale 1.0):** 300,000 | **Rows in this build:** 60,000
* **Primary key:** `lead_id`
* **Foreign keys:** `exhibitor_id` -> exhibitors, `visitor_id` -> visitors, `event_id` -> events, `scan_id` -> badge_scans, `converted_customer_id` -> customers
* **Referenced by:** -
* **File:** `E_events/leads.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `lead_id` | string | free text / identifier | 0.0 | Identifier (lead). |
| `exhibitor_id` | string | free text / identifier | 0.0 | Foreign key to exhibitors. |
| `visitor_id` | string | free text / identifier | 0.0 | Foreign key to visitors. |
| `event_id` | string | free text / identifier | 0.0 | Foreign key to events. |
| `scan_id` | string | free text / identifier | 0.0 | Foreign key to badge_scans. |
| `captured_at` | timestamp | 2022-03-28 09:02:05 to 2026-09-17 17:59:46 | 0.0 | Timestamp: captured. |
| `lead_score` | integer | 0.00 to 100.00 | 0.0 | Exhibitor lead score 0-100. |
| `lead_status` | string | Contacted, Disqualified, New, Opportunity, Qualified, Won | 0.0 | Lead status. |
| `follow_up_at` | timestamp | 2022-03-29 09:38:38 to 2026-09-30 23:32:13 | 0.1 | Timestamp: follow up. |
| `converted_customer_id` | string | free text / identifier | 92.8 | Foreign key to customers. |
| `converted_at` | timestamp | 2022-04-08 16:52:17 to 2026-09-30 21:15:24 | 92.8 | Timestamp: converted. |

### `session_attendance`

* **Domain:** E. Exhibitions & Events
* **Description:** Session check-ins by registered attendees.
* **Target rows (scale 1.0):** 600,000 | **Rows in this build:** 115,953
* **Primary key:** `attendance_id`
* **Foreign keys:** `registration_id` -> registrations, `session_id` -> event_sessions
* **Referenced by:** -
* **File:** `E_events/session_attendance.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `attendance_id` | string | free text / identifier | 0.0 | Identifier (attendance). |
| `registration_id` | string | free text / identifier | 0.0 | Foreign key to registrations. |
| `session_id` | string | free text / identifier | 0.0 | Foreign key to event_sessions. |
| `checked_in_at` | timestamp | 2022-03-28 08:48:02 to 2026-09-17 15:17:48 | 0.0 | Timestamp: checked in. |

### `event_feedback`

* **Domain:** E. Exhibitions & Events
* **Description:** Post-event survey responses (NPS, satisfaction, free-text).
* **Target rows (scale 1.0):** 200,000 | **Rows in this build:** 40,000
* **Primary key:** `feedback_id`
* **Foreign keys:** `registration_id` -> registrations, `event_id` -> events
* **Referenced by:** -
* **File:** `E_events/event_feedback.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `feedback_id` | string | free text / identifier | 0.0 | Identifier (feedback). |
| `registration_id` | string | free text / identifier | 0.0 | Foreign key to registrations. |
| `event_id` | string | free text / identifier | 0.0 | Foreign key to events. |
| `nps` | integer | 0.00 to 10.00 | 0.0 | Nps. |
| `satisfaction` | integer | 1.00 to 5.00 | 0.0 | Satisfaction. |
| `comment` | string | Decent mix of exhibitors, would like more startups., Found two potential suppliers, will come back next year., Good event overall, venue was a bit far., Great networking opportunities and very relevant exhibitors., Queue | 35.1 | Comment. |
| `submitted_at` | timestamp | 2022-03-31 12:02:55 to 2026-09-26 23:22:59 | 0.0 | Timestamp: submitted. |

## F. Customer Service & Support

### `products`

* **Domain:** F. Customer Service & Support
* **Description:** Fictional product catalogue across divisions.
* **Target rows (scale 1.0):** 120 | **Rows in this build:** 120
* **Primary key:** `product_id`
* **Foreign keys:** `division_id` -> divisions
* **Referenced by:** feature_requests, knowledge_articles, product_usage_monthly, subscriptions, support_cases
* **File:** `F_customer/products.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `product_id` | string | free text / identifier | 0.0 | Identifier (product). |
| `product_name` | string | free text / identifier | 0.0 | Product name. |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Foreign key to divisions. |
| `product_line` | string | free text / identifier | 0.0 | Product line. |
| `pricing_model` | string | Annual subscription, Package, Per seat, Per transaction, Usage-based | 0.0 | Pricing model. |
| `launch_date` | date | 2008-01-14 00:00:00 to 2026-02-20 00:00:00 | 0.0 | Date: launch date. |
| `is_ai_enabled` | boolean | False, True | 0.0 | Flag: ai enabled. |
| `list_price_usd` | decimal | 1,500.00 to 84,100.00 | 0.0 | List price (USD). |

### `subscriptions`

* **Domain:** F. Customer Service & Support
* **Description:** Customer subscriptions/contracts per product with value and seats.
* **Target rows (scale 1.0):** 150,000 | **Rows in this build:** 30,000
* **Primary key:** `subscription_id`
* **Foreign keys:** `customer_id` -> customers, `product_id` -> products
* **Referenced by:** churn_events, product_usage_monthly, renewal_opportunities
* **File:** `F_customer/subscriptions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `subscription_id` | string | free text / identifier | 0.0 | Identifier (subscription). |
| `customer_id` | string | free text / identifier | 0.0 | Foreign key to customers. |
| `product_id` | string | free text / identifier | 0.0 | Foreign key to products. |
| `start_date` | date | 2021-01-01 00:00:00 to 2026-08-31 00:00:00 | 0.0 | Date: start date. |
| `end_date` | date | 2021-12-31 00:00:00 to 2029-08-29 00:00:00 | 0.0 | Date: end date. |
| `seats` | integer | 1.00 to 3,270.00 | 0.0 | Seats. |
| `annual_value_usd` | decimal | 150.00 to 874,490.00 | 0.0 | Annual value (USD). |
| `currency` | string | EUR, GBP, JPY, PHP, USD | 0.0 | Currency. |
| `auto_renew` | boolean | False, True | 0.0 | Auto renew. |
| `status` | string | Active, Cancelled, Expired | 0.0 | Lifecycle status of the record. |

### `customers`

* **Domain:** F. Customer Service & Support
* **Description:** Institutional/corporate customer accounts linked to institutions or business entities.
* **Target rows (scale 1.0):** 60,000 | **Rows in this build:** 12,000
* **Primary key:** `customer_id`
* **Foreign keys:** `institution_id` -> institutions, `entity_id` -> business_entities, `primary_division_id` -> divisions, `account_owner_employee_id` -> employees
* **Referenced by:** accounts, churn_events, feature_requests, kyc_cases, leads, product_usage_monthly, renewal_opportunities, subscriptions, support_cases
* **File:** `F_customer/customers.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `customer_id` | string | free text / identifier | 0.0 | Identifier (customer). |
| `segment` | string | Academic, Corporate, Events Client, Financial Institution, Government, Healthcare, Law Firm | 0.0 | Segment. |
| `institution_id` | string | free text / identifier | 69.8 | Foreign key to institutions. |
| `entity_id` | string | free text / identifier | 30.2 | Foreign key to business_entities. |
| `customer_name` | string | free text / identifier | 0.0 | Customer name. |
| `country` | string | free text / identifier | 0.0 | Country. |
| `region` | string | APAC, Americas, EMEA | 0.0 | Region. |
| `primary_division_id` | string | DIV01, DIV02, DIV03, DIV04 | 0.0 | Foreign key to divisions. |
| `tier` | string | Key, Standard, Strategic | 0.0 | Tier. |
| `account_owner_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `created_date` | date | 2012-01-02 00:00:00 to 2026-06-30 00:00:00 | 0.0 | Date: created date. |
| `status` | string | Active, Churned, Prospect | 0.0 | Lifecycle status of the record. |

### `churn_events`

* **Domain:** F. Customer Service & Support
* **Description:** Customer churn events with reason and ARR lost.
* **Target rows (scale 1.0):** 8,000 | **Rows in this build:** 1,600
* **Primary key:** `churn_id`
* **Foreign keys:** `customer_id` -> customers, `primary_subscription_id` -> subscriptions
* **Referenced by:** -
* **File:** `F_customer/churn_events.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `churn_id` | string | free text / identifier | 0.0 | Identifier (churn). |
| `customer_id` | string | free text / identifier | 0.0 | Foreign key to customers. |
| `churn_date` | date | 2023-03-02 00:00:00 to 2026-09-15 00:00:00 | 0.0 | Date: churn date. |
| `primary_subscription_id` | string | free text / identifier | 0.0 | Foreign key to subscriptions. |
| `churn_reason` | string | Budget cuts, Low usage, Merger/acquisition, Moved to competitor, Poor support experience, Product gaps | 0.0 | Churn reason. |
| `arr_lost_usd` | decimal | 720.00 to 4,962,880.00 | 0.0 | Arr lost (USD). |

### `product_usage_monthly`

* **Domain:** F. Customer Service & Support
* **Description:** Monthly product usage per subscription (users, sessions, searches, downloads, API calls).
* **Target rows (scale 1.0):** 3,000,000 | **Rows in this build:** 535,637
* **Primary key:** `usage_id`
* **Foreign keys:** `subscription_id` -> subscriptions, `customer_id` -> customers, `product_id` -> products
* **Referenced by:** -
* **File:** `F_customer/product_usage_monthly.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `usage_id` | string | free text / identifier | 0.0 | Identifier (usage). |
| `subscription_id` | string | free text / identifier | 0.0 | Foreign key to subscriptions. |
| `customer_id` | string | free text / identifier | 0.0 | Foreign key to customers. |
| `product_id` | string | free text / identifier | 0.0 | Foreign key to products. |
| `usage_month` | date | 2021-01-01 00:00:00 to 2026-09-01 00:00:00 | 0.0 | Usage month. |
| `active_users` | integer | 0.00 to 3,435.00 | 0.0 | Active users. |
| `sessions` | integer | 0.00 to 21,656.00 | 0.0 | Sessions. |
| `searches` | integer | 0.00 to 71,314.00 | 0.0 | Searches. |
| `downloads` | integer | 0.00 to 15,236.00 | 0.0 | Downloads. |
| `api_calls` | integer | 0.00 to 1,515,738.00 | 0.0 | Api calls. |

### `support_cases`

* **Domain:** F. Customer Service & Support
* **Description:** Customer support cases with SLA, CSAT, reopen/escalation and cited KB article.
* **Target rows (scale 1.0):** 500,000 | **Rows in this build:** 102,400
* **Primary key:** `case_id`
* **Foreign keys:** `customer_id` -> customers, `product_id` -> products, `division_id` -> divisions, `team_id` -> teams, `agent_employee_id` -> employees, `kb_article_id` -> knowledge_articles
* **Referenced by:** case_interactions, emails, feature_requests
* **File:** `F_customer/support_cases.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `case_id` | string | free text / identifier | 0.0 | Case identifier (in process_event_log: the source record ID, e.g. INV/CS/ALR/MS...). |
| `customer_id` | string | free text / identifier | 0.0 | Foreign key to customers. |
| `product_id` | string | free text / identifier | 0.0 | Foreign key to products. |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04 | 0.0 | Foreign key to divisions. |
| `team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `agent_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `channel` | string | Chat, Email, Phone, Portal, Web form | 0.0 | Channel. |
| `category` | string | Access & Login, Account Administration, Billing & Invoicing, Content Access, Data Feed & API, Event Services, Platform Error, Risk Screening, Search & Results, Training & Onboarding | 0.0 | Category. |
| `subcategory` | string | free text / identifier | 0.0 | Subcategory. |
| `subject` | string | free text / identifier | 0.0 | Subject. |
| `priority` | string | P1, P2, P3, P4 | 0.0 | Priority. |
| `created_at` | timestamp | 2022-01-01 09:56:27 to 2026-09-30 00:00:00 | 0.0 | Timestamp: created. |
| `first_response_at` | timestamp | 2022-01-01 10:07:18 to 2026-09-30 05:40:58 | 0.0 | Timestamp: first response. |
| `resolved_at` | timestamp | 2022-01-01 14:14:08 to 2026-09-30 23:38:45 | 0.1 | Timestamp: resolved. |
| `status` | string | In progress, Open, Pending customer, Resolved | 0.0 | Lifecycle status of the record. |
| `sla_hours` | integer | 4.00 to 72.00 | 0.0 | Sla hours. |
| `sla_met` | boolean | False, True | 0.1 | True if resolved within SLA (null while open). |
| `handle_time_min` | decimal | 1.70 to 98.30 | 0.0 | Agent handling time in minutes. |
| `csat` | decimal | 1.00 to 5.00 | 54.8 | Customer satisfaction score 1-5 (null if no survey response). |
| `reopened` | boolean | False, True | 0.0 | Reopened. |
| `escalated` | boolean | False, True | 0.0 | Escalated. |
| `kb_article_id` | string | free text / identifier | 46.5 | Knowledge article cited in the resolution. |
| `resolution_summary` | string | free text / identifier | 0.1 | Resolution summary. |
| `ai_copilot_used` | boolean | False, True | 0.0 | Ai copilot used. |

### `case_interactions`

* **Domain:** F. Customer Service & Support
* **Description:** Turn-by-turn case conversation (email/chat/call) with generated text and AI-drafted flag.
* **Target rows (scale 1.0):** 2,000,000 | **Rows in this build:** 390,944
* **Primary key:** `interaction_id`
* **Foreign keys:** `case_id` -> support_cases, `employee_id` -> employees
* **Referenced by:** -
* **File:** `F_customer/case_interactions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `interaction_id` | string | free text / identifier | 0.0 | Identifier (interaction). |
| `case_id` | string | free text / identifier | 0.0 | Case identifier (in process_event_log: the source record ID, e.g. INV/CS/ALR/MS...). |
| `sequence_no` | integer | 1.00 to 10.00 | 0.0 | Sequence no. |
| `channel` | string | Chat, Email, Phone, Portal, Web form | 0.0 | Channel. |
| `direction` | string | Inbound, Outbound | 0.0 | Direction. |
| `author_type` | string | Agent, Bot, Customer | 0.0 | Author type. |
| `employee_id` | string | free text / identifier | 56.1 | Foreign key to employees. |
| `interaction_ts` | timestamp | 2022-01-01 09:56:27 to 2026-09-30 23:59:59 | 0.0 | Timestamp: interaction. |
| `message_text` | string | free text / identifier | 0.0 | Message text. |
| `ai_drafted` | boolean | False, True | 0.0 | Ai drafted. |

### `feature_requests`

* **Domain:** F. Customer Service & Support
* **Description:** Customer feature requests with votes and delivery linkage.
* **Target rows (scale 1.0):** 25,000 | **Rows in this build:** 5,000
* **Primary key:** `feature_request_id`
* **Foreign keys:** `customer_id` -> customers, `product_id` -> products, `case_id` -> support_cases, `linked_project_id` -> projects
* **Referenced by:** -
* **File:** `F_customer/feature_requests.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `feature_request_id` | string | free text / identifier | 0.0 | Identifier (feature request). |
| `customer_id` | string | free text / identifier | 0.0 | Foreign key to customers. |
| `product_id` | string | free text / identifier | 0.0 | Foreign key to products. |
| `case_id` | string | free text / identifier | 61.0 | Case identifier (in process_event_log: the source record ID, e.g. INV/CS/ALR/MS...). |
| `submitted_at` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Timestamp: submitted. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `votes` | integer | 0.00 to 110.00 | 0.0 | Votes. |
| `status` | string | Declined, Delivered, New, Planned, Under review | 0.0 | Lifecycle status of the record. |
| `linked_project_id` | string | free text / identifier | 72.5 | Foreign key to projects. |

### `renewal_opportunities`

* **Domain:** F. Customer Service & Support
* **Description:** Renewal pipeline per subscription with forecast and outcome.
* **Target rows (scale 1.0):** 60,000 | **Rows in this build:** 12,000
* **Primary key:** `renewal_opportunity_id`
* **Foreign keys:** `subscription_id` -> subscriptions, `customer_id` -> customers, `owner_employee_id` -> employees
* **Referenced by:** -
* **File:** `F_customer/renewal_opportunities.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `renewal_opportunity_id` | string | free text / identifier | 0.0 | Identifier (renewal opportunity). |
| `subscription_id` | string | free text / identifier | 0.0 | Foreign key to subscriptions. |
| `customer_id` | string | free text / identifier | 0.0 | Foreign key to customers. |
| `renewal_due_date` | date | 2023-01-01 00:00:00 to 2029-08-29 00:00:00 | 0.0 | Date: renewal due date. |
| `forecast_value_usd` | decimal | 380.00 to 812,990.00 | 0.0 | Forecast value (USD). |
| `owner_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `stage` | string | Closed, Engaged, Identified, Negotiation, Proposal | 0.0 | Lifecycle stage. |
| `outcome` | string | Lost, Won, Won - downsell, Won - upsell | 27.1 | Final outcome / result of the record. |

## G. Finance Shared Services

### `cost_centers`

* **Domain:** G. Finance Shared Services
* **Description:** Cost centers per department.
* **Target rows (scale 1.0):** 57 | **Rows in this build:** 57
* **Primary key:** `cost_center_id`
* **Foreign keys:** `department_id` -> departments, `division_id` -> divisions, `site_id` -> sites
* **Referenced by:** invoice_lines, opex_budget_vs_actual, purchase_orders
* **File:** `G_finance/cost_centers.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `cost_center_id` | string | free text / identifier | 0.0 | Identifier (cost center). |
| `department_id` | string | free text / identifier | 0.0 | Foreign key to departments. |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Foreign key to divisions. |
| `cost_center_name` | string | free text / identifier | 0.0 | Cost center name. |
| `site_id` | string | SITE01, SITE02 | 0.0 | Foreign key to sites. |

### `suppliers`

* **Domain:** G. Finance Shared Services
* **Description:** Supplier master linked to business entities.
* **Target rows (scale 1.0):** 12,000 | **Rows in this build:** 2,400
* **Primary key:** `supplier_id`
* **Foreign keys:** `entity_id` -> business_entities
* **Referenced by:** invoices, purchase_orders, supplier_enrollment_requests
* **File:** `G_finance/suppliers.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `supplier_id` | string | free text / identifier | 0.0 | Identifier (supplier). |
| `entity_id` | string | free text / identifier | 0.0 | Foreign key to business_entities. |
| `supplier_name` | string | free text / identifier | 0.0 | Supplier name. |
| `category` | string | Content Vendors, Data Providers, Events Services, Facilities, IT Services, Professional Services, Software, Travel | 0.0 | Category. |
| `country` | string | free text / identifier | 0.0 | Country. |
| `payment_terms_days` | integer | 15.00 to 60.00 | 0.0 | Payment terms days. |
| `risk_tier` | string | High, Low, Medium | 0.0 | Risk tier. |
| `preferred` | boolean | False, True | 0.0 | Preferred. |
| `onboarded_date` | date | 2014-01-08 00:00:00 to 2026-08-31 00:00:00 | 0.0 | Date: onboarded date. |
| `status` | string | Active, Blocked, Inactive | 0.0 | Lifecycle status of the record. |

### `supplier_enrollment_requests`

* **Domain:** G. Finance Shared Services
* **Description:** Supplier enrollment/onboarding requests with document checks and turnaround.
* **Target rows (scale 1.0):** 15,000 | **Rows in this build:** 3,000
* **Primary key:** `enrollment_request_id`
* **Foreign keys:** `supplier_id` -> suppliers, `requested_by_employee_id` -> employees
* **Referenced by:** -
* **File:** `G_finance/supplier_enrollment_requests.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `enrollment_request_id` | string | free text / identifier | 0.0 | Identifier (enrollment request). |
| `supplier_id` | string | free text / identifier | 0.0 | Foreign key to suppliers. |
| `requested_by_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `submitted_at` | timestamp | 2013-11-29 12:14:00 to 2026-08-24 06:22:12 | 0.0 | Timestamp: submitted. |
| `documents_complete_first_pass` | boolean | False, True | 0.0 | Documents complete first pass. |
| `tax_document_ok` | boolean | False, True | 0.0 | Tax document ok. |
| `bank_details_ok` | boolean | False, True | 0.0 | Bank details ok. |
| `sanctions_screen_ok` | boolean | False, True | 0.0 | Sanctions screen ok. |
| `turnaround_days` | decimal | 1.10 to 131.30 | 0.0 | Turnaround days. |
| `decided_at` | timestamp | 2013-12-12 05:45:29 to 2026-09-11 14:10:41 | 0.0 | Timestamp: decided. |
| `status` | string | Approved, Approved - update, Approved after remediation, Pending, Rejected - duplicate | 0.0 | Lifecycle status of the record. |

### `purchase_orders`

* **Domain:** G. Finance Shared Services
* **Description:** Purchase orders per supplier and cost center.
* **Target rows (scale 1.0):** 200,000 | **Rows in this build:** 40,000
* **Primary key:** `po_id`
* **Foreign keys:** `supplier_id` -> suppliers, `cost_center_id` -> cost_centers, `requester_employee_id` -> employees, `approver_employee_id` -> employees
* **Referenced by:** invoices
* **File:** `G_finance/purchase_orders.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `po_id` | string | free text / identifier | 0.0 | Identifier (po). |
| `supplier_id` | string | free text / identifier | 0.0 | Foreign key to suppliers. |
| `cost_center_id` | string | free text / identifier | 0.0 | Foreign key to cost_centers. |
| `requester_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `approver_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `po_date` | date | 2022-01-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Date: po date. |
| `currency` | string | EUR, GBP, JPY, PHP, USD | 0.0 | Currency. |
| `po_amount` | decimal | 63.79 to 28,372,433.29 | 0.0 | Po amount. |
| `status` | string | Cancelled, Closed, Open, Partially invoiced | 0.0 | Lifecycle status of the record. |

### `invoices`

* **Domain:** G. Finance Shared Services
* **Description:** Supplier invoices with amounts (reconcile to lines), approval level and status.
* **Target rows (scale 1.0):** 600,000 | **Rows in this build:** 120,000
* **Primary key:** `invoice_id`
* **Foreign keys:** `supplier_id` -> suppliers, `po_id` -> purchase_orders, `processor_employee_id` -> employees
* **Referenced by:** invoice_exceptions, invoice_lines, payments
* **File:** `G_finance/invoices.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `invoice_id` | string | free text / identifier | 0.0 | Identifier (invoice). |
| `supplier_id` | string | free text / identifier | 0.0 | Foreign key to suppliers. |
| `po_id` | string | free text / identifier | 6.1 | Foreign key to purchase_orders. |
| `currency` | string | EUR, GBP, JPY, PHP, USD | 0.0 | Currency. |
| `invoice_date` | date | 2022-01-04 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Date: invoice date. |
| `net_amount` | decimal | 13.76 to 33,194,927.24 | 0.0 | Net amount. |
| `tax_amount` | decimal | 0.00 to 4,063,982.02 | 0.0 | Tax amount. |
| `gross_amount` | decimal | 16.51 to 34,854,673.60 | 0.0 | Gross amount. |
| `amount_usd` | decimal | 14.27 to 399,411.28 | 0.0 | Amount converted to USD at a fixed synthetic FX rate. |
| `invoice_number` | string | free text / identifier | 0.0 | Invoice number. |
| `received_at` | timestamp | 2022-01-07 00:23:09 to 2026-09-30 23:59:59 | 0.0 | Timestamp: received. |
| `due_date` | date | 2022-01-27 00:00:00 to 2026-11-29 00:00:00 | 0.0 | Date: due date. |
| `approval_level` | string | L1 - Team Lead, L2 - Manager, L3 - Director | 0.0 | Approval authority required by amount: L1 < 10k USD, L2 < 50k USD, L3 >= 50k USD. |
| `channel` | string | EDI, Email, Supplier portal | 0.0 | Channel. |
| `ocr_confidence` | decimal | 0.56 to 1.00 | 44.7 | OCR/IDP extraction confidence for emailed invoices. |
| `processor_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `status` | string | Approved, On hold - exception, Paid | 0.0 | Lifecycle status of the record. |

### `invoice_lines`

* **Domain:** G. Finance Shared Services
* **Description:** Invoice line items (sum of line_amount = invoices.net_amount).
* **Target rows (scale 1.0):** 2,000,000 | **Rows in this build:** 406,814
* **Primary key:** `invoice_line_id`
* **Foreign keys:** `invoice_id` -> invoices, `cost_center_id` -> cost_centers
* **Referenced by:** -
* **File:** `G_finance/invoice_lines.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `invoice_line_id` | string | free text / identifier | 0.0 | Identifier (invoice line). |
| `invoice_id` | string | free text / identifier | 0.0 | Foreign key to invoices. |
| `line_no` | integer | 1.00 to 20.00 | 0.0 | Line no. |
| `description` | string | Consulting services, Copyediting & typesetting, Data subscription, Event services, Facility maintenance, Licence renewal, Travel & accommodation | 0.0 | Description. |
| `quantity` | decimal | 0.00 to 75.00 | 0.0 | Quantity. |
| `unit_price` | decimal | 0.00 to 8,184,163.44 | 0.0 | Unit price. |
| `line_amount` | decimal | 0.00 to 26,672,317.20 | 0.0 | Line amount. |
| `gl_account` | string | 6100 Software, 6200 Professional fees, 6300 Facilities, 6400 Content services, 6500 Travel, 6600 Events, 6700 Data purchases | 0.0 | Gl account. |
| `cost_center_id` | string | free text / identifier | 0.0 | Foreign key to cost_centers. |

### `invoice_exceptions`

* **Domain:** G. Finance Shared Services
* **Description:** AP exceptions (price mismatch, missing PO, duplicate, tax...) with resolution time.
* **Target rows (scale 1.0):** 90,000 | **Rows in this build:** 23,400
* **Primary key:** `exception_id`
* **Foreign keys:** `invoice_id` -> invoices, `resolver_employee_id` -> employees
* **Referenced by:** -
* **File:** `G_finance/invoice_exceptions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `exception_id` | string | free text / identifier | 0.0 | Identifier (exception). |
| `invoice_id` | string | free text / identifier | 0.0 | Foreign key to invoices. |
| `exception_type` | string | Bank details changed, Duplicate suspected, Missing PO, Missing goods receipt, Price mismatch, Quantity mismatch, Tax error | 0.0 | Exception type. |
| `raised_at` | timestamp | 2022-01-08 05:36:41 to 2026-09-30 23:59:59 | 0.0 | Timestamp: raised. |
| `resolved_at` | timestamp | 2022-01-09 14:19:40 to 2026-09-30 23:58:01 | 5.4 | Timestamp: resolved. |
| `resolver_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `resolution` | string | Approved by budget owner, Corrected and approved, Credit note requested, PO amended, Rejected to supplier | 5.4 | Resolution. |

### `payments`

* **Domain:** G. Finance Shared Services
* **Description:** Payments executed against approved invoices.
* **Target rows (scale 1.0):** 550,000 | **Rows in this build:** 107,249
* **Primary key:** `payment_id`
* **Foreign keys:** `invoice_id` -> invoices
* **Referenced by:** -
* **File:** `G_finance/payments.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `payment_id` | string | free text / identifier | 0.0 | Identifier (payment). |
| `invoice_id` | string | free text / identifier | 0.0 | Foreign key to invoices. |
| `paid_at` | timestamp | 2022-01-25 10:00:00 to 2026-09-30 10:00:00 | 0.0 | Timestamp: paid. |
| `amount` | decimal | 16.51 to 34,854,673.60 | 0.0 | Amount. |
| `currency` | string | EUR, GBP, JPY, PHP, USD | 0.0 | Currency. |
| `method` | string | Bank transfer, Check, Virtual card, Wire | 0.0 | Method. |
| `payment_run_id` | string | free text / identifier | 0.0 | Identifier (payment run). |
| `days_vs_due` | integer | -26.00 to 26.00 | 0.0 | Days vs due. |

### `opex_budget_vs_actual`

* **Domain:** G. Finance Shared Services
* **Description:** Monthly OPEX budget vs actual per cost center (PHP).
* **Target rows (scale 1.0):** 3,249 | **Rows in this build:** 3,249
* **Primary key:** `opex_row_id`
* **Foreign keys:** `cost_center_id` -> cost_centers, `division_id` -> divisions
* **Referenced by:** -
* **File:** `G_finance/opex_budget_vs_actual.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `opex_row_id` | string | free text / identifier | 0.0 | Identifier (opex row). |
| `cost_center_id` | string | free text / identifier | 0.0 | Foreign key to cost_centers. |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Foreign key to divisions. |
| `month` | date | 2022-01-01 00:00:00 to 2026-09-01 00:00:00 | 0.0 | Month. |
| `budget_php` | decimal | 755,000.00 to 14,592,000.00 | 0.0 | Budget (PHP). |
| `actual_php` | decimal | 688,000.00 to 16,252,000.00 | 0.0 | Actual (PHP). |
| `variance_php` | decimal | -2,010,000.00 to 2,378,000.00 | 0.0 | Variance (PHP). |
| `variance_pct` | decimal | -22.87 to 24.07 | 0.0 | Variance (%). |

## H. Technology & IT Operations

### `applications`

* **Domain:** H. Technology & IT Operations
* **Description:** Application portfolio (fictional names) with criticality, hosting and stack.
* **Target rows (scale 1.0):** 450 | **Rows in this build:** 450
* **Primary key:** `app_id`
* **Foreign keys:** `division_id` -> divisions, `owner_team_id` -> teams
* **Referenced by:** access_requests, changes, incidents, it_tickets, knowledge_articles, problems, process_event_log, system_events
* **File:** `H_technology/applications.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `app_id` | string | free text / identifier | 0.0 | Identifier (app). |
| `app_name` | string | free text / identifier | 0.0 | App name. |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Foreign key to divisions. |
| `owner_team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `purpose` | string | free text / identifier | 0.0 | Purpose. |
| `criticality` | string | Tier 1, Tier 2, Tier 3 | 0.0 | Criticality. |
| `hosting` | string | AWS, Azure, On-premises, SaaS | 0.0 | Hosting. |
| `tech_stack` | string | .NET, Go, Java/Spring, Low-code (Power Platform), Node.js/React, Python/FastAPI, RPA, Vendor SaaS | 0.0 | Tech stack. |
| `data_classification` | string | Confidential, Internal, Public, Restricted | 0.0 | Data classification. |
| `go_live_date` | date | 2014-01-17 00:00:00 to 2026-06-29 00:00:00 | 0.0 | Date: go live date. |

### `changes`

* **Domain:** H. Technology & IT Operations
* **Description:** ITIL change records with approval, implementation and outcome.
* **Target rows (scale 1.0):** 40,000 | **Rows in this build:** 8,000
* **Primary key:** `change_id`
* **Foreign keys:** `app_id` -> applications, `requested_by_employee_id` -> employees
* **Referenced by:** incidents
* **File:** `H_technology/changes.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `change_id` | string | free text / identifier | 0.0 | Identifier (change). |
| `app_id` | string | free text / identifier | 0.0 | Foreign key to applications. |
| `change_type` | string | Emergency, Normal, Standard | 0.0 | Change type. |
| `requested_by_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `requested_at` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Timestamp: requested. |
| `approved_at` | timestamp | 2022-01-01 23:40:05 to 2026-09-30 21:05:29 | 0.1 | Timestamp: approved. |
| `implemented_at` | timestamp | 2022-01-03 07:45:15 to 2026-09-30 23:22:26 | 0.3 | Timestamp: implemented. |
| `risk_level` | string | High, Low, Medium | 0.0 | Risk level. |
| `outcome` | string | Failed, Pending approval, Rolled back, Scheduled, Successful, Successful with issues | 0.0 | Final outcome / result of the record. |

### `problems`

* **Domain:** H. Technology & IT Operations
* **Description:** Problem records holding root causes for incidents.
* **Target rows (scale 1.0):** 4,000 | **Rows in this build:** 800
* **Primary key:** `problem_id`
* **Foreign keys:** `app_id` -> applications
* **Referenced by:** incidents
* **File:** `H_technology/problems.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `problem_id` | string | free text / identifier | 0.0 | Identifier (problem). |
| `app_id` | string | free text / identifier | 0.0 | Foreign key to applications. |
| `root_cause_category` | string | Capacity, Configuration error, Data issue, Failed change, Network, Software defect, Third-party outage | 0.0 | Root cause category. |
| `root_cause_summary` | string | Database connection pool exhausted at peak, Deployment introduced regression, Expired certificate / misconfigured SSO, Intermittent packet loss on VPN, Malformed upstream feed file, Null handling bug in batch job, Vendor | 0.0 | Root cause summary. |
| `opened_at` | timestamp | 2022-01-03 12:13:39 to 2026-09-29 10:52:14 | 0.0 | Timestamp: opened. |
| `closed_at` | timestamp | 2022-01-12 14:01:00 to 2026-09-27 16:35:59 | 1.5 | Timestamp: closed. |
| `known_error` | boolean | False, True | 0.0 | Known error. |

### `it_tickets`

* **Domain:** H. Technology & IT Operations
* **Description:** IT service management tickets with SLA, resolution notes and cited KB.
* **Target rows (scale 1.0):** 300,000 | **Rows in this build:** 60,000
* **Primary key:** `ticket_id`
* **Foreign keys:** `app_id` -> applications, `requester_employee_id` -> employees, `assignment_group_team_id` -> teams, `assignee_employee_id` -> employees, `kb_article_id` -> knowledge_articles
* **Referenced by:** incidents
* **File:** `H_technology/it_tickets.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `ticket_id` | string | free text / identifier | 0.0 | Identifier (ticket). |
| `ticket_type` | string | Access, Change Request, Incident, Question, Service Request | 0.0 | Ticket type. |
| `app_id` | string | free text / identifier | 0.0 | Foreign key to applications. |
| `requester_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `assignment_group_team_id` | string | TM0034, TM0035, TM0036, TM0037, TM0043 | 0.0 | Foreign key to teams. |
| `assignee_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `priority` | string | P1, P2, P3, P4 | 0.0 | Priority. |
| `created_at` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Timestamp: created. |
| `category` | string | Access request, Data request, Error message, Hardware, How-to, Login / SSO, Performance, Software install | 0.0 | Category. |
| `short_description` | string | free text / identifier | 0.0 | Short description. |
| `sla_hours` | integer | 4.00 to 72.00 | 0.0 | Sla hours. |
| `resolved_at` | timestamp | 2022-01-01 03:12:59 to 2026-09-30 22:39:17 | 0.1 | Timestamp: resolved. |
| `status` | string | In Progress, New, Pending user, Resolved | 0.0 | Lifecycle status of the record. |
| `sla_met` | boolean | False, True | 0.1 | True if resolved within SLA (null while open). |
| `kb_article_id` | string | free text / identifier | 55.2 | Knowledge article cited in the resolution. |
| `resolution_notes` | string | free text / identifier | 0.1 | Resolution notes. |
| `reopened` | boolean | False, True | 0.0 | Reopened. |

### `incidents`

* **Domain:** H. Technology & IT Operations
* **Description:** Major/minor incidents with root-cause (problem) and causing change links.
* **Target rows (scale 1.0):** 25,000 | **Rows in this build:** 5,000
* **Primary key:** `incident_id`
* **Foreign keys:** `ticket_id` -> it_tickets, `app_id` -> applications, `caused_by_change_id` -> changes, `problem_id` -> problems
* **Referenced by:** -
* **File:** `H_technology/incidents.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `incident_id` | string | free text / identifier | 0.0 | Identifier (incident). |
| `ticket_id` | string | free text / identifier | 0.0 | Foreign key to it_tickets. |
| `app_id` | string | free text / identifier | 0.0 | Foreign key to applications. |
| `severity` | string | Sev1, Sev2, Sev3, Sev4 | 0.0 | Severity. |
| `started_at` | timestamp | 2021-12-31 22:00:29 to 2026-09-29 23:22:44 | 0.0 | Timestamp: started. |
| `detected_at` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Timestamp: detected. |
| `resolved_at` | timestamp | 2022-01-01 03:12:59 to 2026-09-30 09:31:24 | 0.0 | Timestamp: resolved. |
| `impacted_users` | integer | 1.00 to 8,894.00 | 0.0 | Impacted users. |
| `caused_by_change_id` | string | free text / identifier | 73.6 | Foreign key to changes. |
| `problem_id` | string | free text / identifier | 49.9 | Foreign key to problems. |

### `access_requests`

* **Domain:** H. Technology & IT Operations
* **Description:** Access and data-access requests with end-to-end turnaround.
* **Target rows (scale 1.0):** 50,000 | **Rows in this build:** 10,000
* **Primary key:** `access_request_id`
* **Foreign keys:** `requester_employee_id` -> employees, `app_id` -> applications
* **Referenced by:** access_request_approvals
* **File:** `H_technology/access_requests.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `access_request_id` | string | free text / identifier | 0.0 | Identifier (access request). |
| `requester_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `app_id` | string | free text / identifier | 0.0 | Foreign key to applications. |
| `access_type` | string | Data Access - Analytics, Data Access - PII, Elevated, Standard | 0.0 | Access type. |
| `justification` | string | Data extract for AI pilot analysis, Data extract for Daybreak analysis, Data extract for EnSightful-like analytics analysis, Data extract for PIP analysis, Data extract for audit analysis, Data extract for month-end anal | 0.0 | Justification. |
| `requested_at` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Timestamp: requested. |
| `completed_at` | timestamp | 2022-01-01 06:54:45 to 2026-09-30 23:10:12 | 0.2 | Timestamp: completed. |
| `status` | string | Completed, Pending, Rejected | 0.0 | Lifecycle status of the record. |
| `turnaround_hours` | decimal | 0.70 to 1,854.80 | 0.2 | Turnaround hours. |

### `access_request_approvals`

* **Domain:** H. Technology & IT Operations
* **Description:** Approval steps per access request (manager, data owner, privacy, InfoSec, provisioning).
* **Target rows (scale 1.0):** 27,590 | **Rows in this build:** 27,590
* **Primary key:** `approval_id`
* **Foreign keys:** `access_request_id` -> access_requests, `approver_employee_id` -> employees
* **Referenced by:** -
* **File:** `H_technology/access_request_approvals.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `approval_id` | string | free text / identifier | 0.0 | Identifier (approval). |
| `access_request_id` | string | free text / identifier | 0.0 | Foreign key to access_requests. |
| `step_no` | integer | 1.00 to 5.00 | 0.0 | Step no. |
| `approval_step` | string | Data Owner, InfoSec, Manager, Privacy, Provisioning | 0.0 | Approval step. |
| `approver_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `assigned_at` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 23:46:18 | 0.0 | Timestamp: assigned. |
| `decided_at` | timestamp | 2022-01-01 03:32:05 to 2026-09-30 23:46:18 | 0.1 | Timestamp: decided. |
| `decision` | string | Approved, Pending, Rejected | 0.0 | Decision. |

### `system_events`

* **Domain:** H. Technology & IT Operations
* **Description:** Application telemetry/log events (WARN/ERROR spikes precede incidents).
* **Target rows (scale 1.0):** 5,000,000 | **Rows in this build:** 999,991
* **Primary key:** `system_event_id`
* **Foreign keys:** `app_id` -> applications, `user_employee_id` -> employees
* **Referenced by:** -
* **File:** `H_technology/system_events.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `system_event_id` | string | free text / identifier | 0.0 | Identifier (system event). |
| `app_id` | string | free text / identifier | 0.0 | Foreign key to applications. |
| `event_ts` | timestamp | 2022-01-01 06:45:01 to 2026-09-30 00:00:00 | 0.0 | Event timestamp (process-mining 'time:timestamp'). |
| `event_type` | string | api_call, auth, db_query, job_run, request | 0.0 | Event type. |
| `severity` | string | ERROR, INFO, WARN | 0.0 | Severity. |
| `latency_ms` | integer | 17.00 to 25,369.00 | 0.0 | Latency ms. |
| `error_code` | string | DB_TIMEOUT, E401, E429, E500, E503, OOM | 96.3 | Error code. |
| `host` | string | free text / identifier | 0.0 | Host. |
| `user_employee_id` | string | free text / identifier | 80.0 | Foreign key to employees. |

## I. Process Intelligence (Process Mining)

### `process_definitions`

* **Domain:** I. Process Intelligence (Process Mining)
* **Description:** Business process catalogue; core processes have event logs in process_event_log.
* **Target rows (scale 1.0):** 40 | **Rows in this build:** 40
* **Primary key:** `process_id`
* **Foreign keys:** `division_id` -> divisions, `owner_department_id` -> departments
* **Referenced by:** ai_use_cases, automation_candidates, process_activities, process_event_log, sops
* **File:** `I_process/process_definitions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `process_id` | string | free text / identifier | 0.0 | Identifier (process). |
| `process_name` | string | free text / identifier | 0.0 | Process name. |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Foreign key to divisions. |
| `owner_department_id` | string | free text / identifier | 0.0 | Foreign key to departments. |
| `source_table` | string | access_requests, invoices, it_tickets, kyc_cases, manuscripts, risk_alerts, supplier_enrollment_requests, support_cases | 80.0 | Source table. |
| `sla_hours` | integer | 24.00 to 1,440.00 | 0.0 | Sla hours. |
| `has_event_log` | boolean | False, True | 0.0 | Flag: event log. |
| `standard_path` | string | Alert generated > Alert triaged > Gather entity data > Screen watchlists > Analyst review > Escalate to investigation > Disposition recorded, Case created > Case categorised > Assigned to agent > First response sent > In | 0.0 | Standard path. |

### `process_activities`

* **Domain:** I. Process Intelligence (Process Mining)
* **Description:** Standard activities per process with manual flag, rule-based share and effort.
* **Target rows (scale 1.0):** 255 | **Rows in this build:** 255
* **Primary key:** `activity_id`
* **Foreign keys:** `process_id` -> process_definitions
* **Referenced by:** automation_candidates, process_event_log
* **File:** `I_process/process_activities.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `activity_id` | string | free text / identifier | 0.0 | Identifier (activity). |
| `process_id` | string | free text / identifier | 0.0 | Foreign key to process_definitions. |
| `activity_name` | string | free text / identifier | 0.0 | Activity name. |
| `standard_sequence` | integer | 1.00 to 10.00 | 0.0 | Standard sequence. |
| `is_manual` | boolean | False, True | 0.0 | Flag: manual. |
| `rule_based_pct` | integer | 15.00 to 100.00 | 0.0 | Rule based (%). |
| `standard_effort_min` | integer | 0.00 to 39.00 | 0.0 | Standard effort min (minutes). |

### `process_event_log`

* **Domain:** I. Process Intelligence (Process Mining)
* **Description:** Process-mining event log (case_id, activity, timestamp, resource) across 8 core processes.
* **Target rows (scale 1.0):** 8,000,000 | **Rows in this build:** 1,670,158
* **Primary key:** `event_id`
* **Foreign keys:** `process_id` -> process_definitions, `activity_id` -> process_activities, `resource_employee_id` -> employees, `system_app_id` -> applications
* **Referenced by:** -
* **File:** `I_process/process_event_log.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `event_id` | string | free text / identifier | 0.0 | Identifier (event). |
| `case_id` | string | free text / identifier | 0.0 | Case identifier (in process_event_log: the source record ID, e.g. INV/CS/ALR/MS...). |
| `process_id` | string | PRC001, PRC002, PRC003, PRC004, PRC005, PRC006, PRC007, PRC008 | 0.0 | Foreign key to process_definitions. |
| `activity` | string | free text / identifier | 0.0 | Process activity name (process-mining 'concept:name'). |
| `activity_id` | string | free text / identifier | 4.6 | Foreign key to process_activities. |
| `event_ts` | timestamp | 2013-12-17 08:02:08 to 2026-09-30 23:59:59 | 0.0 | Event timestamp (process-mining 'time:timestamp'). |
| `resource_employee_id` | string | free text / identifier | 0.0 | Employee who performed the activity (process-mining 'org:resource'). |
| `system_app_id` | string | APP0001, APP0006, APP0007, APP0010, APP0011, APP0012, APP0013 | 0.0 | Foreign key to applications. |
| `cost_php` | decimal | 0.00 to 911.75 | 0.0 | Cost (PHP). |
| `lifecycle` | string | complete | 0.0 | Lifecycle. |

### `automation_candidates`

* **Domain:** I. Process Intelligence (Process Mining)
* **Description:** 2023 automation opportunity survey (activity-level volume, effort, rule-based %, exception rate).
* **Target rows (scale 1.0):** 18 | **Rows in this build:** 18
* **Primary key:** `candidate_id`
* **Foreign keys:** `process_id` -> process_definitions, `activity_id` -> process_activities
* **Referenced by:** -
* **File:** `I_process/automation_candidates.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `candidate_id` | string | free text / identifier | 0.0 | Identifier (candidate). |
| `process_id` | string | PRC001, PRC002, PRC004, PRC005, PRC006, PRC007, PRC008 | 0.0 | Foreign key to process_definitions. |
| `activity_id` | string | free text / identifier | 0.0 | Foreign key to process_activities. |
| `activity_name` | string | free text / identifier | 0.0 | Activity name. |
| `annual_volume_2023` | integer | 245.00 to 25,501.00 | 0.0 | Annual volume 2023. |
| `avg_effort_min` | integer | 1.00 to 20.00 | 0.0 | Avg effort min (minutes). |
| `annual_hours` | decimal | 21.00 to 2,975.00 | 0.0 | Annual hours. |
| `rule_based_pct` | integer | 60.00 to 95.00 | 0.0 | Rule based (%). |
| `exception_rate_pct` | decimal | 2.00 to 39.00 | 0.0 | Exception rate (%). |
| `automation_score` | decimal | 24.90 to 61.50 | 0.0 | Automation score. |
| `recommended_approach` | string | IDP + human review, RPA / rules engine | 0.0 | Recommended approach. |
| `survey_date` | date | 2023-12-15 00:00:00 to 2023-12-15 00:00:00 | 0.0 | Date: survey date. |

## J. AI, Automation & Transformation Portfolio

### `ai_models`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** AI/ML model registry (fictional names).
* **Target rows (scale 1.0):** 150 | **Rows in this build:** 150
* **Primary key:** `model_id`
* **Foreign keys:** `owner_team_id` -> teams
* **Referenced by:** ai_usage_events, ai_use_cases, alert_rules, editorial_tasks, model_versions
* **File:** `J_ai_portfolio/ai_models.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `model_id` | string | free text / identifier | 0.0 | Identifier (model). |
| `model_type` | string | Anomaly Detection, Classifier, Embedding, Entity Resolution, Forecasting, LLM, NER, OCR/IDP, Ranking | 0.0 | Model type. |
| `model_name` | string | free text / identifier | 0.0 | Model name. |
| `provider` | string | In-house, Open-source, Open-weights (self-hosted), Vendor A (hosted LLM), Vendor B (hosted LLM), Vendor C | 0.0 | Provider. |
| `hosting` | string | AWS Bedrock-style managed, AWS ECS, AWS SageMaker-style, Vendor API | 0.0 | Hosting. |
| `owner_team_id` | string | TM0040, TM0051 | 0.0 | Foreign key to teams. |
| `risk_classification` | string | High, Low, Medium | 0.0 | Risk classification. |
| `created_date` | date | 2022-06-16 00:00:00 to 2026-06-26 00:00:00 | 0.0 | Date: created date. |

### `model_versions`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** Model version history with evaluation metrics.
* **Target rows (scale 1.0):** 345 | **Rows in this build:** 345
* **Primary key:** `model_version_id`
* **Foreign keys:** `model_id` -> ai_models
* **Referenced by:** -
* **File:** `J_ai_portfolio/model_versions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `model_version_id` | string | free text / identifier | 0.0 | Identifier (model version). |
| `model_id` | string | free text / identifier | 0.0 | Foreign key to ai_models. |
| `version` | string | v1.0, v2.0, v3.0, v4.0 | 0.0 | Version. |
| `released_date` | date | 2022-08-01 00:00:00 to 2026-09-29 00:00:00 | 0.0 | Date: released date. |
| `eval_accuracy` | decimal | 0.72 to 0.99 | 0.0 | Eval accuracy. |
| `eval_hallucination_rate` | decimal | 0.01 to 0.12 | 71.9 | Eval hallucination rate. |
| `status` | string | Production, Retired, Staging | 0.0 | Lifecycle status of the record. |

### `ai_use_cases`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** AI & automation use-case portfolio with stage gates and expected vs realised value.
* **Target rows (scale 1.0):** 600 | **Rows in this build:** 600
* **Primary key:** `use_case_id`
* **Foreign keys:** `division_id` -> divisions, `process_id` -> process_definitions, `owner_team_id` -> teams, `sponsor_employee_id` -> employees, `product_owner_employee_id` -> employees, `model_id` -> ai_models
* **Referenced by:** ai_governance_reviews, ai_usage_events, ai_use_case_kpis, innovation_ideas, projects, prompts_library
* **File:** `J_ai_portfolio/ai_use_cases.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `use_case_id` | string | free text / identifier | 0.0 | Identifier (use case). |
| `use_case_name` | string | free text / identifier | 0.0 | Use case name. |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Foreign key to divisions. |
| `process_id` | string | free text / identifier | 0.0 | Foreign key to process_definitions. |
| `archetype` | string | Agent, Analytics, Copilot, ML Model, RAG Assistant, RPA | 0.0 | Archetype. |
| `stage` | string | Idea, Pilot, PoC, Retired, Scaled | 0.0 | Lifecycle stage. |
| `primary_kpi` | string | Average handling time (min), Backlog, CSAT, Classification minutes per document, Cost per transaction, Error rate, Exception resolution hours, False positive rate, Handling time, Integrity cases detected pre-publication, | 0.0 | Primary kpi. |
| `owner_team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `sponsor_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `product_owner_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `model_id` | string | free text / identifier | 29.7 | Foreign key to ai_models. |
| `idea_date` | date | 2022-03-09 00:00:00 to 2026-07-31 00:00:00 | 0.0 | Date: idea date. |
| `poc_date` | date | 2022-04-22 00:00:00 to 2026-09-28 00:00:00 | 33.8 | Date: poc date. |
| `pilot_date` | date | 2022-08-17 00:00:00 to 2026-09-29 00:00:00 | 61.0 | Date: pilot date. |
| `scaled_date` | date | 2022-11-07 00:00:00 to 2026-09-20 00:00:00 | 79.3 | Date: scaled date. |
| `retired_date` | date | 2023-02-23 00:00:00 to 2027-02-26 00:00:00 | 92.3 | Date: retired date. |
| `expected_annual_value_usd` | decimal | 11,000.00 to 3,602,000.00 | 0.0 | Business-case annual value (USD). |
| `realized_annual_value_usd` | decimal | 0.00 to 1,034,000.00 | 0.0 | Annualised value realised so far (USD). |
| `hours_saved_annual` | decimal | 0.00 to 57,444.00 | 0.0 | Hours saved annual. |
| `fte_capacity_released` | decimal | 0.00 to 32.60 | 0.0 | Full-time-equivalent capacity released by the solution. |

### `ai_use_case_kpis`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** Baseline vs current KPI per use case (as reported by owners).
* **Target rows (scale 1.0):** 600 | **Rows in this build:** 600
* **Primary key:** `kpi_id`
* **Foreign keys:** `use_case_id` -> ai_use_cases
* **Referenced by:** -
* **File:** `J_ai_portfolio/ai_use_case_kpis.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `kpi_id` | string | free text / identifier | 0.0 | Identifier (kpi). |
| `use_case_id` | string | free text / identifier | 0.0 | Foreign key to ai_use_cases. |
| `kpi_name` | string | Average handling time (min), Backlog, CSAT, Classification minutes per document, Cost per transaction, Error rate, Exception resolution hours, False positive rate, Handling time, Integrity cases detected pre-publication, | 0.0 | Kpi name. |
| `baseline_value` | decimal | 4.15 to 222.80 | 0.0 | Baseline value. |
| `current_value` | decimal | 4.97 to 209.38 | 33.0 | Current value. |
| `measured_date` | date | 2025-01-02 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Date: measured date. |

### `ai_governance_reviews`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** AI governance reviews (PIA, threat model, TPR, Secure-by-Design).
* **Target rows (scale 1.0):** 3,000 | **Rows in this build:** 600
* **Primary key:** `review_id`
* **Foreign keys:** `use_case_id` -> ai_use_cases, `reviewer_employee_id` -> employees
* **Referenced by:** -
* **File:** `J_ai_portfolio/ai_governance_reviews.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `review_id` | string | free text / identifier | 0.0 | Identifier (review). |
| `use_case_id` | string | free text / identifier | 0.0 | Foreign key to ai_use_cases. |
| `review_type` | string | Data Protection Review, Model Risk Review, Privacy Impact Assessment, Secure-by-Design Review, Third-Party Risk Review, Threat Model | 0.0 | Review type. |
| `reviewer_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `submitted_at` | timestamp | 2023-01-02 09:23:10 to 2026-09-20 00:00:00 | 0.0 | Timestamp: submitted. |
| `completed_at` | timestamp | 2023-01-14 17:25:27 to 2026-09-30 20:36:48 | 0.7 | Timestamp: completed. |
| `status` | string | Approved, Approved with conditions, In Review, Rejected, Returned for info | 0.0 | Lifecycle status of the record. |
| `findings_count` | integer | 0.00 to 10.00 | 0.0 | Count of findings. |
| `high_findings` | integer | 0.00 to 4.00 | 0.0 | High findings. |

### `projects`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** Project portfolio (AI delivery, automation, platform, BAU).
* **Target rows (scale 1.0):** 20,000 | **Rows in this build:** 4,000
* **Primary key:** `project_id`
* **Foreign keys:** `use_case_id` -> ai_use_cases, `owner_team_id` -> teams, `division_id` -> divisions, `pm_employee_id` -> employees
* **Referenced by:** chat_channels, documents, feature_requests, meetings, milestones, project_members, project_risks, project_tasks
* **File:** `J_ai_portfolio/projects.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `project_id` | string | free text / identifier | 0.0 | Identifier (project). |
| `project_type` | string | AI Use Case Delivery, Automation, BAU Enhancement, Client Implementation, Data Migration, Platform, Process Improvement | 0.0 | Project type. |
| `use_case_id` | string | free text / identifier | 72.3 | Foreign key to ai_use_cases. |
| `owner_team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Foreign key to divisions. |
| `pm_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `project_name` | string | free text / identifier | 0.0 | Project name. |
| `start_date` | date | 2022-01-01 00:00:00 to 2026-08-31 00:00:00 | 0.0 | Date: start date. |
| `planned_end_date` | date | 2022-02-06 00:00:00 to 2028-06-01 00:00:00 | 0.0 | Date: planned end date. |
| `actual_end_date` | date | 2022-02-06 00:00:00 to 2026-09-30 00:00:00 | 7.8 | Date: actual end date. |
| `status` | string | Closed - Cancelled, Completed, In Progress, On Hold | 0.0 | Lifecycle status of the record. |
| `budget_usd` | decimal | 1,600.00 to 1,112,300.00 | 0.0 | Budget (USD). |
| `actual_cost_usd` | decimal | 1,500.00 to 1,111,900.00 | 0.0 | Actual cost (USD). |
| `health` | string | Amber, Green, Red | 0.0 | Health. |

### `project_members`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** Project staffing with role and allocation.
* **Target rows (scale 1.0):** 100,000 | **Rows in this build:** 19,382
* **Primary key:** `project_member_id`
* **Foreign keys:** `project_id` -> projects, `employee_id` -> employees
* **Referenced by:** -
* **File:** `J_ai_portfolio/project_members.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `project_member_id` | string | free text / identifier | 0.0 | Identifier (project member). |
| `project_id` | string | free text / identifier | 0.0 | Foreign key to projects. |
| `employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `project_role` | string | Analyst, Change Lead, Data Scientist, Designer, Developer, SME, Tester | 0.0 | Project role. |
| `allocation_pct` | integer | 10.00 to 100.00 | 0.0 | Allocation (%). |

### `project_tasks`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** Project task backlog with estimates and actuals.
* **Target rows (scale 1.0):** 300,000 | **Rows in this build:** 60,000
* **Primary key:** `task_id`
* **Foreign keys:** `project_id` -> projects, `assignee_employee_id` -> employees
* **Referenced by:** -
* **File:** `J_ai_portfolio/project_tasks.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `task_id` | string | free text / identifier | 0.0 | Identifier (task). |
| `project_id` | string | free text / identifier | 0.0 | Foreign key to projects. |
| `assignee_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `created_at` | timestamp | 2022-01-02 17:00:00 to 2027-11-03 11:00:00 | 0.0 | Timestamp: created. |
| `due_date` | date | 2022-01-13 00:00:00 to 2027-11-16 00:00:00 | 0.0 | Date: due date. |
| `estimate_hours` | decimal | 0.70 to 97.10 | 0.0 | Estimate hours. |
| `completed_at` | timestamp | 2022-01-07 18:40:16 to 2026-09-30 23:54:51 | 2.3 | Timestamp: completed. |
| `status` | string | Blocked, Done, In Progress, To Do | 0.0 | Lifecycle status of the record. |
| `actual_hours` | decimal | 0.60 to 153.20 | 2.3 | Actual hours. |

### `milestones`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** Project milestones planned vs actual.
* **Target rows (scale 1.0):** 16,000 | **Rows in this build:** 16,000
* **Primary key:** `milestone_id`
* **Foreign keys:** `project_id` -> projects
* **Referenced by:** -
* **File:** `J_ai_portfolio/milestones.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `milestone_id` | string | free text / identifier | 0.0 | Identifier (milestone). |
| `project_id` | string | free text / identifier | 0.0 | Foreign key to projects. |
| `milestone_name` | string | Design sign-off, Go-live, Kick-off, UAT complete | 0.0 | Milestone name. |
| `planned_date` | date | 2022-01-01 00:00:00 to 2028-06-01 00:00:00 | 0.0 | Date: planned date. |
| `actual_date` | date | 2022-01-03 00:00:00 to 2026-09-30 00:00:00 | 3.1 | Date: actual date. |
| `status` | string | Achieved, Pending | 0.0 | Lifecycle status of the record. |

### `project_risks`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** Project RAID risks.
* **Target rows (scale 1.0):** 45,000 | **Rows in this build:** 9,000
* **Primary key:** `risk_id`
* **Foreign keys:** `project_id` -> projects, `owner_employee_id` -> employees
* **Referenced by:** -
* **File:** `J_ai_portfolio/project_risks.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `risk_id` | string | free text / identifier | 0.0 | Identifier (risk). |
| `project_id` | string | free text / identifier | 0.0 | Foreign key to projects. |
| `category` | string | Adoption, Budget, Data access, Data quality, Model performance, Resourcing, Scope, Security, Vendor | 0.0 | Category. |
| `description` | string | Accuracy below target on edge cases, Cloud consumption above forecast, Dependency on vendor API availability, Key SME has competing BAU priorities, Low user adoption expected in night-shift teams, Pending data access app | 0.0 | Description. |
| `likelihood` | integer | 1.00 to 5.00 | 0.0 | Likelihood. |
| `impact` | integer | 1.00 to 5.00 | 0.0 | Impact. |
| `status` | string | Closed, Mitigated, Open, Realised | 0.0 | Lifecycle status of the record. |
| `owner_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `raised_date` | date | 2022-02-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Date: raised date. |

### `innovation_ideas`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** Employee innovation ideas with votes and linkage to use cases.
* **Target rows (scale 1.0):** 15,000 | **Rows in this build:** 3,000
* **Primary key:** `idea_id`
* **Foreign keys:** `submitted_by_employee_id` -> employees, `team_id` -> teams, `linked_use_case_id` -> ai_use_cases
* **Referenced by:** -
* **File:** `J_ai_portfolio/innovation_ideas.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `idea_id` | string | free text / identifier | 0.0 | Identifier (idea). |
| `submitted_by_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `description` | string | free text / identifier | 0.0 | Description. |
| `submitted_at` | timestamp | 2022-06-02 13:15:26 to 2026-09-30 00:00:00 | 0.0 | Timestamp: submitted. |
| `votes` | integer | 0.00 to 75.00 | 0.0 | Votes. |
| `status` | string | Accepted, Declined, Merged into use case, Submitted, Under Review | 0.0 | Lifecycle status of the record. |
| `linked_use_case_id` | string | free text / identifier | 90.3 | Foreign key to ai_use_cases. |

### `ai_usage_events`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** Enterprise GenAI/agent usage telemetry (user, tool, task, tokens, latency, accept/edit/reject).
* **Target rows (scale 1.0):** 2,000,000 | **Rows in this build:** 400,000
* **Primary key:** `usage_event_id`
* **Foreign keys:** `employee_id` -> employees, `use_case_id` -> ai_use_cases, `model_id` -> ai_models
* **Referenced by:** ai_feedback
* **File:** `J_ai_portfolio/ai_usage_events.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `usage_event_id` | string | free text / identifier | 0.0 | Identifier (usage event). |
| `employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `tool` | string | AP Exception Agent, Atlas Chat, CodePilot, DocAssist, Investigation Assistant, Knowledge RAG Assistant, REPH Copilot, XML Validator Agent | 0.0 | Tool. |
| `event_ts` | timestamp | 2023-06-01 02:17:19 to 2026-09-30 00:00:00 | 0.0 | Event timestamp (process-mining 'time:timestamp'). |
| `use_case_id` | string | free text / identifier | 36.5 | Foreign key to ai_use_cases. |
| `model_id` | string | free text / identifier | 0.0 | Foreign key to ai_models. |
| `task_type` | string | Answer question, Brainstorm, Classify, Code generation, Draft email/response, Extract data, Generate SQL, Summarise document, Translate | 0.0 | Task type. |
| `prompt_tokens` | integer | 10.00 to 19,477.00 | 0.0 | Prompt tokens. |
| `completion_tokens` | integer | 10.00 to 8,000.00 | 0.0 | Completion tokens. |
| `latency_ms` | integer | 599.00 to 65,046.00 | 0.0 | Latency ms. |
| `outcome` | string | Accepted, Edited, Rejected | 0.0 | Final outcome / result of the record. |
| `prompt_id` | string | free text / identifier | 100.0 | Identifier (prompt). |

### `prompts_library`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** Shared prompt library with ratings and usage.
* **Target rows (scale 1.0):** 5,000 | **Rows in this build:** 1,000
* **Primary key:** `prompt_id`
* **Foreign keys:** `author_employee_id` -> employees, `use_case_id` -> ai_use_cases
* **Referenced by:** -
* **File:** `J_ai_portfolio/prompts_library.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `prompt_id` | string | free text / identifier | 0.0 | Identifier (prompt). |
| `author_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `task_type` | string | Answer question, Classify, Draft email/response, Extract data, Generate SQL, Summarise document | 0.0 | Task type. |
| `use_case_id` | string | free text / identifier | 49.4 | Foreign key to ai_use_cases. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `prompt_text` | string | free text / identifier | 0.0 | Prompt text. |
| `created_at` | timestamp | 2023-08-10 07:50:05 to 2026-09-30 00:00:00 | 0.0 | Timestamp: created. |
| `rating_avg` | decimal | 1.77 to 5.00 | 0.0 | Rating avg. |
| `times_used` | integer | 0.00 to 4,177.00 | 0.0 | Times used. |

### `ai_feedback`

* **Domain:** J. AI, Automation & Transformation Portfolio
* **Description:** User feedback on AI outputs (rating, thumbs, comment).
* **Target rows (scale 1.0):** 300,000 | **Rows in this build:** 60,000
* **Primary key:** `ai_feedback_id`
* **Foreign keys:** `usage_event_id` -> ai_usage_events, `employee_id` -> employees
* **Referenced by:** -
* **File:** `J_ai_portfolio/ai_feedback.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `ai_feedback_id` | string | free text / identifier | 0.0 | Identifier (ai feedback). |
| `usage_event_id` | string | free text / identifier | 0.0 | Foreign key to ai_usage_events. |
| `employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `rating` | integer | 1.00 to 5.00 | 0.0 | Rating. |
| `feedback_type` | string | Neutral, Thumbs down, Thumbs up | 0.0 | Feedback type. |
| `comment` | string | Accurate summary, Good draft, minor edits, Hallucinated a policy, OK but needed edits, Partially correct, Saved me time, Slow response, Too generic, Very helpful, Wrong citation | 59.8 | Comment. |
| `submitted_at` | timestamp | 2023-06-01 17:59:51 to 2026-09-30 01:58:23 | 0.0 | Timestamp: submitted. |

## K. Knowledge & Collaboration (Unstructured)

### `knowledge_articles`

* **Domain:** K. Knowledge & Collaboration (Unstructured)
* **Description:** Knowledge base (SOPs, how-tos, troubleshooting, policies) incl. outdated and conflicting versions.
* **Target rows (scale 1.0):** 50,000 | **Rows in this build:** 10,040
* **Primary key:** `article_id`
* **Foreign keys:** `division_id` -> divisions, `product_id` -> products, `app_id` -> applications, `owner_team_id` -> teams, `author_employee_id` -> employees
* **Referenced by:** it_tickets, knowledge_article_versions, search_logs, sops, support_cases
* **File:** `K_knowledge/knowledge_articles.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `article_id` | string | free text / identifier | 0.0 | Identifier (article). |
| `article_type` | string | FAQ, How-to, Policy, Reference, SOP, Troubleshooting | 0.0 | Article type. |
| `topic_key` | string | free text / identifier | 0.0 | Topic key. |
| `division_id` | string | DIV01, DIV02, DIV03, DIV04, DIV05 | 0.0 | Foreign key to divisions. |
| `product_id` | string | free text / identifier | 54.5 | Foreign key to products. |
| `app_id` | string | free text / identifier | 0.0 | Foreign key to applications. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `owner_team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `author_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `created_at` | timestamp | 2019-01-02 11:17:33 to 2026-09-15 00:00:00 | 0.0 | Timestamp: created. |
| `last_reviewed_at` | timestamp | 2019-01-25 23:51:02 to 2026-09-30 20:57:48 | 0.0 | Timestamp: last reviewed. |
| `status` | string | Archived, Draft, Published | 0.0 | Lifecycle status of the record. |
| `version` | integer | 1.00 to 6.00 | 0.0 | Version. |
| `body` | string | free text / identifier | 0.0 | Body. |
| `view_count` | integer | 1.00 to 23,936.00 | 0.0 | Count of view. |
| `helpful_votes` | integer | 0.00 to 1,501.00 | 0.0 | Helpful votes. |
| `tags` | string | free text / identifier | 0.0 | Tags. |

### `knowledge_article_versions`

* **Domain:** K. Knowledge & Collaboration (Unstructured)
* **Description:** Version history per knowledge article.
* **Target rows (scale 1.0):** 30,170 | **Rows in this build:** 30,170
* **Primary key:** `article_version_id`
* **Foreign keys:** `article_id` -> knowledge_articles, `edited_by_employee_id` -> employees
* **Referenced by:** -
* **File:** `K_knowledge/knowledge_article_versions.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `article_version_id` | string | free text / identifier | 0.0 | Identifier (article version). |
| `article_id` | string | free text / identifier | 0.0 | Foreign key to knowledge_articles. |
| `version_no` | integer | 1.00 to 6.00 | 0.0 | Version no. |
| `edited_at` | timestamp | 2019-01-02 11:17:33 to 2026-09-30 20:57:48 | 0.0 | Timestamp: edited. |
| `edited_by_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `change_summary` | string | Added escalation path, Fixed screenshots, Initial version, Minor wording changes, Policy alignment, Updated for new release, Updated steps | 0.0 | Change summary. |

### `sops`

* **Domain:** K. Knowledge & Collaboration (Unstructured)
* **Description:** Standard operating procedures linked to processes and KB articles.
* **Target rows (scale 1.0):** 3,000 | **Rows in this build:** 600
* **Primary key:** `sop_id`
* **Foreign keys:** `article_id` -> knowledge_articles, `process_id` -> process_definitions, `owner_employee_id` -> employees
* **Referenced by:** -
* **File:** `K_knowledge/sops.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `sop_id` | string | free text / identifier | 0.0 | Identifier (sop). |
| `article_id` | string | free text / identifier | 0.0 | Foreign key to knowledge_articles. |
| `process_id` | string | free text / identifier | 0.0 | Foreign key to process_definitions. |
| `sop_title` | string | free text / identifier | 0.0 | Sop title. |
| `version` | integer | 1.00 to 6.00 | 0.0 | Version. |
| `effective_date` | date | 2019-01-04 00:00:00 to 2026-09-15 00:00:00 | 0.0 | Date: effective date. |
| `review_due_date` | date | 2020-04-16 00:00:00 to 2027-09-28 00:00:00 | 0.0 | Date: review due date. |
| `is_current` | boolean | False, True | 0.0 | Flag: current. |
| `owner_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |

### `documents`

* **Domain:** K. Knowledge & Collaboration (Unstructured)
* **Description:** Project documents (charters, closeouts, decision logs, ADRs) with text bodies.
* **Target rows (scale 1.0):** 40,000 | **Rows in this build:** 8,000
* **Primary key:** `document_id`
* **Foreign keys:** `project_id` -> projects, `author_employee_id` -> employees
* **Referenced by:** -
* **File:** `K_knowledge/documents.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `document_id` | string | free text / identifier | 0.0 | Identifier (document). |
| `project_id` | string | free text / identifier | 0.0 | Foreign key to projects. |
| `doc_type` | string | Architecture Decision Record, Benefits Realisation Report, Closeout Report, Decision Log, Project Charter, Requirements, Status Report | 0.0 | Doc type. |
| `author_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `created_at` | timestamp | 2022-01-09 13:24:50 to 2026-09-30 13:37:39 | 0.0 | Timestamp: created. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `body` | string | free text / identifier | 0.0 | Body. |

### `meetings`

* **Domain:** K. Knowledge & Collaboration (Unstructured)
* **Description:** Meetings with AI-style transcript summaries.
* **Target rows (scale 1.0):** 60,000 | **Rows in this build:** 12,000
* **Primary key:** `meeting_id`
* **Foreign keys:** `project_id` -> projects, `team_id` -> teams, `organizer_employee_id` -> employees
* **Referenced by:** action_items
* **File:** `K_knowledge/meetings.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `meeting_id` | string | free text / identifier | 0.0 | Identifier (meeting). |
| `project_id` | string | free text / identifier | 40.2 | Foreign key to projects. |
| `team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `organizer_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `meeting_type` | string | 1:1 (aggregate), Design review, Retrospective, Status sync, Steering committee, Team huddle, Town hall, UAT review, Weekly sync | 0.0 | Meeting type. |
| `title` | string | free text / identifier | 0.0 | Title. |
| `start_ts` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Timestamp: start. |
| `duration_min` | integer | 15.00 to 90.00 | 0.0 | Duration min (minutes). |
| `attendee_count` | integer | 2.00 to 58.00 | 0.0 | Count of attendee. |
| `transcript_summary` | string | free text / identifier | 0.0 | Transcript summary. |

### `action_items`

* **Domain:** K. Knowledge & Collaboration (Unstructured)
* **Description:** Meeting action items with owner, due date and completion.
* **Target rows (scale 1.0):** 150,000 | **Rows in this build:** 30,000
* **Primary key:** `action_item_id`
* **Foreign keys:** `meeting_id` -> meetings, `owner_employee_id` -> employees
* **Referenced by:** -
* **File:** `K_knowledge/action_items.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `action_item_id` | string | free text / identifier | 0.0 | Identifier (action item). |
| `meeting_id` | string | free text / identifier | 0.0 | Foreign key to meetings. |
| `owner_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `description` | string | free text / identifier | 0.0 | Description. |
| `due_date` | date | 2022-01-02 00:00:00 to 2026-10-18 00:00:00 | 0.0 | Date: due date. |
| `completed_at` | timestamp | 2022-01-03 14:58:47 to 2026-09-30 23:48:02 | 15.4 | Timestamp: completed. |
| `status` | string | Done, Open, Overdue | 0.0 | Lifecycle status of the record. |

### `chat_channels`

* **Domain:** K. Knowledge & Collaboration (Unstructured)
* **Description:** Team and project chat channels.
* **Target rows (scale 1.0):** 399 | **Rows in this build:** 399
* **Primary key:** `channel_id`
* **Foreign keys:** `team_id` -> teams, `project_id` -> projects
* **Referenced by:** chat_messages
* **File:** `K_knowledge/chat_channels.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `channel_id` | string | free text / identifier | 0.0 | Identifier (channel). |
| `team_id` | string | free text / identifier | 0.0 | Foreign key to teams. |
| `project_id` | string | free text / identifier | 30.1 | Foreign key to projects. |
| `channel_name` | string | free text / identifier | 0.0 | Channel name. |
| `created_at` | timestamp | 2021-01-02 13:59:08 to 2021-12-31 00:00:00 | 0.0 | Timestamp: created. |

### `chat_messages`

* **Domain:** K. Knowledge & Collaboration (Unstructured)
* **Description:** Short informal team chat messages (~15% Taglish).
* **Target rows (scale 1.0):** 1,500,000 | **Rows in this build:** 300,000
* **Primary key:** `message_id`
* **Foreign keys:** `channel_id` -> chat_channels, `sender_employee_id` -> employees, `reply_to_message_id` -> chat_messages
* **Referenced by:** -
* **File:** `K_knowledge/chat_messages.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `message_id` | string | free text / identifier | 0.0 | Identifier (message). |
| `channel_id` | string | free text / identifier | 0.0 | Foreign key to chat_channels. |
| `sender_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `sent_at` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Timestamp: sent. |
| `message_text` | string | free text / identifier | 0.0 | Message text. |
| `is_taglish` | boolean | False, True | 0.0 | True if the message mixes Tagalog and English. |
| `reply_to_message_id` | string | free text / identifier | 70.2 | Foreign key to chat_messages. |
| `mentions_count` | integer | 0.00 to 4.00 | 0.0 | Count of mentions. |

### `emails`

* **Domain:** K. Knowledge & Collaboration (Unstructured)
* **Description:** Internal email metadata and bodies.
* **Target rows (scale 1.0):** 500,000 | **Rows in this build:** 100,000
* **Primary key:** `email_id`
* **Foreign keys:** `sender_employee_id` -> employees, `recipient_employee_id` -> employees, `related_case_id` -> support_cases
* **Referenced by:** -
* **File:** `K_knowledge/emails.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `email_id` | string | free text / identifier | 0.0 | Identifier (email). |
| `sender_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `recipient_employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `cc_count` | integer | 0.00 to 8.00 | 0.0 | Count of cc. |
| `sent_at` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Timestamp: sent. |
| `subject` | string | free text / identifier | 0.0 | Subject. |
| `body` | string | free text / identifier | 0.0 | Body. |
| `related_case_id` | string | free text / identifier | 80.0 | Foreign key to support_cases. |
| `thread_id` | string | free text / identifier | 0.0 | Identifier (thread). |
| `has_attachment` | boolean | False, True | 0.0 | Flag: attachment. |

### `search_logs`

* **Domain:** K. Knowledge & Collaboration (Unstructured)
* **Description:** Enterprise search queries, result counts and clicks (zero-result queries = knowledge gaps).
* **Target rows (scale 1.0):** 1,000,000 | **Rows in this build:** 200,000
* **Primary key:** `search_id`
* **Foreign keys:** `employee_id` -> employees, `clicked_article_id` -> knowledge_articles
* **Referenced by:** -
* **File:** `K_knowledge/search_logs.csv` / `.parquet`

| Column | Type | Allowed values / range | Null % | Business meaning |
|---|---|---|---|---|
| `search_id` | string | free text / identifier | 0.0 | Identifier (search). |
| `employee_id` | string | free text / identifier | 0.0 | Foreign key to employees. |
| `searched_at` | timestamp | 2022-01-01 00:00:00 to 2026-09-30 00:00:00 | 0.0 | Timestamp: searched. |
| `query_text` | string | free text / identifier | 0.0 | Query text. |
| `results_count` | integer | 0.00 to 101.00 | 0.0 | Number of search results returned (0 = knowledge gap). |
| `clicked_article_id` | string | free text / identifier | 56.2 | Foreign key to knowledge_articles. |
| `source` | string | Intranet, KB Portal, Knowledge RAG Assistant, REPH Copilot | 0.0 | Source. |
