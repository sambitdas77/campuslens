// pages/LandingPage.js
// First screen — name input, animated background, strong visual impression

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [name, setName] = useState('');
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => {
    if (!name.trim()) return;
    localStorage.setItem('cl_name', name.trim());
    navigate('/profile');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleStart();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, #6C63FF22 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, #00D4AA15 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Card */}
      <div style={{
        background: '#1A1A2E',
        border: '1px solid #2A2A45',
        borderRadius: '24px',
        padding: '52px 48px',
        width: '100%',
        maxWidth: '460px',
        textAlign: 'center',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        boxShadow: '0 24px 80px #00000060',
        position: 'relative',
        zIndex: 1
      }}>

        {/* Icon */}
        <div style={{
          fontSize: '52px',
          marginBottom: '20px',
          filter: 'drop-shadow(0 0 20px #6C63FF88)'
        }}>
          🎯
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #A78BFA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '10px',
          letterSpacing: '-0.5px'
        }}>
          CampusLens
        </h1>

        {/* Subtitle */}
        <p style={{
          color: '#A0A0B8',
          fontSize: '15px',
          lineHeight: '1.65',
          marginBottom: '36px'
        }}>
          AI-powered opportunity matching.<br />
          Find hackathons, internships & projects<br />
          built for <em style={{ color: '#A78BFA' }}>your exact skill set</em>.
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="What's your name?"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoFocus
          style={{
            width: '100%',
            padding: '14px 18px',
            background: '#0F0F1A',
            border: `1.5px solid ${focused ? '#6C63FF' : '#2A2A45'}`,
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '15px',
            outline: 'none',
            marginBottom: '14px',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: focused ? '0 0 0 3px #6C63FF22' : 'none'
          }}
        />

        {/* CTA Button */}
        <button
          onClick={handleStart}
          disabled={!name.trim()}
          style={{
            width: '100%',
            padding: '14px',
            background: name.trim()
              ? 'linear-gradient(135deg, #6C63FF, #8B5CF6)'
              : '#2A2A45',
            color: name.trim() ? '#FFFFFF' : '#555575',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: name.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            letterSpacing: '0.02em',
            boxShadow: name.trim() ? '0 4px 20px #6C63FF44' : 'none',
            transform: 'scale(1)'
          }}
          onMouseEnter={e => {
            if (name.trim()) e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          Find my opportunities →
        </button>

        {/* Footer hint */}
        <p style={{
          marginTop: '20px',
          fontSize: '12px',
          color: '#555575'
        }}>
          Powered by TF-IDF + Cosine Similarity
        </p>
      </div>
    </div>
  );
}
