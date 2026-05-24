import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage  from './pages/LandingPage';
import ProfilePage  from './pages/ProfilePage';
import ResultsPage  from './pages/ResultsPage';
import './index.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"        element={<LandingPage />}  />
        <Route path="/profile" element={<ProfilePage />}  />
        <Route path="/results" element={<ResultsPage />}  />
        <Route path="*"        element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
