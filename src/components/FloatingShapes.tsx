
import { useEffect, useState } from 'react';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  type: 'circle' | 'square' | 'triangle';
}

interface FloatingShapesProps {
  count?: number;
  section?: 'projects' | 'contact' | 'blog';
}

const FloatingShapes: React.FC<FloatingShapesProps> = ({ 
  count = 5, 
  section = 'projects' 
}) => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  // Color schemes for different sections
  const colorSchemes = {
    projects: ['bg-purple-500/10', 'bg-blue-500/10', 'bg-teal-500/10'],
    contact: ['bg-emerald-500/10', 'bg-cyan-500/10', 'bg-green-500/10'],
    blog: ['bg-indigo-500/10', 'bg-purple-500/10', 'bg-blue-500/10']
  };

  useEffect(() => {
    // Initialize shapes
    const initialShapes: Shape[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 40,
      rotation: Math.random() * 360,
      speed: 0.1 + Math.random() * 0.2,
      type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as Shape['type']
    }));
    
    setShapes(initialShapes);
  }, [count]);

  useEffect(() => {
    const animateShapes = () => {
      setShapes(prev => prev.map(shape => ({
        ...shape,
        rotation: shape.rotation + shape.speed,
        y: shape.y + shape.speed * 0.1
      })));
    };

    const interval = setInterval(animateShapes, 50);
    return () => clearInterval(interval);
  }, []);

  const renderShape = (shape: Shape) => {
    const colors = colorSchemes[section];
    const color = colors[shape.id % colors.length];
    
    const baseClasses = `absolute ${color} transition-all duration-1000 ease-in-out`;
    
    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} rounded-full`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        );
      case 'square':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} rounded-lg`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            key={shape.id}
            className={`${baseClasses}`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid`,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map(renderShape)}
    </div>
  );
};

export default FloatingShapes;
