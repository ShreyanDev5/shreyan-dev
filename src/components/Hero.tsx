
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Social proof companies (example)
const badges = [
  { name: "Acme Realty" },
  { name: "EstatePro" },
  { name: "NovaHomes" },
  { name: "BlueKey Partners" },
];

const meshColors = [
  "#1A1F2C", // dark base
  "#007BFF", // electric blue
  "#111217", // deep near-black
  "#13b9fd", // light blue (for highlights)
  "#ffffff", // white fade bottom
];

// Gradient mesh background with subtle animation (canvas)
const MeshBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;

    const ctx = cvs.getContext("2d");
    let animationId: number;
    const w = window.innerWidth;
    const h = window.innerHeight < 900 ? 900 : window.innerHeight * 1.15;
    cvs.width = w;
    cvs.height = h;

    // Mesh "blobs"
    const blobs = [
      { x: w * 0.25, y: h * 0.35, r: 400, c: meshColors[0], dx: 0.2, dy: 0.1 },
      { x: w * 0.6, y: h * 0.24, r: 420, c: meshColors[1], dx: 0.13, dy: 0.08 },
      { x: w * 0.82, y: h * 0.7, r: 310, c: meshColors[2], dx: -0.12, dy: 0.14 },
      { x: w * 0.58, y: h * 0.74, r: 350, c: meshColors[3], dx: 0.21, dy: -0.16 },
      { x: w * 0.5, y: h * 1.1, r: 600, c: meshColors[4], dx: -0.08, dy: -0.16 },
    ];

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      // Draw each blob with globalAlpha for blending
      blobs.forEach((b, i) => {
        ctx.save();
        ctx.globalAlpha = i === 4 ? 0.90 : 0.30 + 0.05 * i;
        const gradient = ctx.createRadialGradient(b.x, b.y, b.r * 0.45, b.x, b.y, b.r);
        gradient.addColorStop(0, b.c);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      });
    }

    let inc = 0;
    function animate() {
      // Animate only slightly to create a "mesh" effect
      inc += 0.012;
      blobs.forEach((b, i) => {
        b.x += Math.sin(inc + i) * b.dx;
        b.y += Math.cos(inc - i) * b.dy;
      });
      draw();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", () => {
      if (cvs) {
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight < 900 ? 900 : window.innerHeight * 1.15;
      }
    });
    return () => cancelAnimationFrame(animationId);
    // eslint-disable-next-line
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none animate-fade-in"
      style={{
        zIndex: 0,
        minHeight: "900px",
        transition: "filter 0.5s",
        filter: "blur(2px) brightness(0.97)",
      }}
      aria-hidden
      tabIndex={-1}
    />
  );
};

// Subtle mouse-reactive floating particles
const HeroParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    let w = window.innerWidth;
    let h = 520; // Just for hero; fixed height
    cvs.width = w;
    cvs.height = h;

    type Particle = { x: number, y: number, r: number, dx: number, dy: number, alpha: number; baseA: number };
    const pCount = w > 800 ? 28 : 14;
    const arr: Particle[] = [];
    for (let i = 0; i < pCount; i++) {
      arr.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1.2 + Math.random() * 2.7,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: 0.12 + Math.random() * 0.18,
        baseA: 0.10 + Math.random() * 0.17,
      });
    }

    let mouseX = w/2, mouseY = h/2, t = 0;

    function animate() {
      ctx.clearRect(0, 0, w, h);
      arr.forEach(p => {
        // Mouse repulsion
        let dx = p.x - mouseX, dy = p.y - mouseY;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 90) {
          let angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * (90 - dist) * 0.005;
          p.y += Math.sin(angle) * (90 - dist) * 0.005;
        }
        // Float
        p.x += p.dx;
        p.y += p.dy;
        // Wrap
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
        // Draw
        ctx.save();
        ctx.globalAlpha = p.alpha * (0.65 + 0.2*Math.sin(t + p.r));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#67cdff";
        ctx.shadowBlur = 15 + 6 * Math.sin(t + p.r);
        ctx.fill();
        ctx.restore();
      });
      t += 0.0092;
      requestAnimationFrame(animate);
    }
    cvs.addEventListener("mousemove", (e: MouseEvent) => {
      mouseX = e.offsetX; mouseY = e.offsetY;
    });
    animate();
    // Resize handler
    window.addEventListener("resize", () => {
      cvs.width = window.innerWidth;
      cvs.height = 520;
    });
    // Cleanup
    // eslint-disable-next-line
    return () => { /* eslint-disable-next-line */ };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 right-0 mx-auto top-0 w-full h-[520px] pointer-events-auto"
      style={{ zIndex: 2, }}
      />
  );
};

// Animated text headline (fade-up, color accent)
function TypoHeadline() {
  return (
    <div className="text-center animate-fade-in" style={{zIndex: 10,}}>
      <h1
        className="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight md:leading-tight leading-[1.22] drop-shadow-lg"
        style={{ textShadow: "0 2px 16px rgba(0,0,0,0.10)" }}
      >
        <span
          className="bg-gradient-to-r from-white via-blue-300 to-[#007BFF] bg-clip-text text-transparent animate-slide-up"
        >
          Fast, Collaborative, AI-native&nbsp;
        </span>
        Project Management
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8 animate-slide-up delay-100 font-medium">
        Supercharge your workflow with lightning-fast project management, designed for real estate teams.<br />
        Intuitive. Collaborative. Powered by AI.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
        <Button size="lg" style={{ background: "#007BFF", color: "#fff", boxShadow: "0 4px 18px #007bff50"}} className="hover:bg-[#339DFF] hover-scale transition-all px-8 text-lg font-semibold rounded-full">
          Request a demo
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-white/10 hover:bg-white/5 hover-scale transition-all px-8 text-lg font-semibold rounded-full"
          style={{ color: "#e6efff", borderColor: "#99c8fa" }}
        >
          Explore
        </Button>
      </div>
    </div>
  );
}

// Social proof badges (fake logos, can replace w/ SVGs)
function SocialProofBadges() {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10 items-center animate-fade-in">
      <span className="text-lg text-white/70 mr-2 font-medium">TRUSTED BY</span>
      {badges.map((b, i) => (
        <span
          key={b.name}
          className="flex items-center bg-white/[0.14] text-gray-100 rounded-md px-4 py-2 text-base shadow hover-scale cursor-pointer transition-all"
          style={{
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 2px 22px -2px #91d6ff0f",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          {b.name}
        </span>
      ))}
    </div>
  );
}

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[680px] flex items-center justify-center" style={{overflow: "visible", zIndex: 1}}>
      {/* Gradient mesh background */}
      <MeshBg />
      {/* Particle canvas */}
      <HeroParticles />

      <div className="relative z-10 mx-auto max-w-4xl pt-36 pb-24 md:pt-44 md:pb-28 px-5 flex flex-col items-center">
        <TypoHeadline />
        <SocialProofBadges />
      </div>
    </div>
  );
};

export default Hero;
