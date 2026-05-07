import React, { useEffect, useRef } from 'react';
import muze from '@viz/muze';
import '@viz/muze/muze.css';
import { chartColors } from '../../_shared/tiles/chartPalette';

const schema = [
  { name: 'Quarter', type: 'dimension' },
  { name: 'Region',  type: 'dimension' },
  { name: 'Product', type: 'dimension' },
  { name: 'Revenue', type: 'measure', defAggFn: 'sum' },
];

const REGIONS  = ['Americas', 'EMEA', 'APAC'];
const PRODUCTS = ['Enterprise', 'Mid-market', 'SMB'];
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

const baseRevenue: Record<string, Record<string, number>> = {
  Americas:  { Enterprise: 480, 'Mid-market': 280, SMB: 140 },
  EMEA:      { Enterprise: 360, 'Mid-market': 220, SMB: 105 },
  APAC:      { Enterprise: 290, 'Mid-market': 175, SMB: 90  },
};

const data = QUARTERS.flatMap((q, qi) =>
  REGIONS.flatMap(region =>
    PRODUCTS.map(product => ({
      Quarter: q,
      Region:  region,
      Product: product,
      Revenue: Math.round(baseRevenue[region][product] * (1 + qi * 0.08) * 1000),
    })),
  ),
);

interface Props { width?: number; height?: number; }

export const MuzeTrellisChart: React.FC<Props> = ({ width = 600, height = 320 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || width < 10 || height < 10) return;

    const { DataModel } = muze;
    const formattedData = DataModel.loadDataSync(data, schema);
    const dm = new DataModel(formattedData);

    const env = muze();
    const canvas = env.canvas();

    canvas
      .data(dm)
      .rows(['Revenue'])
      .columns(['Region', 'Quarter'])
      .color('Product', { range: chartColors.slice(0, 3) })
      .width(width)
      .height(height)
      .mount(containerRef.current);

    canvasRef.current = canvas;

    return () => {
      canvasRef.current?.dispose();
      canvasRef.current = null;
    };
  }, [width, height]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};
