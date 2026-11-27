import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Cpu,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Layers,
  Terminal,
} from 'lucide-react';
import { engineeredSystems, type EngineeredSystem, type SystemActionLink } from '@/content';

type DomainFilter = 'all' | 'production-ai' | 'cv-robustness' | 'dev-automation';

interface AccentPalette {
  hex: string;
  secondaryHex: string;
  label: string;
  pillClass: string;
}

function getSystemPalette(sys: EngineeredSystem): AccentPalette {
  if (sys.id === 'degradelab' || sys.id === 'dataset-medic') {
    return {
      hex: '#3b82f6',
      secondaryHex: '#60a5fa',
      label: 'Computer Vision',
      pillClass: 'border-blue-400/35 text-blue-300 bg-blue-500/15',
    };
  }
  if (sys.domain === 'production-ai' || sys.id === 'vellum-research') {
    return {
      hex: '#10b981',
      secondaryHex: '#34d399',
      label: 'Live AI Platform',
      pillClass: 'border-emerald-400/35 text-emerald-300 bg-emerald-500/15',
    };
  }
  return {
    hex: '#f59e0b',
    secondaryHex: '#fbbf24',
    label: 'Dev & Automation',
    pillClass: 'border-amber-400/35 text-amber-300 bg-amber-500/15',
  };
}

function matchesDomainFilter(sys: EngineeredSystem, filter: DomainFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'production-ai') {
    return sys.domain === 'production-ai' || sys.id === 'vellum-research';
  }
  if (filter === 'cv-robustness') {
    return sys.id === 'degradelab' || sys.id === 'dataset-medic';
  }
  return (
    sys.id === 'diagora' ||
    sys.id === 'api-detective' ||
    sys.id === 'flowsentry' ||
    sys.id === 'repo-medic' ||
    sys.id === 'website-auditor'
  );
}

function getActionIcon(label: SystemActionLink['label']) {
  switch (label) {
    case 'Live Demo':
      return <ExternalLink size={13} />;
    case 'GitHub':
      return <Github size={13} />;
    case 'Documentation':
      return <BookOpen size={13} />;
    default:
      return <ArrowUpRight size={13} />;
  }
}

interface SystemsBlueprintSectionProps {
  externalSelectedSystemId?: string | null;
}

const FEATURED_IDS = ['axios-talent', 'axios-insight', 'degradelab', 'diagora'];

export function SystemsBlueprintSection({ externalSelectedSystemId }: SystemsBlueprintSectionProps) {
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('all');
  const [selectedSystemId, setSelectedSystemId] = useState<string>('degradelab');
  const [activePreviewIdx, setActivePreviewIdx] = useState<Record<string, number>>({});

  useEffect(() => {
    if (externalSelectedSystemId && engineeredSystems.some((s) => s.id === externalSelectedSystemId)) {
      setDomainFilter('all');
      setSelectedSystemId(externalSelectedSystemId);
    }
  }, [externalSelectedSystemId]);

  const filteredSystems = engineeredSystems.filter((sys) => matchesDomainFilter(sys, domainFilter));
  const activeSystem =
    filteredSystems.find((s) => s.id === selectedSystemId) ||
    engineeredSystems.find((s) => s.id === selectedSystemId) ||
    filteredSystems[0] ||
    engineeredSystems[0];

  const activePalette = getSystemPalette(activeSystem);
  const currentImgIdx = activePreviewIdx[activeSystem.id] || 0;
  const currentPreview = activeSystem.previews?.[currentImgIdx];

  const featuredSystems = FEATURED_IDS.map((id) =>
    engineeredSystems.find((s) => s.id === id),
  ).filter((s): s is EngineeredSystem => Boolean(s));

  const setPreview = (sysId: string, idx: number) => {
    setActivePreviewIdx((prev) => ({ ...prev, [sysId]: idx }));
  };

  return (
    <section
      id="systems"
      className="bg-[#0c0d12] editorial-dark-glow text-[#f4f3ef] scroll-mt-16"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-24 sm:py-32">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08]">
          <div className="lg:col-span-7 space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-400/25">
              03 · Selected Systems &amp; Products
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f4f3ef] leading-[1.02]">
              Engineered Systems.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base text-[#94a3b8] leading-relaxed">
              Every project is built as a complete system—combining deterministic validation,
              explicit data contracts, and practical AI/ML execution across live Vercel products,
              computer vision tools, and developer diagnostics.
            </p>
          </div>
        </div>

        {/* TIER 1: 4-CARD FLAGSHIP SPOTLIGHT BENTO */}
        <div className="mt-12 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-[#f4f3ef]">
              Featured Live Products &amp; Latest Open-Source Tools
            </h3>
            <span className="text-xs text-[#94a3b8]">
              Select any card to load its architecture below
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {featuredSystems.map((sys) => {
              const pal = getSystemPalette(sys);
              const thumb = sys.previews?.[0];
              const isSelected = activeSystem.id === sys.id;
              return (
                <div
                  key={`bento-${sys.id}`}
                  className={`rounded-3xl border bg-[#131620] overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-0.5 hover:border-white/25 ${
                    isSelected ? 'border-white/30 shadow-xl' : 'border-white/[0.09]'
                  }`}
                >
                  <div>
                    {thumb && (
                      <div className="relative h-44 overflow-hidden border-b border-white/[0.08] bg-[#080a10] group">
                        <img
                          src={thumb.src}
                          alt={thumb.caption}
                          loading="lazy"
                          className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`rounded-full text-[11px] font-medium px-3 py-1 border backdrop-blur-md ${pal.pillClass}`}
                          >
                            {pal.label}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6 space-y-2.5">
                      <div className="text-xs font-medium" style={{ color: pal.hex }}>
                        {sys.status}
                      </div>
                      <h4 className="font-display text-2xl font-bold text-[#f4f3ef]">
                        {sys.name}
                      </h4>
                      <p className="text-sm text-[#94a3b8] leading-relaxed line-clamp-3">
                        {sys.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-2">
                    <a
                      href="#system-explorer"
                      onClick={() => setSelectedSystemId(sys.id)}
                      style={{ color: pal.hex }}
                      className="inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                    >
                      <span>Inspect System</span>
                      <ArrowDownRight size={13} />
                    </a>

                    {sys.links[0] && (
                      <a
                        href={sys.links[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full text-xs font-medium px-3.5 py-1.5 border border-white/15 bg-[#0c0d12] text-[#f4f3ef] hover:border-white/40 transition-colors"
                      >
                        {getActionIcon(sys.links[0].label)}
                        <span>{sys.links[0].label}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIER 2: INTERACTIVE ARCHITECTURE EXPLORER (ALL 11 SYSTEMS) */}
        <div id="system-explorer" className="mt-16 scroll-mt-24 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#f4f3ef]">
                All 11 Engineered Systems
              </h3>
              <p className="text-sm text-[#94a3b8] mt-0.5">
                Browse by domain or select any system to explore its interface previews, pipeline,
                and verified links.
              </p>
            </div>

            {/* Domain Filter Pills */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter systems by domain">
              {[
                { id: 'all', label: 'All (11)', color: '#3b82f6' },
                { id: 'production-ai', label: 'Live AI Platforms (4)', color: '#10b981' },
                { id: 'cv-robustness', label: 'Computer Vision (2)', color: '#3b82f6' },
                { id: 'dev-automation', label: 'Dev & Automation (5)', color: '#f59e0b' },
              ].map((tab) => {
                const active = domainFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      const next = tab.id as DomainFilter;
                      setDomainFilter(next);
                      const firstMatch = engineeredSystems.find((s) =>
                        matchesDomainFilter(s, next),
                      );
                      if (firstMatch) setSelectedSystemId(firstMatch.id);
                    }}
                    style={
                      active
                        ? {
                            backgroundColor: tab.color,
                            borderColor: tab.color,
                            color: '#0c0d12',
                          }
                        : undefined
                    }
                    className={`inline-flex items-center gap-2 rounded-full text-xs px-4 py-2 border font-medium transition-colors ${
                      active
                        ? 'font-semibold'
                        : 'border-white/[0.12] bg-[#131620] text-[#cbd5e1] hover:text-white hover:border-white/30'
                    }`}
                  >
                    {!active && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: tab.color }}
                      />
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Master-Detail Explorer Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Selector List (4 cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-white/[0.1] bg-[#131620] overflow-hidden divide-y divide-white/[0.06]">
              {filteredSystems.map((sys) => {
                const pal = getSystemPalette(sys);
                const isSel = activeSystem.id === sys.id;
                return (
                  <button
                    key={sys.id}
                    id={`sys-${sys.id}`}
                    type="button"
                    onClick={() => setSelectedSystemId(sys.id)}
                    style={
                      isSel
                        ? {
                            backgroundColor: `${pal.hex}18`,
                          }
                        : undefined
                    }
                    className="w-full text-left px-5 py-4 transition-colors hover:bg-white/[0.03] flex items-center justify-between gap-3 scroll-mt-24"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] font-medium">
                        <span style={{ color: pal.hex }}>{sys.status}</span>
                      </div>
                      <div
                        className={`font-display text-base sm:text-lg font-bold truncate ${
                          isSel ? 'text-white' : 'text-[#cbd5e1]'
                        }`}
                      >
                        {sys.name}
                      </div>
                      <p className="text-xs text-[#64748b] truncate">{sys.classification}</p>
                    </div>
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform"
                      style={{
                        backgroundColor: pal.hex,
                        transform: isSel ? 'scale(1.2)' : 'scale(0.85)',
                        opacity: isSel ? 1 : 0.4,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Active System Detail Card (8 cols) */}
            <div className="lg:col-span-8 rounded-3xl border border-white/[0.12] bg-[#131620] p-6 sm:p-8 lg:p-10 space-y-7 shadow-2xl">
              {/* Top Header & Action Pills */}
              <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 pb-6 border-b border-white/[0.08]">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`rounded-full text-xs font-medium px-3 py-1 border ${activePalette.pillClass}`}
                    >
                      {activePalette.label}
                    </span>
                    <span className="text-xs text-[#94a3b8] font-medium">
                      {activeSystem.status}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4f3ef]">
                    {activeSystem.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed max-w-3xl">
                    {activeSystem.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  {activeSystem.links.map((link, idx) => {
                    const isPrimary = idx === 0;
                    return (
                      <a
                        key={`${activeSystem.id}-link-${idx}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        style={
                          isPrimary
                            ? {
                                backgroundColor: activePalette.hex,
                                borderColor: activePalette.hex,
                              }
                            : undefined
                        }
                        className={`inline-flex items-center gap-2 rounded-full text-xs px-4 py-2.5 border font-semibold transition-all ${
                          isPrimary
                            ? 'text-[#0c0d12] hover:opacity-90'
                            : 'border-white/15 bg-[#0c0d12] text-[#f4f3ef] hover:border-white/40'
                        }`}
                      >
                        {getActionIcon(link.label)}
                        <span>
                          {link.label}
                          {link.sublabel ? ` · ${link.sublabel}` : ''}
                        </span>
                        <ArrowUpRight size={13} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Multi-View Interface & Output Previews */}
              {activeSystem.previews && activeSystem.previews.length > 0 && currentPreview && (
                <div className="rounded-2xl border border-white/[0.1] bg-[#0a0c12] p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-medium text-[#cbd5e1] flex items-center gap-2">
                      <ImageIcon size={14} style={{ color: activePalette.hex }} />
                      {currentPreview.caption}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSystem.previews.map((prv, idx) => (
                        <button
                          key={prv.src}
                          type="button"
                          onClick={() => setPreview(activeSystem.id, idx)}
                          style={
                            idx === currentImgIdx
                              ? {
                                  backgroundColor: activePalette.hex,
                                  borderColor: activePalette.hex,
                                  color: '#0c0d12',
                                }
                              : undefined
                          }
                          className={`rounded-full text-[11px] px-3 py-1 border font-semibold transition-colors ${
                            idx === currentImgIdx
                              ? ''
                              : 'border-white/15 bg-[#131620] text-[#94a3b8] hover:text-white'
                          }`}
                        >
                          View {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#06070b]">
                    <img
                      src={currentPreview.src}
                      alt={currentPreview.caption}
                      loading="lazy"
                      className="w-full max-h-[420px] object-contain mx-auto block"
                    />
                  </div>
                </div>
              )}

              {/* Problem Addressed vs System Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/[0.08] bg-[#0c0d12] p-5 space-y-2">
                  <span
                    className="text-xs font-semibold flex items-center gap-2"
                    style={{ color: activePalette.hex }}
                  >
                    <Terminal size={13} /> Problem Addressed
                  </span>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">
                    {activeSystem.problemAddressed}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-[#0c0d12] p-5 space-y-2">
                  <span
                    className="text-xs font-semibold flex items-center gap-2"
                    style={{ color: activePalette.secondaryHex }}
                  >
                    <Cpu size={13} /> System Architecture
                  </span>
                  <p className="text-sm text-[#cbd5e1] leading-relaxed">
                    {activeSystem.architectureSummary}
                  </p>
                </div>
              </div>

              {/* 4-Stage Pipeline Cards */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#cbd5e1] flex items-center gap-2">
                  <Layers size={14} style={{ color: activePalette.hex }} />
                  4-Stage Execution Pipeline
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  {activeSystem.architecturePipeline.map((node, i) => (
                    <div
                      key={node.stage}
                      className="rounded-2xl border border-white/[0.08] bg-[#0c0d12] p-4 flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span style={{ color: activePalette.hex }}>Step 0{i + 1}</span>
                        <span className="text-[#64748b]">{i < 3 ? '→' : '●'}</span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-[#f4f3ef]">
                        {node.node}
                      </h4>
                      <p className="text-xs text-[#94a3b8] leading-relaxed">{node.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications & Technology Pills */}
              <div className="border-t border-white/[0.08] pt-5 space-y-4">
                <ul className="space-y-2 text-sm text-[#cbd5e1]">
                  {activeSystem.technicalSpecifications.map((spec) => (
                    <li key={spec} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: activePalette.hex }}
                      />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {activeSystem.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full text-xs font-medium px-3 py-1 border border-white/[0.1] bg-[#0c0d12] text-[#cbd5e1]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
