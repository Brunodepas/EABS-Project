from flask import Flask, request, jsonify, session
from flask_cors import CORS
from mappings.translations import plants as translations_plants, diseases as translations_diseases
from mappings.treatments import treatments as treatments_treatments
from model import predict_plant
import os
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
import random
from db.database import Base, engine, SessionLocal
from db.models_db import User, PredictionHistory
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from datetime import datetime
import pytz

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "clave-secreta-para-dev")
CORS(app, supports_credentials=True)
api_key = os.getenv("BREVO_API_KEY")
reset_codes = {}
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
        
        print("\n========== DEBUG FLASK ==========")
        print("prediction dict:", prediction)
        print("enfermedad_completa:", prediction.get("disease"))
        print("confidence:", prediction.get("confidence"))
        print("=================================\n")
        if "error" in prediction:
            return jsonify({"error": f"Error en el modelo: {prediction['error']}"}), 500

        enfermedad_completa = prediction.get("disease", "healthy")
        confidence = prediction.get("confidence", 0)

        if "___" in enfermedad_completa:
            planta_string = enfermedad_completa.split("___")[0]
            enfermedad_string = enfermedad_completa.split("___")[1]
        else:
            partes = enfermedad_completa.split("_")

            if partes[0] == "healthy":
                # healthy_bean -> bean, healthy
                planta_string = partes[1]
                enfermedad_string = "healthy"

            elif partes[0] == "diseased":
                # diseased_cucumber -> cucumber, diseased
                planta_string = partes[1]
                enfermedad_string = "diseased"

            else:
                # lemon_citrus_canker -> lemon, citrus_canker
                # bean_rust -> bean, rust
                planta_string = partes[0]
                enfermedad_string = "_".join(partes[1:])

        print("\n----- DEBUG SPLIT -----")
        print("planta_string:", planta_string)
        print("enfermedad_string:", enfermedad_string)
        print("------------------------\n")
        planta_espaniol = translations_plants.get(planta_string, "Planta desconocida")
        enfermedad_espaniol = translations_diseases.get(enfermedad_completa, "Enfermedad desconocida")
        recomendacion = treatments_treatments.get(enfermedad_completa, "No hay tratamiento disponible para esta enfermedad.")
        print("\n----- DEBUG TRANSLATIONS -----")
        print("translations_plants.get:", translations_plants.get(planta_string))
        print("translations_diseases.get:", translations_diseases.get(enfermedad_completa))
        print("treatments.get:", treatments_treatments.get(enfermedad_completa))
        print("-------------------------------\n")

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
                argentina_tz = pytz.timezone("America/Argentina/Buenos_Aires")
                new_prediction = PredictionHistory(
                    user_id=user_id,
                    plant_name=planta_espaniol,
                    disease_name=enfermedad_espaniol,
                    recommendation=recomendacion,
                    confidence=float(confidence),
                    image=image_base64,
                    created_at=datetime.now(argentina_tz)
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
    profile_image = data.get("profile_image")

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
            password = hashed_password,
            profile_image = profile_image
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
        "email": user.email,
        "profile_image": user.profile_image
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
            db.query(PredictionHistory).filter_by(user_id=user_id)
            .order_by(PredictionHistory.created_at.desc())
            .all()
        )

        history = []
        for p in preds:
            history.append({
                "id": p.id,
                "plant_name": p.plant_name,
                "disease_name": p.disease_name,
                "recommendation": p.recommendation,
                "confidence": p.confidence,
                "image": p.image,  
                "date": p.created_at.isoformat() if p.created_at else None
            })
        return jsonify(history), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        db.close()

@app.route("/update-profile", methods=["PUT"])
def update_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "No hay usuario logueado"}), 400

    data = request.get_json(silent=True) or {}
    username = data.get("username")
    email = data.get("email")
    profile_image = data.get("profile_image")

    db = SessionLocal()
    try:
        user = db.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        # Verificar si el email o username ya están en uso por OTRO usuario
        if email and db.query(User).filter(User.email == email, User.id != user_id).first():
            return jsonify({"error": "El email ya está en uso"}), 400

        if username and db.query(User).filter(User.username == username, User.id != user_id).first():
            return jsonify({"error": "El nombre de usuario ya está en uso"}), 400

        # Actualizar los campos
        if username:
            user.username = username
        if email:
            user.email = email
        if profile_image:
            user.profile_image = profile_image

        db.commit()

        return jsonify({
            "message": "Perfil actualizado correctamente",
            "username": user.username,
            "email": user.email,
            "profile_image": user.profile_image
        })

    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
        
    finally:
        db.close()

@app.route("/change-password", methods=["POST"])
def change_password():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Usuario no logueado"}), 401

    data = request.get_json()
    old_password = data.get("old_password")
    new_password = data.get("new_password")

    if not old_password or not new_password:
        return jsonify({"error": "Faltan datos"}), 400

    db = SessionLocal()
    try:
        user = db.query(User).filter_by(id=user_id).first()

        # Verificar contraseña actual
        if not check_password_hash(user.password, old_password):
            return jsonify({"error": "La contraseña actual es incorrecta"}), 400

        # Actualizar a la nueva
        user.password = generate_password_hash(new_password)
        db.commit()

        return jsonify({"message": "Contraseña actualizada correctamente"}), 200

    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()


@app.route("/restore-history", methods=["POST"])
def restore_history():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Usuario no logueado"}), 401

    db = SessionLocal()
    try:
        db.query(PredictionHistory).filter_by(user_id=user_id).delete()
        db.commit()
        return jsonify({"message": "Historial restaurado correctamente"}), 200
    
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()

@app.route("/delete-account", methods=["POST"])
def delete_account():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Usuario no logueado"}), 401

    db = SessionLocal()
    try:
        # Borrar historial del usuario primero
        db.query(PredictionHistory).filter_by(user_id=user_id).delete()

        # Borrar el usuario
        db.query(User).filter_by(id=user_id).delete()
        db.commit()

        session.clear()

        return jsonify({"message": "Cuenta eliminada correctamente"}), 200

    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()


@app.route("/forgot-password", methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"message": "Email requerido"}), 400

    db = SessionLocal()
    user = db.query(User).filter_by(email=email).first()
    db.close()

    # Siempre respondemos igual (seguridad)
    if not user:
        return jsonify({"message": "Si el correo existe, enviaremos un código."}), 200

    code = str(random.randint(100000, 999999))
    reset_codes[email] = code  

    print(f"[DEBUG] Código generado para {email}: {code}")

    html = f"""
        <h2>Hola {user.username}</h2>
        <p>Recibimos una solicitud para recuperar tu cuenta.</p>
        <p>Tu código de recuperación es:</p>
        <h1 style='font-size:32px; letter-spacing:4px;'>{code}</h1>
        <p>Usalo en la página para continuar.</p>
        <br/>
        <p>Si no solicitaste esto, podés ignorar el mensaje.</p>
    """

    ok = send_email(email, "Código de recuperación", html)

    if not ok:
        return jsonify({"message": "Error enviando correo."}), 500

    return jsonify({"message": "Si el correo existe, enviaremos un código."}), 200



def send_email(to_email, subject, html):
    api_key = os.getenv("BREVO_API_KEY")

    if not api_key:
        print("[ERROR] No existe BREVO_API_KEY en las variables de entorno.")
        return False

    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key["api-key"] = api_key

    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
        sib_api_v3_sdk.ApiClient(configuration)
    )

    email = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": to_email}],
        sender={"email": "aguscesari14@gmail.com", "name": "EABS Project"},
        subject=subject,
        html_content=html
    )

    try:
        api_instance.send_transac_email(email)
        print(f"[OK] Email enviado a {to_email}")
        return True

    except ApiException as e:
        print("[ERROR] Falló el envío:", e)
        return False

@app.route("/validate-code", methods=["POST"])
def validate_code():
    data = request.get_json()
    email = data.get("email")
    code = data.get("code")

    if not email or not code:
        return jsonify({"error": "Datos incompletos"}), 400

    real_code = reset_codes.get(email)

    if not real_code:
        return jsonify({"error": "No existe un código para este email"}), 400

    if str(real_code) != str(code):
        return jsonify({"error": "Código incorrecto"}), 400

    return jsonify({"message": "Código validado correctamente"}), 200

@app.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()
    email = data.get("email")
    new_password = data.get("password")

    if not email or not new_password:
        return jsonify({"error": "Datos incompletos"}), 400

    db = SessionLocal()
    try:
        user = db.query(User).filter_by(email=email).first()

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        user.password = generate_password_hash(new_password)
        db.commit()

        return jsonify({"message": "Contraseña actualizada correctamente"}), 200

    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  