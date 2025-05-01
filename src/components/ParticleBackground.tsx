
import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  // New properties for interactive behavior
  originX: number;
  originY: number;
  isRepulsed: boolean;
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
    
    const particles: Particle[] = [];
    const particleCount = Math.min(window.innerWidth / 16, 80); // Increased density
    const proximityThreshold = 150; // Maximum distance for line connection
    const repulseDistance = 100; // Distance for repulsion effect
    
    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;
    
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
      
      // Reset after a while to avoid permanent repulsion
      setTimeout(() => {
        mouseActive = false;
      }, 300);
    };
    
    const handleClick = (e: MouseEvent) => {
      // Add 4 new particles on click
      for (let i = 0; i < 4; i++) {
        createParticle(e.clientX, e.clientY);
      }
    };
    
    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 2 + 0.8;
      const speedX = (Math.random() - 0.5) * 0.2;
      const speedY = (Math.random() - 0.5) * 0.2;
      
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        size,
        speedX,
        speedY,
        opacity: Math.random() * 0.4 + 0.3, // Higher opacity for better visibility
        isRepulsed: false
      });
    };
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    }
    
    // Add mouse event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connecting lines first (so they appear behind particles)
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < proximityThreshold) {
            const opacity = (1 - distance / proximityThreshold) * 0.2; // Smooth opacity transition
            ctx.beginPath();
            ctx.strokeStyle = `rgba(224, 247, 255, ${opacity})`;
            ctx.lineWidth = 0.4; // Thinner, more delicate lines
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      // Draw and update particles
      particles.forEach(particle => {
        // Apply repulsion effect if mouse is close
        if (mouseActive) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < repulseDistance) {
            // Calculate repulsion force (stronger when closer)
            const force = (repulseDistance - distance) / repulseDistance;
            const directionX = dx / distance || 0;
            const directionY = dy / distance || 0;
            
            // Apply opposite force (repulsion)
            particle.x -= directionX * force * 2;
            particle.y -= directionY * force * 2;
            particle.isRepulsed = true;
            
            // Add some additional velocity
            particle.speedX -= directionX * force * 0.2;
            particle.speedY -= directionY * force * 0.2;
          }
        }
        
        // Normal movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // If repulsed, gradually return to normal speed
        if (particle.isRepulsed) {
          particle.speedX *= 0.98;
          particle.speedY *= 0.98;
          if (Math.abs(particle.speedX) < 0.02 && Math.abs(particle.speedY) < 0.02) {
            particle.isRepulsed = false;
          }
        }
        
        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Create gradient for particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        gradient.addColorStop(0, `rgba(224, 247, 255, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(224, 247, 255, 0)');
        
        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-auto"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
