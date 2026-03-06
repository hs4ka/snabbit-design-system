import React from 'react';

const FONT = "'Outfit', sans-serif";

export type BannerVariant = 'inline-link' | 'primary-cta' | 'promo' | 'warning-cta' | 'inline-cta';

type BannerProps = {
  variant?: BannerVariant;
  cta?: boolean;
  leftIcon?: boolean;
  onClose?: () => void;
};

function CloseBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 1L13 13M13 1L1 13" stroke="#ababab" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function IconCircle() {
  return (
    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <img src="assets/banner-icon.svg" alt="" style={{ width: 24, height: 24 }} />
    </div>
  );
}

function WarningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M12 2L2 20H22L12 2Z" fill="#F9A825" />
      <line x1="12" y1="9" x2="12" y2="13.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="white" />
    </svg>
  );
}

const cardBase: React.CSSProperties = {
  width: 361, borderRadius: 12, fontFamily: FONT, boxSizing: 'border-box',
};
const whiteBorder: React.CSSProperties = {
  ...cardBase, background: '#fff', border: '1px solid #f0f0f0',
};
const btnPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  padding: '8px 12px', background: '#f70f79', border: 'none', borderRadius: 10,
  cursor: 'pointer', fontFamily: FONT, fontSize: 14, fontWeight: 600,
  color: '#fff', lineHeight: '20px',
};

export default function Banner({ variant = 'inline-link', cta = true, leftIcon = true, onClose }: BannerProps) {

  if (variant === 'promo') {
    return (
      <div style={{ ...cardBase, background: '#a0e934', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
        <p style={{ fontSize: 14, lineHeight: '18px', color: '#303030', fontWeight: 400, maxWidth: 285 }}>
          {'Get up to 12K off on every Snabbit booking, '}
          <span style={{ fontWeight: 500 }}>including this one!</span>
        </p>
        <div style={{ width: 24, height: 24, borderRadius: 30, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="13" height="11" viewBox="0 0 13.0667 10.7333" fill="none">
            <path d="M0.7 5.37L10.7 5.37" stroke="#303030" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.7 0.7L12.37 5.37L7.7 10.03" stroke="#303030" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'inline-link') {
    return (
      <div style={{ ...whiteBorder, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1, minWidth: 0 }}>
          {leftIcon && <IconCircle />}
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 14, lineHeight: '18px', color: '#ababab', fontWeight: 400 }}>
              {"Find deals with Klarna's price comparison "}
            </span>
            {cta && (
              <span style={{ fontSize: 14, lineHeight: '18px', color: '#f70f79', fontWeight: 600 }}>
                Status Privacy
              </span>
            )}
          </div>
        </div>
        <CloseBtn onClick={onClose} />
      </div>
    );
  }

  if (variant === 'primary-cta') {
    return (
      <div style={{ ...whiteBorder, display: 'flex', flexDirection: 'column', gap: 20, padding: 12 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1, minWidth: 0 }}>
            {leftIcon && <IconCircle />}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ fontSize: 16, fontWeight: 500, lineHeight: '20px', color: '#303030', letterSpacing: '0.032px' }}>
                Compare prices. Save money
              </p>
              <p style={{ fontSize: 14, fontWeight: 400, lineHeight: '16px', color: '#ababab' }}>
                Achieve your results faster
              </p>
            </div>
          </div>
          <CloseBtn onClick={onClose} />
        </div>
        {cta && (
          <button style={{ ...btnPrimary, width: '100%' }}>
            Primary Button
          </button>
        )}
      </div>
    );
  }

  if (variant === 'warning-cta') {
    return (
      <div style={{ ...whiteBorder, display: 'flex', flexDirection: 'column', padding: '16px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: cta ? 16 : 0 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
            {leftIcon && <WarningIcon />}
            <p style={{ fontSize: 16, fontWeight: 500, lineHeight: '20px', color: '#303030', letterSpacing: '0.032px', flex: 1 }}>
              We think you may have entered an invalid apartment or suite number. Please check and correct if needed.
            </p>
          </div>
          <CloseBtn onClick={onClose} />
        </div>
        {cta && (
          <button style={{ ...btnPrimary, alignSelf: 'flex-start' }}>
            Edit Address
          </button>
        )}
      </div>
    );
  }

  // inline-cta
  return (
    <div style={{ ...whiteBorder, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: 12 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
        {leftIcon && <IconCircle />}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 16, fontWeight: 500, lineHeight: '20px', color: '#303030', letterSpacing: '0.032px' }}>
            We think you may have entered an invalid apartment or suite number.
          </p>
          {cta && (
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 0', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FONT, fontSize: 14, fontWeight: 600, color: '#f70f79', lineHeight: '20px', alignSelf: 'flex-start' }}>
              Activate Now
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <CloseBtn onClick={onClose} />
    </div>
  );
}
