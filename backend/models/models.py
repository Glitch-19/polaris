from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database import Base

class AIProfile(Base):
    __tablename__ = "ai_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)  # User-defined profile name
    creator_username = Column(String(100), nullable=False)  # e.g., @ed_hinata_001
    description = Column(Text)
    personality_prompt = Column(Text)  # Core personality instructions
    avatar_url = Column(String(500))
    voice_file_path = Column(String(500))  # Path to uploaded voice sample
    pratfall_probability = Column(Float, default=0.15)  # Chance to "forget"
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    messages = relationship("ChatMessage", back_populates="profile", cascade="all, delete-orphan")
    memories = relationship("UserMemory", back_populates="profile", cascade="all, delete-orphan")
    scenes = relationship("Scene", back_populates="profile", cascade="all, delete-orphan")


class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("ai_profiles.id"), nullable=False)
    user_id = Column(String(100), nullable=False)  # User identifier
    role = Column(String(20), nullable=False)  # "user" or "assistant"
    content = Column(Text, nullable=False)
    audio_url = Column(String(500))  # Voice response URL if generated
    timestamp = Column(DateTime, default=datetime.utcnow)
    is_pratfall = Column(Boolean, default=False)  # Was this a "forgot" moment?
    
    profile = relationship("AIProfile", back_populates="messages")


class UserMemory(Base):
    __tablename__ = "user_memories"
    
    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("ai_profiles.id"), nullable=False)
    user_id = Column(String(100), nullable=False)
    memory_key = Column(String(200), nullable=False)  # e.g., "pet_name", "favorite_movie"
    memory_value = Column(Text, nullable=False)
    confidence = Column(Float, default=1.0)  # Decays over time
    last_accessed = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    profile = relationship("AIProfile", back_populates="memories")


class Scene(Base):
    __tablename__ = "scenes"
    
    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("ai_profiles.id"), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    scenario_prompt = Column(Text)  # Context for roleplay
    thumbnail_url = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    profile = relationship("AIProfile", back_populates="scenes")
