import { useEffect, useRef, useState } from 'react';

/**
 * Editorial & Engineering Orbital Coordinate Visualization.
 * Combines a Fibonacci point-cloud projection, polar orbital paths,
 * degree tick reticles, and Dhaka coordinate markers (23.8103° N, 90.4125° E).
 * Respects prefers-reduced-motion automatically.
 */
export function DotMatrixGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coords, setCoords] = useState({ az: '142.8°', el: '+23.8°' });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 440;
    let height = 440;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width || 440;
      height = rect?.height || 440;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const numPoints = 460;
    const points: Array<{ x: number; y: number; z: number; accent?: boolean; label?: string }> = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      points.push({
        x: Math.cos(theta) * radiusAtY,
        y,
        z: Math.sin(theta) * radiusAtY,
      });
    }

    // Primary Location Marker: Dhaka (23.8103° N, 90.4125° E)
    const dhakaLat = (23.8103 * Math.PI) / 180;
    const dhakaLon = (90.4125 * Math.PI) / 180;
    points.push({
      x: Math.cos(dhakaLat) * Math.cos(dhakaLon),
      y: Math.sin(dhakaLat),
      z: Math.cos(dhakaLat) * Math.sin(dhakaLon),
      accent: true,
      label: 'Dhaka · 23.81°N',
    });

    // Global Deployment & Research Relay Markers
    const relayCoords = [
      { lat: 37.77, lon: -122.41, label: 'Live Cloud' },
      { lat: 51.5, lon: -0.12, label: 'Open Source' },
      { lat: 35.67, lon: 139.65, label: 'ML Research' },
    ];
    for (const r of relayCoords) {
      const rl = (r.lat * Math.PI) / 180;
      const rlo = (r.lon * Math.PI) / 180;
      points.push({
        x: Math.cos(rl) * Math.cos(rlo),
        y: Math.sin(rl),
        z: Math.cos(rl) * Math.sin(rlo),
        accent: true,
        label: r.label,
      });
    }

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      pointer.targetX = nx * 0.42;
      pointer.targetY = ny * 0.28;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let angleY = -0.75;
    let frameCount = 0;
    let rafId = 0;

    const render = () => {
      rafId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;
      if (!prefersReducedMotion) {
        angleY += 0.0022;
      }

      frameCount++;
      if (frameCount % 45 === 0) {
        const deg = (((angleY + pointer.x) * 180) / Math.PI) % 360;
        const norm = ((deg + 360) % 360).toFixed(1);
        const el = (23.8 + pointer.y * 15).toFixed(1);
        setCoords({
          az: `${norm}°`,
          el: `${Number(el) >= 0 ? '+' : ''}${el}°`,
        });
      }

      const cx = width / 2;
      const cy = height / 2;
      const outerRadius = Math.min(width, height) * 0.44;
      const sphereRadius = Math.min(width, height) * 0.34;

      // 1. Crosshair axis lines
      ctx.strokeStyle = 'rgba(242, 240, 234, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      // 2. Outer technical compass ring & degree ticks
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(242, 240, 234, 0.09)';
      ctx.stroke();

      for (let deg = 0; deg < 360; deg += 15) {
        const rad = (deg * Math.PI) / 180;
        const inner = deg % 45 === 0 ? outerRadius - 7 : outerRadius - 3.5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rad) * inner, cy + Math.sin(rad) * inner);
        ctx.lineTo(cx + Math.cos(rad) * outerRadius, cy + Math.sin(rad) * outerRadius);
        ctx.strokeStyle =
          deg % 90 === 0 ? 'rgba(56, 189, 248, 0.5)' : 'rgba(242, 240, 234, 0.14)';
        ctx.stroke();
      }

      // 3. Inclined orbital ellipse path
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.38);
      ctx.beginPath();
      ctx.ellipse(0, 0, outerRadius * 0.94, sphereRadius * 0.52, 0, 0, Math.PI * 2);
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.24)';
      ctx.stroke();
      ctx.setLineDash([]);

      const orbitAngle = angleY * 1.9;
      const ox = Math.cos(orbitAngle) * outerRadius * 0.94;
      const oy = Math.sin(orbitAngle) * sphereRadius * 0.52;
      ctx.beginPath();
      ctx.arc(ox, oy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.restore();

      // 4. Inner sphere boundary ring
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(242, 240, 234, 0.12)';
      ctx.stroke();

      const rotY = angleY + pointer.x;
      const rotX = 0.28 + pointer.y;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // 5. Render Fibonacci points and active nodes
      const activeScreenNodes: Array<{ x: number; y: number; label: string }> = [];

      for (const p of points) {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const px = cx + x1 * sphereRadius;
        const py = cy - y2 * sphereRadius;
        const depth = (z2 + 1) * 0.5;

        if (p.accent && z2 > -0.05) {
          if (p.label) {
            activeScreenNodes.push({ x: px, y: py, label: p.label });
          }
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
          ctx.lineWidth = 1;
          ctx.strokeRect(px - 5, py - 5, 10, 10);

          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();
        } else {
          const alpha = 0.06 + depth * 0.48;
          const size = 0.75 + depth * 0.75;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(242, 240, 234, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      if (activeScreenNodes.length > 1) {
        ctx.beginPath();
        for (let i = 0; i < activeScreenNodes.length - 1; i++) {
          ctx.moveTo(activeScreenNodes[i].x, activeScreenNodes[i].y);
          ctx.lineTo(activeScreenNodes[i + 1].x, activeScreenNodes[i + 1].y);
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      const primaryNode = activeScreenNodes[0];
      if (primaryNode) {
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(primaryNode.label, primaryNode.x + 9, primaryNode.y + 3);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between border border-white/[0.08] bg-[#0b0d12]/80 p-4 crosshair-corner">
      <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98] border-b border-white/[0.07] pb-2.5">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#38bdf8]" />
          SYSTEMS &amp; RESEARCH TOPOLOGY
        </span>
        <span className="text-[#38bdf8]">DHAKA, BD</span>
      </div>

      <div className="relative w-full aspect-square max-w-[390px] mx-auto my-2">
        <canvas ref={canvasRef} className="block w-full h-full" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-white/[0.07] font-mono-tech text-[10px] text-[#8a8f98]">
        <div>
          <span className="block text-[9px] text-[#565b66]">AZIMUTH</span>
          <span className="text-[#f2f0ea]">{coords.az}</span>
        </div>
        <div>
          <span className="block text-[9px] text-[#565b66]">LATITUDE</span>
          <span className="text-[#f2f0ea]">{coords.el}</span>
        </div>
        <div className="text-right">
          <span className="block text-[9px] text-[#565b66]">COORDINATES</span>
          <span className="text-[#38bdf8]">23.81°N · 90.41°E</span>
        </div>
      </div>
    </div>
  );
}
