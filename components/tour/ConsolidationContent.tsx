import React from 'react';

export const ConsolidationContent: React.FC = () => {
  return (
    <div className="flex grow shrink basis-[0%] py-5 px-7 overflow-clip gap-5">
      <div className="flex flex-col grow shrink basis-[0%] gap-3.5">
        <div className="flex items-center gap-3">
          <div className="rounded-[5px] bg-[#F59E0B] shrink-0 size-2.5" />
          <div className="text-[20px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-6">
            合并报表
          </div>
          <div className="text-[14px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-[18px]">
            Consolidation
          </div>
          <div className="ml-auto rounded-sm py-1 px-2.5 bg-[#FFFBEB]">
            <div className="text-[12px] inline-block text-[#D97706] font-sans leading-4">
              12 个组件（全部）
            </div>
          </div>
        </div>
        <div className="text-[13px] leading-5 inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif]">
          集团合并报表全流程：从组织架构维护、数据采集、内部抵销、币种折算到最终报表披露，是平台最复杂的场景，使用全部 12 个组件。
        </div>
        <div className="flex flex-col rounded-[10px] gap-2.5 bg-white border border-solid border-[#E8EAED] p-4">
          <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
            业务流程
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-center grow shrink basis-[0%] gap-1.5">
              <div className="flex items-center justify-center rounded-xl bg-[#FFFBEB] shrink-0 size-12">
                <div className="text-[20px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-6">
                  1
                </div>
              </div>
              <div className="text-[11px] text-center inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                架构与建模
              </div>
              <div className="text-[9px] text-center inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                维度 + 领域模型 + 财务模型
              </div>
            </div>
            <svg width="24" height="12" viewBox="0 0 24 12">
              <path d="M0 6h18M14 2l6 4-6 4" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="flex flex-col items-center grow shrink basis-[0%] gap-1.5">
              <div className="flex items-center justify-center rounded-xl bg-[#FFFBEB] shrink-0 size-12">
                <div className="text-[20px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-6">
                  2
                </div>
              </div>
              <div className="text-[11px] text-center inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                数据采集
              </div>
              <div className="text-[9px] text-center inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                连接器 + 数据流 + Python
              </div>
            </div>
            <svg width="24" height="12" viewBox="0 0 24 12">
              <path d="M0 6h18M14 2l6 4-6 4" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="flex flex-col items-center grow shrink basis-[0%] gap-1.5">
              <div className="flex items-center justify-center rounded-xl bg-[#FFFBEB] shrink-0 size-12">
                <div className="text-[20px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-6">
                  3
                </div>
              </div>
              <div className="text-[11px] text-center inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                抵销与折算
              </div>
              <div className="text-[9px] text-center inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                Python + 单据引擎 + DeepModel
              </div>
            </div>
            <svg width="24" height="12" viewBox="0 0 24 12">
              <path d="M0 6h18M14 2l6 4-6 4" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="flex flex-col items-center grow shrink basis-[0%] gap-1.5">
              <div className="flex items-center justify-center rounded-xl bg-[#FFFBEB] shrink-0 size-12">
                <div className="text-[20px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-6">
                  4
                </div>
              </div>
              <div className="text-[11px] text-center inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                流程控制
              </div>
              <div className="text-[9px] text-center inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                工作流 + DeepUX
              </div>
            </div>
            <svg width="24" height="12" viewBox="0 0 24 12">
              <path d="M0 6h18M14 2l6 4-6 4" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="flex flex-col items-center grow shrink basis-[0%] gap-1.5">
              <div className="flex items-center justify-center rounded-xl bg-[#FFFBEB] shrink-0 size-12">
                <div className="text-[20px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-6">
                  5
                </div>
              </div>
              <div className="text-[11px] text-center inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                报表披露
              </div>
              <div className="text-[9px] text-center inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                电子表格 + DeepUX
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col grow shrink basis-[0%] rounded-[10px] gap-2.5 bg-white border border-solid border-[#E8EAED] p-4">
          <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
            涉及架构层次（全部组件）
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 rounded-xs bg-[#9369E6] shrink-0" />
              <div className="text-[10px] w-9 inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3 shrink-0">
                展示层
              </div>
              <div className="flex ml-1 gap-[5px]">
                <div className="rounded-sm py-[3px] px-2.5 bg-[#F59E0B]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
                    电子表格
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#F59E0B]">
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
                <div className="rounded-sm py-[3px] px-2.5 bg-[#F59E0B]">
                  <div className="text-[10px] inline-block text-white font-sans leading-3">
                    Python
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#F59E0B]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
                    工作流
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#F59E0B]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
                    单据引擎
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#F59E0B]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
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
                <div className="rounded-sm py-[3px] px-2.5 bg-[#F59E0B]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
                    维度
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#F59E0B]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
                    财务模型
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#F59E0B]">
                  <div className="text-[10px] inline-block text-white font-sans leading-3">
                    DeepModel
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#F59E0B]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
                    连接器
                  </div>
                </div>
                <div className="rounded-sm py-[3px] px-2.5 bg-[#F59E0B]">
                  <div className="text-[10px] inline-block text-white font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
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
            核心组件详情
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center rounded-lg py-[9px] px-3 gap-2.5 bg-[#FFFBEB]">
              <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0 rounded-lg bg-[#F59E0B]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[11px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                  维度 + 领域模型
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  合并架构、持股比例、合并方法维护
                </div>
              </div>
              <div className="text-[14px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-[18px]">
                12+12
              </div>
            </div>
            <div className="flex items-center rounded-lg py-[9px] px-3 gap-2.5 bg-[#FFFBEB]">
              <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0 rounded-lg bg-[#F59E0B]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[11px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                  连接器 + 数据流
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  ERP/业务台账的 ETL 自动采集
                </div>
              </div>
              <div className="text-[14px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-[18px]">
                6+18
              </div>
            </div>
            <div className="flex items-center rounded-lg py-[9px] px-3 gap-2.5 bg-[#FFFBEB]">
              <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0 rounded-lg bg-[#F59E0B]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[11px] inline-block text-[#1D2129] font-sans leading-3.5">
                  Python 脚本
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  抵销算法、币种折算、权益法调整
                </div>
              </div>
              <div className="text-[14px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-[18px]">
                45
              </div>
            </div>
            <div className="flex items-center rounded-lg py-[9px] px-3 gap-2.5 bg-[#FFFBEB]">
              <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0 rounded-lg bg-[#F59E0B]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="14" y1="10" x2="21" y2="3" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[11px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                  单据引擎 + DeepModel
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  凭证模型、调表不调账、内部对账
                </div>
              </div>
              <div className="text-[14px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-[18px]">
                3+6
              </div>
            </div>
            <div className="flex items-center rounded-lg py-[9px] px-3 gap-2.5 bg-[#FFFBEB]">
              <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0 rounded-lg bg-[#F59E0B]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[11px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                  财务模型 Finance Cube
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  合并主模型、多币种多版本数据存储
                </div>
              </div>
              <div className="text-[14px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-[18px]">
                8
              </div>
            </div>
            <div className="flex items-center rounded-lg py-[9px] px-3 gap-2.5 bg-[#FFFBEB]">
              <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0 rounded-lg bg-[#F59E0B]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </div>
              <div className="flex flex-col grow shrink basis-[0%]">
                <div className="text-[11px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
                  电子表格 + DeepUX + 工作流
                </div>
                <div className="text-[9px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                  底稿、三大报表、审批流程、状态管理
                </div>
              </div>
              <div className="text-[14px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-[18px]">
                48
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
