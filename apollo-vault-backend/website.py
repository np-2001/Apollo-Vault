from flask import Flask, request
from flask_cors import CORS
import json
import face_rec
from PIL import Image
import base64
import io
import os
import shutil
import time

app = Flask(name)
CORS(app)
@app.route('/', methods=['POST', 'GET'])
def home():
    data = request.get_json()
    resp = 'Unknown'
    directory = './new_user'
    if data:
        if os.path.exists(directory):
            shutil.rmtree(directory)

        if  not os.path.exists(directory):
            try:
                os.mkdir(directory)
                time.sleep(1)
                result = data['data']
                b = bytes(result, 'utf-8')
                image = b[b.find(b'/9'):]
                im = Image.open(io.BytesIO(base64.b64decode(image)))
                im.save(directory + '/new_user.jpeg')
                if face_rec.nitin.recognize_faces() == 'Nitin':
                    resp = 'Nitin'
                elif face_rec.prajeeth.recognize_faces() == 'Prajeeth':
                    resp = 'Prajeeth'
                elif face_rec.tim.recognize_faces() == 'Tim':
                    resp = 'Tim'
                elif face_rec.rahul.recognize_faces() == 'Rahul':
                    resp = 'Rahul'
                elif face_rec.neil.recognize_faces() == 'Neil':
                    resp = 'Neil'
                else:
                    resp = 'Unknown'

            except:
                pass

    return resp

if name == 'main':
    app.run(debug=True)