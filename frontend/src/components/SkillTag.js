// components/SkillTag.js
// Clickable pill tag — toggles selected/unselected
// Used in ProfilePage for skills and interests selection

import React from 'react';

export default function SkillTag({ skill, selected, onToggle, size = 'md' }) {
  const sizes = {
    sm: { padding: '4px 10px', fontSize: '11px' },
    md: { padding: '7px 14px', fontSize: '13px' },
    lg: { padding: '9px 18px', fontSize: '14px' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <button
      onClick={() => onToggle(skill)}
      style={{
        padding: s.padding,
        margin: '4px',
        borderRadius: '20px',
        border: selected ? '1.5px solid #6C63FF' : '1.5px solid #2A2A45',
        background: selected
          ? 'linear-gradient(135deg, #6C63FF22, #6C63FF44)'
          : '#1A1A2E',
        color: selected ? '#A78BFA' : '#A0A0B8',
        cursor: 'pointer',
        fontSize: s.fontSize,
        fontWeight: selected ? '600' : '400',
        transition: 'all 0.15s ease',
        transform: selected ? 'scale(1.04)' : 'scale(1)',
        boxShadow: selected ? '0 0 12px #6C63FF33' : 'none',
        whiteSpace: 'nowrap'
      }}
      onMouseEnter={e => {
        if (!selected) {
          e.target.style.borderColor = '#6C63FF88';
          e.target.style.color = '#C4B5FD';
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          e.target.style.borderColor = '#2A2A45';
          e.target.style.color = '#A0A0B8';
        }
      }}
    >
      {selected && <span style={{ marginRight: '5px' }}>✓</span>}
      {skill}
    </button>
  );
}
