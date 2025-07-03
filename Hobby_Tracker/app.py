from flask import Flask, render_template, url_for, redirect, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import path


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)

class Habbit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    sunday = db.Column(db.Boolean, default=False, nullable=False)
    monday = db.Column(db.Boolean, default=False, nullable=False)
    tuesday = db.Column(db.Boolean, default=False, nullable=False)
    wednesday = db.Column(db.Boolean, default=False, nullable=False)
    thursday = db.Column(db.Boolean, default=False, nullable=False)
    friday = db.Column(db.Boolean, default=False, nullable=False)
    saturday = db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return f"<Task: {self.id}>"

@app.route('/', methods=['POST', 'GET'])
def home():

    return render_template("HobbyTracker.html")

@app.route("/api/data")
def getData():
    habbitData = Habbit.query.order_by(Habbit.id).all()   
    
    data = []
    for habbit in habbitData:
        data.append({
            "id": habbit.id,
            "content": habbit.content,
            "sunday": habbit.sunday,
            "monday": habbit.monday,
            "tuesday": habbit.tuesday,
            "wednesday": habbit.wednesday,
            "thursday": habbit.thursday,
            "friday": habbit.friday,
            "saturday": habbit.saturday,
        })

    return jsonify(data)

@app.route("/api/receive", methods=['POST'])
def receiveData():
    data = request.get_json()

    content = data["content"]

    habbit = Habbit(content=content)
    
    try:
        db.session.add(habbit)
        db.session.commit()
        print("Habit successfully added")
        return jsonify({"status": 'success', "received" : data}), 200
    except Exception as e:
        print(f"Habit failed to be added\nError: {e}")
        return jsonify({"status": 'error', "received" : data}), 500


@app.route("/api/update/<int:id>", methods=["POST", "GET"])
def updateHabit(id):

    habit_to_update = Habbit.query.get_or_404(id)
    data = request.get_json()

    if request.method == "POST":
        habit_to_update.content = data["content"]

        try:
            db.session.commit()
            print("Habit successfully updated")
            return jsonify({"status" : "success", "received" : data, "ok" : True}), 200 
        except Exception as e:
            db.session.rollback()
            print(f"Habit failed to update \nError: {e}")
            return jsonify({"status" : "error", "received" : data, "ok" : False}), 500 
    

@app.route("/api/delete/<int:id>", methods=["DELETE"])
def deleteHabit(id):
    habit_to_delete = Habbit.query.get_or_404(id)

    try:
        db.session.delete(habit_to_delete)
        db.session.commit()
        print("Habit succesfully delete")
        return jsonify({"status": "success", "message" : "Habit Deleted"}), 200

    except Exception as e:
        db.session.rollback()
        print(f"Habit failed to delete \nError: {e}")
        return jsonify({"status" : "success", "nessage" : str(e)}), 500


def create_database(app):
    if not path.exists('Hobby_Tracker/database.db'):
        with app.app_context():
            db.create_all()
            print('Created Database!')

if __name__ == '__main__':

    create_database(app)

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        db.session.remove()
    
    app.run(debug=True)