import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, CheckCircle, Folder, Layout, Database, Wrench, Settings, BarChart2, Table as TableIcon, Link, Users, Shield, Activity, Globe, FileText, HelpCircle, Clock, PieChart, Send, BookOpen } from 'lucide-react';
import { SearchIcon, AnswerIcon, SettingsIcon, ModelIcon, NavigateIcon, PlusIcon, InfoIcon, SpotterIcon } from './FigmaIcons';
import { allMockObjects } from '../data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, tab?: string, query?: string, appTab?: string) => void;
  onScopeChange?: (scope: 'instance' | 'org') => void;
  onObjectSearch?: (query: string, objectType?: string) => void;
  onOpenObject?: (objectId: string, objectType: string) => void;
  currentAdminPage: string;
  initialFilter?: string; // Add initial filter support
  currentContext?: {
    tab: 'insights' | 'data' | 'develop' | 'admin';
    page?: string;
  };
}

// Admin commands
const ADMIN_COMMANDS = [
  // Overview
  { id: 'cmd-cc', label: 'Resource Control Centre', page: 'Resource control centre', type: 'Navigate', icon: 'Settings', category: 'Overview', description: 'Overview / Resource control centre', rightLabel: 'Admin' },
  { id: 'cmd-ai', label: 'AI and BI Stats', page: 'AI and BI Stats', type: 'Navigate', icon: 'Settings', category: 'Overview', description: 'Overview / AI and BI Stats', rightLabel: 'Admin' },
  { id: 'cmd-billing', label: 'Billing Stats', page: 'Billing stats', type: 'Navigate', icon: 'Settings', category: 'Overview', description: 'Overview / Billing stats', rightLabel: 'Admin' },
  
  // User Management
  { id: 'cmd-users-main', label: 'User Management', page: 'User management', tab: 'users', type: 'Navigate', icon: 'Settings', category: 'Users & Orgs', description: 'Users & Orgs / User management', rightLabel: 'Admin' },
  { id: 'cmd-users-users', label: 'Users', page: 'User management', tab: 'users', type: 'Navigate', icon: 'Settings', category: 'Users & Orgs', description: 'Users & Orgs / User management', rightLabel: 'Admin' },
  { id: 'cmd-users-groups', label: 'Groups', page: 'User management', tab: 'groups', type: 'Navigate', icon: 'Settings', category: 'Users & Orgs', description: 'Users & Orgs / User management', rightLabel: 'Admin' },
  { id: 'cmd-users-auth', label: 'Authentication', page: 'User management', tab: 'authentication', type: 'Navigate', icon: 'Settings', category: 'Users & Orgs', description: 'Users & Orgs / User management', rightLabel: 'Admin' },
  
  // Org Management
  { id: 'cmd-org', label: 'Org Management', page: 'Org management', type: 'Navigate', icon: 'Settings', category: 'Users & Orgs', description: 'Users & Orgs / Org management', rightLabel: 'Admin' },
  
  // Usage Insights
  { id: 'cmd-usage-main', label: 'Usage Insights', page: 'Usage insights', tab: 'user adoption', type: 'Navigate', icon: 'Settings', category: 'Users & Orgs', description: 'Users & Orgs / Usage insights', rightLabel: 'Admin' },
  { id: 'cmd-usage-adoption', label: 'User Adoption', page: 'Usage insights', tab: 'user adoption', type: 'Navigate', icon: 'Settings', category: 'Users & Orgs', description: 'Users & Orgs / Usage insights', rightLabel: 'Admin' },
  { id: 'cmd-usage-object', label: 'Object Usage', page: 'Usage insights', tab: 'object usage', type: 'Navigate', icon: 'Settings', category: 'Users & Orgs', description: 'Users & Orgs / Usage insights', rightLabel: 'Admin' },
  { id: 'cmd-usage-prod', label: 'User Productivity', page: 'Usage insights', tab: 'user productivity', type: 'Navigate', icon: 'Settings', category: 'Users & Orgs', description: 'Users & Orgs / Usage insights', rightLabel: 'Admin' },
  { id: 'cmd-usage-perf', label: 'Performance Tracking', page: 'Usage insights', tab: 'performance tracking', type: 'Navigate', icon: 'Settings', category: 'Users & Orgs', description: 'Users & Orgs / Usage insights', rightLabel: 'Admin' },

  // General Settings
  { id: 'cmd-general-main', label: 'General Settings', page: 'General settings', tab: 'language', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / General settings', rightLabel: 'Admin' },
  { id: 'cmd-general-lang', label: 'Language', page: 'General settings', tab: 'language', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / General settings', rightLabel: 'Admin' },
  { id: 'cmd-general-time', label: 'Time Zone', page: 'General settings', tab: 'time zone', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / General settings', rightLabel: 'Admin' },
  { id: 'cmd-general-curr', label: 'Currency', page: 'General settings', tab: 'currency', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / General settings', rightLabel: 'Admin' },
  { id: 'cmd-general-admin', label: 'Administration', page: 'General settings', tab: 'administration', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / General settings', rightLabel: 'Admin' },

  // Agent Settings
  { id: 'cmd-agent-main', label: 'Agent Settings', page: 'Agent settings', tab: 'spotter', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Agent settings', rightLabel: 'Admin' },
  { id: 'cmd-agent-spotter', label: 'Spotter', page: 'Agent settings', tab: 'spotter', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Agent settings', rightLabel: 'Admin' },
  { id: 'cmd-agent-viz', label: 'Spotter Viz', page: 'Agent settings', tab: 'spotter viz', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Agent settings', rightLabel: 'Admin' },
  { id: 'cmd-agent-model', label: 'Spotter Model', page: 'Agent settings', tab: 'spotter model', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Agent settings', rightLabel: 'Admin' },
  { id: 'cmd-agent-code', label: 'Spotter Code', page: 'Agent settings', tab: 'spotter code', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Agent settings', rightLabel: 'Admin' },

  // Simulations & Impersonation
  { id: 'cmd-sim-main', label: 'Simulations & Impersonation', page: 'Simulations & Impersonation', tab: 'policy sandbox', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Simulations & Impersonation', rightLabel: 'Admin' },
  { id: 'cmd-sim-policy', label: 'Policy Sandbox', page: 'Simulations & Impersonation', tab: 'policy sandbox', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Simulations & Impersonation', rightLabel: 'Admin' },
  { id: 'cmd-sim-imp', label: 'Impersonation', page: 'Simulations & Impersonation', tab: 'impersonation', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Simulations & Impersonation', rightLabel: 'Admin' },

  // Feature Management
  { id: 'cmd-features-main', label: 'Feature Management', page: 'Feature management', tab: 'general access', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Feature management', rightLabel: 'Admin' },
  { id: 'cmd-features-gen', label: 'General Access', page: 'Feature management', tab: 'general access', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Feature management', rightLabel: 'Admin' },
  { id: 'cmd-features-early', label: 'Early Access', page: 'Feature management', tab: 'early access', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Feature management', rightLabel: 'Admin' },
  { id: 'cmd-features-beta', label: 'Beta Access', page: 'Feature management', tab: 'beta access', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Feature management', rightLabel: 'Admin' },

  // Customisations
  { id: 'cmd-custom-main', label: 'Customisations', page: 'Customisations', tab: 'style', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Customisations', rightLabel: 'Admin' },
  { id: 'cmd-custom-style', label: 'Style', page: 'Customisations', tab: 'style', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Customisations', rightLabel: 'Admin' },
  { id: 'cmd-custom-chart', label: 'Chart', page: 'Customisations', tab: 'chart', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Customisations', rightLabel: 'Admin' },
  { id: 'cmd-custom-home', label: 'Homepage', page: 'Customisations', tab: 'homepage', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Customisations', rightLabel: 'Admin' },
  { id: 'cmd-custom-email', label: 'Email', page: 'Customisations', tab: 'email', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Customisations', rightLabel: 'Admin' },
  { id: 'cmd-custom-help', label: 'Help', page: 'Customisations', tab: 'help', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Customisations', rightLabel: 'Admin' },

  // Core Features
  { id: 'cmd-core-main', label: 'Core Features', page: 'Core features', tab: 'search and spot iq', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Core features', rightLabel: 'Admin' },
  { id: 'cmd-core-search', label: 'Search and Spot IQ', page: 'Core features', tab: 'search and spot iq', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Core features', rightLabel: 'Admin' },
  { id: 'cmd-core-data', label: 'Data Modelling', page: 'Core features', tab: 'data modelling', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Core features', rightLabel: 'Admin' },
  { id: 'cmd-core-dl', label: 'Downloads & Schedules', page: 'Core features', tab: 'downloads & schedules', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Core features', rightLabel: 'Admin' },

  // Governance & Security
  { id: 'cmd-gov-main', label: 'Governance & Security', page: 'Governance & Security', tab: 'security overview', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Governance & Security', rightLabel: 'Admin' },
  { id: 'cmd-gov-sec', label: 'Security Overview', page: 'Governance & Security', tab: 'security overview', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Governance & Security', rightLabel: 'Admin' },
  { id: 'cmd-gov-audit', label: 'Audit & Logs', page: 'Governance & Security', tab: 'audit & logs', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Governance & Security', rightLabel: 'Admin' },
  { id: 'cmd-gov-pol', label: 'Security Policies', page: 'Governance & Security', tab: 'security policies', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Governance & Security', rightLabel: 'Admin' },

  // Connections & Integrations
  { id: 'cmd-conn-main', label: 'Connections & Integrations', page: 'Connections & Integrations', tab: 'connections', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Connections & Integrations', rightLabel: 'Admin' },
  { id: 'cmd-conn-conn', label: 'Connections', page: 'Connections & Integrations', tab: 'connections', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Connections & Integrations', rightLabel: 'Admin' },
  { id: 'cmd-conn-web', label: 'Webhooks', page: 'Connections & Integrations', tab: 'webhooks', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Connections & Integrations', rightLabel: 'Admin' },
  { id: 'cmd-conn-api', label: 'API & Service Accounts', page: 'Connections & Integrations', tab: 'api & service accounts', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Connections & Integrations', rightLabel: 'Admin' },

  // Infrastructure & Support
  { id: 'cmd-infra-main', label: 'Infrastructure & Support', page: 'Infrastructure & Support', tab: 'cluster info', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Infrastructure & Support', rightLabel: 'Admin' },
  { id: 'cmd-infra-cluster', label: 'Cluster Info', page: 'Infrastructure & Support', tab: 'cluster info', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Infrastructure & Support', rightLabel: 'Admin' },
  { id: 'cmd-infra-net', label: 'Network', page: 'Infrastructure & Support', tab: 'network', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Infrastructure & Support', rightLabel: 'Admin' },
  { id: 'cmd-infra-up', label: 'Upgrades', page: 'Infrastructure & Support', tab: 'upgrades', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Infrastructure & Support', rightLabel: 'Admin' },
  { id: 'cmd-infra-supp', label: 'Support', page: 'Infrastructure & Support', tab: 'support', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Infrastructure & Support', rightLabel: 'Admin' },

  // Other Pages
  { id: 'cmd-ts-ai', label: 'ThoughtSpot AI', page: 'ThoughtSpot AI', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / ThoughtSpot AI', rightLabel: 'Admin' },
  { id: 'cmd-vars', label: 'Variables', page: 'Variables', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Variables', rightLabel: 'Admin' },
  { id: 'cmd-ver', label: 'Version Control', page: 'Version control', type: 'Navigate', icon: 'Settings', category: 'Application Settings', description: 'Application Settings / Version control', rightLabel: 'Admin' },

  // DATA WORKSPACE COMMANDS
  { id: 'cmd-data-obj', label: 'Data objects', page: 'Data objects', type: 'Navigate', icon: 'Database', category: 'Data Workspace', description: 'Data Workspace / Data objects', rightLabel: 'Data', appTab: 'data' },
  { id: 'cmd-data-conn', label: 'Connections', page: 'Connections', type: 'Navigate', icon: 'Link', category: 'Data Workspace', description: 'Data Workspace / Connections', rightLabel: 'Data', appTab: 'data' },
  { id: 'cmd-data-analyst', label: 'Analyst Studio', page: 'Analyst Studio', type: 'Navigate', icon: 'BarChart2', category: 'Data Workspace', description: 'Data Workspace / Analyst Studio', rightLabel: 'Data', appTab: 'data' },
  { id: 'cmd-data-util', label: 'Utilities', page: 'Utilities', type: 'Navigate', icon: 'Wrench', category: 'Data Workspace', description: 'Data Workspace / Utilities', rightLabel: 'Data', appTab: 'data' },
  { id: 'cmd-data-sync', label: 'Sync', page: 'Sync', type: 'Navigate', icon: 'Activity', category: 'Data Workspace', description: 'Data Workspace / Sync', rightLabel: 'Data', appTab: 'data' },
  { id: 'cmd-data-ref', label: 'Reference questions', page: 'Reference questions', type: 'Navigate', icon: 'HelpCircle', category: 'Data Workspace', description: 'Data Workspace / Reference questions', rightLabel: 'Data', appTab: 'data' },
  { id: 'cmd-data-terms', label: 'Business terms', page: 'Business terms', type: 'Navigate', icon: 'BookOpen', category: 'Data Workspace', description: 'Data Workspace / Business terms', rightLabel: 'Data', appTab: 'data' },
  { id: 'cmd-data-cat', label: 'Data catalog', page: 'Data catalog', type: 'Navigate', icon: 'BookOpen', category: 'Data Workspace', description: 'Data Workspace / Data catalog', rightLabel: 'Data', appTab: 'data' },
  { id: 'cmd-data-usage', label: 'Usage', page: 'Usage', type: 'Navigate', icon: 'Activity', category: 'Data Workspace', description: 'Data Workspace / Usage', rightLabel: 'Data', appTab: 'data' },
  { id: 'cmd-data-dbt', label: 'dbt', page: 'dbt', type: 'Navigate', icon: 'Database', category: 'Data Workspace', description: 'Data Workspace / dbt', rightLabel: 'Data', appTab: 'data' },
  { id: 'cmd-data-verif', label: 'Liveboard verification', page: 'Liveboard verification', type: 'Navigate', icon: 'CheckCircle', category: 'Data Workspace', description: 'Data Workspace / Liveboard verification', rightLabel: 'Data', appTab: 'data' },

  // DEVELOP COMMANDS
  { id: 'cmd-dev-home', label: 'Develop Home', page: 'Home', type: 'Navigate', icon: 'Layout', category: 'Develop', description: 'Develop / Home', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-guide', label: 'Visual Embed SDK Guide', page: 'Guide', type: 'Navigate', icon: 'BookOpen', category: 'Develop', description: 'Develop / Guide', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-play', label: 'Playground', page: 'Playground', type: 'Navigate', icon: 'Activity', category: 'Develop', description: 'Develop / Playground', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-rest-guide', label: 'REST API Guide', page: 'REST API Guide', type: 'Navigate', icon: 'BookOpen', category: 'Develop', description: 'Develop / REST API Guide', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-rest-v2', label: 'REST Playground v2.0', page: 'REST Playground v2.0', type: 'Navigate', icon: 'Activity', category: 'Develop', description: 'Develop / REST Playground v2.0', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-rest-v1', label: 'REST Playground v1', page: 'REST Playground v1', type: 'Navigate', icon: 'Activity', category: 'Develop', description: 'Develop / REST Playground v1', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-graphql', label: 'GraphQL v2.0', page: 'GraphQL v2.0', type: 'Navigate', icon: 'Activity', category: 'Develop', description: 'Develop / GraphQL v2.0', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-theme', label: 'Theme Builder', page: 'Theme Builder', type: 'Navigate', icon: 'Layout', category: 'Develop', description: 'Develop / Theme Builder', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-action', label: 'Custom actions', page: 'Custom actions', type: 'Navigate', icon: 'Settings', category: 'Develop', description: 'Develop / Custom actions', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-styles', label: 'Styles', page: 'Styles', type: 'Navigate', icon: 'Layout', category: 'Develop', description: 'Develop / Styles', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-links', label: 'Links settings', page: 'Links settings', type: 'Navigate', icon: 'Link', category: 'Develop', description: 'Develop / Links settings', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-sec', label: 'Security settings', page: 'Security settings', type: 'Navigate', icon: 'Shield', category: 'Develop', description: 'Develop / Security settings', rightLabel: 'Develop', appTab: 'develop' },
  { id: 'cmd-dev-web', label: 'Webhooks', page: 'Webhooks', type: 'Navigate', icon: 'Activity', category: 'Develop', description: 'Develop / Webhooks', rightLabel: 'Develop', appTab: 'develop' },
];

// Filter chips
const FILTER_CHIPS = [
  { id: 'liveboard', label: 'Liveboards', icon: Layout, objectType: 'Liveboard' },
  { id: 'answer', label: 'Answers', icon: BarChart2, objectType: 'Answer' },
  { id: 'admin', label: 'Admin settings', icon: Settings, objectType: null },
  { id: 'navigate', label: 'Navigate', icon: NavigateIcon, objectType: null },
  { id: 'create', label: 'Create', icon: PlusIcon, objectType: null },
  { id: 'spotter', label: 'Spotter', icon: SpotterIcon, objectType: null },
  { id: 'datamodel', label: 'Data models', icon: Database, objectType: 'Data Model' },
  { id: 'table', label: 'Tables', icon: TableIcon, objectType: 'Table' },
  { id: 'collection', label: 'Collections', icon: Folder, objectType: 'Collection' },
];

// Icon mapper
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, any> = {
    // Figma Icons mapping
    BarChart2: AnswerIcon,
    Answer: AnswerIcon,
    Settings: SettingsIcon,
    Database: ModelIcon,
    Model: ModelIcon,
    ArrowRight: NavigateIcon,
    Navigate: NavigateIcon,
    Plus: PlusIcon,
    Action: PlusIcon,
    Info: InfoIcon,
    Sparkles: SpotterIcon,
    Spotter: SpotterIcon,
    Search: SearchIcon,
    PieChart: PieChart,
    Send: Send,
    BookOpen: BookOpen,
    FileText: FileText,
    
    // Lucide fallbacks if needed
    Layout, Users, Shield, Activity, Wrench, Globe, HelpCircle, Clock, Folder, TableIcon, Link
  };
  const Icon = icons[name] || SettingsIcon;
  return <Icon className={className || "w-[14px] h-[14px] text-[#a5acb9]"} />;
};

// Toast
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 z-[300]">
      <CheckCircle className="w-5 h-5 text-green-400" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

// Highlight Match Component
const HighlightMatch = ({ text, query }: { text: string; query: string }) => {
  if (!query || !text) return <>{text}</>;

  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  
  return (
    <>
      {parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="font-bold text-[#1d232f]">{part}</span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

export function CommandPalette({ isOpen, onClose, onNavigate, onScopeChange, onObjectSearch, onOpenObject, currentAdminPage, initialFilter, currentContext }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeChip, setActiveChip] = useState<typeof FILTER_CHIPS[0] | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [hasNavigated, setHasNavigated] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Detect if query starts with slash
  const showChipPicker = query.startsWith('/');
  const chipFilterQuery = showChipPicker ? query.slice(1) : ''; // Only use for chip filtering
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      
      // Auto-select chip if initialFilter is provided
      if (initialFilter) {
        const chip = FILTER_CHIPS.find(c => c.id === initialFilter);
        if (chip) {
          setActiveChip(chip);
        }
      } else {
        setActiveChip(null);
      }
      
      setSelectedIndex(0);
    }
  }, [isOpen, initialFilter]);

  // Default mode - recent and create
  const defaultItems = useMemo(() => [
    // RECENT ITEMS
    { id: 'recent-1', label: 'Total Sales by Region', type: 'Answer', icon: 'PieChart', group: 'Recent', description: 'by Anya Sharma', rightLabel: 'Answer (in a LB)', isObject: true, objectId: 'ans-1', objectType: 'Answer', context: 'in Customer Sales' },
    { id: 'recent-2', label: 'Total Sales by Region', type: 'Answer', icon: 'PieChart', group: 'Recent', description: 'by Anya Sharma', rightLabel: 'Answer (in a LB)', isObject: true, objectId: 'ans-1', objectType: 'Answer', context: 'in ... Sales' },
    { id: 'recent-3', label: 'Total Sales by Region', type: 'Answer', icon: 'PieChart', group: 'Recent', description: 'by Anya Sharma', rightLabel: 'Answer', isObject: true, objectId: 'ans-1', objectType: 'Answer' },
    { id: 'recent-4', label: 'Beta access', type: 'Navigate', icon: 'Settings', group: 'Recent', description: '', rightLabel: 'Admin Settings', page: 'Feature management', tab: 'beta access', context: 'in Feature management' },
    { id: 'recent-5', label: 'Comment validate', type: 'Model', icon: 'TableIcon', group: 'Recent', description: 'by bharathram.g', rightLabel: 'Model', isObject: true, objectId: 'mod-1', objectType: 'Data Model', context: 'in .myDBCTest' },
    { id: 'recent-6', label: 'SpotIQ Analysis', type: 'Navigate', icon: 'Send', group: 'Recent', description: '', rightLabel: 'Navigate', page: 'Object table', context: 'in Develop/ Analytics and alerts' },

    // CREATE ITEMS
    { id: 'create-1', label: 'Spotter chat', type: 'Action', icon: 'Sparkles', group: 'Create', rightLabel: 'Spotter', isSpotter: true, query: '' },
    { id: 'create-2', label: 'Answer', type: 'Action', icon: 'BarChart2', group: 'Create', rightLabel: 'Create', action: 'create-answer' },
    { id: 'create-3', label: 'Liveboard', type: 'Action', icon: 'Layout', group: 'Create', rightLabel: 'Create', action: 'create-liveboard' },
    { id: 'create-4', label: 'Connection', type: 'Action', icon: 'Link', group: 'Create', rightLabel: 'Create', action: 'create-connection' },
    { id: 'create-5', label: 'Collection', type: 'Action', icon: 'Folder', group: 'Create', rightLabel: 'Create', action: 'create-collection' },
    
    // Quick links
    { id: 'link-1', label: 'Admin settings', type: 'Navigate', page: 'General settings', tab: 'administration', icon: 'Settings', group: 'Quick links', rightLabel: 'Admin Settings' },
    { id: 'link-2', label: 'Profile settings', type: 'Navigate', page: 'Profile', icon: 'Settings', group: 'Quick links', rightLabel: 'Admin Settings' },
    { id: 'link-3', label: 'Community', type: 'Link', icon: 'HelpCircle', group: 'Quick links', rightLabel: 'Help', action: 'community' },
    { id: 'link-4', label: 'Developer Docs', type: 'Link', icon: 'BookOpen', group: 'Quick links', rightLabel: 'Help', action: 'help-docs' },
    { id: 'link-5', label: 'Muze Charts Docs', type: 'Link', icon: 'FileText', group: 'Quick links', rightLabel: 'Help', action: 'muze-docs' },
  ], []);

  // Helper function to get icon for object type
  const getIconForObjectType = (type: string) => {
    switch (type) {
      case 'Liveboard': return 'Layout';
      case 'Answer': return 'BarChart2';
      case 'Collection': return 'Folder';
      case 'Data Model': return 'Database';
      case 'Table': return 'TableIcon';
      case 'Connection': return 'Link';
      default: return 'FileText';
    }
  };

  // Build list items
  const listItems = useMemo(() => {
    // Chip picker mode
    if (showChipPicker) {
      // Reorder chips based on context
      let displayChips = [...FILTER_CHIPS];
      
      if (currentContext?.tab === 'admin') {
        const adminChip = displayChips.find(c => c.id === 'admin');
        if (adminChip) {
          // Move Admin chip to the top
          displayChips = [
            adminChip,
            ...displayChips.filter(c => c.id !== 'admin')
          ];
        }
      } else if (currentContext?.tab === 'data') {
        // Data context: Data models, Tables, Collections first
        const priorityIds = ['datamodel', 'table', 'collection'];
        const priorityChips = displayChips.filter(c => priorityIds.includes(c.id));
        const otherChips = displayChips.filter(c => !priorityIds.includes(c.id));
        
        // Sort priority chips to match the order in priorityIds
        priorityChips.sort((a, b) => priorityIds.indexOf(a.id) - priorityIds.indexOf(b.id));
        
        displayChips = [...priorityChips, ...otherChips];
      }

      const allChips: any[] = displayChips.map(chip => ({
        ...chip,
        isChip: true,
        group: 'Filters',
      }));
      
      // Filter chips by query
      if (!chipFilterQuery) return allChips;
      
      return allChips.filter(chip => 
        chip.label.toLowerCase().includes(chipFilterQuery.toLowerCase())
      );
    }

    // Default view (no query, no active filter)
    if (!activeChip && !query) {
      return defaultItems;
    }

    // Search/Filter Mode
    let sourceItems: any[] = [];
    let recentItems: any[] = []; // Store recent items separately to prioritize them

    // 1. Determine Source Items based on Filter
    if (activeChip) {
      // Identify Recent Items relevant to this chip
      if (activeChip.objectType) {
        recentItems = defaultItems.filter(i => 
          i.objectType === activeChip.objectType && i.group === 'Recent'
        );
        sourceItems = allMockObjects
          .filter(obj => obj.type === activeChip.objectType)
          .map(obj => ({
            id: obj.id,
            label: obj.name,
            type: obj.type,
            icon: getIconForObjectType(obj.type),
            description: obj.author,
            rightLabel: obj.type,
            isObject: true,
            objectId: obj.id,
            objectType: obj.type,
            group: undefined
          }));
      } else if (activeChip.id === 'admin') {
        recentItems = defaultItems.filter(i => 
          i.group === 'Recent' && i.rightLabel === 'Admin Settings'
        );
        sourceItems = ADMIN_COMMANDS;
      } else if (activeChip.id === 'navigate') {
        recentItems = defaultItems.filter(i => 
          i.group === 'Recent' && i.type === 'Navigate'
        );
        const navDefaults = defaultItems.filter(i => i.type === 'Navigate');
        sourceItems = [...ADMIN_COMMANDS, ...navDefaults];
      } else if (activeChip.id === 'create') {
        // For Create, we mostly just show the Create actions
        sourceItems = defaultItems.filter(i => i.type === 'Action');
        // No specific "recent create" items usually, but if there were, we'd add them
      } else if (activeChip.id === 'spotter') {
         recentItems = defaultItems.filter(i => 
          i.group === 'Recent' && (i.isSpotter || i.label.includes('Spotter'))
        );
        sourceItems = [...defaultItems.filter(i => i.isSpotter || i.label.includes('Spotter') || i.icon === 'Sparkles')];
      }
    } else {
      // General Search (No Filter)
      // Combine everything: Admin + Defaults + Objects
      const objects = allMockObjects.map(obj => ({
        id: obj.id,
        label: obj.name,
        type: obj.type,
        icon: getIconForObjectType(obj.type),
        description: obj.author,
        rightLabel: obj.type,
        isObject: true,
        objectId: obj.id,
        objectType: obj.type,
        group: undefined
      }));
      
      // Prioritize Admin and Defaults
      sourceItems = [...ADMIN_COMMANDS, ...defaultItems, ...objects];
    }

    // 2. Apply Query Filtering
    let results = sourceItems;
    let filteredRecent = recentItems;

    if (query) {
      const q = query.toLowerCase();
      const filterFn = (item: any) => (
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.context?.toLowerCase().includes(q) ||
        item.tags?.some((t: string) => t.toLowerCase().includes(q))
      );
      
      results = results.filter(filterFn);
      filteredRecent = filteredRecent.filter(filterFn);
    }

    // 3. Deduplicate & Combine
    // If a filter is active, we show Relevant Recents first, then the rest of results
    const combinedResults = activeChip ? [...filteredRecent, ...results] : results;

    const uniqueResults: any[] = [];
    const seen = new Set();
    
    combinedResults.forEach(item => {
      // Create a unique key. 
      // Note: objects in 'defaultItems' might refer to the same logical object in 'allMockObjects'.
      // If we have an objectId, use that.
      const key = item.objectId 
        ? `obj-${item.objectId}` 
        : `${item.label}-${item.type}-${item.description || ''}`;
        
      if (!seen.has(key)) {
        seen.add(key);
        // Clean up group if searching, but KEEP group if just filtering without query (to show sections if desired, or just flat list)
        // User asked to "populate the recent Liveboards".
        // If we are just filtering (no query), we might want to distinguish Recent vs Others.
        // For now, let's keep it simple: if there is no query, we preserve the 'group' property for Recent items.
        // If there is a query, we usually ungroup.
        
        let finalItem = { ...item };
        
        if (query) {
             finalItem.group = undefined; // flatten when searching
        } else if (activeChip) {
            // When filtering without query:
            // If it came from recentItems, it has group="Recent".
            // If it came from sourceItems, it might not have a group.
            // Let's group the others as "All " + chip label
            if (!finalItem.group) {
                // If it's not recent, give it a generic group name or leave undefined?
                // The prompt implies a list of recent items.
                // Let's just leave the 'Recent' group for recent items, and maybe 'All Liveboards' for others?
                // But the UI design usually just lists them.
                // Let's ensure non-recent items don't accidentally inherit a group or just appear below.
                 finalItem.group = undefined;
            }
        }

        uniqueResults.push(finalItem);
      }
    });

    // 4. Limit results
    // If active chip selected and no query, maybe show more?
    // User wants "populate recent Liveboards".
    // If I show only 8, it might be fine.
    const finalResults = uniqueResults.slice(0, 15); // Increased limit for filtered views

    // 5. Append Special Actions (only if query exists and no specific chip is selected that forbids it)
    if (query && !activeChip) {
      finalResults.push({
        id: 'special-view-all',
        label: `View all objects for "${query}"`,
        type: 'Search',
        icon: 'Search',
        group: undefined,
        isViewAll: true,
        query: query
      });

      finalResults.push({
        id: 'special-ask-spotter',
        label: `View search in spotter for "${query}"`,
        type: 'Spotter',
        icon: 'Spotter',
        group: undefined,
        isSpotter: true,
        query: query
      });
    }

    return finalResults;
  }, [showChipPicker, activeChip, chipFilterQuery, query, currentContext, defaultItems]);

  // Auto-select chip when there's only one match in chip picker mode
  useEffect(() => {
    if (showChipPicker && chipFilterQuery.length >= 2 && listItems.length === 1 && listItems[0].isChip) {
      const chip = listItems[0];
      const matchesWell = chip.label.toLowerCase().startsWith(chipFilterQuery.toLowerCase()) ||
                          chip.label.toLowerCase() === chipFilterQuery.toLowerCase();
      
      if (matchesWell) {
        const timer = setTimeout(() => {
          executeCommand(listItems[0]);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [showChipPicker, chipFilterQuery, listItems]);

  // Execute command
  const executeCommand = (item: any) => {
    if (item.isChip) {
      setActiveChip(item);
      setQuery('');
      setSelectedIndex(0);
      return;
    }
    
    if (item.isObject) {
      if (onOpenObject && !showChipPicker) {
        onOpenObject(item.objectId, item.objectType);
        onClose();
      }
      return;
    }

    if (item.isSpotter) {
      onNavigate('Spotter', 'insights', item.query);
      onClose();
      setNotification(`Asking Spotter: "${item.query}"`);
      return;
    }

    if (item.isViewAll) {
      if (onObjectSearch) {
        onObjectSearch(item.query);
        onClose();
      }
      return;
    }

    if (item.page) {
      onNavigate(item.page, item.tab, undefined, item.appTab);
      onClose();
      setNotification(`Navigating to ${item.label}`);
    }
    
    if (item.action) {
        setNotification(`Triggered action: ${item.label}`);
        onClose();
    }
  };

  // Detect keys
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Slash to show chip picker
    if (e.key === '/') {
      if (query === '') {
        e.preventDefault();
        setQuery('/');
        return;
      }
    }

    // Tab autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      if (listItems.length > 0) {
        const selected = listItems[selectedIndex];
        if (selected) {
           executeCommand(selected);
        }
      }
      return;
    }

    // Command + Enter for Spotter
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (query) {
        onNavigate('Spotter', 'insights');
        onClose();
        setNotification(`Asking Spotter: "${query}"`);
      }
      return;
    }

    // Shift + Enter for new tab
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      const selectedItem = listItems[selectedIndex];
      if (selectedItem) {
        onClose();
        setNotification(`Opening "${selectedItem.label}" in new tab`);
      }
      return;
    }

    // Backspace to remove chip
    if (e.key === 'Backspace' && query === '' && activeChip) {
      e.preventDefault();
      setActiveChip(null);
      return;
    }

    // Escape
    if (e.key === 'Escape') {
      e.preventDefault();
      if (showChipPicker) {
        setQuery('');
      } else {
        onClose();
      }
      return;
    }

    // Arrow navigation
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHasNavigated(true);
      setSelectedIndex((prev) => (prev + 1) % listItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHasNavigated(true);
      setSelectedIndex((prev) => (prev - 1 + listItems.length) % listItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      
      const selectedItem = listItems[selectedIndex];
      if (selectedItem) {
        executeCommand(selectedItem);
        return;
      }

      if (!activeChip && query && query.length >= 2 && onObjectSearch) {
        onObjectSearch(query);
        onClose();
        return;
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {notification && <Toast message={notification} onClose={() => setNotification(null)} />}

      <div className="fixed inset-0 z-[200] flex items-center justify-center px-3">
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]" onClick={onClose} />
        
        <div className="relative w-[754px] max-w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 h-[540px]">
          {/* Header */}
          <div className="flex flex-col bg-white shrink-0 z-10">
            <div className="flex items-center px-[16px] py-[12px] border-b border-[#eaedf2]">
              <SearchIcon className="w-[16px] h-[16px] mr-3 text-[#a5acb9]" />

              {/* Active Chip */}
              {activeChip && (
                <div className="flex items-center bg-blue-50 text-[#71a1f4] px-2 py-1 rounded-md text-sm font-medium mr-2 shrink-0 border border-[#71a1f4]">
                  <activeChip.icon className="w-4 h-4 mr-1.5" />
                  {activeChip.label}
                  <button
                    onClick={() => setActiveChip(null)}
                    className="ml-1.5 hover:bg-blue-100 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Input */}
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent text-[#1d232f] placeholder-[#a5acb9] outline-none text-[16px] h-6 min-w-0"
                placeholder={
                  showChipPicker 
                    ? 'Select a filter...' 
                    : activeChip 
                    ? `Search ${activeChip.label.toLowerCase()}...` 
                    : 'Search objects or navigate anywhere in Thoughtspot'
                }
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                  setHasNavigated(false);
                }}
                onKeyDown={handleKeyDown}
              />

              {!activeChip && !showChipPicker && !query && (
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <div className="w-[18px] h-[18px] bg-white border border-[#e5e7eb] rounded-[4px] flex items-center justify-center">
                    <span className="text-[10px] text-[#a5acb9] font-['Plain']">/</span>
                  </div>
                  <span className="text-[12px] text-[#777e8b]">to filter</span>
                </div>
              )}
            </div>
          </div>

          {/* Results List */}
          <div ref={listRef} className="flex-1 overflow-y-auto overflow-x-hidden pb-2 bg-white">
            {listItems.length === 0 ? (
              <div className="px-3 py-12 text-center text-gray-500 text-sm">
                <p>No results found</p>
              </div>
            ) : (
              listItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                const showHeader = (index === 0 || listItems[index - 1].group !== item.group) && item.group;
                const Icon = item.isChip ? item.icon : null;

                return (
                  <div key={item.id}>
                    {showHeader && (
                      <div className="px-[16px] pt-[16px] pb-[8px] text-[#777e8b] text-[12px] leading-[18px] tracking-[-0.072px] font-medium bg-white sticky top-0 z-10">
                        {item.group}
                      </div>
                    )}
                    <div
                      onClick={() => executeCommand(item)}
                      className={`
                        mx-0 px-[16px] py-[8px] flex items-center justify-between cursor-pointer transition-colors
                        ${isSelected ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}
                      `}
                    >
                      <div className="flex items-center gap-[12px] flex-1 min-w-0">
                        {/* Icon Container */}
                        <div className="flex items-center justify-center size-[18px] shrink-0">
                           {Icon ? (
                             <Icon className={`w-[14px] h-[14px] flex-shrink-0 text-[#a5acb9]`} />
                           ) : (
                             <IconComponent 
                               name={item.icon} 
                               className={`w-[14px] h-[14px] flex-shrink-0 text-[#a5acb9]`}
                             />
                           )}
                        </div>
                        
                        <div className="flex items-center gap-[8px] overflow-hidden">
                          <span className="text-[14px] text-[#1d232f] truncate leading-[20px]">
                            <HighlightMatch text={item.label} query={query} />
                          </span>
                          
                          {/* Context / Author */}
                          {(item.context || item.description || item.category) && (
                            <span className="text-[12px] text-[#777e8b] tracking-[-0.072px] truncate leading-[18px] flex items-center">
                                {item.context && <span className="mr-2">{item.context}</span>}
                                {item.category ? (
                                    <span>{item.category} / {item.page}</span>
                                ) : (
                                    item.description && <HighlightMatch text={item.description} query={query} />
                                )}
                            </span>
                          )}
                        </div>
                      </div>

                      {item.rightLabel && (
                        <span className={`text-[12px] text-[#777e8b] flex-shrink-0 ml-2 tracking-[-0.072px] leading-[18px]`}>
                          {item.rightLabel}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[#eaedf2] bg-[#f6f8fa] px-[12px] py-[8px] h-[34px] flex items-center justify-between text-[10px] text-gray-500 select-none shrink-0">
            {/* Left: Navigate */}
            <div className="flex items-center gap-[8px]">
              <div className="bg-white border border-[#e5e7eb] rounded-[4px] px-[4px] py-px flex items-center h-[18px]">
                 <span className="text-[#6a7282] text-[10px] tracking-[0.1172px]">↑ ↓</span>
              </div>
              <span className="text-[#a5acb9] text-[12px] tracking-[-0.072px] leading-[18px]">Navigate</span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-[12px]">
              {/* Open in Spotter (Only if query is active and user hasn't navigated) */}
              {query && !hasNavigated && (
                <div className="flex items-center gap-[8px]">
                  <div className="bg-white border border-[#e5e7eb] rounded-[4px] px-[4px] py-px flex items-center h-[18px]">
                     <span className="text-[#6a7282] text-[10px] tracking-[0.1172px]">⌘ + ↵</span>
                  </div>
                   <span className="text-[#a5acb9] text-[12px] tracking-[-0.072px] leading-[18px]">Open in Spotter</span>
                </div>
              )}

              {/* Open in new tab */}
              <div className="flex items-center gap-[8px]">
                <div className="bg-white border border-[#e5e7eb] rounded-[4px] px-[4px] py-px flex items-center h-[18px]">
                   <span className="text-[#6a7282] text-[10px] tracking-[0.1172px]">Shift + ↵</span>
                </div>
                 <span className="text-[#a5acb9] text-[12px] tracking-[-0.072px] leading-[18px]">Open in new tab</span>
              </div>

              {/* Select */}
              <div className="flex items-center gap-[8px]">
                <div className="bg-white border border-[#e5e7eb] rounded-[4px] px-[4px] py-px flex items-center h-[18px]">
                   <span className="text-[#6a7282] text-[10px] tracking-[0.1172px]">↵</span>
                </div>
                <span className="text-[#a5acb9] text-[12px] tracking-[-0.072px] leading-[18px]">Select</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper function to get icon for object type
function getIconForObjectType(type: string) {
  const iconMap: Record<string, string> = {
    'Liveboard': 'Layout',
    'Answer': 'BarChart2',
    'Collection': 'Folder',
    'Data Model': 'Database',
    'Table': 'TableIcon',
    'Connection': 'Link',
  };
  return iconMap[type] || 'Layout';
}
