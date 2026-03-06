import React from 'react';
import { colors, radius, fontFamily } from './tokens';

export type ToastState = 'error' | 'success' | 'information' | 'warning' | 'feature';
export type ToastSize = 52 | 40;

// ── State config ──────────────────────────────────────

const stateConfig: Record<ToastState, { bg: string; text: string; action: 'okay' | 'undo' }> = {
  error:       { bg: colors.status.red.light,    text: colors.status.red.dark,    action: 'okay' },
  success:     { bg: colors.status.green.light,  text: colors.status.green.dark,  action: 'okay' },
  information: { bg: colors.status.blue.light,   text: colors.status.blue.dark,   action: 'okay' },
  warning:     { bg: colors.status.orange.light, text: colors.status.orange.dark, action: 'okay' },
  feature:     { bg: colors.text.tertiary,       text: '#fff',                    action: 'undo' },
};

// ── Icons ──────────────────────────────────────────────

function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#E93544" />
      <path d="M8 4.5V9M8 11.5H8.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#178C4E" />
      <path d="M5 8.5L7 10.5L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#3559E9" />
      <path d="M8 7V11M8 5H8.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2.5L14 13.5H2L8 2.5Z" fill="#E16614" />
      <path d="M8 7V9.5M8 11.5H8.01" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function FeatureIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="white" fillOpacity="0.25" />
      <path d="M8 5V9M8 11H8.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const icons: Record<ToastState, React.FC> = {
  error: ErrorIcon, success: SuccessIcon, information: InfoIcon, warning: WarningIcon, feature: FeatureIcon,
};

// ── Component ──────────────────────────────────────────

type ToastProps = {
  state?: ToastState;
  size?: ToastSize;
  title?: string;
  leadingIcon?: boolean;
  showAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
};

export default function Toast({
  state = 'error',
  size = 52,
  title = 'Insert your alert title here!',
  leadingIcon = true,
  showAction = true,
  actionLabel,
  onAction,
}: ToastProps) {
  const config = stateConfig[state];
  const Icon = icons[state];
  const isFeature = config.action === 'undo';
  const label = actionLabel ?? (isFeature ? 'Undo' : 'Okay');

  const btnPy = size === 52 ? 4 : 2;
  const btnPx = isFeature ? 0 : (size === 52 ? 6 : 12);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 361,
      height: size,
      padding: '0 12px',
      background: config.bg,
      borderRadius: radius[10],
      boxShadow: '0px 16px 32px -12px rgba(14,18,27,0.1)',
      fontFamily,
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Icon + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {leadingIcon && <Icon />}
        <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '19px', color: config.text, whiteSpace: 'nowrap' }}>
          {title}
        </span>
      </div>

      {/* Action */}
      {showAction && (
        <button
          onClick={onAction}
          style={{
            paddingTop: btnPy, paddingBottom: btnPy,
            paddingLeft: btnPx, paddingRight: btnPx,
            background: isFeature ? 'transparent' : colors.text.primary,
            border: 'none',
            borderRadius: isFeature ? 0 : radius[8],
            cursor: 'pointer',
            fontFamily,
            fontSize: 13,
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: '0.026px',
            color: '#fff',
            textDecoration: isFeature ? 'underline' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </button>
      )}
    </div>
  );
}
