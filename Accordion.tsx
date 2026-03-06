import React, { useState } from 'react';
import { colors, typeStyles, radius, fontFamily } from './tokens';

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M4.5 2.5L9 6.5L4.5 10.5" stroke="#F70F79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type AccordionProps = {
  title?: string;
  body?: string;
  icon?: React.ReactNode;
  cta?: { label: string; onClick?: () => void };
  defaultOpen?: boolean;
};

export default function Accordion({
  title = "How can I make a booking?",
  body = "Just select a service, pick when you want it, add your details, and tap Confirm.",
  icon,
  cta,
  defaultOpen = false,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        background: colors.bg.primary,
        border: `1px solid ${colors.stroke.secondary}`,
        borderRadius: radius[16],
        cursor: 'pointer',
        fontFamily,
        userSelect: 'none',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {icon && (
          <div style={{ width: 20, height: 20, flexShrink: 0, color: colors.text.primary }}>
            {icon}
          </div>
        )}
        <span style={{
          flex: 1,
          fontWeight: typeStyles.semibold14.fontWeight,
          fontSize: typeStyles.semibold14.fontSize,
          lineHeight: `${typeStyles.semibold14.lineHeight}px`,
          color: colors.text.primary,
        }}>
          {title}
        </span>
        <div style={{
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s ease',
          flexShrink: 0,
          display: 'flex',
        }}>
          <ChevronDown />
        </div>
      </div>

      {/* Expanded body */}
      {open && (
        <>
          <div style={{ height: 1, background: colors.stroke.secondary, margin: '12px 0' }} />
          <p style={{
            fontWeight: typeStyles.medium12.fontWeight,
            fontSize: typeStyles.medium12.fontSize,
            lineHeight: `${typeStyles.medium12.lineHeight}px`,
            color: colors.text.secondary,
            margin: 0,
          }}>
            {body}
          </p>
          {cta && (
            <button
              onClick={(e) => { e.stopPropagation(); cta.onClick?.(); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                marginTop: 12,
                padding: '10px 12px',
                background: colors.accent.light,
                borderRadius: radius[8],
                border: 'none',
                cursor: 'pointer',
                fontFamily,
              }}
            >
              <span style={{
                fontWeight: typeStyles.semibold13.fontWeight,
                fontSize: typeStyles.semibold13.fontSize,
                lineHeight: '12px',
                color: colors.accent.primary,
                whiteSpace: 'nowrap',
              }}>
                {cta.label}
              </span>
              <ChevronRight />
            </button>
          )}
        </>
      )}
    </div>
  );
}
