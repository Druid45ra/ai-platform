import numpy as np
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

def handle_missing_values(df: pd.DataFrame, strategy: str = 'mean') -> pd.DataFrame:
    """
    Handle missing values in the DataFrame.
    """
    imputer = SimpleImputer(strategy=strategy)
    df_imputed = pd.DataFrame(imputer.fit_transform(df), columns=df.columns)
    return df_imputed

def scale_numerical_features(df: pd.DataFrame, numerical_features: list) -> pd.DataFrame:
    """
    Scale numerical features in the DataFrame.
    """
    scaler = StandardScaler()
    df[numerical_features] = scaler.fit_transform(df[numerical_features])
    return df

def encode_categorical_features(df: pd.DataFrame, categorical_features: list) -> pd.DataFrame:
    """
    Encode categorical features in the DataFrame.
    """
    encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')
    encoded_features = encoder.fit_transform(df[categorical_features])
    encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(categorical_features))
    df = df.drop(columns=categorical_features)
    df = pd.concat([df, encoded_df], axis=1)
    return df

def preprocess_data(df: pd.DataFrame, numerical_features: list, categorical_features: list) -> pd.DataFrame:
    """
    Preprocess the DataFrame by handling missing values, scaling numerical features, and encoding categorical features.
    """
    df = handle_missing_values(df)
    df = scale_numerical_features(df, numerical_features)
    df = encode_categorical_features(df, categorical_features)
    return df
