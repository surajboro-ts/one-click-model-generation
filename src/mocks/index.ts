/**
 * Mock Data Module
 * 
 * Centralized exports for all mock data used in prototypes.
 * Import from this file to access sample data for your UIs.
 * 
 * @example
 * ```tsx
 * import { users, analytics, navigation, forms } from '../../mocks';
 * 
 * // Use in your prototype
 * const userList = users.profiles;
 * const metrics = analytics.metrics;
 * const sidebarItems = navigation.sidebar;
 * const countryOptions = forms.countries;
 * ```
 */

// User data
import usersData, {
  profiles,
  groups,
  currentUser,
  roleLabels,
  statusVariants as userStatusVariants,
} from './users';
export type { User, UserGroup } from './users';

// Analytics data
import analyticsData, {
  metrics,
  revenueByMonth,
  revenueByRegion,
  productBreakdown,
  answers,
  liveboards,
  statusVariants as analyticsStatusVariants,
} from './analytics';
export type { Metric, ChartDataPoint, TableRow, Answer, Liveboard } from './analytics';

// Navigation data
import navigationData, {
  sidebar,
  settingsSidebar,
  adminSidebar,
  breadcrumbs,
  tabs,
  actionMenuItems,
} from './navigation';
export type { NavItem, Breadcrumb, TabItem } from './navigation';

// Form data
import formsData, {
  countries,
  regions,
  departments,
  statuses,
  timeRanges,
  sortOptions,
  chartTypes,
  permissions,
  dataSources,
  timezones,
  frequencies,
} from './forms';
export type { SelectOption, FilterOption } from './forms';

/**
 * Namespace exports for organized access
 */
export const users = {
  ...usersData,
  profiles,
  groups,
  currentUser,
  roleLabels,
  statusVariants: userStatusVariants,
};

export const analytics = {
  ...analyticsData,
  metrics,
  revenueByMonth,
  revenueByRegion,
  productBreakdown,
  answers,
  liveboards,
  statusVariants: analyticsStatusVariants,
};

export const navigation = {
  ...navigationData,
  sidebar,
  settingsSidebar,
  adminSidebar,
  breadcrumbs,
  tabs,
  actionMenuItems,
};

export const forms = {
  ...formsData,
  countries,
  regions,
  departments,
  statuses,
  timeRanges,
  sortOptions,
  chartTypes,
  permissions,
  dataSources,
  timezones,
  frequencies,
};

/**
 * Default export with all mock data
 */
export default {
  users,
  analytics,
  navigation,
  forms,
};
