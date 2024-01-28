import face_recognition
import numpy as np
from PIL import Image, ImageDraw
import os
import io
import base64

class FaceRec:

    def init(self, known_person, unkown_images, known_name=None):
        self.known_person = known_person
        self.unkown_images = unkown_images
        self.known_name = known_name

    def converted_known_image(self):
        return face_recognition.load_image_file(self.known_person)

    def recognize_faces(self):
        for file in os.listdir(self.unkown_images):
            if file[0] != '.':
                known_image = self.converted_known_image()
                known_image_encoding = face_recognition.face_encodings(known_image)[0]
                known_face_encodings = [known_image_encoding]
                known_face_names = [self.known_name]

                unknown_image = face_recognition.load_image_file(self.unkown_images + '/' + file)

                face_locations = face_recognition.face_locations(unknown_image)
                face_encodings = face_recognition.face_encodings(unknown_image, face_locations)

                for(top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
                    matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                    name = "No one"

                    face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                    best_match_index = np.argmin(face_distances)

                    if matches[best_match_index]:
                        name = known_face_names[best_match_index]
                        return name
        return name
    
#adding images to dataset
#default users
prajeeth = FaceRec('./known-people/prajeeth.jpeg','./new_user', 'Prajeeth')
audrey = FaceRec('./known-people/audrey.jpeg','./new_user', 'Audrey')
praneeth = FaceRec('./known-people/praneeth.jpeg', './new_user', 'Praneeth')
nitin = FaceRec('./known-people/nitin.jpeg', './new_user', 'Nitin')
tim = FaceRec('./known-people/tim.jpeg', './new_user', 'Tim')
rahul = FaceRec('./known-people/rahul.jpeg', './new_user', 'Rahul')
neil = FaceRec('./known-people/neil.jpeg', './new_user', 'Neil')    