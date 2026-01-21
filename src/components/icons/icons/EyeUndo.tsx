import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize, iconStrokeWidth } from '../../../tokens/icons';

export const EyeUndoIcon: React.FC<BaseIconProps> = ({
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
      d="M1.5 1.5L16.5 16.5M7.425 7.425C7.00737 7.84263 6.77307 8.40941 6.77307 9C6.77307 9.59059 7.00737 10.1574 7.425 10.575C7.84263 10.9926 8.40941 11.2269 9 11.2269C9.59059 11.2269 10.1574 10.9926 10.575 10.575M13.77 13.755C12.3998 14.8262 10.7261 15.4305 9 15.4875C3.75 15.4875 0.75 9 0.75 9C1.77167 7.13083 3.18028 5.49768 4.875 4.2225L13.77 13.755ZM7.425 3.105C7.9339 2.98426 8.45527 2.92396 8.97833 2.925C14.25 2.925 17.25 9 17.25 9C16.7484 9.92251 16.1421 10.7867 15.4425 11.5775L7.425 3.105Z"
      stroke={color}
      strokeWidth={iconStrokeWidth[size]}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EyeUndoIcon;
