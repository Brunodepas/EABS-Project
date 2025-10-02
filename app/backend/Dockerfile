# imagen base
FROM python:3.11-slim

# directorio de trabajo
WORKDIR /app

# copiar dependencias
COPY requirements.txt .

# instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# copiar código
COPY . .

# exponer puerto de Flask
EXPOSE 5000

# comando para ejecutar la app
CMD ["python", "app.py"]
