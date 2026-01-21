import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize } from '../../../tokens/icons';

export const ExclamationPointCircleIcon: React.FC<BaseIconProps> = ({
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
      d="M7.69064 2.62509C8.26801 1.62497 9.73199 1.62497 10.3094 2.62509L16.5761 13.4999C17.1534 14.5 16.4215 15.75 15.2667 15.75H2.73333C1.57852 15.75 0.846554 14.5 1.42393 13.4999L7.69064 2.62509ZM9 6C9.41421 6 9.75 6.33579 9.75 6.75V9.75C9.75 10.1642 9.41421 10.5 9 10.5C8.58579 10.5 8.25 10.1642 8.25 9.75V6.75C8.25 6.33579 8.58579 6 9 6ZM9 13.5C9.41421 13.5 9.75 13.1642 9.75 12.75C9.75 12.3358 9.41421 12 9 12C8.58579 12 8.25 12.3358 8.25 12.75C8.25 13.1642 8.58579 13.5 9 13.5Z"
      fill={color}
    />
  </svg>
);

export default ExclamationPointCircleIcon;
