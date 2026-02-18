import React, { useMemo } from 'react';
import { Card, Table, Typography } from '../../../components';
import type { ThoughtSpotObject, ThoughtSpotObjectType } from '../data/mockData';

interface LibraryRow {
  id: string;
  name: string;
  type: ThoughtSpotObjectType;
  author: string;
}

export interface LibrarySearchDropdownProps {
  isOpen: boolean;
  query: string;
  objects: ThoughtSpotObject[];
  onOpenObject: (objectId: string, objectType: ThoughtSpotObjectType) => void;
  onClose: () => void;
}

export const LibrarySearchDropdown: React.FC<LibrarySearchDropdownProps> = ({
  isOpen,
  query,
  objects,
  onOpenObject,
  onClose,
}) => {
  const rows = useMemo<LibraryRow[]>(() => {
    if (!query.trim()) {
      return [];
    }

    return objects
      .filter(
        (object) =>
          object.name.toLowerCase().includes(query.toLowerCase())
          || object.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
      )
      .slice(0, 12)
      .map((object) => ({
        id: object.id,
        name: object.name,
        type: object.type,
        author: object.author,
      }));
  }, [objects, query]);

  if (!isOpen || !query.trim()) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <button type="button" aria-label="Close library search" style={styles.backdrop} onClick={onClose} />
      <div style={styles.dropdown}>
        <Card>
          <Card.Header title="Library search" subtitle={`${rows.length} results for "${query}"`} />
          <Card.Body noPadding>
            <Table<LibraryRow>
              columns={[
                {
                  key: 'name',
                  label: 'Object',
                  render: (value, row) => (
                    <button style={styles.linkButton} onClick={() => onOpenObject(row.id, row.type)}>
                      {String(value)}
                    </button>
                  ),
                },
                { key: 'type', label: 'Type', width: '140px' },
                { key: 'author', label: 'Author', width: '200px' },
              ]}
              data={rows}
              rowKey="id"
              hoverable
              emptyMessage="No matching library objects"
            />
          </Card.Body>
        </Card>
        <Typography variant="footnote" color="gray" noMargin>
          Option 3 active: inline library search replaces Cmd+K palette.
        </Typography>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 1400,
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    border: 'none',
    background: 'transparent',
    padding: 0,
    cursor: 'default',
  },
  dropdown: {
    position: 'absolute',
    top: 74,
    right: 24,
    width: 520,
    maxHeight: '70vh',
    overflow: 'auto',
    display: 'grid',
    gap: 8,
  },
  linkButton: {
    border: 'none',
    background: 'transparent',
    color: '#2770EF',
    cursor: 'pointer',
    font: 'inherit',
    padding: 0,
    textAlign: 'left',
  },
};

export default LibrarySearchDropdown;
