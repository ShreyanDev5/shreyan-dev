
import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create particles with updated specifications
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.max(window.innerWidth / 10, 60), 150); // Reduced count for subtlety
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.2, // Smaller particles
        speedX: (Math.random() - 0.5) * 0.2, // Slower movement
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.08 + 0.02, // Lower opacity range (0.02-0.1)
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.01 + 0.002 // Slower pulsing
      });
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 51, 0.01)'; // Very subtle trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Smoother pulsing
        particle.pulse += particle.pulseSpeed;
        const opacityShift = Math.sin(particle.pulse) * 0.03;
        const currentOpacity = particle.opacity + opacityShift;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Softer particle rendering with gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `rgba(224, 247, 255, ${currentOpacity})`);
        gradient.addColorStop(1, 'rgba(224, 247, 255, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <>
      {/* Neo gradient background */}
      <div className="fixed inset-0 bg-neo-gradient opacity-90 pointer-events-none z-[-2]" />
      
      {/* Radial glow overlay */}
      <div className="fixed inset-0 bg-neo-glow opacity-60 pointer-events-none z-[-1]" />
      
      {/* Particle canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
};

export default ParticleBackground;
