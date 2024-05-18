from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'a_very_secret_key'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    trips = db.relationship('Trip', backref='owner', lazy=True)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    mode = db.Column(db.String(20), nullable=False)
    distance = db.Column(db.Float, nullable=False)
    duration = db.Column(db.Float, nullable=False)
    carbon_footprint = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/trips', methods=['GET'])
def get_trips():
    trips = Trip.query.all()
    trips_data = [{
        'id': trip.id,
        'date': trip.date.strftime('%Y-%m-%d %H:%M:%S'),
        'mode': trip.mode,
        'distance': trip.distance,
        'duration': trip.duration,
        'carbon_footprint': trip.carbon_footprint
    } for trip in trips]
    return jsonify(trips_data), 200

@app.route('/log_trip', methods=['POST'])
def log_trip():
    data = request.get_json()
    user_id = data.get('user_id')
    mode = data.get('mode')
    distance = data.get('distance')
    duration = data.get('duration')

    if not user_id:
        return jsonify({'message': 'user_id is required'}), 400

    user = db.session.get(User, user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    if mode and distance and duration:
        try:
            distance = float(distance)
            duration = float(duration)
            carbon_footprint = calculate_carbon_footprint(mode, distance)
        except ValueError:
            return jsonify({'message': 'Invalid data format'}), 400

        trip = Trip(
            mode=mode,
            distance=distance,
            duration=duration,
            carbon_footprint=carbon_footprint,
            user_id=user.id
        )
        db.session.add(trip)
        db.session.commit()
        return jsonify({'message': 'Trip logged successfully'}), 201
    else:
        return jsonify({'message': 'Missing required data for logging trip'}), 400

@app.route('/delete_trip/<int:trip_id>', methods=['DELETE'])
def delete_trip(trip_id):
    trip = Trip.query.get(trip_id)
    if trip:
        db.session.delete(trip)
        db.session.commit()
        return jsonify({'message': 'Trip deleted successfully'}), 200
    return jsonify({'message': 'Trip not found'}), 404

def calculate_carbon_footprint(mode, distance):
    carbon_emission_factors = {
        'walking': 0,
        'cycling': 0,
        'public_transport': 0.05,  # example values in kg CO2e per km
        'car': 0.24,
        'train': 0.37,
    }
    return carbon_emission_factors.get(mode, 0) * distance

if __name__ == '__main__':
    app.run(debug=True)
