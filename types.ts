
import { ReactNode } from 'react';

export enum ContentType {
  HOME = 'HOME',
  FILES = 'FILES',
  LINK = 'LINK',
  DASHBOARD = 'DASHBOARD',
  CHATBOT = 'CHATBOT',
  ADMIN_CONFIG = 'ADMIN_CONFIG'
}

export interface SubCategory {
  id: string;
  title: string;
  type: ContentType;
  description?: string;
  lastModified?: string;
}

export interface Category {
  id: string;
  title: string;
  icon?: string; // Using string for icon names to allow persistence
  iconElement?: ReactNode; 
  subCategories?: SubCategory[];
  type?: ContentType;
  description?: string;
  lastModified?: string;
}

export interface FileItem {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'pdf' | 'doc' | 'xls' | 'ppt' | 'link';
  category?: string;
  url?: string;
}

export interface Stat {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: any;
}

export interface AppTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}
