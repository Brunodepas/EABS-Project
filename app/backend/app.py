from flask import Flask, request, jsonify, session
from flask_cors import CORS
from mappings.translations import plants as translations_plants, diseases as translations_diseases
from mappings.treatments import treatments as treatments_treatments
from model import predict_plant
import os
from db.database import Base, engine, SessionLocal
from db.models_db import User, PredictionHistory
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "clave-secreta-para-dev")
CORS(app, supports_credentials=True)

Base.metadata.create_all(bind=engine)

@app.route('/')
def index():
    return "Flask backend con IA funcionando!"

@app.route('/', methods=['POST'])
def predict():
    data = request.json
    image_base64 = data.get("image")
    if not image_base64:
        return jsonify({"error": "No se envió ninguna imagen"}), 400

    try:
        prediction = predict_plant(image_base64)
        
        if "error" in prediction:
            return jsonify({"error": f"Error en el modelo: {prediction['error']}"}), 500

        enfermedad_completa = prediction.get("disease", "healthy")
        confidence = prediction.get("confidence", 0)

        if "___" in enfermedad_completa:
            planta_string = enfermedad_completa.split("___")[0]
            enfermedad_string = enfermedad_completa.split("___")[1]
        else:
            planta_string = "Unknown"
            enfermedad_string = enfermedad_completa

        planta_espaniol = translations_plants.get(planta_string, "Planta desconocida")
        enfermedad_espaniol = translations_diseases.get(enfermedad_completa, "Enfermedad desconocida")
        recomendacion = treatments_treatments.get(enfermedad_completa, "No hay tratamiento disponible para esta enfermedad.")

        result = {
            "planta": planta_espaniol,
            "enfermedad": enfermedad_espaniol,
            "recomendacion": recomendacion,
            "confianza": f"{confidence:.2%}",
            "clase_original": enfermedad_completa,
            "planta_original": planta_string,
            "enfermedad_original": enfermedad_string
        }

        user_id = session.get("user_id")

        if user_id:
            db = SessionLocal()
            try: 
                new_prediction = PredictionHistory(
                    user_id = user_id,
                    plant_name = planta_espaniol,
                    disease_name = enfermedad_espaniol,
                    recommendation = recomendacion,
                    confidence = float(confidence),
                    image = image_base64
                )
                db.add(new_prediction)
                db.commit()
            except Exception as e:
                db.rollback()
                print("Error guardando predicción: {e}")
            finally:
                db.close()

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/register", methods=['POST'])
def register():
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    db = SessionLocal()
    try:
        # Verifico si ya existe un usuario
        if db.query(User).filter((User.email == email) | (User.username == username)).first():
            return jsonify({"error": "El usuario o email ya está  registrado"}), 400
        
        hashed_password = generate_password_hash(password)

        new_user = User(
            username = username,
            email = email,
            password = hashed_password
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return jsonify({
            "message": "Usuario registrado con éxito",
            "username": new_user.username
        }), 201
    
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    
    finally:
        db.close()


@app.route("/login", methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify ({"error": "Email y contraseña son obligatorios"}), 400
    
    db = SessionLocal()
    try: 
        user = db.query(User).filter_by(email=email).first()

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 401
        
        if not check_password_hash(user.password, password):
            return jsonify({"error": "Contraseña incorrecta"}), 401
        
        session["user_id"] = user.id

        return jsonify({
            "message" : f"Bienvenido {user.username}!"
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        db.close()

@app.route("/me", methods=["POST"])
def me():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "No hay usuario logueado"}), 400

    db = SessionLocal()
    user = db.query(User).filter_by(id=user_id).first()
    db.close()

    return jsonify({
        "username": user.username,
        "email": user.email
    }), 200

@app.route("/logout", methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Sesión cerrada correctamente"}), 200

@app.route("/history", methods=['GET'])
def get_user_history():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Usuario no logueado"}),401
    
    db = SessionLocal()
    try: 
        preds = (
            db.query(PredictionHistory).filter_by(user_id=user_id).order_by(PredictionHistory.created_at.desc()).all()
        )

        history = []
        for p in preds:
            history.append({
                "id": p.id,
                "plant_name": p.plant_name,
                "disease_name": p.disease_name,
                "recommendation": p.recommendation,
                "confidence": p.confidence,
                "date": p.created_at.isoformat() if p.created_at else None
            })
        return jsonify(history), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        db.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  