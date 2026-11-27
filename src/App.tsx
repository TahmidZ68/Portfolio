import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Compass,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Radio,
  X,
} from 'lucide-react';
import {
  currentVectorData,
  heroData,
  intelligenceProfileData,
  navigationSections,
  signalData,
  technologyMatrixData,
  verifiedLinks,
} from '@/content';
import { DotMatrixGlobe } from '@/components/DotMatrixGlobe';
import { SystemsBlueprintSection } from '@/components/SystemsBlueprintSection';
import { ResearchAndNotebookSection } from '@/components/ResearchAndNotebookSection';

function LiveDhakaClock() {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Dhaka',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(new Date()),
        );
      } catch {
        setTime('UTC+06:00');
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{time} UTC+6 · Dhaka</span>;
}

const DOMAIN_COLORS = ['#10b981', '#a78bfa', '#f59e0b', '#38bdf8', '#a78bfa', '#10b981'];
const MATRIX_COLORS = ['#38bdf8', '#a78bfa', '#10b981', '#f59e0b'];
const VECTOR_COLORS = ['#f59e0b', '#f59e0b', '#10b981', '#38bdf8'];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSignalId, setActiveSignalId] = useState(signalData[0].id);
  const [selectedSystemFromGlobe, setSelectedSystemFromGlobe] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 240;
      for (let i = navigationSections.length - 1; i >= 0; i--) {
        const sec = navigationSections[i];
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(verifiedLinks.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      window.location.href = `mailto:${verifiedLinks.email}`;
    }
  };

  const activeSignal = signalData.find((s) => s.id === activeSignalId) || signalData[0];

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f2f0ea] relative selection:bg-[#38bdf8] selection:text-[#07090e]">
      {/* Right-Edge Precision Section Navigation Rail (Desktop) */}
      <aside
        aria-label="Section index rail"
        className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-2.5"
      >
        {navigationSections.map((sec) => {
          const isCurrent = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              aria-label={`${sec.num} ${sec.label}`}
              className="group flex items-center gap-2.5 py-0.5"
            >
              <span
                className={`font-mono-tech text-[9px] tracking-widest transition-opacity ${
                  isCurrent
                    ? 'opacity-100 text-[#38bdf8]'
                    : 'opacity-0 group-hover:opacity-100 text-[#94a3b8]'
                }`}
              >
                {sec.num} // {sec.label}
              </span>
              <span
                className={`block h-[1px] transition-all duration-150 ${
                  isCurrent
                    ? 'w-6 bg-[#38bdf8]'
                    : 'w-2.5 bg-white/20 group-hover:w-4 group-hover:bg-white/60'
                }`}
              />
            </a>
          );
        })}
      </aside>

      {/* Fullscreen Navigation Index Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-[#07090e]/98 backdrop-blur-md flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-5">
              <div className="flex items-center gap-3 font-mono-tech text-xs tracking-widest text-[#f2f0ea]">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#10b981]" />
                <span>{heroData.brandName}</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[#94a3b8] hover:text-[#f2f0ea] px-4 py-2 border border-white/15"
              >
                <span>Close</span>
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-auto py-8 max-w-[1500px] w-full mx-auto">
              <nav className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {navigationSections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-2.5 border-b border-white/[0.07] hover:border-[#38bdf8] transition-colors"
                  >
                    <span className="font-mono-tech text-xs text-[#38bdf8]">{item.num}</span>
                    <span className="font-display text-xl sm:text-2xl font-bold text-[#f2f0ea] group-hover:text-[#38bdf8] transition-colors">
                      {item.label}
                    </span>
                  </a>
                ))}
              </nav>

              <div className="lg:col-span-5 space-y-6 border-t lg:border-t-0 lg:border-l border-white/[0.1] pt-6 lg:pt-0 lg:pl-10">
                <div>
                  <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#10b981] mb-3">
                    LIVE DEPLOYMENTS (VERCEL)
                  </p>
                  <div className="space-y-2 font-mono-tech text-xs">
                    {[
                      { label: 'Axios Insight (AI Data & BI)', url: verifiedLinks.axiosInsight },
                      { label: 'Axios Talent (B2B Recruitment & HR)', url: verifiedLinks.axiosTalent },
                      { label: 'Axios Talent Candidate', url: verifiedLinks.axiosTalentCandidate },
                      { label: 'Vellum Research (14-Stage AI)', url: verifiedLinks.vellumResearchLive },
                    ].map((app) => (
                      <a
                        key={app.label}
                        href={app.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between py-2 px-3 border border-emerald-400/20 bg-emerald-400/[0.04] text-[#f2f0ea] hover:border-emerald-400"
                      >
                        <span>{app.label}</span>
                        <ArrowUpRight size={13} className="text-emerald-400" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#94a3b8] mb-3">
                    OPEN-SOURCE REPOSITORIES &amp; PROFILES
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-mono-tech text-xs">
                    <a
                      href={verifiedLinks.degradeLabRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#38bdf8] hover:underline py-1"
                    >
                      DegradeLab ↗
                    </a>
                    <a
                      href={verifiedLinks.diagoraRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#f59e0b] hover:underline py-1"
                    >
                      Diagora ↗
                    </a>
                    <a
                      href={verifiedLinks.datasetMedicRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#38bdf8] hover:underline py-1"
                    >
                      DatasetMedic ↗
                    </a>
                    <a
                      href={verifiedLinks.apiDetectiveRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#f59e0b] hover:underline py-1"
                    >
                      API Detective ↗
                    </a>
                    <a
                      href={verifiedLinks.flowSentryRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#f59e0b] hover:underline py-1"
                    >
                      FlowSentry ↗
                    </a>
                    <a
                      href={verifiedLinks.vellumResearchRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#10b981] hover:underline py-1"
                    >
                      Vellum Research ↗
                    </a>
                    <a
                      href={verifiedLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#94a3b8] hover:text-[#f2f0ea] py-1"
                    >
                      GitHub Profile ↗
                    </a>
                    <a
                      href={verifiedLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#94a3b8] hover:text-[#f2f0ea] py-1"
                    >
                      LinkedIn ↗
                    </a>
                    <a
                      href={verifiedLinks.kaggle}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#a78bfa] hover:underline py-1"
                    >
                      Kaggle ↗
                    </a>
                    <a
                      href={verifiedLinks.cvPdf}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#94a3b8] hover:text-[#f2f0ea] py-1"
                    >
                      Curriculum Vitae ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.1] font-mono-tech text-xs text-[#94a3b8]">
              <span>{verifiedLinks.email}</span>
              <LiveDhakaClock />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY PORTFOLIO HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#07090e]/92 backdrop-blur-md">
        <div className="spectrum-divider" />
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 h-16 flex items-center justify-between gap-4">
          <a
            href="#hero"
            className="flex items-center gap-3 font-mono-tech text-xs sm:text-sm font-semibold tracking-wider text-[#f2f0ea] hover:text-[#38bdf8] transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#38bdf8] via-[#a78bfa] to-[#10b981]" />
            <span>MD TAHMID ZOAYED</span>
          </a>

          <nav
            aria-label="Primary sections"
            className="hidden lg:flex items-center gap-6 font-mono-tech text-[11px] tracking-wider"
          >
            {[
              { num: '02', label: 'PROFILE', href: '#profile', id: 'profile', color: '#38bdf8' },
              { num: '03', label: 'SYSTEMS', href: '#systems', id: 'systems', color: '#10b981' },
              { num: '04', label: 'RESEARCH', href: '#research-lab', id: 'research-lab', color: '#a78bfa' },
              { num: '05', label: 'QUESTIONS', href: '#open-questions', id: 'open-questions', color: '#a78bfa' },
              { num: '06', label: 'TIMELINE', href: '#evolution', id: 'evolution', color: '#f59e0b' },
              { num: '08', label: 'STACK', href: '#tech-matrix', id: 'tech-matrix', color: '#38bdf8' },
              { num: '11', label: 'CONTACT', href: '#network', id: 'network', color: '#10b981' },
            ].map((nav) => {
              const active = activeSection === nav.id;
              return (
                <a
                  key={nav.id}
                  href={nav.href}
                  style={active ? { color: nav.color } : undefined}
                  className={`transition-colors ${
                    active ? 'font-semibold' : 'text-[#94a3b8] hover:text-[#f2f0ea]'
                  }`}
                >
                  <span className="text-[#64748b] mr-1">{nav.num}.</span>
                  {nav.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 font-mono-tech text-[10px] text-[#94a3b8] px-3 py-1.5 border border-white/[0.08] bg-[#0b101b]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <LiveDhakaClock />
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex items-center gap-2 font-mono-tech text-xs text-[#f2f0ea] hover:text-[#38bdf8] px-3.5 py-1.5 border border-white/[0.15] hover:border-[#38bdf8] bg-[#0b101b] transition-colors"
            >
              <span>MENU</span>
              <Menu size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          01 — HERO (MULTI-SPECTRUM ATMOSPHERIC GLOW + INTERACTIVE GLOBE)
         ===================================================================== */}
      <section
        id="hero"
        className="border-b border-white/[0.08] bg-[#07090e] lab-grid-bg ambient-hero-glow relative overflow-hidden"
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 pt-10 pb-20 sm:pt-14 sm:pb-28">
          {/* Top Location & Availability Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-10 border-b border-white/[0.08] font-mono-tech text-[11px] text-[#94a3b8]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[#38bdf8]">01 // OVERVIEW</span>
              <span className="text-white/20">|</span>
              <span>{heroData.location}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{heroData.availability}</span>
            </div>
          </div>

          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
            {/* Left 7 Columns: Editorial Typography & Core Identity */}
            <div className="lg:col-span-7 space-y-7">
              <div className="space-y-3">
                <div className="inline-flex flex-wrap items-center gap-2.5 font-mono-tech text-xs uppercase tracking-[0.16em] text-[#f2f0ea] px-3.5 py-1.5 border border-[#38bdf8]/40 bg-[#38bdf8]/[0.08]">
                  <span className="text-[#38bdf8] font-semibold">{heroData.name}</span>
                  <span className="text-white/30">//</span>
                  <span className="text-[#cbd5e1]">{heroData.role}</span>
                </div>

                <h1 className="font-display text-5xl sm:text-7xl xl:text-[88px] font-bold tracking-tight text-[#f2f0ea] leading-[0.93] uppercase pt-2">
                  I BUILD
                  <br />
                  <span className="bg-gradient-to-r from-[#38bdf8] via-[#a78bfa] to-[#10b981] bg-clip-text text-transparent">
                    INTELLIGENT
                  </span>
                  <br />
                  SYSTEMS.
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-[#e2e8f0] leading-relaxed max-w-2xl font-normal border-l-2 border-[#38bdf8] pl-5">
                {heroData.supportingDescription}
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="#systems"
                  className="inline-flex items-center gap-3 font-mono-tech text-xs sm:text-sm font-semibold uppercase tracking-wider px-7 py-4 bg-gradient-to-r from-[#38bdf8] to-[#10b981] text-[#07090e] hover:opacity-90 transition-opacity"
                >
                  <span>Explore Systems</span>
                  <ArrowDownRight size={16} />
                </a>

                <a
                  href="#research-lab"
                  className="inline-flex items-center gap-3 font-mono-tech text-xs sm:text-sm uppercase tracking-wider px-7 py-4 border border-[#a78bfa]/50 bg-[#a78bfa]/[0.08] text-[#f2f0ea] hover:bg-[#a78bfa] hover:text-[#07090e] font-semibold transition-colors"
                >
                  <span>Research &amp; Papers</span>
                  <ArrowDownRight size={16} />
                </a>

                <a
                  href={verifiedLinks.cvPdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider px-5 py-4 border border-white/15 bg-[#0b101b] text-[#f2f0ea] hover:border-amber-400 hover:text-amber-300 transition-colors"
                >
                  <FileText size={14} />
                  <span>Download CV (PDF)</span>
                </a>
              </div>

              {/* Domain-Colored Live Platforms & Open-Source Bar */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-emerald-400">
                    LIVE AI PLATFORMS (VERCEL)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Axios Insight', url: verifiedLinks.axiosInsight },
                      { label: 'Axios Talent', url: verifiedLinks.axiosTalent },
                      { label: 'Talent Candidate', url: verifiedLinks.axiosTalentCandidate },
                      { label: 'Vellum Research', url: verifiedLinks.vellumResearchLive },
                    ].map((app) => (
                      <a
                        key={app.label}
                        href={app.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] px-2.5 py-1 border border-emerald-400/30 bg-emerald-400/[0.07] text-[#f2f0ea] hover:border-emerald-400 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{app.label}</span>
                        <ArrowUpRight size={11} className="text-emerald-400" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8]">
                    CV &amp; DEVELOPER DIAGNOSTICS (GITHUB)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={verifiedLinks.degradeLabRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono-tech text-[11px] px-2.5 py-1 border border-[#38bdf8]/35 bg-[#38bdf8]/[0.07] text-[#f2f0ea] hover:border-[#38bdf8] transition-colors"
                    >
                      <span>DegradeLab</span>
                      <ArrowUpRight size={11} className="text-[#38bdf8]" />
                    </a>
                    <a
                      href={verifiedLinks.datasetMedicRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono-tech text-[11px] px-2.5 py-1 border border-[#38bdf8]/35 bg-[#38bdf8]/[0.07] text-[#f2f0ea] hover:border-[#38bdf8] transition-colors"
                    >
                      <span>DatasetMedic</span>
                      <ArrowUpRight size={11} className="text-[#38bdf8]" />
                    </a>
                    <a
                      href={verifiedLinks.diagoraRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono-tech text-[11px] px-2.5 py-1 border border-amber-400/35 bg-amber-400/[0.07] text-[#f2f0ea] hover:border-amber-400 transition-colors"
                    >
                      <span>Diagora</span>
                      <ArrowUpRight size={11} className="text-amber-400" />
                    </a>
                    <a
                      href={verifiedLinks.apiDetectiveRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono-tech text-[11px] px-2.5 py-1 border border-amber-400/35 bg-amber-400/[0.07] text-[#f2f0ea] hover:border-amber-400 transition-colors"
                    >
                      <span>API Detective</span>
                      <ArrowUpRight size={11} className="text-amber-400" />
                    </a>
                    <a
                      href={verifiedLinks.flowSentryRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono-tech text-[11px] px-2.5 py-1 border border-amber-400/35 bg-amber-400/[0.07] text-[#f2f0ea] hover:border-amber-400 transition-colors"
                    >
                      <span>FlowSentry</span>
                      <ArrowUpRight size={11} className="text-amber-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interactive 15-Node Work & Research Globe */}
            <div className="lg:col-span-5">
              <DotMatrixGlobe
                onInspectSystem={(sysId) => {
                  setSelectedSystemFromGlobe(sysId);
                }}
              />
            </div>
          </div>

          {/* Bottom 4-Cell Color-Accented Summary Strip */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/[0.1] bg-[#0b101b]/90 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
            <div className="p-5 space-y-1 border-t-2 border-t-[#10b981]">
              <span className="font-mono-tech text-[10px] text-[#10b981]">01 // CURRENT ROLE</span>
              <p className="font-display text-2xl font-bold text-[#f2f0ea]">Axios Station</p>
              <p className="font-mono-tech text-xs text-[#94a3b8]">
                CBO &amp; AI Engineer · June 2025–Present
              </p>
            </div>
            <div className="p-5 space-y-1 border-t-2 border-t-[#38bdf8]">
              <span className="font-mono-tech text-[10px] text-[#38bdf8]">02 // SYSTEMS BUILT</span>
              <p className="font-display text-2xl font-bold text-[#f2f0ea]">11 Engineered Systems</p>
              <p className="font-mono-tech text-xs text-[#94a3b8]">
                4 Live Vercel Platforms · 15+ Open-Source Repos
              </p>
            </div>
            <div className="p-5 space-y-1 border-t-2 border-t-[#a78bfa]">
              <span className="font-mono-tech text-[10px] text-[#a78bfa]">03 // RESEARCH</span>
              <p className="font-display text-2xl font-bold text-[#f2f0ea]">05 Research Studies</p>
              <p className="font-mono-tech text-xs text-[#94a3b8]">
                4 Published Papers + EWU/BAU Funded Grant
              </p>
            </div>
            <div className="p-5 space-y-1 border-t-2 border-t-[#f59e0b]">
              <span className="font-mono-tech text-[10px] text-[#f59e0b]">
                04 // ACADEMIC FOUNDATION
              </span>
              <p className="font-display text-2xl font-bold text-[#f2f0ea]">B.Sc. in CSE</p>
              <p className="font-mono-tech text-xs text-[#94a3b8]">
                East West University · Data Science &amp; Intelligent Systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02 — PROFILE (MIDNIGHT SLATE + DOMAIN-COLORED CAPABILITY CARDS)
         ===================================================================== */}
      <section
        id="profile"
        className="border-b border-white/[0.08] bg-[#0b101b] lab-subgrid-bg scroll-mt-16"
      >
        <div className="spectrum-divider" />
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
                <span>{intelligenceProfileData.headerCode}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#f2f0ea] leading-[1.02] uppercase">
                {intelligenceProfileData.headline}
              </h2>

              {/* Portrait Frame */}
              <div className="border border-white/[0.12] border-t-2 border-t-[#38bdf8] bg-[#07090e] p-3 max-w-xs crosshair-corner">
                <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#94a3b8] pb-2 mb-2 border-b border-white/[0.07]">
                  <span>MD TAHMID ZOAYED</span>
                  <span className="text-[#10b981]">AI / ML ENGINEER</span>
                </div>
                <img
                  src="/images/1761230135831.png"
                  alt="Md Tahmid Zoayed"
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover object-top contrast-[1.03]"
                />
                <div className="pt-2 mt-2 border-t border-white/[0.07] flex items-center justify-between font-mono-tech text-[10px] text-[#94a3b8]">
                  <span>CBO @ AXIOS STATION</span>
                  <span className="text-[#38bdf8]">DHAKA, BD</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="border border-white/[0.1] border-l-2 border-l-[#38bdf8] bg-[#07090e] p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8] border-b border-white/[0.07] pb-3">
                  <span>ENGINEERING PHILOSOPHY</span>
                  <span className="text-[#a78bfa]">RESEARCH → ARCHITECTURE → PRODUCTION</span>
                </div>
                {intelligenceProfileData.narrative.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base sm:text-lg text-[#e2e8f0] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* 6-Domain Color-Coded Capability Matrix */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#94a3b8]">
                  <span>CORE CAPABILITY DOMAINS // 06 AREAS</span>
                  <span className="text-[#10b981]">APPLIED &amp; RESEARCH</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {intelligenceProfileData.domains.map((dom, idx) => {
                    const col = DOMAIN_COLORS[idx % DOMAIN_COLORS.length];
                    return (
                      <div
                        key={dom.index}
                        style={{ borderTopWidth: '2px', borderTopColor: col }}
                        className="border border-white/[0.09] bg-[#07090e] p-5 flex flex-col justify-between gap-4 hover:border-white/25 transition-colors"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between font-mono-tech text-[11px]">
                            <span style={{ color: col }} className="font-semibold">
                              {dom.index}
                            </span>
                            <span className="text-[#64748b] text-[10px]">{dom.focus}</span>
                          </div>
                          <h3 className="font-display text-xl font-bold text-[#f2f0ea]">
                            {dom.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                            {dom.summary}
                          </p>
                        </div>
                        <div
                          className="pt-3 border-t border-white/[0.06] font-mono-tech text-[10px]"
                          style={{ color: col }}
                        >
                          {dom.metrics}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          03 — SYSTEMS (SPOTLIGHT BENTO + INTERACTIVE MASTER-DETAIL EXPLORER)
         ===================================================================== */}
      <SystemsBlueprintSection externalSelectedSystemId={selectedSystemFromGlobe} />

      {/* =====================================================================
          04 — RESEARCH, 05 — OPEN QUESTIONS, 06 — EVOLUTION, 07 — AXIOS STATION
         ===================================================================== */}
      <ResearchAndNotebookSection />

      {/* =====================================================================
          08 — TECHNOLOGY MATRIX (WITH PROFICIENCY METER INDICATORS)
         ===================================================================== */}
      <section
        id="tech-matrix"
        className="border-b border-white/[0.08] bg-[#0b101b] lab-subgrid-bg scroll-mt-16"
      >
        <div className="spectrum-divider" />
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-white/[0.08]">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em]">
                <span className="text-[#38bdf8]">08 // TECHNOLOGY MATRIX</span>
                <span className="text-white/20">—</span>
                <span className="text-[#94a3b8]">PRODUCTION &amp; RESEARCH STACK</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#f2f0ea] leading-[0.96] uppercase">
                Technical Specification Matrix.
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-4 font-mono-tech text-xs">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#10b981]/40 bg-[#10b981]/10 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" /> Core Proficiency
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-[#07090e] text-[#94a3b8]">
                <span className="w-2 h-2 rounded-full bg-[#64748b]" /> Applied / Working
              </span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {technologyMatrixData.map((group, gIdx) => {
              const col = MATRIX_COLORS[gIdx % MATRIX_COLORS.length];
              return (
                <div
                  key={group.code}
                  style={{ borderTopWidth: '2px', borderTopColor: col }}
                  className="border border-white/[0.1] bg-[#07090e] flex flex-col justify-between"
                >
                  <div className="p-6 border-b border-white/[0.08] bg-[#0d121f] space-y-1.5">
                    <div className="flex items-center justify-between font-mono-tech text-xs">
                      <span style={{ color: col }} className="font-semibold">
                        {group.code}
                      </span>
                      <span className="text-[#94a3b8]">{group.items.length} TECHNOLOGIES</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#f2f0ea]">
                      {group.category}
                    </h3>
                    <p className="text-xs text-[#94a3b8]">{group.description}</p>
                  </div>

                  <div className="divide-y divide-white/[0.06]">
                    {group.items.map((tech) => {
                      const isCore = tech.tier === 'Core Proficiency';
                      return (
                        <div
                          key={tech.name}
                          className="px-6 py-4 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="sm:col-span-5 flex items-center gap-2.5">
                            <span
                              style={{ backgroundColor: isCore ? col : '#64748b' }}
                              className="w-2 h-2 rounded-full shrink-0"
                            />
                            <span className="font-display text-sm font-semibold text-[#f2f0ea]">
                              {tech.name}
                            </span>
                          </div>
                          <div className="sm:col-span-3 space-y-1">
                            <div className="h-1.5 w-full bg-white/[0.07] overflow-hidden">
                              <div
                                style={{
                                  width: isCore ? '92%' : '62%',
                                  backgroundColor: isCore ? col : '#64748b',
                                }}
                                className="h-full"
                              />
                            </div>
                            <span className="block font-mono-tech text-[9.5px] text-[#94a3b8]">
                              {tech.tier}
                            </span>
                          </div>
                          <div className="sm:col-span-4 text-xs text-[#94a3b8]">{tech.context}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          09 — CURRENT VECTOR (MULTI-SPECTRUM TRAJECTORIES)
         ===================================================================== */}
      <section
        id="current-vector"
        className="border-b border-white/[0.08] bg-[#07090e] lab-grid-bg scroll-mt-16"
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="border border-white/[0.12] border-t-2 border-t-[#38bdf8] bg-[#0b101b] p-6 sm:p-10 lg:p-14 crosshair-corner">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08] font-mono-tech text-xs">
              <span className="text-[#38bdf8] flex items-center gap-2">
                <Compass size={14} />
                {currentVectorData.headerCode}
              </span>
              <span className="text-emerald-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE FOCUS · 2025–2026
              </span>
            </div>

            <div className="space-y-4 mb-12">
              <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#94a3b8]">
                CURRENT ENGINEERING DIRECTION
              </p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-[0.96] uppercase bg-gradient-to-r from-[#f2f0ea] via-[#38bdf8] to-[#10b981] bg-clip-text text-transparent">
                {currentVectorData.vectorBanner}
              </h2>
              <p className="text-base sm:text-lg text-[#94a3b8] max-w-3xl leading-relaxed">
                {currentVectorData.statement}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {currentVectorData.trajectories.map((vec, idx) => {
                const col = VECTOR_COLORS[idx % VECTOR_COLORS.length];
                return (
                  <div
                    key={vec.code}
                    style={{ borderTopWidth: '2px', borderTopColor: col }}
                    className="border border-white/[0.09] bg-[#07090e] p-6 flex flex-col justify-between gap-6 hover:border-white/25 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono-tech text-[10px]">
                        <span style={{ color: col }} className="font-semibold">
                          {vec.code}
                        </span>
                        <span className="text-[#94a3b8] px-2 py-0.5 border border-white/10">
                          {vec.status}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#f2f0ea] leading-snug">
                        {vec.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                        {vec.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.07]">
                      {vec.focusTags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            color: col,
                            borderColor: `${col}45`,
                            backgroundColor: `${col}12`,
                          }}
                          className="font-mono-tech text-[10px] px-2 py-0.5 border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          10 — SIGNAL (ARTICLES, RESEARCH NOTES & PUBLICATIONS)
         ===================================================================== */}
      <section
        id="signal"
        className="border-b border-white/[0.08] bg-[#0a0b15] lab-subgrid-bg scroll-mt-16"
      >
        <div className="spectrum-divider" />
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-white/[0.08]">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em]">
                <span className="text-[#f59e0b] flex items-center gap-2">
                  <Radio size={14} /> 10 // SIGNAL
                </span>
                <span className="text-white/20">—</span>
                <span className="text-[#94a3b8]">ENGINEERING NOTES, ARCHITECTURE &amp; WRITING</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#f2f0ea] leading-[0.96] uppercase">
                Technical Notes &amp; Papers.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                Selected engineering insights from building DegradeLab, Diagora, FlowSentry,
                DatasetMedic, Vellum Research, and API Detective alongside published research briefs.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 border border-white/[0.1] bg-[#07090e]">
            {/* Left Feed List */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/[0.08] divide-y divide-white/[0.07]">
              {signalData.map((entry) => {
                const isSelected = entry.id === activeSignal.id;
                const entryColor =
                  entry.type === 'RESEARCH PAPER'
                    ? '#a78bfa'
                    : entry.type === 'ENGINEERING NOTE'
                      ? '#38bdf8'
                      : '#f59e0b';
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setActiveSignalId(entry.id)}
                    style={
                      isSelected
                        ? {
                            borderLeftWidth: '3px',
                            borderLeftColor: entryColor,
                            backgroundColor: `${entryColor}14`,
                          }
                        : undefined
                    }
                    className="w-full text-left p-5 transition-colors flex flex-col gap-1.5 hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center justify-between font-mono-tech text-[10px]">
                      <span style={{ color: entryColor }} className="font-semibold">
                        {entry.code} · {entry.type}
                      </span>
                      <span className="text-[#64748b]">{entry.date}</span>
                    </div>
                    <h3
                      className={`font-display text-base font-bold leading-snug ${
                        isSelected ? 'text-[#f2f0ea]' : 'text-[#94a3b8]'
                      }`}
                    >
                      {entry.title}
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* Right Note Reader */}
            {(() => {
              const activeCol =
                activeSignal.type === 'RESEARCH PAPER'
                  ? '#a78bfa'
                  : activeSignal.type === 'ENGINEERING NOTE'
                    ? '#38bdf8'
                    : '#f59e0b';
              return (
                <div
                  style={{ borderTopWidth: '2px', borderTopColor: activeCol }}
                  className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 bg-[#0b101b]"
                >
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/[0.08] font-mono-tech text-xs">
                      <span style={{ color: activeCol }} className="font-semibold">
                        {activeSignal.code} · {activeSignal.type}
                      </span>
                      <span className="text-[#94a3b8]">{activeSignal.date}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#f2f0ea] leading-tight">
                      {activeSignal.title}
                    </h3>

                    <p
                      style={{ borderLeftColor: activeCol }}
                      className="text-base sm:text-lg text-[#e2e8f0] leading-relaxed border-l-2 pl-4"
                    >
                      {activeSignal.abstract}
                    </p>

                    <div className="space-y-3 pt-2">
                      <span
                        style={{ color: activeCol }}
                        className="block font-mono-tech text-[10px] uppercase tracking-widest"
                      >
                        KEY OBSERVATIONS &amp; TAKEAWAYS
                      </span>
                      <ul className="space-y-2.5 text-sm text-[#94a3b8]">
                        {activeSignal.keyTakeaways.map((point) => (
                          <li key={point} className="flex items-start gap-3">
                            <span
                              style={{ color: activeCol }}
                              className="font-mono-tech mt-0.5"
                            >
                              ›
                            </span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {activeSignal.externalUrl && (
                    <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                      <a
                        href={activeSignal.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ backgroundColor: activeCol, borderColor: activeCol }}
                        className="inline-flex items-center gap-2 font-mono-tech text-xs px-5 py-3 border text-[#07090e] font-semibold hover:opacity-90 transition-opacity"
                      >
                        <span>{activeSignal.externalLabel || 'Open Link'}</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* =====================================================================
          11 — NETWORK & CONTACT
         ===================================================================== */}
      <footer
        id="network"
        className="bg-[#07090e] lab-grid-bg ambient-network-glow text-[#f2f0ea] scroll-mt-16"
      >
        <div className="spectrum-divider" />
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em] mb-8">
            <span className="text-[#10b981]">11 // CONTACT &amp; NETWORK</span>
            <span className="text-white/20">—</span>
            <span className="text-[#94a3b8]">DIRECT COMMUNICATION &amp; PROFILES</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/[0.1] items-end">
            <div className="lg:col-span-7 space-y-6">
              <p className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.18em] text-[#94a3b8]">
                HAVE AN INTERESTING PROBLEM?
              </p>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-[80px] font-bold text-[#f2f0ea] leading-[0.94] uppercase">
                LET&apos;S BUILD
                <br />
                SOMETHING
                <br />
                <span className="bg-gradient-to-r from-[#38bdf8] via-[#a78bfa] to-[#10b981] bg-clip-text text-transparent">
                  INTELLIGENT.
                </span>
              </h2>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-3 font-mono-tech text-xs sm:text-sm font-semibold px-6 py-4 bg-gradient-to-r from-[#38bdf8] to-[#10b981] text-[#07090e] hover:opacity-90 transition-opacity"
                >
                  {copiedEmail ? <Check size={15} /> : <Copy size={15} />}
                  <span>
                    {copiedEmail ? 'Email Copied to Clipboard' : verifiedLinks.email}
                  </span>
                </button>

                <a
                  href={`mailto:${verifiedLinks.email}`}
                  className="inline-flex items-center gap-2 font-mono-tech text-xs sm:text-sm px-6 py-4 border border-white/20 bg-[#0b101b] text-[#f2f0ea] hover:border-[#38bdf8] hover:text-[#38bdf8] transition-colors"
                >
                  <Mail size={15} />
                  <span>Send Email</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={`tel:${verifiedLinks.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 font-mono-tech text-xs px-5 py-4 border border-white/10 bg-[#0b101b] text-[#94a3b8] hover:text-[#f2f0ea] transition-colors"
                >
                  <Phone size={14} />
                  <span>{verifiedLinks.phone}</span>
                </a>
              </div>
            </div>

            {/* Verified Profiles & Credentials */}
            <div className="lg:col-span-5 border border-white/[0.12] border-t-2 border-t-[#10b981] bg-[#0b101b] p-6 sm:p-8 space-y-6 crosshair-corner">
              <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#94a3b8] border-b border-white/[0.08] pb-3">
                <span>PROFILES &amp; CREDENTIALS</span>
                <span className="text-[#10b981]">VERIFIED</span>
              </div>

              <div className="divide-y divide-white/[0.07] font-mono-tech text-xs">
                <a
                  href={verifiedLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#f2f0ea] hover:text-[#38bdf8] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Github size={14} className="text-[#38bdf8]" />
                    <span>GitHub · github.com/TahmidZ68</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={verifiedLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#f2f0ea] hover:text-[#38bdf8] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Linkedin size={14} className="text-[#38bdf8]" />
                    <span>LinkedIn · Md Tahmid Zoayed</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={verifiedLinks.kaggle}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#f2f0ea] hover:text-[#a78bfa] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-[#a78bfa] font-bold">K</span>
                    <span>Kaggle · kaggle.com/mdtahmidzoayed</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={verifiedLinks.axiosStation}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#f2f0ea] hover:text-[#10b981] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-[#10b981] font-bold">AX</span>
                    <span>Axios Station · axiosstation.com</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={verifiedLinks.cvPdf}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#f2f0ea] hover:text-[#f59e0b] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <FileText size={14} className="text-[#f59e0b]" />
                    <span>Curriculum Vitae (PDF)</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Complete System & Deployment Footer Matrix */}
          <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/[0.08] font-mono-tech text-xs">
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase tracking-widest text-[#10b981]">
                LIVE DEPLOYMENTS (VERCEL)
              </span>
              <ul className="space-y-1.5 text-[#94a3b8]">
                <li>
                  <a
                    href={verifiedLinks.axiosInsight}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#10b981] inline-flex items-center gap-1"
                  >
                    Axios Insight <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.axiosTalent}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#10b981] inline-flex items-center gap-1"
                  >
                    Axios Talent <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.axiosTalentCandidate}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#10b981] inline-flex items-center gap-1"
                  >
                    Axios Talent Candidate <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.vellumResearchLive}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#10b981] inline-flex items-center gap-1"
                  >
                    Vellum Research <ArrowUpRight size={11} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] uppercase tracking-widest text-[#38bdf8]">
                GITHUB REPOSITORIES
              </span>
              <ul className="space-y-1.5 text-[#94a3b8]">
                <li>
                  <a
                    href={verifiedLinks.degradeLabRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#38bdf8] inline-flex items-center gap-1"
                  >
                    TahmidZ68/DegradeLab <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.diagoraRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#f59e0b] inline-flex items-center gap-1"
                  >
                    TahmidZ68/Diagora <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.datasetMedicRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#38bdf8] inline-flex items-center gap-1"
                  >
                    TahmidZ68/DatasetMedic <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.apiDetectiveRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#f59e0b] inline-flex items-center gap-1"
                  >
                    TahmidZ68/API-Detective <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.flowSentryRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#f59e0b] inline-flex items-center gap-1"
                  >
                    TahmidZ68/flowsentry <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.vellumResearchRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#10b981] inline-flex items-center gap-1"
                  >
                    TahmidZ68/vellum-research <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.axiosInsightRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#10b981] inline-flex items-center gap-1"
                  >
                    TahmidZ68/axios-insight <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.ragBanglaHscRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#a78bfa] inline-flex items-center gap-1"
                  >
                    TahmidZ68/RAG_BanglaHSC <ArrowUpRight size={11} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] uppercase tracking-widest text-[#a78bfa]">
                PUBLISHED RESEARCH (RESEARCHGATE)
              </span>
              <ul className="space-y-1.5 text-[#94a3b8]">
                <li>
                  <a
                    href={verifiedLinks.papers.autismClassification}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#a78bfa] inline-flex items-center gap-1"
                  >
                    Autism Classification (2023) <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.papers.autismImageVgg19}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#a78bfa] inline-flex items-center gap-1"
                  >
                    Autism Image / CNN (2022) <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.papers.rainwaterHarvesting}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#a78bfa] inline-flex items-center gap-1"
                  >
                    Rainwater Harvesting (2023) <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.papers.startupPrediction}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#a78bfa] inline-flex items-center gap-1"
                  >
                    Startup Success ML (2022) <ArrowUpRight size={11} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] uppercase tracking-widest text-[#f59e0b]">
                LOCATION &amp; LOCAL TIME
              </span>
              <p className="text-[#94a3b8]">Dhaka, Bangladesh</p>
              <p className="text-[#94a3b8]">23.8103° N · 90.4125° E</p>
              <p className="text-[#f2f0ea]">
                <LiveDhakaClock />
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[11px] text-[#64748b]">
            <span>© {new Date().getFullYear()} Md Tahmid Zoayed · All Rights Reserved</span>
            <span>AI / ML Engineer · Systems Builder · CBO at Axios Station</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
