from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class BotUser(Base):
    __tablename__ = "bot_users"
    
    id = Column(Integer, primary_key=True, index=True)
    telegram_user_id = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, index=True)
    full_name = Column(String)
    language = Column(String, default="en")
    plan = Column(String, default="free")
    subscription_status = Column(String, default="inactive")
    status = Column(String, default="active")
    joined_at = Column(DateTime, server_default=func.now())
    last_active_at = Column(DateTime, server_default=func.now())
    analysis_count = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())
