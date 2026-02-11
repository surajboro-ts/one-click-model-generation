import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize, iconStrokeWidth } from '../../../tokens/icons';

export const CollectionIcon: React.FC<BaseIconProps> = ({
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
    <rect x="3" y="5.25" width="12" height="11.25" rx="1.5" stroke={color} strokeWidth={iconStrokeWidth[size]} />
    <path
      d="M5.25 5.25V3.75C5.25 2.92157 5.92157 2.25 6.75 2.25H11.25C12.0784 2.25 12.75 2.92157 12.75 3.75V5.25"
      stroke={color}
      strokeWidth={iconStrokeWidth[size]}
    />
    <line x1="6" y1="9" x2="12" y2="9" stroke={color} strokeWidth={iconStrokeWidth[size]} strokeLinecap="round" />
    <line x1="6" y1="12" x2="10.5" y2="12" stroke={color} strokeWidth={iconStrokeWidth[size]} strokeLinecap="round" />
  </svg>
);

export default CollectionIcon;
