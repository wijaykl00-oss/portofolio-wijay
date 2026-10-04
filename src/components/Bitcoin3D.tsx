import React, { useRef, useEffect, useState, useCallback } from "react";

interface Bitcoin3DProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

const Bitcoin3D: React.FC<Bitcoin3DProps> = ({ containerRef }) => {
  const stateRef = useRef({
    x: 140,
    y: 120,
    vx: 3.2,
    vy: 1.5,
    roll: 0,
    tiltX: 0,
    tiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    isDragging: false,
    dragOffsetX: 0,
    dragOffsetY: 0,
    lastDragVX: 0,
    lastDragVY: 0,
    bounceFlash: 0,
    shimmerAngle: 0,
  });

  const animRef = useRef<number | null>(null);
  const coinRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const rippleRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const SIZE = 110;
  const GRAVITY = 0.38;
  const FRICTION = 0.988;
  const BOUNCE_DAMPING = 0.68;

  const getContainerBounds = useCallback(() => {
    if (!containerRef.current) return { w: 1200, h: 750 };
    const r = containerRef.current.getBoundingClientRect();
    return { w: r.width, h: r.height };
  }, [containerRef]);

  useEffect(() => {
    const s = stateRef.current;
    const { w, h } = getContainerBounds();
    s.x = Math.max(20, w * 0.15);
    s.y = Math.max(20, h * 0.2);

    const updateDOM = () => {
      if (!coinRef.current) return;
      // Position coin container
      coinRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;

      // Inner 3D rotation & tilt
      const inner = coinRef.current.querySelector(".btc-inner") as HTMLElement;
      if (inner) {
        inner.style.transform = `rotateZ(${s.roll}deg) rotateX(${s.tiltX}deg) rotateY(${s.tiltY}deg)`;
      }

      // Shimmer rotation
      const shimmer = coinRef.current.querySelector(".btc-shimmer") as HTMLElement;
      if (shimmer) {
        const sx = 50 + Math.cos((s.shimmerAngle * Math.PI) / 180) * 35;
        const sy = 50 + Math.sin((s.shimmerAngle * Math.PI) / 180) * 35;
        shimmer.style.background = `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,220,0.45) 0%, transparent 55%)`;
      }

      // Dynamic shadow
      if (shadowRef.current) {
        const shadowDist = Math.max(0, 1 - (s.y / (h || 700)));
        const shadowScale = 0.8 + shadowDist * 0.3;
        shadowRef.current.style.transform = `translateX(-50%) scale(${shadowScale})`;
        shadowRef.current.style.opacity = `${0.35 + shadowDist * 0.35}`;
      }

      // Glow on bounce
      if (s.bounceFlash > 0) {
        inner.style.boxShadow = "0 0 35px 12px rgba(255,190,40,0.7), inset 0 2px 8px rgba(255,245,190,0.6), 0 10px 30px rgba(0,0,0,0.6)";
      } else {
        inner.style.boxShadow = "0 0 20px 4px rgba(247,147,26,0.4), inset 0 2px 8px rgba(255,240,180,0.45), 0 8px 24px rgba(0,0,0,0.55)";
      }

      // Tooltip
      if (tooltipRef.current) {
        tooltipRef.current.style.opacity = s.isDragging ? "1" : "0";
      }
    };

    const loop = () => {
      const s = stateRef.current;
      const { w, h } = getContainerBounds();
      const maxX = Math.max(10, w - SIZE);
      const maxY = Math.max(10, h - SIZE);

      if (!s.isDragging) {
        s.vy += GRAVITY;
        s.vx *= FRICTION;
        s.x += s.vx;
        s.y += s.vy;
        s.roll += s.vx * 1.6;

        // Bounce left
        if (s.x <= 0) {
          s.x = 0;
          s.vx = Math.abs(s.vx) * BOUNCE_DAMPING;
          s.bounceFlash = 6;
        }
        // Bounce right
        if (s.x >= maxX) {
          s.x = maxX;
          s.vx = -Math.abs(s.vx) * BOUNCE_DAMPING;
          s.bounceFlash = 6;
        }
        // Bounce top
        if (s.y <= 0) {
          s.y = 0;
          s.vy = Math.abs(s.vy) * BOUNCE_DAMPING;
          s.bounceFlash = 4;
        }
        // Bounce bottom
        if (s.y >= maxY) {
          s.y = maxY;
          s.vy = -Math.abs(s.vy) * BOUNCE_DAMPING;
          s.vx *= 0.95;
          s.bounceFlash = 10;
          // Keep it lively if rolling slowly on ground
          if (Math.abs(s.vy) < 1.4 && Math.abs(s.vx) > 0.8) {
            s.vy = -(1.2 + Math.random() * 0.8);
          }
        }

        s.targetTiltX = Math.max(-26, Math.min(26, -s.vy * 3));
        s.targetTiltY = Math.max(-26, Math.min(26, s.vx * 3));
      }

      s.tiltX += (s.targetTiltX - s.tiltX) * 0.12;
      s.tiltY += (s.targetTiltY - s.tiltY) * 0.12;
      s.shimmerAngle = (s.shimmerAngle + 1.8) % 360;
      if (s.bounceFlash > 0) s.bounceFlash--;

      updateDOM();
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [getContainerBounds]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = stateRef.current;
    const rect = containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
    s.isDragging = true;
    s.dragOffsetX = e.clientX - rect.left - s.x;
    s.dragOffsetY = e.clientY - rect.top - s.y;
    s.lastDragVX = 0;
    s.lastDragVY = 0;
    s.vx = 0;
    s.vy = 0;
  }, [containerRef]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    const rect = containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
    const newX = e.clientX - rect.left - s.dragOffsetX;
    const newY = e.clientY - rect.top - s.dragOffsetY;
    s.lastDragVX = newX - s.x;
    s.lastDragVY = newY - s.y;
    s.x = newX;
    s.y = newY;
    s.targetTiltX = Math.max(-35, Math.min(35, -s.lastDragVY * 3.5));
    s.targetTiltY = Math.max(-35, Math.min(35, s.lastDragVX * 3.5));
    s.roll += s.lastDragVX * 1.5;
  }, [containerRef]);

  const onPointerUp = useCallback(() => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    s.isDragging = false;
    // Release with throw inertia
    s.vx = Math.max(-25, Math.min(25, s.lastDragVX * 0.9));
    s.vy = Math.max(-25, Math.min(25, s.lastDragVY * 0.9));
  }, []);

  return (
    <div
      ref={coinRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: SIZE,
        height: SIZE,
        cursor: "grab",
        zIndex: 35,
        userSelect: "none",
        touchAction: "none",
        perspective: "500px",
        willChange: "transform",
      }}
    >
      {/* Ground / drop shadow */}
      <div
        ref={shadowRef}
        style={{
          position: "absolute",
          bottom: -16,
          left: "50%",
          transform: "translateX(-50%)",
          width: SIZE * 0.85,
          height: 12,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 80%)",
          filter: "blur(5px)",
          pointerEvents: "none",
        }}
      />

      {/* 3D Coin Body */}
      <div
        className="btc-inner"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          transformStyle: "preserve-3d",
          position: "relative",
          background: "radial-gradient(circle at 35% 35%, #fff099 0%, #f7931a 30%, #c67400 65%, #7a4200 95%, #422100 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "3.5px solid #ffcf40",
          outline: "1px solid rgba(130,70,0,0.6)",
          transition: "box-shadow 0.15s ease",
        }}
      >
        {/* Shimmer light reflection overlay */}
        <div
          className="btc-shimmer"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        {/* Detailed Coin Edge Bevel / Inner Groove Ring */}
        <div
          style={{
            position: "absolute",
            inset: 5,
            borderRadius: "50%",
            border: "1.5px dashed rgba(255, 230, 140, 0.45)",
            boxShadow: "inset 0 1px 4px rgba(0,0,0,0.5), 0 1px 3px rgba(255,255,255,0.4)",
            pointerEvents: "none",
          }}
        />

        {/* Bitcoin SVG Symbol (Exact standard ₿) */}
        <svg
          viewBox="0 0 64 64"
          style={{
            width: "58%",
            height: "58%",
            position: "relative",
            zIndex: 3,
            filter: "drop-shadow(0 2px 4px rgba(60,30,0,0.7)) drop-shadow(0 -1px 1px rgba(255,255,200,0.5))",
          }}
        >
          <defs>
            <linearGradient id="btcGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#fff2a8" />
              <stop offset="65%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <path
            fill="url(#btcGradGold)"
            stroke="rgba(90,45,0,0.6)"
            strokeWidth="0.8"
            d="M45.5 25.8c-.6-4.1-3.6-6.4-8.8-7.1V12h-4.3v6.5c-1.1 0-2.3.1-3.4.1V12h-4.3v6.8H19v4.9s2.4 0 2.3 0c1.3 0 1.9.8 1.9 1.6v15.9c0 .7-.4 1.5-1.9 1.5.1 0-2.3 0-2.3 0V48h5.7v6.8h4.3V48c1.2 0 2.3.1 3.5.1V55h4.3v-6.8c7.3.7 12.3-1.6 13.5-7.3 1-4.6-.2-7.2-3.4-8.9 2.3-1.3 3.6-3.4 3.1-6.2zm-6.2 14.7c-.9 4.3-7.2 4.1-10.4 4.1v-8.8c3.2 0 11.3-.8 10.4 4.7zm-1.8-13.6c-.8 3.9-6.3 3.7-9.1 3.7v-7.8c2.8 0 9.8-.7 9.1 4.1z"
          />
        </svg>

        {/* Realistic metallic specular highlights */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 12,
            right: 12,
            height: "40%",
            borderRadius: "50% 50% 45% 45%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Drag & Throw Tooltip */}
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          top: -28,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(15, 10, 25, 0.88)",
          color: "#facc15",
          fontSize: "10px",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          letterSpacing: "0.08em",
          padding: "3px 8px",
          borderRadius: "6px",
          whiteSpace: "nowrap",
          border: "1px solid rgba(250, 204, 21, 0.4)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          pointerEvents: "none",
          transition: "opacity 0.2s ease",
          opacity: 0,
        }}
      >
        ✦ LEMPAR BITCOIN ✦
      </div>
    </div>
  );
};

export default Bitcoin3D;
