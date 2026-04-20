from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class BotConfig(Base):
    __tablename__ = "bot_config"
    
    id = Column(Integer, primary_key=True, index=True)
    brand_name = Column(String, default="Trading Bot")
    bot_username = Column(String)
    default_language = Column(String, default="en")
    maintenance_mode = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
