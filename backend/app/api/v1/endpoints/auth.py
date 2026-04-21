from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from pydantic import BaseModel, EmailStr

router = APIRouter()

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    # Demo login - accept any credentials for now
    if request.email and request.password:
        return TokenResponse(access_token="demo-token-12345")
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/me")
async def get_current_user():
    return {
        "id": 1,
        "email": "admin@tradingbot.com",
        "full_name": "Super Admin",
        "role": "super_admin",
        "is_active": True,
        "is_superuser": True
    }

@router.post("/setup")
async def setup_first_admin():
    return {"message": "Admin setup complete", "email": "admin@tradingbot.com", "password": "Admin123!"}
