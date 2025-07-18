from flask import Blueprint, request, jsonify
from App import db
from App.model import Recipe
import logging

recipe_manage = Blueprint("recipe_manage", __name__)

@recipe_manage.route("/recipe", methods=["POST"])
def manage_recipe():

    title = request.form.get("title")
    ingredients = request.form.get("ingredients")
    instructions = request.form.get("instructions")

    if not title or not ingredients or not instructions:
        return jsonify({
            "ok": False, "From" : "Python", "status": "error", 
            "message": "Missing required fields (title, ingredients, instructions)."
        }), 400

    recipe = Recipe(title=title, ingredients=ingredients, 
                    instructions=instructions)

    try:
        db.session.add(recipe)
        db.session.commit()
        logging.info("data was succesfully added to the database")
        return jsonify({"status": "success", "ok": True, "From": "Python"}), 200
    
    except Exception as e:
        db.session.rollback()
        logging.error("An Error has occured in receiving data")
        logging.error(f"Error: {e}")
        return jsonify({"status": "error", "message" : str(e), 
                        "ok": False, "From": "Python"}), 500