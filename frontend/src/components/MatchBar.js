// components/MatchBar.js
// Animated percentage bar showing match score
// Green > 70%, Yellow 40-70%, Red < 40%

import React, { useEffect, useState } from 'react';

export default function MatchBar({ score }) {
  const [width, setWidth] = useState(0);

  // Animate bar growing from 0 to score on mount
  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s) => {
    if (s >= 70) return { bar: '#00D4AA', glow: '#00D4AA33', label: '#00D4AA' };
    if (s >= 40) return { bar: '#F59E0B', glow: '#F59E0B33', label: '#F59E0B' };
    return         { bar: '#EF4444', glow: '#EF444433', label: '#EF4444' };
  };

  const colors = getColor(score);

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px'
      }}>
        <span style={{ fontSize: '11px', color: '#A0A0B8', letterSpacing: '0.05em' }}>
          MATCH SCORE
        </span>
        <span style={{
          fontSize: '15px',
          fontWeight: '700',
          color: colors.label,
          textShadow: `0 0 10px ${colors.glow}`
        }}>
          {score}%
        </span>
      </div>

      {/* Track */}
      <div style={{
        height: '6px',
        background: '#2A2A45',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        {/* Fill */}
        <div style={{
          height: '100%',
          width: `${width}%`,
          background: `linear-gradient(90deg, ${colors.bar}88, ${colors.bar})`,
          borderRadius: '3px',
          transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 0 8px ${colors.glow}`
        }} />
      </div>
    </div>
  );
}
