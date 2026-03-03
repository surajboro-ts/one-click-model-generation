import React, { useState } from 'react';
import { systemColors } from '../../../tokens/colors';
import { Icon } from '../../../components';
import type { IconName } from '../../../components/icons/Icon.types';

/**
 * Icon-only button for MuseChat prototype.
 * Raw <button> is used because the Radiant Button component requires
 * text children and applies unwanted text styling for icon-only triggers.
 */

type IconButtonSize = 'sm' | 'md';

interface IconButtonProps {
  icon: IconName;
  'aria-label': string;
  size?: IconButtonSize;
  onClick?: () => void;
}

const SIZE_MAP: Record<IconButtonSize, { box: number; iconSize: 'xs' | 's' }> = {
  sm: { box: 24, iconSize: 'xs' },
  md: { box: 28, iconSize: 's' },
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  'aria-label': ariaLabel,
  size = 'md',
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const dims = SIZE_MAP[size];

  const style: React.CSSProperties = {
    width: dims.box,
    height: dims.box,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: hovered
      ? systemColors.light['background-ghost-hover']
      : 'transparent',
    cursor: 'pointer',
    borderRadius: 6,
    color: systemColors.light['content-secondary'],
    padding: 0,
    transition: 'background-color 150ms ease',
  };

  return (
    <button
      style={style}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon name={icon} size={dims.iconSize} />
    </button>
  );
};

export default IconButton;
