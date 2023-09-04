from flask import Blueprint
from application.controllers import *

user_routes = Blueprint("user_routes", __name__)

@user_routes.route('/register', methods=['POST'])
def create_user_route():
    print("Reached the registration route")
    return register()

@user_routes.route('/<int:user_id>', methods=['GET'])
def get_user_route(user_id):
     user = get_user_by_id(user_id)
     return user

@user_routes.route('/login', methods=['POST'])
def login_route():
    return login()


@user_routes.route('/logout', methods=['DELETE'])
def logout_route():
    return logout()