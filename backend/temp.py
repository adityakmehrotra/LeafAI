from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
from PIL import Image
import numpy as np
import joblib
from pymongo import MongoClient, errors
import ssl
from werkzeug.utils import secure_filename
import logging
from datetime import datetime

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Replace this with your MongoDB URI
MONGO_URI = "mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI, ssl_cert_reqs=ssl.CERT_NONE)
db = client.accountInfo
myCollection = db.auth
uploads_db = client.accountUploads
CORS(app, supports_credentials=True)

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["100 per minute", "1000 per day"]
)

model_path = 'model.pkl'
if os.path.exists(model_path):
    model = joblib.load(model_path)
else:
    raise FileNotFoundError(f"The model file {model_path} does not exist")

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
@limiter.limit("100 per minute, 1000 per day")
def home():
    return {"message": "Hello from LeafAI backend"}

@app.route("/register", methods=['POST'])
@limiter.limit("100 per minute, 1000 per day")
def register():
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if not all([first_name, last_name, email, username, password]):
        return jsonify({"error": "All fields are required"}), 400

    user_data = {
        "_id": username,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password
    }

    try:
        result = myCollection.insert_one(user_data)
        logging.debug(f"Inserted document id: {result.inserted_id}")
        return jsonify({"message": "User registered successfully", "id": str(result.inserted_id)}), 201
    except errors.DuplicateKeyError:
        logging.error(f"Username {username} already exists")
        return jsonify({"error": "Username already exists"}), 400
    except Exception as e:
        logging.error(f"Error inserting data: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/upload_image", methods=['POST'])
@limiter.limit("20 per minute, 200 per day")
def upload_image():
    try:
        file = request.files['file']
        username = request.form.get('username')

        if not file or not username:
            return jsonify({"error": "No file or username provided"}), 400

        if not file.content_type.startswith('image/'):
            return jsonify({"error": "Only image uploads are allowed"}), 400

        user_upload_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)
        if not os.path.exists(user_upload_dir):
            os.makedirs(user_upload_dir)

        filename = secure_filename(file.filename)
        file_path = os.path.join(user_upload_dir, filename)
        file.save(file_path)

        img = Image.open(file_path).resize((256, 256)).convert('RGB')
        img_array = np.array(img)
        img_array = img_array / 255.0
        img_array = img_array.reshape(1, 256, 256, 3)

        prediction = model.predict(img_array)
        prediction_proba = np.max(prediction)
        pred_class = np.argmax(prediction)

        uploads_collection = uploads_db[username]
        uploads_collection.insert_one({
            "file_path": file_path,
            "Pred_Class": int(pred_class),
            "Accuracy": float(prediction_proba),
            "upload_date": datetime.now()
        })

        return jsonify({"Pred_Class": int(pred_class), "Accuracy": float(prediction_proba), "file_path": file_path}), 201
    except Exception as e:
        logging.error(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

# Additional routes would follow the same pattern as in the original script

if __name__ == '__main__':
    app.run(debug=True)
