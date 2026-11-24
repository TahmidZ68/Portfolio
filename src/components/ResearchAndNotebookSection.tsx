import { useState } from 'react';
import { ArrowUpRight, FileText, FlaskConical, GitCommit, Microscope } from 'lucide-react';
import {
  axiosStationData,
  evolutionData,
  openQuestionsData,
  researchLabData,
  verifiedLinks,
} from '@/content';

type ResearchFilter = 'all' | 'published' | 'ongoing' | 'experimental';

export function ResearchAndNotebookSection() {
  const [researchFilter, setResearchFilter] = useState<ResearchFilter>('all');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  const filteredPublications =
    researchFilter === 'all'
      ? researchLabData.publications
      : researchLabData.publications.filter((item) => item.category === researchFilter);

  const activeQuestion = openQuestionsData[activeQuestionIdx];

  return (
    <>
      {/* =====================================================================
          04 — RESEARCH & PUBLICATIONS
         ===================================================================== */}
      <section
        id="research-lab"
        className="border-b border-white/[0.08] bg-[#0a0c10] lab-subgrid-bg scroll-mt-16"
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08]">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
                <span>{researchLabData.headerCode}</span>
                <span className="text-white/20">—</span>
                <span className="text-[#8a8f98]">ACADEMIC &amp; APPLIED AI RESEARCH</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#f2f0ea] leading-[0.96] uppercase">
                {researchLabData.headline}
              </h2>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98]">
                CORE RESEARCH AREAS
              </p>
              <div className="flex flex-wrap gap-1.5">
                {researchLabData.interests.map((interest) => (
                  <span
                    key={interest}
                    className="font-mono-tech text-[11px] px-2.5 py-1 border border-white/[0.1] bg-[#08090c] text-[#f2f0ea]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Research Thesis & Adaptive Computer Vision Schematic */}
          <div className="my-12 border border-white/[0.1] bg-[#08090c] p-6 sm:p-10 crosshair-corner">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 font-mono-tech text-[11px] text-[#38bdf8] px-3 py-1 border border-[#38bdf8]/35 bg-[#38bdf8]/[0.07]">
                  <Microscope size={13} />
                  <span>RESEARCH DIRECTION</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f0ea] leading-tight">
                  {researchLabData.thesisTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#8a8f98] leading-relaxed">
                  {researchLabData.thesisDescription}
                </p>
              </div>

              {/* 3-Stage Adaptive Vision Pipeline Schematic */}
              <div className="lg:col-span-7 border border-white/[0.08] bg-[#0c0e14] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98] border-b border-white/[0.07] pb-3">
                  <span>ADAPTIVE COMPUTER VISION PIPELINE</span>
                  <span className="text-[#38bdf8]">DOMAIN GENERALIZATION</span>
                </div>

                {/* Technical SVG Signal Diagram */}
                <svg
                  viewBox="0 0 680 76"
                  className="w-full h-auto border border-white/[0.05] bg-[#08090c] p-2"
                  aria-label="Adaptive Computer Vision Signal Flow Diagram"
                >
                  <line
                    x1="20"
                    y1="38"
                    x2="660"
                    y2="38"
                    stroke="rgba(56, 189, 248, 0.28)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  {[
                    { x: 30, label: 'INPUT [DEGRADED FRAME]' },
                    { x: 205, label: '01: DEGRADATION CLASS' },
                    { x: 380, label: '02: ADAPTIVE RESTORE' },
                    { x: 545, label: '03: OBJECT DETECTION' },
                  ].map((node, idx) => (
                    <g key={node.label} transform={`translate(${node.x}, 16)`}>
                      <rect
                        width="115"
                        height="44"
                        fill="#0d1017"
                        stroke={idx === 3 ? '#38bdf8' : 'rgba(242,240,234,0.2)'}
                        strokeWidth="1"
                      />
                      <circle
                        cx="12"
                        cy="22"
                        r="3"
                        fill={idx === 3 ? '#38bdf8' : 'rgba(242,240,234,0.5)'}
                      />
                      <text
                        x="22"
                        y="25"
                        fill="#f2f0ea"
                        fontSize="7.5"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {researchLabData.adaptivePipeline.map((stage) => (
                    <div
                      key={stage.step}
                      className="border border-white/[0.07] bg-[#08090c] p-4 space-y-1.5"
                    >
                      <span className="font-mono-tech text-[10px] text-[#38bdf8]">{stage.step}</span>
                      <h4 className="font-display text-sm font-semibold text-[#f2f0ea]">
                        {stage.title}
                      </h4>
                      <p className="text-xs text-[#8a8f98] leading-relaxed">{stage.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Publications & Research Ledger Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="font-mono-tech text-xs uppercase tracking-widest text-[#f2f0ea]">
              PUBLICATIONS, FUNDED GRANTS &amp; EXPERIMENTAL STUDIES
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter research items">
              {[
                { id: 'all', label: 'All Research (06)' },
                { id: 'published', label: 'Published Papers (04)' },
                { id: 'ongoing', label: 'Funded Capstone & BAU (01)' },
                { id: 'experimental', label: 'Experimental ML (01)' },
              ].map((tab) => {
                const active = researchFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setResearchFilter(tab.id as ResearchFilter)}
                    className={`font-mono-tech text-[11px] px-3.5 py-1.5 border transition-colors ${
                      active
                        ? 'border-[#38bdf8] bg-[#38bdf8] text-[#08090c] font-semibold'
                        : 'border-white/[0.12] bg-[#08090c] text-[#8a8f98] hover:text-[#f2f0ea]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Research Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPublications.map((item) => (
              <article
                key={item.id}
                className="border border-white/[0.1] bg-[#08090c] p-6 sm:p-8 flex flex-col justify-between gap-6 hover:border-white/[0.22] transition-colors"
              >
                <div className="space-y-4">
                  {/* Metadata Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08] font-mono-tech text-[11px]">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#38bdf8]">{item.code}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-[#8a8f98]">{item.year}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 border text-[10px] ${
                        item.category === 'published'
                          ? 'border-emerald-400/35 text-emerald-300 bg-emerald-400/[0.06]'
                          : item.category === 'ongoing'
                            ? 'border-[#38bdf8]/40 text-[#38bdf8] bg-[#38bdf8]/[0.07]'
                            : 'border-white/20 text-[#8a8f98]'
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <p className="font-mono-tech text-[11px] text-[#8a8f98] mb-1">{item.venue}</p>
                    <h3 className="font-display text-2xl font-bold text-[#f2f0ea] leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div>
                      <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8] mb-1">
                        RESEARCH CONTRIBUTION
                      </span>
                      <p className="text-sm text-[#f2f0ea]/85 leading-relaxed">
                        {item.contribution}
                      </p>
                    </div>
                    <div>
                      <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98] mb-1">
                        METHODOLOGY
                      </span>
                      <p className="text-xs text-[#8a8f98] leading-relaxed">{item.methodology}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="font-mono-tech text-[10px] px-2 py-0.5 border border-white/[0.08] text-[#8a8f98]"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {item.paperUrl && (
                    <a
                      href={item.paperUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#38bdf8] hover:text-[#f2f0ea] px-3 py-1.5 border border-[#38bdf8]/40 bg-[#38bdf8]/[0.06] transition-colors shrink-0"
                    >
                      <FileText size={12} />
                      <span>
                        {item.category === 'published' ? 'Research Paper' : 'Kaggle / Dataset'}
                      </span>
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          05 — OPEN QUESTIONS (RESEARCH NOTEBOOK)
         ===================================================================== */}
      <section
        id="open-questions"
        className="border-b border-white/[0.08] bg-[#08090c] lab-grid-bg scroll-mt-16"
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08]">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
                <span>05 // OPEN QUESTIONS</span>
                <span className="text-white/20">—</span>
                <span className="text-[#8a8f98]">ACTIVE RESEARCH NOTEBOOK</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#f2f0ea] leading-[0.96] uppercase">
                Problems Under Investigation.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#8a8f98] leading-relaxed">
                An active engineering and research notebook documenting the failure modes, edge
                conditions, and technical questions driving my current work.
              </p>
            </div>
          </div>

          {/* Split-Pane Research Notebook Interface */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 border border-white/[0.1] bg-[#0b0d12] crosshair-corner">
            {/* Left Selector Column */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/[0.08] divide-y divide-white/[0.07]">
              <div className="px-6 py-3.5 bg-[#0e1118] font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98] flex items-center justify-between">
                <span>RESEARCH NOTEBOOK · 05 TOPICS</span>
                <span className="text-[#38bdf8]">SELECT TOPIC</span>
              </div>
              {openQuestionsData.map((q, idx) => {
                const isSelected = idx === activeQuestionIdx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestionIdx(idx)}
                    className={`w-full text-left p-6 transition-colors flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-[#38bdf8]/[0.08] border-l-2 border-l-[#38bdf8]'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono-tech text-[11px]">
                      <span
                        className={isSelected ? 'text-[#38bdf8] font-semibold' : 'text-[#8a8f98]'}
                      >
                        {q.code}
                      </span>
                      <span className="text-[10px] text-[#565b66]">{q.domain}</span>
                    </div>
                    <p
                      className={`font-display text-base sm:text-lg font-semibold leading-snug ${
                        isSelected ? 'text-[#f2f0ea]' : 'text-[#8a8f98]'
                      }`}
                    >
                      {q.question}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Active Notebook Sheet */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 bg-[#08090c]">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08] font-mono-tech text-xs">
                  <span className="text-[#38bdf8] flex items-center gap-2">
                    <FlaskConical size={14} />
                    {activeQuestion.code} · {activeQuestion.domain}
                  </span>
                  <span className="text-[#8a8f98]">ACTIVE INQUIRY</span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#f2f0ea] leading-tight">
                  {activeQuestion.question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className="border border-white/[0.08] bg-[#0b0d12] p-5 space-y-2">
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98]">
                      01 // CONTEXT
                    </span>
                    <p className="text-sm text-[#f2f0ea]/85 leading-relaxed">
                      {activeQuestion.context}
                    </p>
                  </div>

                  <div className="border border-white/[0.08] bg-[#0b0d12] p-5 space-y-2">
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-amber-300/90">
                      02 // OBSERVED FAILURE MODE
                    </span>
                    <p className="text-sm text-[#8a8f98] leading-relaxed">
                      {activeQuestion.failureMode}
                    </p>
                  </div>
                </div>

                <div className="border border-[#38bdf8]/30 bg-[#38bdf8]/[0.04] p-6 space-y-2">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8]">
                    03 // INVESTIGATIVE DIRECTION &amp; ARCHITECTURAL APPROACH
                  </span>
                  <p className="text-sm sm:text-base text-[#f2f0ea] leading-relaxed">
                    {activeQuestion.investigativeDirection}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 font-mono-tech text-xs text-[#8a8f98]">
                <span>RELATED SYSTEM OR STUDY:</span>
                <span className="text-[#38bdf8]">{activeQuestion.relatedSystem}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          06 — EVOLUTION (CAREER & ACADEMIC TIMELINE)
         ===================================================================== */}
      <section
        id="evolution"
        className="border-b border-white/[0.08] bg-[#0a0c10] lab-subgrid-bg scroll-mt-16"
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-white/[0.08]">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
                <span>06 // EVOLUTION</span>
                <span className="text-white/20">—</span>
                <span className="text-[#8a8f98]">EXPERIENCE, RESEARCH &amp; EDUCATION</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#f2f0ea] leading-[0.96] uppercase">
                Career &amp; Academic Timeline.
              </h2>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
              <a
                href={verifiedLinks.cvPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono-tech text-xs px-5 py-3 border border-white/20 bg-[#08090c] text-[#f2f0ea] hover:border-[#38bdf8] hover:text-[#38bdf8] transition-colors"
              >
                <span>Download Full CV (PDF)</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="mt-12 divide-y divide-white/[0.08] border-b border-white/[0.08]">
            {evolutionData.map((entry, idx) => (
              <div
                key={entry.id}
                className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
              >
                {/* Column 1: Dates & Index */}
                <div className="lg:col-span-3 space-y-1.5">
                  <div className="flex items-center gap-2 font-mono-tech text-xs text-[#38bdf8]">
                    <GitCommit size={14} />
                    <span>0{idx + 1}</span>
                    <span className="text-white/20">//</span>
                    <span>{entry.period}</span>
                  </div>
                  <span className="inline-block font-mono-tech text-[10px] uppercase tracking-widest text-[#8a8f98] px-2 py-0.5 border border-white/[0.08] bg-[#08090c]">
                    {entry.type}
                  </span>
                </div>

                {/* Column 2: Role & Organization */}
                <div className="lg:col-span-4 space-y-1">
                  <h3 className="font-display text-2xl font-bold text-[#f2f0ea]">{entry.role}</h3>
                  <div className="font-mono-tech text-xs text-[#8a8f98] flex flex-wrap items-center gap-2">
                    {entry.orgUrl ? (
                      <a
                        href={entry.orgUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#38bdf8] hover:underline inline-flex items-center gap-1"
                      >
                        {entry.organization} <ArrowUpRight size={12} />
                      </a>
                    ) : (
                      <span className="text-[#f2f0ea]/80">{entry.organization}</span>
                    )}
                    <span>·</span>
                    <span>{entry.location}</span>
                  </div>
                </div>

                {/* Column 3: Contributions */}
                <div className="lg:col-span-5 space-y-3">
                  <p className="text-sm sm:text-base text-[#f2f0ea]/90 leading-relaxed">
                    {entry.summary}
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#8a8f98]">
                    {entry.details.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <span className="font-mono-tech text-[#38bdf8] mt-0.5">›</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          07 — AXIOS STATION (EXECUTIVE & TECHNICAL SPOTLIGHT)
         ===================================================================== */}
      <section
        id="axios-station"
        className="border-b border-white/[0.08] bg-[#08090c] lab-grid-bg scroll-mt-16"
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="border border-white/[0.12] bg-[#0b0d12] p-6 sm:p-10 lg:p-14 crosshair-corner">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-white/[0.08] items-end">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
                  <span>{axiosStationData.headerCode}</span>
                  <span className="text-white/20">—</span>
                  <span className="text-[#8a8f98]">{axiosStationData.tenure}</span>
                </div>
                <div className="space-y-2">
                  <p className="font-mono-tech text-xs sm:text-sm uppercase tracking-widest text-[#8a8f98]">
                    {axiosStationData.roleTitle} @ {axiosStationData.companyName}
                  </p>
                  <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#f2f0ea] leading-[0.98] uppercase">
                    {axiosStationData.headline}
                  </h2>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
                <a
                  href={axiosStationData.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono-tech text-xs px-5 py-3.5 border border-[#38bdf8] bg-[#38bdf8] text-[#08090c] font-semibold hover:bg-[#7dd3fc] transition-colors"
                >
                  <span>Visit axiosstation.com</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            <div className="py-8 border-b border-white/[0.08]">
              <p className="text-base sm:text-lg text-[#f2f0ea]/85 leading-relaxed max-w-4xl">
                {axiosStationData.overview}
              </p>
            </div>

            {/* 5 Pillars Grid */}
            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {axiosStationData.pillars.map((pillar) => (
                <div
                  key={pillar.code}
                  className="border border-white/[0.08] bg-[#08090c] p-5 flex flex-col justify-between gap-4 hover:border-[#38bdf8]/40 transition-colors"
                >
                  <div className="space-y-2.5">
                    <span className="font-mono-tech text-[10px] text-[#38bdf8]">{pillar.code}</span>
                    <h3 className="font-display text-lg font-bold text-[#f2f0ea]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#8a8f98] leading-relaxed">{pillar.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Axios Product Suite Quick Bar */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[#8a8f98]">
                LIVE AXIOS PRODUCT ECOSYSTEM (VERCEL):
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={verifiedLinks.axiosInsight}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#f2f0ea] hover:text-[#38bdf8] px-3 py-1.5 border border-white/15 hover:border-[#38bdf8] transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-400" />
                  <span>Axios Insight</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href={verifiedLinks.axiosTalent}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#f2f0ea] hover:text-[#38bdf8] px-3 py-1.5 border border-white/15 hover:border-[#38bdf8] transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-400" />
                  <span>Axios Talent (B2B HR)</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href={verifiedLinks.axiosTalentCandidate}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#f2f0ea] hover:text-[#38bdf8] px-3 py-1.5 border border-white/15 hover:border-[#38bdf8] transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-400" />
                  <span>Axios Talent Candidate</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
