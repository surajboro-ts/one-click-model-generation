import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize } from '../../../tokens/icons';

export const QuestionMarkIcon: React.FC<BaseIconProps> = ({
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
      d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5ZM9.75 12.75C9.75 13.1642 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.1642 8.25 12.75C8.25 12.3358 8.58579 12 9 12C9.41421 12 9.75 12.3358 9.75 12.75ZM6.75 7.5C6.75 6.25736 7.75736 5.25 9 5.25C10.2426 5.25 11.25 6.25736 11.25 7.5C11.25 8.18325 10.9373 8.79269 10.4459 9.19108C10.2107 9.38192 9.94619 9.53247 9.66393 9.63534C9.47109 9.70559 9.26925 9.75 9.06066 9.75H8.25V10.5C8.25 10.9142 8.58579 11.25 9 11.25C9.41421 11.25 9.75 10.9142 9.75 10.5V10.2023C10.9061 9.87152 11.7623 8.78451 11.7623 7.5C11.7623 5.98122 10.5188 4.75 9 4.75C7.48122 4.75 6.25 5.98122 6.25 7.5C6.25 7.91421 6.58579 8.25 7 8.25C7.41421 8.25 7.75 7.91421 7.75 7.5C7.75 7.08579 7.08579 6.75 6.75 7.5Z"
      fill={color}
    />
  </svg>
);

export default QuestionMarkIcon;
