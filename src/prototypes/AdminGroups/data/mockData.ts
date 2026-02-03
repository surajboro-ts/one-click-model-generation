/**
 * Mock data for Admin Groups prototype
 */

// Organization types
export interface Organization {
  id: string;
  name: string;
  type: 'primary' | 'sub';
  userCount?: number;
}

// Role types
export interface Role {
  id: string;
  name: string;
  description: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Group types
export interface Group {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  orgs: string[];
  roles: { orgId: string; roleId: string }[];
  users: string[];
  parentGroupId?: string;
  createdAt: Date;
  createdBy: User;
  memberCount: number;
}

// 25+ mock organizations for bulk selection
export const organizations: Organization[] = [
  { id: 'org-entire', name: 'Entire _org', type: 'primary' },
  { id: 'org-zomato', name: 'Zomato', type: 'sub', userCount: 150 },
  { id: 'org-hul', name: 'HUL', type: 'sub', userCount: 280 },
  { id: 'org-png', name: 'PnG', type: 'sub', userCount: 320 },
  { id: 'org-britannia', name: 'Britannia', type: 'sub', userCount: 95 },
  { id: 'org-demo-retail', name: 'Demo Retail Org', type: 'sub', userCount: 45 },
  { id: 'org-2', name: 'Org2', type: 'sub', userCount: 120 },
  { id: 'org-ananda', name: 'Ananda', type: 'sub', userCount: 85 },
  { id: 'org-denmark', name: 'Denmark', type: 'sub', userCount: 200 },
  { id: 'org-engineering', name: 'Engineering', type: 'sub', userCount: 450 },
  { id: 'org-finance', name: 'Finance', type: 'sub', userCount: 180 },
  { id: 'org-marketing', name: 'Marketing', type: 'sub', userCount: 220 },
  { id: 'org-sales', name: 'Sales', type: 'sub', userCount: 380 },
  { id: 'org-hr', name: 'Human Resources', type: 'sub', userCount: 65 },
  { id: 'org-product', name: 'Product', type: 'sub', userCount: 140 },
  { id: 'org-design', name: 'Design', type: 'sub', userCount: 75 },
  { id: 'org-support', name: 'Customer Support', type: 'sub', userCount: 290 },
  { id: 'org-legal', name: 'Legal', type: 'sub', userCount: 35 },
  { id: 'org-ops', name: 'Operations', type: 'sub', userCount: 210 },
  { id: 'org-it', name: 'IT', type: 'sub', userCount: 95 },
  { id: 'org-data', name: 'Data Science', type: 'sub', userCount: 110 },
  { id: 'org-security', name: 'Security', type: 'sub', userCount: 45 },
  { id: 'org-qa', name: 'Quality Assurance', type: 'sub', userCount: 80 },
  { id: 'org-devops', name: 'DevOps', type: 'sub', userCount: 55 },
  { id: 'org-analytics', name: 'Analytics', type: 'sub', userCount: 125 },
];

// Available roles
export const roles: Role[] = [
  { id: 'role-view', name: 'Can view', description: 'View access only' },
  { id: 'role-edit', name: 'Can edit', description: 'View and edit access' },
  { id: 'role-admin', name: 'Can administer', description: 'Full admin access' },
  { id: 'role-developer', name: 'Developer', description: 'API and embed access' },
  { id: 'role-analyst', name: 'Analyst', description: 'Analytics and reporting access' },
];

// Mock users
export const users: User[] = [
  { id: 'usr-1', name: 'Simran Pandit', email: 'simran.pandit@example.com' },
  { id: 'usr-2', name: 'Aisha Raza', email: 'aisha.raza@example.com' },
  { id: 'usr-3', name: 'Raj Patel', email: 'raj.patel@example.com' },
  { id: 'usr-4', name: 'Maya Chen', email: 'maya.chen@example.com' },
  { id: 'usr-5', name: 'James Wilson', email: 'james.wilson@example.com' },
  { id: 'usr-6', name: 'Sofia Garcia', email: 'sofia.garcia@example.com' },
  { id: 'usr-7', name: 'Alex Kim', email: 'alex.kim@example.com' },
  { id: 'usr-8', name: 'Priya Sharma', email: 'priya.sharma@example.com' },
  { id: 'usr-9', name: 'David Brown', email: 'david.brown@example.com' },
  { id: 'usr-10', name: 'Emma Johnson', email: 'emma.johnson@example.com' },
];

// Existing groups (for parent selection)
export const existingGroups: Group[] = [
  {
    id: 'grp-1',
    name: 'all-users',
    displayName: 'All Users',
    description: 'Default group containing all users',
    orgs: ['org-entire'],
    roles: [{ orgId: 'org-entire', roleId: 'role-view' }],
    users: ['usr-1', 'usr-2', 'usr-3', 'usr-4', 'usr-5'],
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    createdBy: users[0],
    memberCount: 500,
  },
  {
    id: 'grp-2',
    name: 'admins',
    displayName: 'Administrators',
    description: 'System administrators with full access',
    orgs: ['org-entire', 'org-engineering', 'org-it'],
    roles: [
      { orgId: 'org-entire', roleId: 'role-admin' },
      { orgId: 'org-engineering', roleId: 'role-admin' },
      { orgId: 'org-it', roleId: 'role-admin' },
    ],
    users: ['usr-1', 'usr-3'],
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    createdBy: users[0],
    memberCount: 25,
  },
  {
    id: 'grp-3',
    name: 'analysts',
    displayName: 'Data Analysts',
    description: 'Analytics team members',
    orgs: ['org-data', 'org-analytics'],
    roles: [
      { orgId: 'org-data', roleId: 'role-analyst' },
      { orgId: 'org-analytics', roleId: 'role-analyst' },
    ],
    users: ['usr-4', 'usr-7', 'usr-8'],
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    createdBy: users[3],
    memberCount: 85,
  },
  {
    id: 'grp-4',
    name: 'developers',
    displayName: 'Developers',
    description: 'Development team with API access',
    orgs: ['org-engineering', 'org-devops'],
    roles: [
      { orgId: 'org-engineering', roleId: 'role-developer' },
      { orgId: 'org-devops', roleId: 'role-developer' },
    ],
    users: ['usr-2', 'usr-5', 'usr-6', 'usr-9'],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    createdBy: users[1],
    memberCount: 120,
  },
  {
    id: 'grp-5',
    name: 'viewers',
    displayName: 'Viewers',
    description: 'Read-only access group',
    orgs: ['org-entire'],
    roles: [{ orgId: 'org-entire', roleId: 'role-view' }],
    users: ['usr-10'],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    createdBy: users[0],
    memberCount: 350,
  },
];

// Admin navigation items
export interface AdminNavItem {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
  nested?: boolean;
}

export interface AdminNavSection {
  id: string;
  label: string;
  items: AdminNavItem[];
}

export const adminNavSections: AdminNavSection[] = [
  {
    id: 'dashboard',
    label: '',
    items: [
      { id: 'admin-dashboard', label: 'Admin Dashboard' },
    ],
  },
  {
    id: 'orgs',
    label: 'ORGS',
    items: [
      { id: 'orgs-list', label: 'Orgs' },
    ],
  },
  {
    id: 'users',
    label: 'USERS',
    items: [
      { id: 'users-list', label: 'Users' },
      { id: 'groups', label: 'Groups', active: true },
    ],
  },
  {
    id: 'app-settings',
    label: 'APPLICATION SETTINGS',
    items: [
      { id: 'search', label: 'Search' },
      { id: 'style', label: 'Style customization' },
      { id: 'onboarding', label: 'Onboarding' },
      { id: 'email', label: 'Email and onboarding' },
      { id: 'spotter', label: 'Spotter' },
    ],
  },
  {
    id: 'security',
    label: 'SECURITY & PERFORMANCE',
    items: [
      { id: 'security', label: 'Security' },
      { id: 'link-settings', label: 'Link settings' },
    ],
  },
];

// Table tabs
export const groupTabs = [
  { id: 'local', label: 'Local' },
  { id: 'ldap', label: 'LDAP' },
];

// Format relative time
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
}
