import React from 'react';

const FONT = "'Outfit', sans-serif";

export type ButtonVariant = 'primary' | 'secondary' | 'neutral' | 'stroke' | 'link' | 'destructive';
export type ButtonSize = 56 | 48 | 40 | 36 | 32 | 28 | 24;
export type ButtonStyle = 'normal' | 'icon-only';

// ── Icons ────────────────────────────────────────────────

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

// ── Size tokens ──────────────────────────────────────────

const SIZE_CONFIG: Record<ButtonSize, {
  paddingH: number; paddingV: number; radius: number;
  iconSize: number; fontSize: number; lineHeight: number; gap: number;
}> = {
  56: { paddingH: 20, paddingV: 16, radius: 16, iconSize: 20, fontSize: 16, lineHeight: 24, gap: 8 },
  48: { paddingH: 20, paddingV: 12, radius: 16, iconSize: 20, fontSize: 16, lineHeight: 24, gap: 8 },
  40: { paddingH: 16, paddingV: 10, radius: 12, iconSize: 20, fontSize: 14, lineHeight: 20, gap: 8 },
  36: { paddingH: 12, paddingV:  8, radius: 10, iconSize: 16, fontSize: 14, lineHeight: 20, gap: 8 },
  32: { paddingH:  8, paddingV:  6, radius:  8, iconSize: 16, fontSize: 14, lineHeight: 20, gap: 8 },
  28: { paddingH:  8, paddingV:  6, radius:  8, iconSize: 16, fontSize: 12, lineHeight: 16, gap: 8 },
  24: { paddingH:  6, paddingV:  4, radius:  8, iconSize: 14, fontSize: 12, lineHeight: 16, gap: 6 },
};

// ── Variant tokens ───────────────────────────────────────

const VARIANT_CONFIG: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary:     { bg: '#f70f79',  text: '#ffffff' },
  secondary:   { bg: '#f0f0f0',  text: '#303030' },
  neutral:     { bg: '#303030',  text: '#ffffff' },
  stroke:      { bg: 'transparent', text: '#303030', border: '1.5px solid #f0f0f0' },
  link:        { bg: 'transparent', text: '#f70f79' },
  destructive: { bg: '#e93544',  text: '#ffffff' },
};

// ── Component ────────────────────────────────────────────

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  buttonStyle?: ButtonStyle;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  icon?: React.ReactNode;
};

export default function Button({
  variant = 'primary',
  size = 48,
  buttonStyle = 'normal',
  leadingIcon,
  trailingIcon,
  icon,
  children = 'Button',
  disabled,
  style,
  ...props
}: ButtonProps) {
  const s = SIZE_CONFIG[size];
  const v = VARIANT_CONFIG[variant];

  const isIconOnly = buttonStyle === 'icon-only';
  const iconPad = isIconOnly ? (size - s.iconSize) / 2 : undefined;

  const bg        = disabled ? (variant === 'link' ? 'transparent' : '#f5f5f5') : v.bg;
  const textColor = disabled ? '#ababab' : v.text;
  const border    = disabled && variant !== 'link' ? '1.5px solid #f0f0f0' : (v.border ?? 'none');

  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        paddingTop:    isIconOnly ? iconPad : s.paddingV,
        paddingBottom: isIconOnly ? iconPad : s.paddingV,
        paddingLeft:   isIconOnly ? iconPad : s.paddingH,
        paddingRight:  isIconOnly ? iconPad : s.paddingH,
        background: bg,
        color: textColor,
        border,
        borderRadius: s.radius,
        fontFamily: FONT,
        fontSize: s.fontSize,
        fontWeight: 600,
        lineHeight: `${s.lineHeight}px`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {isIconOnly ? (
        <span style={{ display: 'flex', alignItems: 'center', width: s.iconSize, height: s.iconSize }}>
          {icon ?? <ChevronRight size={s.iconSize} />}
        </span>
      ) : (
        <>
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
        </>
      )}
    </button>
  );
}
