import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
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
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Dhaka',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(new Date()),
        );
      } catch {
        setTime('UTC+6');
      }
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return <span>{time} · DHAKA</span>;
}

const CAPABILITY_ACCENTS = ['#8B5CF6', '#3B82F6', '#FFC857', '#38BDF8', '#8B5CF6', '#00D6B4'];
const MATRIX_ACCENTS = ['#3B82F6', '#8B5CF6', '#00D6B4', '#FFC857'];
const VECTOR_ACCENTS = ['#3B82F6', '#FFC857', '#00D6B4', '#8B5CF6'];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSignalId, setActiveSignalId] = useState(signalData[0].id);
  const [globeSelection, setGlobeSelection] = useState<{ id: string; seq: number } | null>(null);

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

  // Lock background scroll & close drawer on Escape
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(verifiedLinks.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      window.location.href = `mailto:${verifiedLinks.email}`;
    }
  };

  const activeSignalIdx = Math.max(
    0,
    signalData.findIndex((s) => s.id === activeSignalId),
  );
  const activeSignal = signalData[activeSignalIdx] || signalData[0];

  const getSignalAccent = (type: (typeof signalData)[number]['type']) => {
    if (type === 'RESEARCH PAPER') return '#8B5CF6';
    if (type === 'ENGINEERING NOTE') return '#38BDF8';
    return '#FFC857';
  };

  const activeSignalAccent = getSignalAccent(activeSignal.type);

  const selectSignal = (id: string) => {
    setActiveSignalId(id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('signal-reader')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F5F5F7] relative selection:bg-[#3B82F6] selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#3B82F6] focus:text-white focus:rounded font-mono-tech text-xs font-semibold"
      >
        Skip to main content
      </a>
      {/* =====================================================================
          FULLSCREEN DARK SWISS NAVIGATION DRAWER
         ===================================================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation index"
            className="fixed inset-0 z-50 bg-[#090A0F]/98 backdrop-blur-md text-[#F5F5F7] flex flex-col justify-between p-5 sm:p-12 overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#292D3A] pb-5">
              <div className="flex items-center gap-3 font-mono-tech text-xs font-semibold uppercase tracking-widest text-[#F5F5F7]">
                <span
                  className="w-2.5 h-2.5 rounded-xs"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)' }}
                />
                <span>MD TAHMID ZOAYED · SITE INDEX</span>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 rounded font-mono-tech text-xs uppercase tracking-wider text-[#A1A5B3] hover:text-[#F5F5F7] hover:border-[#3B82F6] px-4 py-2 border border-[#292D3A] bg-[#171A25] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <span>Close</span>
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-auto py-8 max-w-[1440px] w-full mx-auto">
              <nav
                aria-label="Full section index"
                className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1"
              >
                {navigationSections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline justify-between py-3 border-b border-[#292D3A] hover:border-[#3B82F6] transition-colors"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono-tech text-xs text-[#8B5CF6] font-semibold">
                        {item.num}
                      </span>
                      <span className="font-display text-xl sm:text-2xl font-bold text-[#F5F5F7] group-hover:text-[#38BDF8] transition-colors">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-[#707586] group-hover:text-[#3B82F6] transition-colors"
                    />
                  </a>
                ))}
              </nav>

              <div className="lg:col-span-5 space-y-8 border-t lg:border-t-0 lg:border-l border-[#292D3A] pt-6 lg:pt-0 lg:pl-10">
                <div>
                  <p className="font-mono-tech text-[11px] font-semibold uppercase tracking-widest text-[#00D6B4] mb-3">
                    LIVE DEPLOYMENTS (VERCEL)
                  </p>
                  <div className="divide-y divide-[#292D3A] rounded border border-[#292D3A] bg-[#171A25] font-mono-tech text-xs">
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
                        className="flex items-center justify-between py-3 px-4 text-[#F5F5F7] hover:bg-[#1D2130] hover:text-[#00D6B4] transition-colors"
                      >
                        <span>{app.label}</span>
                        <ArrowUpRight size={13} className="text-[#00D6B4] shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono-tech text-[11px] font-semibold uppercase tracking-widest text-[#707586] mb-3">
                    OPEN-SOURCE REPOSITORIES &amp; PROFILES
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono-tech text-xs">
                    {[
                      { label: 'DegradeLab', url: verifiedLinks.degradeLabRepo },
                      { label: 'Diagora', url: verifiedLinks.diagoraRepo },
                      { label: 'DatasetMedic', url: verifiedLinks.datasetMedicRepo },
                      { label: 'API Detective', url: verifiedLinks.apiDetectiveRepo },
                      { label: 'FlowSentry', url: verifiedLinks.flowSentryRepo },
                      { label: 'Vellum Research', url: verifiedLinks.vellumResearchRepo },
                      { label: 'GitHub', url: verifiedLinks.github },
                      { label: 'LinkedIn', url: verifiedLinks.linkedin },
                      { label: 'Kaggle', url: verifiedLinks.kaggle },
                      { label: 'CV (PDF)', url: verifiedLinks.cvPdf },
                    ].map((lk) => (
                      <a
                        key={lk.label}
                        href={lk.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#A1A5B3] hover:text-[#38BDF8] py-1.5 flex items-center justify-between border-b border-[#292D3A]/60"
                      >
                        <span className="truncate">{lk.label}</span>
                        <ArrowUpRight size={11} className="text-[#707586] shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#292D3A] font-mono-tech text-xs text-[#707586]">
              <span>{verifiedLinks.email}</span>
              <LiveDhakaClock />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          STICKY DARK SWISS EDITORIAL HEADER
         ===================================================================== */}
      <header className="sticky top-0 z-40 border-b border-[#292D3A] bg-[#090A0F]/92 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 h-16 flex items-center justify-between gap-4">
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-[#F5F5F7] hover:text-white transition-colors"
          >
            <span
              className="w-2.5 h-2.5 rounded-xs shrink-0"
              style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)' }}
            />
            <span className="font-display tracking-tight whitespace-nowrap">MD TAHMID ZOAYED</span>
          </a>

          <nav
            aria-label="Primary sections"
            className="hidden lg:flex items-center gap-7 font-mono-tech text-[11px] uppercase tracking-wider"
          >
            {[
              { label: 'Profile', href: '#profile', id: 'profile', color: '#8B5CF6' },
              { label: 'Systems', href: '#systems', id: 'systems', color: '#00D6B4' },
              { label: 'Research', href: '#research-lab', id: 'research-lab', color: '#38BDF8' },
              { label: 'Timeline', href: '#evolution', id: 'evolution', color: '#FFC857' },
              { label: 'Stack', href: '#tech-matrix', id: 'tech-matrix', color: '#3B82F6' },
              { label: 'Contact', href: '#network', id: 'network', color: '#FF5B5B' },
            ].map((nav) => {
              const active = activeSection === nav.id;
              return (
                <a
                  key={nav.id}
                  href={nav.href}
                  style={
                    active
                      ? { color: '#F5F5F7', borderBottomColor: nav.color }
                      : undefined
                  }
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap ${
                    active
                      ? 'font-semibold'
                      : 'border-transparent text-[#A1A5B3] hover:text-[#F5F5F7]'
                  }`}
                >
                  {nav.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded font-mono-tech text-[10.5px] text-[#A1A5B3] px-3 py-1.5 border border-[#292D3A] bg-[#11131B] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6B4]" />
              <LiveDhakaClock />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex items-center gap-2 rounded font-mono-tech text-[11px] uppercase tracking-wider font-semibold text-[#F5F5F7] hover:border-[#3B82F6] hover:bg-[#1D2130] px-3.5 sm:px-4 py-1.5 border border-[#292D3A] bg-[#171A25] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              <span>Index</span>
              <Menu size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          01 — HERO (DEEP SPACE #090A0F · EDITORIAL OPENING + 15-NODE ATLAS)
         ===================================================================== */}
      <main id="main-content">
      <section id="hero" className="swiss-hero-surface border-b border-[#292D3A]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-6 pb-16 sm:pt-8 sm:pb-24">
          {/* Top Technical Metadata Rail */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#292D3A] font-mono-tech text-[10px] sm:text-[10.5px] uppercase tracking-wider">
            <span className="font-semibold text-[#8B5CF6]">01 · {heroData.role}</span>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[#A1A5B3]">
              <span>{heroData.location}</span>
              <span className="hidden md:inline text-[#292D3A]">|</span>
              <span className="inline-flex items-center gap-1.5 text-[#00D6B4] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D6B4] shrink-0" />
                <span>{heroData.availability}</span>
              </span>
            </div>
          </div>

          {/* Oversized Hero Statement */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="pt-6 sm:pt-8 pb-6 sm:pb-7 border-b border-[#292D3A]"
          >
            <h1 className="font-display text-[36px] sm:text-6xl lg:text-[68px] xl:text-[78px] font-bold text-[#F5F5F7] leading-[0.98] sm:leading-[0.95] tracking-[-0.04em] max-w-6xl">
              I build <span className="grad-violet-blue-text">intelligent</span> systems.
              <br />
              Investigating what makes them{' '}
              <span className="text-[#00D6B4]">reliable.</span>
            </h1>
          </motion.div>

          {/* Asymmetric 12-Column Studio Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-7 sm:pt-8 items-start">
            {/* Left 6 Columns */}
            <div className="lg:col-span-6 space-y-7 flex flex-col justify-between">
              <div className="space-y-5 sm:space-y-6">
                <p className="font-mono-tech text-[11px] sm:text-xs uppercase tracking-widest text-[#38BDF8]">
                  {heroData.name} · {heroData.currentRole}
                </p>

                <p className="text-base sm:text-xl text-[#A1A5B3] leading-relaxed max-w-xl">
                  {heroData.supportingDescription}
                </p>

                {/* Primary CTA Bar */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                  <a
                    href="#systems"
                    className="inline-flex items-center gap-2 rounded font-mono-tech text-[11px] sm:text-xs uppercase tracking-wider font-semibold px-5 sm:px-6 py-3 sm:py-3.5 bg-[#3B82F6] hover:bg-[#8B5CF6] text-white transition-colors"
                  >
                    <span>Explore Systems</span>
                    <ArrowDownRight size={14} />
                  </a>

                  <a
                    href="#research-lab"
                    className="inline-flex items-center gap-2 rounded font-mono-tech text-[11px] sm:text-xs uppercase tracking-wider font-semibold px-5 sm:px-6 py-3 sm:py-3.5 border border-[#292D3A] bg-[#171A25] text-[#F5F5F7] hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors"
                  >
                    <span>Research &amp; Papers</span>
                    <ArrowDownRight size={14} />
                  </a>

                  <a
                    href={verifiedLinks.cvPdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded font-mono-tech text-[11px] sm:text-xs uppercase tracking-wider font-medium px-4 py-3 sm:py-3.5 border border-[#292D3A] bg-[#11131B] text-[#A1A5B3] hover:text-[#F5F5F7] hover:border-[#707586] transition-colors"
                  >
                    <FileText size={14} />
                    <span>Download CV</span>
                  </a>
                </div>
              </div>

              {/* Clean Technical Directory Links */}
              <div className="pt-7 border-t border-[#292D3A] grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="block font-mono-tech text-[10.5px] font-semibold uppercase tracking-widest text-[#00D6B4]">
                    LIVE AI PLATFORMS (VERCEL)
                  </span>
                  <ul className="divide-y divide-[#292D3A] border-t border-[#292D3A] text-xs font-medium">
                    {[
                      { label: 'Axios Insight', url: verifiedLinks.axiosInsight },
                      { label: 'Axios Talent', url: verifiedLinks.axiosTalent },
                      { label: 'Talent Candidate', url: verifiedLinks.axiosTalentCandidate },
                      { label: 'Vellum Research', url: verifiedLinks.vellumResearchLive },
                    ].map((app) => (
                      <li key={app.label}>
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2 flex items-center justify-between text-[#F5F5F7] hover:text-[#00D6B4] transition-colors"
                        >
                          <span>{app.label}</span>
                          <ArrowUpRight size={12} className="text-[#00D6B4]" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="block font-mono-tech text-[10.5px] font-semibold uppercase tracking-widest text-[#38BDF8]">
                    OPEN-SOURCE TOOLS (GITHUB)
                  </span>
                  <ul className="divide-y divide-[#292D3A] border-t border-[#292D3A] text-xs font-medium">
                    {[
                      { label: 'DegradeLab', url: verifiedLinks.degradeLabRepo, col: '#38BDF8' },
                      { label: 'DatasetMedic', url: verifiedLinks.datasetMedicRepo, col: '#38BDF8' },
                      { label: 'Diagora', url: verifiedLinks.diagoraRepo, col: '#FFC857' },
                      { label: 'API Detective', url: verifiedLinks.apiDetectiveRepo, col: '#FFC857' },
                      { label: 'FlowSentry', url: verifiedLinks.flowSentryRepo, col: '#FFC857' },
                    ].map((repo) => (
                      <li key={repo.label}>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2 flex items-center justify-between text-[#F5F5F7] hover:text-[#3B82F6] transition-colors"
                        >
                          <span>{repo.label}</span>
                          <ArrowUpRight size={12} style={{ color: repo.col }} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4-Cell Editorial Fact Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 rounded border border-[#292D3A] bg-[#171A25] divide-x divide-y sm:divide-y-0 divide-[#292D3A]">
                <div className="p-3.5 sm:p-4 space-y-1">
                  <span className="font-mono-tech text-[10px] uppercase text-[#00D6B4] font-semibold">
                    CURRENT ROLE
                  </span>
                  <p className="font-display text-sm sm:text-base font-bold text-[#F5F5F7]">
                    Axios Station
                  </p>
                  <p className="text-[11px] text-[#707586]">CBO &amp; AI Engineer</p>
                </div>
                <div className="p-3.5 sm:p-4 space-y-1">
                  <span className="font-mono-tech text-[10px] uppercase text-[#38BDF8] font-semibold">
                    SYSTEMS BUILT
                  </span>
                  <p className="font-display text-sm sm:text-base font-bold text-[#F5F5F7]">
                    11 Systems
                  </p>
                  <p className="text-[11px] text-[#707586]">4 Live · 15+ Repos</p>
                </div>
                <div className="p-3.5 sm:p-4 space-y-1">
                  <span className="font-mono-tech text-[10px] uppercase text-[#8B5CF6] font-semibold">
                    RESEARCH
                  </span>
                  <p className="font-display text-sm sm:text-base font-bold text-[#F5F5F7]">
                    05 Studies
                  </p>
                  <p className="text-[11px] text-[#707586]">4 Papers + BAU Grant</p>
                </div>
                <div className="p-3.5 sm:p-4 space-y-1">
                  <span className="font-mono-tech text-[10px] uppercase text-[#FFC857] font-semibold">
                    EDUCATION
                  </span>
                  <p className="font-display text-sm sm:text-base font-bold text-[#F5F5F7]">
                    B.Sc. in CSE
                  </p>
                  <p className="text-[11px] text-[#707586]">East West University</p>
                </div>
              </div>
            </div>

            {/* Right 6 Columns: 15-Node Interactive Work & Research Globe */}
            <div className="lg:col-span-6">
              <DotMatrixGlobe
                onInspectSystem={(sysId) => {
                  setGlobeSelection({ id: sysId, seq: Date.now() });
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02 — PROFILE & CAPABILITIES (GRAPHITE #11131B EDITORIAL SPREAD)
         ===================================================================== */}
      <section
        id="profile"
        className="bg-[#11131B] text-[#F5F5F7] border-b border-[#292D3A] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-8 sm:pb-10 border-b border-[#292D3A]">
            <div className="lg:col-span-9 flex items-baseline gap-4 sm:gap-7">
              <span className="font-display text-4xl sm:text-7xl font-bold grad-violet-blue-text leading-none">
                02
              </span>
              <div className="space-y-1.5 sm:space-y-2">
                <span className="block font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-widest text-[#8B5CF6]">
                  PROFILE &amp; CAPABILITIES
                </span>
                <h2 className="font-display text-2xl sm:text-5xl font-bold text-[#F5F5F7] leading-[1.06] sm:leading-[1.04]">
                  {intelligenceProfileData.headline}
                </h2>
              </div>
            </div>
            <div className="lg:col-span-3 lg:text-right font-mono-tech text-[11px] text-[#707586] uppercase">
              DHAKA, BANGLADESH
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Portrait Plate */}
            <div className="lg:col-span-4 max-w-sm lg:max-w-none space-y-3">
              <div className="rounded border border-[#292D3A] bg-[#171A25] p-3">
                <img
                  src="/images/md-tahmid-zoayed-portrait.png"
                  alt="Portrait of Md Tahmid Zoayed, AI Engineer and Applied Machine Learning Researcher"
                  width={800}
                  height={800}
                  decoding="async"
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover object-top rounded-xs"
                />
              </div>
              <div className="flex items-center justify-between font-mono-tech text-[10.5px] text-[#A1A5B3] pt-2 border-t border-[#292D3A]">
                <span>FIG. 01 · MD TAHMID ZOAYED</span>
                <span className="text-[#00D6B4] font-semibold">AI / ML &amp; SYSTEMS</span>
              </div>
            </div>

            {/* Right Biography Prose + Structured Capability Index */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pb-8 sm:pb-10 border-b border-[#292D3A]">
                {intelligenceProfileData.narrative.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-sm sm:text-base leading-relaxed ${
                      index === 0
                        ? 'md:col-span-2 text-base sm:text-xl font-medium text-[#F5F5F7]'
                        : 'text-[#A1A5B3]'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Clean Capability Index */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-widest text-[#707586]">
                  <span>ENGINEERING &amp; RESEARCH DOMAINS</span>
                  <div className="flex items-center gap-4">
                    <a href="#systems" className="text-[#38BDF8] hover:underline">
                      Explore Systems →
                    </a>
                    <a href="#research-lab" className="text-[#8B5CF6] hover:underline">
                      Research Archive →
                    </a>
                  </div>
                </div>

                <div className="divide-y divide-[#292D3A] border-t border-b border-[#292D3A]">
                  {intelligenceProfileData.domains.map((dom, idx) => {
                    const col = CAPABILITY_ACCENTS[idx % CAPABILITY_ACCENTS.length];
                    return (
                      <div
                        key={dom.index}
                        className="py-5 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline"
                      >
                        <div className="md:col-span-4 flex items-baseline gap-3">
                          <span className="font-mono-tech text-xs font-semibold" style={{ color: col }}>
                            {dom.index}
                          </span>
                          <div>
                            <h3 className="font-display text-lg font-bold text-[#F5F5F7]">
                              {dom.title}
                            </h3>
                            <span className="block font-mono-tech text-[10.5px] text-[#707586] mt-0.5">
                              {dom.focus}
                            </span>
                          </div>
                        </div>

                        <div className="md:col-span-5">
                          <p className="text-sm text-[#A1A5B3] leading-relaxed">{dom.summary}</p>
                        </div>

                        <div
                          className="md:col-span-3 md:text-right font-mono-tech text-[10.5px] font-medium"
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
          03 — SELECTED SYSTEMS & PRODUCTS (DEEP SPACE #090A0F)
         ===================================================================== */}
      <SystemsBlueprintSection externalSelection={globeSelection} />

      {/* =====================================================================
          04 RESEARCH · 05 OPEN QUESTIONS · 06 TIMELINE · 07 AXIOS STATION
         ===================================================================== */}
      <ResearchAndNotebookSection />

      {/* =====================================================================
          08 — TECHNOLOGY MATRIX (GRAPHITE #11131B)
         ===================================================================== */}
      <section
        id="tech-matrix"
        className="bg-[#11131B] text-[#F5F5F7] border-b border-[#292D3A] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-8 sm:pb-10 border-b border-[#292D3A]">
            <div className="lg:col-span-8 flex items-baseline gap-4 sm:gap-7">
              <span className="font-display text-4xl sm:text-7xl font-bold text-[#3B82F6] leading-none">
                08
              </span>
              <div className="space-y-1.5 sm:space-y-2">
                <span className="block font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-widest text-[#38BDF8]">
                  TECHNOLOGY MATRIX
                </span>
                <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F7] leading-[0.98]">
                  Production &amp; Research Stack.
                </h2>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-4 font-mono-tech text-[11px]">
              <span className="inline-flex items-center gap-2 text-[#00D6B4] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#00D6B4]" /> CORE PROFICIENCY
              </span>
              <span className="inline-flex items-center gap-2 text-[#A1A5B3]">
                <span className="w-2 h-2 rounded-full bg-[#707586]" /> APPLIED / WORKING
              </span>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {technologyMatrixData.map((group, gIdx) => {
              const col = MATRIX_ACCENTS[gIdx % MATRIX_ACCENTS.length];
              return (
                <div
                  key={group.code}
                  className="rounded-md border border-[#292D3A] bg-[#171A25] overflow-hidden"
                >
                  <div className="p-5 sm:p-6 border-b border-[#292D3A] bg-[#1D2130]/50 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10.5px] sm:text-[11px] font-semibold">
                      <span style={{ color: col }}>
                        {group.code} · {group.category.toUpperCase()}
                      </span>
                      <span className="text-[#707586]">{group.items.length} TOOLS</span>
                    </div>
                    <p className="text-xs text-[#A1A5B3]">{group.description}</p>
                  </div>

                  <div className="divide-y divide-[#292D3A]">
                    {group.items.map((tech) => {
                      const isCore = tech.tier === 'Core Proficiency';
                      return (
                        <div
                          key={tech.name}
                          className="px-5 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-2.5 items-baseline hover:bg-[#1D2130]/40 transition-colors"
                        >
                          <div className="sm:col-span-5 flex items-center justify-between sm:justify-start gap-2.5">
                            <span className="flex items-center gap-2.5">
                              <span
                                style={{ backgroundColor: isCore ? col : '#707586' }}
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                              />
                              <span className="font-display text-sm sm:text-base font-bold text-[#F5F5F7]">
                                {tech.name}
                              </span>
                            </span>
                            <span
                              className="sm:hidden font-mono-tech text-[10px] font-semibold uppercase"
                              style={{ color: isCore ? col : '#707586' }}
                            >
                              {isCore ? 'CORE' : 'APPLIED'}
                            </span>
                          </div>
                          <div className="hidden sm:block sm:col-span-2 font-mono-tech text-[10px] font-semibold uppercase">
                            <span style={{ color: isCore ? col : '#707586' }}>
                              {isCore ? 'CORE' : 'APPLIED'}
                            </span>
                          </div>
                          <div className="sm:col-span-5 text-xs text-[#A1A5B3] leading-relaxed">
                            {tech.context}
                          </div>
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
          09 — CURRENT DIRECTION (DEEP SPACE #090A0F)
         ===================================================================== */}
      <section
        id="current-vector"
        className="bg-[#090A0F] text-[#F5F5F7] border-b border-[#292D3A] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-8 sm:pb-10 border-b border-[#292D3A]">
            <div className="lg:col-span-8 flex items-baseline gap-4 sm:gap-7">
              <span className="font-display text-4xl sm:text-7xl font-bold grad-mint-cyan-text leading-none">
                09
              </span>
              <div className="space-y-1.5 sm:space-y-2">
                <span className="flex items-center gap-2 font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-widest text-[#00D6B4]">
                  <Compass size={13} />
                  <span>CURRENT DIRECTION · 2025–2026</span>
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F5F5F7] leading-[1.01]">
                  AI Agents, Automation &amp;{' '}
                  <span className="grad-mint-cyan-text">Intelligent Systems.</span>
                </h2>
              </div>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm sm:text-base text-[#A1A5B3] leading-relaxed">
                {currentVectorData.statement}
              </p>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {currentVectorData.trajectories.map((vec, idx) => {
              const col = VECTOR_ACCENTS[idx % VECTOR_ACCENTS.length];
              return (
                <div
                  key={vec.code}
                  style={{ borderTopColor: col }}
                  className="rounded-md border border-[#292D3A] border-t-2 bg-[#171A25] p-5 sm:p-6 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between font-mono-tech text-[10.5px]">
                      <span className="font-semibold text-[#707586]">0{idx + 1} · {vec.code}</span>
                      <span style={{ color: col }} className="font-semibold uppercase">
                        {vec.status}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#F5F5F7] leading-snug">
                      {vec.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A5B3] leading-relaxed">
                      {vec.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#292D3A] font-mono-tech text-[10px]">
                    {vec.focusTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded px-2 py-0.5 bg-[#11131B] border border-[#292D3A] text-[#A1A5B3]"
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
      </section>

      {/* =====================================================================
          10 — ENGINEERING NOTES & PAPERS (GRAPHITE #11131B)
         ===================================================================== */}
      <section
        id="signal"
        className="bg-[#11131B] text-[#F5F5F7] border-b border-[#292D3A] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-8 sm:pb-10 border-b border-[#292D3A]">
            <div className="lg:col-span-8 flex items-baseline gap-4 sm:gap-7">
              <span className="font-display text-4xl sm:text-7xl font-bold text-[#FF5B5B] leading-none">
                10
              </span>
              <div className="space-y-1.5 sm:space-y-2">
                <span className="flex items-center gap-2 font-mono-tech text-[10.5px] sm:text-[11px] uppercase tracking-widest text-[#FF5B5B]">
                  <Radio size={13} />
                  <span>SIGNAL · TECHNICAL NOTES &amp; DISPATCHES</span>
                </span>
                <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F7] leading-[0.98]">
                  Engineering Notes &amp; Papers.
                </h2>
              </div>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm sm:text-base text-[#A1A5B3] leading-relaxed">
                Insights from building DegradeLab, Diagora, FlowSentry, DatasetMedic, Vellum
                Research, and API Detective alongside published research studies.
              </p>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 rounded-md border border-[#292D3A] bg-[#090A0F] divide-y lg:divide-y-0 lg:divide-x divide-[#292D3A] overflow-hidden">
            {/* Left Signal Index */}
            <div className="lg:col-span-5 divide-y divide-[#292D3A]">
              {signalData.map((entry, idx) => {
                const isSelected = entry.id === activeSignal.id;
                const entryColor = getSignalAccent(entry.type);
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => selectSignal(entry.id)}
                    style={
                      isSelected
                        ? {
                            backgroundColor: '#171A25',
                            borderLeftColor: entryColor,
                          }
                        : undefined
                    }
                    className={`w-full text-left p-4 sm:p-5 transition-colors flex flex-col gap-1.5 border-l-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3B82F6] ${
                      isSelected ? '' : 'border-l-transparent hover:bg-[#171A25]/60'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10.5px]">
                      <span style={{ color: entryColor }} className="font-semibold">
                        0{idx + 1} · {entry.type}
                      </span>
                      <span className="text-[#707586]">{entry.date}</span>
                    </div>
                    <h3
                      className={`font-display text-base font-bold leading-snug ${
                        isSelected ? 'text-[#F5F5F7]' : 'text-[#A1A5B3]'
                      }`}
                    >
                      {entry.title}
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* Right Publication Reader */}
            <div
              id="signal-reader"
              className="lg:col-span-7 p-5 sm:p-10 lg:p-12 flex flex-col justify-between gap-7 sm:gap-8 bg-[#171A25] scroll-mt-20"
            >
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#292D3A] font-mono-tech text-[10.5px] sm:text-[11px]">
                  <span style={{ color: activeSignalAccent }} className="font-semibold">
                    {activeSignal.code} · {activeSignal.type}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#707586]">{activeSignal.date}</span>
                    <div className="flex lg:hidden items-center gap-1">
                      <button
                        type="button"
                        aria-label="Previous engineering note"
                        onClick={() => {
                          const prevIdx = (activeSignalIdx - 1 + signalData.length) % signalData.length;
                          setActiveSignalId(signalData[prevIdx].id);
                        }}
                        className="p-1 rounded border border-[#292D3A] bg-[#11131B] text-[#A1A5B3] hover:text-white"
                      >
                        <ChevronLeft size={12} />
                      </button>
                      <button
                        type="button"
                        aria-label="Next engineering note"
                        onClick={() => {
                          const nextIdx = (activeSignalIdx + 1) % signalData.length;
                          setActiveSignalId(signalData[nextIdx].id);
                        }}
                        className="p-1 rounded border border-[#292D3A] bg-[#11131B] text-[#A1A5B3] hover:text-white"
                      >
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#F5F5F7] leading-[1.1]">
                  {activeSignal.title}
                </h3>

                <p
                  style={{ borderLeftColor: activeSignalAccent }}
                  className="text-base sm:text-lg text-[#F5F5F7] leading-relaxed border-l-2 pl-4 sm:pl-5"
                >
                  {activeSignal.abstract}
                </p>

                <div className="space-y-3 pt-2">
                  <span
                    style={{ color: activeSignalAccent }}
                    className="block font-mono-tech text-[11px] font-semibold uppercase tracking-widest"
                  >
                    KEY TAKEAWAYS
                  </span>
                  <ul className="space-y-2.5 text-sm sm:text-base text-[#A1A5B3]">
                    {activeSignal.keyTakeaways.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span
                          style={{ backgroundColor: activeSignalAccent }}
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                        />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {activeSignal.externalUrl && (
                <div className="pt-6 border-t border-[#292D3A]">
                  <a
                    href={activeSignal.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: activeSignalAccent }}
                    className="inline-flex items-center gap-2 rounded font-mono-tech text-[11px] uppercase tracking-wider font-semibold px-6 py-3 text-[#090A0F] hover:opacity-90 transition-opacity"
                  >
                    <span>{activeSignal.externalLabel || 'Open Link'}</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* =====================================================================
          11 — CONTACT & FOOTER (DEEP SPACE #090A0F)
         ===================================================================== */}
      <footer id="network" className="bg-[#090A0F] text-[#F5F5F7] scroll-mt-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 sm:pb-16 border-b border-[#292D3A] items-end">
            <div className="lg:col-span-7 space-y-6">
              <span className="block font-mono-tech text-[11px] uppercase tracking-widest text-[#00D6B4] font-semibold">
                11 · CONTACT &amp; COLLABORATION
              </span>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F5F5F7] leading-[0.98] sm:leading-[0.96]">
                Have an interesting problem?
                <br />
                Let&apos;s build something{' '}
                <span className="grad-violet-blue-text">intelligent.</span>
              </h2>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`inline-flex items-center gap-2 rounded font-mono-tech text-[11px] sm:text-xs px-4 sm:px-5 py-3.5 transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                    copiedEmail
                      ? 'bg-[#00D6B4] text-[#090A0F]'
                      : 'bg-[#3B82F6] hover:bg-[#8B5CF6] text-white'
                  }`}
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span className="break-all">
                    {copiedEmail ? 'EMAIL COPIED TO CLIPBOARD' : verifiedLinks.email}
                  </span>
                </button>

                <a
                  href={`mailto:${verifiedLinks.email}`}
                  className="inline-flex items-center gap-2 rounded font-mono-tech text-[11px] sm:text-xs uppercase tracking-wider px-4 sm:px-5 py-3.5 border border-[#292D3A] bg-[#171A25] text-[#F5F5F7] hover:border-[#00D6B4] hover:text-[#00D6B4] transition-colors font-semibold"
                >
                  <Mail size={14} />
                  <span>Send Email</span>
                  <ArrowUpRight size={13} />
                </a>

                <a
                  href={`tel:${verifiedLinks.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 rounded font-mono-tech text-[11px] sm:text-xs px-4 sm:px-5 py-3.5 border border-[#292D3A] bg-[#11131B] text-[#A1A5B3] hover:text-[#F5F5F7] hover:border-[#707586] transition-colors"
                >
                  <Phone size={13} />
                  <span>{verifiedLinks.phone}</span>
                </a>
              </div>
            </div>

            {/* Verified Credentials Panel */}
            <div className="lg:col-span-5 rounded-md border border-[#292D3A] bg-[#171A25] p-5 sm:p-8 space-y-4">
              <div className="flex items-center justify-between font-mono-tech text-[11px] uppercase tracking-wider text-[#A1A5B3] border-b border-[#292D3A] pb-3">
                <span>PROFILES &amp; CREDENTIALS</span>
                <span className="text-[#00D6B4] font-semibold">VERIFIED</span>
              </div>

              <div className="divide-y divide-[#292D3A] text-sm font-medium">
                <a
                  href={verifiedLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#F5F5F7] hover:text-[#38BDF8] transition-colors"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Github size={15} className="text-[#38BDF8] shrink-0" />
                    <span className="truncate">GitHub · github.com/TahmidZ68</span>
                  </span>
                  <ArrowUpRight size={14} className="shrink-0" />
                </a>

                <a
                  href={verifiedLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#F5F5F7] hover:text-[#3B82F6] transition-colors"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Linkedin size={15} className="text-[#3B82F6] shrink-0" />
                    <span className="truncate">LinkedIn · Md Tahmid Zoayed</span>
                  </span>
                  <ArrowUpRight size={14} className="shrink-0" />
                </a>

                <a
                  href={verifiedLinks.kaggle}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#F5F5F7] hover:text-[#8B5CF6] transition-colors"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono-tech font-bold w-4 text-center text-[#8B5CF6] shrink-0">
                      K
                    </span>
                    <span className="truncate">Kaggle · mdtahmidzoayed</span>
                  </span>
                  <ArrowUpRight size={14} className="shrink-0" />
                </a>

                <a
                  href={verifiedLinks.axiosStation}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#F5F5F7] hover:text-[#00D6B4] transition-colors"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono-tech font-bold w-4 text-center text-[#00D6B4] shrink-0">
                      A
                    </span>
                    <span className="truncate">Axios Station · axiosstation.com</span>
                  </span>
                  <ArrowUpRight size={14} className="shrink-0" />
                </a>

                <a
                  href={verifiedLinks.cvPdf}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#F5F5F7] hover:text-[#FFC857] transition-colors"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <FileText size={15} className="text-[#FFC857] shrink-0" />
                    <span className="truncate">Curriculum Vitae (PDF)</span>
                  </span>
                  <ArrowUpRight size={14} className="shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* 4-Column Footer Directory */}
          <div className="py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-[#292D3A] text-xs font-medium">
            <div className="space-y-3">
              <span className="block font-mono-tech text-[10.5px] font-semibold uppercase tracking-widest text-[#00D6B4]">
                LIVE DEPLOYMENTS (VERCEL)
              </span>
              <ul className="space-y-2 text-[#A1A5B3]">
                <li>
                  <a
                    href={verifiedLinks.axiosInsight}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#00D6B4] inline-flex items-center gap-1"
                  >
                    Axios Insight <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.axiosTalent}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#00D6B4] inline-flex items-center gap-1"
                  >
                    Axios Talent <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.axiosTalentCandidate}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#00D6B4] inline-flex items-center gap-1"
                  >
                    Axios Talent Candidate <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.vellumResearchLive}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#00D6B4] inline-flex items-center gap-1"
                  >
                    Vellum Research <ArrowUpRight size={11} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="block font-mono-tech text-[10.5px] font-semibold uppercase tracking-widest text-[#38BDF8]">
                GITHUB REPOSITORIES
              </span>
              <ul className="space-y-2 text-[#A1A5B3]">
                <li>
                  <a
                    href={verifiedLinks.degradeLabRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#38BDF8] inline-flex items-center gap-1"
                  >
                    TahmidZ68/DegradeLab <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.diagoraRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#FFC857] inline-flex items-center gap-1"
                  >
                    TahmidZ68/Diagora <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.datasetMedicRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#38BDF8] inline-flex items-center gap-1"
                  >
                    TahmidZ68/DatasetMedic <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.apiDetectiveRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#FFC857] inline-flex items-center gap-1"
                  >
                    TahmidZ68/API-Detective <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.flowSentryRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#FFC857] inline-flex items-center gap-1"
                  >
                    TahmidZ68/flowsentry <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.vellumResearchRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#00D6B4] inline-flex items-center gap-1"
                  >
                    TahmidZ68/vellum-research <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.axiosInsightRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#00D6B4] inline-flex items-center gap-1"
                  >
                    TahmidZ68/axios-insight <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.ragBanglaHscRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#8B5CF6] inline-flex items-center gap-1"
                  >
                    TahmidZ68/RAG_BanglaHSC <ArrowUpRight size={11} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="block font-mono-tech text-[10.5px] font-semibold uppercase tracking-widest text-[#8B5CF6]">
                PUBLISHED RESEARCH (RESEARCHGATE)
              </span>
              <ul className="space-y-2 text-[#A1A5B3]">
                <li>
                  <a
                    href={verifiedLinks.papers.autismClassification}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#8B5CF6] inline-flex items-center gap-1"
                  >
                    Autism Classification (2023) <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.papers.autismImageVgg19}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#8B5CF6] inline-flex items-center gap-1"
                  >
                    Autism Image / CNN (2022) <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.papers.rainwaterHarvesting}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#8B5CF6] inline-flex items-center gap-1"
                  >
                    Rainwater Harvesting (2023) <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.papers.startupPrediction}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#8B5CF6] inline-flex items-center gap-1"
                  >
                    Startup Success ML (2022) <ArrowUpRight size={11} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3 font-mono-tech text-xs">
              <span className="block text-[10.5px] font-semibold uppercase tracking-widest text-[#FFC857]">
                LOCATION &amp; LOCAL TIME
              </span>
              <p className="text-[#A1A5B3]">Dhaka, Bangladesh</p>
              <p className="text-[#A1A5B3]">23.8103° N · 90.4125° E</p>
              <p className="text-[#F5F5F7] font-semibold">
                <LiveDhakaClock />
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[11px] text-[#707586] text-center sm:text-left">
            <span>© {new Date().getFullYear()} MD TAHMID ZOAYED · ALL RIGHTS RESERVED</span>
            <span>AI / ML ENGINEER · SYSTEMS BUILDER · CBO AT AXIOS STATION</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
