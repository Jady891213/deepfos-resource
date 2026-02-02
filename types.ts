
import React from 'react';

export type ResourceType = 'folder' | 'page' | 'logic' | 'model' | 'stream' | 'connector' | 'component' | 'workflow' | 'db' | 'script' | 'chart' | 'ux' | 'spreadsheet' | 'accounting';

export interface ResourceItem {
  id: string;
  name: string;
  code: string;
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

export interface ResourceRelation {
  id: string;
  name: string;
  code: string;
  type: ResourceType;
}

export interface Tab {
  id: string;
  title: string;
  code?: string;
  type: ResourceType | 'module';
  moduleId?: ModuleId;
  updatedAt?: string;
}

export enum ViewMode {
  EXPLORER = 'explorer',
  DESIGN = 'design',
  PREVIEW = 'preview'
}

export type ModuleId = 
  | 'recent_fav' // Recent and Favorites module
  | 'resources' // Unified Resource Management
  | 'finance' 
  | 'context'   // Active Tab Context (Relations)
  | 'terminal';

export interface NavItem {
  id: ModuleId;
  label: string;
  icon: React.ReactNode;
}
