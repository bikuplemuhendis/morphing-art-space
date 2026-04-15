import { useState, useRef, useCallback, useEffect } from "react";

const FootballGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, active: false, rotation: 0, onGround: true });
  const animRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const highScoreRef = useRef(() => {
    const saved = localStorage.getItem("footballHighScore");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("footballHighScore");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const grassBladesRef = useRef<{ x: number; h: number; curve: number }[]>([]);

  const GRAVITY = 0.32;
  const FRICTION = 0.995;
  const BALL_RADIUS = 26;
  const CANVAS_H = 450;
  const GROUND_RATIO = 0.82;

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
    const groundY = h * GROUND_RATIO;

    const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
    skyGrad.addColorStop(0, "#0a1e0a");
    skyGrad.addColorStop(0.5, "#132e13");
    skyGrad.addColorStop(1, "#1a4a1a");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, groundY);

    const glowGrad = ctx.createRadialGradient(w * 0.2, 0, 0, w * 0.2, 0, h * 0.5);
    glowGrad.addColorStop(0, "rgba(255,255,200,0.06)");
    glowGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, groundY);

    const grassGrad = ctx.createLinearGradient(0, groundY, 0, h);
    grassGrad.addColorStop(0, "#2e7d32");
    grassGrad.addColorStop(0.3, "#388e3c");
    grassGrad.addColorStop(0.7, "#43a047");
    grassGrad.addColorStop(1, "#1b5e20");
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, groundY, w, h - groundY);

    const stripeW = 60;
    for (let sx = 0; sx < w; sx += stripeW * 2) {
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(sx, groundY, stripeW, h - groundY);
    }

    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, groundY + 2);
    ctx.lineTo(w, groundY + 2);
    ctx.stroke();

    const blades = grassBladesRef.current;
    for (let i = 0; i < blades.length; i++) {
      const b = blades[i];
      const sway = Math.sin(time * 0.0015 + b.x * 0.05) * 2.5;
      const shade = 0.5 + Math.random() * 0.5;
      ctx.strokeStyle = `rgba(${60 + shade * 40}, ${140 + shade * 60}, ${50 + shade * 30}, 0.7)`;
      ctx.lineWidth = 1 + Math.random() * 0.5;
      ctx.beginPath();
      ctx.moveTo(b.x, groundY);
      ctx.quadraticCurveTo(b.x + b.curve + sway, groundY - b.h * 0.6, b.x + b.curve * 1.5 + sway * 1.5, groundY - b.h);
      ctx.stroke();
    }
  }, []);

  const drawBall = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, rotation: number, groundY: number) => {
    // Shadow
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

    const R = BALL_RADIUS;

    // Base white ball with 3D gradient
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    const ballGrad = ctx.createRadialGradient(-R * 0.3, -R * 0.3, R * 0.05, R * 0.1, R * 0.1, R * 1.1);
    ballGrad.addColorStop(0, "#ffffff");
    ballGrad.addColorStop(0.4, "#f5f5f5");
    ballGrad.addColorStop(0.7, "#e8e8e8");
    ballGrad.addColorStop(1, "#b0b0b0");
    ctx.fillStyle = ballGrad;
    ctx.fill();

    // Clip to ball
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.clip();

    // Classic pentagon pattern - black pentagons with dark gray seams
    // Draw 1 center pentagon + 5 surrounding pentagons
    const drawPentagon = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const px = cx + Math.cos(a) * size;
        const py = cy + Math.sin(a) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const pentSize = R * 0.32;

    // Center pentagon (black)
    drawPentagon(0, 0, pentSize);
    ctx.fillStyle = "#2a2a2a";
    ctx.fill();
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 5 surrounding pentagons
    const surroundDist = R * 0.68;
    for (let i = 0; i < 5; i++) {
      const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const px = Math.cos(a) * surroundDist;
      const py = Math.sin(a) * surroundDist;
      drawPentagon(px, py, pentSize * 0.85);
      ctx.fillStyle = "#2a2a2a";
      ctx.fill();
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Seam lines connecting pentagons (white hexagon edges)
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 5; i++) {
      const a1 = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const a2 = (Math.PI * 2 * ((i + 1) % 5)) / 5 - Math.PI / 2;
      // Connect center pentagon vertex to surrounding pentagon
      const vx = Math.cos(a1) * pentSize;
      const vy = Math.sin(a1) * pentSize;
      const sx = Math.cos(a1) * surroundDist;
      const sy = Math.sin(a1) * surroundDist;
      ctx.beginPath();
      ctx.moveTo(vx, vy);
      ctx.lineTo(sx - Math.cos(a1) * pentSize * 0.85, sy - Math.sin(a1) * pentSize * 0.85);
      ctx.stroke();

      // Connect adjacent surrounding pentagons
      const s2x = Math.cos(a2) * surroundDist;
      const s2y = Math.sin(a2) * surroundDist;
      const midA = (a1 + a2) / 2;
      ctx.beginPath();
      ctx.moveTo(sx + Math.cos(midA + Math.PI) * pentSize * 0.6, sy + Math.sin(midA + Math.PI) * pentSize * 0.6);
      ctx.lineTo(s2x + Math.cos(midA + Math.PI) * pentSize * 0.6, s2y + Math.sin(midA + Math.PI) * pentSize * 0.6);
      ctx.stroke();
    }

    ctx.restore(); // unclip

    // Ball outline - subtle dark edge
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(60,60,60,0.35)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 3D specular highlight (top-left)
    ctx.beginPath();
    ctx.arc(-R * 0.28, -R * 0.3, R * 0.28, 0, Math.PI * 2);
    const specGrad = ctx.createRadialGradient(-R * 0.28, -R * 0.3, 0, -R * 0.28, -R * 0.3, R * 0.28);
    specGrad.addColorStop(0, "rgba(255,255,255,0.85)");
    specGrad.addColorStop(0.5, "rgba(255,255,255,0.25)");
    specGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = specGrad;
    ctx.fill();

    // Sharp highlight dot
    ctx.beginPath();
    ctx.arc(-R * 0.18, -R * 0.22, R * 0.06, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fill();

    ctx.restore();
  }, []);

  const endGame = useCallback(() => {
    const ball = ballRef.current;
    ball.active = false;
    ball.onGround = true;
    const finalScore = scoreRef.current;
    setGameOver(true);
    setStarted(false);

    if (finalScore > highScoreRef.current()) {
      highScoreRef.current = () => finalScore;
      setHighScore(finalScore);
      localStorage.setItem("footballHighScore", String(finalScore));
    }
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
    const groundY = h * GROUND_RATIO;
    const floorY = groundY - BALL_RADIUS;
    const ceilingY = BALL_RADIUS;
    const now = performance.now();

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    drawScene(ctx, w, h, now);

    if (ball.active) {
      ball.vy += GRAVITY;
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.vx *= FRICTION;
      ball.rotation += ball.vx * 0.04;

      // Ball hits ground = GAME OVER
      if (ball.y >= floorY) {
        ball.y = floorY;
        ball.vy = 0;
        ball.vx = 0;
        endGame();
      }

      // Ceiling clamp
      if (ball.y < ceilingY) {
        ball.y = ceilingY;
        ball.vy = Math.abs(ball.vy) * 0.5;
      }

      // Wall bounce
      if (ball.x < BALL_RADIUS) { ball.x = BALL_RADIUS; ball.vx = Math.abs(ball.vx) * 0.8; }
      if (ball.x > w - BALL_RADIUS) { ball.x = w - BALL_RADIUS; ball.vx = -Math.abs(ball.vx) * 0.8; }
    }

    drawBall(ctx, ball.x, ball.y, ball.rotation, groundY);

    // Score display
    if (ball.active || gameOver) {
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = "bold 48px 'Bebas Neue', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(scoreRef.current), w / 2, 55);
      ctx.font = "14px 'Barlow', sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText("SKOR", w / 2, 73);
    }

    // Start prompt
    if (!ball.active && !gameOver) {
      const pulse = 0.8 + Math.sin(now * 0.004) * 0.2;
      ctx.globalAlpha = pulse;
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px 'Bebas Neue', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("⚽  TOPA TIKLA VE HAVADA TUT!", w / 2, ball.y - BALL_RADIUS - 25);
      ctx.font = "13px 'Barlow', sans-serif";
      ctx.fillText("Yere düşürme!", w / 2, ball.y - BALL_RADIUS - 8);
      ctx.globalAlpha = 1;
    }

    ctx.restore();
    animRef.current = requestAnimationFrame(animate);
  }, [drawScene, drawBall, endGame, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const displayW = rect.width;

      canvas.width = displayW * dpr;
      canvas.height = CANVAS_H * dpr;
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${CANVAS_H}px`;

      initGrass(displayW);

      const ball = ballRef.current;
      if (!ball.active) {
        ball.x = displayW / 2;
        ball.y = CANVAS_H * GROUND_RATIO - BALL_RADIUS;
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

    // If game over, restart immediately with a new kick
    if (gameOver) {
      const centerX = canvas.width / (window.devicePixelRatio || 1) / 2;
      const groundPos = CANVAS_H * GROUND_RATIO - BALL_RADIUS;
      ball.x = centerX;
      ball.y = groundPos;
      ball.vx = 0;
      ball.vy = 0;
      ball.rotation = 0;
      ball.onGround = false;
      ball.active = true;
      scoreRef.current = 1;
      setScore(1);
      setGameOver(false);
      setStarted(true);
      ball.vy = -(8 + Math.random() * 3);
      ball.vx = (Math.random() - 0.5) * 4;
      return;
    }

    const dist = Math.sqrt((x - ball.x) ** 2 + (y - ball.y) ** 2);

    if (dist < BALL_RADIUS + 25) {
      if (!ball.active) {
        ball.active = true;
        ball.onGround = false;
        setStarted(true);
        setGameOver(false);
        scoreRef.current = 0;
        setScore(0);
      }

      scoreRef.current += 1;
      setScore(scoreRef.current);

      const angle = Math.atan2(ball.y - y, ball.x - x);
      ball.vx += Math.cos(angle) * 3;
      ball.vy = -(7 + Math.random() * 3);
      if (ball.vy < -14) ball.vy = -14;
    }
  };

  return (
    <section className="w-full overflow-hidden">
      <div className="relative">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className="w-full cursor-pointer block"
        />
        {/* HUD overlay */}
        <div className="absolute top-3 right-4 flex items-center gap-3">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
            <span className="text-yellow-400 text-xs font-semibold">🏆</span>
            <span className="text-white font-display text-lg">{highScore}</span>
          </div>
          {started && (
            <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-1.5">
              <p className="text-white font-display text-2xl">{score} <span className="text-sm text-white/60">skor</span></p>
            </div>
          )}
        </div>

        {/* Game over overlay */}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer">
            <div className="text-center">
              <p className="font-display text-5xl text-white mb-2">OYUN BİTTİ!</p>
              <p className="font-display text-4xl text-primary mb-1">{scoreRef.current} SKOR</p>
              <p className="text-white/70 text-sm">🏆 En Yüksek Skor: <span className="text-yellow-400 font-bold text-base">{Math.max(highScore, scoreRef.current)}</span></p>
              {scoreRef.current >= highScore && scoreRef.current > 0 && (
                <p className="text-yellow-400 font-bold mt-2 text-lg animate-pulse">🎉 YENİ REKOR!</p>
              )}
              <p className="text-white/50 text-sm mt-5 border border-white/20 rounded-full px-4 py-1.5 inline-block">Tekrar oynamak için tıkla</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FootballGame;
