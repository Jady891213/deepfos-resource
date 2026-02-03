
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Search,
  FolderOpen,
  FileText,
  Database,
  Workflow,
  Cpu,
  Code2,
  Eye,
  X,
  Star,
  Layout,
  Clock,
  Activity,
  ListTodo,
  PanelLeftClose,
  Terminal,
  Info,
  Pin,
  PinOff,
  History as HistoryIcon,
  Grid3X3,
  Filter,
  Plus,
  MoreVertical,
  Link,
  ArrowRightLeft,
  Zap,
  ShieldCheck,
  TableProperties,
  Compass,
  Locate,
  ChevronLast,
  ChevronFirst,
  ExternalLink
} from 'lucide-react';
import { ModuleId, ResourceItem, Tab, ResourceType } from '../types';

interface ExplorerProps {
  activeModule: ModuleId;
  onSelectResource: (item: any) => void;
  isUserMode?: boolean;
  activeTab?: Tab;
  tabs: Tab[];
  onCloseTab: (id: string) => void;
  showContext?: boolean;
  activeDrawerType?: ModuleId | null;
  onCloseContext?: () => void;
  onToggleCollapse?: () => void;
}

const MODULE_DATA: Record<string, ResourceItem[]> = {
  'module-ux': [
    { id: 'dir_ux_1', name: '电子表格', code: 'DIR_SPREADSHEET', type: 'folder', version: '', createdBy: '', updatedAt: '', children: [
      { id: 'res_ux_1', name: '年度预算录入表', code: 'BUDGET_SHEET', type: 'spreadsheet', version: '1.0', createdBy: 'liuqing', updatedAt: '2025-05-10' },
      { id: 'res_ux_2', name: '费用报销明细', code: 'EXPENSE_DETAIL', type: 'spreadsheet', version: '2.1', createdBy: 'admin', updatedAt: '2025-05-11' },
    ]},
  ],
  'finance_center': [
    { id: 'fc_1', name: '资金月报', code: 'CASH_MONTHLY', type: 'spreadsheet', version: 'v1', createdBy: 'liuqing', updatedAt: '2025-05-20' },
    { id: 'fc_2', name: '利润分析表', code: 'PROFIT_ANALYSIS', type: 'ux', version: 'v2', createdBy: 'admin', updatedAt: '2025-05-21' },
    { id: 'fc_3', name: '现金流量墙', code: 'CASH_FLOW_WALL', type: 'ux', version: 'v1.1', createdBy: 'liuqing', updatedAt: '2025-05-22' },
  ],
  'finance_master_data': [
    { id: 'md_1', name: '会计主体维度', code: 'DIM_ENTITY', type: 'model', version: 'v3', createdBy: 'liuqing', updatedAt: '2025-05-18' },
    { id: 'md_2', name: '成本中心列表', code: 'LIST_COST_CENTER', type: 'folder', version: '', createdBy: '', updatedAt: '', children: [
        { id: 'md_2_1', name: '制造中心逻辑', code: 'CC_MFG_LOGIC', type: 'logic', version: '1.0', createdBy: 'admin', updatedAt: '2025-05-19' }
    ]},
  ],
  'closing_management': [
    { id: 'cl_1', name: '月结工作流', code: 'WF_MONTHLY_CLOSE', type: 'workflow', version: 'v1.5', createdBy: 'system', updatedAt: '2025-05-24' },
    { id: 'cl_2', name: '对账差异表', code: 'RECON_DIFF', type: 'spreadsheet', version: 'v1', createdBy: 'liuqing', updatedAt: '2025-05-25' },
  ],
  'all': [
    { id: 'root_ux', name: '01 页面展现', code: 'ROOT_UX', type: 'folder', version: '', createdBy: '', updatedAt: '', children: [
      { id: 'res_ux_1', name: '年度预算录入表', code: 'BUDGET_SHEET', type: 'spreadsheet', version: '1.0', createdBy: 'liuqing', updatedAt: '2025-05-10' },
      { id: 'res_ux_3', name: '财务看板-主视图', code: 'FIN_DASHBOARD', type: 'ux', version: '1.0', createdBy: 'liuqing', updatedAt: '2025-05-12' },
    ]},
    { id: 'root_model', name: '02 数据模型', code: 'ROOT_MODEL', type: 'folder', version: '', createdBy: '', updatedAt: '', children: [
      { id: 'res_m_1', name: '对账核销核心模型', code: 'MODEL_RECON_CORE', type: 'model', version: '3.0', createdBy: 'liuqing', updatedAt: '2025-05-14' },
    ]},
    { id: 'root_logic', name: '03 流程逻辑', code: 'ROOT_LOGIC', type: 'folder', version: '', createdBy: '', updatedAt: '', children: [
      { id: 'res_logic_1', name: '每日定时对账任务', code: 'TASK_DAILY_RECON', type: 'workflow', version: '1.0', createdBy: 'admin', updatedAt: '2025-05-26' },
    ]},
  ]
};

const INITIAL_FAVORITE_ITEMS: ResourceItem[] = [
  { id: 'res_ux_1', name: '年度预算录入表', code: 'BUDGET_SHEET', type: 'spreadsheet', version: '1.0', createdBy: 'liuqing', updatedAt: '2025-05-10' },
];

const INITIAL_HISTORY_ITEMS: ResourceItem[] = [
  { id: 'res_ux_comp_1', name: '利润分配逻辑表', code: 'PROFIT_DIST', type: 'spreadsheet', version: '1.0', createdBy: 'liuqing', updatedAt: '2025-05-12' },
];

const CONSOLE_ITEMS = [
  { id: 'c1', name: 'DeepModel 控制台', icon: <Database size={14} className="text-purple-500" /> },
  { id: 'c2', name: '数据流监控', icon: <Zap size={14} className="text-amber-500" /> },
  { id: 'c3', name: '工作流监控', icon: <Activity size={14} className="text-emerald-500" /> },
  { id: 'c4', name: '工作流待办', icon: <ListTodo size={14} className="text-blue-500" /> },
];

const getIconForType = (type: ResourceType) => {
  switch (type) {
    case 'folder': return <FolderOpen size={14} className="text-amber-500 fill-amber-500/10" />;
    case 'model': return <Database size={14} className="text-purple-500" />;
    case 'logic': return <Workflow size={14} className="text-sky-500" />;
    case 'workflow': return <Cpu size={14} className="text-indigo-500" />;
    case 'spreadsheet': return <Grid3X3 size={14} className="text-emerald-500" />;
    case 'ux': return <Layout size={14} className="text-blue-500" />;
    case 'accounting': return <HistoryIcon size={14} className="text-rose-500" />;
    case 'script': return <Terminal size={14} className="text-slate-500" />;
    default: return <FileText size={14} className="text-slate-400" />;
  }
};

const Explorer: React.FC<ExplorerProps> = ({ 
  activeModule,
  onSelectResource, 
  isUserMode, 
  activeTab,
  tabs,
  onCloseTab,
  showContext = true,
  activeDrawerType,
  onCloseContext,
  onToggleCollapse
}) => {
  const [selectedModule, setSelectedModule] = useState(isUserMode ? activeModule : 'all');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 'root_ux': true, 'root_model': true, 'root_logic': true });
  const [groupsExpanded, setGroupsExpanded] = useState<Record<string, boolean>>({ recent: true, fav: true });
  const [showCode, setShowCode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contextHeight, setContextHeight] = useState(320);
  const [isResizingContext, setIsResizingContext] = useState(false);

  // 更多菜单与类型筛选状态
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [filterTypeLabel, setFilterTypeLabel] = useState('全量资源');

  const [historyItems, setHistoryItems] = useState<ResourceItem[]>(INITIAL_HISTORY_ITEMS);
  const [pinnedItems, setPinnedItems] = useState<ResourceItem[]>(INITIAL_FAVORITE_ITEMS);
  const prevTabsRef = useRef<Tab[]>(tabs);

  useEffect(() => {
    const prevTabs = prevTabsRef.current;
    const closedTabs = prevTabs.filter(prev => !tabs.some(curr => curr.id === prev.id));
    if (closedTabs.length > 0) {
      setHistoryItems(prev => {
        let newHistory = [...prev];
        closedTabs.forEach(closed => {
          if (closed.id === 'elements-view' || closed.id === 'default-home') return;
          newHistory = newHistory.filter(h => h.id !== closed.id);
          const historyEntry: ResourceItem = {
            id: closed.id, name: closed.title, code: closed.code || '', type: closed.type as any,
            version: '1.0', createdBy: 'system', updatedAt: new Date().toISOString()
          };
          newHistory = [historyEntry, ...newHistory];
        });
        return newHistory.slice(0, 10);
      });
    }
    const openedTabs = tabs.filter(curr => !prevTabs.some(prev => prev.id === curr.id));
    if (openedTabs.length > 0) {
      setHistoryItems(prev => prev.filter(h => !openedTabs.some(o => o.id === h.id)));
    }
    prevTabsRef.current = tabs;
  }, [tabs]);

  const toggleExpand = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleGroup = (id: string) => setGroupsExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const handlePin = useCallback((item: any) => {
    setPinnedItems(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      const newItem: ResourceItem = {
        id: item.id,
        name: item.name || item.title,
        code: item.code || '',
        type: item.type,
        version: '1.0',
        createdBy: 'system',
        updatedAt: item.updatedAt || new Date().toISOString()
      };
      return [newItem, ...prev];
    });
  }, []);

  const handleUnpin = useCallback((itemId: string) => {
    setPinnedItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const activeOpenedTabs = useMemo(() => tabs.filter(t => t.id !== 'elements-view' && t.id !== 'default-home'), [tabs]);
  
  const filteredHistory = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return q ? historyItems.filter(h => h.name.toLowerCase().includes(q) || (h.code && h.code.toLowerCase().includes(q))) : historyItems;
  }, [searchQuery, historyItems]);

  const filteredPinned = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return q ? pinnedItems.filter(p => p.name.toLowerCase().includes(q) || (p.code && p.code.toLowerCase().includes(q))) : pinnedItems;
  }, [searchQuery, pinnedItems]);

  const [lockedDrawerType, setLockedDrawerType] = useState<ModuleId | null>(activeDrawerType || null);
  useEffect(() => { if (activeDrawerType) setLockedDrawerType(activeDrawerType); }, [activeDrawerType]);

  const currentTree = useMemo(() => {
    let data = isUserMode ? (MODULE_DATA[activeModule] || []) : (MODULE_DATA[selectedModule] || MODULE_DATA['all'] || []);
    
    // 1. 类型筛选逻辑
    if (filterTypeLabel !== '全量资源') {
      const typeMap: Record<string, ResourceType[]> = {
        '页面展现': ['ux', 'spreadsheet'],
        '数据模型': ['model'],
        '流程逻辑': ['logic', 'workflow', 'script']
      };
      const targetTypes = typeMap[filterTypeLabel] || [];
      
      const filterItemRecursively = (items: ResourceItem[]): ResourceItem[] => {
        return items.reduce((acc, item) => {
          if (item.type === 'folder' && item.children) {
            const filteredChildren = filterItemRecursively(item.children);
            if (filteredChildren.length > 0) {
              acc.push({ ...item, children: filteredChildren });
            }
          } else if (targetTypes.includes(item.type)) {
            acc.push(item);
          }
          return acc;
        }, [] as ResourceItem[]);
      };
      data = filterItemRecursively(data);
    }

    // 2. 搜索逻辑
    if (!searchQuery) return data;
    const lowerQuery = searchQuery.toLowerCase();
    const searchRecursively = (items: ResourceItem[]): ResourceItem[] => {
      return items.reduce((acc, item) => {
        const matches = item.name.toLowerCase().includes(lowerQuery) || (item.code && item.code.toLowerCase().includes(lowerQuery));
        if (item.type === 'folder' && item.children) {
          const filteredChildren = searchRecursively(item.children);
          if (filteredChildren.length > 0 || matches) {
            acc.push({ ...item, children: filteredChildren });
          }
        } else if (matches) {
          acc.push(item);
        }
        return acc;
      }, [] as ResourceItem[]);
    };
    return searchRecursively(data);
  }, [selectedModule, activeModule, searchQuery, isUserMode, filterTypeLabel]);

  const expandAll = () => {
    const newExpanded: Record<string, boolean> = {};
    currentTree.forEach(dir => { newExpanded[dir.id] = true; });
    setExpanded(newExpanded);
    setIsMoreMenuOpen(false);
  };

  const collapseAll = () => {
    setExpanded({});
    setIsMoreMenuOpen(false);
  };

  const locateActive = () => {
    if (activeTab) {
      console.log('Locating:', activeTab.id);
    }
    setIsMoreMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-white select-none relative border-r border-slate-100">
      <div className="h-14 flex items-center px-4 justify-between border-b border-slate-100 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 tracking-tight text-[13px] uppercase">
            {activeModule === 'recent_fav' ? '最近打开' : (isUserMode ? '业务模块' : '资源管理')}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowCode(!showCode)} className={`p-1.5 rounded transition-all active:scale-90 ${showCode ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`} title="切换代码/名称显示">
            {showCode ? <Code2 size={15} /> : <Eye size={15} />}
          </button>
          <button onClick={onToggleCollapse} className="p-1.5 text-slate-400 hover:bg-slate-50 rounded" title="收起目录栏"><PanelLeftClose size={15} /></button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="p-2 space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
            <input type="text" placeholder="搜索资源..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-1.5 pl-8 pr-3 text-[12px] outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm" />
          </div>

          {!isUserMode && activeModule !== 'recent_fav' && (
            <div className="flex items-center gap-1.5">
              <div className="relative flex-1">
                <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} className="w-full flex items-center gap-2 px-2.5 py-1.5 bg-white border border-slate-200 rounded text-[12px] hover:border-blue-500 transition-colors">
                  <Compass size={14} className="text-blue-600" />
                  <span className="flex-1 text-left font-medium text-slate-700 truncate">{filterTypeLabel}</span>
                  <ChevronDown size={12} className="text-slate-400" />
                </button>
                {isFilterMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsFilterMenuOpen(false)}></div>
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-100 rounded shadow-xl z-50 py-1 animate-in fade-in zoom-in duration-100 origin-top">
                      {[
                        { label: '全量资源', icon: <Compass size={13} /> },
                        { label: '页面展现', icon: <Layout size={13} /> },
                        { label: '数据模型', icon: <Database size={13} /> },
                        { label: '流程逻辑', icon: <Workflow size={13} /> }
                      ].map(type => (
                        <button key={type.label} onClick={() => { setFilterTypeLabel(type.label); setIsFilterMenuOpen(false); }} className={`w-full flex items-center gap-2.5 px-3 py-2 text-[12px] hover:bg-blue-50 transition-colors ${filterTypeLabel === type.label ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-600'}`}>
                          {type.icon} {type.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <button className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-400 hover:text-blue-600" title="新建资源"><Plus size={18} /></button>
              <div className="relative">
                <button onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)} className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-400 hover:text-blue-600" title="更多"><MoreVertical size={18} /></button>
                {isMoreMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMoreMenuOpen(false)}></div>
                    <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-slate-100 rounded shadow-xl z-50 py-1 animate-in fade-in zoom-in duration-100 origin-top-right">
                      <button onClick={locateActive} className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-slate-600 hover:bg-blue-50 transition-colors"><Locate size={14} /> 定位当前元素</button>
                      <button onClick={expandAll} className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-slate-600 hover:bg-blue-50 transition-colors"><ChevronLast size={14} className="rotate-90" /> 展开所有</button>
                      <button onClick={collapseAll} className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-slate-600 hover:bg-blue-50 transition-colors"><ChevronFirst size={14} className="rotate-90" /> 收起所有</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-1 no-scrollbar pb-10">
          {activeModule === 'recent_fav' ? (
            <div className="space-y-6 pt-1">
              <div className="px-1">
                <button onClick={() => toggleGroup('fav')} className="w-full flex items-center justify-between p-1.5 mb-1 text-slate-400 bg-slate-50/50 rounded hover:bg-slate-100/50 transition-colors">
                  <div className="flex items-center gap-2">
                    {/* 修改为锚定图标 Pin */}
                    <Pin size={14} className="text-blue-600 rotate-45" fill="currentColor" />
                    <span className="text-[11px] font-black uppercase tracking-widest">常用</span>
                  </div>
                  {groupsExpanded.fav ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </button>
                {groupsExpanded.fav && (
                  <div className="space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {filteredPinned.length > 0 ? filteredPinned.map(item => {
                      const isOpen = tabs.some(t => t.id === item.id);
                      const isActive = activeTab?.id === item.id;
                      return (
                        <div key={item.id} onClick={() => onSelectResource(item)} className={`flex items-center gap-2 p-1.5 rounded cursor-pointer group transition-all ${isActive ? 'bg-blue-600/5 shadow-inner' : 'hover:bg-blue-50/50'}`}>
                          {getIconForType(item.type)}
                          <span className={`text-[12px] truncate flex-1 transition-all ${isActive ? 'text-blue-600 font-bold' : (isOpen ? 'text-slate-700' : 'text-slate-500')}`}>{showCode ? item.code : item.name}</span>
                          {isOpen && !isActive && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-50"></div>}
                          <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded" onClick={(e) => { e.stopPropagation(); handleUnpin(item.id); }}><PinOff size={12} /></button>
                        </div>
                      );
                    }) : <div className="p-3 text-[11px] text-slate-300 text-center italic">暂无常用项</div>}
                  </div>
                )}
              </div>

              <div className="px-1">
                <button onClick={() => toggleGroup('recent')} className="w-full flex items-center justify-between p-1.5 mb-1 text-slate-400 bg-slate-50/50 rounded hover:bg-slate-100/50 transition-colors">
                  <div className="flex items-center gap-2"><Clock size={14} className="text-blue-600" /><span className="text-[11px] font-black uppercase tracking-widest">最近</span></div>
                  {groupsExpanded.recent ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </button>
                {groupsExpanded.recent && (
                  <div className="space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {/* A. 正在打开的 Tab */}
                    {activeOpenedTabs.map(item => {
                      const isPinned = pinnedItems.some(p => p.id === item.id);
                      return (
                        <div key={item.id} onClick={() => onSelectResource({ id: item.id, name: item.title, type: item.type, code: item.code })} className={`flex items-center gap-2 p-1.5 rounded cursor-pointer group transition-all ${activeTab?.id === item.id ? 'bg-blue-600/5 shadow-inner' : 'hover:bg-blue-50/50'}`}>
                          {getIconForType(item.type as ResourceType)}
                          <span className={`text-[12px] truncate flex-1 transition-all ${activeTab?.id === item.id ? 'text-blue-600 font-bold' : 'text-slate-700 font-medium'}`}>{showCode ? (item.code || item.title) : item.title}</span>
                          <div className="flex items-center">
                            {/* 增加固定到常用按钮 */}
                            <button 
                              className={`p-1 rounded transition-all ${isPinned ? 'text-blue-600 opacity-40' : 'opacity-0 group-hover:opacity-100 text-slate-300 hover:text-blue-600 hover:bg-blue-50'}`} 
                              onClick={(e) => { e.stopPropagation(); if (!isPinned) handlePin(item); }}
                            >
                              <Pin size={12} fill={isPinned ? "currentColor" : "none"} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); onCloseTab(item.id); }} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-rose-500 rounded hover:bg-rose-50 transition-all"><X size={12} /></button>
                          </div>
                        </div>
                      );
                    })}
                    {(activeOpenedTabs.length > 0 && filteredHistory.length > 0) && (
                      <div className="flex items-center gap-2 py-2 px-1 opacity-40"><div className="flex-1 h-[1px] bg-slate-200"></div><span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">最近关闭</span><div className="flex-1 h-[1px] bg-slate-200"></div></div>
                    )}
                    {/* B. 历史记录 */}
                    {filteredHistory.map(item => {
                      const isPinned = pinnedItems.some(p => p.id === item.id);
                      return (
                        <div key={item.id} onClick={() => onSelectResource(item)} className="flex items-center gap-2 p-1.5 rounded cursor-pointer group hover:bg-slate-50 transition-colors">
                          <div className="opacity-30 grayscale shrink-0">{getIconForType(item.type)}</div>
                          <span className={`text-[12px] truncate flex-1 text-slate-400 group-hover:text-slate-500 transition-colors`}>{showCode ? item.code : item.name}</span>
                          <button className={`p-1 rounded transition-all ${isPinned ? 'text-blue-600 opacity-40' : 'opacity-0 group-hover:opacity-100 text-slate-300 hover:text-blue-600 hover:bg-blue-50'}`} onClick={(e) => { e.stopPropagation(); if (!isPinned) handlePin(item); }}><Pin size={12} fill={isPinned ? "currentColor" : "none"} /></button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            currentTree.map(dir => (
              <div key={dir.id} className="mb-0.5">
                <div onClick={() => toggleExpand(dir.id)} className="flex items-center gap-2 p-1.5 hover:bg-slate-100/60 rounded cursor-pointer group">
                  <div className="w-4 h-4 flex items-center justify-center shrink-0">{expanded[dir.id] ? <ChevronDown size={12} className="text-slate-400" /> : <ChevronRight size={12} className="text-slate-400" />}</div>
                  {getIconForType('folder')}<span className="text-[12px] font-medium text-slate-600 truncate">{showCode ? dir.code : dir.name}</span>
                </div>
                {expanded[dir.id] && dir.children && (
                  <div className="ml-5 border-l border-slate-100 mt-0.5 mb-1">
                    {dir.children.map(item => (
                      <div key={item.id} onClick={() => onSelectResource(item)} className="flex items-center gap-2 p-1.5 pl-4 hover:bg-blue-50/50 rounded cursor-pointer group relative">{getIconForType(item.type)}<span className={`text-[12px] truncate flex-1 transition-colors ${activeTab?.id === item.id ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>{showCode ? item.code : item.name}</span></div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ height: showContext ? `${contextHeight}px` : '0px', opacity: showContext ? 1 : 0 }} className="border-t border-slate-200 bg-slate-50/80 flex flex-col shrink-0 relative transition-all duration-300 ease-in-out overflow-hidden z-10">
        <div onMouseDown={() => setIsResizingContext(true)} className="absolute top-0 left-0 w-full h-1 cursor-row-resize hover:bg-blue-400/30 z-50 active:bg-blue-500" />
        <div className="h-9 flex items-center px-3 justify-between border-b border-slate-200 bg-white">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            {lockedDrawerType === 'console' ? <><Terminal size={12} className="text-blue-600" /> 控制台</> : <><Info size={12} className="text-blue-600" /> 元素信息</>}
          </span>
          <button onClick={onCloseContext} className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronDown size={14} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 no-scrollbar space-y-4">
          {lockedDrawerType === 'console' ? (
            <div className="grid grid-cols-1 gap-1">
              {CONSOLE_ITEMS.map(item => (
                <button key={item.id} onClick={() => onSelectResource({ id: item.id, name: item.name, type: 'page' })} className="flex items-center gap-3 p-2 rounded-lg text-[12px] text-slate-600 bg-white border border-slate-100 hover:border-blue-300 hover:bg-blue-50/30 hover:text-blue-600 transition-all text-left shadow-sm group">
                  <span className="shrink-0 transition-transform group-hover:scale-110">{item.icon}</span>
                  <span className="truncate flex-1 font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          ) : activeTab ? (
            <div className="space-y-5 animate-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-800 tracking-tight">{activeTab.title}</div>
                <div className="text-[10px] text-slate-400 font-mono bg-slate-50 px-1.5 py-0.5 rounded inline-block">{activeTab.code}</div>
              </div>
              
              <section className="space-y-1.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck size={11} className="text-blue-600" /> 权限 & 版本</h4>
                <div className="bg-white border border-slate-100 rounded-lg p-2 text-[11px] space-y-1.5">
                  <div className="flex justify-between items-center"><span className="text-slate-500">负责人:</span><span className="text-blue-600 font-bold bg-blue-50 px-1.5 rounded">liuqing</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">版本:</span><span className="text-slate-400 font-mono">v1.2.0</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">最近更新:</span><span className="text-slate-400">{activeTab.updatedAt || '刚刚'}</span></div>
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Link size={11} className="text-blue-600" /> 关联元素 (Depends On)</h4>
                <div className="space-y-1.5">
                  {[
                    { id: 'dep_1', name: 'BUDGET_DIM_01', type: 'model' as ResourceType },
                    { id: 'dep_2', name: 'USER_MAPPING_SCRIPT', type: 'logic' as ResourceType }
                  ].map(item => (
                    <div key={item.id} className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded text-[11px] text-slate-600 group/item hover:border-blue-200 transition-all">
                      {getIconForType(item.type)}
                      <span className="flex-1 truncate group-hover/item:text-blue-600">{item.name}</span>
                      <button onClick={() => onSelectResource(item)} className="p-1 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded" title="跳转"><ExternalLink size={12} /></button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><ArrowRightLeft size={11} className="text-amber-600" /> 被关联元素 (Referenced By)</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded text-[11px] text-slate-600 group/item hover:border-blue-200 transition-all">
                    <Layout size={12} className="text-blue-500" />
                    <span className="flex-1 truncate group-hover/item:text-blue-600">FIN_MAIN_DASHBOARD</span>
                    <button onClick={() => onSelectResource({ id: 'ref_1', name: 'FIN_MAIN_DASHBOARD', type: 'ux' })} className="p-1 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded" title="跳转"><ExternalLink size={12} /></button>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-30 grayscale p-4"><Info size={32} className="mb-2" /><p className="text-[10px] font-bold uppercase tracking-widest">未选择元素</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
