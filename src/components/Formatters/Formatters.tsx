import React from 'react';
import styles from './Formatters.module.css';

/* ─── Formatters.Text ──────────────────────────────────────────────────── */

export interface FormattersTextProps {
  value: string | number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  className?: string;
}

const FormattersText: React.FC<FormattersTextProps> = ({
  value,
  color,
  bold = false,
  italic = false,
  className,
}) => {
  const style: React.CSSProperties = {};
  if (color) style.color = color;
  if (bold) style.fontWeight = 'var(--font-weight-bold)' as React.CSSProperties['fontWeight'];
  if (italic) style.fontStyle = 'italic';

  return (
    <span
      className={[styles.text, className].filter(Boolean).join(' ')}
      style={style}
    >
      {value}
    </span>
  );
};

/* ─── Formatters.Number ────────────────────────────────────────────────── */

export type NumberFormat = 'currency' | 'percent' | 'decimal' | 'integer' | 'compact';

export interface FormattersNumberProps {
  value: number;
  format?: NumberFormat;
  decimals?: number;
  currency?: string;
  className?: string;
}

const FormattersNumber: React.FC<FormattersNumberProps> = ({
  value,
  format = 'decimal',
  decimals,
  currency = 'USD',
  className,
}) => {
  let formatted: string;

  switch (format) {
    case 'currency':
      formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
      break;
    case 'percent':
      formatted = new Intl.NumberFormat('en-US', {
        style: 'percent',
        maximumFractionDigits: decimals ?? 1,
      }).format(value);
      break;
    case 'integer':
      formatted = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
      }).format(value);
      break;
    case 'compact':
      formatted = new Intl.NumberFormat('en-US', {
        notation: 'compact',
      }).format(value);
      break;
    case 'decimal':
    default:
      formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals ?? 2,
        maximumFractionDigits: decimals ?? 2,
      }).format(value);
      break;
  }

  return (
    <span className={[styles.number, className].filter(Boolean).join(' ')}>
      {formatted}
    </span>
  );
};

/* ─── Formatters.Line (inline sparkline) ──────────────────────────────── */

export interface FormattersLineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const FormattersLine: React.FC<FormattersLineProps> = ({
  data,
  width = 80,
  height = 24,
  color,
  className,
}) => {
  if (!data || data.length < 2) {
    return <svg width={width} height={height} className={className} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  });

  const polylinePoints = points.join(' ');

  return (
    <svg
      width={width}
      height={height}
      className={[styles.line, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={color ?? 'var(--rd-sys-color-background-brand)'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* ─── Formatters.Interval ──────────────────────────────────────────────── */

export interface FormattersIntervalProps {
  start: Date | string;
  end: Date | string;
  format?: 'duration' | 'range';
  className?: string;
}

function formatDuration(startDate: Date, endDate: Date): string {
  const diffMs = Math.abs(endDate.getTime() - startDate.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
}

function formatRange(startDate: Date, endDate: Date): string {
  const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
  return `${fmt.format(startDate)} \u2013 ${fmt.format(endDate)}`;
}

const FormattersInterval: React.FC<FormattersIntervalProps> = ({
  start,
  end,
  format = 'duration',
  className,
}) => {
  const startDate = start instanceof Date ? start : new Date(start);
  const endDate = end instanceof Date ? end : new Date(end);

  const display =
    format === 'duration'
      ? formatDuration(startDate, endDate)
      : formatRange(startDate, endDate);

  return (
    <span className={[styles.interval, className].filter(Boolean).join(' ')}>
      {display}
    </span>
  );
};

/* ─── Formatters.Background ────────────────────────────────────────────── */

export interface FormattersBackgroundProps {
  value: string | number;
  color?: string;
  textColor?: string;
  className?: string;
}

const FormattersBackground: React.FC<FormattersBackgroundProps> = ({
  value,
  color,
  textColor,
  className,
}) => {
  const style: React.CSSProperties = {};
  if (color) style.backgroundColor = color;
  if (textColor) style.color = textColor;

  return (
    <span
      className={[styles.background, className].filter(Boolean).join(' ')}
      style={style}
    >
      {value}
    </span>
  );
};

/* ─── Formatters.Marker ────────────────────────────────────────────────── */

export interface FormattersMarkerProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const MARKER_SIZES: Record<NonNullable<FormattersMarkerProps['size']>, number> = {
  sm: 6,
  md: 8,
  lg: 10,
};

const FormattersMarker: React.FC<FormattersMarkerProps> = ({
  color,
  size = 'md',
  label,
  className,
}) => {
  const px = MARKER_SIZES[size];

  return (
    <span className={[styles.marker, className].filter(Boolean).join(' ')}>
      <span
        className={styles.markerDot}
        style={{
          width: px,
          height: px,
          backgroundColor: color ?? 'var(--rd-sys-color-background-brand)',
        }}
      />
      {label && <span className={styles.markerLabel}>{label}</span>}
    </span>
  );
};

/* ─── Namespace export ─────────────────────────────────────────────────── */

export type FormattersComponent = {
  Text: React.FC<FormattersTextProps>;
  Number: React.FC<FormattersNumberProps>;
  Line: React.FC<FormattersLineProps>;
  Interval: React.FC<FormattersIntervalProps>;
  Background: React.FC<FormattersBackgroundProps>;
  Marker: React.FC<FormattersMarkerProps>;
};

export const Formatters: FormattersComponent = {
  Text: FormattersText,
  Number: FormattersNumber,
  Line: FormattersLine,
  Interval: FormattersInterval,
  Background: FormattersBackground,
  Marker: FormattersMarker,
};
