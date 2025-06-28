
import React, { useRef, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  strength = 0.3,
  className = ''
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 100; // Maximum distance for magnetic effect
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const moveX = deltaX * force * strength;
        const moveY = deltaY * force * strength;
        
        button.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate3d(0, 0, 0)';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div 
      ref={buttonRef} 
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
