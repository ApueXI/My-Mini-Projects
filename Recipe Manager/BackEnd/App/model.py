from App import db
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    ingredients = db.Column(db.String(300), nullable=False)
    instructions = db.Column(db.String(300), nullable=False)
    image_file = db.Column(db.String(200), nullable=False, default='default.jpg')
