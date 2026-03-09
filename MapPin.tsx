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
function UserIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="5.5" r="2.8" fill="white" />
      <path
        d="M2 14C2 10.686 4.686 8 8 8C11.314 8 14 10.686 14 14"
        stroke="white" strokeWidth="1.4" strokeLinecap="round"
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

// Precise location dot — pink filled circle with white center + pink glow
function PreciseLocationDot() {
  return (
    <div style={{ position: 'relative', width: 16, height: 16, flexShrink: 0 }}>
      {/* Pink glow halo */}
      <div style={{
        position: 'absolute',
        inset: -4,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(247,15,121,0.15) 0%, transparent 70%)',
      }} />
      {/* Pink outer circle */}
      <div style={{
        position: 'absolute',
        inset: 1,
        borderRadius: '50%',
        background: '#f70f79',
      }} />
      {/* White center */}
      <div style={{
        position: 'absolute',
        inset: 5,
        borderRadius: '50%',
        background: 'white',
      }} />
    </div>
  );
}

// ── Drop shadow ────────────────────────────────────────────────────
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

  // ── User+Label — 72×73px speech-bubble pin ────────────────────
  if (variant === 'user-label') {
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Body + tail as one unit */}
        <div style={{ position: 'relative', filter: PIN_SHADOW }}>
          {/* Rounded pill body */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '8px 12px',
            background: '#f70f79',
            borderRadius: 14,
          }}>
            <UserIcon size={16} />
            <span style={{
              fontFamily: '"Instrument Sans", sans-serif',
              fontSize: 16,
              fontWeight: 700,
              color: 'white',
              lineHeight: '20px',
              letterSpacing: 0.2,
              whiteSpace: 'nowrap',
            }}>
              {label}
            </span>
          </div>
          {/* Tail — positioned absolutely to overlap body bottom for seamless join */}
          <div style={{
            position: 'absolute',
            bottom: -7,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '8px solid #f70f79',
          }} />
        </div>
        {/* Spacer for tail overhang */}
        <div style={{ height: 4 }} />
        {/* Location dot */}
        <PreciseLocationDot />
      </div>
    );
  }

  // ── User — circular pin without label ─────────────────────────
  if (variant === 'user') {
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', filter: PIN_SHADOW }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#f70f79',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <UserIcon size={16} />
          </div>
          {/* Tail */}
          <div style={{
            position: 'absolute',
            bottom: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '7px solid #f70f79',
          }} />
        </div>
        <div style={{ height: 3 }} />
        <PreciseLocationDot />
      </div>
    );
  }

  // ── Instruction — text bubble + teardrop pin ──────────────────
  if (variant === 'instruction') {
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Text bubble with integrated tail */}
        <div style={{ position: 'relative', filter: PIN_SHADOW }}>
          <div style={{
            padding: '10px 14px',
            background: '#f70f79',
            borderRadius: 12,
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
          <div style={{
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '9px solid #f70f79',
          }} />
        </div>
        <div style={{ height: 6 }} />
        {/* Classic teardrop map pin */}
        <div style={{ filter: PIN_SHADOW }}>
          <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
            <path
              d="M22 0C9.85 0 0 9.85 0 22C0 34.15 22 56 22 56C22 56 44 34.15 44 22C44 9.85 34.15 0 22 0Z"
              fill="#f70f79"
            />
            <circle cx="22" cy="21" r="10" fill="rgba(255,255,255,0.88)" />
            <circle cx="22" cy="21" r="5" fill="#f70f79" />
          </svg>
        </div>
        <PreciseLocationDot />
      </div>
    );
  }

  // ── Current Location — floating card ──────────────────────────
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
