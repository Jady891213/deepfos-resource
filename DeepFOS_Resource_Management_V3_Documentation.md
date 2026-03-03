# DeepFOS平台资源管理 V3 - 详细设计与交互文档

本文档基于当前项目的代码及迭代历史，详细梳理了“DeepFOS平台资源管理 V3”的布局、交互、逻辑及数据结构。此文档旨在为低代码平台的最终落地提供详尽的参考。

## 1. 项目概述

- **项目名称**: DeepFOS Intelligence Platform (资源管理 V3)
- **核心目标**: 为低代码平台提供一个现代化、高性能的开发者界面，包含流线型的资源目录树、AI辅助搜索以及统一的企业级设计系统。
- **主要模式**:
  - **开发态 (Dev Mode)**: 面向开发者，提供全量资源管理、逻辑编排、数据模型定义等功能。
  - **运行态 (User Mode)**: 面向业务用户，提供财务中心、关账管理等业务视角的菜单。

---

## 2. 整体架构与布局 (8大核心布局)

整个应用采用经典的“左右分栏+多标签页”的IDE式布局，共包含以下8个核心布局区域：

1. **整体框架布局**: `flex h-screen w-screen flex-col overflow-hidden`，禁止全局滚动，采用局部滚动。
2. **顶栏布局 (Header)**: 高度固定为 `56px` (`h-14`)，横向弹性布局，包含全局控制与标签页。
3. **侧边导航栏布局 (Sidebar)**: 位于左侧，宽度可拖拽调整（`64px` 到 `320px`），包含模块切换。
4. **资源目录树布局 (Explorer)**: 紧贴侧边栏右侧，展示当前模块的树状结构，可独立收起。
5. **主内容区布局 (MainContent)**: 占据右侧主要空间，包含工具栏、面包屑和资源列表/编辑器。
6. **筛选面板布局 (Filter Panel)**: 位于主内容区左侧的抽屉式弹出层，宽度 `288px` (`w-72`)。
7. **底部抽屉布局 (Context/Console Drawer)**: 位于目录树底部的可拖拽高度面板（`120px` 到 `650px`）。
8. **AI助手布局 (AIAssistant)**: 位于最右侧的滑出式面板，宽度 `320px` (`w-80`)。

---

## 3. 详细模块拆解

### 3.1 顶栏 (Header)

负责全局导航控制、多标签页管理和全局工具入口。

- **操作项 (7个)**:
  1. **展开/收起导航**: 位于最左侧，控制 Sidebar 和 Explorer 的整体显示/隐藏。
  2. **标签页 (Tabs)**: 动态生成的资源标签，点击切换视图。
  3. **关闭标签页**: 悬浮在标签页上出现的 `X` 按钮。
  4. **标签页右键菜单**: 包含“刷新”、“固定到常用”、“关闭”、“关闭右侧”、“关闭其他”。
  5. **AI 助手开关**: 唤出/收起右侧 AI Copilot 面板。
  6. **消息通知**: (预留位置，带有红点提示)。
  7. **用户头像**: 展示用户缩写（如“LQ”）。

- **使用Icon (9个)**: `PanelLeft`, `PanelLeftClose`, `Layers`, `Files`, `RefreshCw`, `X`, `Sparkles`, `Bell`, `Pin` 等。

- **交互与联动**:
  - 点击“展开/收起导航”，左侧导航区宽度变为0，主内容区向左平滑扩展。
  - 右键点击标签页，在鼠标位置弹出绝对定位的上下文菜单（Context Menu）。
  - 标签页激活时，底部出现蓝色边框，文字变蓝；未激活时为灰色。

### 3.2 侧边导航栏 (Sidebar)

提供一级模块的切换。

- **操作项 (8个 - 开发态)**:
  1. **最近打开**: 切换目录树为最近访问和常用项。
  2. **全量资源**: 切换目录树为所有资源分类。
  3. **控制台**: 唤出底部抽屉并展示控制台视图。
  4. **元素信息**: 唤出底部抽屉并展示当前元素的详细信息。
  5. **元素管理**: 在主内容区打开“元素管理”标签页。
  6. **空间设置**: 弹出确认弹窗，跳转至外部工作台。
  7. **模式切换**: 切换“开发态”与“运行态”。
  8. **收起侧栏**: 将侧边栏宽度缩至 `64px`（仅显示Icon）。

- **使用Icon (10个)**: `History`, `Blocks`, `Terminal`, `Info`, `Grid2X2`, `Settings`, `MonitorCheck`, `Database`, `Lock`, `Hammer`, `UserCircle`, `ChevronLeft`, `ChevronRight`。

- **交互与联动**:
  - **拖拽调整宽度**: 鼠标悬浮在右侧边缘，出现 `col-resize` 光标，拖拽可改变宽度（`64px` - `320px`）。
  - **响应式文本显示**: 当宽度大于 `120px` 时，文字标签平滑淡入（`opacity` 渐变）；小于 `120px` 时，文字隐藏，鼠标悬浮Icon时出现 Tooltip。
  - **模式联动**: 切换到“运行态”时，菜单项变为业务菜单（财务中心等），目录树数据同步更新。

### 3.3 资源目录树 (Explorer)

展示选中模块的层级结构。

- **操作项 (10个)**:
  1. **代码/名称切换**: 切换树节点显示中文名称或英文Code。
  2. **收起目录栏**: 仅隐藏目录树，保留最左侧 Sidebar。
  3. **全局搜索**: 实时过滤目录树节点。
  4. **资源类型过滤**: 下拉菜单，按类型（页面、模型、逻辑）过滤树节点。
  5. **新建资源**: `+` 按钮。
  6. **更多操作**: 下拉菜单（定位当前元素、展开所有、收起所有）。
  7. **分组折叠/展开**: “常用”和“最近”分组的折叠控制。
  8. **节点折叠/展开**: 文件夹节点的折叠控制。
  9. **固定/取消固定**: 悬浮在节点上，点击 `Pin` 图标将其加入“常用”组。
  10. **底部抽屉高度拖拽**: 拖拽抽屉顶部边缘调整高度。

- **使用Icon (18个)**: `Code2`, `Eye`, `PanelLeftClose`, `Search`, `Compass`, `Plus`, `MoreVertical`, `FolderOpen`, `Database`, `Workflow`, `Cpu`, `Grid3X3`, `Layout`, `HistoryIcon`, `Terminal`, `FileText`, `Pin`, `PinOff` 等。

- **交互与联动**:
  - **搜索联动**: 输入关键字时，树结构自动展开并仅显示匹配的节点及其父节点。
  - **点击节点**: 在顶栏新增一个 Tab，并将 MainContent 切换至该资源视图。
  - **底部抽屉联动**: 当点击 Sidebar 的“元素信息”时，底部抽屉展示当前激活 Tab 的负责人、版本、关联元素等信息。

### 3.4 主内容区 (MainContent)

核心工作区，包含列表视图和编辑器视图。

- **操作项 (12个)**:
  1. **筛选**: 点击从左侧滑出筛选面板。
  2. **搜索**: 列表内搜索。
  3. **导入**: 导入资源。
  4. **新建元素**: 核心高亮按钮。
  5. **权限设置**: 盾牌Icon。
  6. **变更历史**: 点击在下方弹出历史记录列表。
  7. **面包屑导航**: 快速返回上级目录。
  8. **列表复选框**: 批量选择。
  9. **行内操作 - 查看**: 悬浮出现。
  10. **行内操作 - 编辑**: 悬浮出现。
  11. **行内操作 - 更多**: 悬浮出现。
  12. **底部分页**: Prev, 1, 2, 3, Next。

- **筛选面板专属操作 (4个)**:
  1. **修改人选择**: 下拉框。
  2. **修改时间选择**: 按钮组（最近24小时等）。
  3. **元素类型多选**: Tag标签点击切换（选中态带 `Check` 图标）。
  4. **重置/确定**: 底部操作按钮。

- **使用Icon (15个)**: `Filter`, `Search`, `Upload`, `Plus`, `ShieldCheck`, `History`, `User`, `Calendar`, `Tag`, `Check`, `X`, `Home`, `ChevronRight`, `Eye`, `Edit3`, `MoreVertical`。

- **交互与联动**:
  - **筛选面板动画**: 点击“筛选”后，面板从左侧 `-translate-x-full` 滑入 `translate-x-0`，高度向下撑满。
  - **变更历史**: 布局在“新建元素”右侧（由分割线隔开），仅保留Icon。点击向下弹出悬浮窗，展示时间轴式的操作记录。
  - **加载状态**: 点击筛选“确定”或刷新Tab时，主内容区会出现带有 `Loader2` (旋转动画) 的半透明遮罩层。
  - **特殊视图**: 如果激活的 Tab 是 `terminal`，则渲染深色的命令行模拟界面；如果是未实现的资源，则展示带有 `Code2` 图标的占位加载页。

### 3.5 AI 助手 (AIAssistant)

- **操作项 (3个)**:
  1. **关闭面板**: `X` 按钮。
  2. **输入框**: 支持回车发送。
  3. **发送按钮**: `Send` 图标。
- **交互与联动**:
  - 采用 `@google/genai` 接入大模型。
  - 发送消息后，出现三个圆点跳动的输入中（Typing）动画。
  - 聊天记录自动滚动到底部。

---

## 4. 核心数据结构与类型 (types.ts)

为了保证低码平台落地时的数据一致性，需严格遵循以下类型定义：

```typescript
// 资源类型枚举
export type ResourceType =
  | "folder"
  | "page"
  | "logic"
  | "model"
  | "stream"
  | "connector"
  | "component"
  | "workflow"
  | "db"
  | "script"
  | "chart"
  | "ux"
  | "spreadsheet"
  | "accounting";

// 侧边栏模块枚举
export type ModuleId =
  | "recent_fav"
  | "resources"
  | "finance"
  | "finance_center"
  | "finance_master_data"
  | "closing_management"
  | "context"
  | "console"
  | "terminal";

// 资源项数据结构
export interface ResourceItem {
  id: string;
  name: string;
  code: string;
  type: ResourceType;
  description?: string;
  version: string;
  createdBy: string;
  updatedAt: string;
  children?: ResourceItem[]; // 用于构建树状结构
  status?: "active" | "draft" | "archived";
  unreadCount?: number;
  tags?: string[];
}

// 标签页数据结构
export interface Tab {
  id: string;
  title: string;
  code?: string;
  type: ResourceType | "module";
  moduleId?: ModuleId;
  updatedAt?: string;
}
```

## 5. 样式与主题规范

- **CSS框架**: Tailwind CSS。
- **主色调**:
  - 品牌蓝: `blue-600` (`#2563eb`)，用于主按钮、激活状态、高亮文本。
  - 成功绿: `emerald-600`，用于运行态标识和成功状态。
  - 警告黄: `amber-500`，用于文件夹图标和警告提示。
- **背景色**:
  - 全局背景: `bg-slate-50` / `bg-[#f8fafc]` / `bg-[#f9fafb]`。
  - 面板背景: `bg-white`。
- **边框与阴影**:
  - 统一使用 `border-slate-200` 或 `border-slate-100` 作为分割线。
  - 悬浮层使用 `shadow-xl` 或 `shadow-2xl`，常规卡片使用 `shadow-sm`。
- **动画过渡**:
  - 广泛使用 `transition-all duration-300 ease-in-out` 处理宽度、位置变化。
  - 弹出层使用 `animate-in fade-in zoom-in` (基于 `tailwindcss-animate` 插件逻辑或原生实现)。
- **滚动条**: 全局隐藏滚动条 (`no-scrollbar`)，但保留滚动功能，以提升界面整洁度。
