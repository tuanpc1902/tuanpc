import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db, isFirebaseConfigured, auth } from '~alias~/lib/firebase';
import { checkRateLimit, validateProject, validateTranslation, validateConstant, sanitizeString } from '~alias~/lib/utils/validation';
import { auditProjects, auditTranslations, auditConstants } from '~alias~/lib/services/auditService';

// Collection names
const COLLECTIONS = {
  PROJECTS: 'projects',
  TRANSLATIONS: 'translations',
  CONSTANTS: 'constants',
} as const;

// Check if we should use Firestore or fallback to localStorage
const shouldUseFirestore = () => {
  if (typeof window === 'undefined') return false;
  return isFirebaseConfigured();
};

// Check if user is authenticated (required for write operations)
const isAuthenticated = () => {
  return !!auth.currentUser;
};

// Fallback to localStorage
const localStorageFallback = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage for key ${key}:`, error);
      return null;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage for key ${key}:`, error);
    }
  },
  delete: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting from localStorage for key ${key}:`, error);
    }
  },
};

/**
 * Projects Service
 */
export const projectsService = {
  // Get all projects
  async getAll(): Promise<any[] | null> {
    if (!shouldUseFirestore()) {
      return localStorageFallback.get('admin_projects');
    }

    try {
      const projectsRef = collection(db, COLLECTIONS.PROJECTS);
      const snapshot = await getDocs(projectsRef);
      const projects: any[] = [];
      snapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to localStorage
      return localStorageFallback.get('admin_projects');
    }
  },

  // Get a single project
  async getById(id: string): Promise<any | null> {
    if (!shouldUseFirestore()) {
      const projects = localStorageFallback.get('admin_projects') || [];
      return projects.find((p: any) => p.id === id) || null;
    }

    try {
      const projectRef = doc(db, COLLECTIONS.PROJECTS, id);
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists()) {
        return { id: projectSnap.id, ...projectSnap.data() };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      return null;
    }
  },

  // Set all projects (replace entire collection)
  async setAll(projects: any[]): Promise<void> {
    // Validate and sanitize all projects
    const validatedProjects = projects.map((project) => {
      const validation = validateProject(project);
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      return {
        ...project,
        name: sanitizeString(project.name || ''),
        description: sanitizeString(project.description || ''),
        category: sanitizeString(project.category || ''),
        tags: (project.tags || []).map((tag: string) => sanitizeString(tag)),
      };
    });

    // Check rate limiting
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      const resetIn = Math.ceil((rateLimitCheck.resetAt - Date.now()) / 1000);
      throw new Error(`Rate limit exceeded. Please try again in ${resetIn} seconds.`);
    }

    // Update localStorage as backup
    localStorageFallback.set('admin_projects', validatedProjects);

    if (!shouldUseFirestore()) {
      return;
    }

    // Check authentication for write operations
    if (!isAuthenticated()) {
      console.warn('User not authenticated. Write operation skipped.');
      return;
    }

    try {
      // Get old projects for audit log
      const oldProjects = await this.getAll();
      
      const batch = [];
      const projectsRef = collection(db, COLLECTIONS.PROJECTS);

      // Get existing projects to delete ones that are removed
      const existingSnapshot = await getDocs(projectsRef);
      const existingIds = new Set(existingSnapshot.docs.map((d) => d.id));
      const newIds = new Set(validatedProjects.map((p) => p.id));

      // Delete removed projects
      for (const id of existingIds) {
        if (!newIds.has(id)) {
          batch.push(deleteDoc(doc(db, COLLECTIONS.PROJECTS, id)));
        }
      }

      // Set/update projects
      for (const project of validatedProjects) {
        const projectRef = doc(db, COLLECTIONS.PROJECTS, project.id);
        const oldProject = oldProjects?.find((p: any) => p.id === project.id);
        
        batch.push(setDoc(projectRef, { ...project }, { merge: true }));

        // Audit log
        if (oldProject) {
          auditProjects.update(project.id, oldProject, project);
        } else {
          auditProjects.create(project.id, project);
        }
      }

      // Audit deleted projects
      const deletedProjects = oldProjects?.filter(
        (old: any) => !validatedProjects.find((p: any) => p.id === old.id)
      ) || [];
      for (const deleted of deletedProjects) {
        auditProjects.delete(deleted.id, deleted);
      }

      await Promise.all(batch);
    } catch (error) {
      console.error('Error setting projects:', error);
      throw error;
    }
  },

  // Add a project
  async add(project: any): Promise<void> {
    const projects = (await this.getAll()) || [];
    projects.push(project);
    await this.setAll(projects);
  },

  // Update a project
  async update(id: string, updates: Partial<any>): Promise<void> {
    const projects = (await this.getAll()) || [];
    const index = projects.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates };
      await this.setAll(projects);
    }
  },

  // Delete a project
  async delete(id: string): Promise<void> {
    // Check rate limiting
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      const resetIn = Math.ceil((rateLimitCheck.resetAt - Date.now()) / 1000);
      throw new Error(`Rate limit exceeded. Please try again in ${resetIn} seconds.`);
    }

    // Get project before deletion for audit log
    const project = await this.getById(id);

    if (!shouldUseFirestore()) {
      const projects = (localStorageFallback.get('admin_projects') || []).filter(
        (p: any) => p.id !== id
      );
      localStorageFallback.set('admin_projects', projects);
      if (project) {
        auditProjects.delete(id, project);
      }
      return;
    }

    // Check authentication for write operations
    if (!isAuthenticated()) {
      console.warn('User not authenticated. Delete operation skipped.');
      return;
    }

    try {
      await deleteDoc(doc(db, COLLECTIONS.PROJECTS, id));
      // Also update localStorage
      const projects = (localStorageFallback.get('admin_projects') || []).filter(
        (p: any) => p.id !== id
      );
      localStorageFallback.set('admin_projects', projects);

      // Audit log
      if (project) {
        auditProjects.delete(id, project);
      }
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
  },

  // Subscribe to real-time updates
  subscribe(callback: (projects: any[]) => void): (() => void) | null {
    if (!shouldUseFirestore()) {
      // For localStorage, we can't have real-time updates
      // Just call once with current data
      const projects = localStorageFallback.get('admin_projects') || [];
      callback(projects);
      return () => {}; // Return empty unsubscribe function
    }

    try {
      const projectsRef = collection(db, COLLECTIONS.PROJECTS);
      const unsubscribe = onSnapshot(projectsRef, (snapshot: QuerySnapshot<DocumentData>) => {
        const projects: any[] = [];
        snapshot.forEach((doc) => {
          projects.push({ id: doc.id, ...doc.data() });
        });
        callback(projects);
        // Also update localStorage as backup
        localStorageFallback.set('admin_projects', projects);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error subscribing to projects:', error);
      return null;
    }
  },
};

/**
 * Translations Service
 */
export const translationsService = {
  // Get translations
  async get(): Promise<any | null> {
    if (!shouldUseFirestore()) {
      return localStorageFallback.get('admin_translations');
    }

    try {
      const translationsRef = doc(db, COLLECTIONS.TRANSLATIONS, 'main');
      const translationsSnap = await getDoc(translationsRef);
      if (translationsSnap.exists()) {
        return translationsSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching translations:', error);
      return localStorageFallback.get('admin_translations');
    }
  },

  // Set translations
  async set(translations: any): Promise<void> {
    // Validate translations
    for (const lang in translations) {
      for (const key in translations[lang]) {
        const validation = validateTranslation(key, translations[lang][key]);
        if (!validation.valid) {
          throw new Error(`Translation validation failed for ${lang}.${key}: ${validation.errors.join(', ')}`);
        }
        // Sanitize value
        translations[lang][key] = sanitizeString(translations[lang][key]);
      }
    }

    // Check rate limiting
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      const resetIn = Math.ceil((rateLimitCheck.resetAt - Date.now()) / 1000);
      throw new Error(`Rate limit exceeded. Please try again in ${resetIn} seconds.`);
    }

    // Get old translations for audit log
    const oldTranslations = await this.get();

    localStorageFallback.set('admin_translations', translations);

    if (!shouldUseFirestore()) {
      // Audit log changes
      if (oldTranslations) {
        for (const lang in translations) {
          for (const key in translations[lang]) {
            const oldValue = oldTranslations[lang]?.[key];
            const newValue = translations[lang][key];
            if (oldValue !== newValue) {
              auditTranslations.update(lang, key, oldValue, newValue);
            }
          }
        }
      }
      return;
    }

    // Check authentication for write operations
    if (!isAuthenticated()) {
      console.warn('User not authenticated. Write operation skipped.');
      return;
    }

    try {
      const translationsRef = doc(db, COLLECTIONS.TRANSLATIONS, 'main');
      await setDoc(translationsRef, translations, { merge: true });

      // Audit log changes
      if (oldTranslations) {
        for (const lang in translations) {
          for (const key in translations[lang]) {
            const oldValue = oldTranslations[lang]?.[key];
            const newValue = translations[lang][key];
            if (oldValue !== newValue) {
              auditTranslations.update(lang, key, oldValue, newValue);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error setting translations:', error);
      throw error;
    }
  },

  // Subscribe to real-time updates
  subscribe(callback: (translations: any) => void): (() => void) | null {
    if (!shouldUseFirestore()) {
      const translations = localStorageFallback.get('admin_translations');
      if (translations) callback(translations);
      return () => {};
    }

    try {
      const translationsRef = doc(db, COLLECTIONS.TRANSLATIONS, 'main');
      const unsubscribe = onSnapshot(translationsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          callback(data);
          localStorageFallback.set('admin_translations', data);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error subscribing to translations:', error);
      return null;
    }
  },
};

/**
 * Constants Service
 */
export const constantsService = {
  // Get constants
  async get(): Promise<any | null> {
    if (!shouldUseFirestore()) {
      return localStorageFallback.get('admin_constants');
    }

    try {
      const constantsRef = doc(db, COLLECTIONS.CONSTANTS, 'main');
      const constantsSnap = await getDoc(constantsRef);
      if (constantsSnap.exists()) {
        return constantsSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching constants:', error);
      return localStorageFallback.get('admin_constants');
    }
  },

  // Set constants
  async set(constants: any): Promise<void> {
    // Validate constants
    for (const key in constants) {
      const validation = validateConstant(key, constants[key]);
      if (!validation.valid) {
        throw new Error(`Constant validation failed for ${key}: ${validation.errors.join(', ')}`);
      }
      // Sanitize value
      constants[key] = sanitizeString(constants[key]);
    }

    // Check rate limiting
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      const resetIn = Math.ceil((rateLimitCheck.resetAt - Date.now()) / 1000);
      throw new Error(`Rate limit exceeded. Please try again in ${resetIn} seconds.`);
    }

    // Get old constants for audit log
    const oldConstants = await this.get();

    localStorageFallback.set('admin_constants', constants);

    if (!shouldUseFirestore()) {
      // Audit log changes
      if (oldConstants) {
        for (const key in constants) {
          const oldValue = oldConstants[key];
          const newValue = constants[key];
          if (oldValue !== newValue) {
            auditConstants.update(key, oldValue, newValue);
          }
        }
      }
      return;
    }

    // Check authentication for write operations
    if (!isAuthenticated()) {
      console.warn('User not authenticated. Write operation skipped.');
      return;
    }

    try {
      const constantsRef = doc(db, COLLECTIONS.CONSTANTS, 'main');
      await setDoc(constantsRef, constants, { merge: true });

      // Audit log changes
      if (oldConstants) {
        for (const key in constants) {
          const oldValue = oldConstants[key];
          const newValue = constants[key];
          if (oldValue !== newValue) {
            auditConstants.update(key, oldValue, newValue);
          }
        }
      }
    } catch (error) {
      console.error('Error setting constants:', error);
      throw error;
    }
  },

  // Subscribe to real-time updates
  subscribe(callback: (constants: any) => void): (() => void) | null {
    if (!shouldUseFirestore()) {
      const constants = localStorageFallback.get('admin_constants');
      if (constants) callback(constants);
      return () => {};
    }

    try {
      const constantsRef = doc(db, COLLECTIONS.CONSTANTS, 'main');
      const unsubscribe = onSnapshot(constantsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          callback(data);
          localStorageFallback.set('admin_constants', data);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error subscribing to constants:', error);
      return null;
    }
  },
};
