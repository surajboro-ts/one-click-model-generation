import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize } from '../../../tokens/icons';

export const LiveboardIcon: React.FC<BaseIconProps> = ({
  size = 'm',
  color = 'currentColor',
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}) => (
  <svg
    width={iconSize[size]}
    height={iconSize[size]}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={ariaLabel}
    aria-hidden={ariaHidden}
    role={ariaLabel ? 'img' : undefined}
  >
    <rect x="1.5" y="1.5" width="6" height="6" rx="1" fill={color} />
    <rect x="10.5" y="1.5" width="6" height="6" rx="1" fill={color} />
    <rect x="1.5" y="10.5" width="6" height="6" rx="1" fill={color} />
    <rect x="10.5" y="10.5" width="6" height="6" rx="1" fill={color} />
  </svg>
);

export default LiveboardIcon;
