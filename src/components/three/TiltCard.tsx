"use client"
import { useRef, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

/**
 * 3D perspective tilt card.
 * Uses requestAnimationFrame for smooth tilt and resets cleanly on mouse leave.
 */
const TiltCard = ({ children, className = '', intensity = 12, glare = true }: TiltCardProps) => {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number | null>(null);
  const isHover  = useRef(false);

  const applyTransform = useCallback((rotX: number, rotY: number, scale: number) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale},${scale},${scale})`;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card || !isHover.current) return;

      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);

      applyTransform(-dy * intensity, dx * intensity, 1.03);
      card.style.transition = 'transform 0.05s linear';

      if (glare && glareRef.current) {
        const gx = ((e.clientX - rect.left) / rect.width)  * 100;
        const gy = ((e.clientY - rect.top)  / rect.height) * 100;
        glareRef.current.style.opacity = '1';
        glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%,
          rgba(255,255,255,0.12) 0%,
          rgba(255,255,255,0.04) 40%,
          transparent 70%)`;
      }
    });
  }, [intensity, glare, applyTransform]);

  const handleMouseEnter = useCallback(() => {
    isHover.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHover.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const card = cardRef.current;
    if (card) {
      // Smooth spring-back to flat
      card.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)';
      card.style.transform   = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    }
    if (glare && glareRef.current) {
      glareRef.current.style.opacity    = '0';
      glareRef.current.style.background = 'transparent';
    }
  }, [glare]);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        position: 'relative',
        // initial state — ensures CSS reset works
        transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 5,
            opacity: 0,
            transition: 'opacity 0.3s ease, background 0.15s ease',
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;
