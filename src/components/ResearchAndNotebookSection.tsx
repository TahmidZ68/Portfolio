import { useState } from 'react';
import { ArrowUpRight, FileText, FlaskConical, Github, Microscope } from 'lucide-react';
import {
  axiosStationData,
  evolutionData,
  openQuestionsData,
  researchLabData,
  verifiedLinks,
  type EvolutionEntry,
} from '@/content';

type ResearchFilter = 'all' | 'published' | 'ongoing' | 'experimental';

function getEvolutionAccent(type: EvolutionEntry['type']): string {
  switch (type) {
    case 'ENGINEERING & LEADERSHIP':
      return '#10b981'; // Emerald
    case 'AI ARCHITECTURE':
    case 'BUSINESS & STRATEGY':
      return '#f59e0b'; // Amber
    case 'UNIVERSITY EDUCATION':
      return '#38bdf8'; // Cyan
    case 'ACADEMIC RESEARCH':
      return '#a78bfa'; // Violet
  }
}

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
          04 — RESEARCH & PUBLICATIONS (VIOLET + CYAN SPECTRUM)
         ===================================================================== */}
      <section
        id="research-lab"
        className="border-b border-white/[0.08] bg-[#0a0b15] lab-subgrid-bg ambient-research-glow scroll-mt-16"
      >
        <div className="spectrum-divider" />
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08]">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em]">
                <span className="text-[#a78bfa]">{researchLabData.headerCode}</span>
                <span className="text-white/20">—</span>
                <span className="text-[#94a3b8]">ACADEMIC &amp; APPLIED AI RESEARCH</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#f2f0ea] leading-[0.96] uppercase">
                {researchLabData.headline}
              </h2>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#a78bfa]">
                CORE RESEARCH AREAS
              </p>
              <div className="flex flex-wrap gap-1.5">
                {researchLabData.interests.map((interest) => (
                  <span
                    key={interest}
                    className="font-mono-tech text-[11px] px-2.5 py-1 border border-[#a78bfa]/30 bg-[#a78bfa]/[0.07] text-[#f2f0ea]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Research Thesis & Multi-Spectrum Adaptive CV Pipeline */}
          <div className="my-12 border border-white/[0.1] border-t-2 border-t-[#a78bfa] bg-[#07090e]/95 p-6 sm:p-10 crosshair-corner">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 font-mono-tech text-[11px] text-[#a78bfa] px-3 py-1 border border-[#a78bfa]/40 bg-[#a78bfa]/10">
                  <Microscope size={13} />
                  <span>RESEARCH DIRECTION</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f2f0ea] leading-tight">
                  {researchLabData.thesisTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                  {researchLabData.thesisDescription}
                </p>
              </div>

              {/* 3-Stage Adaptive Vision Pipeline Schematic */}
              <div className="lg:col-span-7 border border-white/[0.08] bg-[#0c0e18] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#94a3b8] border-b border-white/[0.07] pb-3">
                  <span>ADAPTIVE COMPUTER VISION PIPELINE</span>
                  <span className="text-[#a78bfa]">DOMAIN GENERALIZATION</span>
                </div>

                <svg
                  viewBox="0 0 680 76"
                  className="w-full h-auto border border-white/[0.05] bg-[#07090e] p-2"
                  aria-label="Adaptive Computer Vision Signal Flow Diagram"
                >
                  <defs>
                    <linearGradient id="cvFlowLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="20"
                    y1="38"
                    x2="660"
                    y2="38"
                    stroke="url(#cvFlowLine)"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                  {[
                    { x: 30, label: 'INPUT [DEGRADED FRAME]', color: '#94a3b8' },
                    { x: 205, label: '01: DEGRADATION CLASS', color: '#38bdf8' },
                    { x: 380, label: '02: ADAPTIVE RESTORE', color: '#a78bfa' },
                    { x: 545, label: '03: OBJECT DETECTION', color: '#10b981' },
                  ].map((node) => (
                    <g key={node.label} transform={`translate(${node.x}, 16)`}>
                      <rect
                        width="115"
                        height="44"
                        fill="#0d101b"
                        stroke={node.color}
                        strokeWidth="1"
                      />
                      <circle cx="12" cy="22" r="3" fill={node.color} />
                      <text
                        x="22"
                        y="25"
                        fill="#f2f0ea"
                        fontSize="7.3"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {researchLabData.adaptivePipeline.map((stage, i) => {
                    const col = i === 0 ? '#38bdf8' : i === 1 ? '#a78bfa' : '#10b981';
                    return (
                      <div
                        key={stage.step}
                        style={{ borderTopWidth: '2px', borderTopColor: col }}
                        className="border border-white/[0.08] bg-[#07090e] p-4 space-y-1.5"
                      >
                        <span className="font-mono-tech text-[10px]" style={{ color: col }}>
                          {stage.step}
                        </span>
                        <h4 className="font-display text-sm font-semibold text-[#f2f0ea]">
                          {stage.title}
                        </h4>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">{stage.detail}</p>
                      </div>
                    );
                  })}
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
                { id: 'all', label: 'All Research (06)', color: '#a78bfa' },
                { id: 'published', label: 'Published Papers (04)', color: '#10b981' },
                { id: 'ongoing', label: 'Funded Capstone & BAU (01)', color: '#38bdf8' },
                { id: 'experimental', label: 'Experimental ML (01)', color: '#f59e0b' },
              ].map((tab) => {
                const active = researchFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setResearchFilter(tab.id as ResearchFilter)}
                    style={
                      active
                        ? {
                            backgroundColor: tab.color,
                            borderColor: tab.color,
                            color: '#07090e',
                          }
                        : undefined
                    }
                    className={`font-mono-tech text-[11px] px-3.5 py-1.5 border font-semibold transition-colors ${
                      active
                        ? ''
                        : 'border-white/[0.12] bg-[#07090e] text-[#94a3b8] hover:text-[#f2f0ea]'
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
            {filteredPublications.map((item) => {
              const cardColor =
                item.category === 'published'
                  ? '#a78bfa'
                  : item.category === 'ongoing'
                    ? '#38bdf8'
                    : '#f59e0b';
              return (
                <article
                  key={item.id}
                  style={{ borderTopWidth: '2px', borderTopColor: cardColor }}
                  className="border border-white/[0.1] bg-[#07090e] p-6 sm:p-8 flex flex-col justify-between gap-6 hover:border-white/[0.25] transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08] font-mono-tech text-[11px]">
                      <div className="flex items-center gap-2.5">
                        <span style={{ color: cardColor }} className="font-semibold">
                          {item.code}
                        </span>
                        <span className="text-white/20">·</span>
                        <span className="text-[#94a3b8]">{item.year}</span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 border text-[10px] ${
                          item.category === 'published'
                            ? 'border-emerald-400/35 text-emerald-300 bg-emerald-400/[0.07]'
                            : item.category === 'ongoing'
                              ? 'border-[#38bdf8]/40 text-[#38bdf8] bg-[#38bdf8]/[0.08]'
                              : 'border-amber-400/35 text-amber-300 bg-amber-400/[0.07]'
                        }`}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <p className="font-mono-tech text-[11px] text-[#94a3b8] mb-1">{item.venue}</p>
                      <h3 className="font-display text-2xl font-bold text-[#f2f0ea] leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div>
                        <span
                          className="block font-mono-tech text-[10px] uppercase tracking-widest mb-1"
                          style={{ color: cardColor }}
                        >
                          RESEARCH CONTRIBUTION
                        </span>
                        <p className="text-sm text-[#f2f0ea]/85 leading-relaxed">
                          {item.contribution}
                        </p>
                      </div>
                      <div>
                        <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#94a3b8] mb-1">
                          METHODOLOGY
                        </span>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">{item.methodology}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="font-mono-tech text-[10px] px-2 py-0.5 border border-white/[0.09] text-[#94a3b8]"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {item.paperUrl && (
                        <a
                          href={item.paperUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#a78bfa] hover:text-[#f2f0ea] px-3 py-1.5 border border-[#a78bfa]/40 bg-[#a78bfa]/[0.08] transition-colors"
                        >
                          <FileText size={12} />
                          <span>
                            {item.category === 'published' ? 'Research Paper' : 'Kaggle Profile'}
                          </span>
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                      {item.repoUrl && (
                        <a
                          href={item.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#f2f0ea] hover:text-[#38bdf8] px-3 py-1.5 border border-white/15 bg-[#0d1017] hover:border-[#38bdf8] transition-colors"
                        >
                          <Github size={12} />
                          <span>GitHub Repo</span>
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                      {item.secondaryRepoUrl && (
                        <a
                          href={item.secondaryRepoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#f2f0ea] hover:text-[#38bdf8] px-3 py-1.5 border border-white/15 bg-[#0d1017] hover:border-[#38bdf8] transition-colors"
                        >
                          <Github size={12} />
                          <span>{item.secondaryRepoLabel || 'Secondary Repo'}</span>
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Open-Source ML & Research Repositories Directory */}
          <div className="mt-10 border border-white/[0.08] border-t-2 border-t-[#38bdf8] bg-[#07090e] p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.07] font-mono-tech text-[10px] uppercase tracking-widest text-[#94a3b8]">
              <span>OPEN-SOURCE ML, NLP &amp; MEDICAL IMAGING REPOSITORIES (GITHUB)</span>
              <span className="text-[#38bdf8]">10 VERIFIED REPOSITORIES</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 font-mono-tech text-xs">
              {[
                { label: 'RAG_BanglaHSC', url: verifiedLinks.ragBanglaHscRepo },
                { label: 'Autism_Numeric_ML', url: verifiedLinks.autismNumericRepo },
                { label: 'Autistic_Image_CNN', url: verifiedLinks.autismImageRepo },
                { label: 'Covid-Pneumonia_CNN', url: verifiedLinks.covidPneumoniaRepo },
                { label: 'Brain_Tumor_Prediction', url: verifiedLinks.brainTumorRepo },
                { label: 'Startup_Success_ML', url: verifiedLinks.startupPredictionRepo },
                { label: 'Book_Recommender_CF', url: verifiedLinks.bookRecRepo },
                { label: 'Real_Estate_Price_ML', url: verifiedLinks.realEstateRepo },
                { label: 'Disease_Symptoms_ML', url: verifiedLinks.diseaseSymptomsRepo },
                { label: 'Online_Review_TF-IDF', url: verifiedLinks.tfidfReviewRepo },
              ].map((repo) => (
                <a
                  key={repo.label}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 border border-white/[0.08] bg-[#0b101b] text-[#f2f0ea] hover:border-[#a78bfa] hover:text-[#a78bfa] transition-colors"
                >
                  <span className="truncate">{repo.label}</span>
                  <ArrowUpRight size={12} className="shrink-0 text-[#a78bfa]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          05 — OPEN QUESTIONS (ACTIVE RESEARCH NOTEBOOK)
         ===================================================================== */}
      <section
        id="open-questions"
        className="border-b border-white/[0.08] bg-[#07090e] lab-grid-bg scroll-mt-16"
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08]">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em]">
                <span className="text-[#a78bfa]">05 // OPEN QUESTIONS</span>
                <span className="text-white/20">—</span>
                <span className="text-[#94a3b8]">ACTIVE RESEARCH NOTEBOOK</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#f2f0ea] leading-[0.96] uppercase">
                Problems Under Investigation.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                An active engineering and research notebook documenting the failure modes, edge
                conditions, and technical questions driving my current work.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 border border-white/[0.1] border-t-2 border-t-[#a78bfa] bg-[#0b101b] crosshair-corner">
            {/* Left Selector Column */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/[0.08] divide-y divide-white/[0.07]">
              <div className="px-6 py-3.5 bg-[#0e1422] font-mono-tech text-[10px] uppercase tracking-widest text-[#94a3b8] flex items-center justify-between">
                <span>RESEARCH NOTEBOOK · 05 TOPICS</span>
                <span className="text-[#a78bfa]">SELECT TOPIC</span>
              </div>
              {openQuestionsData.map((q, idx) => {
                const isSelected = idx === activeQuestionIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setActiveQuestionIdx(idx)}
                    className={`w-full text-left p-6 transition-colors flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-[#a78bfa]/[0.1] border-l-2 border-l-[#a78bfa]'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono-tech text-[11px]">
                      <span
                        className={isSelected ? 'text-[#a78bfa] font-semibold' : 'text-[#94a3b8]'}
                      >
                        {q.code}
                      </span>
                      <span className="text-[10px] text-[#64748b]">{q.domain}</span>
                    </div>
                    <p
                      className={`font-display text-base sm:text-lg font-semibold leading-snug ${
                        isSelected ? 'text-[#f2f0ea]' : 'text-[#94a3b8]'
                      }`}
                    >
                      {q.question}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Active Notebook Sheet */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 bg-[#07090e]">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08] font-mono-tech text-xs">
                  <span className="text-[#a78bfa] flex items-center gap-2">
                    <FlaskConical size={14} />
                    {activeQuestion.code} · {activeQuestion.domain}
                  </span>
                  <span className="text-emerald-300">ACTIVE INQUIRY</span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#f2f0ea] leading-tight">
                  {activeQuestion.question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className="border border-white/[0.08] border-t-2 border-t-[#38bdf8] bg-[#0b101b] p-5 space-y-2">
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8]">
                      01 // CONTEXT
                    </span>
                    <p className="text-sm text-[#f2f0ea]/85 leading-relaxed">
                      {activeQuestion.context}
                    </p>
                  </div>

                  <div className="border border-white/[0.08] border-t-2 border-t-[#f59e0b] bg-[#0b101b] p-5 space-y-2">
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-amber-300">
                      02 // OBSERVED FAILURE MODE
                    </span>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">
                      {activeQuestion.failureMode}
                    </p>
                  </div>
                </div>

                <div className="border border-[#a78bfa]/35 bg-[#a78bfa]/[0.06] p-6 space-y-2">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#a78bfa]">
                    03 // INVESTIGATIVE DIRECTION &amp; ARCHITECTURAL APPROACH
                  </span>
                  <p className="text-sm sm:text-base text-[#f2f0ea] leading-relaxed">
                    {activeQuestion.investigativeDirection}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 font-mono-tech text-xs text-[#94a3b8]">
                <span>RELATED SYSTEM OR STUDY:</span>
                <span className="text-[#38bdf8]">{activeQuestion.relatedSystem}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          06 — EVOLUTION (VISUAL VERTICAL TIMELINE SPINE)
         ===================================================================== */}
      <section
        id="evolution"
        className="border-b border-white/[0.08] bg-[#0b101b] lab-subgrid-bg scroll-mt-16"
      >
        <div className="spectrum-divider" />
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-white/[0.08]">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em]">
                <span className="text-[#38bdf8]">06 // EVOLUTION</span>
                <span className="text-white/20">—</span>
                <span className="text-[#94a3b8]">EXPERIENCE, RESEARCH &amp; EDUCATION</span>
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
                className="inline-flex items-center gap-2 font-mono-tech text-xs px-5 py-3 border border-[#38bdf8]/50 bg-[#07090e] text-[#f2f0ea] hover:bg-[#38bdf8] hover:text-[#07090e] font-semibold transition-colors"
              >
                <span>Download Full CV (PDF)</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Visual Timeline Spine */}
          <div className="mt-14 relative pl-6 sm:pl-10 space-y-8">
            <div
              aria-hidden="true"
              className="absolute left-2 sm:left-3 top-2 bottom-2 w-[2px]"
              style={{
                background: 'linear-gradient(180deg, #10b981 0%, #f59e0b 45%, #38bdf8 75%, #a78bfa 100%)',
              }}
            />

            {evolutionData.map((entry, idx) => {
              const accent = getEvolutionAccent(entry.type);
              return (
                <div
                  key={entry.id}
                  style={{ borderTopWidth: '2px', borderTopColor: accent }}
                  className="relative border border-white/[0.1] bg-[#07090e]/95 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  {/* Milestone Node Dot on Spine */}
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
                    className="absolute -left-[22px] sm:-left-[35px] top-8 w-3.5 h-3.5 rounded-full border-2 border-[#0b101b]"
                  />

                  <div className="lg:col-span-3 space-y-2">
                    <div className="flex items-center gap-2 font-mono-tech text-xs" style={{ color: accent }}>
                      <span>0{idx + 1}</span>
                      <span className="text-white/20">//</span>
                      <span>{entry.period}</span>
                    </div>
                    <span
                      style={{ borderColor: `${accent}50`, color: accent, backgroundColor: `${accent}14` }}
                      className="inline-block font-mono-tech text-[10px] uppercase tracking-widest px-2.5 py-0.5 border"
                    >
                      {entry.type}
                    </span>
                  </div>

                  <div className="lg:col-span-4 space-y-1.5">
                    <h3 className="font-display text-2xl font-bold text-[#f2f0ea]">{entry.role}</h3>
                    <div className="font-mono-tech text-xs text-[#94a3b8] flex flex-wrap items-center gap-2">
                      {entry.orgUrl ? (
                        <a
                          href={entry.orgUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: accent }}
                          className="hover:underline inline-flex items-center gap-1 font-semibold"
                        >
                          {entry.organization} <ArrowUpRight size={12} />
                        </a>
                      ) : (
                        <span className="text-[#f2f0ea]/85">{entry.organization}</span>
                      )}
                      <span>·</span>
                      <span>{entry.location}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <p className="text-sm sm:text-base text-[#f2f0ea]/90 leading-relaxed">
                      {entry.summary}
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#94a3b8]">
                      {entry.details.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <span className="font-mono-tech mt-0.5" style={{ color: accent }}>
                            ›
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          07 — AXIOS STATION (EMERALD EXECUTIVE & PRODUCT SPOTLIGHT)
         ===================================================================== */}
      <section
        id="axios-station"
        className="border-b border-white/[0.08] bg-[#07090e] lab-grid-bg scroll-mt-16"
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="border border-emerald-400/25 border-t-2 border-t-[#10b981] bg-[#0b101b] p-6 sm:p-10 lg:p-14 crosshair-corner shadow-[0_0_60px_-20px_rgba(16,185,129,0.18)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-white/[0.08] items-end">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em]">
                  <span className="text-[#10b981]">{axiosStationData.headerCode}</span>
                  <span className="text-white/20">—</span>
                  <span className="text-[#94a3b8]">{axiosStationData.tenure}</span>
                </div>
                <div className="space-y-2">
                  <p className="font-mono-tech text-xs sm:text-sm uppercase tracking-widest text-emerald-300">
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
                  className="inline-flex items-center gap-2 font-mono-tech text-xs px-5 py-3.5 border border-[#10b981] bg-[#10b981] text-[#07090e] font-semibold hover:bg-[#34d399] transition-colors"
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
              {axiosStationData.pillars.map((pillar, i) => {
                const colors = ['#10b981', '#f59e0b', '#38bdf8', '#a78bfa', '#34d399'];
                const col = colors[i % colors.length];
                return (
                  <div
                    key={pillar.code}
                    style={{ borderTopWidth: '2px', borderTopColor: col }}
                    className="border border-white/[0.08] bg-[#07090e] p-5 flex flex-col justify-between gap-4 hover:border-white/25 transition-colors"
                  >
                    <div className="space-y-2.5">
                      <span className="font-mono-tech text-[10px]" style={{ color: col }}>
                        {pillar.code}
                      </span>
                      <h3 className="font-display text-lg font-bold text-[#f2f0ea]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#94a3b8] leading-relaxed">{pillar.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Axios Product Suite Quick Bar */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[#94a3b8]">
                LIVE AXIOS PRODUCT ECOSYSTEM (VERCEL):
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={verifiedLinks.axiosInsight}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#f2f0ea] hover:text-emerald-300 px-3 py-1.5 border border-emerald-400/30 bg-emerald-400/[0.06] hover:border-emerald-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Axios Insight</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href={verifiedLinks.axiosTalent}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#f2f0ea] hover:text-emerald-300 px-3 py-1.5 border border-emerald-400/30 bg-emerald-400/[0.06] hover:border-emerald-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Axios Talent (B2B HR)</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href={verifiedLinks.axiosTalentCandidate}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#f2f0ea] hover:text-emerald-300 px-3 py-1.5 border border-emerald-400/30 bg-emerald-400/[0.06] hover:border-emerald-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
