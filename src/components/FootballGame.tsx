import { useState, useRef, useCallback, useEffect } from "react";

const FootballGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, bouncing: false, rotation: 0 });
  const animRef = useRef<number>(0);
  const [bouncing, setBouncing] = useState(false);

  const GRAVITY = 0.4;
  const BOUNCE_DAMPING = 0.7;
  const FRICTION = 0.99;
  const BALL_RADIUS = 28;

  const drawGrass = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGrad.addColorStop(0, "#1a3a1a");
    skyGrad.addColorStop(1, "#2d5a2d");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Grass
    const grassGrad = ctx.createLinearGradient(0, h * 0.6, 0, h);
    grassGrad.addColorStop(0, "#2d8a2d");
    grassGrad.addColorStop(0.3, "#38a838");
    grassGrad.addColorStop(1, "#1e6b1e");
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, h * 0.6, w, h * 0.4);

    // Grass blades
    ctx.strokeStyle = "#44bb44";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < w; i += 8) {
      const grassH = 8 + Math.random() * 12;
      const sway = Math.sin(Date.now() * 0.002 + i * 0.1) * 3;
      ctx.beginPath();
      ctx.moveTo(i, h * 0.6);
      ctx.quadraticCurveTo(i + sway, h * 0.6 - grassH * 0.6, i + sway * 1.5, h * 0.6 - grassH);
      ctx.stroke();
    }

    // Grass line markings
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 3;
    ctx.setLineDash([20, 15]);
    ctx.beginPath();
    ctx.moveTo(0, h * 0.6 + 5);
    ctx.lineTo(w, h * 0.6 + 5);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawBall = (ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Shadow
    ctx.save();
    ctx.translate(0, BALL_RADIUS + 5);
    ctx.scale(1, 0.3);
    ctx.beginPath();
    ctx.arc(0, 0, BALL_RADIUS * 0.9, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fill();
    ctx.restore();

    // Ball body
    ctx.beginPath();
    ctx.arc(0, 0, BALL_RADIUS, 0, Math.PI * 2);
    const ballGrad = ctx.createRadialGradient(-8, -8, 2, 0, 0, BALL_RADIUS);
    ballGrad.addColorStop(0, "#ffffff");
    ballGrad.addColorStop(0.7, "#e8e8e8");
    ballGrad.addColorStop(1, "#cccccc");
    ctx.fillStyle = ballGrad;
    ctx.fill();
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pentagon pattern
    ctx.fillStyle = "#222";
    const pentSize = 9;
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const px = Math.cos(angle) * 14;
      const py = Math.sin(angle) * 14;
      ctx.beginPath();
      for (let j = 0; j < 5; j++) {
        const a = (Math.PI * 2 * j) / 5 - Math.PI / 2;
        const sx = px + Math.cos(a) * pentSize;
        const sy = py + Math.sin(a) * pentSize;
        if (j === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.fill();
    }
    // Center pentagon
    ctx.beginPath();
    for (let j = 0; j < 5; j++) {
      const a = (Math.PI * 2 * j) / 5 - Math.PI / 2;
      const sx = Math.cos(a) * pentSize;
      const sy = Math.sin(a) * pentSize;
      if (j === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const ball = ballRef.current;
    const groundY = h * 0.6 - BALL_RADIUS;

    ctx.clearRect(0, 0, w, h);
    drawGrass(ctx, w, h);

    if (ball.bouncing) {
      ball.vy += GRAVITY;
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.vx *= FRICTION;
      ball.rotation += ball.vx * 0.05;

      // Ground bounce
      if (ball.y >= groundY) {
        ball.y = groundY;
        ball.vy = -Math.abs(ball.vy) * BOUNCE_DAMPING;
        if (Math.abs(ball.vy) < 1.5) {
          ball.vy = -(8 + Math.random() * 6);
          ball.vx = (Math.random() - 0.5) * 6;
        }
      }

      // Wall bounce
      if (ball.x < BALL_RADIUS) { ball.x = BALL_RADIUS; ball.vx = Math.abs(ball.vx); }
      if (ball.x > w - BALL_RADIUS) { ball.x = w - BALL_RADIUS; ball.vx = -Math.abs(ball.vx); }
    }

    drawBall(ctx, ball.x, ball.y, ball.rotation);

    // Instruction text
    if (!ball.bouncing) {
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "bold 16px 'Bebas Neue', sans-serif";
      ctx.textAlign = "center";
      ctx.letterSpacing = "2px";
      ctx.fillText("⚽ TOPA TIKLA!", ball.x, ball.y - BALL_RADIUS - 15);
    }

    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = 300 * (window.devicePixelRatio || 1);
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      }
      const ball = ballRef.current;
      const displayW = rect?.width || 800;
      if (!ball.bouncing) {
        ball.x = displayW / 2;
        ball.y = 300 * 0.6 - BALL_RADIUS;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ball = ballRef.current;
    const dist = Math.sqrt((x - ball.x) ** 2 + (y - ball.y) ** 2);

    if (dist < BALL_RADIUS + 15) {
      ball.bouncing = true;
      ball.vy = -(12 + Math.random() * 8);
      ball.vx = (Math.random() - 0.5) * 10;
      setBouncing(true);
    } else if (ball.bouncing) {
      // Kick toward click direction
      const angle = Math.atan2(ball.y - y, ball.x - x);
      ball.vx += Math.cos(angle) * 8;
      ball.vy = -(10 + Math.random() * 5);
    }
  };

  return (
    <section className="w-full overflow-hidden">
      <div className="relative">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className="w-full cursor-pointer"
          style={{ height: "300px" }}
        />
        {bouncing && (
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium animate-fade-in">
            Sahaya tıklayarak topu yönlendir! ⚽
          </p>
        )}
      </div>
    </section>
  );
};

export default FootballGame;
