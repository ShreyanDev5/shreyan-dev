import { useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add a small delay to make the transition smoother
        const timeoutId = setTimeout(() => {
          setIsInView(entry.isIntersecting);
        }, 50); // Reduced delay for more responsive feel

        return () => clearTimeout(timeoutId);
      },
      {
        threshold: options.threshold ?? 0.3,
        rootMargin: options.rootMargin ?? '0px',
      }
    );

    // Touch event handlers
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

    // Scroll event handler for smoother mobile experience
    const handleScroll = () => {
      if (isTouching) return; // Skip if we're handling touch events
      
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      // Only update if the visibility state has changed
      if (isVisible !== isInView) {
        setIsInView(isVisible);
      }
      
      lastScrollY.current = window.scrollY;
    };

    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll, { passive: true });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [options.threshold, options.rootMargin, isInView, isTouching]);

  return { elementRef, isInView };
}; 