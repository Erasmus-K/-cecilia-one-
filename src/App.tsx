/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Droplet, 
  Leaf, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowRight, 
  Waves, 
  CloudRain, 
  Users, 
  ShieldCheck,
  ShieldAlert,
  Scale,
  Menu,
  X,
  ChevronDown,
  Search,
  FileText,
  Globe,
  Building2,
  Network,
  Zap,
  CheckCircle2,
  Globe2,
  Download,
  Loader2,
  Facebook,
  Linkedin
} from 'lucide-react';
import { submitStakeholderBriefing } from './lib/submitStakeholderBriefing';

// --- Static knowledge index (curated topics; no external API) ---
type KnowledgeEntry = { title: string; summary: string; tags: string[]; type: string };

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    title: "Impacts of Climate Change on the Sudd Wetland: WNSC & Wake Forest Global Conference",
    summary: "Conference proceedings on climate drivers, wetland hydrology, and regional adaptation priorities.",
    tags: ["climate", "sudd", "conference", "wetland", "wake forest"],
    type: "Conference report",
  },
  {
    title: "Hydrological Shifts in the Sudd Wetlands: A Decadal Analysis",
    summary: "Technical synthesis of long-term flow and inundation patterns across the Sudd.",
    tags: ["hydrology", "decadal", "sudd", "inundation", "flow"],
    type: "Technical paper",
  },
  {
    title: "Impact of Local Oil Extraction on Surface Water Quality (2020–2025)",
    summary: "Monitoring-oriented assessment linking extractive activity to surface water chemistry.",
    tags: ["oil", "water quality", "environment", "pollution", "monitoring"],
    type: "Impact study",
  },
  {
    title: "Feasibility Study on the Resumption of the Jonglei Canal Project",
    summary: "Policy-oriented review of engineering, environmental, and transboundary considerations.",
    tags: ["jonglei", "canal", "feasibility", "policy", "transboundary"],
    type: "Government report",
  },
  {
    title: "WNSC Submits White Paper on Sudd Basin Management to Regional Stakeholders",
    summary: "Stakeholder-facing summary of basin management options and evidence gaps.",
    tags: ["white paper", "sudd", "basin", "stakeholders", "management"],
    type: "Policy brief",
  },
  {
    title: "Joint Expedition: Wetland Biomass Survey",
    summary: "Field campaign notes on vegetation structure and seasonal biomass in key Sudd transects.",
    tags: ["biomass", "wetland", "survey", "biodiversity", "field"],
    type: "Research note",
  },
  {
    title: "Sudd Wetland Hybrid Global Conference — Press Release",
    summary: "Outcomes and commitments from the hybrid global conference on Sudd conservation.",
    tags: ["conference", "press", "sudd", "global", "wetland"],
    type: "Press release",
  },
];

/** Official mark (Cloudinary); used in header and footer. */
const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61589933069155',
  linkedin: 'https://www.linkedin.com/in/white-nile-and-sudd-center-b3b57140a/',
} as const;

const WNSC_LOGO_URL =
  "https://res.cloudinary.com/dpskjlq9m/image/upload/f_auto,q_auto/v1776848787/Screenshot_2026-04-22_at_12-06-13_The_White_Nile_And_Dudd_Centre-2.pdf_a4kdtd.png";

// --- Components ---

const FadeInSection = ({ children, delay = 0, y = 20 }: { children: ReactNode, delay?: number, y?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [matched, setMatched] = useState<KnowledgeEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { search } = useLocation();

  const performSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) {
      setError("Please enter a search term.");
      setMatched(null);
      return;
    }

    setError(null);
    const terms = trimmed.toLowerCase().split(/\s+/).filter(Boolean);
    const hits = KNOWLEDGE_BASE.filter((entry) => {
      const haystack = `${entry.title} ${entry.summary} ${entry.tags.join(" ")}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
    setMatched(hits);
  };

  useEffect(() => {
    const params = new URLSearchParams(search);
    const q = params.get("q");
    if (q) {
      setQuery(q);
      performSearch(q);

      const element = document.getElementById("research-search");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [search]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <section className="bg-white py-24 border-t border-slate-100" id="research-search">
      <div className="content-section">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-water-blue/10 border border-water-blue/20 text-xs font-bold uppercase tracking-widest text-water-blue mb-6">
            <Search size={14} /> Knowledge repository
          </div>
          <h2 className="text-4xl font-bold text-water-dark mb-6">Explore the WNSC knowledge base</h2>
          <p className="text-slate-600 text-lg">
            Search curated titles and topics from our scientific reports, feasibility studies, and environmental assessments. For full documents, use the publications list on the Research page or contact the secretariat.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: Jonglei, Sudd, hydrology, flood, oil, climate..."
              className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-lg focus:ring-4 focus:ring-water-blue/10 focus:border-water-blue transition-all outline-none pl-14"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-water-blue transition-colors" size={24} />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3.5 bg-water-blue text-white font-bold rounded-[1.5rem] hover:bg-water-dark transition-all flex items-center gap-2"
            >
              Search
            </button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3"
              >
                <ShieldAlert size={18} /> {error}
              </motion.div>
            )}

            {matched !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-water-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 text-water-blue font-bold uppercase tracking-widest text-xs">
                    <FileText size={18} /> Matching resources
                  </div>
                  {matched.length === 0 ? (
                    <p className="text-slate-600 leading-relaxed">
                      No entries matched that query. Try broader keywords (e.g. “Sudd”, “hydrology”, “Jonglei”) or browse the publications on the Research page.
                    </p>
                  ) : (
                    <ul className="space-y-6 text-slate-700">
                      {matched.map((item) => (
                        <li key={item.title} className="border-b border-slate-200/80 pb-6 last:border-0 last:pb-0">
                          <p className="text-[10px] font-black uppercase tracking-widest text-nile-blue mb-1">{item.type}</p>
                          <p className="font-bold text-water-dark text-lg leading-snug mb-2">{item.title}</p>
                          <p className="text-slate-600 leading-relaxed text-sm">{item.summary}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                    <span>Curated WNSC index — not an automated web search</span>
                    <button type="button" onClick={() => setMatched(null)} className="hover:text-water-blue transition-colors">
                      Clear results
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const GlobalSearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Navigate to research page with query param
    navigate(`/research?q=${encodeURIComponent(query)}#research-search`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-slate-50/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm z-30"
    >
      <div className="content-section !py-0">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-nile-blue transition-colors">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the WNSC repository: reports, data, policy..."
            className="w-full pl-12 pr-20 py-2.5 bg-white/50 border border-slate-200 rounded-full text-sm focus:outline-none focus:bg-white focus:border-nile-blue transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest hidden sm:inline">Repository</span>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Research', path: '/research' },
    { name: 'Partnerships', path: '/partnerships' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="WNSC Home">
          <div className="relative">
            <img 
              src={WNSC_LOGO_URL} 
              alt="WNSC Logo" 
              className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-black text-2xl tracking-tighter text-nile-blue uppercase">WNSC</span>
            <span className="text-[10px] font-display font-bold text-wetland-green uppercase tracking-[0.2em]">Water is Life</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="text-sm font-semibold text-slate-600 hover:text-nile-blue transition-colors relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-nile-blue transition-all duration-300 group-hover:w-full" />
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors relative group py-2 ${
                    location.pathname === link.path ? 'text-nile-blue' : 'text-slate-600 hover:text-nile-blue'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-nile-blue transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : 'w-0'}`} />
                </Link>
              )
            ))}
          </div>

          <Link 
            to="/contact" 
            className="px-8 py-3 bg-nile-blue text-white text-sm font-bold rounded-full shadow-lg hover:shadow-nile-blue/20 transform transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            Get Involved
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0, originY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                link.path.startsWith('/#') ? (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className="w-full text-left py-4 px-4 text-lg font-bold text-slate-700 hover:text-nile-blue hover:bg-slate-50 rounded-xl transition-all"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`w-full py-4 px-4 text-lg font-bold rounded-xl transition-all ${
                      location.pathname === link.path 
                        ? 'text-nile-blue bg-nile-blue/5' 
                        : 'text-slate-700 hover:text-nile-blue hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Link 
                  to="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center py-5 bg-nile-blue text-white rounded-2xl font-bold transform transition-all active:scale-95"
                >
                  Get Involved
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-water-dark text-white">
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 sm:pt-20 sm:pb-10">
      <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 lg:grid-cols-12 lg:gap-14 lg:pb-16">
        <div className="lg:col-span-5">
          <Link
            to="/"
            className="mb-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6 group"
            aria-label="WNSC Home"
          >
            <div className="shrink-0 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-white/20">
              <img
                src={WNSC_LOGO_URL}
                alt="The White Nile and The Sudd Centre"
                className="h-12 w-auto max-h-14 max-w-[220px] object-contain object-left"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 leading-none">
              <span className="font-display font-black text-2xl tracking-tighter text-white uppercase transition-colors group-hover:text-water-light">
                WNSC
              </span>
              <span className="mt-2 block text-[10px] font-display font-bold uppercase tracking-[0.22em] text-water-light/70">
                Water is Life
              </span>
            </div>
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-water-light/70">
            National think tank dedicated to the scientific study, preservation, and sustainable management of South
            Sudan’s water resources. Bridging indigenous hydrology and evidence-based policy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:info@wnscss.org"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-water-light transition-colors hover:border-nile-blue hover:bg-nile-blue/20 hover:text-white"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="tel:+211914789322"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-water-light transition-colors hover:border-nile-blue hover:bg-nile-blue/20 hover:text-white"
              aria-label="Phone"
            >
              <Phone size={18} />
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Nile+Block+4+Ministry+Complex+Juba+South+Sudan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-water-light transition-colors hover:border-nile-blue hover:bg-nile-blue/20 hover:text-white"
              aria-label="Open location in maps"
            >
              <MapPin size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-water-light transition-colors hover:border-nile-blue hover:bg-nile-blue/20 hover:text-white"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-water-light transition-colors hover:border-nile-blue hover:bg-nile-blue/20 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-12">
          <div>
            <h4 className="mb-5 font-display text-[10px] font-black uppercase tracking-[0.28em] text-white/90">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-water-light/65">
              <li>
                <Link to="/research" className="transition-colors hover:text-white">
                  Scientific Archive
                </Link>
              </li>
              <li>
                <Link to="/research" className="transition-colors hover:text-white">
                  Environmental Impact
                </Link>
              </li>
              <li>
                <Link to="/partnerships" className="transition-colors hover:text-white">
                  Strategic Partners
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-white">
                  Stakeholder Briefing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 font-display text-[10px] font-black uppercase tracking-[0.28em] text-white/90">
              Organization
            </h4>
            <ul className="space-y-3 text-sm text-water-light/65">
              <li>
                <Link to="/about" className="transition-colors hover:text-white">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-white">
                  Leadership
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-white">
                  Media Centre
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 font-display text-[10px] font-black uppercase tracking-[0.28em] text-white/90">
              Headquarters
            </h4>
            <p className="text-sm leading-relaxed text-water-light/65">
              Nile Block 4, Ministry Complex
              <br />
              Juba, South Sudan
            </p>
            <p className="mt-4 text-xs uppercase tracking-widest text-water-light/40">Field liaison +211 914 789 322</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-water-light/45 sm:flex-row sm:items-center sm:pt-10">
        <p className="text-center sm:text-left">© {new Date().getFullYear()} WNSC. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
          <a href="#" className="transition-colors hover:text-white">
            Privacy
          </a>
          <span className="hidden text-white/15 sm:inline" aria-hidden>
            |
          </span>
          <a href="#" className="transition-colors hover:text-white">
            Terms
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const cards = [
    {
      title: "Hydrology Basin",
      icon: <Droplet className="text-water-blue" />,
      desc: "Deep scientific research into the intricate water systems and flow dynamics of the White Nile Basin and the broader Region ecosystem/biodiversity.",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Climate Risks",
      icon: <CloudRain className="text-wetland-green" />,
      desc: "Mitigating Risks associated with unprecedented flooding and persistent seasonal droughts within the White Nile River Corridors.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Sudd Livelihoods",
      icon: <Users className="text-water-dark" />,
      desc: "Ensuring the Sudd Wetlands Continue to support millions of livelihoods and variety of fauna through extensive flora and development and management.",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.img 
          style={{ y, scale }}
          src="https://res.cloudinary.com/dpskjlq9m/image/upload/v1776851456/WhatsApp_Image_2026-04-22_at_12.48.29_PM_mxlbdv.jpg" 
          alt="Sudd Wetlands"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.8]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="content-section relative z-10 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-black uppercase tracking-[0.4em] text-white/90 mb-10 shadow-xl"
            >
              <Droplet size={14} className="text-water-blue" /> National Think Tank
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-display font-black leading-[1.05] mb-10 tracking-tighter drop-shadow-2xl">
              Protecting and Facilitating the <span className="text-white">Natural Lifelines</span> of the White Nile Basin.
            </h1>
            <p className="text-lg md:text-2xl text-white/80 leading-relaxed mb-14 max-w-3xl mx-auto font-light drop-shadow-md">
              Scientific study, preservation, sustainable development and management of the White Nile Basin and Sudd Wetland.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/about" className="px-12 py-5 bg-white text-nile-blue font-bold rounded-2xl hover:bg-nile-blue hover:text-white transition-all flex items-center gap-2 group shadow-2xl hover:-translate-y-1">
                Explore Our Purpose <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="px-12 py-5 bg-white/10 backdrop-blur-xl text-white font-bold rounded-2xl border border-white/30 hover:bg-white/20 transition-all hover:-translate-y-1">
                Stakeholder Portal
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 cursor-pointer group" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] group-hover:text-white transition-colors">Discover</span>
          <ChevronDown size={32} className="animate-bounce group-hover:text-white transition-colors" />
        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-slate-50 py-32 overflow-hidden">
        <div className="content-section">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-24">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-nile-blue">Methodology</span>
              <h2 className="text-5xl font-display font-black text-water-dark mt-4">Pillars of Research</h2>
              <div className="w-20 h-1 bg-nile-blue mx-auto mt-8 rounded-full" />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
            {cards.map((card, idx) => (
              <FadeInSection key={card.title} delay={idx * 0.15}>
                <div className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 card-hover">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-8 flex items-center gap-4 text-white">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        {card.icon}
                      </div>
                      <span className="font-display font-black text-xl uppercase tracking-widest">{card.title}</span>
                    </div>
                  </div>
                  <div className="p-10">
                    <p className="text-slate-600 leading-relaxed mb-8 italic font-light">
                      {card.desc}
                    </p>
                    <Link to="/research" className="text-nile-blue font-black text-xs uppercase tracking-[0.2em] inline-flex items-center gap-3 group/btn">
                      Read Analysis <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Scientific Impact Stats */}
          <FadeInSection delay={0.4}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-20 px-12 bg-white rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nile-blue/20 to-transparent" />
              {[
                { val: "30", label: "DOCUMENTS/PROPOSALS" },
                { val: "100sM", label: "Projects Implemented" },
                { val: "10", label: "Animals/Birds Migration Sustained" },
                { val: "10M", label: "Social Impact" }
              ].map((stat, i) => (
                <div key={i} className="text-center relative group">
                  <div className="text-5xl font-display font-black text-nile-blue mb-3 group-hover:scale-110 transition-transform duration-500">{stat.val}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">{stat.label}</div>
                  {i < 3 && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-slate-100" />}
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Knowledge base search */}
      <SearchSection />

      {/* News & Strategic Updates Section */}
      <section className="py-24 bg-white">
        <div className="content-section">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-nile-blue">Media Centre</span>
              <h2 className="text-4xl font-bold text-water-dark mt-4">Current Scientific Briefings</h2>
            </div>
            <Link to="/research" className="text-nile-blue font-bold flex items-center gap-2 group underline decoration-2 underline-offset-8 decoration-nile-blue/20 hover:decoration-nile-blue transition-all">
              View All Press Releases <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "WNSC Submits White Paper on Sudd Basin Management to Regional Stakeholders",
                category: "Policy",
                date: "April 15, 2026",
                image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Joint Expedition with Global Hydrology Partners Completes Wetland Biomass Survey",
                category: "Research",
                date: "March 28, 2026",
                image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Press Release: Conclusion of the Sudd Wetland Hybrid Global Conference",
                category: "Climate",
                date: "May 2, 2026",
                image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
              }
            ].map((news, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-nile-blue shadow-sm">
                      {news.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 px-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{news.date}</p>
                  <h3 className="text-xl font-bold text-water-dark group-hover:text-nile-blue transition-colors leading-tight">
                    {news.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-wetland-dark py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-wetland-green/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="content-section relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Join the Scientific Vanguard on Wetland</h2>
          <p className="text-wetland-accent text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Collaborating with international and regional centers of excellence to secure a sustainable future for the White Nile Basin.
          </p>
          <Link to="/contact" className="px-10 py-5 bg-white text-wetland-dark font-bold rounded-2xl hover:bg-wetland-accent transition-all inline-block shadow-2xl">
            Register as a Partner
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

const AboutPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 overflow-hidden"
    >
      <section className="bg-water-dark py-40 text-center relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://res.cloudinary.com/dpskjlq9m/image/upload/v1776851456/WhatsApp_Image_2026-04-22_at_12.48.29_PM_mxlbdv.jpg" 
          alt="WNSC Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="content-section relative z-10">
          <FadeInSection y={30}>
            <h1 className="text-7xl md:text-9xl font-display font-black text-white mb-8 tracking-tighter leading-none">Our Mission.</h1>
            <p className="text-water-light/60 text-2xl max-w-2xl mx-auto font-light italic leading-relaxed">
              Defining the future of water management through rigorous science and indigenous wisdom.
            </p>
          </FadeInSection>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Problem Statement */}
      <section className="content-section -mt-16 bg-slate-50">
        <FadeInSection>
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-100 mb-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-nile-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-4xl font-display font-black text-water-dark mb-20 text-center tracking-tight">The Problem Landscape</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {[
                { icon: <ShieldAlert size={32} />, color: "bg-red-50 text-red-600", title: "Environmental Impact", desc: "Oil pollution and unregulated infrastructure have severely damaged natural ecosystems." },
                { icon: <CloudRain size={32} />, color: "bg-amber-50 text-amber-600", title: "Climate Risks", desc: "Unprecedented flooding and persistent droughts driven by global climate shifts." },
                { icon: <Scale size={32} />, color: "bg-slate-50 text-slate-600", title: "Policy Gaps", desc: "Resumption of legacy projects without credible Feasibility Studies (FSs) or ESIAs." }
              ].map((item, i) => (
                <FadeInSection key={i} delay={i * 0.1}>
                  <div className="space-y-6 group">
                    <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm`}>
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-lg leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Mission & Vision */}
      <section className="content-section grid grid-cols-1 md:grid-cols-2 gap-8 py-24">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-water-light p-12 rounded-[3.5rem] border border-water-blue/20 overflow-hidden relative"
        >
          <div className="relative z-10">
            <div className="w-16 h-16 bg-water-blue rounded-3xl flex items-center justify-center text-white mb-8 shadow-lg shadow-water-blue/20">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-bold text-water-dark mb-6">Our Mission</h2>
            <p className="text-water-dark/80 text-lg leading-relaxed">
              To promote sustainable preservation, utilization, development and management of the White Nile Basin, Sudd Wetland and other environmental resources for the benefit of the region and related activities.
            </p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600" 
            className="absolute -bottom-10 -right-10 w-64 h-64 object-cover opacity-10 rounded-full blur-sm"
            alt="Nature Background"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-wetland-accent/30 p-12 rounded-[3.5rem] border border-wetland-green/20 overflow-hidden relative"
        >
          <div className="relative z-10">
            <div className="w-16 h-16 bg-wetland-green rounded-3xl flex items-center justify-center text-white mb-8 shadow-lg shadow-wetland-green/20">
              <Waves size={32} />
            </div>
            <h2 className="text-3xl font-bold text-wetland-dark mb-6">Our Vision</h2>
            <p className="text-wetland-dark/80 text-lg leading-relaxed">
              To be a formal legal entity providing scientific, technical, and professional leadership on water resources to ensure a "people-centered" sustainable future.
            </p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600" 
            className="absolute -bottom-10 -right-10 w-64 h-64 object-cover opacity-10 rounded-full blur-sm"
            alt="Nature Background"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Strategic Vision Section */}
      <section className="bg-slate-50 py-32">
        <div className="content-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <FadeInSection y={40} delay={0.2}>
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-60 h-60 bg-nile-blue/10 rounded-full blur-3xl animate-pulse" />
                <img 
                  src="https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?auto=format&fit=crop&q=80&w=800" 
                  className="rounded-[4rem] shadow-2xl relative z-10 border-8 border-white"
                  alt="Environmental Leadership"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-10 -right-6 bg-white p-8 rounded-3xl shadow-2xl z-20 flex items-center gap-5 border border-slate-50">
                  <div className="w-16 h-16 bg-wetland-green rounded-2xl flex items-center justify-center text-white shadow-xl shadow-wetland-green/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Status</div>
                    <div className="text-lg font-black text-slate-900 leading-none">Active Monitoring</div>
                  </div>
                </div>
              </div>
            </FadeInSection>
            
            <div className="space-y-12">
              <FadeInSection delay={0.3}>
                <h2 className="text-5xl font-display font-black text-water-dark leading-none tracking-tighter">Securing the Sudd: A National Strategic Priority.</h2>
              </FadeInSection>
              
              <FadeInSection delay={0.4}>
                <p className="text-slate-600 text-xl leading-relaxed font-light">
                  The White Nile and Sudd Centre operates as the primary advisory body on South Sudan's hydrological strategic interests. We provide the scientific foundation required for transboundary water negotiations and internal resource management.
                </p>
              </FadeInSection>

              <FadeInSection delay={0.5}>
                <ul className="space-y-6">
                  {[
                    "Real-time hydrological data acquisition",
                    "Environmental and Social Impact Assessments (ESIAs)",
                    "Fisheries and biodiversity conservation strategies"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-700 font-bold text-sm">
                      <div className="w-8 h-8 rounded-full bg-nile-blue/10 flex items-center justify-center text-nile-blue shadow-sm">
                        <Zap size={16} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Leadership Section */}
      <section className="bg-slate-50 py-32 overflow-hidden">
        <div className="content-section">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-24">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-nile-blue">The Collective</span>
              <h2 className="text-5xl font-display font-black text-water-dark mt-4 tracking-tighter">Leadership</h2>
              <p className="text-slate-500 text-lg font-light mt-6 leading-relaxed">
                Tong Deng Anei serves as Executive Director. Joshua Dau Diu serves as Chairman of the Board of Trustees. Isaac Liabwel C. Yol serves as Deputy Chairman of the Board of Trustees. Members of the Board of Trustees provide governance and strategic oversight.
              </p>
              <div className="w-20 h-1 bg-nile-blue mx-auto mt-8 rounded-full" />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <article className="bg-white rounded-[4rem] p-12 md:p-20 border border-slate-100 shadow-sm mb-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-72 h-72 bg-wetland-green/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <img
                    src="/tong-deng-anei.png"
                    alt="Tong Deng Anei, Executive Director"
                    className="w-40 h-40 rounded-[2.5rem] object-cover object-top mb-6 shadow-lg border-4 border-white ring-2 ring-wetland-green/20"
                  />
                  <h3 className="text-3xl font-display font-black text-slate-900 tracking-tight">Tong Deng Anei</h3>
                  <p className="text-wetland-green text-[10px] font-black uppercase tracking-[0.2em] mt-3 mb-4">Executive Director</p>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Food Security and Livelihoods Consultant · Juba, South Sudan
                  </p>
                </div>
                <div className="lg:col-span-8 space-y-6 text-slate-600 text-lg leading-relaxed font-light">
                  <p>
                    Tong Deng Anei is the Executive Director and a founding member of the White Nile and Sudd Centre. He is a Food Security and Livelihoods Consultant based in Juba, South Sudan. Anei has over 20 years of experience designing and implementing humanitarian assistance programmes, having previously worked with the United States Agency for International Development (USAID), the United Nations, and government institutions where he served in two Ministerial positions as State Minister of Culture, Youth and Sports and State Minister of Health.
                  </p>
                  <p>
                    Apart from his work at the White Nile and Sudd Centre, he currently consults with national and international organizations as well as government agencies. His research focuses on the humanitarian crisis and mass starvation in South Sudan. He also received training in Social Science through the Humanitarian Platform Skill-Building Programme, which enabled him to pursue evidence-based research and advance his professional and academic development. Anei holds a Master of Arts in Humanitarian Assistance from Tufts University.
                  </p>
                </div>
              </div>
            </article>
          </FadeInSection>

          <div className="py-14 text-center">
            <h3 className="text-4xl md:text-5xl font-display font-black text-water-dark tracking-tighter">Members of Board of Trustees</h3>
            <div className="w-20 h-1 bg-nile-blue mx-auto mt-6 rounded-full" />
          </div>

          <FadeInSection delay={0.2}>
            <article className="bg-white rounded-[4rem] p-12 md:p-20 border border-slate-100 shadow-sm mb-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-nile-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <img
                    src="/isaac-liabwel-yol.png"
                    alt="Isaac Liabwel C. Yol, Deputy Chairman of the Board of Trustees"
                    className="w-40 h-40 rounded-[2.5rem] object-cover object-top mb-6 shadow-lg border-4 border-white ring-2 ring-nile-blue/20"
                  />
                  <h3 className="text-3xl font-display font-black text-slate-900 tracking-tight">Isaac Liabwel C. Yol</h3>
                  <p className="text-nile-blue text-[10px] font-black uppercase tracking-[0.2em] mt-3 mb-4">Deputy Chairman of Board of Trustees</p>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Former Undersecretary, Ministry of Water Resources and Irrigation · South Sudan
                  </p>
                </div>
                <div className="lg:col-span-8 space-y-6 text-slate-600 text-lg leading-relaxed font-light">
                  <p>
                    Eng. Isaac Liabwel C. Yol, former Undersecretary of the Republic of South Sudan Ministry of Water Resources and Irrigation (2006–2017), holds a BSc. (Hons) in Civil Engineering from the University of Khartoum (1985–1992); a Master of Engineering in Hydraulic Engineering from IHE Delft Institute for Water Education, the Netherlands (1998–1999); and has completed short training courses in Environment, Hydrology, Integrated Water Resources Management (IWRM), and International Water Law.
                  </p>
                  <p>
                    Eng. Isaac Liabwel is bilingual, with proficiency in English and Arabic, and is conversant with knowledge and skills related to water sector planning, governance, and infrastructure. These encompass experience in water sector management, development, and utilization, in addition to partnerships in institutional development and formulation of policies with different stakeholders at all levels in support of leadership and corporate oversight.
                  </p>
                  <p>
                    He is a seasoned participant in international, regional, and national forums, platforms, and meetings pertaining to water, sanitation, hygiene, and related sectors, where he interacts with transnational, national, and local actors. This has culminated in significant contributions to programmes and activities of the South Sudan water and environmental resources think-tank, the White Nile and Sudd Centre (WNSC); the regional cooperation platform, the Nile Basin Initiative (NBI); the Intergovernmental Authority on Development (IGAD) Water Unit; and World Water Week in Stockholm, Sweden.
                  </p>
                </div>
              </div>
            </article>
          </FadeInSection>

          <FadeInSection delay={0.4}>
            <article className="bg-white rounded-[4rem] p-12 md:p-20 border border-slate-100 shadow-sm mb-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-nile-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <img
                    src="/nhial-titmamer.png"
                    alt="Nhial Titmamer, Member of Board of Trustees"
                    className="w-40 h-40 rounded-[2.5rem] object-cover object-top mb-6 shadow-lg border-4 border-white ring-2 ring-nile-blue/20"
                  />
                  <h3 className="text-3xl font-display font-black text-slate-900 tracking-tight">Nhial Titmamer</h3>
                  <p className="text-nile-blue text-[10px] font-black uppercase tracking-[0.2em] mt-3 mb-4">Member of Board of Trustees</p>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Environmental Affairs Officer, UNMISS · South Sudan
                  </p>
                </div>
                <div className="lg:col-span-8 space-y-6 text-slate-600 text-lg leading-relaxed font-light">
                  <p>
                    Nhial Titmamer is an environmental specialist and interdisciplinary researcher whose work has significantly enhanced public policy and civil society understanding and engagement in the areas of natural resource governance, environmental protection and compliance, climate change adaptation and mitigation, ecotourism, and sustainable energy in South Sudan and beyond.
                  </p>
                  <p>
                    Nhial is currently working with the United Nations Mission in South Sudan (UNMISS) as an Environmental Affairs Officer charged with the responsibility to ensure environmental compliance with UN policies and national laws in over 20 mission locations across South Sudan. Before that, Nhial served with the United Nations High Commissioner for Refugees (UNHCR) as a Senior Environment Associate. He is on leave from the Sudd Institute, a South Sudanese think tank where he has served as Director of the Environment and Natural Resources Program. Nhial is a founding member and serves on the Board of Trustees of the White Nile and Sudd Centre. Nhial has also served as an Adjunct Assistant Professor at the School of Natural Resources and Environmental Studies at the University of Juba since 2015, where he has taught Environmental Economics, Natural Resource Economics, and Environmental Sociology. He has served on various committees including the Juba–Rumbek Road Project Review Committee, the Parliamentary Ad Hoc Committee on oil and gas revenues, and the Environmental Audit Committee on petroleum industry environmental compliance, among others, where he has made significant contributions.
                  </p>
                  <p>
                    Nhial spent research and consulting stints at Arletta Environmental Consulting in Calgary and at the University of Alberta&apos;s Augustana Campus in Camrose as a research assistant in environmental studies, with projects focusing on wildlife festivals, whale ecotourism, and impacts of water use for oil sands development on semi-aquatic mammals in the Lower Athabasca River in Canada. Nhial is a recipient of the research impact award, awarded by the Board of Directors of the Sudd Institute for research that has influenced policies.
                  </p>
                  <p>
                    Nhial holds a B.A. in Environmental Studies with a minor in English Literature from the University of Alberta in Canada, where he was editor of the students&apos; newspaper, <em>The Dagligtale</em>, and an M.Sc. in Sustainable Energy Development from the University of Calgary in Alberta, Canada, where he was a Government of Alberta Graduate Student Scholarship recipient in recognition of outstanding academic achievement in master&apos;s degree studies.
                  </p>
                </div>
              </div>
            </article>
          </FadeInSection>

          <FadeInSection delay={0.5}>
            <article className="bg-white rounded-[4rem] p-12 md:p-20 border border-slate-100 shadow-sm mb-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-nile-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <img
                    src="/yong-kuai-kuorwel.png"
                    alt="Mr. Yong Kuai Kuorwel, Founding Member"
                    className="w-40 h-40 rounded-[2.5rem] object-cover object-top mb-6 shadow-lg border-4 border-white ring-2 ring-nile-blue/20"
                  />
                  <h3 className="text-3xl font-display font-black text-slate-900 tracking-tight">Mr. Yong Kuai Kuorwel</h3>
                  <p className="text-nile-blue text-[10px] font-black uppercase tracking-[0.2em] mt-3 mb-4">Founding Member</p>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Occupational Safety Officer, MINUSCA · Bangui
                  </p>
                </div>
                <div className="lg:col-span-8 space-y-6 text-slate-600 text-lg leading-relaxed font-light">
                  <p>
                    Mr. Yong Kuai Kuorwel is a founding member of the White Nile and Sudd Centre. He currently serves with the United Nations Multidimensional Integrated Stabilization Mission in the Central African Republic (MINUSCA) as an Occupational Safety Officer, based in Bangui. He is a highly experienced professional environmentalist, urban planner, and certified occupational safety practitioner with a strong record of service across national and international organizations.
                  </p>
                  <p>
                    Mr. Kuorwel brings extensive multidisciplinary expertise in occupational safety and health, energy and water management, waste management, land use planning, and natural resources management. His work focuses on promoting safe, sustainable, and environmentally responsible practices within complex operational and humanitarian settings. Throughout his career, he has contributed to the development and implementation of policies, systems, and field-level interventions that enhance environmental performance and occupational safety compliance.
                  </p>
                  <p>
                    He holds a master&apos;s degree in urban and Regional Planning and a bachelor&apos;s degree in environmental management from RMIT University in Melbourne, Australia. His academic background, combined with his practical experience, positions him as a skilled practitioner in integrating environmental sustainability, urban development, and occupational safety within both development and peacekeeping contexts.
                  </p>
                </div>
              </div>
            </article>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            {[
              { name: "Joshua Dau Diu", role: "Chairman", image: null as string | null },
              { name: "Julia A. Duany", role: "Member", image: "/julia-a-duany.png" },
              { name: "Dr. John Leju Celestino Ladu", role: "Member", image: "/john-leju-ladu.png" }
            ].map((member, i) => (
              <FadeInSection key={member.name} delay={i * 0.08}>
                <div className={`group bg-white p-12 rounded-[4rem] border shadow-sm hover:shadow-2xl transition-all duration-700 text-center relative overflow-hidden ${member.role === "Chairman" ? "border-nile-blue/30 ring-1 ring-nile-blue/10" : "border-slate-100"}`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nile-blue/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 rounded-[2.5rem] object-cover object-top mx-auto mb-8 shadow-lg border-4 border-white ring-2 ring-nile-blue/20"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] mx-auto mb-8 flex items-center justify-center text-slate-200 group-hover:bg-nile-blue/10 group-hover:text-nile-blue group-hover:rotate-6 transition-all duration-500 shadow-inner">
                      <Users size={48} />
                    </div>
                  )}
                  <h3 className="text-xl font-display font-black text-slate-900 mb-2 leading-snug">{member.name}</h3>
                  <p className="text-nile-blue text-[10px] font-black uppercase tracking-[0.2em]">
                    {member.role === "Member"
                      ? "Member of Board of Trustees"
                      : `${member.role} · Board of Trustees`}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>

        </div>
      </section>

      {/* Field Operations Image Section */}
      <section className="bg-white py-32 overflow-hidden">
        <div className="content-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
              <FadeInSection>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-water-blue">Direct Impact</span>
                <h2 className="text-5xl font-display font-black text-water-dark leading-none tracking-tighter">Bridging indigenous wisdom with modern evidence.</h2>
              </FadeInSection>
              
              <FadeInSection delay={0.2}>
                <p className="text-slate-600 text-xl leading-relaxed font-light">
                  Our field operations focus on real-time data collection across the White Nile basin, tracking hydrological shifts and ecosystem health. This evidence-based approach ensures that South Sudan's lifelines are protected for generations.
                </p>
              </FadeInSection>

              <FadeInSection delay={0.3}>
                <Link to="/contact" className="inline-flex items-center gap-4 px-10 py-5 bg-water-dark text-white rounded-2xl hover:bg-nile-blue transition-all group font-black uppercase text-xs tracking-widest shadow-2xl shadow-slate-200">
                  Inquire About Research <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </FadeInSection>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-nile-blue/5 rounded-full blur-[100px] -z-10" />
              <div className="grid grid-cols-2 gap-8">
                <FadeInSection delay={0.4} y={30}>
                  <img 
                    src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=600" 
                    className="w-full aspect-[4/5] object-cover rounded-[3rem] shadow-2xl border-4 border-white"
                    alt="Water Research"
                    referrerPolicy="no-referrer"
                  />
                </FadeInSection>
                <FadeInSection delay={0.5} y={-30}>
                  <img 
                    src="https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?auto=format&fit=crop&q=80&w=600" 
                    className="w-full aspect-[4/5] object-cover rounded-[3rem] shadow-2xl translate-y-12 border-4 border-white"
                    alt="Field Operations"
                    referrerPolicy="no-referrer"
                  />
                </FadeInSection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const ResearchPage = () => {
  const categories = [
    { title: "Hydrological Models", count: "42 Reports", icon: <Waves className="text-nile-blue" /> },
    { title: "Ecosystem Health", count: "85 Studies", icon: <Leaf className="text-wetland-green" /> },
    { title: "Policy Frameworks", count: "15 Papers", icon: <Scale className="text-slate-600" /> },
    { title: "Sudd Biodiversity", count: "92 Records", icon: <Droplet className="text-water-blue" /> }
  ];

  const handleDownload = (title: string) => {
    // In a real production environment, this would initiate a request to a secure document server.
    // For this prototype, we simulate the interaction by logging the request and providing a success modal/effect.
    console.log(`[SECURE_STORAGE] Initializing download for: ${title}`);
    
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 bg-water-dark/95 backdrop-blur-xl text-white px-8 py-4 rounded-3xl shadow-2xl z-[100] border border-white/10 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5';
    toast.innerHTML = `
      <div class="w-8 h-8 bg-nile-blue rounded-full flex items-center justify-center animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      </div>
      <div>
        <div class="text-[10px] uppercase font-black tracking-widest text-water-light/50">SECURE TRANSFER</div>
        <div class="font-bold">Downloading: ${title.substring(0, 30)}...</div>
      </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('animate-out', 'fade-out', 'slide-out-to-bottom-5');
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 overflow-hidden"
    >
      <section className="bg-nile-blue py-40 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Globe2 size={800} className="absolute -right-20 -bottom-20 rotate-12" />
        </div>
        <div className="content-section relative z-10">
          <FadeInSection y={30}>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-6 block">Knowledge Repository</span>
            <h1 className="text-6xl md:text-8xl font-display font-black mb-8 tracking-tighter leading-none">Research & Data Analyses & Projects.</h1>
            <p className="text-water-light/60 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Access the focused largest repository of hydrological products, water resources development/management and environmental studies dedicated to the Sudd Region.
            </p>
          </FadeInSection>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="content-section -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {categories.map((cat, i) => (
            <FadeInSection key={cat.title} delay={i * 0.1}>
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
                <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-nile-blue/10 group-hover:scale-110 transition-all duration-500">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-display font-black text-slate-900 mb-2">{cat.title}</h3>
                <p className="text-[10px] font-black text-nile-blue uppercase tracking-widest">{cat.count}</p>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4}>
          <SearchSection />
        </FadeInSection>

        <div className="mt-32 space-y-16">
          <FadeInSection>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-l-8 border-nile-blue pl-8 py-2">
              <div className="max-w-xl">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-nile-blue">Scientific Archives</span>
                <h2 className="text-4xl font-display font-black text-water-dark mt-4">Latest Publications</h2>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 rounded-full bg-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest hover:bg-nile-blue hover:text-white transition-all">All Fields</button>
                <button className="px-6 py-3 rounded-full bg-nile-blue/10 text-nile-blue text-xs font-black uppercase tracking-widest">Hydrology Only</button>
              </div>
            </div>
          </FadeInSection>
          
          <div className="grid grid-cols-1 gap-8">
            {[
              { 
                title: "Impacts of Climate Change on the Sudd Wetland: WNSC & Wake Forest Global Conference", 
                date: "May 2026",
                category: "Climate",
                type: "Conference Report"
              },
              { 
                title: "Hydrological Shifts in the Sudd Wetlands: A Decadal Analysis", 
                date: "March 2026",
                category: "Hydrology",
                type: "Technical Paper"
              },
              { 
                title: "Impact of Local Oil Extraction on Surface Water Quality (2020-2025)", 
                date: "January 2026",
                category: "Environment",
                type: "Impact Study"
              },
              { 
                title: "Feasibility Study on the Resumption of the Jonglei Canal Project", 
                date: "November 2025",
                category: "Policy",
                type: "Government Report"
              }
            ].map((pub, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row md:items-center justify-between p-10 bg-white border border-slate-100 rounded-[3.5rem] hover:border-nile-blue/30 hover:shadow-2xl hover:shadow-slate-200 transition-all group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="px-4 py-1.5 rounded-full bg-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-500">{pub.category}</span>
                      <span className="text-[10px] font-black text-nile-blue uppercase tracking-widest">{pub.type}</span>
                    </div>
                    <h3 className="text-2xl font-display font-black text-slate-900 group-hover:text-nile-blue transition-colors leading-tight">{pub.title}</h3>
                    <p className="text-sm text-slate-400 font-medium">Published on {pub.date} • Peer Reviewed</p>
                  </div>
                  <button 
                    onClick={() => handleDownload(pub.title)}
                    className="mt-8 md:mt-0 px-8 py-4 border-2 border-slate-100 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 flex items-center justify-center gap-3 group/btn transition-all"
                  >
                    Download PDF <Download size={20} className="text-nile-blue group-hover/btn:text-white transition-colors" />
                  </button>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PartnershipsPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 overflow-hidden"
    >
      <section className="bg-wetland-dark py-40 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541746972996-4e0b0f43e03a?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 blur-sm scale-110" />
        <div className="content-section relative z-10">
          <FadeInSection y={30}>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-wetland-accent mb-6 block">Strategic Network</span>
            <h1 className="text-6xl md:text-9xl font-display font-black mb-8 tracking-tighter leading-none">Collaborations.</h1>
            <p className="text-wetland-accent/60 text-2xl max-w-2xl mx-auto font-light leading-relaxed">
              Uniting global scientific expertise to secure South Sudan's hydrological heritage.
            </p>
          </FadeInSection>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="content-section grid grid-cols-1 lg:grid-cols-2 gap-32 py-32 items-center">
        <div className="space-y-12">
          <FadeInSection>
            <h2 className="text-5xl font-display font-black text-water-dark leading-none tracking-tighter">A Multi-Stakeholder Research Ecosystem.</h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="text-slate-600 text-xl leading-relaxed font-light">
              The WNSC believes that solving complex water challenges requires a convergence of national and specialized expertise and international resources for social impact. We partner with universities like <span className="text-nile-blue font-bold">Wake Forest University</span>, NGOs, and government agencies to ensure our research is globally significant and locally relevant.
            </p>
          </FadeInSection>
          
          <div className="grid grid-cols-2 gap-8">
            <FadeInSection delay={0.3}>
              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="text-3xl font-display font-black text-nile-blue mb-3">Partners and</div>
                <p className="text-sm text-slate-500 leading-relaxed">Joint research papers and transboundary data sharing initiatives.</p>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.4}>
              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="text-3xl font-display font-black text-wetland-green mb-3">Consultants</div>
                <p className="text-sm text-slate-500 leading-relaxed">Infrastructure monitoring and remote sensing support systems.</p>
              </div>
            </FadeInSection>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 relative">
          <div className="absolute inset-0 bg-nile-blue/5 rounded-full blur-[120px] -z-10" />
          {[
            { icon: <Building2 size={48} />, label: "Academic Institutions", color: "text-blue-500" },
            { icon: <Globe size={48} />, label: "Intl Resources Dept", color: "text-emerald-500" },
            { icon: <Network size={48} />, label: "NGO Consortiums", color: "text-amber-500" },
            { icon: <Scale size={48} />, label: "Policy Think Tanks", color: "text-slate-500" }
          ].map((item, i) => (
            <FadeInSection key={i} delay={i * 0.1} y={30}>
              <div className={`p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm flex flex-col items-center text-center group hover:border-nile-blue/30 hover:shadow-2xl transition-all duration-500 ${i % 2 === 1 ? 'translate-y-8' : ''}`}>
                <div className={`${item.color} mb-8 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`}>{item.icon}</div>
                <span className="font-display font-black text-slate-900 tracking-tight uppercase text-xs leading-tight">{item.label}</span>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.name.trim().length < 2) {
      newErrors.name = "Full name must be at least 2 characters.";
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    if (!formData.department) {
      newErrors.department = "Please select a department.";
    }
    
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitError(null);
    setIsSubmitting(true);

    const result = await submitStakeholderBriefing(formData);

    setIsSubmitting(false);

    if (result.ok === false) {
      setSubmitError(result.message);
      return;
    }

    setSubmittedEmail(formData.email);
    setSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-50 min-h-screen pb-24 overflow-hidden"
    >
      <section className="bg-water-dark py-40 text-center text-white relative overflow-hidden">
        <motion.div
           initial={{ scale: 1.1, opacity: 0 }}
           animate={{ scale: 1, opacity: 0.25 }}
           transition={{ duration: 1.5 }}
           className="absolute inset-0"
        >
          <img 
            src="https://res.cloudinary.com/dpskjlq9m/image/upload/v1776851456/WhatsApp_Image_2026-04-22_at_12.48.29_PM_mxlbdv.jpg" 
            alt="WNSC Context"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="content-section relative z-10">
          <FadeInSection y={30}>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-water-light/40 mb-6 block">Stakeholder Portal</span>
            <h1 className="text-6xl md:text-9xl font-display font-black mb-8 tracking-tighter leading-none">Connect.</h1>
            <p className="text-water-light/60 text-xl max-w-xl mx-auto font-light leading-relaxed">
              Based in Juba, Republic of South Sudan. Open for research partnerships, policy advocacy, and technical inquiries.
            </p>
          </FadeInSection>
        </div>
      </section>

      <div className="content-section -mt-24 relative z-20">
        <FadeInSection y={40}>
          <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 border border-slate-100 min-h-[700px]">
            {/* Contact Info */}
            <div className="lg:col-span-2 bg-water-dark p-16 text-white relative flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-nile-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <h2 className="text-4xl font-display font-black mb-16 tracking-tight">Institutional Channels</h2>
                <div className="space-y-12">
                  <div className="flex items-start gap-8 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-nile-blue group-hover:border-nile-blue transition-all duration-500">
                      <MapPin size={28} className="text-water-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-black text-[10px] uppercase tracking-widest text-water-light/30 mb-2">Primary HQ</h4>
                      <p className="text-xl font-bold">Juba, South Sudan</p>
                      <p className="text-sm text-water-light/50 mt-1 italic font-light">Nile Block 4, Ministry Complex</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-nile-blue group-hover:border-nile-blue transition-all duration-500">
                      <Mail size={28} className="text-water-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-black text-[10px] uppercase tracking-widest text-water-light/30 mb-2">Digital Secretariat</h4>
                      <p className="text-xl font-bold">info@wnscss.org</p>
                      <p className="text-sm text-water-light/50 mt-1 italic font-light">Stakeholder Correspondence</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-nile-blue group-hover:border-nile-blue transition-all duration-500">
                      <Phone size={28} className="text-water-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-black text-[10px] uppercase tracking-widest text-water-light/30 mb-2">Field Liaison</h4>
                      <p className="text-xl font-bold">+211 914 789 322</p>
                      <p className="text-sm text-water-light/50 mt-1 italic font-light">Direct Research Line</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-nile-blue group-hover:border-nile-blue transition-all duration-500">
                      <Network size={28} className="text-water-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-black text-[10px] uppercase tracking-widest text-water-light/30 mb-3">Connect</h4>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={SOCIAL_LINKS.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-water-light transition-colors hover:border-nile-blue hover:bg-nile-blue/20 hover:text-white"
                        >
                          <Facebook size={16} />
                          Facebook
                        </a>
                        <a
                          href={SOCIAL_LINKS.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-water-light transition-colors hover:border-nile-blue hover:bg-nile-blue/20 hover:text-white"
                        >
                          <Linkedin size={16} />
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 pt-16 mt-16 border-t border-white/5 flex items-center gap-6 opacity-40 group hover:opacity-100 transition-opacity">
                <Waves size={40} className="text-nile-blue" />
                <div className="text-[10px] uppercase tracking-[0.3em] font-black leading-tight">
                  Protecting South Sudan's<br/>Hydrological Heritage
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 p-16 bg-white">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-10 shadow-inner">
                      <ShieldCheck size={48} />
                    </div>
                    <h3 className="text-4xl font-display font-black text-slate-900 mb-6 tracking-tight">Briefing Logged.</h3>
                    <p className="text-slate-500 mb-12 max-w-sm mx-auto text-lg font-light">
                      Your briefing has been emailed to our coordination team. We will respond at{' '}
                      <span className="font-semibold text-slate-700">{submittedEmail}</span> within 48 hours.
                    </p>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setSubmittedEmail('');
                        setSubmitError(null);
                        setFormData({ name: '', email: '', department: '', message: '' });
                      }}
                      className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-nile-blue transition-all"
                    >
                      Log Another Briefing
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Full Legal Name</label>
                        <input 
                          name="name"
                          type="text" 
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-8 py-5 bg-slate-50 border-2 ${errors.name ? 'border-red-500' : 'border-slate-100'} rounded-3xl focus:bg-white focus:border-nile-blue transition-all outline-none font-medium text-slate-900 shadow-sm shadow-slate-100/50`}
                          placeholder="e.g. Nyaduor Malong"
                        />
                        {errors.name && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] uppercase font-black tracking-widest pl-4">{errors.name}</motion.p>}
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Verified Email</label>
                        <input 
                          name="email"
                          type="email" 
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-8 py-5 bg-slate-50 border-2 ${errors.email ? 'border-red-500' : 'border-slate-100'} rounded-3xl focus:bg-white focus:border-nile-blue transition-all outline-none font-medium text-slate-900 shadow-sm shadow-slate-100/50`}
                          placeholder="programs@institution.example"
                        />
                        {errors.email && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] uppercase font-black tracking-widest pl-4">{errors.email}</motion.p>}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Inquiry Department</label>
                      <div className="relative">
                        <select 
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className={`w-full px-8 py-5 bg-slate-50 border-2 ${errors.department ? 'border-red-500' : 'border-slate-100'} rounded-3xl focus:bg-white focus:border-nile-blue appearance-none outline-none font-medium text-slate-900 cursor-pointer shadow-sm shadow-slate-100/50`}
                        >
                          <option value="">Select a stakeholder pathway</option>
                          <option value="research">Scientific Partner (Hydrology / Ecology)</option>
                          <option value="policy">Strategic Advisor (Water Diplomacy / Policy)</option>
                          <option value="careers">Careers & Research Fellowships</option>
                        </select>
                        <ChevronDown size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                      {errors.department && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] uppercase font-black tracking-widest pl-4">{errors.department}</motion.p>}
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Inquiry / Proposal Brief</label>
                      <textarea 
                        name="message"
                        rows={5} 
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-8 py-5 bg-slate-50 border-2 ${errors.message ? 'border-red-500' : 'border-slate-100'} rounded-3xl focus:bg-white focus:border-nile-blue transition-all outline-none font-medium text-slate-900 shadow-sm shadow-slate-100/50 resize-none`}
                        placeholder="e.g. We are a university lab studying Sudd inundation patterns and would like to explore data sharing and a joint seminar in Juba."
                      ></textarea>
                      {errors.message && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] uppercase font-black tracking-widest pl-4">{errors.message}</motion.p>}
                    </div>

                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-sm font-medium bg-red-50 border border-red-100 rounded-2xl px-6 py-4"
                        role="alert"
                      >
                        {submitError}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 bg-nile-blue text-white font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-nile-blue/20 hover:shadow-nile-blue/40 transform hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 group overflow-hidden relative disabled:opacity-70 disabled:pointer-events-none disabled:transform-none"
                    >
                       <span className="relative z-10">
                         {isSubmitting ? 'Sending Briefing…' : 'Submit Stakeholder Briefing'}
                       </span>
                       {isSubmitting ? (
                         <Loader2 size={22} className="relative z-10 animate-spin" />
                       ) : (
                         <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                       )}
                       <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeInSection>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-nile-blue/10 selection:text-nile-blue">
      <Navbar />
      <div className="mt-[80px]">
        <GlobalSearchBar />
      </div>
      <main className="flex-grow">
        <ScrollToTop />
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/partnerships" element={<PartnershipsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;

// Utility to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
