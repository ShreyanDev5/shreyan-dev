
import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  shape: 'circle' | 'hexagon' | 'square';
}

interface TechParticlesProps {
  count?: number;
  color?: string[] | string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  opacity?: number;
  interactive?: boolean;
  shapes?: ('circle' | 'hexagon' | 'square')[];
}

const TechParticles: React.FC<TechParticlesProps> = ({
  count = 50,
  color = ['#00FFFF', '#39FF14', '#FFFFFF'],
  minSize = 1,
  maxSize = 3,
  speed = 0.3,
  opacity = 0.4,
  interactive = true,
  shapes = ['circle', 'hexagon'],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Adjust particle count for mobile
  const effectiveCount = isMobile ? Math.floor(count / 2) : count;
  
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < effectiveCount; i++) {
      const colorOption = Array.isArray(color) 
        ? color[Math.floor(Math.random() * color.length)]
        : color;
      
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.2 + opacity,
        color: colorOption,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
    
    // Draw a hexagon
    const drawHexagon = (x: number, y: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const pointX = x + size * Math.cos(angle);
        const pointY = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
    };
    
    // Draw a square
    const drawSquare = (x: number, y: number, size: number) => {
      ctx.rect(x - size / 2, y - size / 2, size, size);
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first (lines between nearby particles)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw lines between particles that are close to each other
          const maxDistance = 150;
          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(255,255,255,${0.1 * (1 - distance / maxDistance)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Handle edge cases (wrap around)
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Interactive - particles repel from mouse
        if (interactive && isHovering) {
          const dx = particle.x - mousePosition.x;
          const dy = particle.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Repel if close to mouse
          if (distance < 100) {
            const force = (100 - distance) / 100;
            const angle = Math.atan2(dy, dx);
            particle.x += Math.cos(angle) * force;
            particle.y += Math.sin(angle) * force;
          }
        }
        
        // Draw particle
        ctx.fillStyle = `${particle.color}${Math.round(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        
        // Draw different shapes
        switch (particle.shape) {
          case 'hexagon':
            drawHexagon(particle.x, particle.y, particle.size * 2);
            break;
          case 'square':
            drawSquare(particle.x, particle.y, particle.size * 2);
            break;
          default:
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        }
        
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsHovering(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [dimensions, color, effectiveCount, minSize, maxSize, speed, opacity, interactive, shapes, isHovering, mousePosition, isMobile]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
      style={{ display: dimensions.width ? 'block' : 'none' }}
      role="presentation"
    />
  );
};

export default TechParticles;
