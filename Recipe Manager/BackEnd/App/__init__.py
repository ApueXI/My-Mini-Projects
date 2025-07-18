from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_cors import CORS
import logging

db = SQLAlchemy()
DB_NAME = "dataRecipe.db"

def run_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    app.config['SECRET_KEY'] = '48084b9b12ba702758cd10336ae388cf'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app)

    from .recipeManage import recipe_manage

    app.register_blueprint(recipe_manage, url_prefix="/api")

    db.init_app(app)

    create_database(app)

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        db.session.remove()
        
    return app


def create_database(app):
    if not path.exists("Backend/" + DB_NAME):
        with app.app_context():
            db.create_all()
            logging.info("Database Created")
