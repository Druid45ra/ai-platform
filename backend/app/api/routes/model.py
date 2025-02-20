from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.ml.models import Model
from app.schemas.model import ModelCreate, ModelRead, ModelUpdate
from app.crud.model import model_crud

router = APIRouter()

@router.post("/", response_model=ModelRead, status_code=status.HTTP_201_CREATED)
def create_model(model_in: ModelCreate, db: Session = Depends(get_db)):
    """
    Create a new model.
    """
    model = model_crud.create(db=db, obj_in=model_in)
    return model

@router.get("/", response_model=List[ModelRead])
def read_models(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Retrieve models.
    """
    models = model_crud.get_multi(db=db, skip=skip, limit=limit)
    return models

@router.get("/{model_id}", response_model=ModelRead)
def read_model(model_id: int, db: Session = Depends(get_db)):
    """
    Get a specific model by ID.
    """
    model = model_crud.get(db=db, id=model_id)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    return model

@router.put("/{model_id}", response_model=ModelRead)
def update_model(model_id: int, model_in: ModelUpdate, db: Session = Depends(get_db)):
    """
    Update a model.
    """
    model = model_crud.get(db=db, id=model_id)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    model = model_crud.update(db=db, db_obj=model, obj_in=model_in)
    return model

@router.delete("/{model_id}", response_model=ModelRead)
def delete_model(model_id: int, db: Session = Depends(get_db)):
    """
    Delete a model.
    """
    model = model_crud.get(db=db, id=model_id)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    model = model_crud.remove(db=db, id=model_id)
    return model
