from flask import Blueprint, request, jsonify
from App import db
from .model import Recipe
from PIL import Image
import logging, secrets
from pathlib import Path

# Initilize the custom logger for this file 
logger = logging.getLogger(__name__)

handler = logging.FileHandler("API.log")
fomatter = logging.Formatter("%(name)s - %(asctime)s - %(funcName)s - %(lineno)d -  %(levelname)s - %(message)s ")
handler.setFormatter(fomatter)
logger.addHandler(handler)

# To make the scale better
# Kinda like a proxy to the initiilzaed flask in the dunder init file
recipe_manage = Blueprint("recipe_manage", __name__)

PICTURE_PATH = Path(__file__).resolve().parent.parent.parent / "FrontEnd" / "public"

# Adds a new Reicpe to the Datanase
# Returns a JSON to the frontend whenever i want or something, i dont know how to explain this
@recipe_manage.route("/recipe", methods=["POST"])
def manage_recipe():

    # The one toget the data to the FrontEnd
    data = request.form

    title = data.get("title")
    ingredients = data.get("ingredients")
    instructions = data.get("instructions")
    image_file = data.get("image_file")

    picture_file = save_picture(image_file)

    if not title or not ingredients or not instructions or not picture_file:
        return jsonify({
            "ok": False, "From" : "Python", "status": "error", 
            "message": "Missing required fields (title, ingredients, instructions, image)."
        }), 400

    # Inputs the data from the Form to a new row in the Database
    recipe = Recipe(title=title, ingredients=ingredients, 
                    instructions=instructions, image_file=picture_file)

    db.session.add(recipe)

    # Tis immediatelly executes cuz the function has a parenthesis
    success, error = commit_session()
    if not success:
        logger.exception(f"Error occurred: {error}")
        return jsonify({"status": "error", "message" : error, 
                        "ok": False, "from": "Python"}), 500
    
    logger.info("data was succesfully added to the database")

    return jsonify({" status": "success", "ok": True, "received": recipe.display_data(), "from": "Python"}), 201


# Sends the data in the Database so the FrontEnd can display it
@recipe_manage.route("/recipe/data", methods=["GET"])
def sendRecipe():

    # Gets data from the LINK or URL
    sort = request.args.get("sort", "asc")

    # Sets what the order of the data should be
    order = Recipe.id.asc() if sort == "asc" else Recipe.id.desc()

    recipes = Recipe.query.order_by(order).all()

    data = [recipe.display_data() for recipe in recipes]

    return jsonify(data)

# Receives data from the FrontEnd so it can be deleted
# The data is the id
@recipe_manage.route("/recipe/delete/<int:id>", methods=["DELETE"])
def delete_recipe(id):

    recipe = Recipe.query.get_or_404(id)

    db.session.delete(recipe)

    success, error = commit_session()
    if not success:
        logger.exception(f"Error occurred: {error}")
        return jsonify({ "status": "error", "ok": False,"message":error, "from" : "Python" }), 500
    
    logger.info("Recipe has been deleted")
    return jsonify({ "status": "success", "ok": True, "ID": id, "from" : "Python" }), 204

# Receives data to Update the data
@recipe_manage.route("/recipe/update/<int:id>", methods=["PATCH"])
def update_recipe(id):
    
    recipe = Recipe.query.get_or_404(id)

    # If the data is not a json it will fall back to the request.form
    # the silent=True allows it to do that
    data = request.get_json(silent=True) or request.form

    # Updates each data. if there is none it will fallback to the recipe.DATA
    recipe.title = data.get("title", recipe.title)
    recipe.ingredients = data.get("ingredients", recipe.ingredients)
    recipe.instructions = data.get("instructions", recipe.instructions)
    image_file = request.files.get("image_file")
    
    if image_file:
        if recipe.image_file:
            delete_picture(recipe.image_file)
        picture_file = save_picture(image_file)

        if not picture_file:
            return jsonify({"status": "error", "ok": False, "message": "Invalid image format"}),400

        recipe.image_file = picture_file
        logger.info("New image has been saved")

    success, error = commit_session()

    if not success:
        logger.exception(f"Error occured: {error}")
        return jsonify({"status": "error", "ok": False, "data": error, "from": "Python"}), 500

    logger.info("Data has been successfully updated")
    return jsonify({"status": "success", "ok": True, "data": "updated", "from": "Python"}), 200

    
# Receives data to allow the frontend to display certain data depending on the query
@recipe_manage.route("/recipe/search", methods=["GET"])
def search_recipe():

    query = request.args.get("query", "").strip()
    sort = request.args.get("sort", "asc")

    order = Recipe.id.asc() if sort == "asc" else Recipe.id.desc()

    if not query:
        logger.info("There is no query")
        return jsonify({"status" : "error", "ok" : False, "result" : [], "message" : "Querry not found" , "from" : "Python"}), 404

    searches = Recipe.query.filter(Recipe.title.ilike(f"%{query}%")
                                    ).order_by(order).limit(100).all()
    
    data = [search.display_data() for search in searches]

    if not data:
        logger.info("No search received")
        searches = Recipe.query.limit(100).all()

        return jsonify({"status" : "success", "ok" : True, "result" : [], "message" : "Query not found" , "from" : "Python"}), 200
    

    logger.info("search successful")
    return jsonify({"status" : "success", "ok" : True, "from" : "Python",
                    "result" : data}), 200


def save_picture(form_picture):
    img_extension = Path(form_picture.filename).suffix.lower()

    file_extensions = [".jpg", ".png", ".jpeg"]

    if img_extension not in file_extensions:
        logger.exception("Invalid image Format")
        return None

    random_hex = secrets.token_hex(8)
    picture_fn = random_hex + img_extension

    picture_path = PICTURE_PATH / picture_fn

    try:
        output_size = (700, 700)
        i = Image.open(form_picture)
        i.thumbnail(output_size)
        i.save(picture_path)
        logger.info("Image has been saved")
    except Exception as e:
        logger.exception(f"Error saving image file {e}")
        return None

    return picture_fn

def delete_picture(filename):
    if not filename:
        return  

    old_image_path = PICTURE_PATH / filename 

    try:
        if old_image_path.exists():  
            old_image_path.unlink()
            logger.info(f"Deleted old image: {filename}")
        else:
            logger.warning(f"Old imzage not found: {filename}")
    except Exception as e:
        logger.exception(f"Failed to delete old image {filename}: {e}")

# Without this i ned to write try except and session for every DB interaction
def commit_session():
    try:
        db.session.commit()
        return (True, None)
    except Exception as e:
        db.session.rollback()
        return (False, str(e))
