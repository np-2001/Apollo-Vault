from flask import Flask, request 
from flask_cors import CORS
from pymongo import MongoClient 

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return "Hey there!"

@app.route('/recognize', methods=["GET", "POST"])
def faceReconition():
    print("Hello")
    return {"success": 1, "test": "Test"}




# client = MongoClient('mongodb+srv://apollo-vault.rvnh3jl.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority')
# db = client['demo'] 
# collection = db['data'] 
# @app.route('/add_data', methods=['POST']) 
# def add_data(): 
#     # Get data from request 
#     data = request.json 
  
#     # Insert data into MongoDB 
#     collection.insert_one(data) 
  
#     return 'Data added to MongoDB'


if __name__ == '__main__':
    
    app.run(debug=True)