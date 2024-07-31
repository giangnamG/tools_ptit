from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jti, get_jwt
from datetime import datetime, timezone
import base64, json
from crypto import cryptApp
from models import db, User

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Cấu hình bcrypt và JWT
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
jwt.expired_token_loader

# Cấu hình cơ sở dữ liệu từ file config
app.config.from_object(ApplicationConfig)
db.init_app(app)

@jwt.expired_token_loader
def expired_token_callback(expired_token, header):
    jti = header['jti']
    user = User.query.filter_by(current_token=jti).first()  
    if user is not None:
        user.current_token = None
        user.jti = None
        db.session.commit()
    return jsonify({
        'message': 'The token has expired',
        'error': 'token_expired'
    }), 401

@app.route('/api/v1/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(username=data['username'], email=data['email'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        if 'UNIQUE constraint failed' in str(e):
            return jsonify({'message': 'Username or email already exists'}), 200
        return jsonify({'message': 'Something went wrong'}), 200

@app.route('/api/v1/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user and bcrypt.check_password_hash(user.password, data['password']):
            FoundJWT, expired = False, False
            if user.current_token != None and len(user.current_token) > 1: 
                info = json.loads(base64.b64decode(user.current_token.split('.')[1]+'==').decode('utf-8'))
                now_utc = datetime.now(timezone.utc)
                exp_datetime = datetime.fromtimestamp(info['exp'], tz=timezone.utc)
                time_remaining = exp_datetime - now_utc
                if time_remaining.total_seconds()//60 <= 0:
                    expired = True
                FoundJWT = True
                
            if expired or not FoundJWT:
                user_info = {
                    'id': cryptApp.encrypt_id(user.id),
                    'username': user.username,
                    'email': user.email,
                    'role': user.role
                }
                access_token = create_access_token(identity=user_info)
                user.current_token = access_token
                user.jti = get_jti(access_token)
                db.session.commit()
            
                return jsonify({
                    'access_token': access_token,
                    'user_info': user_info
                    }), 200
            else: 
                return jsonify({'message': 'Logged in as '+user.username+', no hacking, thanks! :)'}), 200
                
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
    except Exception as e:
        print(e)
        return jsonify({'message': 'Some Things Went Wrong !!!'}), 401

@app.route('/api/v1/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/api/v1/logout', methods=['POST'])
@jwt_required()
def logout():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    
    if user:
        user.current_token = None 
        user.jti = None
        db.session.commit()
        return jsonify({"msg": "Logged out successfully"}), 200
    
    return jsonify({"msg": "Logout failed"}), 400

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)