from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.ml.training.trainer import train_model
from app.schemas.training import TrainingCreate, TrainingRead
from app.crud.training import training_crud

router = APIRouter()

@router.post("/", response_model=TrainingRead, status_code=status.HTTP_201_CREATED)
def start_training(training_in: TrainingCreate, db: Session = Depends(get_db)):
    """
    Start a new training process.
    """
    training = training_crud.create(db=db, obj_in=training_in)
    train_model(training)
    return training

@router.get("/", response_model=List[TrainingRead])
def read_trainings(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Retrieve training processes.
    """
    trainings = training_crud.get_multi(db=db, skip=skip, limit=limit)
    return trainings

@router.get("/{training_id}", response_model=TrainingRead)
def read_training(training_id: int, db: Session = Depends(get_db)):
    """
    Get a specific training process by ID.
    """
    training = training_crud.get(db=db, id=training_id)
    if not training:
        raise HTTPException(status_code=404, detail="Training not found")
    return training

@router.delete("/{training_id}", response_model=TrainingRead)
def delete_training(training_id: int, db: Session = Depends(get_db)):
    """
    Delete a training process.
    """
    training = training_crud.get(db=db, id=training_id)
    if not training:
        raise HTTPException(status_code=404, detail="Training not found")
    training = training_crud.remove(db=db, id=training_id)
    return training
