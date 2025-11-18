
# EABS project 🌿
| [Miro](https://miro.com/app/board/uXjVJOuK2-o=/?share_link_id=926940224853)
| [Colab de entrenamiento](https://colab.research.google.com/drive/1_SliUaMsSbO45PygoQc_1HLC5ErkKeLw?usp=sharing)

EABS Project es un sistema de inteligencia artificial diseñado para analizar imágenes de hojas de plantas.

El sistema es capaz de:

* Identificar la especie de la planta.

* Evaluar el estado de salud de la hoja.

* Sugerir tratamientos específicos en caso de detectar enfermedades.

El objetivo principal es ayudar a agricultores y aficionados a la jardinería a mantener sus plantas saludables de manera sencilla y eficiente.

Plantas Incluidas 🌱

```
Manzana    Arándano    Cereza    Maíz    Uva
Naranja    Durazno     Morrón    Papa    Frambuesa
Soja       Calabaza    Fresa     Tomate  Poroto
Algodón    Pepino      Guayaba   Limón   Arroz
Caña de azúcar         Trigo
```





# Tecnologías y Modelos

Modelo principal: CNN (Red Neuronal Convolucional) para clasificación de imágenes.

Lenguajes y herramientas: Python, TensorFlow/Keras, Google Colab, React, Flask, HTML, CSS, Pytest, Vitest, Jest-DOM.

## Instrucciones para ejecutar el proyecto

- 1 ubicarse en EABS-PROJECT/app

- 2 instalar las dependencias necesarias: docker compose build

- 3 levantar el proyecto: docker compose up app -d

- 4  [Ir a este link](http://127.0.0.1:3000) 

- 5 bajar el proyecto: docker compose down app

-----------------------------------------
# Importante!
Debe crear un archivo .env en la carpeta /app. 

.env debe tener, por ejemplo, el siguiente contenido:

SECRET_KEY=clave-supersecreta-desarrollo

BREVO_API_KEY=una_clave_genial  
(Registrarse gratis en [Brevo](https://www.github.com/EmiBernal) para obtener tu clave)

FLASK_ENV=development

-----------------------------------------
## correr los tests
- Backend:  
    1) docker compose build backend --no-cache
    2) docker compose run --rm backend pytest
- Frontend:
    1) docker compose build frontend-tests --no-cache
    2) docker compose run --rm frontend-tests

-----------------------------------------

## Integrantes 

- [Emiliano Bernal](https://www.github.com/EmiBernal)
- [Agustin Cesari](https://www.github.com/AgusCesari)
- [Bruno De Pasquale](https://www.github.com/Brunodepas)
- [Samuel Quintero](https://www.github.com/Samquintero22)
