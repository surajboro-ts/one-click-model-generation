import React from 'react';
import { colors } from '../styles';
import { TableCard } from './TableCard';
import { JoinConnector } from './JoinConnector';
import type { TableDef, FlowStep } from '../data/mockData';
import { TABLE_POSITIONS } from '../data/mockData';

interface CanvasJoin {
  id: string;
  fromTable: string;
  toTable: string;
}

interface ModelCanvasProps {
  tables: TableDef[];
  joins: CanvasJoin[];
  step: FlowStep;
  selectedJoin: string | null;
  onJoinClick: (joinId: string) => void;
  onTableClick: (tableId: string) => void;
  animate: boolean;
}

const CARD_W = 240;
const CARD_H = 144;

function getCardCenter(tableName: string, anchor: 'bottom' | 'top' | 'right' | 'left') {
  const pos = TABLE_POSITIONS[tableName];
  if (!pos) return { x: 0, y: 0 };
  switch (anchor) {
    case 'bottom': return { x: pos.x + CARD_W / 2, y: pos.y + CARD_H };
    case 'top': return { x: pos.x + CARD_W / 2, y: pos.y };
    case 'right': return { x: pos.x + CARD_W, y: pos.y + CARD_H / 2 };
    case 'left': return { x: pos.x, y: pos.y + CARD_H / 2 };
  }
}

const JOIN_ANCHORS: Record<string, { from: 'bottom' | 'top' | 'right' | 'left'; to: 'bottom' | 'top' | 'right' | 'left' }> = {
  'NewRetail_Sales_Fact->Customer_Dim': { from: 'bottom', to: 'top' },
  'NewRetail_Sales_Fact->Product_Dim': { from: 'right', to: 'left' },
  'Sales_Targets_Fact->Customer_Dim': { from: 'bottom', to: 'top' },
  'Sales_Targets_Fact->Product_Dim': { from: 'bottom', to: 'top' },
  'Customer_Dim->Product_Dim': { from: 'right', to: 'left' },
};

function getAnchors(fromTable: string, toTable: string) {
  const key = `${fromTable}->${toTable}`;
  return JOIN_ANCHORS[key] || { from: 'bottom', to: 'top' };
}

export const ModelCanvas: React.FC<ModelCanvasProps> = ({
  tables, joins, step, selectedJoin, onJoinClick, onTableClick, animate,
}) => {
  const showTables = step !== 'onboarding' && step !== 'table-recommendations';
  const showJoins = step === 'joins-added' || step === 'context-interaction' || step === 'columns-view' || step === 'delete-impact';

  return (
    <div style={styles.container}>
      {!showTables && (
        <div style={styles.emptyState}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="4" y="8" width="18" height="14" rx="3" stroke={colors.textTertiary} strokeWidth="1.5" />
            <rect x="26" y="8" width="18" height="14" rx="3" stroke={colors.textTertiary} strokeWidth="1.5" />
            <rect x="4" y="26" width="18" height="14" rx="3" stroke={colors.textTertiary} strokeWidth="1.5" />
            <rect x="26" y="26" width="18" height="14" rx="3" stroke={colors.textTertiary} strokeWidth="1.5" />
            <line x1="22" y1="15" x2="26" y2="15" stroke={colors.textTertiary} strokeWidth="1.5" />
            <line x1="13" y1="22" x2="13" y2="26" stroke={colors.textTertiary} strokeWidth="1.5" />
          </svg>
          <span style={styles.emptyText}>
            Add tables to start building your model
          </span>
        </div>
      )}

      {showTables && (
        <>
          <svg style={styles.svg}>
            {showJoins &&
              joins.map((j) => {
                const anchors = getAnchors(j.fromTable, j.toTable);
                const from = getCardCenter(j.fromTable, anchors.from);
                const to = getCardCenter(j.toTable, anchors.to);
                return (
                  <JoinConnector
                    key={j.id}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    selected={selectedJoin === j.id}
                    onClick={() => onJoinClick(j.id)}
                    animate={animate}
                  />
                );
              })}
          </svg>
          {tables.map((t) => {
            const pos = TABLE_POSITIONS[t.name];
            if (!pos) return null;
            return (
              <TableCard
                key={t.id}
                table={t}
                x={pos.x}
                y={pos.y}
                onSelect={() => onTableClick(t.id)}
                animate={animate}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.bgSunken,
    overflow: 'hidden',
  },
  svg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  emptyState: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyText: {
    fontFamily: '"Plain", -apple-system, sans-serif',
    fontSize: 14,
    color: colors.textTertiary,
  },
};
