
import { useEffect, useState, ReactNode } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // Multiplier for scroll speed (0.5 = half speed, 2 = double speed)
  direction?: 'up' | 'down';
  className?: string;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = ''
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const rate = scrollTop * speed;
      const yPos = direction === 'up' ? -rate : rate;
      setOffset(yPos);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div 
      className={`transform-gpu ${className}`}
      style={{ 
        transform: `translate3d(0, ${offset}px, 0)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxLayer;
