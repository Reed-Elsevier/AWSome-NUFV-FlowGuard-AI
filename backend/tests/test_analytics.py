import pytest
from backend.app.data.connection import get_db
from backend.app.data.validation import validate_datasets
from backend.app.analytics.process_metrics import calculate_process_metrics
from backend.app.analytics.bottlenecks import calculate_waiting_and_bottlenecks
from backend.app.analytics.rework import calculate_rework
from backend.app.analytics.handoffs import calculate_handoffs
from backend.app.analytics.variants import calculate_variants
from backend.app.analytics.sla import calculate_sla
from backend.app.analytics.automation import evaluate_automation_opportunities
from backend.app.analytics.simulator import run_fix_simulation
from backend.app.analytics.ai_value import list_ai_use_cases, audit_ai_use_case

def test_data_validation():
    """Verify that all required datasets exist and conform to schema."""
    val = validate_datasets()
    assert val["status"] == "valid"
    assert "process_event_log" in val["tables"]
    assert val["tables"]["process_event_log"]["row_count"] > 0

def test_process_metrics_prc005():
    """Test cycle time metrics for Hero process PRC005."""
    metrics = calculate_process_metrics(process_id="PRC005")
    assert metrics["cases"] > 0
    assert metrics["median_turnaround_hours"] > 0.0
    assert metrics["p90_turnaround_hours"] >= metrics["median_turnaround_hours"]
    assert "total_cost_php" in metrics

def test_process_metrics_pii_filter():
    """Test cycle time metrics specifically for Data Access - PII."""
    metrics = calculate_process_metrics(process_id="PRC005", access_type="Data Access - PII")
    assert metrics["cases"] > 0
    # Data Access - PII takes significantly longer than standard access
    assert metrics["median_turnaround_hours"] > 50.0

def test_bottlenecks_prc005():
    """Verify bottleneck identification with evidence."""
    res = calculate_waiting_and_bottlenecks(process_id="PRC005", access_type="Data Access - PII")
    b_neck = res["largest_bottleneck"]
    assert b_neck is not None
    assert b_neck["median_wait_hours"] > 0.0
    assert b_neck["affected_cases"] > 0
    assert "delay_share" in b_neck
    assert len(res["transitions"]) > 0

def test_rework_prc005():
    """Test rework detection and loop identification."""
    res = calculate_rework(process_id="PRC005")
    assert "rate" in res
    assert 0.0 <= res["rate"] <= 1.0
    assert res["affected_cases"] >= 0
    assert "top_loop" in res

def test_handoffs_prc005():
    """Test handoff calculations at process level without employee ranking."""
    res = calculate_handoffs(process_id="PRC005")
    assert res["median"] >= 0.0
    assert res["p90"] >= res["median"]
    assert res["total_cases"] > 0

def test_variants_prc005():
    """Test top variants generation."""
    variants = calculate_variants(process_id="PRC005", sla_hours=72.0)
    assert len(variants) > 0
    top = variants[0]
    assert "variant" in top
    assert "percentage" in top
    assert "median_duration_hours" in top

def test_sla_prc005():
    """Test SLA compliance and baseline comparison."""
    sla = calculate_sla(process_id="PRC005", sla_hours=72.0, access_type="Data Access - PII")
    assert sla["total_cases"] > 0
    assert 0.0 <= sla["attainment_rate"] <= 100.0
    assert sla["baseline_comparison"] is not None
    assert "official_baseline_hours" in sla["baseline_comparison"]

def test_automation_opportunities():
    """Test automation evaluation comparing 2023 survey with operational reality."""
    opps = evaluate_automation_opportunities(process_id="PRC005")
    assert len(opps) > 0
    first = opps[0]
    assert first["assessment"] in ["Still Supported", "Needs Reassessment", "Insufficient Evidence"]
    assert "survey_2023" in first
    assert "current_evidence" in first

def test_fix_simulator_arithmetic():
    """Test deterministic fix simulation calculations and formula transparency."""
    sim = run_fix_simulation(
        process_id="PRC005",
        stage_reduction_pct=30.0,
        rework_reduction_pct=50.0,
        target_stage="Privacy"
    )
    assert "scenario" in sim
    assert "current" in sim
    assert sim["scenario"]["estimated_median_turnaround_hours"] < sim["current"]["median_turnaround_hours"]
    assert sim["scenario"]["estimated_sla_attainment_pct"] >= sim["current"]["sla_attainment_pct"]
    assert "calculation_methodology" in sim

def test_ai_value_audit():
    """Test AI value audit list and detail analysis."""
    use_cases = list_ai_use_cases()
    assert len(use_cases) > 0

    # Test an auditable use case
    scaled_case = next((u for u in use_cases if u["stage"] == "Scaled"), use_cases[0])
    audit = audit_ai_use_case(scaled_case["use_case_id"])
    assert "portfolio_reported" in audit
    assert "observed_operations" in audit
    assert audit["observed_operations"]["evidence_status"] in [
        "SUPPORTED BY AVAILABLE EVIDENCE",
        "PARTIALLY SUPPORTED",
        "CONFLICTING EVIDENCE",
        "INSUFFICIENT EVIDENCE"
    ]
