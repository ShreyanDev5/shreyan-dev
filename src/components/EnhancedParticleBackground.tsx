
import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

type ParticleVariant = 
  | "default" 
  | "home" 
  | "about" 
  | "projects" 
  | "techStack" 
  | "contact"
  | "blog";

interface EnhancedParticleBackgroundProps {
  variant?: ParticleVariant;
  density?: number;
}

const EnhancedParticleBackground = ({ 
  variant = "default",
  density = 60 
}: EnhancedParticleBackgroundProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
    setIsLoading(false);
  };

  // Base config that all variants build upon - optimized for performance
  const baseConfig = {
    fullScreen: false,
    fpsLimit: 30, // Reduced for better performance
    particles: {
      color: {
        value: "#64ffda", // Updated emerald color
      },
      links: {
        color: "#4b5563",
        distance: 150,
        enable: true,
        opacity: 0.2, // Reduced for better performance
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 0.8, // Reduced for better performance
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1000, // Increased area for lower density
        },
        value: density,
      },
      opacity: {
        value: 0.4,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 2.5 }, // Slightly smaller particles
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 2, // Reduced for better performance
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    detectRetina: false, // Disabled for better performance
  };

  // Variant-specific configurations
  const variantConfigs: Record<ParticleVariant, any> = {
    home: {
      particles: {
        color: {
          value: "#64ffda", // Updated emerald color
        },
        links: {
          color: "#4b5563",
          opacity: 0.2,
        },
        move: {
          direction: "top",
          speed: 0.6,
        },
      },
    },
    about: {
      particles: {
        color: {
          value: "#4b5563",
        },
        links: {
          enable: false,
        },
        move: {
          direction: "none",
          speed: 0.4,
          random: true,
        },
        shape: {
          type: "circle",
        },
      },
    },
    projects: {
      particles: {
        color: {
          value: "#a855f7", // Updated purple color
        },
        links: {
          color: "#4b5563",
          opacity: 0.15,
        },
        move: {
          speed: 0.5,
        },
      },
    },
    techStack: {
      particles: {
        color: {
          value: "#64ffda", // Updated emerald color
        },
        links: {
          color: "#64ffda", // Updated emerald color
          opacity: 0.15,
        },
        move: {
          speed: 0.5,
          direction: "none",
        },
      },
    },
    contact: {
      particles: {
        color: {
          value: "#64ffda", // Updated emerald color
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.3,
        },
        size: {
          value: { min: 1, max: 3 },
        },
        move: {
          speed: 0.4,
          direction: "none",
          random: true,
        },
        links: {
          enable: false,
        },
      },
    },
    blog: {
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          enable: false,
        },
        move: {
          direction: "none",
          speed: 0.2,
          random: true,
        },
        opacity: {
          value: 0.5, // Reduced opacity
          random: true,
          anim: {
            enable: true,
            speed: 0.8, // Slower animation for better performance
            opacity_min: 0.1,
            sync: false,
          }
        },
        size: {
          value: { min: 0.8, max: 1.5 }, // Smaller for better performance
          random: true,
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.03, // Reduced frequency for better performance
            opacity: 0.8,
          },
        },
      },
    },
    default: {},
  };

  // Merge base config with variant-specific overrides
  const mergedConfig = {
    ...baseConfig,
    ...variantConfigs[variant],
    particles: {
      ...baseConfig.particles,
      ...(variantConfigs[variant]?.particles || {}),
    },
    interactivity: {
      ...baseConfig.interactivity,
      ...(variantConfigs[variant]?.interactivity || {}),
    },
  };

  return (
    <div 
      className={`absolute inset-0 z-0`} 
      aria-hidden="true"
    >
      {!isLoading && (
        <Particles
          id={`tsparticles-${variant}`}
          init={particlesInit}
          options={mergedConfig}
          className="h-full w-full"
        />
      )}
    </div>
  );
};

export default EnhancedParticleBackground;
