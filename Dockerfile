FROM python:3.11-slim

# Establecer el directorio de trabajo
WORKDIR /app/src/api


# Copiar Pipfile y Pipfile.lock para instalar dependencias
COPY src/api/Pipfile* ./

# Instalar dependencias del sistema necesarias (incluyendo psycopg2 y build-essential)
# RUN apt-get update && apt-get install -y libpq-dev
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    python3-pip

# Instalar pipenv y dependencias del proyecto
#RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --upgrade pip pipenv
RUN pipenv install 
#--deploy --ignore-pipfile  
# Usa Pipfile.lock para garantizar versiones exactas

# Establecer variables de entorno de Flask
ENV FLASK_APP=src/api/app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=production

# Exponer el puerto donde correrá la aplicación
EXPOSE 5000

# Comando para correr Flask (asegúrate que se use pipenv si lo configuraste)
#CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
CMD ["flask", "run"] 
#for if .venv
#CMD ["pipenv", "run", "flask", "run"] for if pipenv