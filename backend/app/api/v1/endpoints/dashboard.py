from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime, timedelta

router = APIRouter()

class DashboardSummary(BaseModel):
    total_pnl: float
    win_rate: float
    open_trades: int
    total_trades: int
    active_users_today: int
    premium_users: int
    total_users: int
    active_accounts: int
    expiring_licenses: int
    equity_curve: List[Dict[str, Any]]
    active_trades: List[Dict[str, Any]]
    recent_trades: List[Dict[str, Any]]
    telegram_status: Dict[str, Any]
    license_alerts: List[Dict[str, Any]]

@router.get("/summary", response_model=DashboardSummary)
async def get_dashboard_summary():
    return {
        "total_pnl": 45231.89,
        "win_rate": 68.5,
        "open_trades": 12,
        "total_trades": 1234,
        "active_users_today": 342,
        "premium_users": 234,
        "total_users": 1234,
        "active_accounts": 156,
        "expiring_licenses": 23,
        "equity_curve": [{"date": (datetime.now() - timedelta(days=i)).isoformat(), "equity": 10000 + i * 100} for i in range(30)],
        "active_trades": [{"id": i, "symbol": "EUR/USD", "side": "BUY", "entry": 1.0950, "current": 1.0975, "pnl": 25.50} for i in range(5)],
        "recent_trades": [{"id": i, "symbol": "XAU/USD", "side": "BUY", "entry": 2015.50, "close": 2025.75, "pnl": 102.50} for i in range(5)],
        "telegram_status": {"connected": True, "active_channels": 3, "daily_signals": 24},
        "license_alerts": [{"account": "MT5-001234", "days_left": 3}]
    }
