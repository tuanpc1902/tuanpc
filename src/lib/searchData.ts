import { PROJECTS } from './projects';
import type { Language } from '~alias~/lib/translations';

export interface SearchableItem {
  id: string;
  type: 'project' | 'tool' | 'page';
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  keywords: string[];
  keywordsVi: string[];
  url: string;
  icon?: string;
}

export const searchableItems: SearchableItem[] = [
  // Projects
  ...PROJECTS.map((project) => ({
    id: project.id,
    type: 'project' as const,
    title: project.name,
    titleVi: project.name,
    description: project.description,
    descriptionVi: project.description,
    keywords: [...project.tags, project.category, project.name.toLowerCase()],
    keywordsVi: [...project.tags, project.category, project.name.toLowerCase()],
    url: project.link || '#',
    icon: project.icon,
  })),
  
  // Tools
  {
    id: 'tool-countdown',
    type: 'tool' as const,
    title: 'Countdown Timer',
    titleVi: 'Đếm ngày ra quân',
    description: 'A countdown timer tool to track days until a specific date',
    descriptionVi: 'Công cụ đếm ngày để theo dõi số ngày đến một ngày cụ thể',
    keywords: ['countdown', 'timer', 'date', 'days', 'track'],
    keywordsVi: ['đếm ngày', 'hẹn giờ', 'ngày', 'theo dõi'],
    url: '/demngayraquan',
    icon: '📅',
  },
  
  // Pages
  {
    id: 'page-home',
    type: 'page' as const,
    title: 'Home',
    titleVi: 'Trang chủ',
    description: 'Portfolio homepage with projects and information',
    descriptionVi: 'Trang chủ portfolio với các dự án và thông tin',
    keywords: ['home', 'portfolio', 'about', 'profile'],
    keywordsVi: ['trang chủ', 'portfolio', 'giới thiệu', 'hồ sơ'],
    url: '/',
    icon: '🏠',
  },
];

export function searchItems(query: string, language: Language): SearchableItem[] {
  if (!query.trim()) {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  
  return searchableItems.filter(item => {
    const title = language === 'vi' ? item.titleVi : item.title;
    const description = language === 'vi' ? item.descriptionVi : item.description;
    const keywords = language === 'vi' ? item.keywordsVi : item.keywords;
    
    return (
      title.toLowerCase().includes(lowerQuery) ||
      description.toLowerCase().includes(lowerQuery) ||
      keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
    );
  });
}
