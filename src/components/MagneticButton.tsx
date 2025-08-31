
import React, { useRef, useEffect, memo, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = memo(({ 
  children, 
  strength = 0.3,
  className = ''
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Memoized mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    // Use requestAnimationFrame for smoother animation
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
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
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Cancel any pending animation frame
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    // Smoothly return to original position
    button.style.transform = 'translate3d(0, 0, 0)';
  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      
      // Clean up requestAnimationFrame
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div 
      ref={buttonRef} 
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
});

export default MagneticButton;
