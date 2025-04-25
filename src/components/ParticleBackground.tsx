
import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
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
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.max(window.innerWidth / 8, 80), 200); // Responsive particle count
    const colors = ['#E0F7FF', '#FFFFFF', '#C9F0FF', '#99DFFF'];
    
    for (let i = 0; i < particleCount; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // Slightly larger particles
        speedX: (Math.random() - 0.5) * 0.3, // Slower movement
        speedY: (Math.random() - 0.5) * 0.3,
        color: colors[colorIndex],
        opacity: Math.random() * 0.12 + 0.05, // Lower opacity for subtlety
        pulse: 0,
        pulseSpeed: Math.random() * 0.02 + 0.005 // Controls the pulse speed
      });
    }
    
    // Animation function
    const animate = () => {
      // Soft clear
      ctx.fillStyle = 'rgba(0, 0, 51, 0.02)'; // Very subtle trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Pulsate opacity
        particle.pulse += particle.pulseSpeed;
        const opacityShift = Math.sin(particle.pulse) * 0.05;
        const currentOpacity = particle.opacity + opacityShift;
        
        // Wrap around canvas edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle with glow effect
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `rgba(224, 247, 255, ${currentOpacity})`);
        gradient.addColorStop(1, `rgba(224, 247, 255, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw bright center
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 1.5})`;
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw connections between nearby particles very subtly
      ctx.strokeStyle = 'rgba(224, 247, 255, 0.03)';
      ctx.lineWidth = 0.5;
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(224, 247, 255, ${0.03 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
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
      <div className="fixed inset-0 bg-neo-gradient pointer-events-none z-[-2]"></div>
      <div className="fixed inset-0 bg-neo-glow pointer-events-none z-[-1]"></div>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
};

export default ParticleBackground;
