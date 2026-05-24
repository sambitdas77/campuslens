# backend/main.py
import sys
import os


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import UserProfile, MatchResponse
from matcher import match_opportunities

app = FastAPI(
    title="CampusLens API",
    description="AI-powered student opportunity matcher",
    version="1.0.0"
)

# CORS — allows Rohan's React app to call this API
# Without this, the browser blocks all requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "CampusLens backend running"}

@app.get("/skills")
def get_skills():
    skills = [
        "Python", "JavaScript", "React", "Node.js",
        "Machine Learning", "Deep Learning", "Data Science",
        "scikit-learn", "Pandas", "NumPy", "SQL", "MongoDB",
        "FastAPI", "Django", "Flask", "AWS", "Docker", "Git",
        "Java", "C++", "NLP", "Computer Vision", "Data Analysis",
        "React Native", "Flutter", "Firebase", "PostgreSQL"
    ]
    domains = [
        "ML/AI", "Web Development", "Mobile",
        "Data Science", "DevOps", "Full Stack",
        "Cybersecurity", "Cloud"
    ]
    return {"skills": skills, "domains": domains}

@app.post("/match")
def get_matches(profile: UserProfile):
    try:
        results = match_opportunities(
            user_skills=[s.lower() for s in profile.skills],
            user_interests=[i.lower() for i in profile.interests],
            user_domain=profile.domain.lower(),
            user_year=profile.year,
            top_n=profile.top_n
        )
        return {
            "user_name": profile.name,
            "total": len(results),
            "matches": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))