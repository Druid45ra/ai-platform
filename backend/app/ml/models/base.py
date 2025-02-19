from abc import ABC, abstractmethod
from typing import Dict, Any
import torch

class BaseModel(ABC):
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = None

    @abstractmethod
    def train(self, data: Dict[str, Any]) -> Dict[str, Any]:
        pass

    @abstractmethod
    def predict(self, data: Dict[str, Any]) -> Dict[str, Any]:
        pass

    @abstractmethod
    def evaluate(self, data: Dict[str, Any]) -> Dict[str, Any]:
        pass

    def save(self, path: str) -> None:
        if self.model:
            torch.save(self.model.state_dict(), path)

    def load(self, path: str) -> None:
        if self.model:
            self.model.load_state_dict(torch.load(path, map_location=self.device))

# app/ml/training/trainer.py
from typing import Dict, Any, Optional
import torch
from torch.utils.data import DataLoader
from app.ml.models.base import BaseModel
from app.core.config import settings
import boto3
import logging

class ModelTrainer:
    def __init__(self, model: BaseModel, config: Dict[str, Any]):
        self.model = model
        self.config = config
        self.s3_client = boto3.client('s3')
        self.logger = logging.getLogger(__name__)

    async def train(self, training_data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            # Prepare data
            train_loader = self._prepare_data(training_data)
            
            # Training loop
            epochs = self.config.get('epochs', 10)
            optimizer = torch.optim.Adam(
                self.model.parameters(),
                lr=self.config.get('learning_rate', 1e-3)
            )

            for epoch in range(epochs):
                epoch_loss = self._train_epoch(train_loader, optimizer)
                self.logger.info(f"Epoch {epoch+1}/{epochs}, Loss: {epoch_loss:.4f}")

            # Save model
            model_path = f"models/{self.model.config['id']}"
            self.model.save(model_path)
            self._upload_to_s3(model_path)

            return {
                "status": "success",
                "message": "Training completed successfully",
                "metrics": {
                    "final_loss": epoch_loss
                }
            }

        except Exception as e:
            self.logger.error(f"Training failed: {str(e)}")
            return {
                "status": "error",
                "message": str(e)
            }

    def _train_epoch(self, train_loader: DataLoader, optimizer: torch.optim.Optimizer) -> float:
        self.model.train()
        total_loss = 0

        for batch in train_loader:
            optimizer.zero_grad()
            loss = self.model.training_step(batch)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        return total_loss / len(train_loader)

    def _upload_to_s3(self, model_path: str) -> None:
        try:
            self.s3_client.upload_file(
                f"{model_path}/model.pt",
                settings.S3_BUCKET,
                f"{model_path}/model.pt"
            )
        except Exception as e:
            self.logger.error(f"Failed to upload model to S3: {str(e)}")
            raise

# app/ml/utils/preprocessing.py
import numpy as np
from typing import Dict, Any, List
import torch
from torch.utils.data import Dataset, DataLoader

class AIDataset(Dataset):
    def __init__(self, data: Dict[str, Any], transform=None):
        self.data = data
        self.transform = transform

    def __len__(self) -> int:
        return len(self.data['input'])

    def __getitem__(self, idx: int) -> Dict[str, torch.Tensor]:
        item = {
            'input': torch.tensor(self.data['input'][idx], dtype=torch.float32),
            'target': torch.tensor(self.data['target'][idx], dtype=torch.float32)
        }
        
        if self.transform:
            item = self.transform(item)
            
        return item

def prepare_data(data: Dict[str, Any], batch_size: int = 32) -> DataLoader:
    dataset = AIDataset(data)
    return DataLoader(dataset, batch_size=batch_size, shuffle=True)

# app/ml/utils/evaluation.py
from typing import Dict, Any
import torch
import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

def evaluate_model(model: torch.nn.Module, data_loader: torch.utils.data.DataLoader) -> Dict[str, float]:
    model.eval()
    predictions = []
    targets = []
    
    with torch.no_grad():
        for batch in data_loader:
            outputs = model(batch['input'])
            predictions.extend(outputs.cpu().numpy())
            targets.extend(batch['target'].cpu().numpy())
    
    predictions = np.array(predictions)
    targets = np.array(targets)
    
    return {
        'accuracy': accuracy_score(targets, predictions > 0.5),
        'precision': precision_score(targets, predictions > 0.5),
        'recall': recall_score(targets, predictions > 0.5),
        'f1': f1_score(targets, predictions > 0.5)
    }
