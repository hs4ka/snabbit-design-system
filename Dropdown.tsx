import React, { useState, useRef, useEffect } from 'react';

// ── Types ──────────────────────────────────────────────────────────
export type DropdownSize = 'sm' | 'md';
export type DropdownItemVariant = 'none' | 'checkbox' | 'radio';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  avatar?: string; // image src, or '' for gray placeholder circle
  divider?: boolean; // show separator line after this item
}

type DropdownProps = {
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  size?: DropdownSize;
  itemVariant?: DropdownItemVariant;
  showChevronOnItems?: boolean;
  multiSelect?: boolean;
  footer?: { label: string; icon?: React.ReactNode; onClick?: () => void };
  width?: number | string;
};

// ── Inline icons ───────────────────────────────────────────────────
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      style={{ flexShrink: 0, transition: 'transform 0.18s', transform: open ? 'rotate(180deg)' : 'none' }}
    >
      <path d="M4 6L8 10L12 6" stroke="#828282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7.5 5L12.5 10L7.5 15" stroke="#ababab" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckboxIcon({ checked }: { checked: boolean }) {
  return (
    <div style={{ width: 20, height: 20, position: 'relative', flexShrink: 0 }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 16, height: 16, borderRadius: 4,
        background: checked ? '#f70f79' : '#f0f0f0',
      }} />
      {checked ? (
        <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
          width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 13, height: 13, borderRadius: 2.6, background: 'white',
        }} />
      )}
    </div>
  );
}

function RadioIcon({ selected }: { selected: boolean }) {
  return (
    <div style={{ width: 20, height: 20, position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '10%', borderRadius: '50%', background: selected ? '#f70f79' : '#f0f0f0' }} />
      <div style={{ position: 'absolute', inset: selected ? '30%' : '17.5%', borderRadius: '50%', background: 'white' }} />
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────
export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  size = 'sm',
  itemVariant = 'none',
  showChevronOnItems = false,
  multiSelect = false,
  footer,
  width = 'auto',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected: string[] = value === undefined
    ? []
    : Array.isArray(value) ? value : [value];

  const isSelected = (v: string) => selected.includes(v);

  const handleSelect = (v: string) => {
    if (!onChange) return;
    if (multiSelect) {
      const next = isSelected(v) ? selected.filter(s => s !== v) : [...selected, v];
      onChange(next);
    } else {
      onChange(v);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const triggerLabel = selected.length > 0
    ? options.filter(o => isSelected(o.value)).map(o => o.label).join(', ')
    : placeholder;

  const isSm = size === 'sm';

  return (
    <div ref={containerRef} style={{ position: 'relative', width, display: 'inline-block', boxSizing: 'border-box' }}>
      {/* ── Trigger ── */}
      <button
        onClick={() => setIsOpen(v => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
          padding: isSm ? '6px 8px' : '10px 16px',
          background: '#fafafa',
          border: 'none',
          borderRadius: isSm ? 8 : 12,
          cursor: 'pointer',
          fontFamily: '"Instrument Sans", sans-serif',
          fontSize: isSm ? 12 : 14,
          fontWeight: 500,
          color: selected.length > 0 ? '#303030' : '#ababab',
          textAlign: 'left',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {triggerLabel}
        </span>
        <ChevronDown open={isOpen} />
      </button>

      {/* ── Panel ── */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #ebebeb',
          borderRadius: 12,
          padding: 4,
          boxShadow: '0px 16px 32px -12px rgba(14,18,27,0.1)',
          zIndex: 1000,
          minWidth: isSm ? 200 : 240,
          boxSizing: 'border-box',
        }}>
          {options.map(opt => {
            const sel = isSelected(opt.value);
            return (
              <React.Fragment key={opt.value}>
                <button
                  onClick={() => handleSelect(opt.value)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: isSm ? 4 : 8,
                    padding: isSm ? '6px 8px' : '12px 16px',
                    background: sel ? (isSm ? '#fff3f8' : '#fafafa') : 'white',
                    border: 'none',
                    borderRadius: isSm ? 8 : 12,
                    cursor: 'pointer',
                    textAlign: 'left',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Left side */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: isSm ? 4 : 8, flex: 1, minWidth: 0 }}>
                    {opt.icon && (
                      <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', width: isSm ? 12 : 24, height: isSm ? 12 : 24 }}>
                        {opt.icon}
                      </span>
                    )}
                    {opt.avatar !== undefined && (
                      <div style={{ width: isSm ? 20 : 36, height: isSm ? 20 : 36, borderRadius: '50%', background: '#f0f0f0', flexShrink: 0, overflow: 'hidden' }}>
                        {opt.avatar && <img src={opt.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      </div>
                    )}
                    <span style={{
                      fontFamily: isSm ? '"Instrument Sans", sans-serif' : '"Outfit", sans-serif',
                      fontSize: isSm ? 12 : 16,
                      fontWeight: isSm ? 500 : 400,
                      letterSpacing: isSm ? 0 : 0.032,
                      color: '#303030',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {opt.label}
                    </span>
                  </div>

                  {/* Right side */}
                  {(itemVariant !== 'none' || showChevronOnItems) && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                      {itemVariant === 'checkbox' && <CheckboxIcon checked={sel} />}
                      {itemVariant === 'radio' && <RadioIcon selected={sel} />}
                      {showChevronOnItems && <ChevronRight />}
                    </div>
                  )}
                </button>
                {opt.divider && <div style={{ height: 1, background: '#ebebeb', margin: '1.5px 0' }} />}
              </React.Fragment>
            );
          })}

          {/* Footer action */}
          {footer && (
            <>
              <div style={{ height: 1, background: '#ebebeb', margin: '1.5px 0' }} />
              <button
                onClick={footer.onClick}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: isSm ? '4px 8px' : '8px 16px',
                  background: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  textAlign: 'left',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              >
                {footer.icon && (
                  <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', width: 16, height: 16 }}>
                    {footer.icon}
                  </span>
                )}
                <span style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: 12, fontWeight: 500, color: '#171717' }}>
                  {footer.label}
                </span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
