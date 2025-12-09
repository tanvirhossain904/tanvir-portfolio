"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowUpRight, 
  BookOpen, 
  Download, 
  Send, 
  CheckCircle, 
  Loader2 
} from 'lucide-react';

// Import the data we created in Step 2
import { DATA } from '@/data/resume';

// --- Helper Components ---

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="max-h-[85vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ href, children, onClick, active }: { href: string, children: React.ReactNode, onClick: () => void, active: boolean }) => (
  <a 
    href={href} 
    onClick={(e) => {
      e.preventDefault();
      onClick();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }}
    className={`text-sm font-medium transition-colors hover:text-emerald-400 ${active ? 'text-emerald-400' : 'text-slate-400'}`}
  >
    {children}
  </a>
);

const SectionTitle = ({ subtitle, title }: { subtitle: string, title: string }) => (
  <div className="mb-12">
    <span className="text-emerald-400 font-mono text-sm tracking-wider uppercase mb-2 block">{subtitle}</span>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{title}</h2>
    <div className="w-20 h-1 bg-emerald-500 mt-4 rounded-full"></div>
  </div>
);

const Button = ({ children, variant = 'primary', icon: Icon, className = '', ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-lg shadow-emerald-500/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/20",
    outline: "bg-transparent border border-slate-700 hover:border-emerald-400 text-slate-400 hover:text-emerald-400"
  };

  return (
    <button className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4" />}
    </button>
  );
};

// --- Main Portfolio Logic ---

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [selectedProject, setSelectedProject] = useState<typeof DATA.projects[0] | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<typeof DATA.articles[0] | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'expertise', 'work', 'blog', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };
  
  const handleLiveSiteClick = (projectId: number) => {
    window.open(`https://live-demo.tanvirhossain.com/project-${projectId}`, '_blank');
    setSelectedProject(null);
  };
  
  const handleViewCodeClick = (projectId: number) => {
    window.open(`https://github.com/tanvirh/repo-${projectId}`, '_blank');
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500/30">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold tracking-tighter text-slate-100 flex items-center gap-2">
            <Terminal className="text-emerald-500 w-6 h-6" />
            <span>Tanvir<span className="text-emerald-500">H</span></span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#home" active={activeSection === 'home'} onClick={() => setActiveSection('home')}>Home</NavLink>
            <NavLink href="#expertise" active={activeSection === 'expertise'} onClick={() => setActiveSection('expertise')}>Expertise</NavLink>
            <NavLink href="#work" active={activeSection === 'work'} onClick={() => setActiveSection('work')}>Work</NavLink>
            <NavLink href="#blog" active={activeSection === 'blog'} onClick={() => setActiveSection('blog')}>Insights</NavLink>
            <Button variant="primary" className="!py-2 !px-4 text-sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>
              Hire Me
            </Button>
          </div>

          <button className="md:hidden text-slate-100" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl">
            <NavLink href="#home" active={activeSection === 'home'} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
            <NavLink href="#expertise" active={activeSection === 'expertise'} onClick={() => setIsMobileMenuOpen(false)}>Expertise</NavLink>
            <NavLink href="#work" active={activeSection === 'work'} onClick={() => setIsMobileMenuOpen(false)}>Work</NavLink>
            <NavLink href="#blog" active={activeSection === 'blog'} onClick={() => setIsMobileMenuOpen(false)}>Insights</NavLink>
          </div>
        )}
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-4xl">
              
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Available for Senior Roles & Consulting
                </div>
              </FadeIn>
              
              <FadeIn delay={100}>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-100 leading-tight mb-6">
                  Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Digital Engines</span> for Enterprise Growth.
                </h1>
              </FadeIn>
              
              <FadeIn delay={200}>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                  I am {DATA.profile.name}, a {DATA.profile.role}. I transform complex business requirements into scalable, high-performance web architectures.
                </p>
              </FadeIn>
              
              <FadeIn delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                  <Button variant="primary" icon={ChevronRight} onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth'})}>
                    View Selected Work
                  </Button>
                  <Button variant="secondary" icon={Download}>
                    Download Résumé
                  </Button>
                </div>
              </FadeIn>

              {/* Stats Grid */}
              <FadeIn delay={400}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-8">
                  {DATA.stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-3xl font-bold text-slate-100 mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* EXPERTISE SECTION */}
        <section id="expertise" className="py-24 bg-slate-900/50">
          <div className="container mx-auto px-6">
            <SectionTitle subtitle="My Tech Stack" title="Technical Architecture" />
            
            <div className="grid md:grid-cols-3 gap-8">
              {DATA.skills.map((skill, idx) => (
                <FadeIn key={idx} delay={idx * 100}>
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group h-full">
                    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-4">{skill.category}</h3>
                    <ul className="space-y-3">
                      {skill.techs.map((tech, tIdx) => (
                        <li key={tIdx} className="flex items-center text-slate-400 text-sm">
                          <div className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full mr-3"></div>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* WORK SECTION */}
        <section id="work" className="py-24">
          <div className="container mx-auto px-6">
            <SectionTitle subtitle="Case Studies" title="Selected Projects" />

            <div className="space-y-24">
              {DATA.projects.map((project, idx) => (
                <FadeIn key={idx}>
                  <div className={`flex flex-col gap-12 ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
                    
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative group cursor-pointer" onClick={() => setSelectedProject(project)}>
                      <div className="absolute -inset-4 bg-emerald-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 aspect-video">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent flex items-end p-8">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                             <span className="inline-block px-3 py-1 bg-emerald-500 text-slate-900 text-xs font-bold rounded mb-2">
                               {project.type}
                             </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <div className="bg-slate-950/80 backdrop-blur px-4 py-2 rounded-full border border-emerald-500/50 text-emerald-400 font-medium text-sm flex items-center gap-2">
                              View Case Study <ExternalLink className="w-4 h-4" />
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-1/2">
                      <h3 className="text-3xl font-bold text-slate-100 mb-2">{project.title}</h3>
                      <p className="text-emerald-400 font-medium mb-6">{project.client} // {project.summary}</p>
                      
                      <div className="space-y-6 mb-8">
                        <div>
                          <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wide mb-2">The Challenge</h4>
                          <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-red-500/50 pl-4">
                            {project.challenge}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wide mb-2">The Solution</h4>
                          <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-emerald-500/50 pl-4">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-900/50 rounded-lg p-6 mb-8 border border-slate-800">
                        <h4 className="text-sm font-bold text-slate-100 mb-4 flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4 text-emerald-500" /> Key Impact
                        </h4>
                        <ul className="space-y-2">
                          {project.impact.map((item, i) => (
                            <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 bg-emerald-500 rounded-full shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.stack.map((tech, tIdx) => (
                          <span key={tIdx} className="px-3 py-1 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Button variant="outline" onClick={() => setSelectedProject(project)} icon={ExternalLink}>
                        View Project Details
                      </Button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* THOUGHT LEADERSHIP / BLOG */}
        <section id="blog" className="py-24 bg-slate-900/30 border-y border-slate-900">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <SectionTitle subtitle="Written Insights" title="Engineering Thoughts" />
              <a href="#" className="hidden md:flex items-center text-slate-400 hover:text-emerald-400 mb-12 transition-colors">
                Read all articles <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {DATA.articles.map((article, idx) => (
                <FadeIn key={idx} delay={idx * 100}>
                  <article 
                    onClick={() => setSelectedArticle(article)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl h-full hover:border-emerald-500/50 transition-all hover:-translate-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                        <span>{article.date}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-400 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-auto pt-4">
                        {article.tags.map((tag, t) => (
                          <span key={t} className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / CONTACT */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 overflow-hidden relative">
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">
                    Ready to scale your next project?
                  </h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    I am currently accepting new contracts for Q1 2026. Whether you need a system audit, a full architectural overhaul, or a team lead, let's talk.
                  </p>
                  
                  <div className="space-y-4">
                    <a href={`mailto:${DATA.profile.email}`} className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors">
                       <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-emerald-500">
                          <Mail className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="text-xs text-slate-500 uppercase">Email Me</div>
                          <div className="font-medium">{DATA.profile.email}</div>
                       </div>
                    </a>
                    <a href={DATA.profile.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors">
                       <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-emerald-500">
                          <Linkedin className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="text-xs text-slate-500 uppercase">Connect</div>
                          <div className="font-medium">LinkedIn Profile</div>
                       </div>
                    </a>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                  {formStatus === 'success' ? (
                     <div className="h-full flex flex-col items-center justify-center text-center py-10">
                        <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-slate-400">I'll get back to you within 24 hours.</p>
                        <Button variant="outline" className="mt-6" onClick={() => setFormStatus('idle')}>
                           Send Another
                        </Button>
                     </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                        <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                        <input required type="email" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="john@company.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                        <textarea required rows={4} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Tell me about your project..."></textarea>
                      </div>
                      <Button type="submit" className="w-full" disabled={formStatus === 'submitting'}>
                        {formStatus === 'submitting' ? (
                           <> <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending... </>
                        ) : (
                           <> Send Message <Send className="w-4 h-4 ml-2" /> </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-950 border-t border-slate-900 py-12">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Tanvir Hossain. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href={DATA.profile.socials.github} className="text-slate-400 hover:text-emerald-400 transition-colors"><Github className="w-5 h-5" /></a>
              <a href={DATA.profile.socials.linkedin} className="text-slate-400 hover:text-emerald-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </footer>
      </main>

      {/* PROJECT MODAL */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div>
             <div className="relative h-64 md:h-80">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                   <div className="flex gap-2 mb-3">
                      <span className="bg-emerald-500 text-slate-900 text-xs font-bold px-2 py-1 rounded">{selectedProject.type}</span>
                   </div>
                   <h2 className="text-3xl md:text-4xl font-bold text-white">{selectedProject.title}</h2>
                </div>
             </div>
             <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                   <div className="flex-1 space-y-6">
                      <div>
                         <h3 className="text-lg font-bold text-white mb-2">Project Overview</h3>
                         <p className="text-slate-400 leading-relaxed">{selectedProject.fullDescription}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wide mb-2">Challenge</h4>
                            <p className="text-slate-400 text-sm">{selectedProject.challenge}</p>
                         </div>
                         <div>
                            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wide mb-2">Solution</h4>
                            <p className="text-slate-400 text-sm">{selectedProject.solution}</p>
                         </div>
                      </div>

                      <div>
                         <h3 className="text-lg font-bold text-white mb-3">Technical Impact</h3>
                         <ul className="space-y-2">
                            {selectedProject.impact.map((item, i) => (
                               <li key={i} className="flex items-start gap-2 text-slate-300">
                                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                  <span>{item}</span>
                               </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                   
                   <div className="w-full md:w-64 space-y-6">
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                         <h4 className="text-sm font-bold text-white mb-3">Technologies</h4>
                         <div className="flex flex-wrap gap-2">
                            {selectedProject.stack.map((tech) => (
                               <span key={tech} className="text-xs bg-slate-900 text-slate-300 border border-slate-700 px-2 py-1 rounded">
                                  {tech}
                               </span>
                            ))}
                         </div>
                      </div>
                      <Button 
                        className="w-full" 
                        variant="primary"
                        icon={ExternalLink}
                        onClick={() => handleLiveSiteClick(selectedProject.id)}
                      >
                        Visit Live Site
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        icon={Github}
                        onClick={() => handleViewCodeClick(selectedProject.id)}
                      >
                        View Code
                      </Button>
                      <p className="text-xs text-slate-500 italic pt-2 text-center">
                        (Links open simulated external tabs)
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </Modal>

      {/* ARTICLE MODAL */}
      <Modal isOpen={!!selectedArticle} onClose={() => setSelectedArticle(null)}>
        {selectedArticle && (
           <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 text-sm text-emerald-400 mb-4">
                 <span>{selectedArticle.date}</span>
                 <span>•</span>
                 <span>{selectedArticle.readTime}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{selectedArticle.title}</h2>
              <div className="prose prose-invert max-w-none">
                 {selectedArticle.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-slate-300 leading-relaxed text-lg mb-6">
                        {paragraph}
                    </p>
                 ))}
              </div>
           </div>
        )}
      </Modal>

    </div>
  );
}