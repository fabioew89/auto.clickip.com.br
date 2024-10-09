from flask import Flask, render_template
from app import app

@app.route('/')
@app.route('/index/')
def hello_world():
    return 'Hello World!'

@app.route('/template')
def template():
    return render_template('loginpage.html')
