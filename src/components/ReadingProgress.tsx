
import { useEffect, useState } from 'react';

interface ReadingProgressProps {
  target?: string; // CSS selector for the content to track
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ target = '#blog' }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const targetElement = document.querySelector(target);
        if (!targetElement) {
          ticking = false;
          return;
        }

        const rect = targetElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Show progress only when the blog section is visible
        const isInView = rect.top < windowHeight && rect.bottom > 0;
        setIsVisible(isInView);

        if (isInView) {
          // Calculate progress based on how much of the blog section has been scrolled through
          const elementHeight = rect.height;
          const viewportTop = Math.max(0, -rect.top);
          const viewportBottom = Math.min(elementHeight, windowHeight - rect.top);
          const visibleHeight = Math.max(0, viewportBottom - viewportTop);
          
          // Calculate progress as the percentage of the element that has passed the top of viewport
          let progressPercent = 0;
          if (rect.top <= 0) {
            // Element has started scrolling past the top
            const scrolledDistance = Math.abs(rect.top);
            const totalScrollDistance = elementHeight - windowHeight;
            
            if (totalScrollDistance > 0) {
              progressPercent = Math.min(100, Math.max(0, (scrolledDistance / totalScrollDistance) * 100));
            }
          }
          
          setProgress(progressPercent);
        } else {
          // Reset progress when not in view
          setProgress(0);
        }
        
        ticking = false;
      });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [target]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-gray-800/30 backdrop-blur-sm">
      <div 
        className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 transition-all duration-150 ease-out"
        style={{ 
          width: `${progress}%`,
          willChange: 'width'
        }}
      />
    </div>
  );
};

export default ReadingProgress;
