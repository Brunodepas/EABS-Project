from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_plant
import base64
import numpy as np
from PIL import Image
import io


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
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"result": prediction})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
