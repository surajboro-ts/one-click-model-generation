import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize, iconStrokeWidth } from '../../../tokens/icons';

export const SaveWorksheetIcon: React.FC<BaseIconProps> = ({
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
      d="M15 6.75V14.25C15 15.0784 14.3284 15.75 13.5 15.75H4.5C3.67157 15.75 3 15.0784 3 14.25V3.75C3 2.92157 3.67157 2.25 4.5 2.25H10.5L15 6.75Z"
      stroke={color}
      strokeWidth={iconStrokeWidth[size]}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 2.25V6.75H15"
      stroke={color}
      strokeWidth={iconStrokeWidth[size]}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="6" y1="10.5" x2="12" y2="10.5" stroke={color} strokeWidth={iconStrokeWidth[size]} strokeLinecap="round" />
    <line x1="6" y1="13.5" x2="9.75" y2="13.5" stroke={color} strokeWidth={iconStrokeWidth[size]} strokeLinecap="round" />
  </svg>
);

export default SaveWorksheetIcon;
