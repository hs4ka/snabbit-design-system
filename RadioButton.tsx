import React, { useState } from 'react';

export type RadioSize = 16 | 20 | 24;

type RadioButtonProps = {
  size?: RadioSize;
  selected?: boolean;
  defaultSelected?: boolean;
  onChange?: (selected: boolean) => void;
  disabled?: boolean;
};

export default function RadioButton({
  size = 16,
  selected,
  defaultSelected = false,
  onChange,
  disabled = false,
}: RadioButtonProps) {
  const [internal, setInternal] = useState(defaultSelected);
  const isControlled = selected !== undefined;
  const isOn = isControlled ? selected : internal;

  const handleClick = () => {
    if (disabled || isOn) return;
    if (!isControlled) setInternal(true);
    onChange?.(true);
  };

  // From Figma node 162:7626:
  // bg layer — inset 10%, full circle
  //   Default / Disabled / Disabled Selected: #f0f0f0
  //   Selected (enabled):                    #f70f79
  // box layer — white inner circle
  //   Default:                   inset 17.5% (thin border ring visual)
  //   Selected / Disabled Sel.:  inset 30%   (center dot visual)
  //   Disabled (unselected):     hidden

  const bgColor = isOn && !disabled ? '#f70f79' : '#f0f0f0';
  const showBox = !disabled || isOn;
  const boxInset = isOn ? '30%' : '17.5%';

  return (
    <div
      role="radio"
      aria-checked={isOn}
      onClick={handleClick}
      style={{
        position: 'relative',
        width: size,
        height: size,
        cursor: disabled ? 'not-allowed' : 'pointer',
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {/* Colored ring / fill */}
      <div style={{
        position: 'absolute',
        inset: '10%',
        borderRadius: '50%',
        background: bgColor,
        transition: 'background 0.15s',
      }} />

      {/* White center — creates the ring / dot visual */}
      {showBox && (
        <div style={{
          position: 'absolute',
          inset: boxInset,
          borderRadius: '50%',
          background: '#fff',
          transition: 'inset 0.15s',
        }} />
      )}
    </div>
  );
}
