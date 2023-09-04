from application import create_app, db
from application.models import User, Token

app = create_app()

def delete_database():
    with app.app_context():
        db.drop_all()

def create_database():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    delete_database()
    create_database()