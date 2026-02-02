
import React, { useState, useRef, useEffect } from 'react';
import { 
  Folder, 
  FileText, 
  MoreVertical, 
  Edit3, 
  Search, 
  Upload, 
  Plus,
  Eye,
  History,
  Filter,
  Calendar,
  Tag,
  ChevronDown,
  User,
  X,
  Check,
  ShieldAlert,
  ShieldCheck,
  Clock,
  ExternalLink,
  Code2,
  PackageOpen,
  ChevronRight
} from 'lucide-react';
import { ResourceItem, ViewMode, Tab } from '../types';

interface MainContentProps {
  data: ResourceItem[];
  viewMode: ViewMode;
  activeTab?: Tab;
  onOpenTab: (item: ResourceItem) => void;
}

const FILTER_CATEGORIES = [
  { label: '页面展现', items: ['电子表格', 'UX'] },
  { label: '流程逻辑', items: ['工作流', 'python脚本'] },
  { label: '数据模型', items: ['财务模型', '维度', '领域模型'] },
  { label: '数据湖仓', items: ['关系数据库'] },
  { label: '数据集成', items: ['数据流', '连接器'] },
  { label: '基础服务', items: ['菜单', '变量', '权限方案', '值列表'] },
  { label: 'V2组件', items: ['页面', '图表', '清单表', '审批流', '业务模型'] },
  { label: '场景-财务工具', items: ['会计引擎'] },
];

const HISTORY_DATA = [
  { user: 'liuqing', action: '修改了资源', target: '0101 每日定时对账...', time: '10分钟前' },
  { user: 'Admin', action: '发布了新版本', target: '财务报表集成接口', time: '1小时前' },
  { user: 'liuqing', action: '删除了历史版本', target: '对账核销模型', time: '昨天 14:20' },
  { user: 'System', action: '自动备份完成', target: '全局数据仓库', time: '昨天 02:00' },
];

const MainContent: React.FC<MainContentProps> = ({ data, viewMode, activeTab, onOpenTab }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('all');
  
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
        setIsHistoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilterItem = (item: string) => {
    setActiveFilters(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  if (!activeTab) return (
    <div className="flex-1 flex flex-col items-center justify-center h-full bg-slate-50 p-12 text-center">
      <div className="w-24 h-24 bg-slate-200/50 text-slate-400 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
        <PackageOpen size={48} strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-black text-slate-400 mb-2 uppercase tracking-widest">暂无活跃标签页</h2>
    </div>
  );

  const isPlaceholderTab = activeTab.id !== 'elements-view' && !activeTab.id.startsWith('module-') && activeTab.id !== 'default-home';
  if (isPlaceholderTab) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-12 text-center">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/10"><Code2 size={40} /></div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">{activeTab.title}</h2>
        <p className="text-slate-400 max-w-sm">正在加载资源编辑器...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f9fafb] relative overflow-hidden">
      {/* Top Action Toolbar */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-white shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-[13px] font-medium transition-all ${
              isFilterOpen ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Filter size={14} /> 筛选
          </button>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input type="text" placeholder="搜索名称或描述..." className="w-72 border border-slate-200 rounded-lg py-1.5 pl-9 pr-3 text-[13px] focus:border-blue-500 outline-none bg-slate-50/50" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[13px] font-medium hover:bg-slate-50"><Upload size={14} /> 导入</button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[13px] font-bold hover:bg-blue-700 shadow-md active:scale-95 transition-transform"><Plus size={16} /> 新建元素</button>
          
          <div className="w-[1px] h-6 bg-slate-200 mx-2"></div>
          
          <div className="flex items-center gap-1">
            {/* Restored Permissions Icon */}
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="权限设置">
              <ShieldCheck size={18} />
            </button>

            {/* History Popup with "View More" */}
            <div className="relative" ref={historyRef}>
              <button onClick={() => setIsHistoryOpen(!isHistoryOpen)} className={`p-2 rounded-lg transition-colors ${isHistoryOpen ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`} title="操作历史">
                <History size={18} />
              </button>
              {isHistoryOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-150 origin-top-right">
                  <div className="p-3 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">操作历史</span>
                    <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
                      查看更多 <ChevronRight size={10} />
                    </button>
                  </div>
                  <div className="p-1 max-h-[320px] overflow-y-auto no-scrollbar">
                    {HISTORY_DATA.map((h, i) => (
                      <div key={i} className="p-3 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-colors cursor-default">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-slate-700 text-[12px]">{h.user}</span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 whitespace-nowrap"><Clock size={10} /> {h.time}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{h.action} <span className="text-blue-600 font-medium">{h.target}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Area with Anchored Sidebar Filter */}
      <div className="flex-1 flex overflow-hidden bg-[#f8fafc]">
        {/* Anchored Filter Panel */}
        <div 
          className={`h-full bg-white border-r border-slate-200 shrink-0 transition-all duration-300 ease-in-out flex flex-col overflow-hidden shadow-[inset_-1px_0_0_rgba(0,0,0,0.05)] ${
            isFilterOpen ? 'w-72' : 'w-0'
          }`}
        >
          <div className="w-72 flex flex-col h-full">
            <div className="h-12 flex items-center justify-between px-5 border-b border-slate-100 shrink-0">
              <span className="font-bold text-slate-800 text-[13px]">筛选过滤</span>
              <button onClick={() => setIsFilterOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-50 rounded"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar">
              <section className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">修改人</label>
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-[12px] outline-none hover:border-slate-300 transition-colors">
                  <option value="all">全部成员</option><option value="liuqing">liuqing</option>
                  <option value="admin">admin</option>
                </select>
              </section>
              <section className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">修改时间</label>
                <div className="grid grid-cols-2 gap-2">
                  {['全部', '最近24小时', '最近一周', '最近一月'].map((t) => (
                    <button key={t} onClick={() => setTimeRange(t)} className={`py-1.5 rounded text-[11px] border transition-all ${timeRange === t ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>{t}</button>
                  ))}
                </div>
              </section>
              <section className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">元素类型</label>
                <div className="space-y-4">
                  {FILTER_CATEGORIES.map((cat) => (
                    <div key={cat.label} className="space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-500 pl-0.5">{cat.label}</div>
                      <div className="flex flex-wrap gap-1">
                        {cat.items.map((item) => (
                          <button key={item} onClick={() => toggleFilterItem(item)} className={`px-2 py-1 rounded text-[10px] border transition-all ${activeFilters.includes(item) ? 'bg-blue-50 text-blue-600 border-blue-200 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}>{item}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-2 shrink-0">
              <button onClick={() => { setActiveFilters([]); setTimeRange('all'); }} className="flex-1 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-800 transition-colors">重置</button>
              <button onClick={() => setIsFilterOpen(false)} className="flex-[2] py-2 bg-blue-600 text-white rounded-lg text-[12px] font-bold shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all">确定</button>
            </div>
          </div>
        </div>

        {/* Scrollable Table Area */}
        <div className="flex-1 h-full overflow-auto p-6 no-scrollbar">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm min-w-[800px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
                  <th className="px-5 py-3.5 w-10 text-center"><input type="checkbox" className="rounded-sm accent-blue-600" /></th>
                  <th className="px-5 py-3.5">资源名称</th>
                  <th className="px-5 py-3.5 w-24">资源类型</th>
                  <th className="px-5 py-3.5 w-20">版本号</th>
                  <th className="px-5 py-3.5">负责人</th>
                  <th className="px-5 py-3.5">最后修改</th>
                  <th className="px-5 py-3.5 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.map((item) => (
                  <tr key={item.id} onClick={() => onOpenTab(item)} className="group hover:bg-blue-50/30 transition-all cursor-pointer">
                    <td className="px-5 py-4 text-center"><input type="checkbox" className="rounded-sm accent-blue-600" onClick={(e) => e.stopPropagation()} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-colors ${item.type === 'folder' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                          {item.type === 'folder' ? <Folder size={16} /> : <FileText size={16} />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[13px] text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</span>
                          <span className="text-[11px] text-slate-400 line-clamp-1">{item.description || '暂无描述信息'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-1.5 py-0.5 rounded leading-none">{item.type}</span></td>
                    <td className="px-5 py-4"><span className="text-[11px] font-mono font-bold text-blue-600">{item.version}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black border border-white shadow-sm">{item.createdBy[0].toUpperCase()}</div>
                        <span className="text-[12px] text-slate-600">{item.createdBy}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[11px] text-slate-400 font-mono">{item.updatedAt}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all" onClick={(e) => e.stopPropagation()}>
                        <button className="p-1.5 hover:bg-blue-600 hover:text-white rounded-md text-slate-400 transition-colors" title="查看"><Eye size={14} /></button>
                        <button className="p-1.5 hover:bg-blue-600 hover:text-white rounded-md text-slate-400 transition-colors" title="编辑"><Edit3 size={14} /></button>
                        <button className="p-1.5 hover:bg-slate-200 rounded-md text-slate-400 transition-colors"><MoreVertical size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer Pagination */}
      <div className="px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-[12px] text-slate-500 bg-white shrink-0 z-20">
        <div className="flex items-center gap-2">
          <span>共 <span className="font-bold text-slate-800">124</span> 个资源对象</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all font-bold">Prev</button>
          {[1, 2, 3].map(p => (
            <button key={p} className={`w-8 h-8 rounded-lg font-bold transition-all ${p === 1 ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>{p}</button>
          ))}
          <button className="px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all font-bold">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
