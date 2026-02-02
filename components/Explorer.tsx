
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
  Share2,
  Code2,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Trash2,
  Edit2,
  X,
  Compass,
  ShieldCheck,
  User,
  Users,
  ExternalLink,
  History,
  Star,
  Layout,
  Zap,
  Terminal,
  Grid3X3,
  MoreVertical,
  Locate,
  Filter
} from 'lucide-react';
import { ModuleId, ResourceItem, Tab, ResourceType } from '../types';

interface ExplorerProps {
  activeModule: ModuleId;
  onSelectResource: (item: ResourceItem) => void;
  isUserMode?: boolean;
  activeTab?: Tab;
  showContext?: boolean;
  onCloseContext?: () => void;
}

const MODULE_DATA: Record<string, ResourceItem[]> = {
  'module-ux': [
    { id: 'dir_ux_1', name: '电子表格', code: 'DIR_SPREADSHEET', type: 'folder', version: '', createdBy: '', updatedAt: '', children: [
      { id: 'res_ux_1', name: '年度预算录入表', code: 'BUDGET_SHEET', type: 'spreadsheet', version: '1.0', createdBy: 'liuqing', updatedAt: '2025-05-10' },
      { id: 'res_ux_2', name: '费用报销明细', code: 'EXPENSE_DETAIL', type: 'spreadsheet', version: '2.1', createdBy: 'admin', updatedAt: '2025-05-11' },
    ]},
    { id: 'dir_ux_2', name: 'UX 页面', code: 'DIR_UX_PAGE', type: 'folder', version: '', createdBy: '', updatedAt: '', children: [
      { id: 'res_ux_3', name: '财务看板-主视图', code: 'FIN_DASHBOARD', type: 'ux', version: '1.0', createdBy: 'liuqing', updatedAt: '2025-05-12' },
    ]}
  ],
  'module-model': [
    { id: 'dir_model_1', name: '财务模型', code: 'DIR_FIN_MODEL', type: 'folder', version: '', createdBy: '', updatedAt: '', children: [
      { id: 'res_m_1', name: '对账核销核心模型', code: 'MODEL_RECON_CORE', type: 'model', version: '3.0', createdBy: 'liuqing', updatedAt: '2025-05-14' },
    ]},
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
      { id: 'res_l_1', name: '每日定时对账任务', code: 'TASK_DAILY_RECON', type: 'workflow', version: '2.1', createdBy: 'liuqing', updatedAt: '2025-05-14' },
    ]},
  ]
};

const MODULE_OPTIONS = [
  { id: 'all', label: '全量资源', icon: <Compass size={14} /> },
  { id: 'module-ux', label: '页面展现', icon: <Layout size={14} /> },
  { id: 'module-model', label: '数据模型', icon: <Database size={14} /> },
  { id: 'module-logic', label: '流程逻辑', icon: <Workflow size={14} /> },
  { id: 'module-integration', label: '数据集成', icon: <Zap size={14} /> },
];

const RECENT_ITEMS: ResourceItem[] = [
  { id: 'res_m_1', name: '对账核销核心模型', code: 'MODEL_RECON_CORE', type: 'model', version: '3.0', createdBy: 'liuqing', updatedAt: '2025-05-14' },
  { id: 'res_ux_3', name: '财务看板-主视图', code: 'FIN_DASHBOARD', type: 'ux', version: '1.0', createdBy: 'liuqing', updatedAt: '2025-05-12' },
];

const FAVORITE_ITEMS: ResourceItem[] = [
  { id: 'res_ux_1', name: '年度预算录入表', code: 'BUDGET_SHEET', type: 'spreadsheet', version: '1.0', createdBy: 'liuqing', updatedAt: '2025-05-10' },
];

const getIconForType = (type: ResourceType) => {
  switch (type) {
    case 'folder': return <FolderOpen size={14} className="text-amber-500 fill-amber-500/10" />;
    case 'model': return <Database size={14} className="text-purple-500" />;
    case 'logic': return <Workflow size={14} className="text-sky-500" />;
    case 'workflow': return <Cpu size={14} className="text-indigo-500" />;
    case 'spreadsheet': return <Grid3X3 size={14} className="text-emerald-500" />;
    case 'ux': return <Layout size={14} className="text-blue-500" />;
    default: return <FileText size={14} className="text-slate-400" />;
  }
};

const Explorer: React.FC<ExplorerProps> = ({ 
  onSelectResource, 
  isUserMode, 
  activeTab,
  showContext = true,
  onCloseContext
}) => {
  const [selectedModule, setSelectedModule] = useState('all');
  const [isModuleMenuOpen, setIsModuleMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [quickAccessMode, setQuickAccessMode] = useState<'recent' | 'fav'>('recent');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 
    'quick-access': true,
    'root_ux': true,
    'root_model': true,
    'root_logic': true
  });
  const [showCode, setShowCode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contextHeight, setContextHeight] = useState(320);
  const [isResizingContext, setIsResizingContext] = useState(false);
  
  const moduleMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moduleMenuRef.current && !moduleMenuRef.current.contains(event.target as Node)) setIsModuleMenuOpen(false);
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) setIsMoreMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 修复高度调整逻辑
  useEffect(() => {
    if (isResizingContext) {
      const onMouseMove = (e: MouseEvent) => {
        // 计算新的高度：窗口底部 y 坐标 - 鼠标 y 坐标
        const newHeight = window.innerHeight - e.clientY;
        setContextHeight(Math.max(100, Math.min(800, newHeight)));
      };
      const onMouseUp = () => setIsResizingContext(false);
      
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
      
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizingContext]);

  const toggleExpand = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const currentTree = useMemo(() => {
    const data = MODULE_DATA[selectedModule] || MODULE_DATA['all'] || [];
    if (!searchQuery) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.map(dir => ({
      ...dir,
      children: dir.children?.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || item.code.toLowerCase().includes(lowerQuery)
      )
    })).filter(dir => (dir.children && dir.children.length > 0) || dir.name.toLowerCase().includes(lowerQuery));
  }, [selectedModule, searchQuery]);

  const currentModule = useMemo(() => 
    MODULE_OPTIONS.find(o => o.id === selectedModule) || MODULE_OPTIONS[0], 
  [selectedModule]);

  return (
    <div className="flex flex-col h-full bg-white select-none relative">
      {/* Explorer Header */}
      <div className="h-14 flex items-center px-4 justify-between border-b border-slate-100 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 tracking-tight text-[13px] uppercase">资源管理</span>
          <button 
            onClick={() => setQuickAccessMode(quickAccessMode === 'recent' ? 'fav' : 'recent')}
            className={`p-1 rounded hover:bg-slate-50 transition-colors ${quickAccessMode === 'fav' ? 'text-amber-500' : 'text-slate-400'}`}
          >
            {quickAccessMode === 'recent' ? <History size={13} /> : <Star size={13} />}
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowCode(!showCode)} className={`p-1.5 rounded transition-colors ${showCode ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}>
            {showCode ? <Code2 size={14} /> : <Eye size={14} />}
          </button>
          <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded"><X size={14} /></button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Quick Access Area */}
        {!isUserMode && (
          <div className="p-2 border-b border-slate-50 bg-slate-50/10">
            <button onClick={() => toggleExpand('quick-access')} className="w-full flex items-center gap-2 p-1.5 hover:bg-white rounded transition-colors group">
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                {expanded['quick-access'] ? <ChevronDown size={12} className="text-slate-400" /> : <ChevronRight size={12} className="text-slate-400" />}
              </div>
              {quickAccessMode === 'recent' ? <History size={13} className="text-slate-400" /> : <Star size={13} className="text-amber-400" />}
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                {quickAccessMode === 'recent' ? '最近访问' : '我的收藏'}
              </span>
            </button>
            {expanded['quick-access'] && (
              <div className="space-y-0.5 mt-0.5 px-2">
                {(quickAccessMode === 'recent' ? RECENT_ITEMS : FAVORITE_ITEMS).map(item => (
                  <div key={item.id} onClick={() => onSelectResource(item)} className="flex items-center gap-2 p-1.5 rounded cursor-pointer hover:bg-slate-50 transition-colors">
                    {getIconForType(item.type)}
                    <span className={`text-[12px] truncate flex-1 ${activeTab?.id === item.id ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Improved Toolbar Layout */}
        <div className="p-2 bg-white space-y-2">
          {/* Row 1: Full-width Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
            <input 
              type="text" 
              placeholder="搜索资源..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded py-1.5 pl-8 pr-3 text-[12px] outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm" 
            />
          </div>

          {/* Row 2: Filter with Text + Actions */}
          <div className="flex items-center justify-between gap-1.5">
            <div className="relative flex-1" ref={moduleMenuRef}>
              <button 
                onClick={() => setIsModuleMenuOpen(!isModuleMenuOpen)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded border border-slate-200 bg-white hover:border-blue-400 transition-all text-slate-700 shadow-sm"
              >
                <span className="text-blue-600">{currentModule.icon}</span>
                <span className="text-[12px] font-medium flex-1 text-left">{currentModule.label}</span>
                <ChevronDown size={12} className="text-slate-400" />
              </button>
              
              {isModuleMenuOpen && (
                <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-slate-100 rounded-lg shadow-xl z-50 py-1 animate-in fade-in zoom-in duration-100 origin-top-left">
                  {MODULE_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => { setSelectedModule(opt.id); setIsModuleMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-[12px] hover:bg-slate-50 transition-colors ${selectedModule === opt.id ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-600'}`}
                    >
                      <span className={selectedModule === opt.id ? 'text-blue-600' : 'text-slate-400'}>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm" title="新建资源">
                <Plus size={16} />
              </button>
              <div className="relative" ref={moreMenuRef}>
                <button 
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-400 hover:text-slate-600 transition-all shadow-sm"
                >
                  <MoreVertical size={16} />
                </button>
                {isMoreMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-100 rounded-lg shadow-xl z-50 py-1 animate-in fade-in zoom-in duration-100 origin-top-right">
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-50"><Locate size={14} className="text-slate-400" /> 定位当前元素</button>
                    <div className="h-[1px] bg-slate-100 my-1 mx-2"></div>
                    <button onClick={() => setExpanded(prev => {
                      const next = { ...prev };
                      currentTree.forEach(d => next[d.id] = true);
                      return next;
                    })} className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-50">展开全部</button>
                    <button onClick={() => setExpanded({ 'quick-access': expanded['quick-access'] })} className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-50">收起全部</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Directory Tree (No divider above) */}
        <div className="flex-1 overflow-y-auto px-1 no-scrollbar pb-10">
          {currentTree.map(dir => (
            <div key={dir.id} className="mb-0.5">
              <div onClick={() => toggleExpand(dir.id)} className="flex items-center gap-2 p-1.5 hover:bg-slate-100/60 rounded cursor-pointer group">
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  {expanded[dir.id] ? <ChevronDown size={12} className="text-slate-400" /> : <ChevronRight size={12} className="text-slate-400" />}
                </div>
                {getIconForType('folder')}
                <span className="text-[12px] font-medium text-slate-600 truncate">{showCode ? dir.code : dir.name}</span>
              </div>
              {expanded[dir.id] && dir.children && (
                <div className="ml-5 border-l border-slate-100 mt-0.5 mb-1">
                  {dir.children.map(item => (
                    <div key={item.id} onClick={() => onSelectResource(item)} className="flex items-center gap-2 p-1.5 pl-4 hover:bg-blue-50/50 rounded cursor-pointer group relative">
                      <div className="shrink-0">{getIconForType(item.type)}</div>
                      <span className={`text-[12px] truncate flex-1 transition-colors ${activeTab?.id === item.id ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
                        {showCode ? item.code : item.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resizable Element Context Drawer */}
      <div 
        style={{ 
          height: showContext ? `${contextHeight}px` : '0px',
          opacity: showContext ? 1 : 0
        }} 
        className="border-t border-slate-200 bg-slate-50/80 flex flex-col shrink-0 relative transition-all duration-300 ease-in-out overflow-hidden z-10"
      >
        {/* Resize Handle */}
        <div 
          onMouseDown={() => setIsResizingContext(true)}
          className="absolute top-0 left-0 w-full h-1 cursor-row-resize hover:bg-blue-400/30 z-50 active:bg-blue-500"
        />

        <div className="h-9 flex items-center px-3 justify-between border-b border-slate-200 bg-white">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Compass size={12} className="text-blue-600" /> 元素上下文
          </span>
          <button onClick={onCloseContext} className="p-1 hover:bg-slate-100 rounded text-slate-400 transition-colors">
            <ChevronDown size={14} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 no-scrollbar space-y-4">
          {activeTab ? (
            <>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[12px] font-bold text-slate-800">{activeTab.title}</div>
                <div className="text-[10px] text-slate-400 font-mono">{activeTab.code}</div>
              </div>

              {/* 关联元素部分 */}
              <section className="space-y-1.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ArrowUpRight size={10} className="text-blue-600" /> 关联元素
                </h4>
                <div className="space-y-1">
                  {[
                    { name: '财务对账核心逻辑', type: 'logic', code: 'FIN_RECON_LOGIC' },
                    { name: 'ERP 基础数据模型', type: 'model', code: 'ERP_BASE_MODEL' }
                  ].map((rel, i) => (
                    <div key={i} className="bg-white/50 border border-slate-100 rounded-lg p-2 flex items-center gap-2 hover:bg-white transition-colors cursor-pointer group">
                      {getIconForType(rel.type as ResourceType)}
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-slate-700 truncate">{rel.name}</div>
                        <div className="text-[9px] text-slate-400 font-mono truncate">{rel.code}</div>
                      </div>
                      <ExternalLink size={10} className="text-slate-300 group-hover:text-blue-500" />
                    </div>
                  ))}
                </div>
              </section>

              {/* 被关联元素部分 */}
              <section className="space-y-1.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ArrowDownLeft size={10} className="text-emerald-600" /> 被关联元素
                </h4>
                <div className="space-y-1">
                  {[
                    { name: '月度财务审计看板', type: 'ux', code: 'MONTHLY_AUDIT_DASH' }
                  ].map((rel, i) => (
                    <div key={i} className="bg-white/50 border border-slate-100 rounded-lg p-2 flex items-center gap-2 hover:bg-white transition-colors cursor-pointer group">
                      {getIconForType(rel.type as ResourceType)}
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-slate-700 truncate">{rel.name}</div>
                        <div className="text-[9px] text-slate-400 font-mono truncate">{rel.code}</div>
                      </div>
                      <ExternalLink size={10} className="text-slate-300 group-hover:text-emerald-500" />
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-1.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck size={10} className="text-blue-600" /> 权限信息</h4>
                <div className="bg-white/50 border border-slate-100 rounded-lg p-2 text-[11px] space-y-1">
                  <div className="flex justify-between"><span className="text-slate-500">查看权限:</span><span className="text-slate-700">liuqing, admin</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">管理权限:</span><span className="text-blue-600 font-bold">财务管理员组</span></div>
                </div>
              </section>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-30 grayscale p-4">
              <Compass size={32} className="mb-2" />
              <p className="text-[10px] font-bold uppercase tracking-widest">未选择元素</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
