# Sample Rows (5 per table)

## A. Organization & Workforce

### `sites`

| site_id   | site_name                    | city        | region          |   floors |   seat_capacity | opened_date         | timezone    |
|:----------|:-----------------------------|:------------|:----------------|---------:|----------------:|:--------------------|:------------|
| SITE01    | Quezon City Technohub Center | Quezon City | NCR             |        6 |            3200 | 2012-03-01 00:00:00 | Asia/Manila |
| SITE02    | Iloilo Business Park Center  | Iloilo City | Western Visayas |        4 |            1800 | 2016-08-15 00:00:00 | Asia/Manila |

### `divisions`

| division_id   | division_name                        | short_code   | global_hq_city   | primary_client_region   | center_site_id   |
|:--------------|:-------------------------------------|:-------------|:-----------------|:------------------------|:-----------------|
| DIV01         | Lumina Scholarly & Health Publishing | SHP          | Amsterdam        | EMEA                    | SITE01           |
| DIV04         | Agora Exhibitions & Events           | AEX          | Singapore        | APAC                    | SITE02           |
| DIV03         | Sentinel Risk & Business Analytics   | RBA          | Atlanta          | Americas                | SITE01           |
| DIV02         | Veritas Legal & Professional         | LPI          | London           | EMEA                    | SITE01           |
| DIV05         | Group Shared Services                | GSS          | Quezon City      | APAC                    | SITE01           |

### `departments`

| department_id   | division_id   | department_name             | job_family       | primary_site_id   |
|:----------------|:--------------|:----------------------------|:-----------------|:------------------|
| DEP018          | DIV03         | Due Diligence Research      | Risk Operations  | SITE01            |
| DEP038          | DIV05         | Customer Service Hub        | Customer Service | SITE01            |
| DEP035          | DIV05         | Infrastructure & Cloud      | Technology       | SITE02            |
| DEP019          | DIV03         | Data Acquisition & Matching | Data & AI        | SITE01            |
| DEP033          | DIV05         | Learning & Development      | HR               | SITE01            |

### `roles`

| role_id   | role_title                      | department_id   | job_family            | job_level        |   min_salary_php |   max_salary_php | is_ai_data_role   |
|:----------|:--------------------------------|:----------------|:----------------------|:-----------------|-----------------:|-----------------:|:------------------|
| ROLE0351  | Statutes & Regulations Manager  | DEP011          | Legal Editorial       | Manager          |            88200 |           136700 | False             |
| ROLE0110  | Senior Associate Legal Analyst  | DEP014          | Legal Editorial       | Senior Associate |            29000 |            45000 | False             |
| ROLE0061  | Associate Data Engineer         | DEP008          | Data & AI             | Associate        |            29700 |            46000 | True              |
| ROLE0398  | Event Customer Service Director | DEP026          | Customer Service      | Director         |           153600 |           238100 | False             |
| ROLE0323  | Journal Operations Director     | DEP001          | Publishing Operations | Director         |           153600 |           238100 | False             |

### `employees`

| employee_id   | first_name   | last_name   | full_name        | email                                   | site_id   | division_id   | department_id   | team_id   | role_id   | job_family      | job_level         | manager_id   | hire_date           | employment_type   | shift   | work_arrangement   |   tenure_months | attrition_flag   | exit_date           | exit_reason   |
|:--------------|:-------------|:------------|:-----------------|:----------------------------------------|:----------|:--------------|:----------------|:----------|:----------|:----------------|:------------------|:-------------|:--------------------|:------------------|:--------|:-------------------|----------------:|:-----------------|:--------------------|:--------------|
| EMP003407     | Ray          | Hurst       | Ray Hurst        | ray.hurst406@reph-center.example        | SITE02    | DIV05         | DEP031          | TM0065    | ROLE0246  | HR              | Senior Associate  | EMP000183    | 2023-01-09 00:00:00 | Regular           | Night   | Onsite             |              23 | True             | 2024-12-07 00:00:00 | Career growth |
| EMP000758     | Oscar        | Bowen       | Oscar Bowen      | oscar.bowen757@reph-center.example      | SITE02    | DIV03         | DEP020          | TM0050    | ROLE0157  | Data & AI       | Associate         | EMP000139    | 2024-05-22 00:00:00 | Regular           | Mid     | Hybrid             |              26 | True             | 2026-07-28 00:00:00 | Compensation  |
| EMP003625     | George       | Khatri      | George Khatri    | george.khatri624@reph-center.example    | SITE02    | DIV05         | DEP033          | TM0033    | ROLE0261  | HR              | Associate         | EMP000189    | 2025-05-21 00:00:00 | Contractual       | Mid     | Hybrid             |              16 | False            |                     |               |
| EMP004545     | Natalie      | Weaver      | Natalie Weaver   | natalie.weaver544@reph-center.example   | SITE01    | DIV05         | DEP039          | TM0108    | ROLE0306  | Transformation  | Senior Associate  | EMP000209    | 2019-09-14 00:00:00 | Regular           | Night   | Hybrid             |              45 | True             | 2023-06-23 00:00:00 | Health        |
| EMP003236     | Elizabeth    | Gordon      | Elizabeth Gordon | elizabeth.gordon235@reph-center.example | SITE01    | DIV02         | DEP012          | TM0079    | ROLE0095  | Legal Editorial | Senior Specialist | EMP000106    | 2019-08-06 00:00:00 | Regular           | Night   | Hybrid             |              85 | False            |                     |               |

### `teams`

| team_id   | department_id   | division_id   | site_id   | shift   | client_region   | team_name                              | formed_date         | ai_copilot_go_live   | team_lead_employee_id   |
|:----------|:----------------|:--------------|:----------|:--------|:----------------|:---------------------------------------|:--------------------|:---------------------|:------------------------|
| TM0113    | DEP006          | DIV01         | SITE01    | Night   | Americas        | Books Production - Night I5            | 2016-06-27 15:56:29 |                      | EMP000070               |
| TM0075    | DEP039          | DIV05         | SITE01    | Day     | APAC            | Digital Transformation Office - Day W3 | 2017-06-12 14:47:14 |                      | EMP000208               |
| TM0080    | DEP015          | DIV03         | SITE01    | Mid     | EMEA            | Identity Verification Ops - Mid B4     | 2020-05-21 13:20:52 |                      | EMP000119               |
| TM0088    | DEP038          | DIV05         | SITE01    | Mid     | EMEA            | Customer Service Hub - Mid J4          | 2019-02-21 08:47:13 | 2025-04-01 00:00:00  | EMP000202               |
| TM0098    | DEP038          | DIV05         | SITE01    | Day     | APAC            | Customer Service Hub - Day T4          | 2017-07-27 15:56:59 |                      | EMP000205               |

### `skill_taxonomy`

| taxonomy_id   | node_level   | node_name        | parent_taxonomy_id   |
|:--------------|:-------------|:-----------------|:---------------------|
| TAX033        | Cluster      | Events           | TAX032               |
| TAX003        | Cluster      | Machine Learning | TAX001               |
| TAX025        | Cluster      | Identity         | TAX023               |
| TAX002        | Cluster      | Generative AI    | TAX001               |
| TAX019        | Cluster      | Peer Review      | TAX017               |

### `skills`

| skill_id   | skill_name                   | cluster_id   | domain_id   | is_emerging   | market_demand_trend   |
|:-----------|:-----------------------------|:-------------|:------------|:--------------|:----------------------|
| SKL0062    | Model Monitoring Governance  | TAX003       | TAX001      | True          | Rising                |
| SKL0800    | Coaching Governance          | TAX035       | TAX034      | False         | Stable                |
| SKL0748    | Product Training             | TAX031       | TAX029      | False         | Rising                |
| SKL0669    | Budgeting (Advanced)         | TAX028       | TAX026      | False         | Rising                |
| SKL0727    | Knowledge Management Tooling | TAX030       | TAX029      | False         | Stable                |

### `employee_skills`

| employee_skill_id   | employee_id   | skill_id   |   proficiency | last_assessed_date   | source             |
|:--------------------|:--------------|:-----------|--------------:|:---------------------|:-------------------|
| ES00037724          | EMP004908     | SKL0704    |             4 | 2024-01-05 00:00:00  | Self-assessment    |
| ES00024639          | EMP003206     | SKL0195    |             4 | 2024-12-05 00:00:00  | Skills assessment  |
| ES00017623          | EMP002295     | SKL0796    |             2 | 2024-10-01 00:00:00  | Self-assessment    |
| ES00008690          | EMP001134     | SKL0033    |             4 | 2023-10-20 00:00:00  | Manager validation |
| ES00013903          | EMP001810     | SKL0532    |             2 | 2023-09-08 00:00:00  | Self-assessment    |

### `learning_content`

| content_id   | skill_id   | format       | title                                               | provider                      | difficulty   |   duration_minutes | language   | published_date      |
|:-------------|:-----------|:-------------|:----------------------------------------------------|:------------------------------|:-------------|-------------------:|:-----------|:--------------------|
| LC001528     | SKL0602    | Article      | Article: Fraud Detection Governance - for Beginners | SkillForge (fictional)        | Beginner     |                 10 | English    | 2020-12-22 00:00:00 |
| LC000618     | SKL0700    | Hands-on Lab | Hands-on Lab: Case Management Tooling - Essentials  | LearnBridge (fictional)       | Intermediate |                104 | English    | 2025-09-15 00:00:00 |
| LC000949     | SKL0401    | Article      | Article: Containers for Operations - Deep Dive      | CloudPath Academy (fictional) | Intermediate |                 18 | English    | 2023-06-21 00:00:00 |
| LC000059     | SKL0400    | Video        | Video: Containers Fundamentals - Masterclass        | CloudPath Academy (fictional) | Intermediate |                 16 | English    | 2022-08-05 00:00:00 |
| LC001353     | SKL0095    | Video        | Video: AI Governance for Operations - Case Studies  | DXO Enablement                | Intermediate |                 54 | English    | 2026-06-11 00:00:00 |

### `learning_paths`

| path_id   | skill_domain           | target_level         | path_name                                             | owner_department_id   |   estimated_hours |
|:----------|:-----------------------|:---------------------|:------------------------------------------------------|:----------------------|------------------:|
| LP0150    | AI & Machine Learning  | Functional           | AI & Machine Learning - Functional Journey 3          | DEP040                |                13 |
| LP0085    | Editorial & Publishing | Functional           | Editorial & Publishing - Functional Journey 1         | DEP040                |                15 |
| LP0041    | Finance & Accounting   | Level 2 Practitioner | Finance & Accounting - Level 2 Practitioner Journey 6 | DEP033                |                16 |
| LP0067    | AI & Machine Learning  | Functional           | AI & Machine Learning - Functional Journey 4          | DEP033                |                55 |
| LP0107    | Events & Marketing     | Functional           | Events & Marketing - Functional Journey 2             | DEP039                |                14 |

### `learning_path_items`

| path_item_id   | path_id   | content_id   |   sequence_no |
|:---------------|:----------|:-------------|--------------:|
| LPI000779      | LP0117    | LC001089     |             5 |
| LPI000335      | LP0052    | LC001349     |             1 |
| LPI000272      | LP0041    | LC000102     |             7 |
| LPI000803      | LP0121    | LC001136     |             1 |
| LPI000217      | LP0034    | LC001530     |             4 |

### `learning_records`

| learning_record_id   | employee_id   | content_id   | path_id   | enrolled_at         | completed_at        | status      |   score |   hours_spent |
|:---------------------|:--------------|:-------------|:----------|:--------------------|:--------------------|:------------|--------:|--------------:|
| LR00029431           | EMP002234     | LC000223     |           | 2024-06-24 08:00:00 | 2024-06-28 15:27:16 | Completed   |      83 |          0.49 |
| LR00027751           | EMP000419     | LC001219     |           | 2026-03-08 04:00:00 | 2026-03-13 16:06:56 | Completed   |      85 |          1.31 |
| LR00047783           | EMP001064     | LC001071     | LP0029    | 2024-06-08 22:00:00 | 2024-06-19 13:37:33 | Completed   |      77 |          0.27 |
| LR00010499           | EMP001941     | LC000242     |           | 2022-09-16 03:00:00 |                     | In Progress |         |          0.08 |
| LR00024748           | EMP004773     | LC000598     | LP0004    | 2026-07-27 18:00:00 | 2026-07-31 15:32:39 | Completed   |      80 |          2.5  |

### `ai_capability_levels`

| assessment_id   | employee_id   | assessment_date     |   prompting_score |   data_literacy_score |   automation_score |   ai_governance_score |   overall_score | capability_level     | recommended_path_id   |
|:----------------|:--------------|:--------------------|------------------:|----------------------:|-------------------:|----------------------:|----------------:|:---------------------|:----------------------|
| AIA002061       | EMP002430     | 2026-06-17 00:00:00 |              43.1 |                  45.9 |               65.1 |                  43.6 |            49.4 | Level 1 User         | LP0014                |
| AIA000934       | EMP003576     | 2025-06-02 00:00:00 |              19.2 |                  43.3 |               60.4 |                  53.6 |            44.1 | Level 1 User         | LP0141                |
| AIA000379       | EMP001080     | 2026-01-02 00:00:00 |              52.3 |                  50.3 |               47.3 |                  44.3 |            48.6 | Level 1 User         | LP0088                |
| AIA002755       | EMP002180     | 2026-01-02 00:00:00 |              36.9 |                  63.8 |               40.3 |                  82.8 |            56   | Level 2 Practitioner | LP0061                |
| AIA000597       | EMP003873     | 2025-10-10 00:00:00 |              58.1 |                  39.9 |               29.1 |                  63.6 |            47.7 | Level 1 User         | LP0136                |

### `career_paths`

| career_path_id   | from_role_id   | to_role_id   | path_type                 |   typical_months |   observed_moves |
|:-----------------|:---------------|:-------------|:--------------------------|-----------------:|-----------------:|
| CP0119           | ROLE0354       | ROLE0355     | Vertical                  |               17 |                0 |
| CP0450           | ROLE0107       | ROLE0380     | Cross-skilling to AI/Data |               42 |                0 |
| CP0454           | ROLE0022       | ROLE0150     | Cross-skilling to AI/Data |               27 |                0 |
| CP0278           | ROLE0224       | ROLE0402     | Vertical                  |               27 |                0 |
| CP0302           | ROLE0245       | ROLE0246     | Vertical                  |               38 |                0 |

### `internal_mobility`

| move_id   | employee_id   | from_role_id   | to_role_id   | from_team_id   | to_team_id   | effective_date      | move_type      |
|:----------|:--------------|:---------------|:-------------|:---------------|:-------------|:--------------------|:---------------|
| MOV000460 | EMP001717     | ROLE0186       | ROLE0157     | TM0092         | TM0068       | 2025-05-16 00:00:00 | Cross-division |
| MOV000458 | EMP001338     | ROLE0202       | ROLE0207     | TM0072         | TM0056       | 2024-09-30 00:00:00 | Promotion      |
| MOV001023 | EMP001408     | ROLE0015       | ROLE0011     | TM0118         | TM0110       | 2024-01-09 00:00:00 | Promotion      |
| MOV000142 | EMP000993     | ROLE0093       | ROLE0094     | TM0114         | TM0089       | 2023-02-16 00:00:00 | Promotion      |
| MOV000669 | EMP003106     | ROLE0078       | ROLE0074     | TM0050         | TM0091       | 2025-11-11 00:00:00 | Promotion      |

### `job_requisitions`

| requisition_id   | role_id   | department_id   | team_id   | site_id   | hiring_manager_id   | opened_date         | filled_date         | status   |   time_to_fill_days |   candidates_screened |
|:-----------------|:----------|:----------------|:----------|:----------|:--------------------|:--------------------|:--------------------|:---------|--------------------:|----------------------:|
| REQ00262         | ROLE0189  | DEP024          | TM0024    | SITE01    | EMP000152           | 2022-11-30 00:00:00 | 2023-01-04 00:00:00 | Filled   |                  35 |                    17 |
| REQ00133         | ROLE0234  | DEP030          | TM0030    | SITE01    | EMP000177           | 2024-12-17 00:00:00 | 2025-02-24 00:00:00 | Filled   |                  69 |                    38 |
| REQ00576         | ROLE0353  | DEP011          | TM0067    | SITE01    | EMP000097           | 2023-09-18 00:00:00 | 2023-12-16 00:00:00 | Filled   |                  89 |                    10 |
| REQ00455         | ROLE0347  | DEP009          | TM0054    | SITE01    | EMP000086           | 2023-01-25 00:00:00 | 2023-02-20 00:00:00 | Filled   |                  26 |                    28 |
| REQ00338         | ROLE0332  | DEP004          | TM0086    | SITE01    | EMP000063           | 2024-03-13 00:00:00 | 2024-04-22 00:00:00 | Filled   |                  40 |                    23 |

### `requisition_skills`

| requisition_skill_id   | requisition_id   | skill_id   | requirement_type   |
|:-----------------------|:-----------------|:-----------|:-------------------|
| RQS000059              | REQ00018         | SKL0165    | Required           |
| RQS001040              | REQ00352         | SKL0075    | Preferred          |
| RQS001550              | REQ00521         | SKL0025    | Preferred          |
| RQS000814              | REQ00276         | SKL0129    | Required           |
| RQS000373              | REQ00124         | SKL0216    | Required           |

### `performance_metrics_aggregate`

| metric_id   | team_id   | month               |   headcount |   cases_handled |   avg_handle_time_min |   avg_csat |   sla_met_rate |   ai_assisted_share |   productivity_index |   quality_score |   utilization_pct |
|:------------|:----------|:--------------------|------------:|----------------:|----------------------:|-----------:|---------------:|--------------------:|---------------------:|----------------:|------------------:|
| TPM0001756  | TM0035    | 2025-06-01 00:00:00 |         113 |                 |                       |            |                |                0.03 |                109.7 |            92.7 |              68.6 |
| TPM0003152  | TM0063    | 2022-09-01 00:00:00 |          71 |             105 |                 14.76 |       3.76 |           0.65 |                0    |                101.3 |            75.2 |              83.7 |
| TPM0000950  | TM0020    | 2023-12-01 00:00:00 |          40 |                 |                       |            |                |                0.01 |                106.1 |            90.7 |              79.9 |
| TPM0004409  | TM0086    | 2025-03-01 00:00:00 |          27 |                 |                       |            |                |                0.04 |                101.5 |            86.7 |              92   |
| TPM0000992  | TM0021    | 2022-09-01 00:00:00 |          23 |             122 |                 15.23 |       4    |           0.65 |                0    |                103   |            80   |              75.8 |

## B. Scholarly & Health Publishing Operations

### `institutions`

| institution_id   | institution_name              | institution_type   | country     | research_tier   |
|:-----------------|:------------------------------|:-------------------|:------------|:----------------|
| INS001307        | West Orhaven State University | University         | Japan       | Tier 3          |
| INS002038        | University of Port Pelmere    | University         | Japan       | Tier 3          |
| INS000569        | Lower Calford College         | University         | China       | Tier 1          |
| INS001898        | University of Port Arara      | University         | Netherlands | Tier 3          |
| INS002499        | University of East Istwick    | University         | South Korea | Tier 2          |

### `authors`

| author_id   | first_name   | last_name   | full_name     | author_ref_id   | country        | primary_institution_id   |   h_index |   first_publication_year | is_reviewer   |
|:------------|:-------------|:------------|:--------------|:----------------|:---------------|:-------------------------|----------:|-------------------------:|:--------------|
| AU00060659  | Lei          | Dong        | Lei Dong      | ARID-8027-9493  | China          | INS000754                |         8 |                     2020 | False         |
| AU00057917  | Edward       | Lyons       | Edward Lyons  | ARID-3348-3683  | United States  | INS002087                |        14 |                     2008 | True          |
| AU00075921  | Jeff         | Gibson      | Jeff Gibson   | ARID-3904-3266  | Philippines    | INS001959                |        14 |                     2008 | True          |
| AU00027176  | Lisa         | Bradley     | Lisa Bradley  | ARID-1640-6794  | United States  | INS002806                |         5 |                     2022 | True          |
| AU00064125  | Lewis        | O'Brien     | Lewis O'Brien | ARID-7273-8929  | United Kingdom | INS001261                |        18 |                     2011 | True          |

### `author_affiliations`

| affiliation_id   | author_id   | institution_id   | is_primary   |   start_year | end_year   |
|:-----------------|:------------|:-----------------|:-------------|-------------:|:-----------|
| AFF00093456      | AU00044592  | INS000241        | False        |         2010 |            |
| AFF00077194      | AU00077194  | INS001605        | True         |         2023 |            |
| AFF00096468      | AU00054717  | INS000580        | False        |         2011 |            |
| AFF00084405      | AU00014580  | INS000075        | False        |         2019 |            |
| AFF00064358      | AU00064358  | INS001904        | True         |         2020 |            |

### `journals`

| journal_id   | journal_title                              | subject_area         | imprint           | impact_tier   | open_access_model   |   launch_year |   issues_per_year | managing_team_id   | editor_in_chief_author_id   |
|:-------------|:-------------------------------------------|:---------------------|:------------------|:--------------|:--------------------|--------------:|------------------:|:-------------------|:----------------------------|
| JRN00309     | Annals of Translational Education Research | Education Research   | Meridian Academic | Q3            | Gold OA             |          2000 |                 6 | TM0001             | AU00064728                  |
| JRN00014     | Quantitative Pharmacology Letters          | Pharmacology         | Aurora Open       | Q3            | Gold OA             |          2018 |                12 | TM0073             | AU00014202                  |
| JRN00415     | Journal of Agricultural Science            | Agricultural Science | Helix Medical     | Q4            | Hybrid              |          2019 |                12 | TM0073             | AU00031089                  |
| JRN00033     | Annals of Global Energy Systems            | Energy Systems       | Lumina Press      | Q4            | Gold OA             |          1983 |                12 | TM0042             | AU00023928                  |
| JRN00461     | Annals of Open Education Research          | Education Research   | Northgate Science | Q2            | Gold OA             |          2004 |                12 | TM0001             | AU00040066                  |

### `manuscripts`

| manuscript_id   | journal_id   | corresponding_author_id   | handling_editor_author_id   | ops_coordinator_employee_id   | article_type      | subject_area       | topic               | submitted_at        | first_decision_at   | final_decision_at   | final_decision   |   revision_rounds |   turnaround_days |   similarity_score_pct |
|:----------------|:-------------|:--------------------------|:----------------------------|:------------------------------|:------------------|:-------------------|:--------------------|:--------------------|:--------------------|:--------------------|:-----------------|------------------:|------------------:|-----------------------:|
| MS00025171      | JRN00400     | AU00034980                | AU00058636                  | EMP004781                     | Original Research | Machine Learning   | explainability      | 2024-05-02 13:28:54 | 2024-05-07 10:13:48 | 2024-05-07 10:13:48 | Desk Rejected    |                 0 |               4.9 |                    5.8 |
| MS00010936      | JRN00248     | AU00015972                | AU00004306                  | EMP001819                     | Review            | Education Research | assessment design   | 2024-12-03 14:22:50 | 2025-01-27 07:20:05 | 2025-04-20 13:33:06 | Accepted         |                 2 |             138   |                    9.5 |
| MS00043597      | JRN00208     | AU00079243                | AU00033734                  | EMP003705                     | Review            | Pharmacology       | drug repurposing    | 2022-01-10 16:31:06 | 2022-02-05 05:21:57 | 2022-04-10 07:01:18 | Accepted         |                 2 |              89.6 |                    5.2 |
| MS00013971      | JRN00454     | AU00005928                | AU00017595                  | EMP000053                     | Data Article      | Chemistry          | catalysis           | 2022-03-25 15:54:10 | 2022-04-15 18:45:46 | 2022-04-15 18:45:46 | Rejected         |                 0 |              21.1 |                    6   |
| MS00024884      | JRN00373     | AU00054462                | AU00075637                  | EMP004445                     | Original Research | Immunology         | cytokine signalling | 2025-09-21 15:12:17 | 2025-12-03 19:09:10 |                     | Under Review     |                 3 |                   |                    8.3 |

### `peer_review_assignments`

| assignment_id   | manuscript_id   | reviewer_author_id   | invited_at          | responded_at        | response    | due_at              | review_submitted_at   | is_overdue   | recommendation   |   review_quality_score |   review_word_count |
|:----------------|:----------------|:---------------------|:--------------------|:--------------------|:------------|:--------------------|:----------------------|:-------------|:-----------------|-----------------------:|--------------------:|
| PR00037803      | MS00014643      | AU00050864           | 2025-06-13 07:57:42 | 2025-06-15 20:06:05 | Declined    | 2025-07-06 20:06:05 |                       | False        |                  |                        |                     |
| PR00018882      | MS00007306      | AU00043438           | 2024-09-30 13:22:27 | 2024-10-02 05:12:32 | Declined    | 2024-10-23 05:12:32 |                       | False        |                  |                        |                     |
| PR00085693      | MS00033131      | AU00069228           | 2023-07-16 17:05:37 |                     | No Response |                     |                       | False        |                  |                        |                     |
| PR00074818      | MS00028932      | AU00017095           | 2025-06-17 06:32:44 | 2025-06-18 16:50:10 | Accepted    | 2025-07-09 16:50:10 | 2025-07-08 00:08:54   | False        | Minor Revision   |                      3 |                 376 |
| PR00070145      | MS00027152      | AU00004978           | 2025-05-07 04:02:28 | 2025-05-07 14:18:30 | Accepted    | 2025-05-28 14:18:30 | 2025-05-26 00:32:37   | False        | Major Revision   |                      3 |                 372 |

### `research_papers_published`

| paper_id    | manuscript_id   | journal_id   | published_date      | doi                           | title                                                           | abstract                                                        | keywords                                                        | subject_area     | topic                | article_type      | open_access   |   page_count |   downloads_total |   citation_count | institution_id   |
|:------------|:----------------|:-------------|:--------------------|:------------------------------|:----------------------------------------------------------------|:----------------------------------------------------------------|:----------------------------------------------------------------|:-----------------|:---------------------|:------------------|:--------------|-------------:|------------------:|-----------------:|:-----------------|
| PAP00016652 | MS00020032      | JRN00351     | 2026-06-22 00:00:00 | 10.99999/jrn00351.2026.016651 | A Bayesian hierarchical modelling approach to wind turbine w... | Growing evidence links solar forecasting to wind turbine wak... | wind turbine wakes, solar forecasting, hydrogen storage         | Energy Systems   | solar forecasting    | Original Research | False         |           10 |               783 |                3 | INS001986        |
| PAP00002411 | MS00040962      | JRN00373     | 2023-01-21 00:00:00 | 10.99999/jrn00373.2023.002410 | Vaccine adjuvants and autoimmunity: evidence from a case-con... | Despite advances in Immunology, the role of vaccine adjuvant... | vaccine adjuvants, innate immunity, cytokine signalling         | Immunology       | vaccine adjuvants    | Original Research | True          |           14 |               789 |               19 | INS001707        |
| PAP00012537 | MS00057408      | JRN00470     | 2025-07-22 00:00:00 | 10.99999/jrn00470.2025.012536 | A Monte Carlo simulation approach to transformer models         | Growing evidence links federated learning to transformer mod... | anomaly detection, transformer models, explainability           | Machine Learning | federated learning   | Review            | False         |           10 |              1896 |               13 | INS001073        |
| PAP00005993 | MS00037823      | JRN00159     | 2023-12-30 00:00:00 | 10.99999/jrn00159.2023.005992 | Rethinking disease surveillance: implications for Public Hea... | Disease surveillance remains a major challenge in Public Hea... | air quality exposure, vaccination coverage, health equity       | Public Health    | disease surveillance | Original Research | True          |            5 |               300 |               15 | INS001039        |
| PAP00001299 | MS00044112      | JRN00147     | 2022-09-28 00:00:00 | 10.99999/jrn00147.2022.001298 | Towards scalable drug-drug interactions using difference-in-... | Pharmacokinetics remains a major challenge in Pharmacology. ... | adverse drug reactions, drug-drug interactions, pharmacokine... | Pharmacology     | pharmacokinetics     | Original Research | False         |           10 |               852 |                4 | INS000150        |

### `paper_authors`

| paper_author_id   | paper_id    | author_id   |   author_position | is_corresponding   | affiliation_institution_id   |
|:------------------|:------------|:------------|------------------:|:-------------------|:-----------------------------|
| PA00015508        | PAP00003415 | AU00053696  |                 4 | False              | INS000177                    |
| PA00081491        | PAP00018006 | AU00028382  |                 2 | False              | INS000664                    |
| PA00019866        | PAP00004378 | AU00078933  |                 2 | False              | INS001703                    |
| PA00039482        | PAP00008697 | AU00002429  |                 1 | True               | INS002760                    |
| PA00041645        | PAP00009151 | AU00032211  |                 2 | False              | INS002827                    |

### `citations`

| citation_id   | citing_paper_id   | cited_paper_id   |   citation_year | context_section   |
|:--------------|:------------------|:-----------------|----------------:|:------------------|
| CIT00101919   | PAP00005131       | PAP00004513      |            2023 | Introduction      |
| CIT00103550   | PAP00015175       | PAP00010016      |            2026 | Introduction      |
| CIT00012455   | PAP00013647       | PAP00011470      |            2025 | Introduction      |
| CIT00214037   | PAP00011551       | PAP00006280      |            2025 | Discussion        |
| CIT00210937   | PAP00015860       | PAP00000393      |            2026 | Introduction      |

### `content_production_jobs`

| job_id     | paper_id    | stage          |   stage_order | team_id   | vendor_name   | started_at          | completed_at        |   sla_hours | assignee_employee_id   |   elapsed_hours | sla_met   |   rework_count | tool_version   | status    |
|:-----------|:------------|:---------------|--------------:|:----------|:--------------|:--------------------|:--------------------|------------:|:-----------------------|----------------:|:----------|---------------:|:---------------|:----------|
| PJ00026555 | PAP00014178 | QA             |             5 | TM0004    | In-house      | 2025-11-22 13:26:08 | 2025-11-23 02:26:14 |          24 | EMP002073              |           13    | True      |              0 |                | Completed |
| PJ00047701 | PAP00017703 | Copyedit       |             1 | TM0071    | In-house      | 2026-08-07 14:01:03 | 2026-08-09 05:16:01 |          48 | EMP003599              |           39.25 | True      |              0 |                | Completed |
| PJ00036307 | PAP00015804 | Copyedit       |             1 | TM0059    | In-house      | 2026-03-21 11:16:23 | 2026-03-24 19:40:58 |          48 | EMP000792              |           80.41 | False     |              0 |                | Completed |
| PJ00010499 | PAP00011502 | QA             |             5 | TM0120    | In-house      | 2025-04-10 20:15:26 | 2025-04-11 13:47:53 |          24 | EMP000574              |           17.54 | True      |              0 |                | Completed |
| PJ00024747 | PAP00013877 | XML Conversion |             3 | TM0004    | In-house      | 2025-10-16 14:25:43 | 2025-10-17 14:31:59 |          24 | EMP000675              |           24.1  | False     |              1 | XConvert 4.0   | Completed |

### `xml_conversion_defects`

| defect_id   | job_id     | paper_id    | defect_type   | severity   | detected_at         | detected_by   | fixed_at            | root_cause          |
|:------------|:-----------|:------------|:--------------|:-----------|:--------------------|:--------------|:--------------------|:--------------------|
| XD00009089  | PJ00016331 | PAP00012474 | Math/Equation | Minor      | 2025-06-30 23:25:52 | Rule Engine   | 2025-07-01 02:49:32 | Conversion rule gap |
| XD00015517  | PJ00029291 | PAP00014634 | Tagging       | Critical   | 2025-12-19 10:19:15 | Human QA      | 2025-12-19 14:02:17 | Conversion rule gap |
| XD00020292  | PJ00004379 | PAP00010482 | Figure        | Minor      | 2025-01-18 10:42:05 | Rule Engine   | 2025-01-18 20:08:08 | Unknown             |
| XD00015004  | PJ00014553 | PAP00012178 | Reference     | Minor      | 2025-06-07 21:12:32 | Rule Engine   | 2025-06-08 01:18:39 | Manual keying error |
| XD00028281  | PJ00038674 | PAP00016198 | Math/Equation | Minor      | 2026-04-23 15:24:18 | Human QA      | 2026-04-23 21:03:37 | Conversion rule gap |

### `research_integrity_flags`

| flag_id   | paper_id    | flag_type                        | manuscript_id   | flagged_at          | detected_by          | status              | assigned_employee_id   | evidence_summary                                    |
|:----------|:------------|:---------------------------------|:----------------|:--------------------|:---------------------|:--------------------|:-----------------------|:----------------------------------------------------|
| RIF000460 | PAP00005198 | Data fabrication concern         | MS00006395      | 2023-12-11 11:57:41 | Reader report        | Cleared             | EMP002786              | Statistical anomalies in reported results.          |
| RIF000458 | PAP00017882 | Authorship dispute               | MS00010420      | 2026-09-27 23:59:59 | Integrity team audit | Open                | EMP000571              | Co-author claims contribution was not acknowledged. |
| RIF001023 | PAP00017237 | Image duplication                | MS00047144      | 2026-09-27 23:59:59 | Reader report        | Cleared             | EMP004012              | Overlapping western blot panels across figures.     |
| RIF000142 | PAP00012081 | Undisclosed conflict of interest | MS00001242      | 2025-10-11 07:20:51 | Editor               | Under Investigation | EMP001810              | Funding source not declared.                        |
| RIF000669 | PAP00013932 | Data fabrication concern         | MS00025718      | 2026-02-17 02:05:31 | Integrity team audit | Under Investigation | EMP002469              | Statistical anomalies in reported results.          |

## C. Legal & Professional Content Operations

### `jurisdictions`

| jurisdiction_id   | jurisdiction_name           | jurisdiction_code   | legal_system   | region   | official_language   |
|:------------------|:----------------------------|:--------------------|:---------------|:---------|:--------------------|
| JUR032            | Republic of Venhaven        | VEN1                | Civil Law      | EMEA     | English             |
| JUR021            | Federal Territory of Morora | MOR0                | Civil Law      | EMEA     | English             |
| JUR060            | Republic of Fencrest        | FEN9                | Mixed          | EMEA     | English             |
| JUR018            | Kingdom of Briaris          | BRI7                | Common Law     | EMEA     | Spanish             |
| JUR011            | Province of Torova          | TOR0                | Civil Law      | APAC     | German              |

### `courts`

| court_id   | jurisdiction_id   | court_name                           | court_level   | court_code   |
|:-----------|:------------------|:-------------------------------------|:--------------|:-------------|
| CRT0257    | JUR018            | Briaris Court of Appeal - Division 1 | Appellate     | BRI7CoA1     |
| CRT0539    | JUR036            | Veneon Employment Tribunal           | Tribunal      | VEN5ET       |
| CRT0260    | JUR018            | Briaris High Court - Division 1      | Trial         | BRI7HC1      |
| CRT0486    | JUR033            | Elmere High Court - Division 2       | Trial         | ELM2HC2      |
| CRT0454    | JUR031            | Torane Court of Appeal - Division 3  | Appellate     | TOR0CoA3     |

### `practice_areas`

| practice_area_id   | practice_area_name   | practice_group   |
|:-------------------|:---------------------|:-----------------|
| PRA063             | Fintech              | Private Client   |
| PRA037             | Government Contracts | Disputes         |
| PRA061             | Equity               | Finance          |
| PRA018             | Litigation           | Public Law       |
| PRA042             | Oil & Gas            | Private Client   |

### `legal_documents`

| doc_id     | doc_type      | jurisdiction_id   | practice_area_id   | court_id   | decision_or_enacted_date   | title                                                      | citation_ref        | summary                                                         | headnote                                                        |   word_count | status   | last_updated_at     |
|:-----------|:--------------|:------------------|:-------------------|:-----------|:---------------------------|:-----------------------------------------------------------|:--------------------|:----------------------------------------------------------------|:----------------------------------------------------------------|-------------:|:---------|:--------------------|
| LD00007670 | Case Law      | JUR033            | PRA029             | CRT0488    | 2014-07-15 00:00:00        | Harper v. The Municipal Council                            | [2014] ELM2DC1 429  | The Elmere District Court - Division 1 considered whether th... | Consumer Protection - whether the dismissal was procedurally... |         3732 | Current  | 2019-10-25 00:00:00 |
| LD00002262 | Case Law      | JUR033            | PRA066             | CRT0482    | 2019-08-03 00:00:00        | Deng v. Marport Technologies S.A.                          | [2019] ELM2CoA1 916 | The Elmere Court of Appeal - Division 1 considered whether t... | Health & Safety - whether the insurer could rely on the excl... |         5723 | Current  | 2022-03-28 00:00:00 |
| LD00020572 | Case Law      | JUR038            | PRA078             | CRT0560    | 2021-02-17 00:00:00        | Ogawa v. Pelane Partners GmbH                              | [2021] COR7HC1 474  | The Cormora High Court - Division 1 considered whether the p... | Telecoms - whether the patent claims were sufficiently inven... |         5615 | Current  | 2022-11-07 00:00:00 |
| LD00005427 | Practice Note | JUR055            | PRA074             |            | 2022-06-11 00:00:00        | Practice Note: Personal Injury - key considerations (2022) | MAR4 PRA 2022/300   | This practice note sets out obligations relating to personal... |                                                                 |         1271 | Current  | 2025-09-09 00:00:00 |
| LD00011131 | Case Law      | JUR024            | PRA018             | CRT0353    | 2024-04-02 00:00:00        | Nguyen v. The Commissioner of Revenue                      | [2024] SEL3DC1 55   | The Selvale District Court - Division 1 considered whether p... | Litigation - whether personal data was processed lawfully - ... |        16416 | Current  | 2026-09-29 23:59:59 |

### `legal_citations`

| legal_citation_id   | citing_doc_id   | cited_doc_id   | treatment   | citation_date       |
|:--------------------|:----------------|:---------------|:------------|:--------------------|
| LC00046177          | LD00034191      | LD00039837     | Cited       | 2015-06-07 00:00:00 |
| LC00140403          | LD00011162      | LD00014161     | Considered  | 2023-04-09 00:00:00 |
| LC00149398          | LD00004278      | LD00014584     | Cited       | 2020-12-03 00:00:00 |
| LC00141971          | LD00032890      | LD00012642     | Applied     | 2020-11-09 00:00:00 |
| LC00079726          | LD00039553      | LD00028700     | Cited       | 2025-07-10 00:00:00 |

### `editorial_tasks`

| task_id    | doc_id     | task_type   | team_id   | editor_employee_id   | created_at          | ai_assisted   | model_id   |   minutes_spent | completed_at        |   accuracy_score | qa_passed   | status    |
|:-----------|:-----------|:------------|:----------|:---------------------|:--------------------|:--------------|:-----------|----------------:|:--------------------|-----------------:|:------------|:----------|
| ET00060659 | LD00039894 | Classify    | TM0014    | EMP002954            | 2022-09-28 17:15:53 | False         |            |            17.8 | 2022-09-28 19:36:28 |             0.93 | True        | Completed |
| ET00057917 | LD00011358 | Classify    | TM0013    | EMP004288            | 2023-11-18 01:55:33 | False         |            |            15.1 | 2023-11-18 10:35:08 |             0.98 | True        | Completed |
| ET00075921 | LD00007149 | Summarize   | TM0067    | EMP002319            | 2026-02-13 19:16:30 | False         |            |            26.6 | 2026-02-14 15:10:40 |             0.96 | True        | Completed |
| ET00027176 | LD00024135 | Update      | TM0114    | EMP004282            | 2024-01-11 03:22:01 | False         |            |            23.6 | 2024-01-11 21:17:36 |             0.97 | True        | Completed |
| ET00064125 | LD00013158 | Classify    | TM0047    | EMP003226            | 2026-08-24 20:27:32 | False         |            |            31.2 | 2026-08-25 03:51:45 |             0.94 | True        | Completed |

### `regulatory_updates`

| update_id   | jurisdiction_id   | practice_area_id   | source_body                          | update_type       | published_at        | effective_date      | captured_at         | title                                        | summary                                                         |
|:------------|:------------------|:-------------------|:-------------------------------------|:------------------|:--------------------|:--------------------|:--------------------|:---------------------------------------------|:----------------------------------------------------------------|
| RU003642    | JUR003            | PRA034             | Alix Data Protection Office          | Court Rule Change | 2025-05-26 12:27:09 | 2025-09-07 00:00:00 | 2025-05-26 18:51:04 | Court Rule Change: ESG requirements updated  | The Alix Data Protection Office issued a court rule change a... |
| RU005087    | JUR032            | PRA034             | Venhaven Ministry of Justice         | New Regulation    | 2023-08-30 12:31:58 | 2024-01-14 00:00:00 | 2023-08-30 16:06:07 | New Regulation: ESG requirements updated     | The Venhaven Ministry of Justice issued a new regulation aff... |
| RU001658    | JUR028            | PRA041             | Zangate Financial Services Authority | Guidance          | 2023-06-29 16:51:30 | 2023-10-09 00:00:00 | 2023-06-29 22:47:17 | Guidance: Native Title requirements updated  | The Zangate Financial Services Authority issued a guidance a... |
| RU006843    | JUR037            | PRA042             | Armere Revenue Authority             | Amendment         | 2025-10-15 15:16:30 | 2026-03-08 00:00:00 | 2025-10-15 20:51:27 | Amendment: Oil & Gas requirements updated    | The Armere Revenue Authority issued a amendment affecting oi... |
| RU000789    | JUR039            | PRA077             | Verstone Competition Commission      | Consultation      | 2025-10-30 16:13:07 | 2026-01-29 00:00:00 | 2025-10-30 19:49:09 | Consultation: Sanctions requirements updated | The Verstone Competition Commission issued a consultation af... |

### `regulatory_update_impacts`

| impact_id   | update_id   | doc_id     |   sla_hours | content_updated_at   |   latency_hours | sla_breached   | editor_employee_id   |
|:------------|:------------|:-----------|------------:|:---------------------|----------------:|:---------------|:---------------------|
| RUI00000497 | RU000193    | LD00029164 |          72 | 2026-05-22 11:38:34  |            36.3 | False          | EMP000095            |
| RUI00009211 | RU003661    | LD00032082 |          72 | 2025-12-16 17:16:35  |            29.8 | False          | EMP003837            |
| RUI00001561 | RU000606    | LD00012539 |          72 | 2026-06-13 18:11:43  |            41.1 | False          | EMP003833            |
| RUI00003937 | RU001550    | LD00005011 |          72 | 2026-02-25 22:00:27  |            46.2 | False          | EMP000261            |
| RUI00003919 | RU001542    | LD00028708 |          72 | 2024-04-07 12:24:50  |            38.6 | False          | EMP000472            |

## D. Risk & Business Analytics Operations

### `business_entities`

| entity_id   | legal_name               | registration_number   | country       | industry     | entity_type     | incorporation_date   | employee_band   |   annual_revenue_usd | status   | is_listed   |
|:------------|:-------------------------|:----------------------|:--------------|:-------------|:----------------|:---------------------|:----------------|---------------------:|:---------|:------------|
| ENT001978   | Belvale Textiles K.K.    | REG-242-6880890       | United States | Insurance    | Government Body | 1995-11-07 00:00:00  | 1-10            |          2.52092e+08 | Active   | False       |
| ENT003881   | Rosdale Mining GmbH      | REG-520-3767709       | India         | Construction | LLC             | 2014-05-23 00:00:00  | 11-50           |          4.9277e+07  | Active   | False       |
| ENT000053   | Kellyn Agritech Ltd.     | REG-272-6889328       | Germany       | Energy       | Corporation     | 1964-11-03 00:00:00  | 1001-5000       |          6.161e+06   | Active   | True        |
| ENT002552   | Venion Capital Pte. Ltd. | REG-615-0839032       | India         | Energy       | Corporation     | 2008-10-04 00:00:00  | 201-1000        |          1.2085e+07  | Active   | False       |
| ENT002247   | Ulcrest Textiles GmbH    | REG-118-6488775       | Singapore     | Payments     | Corporation     | 1995-05-19 00:00:00  | 11-50           |          5.64e+06    | Active   | False       |

### `ownership_links`

| ownership_link_id   | parent_entity_id   | child_entity_id   |   ownership_pct | link_type   | effective_date      |
|:--------------------|:-------------------|:------------------|----------------:|:------------|:--------------------|
| OWN0008019          | ENT000591          | ENT001746         |            33.1 | Direct      | 2012-05-09 00:00:00 |
| OWN0005220          | ENT006019          | ENT006837         |            90.6 | Direct      | 2017-06-13 00:00:00 |
| OWN0009671          | ENT004063          | ENT006164         |            10.9 | Direct      | 2014-08-22 00:00:00 |
| OWN0005600          | ENT009320          | ENT003743         |            37.8 | Direct      | 2018-08-06 00:00:00 |
| OWN0015038          | ENT009161          | ENT001688         |            30.8 | Direct      | 2013-04-04 00:00:00 |

### `individuals`

| individual_id   | first_name   | last_name   | date_of_birth       | nationality   | gender   | occupation     | created_at          |
|:----------------|:-------------|:------------|:--------------------|:--------------|:---------|:---------------|:--------------------|
| IND0025171      | Nimrat       | Bakshi      | 1950-09-08 00:00:00 | India         | F        | Business owner | 2020-03-02 16:14:38 |
| IND0010936      | Ariel        | Noble       | 1958-09-26 00:00:00 | Philippines   | M        | Business owner | 2018-08-22 15:13:49 |
| IND0043597      | Jing         | Wen         | 1987-07-30 00:00:00 | China         | F        | Employee       | 2018-08-12 13:58:41 |
| IND0013971      | Sue          | Jenkins     | 1972-07-05 00:00:00 | Philippines   | M        | Student        | 2025-02-04 11:50:17 |
| IND0024884      | Malik        | Wilkinson   | 1984-06-20 00:00:00 | Philippines   | F        | Employee       | 2024-04-18 13:24:52 |

### `addresses`

| address_id   | individual_id   | address_line           | city          | country        |   postal_code | address_type   | valid_from          |
|:-------------|:----------------|:-----------------------|:--------------|:---------------|--------------:|:---------------|:--------------------|
| ADR0004280   | IND0004280      | 8839 Zanmere Road      | New Zanport   | United Kingdom |         82572 | Residential    | 2015-11-02 00:00:00 |
| ADR0013356   | IND0013356      | 6117 Vervanta Street   | Lake Belbrook | United States  |         86688 | Residential    | 2015-03-30 00:00:00 |
| ADR0020537   | IND0020537      | 8517 Orion Street      | Mount Corane  | United States  |         47540 | Residential    | 2020-02-14 00:00:00 |
| ADR0048933   | IND0048933      | 6265 Bridale Boulevard | Lower Marford | India          |         36140 | Residential    | 2025-02-27 00:00:00 |
| ADR0016091   | IND0016091      | 9575 Arridge Lane      | Lake Istova   | China          |         29497 | Residential    | 2026-04-17 00:00:00 |

### `identity_attributes`

| attribute_id   | individual_id   | attribute_type   | attribute_value_hash   | verified   | verification_method   | verified_at         |
|:---------------|:----------------|:-----------------|:-----------------------|:-----------|:----------------------|:--------------------|
| IDA00174773    | IND0058244      | Driver Licence   | 1a0e11725db8203e       | True       | OTP                   | 2021-01-03 04:51:02 |
| IDA00033204    | IND0011067      | Phone            | 1cbde310485fdada       | False      |                       |                     |
| IDA00125739    | IND0041903      | National ID      | 35badb82b6c959fa       | True       | Document check        | 2024-04-19 09:06:55 |
| IDA00042823    | IND0014264      | National ID      | 1da859a45ec14723       | True       | Database match        | 2022-02-26 11:19:54 |
| IDA00027418    | IND0009130      | Email            | 3f26bb43a0fe64c3       | True       | Document check        | 2024-09-15 11:47:56 |

### `devices`

| device_id   | individual_id   | device_fingerprint   | device_type   | os      | first_seen_at       | last_seen_at        | ip_country     |
|:------------|:----------------|:---------------------|:--------------|:--------|:--------------------|:--------------------|:---------------|
| DEV0060659  | IND0020488      | fp_3958d254ad3f      | Mobile        | iOS     | 2020-02-16 05:00:34 | 2020-03-01 16:28:37 | Philippines    |
| DEV0057917  | IND0057917      | fp_05f98a704ee4      | Mobile        | Android | 2019-05-06 02:09:35 | 2019-09-14 06:37:11 | China          |
| DEV0075921  | IND0052045      | fp_18e5ee19eeec      | Desktop       | Windows | 2023-12-30 19:24:14 | 2024-02-11 00:57:14 | United Kingdom |
| DEV0027176  | IND0027176      | fp_161972bb4e10      | Mobile        | iOS     | 2022-03-20 12:36:46 | 2022-06-17 05:31:43 | United Kingdom |
| DEV0064125  | IND0002730      | fp_1bb8a1c8193f      | Mobile        | iOS     | 2023-12-24 16:58:19 | 2024-04-30 01:49:15 | Brazil         |

### `accounts`

| account_id   | holder_type   | individual_id   | entity_id   | client_customer_id   | account_type   | currency   | opened_at           | status   | risk_rating   |
|:-------------|:--------------|:----------------|:------------|:---------------------|:---------------|:-----------|:--------------------|:---------|:--------------|
| ACC0033910   | Individual    | IND0048872      |             | CUS001654            | Savings        | JPY        | 2019-12-12 10:30:07 | Active   | Low           |
| ACC0092308   | Individual    | IND0055157      |             | CUS003647            | Savings        | USD        | 2018-02-06 11:23:30 | Active   | Low           |
| ACC0089108   | Individual    | IND0019911      |             | CUS009350            | Current        | EUR        | 2026-06-18 10:17:08 | Active   | Medium        |
| ACC0009539   | Individual    | IND0041876      |             | CUS000348            | E-wallet       | USD        | 2024-12-11 17:37:30 | Closed   | Low           |
| ACC0031009   | Individual    | IND0012857      |             | CUS005181            | Credit card    | PHP        | 2019-12-20 12:16:07 | Active   | Low           |

### `transactions`

| txn_id      | account_id   | counterparty_account_id   | device_id   | channel         | merchant_category   | currency   |   amount |   amount_usd | txn_country   | is_cross_border   | txn_ts              | status   |
|:------------|:-------------|:--------------------------|:------------|:----------------|:--------------------|:-----------|---------:|-------------:|:--------------|:------------------|:--------------------|:---------|
| TXN00190688 | ACC0041243   | ACC0046685                | DEV0019826  | Online transfer |                     | PHP        | 36674.9  |       654.91 | Philippines   | False             | 2024-12-04 12:19:51 | Settled  |
| TXN00188398 | ACC0075114   |                           | DEV0052463  | Mobile wallet   |                     | USD        |   178.48 |       178.48 | Philippines   | False             | 2026-08-15 17:52:42 | Settled  |
| TXN00172428 | ACC0096711   | ACC0031199                | DEV0016359  | Mobile wallet   |                     | USD        |   260.2  |       260.2  | Philippines   | False             | 2026-08-08 13:56:48 | Settled  |
| TXN00013123 | ACC0006907   | ACC0028847                | DEV0037597  | Mobile wallet   |                     | PHP        | 14407    |       257.27 | Philippines   | False             | 2025-04-12 17:49:48 | Settled  |
| TXN00011685 | ACC0086396   |                           |             | Card            | Groceries           | PHP        |  3762.42 |        67.19 | Philippines   | False             | 2024-07-15 16:14:11 | Settled  |

### `watchlists`

| watchlist_entry_id   | subject_type   | individual_id   | entity_id   | list_type          | list_source                                      | listed_date         | reason                     |
|:---------------------|:---------------|:----------------|:------------|:-------------------|:-------------------------------------------------|:--------------------|:---------------------------|
| WL000415             | Entity         |                 | ENT006430   | Sanctions-like     | Global Restricted Parties List (fictional)       | 2024-08-30 00:00:00 | Asset freeze               |
| WL000379             | Entity         |                 | ENT007147   | PEP-like           | Politically Exposed Persons Register (fictional) | 2025-10-22 00:00:00 | Senior public function     |
| WL000659             | Individual     | IND0054572      |             | Adverse media-like | Adverse Media Index (fictional)                  | 2020-06-10 00:00:00 | Fraud allegations in media |
| WL000591             | Individual     | IND0040440      |             | Adverse media-like | Adverse Media Index (fictional)                  | 2016-06-09 00:00:00 | Fraud allegations in media |
| WL001603             | Entity         |                 | ENT005656   | Adverse media-like | Adverse Media Index (fictional)                  | 2020-10-09 00:00:00 | Fraud allegations in media |

### `alert_rules`

| rule_id   | rule_name                       | rule_type   |   threshold | model_id   | owner_team_id   | created_date        |
|:----------|:--------------------------------|:------------|------------:|:-----------|:----------------|:--------------------|
| R018      | Name screening match v2         | Rule-based  |        0.64 |            | TM0115          | 2020-05-15 00:00:00 |
| R038      | Name screening match v4         | Rule-based  |        0.67 |            | TM0018          | 2021-07-28 00:00:00 |
| R035      | Dormant account reactivation v4 | Rule-based  |        0.72 |            | TM0019          | 2023-02-20 00:00:00 |
| R019      | Round-amount transfers v2       | Rule-based  |        0.93 |            | TM0115          | 2023-05-31 00:00:00 |
| R033      | Structuring below threshold v4  | Rule-based  |        0.61 |            | TM0018          | 2020-04-15 00:00:00 |

### `risk_alerts`

| alert_id   | rule_id   | txn_id      | account_id   | created_at          |   score | is_false_positive   | disposition                | analyst_employee_id   | closed_at           |
|:-----------|:----------|:------------|:-------------|:--------------------|--------:|:--------------------|:---------------------------|:----------------------|:--------------------|
| ALR0001253 | R026      | TXN00074215 | ACC0059525   | 2024-06-06 14:22:55 |    0.26 | True                | Closed - False Positive    | EMP004670             | 2024-06-09 09:11:53 |
| ALR0010445 | R014      | TXN00173806 | ACC0062379   | 2026-04-12 14:52:37 |    0.41 | False               | Escalated to investigation | EMP004384             | 2026-04-12 16:25:42 |
| ALR0008995 | R006      | TXN00039794 | ACC0050854   | 2026-03-12 16:01:07 |    0.77 | True                | Closed - False Positive    | EMP002336             | 2026-03-12 20:51:18 |
| ALR0007464 | R019      | TXN00059047 | ACC0028215   | 2026-07-01 16:15:27 |    0.22 | True                | Closed - False Positive    | EMP000497             | 2026-07-02 04:25:06 |
| ALR0001911 | R021      | TXN00199501 | ACC0053868   | 2025-05-05 20:54:31 |    0.33 | False               | Escalated to investigation | EMP003735             | 2025-05-06 01:16:10 |

### `kyc_cases`

| kyc_case_id   | client_customer_id   | subject_type   | subject_individual_id   | subject_entity_id   | case_type           | opened_at           | analyst_employee_id   |   documents_requested | closed_at           | risk_level   | outcome   |
|:--------------|:---------------------|:---------------|:------------------------|:--------------------|:--------------------|:--------------------|:----------------------|----------------------:|:--------------------|:-------------|:----------|
| KYC010667     | CUS009449            | Individual     | IND0001536              |                     | Periodic Review     | 2023-02-08 14:00:11 | EMP004178             |                     1 | 2023-02-20 16:39:20 | Low          | Approved  |
| KYC013687     | CUS002889            | Entity         |                         | ENT006074           | Event-driven Review | 2025-07-22 07:57:14 | EMP003194             |                     1 | 2025-07-28 18:19:00 | Low          | Approved  |
| KYC010666     | CUS002967            | Entity         |                         | ENT004828           | Periodic Review     | 2026-04-20 14:49:29 | EMP003635             |                     2 | 2026-04-26 17:48:13 | Low          | Approved  |
| KYC003030     | CUS002630            | Entity         |                         | ENT004113           | Onboarding          | 2024-06-21 16:46:25 | EMP002537             |                     3 | 2024-07-05 18:59:04 | Medium       | Approved  |
| KYC012031     | CUS002911            | Individual     | IND0028705              |                     | Event-driven Review | 2025-02-27 14:18:28 | EMP004100             |                    11 | 2025-03-02 18:07:22 | Low          | Approved  |

### `investigations`

| investigation_id   | alert_id   | kyc_case_id   | lead_analyst_employee_id   | opened_at           | closed_at           |   time_to_decision_hours | outcome           |   steps_count |
|:-------------------|:-----------|:--------------|:---------------------------|:--------------------|:--------------------|-------------------------:|:------------------|--------------:|
| INV001752          | ALR0024367 |               | EMP004687                  | 2024-05-21 17:04:18 | 2024-05-22 17:54:16 |                     24.8 | No further action |            39 |
| INV000205          | ALR0002797 |               | EMP004042                  | 2025-11-11 14:40:39 | 2025-11-13 22:41:54 |                     56   | No further action |            60 |
| INV000207          | ALR0002862 |               | EMP001952                  | 2026-07-08 13:45:35 | 2026-07-10 20:24:27 |                     54.6 | No further action |            44 |
| INV001704          | ALR0023819 |               | EMP001299                  | 2024-02-12 11:56:23 | 2024-02-13 12:08:52 |                     24.2 | No further action |            60 |
| INV000971          | ALR0013670 |               | EMP003507                  | 2025-09-07 14:35:09 | 2025-09-10 13:17:43 |                     70.7 | No further action |            69 |

### `analyst_actions`

| action_id   | investigation_id   |   sequence_no | action_type                | action_ts           | analyst_employee_id   |   duration_min | tool_used                  | note                                                            |
|:------------|:-------------------|--------------:|:---------------------------|:--------------------|:----------------------|---------------:|:---------------------------|:----------------------------------------------------------------|
| ACT0056058  | INV000999          |            35 | Review alert details       | 2025-11-21 13:32:22 | EMP000873             |           28.6 | AI Investigation Assistant | Review alert details: no adverse findings.                      |
| ACT0012668  | INV000226          |             2 | Review alert details       | 2026-07-08 02:25:52 | EMP002827             |           11.1 | Spreadsheet                | Review alert details: discrepancy noted, follow-up required.    |
| ACT0036020  | INV000641          |            39 | Request client information | 2026-07-04 13:40:56 | EMP004275             |           18.3 | AI Investigation Assistant | Request client information: discrepancy noted, follow-up req... |
| ACT0005714  | INV000101          |            54 | Request client information | 2026-07-28 07:14:02 | EMP001620             |           16.6 | Spreadsheet                | Request client information: discrepancy noted, follow-up req... |
| ACT0118075  | INV002092          |            50 | Review alert details       | 2025-02-01 02:31:25 | EMP000125             |           23.7 | KYCDesk                    | Review alert details: linked parties identified.                |

## E. Exhibitions & Events

### `events`

| event_id   | industry                   | city      | country     | start_date          | end_date            | event_name                    | venue                     | format    |   expected_visitors | status    | organizer_team_id   |
|:-----------|:---------------------------|:----------|:------------|:--------------------|:--------------------|:------------------------------|:--------------------------|:----------|--------------------:|:----------|:--------------------|
| EVT0063    | Healthcare & Life Sciences | Manila    | Philippines | 2026-09-14 00:00:00 | 2026-09-17 00:00:00 | Manila Healthcare Summit 2026 | Dorane Convention Centre  | In-person |                3158 | Completed | TM0046              |
| EVT0037    | Fintech & Banking          | Bangkok   | Thailand    | 2022-11-02 00:00:00 | 2022-11-04 00:00:00 | Bangkok Fintech Summit 2022   | Ulmere Convention Centre  | In-person |                2113 | Completed | TM0093              |
| EVT0061    | Food & Beverage            | Singapore | Singapore   | 2024-07-22 00:00:00 | 2024-07-25 00:00:00 | Singapore Food Expo 2024      | Alhaven Convention Centre | In-person |                7337 | Completed | TM0026              |
| EVT0018    | Packaging & Manufacturing  | Jakarta   | Indonesia   | 2023-06-14 00:00:00 | 2023-06-15 00:00:00 | Jakarta Packaging Week 2023   | Halen Convention Centre   | In-person |                3653 | Completed | TM0046              |
| EVT0042    | Food & Beverage            | Singapore | Singapore   | 2023-11-14 00:00:00 | 2023-11-17 00:00:00 | Singapore Food Forum 2023     | Venmora Convention Centre | In-person |               10421 | Completed | TM0024              |

### `event_sessions`

| session_id   | event_id   | track             | title                                                           | start_ts            |   capacity |
|:-------------|:-----------|:------------------|:----------------------------------------------------------------|:--------------------|-----------:|
| SES000472    | EVT0023    | Regulatory Update | Regulatory Update: Scaling Healthcare & Life Sciences in Asi... | 2026-09-09 09:00:00 |        100 |
| SES001491    | EVT0076    | Keynote           | Keynote: The future of Education & EdTech                       | 2025-09-30 10:00:00 |         50 |
| SES001352    | EVT0069    | Workshop          | Workshop: The future of Logistics & Supply Chain                | 2022-11-12 11:00:00 |       1500 |
| SES000639    | EVT0032    | Technical         | Technical: Regulation and Food & Beverage                       | 2025-06-23 14:00:00 |        100 |
| SES000994    | EVT0051    | Technical         | Technical: AI in Packaging & Manufacturing                      | 2025-09-16 10:00:00 |        500 |

### `exhibitors`

| exhibitor_id   | event_id   | entity_id   | package_tier   |   booth_size_sqm |   contract_value_usd | signed_date         | account_manager_employee_id   |
|:---------------|:-----------|:------------|:---------------|-----------------:|---------------------:|:--------------------|:------------------------------|
| EXH003347      | EVT0034    | ENT007866   | Premium        |               54 |                32230 | 2025-05-06 00:00:00 | EMP004411                     |
| EXH005462      | EVT0032    | ENT002431   | Space only     |               36 |                13140 | 2025-03-23 00:00:00 | EMP003214                     |
| EXH002353      | EVT0063    | ENT009238   | Shell scheme   |                9 |                 4090 | 2026-07-24 00:00:00 | EMP003763                     |
| EXH004321      | EVT0009    | ENT005912   | Shell scheme   |                9 |                 3500 | 2021-12-21 00:00:00 | EMP001616                     |
| EXH003280      | EVT0064    | ENT008540   | Space only     |               36 |                12670 | 2025-10-30 00:00:00 | EMP001347                     |

### `visitors`

| visitor_id   | first_name   | last_name   | job_title           | company_entity_id   | country       | email_domain_hash   | created_at          |
|:-------------|:-------------|:------------|:--------------------|:--------------------|:--------------|:--------------------|:--------------------|
| VIS0033910   | Maurits      | Hellevoort  | Student             | ENT008750           | Netherlands   | 11e41f2fb1          | 2023-10-16 06:31:23 |
| VIS0092308   | Xia          | Yi          | Operations Director | ENT001941           | China         | b99e0c8eac          | 2026-07-25 12:23:29 |
| VIS0089108   | Klaus        | Heß         | Procurement Manager | ENT001985           | Germany       | 2bd3ac2252          | 2022-03-31 21:21:29 |
| VIS0009539   | Sonia        | Kent        | CEO                 | ENT004706           | United States | 45120c73b9          | 2021-08-03 12:42:29 |
| VIS0031009   | Dana         | Mendoza     | Procurement Manager | ENT008752           | United States | 0cf2033878          | 2021-11-14 16:07:05 |

### `registrations`

| registration_id   | visitor_id   | event_id   | registered_at       | ticket_type   | attended   | checked_in_at       |
|:------------------|:-------------|:-----------|:--------------------|:--------------|:-----------|:--------------------|
| REG0138690        | VIS0062217   | EVT0017    | 2022-03-22 05:45:00 | Visitor       | True       | 2022-04-15 10:03:43 |
| REG0122227        | VIS0057207   | EVT0055    | 2025-10-26 09:14:10 | Visitor       | False      |                     |
| REG0136954        | VIS0032182   | EVT0034    | 2025-09-18 00:11:09 | Student       | True       | 2025-10-19 09:35:13 |
| REG0070498        | VIS0036703   | EVT0031    | 2022-06-11 00:26:01 | Visitor       | True       | 2022-07-01 08:32:12 |
| REG0102717        | VIS0018779   | EVT0080    | 2022-11-18 22:51:48 | Student       | True       | 2022-11-28 08:28:38 |

### `badge_scans`

| scan_id     | registration_id   | exhibitor_id   | scan_ts             | scan_type    |
|:------------|:------------------|:---------------|:--------------------|:-------------|
| SCN00101919 | REG0124435        | EXH000056      | 2022-11-19 10:51:45 | Demo         |
| SCN00103550 | REG0063250        | EXH001869      | 2023-03-11 10:49:46 | Booth visit  |
| SCN00012455 | REG0127312        | EXH000315      | 2024-09-13 16:29:20 | Booth visit  |
| SCN00214037 | REG0132928        | EXH003030      | 2026-06-22 09:25:34 | Lead capture |
| SCN00210937 | REG0131688        | EXH000324      | 2025-08-08 15:54:43 | Lead capture |

### `leads`

| lead_id     | exhibitor_id   | visitor_id   | event_id   | scan_id     | captured_at         |   lead_score | lead_status   | follow_up_at        | converted_customer_id   | converted_at   |
|:------------|:---------------|:-------------|:-----------|:------------|:--------------------|-------------:|:--------------|:--------------------|:------------------------|:---------------|
| LEAD0025171 | EXH005843      | VIS0084417   | EVT0074    | SCN00015979 | 2025-12-02 12:35:39 |           51 | New           | 2025-12-12 20:53:50 |                         |                |
| LEAD0010936 | EXH003764      | VIS0039603   | EVT0009    | SCN00186530 | 2022-09-22 17:06:11 |            0 | Opportunity   | 2022-10-03 00:26:11 |                         |                |
| LEAD0043597 | EXH001255      | VIS0052050   | EVT0024    | SCN00012916 | 2025-10-20 15:39:26 |           62 | Qualified     | 2025-10-22 13:20:56 |                         |                |
| LEAD0013971 | EXH001811      | VIS0036219   | EVT0075    | SCN00262499 | 2024-09-13 14:52:25 |           34 | Disqualified  | 2024-09-17 07:25:09 |                         |                |
| LEAD0024884 | EXH004508      | VIS0074469   | EVT0080    | SCN00331163 | 2022-11-29 16:30:10 |           56 | Qualified     | 2022-12-04 19:09:55 |                         |                |

### `session_attendance`

| attendance_id   | registration_id   | session_id   | checked_in_at       |
|:----------------|:------------------|:-------------|:--------------------|
| SAT0089284      | REG0112442        | SES001236    | 2022-03-29 09:51:41 |
| SAT0115518      | REG0111780        | SES001271    | 2026-04-24 13:54:21 |
| SAT0063272      | REG0067908        | SES000032    | 2023-07-22 08:48:49 |
| SAT0118311      | REG0066018        | SES001469    | 2024-09-13 09:08:20 |
| SAT0042186      | REG0004690        | SES000599    | 2025-09-16 14:17:26 |

### `event_feedback`

| feedback_id   | registration_id   | event_id   |   nps |   satisfaction | comment                                                      | submitted_at        |
|:--------------|:------------------|:-----------|------:|---------------:|:-------------------------------------------------------------|:--------------------|
| FB0007670     | REG0105267        | EVT0046    |     5 |              3 | Sessions started late and the audio was poor.                | 2025-07-03 13:58:54 |
| FB0002262     | REG0097729        | EVT0058    |     7 |              3 | Good event overall, venue was a bit far.                     | 2023-01-07 14:37:23 |
| FB0020572     | REG0004391        | EVT0075    |    10 |              5 |                                                              | 2024-09-16 05:46:42 |
| FB0005427     | REG0132063        | EVT0009    |     9 |              4 | Great networking opportunities and very relevant exhibitors. | 2022-10-02 17:43:54 |
| FB0011131     | REG0083048        | EVT0025    |     8 |              4 |                                                              | 2025-08-13 18:29:57 |

## F. Customer Service & Support

### `products`

| product_id   | product_name              | division_id   | product_line          | pricing_model       | launch_date         | is_ai_enabled   |   list_price_usd |
|:-------------|:--------------------------|:--------------|:----------------------|:--------------------|:--------------------|:----------------|-----------------:|
| PRD113       | Agora Alara Exhibitor     | DIV04         | Exhibitor Packages    | Per seat            | 2013-06-10 00:00:00 | True            |             5400 |
| PRD075       | Sentinel Mormere KYC/AML  | DIV03         | KYC/AML Screening     | Annual subscription | 2022-08-04 00:00:00 | False           |            13500 |
| PRD080       | Sentinel Toraris KYC/AML  | DIV03         | KYC/AML Screening     | Per seat            | 2014-01-30 00:00:00 | False           |            22200 |
| PRD088       | Sentinel Talmere Identity | DIV03         | Identity Verification | Annual subscription | 2017-01-02 00:00:00 | False           |            16500 |
| PRD098       | Agora Valcrest Exhibitor  | DIV04         | Exhibitor Packages    | Per seat            | 2015-07-01 00:00:00 | True            |             9600 |

### `subscriptions`

| subscription_id   | customer_id   | product_id   | start_date          | end_date            |   seats |   annual_value_usd | currency   | auto_renew   | status   |
|:------------------|:--------------|:-------------|:--------------------|:--------------------|--------:|-------------------:|:-----------|:-------------|:---------|
| SUB0001253        | CUS005305     | PRD085       | 2023-06-14 00:00:00 | 2024-06-12 00:00:00 |      55 |              15380 | USD        | True         | Expired  |
| SUB0010445        | CUS002983     | PRD105       | 2026-03-06 00:00:00 | 2029-03-04 00:00:00 |      26 |              15210 | USD        | False        | Active   |
| SUB0008995        | CUS005556     | PRD029       | 2026-07-03 00:00:00 | 2027-07-02 00:00:00 |      47 |              12330 | USD        | True         | Active   |
| SUB0007464        | CUS000255     | PRD023       | 2023-05-18 00:00:00 | 2025-05-16 00:00:00 |      37 |               7210 | USD        | True         | Expired  |
| SUB0001911        | CUS002189     | PRD024       | 2023-04-20 00:00:00 | 2026-04-18 00:00:00 |      10 |                920 | USD        | False        | Expired  |

### `customers`

| customer_id   | segment               | institution_id   | entity_id   | customer_name                    | country        | region   | primary_division_id   | tier     | account_owner_employee_id   | created_date        | status   |
|:--------------|:----------------------|:-----------------|:------------|:---------------------------------|:---------------|:---------|:----------------------|:---------|:----------------------------|:--------------------|:---------|
| CUS009064     | Financial Institution |                  | ENT009026   | Lumford Technologies Pte. Ltd.   | United Kingdom | EMEA     | DIV03                 | Standard | EMP004601                   | 2016-05-24 00:00:00 | Churned  |
| CUS007452     | Events Client         |                  | ENT009787   | Isteon Systems GmbH - Compliance | Indonesia      | APAC     | DIV04                 | Standard | EMP002643                   | 2018-08-27 00:00:00 | Active   |
| CUS008371     | Government            |                  | ENT006844   | Galgate Energy S.A. - Legal Dept | United States  | Americas | DIV02                 | Standard | EMP000617                   | 2015-03-06 00:00:00 | Active   |
| CUS001858     | Academic              | INS002046        |             | North Fenvale Medical Center     | Germany        | EMEA     | DIV01                 | Standard | EMP004363                   | 2023-02-03 00:00:00 | Active   |
| CUS000248     | Events Client         |                  | ENT009765   | Pelstone Motors GmbH             | Brazil         | Americas | DIV04                 | Standard | EMP004771                   | 2021-12-07 00:00:00 | Active   |

### `churn_events`

| churn_id   | customer_id   | churn_date          | primary_subscription_id   | churn_reason            |   arr_lost_usd |
|:-----------|:--------------|:--------------------|:--------------------------|:------------------------|---------------:|
| CHN01528   | CUS010341     | 2026-08-28 00:00:00 | SUB0001173                | Moved to competitor     |          56810 |
| CHN00618   | CUS009793     | 2025-07-26 00:00:00 | SUB0002726                | Poor support experience |          14590 |
| CHN00949   | CUS001887     | 2025-04-04 00:00:00 | SUB0000036                | Budget cuts             |         224500 |
| CHN00059   | CUS003629     | 2025-09-17 00:00:00 | SUB0002951                | Budget cuts             |           6280 |
| CHN01353   | CUS001245     | 2024-12-10 00:00:00 | SUB0024292                | Budget cuts             |           7860 |

### `product_usage_monthly`

| usage_id    | subscription_id   | customer_id   | product_id   | usage_month         |   active_users |   sessions |   searches |   downloads |   api_calls |
|:------------|:------------------|:--------------|:-------------|:--------------------|---------------:|-----------:|-----------:|------------:|------------:|
| USG00119119 | SUB0006750        | CUS006710     | PRD012       | 2023-03-01 00:00:00 |             32 |        126 |       1112 |         116 |           0 |
| USG00138891 | SUB0007868        | CUS008796     | PRD007       | 2026-09-01 00:00:00 |             77 |        506 |       1318 |         485 |           0 |
| USG00101065 | SUB0005713        | CUS011429     | PRD071       | 2022-01-01 00:00:00 |             34 |        239 |        703 |         104 |           0 |
| USG00207992 | SUB0011694        | CUS005171     | PRD073       | 2025-07-01 00:00:00 |             93 |        341 |       1929 |         357 |       37007 |
| USG00079262 | SUB0004471        | CUS010401     | PRD065       | 2025-12-01 00:00:00 |             67 |        337 |       1684 |         251 |           0 |

### `support_cases`

| case_id   | customer_id   | product_id   | division_id   | team_id   | agent_employee_id   | channel   | category               | subcategory               | subject                                               | priority   | created_at          | first_response_at   | resolved_at         | status   |   sla_hours | sla_met   |   handle_time_min |   csat | reopened   | escalated   | kb_article_id   | resolution_summary                                              | ai_copilot_used   |
|:----------|:--------------|:-------------|:--------------|:----------|:--------------------|:----------|:-----------------------|:--------------------------|:------------------------------------------------------|:-----------|:--------------------|:--------------------|:--------------------|:---------|------------:|:----------|------------------:|-------:|:-----------|:------------|:----------------|:----------------------------------------------------------------|:------------------|
| CS0041089 | CUS010443     | PRD006       | DIV01         | TM0026    | EMP002269           | Chat      | Access & Login         | IP authentication failure | IP authentication failure - Lumina Ulgate eBooks      | P3         | 2023-03-11 10:39:10 | 2023-03-11 11:55:54 | 2023-03-12 04:18:51 | Resolved |          24 | True      |              21.4 |      4 | True       | False       |                 | Configuration corrected by L2.                                  | False             |
| CS0054902 | CUS002295     | PRD061       | DIV02         | TM0068    | EMP003059           | Email     | Training & Onboarding  | Training session request  | Training session request - Veritas Quingate Practical | P3         | 2025-12-10 14:16:16 | 2025-12-10 16:23:10 | 2025-12-11 04:31:52 | Resolved |          24 | True      |              11.4 |      3 | False      | False       |                 | Customer educated on feature usage.                             | False             |
| CS0049232 | CUS002094     | PRD023       | DIV01         | TM0007    | EMP002942           | Email     | Access & Login         | Password reset            | Password reset - Lumina Lumcrest Author               | P3         | 2023-02-21 10:58:43 | 2023-02-21 13:03:55 | 2023-02-22 19:54:01 | Resolved |          24 | False     |              12.7 |      3 | False      | True        |                 | Entitlement updated.                                            | False             |
| CS0008765 | CUS004106     | PRD014       | DIV01         | TM0052    | EMP001302           | Chat      | Account Administration | Change admin contact      | Change admin contact - Lumina Alaris Journal          | P3         | 2023-02-02 14:21:53 | 2023-02-02 15:11:38 | 2023-02-05 01:19:53 | Resolved |          24 | False     |              26.9 |        | False      | False       | KB001446        | Resolved by following KB001446: FAQ: how do I reconcile paym... | False             |
| CS0098601 | CUS003926     | PRD029       | DIV01         | TM0111    | EMP000632           | Email     | Training & Onboarding  | Admin onboarding          | Admin onboarding - Lumina Fenwick Author              | P3         | 2026-05-05 11:51:41 | 2026-05-05 12:48:10 | 2026-05-05 16:40:12 | Resolved |          24 | True      |              10.9 |      3 | False      | False       | KB006920        | Resolved by following KB006920: FAQ: how do I request elevat... | False             |

### `case_interactions`

| interaction_id   | case_id   |   sequence_no | channel   | direction   | author_type   | employee_id   | interaction_ts      | message_text                                                    | ai_drafted   |
|:-----------------|:----------|--------------:|:----------|:------------|:--------------|:--------------|:--------------------|:----------------------------------------------------------------|:-------------|
| CI00013938       | CS0003661 |             3 | Email     | Inbound     | Customer      |               | 2025-05-25 10:43:14 | Thanks, here are the details you asked for.                     | False        |
| CI00000522       | CS0000130 |             2 | Email     | Outbound    | Bot           | EMP004426     | 2025-01-02 16:54:09 | Thank you for reaching out. I am looking into 'Missing back ... | False        |
| CI00182470       | CS0047783 |             1 | Email     | Inbound     | Customer      |               | 2024-12-31 14:32:07 | Hello, our users report 'Export to Word fails' when using Se... | False        |
| CI00061333       | CS0016156 |             4 | Chat      | Outbound    | Agent         | EMP002657     | 2026-07-09 14:40:55 | Thank you for reaching out. I am looking into 'Missing back ... | True         |
| CI00141127       | CS0037014 |             1 | Web form  | Inbound     | Customer      |               | 2022-02-02 15:06:13 | Hi team, we are experiencing an issue: Duplicate charge on V... | False        |

### `feature_requests`

| feature_request_id   | customer_id   | product_id   | case_id   | submitted_at        | title                        |   votes | status       | linked_project_id   |
|:---------------------|:--------------|:-------------|:----------|:--------------------|:-----------------------------|--------:|:-------------|:--------------------|
| FR003407             | CUS009959     | PRD032       |           | 2024-12-09 16:47:16 | Support Filipino language UI |       9 | Under review |                     |
| FR000758             | CUS010839     | PRD081       |           | 2025-06-06 12:38:21 | Support Filipino language UI |      13 | Declined     |                     |
| FR003625             | CUS000820     | PRD041       |           | 2024-09-30 14:39:52 | Allow bulk API pagination    |       1 | Under review |                     |
| FR004545             | CUS003167     | PRD105       |           | 2025-09-01 11:21:42 | Allow bulk export to Excel   |       9 | Declined     |                     |
| FR003236             | CUS007744     | PRD032       | CS0072236 | 2024-12-13 14:35:32 | Support AI summaries         |       9 | New          |                     |

### `renewal_opportunities`

| renewal_opportunity_id   | subscription_id   | customer_id   | renewal_due_date    |   forecast_value_usd | owner_employee_id   | stage    | outcome   |
|:-------------------------|:------------------|:--------------|:--------------------|---------------------:|:--------------------|:---------|:----------|
| REN009064                | SUB0025697        | CUS003580     | 2028-04-19 00:00:00 |                12190 | EMP003862           | Proposal |           |
| REN007452                | SUB0021375        | CUS009437     | 2024-10-09 00:00:00 |                 4190 | EMP002521           | Closed   | Lost      |
| REN008371                | SUB0009994        | CUS002634     | 2026-04-01 00:00:00 |                33060 | EMP000891           | Closed   | Won       |
| REN001858                | SUB0017265        | CUS011941     | 2027-12-31 00:00:00 |                 4370 | EMP004172           | Proposal |           |
| REN000248                | SUB0020814        | CUS003125     | 2026-12-08 00:00:00 |                 3830 | EMP003382           | Proposal |           |

## G. Finance Shared Services

### `cost_centers`

| cost_center_id   | department_id   | division_id   | cost_center_name             | site_id   |
|:-----------------|:----------------|:--------------|:-----------------------------|:----------|
| CC0030           | DEP020          | DIV03         | Risk Model Monitoring Ops    | SITE01    |
| CC0034           | DEP023          | DIV04         | Visitor Registration Ops     | SITE02    |
| CC0031           | DEP021          | DIV03         | Risk Client Support Ops      | SITE02    |
| CC0011           | DEP007          | DIV01         | Author Services Ops          | SITE01    |
| CC0037           | DEP025          | DIV04         | Event Marketing Ops Projects | SITE01    |

### `suppliers`

| supplier_id   | entity_id   | supplier_name           | category              | country                    |   payment_terms_days | risk_tier   | preferred   | onboarded_date      | status   |
|:--------------|:------------|:------------------------|:----------------------|:---------------------------|---------------------:|:------------|:------------|:--------------------|:---------|
| SUP001414     | ENT002951   | Verion Trading B.V.     | Professional Services | Indonesia                  |                   30 | Low         | False       | 2024-03-18 00:00:00 | Active   |
| SUP000639     | ENT004091   | Verix Finance K.K.      | Facilities            | UAE                        |                   30 | Low         | False       | 2021-08-06 00:00:00 | Active   |
| SUP001184     | ENT000762   | Calora Trading PLC      | Events Services       | Japan                      |                   30 | Low         | False       | 2014-04-11 00:00:00 | Active   |
| SUP001666     | ENT006931   | Torcrest Biotech K.K.   | Events Services       | UAE                        |                   15 | Low         | True        | 2014-07-09 00:00:00 | Active   |
| SUP002069     | ENT002172   | Quinvanta Robotics S.A. | Content Vendors       | Isle of Calder (fictional) |                   30 | Medium      | False       | 2020-11-27 00:00:00 | Active   |

### `supplier_enrollment_requests`

| enrollment_request_id   | supplier_id   | requested_by_employee_id   | submitted_at        | documents_complete_first_pass   | tax_document_ok   | bank_details_ok   | sanctions_screen_ok   |   turnaround_days | decided_at          | status                     |
|:------------------------|:--------------|:---------------------------|:--------------------|:--------------------------------|:------------------|:------------------|:----------------------|------------------:|:--------------------|:---------------------------|
| SER001307               | SUP001307     | EMP000566                  | 2015-10-23 01:46:28 | True                            | True              | True              | True                  |               7   | 2015-10-30 02:46:42 | Approved                   |
| SER002038               | SUP002038     | EMP001904                  | 2025-08-13 00:22:05 | False                           | True              | True              | True                  |              33.7 | 2025-09-15 16:42:05 | Approved                   |
| SER000569               | SUP000569     | EMP004594                  | 2015-01-28 20:56:21 | True                            | True              | True              | True                  |               5.5 | 2015-02-03 10:06:14 | Approved                   |
| SER001898               | SUP001898     | EMP000380                  | 2019-09-26 16:49:26 | True                            | True              | False             | True                  |               4.4 | 2019-10-01 01:33:27 | Approved after remediation |
| SER002499               | SUP001198     | EMP002548                  | 2026-04-22 21:48:58 | True                            | True              | True              | True                  |              17.5 | 2026-05-10 10:10:06 | Approved - update          |

### `purchase_orders`

| po_id     | supplier_id   | cost_center_id   | requester_employee_id   | approver_employee_id   | po_date             | currency   |   po_amount | status             |
|:----------|:--------------|:-----------------|:------------------------|:-----------------------|:--------------------|:-----------|------------:|:-------------------|
| PO0007670 | SUP001556     | CC0053           | EMP001936               | EMP000035              | 2026-02-26 00:00:00 | USD        |     7327.82 | Partially invoiced |
| PO0002262 | SUP001743     | CC0019           | EMP002472               | EMP000012              | 2026-05-15 00:00:00 | USD        |    10369.6  | Closed             |
| PO0020572 | SUP002131     | CC0046           | EMP003041               | EMP000018              | 2026-01-16 00:00:00 | GBP        |     1715.16 | Closed             |
| PO0005427 | SUP000375     | CC0013           | EMP004203               | EMP000154              | 2024-12-25 00:00:00 | PHP        |   859682    | Closed             |
| PO0011131 | SUP002163     | CC0023           | EMP004831               | EMP000131              | 2025-06-23 00:00:00 | PHP        |   247073    | Closed             |

### `invoices`

| invoice_id   | supplier_id   | po_id     | currency   | invoice_date        |   net_amount |   tax_amount |   gross_amount |   amount_usd | invoice_number   | received_at         | due_date            | approval_level   | channel         |   ocr_confidence | processor_employee_id   | status   |
|:-------------|:--------------|:----------|:-----------|:--------------------|-------------:|-------------:|---------------:|-------------:|:-----------------|:--------------------|:--------------------|:-----------------|:----------------|-----------------:|:------------------------|:---------|
| INV0007267   | SUP002292     | PO0021500 | PHP        | 2024-09-23 00:00:00 |    867556    |    104107    |      971663    |     17351.1  | 2292-2409-15606  | 2024-09-25 10:25:33 | 2024-10-23 00:00:00 | L2 - Manager     | EDI             |                  | EMP004216               | Paid     |
| INV0045375   | SUP002268     | PO0028918 | EUR        | 2026-09-23 00:00:00 |      8094.23 |         0    |        8094.23 |      8741.77 | 2268-2609-03629  | 2026-09-25 03:45:41 | 2026-10-23 00:00:00 | L1 - Team Lead   | EDI             |                  | EMP000874               | Approved |
| INV0023446   | SUP001973     | PO0001601 | PHP        | 2023-05-10 00:00:00 |    112772    |     13532.7  |      126305    |      2255.45 | 1973-2305-84686  | 2023-05-14 07:13:31 | 2023-07-09 00:00:00 | L1 - Team Lead   | Email           |             0.95 | EMP000836               | Paid     |
| INV0075948   | SUP000522     | PO0032973 | USD        | 2024-02-09 00:00:00 |     13879.7  |       693.98 |       14573.6  |     14573.6  | 0522-2402-51778  | 2024-02-12 02:35:49 | 2024-03-25 00:00:00 | L2 - Manager     | Supplier portal |                  | EMP004680               | Paid     |
| INV0016047   | SUP002292     | PO0003812 | USD        | 2025-06-08 00:00:00 |      3068.34 |       306.83 |        3375.17 |      3375.17 | 2292-2506-45279  | 2025-06-12 13:50:56 | 2025-07-08 00:00:00 | L1 - Team Lead   | Email           |             0.84 | EMP004952               | Paid     |

### `invoice_lines`

| invoice_line_id   | invoice_id   |   line_no | description            |   quantity |   unit_price |   line_amount | gl_account      | cost_center_id   |
|:------------------|:-------------|----------:|:-----------------------|-----------:|-------------:|--------------:|:----------------|:-----------------|
| IL00101919        | INV0030072   |         1 | Facility maintenance   |          1 |       248.07 |        248.07 | 6300 Facilities | CC0026           |
| IL00103550        | INV0030546   |         2 | Facility maintenance   |          1 |     15822.4  |      15822.4  | 6300 Facilities | CC0001           |
| IL00012455        | INV0003709   |         1 | Licence renewal        |          1 |     28318    |      28318    | 6100 Software   | CC0004           |
| IL00214037        | INV0063133   |         1 | Licence renewal        |          2 |       371.22 |        742.44 | 6100 Software   | CC0026           |
| IL00210937        | INV0062214   |         2 | Travel & accommodation |          1 |      1768.96 |       1768.96 | 6500 Travel     | CC0018           |

### `invoice_exceptions`

| exception_id   | invoice_id   | exception_type   | raised_at           | resolved_at         | resolver_employee_id   | resolution               |
|:---------------|:-------------|:-----------------|:--------------------|:--------------------|:-----------------------|:-------------------------|
| IEX0001169     | INV0005399   | Missing PO       | 2023-02-10 11:11:06 | 2023-02-10 16:21:54 | EMP001327              | Approved by budget owner |
| IEX0025596     | INV0118764   | Missing PO       | 2025-08-10 06:34:07 | 2025-08-11 06:22:49 | EMP004184              | Rejected to supplier     |
| IEX0022085     | INV0102683   | Missing PO       | 2025-04-06 21:15:09 | 2025-04-08 17:16:24 | EMP001074              | PO amended               |
| IEX0003894     | INV0018134   | Missing PO       | 2022-10-07 04:34:26 | 2022-10-12 20:41:02 | EMP001488              | Credit note requested    |
| IEX0003981     | INV0018563   | Tax error        | 2024-10-16 03:24:04 | 2024-10-16 18:08:20 | EMP003298              | PO amended               |

### `payments`

| payment_id   | invoice_id   | paid_at             |    amount | currency   | method        | payment_run_id   |   days_vs_due |
|:-------------|:-------------|:--------------------|----------:|:-----------|:--------------|:-----------------|--------------:|
| PAY0042086   | INV0047050   | 2023-03-04 10:00:00 | 102664    | PHP        | Bank transfer | RUN-202309       |            -4 |
| PAY0039798   | INV0044488   | 2023-02-13 10:00:00 |  12123.6  | USD        | Bank transfer | RUN-202307       |           -10 |
| PAY0083342   | INV0093164   | 2025-11-11 10:00:00 | 926669    | PHP        | Bank transfer | RUN-202545       |             0 |
| PAY0045226   | INV0050562   | 2026-09-11 10:00:00 |   6091.02 | USD        | Bank transfer | RUN-202636       |             4 |
| PAY0025943   | INV0029029   | 2025-05-07 10:00:00 |  91774.2  | PHP        | Wire          | RUN-202518       |            -1 |

### `opex_budget_vs_actual`

| opex_row_id   | cost_center_id   | division_id   | month               |   budget_php |   actual_php |   variance_php |   variance_pct |
|:--------------|:-----------------|:--------------|:--------------------|-------------:|-------------:|---------------:|---------------:|
| OPX001182     | CC0021           | DIV02         | 2025-06-01 00:00:00 |    2.718e+06 |    2.847e+06 |         129000 |           4.75 |
| OPX002520     | CC0045           | DIV05         | 2022-12-01 00:00:00 |    2.047e+06 |    2.057e+06 |          10000 |           0.49 |
| OPX000268     | CC0005           | DIV01         | 2025-04-01 00:00:00 |    2.303e+06 |    2.562e+06 |         259000 |          11.25 |
| OPX001543     | CC0028           | DIV03         | 2022-04-01 00:00:00 |    2.759e+06 |    2.732e+06 |         -27000 |          -0.98 |
| OPX001224     | CC0022           | DIV03         | 2024-03-01 00:00:00 |    3.838e+06 |    3.735e+06 |        -103000 |          -2.68 |

## H. Technology & IT Operations

### `applications`

| app_id   | app_name        | division_id   | owner_team_id   | purpose       | criticality   | hosting   | tech_stack     | data_classification   | go_live_date        |
|:---------|:----------------|:--------------|:----------------|:--------------|:--------------|:----------|:---------------|:----------------------|:--------------------|
| APP0433  | Pelaris Portal  | DIV03         | TM0087          | Integration   | Tier 2        | AWS       | Vendor SaaS    | Confidential          | 2017-05-02 00:00:00 |
| APP0329  | Zanara Sync     | DIV03         | TM0090          | Reporting     | Tier 2        | SaaS      | RPA            | Restricted            | 2026-05-18 00:00:00 |
| APP0205  | Dorix Dashboard | DIV02         | TM0114          | Data pipeline | Tier 3        | SaaS      | Python/FastAPI | Internal              | 2024-08-28 00:00:00 |
| APP0217  | Normere Hub     | DIV01         | TM0055          | Data pipeline | Tier 3        | SaaS      | .NET           | Confidential          | 2022-02-07 00:00:00 |
| APP0201  | Valith Studio   | DIV03         | TM0100          | Internal tool | Tier 3        | SaaS      | Node.js/React  | Internal              | 2022-01-11 00:00:00 |

### `changes`

| change_id   | app_id   | change_type   | requested_by_employee_id   | requested_at        | approved_at         | implemented_at      | risk_level   | outcome    |
|:------------|:---------|:--------------|:---------------------------|:--------------------|:--------------------|:--------------------|:-------------|:-----------|
| CHG003642   | APP0427  | Standard      | EMP004721                  | 2026-07-03 09:22:03 | 2026-07-05 00:55:23 | 2026-07-06 17:50:26 | Low          | Successful |
| CHG005087   | APP0036  | Normal        | EMP000516                  | 2024-11-05 17:50:26 | 2024-11-06 09:38:28 | 2024-11-08 13:43:28 | Medium       | Successful |
| CHG001658   | APP0285  | Standard      | EMP002044                  | 2026-05-29 13:54:23 | 2026-05-30 04:37:47 | 2026-06-02 05:39:29 | High         | Successful |
| CHG006843   | APP0442  | Standard      | EMP004436                  | 2022-01-04 16:26:19 | 2022-01-05 10:31:24 | 2022-01-08 02:38:41 | Low          | Successful |
| CHG000789   | APP0123  | Standard      | EMP000770                  | 2022-06-13 15:52:23 | 2022-06-15 08:10:07 | 2022-06-17 18:04:09 | Low          | Successful |

### `problems`

| problem_id   | app_id   | root_cause_category   | root_cause_summary                         | opened_at           | closed_at           | known_error   |
|:-------------|:---------|:----------------------|:-------------------------------------------|:--------------------|:--------------------|:--------------|
| PRB00062     | APP0450  | Capacity              | Database connection pool exhausted at peak | 2026-08-28 16:19:58 | 2026-09-14 18:59:19 | False         |
| PRB00800     | APP0002  | Third-party outage    | Vendor API degraded                        | 2022-01-06 14:48:03 | 2022-04-07 23:49:01 | True          |
| PRB00748     | APP0365  | Network               | Intermittent packet loss on VPN            | 2024-08-22 12:36:21 | 2024-09-11 15:08:13 | True          |
| PRB00669     | APP0254  | Failed change         | Deployment introduced regression           | 2022-07-15 13:42:00 | 2022-08-24 19:54:15 | True          |
| PRB00727     | APP0182  | Software defect       | Null handling bug in batch job             | 2026-07-10 12:00:15 | 2026-09-12 14:03:24 | True          |

### `it_tickets`

| ticket_id   | ticket_type     | app_id   | requester_employee_id   | assignment_group_team_id   | assignee_employee_id   | priority   | created_at          | category         | short_description                               |   sla_hours | resolved_at         | status   | sla_met   | kb_article_id   | resolution_notes                                                | reopened   |
|:------------|:----------------|:---------|:------------------------|:---------------------------|:-----------------------|:-----------|:--------------------|:-----------------|:------------------------------------------------|------------:|:--------------------|:---------|:----------|:----------------|:----------------------------------------------------------------|:-----------|
| TKT0025171  | Incident        | APP0117  | EMP000485               | TM0035                     | EMP003886              | P4         | 2024-12-16 16:17:55 | Error message    | Error message issue on Fenmora Engine           |          72 | 2024-12-17 08:27:25 | Resolved | True      |                 | Restarted service and cleared cache.                            | False      |
| TKT0010936  | Service Request | APP0047  | EMP000452               | TM0035                     | EMP003079              | P3         | 2024-04-12 11:02:03 | Error message    | Orion Hub: Error message                        |          24 | 2024-04-13 20:16:30 | Resolved | False     |                 | Reinstalled client; issue resolved.                             | False      |
| TKT0043597  | Access          | APP0181  | EMP002936               | TM0043                     | EMP002738              | P3         | 2023-07-04 04:20:17 | Data request     | Fenmora Hub: Data request                       |          24 | 2023-07-07 00:39:35 | Resolved | False     | KB002008        | Followed KB002008 (Reference: process supplier enrollment (S... | True       |
| TKT0013971  | Service Request | APP0239  | EMP001663               | TM0034                     | EMP003489              | P2         | 2023-06-21 15:01:10 | Login / SSO      | Login / SSO issue on Bricrest Gateway           |           8 | 2023-06-22 21:39:09 | Resolved | False     |                 | Access granted after approval.                                  | False      |
| TKT0024884  | Question        | APP0115  | EMP000937               | TM0036                     | EMP001762              | P3         | 2025-07-24 17:06:05 | Software install | Need help - Software install (Belridge Gateway) |          24 | 2025-07-24 23:36:07 | Resolved | True      |                 | Access granted after approval.                                  | False      |

### `incidents`

| incident_id   | ticket_id   | app_id   | severity   | started_at          | detected_at         | resolved_at         |   impacted_users | caused_by_change_id   | problem_id   |
|:--------------|:------------|:---------|:-----------|:--------------------|:--------------------|:--------------------|-----------------:|:----------------------|:-------------|
| INC003407     | TKT0000610  | APP0010  | Sev4       | 2024-03-13 12:10:36 | 2024-03-13 12:47:40 | 2024-03-14 13:45:10 |               33 |                       | PRB00530     |
| INC000758     | TKT0044909  | APP0438  | Sev4       | 2023-10-12 09:30:50 | 2023-10-12 09:59:07 | 2023-10-12 19:54:38 |              468 |                       |              |
| INC003625     | TKT0044342  | APP0312  | Sev2       | 2025-12-22 11:52:31 | 2025-12-22 13:01:38 | 2025-12-24 15:19:08 |              226 |                       |              |
| INC004545     | TKT0001929  | APP0306  | Sev2       | 2025-03-17 13:04:54 | 2025-03-17 13:18:54 | 2025-03-19 23:29:54 |               35 |                       |              |
| INC003236     | TKT0034531  | APP0365  | Sev4       | 2024-03-04 14:21:11 | 2024-03-04 14:40:02 | 2024-03-04 21:14:05 |               16 | CHG005413             | PRB00207     |

### `access_requests`

| access_request_id   | requester_employee_id   | app_id   | access_type   | justification                                       | requested_at        | completed_at        | status    |   turnaround_hours |
|:--------------------|:------------------------|:---------|:--------------|:----------------------------------------------------|:--------------------|:--------------------|:----------|-------------------:|
| ACR001978           | EMP002579               | APP0230  | Standard      | Role change - new responsibilities                  | 2022-04-01 14:13:18 | 2022-04-02 00:41:48 | Completed |               10.5 |
| ACR003881           | EMP001169               | APP0074  | Elevated      | Role change - new responsibilities                  | 2023-05-22 11:20:59 | 2023-05-24 18:51:56 | Completed |               55.5 |
| ACR000053           | EMP001997               | APP0296  | Standard      | Data extract for EnSightful-like analytics analysis | 2023-04-26 14:32:20 | 2023-04-27 20:19:53 | Completed |               29.8 |
| ACR002552           | EMP004028               | APP0290  | Standard      | Role change - new responsibilities                  | 2022-06-10 15:35:32 | 2022-06-11 07:15:34 | Completed |               15.7 |
| ACR002247           | EMP000786               | APP0383  | Standard      | Data extract for EnSightful-like analytics analysis | 2024-10-03 10:06:07 | 2024-10-03 21:55:02 | Completed |               11.8 |

### `access_request_approvals`

| approval_id   | access_request_id   |   step_no | approval_step   | approver_employee_id   | assigned_at         | decided_at          | decision   |
|:--------------|:--------------------|----------:|:----------------|:-----------------------|:--------------------|:--------------------|:-----------|
| APV0014789    | ACR005359           |         2 | Provisioning    | EMP000480              | 2023-12-12 23:09:57 | 2023-12-13 04:05:50 | Approved   |
| APV0001170    | ACR000420           |         2 | Data Owner      | EMP000032              | 2022-04-11 15:13:01 | 2022-04-13 19:29:01 | Approved   |
| APV0017589    | ACR006377           |         2 | Provisioning    | EMP004659              | 2024-07-23 03:49:58 | 2024-07-23 08:07:03 | Approved   |
| APV0011855    | ACR004287           |         2 | Provisioning    | EMP004642              | 2024-08-23 12:59:02 | 2024-08-23 16:09:44 | Approved   |
| APV0004770    | ACR001724           |         1 | Manager         | EMP000198              | 2024-12-21 16:05:26 | 2024-12-22 00:05:26 | Approved   |

### `system_events`

| system_event_id   | app_id   | event_ts            | event_type   | severity   |   latency_ms | error_code   | host         | user_employee_id   |
|:------------------|:---------|:--------------------|:-------------|:-----------|-------------:|:-------------|:-------------|:-------------------|
| SE00101919        | APP0290  | 2025-10-19 12:08:01 | job_run      | INFO       |          164 |              | ip-10-39-87  |                    |
| SE00103550        | APP0238  | 2025-04-10 11:46:55 | api_call     | INFO       |          290 |              | ip-10-3-28   |                    |
| SE00012455        | APP0330  | 2026-04-05 13:19:51 | request      | INFO       |          671 |              | ip-10-1-106  |                    |
| SE00214037        | APP0203  | 2025-12-08 08:27:30 | auth         | INFO       |          158 |              | ip-10-1-91   | EMP003341          |
| SE00210937        | APP0022  | 2026-03-18 17:46:00 | api_call     | INFO       |          203 |              | ip-10-21-240 |                    |

## I. Process Intelligence (Process Mining)

### `process_definitions`

| process_id   | process_name          | division_id   | owner_department_id   | source_table   |   sla_hours | has_event_log   | standard_path                                                   |
|:-------------|:----------------------|:--------------|:----------------------|:---------------|------------:|:----------------|:----------------------------------------------------------------|
| PRC018       | Practice Note Update  | DIV02         | DEP014                |                |          72 | False           | Intake > Validate > Process > Quality check > Approve > Clos... |
| PRC038       | Content Release       | DIV01         | DEP003                |                |         120 | False           | Intake > Validate > Process > Quality check > Approve > Clos... |
| PRC035       | Model Deployment      | DIV05         | DEP040                |                |         240 | False           | Intake > Validate > Process > Quality check > Approve > Clos... |
| PRC019       | Identity Verification | DIV03         | DEP015                |                |          24 | False           | Intake > Validate > Process > Quality check > Approve > Clos... |
| PRC033       | Incident Management   | DIV05         | DEP035                |                |          48 | False           | Intake > Validate > Process > Quality check > Approve > Clos... |

### `process_activities`

| activity_id   | process_id   | activity_name        |   standard_sequence | is_manual   |   rule_based_pct |   standard_effort_min |
|:--------------|:-------------|:---------------------|--------------------:|:------------|-----------------:|----------------------:|
| PRC020-A04    | PRC020       | Quality check        |                   4 | True        |               82 |                     8 |
| PRC039-A05    | PRC039       | Approve              |                   5 | True        |               72 |                    11 |
| PRC035-A06    | PRC035       | Close                |                   6 | True        |               56 |                    32 |
| PRC003-A07    | PRC003       | Disposition recorded |                   7 | True        |               60 |                     4 |
| PRC008-A03    | PRC008       | Documents received   |                   3 | False       |              100 |                     0 |

### `process_event_log`

| event_id   | case_id    | process_id   | activity         | activity_id   | event_ts            | resource_employee_id   | system_app_id   |   cost_php | lifecycle   |
|:-----------|:-----------|:-------------|:-----------------|:--------------|:--------------------|:-----------------------|:----------------|-----------:|:------------|
| EV00101919 | MS00023699 | PRC001       | Technical check  | PRC001-A02    | 2024-06-30 21:27:29 | EMP000369              | APP0001         |      71.16 | complete    |
| EV00103550 | MS00024040 | PRC001       | Accepted         | PRC001-A08    | 2023-04-16 16:07:10 | EMP001100              | APP0001         |      15    | complete    |
| EV00012455 | MS00003007 | PRC001       | Decision issued  | PRC001-A06    | 2024-10-17 02:35:03 | EMP001197              | APP0001         |     122.8  | complete    |
| EV00214037 | MS00049592 | PRC001       | Reviews received | PRC001-A05    | 2025-10-23 15:01:37 | EMP004308              | APP0001         |      12.51 | complete    |
| EV00210937 | MS00048865 | PRC001       | Editor assigned  | PRC001-A03    | 2024-03-09 12:40:18 | EMP000657              | APP0001         |      32.58 | complete    |

### `automation_candidates`

| candidate_id   | process_id   | activity_id   | activity_name       |   annual_volume_2023 |   avg_effort_min |   annual_hours |   rule_based_pct |   exception_rate_pct |   automation_score | recommended_approach   | survey_date         |
|:---------------|:-------------|:--------------|:--------------------|---------------------:|-----------------:|---------------:|-----------------:|---------------------:|-------------------:|:-----------------------|:--------------------|
| AUT0015        | PRC008       | PRC008-A02    | Request documents   |                 5021 |               10 |            837 |               70 |                 36.8 |               29.8 | IDP + human review     | 2023-12-15 00:00:00 |
| AUT0013        | PRC001       | PRC001-A09    | Production handover |                 3971 |                8 |            529 |               75 |                 29.2 |               33.3 | IDP + human review     | 2023-12-15 00:00:00 |
| AUT0017        | PRC006       | PRC006-A03    | Tax document check  |                  251 |               10 |             42 |               85 |                 16.8 |               26.6 | RPA / rules engine     | 2023-12-15 00:00:00 |
| AUT0009        | PRC008       | PRC008-A04    | Verify identity     |                 3823 |               20 |           1274 |               75 |                 24   |               40.8 | IDP + human review     | 2023-12-15 00:00:00 |
| AUT0006        | PRC004       | PRC004-A03    | Assigned to agent   |                22307 |                1 |            372 |               85 |                 14.5 |               43   | RPA / rules engine     | 2023-12-15 00:00:00 |

## J. AI, Automation & Transformation Portfolio

### `ai_models`

| model_id   | model_type        | model_name                 | provider              | hosting                   | owner_team_id   | risk_classification   | created_date        |
|:-----------|:------------------|:---------------------------|:----------------------|:--------------------------|:----------------|:----------------------|:--------------------|
| MDL0150    | OCR/IDP           | Orion-OCR 5                | Open-source           | AWS SageMaker-style       | TM0040          | High                  | 2022-09-13 00:00:00 |
| MDL0085    | LLM               | Orion-LLM 5                | Vendor B (hosted LLM) | AWS ECS                   | TM0040          | Medium                | 2026-01-09 00:00:00 |
| MDL0041    | Forecasting       | Halcyon-Forecasting 1      | In-house              | AWS SageMaker-style       | TM0051          | High                  | 2023-06-08 00:00:00 |
| MDL0067    | Ranking           | Kestrel-Ranking 2          | Vendor C              | AWS Bedrock-style managed | TM0051          | Medium                | 2024-10-18 00:00:00 |
| MDL0107    | Entity Resolution | Kestrel-EntityResolution 2 | Open-source           | AWS Bedrock-style managed | TM0051          | Low                   | 2023-09-11 00:00:00 |

### `model_versions`

| model_version_id   | model_id   | version   | released_date       |   eval_accuracy |   eval_hallucination_rate | status   |
|:-------------------|:-----------|:----------|:--------------------|----------------:|--------------------------:|:---------|
| MV00174            | MDL0072    | v2.0      | 2023-07-23 00:00:00 |            0.83 |                           | Retired  |
| MV00031            | MDL0014    | v1.0      | 2022-12-12 00:00:00 |            0.87 |                      0.07 | Retired  |
| MV00116            | MDL0050    | v3.0      | 2024-03-05 00:00:00 |            0.94 |                           | Retired  |
| MV00343            | MDL0150    | v1.0      | 2022-10-14 00:00:00 |            0.86 |                           | Retired  |
| MV00142            | MDL0061    | v2.0      | 2026-07-13 00:00:00 |            0.82 |                      0.06 | Staging  |

### `ai_use_cases`

| use_case_id   | use_case_name                               | division_id   | process_id   | archetype     | stage   | primary_kpi          | owner_team_id   | sponsor_employee_id   | product_owner_employee_id   | model_id   | idea_date           | poc_date            | pilot_date          | scaled_date   | retired_date   |   expected_annual_value_usd |   realized_annual_value_usd |   hours_saved_annual |   fte_capacity_released |
|:--------------|:--------------------------------------------|:--------------|:-------------|:--------------|:--------|:---------------------|:----------------|:----------------------|:----------------------------|:-----------|:--------------------|:--------------------|:--------------------|:--------------|:---------------|----------------------------:|----------------------------:|---------------------:|------------------------:|
| UC0262        | Autonomous agent for entity resolution #261 | DIV03         | PRC021       | Agent         | PoC     | Handling time        | TM0017          | EMP000003             | EMP004562                   | MDL0077    | 2025-03-04 00:00:00 | 2025-04-26 00:00:00 |                     |               |                |                      135000 |                           0 |                    0 |                       0 |
| UC0133        | Bot automation of supplier enrollment #132  | DIV05         | PRC006       | RPA           | Idea    | Throughput           | TM0103          | EMP000011             | EMP004742                   |            | 2025-11-28 00:00:00 |                     |                     |               |                |                      117000 |                           0 |                    0 |                       0 |
| UC0576        | Bot automation of month-end close #575      | DIV05         | PRC028       | RPA           | Idea    | Cost per transaction | TM0039          | EMP000045             | EMP003884                   |            | 2022-08-22 00:00:00 |                     |                     |               |                |                      208000 |                           0 |                    0 |                       0 |
| UC0455        | Knowledge assistant for invoice-to-pay #454 | DIV05         | PRC002       | RAG Assistant | Idea    | Backlog              | TM0032          | EMP000037             | EMP002329                   | MDL0087    | 2025-04-17 00:00:00 |                     |                     |               |                |                      205000 |                           0 |                    0 |                       0 |
| UC0338        | Copilot for peer review management #337     | DIV01         | PRC009       | Copilot       | Pilot   | Throughput           | TM0111          | EMP000039             | EMP004466                   | MDL0137    | 2025-02-07 00:00:00 | 2025-04-27 00:00:00 | 2025-07-14 00:00:00 |               |                |                      202000 |                       63000 |                 3500 |                       2 |

### `ai_use_case_kpis`

| kpi_id   | use_case_id   | kpi_name             |   baseline_value |   current_value | measured_date       |
|:---------|:--------------|:---------------------|-----------------:|----------------:|:--------------------|
| KPI00262 | UC0262        | Handling time        |            70.28 |           67.6  | 2025-08-19 00:00:00 |
| KPI00133 | UC0133        | Throughput           |            70.22 |                 | 2026-04-25 00:00:00 |
| KPI00576 | UC0576        | Cost per transaction |            24.37 |                 | 2025-09-08 00:00:00 |
| KPI00455 | UC0455        | Backlog              |            88.78 |                 | 2026-08-22 00:00:00 |
| KPI00338 | UC0338        | Throughput           |            78.83 |           70.31 | 2026-04-13 00:00:00 |

### `ai_governance_reviews`

| review_id   | use_case_id   | review_type             | reviewer_employee_id   | submitted_at        | completed_at        | status            |   findings_count |   high_findings |
|:------------|:--------------|:------------------------|:-----------------------|:--------------------|:--------------------|:------------------|-----------------:|----------------:|
| GOV00262    | UC0579        | Model Risk Review       | EMP000198              | 2025-04-21 10:50:16 | 2025-05-14 22:42:29 | Approved          |                5 |               2 |
| GOV00133    | UC0143        | Secure-by-Design Review | EMP001057              | 2026-01-19 14:07:17 | 2026-01-30 02:50:35 | Approved          |                4 |               2 |
| GOV00576    | UC0169        | Model Risk Review       | EMP000198              | 2024-02-23 14:22:10 | 2024-03-02 17:38:40 | Approved          |                4 |               0 |
| GOV00455    | UC0545        | Model Risk Review       | EMP004343              | 2023-04-13 16:34:09 | 2023-04-25 00:10:54 | Approved          |                1 |               0 |
| GOV00338    | UC0480        | Third-Party Risk Review | EMP003998              | 2026-03-20 12:22:14 | 2026-04-20 11:37:30 | Returned for info |                2 |               0 |

### `projects`

| project_id   | project_type          | use_case_id   | owner_team_id   | division_id   | pm_employee_id   | project_name                     | start_date          | planned_end_date    | actual_end_date     | status             |   budget_usd |   actual_cost_usd | health   |
|:-------------|:----------------------|:--------------|:----------------|:--------------|:-----------------|:---------------------------------|:--------------------|:--------------------|:--------------------|:-------------------|-------------:|------------------:|:---------|
| PRJ002061    | AI Use Case Delivery  | UC0566        | TM0046          | DIV04         | EMP001577        | Atlas - AI Use Case Delivery 23  | 2024-05-30 00:00:00 | 2024-08-18 00:00:00 | 2024-08-31 00:00:00 | Completed          |         4300 |              5100 | Amber    |
| PRJ000934    | BAU Enhancement       |               | TM0012          | DIV02         | EMP000625        | Summit - BAU Enhancement 60      | 2026-06-29 00:00:00 | 2027-01-08 00:00:00 |                     | In Progress        |        24900 |             26000 | Green    |
| PRJ000379    | Data Migration        |               | TM0051          | DIV05         | EMP004300        | Keystone - Data Migration 87     | 2022-09-12 00:00:00 | 2024-01-17 00:00:00 | 2024-06-28 00:00:00 | Completed          |        14900 |             20300 | Amber    |
| PRJ002755    | Client Implementation |               | TM0052          | DIV04         | EMP004262        | Pulse - Client Implementation 38 | 2024-04-05 00:00:00 | 2024-09-29 00:00:00 | 2024-11-15 00:00:00 | Closed - Cancelled |        34000 |             44100 | Amber    |
| PRJ000597    | Platform              |               | TM0073          | DIV01         | EMP001161        | Tidal - Platform 14              | 2023-06-07 00:00:00 | 2023-10-05 00:00:00 | 2023-11-23 00:00:00 | Completed          |        50500 |             64000 | Red      |

### `project_members`

| project_member_id   | project_id   | employee_id   | project_role   |   allocation_pct |
|:--------------------|:-------------|:--------------|:---------------|-----------------:|
| PM00006223          | PRJ001256    | EMP004266     | Change Lead    |               75 |
| PM00014199          | PRJ002846    | EMP002333     | Developer      |               50 |
| PM00017508          | PRJ003511    | EMP004351     | Tester         |               25 |
| PM00019431          | PRJ003913    | EMP002874     | Tester         |              100 |
| PM00006620          | PRJ001334    | EMP004216     | Change Lead    |               25 |

### `project_tasks`

| task_id     | project_id   | assignee_employee_id   | title                   | created_at          | due_date            |   estimate_hours | completed_at        | status   |   actual_hours |
|:------------|:-------------|:-----------------------|:------------------------|:--------------------|:--------------------|-----------------:|:--------------------|:---------|---------------:|
| TSK00025171 | PRJ003458    | EMP003150              | Test access request     | 2023-12-03 14:00:00 | 2023-12-15 00:00:00 |             11.1 | 2023-12-07 17:27:31 | Done     |            8.6 |
| TSK00010936 | PRJ001608    | EMP000880              | Deploy SOP update       | 2024-03-30 03:00:00 | 2024-04-05 00:00:00 |             13.4 | 2024-04-05 11:38:13 | Done     |           11.6 |
| TSK00043597 | PRJ003174    | EMP000465              | Analyse access request  | 2023-02-11 19:00:00 | 2023-02-28 00:00:00 |              2.6 | 2023-02-26 01:19:46 | Done     |            1.9 |
| TSK00013971 | PRJ001422    | EMP001828              | Build training material | 2024-05-16 03:00:00 | 2024-05-30 00:00:00 |              5.4 | 2024-06-29 04:35:25 | Done     |            7   |
| TSK00024884 | PRJ001154    | EMP002793              | Deploy model evaluation | 2025-04-05 01:00:00 | 2025-04-12 00:00:00 |             18.9 | 2025-04-24 20:24:57 | Done     |           16.5 |

### `milestones`

| milestone_id   | project_id   | milestone_name   | planned_date        | actual_date         | status   |
|:---------------|:-------------|:-----------------|:--------------------|:--------------------|:---------|
| MS00010667     | PRJ002667    | UAT complete     | 2025-02-22 00:00:00 | 2025-02-22 00:00:00 | Achieved |
| MS00013687     | PRJ003422    | UAT complete     | 2026-01-04 00:00:00 | 2026-01-14 00:00:00 | Achieved |
| MS00010666     | PRJ002667    | Design sign-off  | 2024-12-27 00:00:00 | 2025-01-01 00:00:00 | Achieved |
| MS00003030     | PRJ000758    | Design sign-off  | 2026-05-20 00:00:00 | 2026-05-20 00:00:00 | Achieved |
| MS00012031     | PRJ003008    | UAT complete     | 2024-12-29 00:00:00 | 2025-01-19 00:00:00 | Achieved |

### `project_risks`

| risk_id   | project_id   | category          | description                                     |   likelihood |   impact | status    | owner_employee_id   | raised_date         |
|:----------|:-------------|:------------------|:------------------------------------------------|-------------:|---------:|:----------|:--------------------|:--------------------|
| RSK004646 | PRJ000071    | Data access       | Pending data access approval may delay build    |            2 |        2 | Realised  | EMP003691           | 2025-09-08 00:00:00 |
| RSK004206 | PRJ001789    | Model performance | Accuracy below target on edge cases             |            2 |        2 | Mitigated | EMP002613           | 2025-10-14 00:00:00 |
| RSK002897 | PRJ003190    | Security          | Secure-by-Design review findings not yet closed |            3 |        5 | Mitigated | EMP001068           | 2023-01-21 00:00:00 |
| RSK006618 | PRJ001229    | Model performance | Accuracy below target on edge cases             |            3 |        5 | Mitigated | EMP004459           | 2024-03-18 00:00:00 |
| RSK005890 | PRJ001177    | Adoption          | Low user adoption expected in night-shift teams |            4 |        4 | Open      | EMP002873           | 2022-11-15 00:00:00 |

### `innovation_ideas`

| idea_id    | submitted_by_employee_id   | team_id   | title                                 | description                                                     | submitted_at        |   votes | status       | linked_use_case_id   |
|:-----------|:---------------------------|:----------|:--------------------------------------|:----------------------------------------------------------------|:--------------------|--------:|:-------------|:---------------------|
| IDEA001307 | EMP000309                  | TM0101    | Dashboard to track support emails     | Dashboard to track support emails. Currently done manually e... | 2026-04-07 07:33:39 |       9 | Submitted    |                      |
| IDEA002038 | EMP001544                  | TM0014    | Dashboard to track fraud alerts       | Dashboard to track fraud alerts. Currently done manually eve... | 2025-09-15 18:10:13 |       6 | Accepted     |                      |
| IDEA000569 | EMP002474                  | TM0052    | Chatbot for invoice exceptions        | Chatbot for invoice exceptions. Currently done manually ever... | 2025-11-18 14:18:22 |       2 | Submitted    |                      |
| IDEA001898 | EMP001292                  | TM0072    | Dashboard to track regulatory updates | Dashboard to track regulatory updates. Clients keep asking f... | 2025-12-24 10:39:26 |      10 | Submitted    |                      |
| IDEA002499 | EMP001898                  | TM0033    | Chatbot for support emails            | Chatbot for support emails. Currently done manually every da... | 2025-05-15 13:53:49 |       2 | Under Review |                      |

### `ai_usage_events`

| usage_event_id   | employee_id   | tool               | event_ts            | use_case_id   | model_id   | task_type          |   prompt_tokens |   completion_tokens |   latency_ms | outcome   | prompt_id   |
|:-----------------|:--------------|:-------------------|:--------------------|:--------------|:-----------|:-------------------|----------------:|--------------------:|-------------:|:----------|:------------|
| AIU00101919      | EMP001635     | REPH Copilot       | 2023-07-29 16:27:22 | UC0001        | MDL0001    | Generate SQL       |            2100 |                 378 |         4112 | Edited    |             |
| AIU00103550      | EMP003838     | REPH Copilot       | 2026-02-13 02:33:53 | UC0001        | MDL0001    | Extract data       |             814 |                 839 |         8970 | Accepted  |             |
| AIU00012455      | EMP003225     | AP Exception Agent | 2026-01-16 15:11:01 | UC0004        | MDL0001    | Generate SQL       |            2978 |                 502 |         6077 | Edited    |             |
| AIU00214037      | EMP001786     | DocAssist          | 2026-08-06 10:23:06 |               | MDL0001    | Summarise document |             314 |                 133 |         2465 | Accepted  |             |
| AIU00210937      | EMP004707     | CodePilot          | 2025-02-25 20:24:04 |               | MDL0001    | Code generation    |             114 |                 323 |         4515 | Edited    |             |

### `prompts_library`

| prompt_id   | author_employee_id   | task_type    | use_case_id   | title                                     | prompt_text                                                     | created_at          |   rating_avg |   times_used |
|:------------|:---------------------|:-------------|:--------------|:------------------------------------------|:----------------------------------------------------------------|:--------------------|-------------:|-------------:|
| PRM00779    | EMP002210            | Generate SQL |               | Generate SQL - exhibitor emails template  | As a AP analyst, generate sql in under 120 words. Do not inv... | 2026-01-26 16:04:41 |         3.59 |           16 |
| PRM00335    | EMP003925            | Extract data |               | Best prompt: Extract data (support cases) | You are a customer support specialist. Extract data for the ... | 2025-09-29 17:08:06 |         4.87 |           34 |
| PRM00272    | EMP001907            | Classify     | UC0427        | Classify - XML defects template           | As a fraud analyst, classify in under 120 words. Do not inve... | 2026-07-10 18:29:22 |         3.67 |           12 |
| PRM00803    | EMP004564            | Classify     |               | Classify - KYC narratives template        | You are a customer support specialist. Classify for the foll... | 2025-05-07 11:37:06 |         3.42 |            6 |
| PRM00217    | EMP002376            | Generate SQL |               | Generate SQL for invoice exceptions       | Act as a customer support specialist. Read the text and gene... | 2026-08-17 11:55:47 |         3.85 |           61 |

### `ai_feedback`

| ai_feedback_id   | usage_event_id   | employee_id   |   rating | feedback_type   | comment        | submitted_at        |
|:-----------------|:-----------------|:--------------|---------:|:----------------|:---------------|:--------------------|
| AIF0025171       | AIU00227641      | EMP000921     |        1 | Thumbs down     | Wrong citation | 2025-06-12 07:05:41 |
| AIF0010936       | AIU00279402      | EMP000935     |        5 | Thumbs up       |                | 2026-02-03 11:46:37 |
| AIF0043597       | AIU00155735      | EMP002268     |        4 | Thumbs up       |                | 2026-05-22 18:04:54 |
| AIF0013971       | AIU00052336      | EMP004043     |        4 | Thumbs up       | Saved me time  | 2024-03-19 19:39:48 |
| AIF0024884       | AIU00338716      | EMP003190     |        2 | Thumbs down     | Too generic    | 2025-05-26 16:11:33 |

## K. Knowledge & Collaboration (Unstructured)

### `knowledge_articles`

| article_id   | article_type    | topic_key                         | division_id   | product_id   | app_id   | title                                                      | owner_team_id   | author_employee_id   | created_at          | last_reviewed_at    | status    |   version | body                                                            |   view_count |   helpful_votes | tags                      |
|:-------------|:----------------|:----------------------------------|:--------------|:-------------|:---------|:-----------------------------------------------------------|:----------------|:---------------------|:--------------------|:--------------------|:----------|----------:|:----------------------------------------------------------------|-------------:|----------------:|:--------------------------|
| KB007623     | Policy          | handle API rate limit errors      | DIV01         | PRD009       | APP0005  | Policy: handle API rate limit errors (RegWatch) #2         | TM0042          | EMP001592            | 2022-03-04 12:38:56 | 2022-05-12 08:17:57 | Published |         1 | Purpose: This article explains how to handle API rate limit ... |          360 |               7 | handle, API, rate         |
| KB000066     | Troubleshooting | export usage reports              | DIV03         | PRD089       | APP0002  | Troubleshooting: unable to export usage reports (XConvert) | TM0115          | EMP001488            | 2020-05-26 10:41:14 | 2021-12-01 08:10:29 | Published |         3 | Purpose: This article explains how to export usage reports. ... |          336 |              31 | export, usage, reports    |
| KB004984     | FAQ             | reset MFA authenticator           | DIV02         |              | APP0004  | FAQ: how do I reset MFA authenticator (LexEdit) #3         | TM0043          | EMP003425            | 2023-07-12 12:41:43 | 2023-10-28 20:38:31 | Draft     |         1 | Purpose: This article explains how to reset MFA authenticato... |          436 |              15 | reset, MFA, authenticator |
| KB001638     | How-to          | screen a batch against watchlists | DIV02         |              | APP0003  | How to screen a batch against watchlists (ProdFlow) #2     | TM0004          | EMP002789            | 2026-03-27 12:17:03 | 2026-05-29 18:00:41 | Draft     |         4 | Purpose: This article explains how to screen a batch against... |          883 |              35 | screen, a, batch          |
| KB009360     | How-to          | request elevated access           | DIV03         | PRD089       | APP0010  | How to request elevated access (CaseDesk) #10              | TM0008          | EMP004147            | 2021-07-28 15:41:37 | 2022-06-14 23:09:24 | Published |         3 | Purpose: This article explains how to request elevated acces... |          133 |               2 | request, elevated, access |

### `knowledge_article_versions`

| article_version_id   | article_id   |   version_no | edited_at           | edited_by_employee_id   | change_summary          |
|:---------------------|:-------------|-------------:|:--------------------|:------------------------|:------------------------|
| KBV00026830          | KB008948     |            1 | 2021-07-14 10:58:53 | EMP004572               | Initial version         |
| KBV00013653          | KB004610     |            1 | 2023-01-14 15:05:03 | EMP000253               | Initial version         |
| KBV00025226          | KB008421     |            1 | 2021-01-17 11:39:25 | EMP000734               | Initial version         |
| KBV00004817          | KB001649     |            2 | 2020-09-05 01:17:36 | EMP003937               | Fixed screenshots       |
| KBV00007968          | KB002712     |            4 | 2024-03-13 17:22:45 | EMP004557               | Updated for new release |

### `sops`

| sop_id   | article_id   | process_id   | sop_title                                           |   version | effective_date      | review_due_date     | is_current   | owner_employee_id   |
|:---------|:-------------|:-------------|:----------------------------------------------------|----------:|:--------------------|:--------------------|:-------------|:--------------------|
| SOP00262 | KB003417     | PRC013       | SOP: triage a fraud alert (KYCDesk) #2              |         4 | 2023-08-04 00:00:00 | 2024-12-13 00:00:00 | False        | EMP002039           |
| SOP00133 | KB005727     | PRC009       | SOP: match invoice to purchase order (P2P Suite) #7 |         2 | 2025-01-09 00:00:00 | 2026-08-09 00:00:00 | False        | EMP001817           |
| SOP00576 | KB008109     | PRC025       | SOP: request elevated access (LearnHub) #4          |         1 | 2025-04-13 00:00:00 | 2026-05-21 00:00:00 | False        | EMP003084           |
| SOP00455 | KB000004     | PRC017       | SOP: configure SSO SAML (KYCDesk)                   |         4 | 2020-12-04 00:00:00 | 2022-02-17 00:00:00 | False        | EMP004664           |
| SOP00338 | KB002849     | PRC033       | SOP: request data access approval (REPH Copilot) #2 |         2 | 2026-06-18 00:00:00 | 2027-09-28 00:00:00 | True         | EMP003379           |

### `documents`

| document_id   | project_id   | doc_type                    | author_employee_id   | created_at          | title                                                           | body                                                            |
|:--------------|:-------------|:----------------------------|:---------------------|:--------------------|:----------------------------------------------------------------|:----------------------------------------------------------------|
| DOC003642     | PRJ003074    | Project Charter             | EMP004169            | 2026-01-17 19:47:32 | Project Charter - Phoenix - BAU Enhancement 66                  | Project Charter | Phoenix - BAU Enhancement 66                  |
|               |              |                             |                      |                     |                                                                 | Summary: The ...                                                |
| DOC005087     | PRJ003485    | Closeout Report             | EMP002971            | 2025-05-05 11:34:53 | Closeout Report - Atlas - BAU Enhancement 89                    | Closeout Report for Atlas - BAU Enhancement 89. Context: con... |
| DOC001658     | PRJ002979    | Status Report               | EMP003624            | 2023-06-20 14:15:56 | Status Report - Aurora - Client Implementation 68               | Status Report for Aurora - Client Implementation 68. Objecti... |
| DOC006843     | PRJ003772    | Decision Log                | EMP003983            | 2024-12-26 09:54:12 | Decision Log - Horizon - Platform 85                            | Decision Log for Horizon - Platform 85. Context: enable AI-a... |
| DOC000789     | PRJ001708    | Benefits Realisation Report | EMP004843            | 2025-03-02 19:40:01 | Benefits Realisation Report - Beacon - AI Use Case Delivery ... | Benefits Realisation Report for Beacon - AI Use Case Deliver... |

### `meetings`

| meeting_id   | project_id   | team_id   | organizer_employee_id   | meeting_type       | title                                            | start_ts            |   duration_min |   attendee_count | transcript_summary                                              |
|:-------------|:-------------|:----------|:------------------------|:-------------------|:-------------------------------------------------|:--------------------|---------------:|-----------------:|:----------------------------------------------------------------|
| MTG009064    | PRJ003757    | TM0090    | EMP003200               | Steering committee | Steering committee - Nova - BAU Enhancement 70   | 2024-02-20 18:13:00 |             90 |                3 | Weekly sync for TM0090. Volumes were higher versus forecast.... |
| MTG007452    |              | TM0049    | EMP000127               | Town hall          | Town hall - TM0049                               | 2023-09-18 13:20:46 |             60 |               11 | The team reviewed progress on BAU operations. Key decisions:... |
| MTG008371    |              | TM0087    | EMP000136               | Team huddle        | Team huddle - TM0087                             | 2023-01-13 13:51:13 |             30 |                4 | The team reviewed progress on BAU operations. Key decisions:... |
| MTG001858    | PRJ001598    | TM0055    | EMP004211               | Design review      | Design review - Beacon - AI Use Case Delivery 45 | 2025-07-07 16:57:19 |             30 |                6 | Retrospective for Beacon - AI Use Case Delivery 45. What wen... |
| MTG000248    |              | TM0041    | EMP000133               | Town hall          | Town hall - TM0041                               | 2023-12-29 14:08:14 |             30 |                9 | Weekly sync for TM0041. Volumes were in line versus forecast... |

### `action_items`

| action_item_id   | meeting_id   | owner_employee_id   | description                           | due_date            | completed_at        | status   |
|:-----------------|:-------------|:--------------------|:--------------------------------------|:--------------------|:--------------------|:---------|
| AI0001253        | MTG002244    | EMP000510           | Update model evaluation               | 2025-08-08 00:00:00 | 2025-07-27 03:51:58 | Done     |
| AI0010445        | MTG003083    | EMP003033           | Review budget variance                | 2025-12-03 00:00:00 | 2025-11-25 11:40:31 | Done     |
| AI0008995        | MTG002266    | EMP001059           | Follow up with HR on data extract     | 2025-07-22 00:00:00 | 2025-07-25 14:21:18 | Done     |
| AI0007464        | MTG010379    | EMP001365           | Follow up with InfoSec on UAT results | 2024-04-08 00:00:00 | 2024-04-12 01:51:51 | Done     |
| AI0001911        | MTG005064    | EMP001920           | Escalate training plan by Friday      | 2024-02-04 00:00:00 | 2024-01-25 17:17:58 | Done     |

### `chat_channels`

| channel_id   | team_id   | project_id   | channel_name   | created_at          |
|:-------------|:----------|:-------------|:---------------|:--------------------|
| CH00266      | TM0056    | PRJ001998    | proj-prj001998 | 2021-08-23 14:23:13 |
| CH00066      | TM0066    |              | general-tm0066 | 2021-01-19 15:48:50 |
| CH00121      | TM0018    | PRJ000020    | proj-prj000020 | 2021-07-15 11:41:16 |
| CH00133      | TM0105    | PRJ000127    | proj-prj000127 | 2021-09-14 11:01:39 |
| CH00379      | TM0086    | PRJ003660    | proj-prj003660 | 2021-08-12 08:41:23 |

### `chat_messages`

| message_id   | channel_id   | sender_employee_id   | sent_at             | message_text                                             | is_taglish   | reply_to_message_id   |   mentions_count |
|:-------------|:-------------|:---------------------|:--------------------|:---------------------------------------------------------|:-------------|:----------------------|-----------------:|
| MSG00101919  | CH00252      | EMP003470            | 2024-04-26 11:46:45 | moving my 3pm, sorry                                     | False        |                       |                1 |
| MSG00103550  | CH00038      | EMP003720            | 2024-05-08 04:10:34 | moving my 3pm, sorry                                     | False        |                       |                0 |
| MSG00012455  | CH00003      | EMP000746            | 2022-04-27 15:57:21 | the new copilot draft saved me like 20 mins on that case | False        | MSG00012345           |                0 |
| MSG00214037  | CH00387      | EMP002789            | 2026-03-26 17:10:19 | reminder: standup in 10 mins                             | False        |                       |                0 |
| MSG00210937  | CH00189      | EMP002452            | 2026-03-09 16:13:49 | pa-check naman ng TKT0031289, urgent daw sa client       | True         | MSG00210610           |                0 |

### `emails`

| email_id   | sender_employee_id   | recipient_employee_id   |   cc_count | sent_at             | subject                           | body                                                  | related_case_id   | thread_id   | has_attachment   |
|:-----------|:---------------------|:------------------------|-----------:|:--------------------|:----------------------------------|:------------------------------------------------------|:------------------|:------------|:-----------------|
| EML0033910 | EMP003140            | EMP001975               |          3 | 2023-05-12 14:53:00 | Weekly status - TM0111            | Dear Javier,                                          | CS0064757         | THR14792    | False            |
|            |                      |                         |            |                     |                                   |                                                       |                   |             |                  |
|            |                      |                         |            |                     |                                   | Following up on CS0026719. Volumes are higher ...     |                   |             |                  |
| EML0092308 | EMP000413            | EMP002729               |          2 | 2023-03-14 18:42:18 | Weekly status - TM0035            | Hi team,                                              |                   | THR11486    | True             |
|            |                      |                         |            |                     |                                   |                                                       |                   |             |                  |
|            |                      |                         |            |                     |                                   | We are on track for the planned milestone. Let me ... |                   |             |                  |
| EML0089108 | EMP004060            | EMP001249               |          0 | 2024-03-07 12:09:43 | FYI - supplier enrollment backlog | Hi team,                                              |                   | THR30406    | True             |
|            |                      |                         |            |                     |                                   |                                                       |                   |             |                  |
|            |                      |                         |            |                     |                                   | We are on track for the planned milestone. Let me ... |                   |             |                  |
| EML0009539 | EMP002983            | EMP003015               |          2 | 2023-02-13 09:20:43 | Update on CS0080056               | Hi Blake,                                             |                   | THR19237    | False            |
|            |                      |                         |            |                     |                                   |                                                       |                   |             |                  |
|            |                      |                         |            |                     |                                   | Sharing a quick update on CS0080056. We are on tr...  |                   |             |                  |
| EML0031009 | EMP003084            | EMP004991               |          1 | 2025-05-23 13:37:19 | Update on CS0020079               | Dear Marcus,                                          |                   | THR15049    | True             |
|            |                      |                         |            |                     |                                   |                                                       |                   |             |                  |
|            |                      |                         |            |                     |                                   | Following up on CS0020079. We are on track for...     |                   |             |                  |

### `search_logs`

| search_id    | employee_id   | searched_at         | query_text                        |   results_count | clicked_article_id   | source    |
|:-------------|:--------------|:--------------------|:----------------------------------|----------------:|:---------------------|:----------|
| SRCH00190688 | EMP000016     | 2026-01-23 08:43:06 | process supplier enrollment       |               2 | KB008106             | KB Portal |
| SRCH00188398 | EMP003543     | 2026-01-02 12:46:25 | reset MFA authenticator           |               8 | KB004768             | KB Portal |
| SRCH00172428 | EMP000558     | 2022-02-13 08:15:12 | screen a batch against watchlists |              17 | KB001068             | Intranet  |
| SRCH00013123 | EMP003895     | 2025-06-27 13:34:43 | leave policy                      |               1 |                      | KB Portal |
| SRCH00011685 | EMP001320     | 2024-03-12 12:36:28 | escalate a P1 incident            |              14 |                      | KB Portal |
