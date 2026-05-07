import React, { useState } from 'react';
import { Icon } from '@components/icons';
import type {
  VizBlockData,
  VizSeries,
  VizSource,
  VizTableData,
  VizToken,
} from '../../runtime/schema';
import styles from './VizBlock.module.css';

export type VizView = 'chart' | 'table';

export interface VizBlockProps {
  block: VizBlockData;
  /**
   * React node to render inside the chart slot. Wins over `block.source`.
   * Use this when the consumer has a chart instance to embed directly.
   */
  chartSlot?: React.ReactNode;
  /**
   * Footer-left action group. Defaults to Pin / Save / Download / Edit.
   * Pass `null` to hide. Pass a custom node to override.
   */
  footerLeft?: React.ReactNode;
  /**
   * Footer-right action group. Defaults to "Add to coaching".
   * Pass `null` to hide. Pass a custom node to override.
   */
  footerRight?: React.ReactNode;
  /** Controlled view. */
  view?: VizView;
  /** Called when the user clicks a view-toggle segment. */
  onViewChange?: (view: VizView) => void;
  /**
   * Called when the user clicks the expand button.
   * Default: opens an internal fullscreen modal.
   */
  onExpand?: () => void;
  /** Default-action handlers — used when `footerLeft` / `footerRight` are not overridden. */
  onPin?: () => void;
  onSave?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
  onAddToCoaching?: () => void;
}

const SERIES_COLORS = [
  '#4FC3A1', // green
  '#1FB45F', // dark green
  '#FCC838', // yellow
  '#2770EF', // blue
  '#8C62F5', // purple
  '#E22B3D', // red
];

/**
 * Stub renderer for the viz block. See
 * `docs/2026-05-07-spotter-viz-block-behaviour.md` for the slot model and
 * customization points.
 */
export const VizBlock: React.FC<VizBlockProps> = ({
  block,
  chartSlot,
  footerLeft,
  footerRight,
  view: controlledView,
  onViewChange,
  onExpand,
  onPin,
  onSave,
  onDownload,
  onEdit,
  onAddToCoaching,
}) => {
  const [internalView, setInternalView] = useState<VizView>('chart');
  const view = controlledView ?? internalView;
  const handleViewChange = (next: VizView): void => {
    if (controlledView === undefined) setInternalView(next);
    onViewChange?.(next);
  };

  const [expandedInternal, setExpandedInternal] = useState(false);
  const handleExpand = (): void => {
    if (onExpand) onExpand();
    else setExpandedInternal(true);
  };

  return (
    <div className={styles.viz}>
      {block.title && <h3 className={styles.title}>{block.title}</h3>}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.tokens}>
            {block.tokens.map((token) => (
              <Token key={token.id} token={token} />
            ))}
          </div>
          <div className={styles.headerActions}>
            <div className={styles.viewToggle} role="group" aria-label="View mode">
              <button
                type="button"
                className={styles.viewBtn}
                data-active={view === 'table'}
                onClick={() => handleViewChange('table')}
                aria-label="Table view"
                aria-pressed={view === 'table'}
              >
                <Icon name="table" size="s" />
              </button>
              <button
                type="button"
                className={styles.viewBtn}
                data-active={view === 'chart'}
                onClick={() => handleViewChange('chart')}
                aria-label="Chart view"
                aria-pressed={view === 'chart'}
              >
                <Icon name="chart" size="s" />
              </button>
            </div>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={handleExpand}
              aria-label="Expand"
            >
              <Icon name="fullscreen" size="s" />
            </button>
          </div>
        </div>
        <div className={styles.cardBody}>
          <Slot
            view={view}
            chartSlot={chartSlot}
            source={block.source}
            tableData={block.tableData}
            includeLegend
          />
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.footerLeft}>
            {footerLeft === undefined ? (
              <DefaultFooterLeft
                onPin={onPin}
                onSave={onSave}
                onDownload={onDownload}
                onEdit={onEdit}
              />
            ) : (
              footerLeft
            )}
          </div>
          <div className={styles.footerRight}>
            {footerRight === undefined ? (
              <DefaultFooterRight onAddToCoaching={onAddToCoaching} />
            ) : (
              footerRight
            )}
          </div>
        </div>
      </div>
      {expandedInternal && (
        <ExpandModal
          title={block.title}
          onClose={() => setExpandedInternal(false)}
        >
          <Slot
            view={view}
            chartSlot={chartSlot}
            source={block.source}
            tableData={block.tableData}
            includeLegend={false}
          />
        </ExpandModal>
      )}
    </div>
  );
};

VizBlock.displayName = 'VizBlock';

// ---------- Slot dispatcher ----------

interface SlotProps {
  view: VizView;
  chartSlot?: React.ReactNode;
  source: VizSource;
  tableData?: VizTableData;
  includeLegend: boolean;
}

const Slot: React.FC<SlotProps> = ({ view, chartSlot, source, tableData, includeLegend }) => {
  if (view === 'table' && tableData) {
    return (
      <div className={styles.tableWrap}>
        <table className={styles.tableEl}>
          <thead>
            <tr>
              {tableData.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Chart view — slot priority: chartSlot > iframe > data > placeholder
  if (chartSlot !== undefined) {
    return <div className={styles.slot}>{chartSlot}</div>;
  }

  if (source.type === 'iframe') {
    return (
      <div className={styles.slot}>
        <iframe
          className={styles.slotIframe}
          src={source.url}
          sandbox={source.sandbox}
          title={source.title ?? 'Chart'}
        />
      </div>
    );
  }

  if (source.type === 'data') {
    const seriesWithColors = source.data.series.map((s, i) => ({
      ...s,
      color: s.color ?? SERIES_COLORS[i % SERIES_COLORS.length],
    }));
    return (
      <>
        <div className={styles.slot}>
          <ChartSketch series={seriesWithColors} />
        </div>
        {includeLegend && (
          <div className={styles.legend}>
            {seriesWithColors.map((s) => (
              <span key={s.id} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{ backgroundColor: s.color }}
                  aria-hidden="true"
                />
                <span>{s.label}</span>
              </span>
            ))}
          </div>
        )}
      </>
    );
  }

  // placeholder
  return (
    <div className={styles.slot}>
      <span className={styles.slotPlaceholder}>
        {source.message ?? 'Chart will appear here'}
      </span>
    </div>
  );
};

// ---------- Tokens ----------

const Token: React.FC<{ token: VizToken }> = ({ token }) => {
  const showFunnel = token.kind === 'filter';
  return (
    <span className={styles.token} data-kind={token.kind}>
      {showFunnel && <Icon name="funnel" size="xs" />}
      <span>{token.label}</span>
    </span>
  );
};

// ---------- Default footer actions ----------

const DefaultFooterLeft: React.FC<{
  onPin?: () => void;
  onSave?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
}> = ({ onPin, onSave, onDownload, onEdit }) => (
  <>
    <FooterAction icon="pin" label="Pin" onClick={onPin} />
    <FooterAction icon="save" label="Save" onClick={onSave} />
    <FooterAction icon="download" label="Download" onClick={onDownload} />
    <FooterAction icon="pencil" label="Edit" onClick={onEdit} />
  </>
);

const DefaultFooterRight: React.FC<{ onAddToCoaching?: () => void }> = ({ onAddToCoaching }) => (
  <FooterAction icon="plus" label="Add to coaching" onClick={onAddToCoaching} brand />
);

const FooterAction: React.FC<{
  icon: React.ComponentProps<typeof Icon>['name'];
  label: string;
  onClick?: () => void;
  brand?: boolean;
}> = ({ icon, label, onClick, brand }) => (
  <button
    type="button"
    className={`${styles.footerAction} ${brand ? styles.footerActionBrand : ''}`}
    onClick={onClick}
  >
    <Icon name={icon} size="s" />
    <span>{label}</span>
  </button>
);

// ---------- Expand modal ----------

const ExpandModal: React.FC<{
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, onClose, children }) => (
  <div
    className={styles.expandOverlay}
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-label={title ?? 'Expanded chart'}
  >
    <div className={styles.expandModal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.expandHeader}>
        <h3 className={styles.expandTitle}>{title ?? 'Chart'}</h3>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="cross" size="m" />
        </button>
      </div>
      <div className={styles.expandBody}>{children}</div>
    </div>
  </div>
);

// ---------- Chart sketch (used when source.type === 'data') ----------

interface ChartSketchProps {
  series: (VizSeries & { color: string })[];
}

const ChartSketch: React.FC<ChartSketchProps> = ({ series }) => {
  const W = 600;
  const H = 200;
  const PAD_X = 16;
  const PAD_Y = 16;
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_Y * 2;

  const allValues = series.flatMap((s) => s.data);
  const max = Math.max(...allValues, 1);
  const points = (data: number[]): string => {
    if (data.length === 0) return '';
    const stepX = data.length > 1 ? innerW / (data.length - 1) : 0;
    return data
      .map((v, i) => {
        const x = PAD_X + stepX * i;
        const y = PAD_Y + innerH - (v / max) * innerH;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <svg
      className={styles.chartSvg}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {series.map((s) => (
        <path
          key={s.id}
          d={points(s.data)}
          stroke={s.color}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
};

export default VizBlock;
