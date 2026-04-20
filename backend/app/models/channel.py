from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Channel(Base):
    __tablename__ = "channels"
    
    id = Column(Integer, primary_key=True, index=True)
    channel_id = Column(String, unique=True, index=True, nullable=False)
    channel_name = Column(String, nullable=False)
    channel_type = Column(String, default="broadcast")
    is_active = Column(Boolean, default=True)
    daily_signal_count = Column(Integer, default=0)
    total_signal_count = Column(Integer, default=0)
    last_sent_at = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())
