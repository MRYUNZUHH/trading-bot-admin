from fastapi import APIRouter, HTTPException
from typing import Optional, Dict, Any
from pydantic import BaseModel
from app.services.bot_data_service import bot_data_service
import requests

router = APIRouter()

BOT_TOKEN = "8752170166:AAEggTWnmr6h4XWof5YFx-74cLQBt5bOPRM"

class SyncDataRequest(BaseModel):
    users: Dict[str, Any] = {}
    analysis_count: Dict[str, int] = {}
    subscriptions: Dict[str, Any] = {}
    trade_counters: Dict[str, int] = {}
    active_options_trades: Dict[str, Any] = {}

@router.get("/stats")
async def get_bot_stats():
    return bot_data_service.get_stats()

@router.get("/users")
async def get_bot_users(page: int = 1, page_size: int = 20, plan: Optional[str] = None):
    return bot_data_service.get_users(page, page_size, plan)

@router.get("/subscribers")
async def get_subscribers():
    return bot_data_service.get_subscribers()

@router.post("/sync")
async def sync_bot_data(data: SyncDataRequest):
    bot_data_service.update_from_bot(data.dict())
    return {"status": "success", "message": "Data synced"}

@router.post("/send-message")
async def send_telegram_message(user_id: str, message: str):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    response = requests.post(url, json={"chat_id": user_id, "text": message, "parse_mode": "Markdown"}, timeout=10)
    if response.status_code == 200:
        return {"status": "success"}
    raise HTTPException(status_code=400, detail="Failed to send")

@router.post("/broadcast")
async def broadcast_message(plan: Optional[str] = None, message: str = ""):
    result = bot_data_service.get_users(1, 10000, plan)
    users = result["users"]
    sent = 0
    for user in users:
        try:
            url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
            requests.post(url, json={"chat_id": user["telegram_user_id"], "text": message, "parse_mode": "Markdown"}, timeout=5)
            sent += 1
        except:
            pass
    return {"status": "success", "sent_count": sent, "total_users": len(users)}

@router.get("/health")
async def check_bot_health():
    try:
        response = requests.get(f"https://api.telegram.org/bot{BOT_TOKEN}/getMe", timeout=5)
        if response.status_code == 200:
            data = response.json()
            return {"status": "online", "bot_username": data.get("result", {}).get("username", "Unknown")}
    except:
        pass
    return {"status": "offline"}
