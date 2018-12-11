import os
import traceback
from flask import Flask, make_response, request, render_template, redirect, flash, jsonify
from API import classify as classify_image

app = Flask(__name__)
app.secret_key = 'development key'

@app.route("/classify", methods= ['GET', 'POST'])
def classify():
    payload = classify_image(request.data)
    response = make_response(jsonify(payload))
    response.headers['Content-type'] = 'application/json'
    return response
    
if __name__ == '__main__':
    app.run(port=8081)
