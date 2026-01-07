import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook để quản lý localStorage với type safety và sync giữa các tabs
 * Hỗ trợ JSON serialization/deserialization tự động
 * Fix hydration mismatch bằng cách luôn dùng initialValue trên server và client lần đầu
 * @param key - Key trong localStorage
 * @param initialValue - Giá trị mặc định nếu không tìm thấy
 * @returns [storedValue, setValue] - Giá trị và function để set giá trị
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Luôn dùng initialValue cho lần render đầu tiên (cả server và client)
  // Để tránh hydration mismatch
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isMounted, setIsMounted] = useState(false);

  // Load từ localStorage sau khi component đã mount (chỉ trên client)
  useEffect(() => {
    setIsMounted(true);
    
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return;
      }

      // Try to parse as JSON first, fallback to string
      try {
        const parsed = JSON.parse(item) as T;
        setStoredValue(parsed);
      } catch {
        // If not valid JSON, return as string (for backward compatibility)
        setStoredValue(item as T);
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Sync với localStorage khi có thay đổi từ tab khác
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          try {
            const parsed = JSON.parse(e.newValue);
            setStoredValue(parsed as T);
          } catch {
            setStoredValue(e.newValue as T);
          }
        } catch (error) {
          console.error(`Error syncing localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  // Function để set giá trị
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Cho phép value là function giống useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        // Serialize to JSON for complex types, string for primitives
        const serialized = typeof valueToStore === 'string' 
          ? valueToStore 
          : JSON.stringify(valueToStore);
        window.localStorage.setItem(key, serialized);
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

