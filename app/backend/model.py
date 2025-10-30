from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io
import base64


modelo = load_model("models/modelo_proyecto.h5")

with open("./models/classes.txt", "r") as f:
    CLASS_LABELS = [line.strip() for line in f.readlines()]

PLANT_LABELS = list({cls.split("___")[0] for cls in CLASS_LABELS})

def preprocess_image(image_base64, target_size=(128, 128)):
    """Convierte Base64 a array compatible con el modelo (maneja imágenes RGBA, PNG, JPG, etc.)"""
    
    # Decodificar imagen base64
    image_bytes = image_base64.split(',')[1].encode()
    img = Image.open(io.BytesIO(base64.b64decode(image_bytes)))
    
    # Convertir a RGB si tiene canal alfa (RGBA o CMYK)
    if img.mode != "RGB":
        img = img.convert("RGB")
    
    # Redimensionar
    img = img.resize(target_size)
    
    # Convertir a array y normalizar
    img_array = image.img_to_array(img) / 255.0

    # Asegurarse de tener solo 3 canales
    if img_array.shape[-1] == 4:
        img_array = img_array[..., :3]
    
    # Agregar dimensión batch (1, 128, 128, 3)
    img_array = np.expand_dims(img_array, axis=0)

    return img_array

def predict_plant(image_base64):
    """Devuelve la predicción de la imagen"""
    img_array = preprocess_image(image_base64)
    prediction = modelo.predict(img_array)
    class_idx = np.argmax(prediction)
    predicted_class = CLASS_LABELS[class_idx]
    confidence = float(np.max(prediction))
    return {"disease": predicted_class, "confidence": confidence}
