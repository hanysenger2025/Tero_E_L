
import React from 'react';
import { 
  Library, 
  Briefcase, 
  Leaf, 
  Cpu, 
  BookOpen, 
  LayoutDashboard, 
  ScrollText, 
  Network, 
  Bot,
  Home as HomeIcon,
  Users,
  GraduationCap,
  FileText,
  Activity
} from 'lucide-react';
import { Category, ContentType, FileItem, Stat, AppTheme } from './types';

export const APP_NAME = "مكتبة TERO الرقمية";
export const MINISTRY_NAME = "وزارة التربية والتعليم والتعليم الفني";
export const ADMIN_EMAIL = "hanysenger2009@gmail.com";
export const SUPPORT_EMAIL = "teroegypt@gmail.com";

export const DEFAULT_THEME: AppTheme = {
  primary: '#0f172a', 
  secondary: '#10b981',
  accent: '#b8860b',
  background: '#f8fafc'
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'home',
    title: 'الرئيسية',
    iconElement: <HomeIcon className="w-5 h-5" />,
    type: ContentType.HOME
  },
  {
    id: 'tero-about',
    title: 'عن التيرو (TERO)',
    iconElement: <Library className="w-5 h-5" />,
    subCategories: [
      { id: 'rd', title: 'البحث والتطوير (D&R)', type: ContentType.FILES },
      { id: 'md', title: 'المتابعة والتقييم (M&D)', type: ContentType.FILES },
      { id: 'coord', title: 'التنسيق والتواصل', type: ContentType.FILES },
    ]
  },
  {
    id: 'market-data',
    title: 'معلومات سوق العمل',
    iconElement: <Briefcase className="w-5 h-5" />,
    type: ContentType.FILES,
  },
  {
    id: 'green-move',
    title: 'التوجه نحو الأخضر',
    iconElement: <Leaf className="w-5 h-5" />,
    subCategories: [
      { id: 'green-init', title: 'المبادرات البيئية', type: ContentType.FILES },
      { id: 'green-comp', title: 'الجدارات البيئية', type: ContentType.FILES },
      { id: 'renewable', title: 'الطاقة المتجددة', type: ContentType.FILES },
      { id: 'social-bal', title: 'التوازن المجتمعي', type: ContentType.FILES },
    ]
  },
  {
    id: 'tech-edu-all',
    title: 'التعليم التقني',
    iconElement: <Cpu className="w-5 h-5" />,
    type: ContentType.FILES,
  },
  {
    id: 'research',
    title: 'البحوث والدراسات',
    iconElement: <BookOpen className="w-5 h-5" />,
    subCategories: [
      { id: 'research-local', title: 'دراسات محلية', type: ContentType.FILES },
      { id: 'research-intl', title: 'دراسات دولية', type: ContentType.FILES },
    ]
  },
  {
    id: 'dashboard-view',
    title: 'لوحة البيانات',
    iconElement: <LayoutDashboard className="w-5 h-5" />,
    type: ContentType.DASHBOARD,
  },
  {
    id: 'policies',
    title: 'السياسات والاستراتيجيات',
    iconElement: <ScrollText className="w-5 h-5" />,
    subCategories: [
      { id: 'vision-2030', title: 'رؤية مصر 2030', type: ContentType.FILES },
      { id: 'ministerial-dec', title: 'القرارات الوزارية', type: ContentType.FILES },
      { id: 'reform-pillars', title: 'محاور الإصلاح', type: ContentType.FILES },
    ]
  },
  {
    id: 'digital-trans',
    title: 'التحول الرقمي',
    iconElement: <Network className="w-5 h-5" />,
    subCategories: [
      { id: 'digitization-plan', title: 'الرقمنة في التعليم التقني', type: ContentType.FILES },
      { id: 'ai-guide', title: 'الذكاء الاصطناعي', type: ContentType.FILES },
    ]
  },
  {
    id: 'chatbot-view',
    title: 'المساعد الذكي',
    iconElement: <Bot className="w-5 h-5" />,
    type: ContentType.CHATBOT,
  }
];

export const QUICK_STATS: Stat[] = [
  { label: 'إجمالي الطلاب', value: '2.3M', change: '+5.2%', trend: 'up', icon: Users },
  { label: 'المدارس المطورة', value: '1,240', change: '+12%', trend: 'up', icon: GraduationCap },
  { label: 'الوثائق الرقمية', value: '15.4K', change: '+20%', trend: 'up', icon: FileText },
  { label: 'نسبة التوظيف', value: '78%', change: '+4.1%', trend: 'up', icon: Activity },
];

export const MOCK_FILES: Record<string, FileItem[]> = {
  'tech-edu-all': [
    { id: '1', name: 'دليل المعلم للتعليم الفني', date: '2024/01/15', size: '2.4 MB', type: 'pdf', category: 'التعليم التقني', url: '#' },
    { id: '2', name: 'لائحة التقييم والتحقق', date: '2023/11/20', size: '1.2 MB', type: 'pdf', category: 'التعليم التقني', url: '#' },
  ]
};
