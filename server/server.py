

# # Load the jpg files into numpy arrays
# biden_image = face_recognition.load_image_file("biden.jpg")
# obama_image = face_recognition.load_image_file("obama.jpg")
# unknown_image = face_recognition.load_image_file("obama2.jpg")

# # Get the face encodings for each face in each image file
# # Since there could be more than one face in each image, it returns a list of encodings.
# # But since I know each image only has one face, I only care about the first encoding in each image, so I grab index 0.
# try:
#     biden_face_encoding = face_recognition.face_encodings(biden_image)[0]
#     obama_face_encoding = face_recognition.face_encodings(obama_image)[0]
#     unknown_face_encoding = face_recognition.face_encodings(unknown_image)[0]
# except IndexError:
#     print("I wasn't able to locate any faces in at least one of the images. Check the image files. Aborting...")
#     quit()

# known_faces = [
#     biden_face_encoding,
#     obama_face_encoding
# ]

# # results is an array of True/False telling if the unknown face matched anyone in the known_faces array
# results = face_recognition.compare_faces(known_faces, unknown_face_encoding)

# print("Is the unknown face a picture of Biden? {}".format(results[0]))
# print("Is the unknown face a picture of Obama? {}".format(results[1]))
# print("Is the unknown face a new person that we've never seen before? {}".format(not True in results))


import face_recognition
from flask import Flask,request,redirect,url_for,flash,jsonify
import os
import cv2
from werkzeug.utils import secure_filename
import json
app=Flask(__name__)



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