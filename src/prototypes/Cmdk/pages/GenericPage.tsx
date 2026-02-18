import React from 'react';
import { Card, Typography } from '../../../components';

export interface GenericPageProps {
  title: string;
  category: string;
  description?: string;
}

export const GenericPage: React.FC<GenericPageProps> = ({ title, category, description }) => {
  return (
    <div style={styles.page}>
      <Typography variant="page-title" noMargin>
        {title}
      </Typography>
      <Typography variant="body-normal" color="gray" noMargin>
        {category}
      </Typography>

      <Card>
        <Card.Header title={`${title} page`} subtitle="Prototype placeholder content" />
        <Card.Body>
          <Typography variant="body-normal" noMargin>
            {description
              ?? 'This section is wired to the full app shell and command navigation. Page-specific UX can be expanded as needed.'}
          </Typography>
        </Card.Body>
      </Card>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: 'grid',
    gap: 12,
    padding: 24,
  },
};

export default GenericPage;
