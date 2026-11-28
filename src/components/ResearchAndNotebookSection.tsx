import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, FileText, FlaskConical, Github, Microscope } from 'lucide-react';
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
      return '#00D6B4';
    case 'BUSINESS & STRATEGY':
      return '#FFC857';
    case 'AI ARCHITECTURE':
      return '#38BDF8';
    case 'UNIVERSITY EDUCATION':
      return '#3B82F6';
    case 'ACADEMIC RESEARCH':
      return '#8B5CF6';
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

  const selectQuestion = (idx: number) => {
    setActiveQuestionIdx(idx);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('open-question-reader')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  };

  return (
    <>
      {/* =====================================================================
          04 — ACADEMIC & APPLIED RESEARCH (GRAPHITE · VIOLET & SKY CYAN)
         ===================================================================== */}
      <section
        id="research-lab"
        className="bg-[#11131B] text-[#F5F5F7] border-b border-[#292D3A] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-28">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-8 sm:pb-10 border-b border-[#292D3A]">
            <div className="lg:col-span-8 flex items-baseline gap-4 sm:gap-7">
              <span className="font-display text-4xl sm:text-7xl font-bold grad-violet-blue-text leading-none">
                04
              </span>
              <div className="space-y-1.5 sm:space-y-2">
                <span className="block font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-widest text-[#8B5CF6]">
                  ACADEMIC &amp; APPLIED RESEARCH INDEX
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F5F5F7] leading-[1.03]">
                  {researchLabData.headline}
                </h2>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-2">
              <p className="font-mono-tech text-[10.5px] uppercase tracking-widest text-[#707586]">
                RESEARCH INTERESTS
              </p>
              <p className="text-xs sm:text-sm text-[#A1A5B3] leading-relaxed">
                {researchLabData.interests.join(' · ')}
              </p>
            </div>
          </div>

          {/* Core Research Direction & Scientific Pipeline Diagram */}
          <div className="my-10 sm:my-12 rounded-md border border-[#292D3A] bg-[#171A25] p-5 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#38BDF8]">
                  <Microscope size={14} />
                  <span>Core Research Direction</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F7] leading-snug">
                  {researchLabData.thesisTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#A1A5B3] leading-relaxed">
                  {researchLabData.thesisDescription}
                </p>
              </div>

              <div className="lg:col-span-7 rounded border border-[#292D3A] bg-[#090A0F] p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between font-mono-tech text-[10.5px] text-[#A1A5B3] border-b border-[#292D3A] pb-3">
                  <span>FIG. 02 · ADAPTIVE COMPUTER VISION PIPELINE</span>
                  <span className="text-[#8B5CF6] font-semibold">DOMAIN GENERALIZATION</span>
                </div>

                {/* Desktop / Tablet SVG Pipeline */}
                <svg
                  viewBox="0 0 680 80"
                  className="hidden sm:block w-full h-auto rounded border border-[#292D3A] bg-[#11131B] p-2"
                  aria-label="Adaptive Computer Vision Signal Flow Diagram"
                >
                  <defs>
                    <linearGradient id="cvFlowDark" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="24"
                    y1="40"
                    x2="656"
                    y2="40"
                    stroke="url(#cvFlowDark)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {[
                    { x: 24, code: 'IN', label: 'Raw Input Frame', stroke: '#707586', dot: '#A1A5B3' },
                    { x: 196, code: '01', label: 'Degradation ID', stroke: '#8B5CF6', dot: '#8B5CF6' },
                    { x: 372, code: '02', label: 'Adaptive Restore', stroke: '#3B82F6', dot: '#3B82F6' },
                    { x: 544, code: '03', label: 'Detection', stroke: '#38BDF8', dot: '#00D6B4' },
                  ].map((node) => (
                    <g key={node.label} transform={`translate(${node.x}, 16)`}>
                      <rect
                        width="116"
                        height="48"
                        rx="4"
                        fill="#171A25"
                        stroke={node.stroke}
                        strokeWidth="1.2"
                      />
                      <text
                        x="10"
                        y="18"
                        fill={node.dot}
                        fontSize="7.5"
                        fontWeight="600"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {node.code}
                      </text>
                      <circle cx="102" cy="15" r="2.5" fill={node.dot} />
                      <text
                        x="10"
                        y="35"
                        fill="#F5F5F7"
                        fontSize="8.5"
                        fontWeight="600"
                        fontFamily="Inter, sans-serif"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Mobile Crisp 2x2 Signal Flow Schematic (< sm) */}
                <div className="grid grid-cols-2 gap-2 sm:hidden">
                  {[
                    { code: 'IN', label: 'Raw Input Frame', col: '#A1A5B3' },
                    { code: '01', label: 'Degradation ID', col: '#8B5CF6' },
                    { code: '02', label: 'Adaptive Restore', col: '#3B82F6' },
                    { code: '03', label: 'Detection Output', col: '#00D6B4' },
                  ].map((node) => (
                    <div
                      key={node.label}
                      className="rounded border border-[#292D3A] bg-[#11131B] p-3 space-y-1"
                    >
                      <div className="flex items-center justify-between font-mono-tech text-[10px]">
                        <span style={{ color: node.col }} className="font-semibold">
                          {node.code}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.col }} />
                      </div>
                      <p className="font-display text-xs font-bold text-[#F5F5F7]">{node.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 rounded border border-[#292D3A] divide-y md:divide-y-0 md:divide-x divide-[#292D3A] bg-[#11131B]">
                  {researchLabData.adaptivePipeline.map((stage, i) => {
                    const col = i === 0 ? '#8B5CF6' : i === 1 ? '#3B82F6' : '#38BDF8';
                    return (
                      <div key={stage.step} className="p-4 space-y-1.5">
                        <span className="font-mono-tech text-[10.5px] font-semibold" style={{ color: col }}>
                          STAGE 0{i + 1}
                        </span>
                        <h4 className="font-display text-sm font-bold text-[#F5F5F7]">
                          {stage.title}
                        </h4>
                        <p className="text-xs text-[#A1A5B3] leading-relaxed">{stage.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Research Filter Rail */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#292D3A]">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F7]">
              Publications, Funded Grants &amp; Experimental Work
            </h3>
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter research items">
              {[
                { id: 'all', label: 'All Research (6)', color: '#8B5CF6' },
                { id: 'published', label: 'Published (4)', color: '#00D6B4' },
                { id: 'ongoing', label: 'Funded Grant (1)', color: '#38BDF8' },
                { id: 'experimental', label: 'Experimental (1)', color: '#FFC857' },
              ].map((tab) => {
                const active = researchFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setResearchFilter(tab.id as ResearchFilter)}
                    style={
                      active
                        ? {
                            backgroundColor: tab.color,
                            borderColor: tab.color,
                            color: '#090A0F',
                          }
                        : undefined
                    }
                    className={`rounded font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-wider px-3 sm:px-3.5 py-1.5 border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                      active
                        ? 'font-semibold'
                        : 'border-[#292D3A] bg-[#171A25] text-[#A1A5B3] hover:text-[#F5F5F7]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Publication Cards Grid */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPublications.map((item, idx) => {
              const badgeColor =
                item.category === 'published'
                  ? '#00D6B4'
                  : item.category === 'ongoing'
                    ? '#38BDF8'
                    : '#FFC857';
              return (
                <article
                  key={item.id}
                  className="rounded-md border border-[#292D3A] bg-[#171A25] p-5 sm:p-8 flex flex-col justify-between gap-6 hover:border-[#3B82F6]/60 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#292D3A] font-mono-tech text-[10.5px] sm:text-[11px]">
                      <span className="text-[#707586]">
                        0{idx + 1} · {item.code} · {item.year}
                      </span>
                      <span className="font-semibold uppercase" style={{ color: badgeColor }}>
                        ● {item.status}
                      </span>
                    </div>

                    <div>
                      <p className="font-mono-tech text-[11px] text-[#38BDF8] mb-1.5">
                        {item.venue}
                      </p>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5F5F7] leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="block font-mono-tech text-[10px] font-semibold uppercase tracking-widest text-[#707586] mb-1">
                          RESEARCH CONTRIBUTION
                        </span>
                        <p className="text-sm text-[#F5F5F7]/90 leading-relaxed">
                          {item.contribution}
                        </p>
                      </div>
                      <div>
                        <span className="block font-mono-tech text-[10px] font-semibold uppercase tracking-widest text-[#707586] mb-1">
                          METHODOLOGY
                        </span>
                        <p className="text-xs sm:text-sm text-[#A1A5B3] leading-relaxed">
                          {item.methodology}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#292D3A] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-x-2.5 gap-y-1 font-mono-tech text-[10.5px] text-[#707586]">
                      {item.keywords.map((kw) => (
                        <span key={kw}>· {kw}</span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {item.paperUrl && (
                        <a
                          href={item.paperUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded font-mono-tech text-[11px] uppercase tracking-wider font-semibold text-[#090A0F] bg-[#8B5CF6] hover:bg-[#38BDF8] px-3.5 py-2 transition-colors"
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
                          className="inline-flex items-center gap-1.5 rounded font-mono-tech text-[11px] uppercase tracking-wider font-semibold text-[#F5F5F7] bg-[#11131B] hover:border-[#38BDF8] border border-[#292D3A] px-3.5 py-2 transition-colors"
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
                          className="inline-flex items-center gap-1.5 rounded font-mono-tech text-[11px] uppercase tracking-wider font-semibold text-[#F5F5F7] bg-[#11131B] hover:border-[#38BDF8] border border-[#292D3A] px-3.5 py-2 transition-colors"
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

          {/* 10 Open-Source ML & Medical Imaging Repositories Ledger */}
          <div className="mt-10 rounded-md border border-[#292D3A] bg-[#171A25] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#292D3A]">
              <span className="font-mono-tech text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#F5F5F7]">
                OPEN-SOURCE ML, NLP &amp; MEDICAL IMAGING REPOSITORIES
              </span>
              <span className="font-mono-tech text-[11px] font-semibold text-[#38BDF8]">
                10 GITHUB REPOSITORIES
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-l border-[#292D3A] bg-[#11131B]">
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
                  className="flex items-center justify-between gap-2 px-3.5 py-3 border-r border-b border-[#292D3A] font-mono-tech text-[11px] text-[#A1A5B3] hover:bg-[#1D2130] hover:text-[#38BDF8] transition-colors min-w-0"
                >
                  <span className="truncate">{repo.label}</span>
                  <ArrowUpRight size={12} className="shrink-0 text-[#8B5CF6]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          05 — OPEN QUESTIONS (CREATIVE RESEARCH NOTEBOOK ON DEEP SPACE)
         ===================================================================== */}
      <section
        id="open-questions"
        className="bg-[#090A0F] text-[#F5F5F7] border-b border-[#292D3A] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-8 sm:pb-10 border-b border-[#292D3A]">
            <div className="lg:col-span-7 flex items-baseline gap-4 sm:gap-7">
              <span className="font-display text-4xl sm:text-7xl font-bold grad-violet-blue-text leading-none">
                05
              </span>
              <div className="space-y-1.5 sm:space-y-2">
                <span className="block font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-widest text-[#8B5CF6]">
                  RESEARCH NOTEBOOK · OPEN QUESTIONS
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F5F5F7] leading-[1.03]">
                  Problems Under Active Investigation.
                </h2>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#A1A5B3] leading-relaxed">
                An ongoing research notebook of failure modes, boundary conditions, and engineering
                hypotheses shaping my current systems.
              </p>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 rounded-md border border-[#292D3A] bg-[#11131B] divide-y lg:divide-y-0 lg:divide-x divide-[#292D3A] overflow-hidden">
            {/* Left Inquiry Index */}
            <div className="lg:col-span-5 divide-y divide-[#292D3A]">
              {openQuestionsData.map((q, idx) => {
                const isSelected = idx === activeQuestionIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => selectQuestion(idx)}
                    className={`w-full text-left p-5 sm:p-6 transition-colors flex flex-col gap-2 border-l-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8B5CF6] ${
                      isSelected
                        ? 'bg-[#171A25] border-l-[#8B5CF6]'
                        : 'border-l-transparent hover:bg-[#171A25]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono-tech text-[10.5px] gap-2">
                      <span className={isSelected ? 'text-[#8B5CF6] font-semibold' : 'text-[#707586]'}>
                        {q.code}
                      </span>
                      <span className="text-[#707586] truncate">{q.domain}</span>
                    </div>
                    <p
                      className={`font-display text-base sm:text-lg font-bold leading-snug ${
                        isSelected ? 'text-[#F5F5F7]' : 'text-[#A1A5B3]'
                      }`}
                    >
                      {q.question}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Creative Notebook Entry Reader */}
            <div
              id="open-question-reader"
              className="lg:col-span-7 p-5 sm:p-10 lg:p-12 flex flex-col justify-between gap-7 sm:gap-8 bg-[#171A25] scroll-mt-20"
            >
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#292D3A] font-mono-tech text-[10.5px] sm:text-[11px]">
                  <span className="text-[#38BDF8] font-semibold flex items-center gap-2">
                    <FlaskConical size={14} className="shrink-0" />
                    <span>
                      {activeQuestion.code} · {activeQuestion.domain}
                    </span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#00D6B4] uppercase font-semibold">● ACTIVE INQUIRY</span>
                    <div className="flex lg:hidden items-center gap-1">
                      <button
                        type="button"
                        aria-label="Previous question"
                        onClick={() =>
                          setActiveQuestionIdx(
                            (prev) => (prev - 1 + openQuestionsData.length) % openQuestionsData.length,
                          )
                        }
                        className="p-1 rounded border border-[#292D3A] bg-[#11131B] text-[#A1A5B3] hover:text-white"
                      >
                        <ChevronLeft size={12} />
                      </button>
                      <button
                        type="button"
                        aria-label="Next question"
                        onClick={() =>
                          setActiveQuestionIdx((prev) => (prev + 1) % openQuestionsData.length)
                        }
                        className="p-1 rounded border border-[#292D3A] bg-[#11131B] text-[#A1A5B3] hover:text-white"
                      >
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#F5F5F7] leading-[1.12]">
                  {activeQuestion.question}
                </h3>

                <div className="space-y-4">
                  <div className="rounded border border-[#292D3A] bg-[#11131B] p-4 sm:p-5 space-y-1.5">
                    <span className="font-mono-tech text-[10.5px] font-semibold uppercase tracking-widest text-[#38BDF8]">
                      CONTEXT
                    </span>
                    <p className="text-sm text-[#A1A5B3] leading-relaxed">
                      {activeQuestion.context}
                    </p>
                  </div>

                  <div className="rounded border border-[#292D3A] border-l-2 border-l-[#FF5B5B] bg-[#11131B] p-4 sm:p-5 space-y-1.5">
                    <span className="font-mono-tech text-[10.5px] font-semibold uppercase tracking-widest text-[#FF5B5B]">
                      OBSERVED FAILURE MODE
                    </span>
                    <p className="text-sm text-[#F5F5F7] leading-relaxed">
                      {activeQuestion.failureMode}
                    </p>
                  </div>

                  <div className="rounded border border-[#292D3A] border-l-2 border-l-[#8B5CF6] bg-[#1D2130] p-4 sm:p-5 space-y-1.5">
                    <span className="font-mono-tech text-[10.5px] font-semibold uppercase tracking-widest text-[#8B5CF6]">
                      INVESTIGATIVE DIRECTION &amp; ARCHITECTURE
                    </span>
                    <p className="text-sm sm:text-base text-[#F5F5F7] leading-relaxed">
                      {activeQuestion.investigativeDirection}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#292D3A] flex flex-wrap items-center justify-between gap-3 font-mono-tech text-xs">
                <span className="text-[#707586] uppercase">APPLIED IN</span>
                <span className="font-semibold text-[#38BDF8]">{activeQuestion.relatedSystem}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          06 — EVOLUTION (GRAPHITE EDITORIAL TIMELINE) & 07 — AXIOS STATION (DEEP SPACE)
         ===================================================================== */}
      <section
        id="evolution"
        className="bg-[#11131B] text-[#F5F5F7] border-b border-[#292D3A] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-8 sm:pb-10 border-b border-[#292D3A]">
            <div className="lg:col-span-8 flex items-baseline gap-4 sm:gap-7">
              <span className="font-display text-4xl sm:text-7xl font-bold text-[#FFC857] leading-none">
                06
              </span>
              <div className="space-y-1.5 sm:space-y-2">
                <span className="block font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-widest text-[#FFC857]">
                  EXPERIENCE &amp; EDUCATION
                </span>
                <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F7] leading-[0.98]">
                  Career &amp; Academic Timeline.
                </h2>
              </div>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href={verifiedLinks.cvPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded font-mono-tech text-[11px] uppercase tracking-wider font-semibold px-5 py-3 border border-[#292D3A] bg-[#171A25] text-[#F5F5F7] hover:border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-colors"
              >
                <span>Download Full CV (PDF)</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div className="divide-y divide-[#292D3A] border-b border-[#292D3A]">
            {evolutionData.map((entry, idx) => {
              const accent = getEvolutionAccent(entry.type);
              return (
                <div
                  key={entry.id}
                  className="py-7 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start"
                >
                  <div className="lg:col-span-3 space-y-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-xs shrink-0"
                        style={{ backgroundColor: accent }}
                      />
                      <span className="font-display text-2xl font-bold text-[#707586]">
                        0{idx + 1}
                      </span>
                    </div>
                    <div className="font-mono-tech text-xs font-semibold" style={{ color: accent }}>
                      {entry.period}
                    </div>
                    <div className="font-mono-tech text-[10.5px] uppercase tracking-wider text-[#707586]">
                      {entry.type}
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-1.5 border-l-0 lg:border-l border-[#292D3A] lg:pl-6">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5F5F7]">
                      {entry.role}
                    </h3>
                    <div className="text-xs text-[#A1A5B3] flex flex-wrap items-center gap-2 font-medium">
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
                        <span className="text-[#F5F5F7] font-semibold">{entry.organization}</span>
                      )}
                      <span className="text-[#707586]">/</span>
                      <span>{entry.location}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <p className="text-sm sm:text-base text-[#F5F5F7] leading-relaxed">
                      {entry.summary}
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#A1A5B3]">
                      {entry.details.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: accent }}
                          />
                          <span className="leading-relaxed">{bullet}</span>
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
          07 — AXIOS STATION (EXPRESSIVE BUSINESS FEATURE ON DEEP SPACE)
         ===================================================================== */}
      <section
        id="axios-station"
        className="bg-[#090A0F] text-[#F5F5F7] border-b border-[#292D3A] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-28">
          <div className="rounded-md border border-[#292D3A] bg-[#171A25] overflow-hidden">
            <div
              className="h-0.5 w-full"
              style={{ background: 'linear-gradient(90deg, #00D6B4 0%, #38BDF8 65%, #3B82F6 100%)' }}
            />

            <div className="p-5 sm:p-10 lg:p-14 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-8 sm:pb-10 border-b border-[#292D3A] items-end">
                <div className="lg:col-span-8 flex items-baseline gap-4 sm:gap-7">
                  <span className="font-display text-4xl sm:text-7xl font-bold grad-mint-cyan-text leading-none">
                    07
                  </span>
                  <div className="space-y-2">
                    <div className="font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-widest text-[#00D6B4] font-semibold">
                      AXIOS STATION · {axiosStationData.tenure}
                    </div>
                    <p className="font-mono-tech text-xs text-[#38BDF8] uppercase tracking-wider">
                      {axiosStationData.roleTitle}
                    </p>
                    <h2 className="font-display text-2xl sm:text-5xl font-bold text-[#F5F5F7] leading-[1.03]">
                      {axiosStationData.headline}
                    </h2>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-wrap lg:justify-end">
                  <a
                    href={axiosStationData.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded font-mono-tech text-[11px] uppercase tracking-wider font-semibold px-6 py-3.5 bg-[#00D6B4] text-[#090A0F] hover:bg-[#38BDF8] transition-colors"
                  >
                    <span>Visit axiosstation.com</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              <div className="pb-6 sm:pb-8 border-b border-[#292D3A]">
                <p className="text-sm sm:text-lg text-[#A1A5B3] leading-relaxed max-w-4xl">
                  {axiosStationData.overview}
                </p>
              </div>

              {/* 5 Business Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 rounded border border-[#292D3A] divide-y sm:divide-y-0 sm:divide-x divide-[#292D3A] bg-[#11131B]">
                {axiosStationData.pillars.map((pillar, i) => {
                  const colors = ['#00D6B4', '#38BDF8', '#3B82F6', '#FFC857', '#8B5CF6'];
                  const col = colors[i % colors.length];
                  return (
                    <div key={pillar.code} className="p-5 flex flex-col justify-between gap-3 border-b sm:border-b-0 border-[#292D3A]">
                      <div className="space-y-2">
                        <span
                          className="font-mono-tech text-[10.5px] font-semibold"
                          style={{ color: col }}
                        >
                          {pillar.code}
                        </span>
                        <h3 className="font-display text-lg font-bold text-[#F5F5F7]">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-[#A1A5B3] leading-relaxed">{pillar.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Ecosystem Links */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[#707586]">
                  LIVE AXIOS PLATFORMS ON VERCEL
                </span>
                <div className="flex flex-wrap gap-2">
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
                      className="inline-flex items-center gap-2 rounded font-mono-tech text-[11px] text-[#F5F5F7] hover:border-[#00D6B4] px-3.5 py-2 border border-[#292D3A] bg-[#11131B] transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D6B4]" />
                      <span>{item.label}</span>
                      <ArrowUpRight size={11} className="text-[#00D6B4]" />
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
