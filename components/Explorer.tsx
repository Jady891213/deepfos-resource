
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Search,
  Layout,
  Workflow,
  Database,
  HardDrive,
  Network,
  Settings2,
  Box,
  TrendingUp,
  FileSpreadsheet,
  Cpu,
  ShieldCheck,
  ListOrdered,
  Layers,
  PieChart,
  GitBranch,
  Calculator,
  UserCheck,
  ClipboardCheck,
  History
} from 'lucide-react';
import { ModuleId, ResourceItem } from '../types';

interface ExplorerProps {
  activeModule: ModuleId;
  onSelectResource: (item: ResourceItem) => void;
  isUserMode?: boolean;
}

const Explorer: React.FC<ExplorerProps> = ({ activeModule, onSelectResource, isUserMode }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 'pages': true, 'finance': true, 'tasks': true });
  const toggle = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  // Content for Dev Mode based on User image
  // Fix: Added terminal property to satisfy the Record<ModuleId, any[]> type constraint
  const devContent: Record<ModuleId, any[]> = {
    pages: [
      { id: 'pages_cat', name: '页面展现', icon: <Layout size={14} className="text-blue-500" />, items: [
        { name: '电子表格', icon: <FileSpreadsheet size={12} className="text-emerald-500" /> },
        { name: 'UX 设计器', icon: <Box size={12} className="text-indigo-500" /> }
      ]},
    ],
    logic: [
      { id: 'logic_cat', name: '流程逻辑', icon: <Workflow size={14} className="text-blue-500" />, items: [
        { name: '工作流', icon: <GitBranch size={12} className="text-sky-500" /> },
        { name: 'python脚本', icon: <Cpu size={12} className="text-purple-500" /> }
      ]}
    ],
    data: [
      { id: 'data_cat', name: '数据模型', icon: <Database size={14} className="text-blue-500" />, items: [
        { name: '财务模型', icon: <Calculator size={12} className="text-indigo-500" /> },
        { name: '维度定义', icon: <Layers size={12} className="text-cyan-500" /> },
        { name: '领域模型', icon: <Box size={12} className="text-purple-500" /> }
      ]}
    ],
    lakehouse: [
      { id: 'lakehouse_cat', name: '数据湖仓', icon: <HardDrive size={14} className="text-blue-500" />, items: [
        { name: '关系数据库', icon: <Database size={12} className="text-amber-500" /> }
      ]}
    ],
    integration: [
      { id: 'integration_cat', name: '数据集成', icon: <Network size={14} className="text-blue-500" />, items: [
        { name: '数据流', icon: <GitBranch size={12} className="text-blue-500" /> },
        { name: '连接器', icon: <Network size={12} className="text-purple-500" /> }
      ]}
    ],
    services: [
      { id: 'services_cat', name: '基础服务', icon: <Settings2 size={14} className="text-blue-500" />, items: [
        { name: '菜单配置', icon: <ListOrdered size={12} className="text-blue-500" /> },
        { name: '全局变量', icon: <Box size={12} className="text-purple-500" /> },
        { name: '权限方案', icon: <ShieldCheck size={12} className="text-sky-500" /> },
        { name: '值列表', icon: <ListOrdered size={12} className="text-cyan-500" /> }
      ]}
    ],
    v2: [
      { id: 'v2_cat', name: 'V2组件', icon: <Box size={14} className="text-blue-500" />, items: [
        { name: '页面', icon: <Layout size={12} className="text-indigo-500" /> },
        { name: '图表', icon: <PieChart size={12} className="text-purple-500" /> },
        { name: '清单表', icon: <ListOrdered size={12} className="text-emerald-500" /> },
        { name: '审批流', icon: <Workflow size={12} className="text-orange-500" /> },
        { name: '业务模型', icon: <Layers size={12} className="text-amber-500" /> }
      ]}
    ],
    finance: [
      { id: 'finance_cat', name: '场景-财务工具', icon: <TrendingUp size={14} className="text-blue-500" />, items: [
        { name: '会计引擎', icon: <Calculator size={12} className="text-emerald-500" /> }
      ]}
    ],
    recents: [
      { id: 'recents_cat', name: '最近打开', icon: <History size={14} className="text-slate-400" />, items: [
        { name: '财务对账模型 v2', icon: <Calculator size={12} className="text-slate-400" /> },
        { name: '核销流水处理页', icon: <Layout size={12} className="text-slate-400" /> }
      ]}
    ],
    elements: [
      { id: 'elements_cat', name: '元素管理', icon: <Box size={14} className="text-slate-400" />, items: [
        { name: '公共组件库', icon: <Box size={12} className="text-slate-400" /> },
        { name: '私有组件', icon: <Box size={12} className="text-slate-400" /> }
      ]}
    ],
    terminal: [
      { id: 'terminal_cat', name: '系统控制台', icon: <Cpu size={14} className="text-slate-500" />, items: [
        { name: '控制台日志', icon: <ListOrdered size={12} className="text-slate-400" /> }
      ]}
    ]
  };

  // Content for User Mode (Financial Reconciliation Scenario)
  const userContent = [
    { id: 'tasks', name: '对账任务管理', icon: <ClipboardCheck size={14} className="text-blue-600" />, items: [
      { name: '待处理任务', icon: <ClipboardCheck size={12} className="text-amber-500" /> },
      { name: '对账进度跟踪', icon: <TrendingUp size={12} className="text-blue-500" /> },
      { name: '异常对账处理', icon: <GitBranch size={12} className="text-red-500" /> }
    ]},
    { id: 'clearing', name: '核销流水中心', icon: <Calculator size={14} className="text-emerald-600" />, items: [
      { name: '核销流水总表', icon: <ListOrdered size={12} className="text-emerald-600" /> },
      { name: '自动核销设置', icon: <Settings2 size={12} className="text-slate-500" /> }
    ]},
    { id: 'reports', name: '差异分析报表', icon: <PieChart size={14} className="text-purple-600" />, items: [
      { name: '月度核销摘要', icon: <PieChart size={12} className="text-purple-500" /> },
      { name: '对账明细看板', icon: <Layout size={12} className="text-indigo-500" /> }
    ]},
    { id: 'config', name: '对账规则库', icon: <ShieldCheck size={14} className="text-sky-600" />, items: [
      { name: '匹配算法配置', icon: <Cpu size={12} className="text-sky-500" /> },
      { name: '审批链管理', icon: <UserCheck size={12} className="text-indigo-500" /> }
    ]}
  ];

  const categories = isUserMode ? userContent : (devContent[activeModule] || []);

  return (
    <div className="space-y-4">
      <div className="relative px-2">
        <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
        <input type="text" placeholder="搜索资源..." className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-8 pr-3 text-[12px] outline-none focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-1">
        {categories.map((cat: any) => (
          <div key={cat.id} className="space-y-0.5">
            <button onClick={() => toggle(cat.id)} className="w-full flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-md text-slate-600 font-black group transition-all">
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                {expanded[cat.id] ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
              </div>
              <div className="shrink-0">{cat.icon}</div>
              <span className="text-[12px] truncate">{cat.name}</span>
            </button>
            {expanded[cat.id] && (
              <div className="pl-6 space-y-0.5 animate-in slide-in-from-top-1 duration-150">
                {cat.items.map((item: any, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => onSelectResource({ id: `${cat.id}-${idx}`, name: item.name, type: 'page', version: '1.0', createdBy: 'Admin', updatedAt: '2025-05-01' })}
                    className="w-full text-left text-[12px] py-1.5 px-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded transition-colors truncate flex items-center gap-2"
                  >
                    <div className="shrink-0 opacity-60 group-hover:opacity-100">{item.icon}</div>
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorer;
