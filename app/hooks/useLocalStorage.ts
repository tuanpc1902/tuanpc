import { useState, useEffect } from 'react';

/**
 * Custom hook để quản lý localStorage với type safety
 * @param key - Key trong localStorage
 * @param initialValue - Giá trị mặc định nếu không tìm thấy
 * @returns [storedValue, setValue] - Giá trị và function để set giá trị
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State để lưu giá trị
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Function để set giá trị
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Cho phép value là function giống useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

