import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize } from '../../../tokens/icons';

export const AnswerIcon: React.FC<BaseIconProps> = ({
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
    <rect x="1.5" y="1.5" width="15" height="15" rx="3" stroke={color} strokeWidth="1.25" />
    <path
      d="M4.5 12L6.5 8.5L8.5 10L10.5 6L13.5 12"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AnswerIcon;
