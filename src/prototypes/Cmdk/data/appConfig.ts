import type { SidebarCategory, SidebarNavItem, SidebarTab } from '../../../components/AppSidebar';

export type AppTabId = 'insights' | 'data' | 'develop' | 'admin';
export type SearchVariant = 'option1' | 'option2' | 'option3';

const nav = (id: string, label: string, badge?: SidebarNavItem['badge']): SidebarNavItem => ({
  id,
  label,
  badge,
});

export const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights' },
  { id: 'data', label: 'Data', headerTitle: 'Data Workspace' },
  { id: 'develop', label: 'Develop', headerTitle: 'Develop' },
  { id: 'admin', label: 'Admin', headerTitle: 'Admin' },
];

export const SIDEBAR_CATEGORIES: Record<AppTabId, SidebarCategory[]> = {
  insights: [
    {
      title: 'Navigation',
      items: [
        nav('home', 'Home'),
        nav('liveboards', 'Liveboards'),
        nav('spotter', 'Spotter'),
      ],
    },
    {
      title: 'Quick access',
      items: [
        nav('search-results', 'Search Results'),
        nav('collections', 'Collections'),
      ],
    },
  ],
  data: [
    {
      title: 'Data Workspace',
      items: [
        nav('data-objects', 'Data objects'),
        nav('connections', 'Connections'),
        nav('analyst-studio', 'Analyst Studio'),
        nav('utilities', 'Utilities'),
        nav('sync', 'Sync'),
        nav('reference-questions', 'Reference questions'),
        nav('business-terms', 'Business terms'),
        nav('data-catalog', 'Data catalog'),
        nav('usage', 'Usage'),
        nav('dbt', 'dbt'),
      ],
    },
  ],
  develop: [
    {
      title: 'Develop',
      items: [
        nav('develop-home', 'Home'),
        nav('visual-embed-sdk-guide', 'Visual Embed SDK Guide'),
        nav('playground', 'Playground'),
        nav('rest-api-guide', 'REST API Guide'),
        nav('rest-playground-v2', 'REST Playground v2.0'),
        nav('rest-playground-v1', 'REST Playground v1'),
        nav('graphql-v2', 'GraphQL v2.0'),
        nav('theme-builder', 'Theme Builder'),
        nav('custom-actions', 'Custom actions'),
        nav('styles', 'Styles'),
        nav('links-settings', 'Links settings'),
        nav('security-settings', 'Security settings'),
        nav('webhooks', 'Webhooks'),
      ],
    },
  ],
  admin: [
    {
      title: 'Overview',
      items: [
        nav('resource-control-centre', 'Resource control centre'),
        nav('ai-and-bi-stats', 'AI and BI Stats'),
        nav('billing-stats', 'Billing stats'),
      ],
    },
    {
      title: 'Users & Orgs',
      items: [
        nav('org-management', 'Org management'),
        nav('user-management', 'User management'),
        nav('usage-insights', 'Usage insights'),
      ],
    },
    {
      title: 'Application Settings',
      items: [
        nav('general-settings', 'General settings'),
        nav('agent-settings', 'Agent settings'),
        nav('simulations-impersonation', 'Simulations & Impersonation'),
        nav('feature-management', 'Feature management'),
        nav('customisations', 'Customisations'),
        nav('core-features', 'Core features'),
        nav('governance-security', 'Governance & Security'),
        nav('connections-integrations', 'Connections & Integrations'),
        nav('infrastructure-support', 'Infrastructure & Support'),
        nav('thoughtspot-ai', 'ThoughtSpot AI'),
        nav('variables', 'Variables'),
        nav('version-control', 'Version control'),
      ],
    },
  ],
};

export const DEFAULT_TAB: AppTabId = 'insights';
export const DEFAULT_NAV_BY_TAB: Record<AppTabId, string> = {
  insights: 'home',
  data: 'data-objects',
  develop: 'develop-home',
  admin: 'resource-control-centre',
};

export const ADMIN_OVERVIEW_NAV_IDS = new Set([
  'resource-control-centre',
  'ai-and-bi-stats',
  'billing-stats',
]);

const toLookupKey = (value: string): string =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const allNavItemsByTab = Object.entries(SIDEBAR_CATEGORIES).reduce(
  (acc, [tabId, categories]) => {
    const flattened = categories.flatMap((category) => category.items);
    acc[tabId as AppTabId] = flattened;
    return acc;
  },
  {} as Record<AppTabId, SidebarNavItem[]>,
);

export const NAV_ITEMS_BY_TAB = allNavItemsByTab;

const pageLookup = new Map<string, string>();
const navLabelLookup = new Map<string, string>();

Object.values(allNavItemsByTab).forEach((items) => {
  items.forEach((item) => {
    pageLookup.set(toLookupKey(item.id), item.id);
    pageLookup.set(toLookupKey(item.label), item.id);
    navLabelLookup.set(item.id, item.label);
  });
});

export function findNavIdForPage(page: string): string | undefined {
  return pageLookup.get(toLookupKey(page));
}

export function getNavLabel(navId: string): string {
  return navLabelLookup.get(navId) ?? navId;
}

export function filterAdminCategories(query: string): SidebarCategory[] {
  if (!query.trim()) {
    return SIDEBAR_CATEGORIES.admin;
  }

  const lowerQuery = query.toLowerCase();
  return SIDEBAR_CATEGORIES.admin
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.label.toLowerCase().includes(lowerQuery)),
    }))
    .filter((category) => category.items.length > 0);
}
