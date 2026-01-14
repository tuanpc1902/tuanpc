import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Project } from '~alias~/lib/projects';
import { translations, Language } from '~alias~/lib/translations';
import { ENV_VARS } from '~alias~/lib/constants';
import {
  projectsService,
  translationsService,
  constantsService,
} from '~alias~/lib/services/firestoreService';

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
  isLoading: boolean;
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [appTranslations, setAppTranslations] = useState<typeof translations>(translations);
  const [constants, setConstants] = useState<typeof ENV_VARS>(ENV_VARS);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and subscribe to data
  useEffect(() => {
    let unsubscribeProjects: (() => void) | null = null;
    let unsubscribeTranslations: (() => void) | null = null;
    let unsubscribeConstants: (() => void) | null = null;

    const initializeData = async () => {
      try {
        // Load initial data
        const [loadedProjects, loadedTranslations, loadedConstants] = await Promise.all([
          projectsService.getAll(),
          translationsService.get(),
          constantsService.get(),
        ]);

        // Set initial state
        if (loadedProjects && loadedProjects.length > 0) {
          const normalizedProjects = loadedProjects.map((project: Project, index: number) => ({
            ...project,
            order: project.order !== undefined ? project.order : index,
            pinned: project.pinned !== undefined ? project.pinned : false,
            hidden: project.hidden !== undefined ? project.hidden : false,
          }));
          setProjects(normalizedProjects);
        } else {
          // No data found, set defaults and save to Firestore
          await projectsService.setAll(DEFAULT_PROJECTS);
          setProjects(DEFAULT_PROJECTS);
        }

        if (loadedTranslations) {
          setAppTranslations(loadedTranslations);
        } else {
          await translationsService.set(translations);
          setAppTranslations(translations);
        }

        if (loadedConstants) {
          setConstants(loadedConstants);
        } else {
          await constantsService.set(ENV_VARS);
          setConstants(ENV_VARS);
        }

        // Subscribe to real-time updates
        unsubscribeProjects = projectsService.subscribe((updatedProjects: Project[]) => {
          if (updatedProjects && updatedProjects.length > 0) {
            const normalizedProjects = updatedProjects.map((project: Project, index: number) => ({
              ...project,
              order: project.order !== undefined ? project.order : index,
              pinned: project.pinned !== undefined ? project.pinned : false,
              hidden: project.hidden !== undefined ? project.hidden : false,
            }));
            setProjects(normalizedProjects);
          }
        });

        unsubscribeTranslations = translationsService.subscribe((updatedTranslations: any) => {
          if (updatedTranslations) {
            setAppTranslations(updatedTranslations);
          }
        });

        unsubscribeConstants = constantsService.subscribe((updatedConstants: any) => {
          if (updatedConstants) {
            setConstants(updatedConstants);
          }
        });
      } catch (error) {
        console.error('Error initializing data:', error);
        // Fallback to defaults if Firestore fails
        setProjects(DEFAULT_PROJECTS);
        setAppTranslations(translations);
        setConstants(ENV_VARS);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();

    // Cleanup subscriptions on unmount
    return () => {
      if (unsubscribeProjects) unsubscribeProjects();
      if (unsubscribeTranslations) unsubscribeTranslations();
      if (unsubscribeConstants) unsubscribeConstants();
    };
  }, []);

  // Sync projects to Firestore whenever they change
  useEffect(() => {
    if (!isLoading && projects.length > 0) {
      projectsService.setAll(projects).catch((error) => {
        console.error('Error syncing projects to Firestore:', error);
      });
    }
  }, [projects, isLoading]);

  // Sync translations to Firestore whenever they change
  useEffect(() => {
    if (!isLoading) {
      translationsService.set(appTranslations).catch((error) => {
        console.error('Error syncing translations to Firestore:', error);
      });
    }
  }, [appTranslations, isLoading]);

  // Sync constants to Firestore whenever they change
  useEffect(() => {
    if (!isLoading) {
      constantsService.set(constants).catch((error) => {
        console.error('Error syncing constants to Firestore:', error);
      });
    }
  }, [constants, isLoading]);

  const updateProjects = useCallback((newProjects: Project[]) => {
    setProjects(newProjects);
  }, []);

  const addProject = useCallback((project: Project) => {
    // Validation is done in firestoreService.setAll
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
    projectsService.delete(id).catch((error) => {
      console.error('Error deleting project:', error);
    });
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

  const resetData = useCallback(async () => {
    try {
      await Promise.all([
        projectsService.setAll(DEFAULT_PROJECTS),
        translationsService.set(translations),
        constantsService.set(ENV_VARS),
      ]);
      setProjects(DEFAULT_PROJECTS);
      setAppTranslations(translations);
      setConstants(ENV_VARS);
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        projects,
        translations: appTranslations,
        constants,
        isLoading,
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