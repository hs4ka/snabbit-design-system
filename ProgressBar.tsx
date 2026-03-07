import React from 'react';

const FONT = "'Outfit', sans-serif";

export type ProgressSize = 48 | 56 | 64 | 72 | 80;

// Figma node 173:8488 — CircularProgressBar
// stroke-dasharray technique: circumference = 2π × r
// rotate SVG -90° so arc starts at top (12 o'clock)
// label shown for sizes ≥ 56; 14px for 64/72/80, 12px for 56, hidden at 48

const SIZE_CONFIG: Record<ProgressSize, {
  strokeWidth: number; radius: number; fontSize: number; lineHeight: number; showLabel: boolean;
}> = {
  80: { strokeWidth: 8,   radius: 36,    fontSize: 14, lineHeight: 20, showLabel: true },
  72: { strokeWidth: 7,   radius: 32.5,  fontSize: 14, lineHeight: 20, showLabel: true },
  64: { strokeWidth: 6,   radius: 29,    fontSize: 14, lineHeight: 20, showLabel: true },
  56: { strokeWidth: 5.5, radius: 25.25, fontSize: 12, lineHeight: 16, showLabel: true },
  48: { strokeWidth: 5,   radius: 21.5,  fontSize: 12, lineHeight: 16, showLabel: false },
};

type ProgressBarProps = {
  size?: ProgressSize;
  value?: number; // 0–100
  showLabel?: boolean;
};

// Figma node 173:8466 — HorizontalProgressBar
// 320×6px track (#f0f0f0, radius 999px, overflow hidden), pink fill scaled by value

type HProgressBarProps = {
  value?: number; // 0–100
  width?: number;
};

export function HorizontalProgressBar({
  value = 0,
  width = 320,
}: HProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div style={{
      width,
      height: 6,
      background: '#f0f0f0',
      borderRadius: 999,
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {pct > 0 && (
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: '#f70f79',
          borderRadius: 999,
        }} />
      )}
    </div>
  );
}

export default function ProgressBar({
  size = 80,
  value = 0,
  showLabel,
}: ProgressBarProps) {
  const cfg = SIZE_CONFIG[size];
  const pct = Math.min(100, Math.max(0, value));
  const circumference = 2 * Math.PI * cfg.radius;
  const offset = circumference * (1 - pct / 100);
  const displayLabel = showLabel !== undefined ? showLabel : cfg.showLabel;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: 'block', transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={cfg.radius}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth={cfg.strokeWidth}
          strokeLinecap="round"
        />
        {/* Fill */}
        {pct > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={cfg.radius}
            fill="none"
            stroke="#f70f79"
            strokeWidth={cfg.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        )}
      </svg>

      {/* Percentage label */}
      {displayLabel && (
        <span style={{
          position: 'absolute',
          top: '50%',
          left: 12,
          right: 12,
          transform: 'translateY(-50%)',
          textAlign: 'center',
          fontFamily: FONT,
          fontSize: cfg.fontSize,
          fontWeight: 500,
          lineHeight: `${cfg.lineHeight}px`,
          color: '#303030',
          letterSpacing: '-0.006em',
          pointerEvents: 'none',
        }}>
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
