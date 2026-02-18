import React from 'react';
import { Card, ProgressBar, Typography } from '../../../components';

const RESOURCE_CARDS = [
  { id: 'cpu', label: 'Query CPU', value: 71, color: 'blue' as const, note: 'Within target thresholds' },
  { id: 'memory', label: 'Memory', value: 62, color: 'green' as const, note: 'Healthy usage pattern' },
  { id: 'cache', label: 'Cache hit rate', value: 84, color: 'green' as const, note: 'Improving over last 24h' },
  { id: 'jobs', label: 'Background jobs', value: 43, color: 'yellow' as const, note: 'Review queued jobs' },
];

export const CommandCentrePage: React.FC = () => {
  return (
    <div style={styles.page}>
      <div>
        <Typography variant="page-title" noMargin>
          Resource control centre
        </Typography>
        <Typography variant="body-normal" color="gray" noMargin>
          Monitor health and capacity across services
        </Typography>
      </div>

      <div style={styles.grid}>
        {RESOURCE_CARDS.map((resource) => (
          <Card key={resource.id}>
            <Card.Body>
              <Typography variant="content-label-subhead" color="gray" noMargin>
                {resource.label}
              </Typography>
              <ProgressBar value={resource.value} showValue label={`${resource.value}%`} color={resource.color} />
              <Typography variant="footnote" color="gray" noMargin>
                {resource.note}
              </Typography>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: 'grid',
    gap: 16,
    padding: 24,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 12,
  },
};

export default CommandCentrePage;
