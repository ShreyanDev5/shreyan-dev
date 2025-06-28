
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
        const elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        // Show progress when section starts to come into view
        const isInView = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
        setIsVisible(isInView);

        if (isInView) {
          // Calculate progress more accurately - start when section is 20% visible
          const startPoint = elementTop - (windowHeight * 0.8);
          const endPoint = elementTop + elementHeight - (windowHeight * 0.2);
          const totalScrollDistance = endPoint - startPoint;
          
          const currentProgress = Math.max(0, scrollTop - startPoint);
          const progressPercent = Math.min(100, Math.max(0, (currentProgress / totalScrollDistance) * 100));
          
          setProgress(progressPercent);
        }
        
        ticking = false;
      });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
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
