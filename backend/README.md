# AI-Platform Backend

Acesta este backend-ul aplicației AI-Platform, construit cu FastAPI și SQLAlchemy.

## Configurație

### Dependențe

Asigură-te că ai instalat următoarele dependențe:

- Python 3.8+
- pip

### Instalare

1. Clonează acest repository:

    ```sh
    git clone https://github.com/Druid45ra/ai-platform.git
    cd ai-platform/backend
    ```

2. Creează și activează un mediu virtual:

    ```sh
    python -m venv env
    source env/bin/activate  # Pentru Windows: .\env\Scripts\activate
    ```

3. Instalează dependențele:

    ```sh
    pip install -r requirements.txt
    ```

### Configurare

1. Creează un fișier `.env` în directorul [backend](http://_vscodecontentref_/2) și adaugă următoarele variabile de mediu:

    ```env
    SECRET_KEY=your_secret_key
    SQLALCHEMY_DATABASE_URI=sqlite:///./test.db
    ```

2. Asigură-te că fișierul `config.py` este configurat corect pentru a citi variabilele de mediu:

    ```python
    # filepath: backend/app/core/config.py

    import os
    from pydantic import BaseSettings

    class Settings(BaseSettings):
        SECRET_KEY: str = os.getenv("SECRET_KEY", "your_secret_key")
        SQLALCHEMY_DATABASE_URI: str = os.getenv("SQLALCHEMY_DATABASE_URI", "sqlite:///./test.db")
        ALGORITHM: str = "HS256"
        ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    settings = Settings()
    ```

### Migrarea bazei de date

1. Creează tabelele în baza de date:

    ```sh
    alembic upgrade head
    ```

### Rulare

1. Rulează aplicația:

    ```sh
    uvicorn app.main:app --reload
    ```

2. Accesează documentația API la [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

## Structura Proiectului

- `app/`: Conține codul principal al aplicației backend.
  - `api/`: Conține rutele API și middleware-urile.
  - `core/`: Conține configurațiile și alte module de bază.
  - `db/`: Conține modulele legate de baza de date.
  - `ml/`: Conține modulele legate de machine learning.
  - `main.py`: Punctul de intrare al aplicației backend.

## Testare

1. Rulează testele:

    ```sh
    pytest
    ```

## Contribuții

Contribuțiile sunt binevenite! Te rugăm să deschizi un pull request sau să raportezi probleme în secțiunea de issues.

## Licență

Acest proiect este licențiat sub licența MIT. Vezi fișierul LICENSE pentru mai multe detalii.
