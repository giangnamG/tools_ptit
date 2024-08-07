from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin


db = SQLAlchemy()


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(10), nullable=False, default='user')
    current_token = db.Column(db.String(256), nullable=True)
    jti = db.Column(db.String(128), nullable=True)

class UserQlDt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Integer, unique=True, nullable=False)
    msv = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    token = db.Column(db.String(256), nullable=True)
    
class UserEd(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    token = db.Column(db.String(256), nullable=True)
    
class Major(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name_major = db.Column(db.String(100), nullable=False)
    type_major = db.Column(db.String(100), nullable=False)
        
class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    major_id = db.Column(db.Integer, nullable=True)
    name_subject = db.Column(db.String(100), nullable=False)
    code_subject = db.Column(db.String(10), nullable=False)
    stc = db.Column(db.Integer, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'major_id': self.major_id,
            'name_subject': self.name_subject,
            'code_subject': self.code_subject,
            'stc': self.stc,
        }

class RecordSubjectToRegistry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    code_subject = db.Column(db.String(10), nullable=False)
    name_subject = db.Column(db.String(255), nullable=False)
    group_name = db.Column(db.String(10), nullable=False)
    team_name = db.Column(db.String(10), nullable=True)
    stc = db.Column(db.Integer, nullable=True)


