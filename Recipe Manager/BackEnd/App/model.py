from App import db

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    image_file = db.Column(db.String(200), nullable=False, default='default.jpg')

    def display_data(self):
        return{
            "id" : self.id,
            "title" : self.title,
            "ingredients" : self.ingredients,
            "instructions" : self.instructions,
            "image_file" : self.image_file
        }