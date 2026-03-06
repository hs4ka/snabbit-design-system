import React from 'react';
import { colors, radius, fontFamily } from './tokens';

export type OfferToastState = 'offer' | 'coupon' | 'recharge';
export type OfferToastSize = 64 | 40;

// Asset paths — update to match your project's asset resolution
const ICONS: Record<OfferToastState, string> = {
  offer:    'assets/offer-icon.png',
  coupon:   'assets/coupon-icon.png',
  recharge: 'assets/recharge-icon.png',
};

// ── State config ──────────────────────────────────────

const stateConfig = {
  offer: {
    bg: 'linear-gradient(90deg, #deffd6 26.794%, #c0f9ba 79.537%)',
    border: '1px solid rgba(23,140,78,0.1)',
    amountColor: colors.status.green.dark,
    defaultAmount: '₹1000',
    defaultSubtitle: 'You got this booking for free',
  },
  coupon: {
    bg: '#ebfff4',
    border: `1px solid ${colors.status.green.light}`,
    labelColor: colors.status.green.dark,
    defaultLabel: 'Coupon Applied',
    defaultTitle: 'Add ₹200 and get ₹100 extra',
  },
  recharge: {
    bg: 'linear-gradient(90deg, #fff0f6 26.794%, #ffdfec 79.537%)',
    border: '1px solid rgba(247,15,121,0.1)',
    amountColor: colors.accent.primary,
    defaultAmount: '₹500',
  },
} as const;

// ── Component ──────────────────────────────────────────

type OfferToastProps = {
  state?: OfferToastState;
  size?: OfferToastSize;
  amount?: string;
  title?: string;
  subtitle?: string;
  label?: string;
};

export default function OfferToast({
  state = 'offer',
  size = 64,
  amount,
  title,
  subtitle,
  label,
}: OfferToastProps) {
  const cfg = stateConfig[state];
  const iconSize = size === 64 ? 40 : 24;

  const resolvedAmount = amount ?? (state === 'recharge' ? '₹500' : '₹1000');

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: 353,
      height: size,
      padding: size === 64 ? '12px 16px' : '0 12px',
      background: cfg.bg,
      border: cfg.border,
      borderRadius: size === 64 ? radius[16] : radius[10],
      overflow: 'hidden',
      fontFamily,
      position: 'relative',
      flexShrink: 0,
    }}>
      <img src={ICONS[state]} width={iconSize} height={iconSize} alt={state} style={{ flexShrink: 0 }} />

      {state === 'offer' && (
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, lineHeight: '19px', color: colors.text.primary, letterSpacing: '0.02px' }}>
            {'Congrats, '}
            <span style={{ color: stateConfig.offer.amountColor }}>{resolvedAmount}</span>
            {' added to your wallet'}
          </div>
          {size === 64 && (
            <div style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: colors.text.primary, marginTop: 2 }}>
              {subtitle ?? stateConfig.offer.defaultSubtitle}
            </div>
          )}
        </div>
      )}

      {state === 'coupon' && (
        <div>
          {size === 64 && (
            <div style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: stateConfig.coupon.labelColor, marginBottom: 2 }}>
              {label ?? stateConfig.coupon.defaultLabel}
            </div>
          )}
          <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '19px', color: colors.text.primary }}>
            {title ?? stateConfig.coupon.defaultTitle}
          </div>
        </div>
      )}

      {state === 'recharge' && (
        <div style={{ fontSize: 14, fontWeight: 600, lineHeight: '19px', color: colors.text.primary }}>
          <span style={{ color: stateConfig.recharge.amountColor }}>{resolvedAmount}</span>
          {' added to your wallet'}
        </div>
      )}
    </div>
  );
}
