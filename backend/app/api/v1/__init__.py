from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, dashboard, bot

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(bot.router, prefix="/bot", tags=["bot"])
