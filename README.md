# AI Platform

This project is an AI platform that provides a backend API built with FastAPI and a frontend built with React. 
The platform allows users to manage and train machine learning models, and it includes features for user authentication and model management.

## Key Features

- **User Authentication**: Secure user registration and login.
- **Model Management**: Create, update, delete, and list machine learning models.
- **Model Training**: Train models with provided datasets.
- **Statistics**: View statistics about the models.

## Project Structure
ai-platform/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ModelCard.jsx
│   │   │   │   └── Statistics.jsx
│   │   │   ├── models/
│   │   │   │   ├── ModelTraining.jsx
│   │   │   │   ├── ModelList.jsx
│   │   │   │   └── ModelDetails.jsx
│   │   │   └── common/
│   │   │       ├── Navbar.jsx
│   │   │       ├── Footer.jsx
│   │   │       └── Loading.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── models.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── README.md
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── auth.py
│   │   │   │   ├── models.py
│   │   │   │   └── training.py
│   │   │   ├── dependencies.py
│   │   │   └── middleware.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── logging.py
│   │   ├── db/
│   │   │   ├── models.py
│   │   │   ├── session.py
│   │   │   └── crud.py
│   │   ├── ml/
│   │   │   ├── training/
│   │   │   │   ├── trainer.py
│   │   │   │   └── validators.py
│   │   │   ├── models/
│   │   │   │   ├── base.py
│   │   │   │   └── transformers.py
│   │   │   └── utils/
│   │   │       ├── preprocessing.py
│   │   │       └── evaluation.py
│   │   └── main.py
│   ├── requirements.txt
│   └── README.md
├── docker/
│   ├── frontend.Dockerfile
│   ├── backend.Dockerfile
│   └── docker-compose.yml
├── tests/
│   ├── frontend/
│   │   ├── components/
│   │   └── integration/
│   └── backend/
│       ├── api/
│       ├── ml/
│       └── integration/
└── README.md


## Backend

### Technologies

- **Framework**: FastAPI
- **Database**: SQLAlchemy with Alembic for migrations
- **Authentication**: JWT-based authentication using `python-jose`
- **Configuration**: Environment variables managed with `pydantic-settings`

### Setup

1. Navigate to the `backend` directory:

    ```sh
    cd backend
    ```

2. Create and activate a virtual environment:

    ```sh
    python -m venv env
    source env/Scripts/activate  # For Git Bash on Windows
    ```

3. Install dependencies:

    ```sh
    pip install --upgrade setuptools wheel
    pip install -r requirements.txt
    ```

4. Initialize Alembic:

    ```sh
    alembic init alembic
    ```

5. Configure `alembic.ini`:

    Ensure you have a properly configured `alembic.ini` file in the [backend](http://_vscodecontentref_/4) directory.

6. Migrate the database:

    ```sh
    alembic upgrade head
    ```

7. Create a `.env` file with the following content:

    ```properties
    SECRET_KEY=your_secret_key
    DATABASE_URL=sqlite:///./test.db
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    ```

8. Start the backend server:

    ```sh
    uvicorn app.main:app --reload
    ```

## Frontend

### Technologies

- **Framework**: React
- **Routing**: React Router
- **State Management**: React hooks and context

### Setup

1. Navigate to the [frontend](http://_vscodecontentref_/5) directory:

    ```sh
    cd frontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm start
    ```

## Docker

### Setup

1. Navigate to the root directory of the project:

    ```sh
    cd ai-platform
    ```

2. Build and start the services using Docker Compose:

    ```sh
    docker-compose up --build
    ```

## Running Tests

### Backend

1. Navigate to the [backend](http://_vscodecontentref_/6) directory:

    ```sh
    cd backend
    ```

2. Run the tests:

    ```sh
    pytest
    ```

### Frontend

1. Navigate to the [frontend](http://_vscodecontentref_/7) directory:

    ```sh
    cd frontend
    ```

2. Run the tests:

    ```sh
    npm test
    ```

## Contributing

Contributions are welcome! Please open a pull request or report issues in the issue tracker.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
