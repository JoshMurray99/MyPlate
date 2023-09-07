from application import create_app, db
from application.models import User, Token

app = create_app("TEST")

def delete_database():
    with app.app_context():
        db.drop_all()

def create_database():
    with app.app_context():
        db.create_all()

def add_entries():

    user1 = User(first_name="Mahir", last_name="Jalil", email="mj@travelmate.com", username="mahir", password="$2b$10$0UsBpSb6f1SGBZL1vl2xQepH.Kzc/s.6DRvWyd8GNEH07XQTtNIG2")
    user2 = User(first_name="Joe", last_name="Fountain", email="jf@travelmate.com", username="joe", password="$2b$10$M4U.i5AoIKkQEkg19uiqle0RYOUsJHoUQIRXbimvt.VkBdlizGcHG")
    user3 = User(first_name="Sabrina", last_name="Wright", email="sw@travelmate.com", username="sabrina", password="$2b$10$B7ApN9WVoln93GEYfQetGuC/Gj5NyhFxkRN3GJykd2yreelNuNd1K")
    user4 = User(first_name="Josh", last_name="Murray", email="jm@travelmate.com", username="josh", password="$2b$10$Qq67VLNhhfDIZ/yCLs0zv.QOXZOA5rhQ6MOPCEoQ5ceWSHdd9qwSi")
    user5 = User(first_name="Marcell", last_name="Batta", email="mb@travelmate.com", username="marcell", password="$2b$10$hkCuPS6ceTvZl.9jDGZhiOcnBGkKw5XCSmfEezBqTR6yXZkpZh0li")

    with app.app_context():
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)
        db.session.add(user4)
        db.session.add(user5)

        db.session.commit()
        db.session.close()

if __name__ == '__main__':
    delete_database()
    create_database()
    add_entries()