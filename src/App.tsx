import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight, ArrowUpRight, BriefcaseBusiness, ChevronRight, Download,
  ExternalLink, Github, GraduationCap, Linkedin, Mail, Menu, Rocket,
  Users, X, type LucideIcon,
} from 'lucide-react';
import {
  about, academicProjects, beyondAI, careerFocus, contact, currentFocus,
  education, experience, featuredProjects, hero, links, navItems, processSteps,
  publications, research, researchExperience, researchInterests, stackGroups, onlinePresence,
} from '@/content';

const onlineIconMap: Record<string, LucideIcon> = { Github, ExternalLink, Linkedin };
const projectLinkIconMap: Record<string, LucideIcon> = {
  candidate: Users, recruiter: BriefcaseBusiness, live: Rocket, github: Github,
};

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal-on-scroll ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function StaggerGrid<T>({ items, renderItem, baseDelay = 80 }: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  baseDelay?: number;
}) {
  return (
    <>
      {items.map((item, i) => {
        const ref = useReveal<HTMLDivElement>();
        return (
          <div ref={ref} key={i} className="reveal-on-scroll" style={{ transitionDelay: `${i * baseDelay}ms` }}>
            {renderItem(item, i)}
          </div>
        );
      })}
    </>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min((window.scrollY / docHeight) * 100, 100) : 0);
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((s) => {
        const top = s.getBoundingClientRect().top;
        if (top < 120) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = heroRef.current;
      if (!el) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      el.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header className={`nav-wrap ${scrolled ? 'nav-scrolled' : ''}`}>
        <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}><span>MTZ</span><i>·</i><em>AI ENGINEER</em></a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={activeSection === item.href.slice(1) ? 'nav-active' : ''}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href={links.cv} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            <Download size={15} /> Download CV
          </a>
        </nav>
        <button className="menu-btn" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero section-pad" id="home">
          <div className="hero-grid">
            <div className="hero-copy reveal">
              <p className="kicker"><span className="status-dot" /> {hero.kicker}</p>
              <p className="hero-index">01 <span>/</span> INTRODUCING</p>
              <h1>{hero.name}</h1>
              <p className="hero-title">{hero.title}</p>
              <p className="hero-headline">{hero.headline}</p>
              {hero.lede.map((p, i) => <p className="hero-lede" key={i}>{p}</p>)}
              <div className="hero-tags">{hero.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="hero-actions">
                <a className="button button-fill" href="#projects">View My Work <ArrowDownRight size={17} /></a>
                <a className="button button-light" href={links.cv} target="_blank" rel="noopener noreferrer"><Download size={16} /> Download CV</a>
              </div>
              <div className="hero-socials">
                <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={16} /> GitHub</a>
                <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={16} /> LinkedIn</a>
              </div>
            </div>
            <div className="hero-visual reveal reveal-delay" ref={heroRef} style={{ transition: 'transform .2s ease' }}>
              <div className="portrait-frame">
                <img src="/images/1761230135831.png" alt="Portrait of Md Tahmid Zoayed" />
                <div className="portrait-label"><span>MD TAHMID ZOAYED</span><span>AI ENGINEER / CBO</span></div>
              </div>
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="hero-note"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={18} /></div>
            </div>
          </div>
          <div className="hero-bottom"><span>AI ENGINEERING</span><span>+</span><span>RESEARCH</span><span>+</span><span>BUSINESS</span><span>→</span><span>AI PRODUCTS</span></div>
        </section>

        {/* ABOUT */}
        <section className="about section-pad" id="about">
          <Reveal>
            <div className="section-marker"><span>02</span><span>ABOUT — WHO I AM</span></div>
            <div className="about-layout">
              <h2>Who I Am</h2>
              <div className="about-body">
                {about.paragraphs.map((p, i) => <p key={i} className={p.trim().endsWith('?') ? 'about-question' : ''}>{p}</p>)}
              </div>
            </div>
          </Reveal>
        </section>

        {/* EXPERIENCE */}
        <section className="experience section-pad" id="experience">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>03</span><span>EXPERIENCE</span></div></div>
            <div className="experience-list">
              <StaggerGrid items={experience} baseDelay={120} renderItem={(item, i) => (
                <div className="experience-item" key={i}>
                  <div className="experience-period">{item.period}</div>
                  <div className="experience-content">
                    <h3>{item.company}</h3>
                    <p className="experience-company">{item.role}</p>
                    <p>{item.text}</p>
                    {item.skills.length > 0 && <div className="tag-row">{item.skills.map((s) => <span key={s}>{s}</span>)}</div>}
                    {item.quote && <p className="experience-note experience-quote">"{item.quote}"</p>}
                    {item.note && <p className="experience-note">{item.note}</p>}
                  </div>
                  <BriefcaseBusiness size={19} />
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* SKILLS */}
        <section className="skills section-pad" id="skills">
          <Reveal>
            <div className="skills-heading">
              <div className="section-marker light"><span>04</span><span>SKILLS</span></div>
              <h2>Fluent in the stack, <em>curious beyond it.</em></h2>
            </div>
            <div className="stack-list">
              <StaggerGrid items={stackGroups} baseDelay={60} renderItem={(group) => (
                <div className="stack-group" key={group.label}>
                  <h3>{group.label}</h3>
                  <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="projects section-pad" id="projects">
          <Reveal>
            <div className="section-head">
              <div className="section-marker"><span>05</span><span>FEATURED PROJECTS</span></div>
              <p>AI products I've designed and built end to end, from data to deployment.</p>
            </div>
            <div className="featured-grid">
              <StaggerGrid items={featuredProjects} baseDelay={140} renderItem={(project, index) => (
                <article className="featured-card" key={index}>
                  <div className="featured-main">
                    <div className="project-number">0{index + 1}</div>
                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <p className="project-text">{project.text}</p>
                    <p className="project-text">{project.intro}</p>
                    <div className="project-stack">
                      <p className="stack-label">Focus</p>
                      <div className="tag-row">{project.focus.split(' · ').map((s) => <span key={s}>{s}</span>)}</div>
                    </div>
                    <div className="project-links">
                      {project.links.map((l) => {
                        const Icon = projectLinkIconMap[l.type] || ExternalLink;
                        return (
                          <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                            <Icon size={15} /> {l.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="featured-capabilities">
                    <p className="features-label">Capabilities</p>
                    <ul>{project.capabilities.map((f) => <li key={f}>{f}</li>)}</ul>
                  </div>
                </article>
              )} />
            </div>
          </Reveal>
        </section>

        {/* ACADEMIC & RESEARCH PROJECTS */}
        <section className="academic-projects section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker light"><span>06</span><span>ACADEMIC & RESEARCH PROJECTS</span></div></div>
            <div className="academic-grid">
              <StaggerGrid items={academicProjects} baseDelay={60} renderItem={(project) => (
                <div className="academic-card" key={project.title}>
                  <h3>{project.title}</h3>
                  <p className="academic-focus">{project.focus}</p>
                  {project.conference && <p className="academic-conference">{project.conference}</p>}
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* RESEARCH */}
        <section className="research section-pad" id="research">
          <Reveal>
            <div className="research-intro">
              <div className="section-marker light"><span>07</span><span>RESEARCH</span></div>
              <h2>{research.heading}</h2>
              <p>{research.text}</p>
              <div className="research-interests">
                <p className="interests-label">Research Areas</p>
                <div className="tag-row">{research.areas.map((i) => <span key={i}>{i}</span>)}</div>
              </div>
            </div>
            <div className="pipeline">
              <div className="pipeline-label">CURRENT RESEARCH DIRECTION</div>
              <h3>{research.direction}</h3>
              <p className="pipeline-text">{research.directionText}</p>
              <div className="flow">
                {research.pipeline.map((step, i) => (
                  <div className="flow-step" key={step}>
                    <span>0{i + 1}</span>
                    <strong>{step}</strong>
                    {i < research.pipeline.length - 1 && <ChevronRight className="flow-arrow" size={20} />}
                  </div>
                ))}
              </div>
              <p className="research-foot">{research.closing}</p>
            </div>
          </Reveal>
        </section>

        {/* RESEARCH INTERESTS */}
        <section className="research-interests-section section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>08</span><span>RESEARCH INTERESTS</span></div></div>
            <div className="stack-list interests-list">
              <StaggerGrid items={researchInterests} baseDelay={60} renderItem={(group) => (
                <div className="stack-group" key={group.label}>
                  <h3>{group.label}</h3>
                  <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* RESEARCH EXPERIENCE */}
        <section className="research-exp section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>09</span><span>RESEARCH EXPERIENCE</span></div></div>
            <div className="research-exp-card">
              <div className="research-exp-left">
                <GraduationCap size={28} />
                <h3>{researchExperience.role}</h3>
                <p className="experience-company">{researchExperience.org}</p>
                <p className="experience-period">{researchExperience.period}</p>
                <p>{researchExperience.text}</p>
                <p className="experience-note">{researchExperience.note}</p>
              </div>
              <div className="research-exp-right">
                <p className="features-label">Contributions</p>
                <ul>{researchExperience.contributions.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* PUBLICATIONS */}
        <section className="publications section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>10</span><span>PUBLICATIONS</span></div></div>
            <div className="publication-list">
              <StaggerGrid items={publications} baseDelay={60} renderItem={(pub, i) => (
                <div className="publication-item" key={i}>
                  <span className="pub-number">0{i + 1}</span>
                  <div><h3>{pub.title}</h3><p>{pub.detail}</p></div>
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* HOW I BUILD */}
        <section className="process section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>11</span><span>HOW I BUILD</span></div></div>
            <h2 className="process-heading">How I <em>Build.</em></h2>
            <div className="process-flow">
              <StaggerGrid items={processSteps} baseDelay={80} renderItem={(step) => (
                <div className="process-step" key={step.num}>
                  <span className="process-num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* BEYOND AI */}
        <section className="beyond-ai section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>12</span><span>BEYOND AI</span></div></div>
            <div className="beyond-ai-card">
              <p className="beyond-ai-intro">{beyondAI.intro}</p>
              <p className="interests-label">{beyondAI.label}</p>
              <div className="tag-row">{beyondAI.areas.map((a) => <span key={a}>{a}</span>)}</div>
              <p className="beyond-ai-closing">{beyondAI.closing}</p>
            </div>
          </Reveal>
        </section>

        {/* CURRENTLY */}
        <section className="current-focus section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>13</span><span>CURRENTLY</span></div></div>
            <h2 className="focus-heading">What I'm Working <em>On</em></h2>
            <div className="focus-grid currently-grid">
              <StaggerGrid items={currentFocus} baseDelay={80} renderItem={(item) => (
                <div className="focus-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* CAREER FOCUS */}
        <section className="career-focus section-pad">
          <Reveal>
            <div className="section-marker light"><span>14</span><span>CAREER FOCUS</span></div>
            <div className="career-focus-card">
              <div className="tag-row">{careerFocus.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <p className="career-statement-lead">{careerFocus.statementLead}</p>
              <p className="career-statement">{careerFocus.statement}</p>
            </div>
          </Reveal>
        </section>

        {/* EDUCATION */}
        <section className="education section-pad" id="education">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>15</span><span>EDUCATION</span></div></div>
            <div className="education-list">
              <StaggerGrid items={education} baseDelay={100} renderItem={(item) => (
                <div className="education-item" key={item.institution}>
                  <GraduationCap size={20} className="education-icon" />
                  <div className="education-content">
                    <h3>{item.institution}</h3>
                    <p className="experience-company">{item.degree}{item.major && ` — ${item.major}`}</p>
                    <div className="education-meta">
                      {item.period && <span>{item.period}</span>}
                      {item.meta && <span>{item.meta}</span>}
                    </div>
                    {item.text && <p>{item.text}</p>}
                  </div>
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* ONLINE PRESENCE */}
        <section className="online-presence section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>16</span><span>ONLINE</span></div></div>
            <div className="online-grid">
              <StaggerGrid items={onlinePresence} baseDelay={100} renderItem={(item) => {
                const Icon = onlineIconMap[item.icon] || ExternalLink;
                return (
                  <a className="online-card" key={item.label} href={item.url} target="_blank" rel="noreferrer">
                    <Icon size={24} />
                    <h3>{item.label}</h3>
                    <p className="online-handle">{item.handle}</p>
                    <p>{item.text}</p>
                    <span className="online-cta">Visit <ArrowUpRight size={14} /></span>
                  </a>
                );
              }} />
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section className="contact section-pad" id="contact">
          <Reveal>
            <div className="contact-inner">
              <div className="section-marker light"><span>17</span><span>CONTACT</span></div>
              <h2>{contact.heading}</h2>
              <ul className="contact-options">{contact.options.map((o) => <li key={o}>{o}</li>)}</ul>
              <p className="contact-cta">{contact.cta}</p>
              <a className="contact-email" href={`mailto:${contact.email}`}>{contact.email} <ArrowUpRight size={21} /></a>
              <div className="socials">
                <a href={links.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
                <a href={links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
                <a href={links.kaggle} target="_blank" rel="noreferrer"><ExternalLink size={18} /> Kaggle</a>
                <a href={`mailto:${contact.email}`}><Mail size={18} /> Email</a>
              </div>
              <a className="button button-fill resume-btn" href={links.cv} target="_blank" rel="noopener noreferrer"><Download size={17} /> Download CV</a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer>
        <div className="wordmark"><span>MTZ</span><i>·</i><em>AI ENGINEER</em></div>
        <div className="footer-info">
          <p>Md Tahmid Zoayed — AI Engineer · CBO</p>
          <p>Building intelligent systems for real-world problems.</p>
        </div>
        <span>© 2026 Md Tahmid Zoayed</span>
      </footer>
    </div>
  );
}

export default App;
