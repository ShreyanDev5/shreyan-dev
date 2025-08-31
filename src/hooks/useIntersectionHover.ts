import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionHoverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionHover = (options: UseIntersectionHoverOptions = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const rafId = useRef<number | null>(null);

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    const element = elementRef.current;
    if (!element || isTouching) return;

    // Use requestAnimationFrame for smoother scrolling
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      // Only update if the visibility state has changed
      if (isVisible !== isInView) {
        setIsInView(isVisible);
      }
      
      lastScrollY.current = window.scrollY;
    });
  }, [isInView, isTouching]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Optimized Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Use requestAnimationFrame for smoother transitions
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
        
        rafId.current = requestAnimationFrame(() => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: options.threshold ?? 0.3,
        rootMargin: options.rootMargin ?? '0px',
      }
    );

    // Touch event handlers with passive option for better performance
    const handleTouchStart = (e: TouchEvent) => {
      setIsTouching(true);
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;
      
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - touchStartY.current;
      
      // If we're scrolling (not just touching), update the view state
      if (Math.abs(deltaY) > 5) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInView(isVisible);
      }
    };

    const handleTouchEnd = () => {
      setIsTouching(false);
    };

    // Add event listeners with passive option for better performance
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      
      // Clean up requestAnimationFrame
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [options.threshold, options.rootMargin, handleScroll, isTouching]);

  return { elementRef, isInView };
}; 