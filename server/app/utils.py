from tensorflow.keras.layers import TextVectorization
from tensorflow.keras.models import load_model
import numpy as np
import pandas as pd


def load_clf(path):
    """Load Keras model from given path"""
    return load_model(path)


def preprocess_data(text, data_path="app/data/train.csv"):
    """Preprocess text by applying vectorization"""
    # Initialize vectorizer
    vectorizer = TextVectorization(
        max_tokens=20000, output_sequence_length=1800, output_mode="int"
    )
    # Load and adapt data
    data = load_data(data_path)
    vectorizer.adapt(data)

    # Vectorize
    vectorized_text = vectorizer(text)

    # Return
    return vectorized_text


def load_data(data_path):
    """Loading data from given path and returning values"""

    # Load data into df
    data = pd.read_csv(data_path)
    X = data["comment_text"]
    return X.values


def predict(model, text):
    """Score the text among all cols"""
    # Predict
    results = model.predict(np.expand_dims(text, 0))
    # Load data to get cols
    df = pd.read_csv("app/data/train.csv")

    # Loop through results and return true if > 0.5
    toxicity = {}
    for idx, col in enumerate(df.columns[2:]):
        if results[0][idx] > 0.3:
            toxicity[col] = "true"
        else:
            toxicity[col] = "false"

    # Return
    return toxicity
