import { useEffect, useRef, useState } from 'react';

interface UseIntersectionHoverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionHover = (options: UseIntersectionHoverOptions = {}) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add a small delay to make the transition smoother
        const timeoutId = setTimeout(() => {
          setIsInView(entry.isIntersecting);
        }, 100);

        return () => clearTimeout(timeoutId);
      },
      {
        threshold: options.threshold ?? 0.3,
        rootMargin: options.rootMargin ?? '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options.threshold, options.rootMargin]);

  return { elementRef, isInView };
}; 