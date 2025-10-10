from flask import Flask, request, jsonify
from flask_cors import CORS
from mappings.translations import plants as translations_plants, diseases as translations_diseases
from mappings.treatments import treatments as treatments_treatments
from model import predict_plant
import os

app = Flask(__name__)
CORS(app)

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

        # Separar planta y enfermedad
        if "___" in enfermedad_completa:
            planta_string = enfermedad_completa.split("___")[0]
            enfermedad_string = enfermedad_completa.split("___")[1]
        else:
            planta_string = "Unknown"
            enfermedad_string = enfermedad_completa

        # Aplicar traducciones
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
    
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  