// pages/ProfilePage.js
// Skill and interest selection with year picker
// Calls API on submit, navigates to results

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SkillTag from '../components/SkillTag';
import { getSkills, getMatches } from '../api';

export default function ProfilePage() {
  const [allSkills, setAllSkills]       = useState([]);
  const [allDomains, setAllDomains]     = useState([]);
  const [selSkills, setSelSkills]       = useState([]);
  const [selInterests, setSelInterests] = useState([]);
  const [domain, setDomain]             = useState('');
  const [year, setYear]                 = useState(3);
  const [loading, setLoading]           = useState(false);
  const [fetching, setFetching]         = useState(true);
  const [error, setError]               = useState('');

  const navigate = useNavigate();
  const name = localStorage.getItem('cl_name') || 'Student';

  useEffect(() => {
    getSkills()
      .then(data => {
        setAllSkills(data.skills);
        setAllDomains(data.domains);
      })
      .finally(() => setFetching(false));
  }, []);

  const toggleSkill = s =>
    setSelSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const toggleInterest = d =>
    setSelInterests(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  const handleSubmit = async () => {
    if (selSkills.length === 0) { setError('Select at least one skill.'); return; }
    if (!domain)                { setError('Select your primary domain.'); return; }

    setError('');
    setLoading(true);

    try {
      const data = await getMatches({
        name,
        skills:    selSkills.map(s => s.toLowerCase()),
        interests: selInterests.map(s => s.toLowerCase()),
        domain,
        year,
        top_n: 10
      });
      localStorage.setItem('cl_results', JSON.stringify(data));
      navigate('/results');
    } catch {
      setError('Could not connect. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ color:'#A0A0B8', fontSize:'14px', animation:'pulse 1.5s infinite' }}>
        Loading skills...
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:'700px', margin:'0 auto', padding:'40px 24px 80px' }}>

      {/* Header */}
      <div className="fade-in-up" style={{ marginBottom:'32px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background:'none', border:'none', color:'#6C63FF',
            fontSize:'13px', cursor:'pointer', marginBottom:'16px',
            display:'block', padding: 0
          }}
        >
          ← Back
        </button>
        <h1 style={{ fontSize:'26px', fontWeight:'700', marginBottom:'6px' }}>
          Hey {name} 👋
        </h1>
        <p style={{ color:'#A0A0B8', fontSize:'14px' }}>
          Tell us about yourself — we'll find opportunities that actually fit.
        </p>
      </div>

      {/* Year of study */}
      <Section title="Year of Study">
        <div style={{ display:'flex', gap:'10px' }}>
          {[1,2,3,4].map(y => (
            <button key={y} onClick={() => setYear(y)} style={{
              padding:'9px 22px',
              borderRadius:'10px',
              border: year === y ? '1.5px solid #6C63FF' : '1.5px solid #2A2A45',
              background: year === y ? 'linear-gradient(135deg,#6C63FF22,#6C63FF44)' : '#1A1A2E',
              color: year === y ? '#A78BFA' : '#A0A0B8',
              fontWeight: year === y ? '600' : '400',
              fontSize:'14px',
              transition:'all 0.15s'
            }}>
              Year {y}
            </button>
          ))}
        </div>
      </Section>

      {/* Primary domain */}
      <Section title="Primary Domain" subtitle="Pick the one that best describes your focus">
        <div style={{ display:'flex', flexWrap:'wrap', marginLeft:'-4px' }}>
          {allDomains.map(d => (
            <SkillTag
              key={d} skill={d}
              selected={domain === d}
              onToggle={() => setDomain(d)}
            />
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section
        title="Your Skills"
        subtitle={`${selSkills.length} selected — choose everything you know, even basics`}
      >
        <div style={{ display:'flex', flexWrap:'wrap', marginLeft:'-4px' }}>
          {allSkills.map(s => (
            <SkillTag key={s} skill={s} selected={selSkills.includes(s)} onToggle={toggleSkill} />
          ))}
        </div>
      </Section>

      {/* Interests */}
      <Section title="Also Interested In" subtitle="Optional — helps improve matching">
        <div style={{ display:'flex', flexWrap:'wrap', marginLeft:'-4px' }}>
          {allDomains.map(d => (
            <SkillTag key={d} skill={d} selected={selInterests.includes(d)} onToggle={toggleInterest} />
          ))}
        </div>
      </Section>

      {/* Error */}
      {error && (
        <div style={{
          background:'#EF444415', border:'1px solid #EF444440',
          borderRadius:'10px', padding:'12px 16px',
          color:'#F87171', fontSize:'13px', marginBottom:'16px'
        }}>
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width:'100%', padding:'16px',
          background: loading
            ? '#2A2A45'
            : 'linear-gradient(135deg, #6C63FF, #8B5CF6)',
          color: loading ? '#555575' : '#FFFFFF',
          border:'none', borderRadius:'14px',
          fontSize:'16px', fontWeight:'600',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition:'all 0.2s',
          boxShadow: loading ? 'none' : '0 4px 24px #6C63FF44',
          letterSpacing:'0.02em'
        }}
      >
        {loading ? (
          <span>
            <span style={{ animation:'pulse 1s infinite', display:'inline-block' }}>●</span>
            {'  '}Finding your opportunities...
          </span>
        ) : (
          'Find my opportunities →'
        )}
      </button>
    </div>
  );
}

// ── Sub-component: section wrapper ────────────────────────────
function Section({ title, subtitle, children }) {
  return (
    <div className="fade-in-up" style={{ marginBottom:'28px' }}>
      <div style={{ marginBottom:'12px' }}>
        <h2 style={{ fontSize:'14px', fontWeight:'600', color:'#E0E0F0', marginBottom:'2px' }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize:'12px', color:'#555575' }}>{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
