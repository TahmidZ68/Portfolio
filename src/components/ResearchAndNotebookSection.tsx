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
      return '#10b981';
    case 'AI ARCHITECTURE':
    case 'BUSINESS & STRATEGY':
      return '#f59e0b';
    case 'UNIVERSITY EDUCATION':
      return '#2563eb';
    case 'ACADEMIC RESEARCH':
      return '#7c3aed';
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
          04 — RESEARCH & PUBLICATIONS (WARM IVORY HIGH-CONTRAST EDITORIAL)
         ===================================================================== */}
      <section
        id="research-lab"
        className="editorial-ivory-bg text-[#111318] border-b border-black/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-24 sm:py-32">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-black/[0.08]">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold bg-violet-600/10 text-violet-700 border border-violet-600/20">
                04 · Academic &amp; Applied Research
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111318] leading-[1.03]">
                {researchLabData.headline}
              </h2>
            </div>

            <div className="lg:col-span-4 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#525866]">
                Research Interests
              </p>
              <div className="flex flex-wrap gap-1.5">
                {researchLabData.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full text-xs font-medium px-3 py-1 bg-white border border-black/[0.09] text-[#111318] shadow-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Research Thesis & Adaptive Computer Vision Pipeline */}
          <div className="my-12 rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full text-xs font-semibold text-[#2563eb] px-3.5 py-1 bg-blue-50 border border-blue-200">
                  <Microscope size={14} />
                  <span>Core Research Direction</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111318] leading-snug">
                  {researchLabData.thesisTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#525866] leading-relaxed">
                  {researchLabData.thesisDescription}
                </p>
              </div>

              <div className="lg:col-span-7 rounded-2xl border border-black/[0.07] bg-[#f6f4ef] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#525866] border-b border-black/[0.08] pb-3">
                  <span>Adaptive Computer Vision Pipeline</span>
                  <span className="text-[#7c3aed]">Domain Generalization</span>
                </div>

                {/* Clean Light-Editorial SVG Diagram */}
                <svg
                  viewBox="0 0 680 76"
                  className="w-full h-auto rounded-xl border border-black/[0.06] bg-white p-2"
                  aria-label="Adaptive Computer Vision Signal Flow Diagram"
                >
                  <defs>
                    <linearGradient id="cvFlowLight" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="50%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="20"
                    y1="38"
                    x2="660"
                    y2="38"
                    stroke="url(#cvFlowLight)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {[
                    { x: 26, label: 'Input Frame', color: '#64748b' },
                    { x: 198, label: '01 Degradation ID', color: '#2563eb' },
                    { x: 374, label: '02 Adaptive Restore', color: '#7c3aed' },
                    { x: 545, label: '03 Detection', color: '#059669' },
                  ].map((node) => (
                    <g key={node.label} transform={`translate(${node.x}, 16)`}>
                      <rect
                        width="115"
                        height="44"
                        rx="10"
                        fill="#ffffff"
                        stroke={node.color}
                        strokeWidth="1.4"
                      />
                      <circle cx="14" cy="22" r="3.5" fill={node.color} />
                      <text
                        x="24"
                        y="25.5"
                        fill="#111318"
                        fontSize="8.5"
                        fontWeight="600"
                        fontFamily="Inter, sans-serif"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {researchLabData.adaptivePipeline.map((stage, i) => {
                    const col = i === 0 ? '#2563eb' : i === 1 ? '#7c3aed' : '#059669';
                    return (
                      <div
                        key={stage.step}
                        className="rounded-xl border border-black/[0.07] bg-white p-4 space-y-1.5"
                      >
                        <span className="text-[11px] font-bold" style={{ color: col }}>
                          Stage 0{i + 1}
                        </span>
                        <h4 className="font-display text-sm font-bold text-[#111318]">
                          {stage.title}
                        </h4>
                        <p className="text-xs text-[#525866] leading-relaxed">{stage.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-display text-2xl font-bold text-[#111318]">
              Publications, Funded Grants &amp; Experimental Work
            </h3>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter research items">
              {[
                { id: 'all', label: 'All Research (6)', color: '#7c3aed' },
                { id: 'published', label: 'Published (4)', color: '#059669' },
                { id: 'ongoing', label: 'Funded Grant (1)', color: '#2563eb' },
                { id: 'experimental', label: 'Experimental (1)', color: '#d97706' },
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
                            color: '#ffffff',
                          }
                        : undefined
                    }
                    className={`rounded-full text-xs px-4 py-1.5 border font-semibold transition-colors ${
                      active
                        ? ''
                        : 'border-black/[0.12] bg-white text-[#525866] hover:text-[#111318]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Publication Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPublications.map((item) => {
              const badgeStyle =
                item.category === 'published'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : item.category === 'ongoing'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200';
              return (
                <article
                  key={item.id}
                  className="rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-black/[0.07]">
                      <span className="text-xs font-semibold text-[#525866]">{item.year}</span>
                      <span
                        className={`rounded-full px-3 py-0.5 border text-[11px] font-semibold ${badgeStyle}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[#2563eb] mb-1">{item.venue}</p>
                      <h3 className="font-display text-2xl font-bold text-[#111318] leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#525866] mb-1">
                          Research Contribution
                        </span>
                        <p className="text-sm text-[#111318]/85 leading-relaxed">
                          {item.contribution}
                        </p>
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#525866] mb-1">
                          Methodology
                        </span>
                        <p className="text-xs sm:text-sm text-[#525866] leading-relaxed">
                          {item.methodology}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/[0.07] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="rounded-full text-[11px] font-medium px-2.5 py-0.5 bg-[#f6f4ef] border border-black/[0.08] text-[#525866]"
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
                          className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] px-3.5 py-1.5 transition-colors"
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
                          className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold text-[#111318] bg-[#f6f4ef] hover:bg-[#e7e4dc] border border-black/[0.12] px-3.5 py-1.5 transition-colors"
                        >
                          <Github size={12} />
                          <span>Code</span>
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                      {item.secondaryRepoUrl && (
                        <a
                          href={item.secondaryRepoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold text-[#111318] bg-[#f6f4ef] hover:bg-[#e7e4dc] border border-black/[0.12] px-3.5 py-1.5 transition-colors"
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

          {/* Open-Source ML & Research Repositories Pill Strip */}
          <div className="mt-10 rounded-3xl border border-black/[0.08] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-black/[0.07]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#111318]">
                Open-Source ML, NLP &amp; Medical Imaging Repositories
              </span>
              <span className="text-xs font-semibold text-[#2563eb]">10 GitHub Repositories</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs font-medium">
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
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 border border-black/[0.08] bg-[#f6f4ef] text-[#111318] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
                >
                  <span className="truncate">{repo.label}</span>
                  <ArrowUpRight size={13} className="shrink-0 text-[#2563eb]" />
                </a>
              ))}
            </div>
          </div>

          {/* =================================================================
              05 — OPEN QUESTIONS (INTERACTIVE RESEARCH NOTEBOOK ON IVORY)
             ================================================================= */}
          <div id="open-questions" className="mt-24 pt-20 border-t border-black/[0.1] scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10">
              <div className="lg:col-span-7 space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold bg-blue-600/10 text-blue-700 border border-blue-600/20">
                  05 · Open Questions
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#111318] leading-[1.03]">
                  Problems Under Active Investigation.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm sm:text-base text-[#525866] leading-relaxed">
                  An ongoing research notebook of failure modes, edge conditions, and engineering
                  hypotheses shaping my current systems.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-black/[0.1] bg-white overflow-hidden shadow-sm">
              {/* Left Selector Column */}
              <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-black/[0.08] divide-y divide-black/[0.07] bg-[#edeae2]/60">
                {openQuestionsData.map((q, idx) => {
                  const isSelected = idx === activeQuestionIdx;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setActiveQuestionIdx(idx)}
                      className={`w-full text-left p-6 transition-colors flex flex-col gap-1.5 ${
                        isSelected
                          ? 'bg-white border-l-4 border-l-[#2563eb]'
                          : 'hover:bg-white/60'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider ${
                          isSelected ? 'text-[#2563eb]' : 'text-[#64748b]'
                        }`}
                      >
                        {q.domain}
                      </span>
                      <p
                        className={`font-display text-base sm:text-lg font-bold leading-snug ${
                          isSelected ? 'text-[#111318]' : 'text-[#525866]'
                        }`}
                      >
                        {q.question}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right Active Notebook Detail */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 bg-white">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/[0.07] text-xs font-semibold">
                    <span className="text-[#2563eb] flex items-center gap-2">
                      <FlaskConical size={15} />
                      {activeQuestion.domain}
                    </span>
                    <span className="rounded-full px-3 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active Inquiry
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111318] leading-snug">
                    {activeQuestion.question}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-black/[0.08] bg-[#f6f4ef] p-5 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563eb]">
                        Context
                      </span>
                      <p className="text-sm text-[#111318]/85 leading-relaxed">
                        {activeQuestion.context}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                        Observed Failure Mode
                      </span>
                      <p className="text-sm text-[#525866] leading-relaxed">
                        {activeQuestion.failureMode}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-6 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563eb]">
                      Investigative Direction &amp; Architecture
                    </span>
                    <p className="text-sm sm:text-base text-[#111318] leading-relaxed">
                      {activeQuestion.investigativeDirection}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.07] flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-[#525866]">
                  <span>Applied In</span>
                  <span className="font-semibold text-[#2563eb]">{activeQuestion.relatedSystem}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          06 — EVOLUTION & 07 — AXIOS STATION (DEEP OBSIDIAN)
         ===================================================================== */}
      <section
        id="evolution"
        className="bg-[#0c0d12] editorial-dark-glow text-[#f4f3ef] border-b border-white/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-white/[0.08]">
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-400/25">
                06 · Experience &amp; Education
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f4f3ef] leading-[1.02]">
                Career &amp; Academic Timeline.
              </h2>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
              <a
                href={verifiedLinks.cvPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full text-xs font-semibold px-5 py-3 border border-white/15 bg-[#131620] text-[#f4f3ef] hover:border-[#3b82f6] hover:bg-[#2563eb] transition-colors"
              >
                <span>Download Full CV (PDF)</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Visual Timeline Spine */}
          <div className="mt-14 relative pl-6 sm:pl-10 space-y-6">
            <div
              aria-hidden="true"
              className="absolute left-2 sm:left-3 top-2 bottom-2 w-[2px] rounded-full"
              style={{
                background: 'linear-gradient(180deg, #10b981 0%, #f59e0b 45%, #3b82f6 75%, #7c3aed 100%)',
              }}
            />

            {evolutionData.map((entry) => {
              const accent = getEvolutionAccent(entry.type);
              return (
                <div
                  key={entry.id}
                  className="relative rounded-3xl border border-white/[0.09] bg-[#131620] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:border-white/20 transition-colors"
                >
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
                    className="absolute -left-[22px] sm:-left-[35px] top-8 w-3.5 h-3.5 rounded-full border-2 border-[#0c0d12]"
                  />

                  <div className="lg:col-span-3 space-y-2">
                    <div className="text-xs font-semibold" style={{ color: accent }}>
                      {entry.period}
                    </div>
                    <span className="inline-block rounded-full text-[11px] font-medium px-3 py-0.5 bg-[#0c0d12] border border-white/[0.1] text-[#cbd5e1]">
                      {entry.type}
                    </span>
                  </div>

                  <div className="lg:col-span-4 space-y-1">
                    <h3 className="font-display text-2xl font-bold text-[#f4f3ef]">{entry.role}</h3>
                    <div className="text-xs text-[#94a3b8] flex flex-wrap items-center gap-2 font-medium">
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
                        <span className="text-[#f4f3ef]/90">{entry.organization}</span>
                      )}
                      <span>·</span>
                      <span>{entry.location}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <p className="text-sm sm:text-base text-[#e2e8f0] leading-relaxed">
                      {entry.summary}
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#94a3b8]">
                      {entry.details.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: accent }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =================================================================
              07 — AXIOS STATION (EMERALD EXECUTIVE SPOTLIGHT)
             ================================================================= */}
          <div id="axios-station" className="mt-24 scroll-mt-24">
            <div className="rounded-3xl border border-emerald-400/25 bg-[#131620] p-6 sm:p-10 lg:p-14 shadow-[0_0_70px_-25px_rgba(16,185,129,0.28)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-white/[0.08] items-end">
                <div className="lg:col-span-8 space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                    07 · Axios Station · {axiosStationData.tenure}
                  </span>
                  <p className="text-sm font-medium text-emerald-300">
                    {axiosStationData.roleTitle}
                  </p>
                  <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#f4f3ef] leading-[1.04]">
                    {axiosStationData.headline}
                  </h2>
                </div>

                <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
                  <a
                    href={axiosStationData.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full text-xs font-semibold px-6 py-3.5 bg-[#10b981] text-[#0c0d12] hover:bg-[#34d399] transition-colors"
                  >
                    <span>Visit axiosstation.com</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              <div className="py-8 border-b border-white/[0.08]">
                <p className="text-base sm:text-lg text-[#cbd5e1] leading-relaxed max-w-4xl">
                  {axiosStationData.overview}
                </p>
              </div>

              <div className="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {axiosStationData.pillars.map((pillar, i) => {
                  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#a78bfa', '#34d399'];
                  const col = colors[i % colors.length];
                  return (
                    <div
                      key={pillar.code}
                      className="rounded-2xl border border-white/[0.08] bg-[#0c0d12] p-5 flex flex-col justify-between gap-3 hover:border-white/25 transition-colors"
                    >
                      <div className="space-y-2">
                        <span
                          className="inline-block w-2 h-2 rounded-full"
                          style={{ backgroundColor: col }}
                        />
                        <h3 className="font-display text-lg font-bold text-[#f4f3ef]">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">{pillar.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-semibold text-[#94a3b8]">
                  Live Axios Platforms on Vercel
                </span>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Axios Insight', url: verifiedLinks.axiosInsight },
                    { label: 'Axios Talent (B2B HR)', url: verifiedLinks.axiosTalent },
                    { label: 'Axios Talent Candidate', url: verifiedLinks.axiosTalentCandidate },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full text-xs font-medium text-[#f4f3ef] hover:text-emerald-300 px-4 py-2 border border-emerald-400/25 bg-emerald-400/[0.07] hover:border-emerald-400 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{item.label}</span>
                      <ArrowUpRight size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
