from App import db

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    ingredients = db.Column(db.String(300), nullable=False)
    instructions = db.Column(db.String(300), nullable=False)