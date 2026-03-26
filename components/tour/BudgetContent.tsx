import React from 'react';

export const BudgetContent: React.FC = () => {
  return (
    <div className="flex grow shrink basis-[0%] py-5 px-7 overflow-clip gap-5">
      <div className="flex flex-col grow shrink basis-[0%] gap-3.5">
        <div className="flex items-center gap-3">
          <div className="rounded-[5px] bg-[#10B981] shrink-0 size-2.5" />
          <div className="text-[20px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-6">
            预算编制
          </div>
          <div className="text-[14px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-[18px]">
            Budget Planning
          </div>
          <div className="ml-auto rounded-sm py-1 px-2.5 bg-[#ECFDF5]">
            <div className="text-[12px] inline-block text-[#059669] font-sans leading-4">
              7 个组件
            </div>
          </div>
        </div>
        <div className="text-[13px] leading-5 inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif]">
          企业预算编制全流程：从维度与模型搭建、表单填报、审批流转到最终汇总展示，覆盖预算业务全链路。
        </div>
        <div className="flex flex-col rounded-[10px] gap-2.5 bg-white border border-solid border-[#E8EAED] p-4">
          <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
            业务流程
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-center grow shrink basis-[0%] gap-1.5">
              <div className="flex items-center justify-center rounded-xl bg-[#ECFDF5] shrink-0 size-12">
                <div className="text-[20px] inline-block text-[#10B981] font-['Inter',system-ui,sans-serif] font-bold leading-6">
                  1
                </div>
              </div>
              <div className="text-[11px] text-center inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                搭建维度模型
              </div>
              <div className="text-[9px] text-center inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                维度 + 财务模型
              </div>
            </div>
            <svg width="24" height="12" viewBox="0 0 24 12">
              <path d="M0 6h18M14 2l6 4-6 4" stroke="#10B981" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="flex flex-col items-center grow shrink basis-[0%] gap-1.5">
              <div className="flex items-center justify-center rounded-xl bg-[#ECFDF5] shrink-0 size-12">
                <div className="text-[20px] inline-block text-[#10B981] font-['Inter',system-ui,sans-serif] font-bold leading-6">
                  2
                </div>
              </div>
              <div className="text-[11px] text-center inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                设计填报表单
              </div>
              <div className="text-[9px] text-center inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                电子表格 + DeepUX
              </div>
            </div>
            <svg width="24" height="12" viewBox="0 0 24 12">
              <path d="M0 6h18M14 2l6 4-6 4" stroke="#10B981" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="flex flex-col items-center grow shrink basis-[0%] gap-1.5">
              <div className="flex items-center justify-center rounded-xl bg-[#ECFDF5] shrink-0 size-12">
                <div className="text-[20px] inline-block text-[#10B981] font-['Inter',system-ui,sans-serif] font-bold leading-6">
                  3
                </div>
              </div>
              <div className="text-[11px] text-center inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                配置计算逻辑
              </div>
              <div className="text-[9px] text-center inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                Python 脚本
              </div>
            </div>
            <svg width="24" height="12" viewBox="0 0 24 12">
              <path d="M0 6h18M14 2l6 4-6 4" stroke="#10B981" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="flex flex-col items-center grow shrink basis-[0%] gap-1.5">
              <div className="flex items-center justify-center rounded-xl bg-[#ECFDF5] shrink-0 size-12">
                <div className="text-[20px] inline-block text-[#10B981] font-['Inter',system-ui,sans-serif] font-bold leading-6">
                  4
                </div>
              </div>
              <div className="text-[11px] text-center inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                审批与流转
              </div>
              <div className="text-[9px] text-center inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                工作流
              </div>
            </div>
            <svg width="24" height="12" viewBox="0 0 24 12">
              <path d="M0 6h18M14 2l6 4-6 4" stroke="#10B981" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="flex flex-col items-center grow shrink basis-[0%] gap-1.5">
              <div className="flex items-center justify-center rounded-xl bg-[#ECFDF5] shrink-0 size-12">
                <div className="text-[20px] inline-block text-[#10B981] font-['Inter',system-ui,sans-serif] font-bold leading-6">
                  5
                </div>
              </div>
              <div className="text-[11px] text-center inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                汇总展示
              </div>
              <div className="text-[9px] text-center inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                电子表格 + DeepUX
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col grow shrink basis-[0%] rounded-[10px] gap-2.5 bg-white border border-solid border-[#E8EAED] p-4">
          <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
            涉及架构层次
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 rounded-xs bg-primary shrink-0" />
              <div className="text-[10px] w-9 inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3 shrink-0">
                展示层
              </div>
              <div className="flex ml-1 gap-[5px]">
                <div className="rounded-sm py-[3px] px-2.5 bg-[#10B981]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
                    电子表格
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#10B981]">
                  <div className="text-[10px] inline-block text-white font-sans leading-3">
                    DeepUX
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 rounded-xs bg-[#F59E0B] shrink-0" />
              <div className="text-[10px] w-9 inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3 shrink-0">
                流程层
              </div>
              <div className="flex ml-1 flex-wrap gap-[5px]">
                <div className="rounded-sm py-[3px] px-2.5 bg-[#10B981]">
                  <div className="text-[10px] inline-block text-white font-sans leading-3">
                    Python
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#10B981]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
                    工作流
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#E8EAED]">
                  <div className="text-[10px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                    单据引擎
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#E8EAED]">
                  <div className="text-[10px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                    数据流
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 rounded-xs bg-[#3B82F6] shrink-0" />
              <div className="text-[10px] w-9 inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3 shrink-0">
                数据层
              </div>
              <div className="flex ml-1 flex-wrap gap-[5px]">
                <div className="rounded-sm py-[3px] px-2.5 bg-[#10B981]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
                    维度
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#10B981]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
                    财务模型
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#E8EAED]">
                  <div className="text-[10px] inline-block text-[#86909C] font-sans leading-3">
                    DeepModel
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#E8EAED]">
                  <div className="text-[10px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                    连接器
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#E8EAED]">
                  <div className="text-[10px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                    领域模型
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[360px] shrink-0">
        <div className="flex flex-col grow shrink basis-[0%] rounded-[10px] gap-2 bg-white border border-solid border-[#E8EAED] p-4">
          <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
            涉及组件详情
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center rounded-lg py-2.5 px-3 gap-2.5 bg-[#ECFDF5]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-[#10B981] size-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  维度 Dimension
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  定义预算编制的组织/科目/时间维度
                </div>
              </div>
              <div className="text-[16px] inline-block text-[#10B981] font-['Inter',system-ui,sans-serif] font-bold leading-5">
                12
              </div>
            </div>
            <div className="flex items-center rounded-lg py-2.5 px-3 gap-2.5 bg-[#ECFDF5]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-[#10B981] size-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  财务模型 Finance Cube
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  存储预算数据的多维度立方体
                </div>
              </div>
              <div className="text-[16px] inline-block text-[#10B981] font-['Inter',system-ui,sans-serif] font-bold leading-5">
                8
              </div>
            </div>
            <div className="flex items-center rounded-lg py-2.5 px-3 gap-2.5 bg-[#ECFDF5]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-[#10B981] size-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  电子表格 DeepTable
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  填报表单、汇总报表的主要载体
                </div>
              </div>
              <div className="text-[16px] inline-block text-[#10B981] font-['Inter',system-ui,sans-serif] font-bold leading-5">
                24
              </div>
            </div>
            <div className="flex items-center rounded-lg py-2.5 px-3 gap-2.5 bg-[#ECFDF5]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-[#10B981] size-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[12px] inline-block text-[#1D2129] font-sans leading-4">
                  Python 脚本
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  编写预算分配、汇总计算逻辑
                </div>
              </div>
              <div className="text-[16px] inline-block text-[#10B981] font-['Inter',system-ui,sans-serif] font-bold leading-5">
                45
              </div>
            </div>
            <div className="flex items-center rounded-lg py-2.5 px-3 gap-2.5 bg-[#ECFDF5]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-[#10B981] size-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <path d="M6 3v12" />
                  <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  工作流 DeepFlow
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  多级预算审批、提交发布流程
                </div>
              </div>
              <div className="text-[16px] inline-block text-[#10B981] font-['Inter',system-ui,sans-serif] font-bold leading-5">
                9
              </div>
            </div>
            <div className="flex items-center rounded-lg py-2.5 px-3 gap-2.5 bg-[#ECFDF5]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-[#10B981] size-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <rect x="7" y="7" width="10" height="4" rx="1" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[12px] inline-block text-[#1D2129] font-sans leading-4">
                  DeepUX
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  预算填报入口页面与仪表盘
                </div>
              </div>
              <div className="text-[16px] inline-block text-[#10B981] font-['Inter',system-ui,sans-serif] font-bold leading-5">
                15
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
