
import { useEffect, useState } from 'react';

interface ReadingProgressProps {
  target?: string; // CSS selector for the content to track
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ target = '#blog' }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const targetElement = document.querySelector(target);
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Show progress when section is in view
      const isInView = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(isInView);

      if (isInView) {
        // Calculate progress based on how much of the section has been scrolled through
        const scrollIntoView = Math.max(0, scrollTop + windowHeight - elementTop);
        const totalScrollable = elementHeight + windowHeight;
        const progressPercent = Math.min(100, (scrollIntoView / totalScrollable) * 100);
        setProgress(progressPercent);
      }
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
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
