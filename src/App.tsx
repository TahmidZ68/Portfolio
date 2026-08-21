import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight, ArrowUpRight, BriefcaseBusiness, ChevronRight, Cpu,
  Download, ExternalLink, Github, GraduationCap, Linkedin, Mail,
  Menu, MoveUpRight, Quote, Rocket, Workflow, X, type LucideIcon,
} from 'lucide-react';
import {
  about, contact, currentFocus, currentRole, differentiators, entrepreneurship,
  experience, heroTags, intro, navItems, philosophy, processSteps, projects,
  publications, research, researchCallout, researchExperience, stackGroups, whatIDo,
} from '@/content';

const iconMap: Record<string, LucideIcon> = {
  Cpu, Workflow, Rocket, BriefcaseBusiness,
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
        <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}><span>MTZ</span><i>·</i><em>AI / BUSINESS</em></a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={activeSection === item.href.slice(1) ? 'nav-active' : ''}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let's Build Something <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-btn" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero section-pad" id="home">
          <div className="hero-grid">
            <div className="hero-copy reveal">
              <p className="kicker"><span className="status-dot" /> Currently CBO & AI Engineer at <strong>Axios Station</strong></p>
              <p className="hero-index">01 <span>/</span> INTRODUCING</p>
              <h1>Md Tahmid Zoayed</h1>
              <p className="hero-headline">I Build AI-Powered Solutions for Real-World Problems.</p>
              <p className="hero-lede">I'm an AI Engineer, CBO, researcher, and technology entrepreneur focused on building intelligent systems, AI-powered products, automation workflows, and data-driven solutions.</p>
              <div className="hero-tags">{heroTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="hero-actions">
                <a className="button button-fill" href="#projects">View My Work <ArrowDownRight size={17} /></a>
                <a className="button button-quiet" href="#contact">Let's Connect <ArrowUpRight size={17} /></a>
              </div>
            </div>
            <div className="hero-visual reveal reveal-delay" ref={heroRef} style={{ transition: 'transform .2s ease' }}>
              <div className="portrait-frame">
                <img src="/images/1761230135831.png" alt="Md Tahmid Zoayed" />
                <div className="portrait-label"><span>MD TAHMID ZOAYED</span><span>AI ENGINEER / CBO</span></div>
              </div>
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="hero-note"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={18} /></div>
            </div>
          </div>
          <div className="hero-bottom"><span>AI ENGINEERING</span><span>+</span><span>RESEARCH</span><span>+</span><span>BUSINESS</span><span>→</span><span>AI PRODUCTS</span></div>
        </section>

        {/* INTRO */}
        <section className="statement section-pad" id="intro">
          <Reveal>
            <div className="section-marker"><span>02</span><span>INTRO</span></div>
            <div className="statement-layout">
              <h2>{intro.lead}</h2>
              <div className="statement-body">
                {intro.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ABOUT */}
        <section className="about section-pad" id="about">
          <Reveal>
            <div className="section-marker"><span>03</span><span>ABOUT — WHO I AM</span></div>
            <div className="about-layout">
              <h2>Who I Am</h2>
              <div className="about-body">
                {about.paragraphs.map((p, i) => <p key={i} className={p.endsWith('?') ? 'about-question' : ''}>{p}</p>)}
              </div>
            </div>
          </Reveal>
        </section>

        {/* WHAT I DO */}
        <section className="whatido section-pad" id="work">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>04</span><span>WHAT I DO</span></div></div>
            <div className="pillar-grid">
              <StaggerGrid items={whatIDo} baseDelay={100} renderItem={(item, i) => {
                const Icon = iconMap[item.icon] || Cpu;
                return (
                  <div className="pillar" key={i}>
                    <Icon size={28} />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    {item.tags && <div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
                  </div>
                );
              }} />
            </div>
            <div className="research-callout">
              <h3>Research</h3>
              <p>{researchCallout.text}</p>
              <div className="tag-row">{researchCallout.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </Reveal>
        </section>

        {/* CURRENT ROLE — Axios Station */}
        <section className="current-role section-pad">
          <Reveal>
            <div className="role-card">
              <div className="role-main">
                <div className="section-marker light"><span>05</span><span>CURRENT ROLE</span></div>
                <p className="role-kicker">{currentRole.company} / {currentRole.role}</p>
                <p className="role-period">{currentRole.period}</p>
                <h2>Where ideas become <em>products.</em></h2>
                <p>{currentRole.text}</p>
                <a className="button button-light" href={currentRole.url || '#contact'} target="_blank" rel="noreferrer">{currentRole.link} <ArrowUpRight size={17} /></a>
              </div>
              <div className="role-aside">
                <Quote size={31} />
                <blockquote>{currentRole.pullQuote}</blockquote>
                <div className="role-list">
                  {currentRole.workOn.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* EXPERIENCE */}
        <section className="experience section-pad" id="experience">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>06</span><span>EXPERIENCE</span></div></div>
            <div className="experience-list">
              <StaggerGrid items={experience} baseDelay={120} renderItem={(item, i) => (
                <div className="experience-item" key={i}>
                  <div className="experience-period">{item.period}</div>
                  <div className="experience-content">
                    <h3>{item.role}</h3>
                    <p className="experience-company">{item.company}</p>
                    <p>{item.text}</p>
                    <div className="tag-row">{item.skills.map((s) => <span key={s}>{s}</span>)}</div>
                    {item.note && <p className="experience-note">{item.note}</p>}
                  </div>
                  <BriefcaseBusiness size={19} />
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* ENTREPRENEURSHIP */}
        <section className="entrepreneurship section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>07</span><span>ENTREPRENEURSHIP</span></div></div>
            <div className="venture-grid">
              <StaggerGrid items={entrepreneurship} baseDelay={120} renderItem={(v, i) => (
                <div className="venture-card" key={i}>
                  <p className="venture-tag">{v.tag}</p>
                  <h3>{v.name}</h3>
                  <p>{v.text}</p>
                  <p className="venture-goal">{v.goal}</p>
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="projects section-pad" id="projects">
          <Reveal>
            <div className="section-head">
              <div className="section-marker"><span>08</span><span>FEATURED PROJECTS</span></div>
              <p>The best 6. Not everything — just the work that proves the point.</p>
            </div>
            <div className="project-grid">
              <StaggerGrid items={projects} baseDelay={80} renderItem={(project, index) => (
                <article className="project-card" key={index}>
                  <div className="project-number">0{index + 1}</div>
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-text">{project.text}</p>
                  {project.features.length > 0 && (
                    <div className="project-features">
                      <p className="features-label">Features</p>
                      <ul>{project.features.map((f) => <li key={f}>{f}</li>)}</ul>
                    </div>
                  )}
                  {project.note && <p className="project-note">{project.note}</p>}
                  <div className="project-stack">
                    <p className="stack-label">Stack</p>
                    <div className="tag-row">{project.stack.map((s) => <span key={s}>{s}</span>)}</div>
                  </div>
                  {project.links.length > 0 && (
                    <div className="project-links">{project.links.map((l) => <a key={l} href="#contact">{l} <ExternalLink size={13} /></a>)}</div>
                  )}
                </article>
              )} />
            </div>
          </Reveal>
        </section>

        {/* RESEARCH */}
        <section className="research section-pad" id="research">
          <Reveal>
            <div className="research-intro">
              <div className="section-marker light"><span>09</span><span>RESEARCH</span></div>
              <h2>{research.heading}</h2>
              <p>{research.text}</p>
              <div className="research-interests">
                <p className="interests-label">Research Interests</p>
                <div className="tag-row">{research.interests.map((i) => <span key={i}>{i}</span>)}</div>
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

        {/* RESEARCH EXPERIENCE */}
        <section className="research-exp section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>10</span><span>RESEARCH EXPERIENCE</span></div></div>
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
            <div className="section-head"><div className="section-marker"><span>11</span><span>PUBLICATIONS</span></div></div>
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

        {/* TECH STACK */}
        <section className="skills section-pad" id="skills">
          <Reveal>
            <div className="skills-heading">
              <div className="section-marker light"><span>12</span><span>TECHNOLOGY STACK</span></div>
              <h2>Fluent in the stack, <em>curious beyond it.</em></h2>
            </div>
            <div className="stack-list">
              <StaggerGrid items={stackGroups} baseDelay={80} renderItem={(group) => (
                <div className="stack-group" key={group.label}>
                  <h3>{group.label}</h3>
                  <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* HOW I THINK */}
        <section className="process section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>13</span><span>HOW I THINK</span></div></div>
            <h2 className="process-heading">I Don't Start With AI.<br />I Start With the <em>Problem.</em></h2>
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

        {/* WHAT MAKES ME DIFFERENT */}
        <section className="differentiators section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>14</span><span>WHAT MAKES ME DIFFERENT</span></div></div>
            <h2 className="diff-heading">I Understand <em>Both Sides.</em></h2>
            <div className="diff-grid">
              <StaggerGrid items={differentiators} baseDelay={100} renderItem={(d) => (
                <div className="diff-card" key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* PERSONAL PHILOSOPHY */}
        <section className="philosophy section-pad">
          <Reveal>
            <div className="section-marker"><span>15</span><span>PERSONAL PHILOSOPHY</span></div>
            <div className="philosophy-layout">
              <h2>{philosophy.heading}</h2>
              <div>
                <p className="big-quote">{philosophy.paragraphs[0]}</p>
                <p>{philosophy.paragraphs[1]}</p>
                <p>{philosophy.paragraphs[2]}</p>
                <p className="philosophy-final">{philosophy.paragraphs[3]}</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CURRENT FOCUS */}
        <section className="current-focus section-pad">
          <Reveal>
            <div className="section-head"><div className="section-marker"><span>16</span><span>CURRENT FOCUS</span></div></div>
            <h2 className="focus-heading">What I'm Building <em>Next</em></h2>
            <div className="focus-grid">
              <StaggerGrid items={currentFocus} baseDelay={80} renderItem={(item) => (
                <div className="focus-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              )} />
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section className="contact section-pad" id="contact">
          <Reveal>
            <div className="contact-inner">
              <div className="section-marker light"><span>17</span><span>CONTACT</span></div>
              <h2>{contact.heading}</h2>
              <p className="contact-intro">{contact.intro}</p>
              <ul className="contact-options">{contact.options.map((o) => <li key={o}>{o}</li>)}</ul>
              <p className="contact-closing">{contact.closing}</p>
              <p className="contact-cta">{contact.cta}</p>
              <a className="contact-email" href={`mailto:${contact.email}`}>{contact.email} <ArrowUpRight size={21} /></a>
              <div className="socials">
                <a href={`https://github.com/${contact.github}`} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
                <a href={`https://www.kaggle.com/${contact.kaggle}`} target="_blank" rel="noreferrer"><ExternalLink size={18} /> Kaggle</a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
                <a href={`mailto:${contact.email}`}><Mail size={18} /> Email</a>
              </div>
              <a className="button button-fill resume-btn" href="/resume.pdf" download><Download size={17} /> Download Resume</a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer>
        <div className="wordmark"><span>MTZ</span><i>·</i><em>AI / BUSINESS</em></div>
        <div className="footer-info">
          <p>Md Tahmid Zoayed — AI Engineer · CBO · Researcher · Entrepreneur</p>
          <p>Building intelligent solutions for real-world problems.</p>
        </div>
        <span>© 2026 Md Tahmid Zoayed</span>
      </footer>
    </div>
  );
}

export default App;
