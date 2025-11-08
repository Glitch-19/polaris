from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from datetime import datetime

from backend.database import get_db
from backend.models.models import UserMemory

router = APIRouter()

class MemoryResponse(BaseModel):
    id: int
    memory_key: str
    memory_value: str
    confidence: float
    last_accessed: datetime
    created_at: datetime
    
    class Config:
        from_attributes = True


@router.get("/{profile_id}/{user_id}", response_model=List[MemoryResponse])
async def get_memories(profile_id: int, user_id: str, db: Session = Depends(get_db)):
    """Get all memories the AI has about this user"""
    memories = db.query(UserMemory).filter(
        UserMemory.profile_id == profile_id,
        UserMemory.user_id == user_id
    ).order_by(UserMemory.last_accessed.desc()).all()
    return memories


@router.delete("/{memory_id}")
async def delete_memory(memory_id: int, db: Session = Depends(get_db)):
    """Delete a specific memory"""
    memory = db.query(UserMemory).filter(UserMemory.id == memory_id).first()
    if not memory:
        raise HTTPException(status_code=404, detail="Memory not found")
    
    db.delete(memory)
    db.commit()
    return {"message": "Memory deleted"}


@router.delete("/{profile_id}/{user_id}/all")
async def clear_all_memories(profile_id: int, user_id: str, db: Session = Depends(get_db)):
    """Clear all memories for a user with a specific AI profile"""
    db.query(UserMemory).filter(
        UserMemory.profile_id == profile_id,
        UserMemory.user_id == user_id
    ).delete()
    db.commit()
    return {"message": "All memories cleared"}
