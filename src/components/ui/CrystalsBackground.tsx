'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function CrystalsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Dark blue crystal palette — matching reference style
    const colors = [
      'rgba(30, 80, 180, 0.70)',   // Electric Blue
      'rgba(15, 50, 130, 0.65)',   // Deep Navy Blue
      'rgba(60, 120, 220, 0.55)',  // Steel Blue
      'rgba(100, 160, 255, 0.45)', // Light Ice Blue
      'rgba(20, 70, 160, 0.80)',   // Dark Royal Blue
      'rgba(0, 40, 110, 0.60)',    // Midnight Blue
    ];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Dynamic count based on screen area — higher density for crystal effect
      const area = canvas.width * canvas.height;
      const count = Math.min(Math.floor(area / 12000), 100); // Cap at 100 particles
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4, // Slightly more movement
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2.2 + 1.2, // Slightly larger particles
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw connections — stronger lines for crystal polygon effect
      const maxDistance = 135;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Fade line based on distance — more visible blue tinted lines
            const alpha = (1 - dist / maxDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Draw gradient line between particles
            const grad = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            // Clean alpha wrapper
            const c1 = particles[i].color.replace(/[\d.]+\)$/, `${alpha})`);
            const c2 = particles[j].color.replace(/[\d.]+\)$/, `${alpha})`);
            
            grad.addColorStop(0, c1);
            grad.addColorStop(1, c2);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Listen to resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80" 
    />
  );
}
