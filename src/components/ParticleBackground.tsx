
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
    
    // Create particles with enhanced specifications for better visual feel
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.max(window.innerWidth / 10, 50), 120); // Optimized count
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3, // Slightly larger particles for better visibility
        speedX: (Math.random() - 0.5) * 0.15, // Slower, more elegant movement
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.08 + 0.02, // Lower opacity range for subtlety
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.008 + 0.001 // Slower pulsing for sophistication
      });
    }
    
    const animate = () => {
      // Clear with slight trail for smooth effect
      ctx.fillStyle = 'rgba(0, 0, 51, 0.008)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Enhanced pulsing effect
        particle.pulse += particle.pulseSpeed;
        const opacityShift = Math.sin(particle.pulse) * 0.04;
        const currentOpacity = Math.max(0.01, Math.min(0.12, particle.opacity + opacityShift));
        
        // Wrap around edges smoothly
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        
        // Enhanced particle rendering with softer gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, `rgba(224, 247, 255, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(224, 247, 255, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(224, 247, 255, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
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
      {/* Enhanced vertical neo gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-electric-300 via-electric-500 to-navy-900 opacity-90 pointer-events-none z-[-2]" />
      
      {/* Improved radial glow effect */}
      <div className="fixed inset-0 bg-electric-glow opacity-70 pointer-events-none z-[-1]" />
      
      {/* Ultra-subtle noise texture overlay */}
      <div className="fixed inset-0 bg-noise-texture opacity-[0.03] mix-blend-overlay pointer-events-none z-[-1]" />
      
      {/* Enhanced particle canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
};

export default ParticleBackground;
