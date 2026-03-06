import React, { useState } from 'react';

const FONT = "'Outfit', sans-serif";

export type TabId = 'bookings' | 'account' | 'payments' | 'feedback' | 'safety';

export const TABS: { id: TabId; label: string }[] = [
  { id: 'bookings',  label: 'Bookings' },
  { id: 'account',   label: 'Account' },
  { id: 'payments',  label: 'Payments' },
  { id: 'feedback',  label: 'Feedback' },
  { id: 'safety',    label: 'Safety' },
];

// ── Component ─────────────────────────────────────────

type TabsProps = {
  activeTab?: TabId;
  defaultTab?: TabId;
  onChange?: (tab: TabId) => void;
};

export default function Tabs({
  activeTab,
  defaultTab = 'bookings',
  onChange,
}: TabsProps) {
  const [internal, setInternal] = useState<TabId>(defaultTab);
  const isControlled = activeTab !== undefined;
  const active = isControlled ? activeTab : internal;

  const handleClick = (tab: TabId) => {
    if (!isControlled) setInternal(tab);
    onChange?.(tab);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 361,
      borderBottom: '1px solid #f0f0f0',
      fontFamily: FONT,
    }}>
      {TABS.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span style={{
              fontSize: 12,
              fontWeight: 500,
              lineHeight: '16px',
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
          </button>
        );
      })}
    </div>
  );
}
