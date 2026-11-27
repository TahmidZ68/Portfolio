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

  return <span>{time} · Dhaka</span>;
}

const DOMAIN_COLORS = ['#10b981', '#7c3aed', '#d97706', '#2563eb', '#7c3aed', '#059669'];
const MATRIX_COLORS = ['#2563eb', '#7c3aed', '#059669', '#d97706'];
const VECTOR_COLORS = ['#2563eb', '#d97706', '#059669', '#7c3aed'];

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
    <div className="min-h-screen bg-[#0c0d12] text-[#f4f3ef] relative selection:bg-[#2563eb] selection:text-white">
      {/* Fullscreen Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-[#0c0d12]/98 backdrop-blur-md flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-5">
              <div className="flex items-center gap-3 text-sm font-semibold tracking-tight text-[#f4f3ef]">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#10b981]" />
                <span>Md Tahmid Zoayed</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 rounded-full text-xs font-medium text-[#cbd5e1] hover:text-white px-4 py-2 border border-white/15"
              >
                <span>Close</span>
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-auto py-8 max-w-[1440px] w-full mx-auto">
              <nav className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {navigationSections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-2.5 border-b border-white/[0.08] hover:border-[#3b82f6] transition-colors"
                  >
                    <span className="font-mono-tech text-xs text-[#3b82f6]">{item.num}</span>
                    <span className="font-display text-xl sm:text-2xl font-bold text-[#f4f3ef] group-hover:text-[#3b82f6] transition-colors">
                      {item.label}
                    </span>
                  </a>
                ))}
              </nav>

              <div className="lg:col-span-5 space-y-6 border-t lg:border-t-0 lg:border-l border-white/[0.1] pt-6 lg:pt-0 lg:pl-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
                    Live Applications on Vercel
                  </p>
                  <div className="space-y-2 text-xs font-medium">
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
                        className="flex items-center justify-between rounded-xl py-2.5 px-3.5 border border-emerald-400/20 bg-emerald-400/[0.05] text-[#f4f3ef] hover:border-emerald-400"
                      >
                        <span>{app.label}</span>
                        <ArrowUpRight size={13} className="text-emerald-400" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">
                    Open-Source &amp; Profiles
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    <a
                      href={verifiedLinks.degradeLabRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline py-1"
                    >
                      DegradeLab ↗
                    </a>
                    <a
                      href={verifiedLinks.diagoraRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:underline py-1"
                    >
                      Diagora ↗
                    </a>
                    <a
                      href={verifiedLinks.datasetMedicRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline py-1"
                    >
                      DatasetMedic ↗
                    </a>
                    <a
                      href={verifiedLinks.apiDetectiveRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:underline py-1"
                    >
                      API Detective ↗
                    </a>
                    <a
                      href={verifiedLinks.flowSentryRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:underline py-1"
                    >
                      FlowSentry ↗
                    </a>
                    <a
                      href={verifiedLinks.vellumResearchRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline py-1"
                    >
                      Vellum Research ↗
                    </a>
                    <a
                      href={verifiedLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#cbd5e1] hover:text-white py-1"
                    >
                      GitHub ↗
                    </a>
                    <a
                      href={verifiedLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#cbd5e1] hover:text-white py-1"
                    >
                      LinkedIn ↗
                    </a>
                    <a
                      href={verifiedLinks.kaggle}
                      target="_blank"
                      rel="noreferrer"
                      className="text-violet-400 hover:underline py-1"
                    >
                      Kaggle ↗
                    </a>
                    <a
                      href={verifiedLinks.cvPdf}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#cbd5e1] hover:text-white py-1"
                    >
                      CV (PDF) ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.1] text-xs text-[#94a3b8]">
              <span>{verifiedLinks.email}</span>
              <LiveDhakaClock />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY EDITORIAL HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0c0d12]/90 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-16 flex items-center justify-between gap-4">
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-[#f4f3ef] hover:text-white transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#3b82f6] via-[#a78bfa] to-[#10b981]" />
            <span className="font-display">Md Tahmid Zoayed</span>
          </a>

          <nav
            aria-label="Primary sections"
            className="hidden lg:flex items-center gap-6 text-xs font-medium"
          >
            {[
              { label: 'Profile', href: '#profile', id: 'profile', color: '#3b82f6' },
              { label: 'Systems', href: '#systems', id: 'systems', color: '#10b981' },
              { label: 'Research', href: '#research-lab', id: 'research-lab', color: '#a78bfa' },
              { label: 'Timeline', href: '#evolution', id: 'evolution', color: '#f59e0b' },
              { label: 'Stack', href: '#tech-matrix', id: 'tech-matrix', color: '#3b82f6' },
              { label: 'Contact', href: '#network', id: 'network', color: '#10b981' },
            ].map((nav) => {
              const active = activeSection === nav.id;
              return (
                <a
                  key={nav.id}
                  href={nav.href}
                  style={active ? { color: nav.color } : undefined}
                  className={`transition-colors ${
                    active ? 'font-semibold' : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {nav.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full text-[11px] font-medium text-[#cbd5e1] px-3.5 py-1.5 border border-white/[0.1] bg-[#131620]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <LiveDhakaClock />
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex items-center gap-2 rounded-full text-xs font-semibold text-[#f4f3ef] hover:text-white px-4 py-1.5 border border-white/[0.15] hover:border-[#3b82f6] bg-[#131620] transition-colors"
            >
              <span>Menu</span>
              <Menu size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          01 — HERO (DEEP OBSIDIAN + SMOOTH AMBIENT GLOW + INTERACTIVE GLOBE)
         ===================================================================== */}
      <section
        id="hero"
        className="editorial-hero-bg border-b border-white/[0.08] relative overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pt-10 pb-20 sm:pt-14 sm:pb-24">
          {/* Top Location & Availability Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-8">
            <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium bg-white/[0.05] text-[#cbd5e1] border border-white/[0.1]">
              {heroData.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-400/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {heroData.availability}
            </span>
          </div>

          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-7">
              <div className="space-y-4">
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#60a5fa]">
                  {heroData.name} · {heroData.role}
                </p>

                <h1 className="font-display text-5xl sm:text-7xl xl:text-[84px] font-extrabold tracking-tight text-[#f4f3ef] leading-[0.96]">
                  I build{' '}
                  <span className="bg-gradient-to-r from-[#3b82f6] via-[#a78bfa] to-[#10b981] bg-clip-text text-transparent">
                    intelligent
                  </span>
                  <br />
                  systems.
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-[#cbd5e1] leading-relaxed max-w-2xl">
                {heroData.supportingDescription}
              </p>

              {/* Primary Pill CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href="#systems"
                  className="inline-flex items-center gap-2.5 rounded-full text-sm font-semibold px-7 py-3.5 bg-[#2563eb] hover:bg-[#3b82f6] text-white shadow-lg shadow-blue-600/25 transition-all"
                >
                  <span>Explore Systems</span>
                  <ArrowDownRight size={16} />
                </a>

                <a
                  href="#research-lab"
                  className="inline-flex items-center gap-2.5 rounded-full text-sm font-semibold px-7 py-3.5 border border-white/20 bg-[#131620] text-[#f4f3ef] hover:border-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Research &amp; Papers</span>
                  <ArrowDownRight size={16} />
                </a>

                <a
                  href={verifiedLinks.cvPdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full text-sm font-medium px-5 py-3.5 border border-white/10 text-[#cbd5e1] hover:text-white hover:border-white/30 transition-colors"
                >
                  <FileText size={15} />
                  <span>Download CV</span>
                </a>
              </div>

              {/* Quick Links: Live Products & Open-Source Tools */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2.5">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    Live AI Platforms (Vercel)
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
                        className="inline-flex items-center gap-1.5 rounded-full text-xs font-medium px-3 py-1 border border-emerald-400/25 bg-emerald-400/[0.08] text-[#f4f3ef] hover:border-emerald-400 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{app.label}</span>
                        <ArrowUpRight size={11} className="text-emerald-400" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#60a5fa]">
                    Open-Source Tools (GitHub)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={verifiedLinks.degradeLabRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full text-xs font-medium px-3 py-1 border border-blue-400/25 bg-blue-400/[0.08] text-[#f4f3ef] hover:border-blue-400 transition-colors"
                    >
                      <span>DegradeLab</span>
                      <ArrowUpRight size={11} className="text-blue-400" />
                    </a>
                    <a
                      href={verifiedLinks.datasetMedicRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full text-xs font-medium px-3 py-1 border border-blue-400/25 bg-blue-400/[0.08] text-[#f4f3ef] hover:border-blue-400 transition-colors"
                    >
                      <span>DatasetMedic</span>
                      <ArrowUpRight size={11} className="text-blue-400" />
                    </a>
                    <a
                      href={verifiedLinks.diagoraRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full text-xs font-medium px-3 py-1 border border-amber-400/25 bg-amber-400/[0.08] text-[#f4f3ef] hover:border-amber-400 transition-colors"
                    >
                      <span>Diagora</span>
                      <ArrowUpRight size={11} className="text-amber-400" />
                    </a>
                    <a
                      href={verifiedLinks.apiDetectiveRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full text-xs font-medium px-3 py-1 border border-amber-400/25 bg-amber-400/[0.08] text-[#f4f3ef] hover:border-amber-400 transition-colors"
                    >
                      <span>API Detective</span>
                      <ArrowUpRight size={11} className="text-amber-400" />
                    </a>
                    <a
                      href={verifiedLinks.flowSentryRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full text-xs font-medium px-3 py-1 border border-amber-400/25 bg-amber-400/[0.08] text-[#f4f3ef] hover:border-amber-400 transition-colors"
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

          {/* Bottom 4-Cell Rounded Summary Strip */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/[0.09] bg-[#131620]/90 p-5 space-y-1">
              <span className="text-xs font-semibold text-emerald-400">Current Role</span>
              <p className="font-display text-2xl font-bold text-[#f4f3ef]">Axios Station</p>
              <p className="text-xs text-[#94a3b8]">CBO &amp; AI Engineer · June 2025–Present</p>
            </div>
            <div className="rounded-2xl border border-white/[0.09] bg-[#131620]/90 p-5 space-y-1">
              <span className="text-xs font-semibold text-[#60a5fa]">Systems Built</span>
              <p className="font-display text-2xl font-bold text-[#f4f3ef]">11 Engineered Systems</p>
              <p className="text-xs text-[#94a3b8]">4 Live Vercel Platforms · 15+ Open-Source Repos</p>
            </div>
            <div className="rounded-2xl border border-white/[0.09] bg-[#131620]/90 p-5 space-y-1">
              <span className="text-xs font-semibold text-violet-400">Research</span>
              <p className="font-display text-2xl font-bold text-[#f4f3ef]">05 Research Studies</p>
              <p className="text-xs text-[#94a3b8]">4 Published Papers + EWU/BAU Funded Grant</p>
            </div>
            <div className="rounded-2xl border border-white/[0.09] bg-[#131620]/90 p-5 space-y-1">
              <span className="text-xs font-semibold text-amber-400">Education</span>
              <p className="font-display text-2xl font-bold text-[#f4f3ef]">B.Sc. in CSE</p>
              <p className="text-xs text-[#94a3b8]">
                East West University · Data Science &amp; Intelligent Systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02 — PROFILE (WARM IVORY HIGH-CONTRAST EDITORIAL)
         ===================================================================== */}
      <section
        id="profile"
        className="editorial-ivory-bg text-[#111318] border-b border-black/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold bg-blue-600/10 text-blue-700 border border-blue-600/20">
                02 · Profile &amp; Capabilities
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#111318] leading-[1.05]">
                {intelligenceProfileData.headline}
              </h2>

              {/* Portrait Card */}
              <div className="rounded-3xl border border-black/[0.09] bg-white p-3.5 max-w-xs shadow-md">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="/images/1761230135831.png"
                    alt="Md Tahmid Zoayed"
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover object-top"
                  />
                </div>
                <div className="pt-3 px-1 flex items-center justify-between text-xs font-semibold text-[#111318]">
                  <span>Md Tahmid Zoayed</span>
                  <span className="text-[#2563eb]">Dhaka, BD</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">
                  Engineering Philosophy
                </div>
                {intelligenceProfileData.narrative.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base sm:text-lg text-[#111318]/85 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* 6-Domain Capability Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {intelligenceProfileData.domains.map((dom, idx) => {
                  const col = DOMAIN_COLORS[idx % DOMAIN_COLORS.length];
                  return (
                    <div
                      key={dom.index}
                      className="rounded-2xl border border-black/[0.08] bg-white p-6 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="inline-flex items-center gap-2" style={{ color: col }}>
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: col }}
                            />
                            {dom.index}
                          </span>
                          <span className="text-[#64748b] text-[11px]">{dom.focus}</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-[#111318]">
                          {dom.title}
                        </h3>
                        <p className="text-sm text-[#525866] leading-relaxed">{dom.summary}</p>
                      </div>
                      <div
                        className="pt-3 border-t border-black/[0.06] text-xs font-semibold"
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
      </section>

      {/* =====================================================================
          03 — SYSTEMS (OBSIDIAN SPOTLIGHT BENTO + INTERACTIVE EXPLORER)
         ===================================================================== */}
      <SystemsBlueprintSection externalSelectedSystemId={selectedSystemFromGlobe} />

      {/* =====================================================================
          04 — RESEARCH & 05 — OPEN QUESTIONS (IVORY) + 06 — TIMELINE & 07 — AXIOS STATION (OBSIDIAN)
         ===================================================================== */}
      <ResearchAndNotebookSection />

      {/* =====================================================================
          08 — TECHNOLOGY MATRIX & 09 — CURRENT VECTOR (WARM IVORY)
         ===================================================================== */}
      <section
        id="tech-matrix"
        className="editorial-ivory-bg text-[#111318] border-b border-black/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-black/[0.08]">
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold bg-blue-600/10 text-blue-700 border border-blue-600/20">
                08 · Technology Matrix
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111318] leading-[1.02]">
                Production &amp; Research Stack.
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600" /> Core Proficiency
              </span>
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white border border-black/[0.1] text-[#525866]">
                <span className="w-2 h-2 rounded-full bg-[#94a3b8]" /> Applied / Working
              </span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {technologyMatrixData.map((group, gIdx) => {
              const col = MATRIX_COLORS[gIdx % MATRIX_COLORS.length];
              return (
                <div
                  key={group.code}
                  className="rounded-3xl border border-black/[0.08] bg-white overflow-hidden shadow-sm"
                >
                  <div className="p-6 border-b border-black/[0.07] bg-[#faf9f6] space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span style={{ color: col }}>{group.category}</span>
                      <span className="text-[#64748b]">{group.items.length} Tools</span>
                    </div>
                    <p className="text-xs text-[#525866]">{group.description}</p>
                  </div>

                  <div className="divide-y divide-black/[0.06]">
                    {group.items.map((tech) => {
                      const isCore = tech.tier === 'Core Proficiency';
                      return (
                        <div
                          key={tech.name}
                          className="px-6 py-4 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center hover:bg-[#f6f4ef]/60 transition-colors"
                        >
                          <div className="sm:col-span-5 flex items-center gap-2.5">
                            <span
                              style={{ backgroundColor: isCore ? col : '#94a3b8' }}
                              className="w-2 h-2 rounded-full shrink-0"
                            />
                            <span className="font-display text-sm font-bold text-[#111318]">
                              {tech.name}
                            </span>
                          </div>
                          <div className="sm:col-span-3 space-y-1">
                            <div className="h-1.5 w-full rounded-full bg-black/[0.07] overflow-hidden">
                              <div
                                style={{
                                  width: isCore ? '92%' : '62%',
                                  backgroundColor: isCore ? col : '#94a3b8',
                                }}
                                className="h-full rounded-full"
                              />
                            </div>
                            <span className="block text-[10px] font-medium text-[#525866]">
                              {tech.tier}
                            </span>
                          </div>
                          <div className="sm:col-span-4 text-xs text-[#525866]">{tech.context}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 09 — CURRENT VECTOR */}
          <div id="current-vector" className="mt-24 scroll-mt-24">
            <div className="rounded-3xl border border-black/[0.09] bg-white p-6 sm:p-10 lg:p-14 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-black/[0.08] text-xs font-semibold">
                <span className="text-[#2563eb] flex items-center gap-2">
                  <Compass size={15} />
                  09 · Current Direction
                </span>
                <span className="rounded-full px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Focus · 2025–2026
                </span>
              </div>

              <div className="space-y-4 mb-10">
                <h2 className="font-display text-3xl sm:text-5xl font-bold leading-[1.02] text-[#111318]">
                  AI Agents, Automation &amp;{' '}
                  <span className="bg-gradient-to-r from-[#2563eb] to-[#059669] bg-clip-text text-transparent">
                    Intelligent Systems.
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-[#525866] max-w-3xl leading-relaxed">
                  {currentVectorData.statement}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {currentVectorData.trajectories.map((vec, idx) => {
                  const col = VECTOR_COLORS[idx % VECTOR_COLORS.length];
                  return (
                    <div
                      key={vec.code}
                      className="rounded-2xl border border-black/[0.08] bg-[#f6f4ef] p-6 flex flex-col justify-between gap-5"
                    >
                      <div className="space-y-2.5">
                        <span
                          style={{ color: col }}
                          className="inline-block text-[11px] font-bold uppercase tracking-wider"
                        >
                          {vec.status}
                        </span>
                        <h3 className="font-display text-xl font-bold text-[#111318] leading-snug">
                          {vec.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#525866] leading-relaxed">
                          {vec.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/[0.07]">
                        {vec.focusTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full text-[11px] font-medium px-2.5 py-0.5 bg-white border border-black/[0.08] text-[#111318]"
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
        </div>
      </section>

      {/* =====================================================================
          10 — SIGNAL & 11 — CONTACT (DEEP OBSIDIAN)
         ===================================================================== */}
      <section
        id="signal"
        className="editorial-dark-glow border-b border-white/[0.08] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-white/[0.08]">
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-400/25">
                <Radio size={13} /> 10 · Technical Notes &amp; Writing
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f4f3ef] leading-[1.02]">
                Engineering Notes &amp; Papers.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                Insights from building DegradeLab, Diagora, FlowSentry, DatasetMedic, Vellum
                Research, and API Detective alongside published research studies.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-white/[0.1] bg-[#131620] overflow-hidden">
            {/* Left Feed List */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/[0.08] divide-y divide-white/[0.06]">
              {signalData.map((entry) => {
                const isSelected = entry.id === activeSignal.id;
                const entryColor =
                  entry.type === 'RESEARCH PAPER'
                    ? '#a78bfa'
                    : entry.type === 'ENGINEERING NOTE'
                      ? '#3b82f6'
                      : '#f59e0b';
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setActiveSignalId(entry.id)}
                    style={isSelected ? { backgroundColor: `${entryColor}16` } : undefined}
                    className="w-full text-left p-5 transition-colors flex flex-col gap-1.5 hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span style={{ color: entryColor }}>{entry.type}</span>
                      <span className="text-[#64748b]">{entry.date}</span>
                    </div>
                    <h3
                      className={`font-display text-base font-bold leading-snug ${
                        isSelected ? 'text-white' : 'text-[#94a3b8]'
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
                    ? '#3b82f6'
                    : '#f59e0b';
              return (
                <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 bg-[#0c0d12]/60">
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/[0.08] text-xs font-semibold">
                      <span style={{ color: activeCol }}>{activeSignal.type}</span>
                      <span className="text-[#94a3b8]">{activeSignal.date}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f4f3ef] leading-snug">
                      {activeSignal.title}
                    </h3>

                    <p
                      style={{ borderLeftColor: activeCol }}
                      className="text-base sm:text-lg text-[#cbd5e1] leading-relaxed border-l-2 pl-4"
                    >
                      {activeSignal.abstract}
                    </p>

                    <div className="space-y-3 pt-2">
                      <span
                        style={{ color: activeCol }}
                        className="block text-xs font-semibold uppercase tracking-wider"
                      >
                        Key Takeaways
                      </span>
                      <ul className="space-y-2.5 text-sm text-[#94a3b8]">
                        {activeSignal.keyTakeaways.map((point) => (
                          <li key={point} className="flex items-start gap-2.5">
                            <span
                              style={{ backgroundColor: activeCol }}
                              className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                            />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {activeSignal.externalUrl && (
                    <div className="pt-6 border-t border-white/[0.08]">
                      <a
                        href={activeSignal.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ backgroundColor: activeCol }}
                        className="inline-flex items-center gap-2 rounded-full text-xs font-semibold px-6 py-3 text-[#0c0d12] hover:opacity-90 transition-opacity"
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
          11 — CONTACT & FOOTER
         ===================================================================== */}
      <footer
        id="network"
        className="bg-[#0c0d12] editorial-hero-bg text-[#f4f3ef] scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/[0.1] items-end">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-400/25">
                11 · Get In Touch
              </span>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#f4f3ef] leading-[0.98]">
                Have an interesting problem?
                <br />
                <span className="bg-gradient-to-r from-[#3b82f6] via-[#a78bfa] to-[#10b981] bg-clip-text text-transparent">
                  Let&apos;s build something intelligent.
                </span>
              </h2>

              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2.5 rounded-full text-xs sm:text-sm font-semibold px-6 py-3.5 bg-[#2563eb] hover:bg-[#3b82f6] text-white shadow-lg shadow-blue-600/25 transition-all"
                >
                  {copiedEmail ? <Check size={15} /> : <Copy size={15} />}
                  <span>{copiedEmail ? 'Email Copied' : verifiedLinks.email}</span>
                </button>

                <a
                  href={`mailto:${verifiedLinks.email}`}
                  className="inline-flex items-center gap-2 rounded-full text-xs sm:text-sm font-medium px-6 py-3.5 border border-white/20 bg-[#131620] text-[#f4f3ef] hover:border-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <Mail size={15} />
                  <span>Send Email</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={`tel:${verifiedLinks.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-full text-xs px-5 py-3.5 border border-white/10 bg-[#131620] text-[#94a3b8] hover:text-white transition-colors"
                >
                  <Phone size={14} />
                  <span>{verifiedLinks.phone}</span>
                </a>
              </div>
            </div>

            {/* Verified Profiles Card */}
            <div className="lg:col-span-5 rounded-3xl border border-white/[0.1] bg-[#131620] p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center justify-between text-xs font-semibold text-[#94a3b8] border-b border-white/[0.08] pb-3">
                <span>Profiles &amp; Credentials</span>
                <span className="text-emerald-400">Verified</span>
              </div>

              <div className="divide-y divide-white/[0.07] text-sm font-medium">
                <a
                  href={verifiedLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#f4f3ef] hover:text-[#60a5fa] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Github size={15} className="text-[#60a5fa]" />
                    <span>GitHub · github.com/TahmidZ68</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={verifiedLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#f4f3ef] hover:text-[#60a5fa] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Linkedin size={15} className="text-[#60a5fa]" />
                    <span>LinkedIn · Md Tahmid Zoayed</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={verifiedLinks.kaggle}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#f4f3ef] hover:text-violet-400 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-violet-400 font-bold w-4 text-center">K</span>
                    <span>Kaggle · mdtahmidzoayed</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={verifiedLinks.axiosStation}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#f4f3ef] hover:text-emerald-400 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-emerald-400 font-bold w-4 text-center">A</span>
                    <span>Axios Station · axiosstation.com</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={verifiedLinks.cvPdf}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 flex items-center justify-between text-[#f4f3ef] hover:text-amber-400 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <FileText size={15} className="text-amber-400" />
                    <span>Curriculum Vitae (PDF)</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links Directory */}
          <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/[0.08] text-xs font-medium">
            <div className="space-y-3">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                Live Deployments (Vercel)
              </span>
              <ul className="space-y-2 text-[#94a3b8]">
                <li>
                  <a
                    href={verifiedLinks.axiosInsight}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-300 inline-flex items-center gap-1"
                  >
                    Axios Insight <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.axiosTalent}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-300 inline-flex items-center gap-1"
                  >
                    Axios Talent <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.axiosTalentCandidate}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-300 inline-flex items-center gap-1"
                  >
                    Axios Talent Candidate <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.vellumResearchLive}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-300 inline-flex items-center gap-1"
                  >
                    Vellum Research <ArrowUpRight size={11} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#60a5fa]">
                GitHub Repositories
              </span>
              <ul className="space-y-2 text-[#94a3b8]">
                <li>
                  <a
                    href={verifiedLinks.degradeLabRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#60a5fa] inline-flex items-center gap-1"
                  >
                    TahmidZ68/DegradeLab <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.diagoraRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-300 inline-flex items-center gap-1"
                  >
                    TahmidZ68/Diagora <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.datasetMedicRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#60a5fa] inline-flex items-center gap-1"
                  >
                    TahmidZ68/DatasetMedic <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.apiDetectiveRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-300 inline-flex items-center gap-1"
                  >
                    TahmidZ68/API-Detective <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.flowSentryRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-300 inline-flex items-center gap-1"
                  >
                    TahmidZ68/flowsentry <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.vellumResearchRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-300 inline-flex items-center gap-1"
                  >
                    TahmidZ68/vellum-research <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.axiosInsightRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-300 inline-flex items-center gap-1"
                  >
                    TahmidZ68/axios-insight <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.ragBanglaHscRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-violet-300 inline-flex items-center gap-1"
                  >
                    TahmidZ68/RAG_BanglaHSC <ArrowUpRight size={11} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-violet-400">
                Published Research (ResearchGate)
              </span>
              <ul className="space-y-2 text-[#94a3b8]">
                <li>
                  <a
                    href={verifiedLinks.papers.autismClassification}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-violet-300 inline-flex items-center gap-1"
                  >
                    Autism Classification (2023) <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.papers.autismImageVgg19}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-violet-300 inline-flex items-center gap-1"
                  >
                    Autism Image / CNN (2022) <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.papers.rainwaterHarvesting}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-violet-300 inline-flex items-center gap-1"
                  >
                    Rainwater Harvesting (2023) <ArrowUpRight size={11} />
                  </a>
                </li>
                <li>
                  <a
                    href={verifiedLinks.papers.startupPrediction}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-violet-300 inline-flex items-center gap-1"
                  >
                    Startup Success ML (2022) <ArrowUpRight size={11} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Location &amp; Local Time
              </span>
              <p className="text-[#94a3b8]">Dhaka, Bangladesh</p>
              <p className="text-[#94a3b8]">23.8103° N · 90.4125° E</p>
              <p className="text-[#f4f3ef]">
                <LiveDhakaClock />
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
            <span>© {new Date().getFullYear()} Md Tahmid Zoayed · All Rights Reserved</span>
            <span>AI / ML Engineer · Systems Builder · CBO at Axios Station</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
