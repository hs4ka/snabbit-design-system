import React, { useState } from 'react';
import { colors, radius } from './tokens';

export type ToggleSize = 24 | 20 | 16;

// Exact pixel values from Figma node 162:7652
const sizes: Record<ToggleSize, {
  width: number; height: number;
  trackW: number; trackH: number;
  thumb: number; thumbTop: number;
  thumbOff: number; thumbOn: number;
}> = {
  24: { width: 40, height: 24, trackW: 33.6, trackH: 19.2, thumb: 14.4, thumbTop: 4.8, thumbOff: 5.8,  thumbOn: 20.2  },
  20: { width: 34, height: 20, trackW: 28,   trackH: 16,   thumb: 12,   thumbTop: 4,   thumbOff: 5.17, thumbOn: 17.17 },
  16: { width: 26, height: 16, trackW: 22.4, trackH: 12.8, thumb: 9.6,  thumbTop: 3.2, thumbOff: 3.53, thumbOn: 13.13 },
};

type ToggleProps = {
  size?: ToggleSize;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export default function Toggle({
  size = 20,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
}: ToggleProps) {
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
      role="switch"
      aria-checked={isOn}
      onClick={handleClick}
      style={{
        position: 'relative',
        width: s.width,
        height: s.height,
        cursor: disabled ? 'not-allowed' : 'pointer',
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {/* Track — inset from container */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: s.trackW,
        height: s.trackH,
        borderRadius: radius.full,
        background: isOn ? colors.accent.primary : colors.bg.tertiary,
        transition: 'background 0.2s',
      }} />

      {/* Thumb */}
      <div style={{
        position: 'absolute',
        top: s.thumbTop,
        left: isOn ? s.thumbOn : s.thumbOff,
        width: s.thumb,
        height: s.thumb,
        borderRadius: radius.full,
        background: '#fff',
        boxShadow: '0px 1px 4px rgba(0,0,0,0.22), 0px 0.5px 1px rgba(0,0,0,0.08)',
        transition: 'left 0.2s',
      }}>
        {/* Inner dot — same color as track, creating a ring effect */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: s.thumb / 3,
          height: s.thumb / 3,
          borderRadius: radius.full,
          background: isOn ? colors.accent.primary : colors.bg.tertiary,
        }} />
      </div>
    </div>
  );
}
