import React, { useState } from 'react';

export type TextFieldSize = 36 | 48 | 56;

const FONT = "'Outfit', sans-serif";

// Exact pixel values from Figma node 14:4706
const sizeConfig: Record<TextFieldSize, {
  height: number; borderRadius: number;
  fontSize: number; lineHeight: string;
  flagW: number; flagH: number; flagRadius: number;
}> = {
  56: { height: 56, borderRadius: 12, fontSize: 16, lineHeight: '24px', flagW: 22.4, flagH: 16, flagRadius: 1.6 },
  48: { height: 48, borderRadius: 12, fontSize: 16, lineHeight: '24px', flagW: 22.4, flagH: 16, flagRadius: 1.6 },
  36: { height: 36, borderRadius: 8,  fontSize: 12, lineHeight: '16px', flagW: 19.6, flagH: 14, flagRadius: 1.4 },
};

// ── Icons ──────────────────────────────────────────────

function ChevronDownIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 7L8 10.5L11.5 7" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8C2 8 4 4 8 4s6 4 6 4-2 4-6 4-6-4-6-4z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.8" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

function InfoIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="6" cy="6" r="5.5" stroke={color} />
      <rect x="5.4" y="5" width="1.2" height="3.5" rx="0.6" fill={color} />
      <circle cx="6" cy="3.75" r="0.65" fill={color} />
    </svg>
  );
}

// ── Component ──────────────────────────────────────────

type TextFieldProps = {
  size?: TextFieldSize;
  label?: string;
  placeholder?: string;
  hint?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  showFlag?: boolean;
  showChevron?: boolean;
  showEyeIcon?: boolean;
  showEdit?: boolean;
};

export default function TextField({
  size = 56,
  label = 'Label Text',
  placeholder = 'Enter details',
  hint,
  value,
  defaultValue = '',
  onChange,
  error = false,
  showFlag = false,
  showChevron = true,
  showEyeIcon = false,
  showEdit = false,
}: TextFieldProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const s = sizeConfig[size];

  const isFilled = currentValue.length > 0;
  const showLabel = focused || isFilled || error;

  const borderColor = error ? '#fb3748' : focused ? '#f70f79' : '#ababab';
  const labelColor  = error ? '#fb3748' : focused ? '#f70f79' : '#ababab';
  const textColor   = error ? '#fb3748' : (focused || isFilled) ? '#303030' : '#ababab';
  const hintColor   = error ? '#fb3748' : focused ? '#f70f79' : isFilled ? '#828282' : '#ababab';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 361, fontFamily: FONT }}>
      <div style={{ position: 'relative' }}>

        {/* Floating label */}
        {showLabel && (
          <div style={{
            position: 'absolute',
            top: -8.2,
            left: 14.8,
            background: '#fff',
            padding: '0 4px',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 10, fontWeight: 400, lineHeight: '12px', color: labelColor, whiteSpace: 'nowrap' }}>
              {label}
            </span>
          </div>
        )}

        {/* Field box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: s.height,
          padding: '0 16px',
          background: '#fff',
          border: `1.2px solid ${borderColor}`,
          borderRadius: s.borderRadius,
          boxSizing: 'border-box',
          gap: 8,
          transition: 'border-color 0.15s',
        }}>
          {/* Left: optional flag + input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
            {showFlag && (
              <div style={{
                width: s.flagW, height: s.flagH,
                borderRadius: s.flagRadius,
                overflow: 'hidden',
                background: '#f0f0f0',
                flexShrink: 0,
              }}>
                <img src="assets/flag-in.svg" alt="IN" style={{ width: '100%', height: '100%', display: 'block' }} />
              </div>
            )}
            <input
              value={currentValue}
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: FONT,
                fontSize: s.fontSize,
                fontWeight: 500,
                lineHeight: s.lineHeight,
                color: textColor,
                minWidth: 0,
              }}
            />
          </div>

          {/* Right: optional actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            {showChevron && <ChevronDownIcon color="#ababab" />}
            {showEyeIcon && <EyeIcon color="#ababab" />}
            {showEdit && (
              <span style={{
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 500,
                lineHeight: '16px',
                color: '#f70f79',
                letterSpacing: '0.48px',
                textTransform: 'uppercase',
              }}>EDIT</span>
            )}
          </div>
        </div>
      </div>

      {/* Hint text */}
      {hint && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, paddingLeft: 16 }}>
          <InfoIcon color={hintColor} />
          <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 400, lineHeight: '12px', color: hintColor }}>
            {hint}
          </span>
        </div>
      )}
    </div>
  );
}
