import React, { useEffect, useRef } from 'react';
import muze from '@viz/muze';
import '@viz/muze/muze.css';
import { chartColors } from '../chartPalette';

const schema = [
  { name: 'Quarter', type: 'dimension' },
  { name: 'Product',  type: 'dimension' },
  { name: 'Revenue',  type: 'measure', defAggFn: 'sum' },
];

const data = [
  { Quarter: 'Q1', Product: 'Enterprise', Revenue: 420000 },
  { Quarter: 'Q1', Product: 'Mid-market', Revenue: 210000 },
  { Quarter: 'Q1', Product: 'SMB',        Revenue: 95000  },
  { Quarter: 'Q2', Product: 'Enterprise', Revenue: 510000 },
  { Quarter: 'Q2', Product: 'Mid-market', Revenue: 260000 },
  { Quarter: 'Q2', Product: 'SMB',        Revenue: 112000 },
  { Quarter: 'Q3', Product: 'Enterprise', Revenue: 480000 },
  { Quarter: 'Q3', Product: 'Mid-market', Revenue: 295000 },
  { Quarter: 'Q3', Product: 'SMB',        Revenue: 130000 },
  { Quarter: 'Q4', Product: 'Enterprise', Revenue: 620000 },
  { Quarter: 'Q4', Product: 'Mid-market', Revenue: 340000 },
  { Quarter: 'Q4', Product: 'SMB',        Revenue: 158000 },
];

interface Props { width?: number; height?: number; }

export const MuzeColumnChart: React.FC<Props> = ({ width = 300, height = 180 }) => {
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
      .columns(['Quarter'])
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
