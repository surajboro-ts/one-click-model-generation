import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize } from '../../../tokens/icons';

export const CrossCircleIcon: React.FC<BaseIconProps> = ({
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
      d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5ZM6.96967 6.96967C7.26256 6.67678 7.73744 6.67678 8.03033 6.96967L9 7.93934L9.96967 6.96967C10.2626 6.67678 10.7374 6.67678 11.0303 6.96967C11.3232 7.26256 11.3232 7.73744 11.0303 8.03033L10.0607 9L11.0303 9.96967C11.3232 10.2626 11.3232 10.7374 11.0303 11.0303C10.7374 11.3232 10.2626 11.3232 9.96967 11.0303L9 10.0607L8.03033 11.0303C7.73744 11.3232 7.26256 11.3232 6.96967 11.0303C6.67678 10.7374 6.67678 10.2626 6.96967 9.96967L7.93934 9L6.96967 8.03033C6.67678 7.73744 6.67678 7.26256 6.96967 6.96967Z"
      fill={color}
    />
  </svg>
);

export default CrossCircleIcon;
