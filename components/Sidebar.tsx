
import React from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  Blocks,
  Hammer,
  UserCircle,
  MonitorCheck,
  Info,
  History,
  Database,
  Lock,
  Terminal,
  Grid2X2,
  Settings
} from 'lucide-react';
import { ModuleId } from '../types';

interface SidebarProps {
  activeModule: ModuleId;
  onModuleChange: (id: string) => void;
  activeDrawerModule: ModuleId | null;
  onDrawerChange: (id: ModuleId) => void;
  width: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onResizeStart: () => void;
  isResizing: boolean;
  interfaceMode: 'dev' | 'user';
  onModeToggle: (mode: 'dev' | 'user') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeModule, 
  onModuleChange, 
  activeDrawerModule,
  onDrawerChange,
  width,
  isExpanded, 
  onToggleExpand,
  onResizeStart,
  isResizing,
  interfaceMode,
  onModeToggle
}) => {
  
  const devItems = [
    { id: 'recent_fav', icon: <History size={18} />, label: '最近打开' },
    { id: 'resources', icon: <Blocks size={18} />, label: '全量资源' },
  ] as const;

  const quickTools = [
    { id: 'console', icon: <Terminal size={18} />, label: '控制台', isDrawer: true },
    { id: 'context', icon: <Info size={18} />, label: '元素信息', isDrawer: true },
  ] as const;

  const bottomTools = [
    { id: 'elements', icon: <Grid2X2 size={18} />, label: '元素管理', isTab: true },
    { id: 'settings-redirect', icon: <Settings size={18} />, label: '空间设置', isAction: true },
  ] as const;

  const userItems = [
    { id: 'finance_center', icon: <MonitorCheck size={18} />, label: '财务中心' },
    { id: 'finance_master_data', icon: <Database size={18} />, label: '财务主数据' },
    { id: 'closing_management', icon: <Lock size={18} />, label: '关账管理' },
  ] as const;

  const renderNavItems = (items: readonly any[], isActive: (id: string) => boolean, clickHandler: (id: string) => void) => (
    <div className="px-2 flex flex-col gap-0.5 overflow-hidden">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => clickHandler(item.id)}
          className={`flex items-center rounded-lg transition-colors group relative min-h-[36px] ${
            isActive(item.id) 
              ? 'bg-blue-50 text-blue-600 font-bold shadow-sm' 
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
          } ${isExpanded ? 'px-3 py-1.5 w-full' : 'p-2 justify-center'}`}
        >
          <span className={`${isActive(item.id) ? 'scale-105' : 'scale-100'} transition-transform shrink-0`}>
            {item.icon}
          </span>
          {width > 120 && (
            <span 
              className="ml-3 text-[12px] whitespace-nowrap overflow-hidden transition-all duration-300"
              style={{ opacity: width > 160 ? 1 : 0, width: width > 160 ? 'auto' : 0 }}
            >
              {item.label}
            </span>
          )}
          {!isExpanded && (
            <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
              {item.label}
            </div>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <aside 
      style={{ width: `${width}px` }}
      className={`relative h-full border-r border-slate-200 flex flex-col bg-white shrink-0 z-10 ${isResizing ? '' : 'transition-[width] duration-300 ease-in-out'}`}
    >
      <div 
        onMouseDown={onResizeStart}
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-400/30 active:bg-blue-500/50 transition-colors z-50"
      />

      <div className="flex-1 flex flex-col py-2 overflow-y-auto no-scrollbar gap-5">
        {interfaceMode === 'dev' ? (
          <>
            <div className="overflow-hidden">
              {width > 120 && <div className="px-5 mb-1 text-[9px] font-black text-slate-400 uppercase tracking-widest transition-opacity" style={{ opacity: width > 160 ? 1 : 0 }}>工作台</div>}
              {renderNavItems(devItems, (id) => activeModule === id, onModuleChange)}
            </div>

            <div className="mx-3 h-[1px] bg-slate-100" />

            <div className="overflow-hidden">
              {width > 120 && <div className="px-5 mb-1 text-[9px] font-black text-slate-400 uppercase tracking-widest transition-opacity" style={{ opacity: width > 160 ? 1 : 0 }}>快速工具</div>}
              {renderNavItems(quickTools, 
                (id) => activeDrawerModule === id, 
                (id) => onDrawerChange(id as ModuleId)
              )}
            </div>

            <div className="mt-auto overflow-hidden">
              {width > 120 && <div className="px-5 mb-1 text-[9px] font-black text-slate-400 uppercase tracking-widest transition-opacity" style={{ opacity: width > 160 ? 1 : 0 }}>系统辅助</div>}
              {renderNavItems(bottomTools, 
                (id) => activeModule === id, 
                (id) => onModuleChange(id)
              )}
            </div>
          </>
        ) : (
          <div className="overflow-hidden">
            {width > 120 && <div className="px-5 mb-1 text-[9px] font-black text-slate-400 uppercase tracking-widest transition-opacity" style={{ opacity: width > 160 ? 1 : 0 }}>业务菜单</div>}
            {renderNavItems(userItems, (id) => activeModule === id, onModuleChange)}
          </div>
        )}
      </div>

      <div className="p-2 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2 shrink-0 overflow-hidden">
        <div className={`flex flex-col bg-white border border-slate-200 rounded-xl p-0.5 gap-0.5 ${!isExpanded && 'items-center'}`}>
          <button 
            onClick={() => onModeToggle('dev')}
            className={`flex items-center gap-2 p-1.5 rounded-lg transition-all w-full ${
              interfaceMode === 'dev' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-50'
            } ${!isExpanded && 'justify-center'}`}
            title="设置管理"
          >
            <Hammer size={16} />
            {width > 120 && <span className="text-[11px] font-black whitespace-nowrap" style={{ opacity: width > 160 ? 1 : 0 }}>设置管理</span>}
          </button>
          <button 
            onClick={() => onModeToggle('user')}
            className={`flex items-center gap-2 p-1.5 rounded-lg transition-all w-full ${
              interfaceMode === 'user' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-50'
            } ${!isExpanded && 'justify-center'}`}
            title="用户菜单"
          >
            <UserCircle size={16} />
            {width > 120 && <span className="text-[11px] font-black whitespace-nowrap" style={{ opacity: width > 160 ? 1 : 0 }}>用户菜单</span>}
          </button>
        </div>

        <button onClick={onToggleExpand} className={`flex items-center gap-3 p-2 rounded-lg text-slate-400 hover:text-slate-600 transition-all ${!isExpanded && 'justify-center'}`}>
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          {width > 120 && <span className="text-[12px] font-bold whitespace-nowrap" style={{ opacity: width > 160 ? 1 : 0 }}>收起侧栏</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
