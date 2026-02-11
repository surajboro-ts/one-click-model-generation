import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize } from '../../../tokens/icons';

export const SpotterIcon: React.FC<BaseIconProps> = ({
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
    <path
      d="M9 1.5L10.2 5.1L14.1 5.1L11 7.35L12.15 11.1L9 8.7L5.85 11.1L7 7.35L3.9 5.1L7.8 5.1L9 1.5Z"
      fill={color}
    />
    <path
      d="M4.5 13.5C4.5 13.5 6 12 9 12C12 12 13.5 13.5 13.5 13.5"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <circle cx="9" cy="15" r="1.5" fill={color} />
  </svg>
);

export default SpotterIcon;
