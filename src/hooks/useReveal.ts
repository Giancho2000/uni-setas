import { useEffect, useRef, useState, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

const canObserve = () => typeof window !== 'undefined' && 'IntersectionObserver' in window;

/**
 * Reveals an element the first time it enters the viewport.
 * Without IntersectionObserver or with reduced motion, it is revealed from the start.
 */
export function useReveal<T extends Element>(): { ref: RefObject<T>; isRevealed: boolean } {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const [intersected, setIntersected] = useState(() => !canObserve());
  const isRevealed = intersected || reducedMotion;

  useEffect(() => {
    const element = ref.current;
    if (isRevealed || !element) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [isRevealed]);

  return { ref, isRevealed };
}
