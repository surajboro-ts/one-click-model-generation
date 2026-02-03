import React from 'react';
import { Avatar } from '../../../components/Avatar';
import { Chip } from '../../../components/Chip';
import { tableStyles as styles } from '../styles';
import { brandColors } from '../../../tokens/colors/brand';
import { spacing } from '../../../tokens/spacing';
import { Group, organizations, getRelativeTime } from '../data/mockData';

interface GroupsTableProps {
  groups: Group[];
  onGroupClick?: (group: Group) => void;
}

/**
 * GroupsTable Component
 * 
 * Data table showing groups with their details.
 */
export const GroupsTable: React.FC<GroupsTableProps> = ({
  groups,
  onGroupClick,
}) => {
  // Get org names for a group
  const getOrgNames = (orgIds: string[]): string[] => {
    return orgIds.map(id => {
      const org = organizations.find(o => o.id === id);
      return org?.name || id;
    });
  };

  return (
    <div style={styles.container}>
      {/* Table Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          padding: `${spacing.C}px ${spacing.D}px`,
          backgroundColor: brandColors.gray[10],
          borderBottom: `1px solid ${brandColors.gray[20]}`,
          fontSize: '12px',
          fontWeight: 600,
          color: brandColors.gray[60],
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
        }}
      >
        <div>Name</div>
        <div>Orgs</div>
        <div>Members</div>
        <div>Created by</div>
        <div>Created</div>
      </div>

      {/* Table Rows */}
      {groups.map((group, index) => {
        const orgNames = getOrgNames(group.orgs);
        const displayOrgs = orgNames.slice(0, 2);
        const moreCount = orgNames.length - 2;

        return (
          <div
            key={group.id}
            onClick={() => onGroupClick?.(group)}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              padding: `${spacing.C}px ${spacing.D}px`,
              borderBottom: index === groups.length - 1 ? 'none' : `1px solid ${brandColors.gray[20]}`,
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = brandColors.gray[10];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {/* Name */}
            <div>
              <div style={{ fontWeight: 500, color: brandColors.blue[60], fontSize: '14px' }}>
                {group.displayName}
              </div>
              {group.description && (
                <div style={{ fontSize: '12px', color: brandColors.gray[50], marginTop: '2px' }}>
                  {group.description.length > 50 
                    ? `${group.description.substring(0, 50)}...` 
                    : group.description
                  }
                </div>
              )}
            </div>

            {/* Orgs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {displayOrgs.map((orgName, i) => (
                <Chip key={i} label={orgName} size="s" />
              ))}
              {moreCount > 0 && (
                <span style={{ fontSize: '12px', color: brandColors.blue[60], fontWeight: 500 }}>
                  +{moreCount} more
                </span>
              )}
            </div>

            {/* Members */}
            <div style={{ fontSize: '14px', color: brandColors.gray[70] }}>
              {group.memberCount}
            </div>

            {/* Created by */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar name={group.createdBy.name} size="xs" />
              <span style={{ fontSize: '13px', color: brandColors.gray[70] }}>
                {group.createdBy.name}
              </span>
            </div>

            {/* Created */}
            <div style={{ fontSize: '13px', color: brandColors.gray[50] }}>
              {getRelativeTime(group.createdAt)}
            </div>
          </div>
        );
      })}

      {groups.length === 0 && (
        <div style={{ 
          padding: '48px', 
          textAlign: 'center',
          color: brandColors.gray[50],
          fontSize: '14px',
        }}>
          No groups found. Click "Add group" to create one.
        </div>
      )}
    </div>
  );
};

export default GroupsTable;
