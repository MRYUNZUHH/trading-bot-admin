import json
import os
from typing import Dict, List, Any, Optional
from datetime import datetime

class BotDataService:
    def __init__(self):
        self.data_file = "bot_data.json"
        self.data = {
            "users": {},
            "analysis_count": {},
            "subscriptions": {},
            "trade_counters": {"gold": 0, "fx": 0, "options": 0},
            "active_options_trades": {}
        }
        self.load_data()
    
    def load_data(self):
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    self.data = json.load(f)
            except:
                self.save_data()
        else:
            self.save_data()
    
    def save_data(self):
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, indent=2, default=str)
    
    def update_from_bot(self, bot_data: Dict):
        self.data.update(bot_data)
        self.save_data()
        return {"status": "success"}
    
    def get_stats(self):
        users = self.data.get("users", {})
        subscriptions = self.data.get("subscriptions", {})
        
        total_users = len(users)
        premium_users = sum(1 for s in subscriptions.values() if s.get("plan") in ["premium", "pro"])
        
        return {
            "total_users": total_users,
            "premium_users": premium_users,
            "free_users": total_users - premium_users,
            "analysis_count": sum(self.data.get("analysis_count", {}).values()),
            "trade_counters": self.data.get("trade_counters", {}),
            "active_trades": len(self.data.get("active_options_trades", {}))
        }
    
    def get_users(self, page: int = 1, page_size: int = 20, plan: Optional[str] = None):
        users = self.data.get("users", {})
        subscriptions = self.data.get("subscriptions", {})
        analysis_count = self.data.get("analysis_count", {})
        
        user_list = []
        for user_id, user_data in users.items():
            subscription = subscriptions.get(user_id, {"plan": "free"})
            if plan and subscription.get("plan") != plan:
                continue
            
            user_list.append({
                "id": user_id,
                "telegram_user_id": user_id,
                "name": user_data.get("name", "Unknown"),
                "username": user_data.get("username", ""),
                "language": user_data.get("language", "ar"),
                "plan": subscription.get("plan", "free"),
                "analysis_count": analysis_count.get(user_id, 0),
                "joined_at": user_data.get("joined_at", datetime.now().isoformat())
            })
        
        total = len(user_list)
        start = (page - 1) * page_size
        end = start + page_size
        
        return {
            "users": user_list[start:end],
            "total": total,
            "page": page,
            "page_size": page_size,
            "total_pages": (total + page_size - 1) // page_size
        }
    
    def get_subscribers(self):
        subscriptions = self.data.get("subscriptions", {})
        users = self.data.get("users", {})
        
        subscribers = []
        for user_id, sub in subscriptions.items():
            if sub.get("plan") in ["premium", "pro"]:
                user = users.get(user_id, {})
                subscribers.append({
                    "user_id": user_id,
                    "name": user.get("name", "Unknown"),
                    "username": user.get("username", ""),
                    "plan": sub.get("plan", "premium"),
                    "expiry_date": sub.get("expiry_date"),
                    "auto_renew": sub.get("auto_renew", False)
                })
        
        return subscribers

bot_data_service = BotDataService()
