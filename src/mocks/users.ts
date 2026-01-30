/**
 * Mock User Data
 * 
 * Sample user profiles for prototyping user-related interfaces.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
  avatar?: string;
  department: string;
  status: 'active' | 'pending' | 'inactive';
  lastActive: string;
  createdAt: string;
}

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  permissions: string[];
}

/**
 * Sample user profiles
 */
export const profiles: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex.johnson@thoughtspot.com',
    role: 'admin',
    department: 'Engineering',
    status: 'active',
    lastActive: '2 hours ago',
    createdAt: 'Jan 15, 2024',
  },
  {
    id: 'user-2',
    name: 'Sarah Chen',
    email: 'sarah.chen@thoughtspot.com',
    role: 'analyst',
    department: 'Data Science',
    status: 'active',
    lastActive: '5 minutes ago',
    createdAt: 'Feb 20, 2024',
  },
  {
    id: 'user-3',
    name: 'Michael Roberts',
    email: 'michael.r@thoughtspot.com',
    role: 'viewer',
    department: 'Marketing',
    status: 'active',
    lastActive: '1 day ago',
    createdAt: 'Mar 10, 2024',
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily.davis@thoughtspot.com',
    role: 'analyst',
    department: 'Finance',
    status: 'pending',
    lastActive: 'Never',
    createdAt: 'Apr 5, 2024',
  },
  {
    id: 'user-5',
    name: 'James Wilson',
    email: 'james.w@thoughtspot.com',
    role: 'viewer',
    department: 'Sales',
    status: 'inactive',
    lastActive: '30 days ago',
    createdAt: 'Dec 1, 2023',
  },
  {
    id: 'user-6',
    name: 'Lisa Thompson',
    email: 'lisa.t@thoughtspot.com',
    role: 'admin',
    department: 'Product',
    status: 'active',
    lastActive: '1 hour ago',
    createdAt: 'Jan 8, 2024',
  },
  {
    id: 'user-7',
    name: 'David Kim',
    email: 'david.kim@thoughtspot.com',
    role: 'analyst',
    department: 'Operations',
    status: 'active',
    lastActive: '3 hours ago',
    createdAt: 'Feb 28, 2024',
  },
  {
    id: 'user-8',
    name: 'Rachel Green',
    email: 'rachel.g@thoughtspot.com',
    role: 'viewer',
    department: 'HR',
    status: 'active',
    lastActive: '2 days ago',
    createdAt: 'Mar 22, 2024',
  },
];

/**
 * Sample user groups
 */
export const groups: UserGroup[] = [
  {
    id: 'group-1',
    name: 'All Users',
    description: 'Default group for all organization members',
    memberCount: 156,
    permissions: ['view_answers', 'create_answers'],
  },
  {
    id: 'group-2',
    name: 'Data Analysts',
    description: 'Team members with analyst permissions',
    memberCount: 24,
    permissions: ['view_answers', 'create_answers', 'create_worksheets', 'share'],
  },
  {
    id: 'group-3',
    name: 'Administrators',
    description: 'Full administrative access',
    memberCount: 5,
    permissions: ['admin', 'view_answers', 'create_answers', 'create_worksheets', 'share', 'manage_users'],
  },
  {
    id: 'group-4',
    name: 'Marketing Team',
    description: 'Marketing department members',
    memberCount: 18,
    permissions: ['view_answers'],
  },
  {
    id: 'group-5',
    name: 'Executive Leadership',
    description: 'C-suite and VP level access',
    memberCount: 8,
    permissions: ['view_answers', 'view_sensitive'],
  },
];

/**
 * Current user (for auth/session contexts)
 */
export const currentUser: User = profiles[0];

/**
 * Role labels for display
 */
export const roleLabels: Record<User['role'], string> = {
  admin: 'Administrator',
  analyst: 'Data Analyst',
  viewer: 'Viewer',
};

/**
 * Status colors for chips
 */
export const statusVariants: Record<User['status'], 'success' | 'warning' | 'default'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'default',
};

export default {
  profiles,
  groups,
  currentUser,
  roleLabels,
  statusVariants,
};
