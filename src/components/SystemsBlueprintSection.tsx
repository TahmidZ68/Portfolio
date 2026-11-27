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
  badgeClass: string;
}

/**
 * Maps each system to the intentional 4-pillar Multi-Spectrum Color System:
 * - Live AI Platforms (Axios Insight, Axios Talent, Candidate, Vellum Research): Emerald (#10b981)
 * - Computer Vision & Robustness (DegradeLab, DatasetMedic): Electric Cyan & Cobalt (#38bdf8 / #6366f1)
 * - Developer & Automation Systems (Diagora, API Detective, FlowSentry, RepoMedic, Website Auditor): Warm Amber (#f59e0b)
 */
function getSystemPalette(sys: EngineeredSystem): AccentPalette {
  if (sys.id === 'degradelab' || sys.id === 'dataset-medic') {
    return {
      hex: '#38bdf8',
      secondaryHex: '#6366f1',
      label: 'CV & ROBUSTNESS',
      badgeClass: 'border-[#38bdf8]/45 text-[#38bdf8] bg-[#38bdf8]/10',
    };
  }
  if (sys.domain === 'production-ai' || sys.id === 'vellum-research') {
    return {
      hex: '#10b981',
      secondaryHex: '#34d399',
      label: 'LIVE AI PLATFORM',
      badgeClass: 'border-emerald-400/45 text-emerald-300 bg-emerald-400/10',
    };
  }
  return {
    hex: '#f59e0b',
    secondaryHex: '#fb923c',
    label: 'DEV & AUTOMATION',
    badgeClass: 'border-amber-400/45 text-amber-300 bg-amber-400/10',
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
      className="border-b border-white/[0.08] bg-[#07090e] lab-grid-bg ambient-systems-glow scroll-mt-16"
    >
      <div className="spectrum-divider" />
      <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08]">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em]">
              <span className="text-[#38bdf8]">03 // SYSTEMS</span>
              <span className="text-white/20">—</span>
              <span className="text-[#94a3b8]">11 ENGINEERED ARCHITECTURES &amp; LIVE PRODUCTS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[#f2f0ea] leading-[0.95] uppercase">
              Engineered Systems.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              Color-coded across three engineering pillars: live AI platforms in{' '}
              <span className="text-emerald-400 font-medium">Emerald</span>, computer vision
              robustness in <span className="text-[#38bdf8] font-medium">Cyan</span>, and developer
              diagnostics &amp; automation in{' '}
              <span className="text-amber-400 font-medium">Amber</span>.
            </p>
          </div>
        </div>

        {/* TIER 1: 4-CARD SPOTLIGHT BENTO (WITH VISUAL THUMBNAILS) */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#94a3b8]">
            <span>FLAGSHIP SPOTLIGHT // LIVE PRODUCTS &amp; LATEST RELEASES</span>
            <span className="text-[#38bdf8]">CLICK ANY CARD TO INSPECT FULL PIPELINE BELOW</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {featuredSystems.map((sys) => {
              const pal = getSystemPalette(sys);
              const thumb = sys.previews?.[0];
              const isSelected = activeSystem.id === sys.id;
              return (
                <div
                  key={`bento-${sys.id}`}
                  style={{ borderTopWidth: '2px', borderTopColor: pal.hex }}
                  className={`border border-white/[0.1] bg-[#0b101b]/90 flex flex-col justify-between transition-all hover:border-white/[0.25] ${
                    isSelected ? 'ring-1 ring-white/20' : ''
                  }`}
                >
                  <div>
                    {thumb && (
                      <div className="relative h-40 overflow-hidden border-b border-white/[0.08] bg-[#05070c] group">
                        <img
                          src={thumb.src}
                          alt={thumb.caption}
                          loading="lazy"
                          className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span
                            className={`font-mono-tech text-[9.5px] px-2 py-0.5 border backdrop-blur-md ${pal.badgeClass}`}
                          >
                            {sys.code} · {pal.label}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px]">
                        <span style={{ color: pal.hex }}>{sys.status}</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[#f2f0ea]">
                        {sys.name}
                      </h3>
                      <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-3">
                        {sys.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-2">
                    <a
                      href={`#system-explorer`}
                      onClick={() => setSelectedSystemId(sys.id)}
                      style={{ color: pal.hex }}
                      className="inline-flex items-center gap-1 font-mono-tech text-[11px] font-semibold hover:underline"
                    >
                      <span>Inspect Architecture</span>
                      <ArrowDownRight size={12} />
                    </a>

                    {sys.links[0] && (
                      <a
                        href={sys.links[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono-tech text-[10px] px-2.5 py-1 border border-white/15 bg-[#07090e] text-[#f2f0ea] hover:border-white/40 transition-colors"
                      >
                        {getActionIcon(sys.links[0].label)}
                        <span>{sys.links[0].label}</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIER 2: INTERACTIVE MASTER-DETAIL SYSTEM EXPLORER (ALL 11 SYSTEMS) */}
        <div id="system-explorer" className="mt-16 scroll-mt-24 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <p className="font-mono-tech text-xs uppercase tracking-widest text-[#f2f0ea]">
                INTERACTIVE ARCHITECTURE EXPLORER · ALL 11 SYSTEMS
              </p>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Select any system from the registry to inspect its 4-stage pipeline, interface
                previews, problem statement, and verified links.
              </p>
            </div>

            {/* Domain Filter Tabs */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter systems by pillar">
              {[
                { id: 'all', label: 'All Systems (11)', color: '#f2f0ea' },
                { id: 'production-ai', label: 'Live AI Platforms (04)', color: '#10b981' },
                { id: 'cv-robustness', label: 'CV & Robustness (02)', color: '#38bdf8' },
                { id: 'dev-automation', label: 'Dev & Automation (05)', color: '#f59e0b' },
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
                    style={{
                      borderColor: active ? tab.color : undefined,
                      backgroundColor: active ? `${tab.color}1c` : undefined,
                    }}
                    className={`inline-flex items-center gap-2 font-mono-tech text-[11px] px-3 py-1.5 border transition-colors ${
                      active
                        ? 'text-[#f2f0ea] font-semibold'
                        : 'border-white/[0.12] bg-[#0b101b] text-[#94a3b8] hover:text-[#f2f0ea]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tab.color }} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Master-Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/[0.1] bg-[#0b101b]/95">
            {/* Left Selector Rail (4 cols) */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/[0.08] divide-y divide-white/[0.06] bg-[#080b13]">
              <div className="px-5 py-3 font-mono-tech text-[10px] uppercase tracking-widest text-[#64748b] flex items-center justify-between">
                <span>SYSTEM_INDEX</span>
                <span>{filteredSystems.length} MATCHING</span>
              </div>
              {filteredSystems.map((sys) => {
                const pal = getSystemPalette(sys);
                const isSel = activeSystem.id === sys.id;
                return (
                  <button
                    key={sys.id}
                    id={`sys-${sys.id}`}
                    type="button"
                    onClick={() => setSelectedSystemId(sys.id)}
                    style={{
                      borderLeftWidth: isSel ? '3px' : '3px',
                      borderLeftColor: isSel ? pal.hex : 'transparent',
                      backgroundColor: isSel ? `${pal.hex}12` : undefined,
                    }}
                    className="w-full text-left px-5 py-4 transition-colors hover:bg-white/[0.025] flex items-start justify-between gap-3 scroll-mt-24"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 font-mono-tech text-[10px]">
                        <span style={{ color: pal.hex }} className="font-semibold">
                          {sys.code}
                        </span>
                        <span className="text-white/20">·</span>
                        <span className="text-[#94a3b8] truncate">{sys.status}</span>
                      </div>
                      <div
                        className={`font-display text-lg font-bold truncate ${
                          isSel ? 'text-[#f2f0ea]' : 'text-[#cbd5e1]'
                        }`}
                      >
                        {sys.name}
                      </div>
                      <p className="text-xs text-[#64748b] line-clamp-1">{sys.classification}</p>
                    </div>
                    <span
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: pal.hex, opacity: isSel ? 1 : 0.45 }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Active Blueprint Inspector (8 cols) */}
            <div
              className="lg:col-span-8 p-6 sm:p-8 lg:p-10 space-y-7 bg-[#090c14]"
              style={{ borderTopWidth: '3px', borderTopColor: activePalette.hex }}
            >
              {/* Header & Action Links */}
              <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 pb-6 border-b border-white/[0.08]">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2.5 font-mono-tech text-[11px]">
                    <span
                      className={`px-2.5 py-0.5 border font-semibold ${activePalette.badgeClass}`}
                    >
                      {activeSystem.code} · {activePalette.label}
                    </span>
                    <span className="text-[#94a3b8]">{activeSystem.status}</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-5xl font-bold text-[#f2f0ea]">
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
                        className={`inline-flex items-center gap-2 font-mono-tech text-xs px-4 py-2.5 border transition-all ${
                          isPrimary
                            ? 'text-[#07090e] font-semibold hover:opacity-90'
                            : 'border-white/15 bg-[#0e1422] text-[#f2f0ea] hover:border-white/40'
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

              {/* Interactive Multi-View Interface & Output Preview Gallery */}
              {activeSystem.previews && activeSystem.previews.length > 0 && currentPreview && (
                <div className="border border-white/[0.1] bg-[#06080d] p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-white/[0.07]">
                    <span
                      className="font-mono-tech text-[10px] uppercase tracking-widest flex items-center gap-2"
                      style={{ color: activePalette.hex }}
                    >
                      <ImageIcon size={13} />
                      PREVIEW {currentImgIdx + 1}/{activeSystem.previews.length} ·{' '}
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
                                  color: '#07090e',
                                }
                              : undefined
                          }
                          className={`font-mono-tech text-[10px] px-2.5 py-1 border font-semibold transition-colors ${
                            idx === currentImgIdx
                              ? ''
                              : 'border-white/15 bg-[#0b101b] text-[#94a3b8] hover:text-[#f2f0ea]'
                          }`}
                        >
                          0{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-hidden border border-white/[0.06] bg-[#040509]">
                    <img
                      src={currentPreview.src}
                      alt={currentPreview.caption}
                      loading="lazy"
                      className="w-full max-h-[440px] object-contain mx-auto block"
                    />
                  </div>
                </div>
              )}

              {/* Problem Addressed vs System Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-white/[0.08] bg-[#07090e] p-5 space-y-2">
                  <span
                    className="font-mono-tech text-[10px] uppercase tracking-widest flex items-center gap-1.5"
                    style={{ color: activePalette.hex }}
                  >
                    <Terminal size={12} /> PROBLEM ADDRESSED
                  </span>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                    {activeSystem.problemAddressed}
                  </p>
                </div>

                <div className="border border-white/[0.08] bg-[#07090e] p-5 space-y-2">
                  <span
                    className="font-mono-tech text-[10px] uppercase tracking-widest flex items-center gap-1.5"
                    style={{ color: activePalette.secondaryHex }}
                  >
                    <Cpu size={12} /> SYSTEM ARCHITECTURE &amp; APPROACH
                  </span>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                    {activeSystem.architectureSummary}
                  </p>
                </div>
              </div>

              {/* 4-Stage Pipeline Schematic */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#94a3b8]">
                  <span className="flex items-center gap-1.5">
                    <Layers size={12} style={{ color: activePalette.hex }} />
                    4-STAGE EXECUTION PIPELINE · {activeSystem.name.toUpperCase()}
                  </span>
                  <span style={{ color: activePalette.hex }}>{activeSystem.code}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  {activeSystem.architecturePipeline.map((node, i) => (
                    <div
                      key={node.stage}
                      style={{ borderTopWidth: '2px', borderTopColor: activePalette.hex }}
                      className="border border-white/[0.08] bg-[#0c111d] p-4 flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-center justify-between font-mono-tech text-[10px]">
                        <span style={{ color: activePalette.hex }}>{node.stage}</span>
                        <span className="text-[#64748b]">
                          {i < activeSystem.architecturePipeline.length - 1 ? '──►' : '● OUT'}
                        </span>
                      </div>
                      <h4 className="font-display text-sm font-semibold text-[#f2f0ea]">
                        {node.node}
                      </h4>
                      <p className="text-xs text-[#94a3b8] leading-relaxed">{node.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications & Stack */}
              <div className="border-t border-white/[0.08] pt-5 space-y-4">
                <ul className="space-y-2 text-xs sm:text-sm text-[#cbd5e1]">
                  {activeSystem.technicalSpecifications.map((spec) => (
                    <li key={spec} className="flex items-start gap-2.5">
                      <span
                        className="font-mono-tech mt-0.5"
                        style={{ color: activePalette.hex }}
                      >
                        ›
                      </span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#64748b] mr-1">
                    STACK:
                  </span>
                  {activeSystem.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono-tech text-[11px] px-2.5 py-1 border border-white/[0.09] bg-[#07090e] text-[#cbd5e1]"
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
