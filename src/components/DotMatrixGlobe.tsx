import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { verifiedLinks } from '@/content';

type NodeKind = 'live' | 'vision' | 'dev' | 'research';

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
    kind: 'vision',
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
    kind: 'dev',
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
    kind: 'vision',
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
    kind: 'dev',
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
    kind: 'dev',
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
    status: 'Live on Vercel',
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
    kind: 'dev',
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
    kind: 'dev',
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
    status: 'Live on Vercel',
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
    status: 'Live on Vercel',
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
    status: 'Live on Vercel',
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
      return '#10b981'; // Emerald
    case 'vision':
      return '#3b82f6'; // Cobalt Blue
    case 'dev':
      return '#f59e0b'; // Warm Amber
    case 'research':
      return '#a78bfa'; // Soft Violet
  }
}

function getKindRgba(kind: NodeKind, alpha: number): string {
  switch (kind) {
    case 'live':
      return `rgba(16, 185, 129, ${alpha})`;
    case 'vision':
      return `rgba(59, 130, 246, ${alpha})`;
    case 'dev':
      return `rgba(245, 158, 11, ${alpha})`;
    case 'research':
      return `rgba(167, 139, 250, ${alpha})`;
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

interface DotMatrixGlobeProps {
  onInspectSystem?: (systemId: string) => void;
}

/**
 * Interactive Work & Research Globe with sleek rounded editorial framing.
 */
export function DotMatrixGlobe({ onInspectSystem }: DotMatrixGlobeProps) {
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
    const lonRad = (node.lon * Math.PI) / 180;
    const latRad = (node.lat * Math.PI) / 180;
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

    const numPoints = 360;
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

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

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
        let diff = stateRef.current.targetAngleY - angleY;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        angleY += diff * 0.09;
        if (Math.abs(diff) < 0.004) {
          angleY = stateRef.current.targetAngleY;
          stateRef.current.targetAngleY = null;
        }
      } else if (curAutoRotate && !curHovered && !prefersReducedMotion) {
        angleY += 0.0022;
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
      const sphereRadius = Math.min(width, height) * 0.37;

      // Soft Ambient Glow inside Globe
      const grad = ctx.createRadialGradient(cx, cy, sphereRadius * 0.1, cx, cy, outerRadius);
      grad.addColorStop(0, 'rgba(59, 130, 246, 0.11)');
      grad.addColorStop(0.55, 'rgba(16, 185, 129, 0.05)');
      grad.addColorStop(1, 'rgba(12, 13, 18, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle Outer Orbital Ring
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(244, 243, 239, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sphere Boundary Ring
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(244, 243, 239, 0.14)';
      ctx.stroke();

      const rotY = angleY + (stateRef.current.targetAngleY === null ? pointer.x : 0);
      const rotX = tiltX + (stateRef.current.targetTiltX === null ? pointer.y : 0);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Background Fibonacci Sphere Points
      for (const p of bgPoints) {
        const proj = projectVec(p, cx, cy, sphereRadius, cosY, sinY, cosX, sinX);
        const depth = (proj.z + 1) * 0.5;
        const alpha = 0.05 + depth * 0.32;
        const size = 0.7 + depth * 0.65;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 243, 239, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

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

        if (matchesFilter && (isActive || (isFront && dhakaProj.z > -0.25))) {
          const midX = (dhakaProj.px + proj.px) * 0.5;
          const midY = (dhakaProj.py + proj.py) * 0.5;
          const dx = midX - cx;
          const dy = midY - cy;
          const lift = isActive ? 1.34 : 1.16;
          const ctrlX = cx + dx * lift;
          const ctrlY = cy + dy * lift;

          ctx.beginPath();
          ctx.moveTo(dhakaProj.px, dhakaProj.py);
          ctx.quadraticCurveTo(ctrlX, ctrlY, proj.px, proj.py);
          ctx.strokeStyle = isActive ? color : getKindRgba(node.kind, 0.28);
          ctx.lineWidth = isActive ? 1.8 : 0.85;
          if (!isActive) ctx.setLineDash([2, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        if (!matchesFilter) {
          if (isFront) {
            ctx.beginPath();
            ctx.arc(proj.px, proj.py, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(244, 243, 239, 0.14)';
            ctx.fill();
          }
          continue;
        }

        if (proj.z < -0.15 && !isActive) {
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(244, 243, 239, 0.18)';
          ctx.fill();
          continue;
        }

        if (isActive) {
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 13, 0, Math.PI * 2);
          ctx.fillStyle = getKindRgba(node.kind, 0.18);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 8, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 4, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();

          const tag = node.shortLabel;
          ctx.font = '600 11px "Inter", sans-serif';
          const textW = ctx.measureText(tag).width;
          const labelX = proj.px + 14 + textW + 14 > width ? proj.px - textW - 26 : proj.px + 12;
          const labelY = proj.py - 10;
          ctx.fillStyle = 'rgba(12, 13, 18, 0.94)';
          ctx.beginPath();
          ctx.roundRect(labelX, labelY, textW + 14, 20, 999);
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.1;
          ctx.stroke();
          ctx.fillStyle = '#f4f3ef';
          ctx.fillText(tag, labelX + 7, labelY + 13.5);
        } else {
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 5.2, 0, Math.PI * 2);
          ctx.strokeStyle = getKindRgba(node.kind, 0.42);
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();

          if (proj.z > 0.48) {
            ctx.font = '500 10px "Inter", sans-serif';
            ctx.fillStyle = 'rgba(244, 243, 239, 0.8)';
            ctx.fillText(node.shortLabel, proj.px + 8, proj.py + 3.5);
          }
        }
      }

      if (dhakaProj.z > -0.2) {
        ctx.beginPath();
        ctx.arc(dhakaProj.px, dhakaProj.py, 7.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(244, 243, 239, 0.7)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(dhakaProj.px, dhakaProj.py, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#f4f3ef';
        ctx.fill();

        ctx.font = '600 9.5px "Inter", sans-serif';
        ctx.fillStyle = '#f4f3ef';
        ctx.fillText('Dhaka Hub', dhakaProj.px + 10, dhakaProj.py - 6);
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
    <div className="relative w-full flex flex-col justify-between rounded-3xl border border-white/[0.12] bg-[#131620]/90 p-5 shadow-2xl">
      {/* Header & Orbit Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
          <span className="text-xs font-semibold tracking-tight text-[#f4f3ef]">
            Interactive Work &amp; Research Map
          </span>
          <span className="text-[11px] text-[#94a3b8]">· 15 nodes</span>
        </div>

        <button
          type="button"
          onClick={() => setAutoRotate((prev) => !prev)}
          aria-label={autoRotate ? 'Pause globe rotation' : 'Resume globe rotation'}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium border border-white/[0.12] bg-[#0c0d12] text-[#cbd5e1] hover:text-white hover:border-[#3b82f6] transition-colors"
        >
          {autoRotate ? <Pause size={10} /> : <Play size={10} />}
          <span>{autoRotate ? 'Auto-Orbit' : 'Paused'}</span>
        </button>
      </div>

      {/* Category Filter Pills & Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-3 border-b border-white/[0.06]">
        <div className="flex flex-wrap gap-1.5 text-[11px] font-medium">
          {[
            { id: 'all', label: 'All (15)', dot: '#f4f3ef' },
            { id: 'live', label: 'Live AI (4)', dot: '#10b981' },
            { id: 'vision', label: 'Vision (2)', dot: '#3b82f6' },
            { id: 'dev', label: 'Dev Tools (5)', dot: '#f59e0b' },
            { id: 'research', label: 'Research (4)', dot: '#a78bfa' },
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
                style={{
                  borderColor: isSel ? tab.dot : undefined,
                  backgroundColor: isSel ? `${tab.dot}22` : undefined,
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 border transition-colors ${
                  isSel
                    ? 'text-white font-semibold'
                    : 'border-white/[0.1] bg-[#0c0d12] text-[#94a3b8] hover:text-white'
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
            className="p-1.5 rounded-full border border-white/[0.1] bg-[#0c0d12] text-[#94a3b8] hover:text-white hover:border-[#3b82f6] transition-colors"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            type="button"
            onClick={() => stepNode(1)}
            aria-label="Next project node"
            className="p-1.5 rounded-full border border-white/[0.1] bg-[#0c0d12] text-[#94a3b8] hover:text-white hover:border-[#3b82f6] transition-colors"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Interactive Globe Canvas */}
      <div className="relative w-full aspect-square max-w-[330px] mx-auto my-1">
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          aria-label="Interactive globe mapping Md Tahmid Zoayed's projects and research nodes"
        />
      </div>

      {/* Selectable Project Chips */}
      <div className="flex flex-wrap gap-1.5 py-2.5 border-t border-white/[0.06] max-h-[68px] overflow-y-auto">
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
              style={{
                borderColor: isSel ? dotColor : undefined,
                backgroundColor: isSel ? `${dotColor}22` : undefined,
              }}
              className={`inline-flex items-center gap-1.5 rounded-full text-[10.5px] font-medium px-2.5 py-0.5 border transition-colors ${
                isSel
                  ? 'text-white font-semibold'
                  : 'border-white/[0.08] bg-[#0c0d12] text-[#94a3b8] hover:text-white hover:border-white/25'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
              <span>{node.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Active Node Inspector Card */}
      <div className="mt-2 rounded-2xl border border-white/[0.1] bg-[#0c0d12] p-4 space-y-2.5">
        <div className="flex items-center justify-between gap-2 text-[11px] font-medium">
          <span className="inline-flex items-center gap-1.5" style={{ color: activeColor }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColor }} />
            {activeNode.status}
          </span>
          <span className="font-mono-tech text-[10px] text-[#64748b]">{activeNode.code}</span>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-[#f4f3ef]">{activeNode.name}</h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed mt-0.5">{activeNode.summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <a
            href={activeNode.sectionHref}
            onClick={() => {
              if (activeNode.sectionHref.startsWith('#sys-') && onInspectSystem) {
                onInspectSystem(activeNode.id);
              }
            }}
            style={{ backgroundColor: activeColor }}
            className="inline-flex items-center gap-1.5 rounded-full text-[11px] px-3.5 py-1.5 text-[#0c0d12] font-semibold hover:opacity-90 transition-opacity"
          >
            <span>Inspect Details</span>
            <ArrowDownRight size={12} />
          </a>
          <a
            href={activeNode.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full text-[11px] px-3.5 py-1.5 border border-white/15 bg-[#131620] text-[#f4f3ef] hover:border-white/40 transition-colors font-medium"
          >
            <span>{activeNode.externalLabel}</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
