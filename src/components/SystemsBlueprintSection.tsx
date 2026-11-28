import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Layers,
  Terminal,
} from 'lucide-react';
import { engineeredSystems, type EngineeredSystem, type SystemActionLink } from '@/content';

type DomainFilter = 'all' | 'production-ai' | 'cv-robustness' | 'dev-automation';

interface SystemAccent {
  hex: string;
  secondaryHex: string;
  gradientCss: string;
  label: string;
}

function getSystemAccent(sys: EngineeredSystem): SystemAccent {
  if (sys.id === 'degradelab' || sys.id === 'dataset-medic') {
    return {
      hex: '#38BDF8',
      secondaryHex: '#3B82F6',
      gradientCss: 'linear-gradient(90deg, #3B82F6 0%, #38BDF8 100%)',
      label: 'COMPUTER VISION',
    };
  }
  if (sys.domain === 'production-ai' || sys.id === 'vellum-research') {
    return {
      hex: '#00D6B4',
      secondaryHex: '#38BDF8',
      gradientCss: 'linear-gradient(90deg, #00D6B4 0%, #38BDF8 100%)',
      label: 'LIVE AI PLATFORM',
    };
  }
  return {
    hex: '#FFC857',
    secondaryHex: '#FF5B5B',
    gradientCss: 'linear-gradient(90deg, #FF5B5B 0%, #FFC857 100%)',
    label: 'DEV & AUTOMATION',
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
      return <ExternalLink size={12} />;
    case 'GitHub':
      return <Github size={12} />;
    case 'Documentation':
      return <BookOpen size={12} />;
    default:
      return <ArrowUpRight size={12} />;
  }
}

interface SystemsBlueprintSectionProps {
  externalSelection?: { id: string; seq: number } | null;
}

export function SystemsBlueprintSection({ externalSelection }: SystemsBlueprintSectionProps) {
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('all');
  const [selectedSystemId, setSelectedSystemId] = useState<string>('degradelab');
  const [activePreviewIdx, setActivePreviewIdx] = useState<Record<string, number>>({});

  useEffect(() => {
    if (
      externalSelection &&
      engineeredSystems.some((s) => s.id === externalSelection.id)
    ) {
      setDomainFilter('all');
      setSelectedSystemId(externalSelection.id);
    }
  }, [externalSelection]);

  const filteredSystems = engineeredSystems.filter((sys) => matchesDomainFilter(sys, domainFilter));
  const activeSystem =
    filteredSystems.find((s) => s.id === selectedSystemId) ||
    engineeredSystems.find((s) => s.id === selectedSystemId) ||
    filteredSystems[0] ||
    engineeredSystems[0];

  const activeAccent = getSystemAccent(activeSystem);
  const currentImgIdx = activePreviewIdx[activeSystem.id] || 0;
  const currentPreview = activeSystem.previews?.[currentImgIdx];

  const sysAxiosTalent = engineeredSystems.find((s) => s.id === 'axios-talent');
  const sysAxiosInsight = engineeredSystems.find((s) => s.id === 'axios-insight');
  const sysDegradeLab = engineeredSystems.find((s) => s.id === 'degradelab');
  const sysDiagora = engineeredSystems.find((s) => s.id === 'diagora');

  const setPreview = (sysId: string, idx: number) => {
    setActivePreviewIdx((prev) => ({ ...prev, [sysId]: idx }));
  };

  const scrollToDetailOnMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('system-detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  };

  const inspectFeatured = (sysId: string) => {
    setDomainFilter('all');
    setSelectedSystemId(sysId);
    scrollToDetailOnMobile();
  };

  const selectSystemFromList = (sysId: string) => {
    setSelectedSystemId(sysId);
    scrollToDetailOnMobile();
  };

  const stepActiveSystem = (delta: number) => {
    const idx = filteredSystems.findIndex((s) => s.id === activeSystem.id);
    const nextIdx = idx === -1 ? 0 : (idx + delta + filteredSystems.length) % filteredSystems.length;
    setSelectedSystemId(filteredSystems[nextIdx].id);
  };

  return (
    <section
      id="systems"
      className="bg-[#090A0F] text-[#F5F5F7] border-b border-[#292D3A] scroll-mt-16"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-28">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-8 sm:pb-10 border-b border-[#292D3A]">
          <div className="lg:col-span-8 flex items-baseline gap-4 sm:gap-7">
            <span className="font-display text-4xl sm:text-7xl font-bold grad-mint-cyan-text leading-none">
              03
            </span>
            <div className="space-y-1.5 sm:space-y-2">
              <span className="block font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-widest text-[#38BDF8]">
                SELECTED SYSTEMS &amp; PRODUCTS
              </span>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F7] leading-[0.98]">
                Engineered Systems.
              </h2>
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-[#A1A5B3] leading-relaxed">
              Every project is built as a complete system—combining deterministic validation,
              explicit data contracts, and practical AI/ML execution across live Vercel products,
              computer vision tools, and developer diagnostics.
            </p>
          </div>
        </div>

        {/* =================================================================
            TIER 1: ASYMMETRIC DARK SWISS FLAGSHIP BENTO
           ================================================================= */}
        <div className="mt-10 sm:mt-12 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#292D3A]">
            <span className="font-mono-tech text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#F5F5F7]">
              FLAGSHIP ARCHITECTURE BENTO · 04 FEATURED RELEASES
            </span>
            <span className="font-mono-tech text-[10.5px] text-[#707586]">
              SELECT ANY SYSTEM TO INSPECT FULL PIPELINE BELOW
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
            {/* BENTO 01 — AXIOS TALENT (WIDE FEATURE · NEON MINT) */}
            {sysAxiosTalent && (
              <article className="md:col-span-2 lg:col-span-7 rounded-md border border-[#292D3A] bg-[#171A25] overflow-hidden flex flex-col justify-between">
                <div
                  className="h-0.5 w-full"
                  style={{ background: 'linear-gradient(90deg, #00D6B4 0%, #38BDF8 100%)' }}
                />
                <div className="grid grid-cols-1 md:grid-cols-12 flex-1">
                  <div className="md:col-span-6 p-5 sm:p-6 flex flex-col justify-between gap-5">
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="flex items-center justify-between font-mono-tech text-[10.5px]">
                        <span className="text-[#00D6B4] font-semibold">
                          01 · {sysAxiosTalent.code}
                        </span>
                        <span className="text-[#A1A5B3]">{sysAxiosTalent.status}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F7] leading-tight">
                        {sysAxiosTalent.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A1A5B3] leading-relaxed">
                        {sysAxiosTalent.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-4 pt-3 border-t border-[#292D3A]">
                      <div className="flex flex-wrap gap-1.5 font-mono-tech text-[10px] text-[#707586]">
                        {sysAxiosTalent.technologies.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-[#11131B] border border-[#292D3A] text-[#A1A5B3]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href="#system-detail-panel"
                          onClick={(e) => {
                            e.preventDefault();
                            inspectFeatured(sysAxiosTalent.id);
                            if (window.innerWidth >= 1024) {
                              document.getElementById('system-explorer')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="inline-flex items-center gap-1.5 rounded font-mono-tech text-[11px] uppercase tracking-wider px-3.5 py-2 bg-[#00D6B4] text-[#090A0F] font-semibold hover:opacity-90 transition-opacity"
                        >
                          <span>Inspect</span>
                          <ArrowDownRight size={12} />
                        </a>
                        {sysAxiosTalent.links[0] && (
                          <a
                            href={sysAxiosTalent.links[0].url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded font-mono-tech text-[11px] uppercase tracking-wider px-3 py-2 border border-[#292D3A] bg-[#11131B] text-[#F5F5F7] hover:border-[#00D6B4] transition-colors"
                          >
                            {getActionIcon(sysAxiosTalent.links[0].label)}
                            <span>{sysAxiosTalent.links[0].label}</span>
                            <ArrowUpRight size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {sysAxiosTalent.previews?.[0] && (
                    <div className="md:col-span-6 bg-[#11131B] border-t md:border-t-0 md:border-l border-[#292D3A] p-4 flex flex-col justify-between gap-2">
                      <span className="font-mono-tech text-[10px] text-[#707586]">
                        PLATE 01 · MULTI-TENANT RLS
                      </span>
                      <img
                        src={sysAxiosTalent.previews[0].src}
                        alt={`Axios Talent UI — ${sysAxiosTalent.previews[0].caption}`}
                        width={1440}
                        height={900}
                        decoding="async"
                        loading="lazy"
                        className="w-full h-48 sm:h-52 md:h-64 object-cover object-top rounded border border-[#292D3A]"
                      />
                    </div>
                  )}
                </div>
              </article>
            )}

            {/* BENTO 02 — AXIOS INSIGHT (SKY CYAN) */}
            {sysAxiosInsight && (
              <article className="md:col-span-1 lg:col-span-5 rounded-md border border-[#292D3A] bg-[#171A25] overflow-hidden flex flex-col justify-between">
                <div className="h-0.5 w-full bg-[#38BDF8]" />
                {sysAxiosInsight.previews?.[0] && (
                  <div className="bg-[#11131B] border-b border-[#292D3A] p-4 space-y-2">
                    <div className="flex items-center justify-between font-mono-tech text-[10px]">
                      <span className="text-[#38BDF8] font-semibold">
                        02 · {sysAxiosInsight.code} · LIVE BI
                      </span>
                      <span className="text-[#707586]">{sysAxiosInsight.status}</span>
                    </div>
                    <img
                      src={sysAxiosInsight.previews[0].src}
                      alt={`Axios Insight UI — ${sysAxiosInsight.previews[0].caption}`}
                      width={1440}
                      height={900}
                      decoding="async"
                      loading="lazy"
                      className="w-full h-44 object-cover object-top rounded border border-[#292D3A]"
                    />
                  </div>
                )}

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-[#F5F5F7]">
                      {sysAxiosInsight.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A5B3] leading-relaxed line-clamp-3">
                      {sysAxiosInsight.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#292D3A] flex flex-wrap items-center justify-between gap-2">
                    <a
                      href="#system-detail-panel"
                      onClick={(e) => {
                        e.preventDefault();
                        inspectFeatured(sysAxiosInsight.id);
                        if (window.innerWidth >= 1024) {
                          document.getElementById('system-explorer')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-1 font-mono-tech text-[11px] font-semibold uppercase text-[#38BDF8] hover:underline"
                    >
                      <span>Inspect System</span>
                      <ArrowDownRight size={12} />
                    </a>
                    {sysAxiosInsight.links[0] && (
                      <a
                        href={sysAxiosInsight.links[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded font-mono-tech text-[11px] uppercase px-3 py-1.5 border border-[#292D3A] bg-[#11131B] text-[#F5F5F7] hover:border-[#38BDF8] transition-colors"
                      >
                        {getActionIcon(sysAxiosInsight.links[0].label)}
                        <span>{sysAxiosInsight.links[0].label}</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )}

            {/* BENTO 03 — DEGRADELAB (ELECTRIC BLUE -> CYAN) */}
            {sysDegradeLab && (
              <article className="md:col-span-1 lg:col-span-5 rounded-md border border-[#292D3A] bg-[#171A25] overflow-hidden flex flex-col justify-between">
                <div
                  className="h-0.5 w-full"
                  style={{ background: 'linear-gradient(90deg, #3B82F6 0%, #38BDF8 100%)' }}
                />
                {sysDegradeLab.previews?.[1] && (
                  <div className="bg-[#11131B] border-b border-[#292D3A] p-4 space-y-2">
                    <div className="flex items-center justify-between font-mono-tech text-[10px]">
                      <span className="text-[#3B82F6] font-semibold">
                        03 · {sysDegradeLab.code} · ROBUSTNESS
                      </span>
                      <span className="text-[#707586]">{sysDegradeLab.status}</span>
                    </div>
                    <img
                      src={sysDegradeLab.previews[1].src}
                      alt={`DegradeLab output — ${sysDegradeLab.previews[1].caption}`}
                      width={1307}
                      height={694}
                      decoding="async"
                      loading="lazy"
                      className="w-full h-44 object-cover object-center rounded border border-[#292D3A]"
                    />
                  </div>
                )}

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-[#F5F5F7]">
                      {sysDegradeLab.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A5B3] leading-relaxed line-clamp-3">
                      {sysDegradeLab.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#292D3A] flex flex-wrap items-center justify-between gap-2">
                    <a
                      href="#system-detail-panel"
                      onClick={(e) => {
                        e.preventDefault();
                        inspectFeatured(sysDegradeLab.id);
                        if (window.innerWidth >= 1024) {
                          document.getElementById('system-explorer')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-1 font-mono-tech text-[11px] font-semibold uppercase text-[#3B82F6] hover:underline"
                    >
                      <span>Inspect System</span>
                      <ArrowDownRight size={12} />
                    </a>
                    {sysDegradeLab.links[0] && (
                      <a
                        href={sysDegradeLab.links[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded font-mono-tech text-[11px] uppercase px-3 py-1.5 border border-[#292D3A] bg-[#11131B] text-[#F5F5F7] hover:border-[#3B82F6] transition-colors"
                      >
                        {getActionIcon(sysDegradeLab.links[0].label)}
                        <span>{sysDegradeLab.links[0].label}</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )}

            {/* BENTO 04 — DIAGORA (REVERSED WIDE FEATURE · CORAL -> AMBER) */}
            {sysDiagora && (
              <article className="md:col-span-2 lg:col-span-7 rounded-md border border-[#292D3A] bg-[#171A25] overflow-hidden flex flex-col justify-between">
                <div
                  className="h-0.5 w-full"
                  style={{ background: 'linear-gradient(90deg, #FF5B5B 0%, #FFC857 100%)' }}
                />
                <div className="grid grid-cols-1 md:grid-cols-12 flex-1">
                  {sysDiagora.previews?.[0] && (
                    <div className="md:col-span-6 bg-[#11131B] border-b md:border-b-0 md:border-r border-[#292D3A] p-4 flex flex-col justify-between gap-2">
                      <span className="font-mono-tech text-[10px] text-[#707586]">
                        PLATE 04 · 38 RULES · SARIF 2.1.0
                      </span>
                      <img
                        src={sysDiagora.previews[0].src}
                        alt={`Diagora diagnostics CLI — ${sysDiagora.previews[0].caption}`}
                        width={1440}
                        height={900}
                        decoding="async"
                        loading="lazy"
                        className="w-full h-48 sm:h-52 md:h-64 object-cover object-top rounded border border-[#292D3A]"
                      />
                    </div>
                  )}

                  <div className="md:col-span-6 p-5 sm:p-6 flex flex-col justify-between gap-5">
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="flex items-center justify-between font-mono-tech text-[10.5px]">
                        <span className="text-[#FFC857] font-semibold">04 · {sysDiagora.code}</span>
                        <span className="text-[#A1A5B3]">{sysDiagora.status}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F7] leading-tight">
                        {sysDiagora.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A1A5B3] leading-relaxed">
                        {sysDiagora.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-4 pt-3 border-t border-[#292D3A]">
                      <div className="flex flex-wrap gap-1.5 font-mono-tech text-[10px] text-[#707586]">
                        {sysDiagora.technologies.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-[#11131B] border border-[#292D3A] text-[#A1A5B3]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href="#system-detail-panel"
                          onClick={(e) => {
                            e.preventDefault();
                            inspectFeatured(sysDiagora.id);
                            if (window.innerWidth >= 1024) {
                              document.getElementById('system-explorer')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="inline-flex items-center gap-1.5 rounded font-mono-tech text-[11px] uppercase tracking-wider px-3.5 py-2 bg-[#FFC857] text-[#090A0F] font-semibold hover:opacity-90 transition-opacity"
                        >
                          <span>Inspect</span>
                          <ArrowDownRight size={12} />
                        </a>
                        {sysDiagora.links[0] && (
                          <a
                            href={sysDiagora.links[0].url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded font-mono-tech text-[11px] uppercase tracking-wider px-3 py-2 border border-[#292D3A] bg-[#11131B] text-[#F5F5F7] hover:border-[#FFC857] transition-colors"
                          >
                            {getActionIcon(sysDiagora.links[0].label)}
                            <span>{sysDiagora.links[0].label}</span>
                            <ArrowUpRight size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>

        {/* =================================================================
            TIER 2: MASTER-DETAIL ARCHITECTURE EXPLORER (ALL 11 SYSTEMS)
           ================================================================= */}
        <div id="system-explorer" className="mt-14 sm:mt-16 scroll-mt-24 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-[#292D3A]">
            <div>
              <span className="block font-mono-tech text-[11px] uppercase tracking-widest text-[#8B5CF6]">
                MASTER-DETAIL ARCHITECTURE EXPLORER
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F7] mt-1">
                All 11 Engineered Systems
              </h3>
            </div>

            {/* Domain Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2" role="tablist" aria-label="Filter systems by domain">
              {[
                { id: 'all', label: 'All (11)', color: '#3B82F6' },
                { id: 'production-ai', label: 'Live AI Platforms (4)', color: '#00D6B4' },
                { id: 'cv-robustness', label: 'Computer Vision (2)', color: '#38BDF8' },
                { id: 'dev-automation', label: 'Dev & Automation (5)', color: '#FFC857' },
              ].map((tab) => {
                const active = domainFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
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
                            color: '#090A0F',
                          }
                        : undefined
                    }
                    className={`inline-flex items-center gap-1.5 rounded font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-wider px-3 sm:px-3.5 py-2 border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                      active
                        ? 'font-semibold'
                        : 'border-[#292D3A] bg-[#171A25] text-[#A1A5B3] hover:text-[#F5F5F7] hover:border-[#707586]'
                    }`}
                  >
                    {!active && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: tab.color }}
                      />
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-md border border-[#292D3A] bg-[#11131B] divide-y lg:divide-y-0 lg:divide-x divide-[#292D3A] overflow-hidden">
            {/* Left Selector Column (4 cols) */}
            <div className="lg:col-span-4 divide-y divide-[#292D3A] max-h-[380px] lg:max-h-none overflow-y-auto lg:overflow-visible">
              {filteredSystems.map((sys) => {
                const pal = getSystemAccent(sys);
                const isSel = activeSystem.id === sys.id;
                return (
                  <button
                    key={sys.id}
                    id={`sys-${sys.id}`}
                    type="button"
                    onClick={() => selectSystemFromList(sys.id)}
                    style={
                      isSel
                        ? {
                            backgroundColor: '#171A25',
                            borderLeftColor: pal.hex,
                          }
                        : undefined
                    }
                    className={`w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 transition-colors flex items-center justify-between gap-3 scroll-mt-24 border-l-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3B82F6] ${
                      isSel ? '' : 'border-l-transparent hover:bg-[#171A25]/60'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2 font-mono-tech text-[10.5px]">
                        <span style={{ color: pal.hex }} className="font-semibold">
                          {sys.code}
                        </span>
                        <span className="text-[#292D3A]">/</span>
                        <span className="text-[#707586] truncate">{sys.status}</span>
                      </div>
                      <div
                        className={`font-display text-base sm:text-lg font-bold truncate ${
                          isSel ? 'text-[#F5F5F7]' : 'text-[#A1A5B3]'
                        }`}
                      >
                        {sys.name}
                      </div>
                      <p className="text-xs text-[#707586] truncate">{sys.classification}</p>
                    </div>
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: pal.hex,
                        opacity: isSel ? 1 : 0.35,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Active System Detail Panel (8 cols) */}
            <div
              id="system-detail-panel"
              className="lg:col-span-8 bg-[#171A25] p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-7 scroll-mt-20"
            >
              {/* Mobile Quick System Stepper */}
              <div className="flex lg:hidden items-center justify-between gap-2 pb-3 border-b border-[#292D3A] font-mono-tech text-[10.5px]">
                <span className="text-[#707586]">QUICK STEPPER</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => stepActiveSystem(-1)}
                    className="inline-flex items-center gap-1 rounded px-2.5 py-1 border border-[#292D3A] bg-[#11131B] text-[#A1A5B3] hover:text-white"
                  >
                    <ChevronLeft size={12} /> Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => stepActiveSystem(1)}
                    className="inline-flex items-center gap-1 rounded px-2.5 py-1 border border-[#292D3A] bg-[#11131B] text-[#A1A5B3] hover:text-white"
                  >
                    Next <ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* Top Header & Actions */}
              <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 pb-6 border-b border-[#292D3A]">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2 font-mono-tech text-[10.5px] sm:text-[11px]">
                    <span
                      className="font-semibold uppercase tracking-wider"
                      style={{ color: activeAccent.hex }}
                    >
                      {activeSystem.code} · {activeAccent.label}
                    </span>
                    <span className="text-[#292D3A]">/</span>
                    <span className="text-[#A1A5B3]">{activeSystem.status}</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F7] leading-none">
                    {activeSystem.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#A1A5B3] leading-relaxed max-w-3xl">
                    {activeSystem.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
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
                                backgroundColor: activeAccent.hex,
                                borderColor: activeAccent.hex,
                              }
                            : undefined
                        }
                        className={`inline-flex items-center gap-2 rounded font-mono-tech text-[11px] uppercase tracking-wider px-3.5 sm:px-4 py-2.5 border transition-colors ${
                          isPrimary
                            ? 'text-[#090A0F] font-semibold hover:opacity-90'
                            : 'border-[#292D3A] bg-[#11131B] text-[#F5F5F7] hover:border-[#3B82F6]'
                        }`}
                      >
                        {getActionIcon(link.label)}
                        <span>
                          {link.label}
                          {link.sublabel ? ` · ${link.sublabel}` : ''}
                        </span>
                        <ArrowUpRight size={12} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Multi-View Screenshot / SVG Stage */}
              {activeSystem.previews && activeSystem.previews.length > 0 && currentPreview && (
                <div className="rounded border border-[#292D3A] bg-[#090A0F] p-3.5 sm:p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono-tech text-[10.5px] sm:text-[11px] text-[#A1A5B3] flex items-center gap-2">
                      <ImageIcon size={13} style={{ color: activeAccent.hex }} />
                      <span>{currentPreview.caption}</span>
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
                                  backgroundColor: activeAccent.hex,
                                  borderColor: activeAccent.hex,
                                  color: '#090A0F',
                                }
                              : undefined
                          }
                          className={`rounded font-mono-tech text-[10.5px] px-2.5 py-1 border font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                            idx === currentImgIdx
                              ? ''
                              : 'border-[#292D3A] bg-[#171A25] text-[#A1A5B3] hover:text-[#F5F5F7]'
                          }`}
                        >
                          VIEW 0{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded overflow-hidden border border-[#292D3A] bg-[#06070B]">
                    <img
                      src={currentPreview.src}
                      alt={`${activeSystem.name} preview — ${currentPreview.caption}`}
                      width={1440}
                      height={900}
                      decoding="async"
                      loading="lazy"
                      className="w-full max-h-[380px] sm:max-h-[420px] object-contain mx-auto block"
                    />
                  </div>
                </div>
              )}

              {/* Problem Addressed vs System Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-2 rounded border border-[#292D3A] divide-y md:divide-y-0 md:divide-x divide-[#292D3A] bg-[#11131B]">
                <div className="p-4 sm:p-5 space-y-2">
                  <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider flex items-center gap-2 text-[#FF5B5B]">
                    <Terminal size={13} /> Problem Addressed
                  </span>
                  <p className="text-sm text-[#A1A5B3] leading-relaxed">
                    {activeSystem.problemAddressed}
                  </p>
                </div>

                <div className="p-4 sm:p-5 space-y-2">
                  <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider flex items-center gap-2 text-[#3B82F6]">
                    <Cpu size={13} /> System Architecture
                  </span>
                  <p className="text-sm text-[#F5F5F7] leading-relaxed">
                    {activeSystem.architectureSummary}
                  </p>
                </div>
              </div>

              {/* 4-Stage Execution Pipeline */}
              <div className="space-y-3">
                <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#A1A5B3] flex items-center gap-2">
                  <Layers size={13} style={{ color: activeAccent.hex }} />
                  4-Stage Execution Pipeline
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 rounded border border-[#292D3A] divide-y sm:divide-y-0 sm:divide-x divide-[#292D3A] bg-[#11131B]">
                  {activeSystem.architecturePipeline.map((node, i) => (
                    <div key={node.stage} className="p-4 flex flex-col justify-between gap-2">
                      <div className="flex items-center justify-between font-mono-tech text-[10.5px] font-semibold">
                        <span style={{ color: activeAccent.hex }}>{node.stage}</span>
                        <span className="text-[#707586]">{i < 3 ? '→' : '●'}</span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-[#F5F5F7]">
                        {node.node}
                      </h4>
                      <p className="text-xs text-[#A1A5B3] leading-relaxed">{node.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications & Technology Pills */}
              <div className="border-t border-[#292D3A] pt-5 space-y-4">
                <ul className="space-y-2 text-sm text-[#A1A5B3]">
                  {activeSystem.technicalSpecifications.map((spec) => (
                    <li key={spec} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: activeAccent.hex }}
                      />
                      <span className="leading-relaxed">{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {activeSystem.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded font-mono-tech text-[10.5px] px-2.5 py-1 border border-[#292D3A] bg-[#11131B] text-[#A1A5B3]"
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
