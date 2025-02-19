from typing import Optional, Dict, Any
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from app.ml.models.base import BaseModel
from app.core.config import settings
import boto3
import json

class ModelTrainer:
    def __init__(self, model_id: str, config: Dict[str, Any]):
        self.model_id = model_id
        self.config = config
        self.s3_client = boto3.client('s3')
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
    async def train(self, training_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Train a model with the given training data
        """
        try:
            # Initialize model and tokenizer
            model = AutoModelForSequenceClassification.from_pretrained(
                self.config["base_model"],
                num_labels=self.config["num_labels"]
            )
            tokenizer = AutoTokenizer.from_pretrained(self.config["base_model"])
            
            # Prepare training data
            processed_data = self._prepare_data(training_data, tokenizer)
            
            # Training loop
            model.train()
            optimizer = torch.optim.AdamW(model.parameters(), lr=self.config["learning_rate"])
            
            for epoch in range(self.config["num_epochs"]):
                total_loss = 0
                for batch in processed_data:
                    optimizer.zero_grad()
                    outputs = model(**batch)
                    loss = outputs.loss
                    loss.backward()
                    optimizer.step()
                    total_loss += loss.item()
                
            # Save model to S3
            model_path = f"models/{self.model_id}"
            self._save_to_s3(model, tokenizer, model_path)
            
            return {
                "status": "success",
                "model_id": self.model_id,
                "metrics": {
                    "final_loss": total_loss / len(processed_data)
                }
            }
            
        except Exception as e:
            return {
                "status": "error",
                "error": str(e)
            }
    
    def _prepare_data(self, data: Dict[str, Any], tokenizer) -> torch.Tensor:
        # Data preparation logic here
        pass
    
    def _save_to_s3(self, model, tokenizer, path: str) -> None:
        # Save model and tokenizer to S3
        model.save_pretrained(path)
        tokenizer.save_pretrained(path)
        
        # Upload to S3
        self.s3_client.upload_file(
            f"{path}/pytorch_model.bin",
            settings.S3_BUCKET,
            f"{path}/pytorch_model.bin"
        )
Last edited 23 minutes ago
