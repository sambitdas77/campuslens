import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset once when the module loads
# Not inside a function — you don't want to reload 
# the file on every single request
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE_DIR, 'data.json'), 'r') as f:
    opportunities = json.load(f)

def opportunity_to_text(opp):
    """
    Convert one opportunity dict into a single text string.
    
    Why? TF-IDF works on text documents.
    We join all meaningful fields into one string.
    The more times a word appears across important fields,
    the higher its TF-IDF weight.
    """
    parts = [
        opp['title'],
        opp['description'],
        ' '.join(opp['skills']),    # ["python", "ml"] → "python ml"
        ' '.join(opp['domain']),    # ["ai", "web"] → "ai web"
        opp['type'],
        opp['difficulty']
    ]
    return ' '.join(parts).lower()  # lowercase everything for consistency

# Build the corpus — one text string per opportunity
corpus = [opportunity_to_text(opp) for opp in opportunities]

# Fit the vectoriser on the entire corpus
# This learns vocabulary and IDF weights from your data
# stop_words='english' removes "the", "and", "is" etc
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(corpus)

# tfidf_matrix is now a matrix of shape:
# (number of opportunities) x (number of unique words)
# Each row is one opportunity represented as a vector
print(f"Dataset: {len(opportunities)} opportunities")
print(f"Vocabulary size: {len(vectorizer.vocabulary_)} unique words")
print(f"Matrix shape: {tfidf_matrix.shape}")    

def match_opportunities(user_skills, user_interests, user_domain, user_year=3, top_n=10):
    """
    Core matching function.
    
    Parameters:
        user_skills: list of strings  e.g. ["python", "react", "machine learning"]
        user_interests: list of strings  e.g. ["ai", "web development"]
        user_domain: string  e.g. "ml"
        user_year: int  1-4
        top_n: how many results to return
    
    Returns:
        list of dicts, sorted by match_score descending
    """
    
    # Step 1: Convert user profile to text (same format as opportunities)
    user_text = ' '.join(user_skills + user_interests + [user_domain]).lower()
    
    # Step 2: Transform using the SAME vectoriser
    # Critical — must use transform(), not fit_transform()
    # fit_transform() would re-learn the vocabulary
    # transform() uses the vocabulary already learned from opportunities
    user_vector = vectorizer.transform([user_text])
    
    # Step 3: Compute cosine similarity
    # Result shape: (1, number_of_opportunities)
    # Each value is between 0 (no match) and 1 (perfect match)
    scores = cosine_similarity(user_vector, tfidf_matrix).flatten()
    
    # Step 4: Get top N indices, sorted by score descending
    top_indices = scores.argsort()[::-1][:top_n]
    
    # Step 5: Build results with explanations
    results = []
    for idx in top_indices:
        score = float(scores[idx])
        
        if score < 0.05:   # skip near-zero matches
            continue
        
        opp = opportunities[idx]
        
        # Generate explanation — find which skills actually matched
        user_skill_set = set(s.lower() for s in user_skills + user_interests)
        opp_skill_set = set(s.lower() for s in opp['skills'] + opp['domain'])
        matched = user_skill_set.intersection(opp_skill_set)
        
        if matched:
            explanation = f"Matched because you know: {', '.join(sorted(matched))}"
        else:
            explanation = "Matched based on your overall profile and interests"
        
        results.append({
            "id": opp['id'],
            "title": opp['title'],
            "type": opp['type'],
            "description": opp['description'],
            "match_score": round(score * 100, 1),
            "matched_skills": list(matched),
            "explanation": explanation,
            "difficulty": opp.get('difficulty', 'intermediate'),
            "duration": opp.get('duration', 'varies'),
            "remote": opp.get('remote', None),
            "link": opp.get('link', '')
        })
    
    return results

if __name__ == "__main__":
    # Test with a sample profile
    results = match_opportunities(
        user_skills=["python", "machine learning", "react", "javascript"],
        user_interests=["ai", "web development"],
        user_domain="ml",
        user_year=3,
        top_n=5
    )
    
    print(f"\nTop {len(results)} matches:\n")
    for r in results:
        print(f"  {r['match_score']}%  [{r['type'].upper()}]  {r['title']}")
        print(f"         {r['explanation']}\n")