from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PIL import Image
import numpy as np
import joblib

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Load your model
model = joblib.load('model.pkl')

@app.route("/")
def home():
    return {"message": "Hello from LeafAI backend"}

@app.route("/upload", methods=['POST'])
def upload():
    file = request.files['file']
    upload_dir = 'uploads/'

    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
        
    file_path = os.path.join(upload_dir, file.filename)
    file.save(file_path)

    # Load and preprocess the image
    img = Image.open(file_path).resize((256, 256)).convert('RGB')
    img_array = np.array(img)
    img_array = img_array / 255.0
    img_array = img_array.reshape(1, 256, 256, 3)

    # Make the prediction
    prediction = model.predict(img_array)
    prediction_proba = np.max(prediction)
    pred_class = np.argmax(prediction)

    # Clean up the uploaded file
    os.remove(file_path)

    return jsonify({"Pred_Class": int(pred_class), "Accuracy": float(prediction_proba)})

if __name__ == '__main__':
    app.run(debug=True)
