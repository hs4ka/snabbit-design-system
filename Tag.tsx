import React from 'react';

const FONT = "'Outfit', sans-serif";

// Figma node 89:14010 — Tag
// 2 styles (Stroke/Filled) × 4 states × 3 types (Basic/Left Icon/Avatar)
// dismissIcon = X button inside text group (gap 2px)
// subtext = secondary count label e.g. "(4)"

export type TagStyle = 'Filled' | 'Stroke';
export type TagState = 'Default' | 'Hover' | 'Active' | 'Disabled';
export type TagType = 'Basic' | 'Left Icon' | 'Avatar';

type TagProps = {
  tagStyle?: TagStyle;
  state?: TagState;
  type?: TagType;
  label?: string;
  subtext?: string;
  dismissIcon?: boolean;
  onDismiss?: () => void;
};

const TOKENS: Record<TagStyle, Record<TagState, {
  bg: string;
  border: string | null;
  textColor: string;
  subtextColor: string;
  fontWeight: number;
  iconColor: string;
}>> = {
  Stroke: {
    Default:  { bg: '#ffffff', border: '#f0f0f0', textColor: '#828282', subtextColor: '#a3a3a3', fontWeight: 500, iconColor: '#828282' },
    Hover:    { bg: '#fafafa', border: null,       textColor: '#828282', subtextColor: '#a3a3a3', fontWeight: 500, iconColor: '#828282' },
    Active:   { bg: '#ffffff', border: '#303030',  textColor: '#303030', subtextColor: '#5c5c5c', fontWeight: 600, iconColor: '#303030' },
    Disabled: { bg: '#fafafa', border: null,       textColor: '#ababab', subtextColor: '#d1d1d1', fontWeight: 500, iconColor: '#ababab' },
  },
  Filled: {
    Default:  { bg: '#fafafa', border: null,       textColor: '#828282', subtextColor: '#a3a3a3', fontWeight: 500, iconColor: '#828282' },
    Hover:    { bg: '#ffffff', border: '#f0f0f0',  textColor: '#828282', subtextColor: '#a3a3a3', fontWeight: 500, iconColor: '#828282' },
    Active:   { bg: '#d0fbe9', border: null,       textColor: '#178c4e', subtextColor: '#5c5c5c', fontWeight: 600, iconColor: '#178c4e' },
    Disabled: { bg: '#fafafa', border: null,       textColor: '#ababab', subtextColor: '#d1d1d1', fontWeight: 500, iconColor: '#ababab' },
  },
};

function CloseIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M11 5L5 11M5 5l6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'block', flexShrink: 0 }}>
      <path
        d="M9 1.5L14.5 7L11.5 8.5L10 10L10.5 13L9 14.5L7 10.5L3.5 14L2 12.5L5.5 9L1.5 7L3 5.5L6 6L7.5 4.5L9 1.5Z"
        fill={color}
      />
    </svg>
  );
}

function AvatarPlaceholder() {
  return (
    <div style={{
      width: 16, height: 16, borderRadius: '50%',
      background: '#e0e0e0', overflow: 'hidden', flexShrink: 0,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="#9e9e9e">
        <circle cx="6" cy="4" r="2.2" />
        <path d="M1 12C1 9.2 3.2 7 6 7C8.8 7 11 9.2 11 12" />
      </svg>
    </div>
  );
}

export default function Tag({
  tagStyle = 'Stroke',
  state = 'Default',
  type = 'Basic',
  label = 'Tag',
  subtext,
  dismissIcon = true,
  onDismiss,
}: TagProps) {
  const cfg = TOKENS[tagStyle][state];
  const isDisabled = state === 'Disabled';
  const hasLeftEl = type !== 'Basic';

  // Padding: Basic → pl:8 pr:4 (with X) or px:8 (no X); Left/Avatar → p:4 (with X) or pl:4 pr:8 (no X)
  const containerPadding: React.CSSProperties = type === 'Basic'
    ? (dismissIcon
        ? { paddingLeft: 8, paddingRight: 4, paddingTop: 4, paddingBottom: 4 }
        : { padding: '4px 8px' })
    : (dismissIcon
        ? { padding: 4 }
        : { paddingLeft: 4, paddingRight: 8, paddingTop: 4, paddingBottom: 4 });

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: hasLeftEl ? 4 : 0,
      borderRadius: 56,
      background: cfg.bg,
      border: cfg.border ? `1px solid ${cfg.border}` : '1px solid transparent',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      flexShrink: 0,
      ...containerPadding,
    }}>
      {type === 'Left Icon' && <PinIcon color={cfg.iconColor} />}
      {type === 'Avatar' && <AvatarPlaceholder />}

      {/* Text group: label + subtext + X all share gap:2 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
        <span style={{
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: cfg.fontWeight,
          lineHeight: '16px',
          color: cfg.textColor,
          whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
        {subtext && (
          <span style={{
            fontFamily: FONT,
            fontSize: 12,
            fontWeight: state === 'Active' ? 500 : 400,
            lineHeight: '16px',
            color: cfg.subtextColor,
            whiteSpace: 'nowrap',
          }}>
            {subtext}
          </span>
        )}
        {dismissIcon && (
          <button
            onClick={isDisabled ? undefined : onDismiss}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', padding: 0,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              flexShrink: 0,
            }}
          >
            <CloseIcon color={cfg.iconColor} />
          </button>
        )}
      </div>
    </div>
  );
}
