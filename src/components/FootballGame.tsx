import { useState, useRef, useCallback, useEffect } from "react";

const FootballGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, bouncing: false, rotation: 0 });
  const animRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const [bouncing, setBouncing] = useState(false);
  const [score, setScore] = useState(0);
  const grassBladesRef = useRef<{ x: number; h: number; curve: number }[]>([]);
  const ballImgRef = useRef<HTMLImageElement | null>(null);

  const GRAVITY = 0.35;
  const BOUNCE_DAMPING = 0.72;
  const FRICTION = 0.995;
  const BALL_RADIUS = 26;

  // Pre-generate grass blades once
  const initGrass = useCallback((w: number) => {
    const blades: { x: number; h: number; curve: number }[] = [];
    for (let i = 0; i < w * 1.5; i++) {
      blades.push({
        x: Math.random() * w,
        h: 6 + Math.random() * 18,
        curve: (Math.random() - 0.5) * 8,
      });
    }
    grassBladesRef.current = blades;
  }, []);

  const drawScene = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
    const groundY = h * 0.62;

    // Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
    skyGrad.addColorStop(0, "#0a1e0a");
    skyGrad.addColorStop(0.5, "#132e13");
    skyGrad.addColorStop(1, "#1a4a1a");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, groundY);

    // Stadium lights glow
    ctx.save();
    const glowGrad = ctx.createRadialGradient(w * 0.2, 0, 0, w * 0.2, 0, h * 0.5);
    glowGrad.addColorStop(0, "rgba(255,255,200,0.06)");
    glowGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, groundY);
    const glowGrad2 = ctx.createRadialGradient(w * 0.8, 0, 0, w * 0.8, 0, h * 0.5);
    glowGrad2.addColorStop(0, "rgba(255,255,200,0.06)");
    glowGrad2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glowGrad2;
    ctx.fillRect(0, 0, w, groundY);
    ctx.restore();

    // Ground base
    const grassGrad = ctx.createLinearGradient(0, groundY, 0, h);
    grassGrad.addColorStop(0, "#2e7d32");
    grassGrad.addColorStop(0.15, "#388e3c");
    grassGrad.addColorStop(0.5, "#43a047");
    grassGrad.addColorStop(0.8, "#2e7d32");
    grassGrad.addColorStop(1, "#1b5e20");
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, groundY, w, h - groundY);

    // Mowing stripes
    const stripeW = 60;
    for (let sx = 0; sx < w; sx += stripeW * 2) {
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(sx, groundY, stripeW, h - groundY);
    }

    // Field line
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, groundY + 2);
    ctx.lineTo(w, groundY + 2);
    ctx.stroke();

    // Grass blades
    const blades = grassBladesRef.current;
    for (let i = 0; i < blades.length; i++) {
      const b = blades[i];
      const sway = Math.sin(time * 0.0015 + b.x * 0.05) * 2.5;
      const shade = 0.5 + Math.random() * 0.5;
      ctx.strokeStyle = `rgba(${60 + shade * 40}, ${140 + shade * 60}, ${50 + shade * 30}, 0.7)`;
      ctx.lineWidth = 1 + Math.random() * 0.5;
      ctx.beginPath();
      ctx.moveTo(b.x, groundY);
      ctx.quadraticCurveTo(
        b.x + b.curve + sway,
        groundY - b.h * 0.6,
        b.x + b.curve * 1.5 + sway * 1.5,
        groundY - b.h
      );
      ctx.stroke();
    }
  }, []);

  const drawBall = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number, groundY: number) => {
    // Shadow on ground
    ctx.save();
    const shadowScale = Math.max(0.3, 1 - (groundY - y - BALL_RADIUS) / 200);
    ctx.translate(x, groundY + 3);
    ctx.scale(shadowScale, 0.25);
    ctx.beginPath();
    ctx.arc(0, 0, BALL_RADIUS * 1.1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,0,0,${0.3 * shadowScale})`;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Main ball
    ctx.beginPath();
    ctx.arc(0, 0, BALL_RADIUS, 0, Math.PI * 2);
    const ballGrad = ctx.createRadialGradient(-6, -8, 3, 2, 2, BALL_RADIUS);
    ballGrad.addColorStop(0, "#ffffff");
    ballGrad.addColorStop(0.4, "#f5f5f5");
    ballGrad.addColorStop(0.8, "#e0e0e0");
    ballGrad.addColorStop(1, "#bdbdbd");
    ctx.fillStyle = ballGrad;
    ctx.fill();
    ctx.strokeStyle = "#9e9e9e";
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Hexagonal/pentagonal pattern (classic football look)
    // Draw pentagons (dark)
    const drawPentagon = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let j = 0; j < 5; j++) {
        const a = (Math.PI * 2 * j) / 5 - Math.PI / 2;
        const px = cx + Math.cos(a) * size;
        const py = cy + Math.sin(a) * size;
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = "#1a1a1a";
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    // Center pentagon
    drawPentagon(0, 0, 8);

    // Surrounding pentagons
    const outerR = 17;
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      drawPentagon(Math.cos(angle) * outerR, Math.sin(angle) * outerR, 6);
    }

    // Connecting lines (hexagon edges)
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 0.6;
    for (let i = 0; i < 5; i++) {
      const a1 = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const a2 = (Math.PI * 2 * ((i + 1) % 5)) / 5 - Math.PI / 2;
      // From center pent vertex to outer pent
      const cx1 = Math.cos(a1) * 8;
      const cy1 = Math.sin(a1) * 8;
      const ox = Math.cos(a1) * outerR;
      const oy = Math.sin(a1) * outerR;
      ctx.beginPath();
      ctx.moveTo(cx1, cy1);
      ctx.lineTo(ox, oy);
      ctx.stroke();

      // Between outer pentagons
      const ox2 = Math.cos(a2) * outerR;
      const oy2 = Math.sin(a2) * outerR;
      const mx = (ox + ox2) / 2 * 1.15;
      const my = (oy + oy2) / 2 * 1.15;
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(mx, my);
      ctx.lineTo(ox2, oy2);
      ctx.stroke();
    }

    // Highlight shine
    ctx.beginPath();
    ctx.arc(-7, -9, 5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(-4, -6, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fill();

    ctx.restore();
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const ball = ballRef.current;
    const groundY = h * 0.62;
    const floorY = groundY - BALL_RADIUS;
    const now = performance.now();

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    drawScene(ctx, w, h, now);

    if (ball.bouncing) {
      ball.vy += GRAVITY;
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.vx *= FRICTION;
      ball.rotation += ball.vx * 0.04;

      if (ball.y >= floorY) {
        ball.y = floorY;
        ball.vy = -Math.abs(ball.vy) * BOUNCE_DAMPING;
        if (Math.abs(ball.vy) < 2) {
          ball.vy = -(7 + Math.random() * 5);
          ball.vx = (Math.random() - 0.5) * 5;
        }
      }

      if (ball.x < BALL_RADIUS) { ball.x = BALL_RADIUS; ball.vx = Math.abs(ball.vx) * 0.8; }
      if (ball.x > w - BALL_RADIUS) { ball.x = w - BALL_RADIUS; ball.vx = -Math.abs(ball.vx) * 0.8; }
    }

    drawBall(ctx, ball.x, ball.y, ball.rotation, groundY);

    // Score display
    if (ball.bouncing) {
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = "bold 42px 'Bebas Neue', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(scoreRef.current), w / 2, 50);
      ctx.font = "14px 'Barlow', sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText("SKOR", w / 2, 68);
    }

    // Click prompt
    if (!ball.bouncing) {
      const pulse = 0.8 + Math.sin(now * 0.004) * 0.2;
      ctx.globalAlpha = pulse;
      ctx.fillStyle = "#fff";
      ctx.font = "bold 18px 'Bebas Neue', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("⚽  TOPA TIKLA!", ball.x, ball.y - BALL_RADIUS - 20);
      ctx.globalAlpha = 1;
    }

    ctx.restore();
    animRef.current = requestAnimationFrame(animate);
  }, [drawScene, drawBall]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const displayW = rect.width;
      const displayH = 320;

      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;

      initGrass(displayW);

      const ball = ballRef.current;
      if (!ball.bouncing) {
        ball.x = displayW / 2;
        ball.y = displayH * 0.62 - BALL_RADIUS;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animRef.current);
    };
  }, [animate, initGrass]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ball = ballRef.current;
    const dist = Math.sqrt((x - ball.x) ** 2 + (y - ball.y) ** 2);

    if (dist < BALL_RADIUS + 20) {
      if (!ball.bouncing) {
        ball.bouncing = true;
        setBouncing(true);
        scoreRef.current = 0;
        setScore(0);
      }
      scoreRef.current += 1;
      setScore(scoreRef.current);

      // Kick away from click point
      const angle = Math.atan2(ball.y - y, ball.x - x);
      const power = 8 + Math.random() * 4;
      ball.vx += Math.cos(angle) * power * 0.6;
      ball.vy = -(10 + Math.random() * 6);
    } else if (ball.bouncing) {
      const angle = Math.atan2(ball.y - y, ball.x - x);
      ball.vx += Math.cos(angle) * 4;
      ball.vy -= 3;
    }
  };

  return (
    <section className="w-full overflow-hidden rounded-none">
      <div className="relative">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className="w-full cursor-pointer block"
        />
        {bouncing && (
          <div className="absolute top-3 right-4 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-white font-display text-2xl">{score} <span className="text-sm text-white/60">vuruş</span></p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FootballGame;
