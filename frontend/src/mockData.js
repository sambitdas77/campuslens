// mockData.js
// ─────────────────────────────────────────────────────────────
// This file lets you build and test the entire frontend
// without needing Ritish's backend running at all.
//
// When Ritish's API is ready, you swap one line in api.js
// from returning this mock data to making a real axios call.
// Everything else stays exactly the same.
// ─────────────────────────────────────────────────────────────

export const MOCK_SKILLS = {
  skills: [
    "Python", "JavaScript", "React", "Node.js",
    "Machine Learning", "Deep Learning", "Data Science",
    "scikit-learn", "Pandas", "NumPy", "SQL", "MongoDB",
    "FastAPI", "Django", "Git", "AWS", "Docker",
    "Java", "C++", "NLP", "Data Analysis",
    "React Native", "Flutter", "Firebase", "PostgreSQL"
  ],
  domains: [
    "ML/AI", "Web Development", "Mobile",
    "Data Science", "DevOps", "Full Stack",
    "Cybersecurity", "Cloud"
  ]
};

export const MOCK_RESULTS = {
  user_name: "Sambit",
  total: 8,
  matches: [
    {
      id: 1,
      title: "Smart India Hackathon 2026",
      type: "hackathon",
      description: "National level hackathon solving real government and social problems using technology. One of the most prestigious student hackathons in India.",
      match_score: 91.4,
      matched_skills: ["python", "machine learning", "problem solving"],
      explanation: "Matched because you know: machine learning, python",
      difficulty: "intermediate",
      duration: "48 hours",
      remote: false,
      link: "https://www.sih.gov.in"
    },
    {
      id: 2,
      title: "ML Engineer Intern — Remote Startup",
      type: "internship",
      description: "Build and deploy machine learning models for a growing edtech startup. Work with real user data, design pipelines, and ship features.",
      match_score: 87.2,
      matched_skills: ["python", "machine learning", "scikit-learn", "pandas"],
      explanation: "Matched because you know: machine learning, pandas, python, scikit-learn",
      difficulty: "beginner",
      duration: "2 months",
      remote: true,
      link: ""
    },
    {
      id: 3,
      title: "Build a Movie Recommendation Engine",
      type: "project",
      description: "Build a content-based movie recommender using TF-IDF and cosine similarity on the MovieLens dataset. Deploy it with a React frontend.",
      match_score: 83.6,
      matched_skills: ["python", "machine learning", "scikit-learn", "numpy"],
      explanation: "Matched because you know: machine learning, numpy, python, scikit-learn",
      difficulty: "intermediate",
      duration: "2 weeks",
      remote: null,
      link: ""
    },
    {
      id: 4,
      title: "Google Solution Challenge 2026",
      type: "hackathon",
      description: "Build solutions for UN sustainable development goals using Google technologies. Top teams win mentorship and cloud credits.",
      match_score: 74.8,
      matched_skills: ["python", "machine learning"],
      explanation: "Matched because you know: machine learning, python",
      difficulty: "advanced",
      duration: "3 months",
      remote: true,
      link: "https://developers.google.com/community/gdsc-solution-challenge"
    },
    {
      id: 5,
      title: "React Developer Intern",
      type: "internship",
      description: "Build beautiful responsive frontend applications using React. Work with REST APIs and modern JavaScript. Great for full-stack exposure.",
      match_score: 68.3,
      matched_skills: ["react", "javascript"],
      explanation: "Matched because you know: javascript, react",
      difficulty: "beginner",
      duration: "3 months",
      remote: true,
      link: ""
    },
    {
      id: 6,
      title: "Machine Learning A-Z — Udemy",
      type: "course",
      description: "Complete ML course covering regression, classification, clustering, NLP and deep learning. Best beginner ML course on Udemy.",
      match_score: 62.1,
      matched_skills: ["python", "machine learning", "scikit-learn"],
      explanation: "Matched because you know: machine learning, python, scikit-learn",
      difficulty: "beginner",
      duration: "6 weeks",
      remote: null,
      link: "https://udemy.com"
    },
    {
      id: 7,
      title: "Data Analyst Intern",
      type: "internship",
      description: "Analyse business data using Python and SQL. Create dashboards and visual reports to support business decisions.",
      match_score: 54.7,
      matched_skills: ["python", "pandas", "data analysis"],
      explanation: "Matched because you know: data analysis, pandas, python",
      difficulty: "beginner",
      duration: "2 months",
      remote: true,
      link: ""
    },
    {
      id: 8,
      title: "HackWithInfy 2026",
      type: "hackathon",
      description: "Infosys national hackathon for engineering students. Compete to win and get fast-tracked for Infosys hiring process.",
      match_score: 47.9,
      matched_skills: ["python", "algorithms"],
      explanation: "Matched because you know: algorithms, python",
      difficulty: "intermediate",
      duration: "3 hours",
      remote: true,
      link: "https://hackwithinfy.com"
    }
  ]
};
