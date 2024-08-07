from dotenv import load_dotenv
import os
import redis
from datetime import timedelta

load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=1)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URI"]
    SQLALCHEMY_TRACK_MODIFICATIONS = False