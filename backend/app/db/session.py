from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# Crearea motorului de bază de date
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI, pool_pre_ping=True)

# Crearea unei sesiuni locale
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
