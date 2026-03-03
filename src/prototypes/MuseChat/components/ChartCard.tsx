import React from 'react';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontFamily, fontWeight, fontSize, lineHeight } from '../../../tokens/typography';
import { Chip } from '../../../components';
import { IconButton } from './IconButton';
import type { ChartType } from '../data/mockData';

interface ChartCardProps {
  type: ChartType;
  title: string;
  filterChips: string[];
  animate?: boolean;
}

const CHART_COLORS = ['#2770EF', '#71A1F4', '#06BF7F', '#FCC838', '#E22B3D', '#A855F7', '#F97316', '#C0C6CF'];

function DonutChart() {
  const data = [34, 28, 22, 16];
  const total = data.reduce((a, b) => a + b, 0);
  let cumulative = 0;

  return (
    <svg width="240" height="240" viewBox="0 0 240 240">
      {data.map((value, i) => {
        const startAngle = (cumulative / total) * 360 - 90;
        cumulative += value;
        const endAngle = (cumulative / total) * 360 - 90;
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;
        const r = 90;
        const ir = 55;
        const cx = 120;
        const cy = 120;
        const toRad = (d: number) => (d * Math.PI) / 180;
        const x1 = cx + r * Math.cos(toRad(startAngle));
        const y1 = cy + r * Math.sin(toRad(startAngle));
        const x2 = cx + r * Math.cos(toRad(endAngle));
        const y2 = cy + r * Math.sin(toRad(endAngle));
        const ix1 = cx + ir * Math.cos(toRad(endAngle));
        const iy1 = cy + ir * Math.sin(toRad(endAngle));
        const ix2 = cx + ir * Math.cos(toRad(startAngle));
        const iy2 = cy + ir * Math.sin(toRad(startAngle));
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${ir} ${ir} 0 ${largeArc} 0 ${ix2} ${iy2} Z`}
            fill={CHART_COLORS[i]}
          />
        );
      })}
    </svg>
  );
}

function BarChart() {
  const groups = [
    { label: 'Q1', values: [42, 35, 28, 15] },
    { label: 'Q2', values: [48, 38, 30, 18] },
    { label: 'Q3', values: [52, 40, 32, 22] },
    { label: 'Q4', values: [58, 45, 35, 25] },
  ];
  const maxVal = 60;
  const chartH = 180;
  const barW = 12;
  const groupW = 80;

  return (
    <svg width="400" height="220" viewBox="0 0 400 220">
      <line x1="40" y1={chartH + 10} x2="380" y2={chartH + 10} stroke={systemColors.light['border-divider']} strokeWidth="1" />
      {[0, 20, 40, 60].map((v) => {
        const y = chartH + 10 - (v / maxVal) * chartH;
        return (
          <g key={v}>
            <line x1="40" y1={y} x2="380" y2={y} stroke={systemColors.light['border-divider']} strokeWidth="0.5" strokeDasharray="4" />
            <text x="32" y={y + 4} textAnchor="end" fill={systemColors.light['content-tertiary']} fontSize="10" fontFamily={fontFamily.primary}>{v}</text>
          </g>
        );
      })}
      {groups.map((group, gi) => {
        const gx = 60 + gi * groupW;
        return (
          <g key={gi}>
            {group.values.map((v, bi) => {
              const h = (v / maxVal) * chartH;
              return (
                <rect
                  key={bi}
                  x={gx + bi * (barW + 2)}
                  y={chartH + 10 - h}
                  width={barW}
                  height={h}
                  rx={2}
                  fill={CHART_COLORS[bi]}
                />
              );
            })}
            <text x={gx + 25} y={chartH + 26} textAnchor="middle" fill={systemColors.light['content-secondary']} fontSize="11" fontFamily={fontFamily.primary}>
              {group.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart() {
  const data = [22, 28, 25, 35, 32, 45, 42, 38, 48, 72, 85, 65];
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxVal = 90;
  const chartH = 160;
  const chartW = 360;
  const offsetX = 40;
  const offsetY = 10;

  const points = data.map((v, i) => ({
    x: offsetX + (i / (data.length - 1)) * chartW,
    y: offsetY + chartH - (v / maxVal) * chartH,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartH + offsetY} L ${points[0].x} ${chartH + offsetY} Z`;

  return (
    <svg width="420" height="200" viewBox="0 0 420 200">
      {[0, 30, 60, 90].map((v) => {
        const y = offsetY + chartH - (v / maxVal) * chartH;
        return (
          <g key={v}>
            <line x1={offsetX} y1={y} x2={offsetX + chartW} y2={y} stroke={systemColors.light['border-divider']} strokeWidth="0.5" strokeDasharray="4" />
            <text x={offsetX - 8} y={y + 4} textAnchor="end" fill={systemColors.light['content-tertiary']} fontSize="10" fontFamily={fontFamily.primary}>{v}</text>
          </g>
        );
      })}
      <path d={areaD} fill={`${CHART_COLORS[0]}15`} />
      <path d={pathD} fill="none" stroke={CHART_COLORS[0]} strokeWidth="2.5" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={CHART_COLORS[0]} />
      ))}
      {labels.filter((_, i) => i % 2 === 0).map((label, i) => (
        <text key={label} x={offsetX + (i * 2 / (data.length - 1)) * chartW} y={chartH + offsetY + 18} textAnchor="middle" fill={systemColors.light['content-secondary']} fontSize="10" fontFamily={fontFamily.primary}>
          {label}
        </text>
      ))}
    </svg>
  );
}

function StackedAreaChart() {
  const layers = [
    [10, 12, 15, 18, 20, 22, 25, 28],
    [8, 10, 12, 14, 15, 18, 20, 22],
    [5, 6, 8, 8, 10, 10, 12, 14],
  ];
  const maxVal = 70;
  const chartH = 160;
  const chartW = 360;
  const ox = 40;
  const oy = 10;
  const n = layers[0].length;

  const cumulative = layers[0].map((_, i) =>
    layers.reduce((sum, layer) => sum + layer[i], 0)
  );
  void cumulative;

  const stackedLayers: number[][] = [];
  for (let li = 0; li < layers.length; li++) {
    stackedLayers[li] = layers[li].map((v, i) => {
      let sum = v;
      for (let k = li + 1; k < layers.length; k++) sum += layers[k][i];
      return sum;
    });
  }

  return (
    <svg width="420" height="200" viewBox="0 0 420 200">
      {[0, 20, 40, 60].map((v) => {
        const y = oy + chartH - (v / maxVal) * chartH;
        return (
          <g key={v}>
            <line x1={ox} y1={y} x2={ox + chartW} y2={y} stroke={systemColors.light['border-divider']} strokeWidth="0.5" strokeDasharray="4" />
            <text x={ox - 8} y={y + 4} textAnchor="end" fill={systemColors.light['content-tertiary']} fontSize="10" fontFamily={fontFamily.primary}>{v}</text>
          </g>
        );
      })}
      {stackedLayers.map((layer, li) => {
        const pts = layer.map((v, i) => ({
          x: ox + (i / (n - 1)) * chartW,
          y: oy + chartH - (v / maxVal) * chartH,
        }));
        const bottom = li < stackedLayers.length - 1
          ? stackedLayers[li + 1].map((v, i) => ({
              x: ox + (i / (n - 1)) * chartW,
              y: oy + chartH - (v / maxVal) * chartH,
            })).reverse()
          : [{ x: ox + chartW, y: oy + chartH }, { x: ox, y: oy + chartH }];
        const d = [
          ...pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`),
          ...bottom.map((p, i) => `${i === 0 ? 'L' : 'L'} ${p.x} ${p.y}`),
          'Z',
        ].join(' ');
        return <path key={li} d={d} fill={CHART_COLORS[li]} opacity={0.7} />;
      })}
      {['2023 Q1', '2023 Q3', '2024 Q1', '2024 Q3'].map((label, i) => (
        <text key={label} x={ox + (i / 3) * chartW} y={chartH + oy + 18} textAnchor="middle" fill={systemColors.light['content-secondary']} fontSize="10" fontFamily={fontFamily.primary}>
          {label}
        </text>
      ))}
    </svg>
  );
}

function HorizontalBarChart() {
  const data = [
    { label: 'Manhattan', value: 4200 },
    { label: 'San Francisco', value: 3600 },
    { label: 'Chicago', value: 3100 },
    { label: 'Beverly Hills', value: 2800 },
    { label: 'Dallas', value: 2500 },
    { label: 'Seattle', value: 2200 },
    { label: 'Miami', value: 2000 },
    { label: 'Boston', value: 1800 },
  ];
  const maxVal = 4500;
  const barH = 20;
  const gap = 6;
  const labelW = 100;
  const chartW = 280;

  return (
    <svg width="420" height={data.length * (barH + gap) + 20} viewBox={`0 0 420 ${data.length * (barH + gap) + 20}`}>
      {data.map((d, i) => {
        const y = 10 + i * (barH + gap);
        const w = (d.value / maxVal) * chartW;
        return (
          <g key={i}>
            <text x={labelW - 8} y={y + barH / 2 + 4} textAnchor="end" fill={systemColors.light['content-secondary']} fontSize="11" fontFamily={fontFamily.primary}>
              {d.label}
            </text>
            <rect x={labelW} y={y} width={w} height={barH} rx={4} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            <text x={labelW + w + 8} y={y + barH / 2 + 4} fill={systemColors.light['content-secondary']} fontSize="11" fontFamily={fontFamily.primary}>
              ${(d.value / 1000).toFixed(1)}M
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const CHART_RENDERERS: Record<ChartType, React.FC> = {
  donut: DonutChart,
  bar: BarChart,
  line: LineChart,
  stackedArea: StackedAreaChart,
  horizontalBar: HorizontalBarChart,
};

export const ChartCard: React.FC<ChartCardProps> = ({ type, title, filterChips, animate }) => {
  const ChartRenderer = CHART_RENDERERS[type];

  return (
    <div style={{ ...styles.container, ...(animate ? styles.containerAnimate : {}) }}>
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
      </div>
      <div style={styles.chipRow}>
        {filterChips.map((chip, i) => (
          <Chip
            key={chip}
            label={chip.includes('=') ? chip.split('=')[0].trim() : chip}
            filterValue={chip.includes('=') ? chip.split('=')[1].trim() : undefined}
            type={i === 0 ? 'measure' : 'filter'}
          />
        ))}
        <div style={styles.actionIcons}>
          <IconButton icon="table" aria-label="Table view" />
          <IconButton icon="filter" aria-label="Filter" />
          <IconButton icon="expand" aria-label="Expand" />
          <IconButton icon="more" aria-label="More options" />
        </div>
      </div>
      <div style={styles.chartArea}>
        <ChartRenderer />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['border-divider']}`,
    borderRadius: 12,
    padding: `${spacing.D}px ${spacing.E}px`,
    boxShadow: '0 2px 4px rgba(25, 35, 49, 0.04)',
    marginTop: `${spacing.D}px`,
  },
  containerAnimate: {
    animation: 'museChatFadeIn 500ms ease-out 200ms forwards',
    opacity: 0,
  },
  header: {
    marginBottom: `${spacing.C}px`,
  },
  title: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: `${lineHeight.lg}px`,
    color: systemColors.light['content-primary'],
    margin: 0,
  },
  chipRow: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    flexWrap: 'wrap' as const,
    marginBottom: `${spacing.D}px`,
  },
  actionIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.A}px`,
    marginLeft: 'auto',
  },
  chartArea: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${spacing.D}px 0`,
    overflow: 'hidden',
  },
};

export default ChartCard;
