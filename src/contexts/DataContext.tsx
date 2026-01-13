import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Project } from '~alias~/lib/projects';
import { translations, Language } from '~alias~/lib/translations';
import { ENV_VARS } from '~alias~/lib/constants';

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'admin_projects',
  TRANSLATIONS: 'admin_translations',
  CONSTANTS: 'admin_constants',
} as const;

// Default data
const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Đếm ngày ra quân',
    description: 'Công cụ đếm ngược thời gian đến một ngày cụ thể với hiển thị real-time',
    icon: '📅',
    category: 'Tools',
    tags: ['React', 'TypeScript', 'Vite'],
    link: '/demngayraquan',
    github: 'https://github.com/tuanpc902',
    featured: true,
    pinned: false,
    order: 0,
    hidden: false,
  },
  {
    id: '2',
    name: 'Portfolio Website',
    description: 'Trang web portfolio cá nhân được xây dựng với React và TypeScript',
    icon: '🚀',
    category: 'Web Development',
    tags: ['React', 'TypeScript', 'SCSS'],
    link: '/',
    github: 'https://github.com/tuanpc902',
    featured: true,
    pinned: false,
    order: 1,
    hidden: false,
  },
];

interface DataContextType {
  projects: Project[];
  translations: typeof translations;
  constants: typeof ENV_VARS;
  updateProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (activeId: string, overId: string) => void;
  togglePinProject: (id: string) => void;
  toggleHideProject: (id: string) => void;
  updateTranslations: (lang: Language, key: string, value: string) => void;
  updateConstants: (key: string, value: string) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    const loadedProjects = stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
    // Ensure all projects have order, pinned, and hidden properties
    return loadedProjects.map((project: Project, index: number) => ({
      ...project,
      order: project.order !== undefined ? project.order : index,
      pinned: project.pinned !== undefined ? project.pinned : false,
      hidden: project.hidden !== undefined ? project.hidden : false,
    }));
  });

  const [appTranslations, setAppTranslations] = useState<typeof translations>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSLATIONS);
    return stored ? JSON.parse(stored) : translations;
  });

  const [constants, setConstants] = useState<typeof ENV_VARS>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.CONSTANTS);
    return stored ? JSON.parse(stored) : ENV_VARS;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSLATIONS, JSON.stringify(appTranslations));
  }, [appTranslations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONSTANTS, JSON.stringify(constants));
  }, [constants]);

  const updateProjects = useCallback((newProjects: Project[]) => {
    setProjects(newProjects);
  }, []);

  const addProject = useCallback((project: Project) => {
    setProjects((prev) => {
      const maxOrder = Math.max(...prev.map((p) => p.order || 0), -1);
      return [
        ...prev,
        {
          ...project,
          order: maxOrder + 1,
          pinned: project.pinned || false,
          hidden: project.hidden || false,
        },
      ];
    });
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const reorderProjects = useCallback((activeId: string, overId: string) => {
    setProjects((prev) => {
      // Separate pinned and unpinned projects
      const pinnedProjects = prev.filter((p) => p.pinned).sort((a, b) => (a.order || 0) - (b.order || 0));
      const unpinnedProjects = prev.filter((p) => !p.pinned).sort((a, b) => (a.order || 0) - (b.order || 0));
      
      const activeProject = prev.find((p) => p.id === activeId);
      const overProject = prev.find((p) => p.id === overId);
      
      if (!activeProject || !overProject) return prev;

      // Determine which list to reorder
      const activeIsPinned = activeProject.pinned;
      const overIsPinned = overProject.pinned;

      if (activeIsPinned && overIsPinned) {
        // Reorder within pinned projects
        const activeIndex = pinnedProjects.findIndex((p) => p.id === activeId);
        const overIndex = pinnedProjects.findIndex((p) => p.id === overId);
        if (activeIndex !== -1 && overIndex !== -1) {
          const [moved] = pinnedProjects.splice(activeIndex, 1);
          pinnedProjects.splice(overIndex, 0, moved);
        }
      } else if (!activeIsPinned && !overIsPinned) {
        // Reorder within unpinned projects
        const activeIndex = unpinnedProjects.findIndex((p) => p.id === activeId);
        const overIndex = unpinnedProjects.findIndex((p) => p.id === overId);
        if (activeIndex !== -1 && overIndex !== -1) {
          const [moved] = unpinnedProjects.splice(activeIndex, 1);
          unpinnedProjects.splice(overIndex, 0, moved);
        }
      } else {
        // Moving between pinned and unpinned - not allowed, just return
        return prev;
      }

      // Reassign order values
      const reordered = [
        ...pinnedProjects.map((p, index) => ({ ...p, order: index })),
        ...unpinnedProjects.map((p, index) => ({ ...p, order: pinnedProjects.length + index })),
      ];

      return reordered;
    });
  }, []);

  const togglePinProject = useCallback((id: string) => {
    setProjects((prev) => {
      const project = prev.find((p) => p.id === id);
      if (!project) return prev;

      const isPinned = project.pinned || false;
      
      // Separate pinned and unpinned
      const pinnedProjects = prev.filter((p) => p.pinned && p.id !== id).sort((a, b) => (a.order || 0) - (b.order || 0));
      const unpinnedProjects = prev.filter((p) => !p.pinned && p.id !== id).sort((a, b) => (a.order || 0) - (b.order || 0));

      if (isPinned) {
        // Unpin: move to end of unpinned
        const maxUnpinnedOrder = unpinnedProjects.length > 0 
          ? Math.max(...unpinnedProjects.map((p) => p.order || 0))
          : -1;
        unpinnedProjects.push({
          ...project,
          pinned: false,
          order: maxUnpinnedOrder + 1,
        });
      } else {
        // Pin: move to end of pinned
        const maxPinnedOrder = pinnedProjects.length > 0
          ? Math.max(...pinnedProjects.map((p) => p.order || 0))
          : -1;
        pinnedProjects.push({
          ...project,
          pinned: true,
          order: maxPinnedOrder + 1,
        });
      }

      // Reassign order values
      return [
        ...pinnedProjects.map((p, index) => ({ ...p, order: index })),
        ...unpinnedProjects.map((p, index) => ({ ...p, order: pinnedProjects.length + index })),
      ];
    });
  }, []);

  const toggleHideProject = useCallback((id: string) => {
    setProjects((prev) => {
      const updated = prev.map((p) => {
        if (p.id === id) {
          const newHidden = !(p.hidden ?? false);
          return { ...p, hidden: newHidden };
        }
        return p;
      });
      return updated;
    });
  }, []);

  const updateTranslations = useCallback(
    (lang: Language, key: string, value: string) => {
      setAppTranslations((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [key]: value,
        },
      }));
    },
    []
  );

  const updateConstants = useCallback((key: string, value: string) => {
    setConstants((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetData = useCallback(() => {
    setProjects(DEFAULT_PROJECTS);
    setAppTranslations(translations);
    setConstants(ENV_VARS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.TRANSLATIONS);
    localStorage.removeItem(STORAGE_KEYS.CONSTANTS);
  }, []);

  return (
    <DataContext.Provider
      value={{
        projects,
        translations: appTranslations,
        constants,
        updateProjects,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        togglePinProject,
        toggleHideProject,
        updateTranslations,
        updateConstants,
        resetData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
}
