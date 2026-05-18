import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@components/Button';
import { SearchInput } from '@components/SearchInput';
import { Toggle } from '@components/Toggle';
import { SegmentedControl } from '@components/SegmentedControl';
import { Select } from '@components/Select';
import { RdModal } from '@components/RdModal';
import { Table } from '@components/Table';
import './dme.css';
import { initDME } from './init-dme.js';
import { AgentPanel } from '../_agentic/index';
import { TableCanvas, ColumnTree } from '../_datamodel/index';
import type { TablePositionData, JoinInfo, ColumnTreeData } from '../_datamodel/index';
import { OverlayLoading } from '@components/OverlayLoading';

const TAB_OPTIONS = [
  { id: 'tables',     label: 'Tables' },
  { id: 'columns',    label: 'Columns' },
  { id: 'formulas',   label: 'Formulas' },
  { id: 'filters',    label: 'Filters' },
  { id: 'parameters', label: 'Parameters' },
  { id: 'settings',   label: 'Settings' },
];

const JOIN_OPTIONS = [
  { id: 'inner', label: 'Inner join' },
  { id: 'left',  label: 'Left join' },
  { id: 'right', label: 'Right join' },
  { id: 'cross', label: 'Cross join' },
];

const ZOOM_OPTIONS = [
  { id: '50',  label: '50%' },
  { id: '75',  label: '75%' },
  { id: '100', label: '100%' },
  { id: '125', label: '125%' },
  { id: '150', label: '150%' },
];

const SORT_OPTIONS = [
  { id: 'name-asc',  label: 'Name (A→Z)' },
  { id: 'name-desc', label: 'Name (Z→A)' },
  { id: 'type',      label: 'Sort by type' },
];

type ColRow = { col: string; table: string; desc: string; aiCtx: string };
type FormulaRow = { name: string; type: string };

const COL_TABLE_COLUMNS = [
  { key: 'col',    label: 'Column name' },
  { key: 'table',  label: 'Source table name' },
  { key: 'srcCol', label: 'Source column name', render: (_: unknown, row: Record<string, unknown>) => (row as ColRow).col },
  { key: 'desc',   label: 'Description' },
  { key: 'aiCtx',  label: 'AI context' },
];

const DataModelEditor: React.FC = () => {
  const [tablesUnselected, setTablesUnselected] = useState(false);
  const [columnsUnselected, setColumnsUnselected] = useState(false);
  const [activeTab, setActiveTab] = useState('tables');
  const [ctxOpen, setCtxOpen] = useState(false);
  const [ctxHtml, setCtxHtml] = useState('');
  const [columnRows, setColumnRows] = useState<ColRow[]>([]);
  const [colSearch, setColSearch] = useState('');
  const [selectedColKeys, setSelectedColKeys] = useState<string[]>([]);
  const [formulaRows, setFormulaRows] = useState<FormulaRow[]>([]);
  const [formulaSearch, setFormulaSearch] = useState('');
  const [tableCanvasData, setTableCanvasData] = useState<{ tables: TablePositionData[]; joins: JoinInfo[] }>({ tables: [], joins: [] });
  const [columnTreeData, setColumnTreeData] = useState<ColumnTreeData>({ tables: [], dataSourceTables: [], modelColumns: [] });
  const [modelLoading, setModelLoading] = useState<{ visible: boolean; label: string }>({ visible: false, label: '' });
  // Auto-populate shimmer visibility for columns and formulas tabs
  const [showColShimmer,     setShowColShimmer]     = useState(false);
  const [showFormulaShimmer, setShowFormulaShimmer] = useState(false);
  // Suppress empty states while auto-populate is running so tabs never flash empty
  const [isAutoPopulating,   setIsAutoPopulating]   = useState(false);

  const [spotterModelEnabled] = useState<boolean>(() => (window as any).__DME_CONFIG__?.spotterModel ?? true);
  const [welcomeVariant] = useState<'blank' | 'existing'>(() => (window as any).__DME_CONFIG__?.welcomeVariant ?? 'blank');

  // Capture auto-populate data in a ref so it survives React StrictMode's
  // double-invoke (cleanup runs between mount 1 and mount 2, deleting the global).
  const autoPopulateDataRef = useRef<unknown>((window as any).__DME_AUTO_DATA__ ?? null);

  const modelName = welcomeVariant === 'blank' ? 'Add model name' : 'Retail Sales Analytics';
  const modelDesc = welcomeVariant === 'blank' ? 'Add description' : 'Sales performance model for Spotter AI search';

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const pill = document.querySelector<HTMLElement>(`.tab-pill[data-tab="${tabId}"]`);
    pill?.click();
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    (window as any)._openCtxModal  = (html: string) => { setCtxHtml(html); setCtxOpen(true); };
    (window as any)._closeCtxModal = () => setCtxOpen(false);
    (window as any)._setColumnRows = (rows: ColRow[]) => { setColumnRows(rows); setColSearch(''); setSelectedColKeys([]); };
    (window as any)._setFormulaRows = (rows: FormulaRow[]) => { setFormulaRows(rows); setFormulaSearch(''); };
    (window as any)._setTableCanvasData = (data: { tables: TablePositionData[]; joins: JoinInfo[] }) => setTableCanvasData(data);
    (window as any)._setColumnTreeData  = (data: ColumnTreeData) => setColumnTreeData(data);
    (window as any)._setModelLoading    = (visible: boolean, label?: string) => setModelLoading({ visible, label: label ?? '' });
    (window as any)._setColumnShimmer   = (val: boolean) => setShowColShimmer(val);
    (window as any)._setFormulaShimmer  = (val: boolean) => setShowFormulaShimmer(val);
    (window as any)._setDMEAutoPopulating = (val: boolean) => setIsAutoPopulating(val);

    // Restore auto-populate data from ref — survives StrictMode cleanup between mounts.
    if (autoPopulateDataRef.current) {
      (window as any).__DME_AUTO_DATA__ = autoPopulateDataRef.current;
    }

    const cleanup = initDME();
    return () => {
      document.body.style.overflow = prev;
      cleanup?.();
      delete (window as any)._openCtxModal;
      delete (window as any)._closeCtxModal;
      delete (window as any)._setColumnRows;
      delete (window as any)._setFormulaRows;
      delete (window as any)._setTableCanvasData;
      delete (window as any)._setColumnTreeData;
      delete (window as any)._setModelLoading;
      delete (window as any)._setColumnShimmer;
      delete (window as any)._setFormulaShimmer;
      delete (window as any)._setDMEAutoPopulating;
    };
  }, []);

  return (
    <div className="sm-root">

      {/* APP HEADER */}
      <div className="app-header">
        <span className="app-title">Data model editor</span>
        <SegmentedControl options={TAB_OPTIONS} value={activeTab} onChange={handleTabChange} size="large" />
        <div className="tab-group" style={{ display: 'none' }}>
          <div className="tab-pill active" data-tab="tables">Tables</div>
          <div className="tab-pill" data-tab="columns">Columns</div>
          <div className="tab-pill" data-tab="formulas">Formulas</div>
          <div className="tab-pill" data-tab="filters">Filters</div>
          <div className="tab-pill" data-tab="parameters">Parameters</div>
          <div className="tab-pill" data-tab="settings">Settings</div>
        </div>
      </div>

      {/* BODY ROW */}
      <div className="body-row">

        <div className="left-and-main">

          {/* SUB-HEADER */}
          <div className="sub-header">
            <div className="sub-header-info">
              <span className="model-name-placeholder">{modelName}</span>
              <span className="model-desc-placeholder">{modelDesc}</span>
            </div>
            <div className="sub-header-actions" id="actions-tables">
              <Button variant="secondary">Find</Button>
              <div style={{ display: 'contents' }} onClickCapture={e => { e.preventDefault(); e.stopPropagation(); }}>
                <Select placeholder="Join options" options={JOIN_OPTIONS} className="sub-header-select" />
              </div>
              <div style={{ display: 'contents' }} onClickCapture={e => { e.preventDefault(); e.stopPropagation(); }}>
                <Select placeholder="100%" options={ZOOM_OPTIONS} className="sub-header-select" />
              </div>
            </div>
            <div className="sub-header-actions" id="actions-default" style={{ display: 'none' }}></div>
          </div>

          {/* Content row */}
          <div className="content-row">
            <OverlayLoading variant="dots" isVisible={modelLoading.visible} label={modelLoading.label} />

            {/* LEFT PANE */}
            <div className="left-pane" id="left-pane">

              <div id="pane-tables-section" className="pane-section">
                <div className="left-pane-header">
                  <div className="connection-row">
                    <img src="/spotter-assets/Snowflake.svg" width="14" height="14" alt="connection" />
                    <span className="connection-name">Global sales connection</span>
                  </div>
                  <div className="pane-title-row">
                    <span className="pane-title">Tables</span>
                    <div className="grid-icon-btn">
                      <img src="/spotter-assets/Knowledge card button.svg" width="24" height="24" alt="layout" />
                    </div>
                  </div>
                  <SearchInput placeholder="Search tables" className="pane-search-input" />
                  <div className="filter-row">
                    <Button variant="secondary">Add filters</Button>
                    <div style={{ display: 'contents' }} onClickCapture={e => { e.preventDefault(); e.stopPropagation(); }}>
                      <Select placeholder="Sort by name" options={SORT_OPTIONS} className="sort-select" />
                    </div>
                  </div>
                </div>
                <div className="table-list">
                  {['fact_customer','fact_new_retail_sales','fact_sales','dim_store','dim_product','fact_region','fact_inventory','dim_shipping_method','dim_feedback','dim_date','fact_sales_pipeline','fact_customer_satisfaction'].map(t => (
                    <div key={t} className="table-item">
                      <div className="table-chip">
                        <div className="drag-handle"><img src="/spotter-assets/3 dot vertical.svg" alt="" /></div>
                        {t}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="left-pane-footer">
                  <Toggle checked={tablesUnselected} onChange={setTablesUnselected} label="Show unselected" labelPosition="right" />
                </div>
              </div>

              <div id="pane-columns-section" className="pane-section" style={{ display: 'none' }}>
                <div className="left-pane-header">
                  <div className="connection-row">
                    <img src="/spotter-assets/Snowflake.svg" width="14" height="14" alt="connection" />
                    <span className="connection-name">Global sales connection</span>
                  </div>
                  <div className="pane-title-row">
                    <span className="pane-title">Columns</span>
                    <div className="grid-icon-btn">
                      <img src="/spotter-assets/Knowledge card button.svg" width="24" height="24" alt="layout" />
                    </div>
                  </div>
                  <SearchInput placeholder="Search columns" className="pane-search-input" />
                  <div className="filter-row">
                    <Button variant="secondary">Add filters</Button>
                    <div style={{ display: 'contents' }} onClickCapture={e => { e.preventDefault(); e.stopPropagation(); }}>
                      <Select placeholder="Sort by name" options={SORT_OPTIONS} className="sort-select" />
                    </div>
                  </div>
                </div>
                <ColumnTree data={columnTreeData} />
                <div className="left-pane-footer">
                  <Toggle checked={columnsUnselected} onChange={setColumnsUnselected} label="Show unselected" labelPosition="right" />
                </div>
              </div>

            </div>{/* /left-pane */}

            {/* MAIN CONTENT */}
            <div className="main-content">

              {/* Tables tab */}
              <div className="tab-content" id="content-tables">
                {tableCanvasData.tables.length === 0 ? (
                  <div className="empty-state" id="tables-empty-state">
                    <img src="/spotter-assets/Table=l.svg" width="32" height="32" alt="table icon" />
                    <div className="empty-body">
                      <div className="empty-title">Start with the right tables</div>
                      <div className="empty-desc">Let SpotterModel suggest the best tables and joins for an AI-ready data model</div>
                    </div>
                    <div className="suggestion-row">
                      <a className="suggestion-link" href="#">
                        <img src="/spotter-assets/ai icon.svg" width="14" height="14" alt="ai icon" />
                        Get table suggestions
                      </a>
                      <img className="moving-arrow" src="/spotter-assets/Moving arrow.svg" width="14" height="12" alt="arrow" />
                    </div>
                    <div className="divider-h"></div>
                    <span className="drag-hint">Or drag and drop from the left pane</span>
                  </div>
                ) : (
                  <div className="model-canvas" id="tables-canvas">
                    <TableCanvas
                      tables={tableCanvasData.tables}
                      joins={tableCanvasData.joins}
                      onTableDragEnd={(name, x, y) => (window as any)._handleTableDrag?.(name, x, y)}
                    />
                  </div>
                )}
              </div>

              {/* Columns tab */}
              <div className="tab-content" id="content-columns" style={{ display: 'none' }}>
                {/*
                  Empty state — visibility is controlled ONLY by DOM manipulation in
                  rebuildColumnsContent() (init-dme.js). Never add a React style prop here
                  because React's reconciler will overwrite what the DOM manipulation sets,
                  causing the empty state to re-appear alongside real content.
                */}
                <div className="empty-state" id="columns-empty-state">
                  <img src="/spotter-assets/Table=l.svg" width="32" height="32" alt="table icon" />
                  <div className="empty-body">
                    <div className="empty-title">Build your foundation first</div>
                    <div className="empty-desc">Add tables so SpotterModel can recommend the right columns for you</div>
                  </div>
                  <div className="suggestion-row">
                    <a className="suggestion-link" href="#">
                      <img src="/spotter-assets/ai icon.svg" width="14" height="14" alt="ai icon" />
                      Get table suggestions
                    </a>
                    <img className="moving-arrow" src="/spotter-assets/Moving arrow.svg" width="14" height="12" alt="arrow" />
                  </div>
                </div>
                {/*
                  Render wrapper whenever there are rows, a shimmer is active, OR auto-populate
                  is running — so the container is already in the DOM when the tab auto-switches,
                  preventing a blank-frame between the empty state disappearing and the shimmer
                  appearing.
                */}
                {(columnRows.length > 0 || showColShimmer || isAutoPopulating) && (
                  <div className="col-table-wrap" id="columns-canvas">
                    <div className="col-table-topbar">
                      <SearchInput
                        placeholder="Search"
                        value={colSearch}
                        onChange={(e) => setColSearch(e.target.value)}
                        className="col-table-search-input"
                      />
                      <Button variant="secondary">Model CSV import</Button>
                    </div>
                    {/* Only mount the Table when there are rows — avoids an empty header during the
                        initial shimmer phase before the first column arrives */}
                    {columnRows.length > 0 && (
                      <Table
                        columns={COL_TABLE_COLUMNS}
                        data={columnRows.filter(r =>
                          !colSearch ||
                          r.col.toLowerCase().includes(colSearch.toLowerCase()) ||
                          r.table.toLowerCase().includes(colSearch.toLowerCase())
                        )}
                        rowKey={(r) => `${(r as ColRow).table}.${(r as ColRow).col}`}
                        selectable
                        selectedKeys={selectedColKeys}
                        onSelectionChange={setSelectedColKeys}
                        stickyHeader
                      />
                    )}
                    {/* Show shimmer when active OR when auto-populating with no rows yet */}
                    {(showColShimmer || (isAutoPopulating && columnRows.length === 0)) && (
                      <div className="auto-populate-shimmer-row">
                        <div className="shimmer-check-slot" />
                        <div className="shimmer-pill" style={{ width: '13%' }} />
                        <div className="shimmer-pill" style={{ width: '13%' }} />
                        <div className="shimmer-pill" style={{ width: '13%' }} />
                        <div className="shimmer-pill" style={{ width: '28%' }} />
                        <div className="shimmer-pill" style={{ width: '28%' }} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Formulas tab */}
              <div className="tab-content" id="content-formulas" style={{ display: 'none' }}>
                {/*
                  Empty state — visibility controlled ONLY by DOM manipulation in
                  rebuildFormulasContent(). Do NOT add a React style prop here.
                */}
                <div className="empty-state" id="formulas-empty-state">
                  <img src="/spotter-assets/Table=l.svg" width="32" height="32" alt="table icon" />
                  <div className="empty-body">
                    <div className="empty-title">Start with a data source</div>
                    <div className="empty-desc">Tables and columns are required before SpotterModel can help you build formulas</div>
                  </div>
                  <div className="suggestion-row">
                    <a className="suggestion-link" href="#">
                      <img src="/spotter-assets/ai icon.svg" width="14" height="14" alt="ai icon" />
                      Get table suggestions
                    </a>
                    <img className="moving-arrow" src="/spotter-assets/Moving arrow.svg" width="14" height="12" alt="arrow" />
                  </div>
                </div>
                {(formulaRows.length > 0 || showFormulaShimmer || isAutoPopulating) && (
                  <div className="formula-table-wrap" id="formulas-canvas">
                    <div className="formula-topbar">
                      <SearchInput
                        placeholder="Search formulas"
                        value={formulaSearch}
                        onChange={(e) => setFormulaSearch(e.target.value)}
                        className="formula-search-input"
                      />
                    </div>
                    {formulaRows.length > 0 && (
                      <Table
                        columns={[
                          { key: 'name', label: 'Formula name' },
                          { key: 'type', label: 'Data type' },
                          { key: 'actions', label: '', width: '40px', render: (_: unknown, _row: Record<string, unknown>) => (
                            <Button variant="secondary" icon="more" iconOnly title="More options">More options</Button>
                          )},
                        ]}
                        data={formulaRows.filter(r =>
                          !formulaSearch ||
                          r.name.toLowerCase().includes(formulaSearch.toLowerCase())
                        )}
                        rowKey={(r) => (r as FormulaRow).name}
                        stickyHeader
                      />
                    )}
                    {(showFormulaShimmer || (isAutoPopulating && formulaRows.length === 0)) && (
                      <div className="auto-populate-shimmer-row">
                        <div className="shimmer-pill" style={{ width: '30%' }} />
                        <div className="shimmer-pill" style={{ width: '15%' }} />
                        <div className="shimmer-pill" style={{ width: 24 }} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Formulas toolbar */}
              <div className="formulas-toolbar" id="formulas-toolbar" style={{ display: 'none' }}>
                <Button variant="secondary" id="formulas-add-btn">Add formula</Button>
              </div>

            </div>{/* /main-content */}
          </div>{/* /content-row */}
        </div>{/* /left-and-main */}

        {/* AGENT PANEL */}
        {spotterModelEnabled && <AgentPanel welcomeVariant={welcomeVariant} />}

      </div>{/* /body-row */}

      {/* APP FOOTER */}
      <div className="app-footer">
        <Button variant="secondary" id="discard-btn">Discard changes and close</Button>
        <Button variant="primary" id="save-changes-btn">Save changes</Button>
      </div>

      {/* CONTEXT MODAL */}
      {ctxOpen && (
        <RdModal
          size="M2"
          title="Context"
          onClose={() => { (window as any)._onCtxModalClose?.(); }}
          confirmLabel="Done"
          onConfirm={() => { (window as any)._onCtxModalClose?.(); }}
        >
          <div id="ctx-modal-body" className="ctx-modal-body" dangerouslySetInnerHTML={{ __html: ctxHtml }} />
        </RdModal>
      )}
    </div>
  );
};

export default DataModelEditor;
