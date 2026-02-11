import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize, iconStrokeWidth } from '../../../tokens/icons';

export const NavigateIcon: React.FC<BaseIconProps> = ({
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
      d="M16.5 1.5L8.25 9.75M16.5 1.5L11.25 16.5L8.25 9.75M16.5 1.5L1.5 6.75L8.25 9.75"
      stroke={color}
      strokeWidth={iconStrokeWidth[size]}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default NavigateIcon;
