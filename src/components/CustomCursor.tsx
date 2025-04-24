
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show cursor after a delay to prevent initial animation from wrong position
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y);
      const computedStyle = hoveredElement ? getComputedStyle(hoveredElement) : null;
      const cursorStyle = computedStyle ? computedStyle.cursor : null;
      
      setIsPointer(cursorStyle === "pointer");
    };
    
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousemove", updateCursorType);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousemove", updateCursorType);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mousePosition.x, mousePosition.y]);

  // Only render on desktop
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  return (
    <div className="cursor-container" style={{ opacity: isVisible ? 1 : 0 }}>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isPointer ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          stiffness: 800,
          damping: 30,
          ease: "easeOut"
        }}
        style={{
          backgroundColor: isActive ? "#007bff" : "#fff",
        }}
      />
      
      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.8 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          stiffness: 400,
          damping: 30,
          ease: "easeOut"
        }}
      />
    </div>
  );
};

export default CustomCursor;
