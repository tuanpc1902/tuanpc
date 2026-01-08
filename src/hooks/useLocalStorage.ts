import { useState, useEffect, useCallback, useRef } from 'react';
import type { StorageValue } from '~alias~/lib/types';
import { getStorageItem, setStorageItem } from '~alias~/lib/utils/storageHelpers';

/**
 * Custom hook for localStorage with React state synchronization
 * Supports both string and JSON values
 * Handles storage events from other tabs/windows
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: StorageValue<T>) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = getStorageItem<T>(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`[useLocalStorage] Error reading initial value for key "${key}":`, error);
      return initialValue;
    }
  });

  const keyRef = useRef(key);
  const initialValueRef = useRef(initialValue);

  // Update refs when props change
  useEffect(() => {
    keyRef.current = key;
    initialValueRef.current = initialValue;
  }, [key, initialValue]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== keyRef.current || e.newValue === null) {
        return;
      }

      try {
        const newValue = getStorageItem<T>(keyRef.current);
        if (newValue !== null) {
          setStoredValue(newValue);
        }
      } catch (error) {
        console.error(`[useLocalStorage] Error handling storage change for key "${keyRef.current}":`, error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Set value function with error handling
  const setValue = useCallback((value: StorageValue<T>) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      
      setStoredValue(valueToStore);
      setStorageItem(keyRef.current, valueToStore);
    } catch (error) {
      console.error(`[useLocalStorage] Error setting value for key "${keyRef.current}":`, error);
    }
  }, [storedValue]);

  return [storedValue, setValue];
}
