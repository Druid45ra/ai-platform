from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import numpy as np

class NumericalTransformer(BaseEstimator, TransformerMixin):
    """
    Custom transformer for numerical features.
    """
    def __init__(self):
        self.scaler = StandardScaler()

    def fit(self, X, y=None):
        self.scaler.fit(X)
        return self

    def transform(self, X):
        return self.scaler.transform(X)

class CategoricalTransformer(BaseEstimator, TransformerMixin):
    """
    Custom transformer for categorical features.
    """
    def __init__(self):
        self.encoder = OneHotEncoder(handle_unknown='ignore')

    def fit(self, X, y=None):
        self.encoder.fit(X)
        return self

    def transform(self, X):
        return self.encoder.transform(X).toarray()

def create_preprocessing_pipeline(numerical_features, categorical_features):
    """
    Create a preprocessing pipeline for numerical and categorical features.
    """
    numerical_pipeline = Pipeline(steps=[
        ('num_transformer', NumericalTransformer())
    ])

    categorical_pipeline = Pipeline(steps=[
        ('cat_transformer', CategoricalTransformer())
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numerical_pipeline, numerical_features),
            ('cat', categorical_pipeline, categorical_features)
        ]
    )

    return preprocessor
