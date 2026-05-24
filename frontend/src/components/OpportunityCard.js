// components/OpportunityCard.js
// Expandable opportunity card with type badge, match bar, explanation
// Click to expand for full details

import React, { useState } from 'react';
import MatchBar from './MatchBar';

const TYPE_CONFIG = {
  hackathon: {
    label: '🏆 Hackathon',
    color: '#F59E0B',
    bg: '#F59E0B15',
    border: '#F59E0B40'
  },
  internship: {
    label: '💼 Internship',
    color: '#00D4AA',
    bg: '#00D4AA15',
    border: '#00D4AA40'
  },
  project: {
    label: '🛠 Project',
    color: '#6C63FF',
    bg: '#6C63FF15',
    border: '#6C63FF40'
  },
  course: {
    label: '📚 Course',
    color: '#EC4899',
    bg: '#EC489915',
    border: '#EC489940'
  }
};

export default function OpportunityCard({ opp, index }) {
  const [expanded, setExpanded] = useState(false);
  const config = TYPE_CONFIG[opp.type] || TYPE_CONFIG.project;

  return (
    <div
      className="fade-in-up"
      onClick={() => setExpanded(!expanded)}
      style={{
        background: '#1A1A2E',
        border: `1px solid ${expanded ? config.border : '#2A2A45'}`,
        borderRadius: '14px',
        padding: '18px 20px',
        marginBottom: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        animationDelay: `${index * 0.07}s`,
        animationFillMode: 'both',
        transform: expanded ? 'scale(1.005)' : 'scale(1)',
        boxShadow: expanded ? `0 4px 24px ${config.bg}` : '0 2px 8px #00000040'
      }}
      onMouseEnter={e => {
        if (!expanded) e.currentTarget.style.borderColor = config.border;
      }}
      onMouseLeave={e => {
        if (!expanded) e.currentTarget.style.borderColor = '#2A2A45';
      }}
    >
      {/* Header row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <div style={{ flex: 1, marginRight: '12px' }}>
          {/* Type badge */}
          <span style={{
            display: 'inline-block',
            fontSize: '10px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            padding: '3px 10px',
            borderRadius: '10px',
            background: config.bg,
            color: config.color,
            border: `1px solid ${config.border}`,
            marginBottom: '8px'
          }}>
            {config.label}
          </span>

          {/* Title */}
          <h3 style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#FFFFFF',
            lineHeight: '1.4'
          }}>
            {opp.title}
          </h3>
        </div>

        {/* Expand arrow */}
        <div style={{
          color: '#A0A0B8',
          fontSize: '12px',
          transition: 'transform 0.2s',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          marginTop: '4px',
          flexShrink: 0
        }}>
          ▼
        </div>
      </div>

      {/* Match bar */}
      <MatchBar score={opp.match_score} />

      {/* Explanation */}
      <p style={{
        fontSize: '12px',
        color: '#A0A0B8',
        fontStyle: 'italic',
        marginTop: '8px',
        lineHeight: '1.5'
      }}>
        {opp.explanation}
      </p>

      {/* Expanded details */}
      {expanded && (
        <div
          className="fade-in"
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: `1px solid #2A2A45`
          }}
        >
          {/* Description */}
          <p style={{
            fontSize: '13px',
            color: '#C4C4D8',
            lineHeight: '1.65',
            marginBottom: '14px'
          }}>
            {opp.description}
          </p>

          {/* Meta row */}
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '14px'
          }}>
            <span style={{ fontSize: '12px', color: '#A0A0B8' }}>
              ⏱ <strong style={{ color: '#E0E0F0' }}>{opp.duration}</strong>
            </span>
            <span style={{ fontSize: '12px', color: '#A0A0B8' }}>
              📊 <strong style={{ color: '#E0E0F0', textTransform: 'capitalize' }}>{opp.difficulty}</strong>
            </span>
            {opp.remote !== null && (
              <span style={{ fontSize: '12px', color: '#A0A0B8' }}>
                {opp.remote
                  ? <><strong style={{ color: '#00D4AA' }}>🌐 Remote</strong></>
                  : <><strong style={{ color: '#F59E0B' }}>📍 Onsite</strong></>
                }
              </span>
            )}
          </div>

          {/* Matched skills */}
          {opp.matched_skills.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <span style={{
                fontSize: '11px',
                color: '#A0A0B8',
                letterSpacing: '0.04em',
                display: 'block',
                marginBottom: '6px'
              }}>
                SKILLS THAT MATCHED
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {opp.matched_skills.map(skill => (
                  <span key={skill} style={{
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '10px',
                    background: '#6C63FF22',
                    color: '#A78BFA',
                    border: '1px solid #6C63FF44',
                    textTransform: 'capitalize'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Link */}
          {opp.link && (
            <a
              href={opp.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-block',
                fontSize: '13px',
                color: '#6C63FF',
                textDecoration: 'none',
                padding: '7px 16px',
                borderRadius: '8px',
                border: '1px solid #6C63FF44',
                background: '#6C63FF11',
                transition: 'all 0.15s'
              }}
            >
              View opportunity →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
