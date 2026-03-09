import React from 'react';

// Figma node 173:8345 — Divider
// 4 variants: Line (1px solid), Line Spacing (1px solid + 1.5px vertical padding),
// Dotted (1px dotted), Text & Line Divider (line + label + line)

export type DividerType = 'Line' | 'Line Spacing' | 'Text & Line Divider' | 'Dotted';

type DividerProps = {
  type?: DividerType;
  text?: string;        // label for Text & Line Divider, default "OR"
  width?: number | string;
};

const solidLine: React.CSSProperties = {
  flex: '1 0 0',
  height: 1,
  minWidth: 0,
  background: '#f0f0f0',
};

const dottedLine: React.CSSProperties = {
  flex: '1 0 0',
  height: 0,
  minWidth: 0,
  borderTop: '1.5px dotted #f0f0f0',
};

export default function Divider({
  type = 'Line',
  text = 'OR',
  width = '100%',
}: DividerProps) {
  if (type === 'Line Spacing') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', width, padding: '1.5px 0' }}>
        <div style={solidLine} />
      </div>
    );
  }

  if (type === 'Dotted') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', width }}>
        <div style={dottedLine} />
      </div>
    );
  }

  if (type === 'Text & Line Divider') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, width }}>
        <div style={solidLine} />
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          lineHeight: '12px',
          letterSpacing: '0.22px',
          color: '#ababab',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {text}
        </span>
        <div style={solidLine} />
      </div>
    );
  }

  // Line (default)
  return (
    <div style={{ display: 'flex', alignItems: 'center', width }}>
      <div style={solidLine} />
    </div>
  );
}
