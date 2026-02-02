
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  Files, 
  Bell, 
  Sparkles, 
  X, 
  ChevronDown, 
  Boxes,
  Layers,
  PanelLeftClose,
  PanelLeft,
  ArrowRight,
  MoreHorizontal,
  ArrowRightCircle,
  XCircle,
  MinusCircle
} from 'lucide-react';
import { ViewMode, ResourceItem, ModuleId, Tab } from './types';
import Sidebar from './components/Sidebar';
import Explorer from './components/Explorer';
import MainContent from './components/MainContent';
import AIAssistant from './components/AIAssistant';

const INITIAL_DATA: ResourceItem[] = [
  {
    id: 'f1', name: '0101 每日定时对账核销任务', code: 'TASK_0101', type: 'workflow', description: '自动从ERP拉取流水并进行匹配...', version: 'v2.1', createdBy: 'liuqing', updatedAt: '2025-05-14 10:28:07', unreadCount: 1, tags: ['Finance', 'Batch']
  },
  {
    id: 'f2', name: '财务报表集成接口', code: 'CONN_FIN_REP', type: 'connector', description: '财务报表集成数据流核心连接器', version: 'v1.0.2', createdBy: 'liuqing', updatedAt: '2025-05-14 17:28:09',
  },
  {
    id: 'f3', name: '对账核销模型-核心逻辑', code: 'MODEL_RECON', type: 'model', description: '核心清算与对账业务模型', version: '3.0', createdBy: 'liuqing', updatedAt: '2025-05-23 10:38:41',
  }
];

interface ContextMenu {
  x: number;
  y: number;
  tabId: string;
}

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>('resources');
  const [activeDrawerModule, setActiveDrawerModule] = useState<ModuleId | null>('context');
  const [isAIShowing, setIsAIShowing] = useState(false);
  const [interfaceMode, setInterfaceMode] = useState<'dev' | 'user'>('dev');
  
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isExplorerHidden, setIsExplorerHidden] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(64);
  
  const [isResizing, setIsResizing] = useState(false);
  const isExpanded = sidebarWidth > 120;

  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'elements-view', title: '元素管理', type: 'folder' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string | null>('elements-view');
  
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const activeTab = useMemo(() => tabs.find(t => t.id === activeTabId), [tabs, activeTabId]);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };
    if (contextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [contextMenu]);

  const toggleSidebar = () => {
    setSidebarWidth(isExpanded ? 64 : 200);
  };

  const openTab = useCallback((item: ResourceItem | { id: string, name: string, code?: string, type: any, moduleId?: ModuleId, updatedAt?: string }) => {
    setTabs(prevTabs => {
      const existing = prevTabs.find(t => t.id === item.id);
      if (!existing) {
        const moduleId = 'moduleId' in item ? item.moduleId : undefined;
        return [...prevTabs, { 
          id: item.id, 
          title: item.name, 
          code: item.code, 
          type: item.type, 
          moduleId,
          updatedAt: item.updatedAt
        }];
      }
      return prevTabs;
    });
    setActiveTabId(item.id);
  }, []);

  const closeTabAction = useCallback((id: string) => {
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(t => t.id !== id);
      if (activeTabId === id) {
        if (newTabs.length > 0) {
          const currentIndex = prevTabs.findIndex(t => t.id === id);
          const nextTab = newTabs[Math.min(currentIndex, newTabs.length - 1)];
          setActiveTabId(nextTab.id);
        } else {
          setActiveTabId(null);
        }
      }
      return newTabs;
    });
  }, [activeTabId]);

  const closeOtherTabs = (id: string) => {
    setTabs(prevTabs => prevTabs.filter(t => t.id === id));
    setActiveTabId(id);
    setContextMenu(null);
  };

  const closeRightTabs = (id: string) => {
    setTabs(prevTabs => {
      const index = prevTabs.findIndex(t => t.id === id);
      return prevTabs.slice(0, index + 1);
    });
    setActiveTabId(id);
    setContextMenu(null);
  };

  const handleSidebarModuleChange = (id: string) => {
    if (id === 'elements') {
      openTab({ id: 'elements-view', name: '元素管理', type: 'folder' });
      if (isExplorerHidden) setIsExplorerHidden(false);
    } else {
      setActiveModule(id as ModuleId);
      if (isExplorerHidden) setIsExplorerHidden(false);
    }
  };

  const handleModeToggle = (mode: 'dev' | 'user') => {
    if (mode === interfaceMode) return;
    setInterfaceMode(mode);
    setActiveModule(mode === 'dev' ? 'resources' : 'finance_center');
    setActiveDrawerModule(null);
    if (isExplorerHidden) setIsExplorerHidden(false);
  };

  const handleTabContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, tabId: id });
  };

  const explorerWidth = isExplorerHidden ? 0 : 240;
  const navContainerWidth = sidebarWidth + explorerWidth;

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white selection:bg-blue-100 antialiased font-sans text-[13px]">
      <header className="h-14 flex items-center border-b border-slate-200 bg-white shrink-0 z-30">
        <div className="flex items-center px-4 h-full shrink-0">
          <button 
            onClick={() => setIsNavHidden(!isNavHidden)}
            className={`p-1.5 rounded-lg transition-all mr-4 ${isNavHidden ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
            title={isNavHidden ? "展开导航" : "收起导航"}
          >
            {isNavHidden ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
          </button>
          
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

        <div className="flex-1 flex h-full overflow-x-auto no-scrollbar items-end gap-0.5">
          {tabs.map((tab) => (
            <div 
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              onContextMenu={(e) => handleTabContextMenu(e, tab.id)}
              className={`group h-[38px] flex items-center px-4 gap-2 text-[12px] font-medium cursor-pointer transition-all border-t-2 rounded-t-lg shrink-0 select-none ${
                activeTabId === tab.id 
                  ? 'bg-white border-blue-600 text-blue-700 shadow-[0_-2px_6px_rgba(0,0,0,0.02)]' 
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Files size={12} className={activeTabId === tab.id ? 'text-blue-600' : 'text-slate-400'} />
              <span className="max-w-[140px] truncate">{tab.title}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); closeTabAction(tab.id); }}
                className="p-0.5 rounded-full hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity ml-1"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 px-5 border-l border-slate-100 h-full shrink-0">
          <button onClick={() => setIsAIShowing(!isAIShowing)} className={`p-1.5 rounded-lg transition-colors ${isAIShowing ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-100'}`}>
            <Sparkles size={18} />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-100 ml-1">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[12px] font-bold border-2 border-white shadow-sm">LQ</div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <div 
          className="flex overflow-hidden transition-all duration-300 ease-in-out border-r border-slate-200 bg-white shrink-0 relative z-20"
          style={{ 
            width: `${navContainerWidth}px`,
            marginLeft: isNavHidden ? `-${navContainerWidth}px` : '0px'
          }}
        >
          <Sidebar 
            activeModule={activeModule} 
            onModuleChange={handleSidebarModuleChange} 
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
            onModeToggle={handleModeToggle}
          />

          <div className={`flex-1 flex flex-col border-l border-slate-100 bg-white relative overflow-hidden transition-all duration-300 ${isExplorerHidden ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex-1 flex flex-col min-h-0">
              <Explorer 
                key={`${activeModule}-${interfaceMode}`} 
                activeModule={activeModule} 
                onSelectResource={(item) => openTab(item)}
                isUserMode={interfaceMode === 'user'} 
                activeTab={activeTab}
                showContext={activeDrawerModule !== null}
                activeDrawerType={activeDrawerModule}
                onCloseContext={() => setActiveDrawerModule(null)}
                onToggleCollapse={() => setIsExplorerHidden(true)}
              />
            </div>
          </div>
        </div>

        <main className="flex-1 flex flex-row overflow-hidden relative bg-[#f8fafc] z-10">
          {isExplorerHidden && !isNavHidden && (
            <button 
              onClick={() => setIsExplorerHidden(false)}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 bg-white border border-slate-200 border-l-0 rounded-r-lg text-slate-400 hover:text-blue-600 shadow-md z-50 animate-in slide-in-from-left duration-200"
              title="展开目录栏"
            >
              <PanelLeft size={16} />
            </button>
          )}
          <div className="flex-1 overflow-hidden">
            <MainContent 
              data={INITIAL_DATA} 
              viewMode={ViewMode.EXPLORER} 
              activeTab={activeTab} 
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

      {contextMenu && (
        <div 
          ref={contextMenuRef}
          className="fixed bg-white border border-slate-100 rounded-lg shadow-2xl z-[100] py-1 min-w-[160px] animate-in fade-in zoom-in duration-100 origin-top-left"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button 
            onClick={() => { closeTabAction(contextMenu.tabId); setContextMenu(null); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <X size={14} className="text-slate-400" /> 关闭标签页
          </button>
          <button 
            onClick={() => closeOtherTabs(contextMenu.tabId)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <MinusCircle size={14} className="text-slate-400" /> 关闭其他标签页
          </button>
          <button 
            onClick={() => closeRightTabs(contextMenu.tabId)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowRightCircle size={14} className="text-slate-400" /> 关闭右侧标签页
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
