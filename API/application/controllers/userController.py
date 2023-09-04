from application import db, bcrypt
from flask import request, jsonify
from uuid import uuid4


def register():
    from application.models import User

    data = request.json
    password = data.get('password').encode('utf-8')
    salt = bcrypt.gensalt(rounds=10)
    hashed_password = bcrypt.hashpw(password, salt).decode('utf-8')
    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        username=data['username'],
        password= hashed_password
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message':'User registered successfully!'}), 201

def get_user_by_id(user_id):
    from application.models import User
    user = User.query.get(user_id)

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    user_data = {
        'user_id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'username': user.username
    }

    return jsonify(user_data), 200

def login():
    from application.models import User
    data = request.json

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    check_password =bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8'))
    print(check_password)

    if not user or not check_password:
        return jsonify({'message': 'Invalid username or password'}), 401 
    new_token = create_token(user.user_id)
    
    return jsonify({'message': 'Login successful', 'token': new_token.token, 'user_id': user.user_id, 'username': user.username, 'first_name': user.first_name, 'last_name': user.last_name}), 200

def create_token(id):
    from application.models import Token
    token = uuid4()
    if not id or not token:
        return jsonify({'message': 'Missing parameters'})
    newToken = Token(user_id=id, token=token)
    db.session.add(newToken)
    db.session.commit()
    return newToken


def logout():
    from application.models import Token
    data = request.json
    token_value = data.get('token')

    token = Token.query.filter_by(token=token_value).first()

    if token:
        db.session.delete(token)
        db.session.commit()

        token_data = token.__dict__.copy()
        token_data.pop('_sa_instance_state', None)

        return jsonify(token_data), 200
    else:
        return jsonify({'message': 'Token not found'}), 404