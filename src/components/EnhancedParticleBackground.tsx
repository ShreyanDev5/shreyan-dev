
import { useEffect, useState, memo } from "react";
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
  const [initialized, setInitialized] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      await loadSlim(engine);
      // Add a small delay to ensure smooth initialization
      setTimeout(() => setInitialized(true), 100);
    } catch (error) {
      console.log("Falling back to full tsparticles", error);
      await loadFull(engine);
      setTimeout(() => setInitialized(true), 100);
    }
  }, []);

  // Stable base config with no animations that could cause flickering
  const baseConfig = {
    fullScreen: false,
    fpsLimit: 30, // Reduced FPS for better performance
    particles: {
      color: {
        value: ["#10b981", "#38bdf8", "#7c3aed"],
      },
      links: {
        color: "#4b5563",
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 0.05,
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
        value: 0.2,
        animation: {
          enable: false,
        }
      },
      shape: {
        type: shapes,
      },
      size: {
        value: { min: 1, max: 2 },
        animation: {
          enable: false,
        }
      },
    },
    interactivity: {
      detectsOn: "window" as const,
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: false,
        },
        resize: true,
      },
    },
    detectRetina: false,
    background: {
      opacity: 0,
    },
  };

  // Simplified variant configs
  const variantConfigs: Record<ParticleVariant, any> = {
    default: {},
    home: {
      particles: {
        color: {
          value: ["#00FFFF", "#39FF14", "#7c3aed"],
        },
      },
    },
    about: {
      particles: {
        color: {
          value: ["#10b981", "#7c3aed", "#38bdf8"],
        },
        opacity: {
          value: 0.15,
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
      },
    },
    techStack: {
      particles: {
        color: {
          value: ["#10b981", "#38bdf8"],
        },
        opacity: {
          value: 0.15,
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
      },
    },
  };

  const config = {
    ...baseConfig,
    particles: {
      ...baseConfig.particles,
      ...(variantConfigs[variant]?.particles || {}),
    },
  };

  // Don't render anything until fully initialized
  if (!initialized) {
    return <div className="absolute inset-0 pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Particles
        id={`particles-${variant}`}
        init={particlesInit}
        options={config}
        className="w-full h-full opacity-100"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default memo(EnhancedParticleBackground);
