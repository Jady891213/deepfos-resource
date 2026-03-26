import React from 'react';

export const OverviewContent: React.FC = () => {
  return (
    <div className="flex grow shrink basis-[0%] py-4 px-7 overflow-clip gap-5">
      <div className="flex flex-col grow shrink basis-[0%] gap-2.5">
        <div className="flex shrink-0 gap-2.5">
          <div className="flex items-center rounded-lg py-[7px] px-3 gap-1.5 bg-white border border-solid border-[#E8EAED]">
            <div className="text-[20px] inline-block text-primary font-['Inter',system-ui,sans-serif] font-bold leading-6">
              12
            </div>
            <div className="text-[12px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-4">
              个组件
            </div>
          </div>
          <div className="flex items-center rounded-lg py-[7px] px-3 gap-1.5 bg-white border border-solid border-[#E8EAED]">
            <div className="text-[20px] inline-block text-[#1D2129] font-['Inter',system-ui,sans-serif] font-bold leading-6">
              158
            </div>
            <div className="text-[12px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-4">
              个元素
            </div>
          </div>
          <div className="flex items-center rounded-lg py-[7px] px-3 gap-1.5 bg-white border border-solid border-[#E8EAED]">
            <div className="text-[20px] inline-block text-[#1D2129] font-['Inter',system-ui,sans-serif] font-bold leading-6">
              3
            </div>
            <div className="text-[12px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-4">
              层架构
            </div>
          </div>
          <div className="flex items-center rounded-lg py-[7px] px-3 gap-1.5 bg-white border border-solid border-[#E8EAED]">
            <div className="text-[20px] inline-block text-[#1D2129] font-['Inter',system-ui,sans-serif] font-bold leading-6">
              3
            </div>
            <div className="text-[12px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-4">
              业务场景
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-[10px] py-3 px-3.5 gap-1.5 bg-white border border-solid border-[#E8EAED]">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 rounded-xs bg-primary shrink-0" />
            <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
              展示与交互层
            </div>
            <div className="text-[10px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3">
              Presentation
            </div>
            <div className="text-[10px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
              — 怎么看、怎么用
            </div>
          </div>
          <div className="flex gap-2.5">
            <div className="flex items-center grow shrink basis-[0%] rounded-lg py-2.5 px-3.5 gap-2.5 bg-[#FAF9FE] border border-solid border-[#ECE8F8]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-primary size-9">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[13px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  电子表格
                </div>
                <div className="text-[10px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3">
                  DeepTable
                </div>
              </div>
              <div className="ml-auto text-[18px] inline-block text-primary font-['Inter',system-ui,sans-serif] font-bold leading-[22px]">
                24
              </div>
              <div className="flex ml-1 gap-[3px]">
                <div className="rounded-[3px] bg-[#10B981] shrink-0 size-1.5" />
                <div className="rounded-[3px] bg-[#F59E0B] shrink-0 size-1.5" />
                <div className="rounded-[3px] bg-[#3B82F6] shrink-0 size-1.5" />
              </div>
            </div>
            <div className="flex items-center grow shrink basis-[0%] rounded-lg py-2.5 px-3.5 gap-2.5 bg-[#FAF9FE] border border-solid border-[#ECE8F8]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-primary size-9">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <rect x="7" y="7" width="4" height="4" rx="1" />
                  <rect x="13" y="7" width="4" height="4" rx="1" />
                  <rect x="7" y="13" width="10" height="4" rx="1" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[13px] inline-block text-[#1D2129] font-sans leading-4">
                  DeepUX
                </div>
                <div className="text-[10px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3">
                  Page Designer
                </div>
              </div>
              <div className="ml-auto text-[18px] inline-block text-primary font-['Inter',system-ui,sans-serif] font-bold leading-[22px]">
                15
              </div>
              <div className="flex ml-1 gap-[3px]">
                <div className="rounded-[3px] bg-[#10B981] shrink-0 size-1.5" />
                <div className="rounded-[3px] bg-[#F59E0B] shrink-0 size-1.5" />
                <div className="rounded-[3px] bg-[#3B82F6] shrink-0 size-1.5" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-[3px]">
          <svg width="20" height="16" viewBox="0 0 20 16">
            <path d="M10 0v10M6 7l4 5 4-5" stroke="#C4B5E3" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <div className="flex flex-col rounded-[10px] py-3 px-3.5 gap-1.5 bg-white border border-solid border-[#E8EAED]">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 rounded-xs bg-[#F59E0B] shrink-0" />
            <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
              逻辑与流程层
            </div>
            <div className="text-[10px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3">
              Logic & Process
            </div>
            <div className="text-[10px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
              — 怎么算、怎么流转
            </div>
          </div>
          <div className="flex gap-2.5">
            <div className="flex items-center grow shrink basis-[0%] rounded-lg py-2.5 px-3.5 gap-2.5 bg-[#FFFBF5] border border-solid border-[#FCE8C3]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-[#F59E0B] size-9">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[13px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  Python 脚本
                </div>
                <div className="text-[10px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3">
                  Python Script
                </div>
              </div>
              <div className="ml-auto text-[18px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-[22px]">
                45
              </div>
              <div className="flex ml-1 gap-[3px]">
                <div className="rounded-[3px] bg-[#10B981] shrink-0 size-1.5" />
                <div className="rounded-[3px] bg-[#F59E0B] shrink-0 size-1.5" />
                <div className="rounded-[3px] bg-[#3B82F6] shrink-0 size-1.5" />
              </div>
            </div>
            <div className="flex items-center grow shrink basis-[0%] rounded-lg py-2.5 px-3.5 gap-2.5 bg-[#FFFBF5] border border-solid border-[#FCE8C3]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-[#F59E0B] size-9">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="14" y1="10" x2="21" y2="3" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[13px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  单据引擎
                </div>
                <div className="text-[10px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3">
                  Adapt Engine
                </div>
              </div>
              <div className="ml-auto text-[18px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-[22px]">
                3
              </div>
              <div className="flex ml-1 gap-[3px]">
                <div className="rounded-[3px] bg-[#F59E0B] shrink-0 size-1.5" />
              </div>
            </div>
            <div className="flex items-center grow shrink basis-[0%] rounded-lg py-2.5 px-3.5 gap-2.5 bg-[#FFFBF5] border border-solid border-[#FCE8C3]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-[#F59E0B] size-9">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[13px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  数据流
                </div>
                <div className="text-[10px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3">
                  DeepPipeline
                </div>
              </div>
              <div className="ml-auto text-[18px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-[22px]">
                18
              </div>
              <div className="flex ml-1 gap-[3px]">
                <div className="rounded-[3px] bg-[#F59E0B] shrink-0 size-1.5" />
              </div>
            </div>
            <div className="flex items-center grow shrink basis-[0%] rounded-lg py-2.5 px-3.5 gap-2.5 bg-[#FFFBF5] border border-solid border-[#FCE8C3]">
              <div className="flex items-center justify-center shrink-0 rounded-lg bg-[#F59E0B] size-9">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <path d="M6 3v12" />
                  <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[13px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  工作流
                </div>
                <div className="text-[10px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3">
                  DeepFlow
                </div>
              </div>
              <div className="ml-auto text-[18px] inline-block text-[#F59E0B] font-['Inter',system-ui,sans-serif] font-bold leading-[22px]">
                9
              </div>
              <div className="flex ml-1 gap-[3px]">
                <div className="rounded-[3px] bg-[#10B981] shrink-0 size-1.5" />
                <div className="rounded-[3px] bg-[#F59E0B] shrink-0 size-1.5" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-[3px]">
          <svg width="20" height="16" viewBox="0 0 20 16">
            <path d="M10 0v10M6 7l4 5 4-5" stroke="#C4B5E3" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <div className="flex flex-col rounded-[10px] py-3 px-3.5 gap-1.5 bg-white border border-solid border-[#E8EAED]">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 rounded-xs bg-[#3B82F6] shrink-0" />
            <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
              数据与模型层
            </div>
            <div className="text-[10px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3">
              Data & Model
            </div>
            <div className="text-[10px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
              — 存什么、建什么
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center grow shrink basis-[0%] rounded-md py-2 px-2.5 gap-2 bg-[#F0F7FF] border border-solid border-[#D4E4F7]">
              <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0 rounded-md bg-[#3B82F6]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <ellipse cx="12" cy="6" rx="8" ry="4" />
                  <path d="M4 6v6c0 2.2 3.6 4 8 4s8-1.8 8-4V6" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="text-[12px] inline-block text-[#1D2129] font-['Inter',system-ui,sans-serif] font-semibold leading-4">
                  DeepModel
                </div>
                <div className="text-[9px] inline-block text-[#86909C] font-sans leading-3">
                  Object Model
                </div>
              </div>
              <div className="ml-auto text-[16px] inline-block text-[#3B82F6] font-['Inter',system-ui,sans-serif] font-bold leading-5">
                6
              </div>
              <div className="flex ml-[3px] gap-0.5">
                <div className="w-[5px] h-[5px] rounded-[3px] bg-[#F59E0B] shrink-0" />
              </div>
            </div>
            <div className="flex items-center grow shrink basis-[0%] rounded-md py-2 px-2.5 gap-2 bg-[#F0F7FF] border border-solid border-[#D4E4F7]">
              <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0 rounded-md bg-[#3B82F6]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  连接器
                </div>
                <div className="text-[9px] inline-block text-[#86909C] font-sans leading-3">
                  Connector
                </div>
              </div>
              <div className="ml-auto text-[16px] inline-block text-[#3B82F6] font-['Inter',system-ui,sans-serif] font-bold leading-5">
                6
              </div>
              <div className="flex ml-[3px] gap-0.5">
                <div className="w-[5px] h-[5px] rounded-[3px] bg-[#F59E0B] shrink-0" />
              </div>
            </div>
            <div className="flex items-center grow shrink basis-[0%] rounded-md py-2 px-2.5 gap-2 bg-[#F0F7FF] border border-solid border-[#D4E4F7]">
              <div className="w-[30px] h-[30px] shrink-0 rounded-md bg-[#3B82F6]" />
              <div className="flex flex-col">
                <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  维度
                </div>
                <div className="text-[9px] inline-block text-[#86909C] font-sans leading-3">
                  Dimension
                </div>
              </div>
              <div className="ml-auto text-[16px] inline-block text-[#3B82F6] font-['Inter',system-ui,sans-serif] font-bold leading-5">
                12
              </div>
              <div className="flex ml-[3px] gap-0.5">
                <div className="w-[5px] h-[5px] rounded-[3px] bg-[#10B981] shrink-0" />
                <div className="w-[5px] h-[5px] rounded-[3px] bg-[#F59E0B] shrink-0" />
                <div className="w-[5px] h-[5px] rounded-[3px] bg-[#3B82F6] shrink-0" />
              </div>
            </div>
            <div className="flex items-center grow shrink basis-[0%] rounded-md py-2 px-2.5 gap-2 bg-[#F0F7FF] border border-solid border-[#D4E4F7]">
              <div className="w-[30px] h-[30px] shrink-0 rounded-md bg-[#3B82F6]" />
              <div className="flex flex-col">
                <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  领域模型
                </div>
                <div className="text-[9px] inline-block text-[#86909C] font-sans leading-3">
                  Domain Model
                </div>
              </div>
              <div className="ml-auto text-[16px] inline-block text-[#3B82F6] font-['Inter',system-ui,sans-serif] font-bold leading-5">
                12
              </div>
              <div className="flex ml-[3px] gap-0.5">
                <div className="w-[5px] h-[5px] rounded-[3px] bg-[#F59E0B] shrink-0" />
              </div>
            </div>
            <div className="flex items-center grow shrink basis-[0%] rounded-md py-2 px-2.5 gap-2 bg-[#F0F7FF] border border-solid border-[#D4E4F7]">
              <div className="w-[30px] h-[30px] shrink-0 rounded-md bg-[#3B82F6]" />
              <div className="flex flex-col">
                <div className="text-[12px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
                  财务模型
                </div>
                <div className="text-[9px] inline-block text-[#86909C] font-sans leading-3">
                  Finance Cube
                </div>
              </div>
              <div className="ml-auto text-[16px] inline-block text-[#3B82F6] font-['Inter',system-ui,sans-serif] font-bold leading-5">
                8
              </div>
              <div className="flex ml-[3px] gap-0.5">
                <div className="w-[5px] h-[5px] rounded-[3px] bg-[#10B981] shrink-0" />
                <div className="w-[5px] h-[5px] rounded-[3px] bg-[#F59E0B] shrink-0" />
                <div className="w-[5px] h-[5px] rounded-[3px] bg-[#3B82F6] shrink-0" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-md py-[7px] px-3.5 gap-2.5 bg-[#F0F2F5] border border-dashed border-[#D0D5DD]">
          <div className="text-[10px] inline-block text-[#4E5969] font-['PingFangSC-Medium','PingFang_SC',system-ui,sans-serif] font-medium leading-3">
            先胜云平台 DeepFOS Platform
          </div>
          <div className="text-[9px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
            租户 · 权限 · 菜单 · 变量 · 值列表 · 网关
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[310px] shrink-0 gap-3">
        <div className="flex flex-col rounded-[10px] gap-2 bg-white border border-solid border-[#E8EAED] p-3">
          <div className="flex items-center gap-1.5">
            <div className="rounded-sm bg-[#10B981] shrink-0 size-2" />
            <div className="text-[13px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
              预算编制
            </div>
            <div className="text-[11px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3.5">
              Budget
            </div>
            <div className="ml-auto text-[11px] inline-block text-[#10B981] font-sans leading-3.5">
              7 个组件
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="rounded-sm py-[3px] px-[7px] bg-[#ECFDF5]">
              <div className="inline-block text-[10px] text-[#059669] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                维度
              </div>
            </div>
            <div className="rounded-sm py-[3px] px-[7px] bg-[#ECFDF5]">
              <div className="inline-block text-[10px] text-[#059669] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                财务模型
              </div>
            </div>
            <div className="rounded-sm py-[3px] px-[7px] bg-[#ECFDF5]">
              <div className="inline-block text-[10px] text-[#059669] font-['Inter',system-ui,sans-serif] leading-3">
                Python
              </div>
            </div>
            <div className="rounded-sm py-[3px] px-[7px] bg-[#ECFDF5]">
              <div className="inline-block text-[10px] text-[#059669] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                工作流
              </div>
            </div>
            <div className="rounded-sm py-[3px] px-[7px] bg-[#ECFDF5]">
              <div className="inline-block text-[10px] text-[#059669] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                电子表格
              </div>
            </div>
            <div className="rounded-sm py-[3px] px-[7px] bg-[#ECFDF5]">
              <div className="inline-block text-[10px] text-[#059669] font-['Inter',system-ui,sans-serif] leading-3">
                DeepUX
              </div>
            </div>
          </div>
          <div className="text-[10px] leading-[15px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif]">
            企业预算编制、多级审批、执行监控、预实对比
          </div>
        </div>
        <div className="flex flex-col rounded-[10px] gap-2 bg-white border border-solid border-[#E8EAED] p-3">
          <div className="flex items-center gap-1.5">
            <div className="rounded-sm bg-[#F59E0B] shrink-0 size-2" />
            <div className="text-[13px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
              合并报表
            </div>
            <div className="text-[11px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3.5">
              Consolidation
            </div>
            <div className="ml-auto text-[11px] inline-block text-[#F59E0B] font-sans leading-3.5">
              12 个组件
            </div>
          </div>
          <div className="flex gap-1">
            <div className="rounded-sm py-[3px] px-[7px] bg-[#FFFBEB]">
              <div className="inline-block text-[10px] text-[#D97706] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                全部组件
              </div>
            </div>
          </div>
          <div className="text-[10px] leading-[15px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif]">
            集团合并报表——数据采集、抵销调整、多币种折算、报表披露
          </div>
        </div>
        <div className="flex flex-col rounded-[10px] gap-2 bg-white border border-solid border-[#E8EAED] p-3">
          <div className="flex items-center gap-1.5">
            <div className="rounded-sm bg-[#3B82F6] shrink-0 size-2" />
            <div className="text-[13px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-4">
              管理报告
            </div>
            <div className="text-[11px] inline-block text-[#86909C] font-['Inter',system-ui,sans-serif] leading-3.5">
              Reporting
            </div>
            <div className="ml-auto text-[11px] inline-block text-[#3B82F6] font-sans leading-3.5">
              6 个组件
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="rounded-sm py-[3px] px-[7px] bg-[#EFF6FF]">
              <div className="inline-block text-[10px] text-[#2563EB] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                维度
              </div>
            </div>
            <div className="rounded-sm py-[3px] px-[7px] bg-[#EFF6FF]">
              <div className="inline-block text-[10px] text-[#2563EB] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                财务模型
              </div>
            </div>
            <div className="rounded-sm py-[3px] px-[7px] bg-[#EFF6FF]">
              <div className="inline-block text-[10px] text-[#2563EB] font-['Inter',system-ui,sans-serif] leading-3">
                Python
              </div>
            </div>
            <div className="rounded-sm py-[3px] px-[7px] bg-[#EFF6FF]">
              <div className="inline-block text-[10px] text-[#2563EB] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                电子表格
              </div>
            </div>
            <div className="rounded-sm py-[3px] px-[7px] bg-[#EFF6FF]">
              <div className="inline-block text-[10px] text-[#2563EB] font-['Inter',system-ui,sans-serif] leading-3">
                DeepUX
              </div>
            </div>
          </div>
          <div className="text-[10px] leading-[15px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif]">
            经营分析仪表盘、多维透视报表、KPI 驾驶舱
          </div>
        </div>
        <div className="flex flex-col rounded-lg py-2.5 px-3 gap-1.5 bg-white border border-solid border-[#E8EAED]">
          <div className="text-[11px] inline-block text-[#1D2129] font-['PingFangSC-Semibold','PingFang_SC',system-ui,sans-serif] font-semibold leading-3.5">
            场景标签图例
          </div>
          <div className="flex gap-3.5">
            <div className="flex items-center gap-1">
              <div className="rounded-[3px] bg-[#10B981] shrink-0 size-1.5" />
              <div className="text-[10px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                预算编制
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="rounded-[3px] bg-[#F59E0B] shrink-0 size-1.5" />
              <div className="text-[10px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                合并报表
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="rounded-[3px] bg-[#3B82F6] shrink-0 size-1.5" />
              <div className="text-[10px] inline-block text-[#4E5969] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif] leading-3">
                管理报告
              </div>
            </div>
          </div>
          <div className="text-[9px] leading-[13px] inline-block text-[#86909C] font-['PingFangSC-Regular','PingFang_SC',system-ui,sans-serif]">
            组件卡片上的彩色圆点表示该组件参与的业务场景
          </div>
        </div>
      </div>
    </div>
  );
};
