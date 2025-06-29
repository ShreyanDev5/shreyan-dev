
import { useEffect, useState } from "react";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { useCallback } from "react";

type ParticleVariant = 
  | "default" 
  | "home" 
  | "about" 
  | "projects" 
  | "techStack" 
  | "contact"
  | "blog";

type ParticleShape = "square" | "circle" | "hexagon";

interface EnhancedParticleBackgroundProps {
  variant?: ParticleVariant;
  density?: number;
  shapes?: ParticleShape[];
}

const EnhancedParticleBackground = ({ 
  variant = "default",
  density = 48,
  shapes = ["circle"]
}: EnhancedParticleBackgroundProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      await loadSlim(engine);
      setIsLoading(false);
      setInitialized(true);
    } catch (error) {
      console.log("Falling back to full tsparticles", error);
      await loadFull(engine);
      setIsLoading(false);
      setInitialized(true);
    }
  }, []);

  // Base config optimized to prevent blinking
  const baseConfig = {
    fullScreen: false,
    fpsLimit: 30,
    particles: {
      color: {
        value: ["#10b981", "#38bdf8", "#7c3aed"],
      },
      links: {
        color: "#4b5563",
        distance: 150,
        enable: true,
        opacity: 0.15,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 0.08, // Very slow speed
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1200,
        },
        value: density,
      },
      opacity: {
        value: 0.3, // Reduced opacity to prevent flickering
        animation: {
          enable: false, // Disable opacity animation to prevent blinking
        }
      },
      shape: {
        type: shapes,
      },
      size: {
        value: { min: 1, max: 2.5 },
        animation: {
          enable: false, // Disable size animation to prevent blinking
        }
      },
    },
    interactivity: {
      detectsOn: "window" as const,
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
          quantity: 2,
        },
        repulse: {
          distance: 80,
          duration: 0.4,
        },
      },
    },
    detectRetina: false,
  };

  // Variant-specific configurations with stable settings
  const variantConfigs: Record<ParticleVariant, any> = {
    default: {
      particles: {
        color: {
          value: ["#10b981", "#38bdf8", "#7c3aed"],
        },
      },
    },
    home: {
      particles: {
        color: {
          value: ["#00FFFF", "#39FF14", "#7c3aed"],
        },
        move: {
          speed: 0.06,
        },
      },
    },
    about: {
      particles: {
        color: {
          value: ["#10b981", "#7c3aed", "#38bdf8"],
        },
        links: {
          enable: true,
          color: "#38bdf8",
          distance: 120,
          opacity: 0.1,
          width: 1,
        },
        move: {
          speed: 0.04, // Very slow for about section
        },
        opacity: {
          value: 0.25, // Lower opacity for about section
          animation: {
            enable: false,
          }
        },
        size: {
          value: { min: 1, max: 2 },
          animation: {
            enable: false,
          }
        },
      },
    },
    projects: {
      particles: {
        color: {
          value: ["#7c3aed", "#38bdf8"],
        },
        move: {
          speed: 0.06,
        },
      },
    },
    techStack: {
      particles: {
        color: {
          value: ["#10b981", "#38bdf8"],
        },
        move: {
          speed: 0.04, // Very slow for tech stack section
        },
        opacity: {
          value: 0.25, // Lower opacity for tech stack section
          animation: {
            enable: false,
          }
        },
      },
    },
    contact: {
      particles: {
        color: {
          value: ["#10b981", "#38bdf8"],
        },
        move: {
          speed: 0.04,
        },
        links: {
          enable: false,
        },
        opacity: {
          value: 0.2,
          animation: {
            enable: false,
          }
        },
      },
    },
    blog: {
      particles: {
        color: {
          value: ["#38bdf8", "#7c3aed", "#ffffff"],
        },
        links: {
          enable: false,
        },
        move: {
          speed: 0.03,
        },
        opacity: {
          value: 0.3,
          animation: {
            enable: false,
          }
        },
      },
    },
  };

  // Merge configs with stable settings
  const config = {
    ...baseConfig,
    particles: {
      ...baseConfig.particles,
      ...(variantConfigs[variant]?.particles || {}),
    },
  };

  if (!initialized) {
    return null; // Don't render until initialized to prevent flashing
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'auto' }}>
      <Particles
        id={`particles-${variant}`}
        init={particlesInit}
        options={config}
        className="w-full h-full"
        style={{ position: 'absolute' }}
      />
    </div>
  );
};

export default EnhancedParticleBackground;
