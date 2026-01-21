import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize } from '../../../tokens/icons';

export const CheckmarkCircleIcon: React.FC<BaseIconProps> = ({
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5ZM12.5303 7.53033C12.8232 7.23744 12.8232 6.76256 12.5303 6.46967C12.2374 6.17678 11.7626 6.17678 11.4697 6.46967L8 9.93934L6.53033 8.46967C6.23744 8.17678 5.76256 8.17678 5.46967 8.46967C5.17678 8.76256 5.17678 9.23744 5.46967 9.53033L7.46967 11.5303C7.76256 11.8232 8.23744 11.8232 8.53033 11.5303L12.5303 7.53033Z"
      fill={color}
    />
  </svg>
);

export default CheckmarkCircleIcon;
