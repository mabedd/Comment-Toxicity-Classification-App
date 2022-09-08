from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .utils import load_clf, preprocess_data, predict


class CommentItem(BaseModel):
    text: str


app = FastAPI()

# Define client url
origins = [
    "http://localhost:3000",
]

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hellor from API"}


# @app.get("/predict/{text}")
# async def test(text):
#     # Preprocess text
#     vectorized_text = preprocess_data(text, "app/data/train.csv")

#     # Load model
#     model = load_clf("app/model/toxicity_model.h5")

#     # predict
#     pred = predict(model, vectorized_text)

#     # Return
#     return pred


@app.post("/predict/")
async def predict_comment(text):
    # Preprocess text
    vectorized_text = preprocess_data(text, "app/data/train.csv")

    # Load model
    model = load_clf("app/model/toxicity_model.h5")

    # predict
    pred = predict(model, vectorized_text)

    # Return
    return pred
