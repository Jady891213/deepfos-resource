
import React from 'react';

export type ResourceType = 'folder' | 'page' | 'logic' | 'model' | 'stream' | 'connector' | 'component' | 'workflow' | 'db' | 'script' | 'chart';

export interface ResourceItem {
  id: string;
  name: string;
  type: ResourceType;
  description?: string;
  version: string;
  createdBy: string;
  updatedAt: string;
  children?: ResourceItem[];
  status?: 'active' | 'draft' | 'archived';
  unreadCount?: number;
  tags?: string[];
}

export interface Tab {
  id: string;
  title: string;
  type: ResourceType | 'module';
  moduleId?: ModuleId;
}

export enum ViewMode {
  EXPLORER = 'explorer',
  DESIGN = 'design',
  PREVIEW = 'preview'
}

// Added 'terminal' to ModuleId to fix type overlap error in MainContent.tsx and support terminal-specific logic
export type ModuleId = 
  | 'pages' 
  | 'logic' 
  | 'data' 
  | 'lakehouse' 
  | 'integration' 
  | 'services' 
  | 'v2' 
  | 'finance' 
  | 'recents' 
  | 'elements'
  | 'terminal';

export interface NavItem {
  id: ModuleId;
  label: string;
  icon: React.ReactNode;
}
