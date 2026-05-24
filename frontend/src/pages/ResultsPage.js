// pages/ResultsPage.js
// Shows ranked opportunities with filter tabs and stats

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OpportunityCard from '../components/OpportunityCard';

const FILTERS = ['all', 'hackathon', 'internship', 'project', 'course'];

const FILTER_ICONS = {
  all: '⚡',
  hackathon: '🏆',
  internship: '💼',
  project: '🛠',
  course: '📚'
};

export default function ResultsPage() {
  const navigate  = useNavigate();
  const [filter, setFilter] = useState('all');
  const [data, setData]     = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('cl_results');
    if (!raw) { navigate('/'); return; }
    setData(JSON.parse(raw));
  }, [navigate]);

  if (!data) return null;

  const filtered = filter === 'all'
    ? data.matches
    : data.matches.filter(m => m.type === filter);

  // Stats for the summary row
  const counts = {};
  data.matches.forEach(m => { counts[m.type] = (counts[m.type] || 0) + 1; });
  const avgScore = data.matches.length
    ? Math.round(data.matches.reduce((s, m) => s + m.match_score, 0) / data.matches.length)
    : 0;
  const topScore = data.matches.length ? data.matches[0].match_score : 0;

  return (
    <div style={{ maxWidth:'720px', margin:'0 auto', padding:'36px 24px 80px' }}>

      {/* Header */}
      <div className="fade-in-up" style={{ marginBottom:'24px' }}>
        <button
          onClick={() => navigate('/profile')}
          style={{
            background:'none', border:'none', color:'#6C63FF',
            fontSize:'13px', cursor:'pointer', marginBottom:'14px',
            display:'block', padding:0
          }}
        >
          ← Back
        </button>

        <h1 style={{ fontSize:'24px', fontWeight:'700', marginBottom:'4px' }}>
          {data.total} opportunities for{' '}
          <span style={{
            background:'linear-gradient(135deg, #6C63FF, #00D4AA)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text'
          }}>
            {data.user_name}
          </span>
        </h1>
        <p style={{ color:'#A0A0B8', fontSize:'13px' }}>
          Ranked by how well they match your profile. Click any card for details.
        </p>
      </div>

      {/* Stats row */}
      <div className="fade-in-up" style={{
        display:'grid',
        gridTemplateColumns:'repeat(3, 1fr)',
        gap:'10px',
        marginBottom:'24px'
      }}>
        <StatCard label="Best Match" value={`${topScore}%`} color="#00D4AA" />
        <StatCard label="Avg Match"  value={`${avgScore}%`} color="#6C63FF" />
        <StatCard label="Total Found" value={data.total}    color="#F59E0B" />
      </div>

      {/* Filter tabs */}
      <div style={{
        display:'flex', gap:'8px', marginBottom:'20px',
        flexWrap:'wrap', paddingBottom:'4px'
      }}>
        {FILTERS.map(f => {
          const count = f === 'all' ? data.total : (counts[f] || 0);
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding:'7px 16px',
                borderRadius:'20px',
                border: active ? '1.5px solid #6C63FF' : '1.5px solid #2A2A45',
                background: active ? 'linear-gradient(135deg,#6C63FF22,#6C63FF44)' : '#1A1A2E',
                color: active ? '#A78BFA' : '#A0A0B8',
                fontWeight: active ? '600' : '400',
                fontSize:'13px',
                cursor:'pointer',
                transition:'all 0.15s',
                textTransform:'capitalize'
              }}
            >
              {FILTER_ICONS[f]} {f} {count > 0 && (
                <span style={{
                  marginLeft:'5px',
                  background: active ? '#6C63FF44' : '#2A2A45',
                  padding:'1px 7px',
                  borderRadius:'10px',
                  fontSize:'11px'
                }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign:'center', padding:'48px 20px',
          color:'#555575', fontSize:'14px'
        }}>
          No {filter} matches found.<br />
          <span style={{ fontSize:'12px', marginTop:'6px', display:'block' }}>
            Try selecting more skills on the profile page.
          </span>
        </div>
      ) : (
        filtered.map((opp, i) => (
          <OpportunityCard key={opp.id} opp={opp} index={i} />
        ))
      )}

      {/* Footer */}
      <div style={{
        marginTop:'40px',
        padding:'16px',
        background:'#1A1A2E',
        borderRadius:'12px',
        textAlign:'center',
        border:'1px solid #2A2A45'
      }}>
        <p style={{ fontSize:'12px', color:'#555575', lineHeight:'1.6' }}>
          Powered by <span style={{ color:'#6C63FF' }}>TF-IDF vectorisation</span> +{' '}
          <span style={{ color:'#00D4AA' }}>Cosine Similarity</span>
          <br />
          <span style={{ fontSize:'11px' }}>
            Same technique used by Netflix, Spotify & Instagram recommendation systems
          </span>
        </p>
      </div>
    </div>
  );
}

// ── Sub-component: stat card ──────────────────────────────────
function StatCard({ label, value, color }) {
  return (
    <div style={{
      background:'#1A1A2E',
      border:`1px solid ${color}30`,
      borderRadius:'12px',
      padding:'14px 16px',
      textAlign:'center'
    }}>
      <div style={{
        fontSize:'22px', fontWeight:'700', color,
        textShadow:`0 0 16px ${color}44`,
        marginBottom:'4px'
      }}>
        {value}
      </div>
      <div style={{ fontSize:'11px', color:'#A0A0B8', letterSpacing:'0.04em' }}>
        {label.toUpperCase()}
      </div>
    </div>
  );
}
