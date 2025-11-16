import pytest
from app import app
from werkzeug.security import generate_password_hash

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as client:
        yield client


def test_correct_predict(monkeypatch, client):
    def fake_predict_plant(_):
        return {"disease": "Tomato___Bacterial_spot", "confidence": 0.85}

    monkeypatch.setattr("app.predict_plant", fake_predict_plant)
    monkeypatch.setattr("app.translations_plants", {"Tomato": "Tomate"})
    monkeypatch.setattr("app.translations_diseases", {"Tomato___Bacterial_spot": "Mancha bacteriana del tomate"})
    monkeypatch.setattr("app.treatments_treatments", {"Tomato___Bacterial_spot": "Evitar el riego por aspersión y aplicar bactericidas a base de cobre. Usar semillas certificadas y rotar cultivos."})

    response = client.post("/", json={"image": "fake_base64"})

    assert response.status_code == 200
    data = response.get_json()

    assert data["planta"] == "Tomate"
    assert data["enfermedad"] == "Mancha bacteriana del tomate"
    assert data["recomendacion"] == "Evitar el riego por aspersión y aplicar bactericidas a base de cobre. Usar semillas certificadas y rotar cultivos."
    assert data["confianza"] == "85.00%"

def test_noimagen_error():
    client = app.test_client()
    
    response = client.post("/", json={})

    data = response.get_json()

    assert response.status_code == 400
    assert "error" in data
    assert data["error"] == "No se envió ninguna imagen"

def test_predict_exception(monkeypatch):
    client = app.test_client()

    def error_predict_exception(image_base64):
        raise ValueError("Error forzado")
    
    monkeypatch.setattr("app.predict_plant", error_predict_exception)

    response = client.post("/", json={"image": "fake_base64"})

    data = response.get_json()

    assert response.status_code == 500
    assert "error" in data
    assert data["error"] == "Error forzado"


    #test para enfermedad no mapeada
def test_predict_no_separator(monkeypatch, client):
    def fake_predict_plant(_):
        return {"disease": "WeirdDisease", "confidence": 0.50}

    monkeypatch.setattr("app.predict_plant", fake_predict_plant)
    monkeypatch.setattr("app.translations_plants", {})
    monkeypatch.setattr("app.translations_diseases", {})
    monkeypatch.setattr("app.treatments_treatments", {})

    response = client.post("/", json={"image": "fake_base64"})
    assert response.status_code == 200

    data = response.get_json()

    assert data["planta"] == "Planta desconocida"
    assert data["enfermedad"] == "Enfermedad desconocida"
    assert data["recomendacion"].startswith("No hay tratamiento")

    assert data["planta_original"] == "WeirdDisease"
    assert data["enfermedad_original"] == ""

def test_predict_healthy(monkeypatch, client):
    def fake_predict_plant(_):
        return {"disease": "healthy_bean", "confidence": 0.66}

    monkeypatch.setattr("app.predict_plant", fake_predict_plant)
    monkeypatch.setattr("app.translations_plants", {})
    monkeypatch.setattr("app.translations_diseases", {})
    monkeypatch.setattr("app.treatments_treatments", {})

    response = client.post("/", json={"image": "x"})
    data = response.get_json()

    assert data["planta_original"] == "bean"
    assert data["enfermedad_original"] == "healthy"
    assert data["planta"] == "Planta desconocida"
    

