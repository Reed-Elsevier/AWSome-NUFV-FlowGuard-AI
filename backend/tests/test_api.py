import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "FlowGuard AI"
    assert data["status"] in ["healthy", "degraded"]

def test_processes_endpoint():
    response = client.get("/api/processes")
    assert response.status_code == 200
    procs = response.json()
    assert len(procs) > 0
    hero = next((p for p in procs if p["process_id"] == "PRC005"), None)
    assert hero is not None
    assert hero["is_hero"] is True
    assert "access_type" in hero["supported_filters"]

def test_analyze_endpoint():
    payload = {
        "process_id": "PRC005",
        "filters": {"access_type": "Data Access - PII"}
    }
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200
    res = response.json()
    assert res["process_id"] == "PRC005"
    assert res["metrics"]["cases"] > 0
    assert "largest_bottleneck" in res["bottlenecks"]
    assert "ai_explanation" in res
    assert "executive_summary" in res["ai_explanation"]

def test_simulate_endpoint():
    payload = {
        "process_id": "PRC005",
        "stage_reduction_pct": 25.0,
        "rework_reduction_pct": 40.0,
        "target_stage": "Privacy"
    }
    response = client.post("/api/simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "scenario" in data
    assert "calculation_methodology" in data

def test_ai_value_endpoints():
    # List use cases
    response = client.get("/api/ai-value")
    assert response.status_code == 200
    items = response.json()
    assert len(items) > 0

    # Detail
    uid = items[0]["use_case_id"]
    res_detail = client.get(f"/api/ai-value/{uid}")
    assert res_detail.status_code == 200
    detail = res_detail.json()
    assert "portfolio_reported" in detail
    assert "observed_operations" in detail

def test_ask_endpoint():
    payload = {
        "process_id": "PRC005",
        "question": "Where is work getting stuck in this process?",
        "access_type": "Data Access - PII"
    }
    response = client.post("/api/ask", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert len(data["evidence_references"]) > 0
