import pandas as pd
import numpy as np
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS  # Enable CORS for React
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
import cv2
from werkzeug.utils import secure_filename
import os
import time

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Read CSV file directly
file_path = "./Nifty 50 Data.csv"  # Update the correct path
df = pd.read_csv(file_path)

# Ensure Ticker column exists
if "Ticker" not in df.columns:
    raise ValueError("Ticker column not found in CSV.")

# Selecting features and target variable
features = ["Open (INR)", "High (INR)", "Low (INR)", "Prev Close (INR)", "Volume (Shares)"]
target = "Last Traded Price (INR)"

X = df[features]
y = df[target]

# Splitting data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Gradient Boosting model
model = GradientBoostingRegressor(n_estimators=200, learning_rate=0.05, random_state=42)
model.fit(X_train, y_train)

# Save the trained model
model_path = "stock_price_model.pkl"
joblib.dump(model, model_path)

# Load the model
model = joblib.load(model_path)

# Function to predict future price and profit
def predict_stock_future(stock_name):
    stock_row = df[df["Ticker"] == stock_name]

    if stock_row.empty:
        return {"error": f"Stock {stock_name} not found."}

    stock_data = stock_row.iloc[0]
    
    input_data = np.array([[stock_data["Open (INR)"], stock_data["High (INR)"], stock_data["Low (INR)"], stock_data["Prev Close (INR)"], stock_data["Volume (Shares)"]]])
    
    predicted_price = model.predict(input_data)[0]
    
    # Ensure "52W High (INR)" exists in the dataset before using it
    if "52W High (INR)" in df.columns:
        potential_sell_price = max(stock_data["52W High (INR)"], predicted_price * 1.05)
    else:
        potential_sell_price = predicted_price * 1.05  # Default to 5% increase

    profit = potential_sell_price - predicted_price
    
    return {
        "Stock": stock_name,
        "Predicted Price": predicted_price,
        "Recommended Sell Price": potential_sell_price,
        "Estimated Profit": profit
    }

# API endpoint to predict stock price
@app.route("/predict", methods=["GET"])
def predict():
    stock_name = request.args.get("stock_name")

    if not stock_name:
        return jsonify({"error": "Please provide a stock name."}), 400

    result = predict_stock_future(stock_name)
    return jsonify(result)

# Load pre-trained face detection model
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
UPLOAD_FOLDER = "./uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Function to detect faces
def detect_face(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    return len(faces) > 0

# API endpoint for face detection
@app.route('/verify-face', methods=['POST'])
def verify_face():
    if 'file' not in request.files:
        return jsonify({'verified': False, 'error': 'No file uploaded'})

    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # TODO: Add your face verification logic here
    # Simulating success response
    return jsonify({'verified': True})

@app.route('/submit-docs', methods=['POST'])
def submit_docs():
    user_id = request.form.get('userId')
    document_type = request.form.get('documentType')
    document = request.files.get('documentFront')

    if document:
        doc_filename = secure_filename(document.filename)
        document.save(os.path.join(app.config['UPLOAD_FOLDER'], doc_filename))

    return jsonify({'success': True, 'message': 'Documents submitted successfully'})
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)