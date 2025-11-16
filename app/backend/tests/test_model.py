import pytest
import base64
import io
from PIL import Image

def test_preprocess_invalid_base64():
    from model import preprocess_image

    with pytest.raises(Exception):
        preprocess_image("esto_no_es_una_imagen")

def test_preprocess_rgba():
    from model import preprocess_image

    # Generar una imagen RGBA en memoria
    img = Image.new("RGBA", (10, 10), (255, 0, 0, 128))
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    b64 = base64.b64encode(buffer.getvalue()).decode()
    fake = f"data:image/png;base64,{b64}"

    arr = preprocess_image(fake)

    assert arr.shape == (1, 128, 128, 3)
