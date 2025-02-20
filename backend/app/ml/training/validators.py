from typing import Tuple
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

def validate_data(X: np.ndarray, y: np.ndarray) -> bool:
    """
    Validate the input data for training.
    """
    if X.shape[0] != y.shape[0]:
        raise ValueError("The number of samples in X and y must be equal.")
    if len(X.shape) != 2:
        raise ValueError("X must be a 2-dimensional array.")
    if len(y.shape) != 1:
        raise ValueError("y must be a 1-dimensional array.")
    return True

def split_data(X: np.ndarray, y: np.ndarray, test_size: float = 0.2, random_state: int = 42) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
    """
    Split the data into training and testing sets.
    """
    return train_test_split(X, y, test_size=test_size, random_state=random_state)

def evaluate_model(y_true: np.ndarray, y_pred: np.ndarray) -> dict:
    """
    Evaluate the model performance using various metrics.
    """
    accuracy = accuracy_score(y_true, y_pred)
    precision = precision_score(y_true, y_pred, average='weighted')
    recall = recall_score(y_true, y_pred, average='weighted')
    f1 = f1_score(y_true, y_pred, average='weighted')

    return {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1_score": f1
    }
