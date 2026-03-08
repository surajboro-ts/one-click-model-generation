import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Line } from 'react-chartjs-2';
import { Icon } from '../../../components/icons';
import type { ChartConfig } from '../types';
import { MONTHS, SALES_DATA, getBarColors } from '../data/chartData';
import styles from './ChartArea.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin,
  ChartDataLabels,
);

interface ChartAreaProps {
  config: ChartConfig;
}

export const ChartArea: React.FC<ChartAreaProps> = ({ config }) => {
  const colors = useMemo(() => getBarColors(config), [config]);

  const data = useMemo(
    () => ({
      labels: MONTHS,
      datasets: [
        {
          label: 'Total sales',
          data: SALES_DATA,
          backgroundColor: colors,
          borderColor: config.chartType === 'line' ? colors[0] : colors,
          borderWidth: config.chartType === 'line' ? 2 : 0,
          borderRadius: config.chartType === 'bar' ? 2 : 0,
          fill: config.chartType === 'area',
          tension: 0.3,
          pointRadius: config.chartType === 'line' ? 4 : 0,
          pointBackgroundColor: colors,
        },
      ],
    }),
    [colors, config.chartType],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600 },
      layout: { padding: { top: 24, right: 12 } },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#777E8B',
            font: { size: 12, family: 'Plain, sans-serif', weight: 300 as const },
          },
          title: {
            display: true,
            text: config.xAxisLabel,
            color: '#777E8B',
            font: { size: 12, family: 'Plain, sans-serif', weight: 400 as const },
            padding: { top: 8 },
          },
        },
        y: {
          grid: {
            display: config.showGridLines,
            color: '#EAEDF2',
          },
          border: { display: false },
          ticks: {
            color: '#777E8B',
            font: { size: 12, family: 'Plain, sans-serif', weight: 300 as const },
            callback: (value: string | number) => {
              const num = typeof value === 'string' ? parseFloat(value) : value;
              if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
              return String(num);
            },
          },
          title: {
            display: true,
            text: config.yAxisLabel,
            color: '#777E8B',
            font: { size: 12, family: 'Plain, sans-serif', weight: 400 as const },
          },
          beginAtZero: true,
          max: 34000,
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1D232F',
          titleFont: { size: 12, family: 'Plain, sans-serif' },
          bodyFont: { size: 12, family: 'Plain, sans-serif' },
          padding: 8,
          cornerRadius: 6,
          callbacks: {
            label: (ctx: { parsed: { y: number } }) => {
              const v = ctx.parsed.y;
              return v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v);
            },
          },
        },
        datalabels: {
          display: (ctx: { dataIndex: number }) => {
            if (!config.showDataLabels) return false;
            const val = SALES_DATA[ctx.dataIndex];
            return val >= 20000;
          },
          anchor: 'end' as const,
          align: 'top' as const,
          color: (ctx: { dataIndex: number }) => {
            const val = SALES_DATA[ctx.dataIndex];
            return val >= (config.plotline?.value ?? 20000)
              ? config.conditionalFormatting.aboveColor
              : config.conditionalFormatting.belowColor;
          },
          font: { size: 12, weight: 500 as const, family: 'Plain, sans-serif' },
          formatter: (value: number) => (value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value)),
        },
        annotation: config.plotline
          ? {
              annotations: {
                targetLine: {
                  type: 'line' as const,
                  yMin: config.plotline.value,
                  yMax: config.plotline.value,
                  borderColor: config.plotline.color,
                  borderWidth: 2,
                  borderDash: config.plotline.style === 'dashed' ? [6, 4] : [],
                  label: {
                    display: true,
                    content: config.plotline.label,
                    position: 'end' as const,
                    backgroundColor: 'transparent',
                    color: config.plotline.color,
                    font: { size: 12, family: 'Plain, sans-serif', weight: 400 as const },
                    padding: 4,
                  },
                },
              },
            }
          : {},
      },
    }),
    [config],
  );

  const ChartComponent = config.chartType === 'bar' ? Bar : Line;

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>Total product sales per month</h2>
          <p className={styles.subtitle}>The sales is represented for the all regions</p>
        </div>
        <div className={styles.headingActions}>
          <button type="button" className={styles.iconBtn} aria-label="Table view">
            <Icon name="table" size="m" />
          </button>
          <button type="button" className={`${styles.iconBtn} ${styles.iconBtnActive}`} aria-label="Chart view">
            <Icon name="chart" size="m" />
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Share">
            <Icon name="share" size="m" />
          </button>
          <button type="button" className={styles.iconBtn} aria-label="More">
            <Icon name="more" size="m" />
          </button>
          <button type="button" className={styles.datasource}>
            Sales_Ame..
            <Icon name="chevron-down" size="s" color="#777E8B" />
          </button>
          <button type="button" className={styles.pinBtn}>Pin</button>
        </div>
      </div>

      <div className={styles.insightBanner}>
        <span className={styles.insightLabel}>Insights :</span>
        <span className={styles.insightText}>Sales are up by 11% since last two months</span>
        <span className={styles.insightLink}>Drill down</span>
      </div>

      <div className={styles.chartWrapper}>
        <ChartComponent data={data} options={options as any} />
      </div>
    </div>
  );
};

export default ChartArea;
