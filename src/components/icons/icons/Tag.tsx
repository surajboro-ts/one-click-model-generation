import React from 'react';
import { BaseIconProps } from '../Icon.types';
import { iconSize, iconStrokeWidth } from '../../../tokens/icons';

export const TagIcon: React.FC<BaseIconProps> = ({
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
      d="M15.7275 10.0275L10.0275 15.7275C9.88781 15.8672 9.72222 15.9784 9.54 16.0547C9.35778 16.131 9.16244 16.1706 8.96524 16.1711C8.76804 16.1717 8.5725 16.1332 8.38988 16.0579C8.20727 15.9826 8.04112 15.8723 7.90084 15.7334L1.5 9.33262V1.5H9.33262L15.7275 7.89488C16.0083 8.17643 16.1663 8.55826 16.1663 8.95619C16.1663 9.35413 16.0083 9.73596 15.7275 10.0175V10.0275Z"
      stroke={color}
      strokeWidth={iconStrokeWidth[size]}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.25 5.25H5.2575"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TagIcon;
