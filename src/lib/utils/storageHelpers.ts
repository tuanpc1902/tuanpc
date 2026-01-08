/**
 * Safely gets an item from localStorage
 */
export function getStorageItem<T>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item) as T;
    } catch {
      // If JSON.parse fails, return as string
      return item as T;
    }
  } catch (error) {
    console.error(`[getStorageItem] Error reading localStorage key "${key}":`, error);
    return null;
  }
}

/**
 * Safely sets an item to localStorage
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const serialized = typeof value === 'string' 
      ? value 
      : JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`[setStorageItem] Error setting localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Safely removes an item from localStorage
 */
export function removeStorageItem(key: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[removeStorageItem] Error removing localStorage key "${key}":`, error);
    return false;
  }
}
