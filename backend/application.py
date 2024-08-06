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
from mongopass import mongopass
import logging
from datetime import datetime

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
client = MongoClient(mongopass)
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

@app.route("/uploads/<username>/<filename>", methods=['GET'])
@limiter.limit("75 per minute, 750 per day")
def uploaded_file(username, filename):
    try:
        return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'], username), filename)
    except Exception as e:
        logging.error(f"Error sending file: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/delete_account", methods=['DELETE'])
@limiter.limit("100 per minute, 1000 per day")
def delete_account():
    data = request.get_json()
    username = data.get('username')

    if not username:
        return jsonify({"error": "Username is required"}), 400

    try:
        result = myCollection.delete_one({"_id": username})
        uploads_db.drop_collection(username)

        user_upload_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)
        if os.path.exists(user_upload_dir):
            for file in os.listdir(user_upload_dir):
                os.remove(os.path.join(user_upload_dir, file))
            os.rmdir(user_upload_dir)

        if result.deleted_count == 0:
            return jsonify({"error": "Account not found"}), 404

        return jsonify({"message": "Account deleted successfully"}), 200
    except Exception as e:
        logging.error(f"Error deleting account: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/delete_image", methods=['DELETE'])
@limiter.limit("100 per minute, 1000 per day")
def delete_image():
    data = request.get_json()
    username = data.get('username')
    file_path = data.get('file_path')

    if not all([username, file_path]):
        return jsonify({"error": "Username and file path are required"}), 400

    try:
        uploads_collection = uploads_db[username]
        result = uploads_collection.delete_one({"file_path": file_path})

        if result.deleted_count == 0:
            return jsonify({"error": "File not found"}), 404

        if os.path.exists(file_path):
            os.remove(file_path)

        return jsonify({"message": "File deleted successfully"}), 200
    except Exception as e:
        logging.error(f"Error deleting file: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/get_user_uploads", methods=['GET'])
@limiter.limit("75 per minute, 750 per day")
def get_user_uploads():
    username = request.args.get('username')

    if not username:
        return jsonify({"error": "Username is required"}), 400

    try:
        uploads_collection = uploads_db[username]
        uploads = list(uploads_collection.find({}, {'_id': 0}))

        return jsonify({"uploads": uploads}), 200
    except Exception as e:
        logging.error(f"Error fetching uploads: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/check_username", methods=['GET'])
@limiter.limit("75 per minute, 750 per day")
def check_username():
    username = request.args.get('username')

    if not username:
        return jsonify({"error": "Username is required"}), 400

    try:
        user_exists = myCollection.find_one({"_id": username})
        return jsonify({"exists": bool(user_exists)}), 200
    except Exception as e:
        logging.error(f"Error checking username: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/check_login", methods=['POST'])
@limiter.limit("100 per minute, 1000 per day")
def check_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not all([username, password]):
        return jsonify({"error": "Username and password are required"}), 400

    try:
        user = myCollection.find_one({"_id": username})
        if user and user.get("password") == password:
            return jsonify({"valid": True}), 200
        else:
            return jsonify({"valid": False}), 200
    except Exception as e:
        logging.error(f"Error checking login: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
