import { useState, useEffect } from 'react';

/**
 * A custom React hook that debounces a value.
 * It's useful for delaying the execution of an effect, like an API call for a search query.
 * @param value The value to debounce (e.g., the search term).
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}