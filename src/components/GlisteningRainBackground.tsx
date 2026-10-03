import React, { useEffect, useRef } from 'react';

interface RainSpark {
  x: number;
  y: number;
  length: number;
  speed: number;
  size: number;
  opacity: number;
  tailColor: string;
  glow: number;
  twinkle: number;
  twinkleSpeed: number;
}

export const GlisteningRainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color tones of luxury glowing rain sparks
    const colors = [
      'rgba(243, 232, 255, ', // crystal lilac
      'rgba(216, 180, 254, ', // violet-300
      'rgba(192, 132, 252, ', // purple-400
      'rgba(232, 121, 249, ', // fuchsia-400
      'rgba(255, 255, 255, ', // pure white glint
    ];

    // Create 70 glistening falling rain particles
    const sparksCount = Math.min(Math.floor(width / 22), 75);
    const sparks: RainSpark[] = Array.from({ length: sparksCount }, () => ({
      x: Math.random() * (width + 300) - 150,
      y: Math.random() * height,
      length: 22 + Math.random() * 38,
      speed: 3.5 + Math.random() * 4.8,
      size: 0.9 + Math.random() * 1.5,
      opacity: 0.45 + Math.random() * 0.5,
      tailColor: colors[Math.floor(Math.random() * colors.length)],
      glow: 6 + Math.random() * 10,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.05 + Math.random() * 0.08,
    }));

    // Diagonal rain angle: ~66 degrees (drifting down & slightly left)
    const angleRad = (66 * Math.PI) / 180;
    const dx = Math.cos(angleRad);
    const dy = Math.sin(angleRad);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];

        // Animate twinkle
        s.twinkle += s.twinkleSpeed;
        const currentTwinkle = 0.8 + Math.sin(s.twinkle) * 0.2;
        const currentOpacity = s.opacity * currentTwinkle;

        // Tail coordinate
        const tailX = s.x - dx * s.length;
        const tailY = s.y - dy * s.length;

        // Draw glistening gradient streak
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `${s.tailColor}0)`);
        grad.addColorStop(0.65, `${s.tailColor}${currentOpacity * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${currentOpacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glistening droplet head with luminous glowing spark
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, currentOpacity + 0.25)})`;
        ctx.shadowColor = 'rgba(216, 180, 254, 0.9)';
        ctx.shadowBlur = s.glow;
        ctx.fill();
        ctx.restore();

        // Subtle sparkling cross glint on the brightest rain droplets
        if (s.size > 1.8 && Math.sin(s.twinkle) > 0.6) {
          ctx.save();
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(s.x - 3, s.y);
          ctx.lineTo(s.x + 3, s.y);
          ctx.moveTo(s.x, s.y - 3);
          ctx.lineTo(s.x, s.y + 3);
          ctx.stroke();
          ctx.restore();
        }

        // Advance position along trajectory
        s.x += dx * s.speed;
        s.y += dy * s.speed;

        // Respawn smoothly above or to the left of the viewport
        if (s.y > height + 60 || s.x > width + 60) {
          s.y = -50 - Math.random() * 50;
          s.x = Math.random() * (width + 300) - 150;
          s.speed = 3.5 + Math.random() * 4.8;
          s.length = 22 + Math.random() * 38;
          s.opacity = 0.45 + Math.random() * 0.5;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-90"
      aria-hidden="true"
    />
  );
};
