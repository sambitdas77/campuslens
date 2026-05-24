# backend/models.py
from pydantic import BaseModel
from typing import List, Optional

class UserProfile(BaseModel):
    name: str
    skills: List[str]
    interests: List[str]
    domain: str
    year: int
    top_n: Optional[int] = 10

class OpportunityResult(BaseModel):
    id: int
    title: str
    type: str
    description: str
    match_score: float
    matched_skills: List[str]
    explanation: str
    difficulty: str
    duration: str
    remote: Optional[bool]
    link: Optional[str]

class MatchResponse(BaseModel):
    user_name: str
    total: int
    matches: List[OpportunityResult]