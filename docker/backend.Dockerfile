# Folosește o imagine de bază oficială Python
FROM python:3.9-slim

# Setează directorul de lucru în container
WORKDIR /app

# Copiază fișierul requirements.txt în directorul de lucru
COPY ../backend/requirements.txt .

# Instalează dependențele necesare
RUN pip install --no-cache-dir -r requirements.txt

# Copiază codul aplicației în container
COPY ../backend /app

# Expune portul pe care aplicația va rula
EXPOSE 8000

# Setează variabilele de mediu necesare
ENV PYTHONUNBUFFERED=1

# Comanda pentru a rula aplicația
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
