from flask_cors import CORS
import face_recognition
import numpy as np
from flask import Flask,request,redirect,url_for,flash,jsonify
import os
import cv2
from werkzeug.utils import secure_filename
import json
app=Flask(__name__)

CORS(app)


UPLOAD_FOLDER = 'images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg',}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def face_match(folder,unknown):

    images = []
    name =[]
    for filename in os.listdir(folder):
        img = cv2.imread(os.path.join(folder,filename))
        if img is not None:
            e=face_recognition.load_image_file("images/"+filename)
            images.append(face_recognition.face_encodings(e)[0])
            name.append(filename)
    try:
        unknown_face_encoding = face_recognition.face_encodings(unknown)[0]
        result = face_recognition.compare_faces(images,unknown_face_encoding)
        face_distances = face_recognition.face_distance(images, unknown_face_encoding)
        best_match_index = np.argmin(face_distances)
        response = []
        j = 0
        for i in result:
            response.append({"name":name[j].rsplit('.',1)[0],"result":bool(i)})
            j=j+1
        return response
    except IndexError:
        return "I wasn't able to locate any faces in at least one of the images. Check the image files. Aborting..."
        quit()

    

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/create',methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected   file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

@app.route('/find',methods=['GET', 'POST'])
def find():
    if request.method == 'POST':
        file = request.files['file']
        unknown_image = face_recognition.load_image_file(file)
        result = face_match("images",unknown_image)
        print(result)
        return jsonify(result)

    return '''
        <!doctype html>
        <title>Upload new File</title>
        <h1>Upload new File</h1>
        <form method=post enctype=multipart/form-data>
        <input type=file name=file>
        <input type=submit value=Upload>
        </form>
        '''

if __name__=="__main__":
    app.run(debug=True)