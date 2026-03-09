import React from 'react';

// ── Types ──────────────────────────────────────────────────────────
export type MapPinVariant = 'user-label' | 'user' | 'instruction' | 'current-location';

type MapPinProps = {
  variant?: MapPinVariant;
  /** Label shown inside the bubble — used by 'user-label' */
  label?: string;
  /** Instruction text — used by 'instruction' */
  instructionText?: string;
  /** Label text — used by 'current-location' */
  locationText?: string;
};

// ── Inline icons ───────────────────────────────────────────────────
function UserIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="6.5" r="3.2" fill="white" />
      <path
        d="M2.5 17C2.5 13.134 5.41 10 9 10C12.59 10 15.5 13.134 15.5 17"
        stroke="white" strokeWidth="1.6" strokeLinecap="round"
      />
    </svg>
  );
}

function NavArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 1.5L12.5 12.5L7 9.2L1.5 12.5L7 1.5Z" fill="#f70f79" />
    </svg>
  );
}

// Classic teardrop map pin SVG
function DropPin({ width = 44, height = 56 }: { width?: number; height?: number }) {
  const cx = width / 2;
  const cy = width / 2; // circle center at same as width/2 from top
  const r = width / 2;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={{ flexShrink: 0 }}
    >
      {/* Outer teardrop body */}
      <path
        d={`M${cx} 0 C${cx * 0.447} 0 0 ${cy * 0.447} 0 ${cy} C 0 ${cy * 1.553} ${cx} ${height} ${cx} ${height} C ${cx} ${height} ${width} ${cy * 1.553} ${width} ${cy} C${width} ${cy * 0.447} ${cx * 1.553} 0 ${cx} 0 Z`}
        fill="#f70f79"
      />
      {/* Inner white aura ring */}
      <circle cx={cx} cy={cy - 1} r={r * 0.46} fill="rgba(255,255,255,0.88)" />
      {/* Inner pink dot */}
      <circle cx={cx} cy={cy - 1} r={r * 0.23} fill="#f70f79" />
    </svg>
  );
}

// Ground shadow + pink circle location indicator
function PreciseLocationDot() {
  return (
    <div style={{ position: 'relative', width: 16, height: 12, flexShrink: 0 }}>
      {/* Ground shadow ellipse */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 14,
        height: 7,
        background: 'rgba(0,0,0,0.09)',
        borderRadius: '50%',
      }} />
      {/* White circle with pink border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 10,
        height: 10,
        background: 'white',
        border: '2.5px solid #f70f79',
        borderRadius: '50%',
        boxSizing: 'border-box',
      }} />
    </div>
  );
}

// Downward-pointing triangle tail
function Tail({ color = '#f70f79', width = 12, height = 8 }: { color?: string; width?: number; height?: number }) {
  return (
    <div style={{
      width: 0,
      height: 0,
      borderLeft: `${width / 2}px solid transparent`,
      borderRight: `${width / 2}px solid transparent`,
      borderTop: `${height}px solid ${color}`,
      flexShrink: 0,
    }} />
  );
}

// ── Drop shadow filter for pin shapes ─────────────────────────────
const PIN_SHADOW = [
  'drop-shadow(0 2px 4px rgba(247,15,121,0.18))',
  'drop-shadow(0 6px 14px rgba(247,15,121,0.22))',
  'drop-shadow(0 12px 24px rgba(247,15,121,0.12))',
].join(' ');

const CARD_SHADOW = '0 1px 2px rgba(51,51,51,0.04), 0 4px 12px rgba(51,51,51,0.07)';

// ── Component ──────────────────────────────────────────────────────
export default function MapPin({
  variant = 'user-label',
  label = 'You',
  instructionText = 'Move pin to your exact location',
  locationText = 'Current Location',
}: MapPinProps) {

  // ── User+Label ─────────────────────────────────────────────────
  if (variant === 'user-label') {
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '8px 12px',
          background: '#f70f79',
          borderRadius: 14,
          filter: PIN_SHADOW,
        }}>
          <UserIcon size={18} />
          <span style={{
            fontFamily: '"Instrument Sans", sans-serif',
            fontSize: 16,
            fontWeight: 700,
            color: 'white',
            lineHeight: '20px',
            letterSpacing: 0.032,
            whiteSpace: 'nowrap',
          }}>
            {label}
          </span>
        </div>
        <Tail />
        <PreciseLocationDot />
      </div>
    );
  }

  // ── User ───────────────────────────────────────────────────────
  if (variant === 'user') {
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#f70f79',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: PIN_SHADOW,
        }}>
          <UserIcon size={20} />
        </div>
        <Tail />
        <PreciseLocationDot />
      </div>
    );
  }

  // ── Instruction ────────────────────────────────────────────────
  if (variant === 'instruction') {
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Text bubble */}
        <div style={{
          padding: '10px 14px',
          background: '#f70f79',
          borderRadius: 12,
          filter: PIN_SHADOW,
          maxWidth: 240,
        }}>
          <span style={{
            fontFamily: '"Instrument Sans", sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: 'white',
            lineHeight: '14px',
            whiteSpace: 'nowrap',
          }}>
            {instructionText}
          </span>
        </div>
        {/* Tail bridging to the drop pin */}
        <Tail width={14} height={10} />
        {/* Classic teardrop map pin */}
        <div style={{ filter: PIN_SHADOW }}>
          <DropPin width={44} height={56} />
        </div>
        <PreciseLocationDot />
      </div>
    );
  }

  // ── Current Location ──────────────────────────────────────────
  if (variant === 'current-location') {
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px',
        background: 'white',
        border: '1.5px solid #fff3f8',
        borderRadius: 12,
        boxShadow: CARD_SHADOW,
        whiteSpace: 'nowrap',
      }}>
        <NavArrowIcon />
        <span style={{
          fontFamily: '"Instrument Sans", sans-serif',
          fontSize: 12,
          fontWeight: 500,
          color: '#4d4d4d',
          lineHeight: '16px',
        }}>
          {locationText}
        </span>
      </div>
    );
  }

  return null;
}
