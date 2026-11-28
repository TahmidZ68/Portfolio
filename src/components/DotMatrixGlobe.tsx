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
  kindLabel: string;
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
    kindLabel: 'COMPUTER VISION',
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
    kindLabel: 'DEV DIAGNOSTICS',
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
    kindLabel: 'VISION DATA AUDIT',
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
    kindLabel: 'CONTRACT ENGINE',
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
    kindLabel: 'RELIABILITY',
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
    kindLabel: 'LIVE AI PLATFORM',
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
    kindLabel: 'REPO AUDITOR',
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
    kindLabel: 'WEB AUTOMATION',
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
    kindLabel: 'LIVE AI PLATFORM',
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
    kindLabel: 'LIVE AI PLATFORM',
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
    kindLabel: 'LIVE AI PLATFORM',
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
    kindLabel: 'RESEARCH STUDY',
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
    kindLabel: 'RESEARCH STUDY',
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
    kindLabel: 'FUNDED GRANT',
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
    kindLabel: 'PUBLISHED PAPERS',
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
      return '#00D6B4';
    case 'vision':
      return '#38BDF8';
    case 'dev':
      return '#FFC857';
    case 'research':
      return '#8B5CF6';
  }
}

function getKindRgba(kind: NodeKind, alpha: number): string {
  switch (kind) {
    case 'live':
      return `rgba(0, 214, 180, ${alpha})`;
    case 'vision':
      return `rgba(56, 189, 248, ${alpha})`;
    case 'dev':
      return `rgba(255, 200, 87, ${alpha})`;
    case 'research':
      return `rgba(139, 92, 246, ${alpha})`;
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
 * Dark Swiss Editorial Work & Research Atlas — 15 Interactive Nodes anchored to Dhaka Hub.
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

    let width = 330;
    let height = 330;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = Math.max(240, rect?.width || 330);
      height = Math.max(240, rect?.height || 330);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

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

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;

      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      pointer.targetX = nx * 0.22;
      pointer.targetY = ny * 0.16;

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
        canvas.style.cursor = closestId ? 'pointer' : 'crosshair';
      } else if (stateRef.current.hoveredId !== null) {
        setHoveredId(null);
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let closestId: string | null = null;
      let closestDist = 28;
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
    let tiltX = 0.22;
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
        angleY += 0.002;
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
      const outerRadius = Math.min(width, height) * 0.44;
      const sphereRadius = Math.min(width, height) * 0.37;

      const grad = ctx.createRadialGradient(cx, cy, sphereRadius * 0.12, cx, cy, outerRadius);
      grad.addColorStop(0, 'rgba(139, 92, 246, 0.12)');
      grad.addColorStop(0.55, 'rgba(59, 130, 246, 0.05)');
      grad.addColorStop(1, 'rgba(9, 10, 15, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(41, 45, 58, 0.75)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - outerRadius - 6, cy);
      ctx.lineTo(cx + outerRadius + 6, cy);
      ctx.moveTo(cx, cy - outerRadius - 6);
      ctx.lineTo(cx, cy + outerRadius + 6);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = '#292D3A';
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let deg = 0; deg < 360; deg += 15) {
        const rad = (deg * Math.PI) / 180;
        const rIn = deg % 45 === 0 ? outerRadius - 6 : outerRadius - 3;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rad) * rIn, cy + Math.sin(rad) * rIn);
        ctx.lineTo(cx + Math.cos(rad) * outerRadius, cy + Math.sin(rad) * outerRadius);
        ctx.strokeStyle = deg % 45 === 0 ? '#707586' : '#292D3A';
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(17, 19, 27, 0.85)';
      ctx.fill();
      ctx.strokeStyle = '#292D3A';
      ctx.stroke();

      const rotY = angleY + (stateRef.current.targetAngleY === null ? pointer.x : 0);
      const rotX = tiltX + (stateRef.current.targetTiltX === null ? pointer.y : 0);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (const p of bgPoints) {
        const proj = projectVec(p, cx, cy, sphereRadius, cosY, sinY, cosX, sinX);
        const depth = (proj.z + 1) * 0.5;
        const alpha = 0.08 + depth * 0.34;
        const size = 0.65 + depth * 0.58;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(161, 165, 179, ${alpha.toFixed(3)})`;
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
          const lift = isActive ? 1.32 : 1.14;
          const ctrlX = cx + dx * lift;
          const ctrlY = cy + dy * lift;

          ctx.beginPath();
          ctx.moveTo(dhakaProj.px, dhakaProj.py);
          ctx.quadraticCurveTo(ctrlX, ctrlY, proj.px, proj.py);
          ctx.strokeStyle = isActive ? color : getKindRgba(node.kind, 0.22);
          ctx.lineWidth = isActive ? 1.6 : 0.75;
          if (!isActive) ctx.setLineDash([2, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        if (!matchesFilter) {
          if (isFront) {
            ctx.beginPath();
            ctx.arc(proj.px, proj.py, 1.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(112, 117, 134, 0.2)';
            ctx.fill();
          }
          continue;
        }

        if (proj.z < -0.15 && !isActive) {
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(112, 117, 134, 0.28)';
          ctx.fill();
          continue;
        }

        if (isActive) {
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 10, 0, Math.PI * 2);
          ctx.fillStyle = getKindRgba(node.kind, 0.15);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 8, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          ctx.fillStyle = color;
          ctx.fillRect(proj.px - 3, proj.py - 3, 6, 6);

          const tag = `${node.code} · ${node.shortLabel}`;
          ctx.font = '600 9.5px "JetBrains Mono", monospace';
          const textW = ctx.measureText(tag).width;
          const boxW = textW + 12;
          const rawX = proj.px + 11 + boxW > width - 6 ? proj.px - boxW - 11 : proj.px + 11;
          const labelX = Math.max(6, Math.min(width - boxW - 6, rawX));
          const labelY = Math.max(6, Math.min(height - 26, proj.py - 10));

          ctx.fillStyle = 'rgba(9, 10, 15, 0.94)';
          ctx.fillRect(labelX, labelY, boxW, 19);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.strokeRect(labelX, labelY, boxW, 19);
          ctx.fillStyle = '#F5F5F7';
          ctx.fillText(tag, labelX + 6, labelY + 12.5);
        } else {
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 5.2, 0, Math.PI * 2);
          ctx.strokeStyle = getKindRgba(node.kind, 0.35);
          ctx.lineWidth = 0.9;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 2.7, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();

          if (proj.z > 0.44 && width >= 300) {
            ctx.font = '500 9px "JetBrains Mono", monospace';
            ctx.fillStyle = '#A1A5B3';
            ctx.fillText(node.shortLabel, proj.px + 8, proj.py + 3);
          }
        }
      }

      if (dhakaProj.z > -0.2) {
        ctx.strokeStyle = '#FF5B5B';
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(dhakaProj.px - 6, dhakaProj.py);
        ctx.lineTo(dhakaProj.px + 6, dhakaProj.py);
        ctx.moveTo(dhakaProj.px, dhakaProj.py - 6);
        ctx.lineTo(dhakaProj.px, dhakaProj.py + 6);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(dhakaProj.px, dhakaProj.py, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = '#FF5B5B';
        ctx.fill();

        ctx.font = '600 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#F5F5F7';
        ctx.fillText('DHAKA', Math.min(width - 42, dhakaProj.px + 8), Math.max(12, dhakaProj.py - 5));
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
  const handleInspectClick = () => {
    if (activeNode.sectionHref.startsWith('#sys-') && onInspectSystem) {
      onInspectSystem(activeNode.id);
    }
  };

  return (
    <div className="w-full rounded-md border border-[#292D3A] bg-[#11131B] flex flex-col justify-between overflow-hidden">
      {/* Header & Orbit Control */}
      <div className="flex items-center justify-between gap-2 px-3.5 sm:px-4 py-3 border-b border-[#292D3A] bg-[#171A25]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-xs bg-[#8B5CF6] shrink-0" />
          <span className="font-mono-tech text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#F5F5F7] truncate">
            FIG. 00 · WORK &amp; RESEARCH ATLAS
          </span>
          <span className="hidden sm:inline font-mono-tech text-[10.5px] text-[#707586] shrink-0">
            / 15 NODES
          </span>
        </div>

        <button
          type="button"
          onClick={() => setAutoRotate((prev) => !prev)}
          aria-label={autoRotate ? 'Pause globe rotation' : 'Resume globe rotation'}
          className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-wider border border-[#292D3A] bg-[#090A0F] text-[#A1A5B3] hover:text-[#F5F5F7] hover:border-[#3B82F6] transition-colors shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
        >
          {autoRotate ? <Pause size={10} /> : <Play size={10} />}
          <span>{autoRotate ? 'Orbit On' : 'Paused'}</span>
        </button>
      </div>

      {/* Category Filter Rail & Node Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 px-3.5 sm:px-4 py-2 border-b border-[#292D3A] bg-[#11131B]">
        <div
          className="flex flex-wrap gap-1 font-mono-tech text-[10px]"
          role="tablist"
          aria-label="Filter globe nodes"
        >
          {[
            { id: 'all', label: 'ALL (15)', color: '#F5F5F7' },
            { id: 'live', label: 'LIVE AI (4)', color: '#00D6B4' },
            { id: 'vision', label: 'VISION (2)', color: '#38BDF8' },
            { id: 'dev', label: 'DEV TOOLS (5)', color: '#FFC857' },
            { id: 'research', label: 'RESEARCH (4)', color: '#8B5CF6' },
          ].map((tab) => {
            const isSel = filterKind === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSel}
                onClick={() => {
                  const nextKind = tab.id as 'all' | NodeKind;
                  setFilterKind(nextKind);
                  const first =
                    nextKind === 'all'
                      ? WORK_NODES[0]
                      : WORK_NODES.find((n) => n.kind === nextKind);
                  if (first) focusNode(first);
                }}
                style={
                  isSel
                    ? {
                        borderColor: tab.color,
                        backgroundColor: `${tab.color}18`,
                        color: tab.color,
                      }
                    : undefined
                }
                className={`inline-flex items-center gap-1.5 rounded px-2 py-1 border transition-colors uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                  isSel
                    ? 'font-semibold'
                    : 'border-[#292D3A] bg-[#171A25] text-[#A1A5B3] hover:text-[#F5F5F7] hover:border-[#707586]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tab.color }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => stepNode(-1)}
            aria-label="Previous project node"
            className="p-1.5 rounded border border-[#292D3A] bg-[#171A25] text-[#A1A5B3] hover:text-[#F5F5F7] hover:border-[#3B82F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            type="button"
            onClick={() => stepNode(1)}
            aria-label="Next project node"
            className="p-1.5 rounded border border-[#292D3A] bg-[#171A25] text-[#A1A5B3] hover:text-[#F5F5F7] hover:border-[#3B82F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Interactive Globe Canvas */}
      <div className="relative w-full aspect-square max-w-[310px] sm:max-w-[330px] mx-auto my-1.5 px-2">
        <canvas
          ref={canvasRef}
          className="block w-full h-full touch-pan-y"
          aria-label="Interactive globe mapping Md Tahmid Zoayed's projects and research nodes"
        />
      </div>

      {/* Selectable Project Node Index Strip */}
      <div className="flex flex-wrap gap-1.5 px-3.5 sm:px-4 py-2.5 border-t border-[#292D3A] bg-[#090A0F]/60 max-h-[88px] sm:max-h-[76px] overflow-y-auto">
        {visibleNodes.map((node) => {
          const isSel = node.id === activeNode.id;
          const col = getKindColor(node.kind);
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                focusNode(node);
                setAutoRotate(false);
              }}
              style={
                isSel
                  ? {
                      borderColor: col,
                      backgroundColor: `${col}20`,
                      color: '#F5F5F7',
                    }
                  : undefined
              }
              className={`inline-flex items-center gap-1.5 rounded font-mono-tech text-[10px] px-2.5 py-1 border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                isSel
                  ? 'font-semibold'
                  : 'border-[#292D3A] bg-[#171A25] text-[#A1A5B3] hover:text-[#F5F5F7] hover:border-[#707586]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: col }} />
              <span>{node.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Active Specimen Inspector Readout */}
      <div className="border-t border-[#292D3A] bg-[#171A25] p-4 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10.5px]">
          <span
            className="inline-flex items-center gap-1.5 font-semibold uppercase"
            style={{ color: activeColor }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeColor }} />
            <span>{activeNode.code}</span>
            <span className="text-[#707586]">/</span>
            <span className="text-[#A1A5B3]">{activeNode.kindLabel}</span>
          </span>
          <span className="text-[#707586]">{activeNode.status}</span>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-[#F5F5F7] leading-tight">
            {activeNode.name}
          </h2>
          <p className="text-xs text-[#A1A5B3] leading-relaxed mt-1">{activeNode.summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <a
            href={activeNode.sectionHref.startsWith('#sys-') ? '#system-detail-panel' : activeNode.sectionHref}
            onClick={handleInspectClick}
            style={{ backgroundColor: activeColor }}
            className="inline-flex items-center gap-1.5 rounded font-mono-tech text-[11px] uppercase tracking-wider px-3.5 py-2 text-[#090A0F] hover:opacity-90 transition-opacity font-semibold"
          >
            <span>Inspect System</span>
            <ArrowDownRight size={12} />
          </a>
          <a
            href={activeNode.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded font-mono-tech text-[11px] uppercase tracking-wider px-3.5 py-2 border border-[#292D3A] bg-[#11131B] text-[#F5F5F7] hover:border-[#3B82F6] transition-colors font-medium"
          >
            <span>{activeNode.externalLabel}</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
