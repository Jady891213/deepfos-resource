
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Files, 
  Bell, 
  Sparkles, 
  X, 
  ChevronDown, 
  Boxes,
  Layers,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { ViewMode, ResourceItem, ModuleId, Tab } from './types';
import Sidebar from './components/Sidebar';
import Explorer from './components/Explorer';
import MainContent from './components/MainContent';
import AIAssistant from './components/AIAssistant';

const INITIAL_DATA: ResourceItem[] = [
  {
    id: 'f1', name: '0101 每日定时对账核销任务', type: 'workflow', description: '自动从ERP拉取流水并进行匹配...', version: 'v2.1', createdBy: 'liuqing', updatedAt: '2025-05-14 10:28:07', unreadCount: 1, tags: ['Finance', 'Batch']
  },
  {
    id: 'f2', name: '财务报表集成接口', type: 'connector', description: '财务报表集成数据流核心连接器', version: 'v1.0.2', createdBy: 'liuqing', updatedAt: '2025-05-14 17:28:09',
  },
  {
    id: 'f3', name: '对账核销模型-核心逻辑', type: 'model', description: '核心清算与对账业务模型', version: '3.0', createdBy: 'liuqing', updatedAt: '2025-05-23 10:38:41',
  }
];

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>('pages');
  const [activeDrawerModule, setActiveDrawerModule] = useState<ModuleId | null>('recents');
  const [isAIShowing, setIsAIShowing] = useState(false);
  const [interfaceMode, setInterfaceMode] = useState<'dev' | 'user'>('dev');
  // Initialize with Nav panel VISIBLE but sidebar COLLAPSED
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(64);
  
  // Sidebar Resize Logic
  const [isResizing, setIsResizing] = useState(false);
  const isExpanded = sidebarWidth > 120;

  // Multi-tab state - Default is "元素管理"
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'elements-view', title: '元素管理', type: 'folder' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string | null>('elements-view');

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = Math.min(Math.max(64, e.clientX), 320);
      setSidebarWidth(newWidth);
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  const toggleSidebar = () => {
    setSidebarWidth(isExpanded ? 64 : 200);
  };

  const openTab = (item: ResourceItem | { id: string, name: string, type: any, moduleId?: ModuleId }) => {
    const existing = tabs.find(t => t.id === item.id);
    if (!existing) {
      const moduleId = 'moduleId' in item ? item.moduleId : undefined;
      setTabs([...tabs, { id: item.id, title: item.name, type: item.type, moduleId }]);
    }
    setActiveTabId(item.id);
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== id);
    if (newTabs.length > 0) {
      if (activeTabId === id) {
        setActiveTabId(newTabs[newTabs.length - 1].id);
      }
    } else {
      setActiveTabId(null);
    }
    setTabs(newTabs);
  };

  const moduleNames: Record<ModuleId, string> = {
    pages: '页面展现',
    logic: '流程逻辑',
    data: '数据模型',
    lakehouse: '数据湖仓',
    integration: '数据集成',
    services: '基础服务',
    v2: 'V2组件',
    finance: '场景-财务工具',
    recents: '最近打开与搜藏',
    elements: '元素管理',
    terminal: '系统控制台'
  };

  const explorerWidth = 240;
  const navContainerWidth = sidebarWidth + explorerWidth;

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white selection:bg-blue-100 antialiased font-sans text-[13px]">
      {/* Global Top Header - Continuous Top Strip */}
      <header className="h-14 flex items-center border-b border-slate-200 bg-white shrink-0 z-30">
        <div className="flex items-center px-4 h-full shrink-0">
          {/* Toggle button at the very left */}
          <button 
            onClick={() => setIsNavHidden(!isNavHidden)}
            className={`p-1.5 rounded-lg transition-all mr-4 ${isNavHidden ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
            title={isNavHidden ? "展开导航" : "收起导航"}
          >
            {isNavHidden ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
          </button>
          
          {/* Branding */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
              <Layers size={18} strokeWidth={2.5} />
            </div>
            <div className="whitespace-nowrap overflow-hidden flex flex-col leading-none">
              <span className="font-black text-slate-800 tracking-tight text-[15px]">DeepFOS</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Intelligence Platform</span>
            </div>
          </div>
        </div>

        <div className="w-[1px] h-6 bg-slate-200 mx-4 shrink-0"></div>

        {/* Tabs Section - Centered/Flexible strip */}
        <div className="flex-1 flex h-full overflow-x-auto no-scrollbar items-end gap-0.5">
          {tabs.map((tab) => (
            <div 
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`group h-[38px] flex items-center px-4 gap-2 text-[12px] font-medium cursor-pointer transition-all border-t-2 rounded-t-lg shrink-0 ${
                activeTabId === tab.id 
                  ? 'bg-white border-blue-600 text-blue-700 shadow-[0_-2px_6px_rgba(0,0,0,0.02)]' 
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Files size={12} className={activeTabId === tab.id ? 'text-blue-600' : 'text-slate-400'} />
              <span className="max-w-[140px] truncate">{tab.title}</span>
              <button 
                onClick={(e) => closeTab(e, tab.id)}
                className="p-0.5 rounded-full hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity ml-1"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>

        {/* Right Utils */}
        <div className="flex items-center gap-4 px-5 border-l border-slate-100 h-full shrink-0">
          <button onClick={() => setIsAIShowing(!isAIShowing)} className={`p-1.5 rounded-lg transition-colors ${isAIShowing ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-100'}`}>
            <Sparkles size={18} />
          </button>
          <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg relative">
            <Bell size={18} />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-100 ml-1">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[12px] font-bold border-2 border-white shadow-sm">LQ</div>
          </div>
        </div>
      </header>

      {/* Main Body - Split into Nav (Sidebar+Explorer) and Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Navigation Unit (Sidebar + Explorer) */}
        <div 
          className="flex overflow-hidden transition-all duration-300 ease-in-out border-r border-slate-200 bg-white shrink-0 relative z-20"
          style={{ 
            width: `${navContainerWidth}px`,
            marginLeft: isNavHidden ? `-${navContainerWidth}px` : '0px'
          }}
        >
          {/* Sidebar Area */}
          <Sidebar 
            activeModule={activeModule} 
            onModuleChange={(id) => {
              if (id === 'elements') {
                openTab({ id: 'elements-view', name: '元素管理', type: 'folder' });
              } else {
                setActiveModule(id);
              }
            }} 
            activeDrawerModule={activeDrawerModule}
            onDrawerChange={(id) => {
              setActiveDrawerModule(activeDrawerModule === id ? null : id);
            }}
            width={sidebarWidth}
            isExpanded={isExpanded}
            onToggleExpand={toggleSidebar}
            onResizeStart={startResizing}
            isResizing={isResizing}
            interfaceMode={interfaceMode}
            onModeToggle={(mode) => {
              setInterfaceMode(mode);
              setActiveModule(mode === 'dev' ? 'pages' : 'finance');
            }}
          />

          {/* Explorer Area */}
          <div className="flex-1 flex flex-col border-l border-slate-100 bg-white relative overflow-hidden">
            <div className="flex-1 flex flex-col min-h-0">
              <div className="h-14 flex items-center px-4 justify-between border-b border-slate-100 bg-white shrink-0">
                <span className="font-bold text-slate-800 tracking-tight flex items-center gap-2 text-[13px] truncate">
                  <div className="w-4 h-4 bg-slate-100 rounded flex items-center justify-center shrink-0">
                    <Boxes size={10} className="text-slate-500" />
                  </div>
                  {interfaceMode === 'user' ? '财务对账核销目录' : moduleNames[activeModule]}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-2 no-scrollbar">
                <Explorer 
                  key={`${activeModule}-${interfaceMode}`} 
                  activeModule={activeModule} 
                  onSelectResource={(item) => openTab(item)}
                  isUserMode={interfaceMode === 'user'} 
                />
              </div>
            </div>

            {interfaceMode === 'dev' && (
              <div className={`border-t border-slate-200 bg-slate-50 transition-all duration-300 ease-in-out flex flex-col ${
                activeDrawerModule ? 'h-[40%]' : 'h-0'
              }`}>
                <div className="h-9 flex items-center px-4 justify-between border-b border-slate-200 bg-white shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                    {activeDrawerModule ? moduleNames[activeDrawerModule] : ''}
                  </span>
                  <button onClick={() => setActiveDrawerModule(null)} className="p-1 hover:bg-slate-100 rounded text-slate-400">
                    <ChevronDown size={14} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 no-scrollbar">
                  {activeDrawerModule && (
                    <Explorer 
                      key={activeDrawerModule} 
                      activeModule={activeDrawerModule} 
                      onSelectResource={(item) => openTab(item)} 
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Area - Naturally fills remaining space */}
        <main className="flex-1 flex flex-row overflow-hidden relative bg-[#f8fafc] z-10">
          <div className="flex-1 overflow-hidden">
            <MainContent 
              data={INITIAL_DATA} 
              viewMode={ViewMode.EXPLORER} 
              activeTab={tabs.find(t => t.id === activeTabId)} 
              onOpenTab={openTab}
            />
          </div>
          {isAIShowing && (
            <div className="w-80 border-l border-slate-200 bg-white shrink-0 animate-in slide-in-from-right duration-300 z-40 shadow-xl">
              <AIAssistant onClose={() => setIsAIShowing(false)} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
