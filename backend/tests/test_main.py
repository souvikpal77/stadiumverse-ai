from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    """
    Verifies that the root path responds successfully with app information.
    """
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "StadiumVerse AI API"
    assert "version" in data

def test_health_endpoint():
    """
    Verifies the health checks reflect service configuration details.
    """
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "services" in data
    assert "firebase" in data["services"]
    assert "gemini_api" in data["services"]
