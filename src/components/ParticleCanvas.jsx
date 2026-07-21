import React, { useEffect, useRef } from 'react';

export const ParticleCanvas = ({ intensity = 'normal' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle system setup
    const particleCount = intensity === 'high' ? 80 : 45;
    const particles = [];

    // Mouse tracker
    const mouse = { x: -1000, y: -1000, active: false };
    const mouseTrail = [];

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      if (Math.random() < 0.6) {
        mouseTrail.push({
          x: e.clientX + (Math.random() - 0.5) * 15,
          y: e.clientY + (Math.random() - 0.5) * 15,
          size: Math.random() * 3 + 1,
          alpha: 1,
          color: Math.random() > 0.5 ? '#f472b6' : '#fbbf24',
          decay: 0.03 + Math.random() * 0.02,
        });
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        mouse.active = true;

        if (Math.random() < 0.6) {
          mouseTrail.push({
            x: touch.clientX + (Math.random() - 0.5) * 15,
            y: touch.clientY + (Math.random() - 0.5) * 15,
            size: Math.random() * 3 + 1,
            alpha: 1,
            color: Math.random() > 0.5 ? '#f472b6' : '#fbbf24',
            decay: 0.03 + Math.random() * 0.02,
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Particle types: star, heart, sparkle
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -Math.random() * 0.7 - 0.2, // Drifting upwards softly
        alpha: Math.random() * 0.7 + 0.3,
        type: Math.random() > 0.7 ? 'heart' : Math.random() > 0.4 ? 'star' : 'sparkle',
        pulse: Math.random() * 0.05,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        color: ['#f472b6', '#c084fc', '#fbbf24', '#38bdf8', '#ffffff'][Math.floor(Math.random() * 5)],
      });
    }

    const drawHeart = (ctx, x, y, size, color, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
      ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (ctx, x, y, size, color, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          Math.cos(((18 + i * 72) * Math.PI) / 180) * size + x,
          -Math.sin(((18 + i * 72) * Math.PI) / 180) * size + y
        );
        ctx.lineTo(
          Math.cos(((54 + i * 72) * Math.PI) / 180) * (size / 2) + x,
          -Math.sin(((54 + i * 72) * Math.PI) / 180) * (size / 2) + y
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse radial glow aura
      if (mouse.active) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        grad.addColorStop(0, 'rgba(244, 114, 182, 0.15)');
        grad.addColorStop(0.5, 'rgba(192, 132, 252, 0.05)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw mouse trail sparkles
      for (let i = mouseTrail.length - 1; i >= 0; i--) {
        const p = mouseTrail[i];
        p.alpha -= p.decay;
        p.y -= 0.5;
        if (p.alpha <= 0) {
          mouseTrail.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Render floating background particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Pulse alpha
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;
        if (p.alpha < 0.2) p.alpha = 0.2;
        if (p.alpha > 0.9) p.alpha = 0.9;

        // Wrap around screen
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size * 2, p.color, p.alpha);
        } else if (p.type === 'star') {
          drawStar(ctx, p.x, p.y, p.size * 2, p.color, p.alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};
