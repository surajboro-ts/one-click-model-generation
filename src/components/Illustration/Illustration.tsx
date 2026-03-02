import React from 'react';
import styles from './Illustration.module.css';

export type IllustrationSize = 'sm' | 'md' | 'lg' | 'xl';
export type IllustrationId =
  | 'no-data'
  | 'error'
  | 'no-results'
  | 'welcome'
  | 'no-access'
  | 'loading'
  | 'success'
  | 'empty-search'
  | string;

export interface IllustrationProps {
  id: IllustrationId;
  size?: IllustrationSize;
  className?: string;
}

const sizeMap: Record<IllustrationSize, number> = {
  sm: 80,
  md: 120,
  lg: 160,
  xl: 240,
};

function EmptyBoxSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="20"
        y="20"
        width="80"
        height="80"
        rx="8"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="8 4"
        fill="none"
      />
      <line x1="35" y1="55" x2="85" y2="55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="35" y1="68" x2="70" y2="68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="35" y1="81" x2="60" y2="81" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ErrorSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="60"
        cy="60"
        r="40"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      <line x1="44" y1="44" x2="76" y2="76" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="76" y1="44" x2="44" y2="76" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SuccessSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="60"
        cy="60"
        r="40"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      <polyline
        points="40,62 54,76 80,46"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function NoAccessSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="35"
        y="55"
        width="50"
        height="38"
        rx="6"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M44 55V44a16 16 0 0 1 32 0v11"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="60" cy="72" r="4" fill="currentColor" />
      <line x1="60" y1="76" x2="60" y2="84" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function LoadingSpinnerSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="60"
        cy="60"
        r="40"
        stroke="currentColor"
        strokeWidth="4"
        strokeOpacity="0.2"
        fill="none"
      />
      <path
        d="M60 20a40 40 0 0 1 40 40"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 60 60"
          to="360 60 60"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

function FallbackSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="10"
        width="100"
        height="100"
        rx="12"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
}

export const Illustration: React.FC<IllustrationProps> = ({
  id,
  size = 'md',
  className,
}) => {
  const px = sizeMap[size];
  const classes = [styles.illustration, className].filter(Boolean).join(' ');

  const renderSVG = () => {
    switch (id) {
      case 'no-data':
      case 'no-results':
      case 'empty-search':
        return <EmptyBoxSVG size={px} />;
      case 'error':
        return <ErrorSVG size={px} />;
      case 'welcome':
      case 'success':
        return <SuccessSVG size={px} />;
      case 'no-access':
        return <NoAccessSVG size={px} />;
      case 'loading':
        return <LoadingSpinnerSVG size={px} />;
      default:
        return <FallbackSVG size={px} />;
    }
  };

  return (
    <div className={classes} style={{ width: px, height: px }}>
      {renderSVG()}
    </div>
  );
};

export default Illustration;
