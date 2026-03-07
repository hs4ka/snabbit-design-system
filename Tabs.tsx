import React, { useState } from 'react';

const FONT = "'Outfit', sans-serif";

export type TabVariant = 'text' | 'icon';
export type TabItem = { id: string; label: string; icon?: React.ReactNode };

// ── Default tab sets ──────────────────────────────────

export const TEXT_TABS: TabItem[] = [
  { id: 'bookings',  label: 'Bookings' },
  { id: 'account',   label: 'Account' },
  { id: 'payments',  label: 'Payments' },
  { id: 'feedback',  label: 'Feedback' },
  { id: 'safety',    label: 'Safety' },
];

// ── Component ─────────────────────────────────────────

type TabsProps = {
  variant?: TabVariant;
  tabs?: TabItem[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (tab: string) => void;
};

export default function Tabs({
  variant = 'text',
  tabs,
  activeTab,
  defaultTab,
  onChange,
}: TabsProps) {
  const items = tabs ?? TEXT_TABS;
  const [internal, setInternal] = useState<string>(defaultTab ?? items[0]?.id ?? '');
  const isControlled = activeTab !== undefined;
  const active = isControlled ? activeTab : internal;
  const isIcon = variant === 'icon';

  const handleClick = (id: string) => {
    if (!isControlled) setInternal(id);
    onChange?.(id);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: isIcon ? 393 : 361,
      padding: isIcon ? '0 16px' : 0,
      borderBottom: '1px solid #f0f0f0',
      fontFamily: FONT,
    }}>
      {items.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isIcon ? 4 : 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
              ...(isIcon ? { width: 64 } : {}),
            }}
          >
            {/* Icon circle — icon variant only */}
            {isIcon && (
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {tab.icon}
                </div>
              </div>
            )}

            {/* Label + indicator */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%' }}>
              <span style={{
                fontSize: isIcon ? 14 : 12,
                fontWeight: 500,
                lineHeight: isIcon ? '20px' : '16px',
                color: isActive ? '#f70f79' : '#828282',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}>
                {tab.label}
              </span>
              <div style={{
                height: 4,
                width: '100%',
                borderRadius: 2,
                background: isActive ? '#f70f79' : 'transparent',
                transition: 'background 0.15s',
              }} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
