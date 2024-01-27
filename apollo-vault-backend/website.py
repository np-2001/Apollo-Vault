from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return "Hey there!"

@app.route('/recognize', methods=["GET", "POST"])
def faceReconition():
    print("Hello")
    return {"success": 1, "test": "Test"}


if __name__ == '__main__':
    app.run(debug=True)