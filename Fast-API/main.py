import io
import pickle
from PIL import Image
import cv2
from fastapi import FastAPI, File, UploadFile
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.svm import SVC
from pymongo import MongoClient
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
client = MongoClient("mongodb://localhost:27017/")
db = client["Projet-ML"]
collection = db["Auth"]
class user(BaseModel):
    firstName:str
    lastName:str
    email:str
    password:str
class User(BaseModel):
    email:str
    password:str

# Load the pre-trained SVM model, scaler, and label encoder
with open('Fast-API/classifier-SVM.pkl', 'rb') as f:
    model = pickle.load(f)

with open('Fast-API/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

with open('Fast-API/label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

labels = ['Adposhel', 'Agent', 'Allaple', 'Alueron.gen!J', 'Amonetize', 'Androm', 'Autorun', 'BrowseFox', 
          'C2LOP.gen!g', 'Dialplatform.B', 'Dinwod', 'Elex', 'Expiro', 'Fakerean', 'Fasong', 'HackKMS', 
          'Hlux', 'Injector', 'InstallCore', 'Lolyda.AA1', 'Lolyda.AA2', 'MultiPlug', 'Neoreklami', 'Neshta', 
          'Regrun', 'Sality', 'Snarasite', 'Stantinko', 'VBA', 'VBKrypt', 'Vilsel']

# Ensure that label encoder is fitted with the labels
label_encoder.fit(labels)

def preprocess_image(image, img_height, img_width):
    image = image.resize((img_height, img_width))  # Resize the image
    image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)  # Convert PIL Image to NumPy array
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    image = image.flatten()  # Flatten image
    return image

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Read the contents of the uploaded file
    contents = await file.read()

    # Convert the binary data to a PIL Image object
    image = Image.open(io.BytesIO(contents))

    # Preprocess the image
    preprocessed_image = preprocess_image(image, 180, 180)

    # Standardize the image
    preprocessed_image = scaler.transform([preprocessed_image])

    # Predict the class of the image
    predicted_class_index = model.predict(preprocessed_image)[0]

    # Decode the predicted class index
    predicted_class = label_encoder.inverse_transform([predicted_class_index])[0]
       # Predict the probabilities for each class
    probabilities = model.predict_proba(preprocessed_image)[0]

    # Map the probabilities to their corresponding labels and sort them
    probability_dict = {label: prob for label, prob in zip(labels, probabilities)}
    sorted_probabilities = {k: v for k, v in sorted(probability_dict.items(), key=lambda item: item[1], reverse=True)}

    # Format the probabilities as percentages
    percentage_probabilities = {label: f"{prob * 100:.2f}%" for label, prob in sorted_probabilities.items()}
    print(f"The predicted class of the image is: {predicted_class}")

    return {"probabilities": percentage_probabilities}

@app.post("/users/")
async def create_user(user_data: user):
    try:
        user_dict = user_data.dict()  # Convert Pydantic model to dictionary
        print("Received data:", user_dict)  # Print the received data
        collection.insert_one(user_dict)
        return {"message": "yes"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    #return {"predicted_class": predicted_class}
   # return {"probabilities": probability_dict}
@app.post("/users/login/")
async def login_user(user: User):
    try:
        print("Received data:", user.dict())
        user_record = collection.find_one({"email": user.email, "password": user.password})
        if user_record:
            return {"message": "yes"}
        else:
            return {"message": "no"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)