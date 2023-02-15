import { useEffect } from 'react';

export function useKeyDown(key, callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === key) {
        callback();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
}
