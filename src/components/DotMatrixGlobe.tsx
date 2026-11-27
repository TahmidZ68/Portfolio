import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { verifiedLinks } from '@/content';

type NodeKind = 'live' | 'tool' | 'research';

interface GlobeWorkNode {
  id: string;
  code: string;
  name: string;
  shortLabel: string;
  kind: NodeKind;
  status: string;
  summary: string;
  sectionHref: string;
  externalUrl: string;
  externalLabel: string;
  lat: number;
  lon: number;
}

const WORK_NODES: GlobeWorkNode[] = [
  {
    id: 'degradelab',
    code: 'SYS-01',
    name: 'DegradeLab',
    shortLabel: 'DegradeLab',
    kind: 'tool',
    status: 'Open-Source · v0.1.0',
    summary: '34-corruption CV robustness evaluation & ImageNet-C benchmark validation toolkit.',
    sectionHref: '#sys-degradelab',
    externalUrl: verifiedLinks.degradeLabRepo,
    externalLabel: 'GitHub',
    lat: 34,
    lon: 48,
  },
  {
    id: 'diagora',
    code: 'SYS-02',
    name: 'Diagora',
    shortLabel: 'Diagora',
    kind: 'tool',
    status: 'Open-Source · v0.1.0a3',
    summary: 'Local-first 38-rule static repository diagnostics CLI with SARIF 2.1.0 output.',
    sectionHref: '#sys-diagora',
    externalUrl: verifiedLinks.diagoraRepo,
    externalLabel: 'GitHub',
    lat: 52,
    lon: 12,
  },
  {
    id: 'dataset-medic',
    code: 'SYS-03',
    name: 'DatasetMedic',
    shortLabel: 'DatasetMedic',
    kind: 'tool',
    status: 'Public Alpha · v0.2.0',
    summary: 'Read-only CV dataset auditing, SHA-256/pHash leakage forensics & manifests.',
    sectionHref: '#sys-dataset-medic',
    externalUrl: verifiedLinks.datasetMedicRepo,
    externalLabel: 'GitHub',
    lat: 16,
    lon: 132,
  },
  {
    id: 'api-detective',
    code: 'SYS-04',
    name: 'API Detective',
    shortLabel: 'API Detective',
    kind: 'tool',
    status: 'Public Alpha · v0.1.0a2',
    summary: '43-check deterministic API investigator & 4-level controlled unified-diff repair.',
    sectionHref: '#sys-api-detective',
    externalUrl: verifiedLinks.apiDetectiveRepo,
    externalLabel: 'GitHub',
    lat: -18,
    lon: 165,
  },
  {
    id: 'flowsentry',
    code: 'SYS-05',
    name: 'FlowSentry',
    shortLabel: 'FlowSentry',
    kind: 'tool',
    status: 'Open-Core · v1.0',
    summary: 'n8n automation reliability, silent 200-OK outcome monitors & incident grouping.',
    sectionHref: '#sys-flowsentry',
    externalUrl: verifiedLinks.flowSentryRepo,
    externalLabel: 'GitHub',
    lat: 44,
    lon: -42,
  },
  {
    id: 'vellum-research',
    code: 'SYS-06',
    name: 'Vellum Research',
    shortLabel: 'Vellum',
    kind: 'live',
    status: 'Live · Vercel',
    summary: '14-stage LangGraph AI research workspace with verified inline [n] citations.',
    sectionHref: '#sys-vellum-research',
    externalUrl: verifiedLinks.vellumResearchLive,
    externalLabel: 'Live Demo',
    lat: 28,
    lon: -95,
  },
  {
    id: 'repo-medic',
    code: 'SYS-07',
    name: 'RepoMedic',
    shortLabel: 'RepoMedic',
    kind: 'tool',
    status: 'Engineering Tool',
    summary: 'Static repository health scoring, dependency hygiene & CI pre-flight auditing.',
    sectionHref: '#sys-repo-medic',
    externalUrl: verifiedLinks.github,
    externalLabel: 'GitHub',
    lat: -36,
    lon: -68,
  },
  {
    id: 'website-auditor',
    code: 'SYS-08',
    name: 'Website Auditor',
    shortLabel: 'Web Auditor',
    kind: 'tool',
    status: 'AI Automation',
    summary: 'Automated technical SEO, security headers, WCAG accessibility & UX scorecarding.',
    sectionHref: '#sys-website-auditor',
    externalUrl: verifiedLinks.github,
    externalLabel: 'GitHub',
    lat: -24,
    lon: 24,
  },
  {
    id: 'axios-insight',
    code: 'SYS-09',
    name: 'Axios Insight',
    shortLabel: 'Axios Insight',
    kind: 'live',
    status: 'Live · Vercel',
    summary: 'Multi-file workspace data & document BI with natural-language querying.',
    sectionHref: '#sys-axios-insight',
    externalUrl: verifiedLinks.axiosInsight,
    externalLabel: 'Live Demo',
    lat: 8,
    lon: -145,
  },
  {
    id: 'axios-talent',
    code: 'SYS-10',
    name: 'Axios Talent',
    shortLabel: 'Axios Talent',
    kind: 'live',
    status: 'Live · Vercel',
    summary: 'Multi-tenant B2B AI recruitment, bulk CV screening & HR Copilot (Supabase RLS).',
    sectionHref: '#sys-axios-talent',
    externalUrl: verifiedLinks.axiosTalent,
    externalLabel: 'Live Demo',
    lat: -12,
    lon: -102,
  },
  {
    id: 'axios-talent-candidate',
    code: 'SYS-11',
    name: 'Axios Talent Candidate',
    shortLabel: 'Candidate',
    kind: 'live',
    status: 'Live · Vercel',
    summary: 'Candidate ATS readiness scoring, resume optimization & cover-letter copilot.',
    sectionHref: '#sys-axios-talent-candidate',
    externalUrl: verifiedLinks.axiosTalentCandidate,
    externalLabel: 'Live Demo',
    lat: -42,
    lon: 118,
  },
  {
    id: 'res-autism-ml',
    code: 'RES-01',
    name: 'Autism Classification (ICDMIS)',
    shortLabel: 'Autism ML',
    kind: 'research',
    status: 'Published · 2023',
    summary: 'Supervised ML classification benchmark on clinical autism screening features.',
    sectionHref: '#research-lab',
    externalUrl: verifiedLinks.papers.autismClassification,
    externalLabel: 'Paper',
    lat: 56,
    lon: 108,
  },
  {
    id: 'res-autism-cnn',
    code: 'RES-02',
    name: 'Autism Image Model (VGG19 / CNN)',
    shortLabel: 'Autism CNN',
    kind: 'research',
    status: 'Published · 2022',
    summary: 'Deep CNN & transfer learning architecture for image-based autism detection.',
    sectionHref: '#research-lab',
    externalUrl: verifiedLinks.papers.autismImageVgg19,
    externalLabel: 'Paper',
    lat: 48,
    lon: 158,
  },
  {
    id: 'res-spirulina',
    code: 'RES-03',
    name: 'Spirulina Harvesting CNN (BAU)',
    shortLabel: 'Spirulina CV',
    kind: 'research',
    status: 'EWU Funded Grant',
    summary: '20-day BAU lab image dataset & CNNs as low-cost alternative to spectrometry.',
    sectionHref: '#research-lab',
    externalUrl: verifiedLinks.kaggle,
    externalLabel: 'Kaggle',
    lat: 4,
    lon: 68,
  },
  {
    id: 'res-rainwater-startup',
    code: 'RES-04',
    name: 'Rainwater & Startup ML Papers',
    shortLabel: 'Applied Papers',
    kind: 'research',
    status: 'Published · 2022–23',
    summary: 'Biological threat mitigation in rainwater harvesting & startup success ML prediction.',
    sectionHref: '#research-lab',
    externalUrl: verifiedLinks.papers.rainwaterHarvesting,
    externalLabel: 'Paper',
    lat: -48,
    lon: -18,
  },
];

function getKindColor(kind: NodeKind): string {
  switch (kind) {
    case 'live':
      return '#10b981';
    case 'tool':
      return '#38bdf8';
    case 'research':
      return '#a5b4fc';
  }
}

function latLonToVec(latDeg: number, lonDeg: number) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return {
    x: Math.cos(lat) * Math.cos(lon),
    y: Math.sin(lat),
    z: Math.cos(lat) * Math.sin(lon),
  };
}

/**
 * Interactive Work-Mapped Orbital Globe.
 * Every node corresponds to an engineered system, live Vercel deployment,
 * or published research study, connected via geodesic arcs to Dhaka (23.81°N, 90.41°E).
 */
export function DotMatrixGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filterKind, setFilterKind] = useState<'all' | NodeKind>('all');
  const [selectedId, setSelectedId] = useState<string>('degradelab');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const visibleNodes = useMemo(
    () => (filterKind === 'all' ? WORK_NODES : WORK_NODES.filter((n) => n.kind === filterKind)),
    [filterKind],
  );

  const activeId = hoveredId || selectedId;
  const activeNode = useMemo(
    () => WORK_NODES.find((n) => n.id === activeId) || visibleNodes[0] || WORK_NODES[0],
    [activeId, visibleNodes],
  );

  // Refs synced into animation loop without tearing down canvas
  const stateRef = useRef({
    filterKind,
    selectedId,
    hoveredId,
    autoRotate,
    targetAngleY: null as number | null,
    targetTiltX: null as number | null,
    projectedNodes: [] as Array<{ id: string; px: number; py: number; z: number }>,
  });

  stateRef.current.filterKind = filterKind;
  stateRef.current.selectedId = selectedId;
  stateRef.current.hoveredId = hoveredId;
  stateRef.current.autoRotate = autoRotate;

  const focusNode = (node: GlobeWorkNode) => {
    setSelectedId(node.id);
    // Compute rotation angleY so (lon) faces viewer (+Z)
    const lonRad = (node.lon * Math.PI) / 180;
    const latRad = (node.lat * Math.PI) / 180;
    // Screen projection: x1 = x*cosY - z*sinY, z1 = x*sinY + z*cosY
    // For vector (cosLat*cosLon, sinLat, cosLat*sinLon) to point toward +Z (z1 > 0, x1 = 0):
    // tan(rotY) = cosLon / sinLon => rotY = Math.PI / 2 - lonRad
    stateRef.current.targetAngleY = Math.PI / 2 - lonRad;
    stateRef.current.targetTiltX = Math.max(-0.45, Math.min(0.55, latRad * 0.55));
  };

  const stepNode = (delta: number) => {
    const idx = visibleNodes.findIndex((n) => n.id === selectedId);
    const nextIdx =
      idx === -1 ? 0 : (idx + delta + visibleNodes.length) % visibleNodes.length;
    focusNode(visibleNodes[nextIdx]);
    setAutoRotate(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAutoRotate(false);
    }

    let width = 420;
    let height = 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width || 420;
      height = rect?.height || 420;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Background Fibonacci sphere dots
    const numPoints = 380;
    const bgPoints: Array<{ x: number; y: number; z: number }> = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      bgPoints.push({
        x: Math.cos(theta) * radiusAtY,
        y,
        z: Math.sin(theta) * radiusAtY,
      });
    }

    const dhakaVec = latLonToVec(23.8103, 90.4125);
    const nodeVecs = WORK_NODES.map((n) => ({
      node: n,
      vec: latLonToVec(n.lat, n.lon),
    }));

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, inside: false };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      pointer.inside = inside;

      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      pointer.targetX = nx * 0.25;
      pointer.targetY = ny * 0.18;

      if (inside) {
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        let closestId: string | null = null;
        let closestDist = 24;
        for (const pn of stateRef.current.projectedNodes) {
          if (pn.z < -0.15) continue;
          const d = Math.hypot(pn.px - mx, pn.py - my);
          if (d < closestDist) {
            closestDist = d;
            closestId = pn.id;
          }
        }
        setHoveredId(closestId);
        canvas.style.cursor = closestId ? 'pointer' : 'grab';
      } else if (stateRef.current.hoveredId !== null) {
        setHoveredId(null);
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let closestId: string | null = null;
      let closestDist = 26;
      for (const pn of stateRef.current.projectedNodes) {
        if (pn.z < -0.15) continue;
        const d = Math.hypot(pn.px - mx, pn.py - my);
        if (d < closestDist) {
          closestDist = d;
          closestId = pn.id;
        }
      }
      if (closestId) {
        const matched = WORK_NODES.find((n) => n.id === closestId);
        if (matched) {
          focusNode(matched);
          setAutoRotate(false);
        }
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('click', onClick);

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Start centered near South Asia / Dhaka so initial frame displays active nodes
    let angleY = Math.PI / 2 - (60 * Math.PI) / 180;
    let tiltX = 0.24;
    let rafId = 0;

    const projectVec = (
      v: { x: number; y: number; z: number },
      cx: number,
      cy: number,
      radius: number,
      cosY: number,
      sinY: number,
      cosX: number,
      sinX: number,
    ) => {
      const x1 = v.x * cosY - v.z * sinY;
      const z1 = v.x * sinY + v.z * cosY;
      const y2 = v.y * cosX - z1 * sinX;
      const z2 = v.y * sinX + z1 * cosX;
      return {
        px: cx + x1 * radius,
        py: cy - y2 * radius,
        z: z2,
      };
    };

    const render = () => {
      rafId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      const {
        filterKind: curFilter,
        selectedId: curSelected,
        hoveredId: curHovered,
        autoRotate: curAutoRotate,
      } = stateRef.current;

      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      if (stateRef.current.targetAngleY !== null) {
        // Shortest angular interpolation
        let diff = stateRef.current.targetAngleY - angleY;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        angleY += diff * 0.09;
        if (Math.abs(diff) < 0.004) {
          angleY = stateRef.current.targetAngleY;
          stateRef.current.targetAngleY = null;
        }
      } else if (curAutoRotate && !curHovered && !prefersReducedMotion) {
        angleY += 0.0024;
      }

      if (stateRef.current.targetTiltX !== null) {
        const tDiff = stateRef.current.targetTiltX - tiltX;
        tiltX += tDiff * 0.09;
        if (Math.abs(tDiff) < 0.004) {
          tiltX = stateRef.current.targetTiltX;
          stateRef.current.targetTiltX = null;
        }
      }

      const cx = width / 2;
      const cy = height / 2;
      const outerRadius = Math.min(width, height) * 0.45;
      const sphereRadius = Math.min(width, height) * 0.36;

      // 1. Coordinate Axis Crosshairs
      ctx.strokeStyle = 'rgba(242, 240, 234, 0.055)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      // 2. Outer Compass Ring & Degree Ticks
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
          deg % 90 === 0 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(242, 240, 234, 0.13)';
        ctx.stroke();
      }

      // 3. Sphere Boundary Ring
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(242, 240, 234, 0.12)';
      ctx.stroke();

      const rotY = angleY + (stateRef.current.targetAngleY === null ? pointer.x : 0);
      const rotX = tiltX + (stateRef.current.targetTiltX === null ? pointer.y : 0);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // 4. Background Fibonacci Point Cloud
      for (const p of bgPoints) {
        const proj = projectVec(p, cx, cy, sphereRadius, cosY, sinY, cosX, sinX);
        const depth = (proj.z + 1) * 0.5;
        const alpha = 0.05 + depth * 0.34;
        const size = 0.7 + depth * 0.65;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 240, 234, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // 5. Project Dhaka Origin Hub & Work Nodes
      const dhakaProj = projectVec(dhakaVec, cx, cy, sphereRadius, cosY, sinY, cosX, sinX);
      const projectedList: Array<{ id: string; px: number; py: number; z: number }> = [];

      const activeTargetId = curHovered || curSelected;

      for (const { node, vec } of nodeVecs) {
        const matchesFilter = curFilter === 'all' || node.kind === curFilter;
        const proj = projectVec(vec, cx, cy, sphereRadius, cosY, sinY, cosX, sinX);
        if (matchesFilter) {
          projectedList.push({ id: node.id, px: proj.px, py: proj.py, z: proj.z });
        }

        const isActive = node.id === activeTargetId;
        const color = getKindColor(node.kind);
        const isFront = proj.z > -0.12;

        // Draw curved connection arc from Dhaka Hub to active/visible filtered nodes
        if (matchesFilter && (isActive || (isFront && dhakaProj.z > -0.25))) {
          const midX = (dhakaProj.px + proj.px) * 0.5;
          const midY = (dhakaProj.py + proj.py) * 0.5;
          // Lift control point outward from sphere center
          const dx = midX - cx;
          const dy = midY - cy;
          const lift = isActive ? 1.32 : 1.16;
          const ctrlX = cx + dx * lift;
          const ctrlY = cy + dy * lift;

          ctx.beginPath();
          ctx.moveTo(dhakaProj.px, dhakaProj.py);
          ctx.quadraticCurveTo(ctrlX, ctrlY, proj.px, proj.py);
          ctx.strokeStyle = isActive
            ? color
            : node.kind === 'live'
              ? 'rgba(16, 185, 129, 0.24)'
              : node.kind === 'tool'
                ? 'rgba(56, 189, 248, 0.22)'
                : 'rgba(165, 180, 252, 0.22)';
          ctx.lineWidth = isActive ? 1.5 : 0.75;
          if (!isActive) ctx.setLineDash([2, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Render Node Marker
        if (!matchesFilter) {
          if (isFront) {
            ctx.beginPath();
            ctx.arc(proj.px, proj.py, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(242, 240, 234, 0.14)';
            ctx.fill();
          }
          continue;
        }

        if (proj.z < -0.15 && !isActive) {
          // Faint back-hemisphere marker
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(242, 240, 234, 0.18)';
          ctx.fill();
          continue;
        }

        if (isActive) {
          // Outer pulsing target bracket
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.4;
          ctx.strokeRect(proj.px - 8, proj.py - 8, 16, 16);

          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 4, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();

          // Crisp Label Pill on Canvas
          const tag = `${node.code} · ${node.shortLabel}`;
          ctx.font = '600 10.5px "JetBrains Mono", monospace';
          const textW = ctx.measureText(tag).width;
          const labelX = proj.px + 12 + textW + 12 > width ? proj.px - textW - 22 : proj.px + 12;
          const labelY = proj.py - 9;
          ctx.fillStyle = 'rgba(8, 9, 12, 0.92)';
          ctx.fillRect(labelX, labelY, textW + 10, 18);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.strokeRect(labelX, labelY, textW + 10, 18);
          ctx.fillStyle = '#f2f0ea';
          ctx.fillText(tag, labelX + 5, labelY + 12.5);
        } else {
          // Standard front-hemisphere work node
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 5.2, 0, Math.PI * 2);
          ctx.strokeStyle =
            node.kind === 'live'
              ? 'rgba(16, 185, 129, 0.35)'
              : node.kind === 'tool'
                ? 'rgba(56, 189, 248, 0.35)'
                : 'rgba(165, 180, 252, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();

          // Subtle micro-label for prominent front nodes (z > 0.45)
          if (proj.z > 0.48) {
            ctx.font = '500 9.5px "JetBrains Mono", monospace';
            ctx.fillStyle = 'rgba(242, 240, 234, 0.72)';
            ctx.fillText(node.shortLabel, proj.px + 8, proj.py + 3);
          }
        }
      }

      // 6. Render Dhaka Origin Hub Marker
      if (dhakaProj.z > -0.2) {
        ctx.beginPath();
        ctx.arc(dhakaProj.px, dhakaProj.py, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(242, 240, 234, 0.65)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(dhakaProj.px, dhakaProj.py, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#f2f0ea';
        ctx.fill();

        ctx.font = '600 9.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#f2f0ea';
        ctx.fillText('DHAKA HUB', dhakaProj.px + 10, dhakaProj.py - 6);
      }

      stateRef.current.projectedNodes = projectedList;
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  const activeColor = getKindColor(activeNode.kind);

  return (
    <div className="relative w-full flex flex-col justify-between border border-white/[0.1] bg-[#0b0d12]/90 p-4 crosshair-corner">
      {/* Top Instrument Header & Rotation Control */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98] border-b border-white/[0.08] pb-2.5">
        <span className="flex items-center gap-2 text-[#f2f0ea]">
          <span className="w-1.5 h-1.5 bg-[#38bdf8]" />
          SYSTEMS &amp; RESEARCH GLOBE · 15 NODES
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoRotate((prev) => !prev)}
            aria-label={autoRotate ? 'Pause globe rotation' : 'Resume globe rotation'}
            className="inline-flex items-center gap-1 px-2 py-0.5 border border-white/[0.12] bg-[#08090c] text-[#8a8f98] hover:text-[#f2f0ea] hover:border-[#38bdf8] transition-colors"
          >
            {autoRotate ? <Pause size={10} /> : <Play size={10} />}
            <span>{autoRotate ? 'ORBIT' : 'LOCKED'}</span>
          </button>
          <span className="text-[#38bdf8]">23.81°N · 90.41°E</span>
        </div>
      </div>

      {/* Category Filter Pills & Color Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 border-b border-white/[0.06]">
        <div className="flex flex-wrap gap-1.5 font-mono-tech text-[10px]">
          {[
            { id: 'all', label: 'ALL (15)', dot: '#f2f0ea' },
            { id: 'live', label: 'LIVE (04)', dot: '#10b981' },
            { id: 'tool', label: 'TOOLS (07)', dot: '#38bdf8' },
            { id: 'research', label: 'RESEARCH (04)', dot: '#a5b4fc' },
          ].map((tab) => {
            const isSel = filterKind === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  const nextKind = tab.id as 'all' | NodeKind;
                  setFilterKind(nextKind);
                  const first =
                    nextKind === 'all'
                      ? WORK_NODES[0]
                      : WORK_NODES.find((n) => n.kind === nextKind);
                  if (first) focusNode(first);
                }}
                className={`inline-flex items-center gap-1.5 px-2 py-1 border transition-colors ${
                  isSel
                    ? 'border-[#38bdf8] bg-[#38bdf8]/15 text-[#f2f0ea] font-semibold'
                    : 'border-white/[0.08] bg-[#08090c] text-[#8a8f98] hover:text-[#f2f0ea]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tab.dot }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => stepNode(-1)}
            aria-label="Previous project node"
            className="p-1 border border-white/[0.1] bg-[#08090c] text-[#8a8f98] hover:text-[#f2f0ea] hover:border-[#38bdf8] transition-colors"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            type="button"
            onClick={() => stepNode(1)}
            aria-label="Next project node"
            className="p-1 border border-white/[0.1] bg-[#08090c] text-[#8a8f98] hover:text-[#f2f0ea] hover:border-[#38bdf8] transition-colors"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Interactive Globe Canvas */}
      <div className="relative w-full aspect-square max-w-[350px] mx-auto my-1">
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          aria-label="Interactive globe mapping Md Tahmid Zoayed's projects and research nodes"
        />
      </div>

      {/* Interactive Node Selector Chips */}
      <div className="flex flex-wrap gap-1 py-2 border-t border-white/[0.06] max-h-[68px] overflow-y-auto">
        {visibleNodes.map((node) => {
          const isSel = node.id === activeNode.id;
          const dotColor = getKindColor(node.kind);
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                focusNode(node);
                setAutoRotate(false);
              }}
              className={`inline-flex items-center gap-1.5 font-mono-tech text-[9.5px] px-2 py-0.5 border transition-colors ${
                isSel
                  ? 'border-[#38bdf8] bg-[#38bdf8]/15 text-[#f2f0ea]'
                  : 'border-white/[0.06] bg-[#08090c] text-[#8a8f98] hover:text-[#f2f0ea] hover:border-white/25'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
              <span>{node.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Live Selected / Hovered Node Telemetry Inspector */}
      <div className="mt-2 border border-white/[0.1] bg-[#08090c] p-3.5 space-y-2.5">
        <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px]">
          <span className="flex items-center gap-2 font-semibold" style={{ color: activeColor }}>
            <span className="w-1.5 h-1.5" style={{ backgroundColor: activeColor }} />
            {activeNode.code} · {activeNode.status}
          </span>
          <span className="text-[#565b66]">
            {activeNode.lat >= 0 ? `${activeNode.lat}°N` : `${Math.abs(activeNode.lat)}°S`} ·{' '}
            {activeNode.lon >= 0 ? `${activeNode.lon}°E` : `${Math.abs(activeNode.lon)}°W`}
          </span>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-[#f2f0ea]">{activeNode.name}</h3>
          <p className="text-xs text-[#8a8f98] leading-relaxed mt-0.5">{activeNode.summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <a
            href={activeNode.sectionHref}
            className="inline-flex items-center gap-1 font-mono-tech text-[10px] px-2.5 py-1.5 border border-[#38bdf8] bg-[#38bdf8] text-[#08090c] font-semibold hover:bg-[#7dd3fc] transition-colors"
          >
            <span>Inspect Blueprint</span>
            <ArrowDownRight size={11} />
          </a>
          <a
            href={activeNode.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-mono-tech text-[10px] px-2.5 py-1.5 border border-white/15 bg-[#0d1017] text-[#f2f0ea] hover:border-[#38bdf8] hover:text-[#38bdf8] transition-colors"
          >
            <span>{activeNode.externalLabel}</span>
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
