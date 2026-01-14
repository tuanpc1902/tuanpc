export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  pinned?: boolean;
  order?: number;
  hidden?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Đếm ngày ra quân',
    description: 'Công cụ đếm ngược thời gian đến một ngày cụ thể với hiển thị real-time',
    icon: '📅',
    category: 'Tools',
    tags: ['React', 'TypeScript', 'Vite'],
    link: '/demngayraquan',
    github: import.meta.env.VITE_PROFILE_GITHUB_URL || '',
    featured: true,
  },
  {
    id: '2',
    name: 'Portfolio Website',
    description: 'Trang web portfolio cá nhân được xây dựng với React và TypeScript',
    icon: '🚀',
    category: 'Web Development',
    tags: ['React', 'TypeScript', 'SCSS'],
    link: '/',
    github: import.meta.env.VITE_PROFILE_GITHUB_URL || '',
    featured: true,
  },
  {
    id: '3',
    name: 'E-commerce Platform',
    description: 'Nền tảng thương mại điện tử với đầy đủ tính năng quản lý sản phẩm và đơn hàng',
    icon: '🛒',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '/e-commerce',
    github: import.meta.env.VITE_PROFILE_GITHUB_URL || '',
  },
  {
    id: '4',
    name: 'Task Management App',
    description: 'Ứng dụng quản lý công việc với drag & drop và real-time collaboration',
    icon: '✅',
    category: 'Web Development',
    tags: ['React', 'Firebase', 'TypeScript'],
    link: import.meta.env.VITE_PROFILE_GITHUB_URL || '',
    github: import.meta.env.VITE_PROFILE_GITHUB_URL || '',
  },
  {
    id: '5',
    name: 'Weather Dashboard',
    description: 'Dashboard hiển thị thông tin thời tiết với API integration và charts',
    icon: '🌤️',
    category: 'Tools',
    tags: ['React', 'API', 'Charts'],
    link: import.meta.env.VITE_PROFILE_GITHUB_URL || '',
    github: import.meta.env.VITE_PROFILE_GITHUB_URL || '',
  },
  {
    id: '6',
    name: 'Blog CMS',
    description: 'Hệ thống quản lý nội dung blog với markdown editor và SEO optimization',
    icon: '📝',
    category: 'Web Development',
    tags: ['Next.js', 'Markdown', 'SEO'],
    link: import.meta.env.VITE_PROFILE_GITHUB_URL || '',
    github: import.meta.env.VITE_PROFILE_GITHUB_URL || '',
  },
];
