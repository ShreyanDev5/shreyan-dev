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
  density = 48,  // Reduced for better performance
  shapes = ["circle"] // Default shape
}: EnhancedParticleBackgroundProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      // First try the slim version for better performance
      await loadSlim(engine);
      setIsLoading(false);
      setInitialized(true);
    } catch (error) {
      console.log("Falling back to full tsparticles", error);
      // Fallback to full version if slim fails
      await loadFull(engine);
      setIsLoading(false);
      setInitialized(true);
    }
  }, []);

  // Base config that all variants build upon - optimized for performance
  const baseConfig = {
    fullScreen: false,
    fpsLimit: 30, // Reduced for better performance
    particles: {
      color: {
        value: ["#10b981", "#38bdf8", "#7c3aed"], // Multi-color particles
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
        speed: 0.6, // Slower for better performance
        straight: false,
        parallax: true, // Enable parallax effect
      },
      number: {
        density: {
          enable: true,
          area: 1200, // Increased area for lower density
        },
        value: density,
      },
      opacity: {
        value: 0.4,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.2,
          sync: false,
        }
      },
      shape: {
        type: shapes,
      },
      size: {
        value: { min: 1, max: 2.5 }, // Slightly smaller particles
      },
      glow: {
        enable: true,
        frequency: 1,
        intensity: 2,
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
          parallax: {
            enable: true,
            force: 30,
            smooth: 20
          }
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
    smooth: true, // Enable smooth animations
  };

  // Variant-specific configurations
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
          value: ["#00FFFF", "#39FF14", "#7c3aed"], // Neon blue, green and purple
        },
        links: {
          color: "#4b5563",
          opacity: 0.2,
        },
        move: {
          direction: "top",
          speed: 0.4,
        },
      },
    },
    about: {
      particles: {
        color: {
          value: ["#10b981", "#7c3aed", "#38bdf8"], // Emerald, Purple, and Blue
        },
        links: {
          enable: true,
          color: "#38bdf8",
          distance: 150,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          speed: 0.3,
          random: false,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },
        shape: {
          type: ["circle"],
        },
        size: {
          value: { min: 1, max: 2.5 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.5,
            sync: false,
          }
        },
        opacity: {
          value: 0.5,
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.3,
            sync: false,
          }
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 40,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
            parallax: {
              enable: true,
              force: 20,
              smooth: 10
            }
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
    },
    projects: {
      particles: {
        color: {
          value: ["#7c3aed", "#38bdf8"], // Purple and blue
        },
        links: {
          color: "#4b5563",
          opacity: 0.15,
        },
        move: {
          speed: 0.4,
        },
      },
    },
    techStack: {
      particles: {
        color: {
          value: ["#10b981", "#38bdf8"], // Emerald and blue
        },
        links: {
          color: "#38bdf8",
          opacity: 0.15,
        },
        move: {
          speed: 0.4,
          direction: "none",
        },
      },
    },
    contact: {
      particles: {
        color: {
          value: ["#10b981", "#38bdf8"],
        },
        shape: {
          type: ["circle"],
        },
        opacity: {
          value: 0.3,
        },
        size: {
          value: { min: 1, max: 2 },
        },
        move: {
          speed: 0.3,
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
          value: ["#38bdf8", "#7c3aed", "#ffffff"],
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
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.1,
            sync: false,
          }
        },
        size: {
          value: { min: 0.8, max: 1.5 },
          random: true,
        },
      },
    },
  };

  // Merge base config with variant config
  const config = {
    ...baseConfig,
    particles: {
      ...baseConfig.particles,
      ...(variantConfigs[variant]?.particles || {}),
    },
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Particles
        id={`particles-${variant}`}
        init={particlesInit}
        options={config}
        className="w-full h-full"
      />
    </div>
  );
};

export default EnhancedParticleBackground;
