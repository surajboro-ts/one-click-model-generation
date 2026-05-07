import React, { useEffect, useRef } from 'react';
import muze from '@viz/muze';
import '@viz/muze/muze.css';
import { chartColors } from '../../_shared/tiles/chartPalette';

const schema = [
  { name: 'Quarter', type: 'dimension' },
  { name: 'Segment', type: 'dimension' },
  { name: 'Revenue', type: 'measure', defAggFn: 'sum' },
];

const data = [
  { Quarter: 'Q1', Segment: 'New business',  Revenue: 320000 },
  { Quarter: 'Q1', Segment: 'Renewals',      Revenue: 405000 },
  { Quarter: 'Q2', Segment: 'New business',  Revenue: 410000 },
  { Quarter: 'Q2', Segment: 'Renewals',      Revenue: 480000 },
  { Quarter: 'Q3', Segment: 'New business',  Revenue: 460000 },
  { Quarter: 'Q3', Segment: 'Renewals',      Revenue: 525000 },
  { Quarter: 'Q4', Segment: 'New business',  Revenue: 540000 },
  { Quarter: 'Q4', Segment: 'Renewals',      Revenue: 610000 },
];

interface Props { width?: number; height?: number; }

export const MuzeDualColumnChart: React.FC<Props> = ({ width = 600, height = 320 }) => {
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
      .color('Segment', { range: chartColors.slice(0, 2) })
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
