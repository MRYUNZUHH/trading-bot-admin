from fastapi import APIRouter, Depends, Query
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from typing import List

router = APIRouter()

class UserResponse(BaseModel):
    id: int
    telegram_user_id: str
    username: Optional[str]
    full_name: Optional[str]
    plan: str
    status: str
    joined_at: str
    analysis_count: int

class UserListResponse(BaseModel):
    users: List[UserResponse]
    total: int
    page: int
    page_size: int

@router.get("/", response_model=UserListResponse)
async def get_users(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    plan: Optional[str] = None,
    status: Optional[str] = None
):
    demo_users = [
        {
            "id": 1,
            "telegram_user_id": "123456789",
            "username": "trader_john",
            "full_name": "John Trader",
            "plan": "premium",
            "status": "active",
            "joined_at": datetime.now().isoformat(),
            "analysis_count": 45
        }
    ]
    return {"users": demo_users, "total": 1, "page": page, "page_size": page_size}

@router.get("/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id, "telegram_user_id": "123456789", "username": "trader_john"}

@router.post("/{user_id}/suspend")
async def suspend_user(user_id: int):
    return {"status": "success", "message": f"User {user_id} suspended"}
