from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from app.core.security import create_access_token, get_current_user
from app.db.crud import create_user, get_user_by_email
from app.db.models import User

router = APIRouter()

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await get_user_by_email(form_data.username)
    if not user or not user.verify_password(form_data.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"token": access_token, "token_type": "bearer"}

@router.post("/register")
async def register(user_data: dict):
    if await get_user_by_email(user_data["email"]):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = await create_user(user_data)
    return {"message": "User created successfully"}

@router.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# app/api/routes/models.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.core.security import get_current_user
from app.db.crud import get_models, get_model, create_model
from app.ml.training.trainer import ModelTrainer
from app.db.models import User, Model

router = APIRouter()

@router.get("/")
async def list_models(current_user: User = Depends(get_current_user)) -> List[Model]:
    return await get_models(user_id=current_user.id)

@router.get("/{model_id}")
async def get_model_details(model_id: int, current_user: User = Depends(get_current_user)):
    model = await get_model(model_id)
    if not model or model.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Model not found")
    return model

@router.post("/")
async def create_new_model(model_data: dict, current_user: User = Depends(get_current_user)):
    model_data["user_id"] = current_user.id
    model = await create_model(model_data)
    return model

@router.post("/{model_id}/train")
async def train_model(
    model_id: int,
    training_data: dict,
    current_user: User = Depends(get_current_user)
):
    model = await get_model(model_id)
    if not model or model.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Model not found")
    
    trainer = ModelTrainer(str(model_id), model.config)
    result = await trainer.train(training_data)
    return result

# app/api/routes/training.py
from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.db.models import User
from app.ml.training.trainer import ModelTrainer

router = APIRouter()

@router.get("/{training_id}/status")
async def get_training_status(
    training_id: str,
    current_user: User = Depends(get_current_user)
):
    # Implementation for getting training status
    pass

@router.post("/validate")
async def validate_training_data(
    data: dict,
    current_user: User = Depends(get_current_user)
):
    # Implementation for validating training data
    pass
