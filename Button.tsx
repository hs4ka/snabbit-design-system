import React, { useState } from 'react';
import { colors, radius, fontFamily } from './tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'neutral' | 'stroke' | 'link' | 'destructive';
export type ButtonSize = 56 | 48 | 40 | 36 | 32 | 28 | 24;

// ── Icons ──────────────────────────────────────────────

export function ChevronLeft({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRight({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Size tokens ────────────────────────────────────────
// py * 2 + lineHeight = button height
// Border radii: 16px for 56, 12px for 48–36, 8px for 32–24

const sizes: Record<ButtonSize, {
  py: number; px: number; fontSize: number; lineHeight: number; borderRadius: number; iconSize: number;
}> = {
  56: { py: 18, px: 24, fontSize: 16, lineHeight: 20, borderRadius: radius[16], iconSize: 20 },
  48: { py: 14, px: 24, fontSize: 16, lineHeight: 20, borderRadius: radius[12], iconSize: 20 },
  40: { py: 10, px: 12, fontSize: 14, lineHeight: 20, borderRadius: radius[12], iconSize: 20 },
  36: { py: 8,  px: 12, fontSize: 14, lineHeight: 20, borderRadius: radius[12], iconSize: 20 },
  32: { py: 6,  px: 8,  fontSize: 13, lineHeight: 20, borderRadius: radius[8],  iconSize: 20 },
  28: { py: 4,  px: 8,  fontSize: 13, lineHeight: 20, borderRadius: radius[8],  iconSize: 16 },
  24: { py: 2,  px: 8,  fontSize: 12, lineHeight: 16, borderRadius: radius[8],  iconSize: 16 },
};

// ── Variant tokens ─────────────────────────────────────

const variants: Record<ButtonVariant, {
  bg: string; text: string; border: string; hoverBg: string; underline?: boolean;
}> = {
  primary:     { bg: colors.accent.primary,  text: '#fff',                border: 'none',                                   hoverBg: '#d80c6a'               },
  secondary:   { bg: colors.accent.light,    text: colors.accent.primary,  border: 'none',                                   hoverBg: '#fde3f0'               },
  neutral:     { bg: colors.text.primary,    text: '#fff',                 border: 'none',                                   hoverBg: '#444444'               },
  stroke:      { bg: 'transparent',          text: colors.text.primary,    border: `1.5px solid ${colors.stroke.secondary}`,  hoverBg: colors.bg.tertiary     },
  link:        { bg: 'transparent',          text: colors.accent.primary,  border: 'none',                                   hoverBg: 'transparent', underline: true },
  destructive: { bg: colors.status.red.dark, text: '#fff',                 border: 'none',                                   hoverBg: '#c42a38'               },
};

// ── Component ──────────────────────────────────────────

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
};

export default function Button({
  variant = 'primary',
  size = 48,
  leadingIcon,
  trailingIcon,
  children = 'Button',
  disabled,
  style,
  ...props
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const s = sizes[size];
  const v = variants[variant];

  const bg        = disabled ? (variant === 'link' ? 'transparent' : colors.bg.tertiary) : hovered ? v.hoverBg : v.bg;
  const textColor = disabled ? colors.text.tertiary : v.text;
  const border    = disabled ? `1.5px solid ${colors.bg.tertiary}` : v.border;

  return (
    <button
      {...props}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingTop: s.py,
        paddingBottom: s.py,
        paddingLeft: s.px,
        paddingRight: s.px,
        background: bg,
        color: textColor,
        border,
        borderRadius: s.borderRadius,
        fontFamily,
        fontSize: s.fontSize,
        fontWeight: 600,
        lineHeight: `${s.lineHeight}px`,
        letterSpacing: '0.002em',
        textDecoration: v.underline && !hovered ? 'underline' : 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap',
        transition: 'background 0.15s, color 0.15s',
        ...style,
      }}
    >
      {leadingIcon !== undefined && (
        <span style={{ display: 'flex', alignItems: 'center', width: s.iconSize, height: s.iconSize, flexShrink: 0 }}>
          {leadingIcon}
        </span>
      )}
      {children}
      {trailingIcon !== undefined && (
        <span style={{ display: 'flex', alignItems: 'center', width: s.iconSize, height: s.iconSize, flexShrink: 0 }}>
          {trailingIcon}
        </span>
      )}
    </button>
  );
}
