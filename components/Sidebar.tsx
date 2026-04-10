import React, { useState, useRef, useEffect } from "react";
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
  Settings,
  Search,
  ArrowRightLeft,
  X,
  ClipboardList,
  Map
} from "lucide-react";
import { ModuleId } from "../types";

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
  interfaceMode: "dev" | "user";
  onModeToggle: (mode: "dev" | "user") => void;
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
  onModeToggle,
}) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    setShowMenuDropdown(false);
  }, [isExpanded, width]);

  const handleSwitchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (showMenuDropdown) {
      setShowMenuDropdown(false);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    if (isExpanded) {
      setDropdownStyle({
        position: "fixed",
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
        zIndex: 9999,
      });
    } else {
      setDropdownStyle({
        position: "fixed",
        top: `${rect.top - 8}px`,
        left: `${rect.right + 12}px`,
        zIndex: 9999,
      });
    }
    setShowMenuDropdown(true);
  };

  const devItems = [
    { id: "recent_fav", icon: <History size={18} />, label: "最近打开" },
    { id: "resources", icon: <Blocks size={18} />, label: "全量资源" },
  ] as const;

  const quickTools = [
    {
      id: "console",
      icon: <Terminal size={18} />,
      label: "控制台",
      isDrawer: true,
    },
    {
      id: "context",
      icon: <Info size={18} />,
      label: "元素信息",
      isDrawer: true,
    },
  ] as const;

  const bottomTools = [
    {
      id: "restart-tour",
      icon: <Info size={18} />,
      label: "设置指引",
      isAction: true,
    },
    {
      id: "system-tour",
      icon: <Map size={18} />,
      label: "系统导览",
      isTab: true,
    },
    {
      id: "elements",
      icon: <Grid2X2 size={18} />,
      label: "元素管理",
      isTab: true,
    },
    {
      id: "settings-redirect",
      icon: <Settings size={18} />,
      label: "空间设置",
      isAction: true,
    },
  ] as const;

  const userItems = [
    {
      id: "salary_budget",
      icon: <MonitorCheck size={18} />,
      label: "薪酬预算",
    },
    {
      id: "finance_master_data",
      icon: <Database size={18} />,
      label: "财务数据",
    },
    { id: "closing_management", icon: <Lock size={18} />, label: "关账管理" },
  ] as const;

  const renderNavItems = (
    items: readonly any[],
    isActive: (id: string) => boolean,
    clickHandler: (id: string) => void,
  ) => (
    <div className="px-2 flex flex-col gap-0.5">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => clickHandler(item.id)}
          className={`flex rounded-lg transition-colors group relative min-h-[36px] ${
            isActive(item.id)
              ? "bg-primary/10 text-primary font-bold shadow-sm"
              : "text-slate-500 hover:bg-black/5 hover:text-slate-700"
          } ${isExpanded ? "flex-row items-center px-3 py-1.5 w-full" : "flex-col items-center justify-center py-2 w-full gap-1"}`}
          title={!isExpanded ? item.label : undefined}
        >
          <span
            className={`${isActive(item.id) ? "scale-105" : "scale-100"} transition-transform shrink-0`}
          >
            {item.icon}
          </span>
          {isExpanded ? (
            <span
              className="ml-3 text-[12px] whitespace-nowrap overflow-hidden transition-all duration-300"
              style={{
                opacity: width > 160 ? 1 : 0,
                width: width > 160 ? "auto" : 0,
              }}
            >
              {item.label}
            </span>
          ) : (
            <span className="text-[10px] leading-none whitespace-nowrap scale-90">
              {item.label}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <aside
      data-tour="sidebar"
      style={{ width: `${width}px` }}
      className={`relative h-full border-r border-slate-200 flex flex-col bg-white shrink-0 z-10 ${isResizing ? "" : "transition-[width] duration-300 ease-in-out"}`}
    >
      <div
        onMouseDown={onResizeStart}
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/30 active:bg-primary/50 transition-colors z-50"
      />

      <div className="flex-1 flex flex-col py-2 overflow-y-auto no-scrollbar gap-5">
        {interfaceMode === "dev" ? (
          <>
            <div className="overflow-hidden" data-tour="dev-items">
              {width > 120 && (
                <div
                  className="px-5 mb-1 text-[9px] font-black text-slate-400 uppercase tracking-widest transition-opacity"
                  style={{ opacity: width > 160 ? 1 : 0 }}
                >
                  工作台
                </div>
              )}
              {renderNavItems(
                devItems,
                (id) => activeModule === id,
                onModuleChange,
              )}
            </div>

            <div className="mx-3 h-[1px] bg-slate-100" />

            <div className="overflow-hidden" data-tour="quick-tools">
              {width > 120 && (
                <div
                  className="px-5 mb-1 text-[9px] font-black text-slate-400 uppercase tracking-widest transition-opacity"
                  style={{ opacity: width > 160 ? 1 : 0 }}
                >
                  快速工具
                </div>
              )}
              {renderNavItems(
                quickTools,
                (id) => activeDrawerModule === id,
                (id) => onDrawerChange(id as ModuleId),
              )}
            </div>

            <div className="mt-auto overflow-hidden" data-tour="bottom-tools">
              {width > 120 && (
                <div
                  className="px-5 mb-1 text-[9px] font-black text-slate-400 uppercase tracking-widest transition-opacity"
                  style={{ opacity: width > 160 ? 1 : 0 }}
                >
                  系统辅助
                </div>
              )}
              {renderNavItems(
                bottomTools,
                (id) => activeModule === id,
                (id) => onModuleChange(id),
              )}
            </div>
          </>
        ) : (
          <>
            <div className="overflow-hidden">
              {width > 120 && (
                <div
                  className="px-5 mb-1 text-[9px] font-black text-slate-400 uppercase tracking-widest transition-opacity"
                  style={{ opacity: width > 160 ? 1 : 0 }}
                >
                  业务菜单
                </div>
              )}
              {renderNavItems(
                userItems,
                (id) => activeModule === id,
                onModuleChange,
              )}
            </div>

            <div className="mt-auto px-2 flex flex-col gap-0.5">
              <button
                onClick={() => setShowSearchModal(true)}
                className={`flex rounded-lg transition-colors group relative min-h-[36px] text-slate-500 hover:bg-slate-100 hover:text-slate-700 ${isExpanded ? "flex-row items-center px-3 py-1.5 w-full" : "flex-col items-center justify-center py-2 w-full gap-1"}`}
                title="搜索"
              >
                <span className="scale-100 transition-transform shrink-0">
                  <Search size={18} />
                </span>
                {isExpanded ? (
                  <span
                    className="ml-3 text-[12px] whitespace-nowrap overflow-hidden transition-all duration-300"
                    style={{ opacity: width > 160 ? 1 : 0, width: width > 160 ? "auto" : 0 }}
                  >
                    搜索
                  </span>
                ) : (
                  <span className="text-[10px] leading-none whitespace-nowrap scale-90">
                    搜索
                  </span>
                )}
              </button>

              <div className="mt-auto px-2 flex flex-col gap-0.5">
                <button
                  onClick={handleSwitchClick}
                  className={`flex rounded-lg transition-colors group relative min-h-[36px] text-slate-500 hover:bg-slate-100 hover:text-slate-700 ${isExpanded ? "flex-row items-center px-3 py-1.5 w-full" : "flex-col items-center justify-center py-2 w-full gap-1"}`}
                  title="切换"
                >
                  <span className="scale-100 transition-transform shrink-0">
                    <ArrowRightLeft size={18} />
                  </span>
                  {isExpanded ? (
                    <span
                      className="ml-3 text-[12px] whitespace-nowrap overflow-hidden transition-all duration-300"
                      style={{ opacity: width > 160 ? 1 : 0, width: width > 160 ? "auto" : 0 }}
                    >
                      切换
                    </span>
                  ) : (
                    <span className="text-[10px] leading-none whitespace-nowrap scale-90">
                      切换
                    </span>
                  )}
                </button>

                {showMenuDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-[9998]"
                      onClick={(e) => { e.stopPropagation(); setShowMenuDropdown(false); }}
                    ></div>
                    <div
                      className="bg-white rounded-lg border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.12)] p-1.5 w-52 animate-in fade-in zoom-in duration-100"
                      style={dropdownStyle}
                    >
                      {isExpanded ? (
                        <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white transform rotate-45 border-t border-l border-slate-100 shadow-[-2px_-2px_4px_rgba(0,0,0,0.02)]"></div>
                      ) : (
                        <div className="absolute top-4 -left-1.5 w-3 h-3 bg-white transform rotate-45 border-b border-l border-slate-100 shadow-[-2px_2px_4px_rgba(0,0,0,0.02)]"></div>
                      )}
                      
                      <div className="relative z-10 bg-white rounded-md overflow-hidden flex flex-col gap-0.5">
                        {[
                          "标准_人力预算菜单",
                          "标准_管理员菜单",
                          "标准_预算编制",
                          "新纪元演示"
                        ].map((menu, index) => (
                          <button
                            key={menu}
                            onClick={(e) => { e.stopPropagation(); setShowMenuDropdown(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-[13px] text-slate-700 hover:bg-slate-100 transition-colors rounded-md ${index === 0 ? 'bg-slate-100/80' : ''}`}
                          >
                            <ClipboardList size={15} className="text-slate-500" />
                            {menu}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-2 border-t border-slate-100 bg-white flex flex-col gap-2 shrink-0 overflow-hidden" data-tour="mode-switch">
        <div
          className={`flex flex-col bg-white border border-slate-200 rounded-xl p-0.5 gap-0.5 ${!isExpanded && "items-center"}`}
        >
          <button
            onClick={() => onModeToggle("dev")}
            className={`flex items-center gap-2 p-1.5 rounded-lg transition-all w-full ${
              interfaceMode === "dev"
                ? "bg-primary text-white shadow-sm"
                : "text-slate-500 hover:bg-black/5"
            } ${!isExpanded && "justify-center"}`}
            title="设置管理"
          >
            <Hammer size={16} />
            {width > 120 && (
              <span
                className="text-[11px] font-black whitespace-nowrap"
                style={{ opacity: width > 160 ? 1 : 0 }}
              >
                设置管理
              </span>
            )}
          </button>
          <button
            onClick={() => onModeToggle("user")}
            className={`flex items-center gap-2 p-1.5 rounded-lg transition-all w-full ${
              interfaceMode === "user"
                ? "bg-primary text-white shadow-sm"
                : "text-slate-500 hover:bg-black/5"
            } ${!isExpanded && "justify-center"}`}
            title="用户菜单"
          >
            <UserCircle size={16} />
            {width > 120 && (
              <span
                className="text-[11px] font-black whitespace-nowrap"
                style={{ opacity: width > 160 ? 1 : 0 }}
              >
                用户菜单
              </span>
            )}
          </button>
        </div>

        <button
          onClick={onToggleExpand}
          className={`flex items-center gap-3 p-2 rounded-lg text-slate-400 hover:text-slate-600 transition-all ${!isExpanded && "justify-center"}`}
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          {width > 120 && (
            <span
              className="text-[12px] font-bold whitespace-nowrap"
              style={{ opacity: width > 160 ? 1 : 0 }}
            >
              收起侧栏
            </span>
          )}
        </button>
      </div>

      {showSearchModal && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowSearchModal(false)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-lg w-[500px] max-w-[90vw] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center px-4 py-3 border-b border-slate-100">
              <Search size={18} className="text-slate-400 mr-3" />
              <input
                type="text"
                placeholder="搜索业务菜单、功能或数据..."
                className="flex-1 bg-transparent outline-none text-[14px] text-slate-700 placeholder:text-slate-400"
                autoFocus
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-1 text-slate-400 hover:bg-black/5 rounded-md transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-2 bg-slate-50">
              <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                最近搜索
              </div>
              <div className="px-2 pb-2">
                <div className="px-3 py-2 text-[12px] text-slate-600 hover:bg-primary/10 hover:text-primary rounded-lg cursor-pointer transition-colors flex items-center gap-2">
                  <History size={14} className="opacity-50" /> 财务报表
                </div>
                <div className="px-3 py-2 text-[12px] text-slate-600 hover:bg-primary/10 hover:text-primary rounded-lg cursor-pointer transition-colors flex items-center gap-2">
                  <History size={14} className="opacity-50" /> 月度关账
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
