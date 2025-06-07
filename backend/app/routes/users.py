from pydantic import BaseModel, EmailStr
from fastapi import APIRouter, HTTPException
from werkzeug.security import generate_password_hash, check_password_hash
from backend.app.models.models import *


class RegisterSchema(BaseModel):
    userName: str
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str



user = APIRouter()

@user.post("/register")
def register(user: RegisterSchema):
    data_status={"responseStatus":0,"result":""}
    try:
        user_queryset=Users.objects(email=user.email).first()
        if user_queryset:
            data_status["responseStatus"]=0
            data_status["result"]="Email already registered"
            return data_status
        hashed_password = generate_password_hash(user.password)
        new_user = Users(
            userName=user.userName,
            email=user.email,
            password=hashed_password
        )
        new_user.save()
        data_status["responseStatus"]=1
        data_status["result"]="User registered successfully"
        return data_status
    except Exception as e:
        print(f"An error occurred during register user{e}")
        data_status["responseStatus"]=0
        data_status["result"]="Unable to register user"
        return data_status


@user.post("/login")
def login(user_data: LoginSchema):
    data_status = {"responseStatus": 0, "result": ""}

    try:
        user_queryset = Users.objects(email=user_data.email).first()
        if not user_queryset:
            data_status["result"] = "Invalid email or password"
            return data_status

        if not check_password_hash(user_queryset.password, user_data.password):
            data_status["result"] = "Invalid email or password"
            return data_status

        data_status["responseStatus"] = 1
        data_status["result"] = "Login successful"
        return data_status

    except Exception as e:
        print(f"An error occurred during login: {e}")
        data_status["responseStatus"] = 0
        data_status["result"] = "Unable to login"
        return data_status