# Data Quality Plan

Curated tables in `<domain>/` are clean and referentially intact. Five raw tables in `raw/` contain realistic issues injected at 1-5%. Teams that clean them well should get credit for technical feasibility.

| Issue | Rate | Where |
|---|---|---|
| Missing values | 3% | 2 non-key columns per raw table |
| Inconsistent casing / whitespace | 2% | name/subject columns |
| Free-text typos | 2% | names, subjects, resolution text |
| Mixed date formats (ISO, DD/MM/YYYY, 'Mon DD, YYYY') | 4% + 2% | first date column |
| Near-duplicate entities | 1.5% | all 5 raw tables |
| Late-arriving records (`_ingested_at` after load date) | 1% | all 5 raw tables |
| Orphaned foreign keys | 1% | raw invoices.supplier_id |

Also present in the curated data on purpose (realistic, not errors):

* Outdated and conflicting knowledge articles (same title, different instructions).
* Typos in ~5% of search queries.
* Open records with null end timestamps (cases, tickets, investigations still in progress).
* Overruled case law still marked 'Current' (content currency issue).
* Some ownership loops (A owns B, B owns A) in ownership_links.

## Injection log (this build)

**employees_raw.csv**
* first_name: 136 values blanked (3%)
* last_name: 165 values blanked (3%)
* full_name: 116 values with inconsistent casing/whitespace (2%)
* last_name: 94 typos injected (2%)
* hire_date: 201 as DD/MM/YYYY and 96 as 'Mon DD, YYYY' (mixed formats)
* 75 near-duplicate rows appended (same primary key, whitespace variant)
* _ingested_at: 44 late-arriving rows (1%)

**customers_raw.csv**
* segment: 417 values blanked (3%)
* customer_name: 338 values blanked (3%)
* customer_name: 256 values with inconsistent casing/whitespace (2%)
* customer_name: 237 typos injected (2%)
* created_date: 485 as DD/MM/YYYY and 210 as 'Mon DD, YYYY' (mixed formats)
* 180 near-duplicate rows appended (same primary key, whitespace variant)
* _ingested_at: 113 late-arriving rows (1%)

**suppliers_raw.csv**
* supplier_name: 52 values blanked (3%)
* category: 66 values blanked (3%)
* supplier_name: 47 values with inconsistent casing/whitespace (2%)
* supplier_name: 52 typos injected (2%)
* onboarded_date: 104 as DD/MM/YYYY and 41 as 'Mon DD, YYYY' (mixed formats)
* 36 near-duplicate rows appended (same primary key, whitespace variant)
* _ingested_at: 14 late-arriving rows (1%)

**support_cases_raw.csv**
* channel: 3040 values blanked (3%)
* category: 3031 values blanked (3%)
* subject: 1963 values with inconsistent casing/whitespace (2%)
* resolution_summary: 2200 typos injected (2%)
* created_at: 4015 as DD/MM/YYYY and 1954 as 'Mon DD, YYYY' (mixed formats)
* 1536 near-duplicate rows appended (same primary key, whitespace variant)
* _ingested_at: 1056 late-arriving rows (1%)

**invoices_raw.csv**
* currency: 3556 values blanked (3%)
* invoice_date: 3688 values blanked (3%)
* channel: 2338 values with inconsistent casing/whitespace (2%)
* received_at: 4858 as DD/MM/YYYY and 2318 as 'Mon DD, YYYY' (mixed formats)
* 1800 near-duplicate rows appended (same primary key, whitespace variant)
* _ingested_at: 1203 late-arriving rows (1%)
* supplier_id: 1177 orphaned IDs not in suppliers (1%)
