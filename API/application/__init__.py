from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import bcrypt

load_dotenv()

db = SQLAlchemy()

def create_app(env=None):

    app = Flask(__name__)

    if env == 'TEST':
        app.config['TESTING'] = True
        app.config['DEBUG'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('TEST_DB_URL')
    
    else:
        app.config["TESTING"] = False
        app.config["DEBUG"] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URL')
        
    db.init_app(app)

    CORS(app)

    from application.routes import user_routes

    app.register_blueprint(user_routes, url_prefix="/user")

    return app