import React, { useState } from 'react';
import { OverviewContent } from './tour/OverviewContent';
import { BudgetContent } from './tour/BudgetContent';
import { ConsolidationContent } from './tour/ConsolidationContent';

type TabType = 'overview' | 'budget' | 'consolidation' | 'reporting';

const SystemTour: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="[font-synthesis:none] text-[12px] leading-4 flex overflow-clip flex-col bg-[#F7F8FA] antialiased h-full w-full overflow-y-auto">
      <div className="flex overflow-clip w-full min-h-full flex-col bg-[#F7F8FA] shrink-0">
        <div className="flex items-center justify-between h-14 shrink-0 px-8 bg-white border-b border-b-solid border-b-[#E8EAED]">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="text-[16px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-5">
                开发者导览
              </div>
              <div className="text-[11px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3.5">
                导航即架构 · 一图掌握平台全貌
              </div>
            </div>
          </div>
          <div className="flex rounded-lg py-[3px] px-[3px] gap-1 bg-[#F0F2F5]">
            <div 
              className={`rounded-md py-1.5 px-4 cursor-pointer transition-colors ${activeTab === 'overview' ? 'bg-primary' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <div className={`inline-block text-[13px] leading-4 ${activeTab === 'overview' ? "text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium" : "text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif]"}`}>
                架构总览
              </div>
            </div>
            <div 
              className={`rounded-md py-1.5 px-4 cursor-pointer transition-colors ${activeTab === 'budget' ? 'bg-[#10B981]' : ''}`}
              onClick={() => setActiveTab('budget')}
            >
              <div className={`inline-block text-[13px] leading-4 ${activeTab === 'budget' ? "text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium" : "text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif]"}`}>
                预算编制
              </div>
            </div>
            <div 
              className={`rounded-md py-1.5 px-4 cursor-pointer transition-colors ${activeTab === 'consolidation' ? 'bg-[#F59E0B]' : ''}`}
              onClick={() => setActiveTab('consolidation')}
            >
              <div className={`inline-block text-[13px] leading-4 ${activeTab === 'consolidation' ? "text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium" : "text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif]"}`}>
                合并报表
              </div>
            </div>
            <div 
              className={`rounded-md py-1.5 px-4 cursor-pointer transition-colors ${activeTab === 'reporting' ? 'bg-[#3B82F6]' : ''}`}
              onClick={() => setActiveTab('reporting')}
            >
              <div className={`inline-block text-[13px] leading-4 ${activeTab === 'reporting' ? "text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium" : "text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif]"}`}>
                管理报告
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md py-1.5 px-3.5 border border-solid border-[#E8EAED] cursor-pointer hover:bg-gray-50">
              <div className="inline-block text-[12px] text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-4">
                查看文档
              </div>
            </div>
            {activeTab === 'overview' && (
              <div className="rounded-md py-1.5 px-3.5 bg-primary cursor-pointer hover:bg-primary-hover">
                <div className="inline-block text-[12px] text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-4">
                  开始构建
                </div>
              </div>
            )}
            {activeTab === 'budget' && (
              <div className="rounded-md py-1.5 px-3.5 bg-[#10B981] cursor-pointer hover:bg-[#059669]">
                <div className="inline-block text-[12px] text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-4">
                  新建预算项目
                </div>
              </div>
            )}
            {activeTab === 'consolidation' && (
              <div className="rounded-md py-1.5 px-3.5 bg-[#F59E0B] cursor-pointer hover:bg-[#D97706]">
                <div className="inline-block text-[12px] text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-4">
                  新建合并项目
                </div>
              </div>
            )}
            {activeTab === 'reporting' && (
              <div className="rounded-md py-1.5 px-3.5 bg-[#3B82F6] cursor-pointer hover:bg-[#2563EB]">
                <div className="inline-block text-[12px] text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-4">
                  新建报告项目
                </div>
              </div>
            )}
          </div>
        </div>
        
        {activeTab === 'overview' && <OverviewContent />}
        {activeTab === 'budget' && <BudgetContent />}
        {activeTab === 'consolidation' && <ConsolidationContent />}
        {activeTab === 'reporting' && (
          <div className="flex grow shrink basis-[0%] py-5 px-7 overflow-clip gap-5 items-center justify-center">
            <div className="text-[#86909C] text-[14px] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif]">管理报告内容建设中...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemTour;
