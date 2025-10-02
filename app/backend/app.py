from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return "Flask backend con IA funcionando!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    # ejemplo simple: devuelve el doble de un número
    x = data.get('value', 0)
    result = x * 2
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
