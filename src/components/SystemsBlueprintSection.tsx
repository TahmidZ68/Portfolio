import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Layers,
  Terminal,
} from 'lucide-react';
import { engineeredSystems, type EngineeredSystem, type SystemActionLink } from '@/content';

type DomainFilter = 'all' | 'production-ai' | 'diagnostic-engine' | 'automation-reliability';

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

function getStatusIndicator(statusType: EngineeredSystem['statusType']) {
  switch (statusType) {
    case 'live':
      return {
        dot: 'bg-emerald-400',
        border: 'border-emerald-400/35 text-emerald-300 bg-emerald-400/[0.06]',
      };
    case 'alpha':
      return {
        dot: 'bg-[#38bdf8]',
        border: 'border-[#38bdf8]/40 text-[#38bdf8] bg-[#38bdf8]/[0.07]',
      };
    case 'open-core':
      return {
        dot: 'bg-[#38bdf8]',
        border: 'border-[#38bdf8]/35 text-[#f2f0ea] bg-[#38bdf8]/[0.06]',
      };
    default:
      return {
        dot: 'bg-[#8a8f98]',
        border: 'border-white/20 text-[#f2f0ea] bg-white/[0.03]',
      };
  }
}

export function SystemsBlueprintSection() {
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('all');
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({
    degradelab: true,
    diagora: true,
    'dataset-medic': true,
    'axios-talent': true,
  });
  const [activePreviewIdx, setActivePreviewIdx] = useState<Record<string, number>>({});

  const toggleSpec = (id: string) => {
    setExpandedSpecs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const setPreview = (sysId: string, idx: number) => {
    setActivePreviewIdx((prev) => ({ ...prev, [sysId]: idx }));
  };

  const filteredSystems =
    domainFilter === 'all'
      ? engineeredSystems
      : engineeredSystems.filter((sys) => sys.domain === domainFilter);

  return (
    <section
      id="systems"
      className="border-b border-white/[0.08] bg-[#08090c] lab-grid-bg scroll-mt-16"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08]">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
              <span>03 // SYSTEMS</span>
              <span className="text-white/20">—</span>
              <span className="text-[#8a8f98]">ENGINEERED ARCHITECTURES &amp; LIVE DEPLOYMENTS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[#f2f0ea] leading-[0.95] uppercase">
              Engineered Systems.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="text-sm sm:text-base text-[#8a8f98] leading-relaxed">
              Every project below is built as a complete system—combining deterministic validation,
              explicit data contracts, and structured AI/ML execution layers rather than isolated
              notebook scripts.
            </p>
            <div
              className="flex flex-wrap gap-2 pt-1"
              role="tablist"
              aria-label="Filter systems by domain"
            >
              {[
                { id: 'all', label: 'All Systems (11)' },
                { id: 'production-ai', label: 'Live AI Platforms (03)' },
                { id: 'diagnostic-engine', label: 'Diagnostic & Robustness Tools (05)' },
                { id: 'automation-reliability', label: 'Automation & AI Agents (03)' },
              ].map((tab) => {
                const active = domainFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDomainFilter(tab.id as DomainFilter)}
                    className={`font-mono-tech text-[11px] px-3.5 py-2 border transition-colors ${
                      active
                        ? 'border-[#38bdf8] bg-[#38bdf8] text-[#08090c] font-semibold'
                        : 'border-white/[0.12] bg-[#0d0f14] text-[#8a8f98] hover:text-[#f2f0ea] hover:border-white/30'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* High-Density System Directory Index */}
        <div className="my-12 border border-white/[0.08] bg-[#0b0d12]">
          <div className="px-5 py-3 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98]">
            <span>SYSTEM INDEX · 11 PROJECTS</span>
            <span>SELECT ANY SYSTEM TO JUMP TO ARCHITECTURE</span>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {engineeredSystems.map((sys) => {
              const statusStyle = getStatusIndicator(sys.statusType);
              return (
                <div
                  key={sys.id}
                  className="px-5 py-3 grid grid-cols-1 md:grid-cols-12 gap-3 items-center hover:bg-white/[0.02] transition-colors"
                >
                  <div className="md:col-span-3 flex items-center gap-3">
                    <span className="font-mono-tech text-xs text-[#38bdf8]">{sys.code}</span>
                    <a
                      href={`#sys-${sys.id}`}
                      className="font-display text-base font-semibold text-[#f2f0ea] hover:text-[#38bdf8] transition-colors"
                    >
                      {sys.name}
                    </a>
                  </div>
                  <div className="md:col-span-4 text-xs text-[#8a8f98] truncate">
                    {sys.classification}
                  </div>
                  <div className="md:col-span-2">
                    <span
                      className={`inline-flex items-center gap-1.5 font-mono-tech text-[10px] px-2 py-0.5 border ${statusStyle.border}`}
                    >
                      <span className={`w-1.5 h-1.5 ${statusStyle.dot}`} />
                      {sys.status}
                    </span>
                  </div>
                  <div className="md:col-span-3 flex flex-wrap md:justify-end gap-2">
                    {sys.links.map((lnk) => (
                      <a
                        key={`${sys.id}-${lnk.label}-${lnk.sublabel || ''}`}
                        href={lnk.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono-tech text-[10px] text-[#f2f0ea] hover:text-[#38bdf8] px-2.5 py-1 border border-white/[0.1] hover:border-[#38bdf8] transition-colors"
                      >
                        {getActionIcon(lnk.label)}
                        <span>{lnk.sublabel ? `${lnk.label} (${lnk.sublabel})` : lnk.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Engineered System Modules */}
        <div className="space-y-12">
          {filteredSystems.map((sys) => {
            const statusStyle = getStatusIndicator(sys.statusType);
            const isExpanded = !!expandedSpecs[sys.id];
            const currentImgIdx = activePreviewIdx[sys.id] || 0;
            const currentPreview = sys.previews?.[currentImgIdx];

            return (
              <article
                key={sys.id}
                id={`sys-${sys.id}`}
                className="border border-white/[0.1] bg-[#0b0d12]/90 crosshair-corner scroll-mt-24 transition-colors hover:border-white/[0.2]"
              >
                {/* Top System Bar */}
                <div className="px-6 sm:px-8 py-4 border-b border-white/[0.08] bg-[#0d1017] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <span className="font-mono-tech text-xs font-semibold text-[#38bdf8] px-2.5 py-1 border border-[#38bdf8]/40 bg-[#38bdf8]/10">
                      {sys.code}
                    </span>
                    <span className="font-mono-tech text-xs text-[#8a8f98] uppercase tracking-wider">
                      {sys.classification}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-2 font-mono-tech text-[11px] px-3 py-1 border ${statusStyle.border}`}
                    >
                      <span className={`w-1.5 h-1.5 ${statusStyle.dot}`} />
                      {sys.status}
                    </span>
                  </div>
                </div>

                {/* Main System Body */}
                <div className="p-6 sm:p-8 lg:p-10 space-y-8">
                  {/* Row 1: Title, Short Description & Verified Actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-3">
                      <h3 className="font-display text-3xl sm:text-5xl font-bold text-[#f2f0ea] tracking-tight">
                        {sys.name}
                      </h3>
                      <p className="text-base sm:text-lg text-[#f2f0ea]/90 leading-relaxed max-w-3xl">
                        {sys.shortDescription}
                      </p>
                    </div>

                    {/* Action Links Panel */}
                    <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
                      {sys.links.map((link, idx) => {
                        const isPrimary = idx === 0 && link.label === 'Live Demo';
                        return (
                          <a
                            key={`${sys.id}-btn-${link.label}-${link.sublabel || idx}`}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-2 font-mono-tech text-xs px-4 py-3 border transition-colors ${
                              isPrimary
                                ? 'border-[#38bdf8] bg-[#38bdf8] text-[#08090c] font-semibold hover:bg-[#7dd3fc]'
                                : 'border-white/15 bg-[#11141c] text-[#f2f0ea] hover:border-[#38bdf8] hover:text-[#38bdf8]'
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

                  {/* Row 2: Problem Addressed vs System Architecture & Approach */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-white/[0.08]">
                    <div className="lg:col-span-5 border border-white/[0.07] bg-[#08090c] p-5 space-y-2.5">
                      <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98]">
                        <span className="flex items-center gap-1.5 text-[#38bdf8]">
                          <Terminal size={12} /> PROBLEM ADDRESSED
                        </span>
                        <span>CONTEXT</span>
                      </div>
                      <p className="text-sm text-[#8a8f98] leading-relaxed">
                        {sys.problemAddressed}
                      </p>
                    </div>

                    <div className="lg:col-span-7 border border-white/[0.07] bg-[#08090c] p-5 space-y-2.5">
                      <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98]">
                        <span className="flex items-center gap-1.5 text-[#38bdf8]">
                          <Cpu size={12} /> SYSTEM ARCHITECTURE &amp; APPROACH
                        </span>
                        <span>DESIGN</span>
                      </div>
                      <p className="text-sm text-[#f2f0ea]/85 leading-relaxed">
                        {sys.architectureSummary}
                      </p>
                    </div>
                  </div>

                  {/* Row 3: 4-Stage Schematic Architecture Pipeline Diagram */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98]">
                      <span className="flex items-center gap-1.5">
                        <Layers size={12} className="text-[#38bdf8]" />
                        SYSTEM PIPELINE ARCHITECTURE · {sys.name.toUpperCase()}
                      </span>
                      <span>4-STAGE EXECUTION FLOW</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {sys.architecturePipeline.map((node, i) => (
                        <div
                          key={node.stage}
                          className="relative border border-white/[0.08] bg-[#0e1118] p-4 flex flex-col justify-between gap-2 group hover:border-[#38bdf8]/50 transition-colors"
                        >
                          <div className="flex items-center justify-between font-mono-tech text-[10px]">
                            <span className="text-[#38bdf8]">{node.stage}</span>
                            <span className="text-[#565b66]">
                              {i < sys.architecturePipeline.length - 1 ? '───►' : '● OUTPUT'}
                            </span>
                          </div>
                          <h4 className="font-display text-sm font-semibold text-[#f2f0ea]">
                            {node.node}
                          </h4>
                          <p className="text-xs text-[#8a8f98] leading-relaxed">{node.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optional Interactive Visual Interface & CLI Gallery (for DatasetMedic & API Detective) */}
                  {sys.previews && sys.previews.length > 0 && currentPreview && (
                    <div className="border border-white/[0.08] bg-[#08090c] p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] pb-3">
                        <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8] flex items-center gap-2">
                          <ImageIcon size={13} />
                          INTERFACE &amp; CLI PREVIEWS · {currentPreview.caption}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sys.previews.map((prv, idx) => (
                            <button
                              key={prv.src}
                              onClick={() => setPreview(sys.id, idx)}
                              className={`font-mono-tech text-[10px] px-2.5 py-1 border transition-colors ${
                                idx === currentImgIdx
                                  ? 'border-[#38bdf8] bg-[#38bdf8] text-[#08090c] font-semibold'
                                  : 'border-white/10 bg-[#0d1017] text-[#8a8f98] hover:text-[#f2f0ea]'
                              }`}
                            >
                              0{idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="overflow-hidden border border-white/[0.08] bg-[#050608]">
                        <img
                          src={currentPreview.src}
                          alt={currentPreview.caption}
                          loading="lazy"
                          className="w-full max-h-[520px] object-contain mx-auto block"
                        />
                      </div>
                    </div>
                  )}

                  {/* Row 4: Technologies & Expandable Technical Specification Toggle */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#565b66] mr-1">
                        TECHNOLOGIES:
                      </span>
                      {sys.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono-tech text-[11px] px-2.5 py-1 border border-white/[0.08] bg-[#08090c] text-[#8a8f98]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleSpec(sys.id)}
                      aria-expanded={isExpanded}
                      className="inline-flex items-center gap-2 font-mono-tech text-[11px] text-[#38bdf8] hover:text-[#f2f0ea] shrink-0 py-1.5 px-3 border border-[#38bdf8]/30 bg-[#38bdf8]/[0.05] transition-colors"
                    >
                      <span>
                        {isExpanded ? 'Hide Technical Details' : 'View Technical Details'}
                      </span>
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </div>

                  {/* Expandable Technical Specifications Drawer */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-2 border-t border-dashed border-white/[0.1] bg-[#08090c]/90 p-5 space-y-3">
                          <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8]">
                            ENGINEERING SPECIFICATIONS &amp; CAPABILITIES
                          </p>
                          <ul className="space-y-2 text-xs sm:text-sm text-[#f2f0ea]/85">
                            {sys.technicalSpecifications.map((spec) => (
                              <li key={spec} className="flex items-start gap-3">
                                <span className="font-mono-tech text-[#38bdf8] mt-0.5">›</span>
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
