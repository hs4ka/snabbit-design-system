import React, { useState } from 'react';
import { colors } from './tokens';

export type CheckboxSize = 16 | 20 | 24;

// Checkmark assets per size (Figma node 162:7640 / 192:10129 / 192:10151)
const CHECK_ICONS: Record<CheckboxSize, string> = {
  16: 'assets/checkbox-check-16.svg',
  20: 'assets/checkbox-check-20.svg',
  24: 'assets/checkbox-check-24.svg',
};

// Exact pixel values from Figma node 162:7639
const sizes: Record<CheckboxSize, {
  container: number;
  bg: number; bgRadius: number;
  box: number; boxRadius: number;
}> = {
  16: { container: 16, bg: 12.8, bgRadius: 3.2,  box: 10.4, boxRadius: 2.08 },
  20: { container: 20, bg: 16,   bgRadius: 4,    box: 13,   boxRadius: 2.6  },
  24: { container: 24, bg: 19.2, bgRadius: 4.8,  box: 15.6, boxRadius: 3.12 },
};


type CheckboxProps = {
  size?: CheckboxSize;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export default function Checkbox({
  size = 16,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
}: CheckboxProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internal;
  const s = sizes[size];

  const handleClick = () => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <div
      role="checkbox"
      aria-checked={isOn}
      onClick={handleClick}
      style={{
        position: 'relative',
        width: s.container,
        height: s.container,
        cursor: disabled ? 'not-allowed' : 'pointer',
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
        overflow: 'hidden',
      }}
    >
      {/* Background square — inset from container */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: s.bg,
        height: s.bg,
        borderRadius: s.bgRadius,
        background: isOn ? colors.accent.primary : colors.bg.tertiary,
        transition: 'background 0.15s',
      }} />

      {/* Default state: white inner box (hollow border effect) */}
      {!isOn && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: s.box,
          height: s.box,
          borderRadius: s.boxRadius,
          background: '#fff',
        }} />
      )}

      {/* Selected state: checkmark image */}
      {isOn && (
        <div style={{
          position: 'absolute',
          top: '34.84%',
          left: '27.34%',
          right: '27.35%',
          bottom: '32.2%',
        }}>
          <img
            src={CHECK_ICONS[size]}
            alt=""
            style={{ position: 'absolute', display: 'block', width: '100%', height: '100%', maxWidth: 'none' }}
          />
        </div>
      )}
    </div>
  );
}
