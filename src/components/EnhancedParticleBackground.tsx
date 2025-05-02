
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

  // Base config that all variants build upon
  const baseConfig = {
    fullScreen: false,
    fpsLimit: 60,
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
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#10B981",
      },
      links: {
        color: "#4b5563",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: density,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  // Variant-specific configurations
  const variantConfigs = {
    home: {
      particles: {
        color: {
          value: "#10B981",
        },
        links: {
          color: "#4b5563",
          opacity: 0.3,
        },
        move: {
          direction: "top",
          speed: 0.8,
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
          speed: 0.5,
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
          value: "#8b5cf6",
        },
        links: {
          color: "#4b5563",
          opacity: 0.2,
        },
        move: {
          speed: 0.7,
        },
      },
    },
    techStack: {
      particles: {
        color: {
          value: "#10B981",
        },
        links: {
          color: "#10B981",
          opacity: 0.2,
        },
        move: {
          speed: 0.6,
          direction: "none",
        },
      },
    },
    contact: {
      particles: {
        color: {
          value: "#10B981",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.4,
        },
        size: {
          value: { min: 1, max: 4 },
        },
        move: {
          speed: 0.5,
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
          value: 0.7,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          }
        },
        size: {
          value: { min: 1, max: 2 },
          random: true,
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 1,
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
          options={mergedConfig as any}
          className="h-full w-full"
        />
      )}
    </div>
  );
};

export default EnhancedParticleBackground;
