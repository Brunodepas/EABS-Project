# imagen base
FROM python:3.11-slim

# directorio de trabajo
WORKDIR /app

# copiar dependencias
COPY requirements.txt .

# instalar dependencias
RUN apt-get update && apt-get install -y build-essential libjpeg-dev zlib1g-dev \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# copiar código
COPY . .

# exponer puerto de Flask
EXPOSE 5000

# comando para ejecutar la app
CMD ["python", "app.py"]
