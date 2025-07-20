from flask import Blueprint, request, jsonify
from App import db
from .model import Recipe
from App.model import Recipe
from PIL import Image
import logging, os, secrets

recipe_manage = Blueprint("recipe_manage", __name__)

PICTURE_PATH = "C:\\Users\\Cred\\Documents\\Coding\\Real Small Web Project\\Recipe Manager\\FrontEnd\\public"

@recipe_manage.route("/recipe", methods=["POST"])
def manage_recipe():

    title = request.form.get("title")
    ingredients = request.form.get("ingredients")
    instructions = request.form.get("instructions")
    image_file = request.files.get("image_file")

    picture_file = save_picture(image_file)

    if not title or not ingredients or not instructions or not picture_file:
        return jsonify({
            "ok": False, "From" : "Python", "status": "error", 
            "message": "Missing required fields (title, ingredients, instructions, image)."
        }), 400

    recipe = Recipe(title=title, ingredients=ingredients, 
                    instructions=instructions, image_file=picture_file)

    try:
        db.session.add(recipe)
        db.session.commit()
        logging.info("data was succesfully added to the database")

        return jsonify({"status": "success", "ok": True, "received": recipe.display_data(), "From": "Python"}), 200
    
    except Exception as e:
        db.session.rollback()
        logging.error("An Error has occured in receiving data")
        logging.error(f"Error: {e}")
        return jsonify({"status": "error", "message" : str(e), 
                        "ok": False, "From": "Python"}), 500
    
@recipe_manage.route("/recipe/data", methods=["GET"])
def sendRecipe():
    recipes = Recipe.query.order_by(Recipe.id).all()

    data = []

    for recipe in recipes:
        data.append({
            "id" : recipe.id,
            "title" : recipe.title,
            "ingredients" : recipe.ingredients,
            "instructions" : recipe.instructions,
            "image_file" : recipe.image_file,
        })

    return jsonify(data)

@recipe_manage.route("/recipe/delete/<int:id>", methods=["DELETE"])
def delete_recipe(id):

    recipe = Recipe.query.get_or_404(id)

    try:
        db.session.delete(recipe)
        db.session.commit()
        logging.info("Recipe has been deleted")
        return jsonify({ "status": "success", "ok": True,"ID": id, "from" : "Python" }), 200
    
    except Exception as e:
        db.session.rollback()
        logging.info(f"Error occured: {e}")
        return jsonify({ "status": "error", "ok": False,"message": str(e), "from" : "Python" }), 500
    
@recipe_manage.route("/recipe/update/<int:id>", methods=["PUT"])
def update_recipe(id):
    
    recipe = Recipe.query.get_or_404(id)

    try:
        pass
    
    except Exception as e:
        db.session.rollback()
        logging.info(f"Error occured: {e}")


def save_picture(form_picture):
    _, f_ext = os.path.splitext(form_picture.filename)
    f_ext = f_ext.lower()  

    file_extensions = [".jpg", ".png", ".jpeg"]

    if f_ext not in file_extensions:
        logging.error("Invalid image Format")
        return None

    random_hex = secrets.token_hex(8)
    picture_fn = random_hex + f_ext

    picture_path = os.path.join(PICTURE_PATH, picture_fn)

    try:
        output_size = (700, 700)
        i = Image.open(form_picture)
        i.thumbnail(output_size)
        i.save(picture_path)
    except Exception as e:
        logging.ERROR(f"Error saving image file {e}")
        return None

    return picture_fn