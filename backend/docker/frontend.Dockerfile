FROM node:18-alpine

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# docker/backend.Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# docker/docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: ..
      dockerfile: docker/frontend.Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:8000
    depends_on:
      - backend

  backend:
    build:
      context: ..
      dockerfile: docker/backend.Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/ai_platform
      - SECRET_KEY=${SECRET_KEY}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=ai_platform
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
Last edited 1 minute ago
