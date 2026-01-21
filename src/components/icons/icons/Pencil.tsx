import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize, iconStrokeWidth } from '../../../tokens/icons';

export const PencilIcon: React.FC<BaseIconProps> = ({
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
      d="M12.75 2.25L15.75 5.25L5.25 15.75H2.25V12.75L12.75 2.25Z"
      stroke={color}
      strokeWidth={iconStrokeWidth[size]}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PencilIcon;
