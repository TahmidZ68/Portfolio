import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Interactive 3D spatial centerpiece built with Three.js.
 * Features an iridescent torus-knot core, wireframe geodesic shell, and
 * reactive particle network responding to pointer position and scroll depth.
 */
export function HeroScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglReady, setWebglReady] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglReady(false);
      return;
    }

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.6);

    // Lighting: Cyan + Violet rim lights + soft neutral key
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x22d3ee, 42, 16);
    cyanLight.position.set(3.2, 2.6, 3.4);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 46, 16);
    violetLight.position.set(-3.2, -2.4, 2.8);
    scene.add(violetLight);

    const rimLight = new THREE.DirectionalLight(0xa5f3fc, 1.4);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // Master group for pointer & scroll tilt
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Glassmorphic / Iridescent TorusKnot core
    const knotGeom = new THREE.TorusKnotGeometry(1.12, 0.34, 180, 32, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#181826'),
      metalness: 0.25,
      roughness: 0.14,
      transmission: 0.35,
      thickness: 1.2,
      ior: 1.45,
      iridescence: 1.0,
      iridescenceIOR: 1.38,
      iridescenceThicknessRange: [140, 580],
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const knotMesh = new THREE.Mesh(knotGeom, knotMat);
    rootGroup.add(knotMesh);

    // 2. Wireframe geodesic cage around the core
    const cageGeom = new THREE.IcosahedronGeometry(2.05, 1);
    const cageWireGeom = new THREE.WireframeGeometry(cageGeom);
    const cageMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.16,
    });
    const cageMesh = new THREE.LineSegments(cageWireGeom, cageMat);
    rootGroup.add(cageMesh);

    // 3. Outer subtle orbital ring
    const ringGeom = new THREE.TorusGeometry(2.38, 0.008, 12, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.32,
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 2.6;
    ringMesh.rotation.y = -0.35;
    rootGroup.add(ringMesh);

    // 4. Floating cyan/violet particle network
    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cCyan = new THREE.Color('#22d3ee');
    const cViolet = new THREE.Color('#a855f7');

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.9 + Math.random() * 1.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mix = cCyan.clone().lerp(cViolet, Math.random());
      colors[i * 3] = mix.r;
      colors[i * 3 + 1] = mix.g;
      colors[i * 3 + 2] = mix.b;
    }

    const particlesGeom = new THREE.BufferGeometry();
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
    });
    const particleField = new THREE.Points(particlesGeom, particlesMat);
    rootGroup.add(particleField);

    // Pointer & Scroll state
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollFactor = 0;

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.targetX = nx;
      pointer.targetY = ny;
    };

    const onScroll = () => {
      const maxScroll = Math.max(window.innerHeight * 1.2, 1);
      scrollFactor = Math.min(window.scrollY / maxScroll, 1.5);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      if (!prefersReducedMotion) {
        knotMesh.rotation.x = elapsed * 0.22 + pointer.y * 0.35;
        knotMesh.rotation.y = elapsed * 0.31 + pointer.x * 0.45;
        knotMesh.position.y = Math.sin(elapsed * 1.1) * 0.08;

        cageMesh.rotation.x = -elapsed * 0.08 + pointer.y * 0.15;
        cageMesh.rotation.y = -elapsed * 0.12 + pointer.x * 0.2;

        ringMesh.rotation.z = elapsed * 0.18;
        particleField.rotation.y = elapsed * 0.05 + pointer.x * 0.12;
        particleField.rotation.x = pointer.y * 0.08;
      }

      // Scroll depth reaction
      rootGroup.rotation.x = scrollFactor * 0.45 + pointer.y * 0.18;
      rootGroup.rotation.y = scrollFactor * 0.55 + pointer.x * 0.24;
      camera.position.z = 5.6 + scrollFactor * 0.85;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);

      knotGeom.dispose();
      knotMat.dispose();
      cageGeom.dispose();
      cageWireGeom.dispose();
      cageMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      particlesGeom.dispose();
      particlesMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!webglReady) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-500/30 via-indigo-500/20 to-violet-500/30 blur-xl" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[520px] select-none">
      {/* Subtle ambient glow behind the 3D mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-8 rounded-full bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-violet-500/20 blur-3xl"
      />
      <div ref={containerRef} className="relative w-full h-full cursor-grab active:cursor-grabbing" />
      {/* Interactive telemetry HUD badge */}
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl border border-white/10 bg-[#09090B]/70 backdrop-blur-md font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Interactive 3D Mesh
        </span>
        <span className="text-zinc-500">Move cursor · Scroll</span>
      </div>
    </div>
  );
}
