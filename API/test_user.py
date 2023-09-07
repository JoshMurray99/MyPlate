from application import db
# from unittest import mock
# from flask import g
from application.models import User

def test_register(client):

    user_data = {
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'johndoe@example.com',
        'username': 'johndoe',
        'password': 'password'
    }

    response = client.post('/user/register', json=user_data)
    assert response.status_code == 201

    registered_user = User.query.filter_by(username=user_data['username']).first()
    assert registered_user is not None

    assert registered_user.first_name == user_data['first_name']
    assert registered_user.last_name == user_data['last_name']
    assert registered_user.email == user_data['email']
    assert registered_user.username == user_data['username']


def test_get_user_by_id(client):
 response = client.get('/user/2')
 assert response.status_code == 200






