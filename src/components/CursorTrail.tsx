
import { useEffect, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const CursorTrail = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationId: number;
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++
      };

      setTrail(prev => [...prev.slice(-8), newPoint]); // Keep only last 9 points
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]);
    };

    const updateTrail = () => {
      setTrail(prev => prev.map((point, index) => ({
        ...point,
        // Gradually fade and shrink older points
      })));
      animationId = requestAnimationFrame(updateTrail);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationId = requestAnimationFrame(updateTrail);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-purple-400"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (index + 1) / trail.length * 0.6,
            transform: `scale(${(index + 1) / trail.length})`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
