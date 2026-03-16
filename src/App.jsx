import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import { Palette, Type, Grid3X3, ArrowRight, MousePointer2, Eye, X } from 'lucide-react';
import './App.css';

const LOGOS = [
  {
    id: 'icc',
    name: 'ICC',
    fullName: 'Ingénierie Cloud Computing',
    color: '#3B82F6',
    secondaryColor: '#1d4ed8',
    lightColor: '#e0f2fe',
    description: 'Conçu pour l\'avenir de l\'infrastructure cloud. ICC représente l\'évolutivité, la fiabilité et la puissance informatique moderne.',
    logoUrl: 'ICC%20Logo.png',
    features: ['Évolutivité', 'Architecture Cloud', 'Fiabilité'],
    meaning: "Le bleu évoque la profondeur de l'infrastructure et la stabilité des systèmes critiques.",
    emotion: "Confiance, Innovation, Sérénité technique",
    analysis: "Structure basée sur une superposition de formes organiques (nuages) et de géométrie rigide (linéaire). Le lettrage ICC est aligné sur une grille de base 8px pour assurer une harmonie parfaite avec l'icône."
  },
  {
    id: 'ia',
    name: 'IA',
    fullName: 'Intelligence Artificielle',
    color: '#10B981',
    secondaryColor: '#047857',
    lightColor: '#dcfce7',
    description: 'Le cerveau derrière la machine. l\'IA symbolise la connectivité neurale, l\'automatisation intelligente et la progression de l\'intelligence artificielle.',
    logoUrl: 'IA%20Logo.png',
    features: ['Apprentissage Profond', 'Réseaux Neuraux', 'Automatisation'],
    meaning: "Le vert symbolise la croissance algorithmique et l'équilibre entre nature et technologie.",
    emotion: "Intelligence, Croissance, Harmonie futuriste",
    analysis: "Construction symétrique centrée sur des arcs de cercles parfaits. Les rayons de courbure sont calculés pour symboliser les connexions neuronales et la fluidité de l'information."
  },
  {
    id: 'hpda',
    name: 'HPDA',
    fullName: 'High Performance Data Analytics',
    color: '#8B5CF6',
    secondaryColor: '#6d28d9',
    lightColor: '#f3e8ff',
    description: 'Transformer les données brutes en informations à haute vitesse. HPDA représente l\'efficacité, la performance et la puissance du traitement des méga-données.',
    logoUrl: 'HPDA%20Logo.png',
    features: ['Big Data', 'Haute Efficacité', 'Analyses en Temps Réel'],
    meaning: "Le violet représente la complexité transformée en sagesse et la puissance de calcul.",
    emotion: "Ambition, Créativité, Excellence analytique",
    analysis: "Utilisation d'angles vifs à 45° pour exprimer la vélocité et le traitement de données à haute performance. La structure suit une progression arithmétique de l'épaisseur des lignes."
  },
  {
    id: 'cs',
    name: 'CS',
    fullName: 'Cyber Security',
    color: '#F59E0B',
    secondaryColor: '#b45309',
    lightColor: '#fef3c7',
    description: 'Défendre le périmètre avec des protocoles avancés. CS incarne la confiance, la protection et la force de la sécurité numérique.',
    logoUrl: 'CS%20Logo.png',
    features: ['Chiffrement', 'Protection Contre les Menaces', 'Confiance'],
    meaning: "L'ambre incarne l'alerte préventive, la chaleur de la protection et la vigilance.",
    emotion: "Vigilance, Sécurité, Énergie protectrice",
    analysis: "Géométrie protectrice basée sur le bouclier. Les rapports de proportion entre les éléments assurent une perception de solidité et d'imperméabilité aux menaces extérieures."
  }
];

const Modal = ({ isOpen, onClose, logo }) => {
  if (!isOpen || !logo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className="modal-content glass"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose} style={{ color: logo.color }}>
            <X size={24} />
          </button>
          
          <div className="modal-body">
            <div className="modal-logo-container" style={{ borderColor: `${logo.color}30` }}>
              <div className="grid-bg"></div>
              <img 
                src={logo.logoUrl} 
                alt={logo.name} 
                className="modal-large-logo"
              />
            </div>
            
            <div className="modal-info">
              <span className="tag" style={{ color: logo.color }}>Détails du Logo</span>
              <h2>{logo.fullName}</h2>
              <div className="modal-specs">
                <div className="spec-item">
                  <span className="spec-label">Format</span>
                  <span className="spec-value">Vectoriel / PNG HD</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Couleur</span>
                  <span className="spec-value">{logo.color}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Section = ({ logo, setActiveId, showToast, onLogoClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setActiveId(logo.id);
    }
  }, [isInView, logo.id, setActiveId]);

  return (
    <section id={logo.id} ref={ref} className="full-page-section">
      <div className="container">
        <div className="guide-header">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="logo-display"
          >
            <div 
              className="view-badge clickable" 
              style={{ backgroundColor: logo.color, cursor: 'pointer' }}
              onClick={() => onLogoClick(logo)}
            >
              <Eye size={14} color="white" />
            </div>
            <img 
              src={logo.logoUrl} 
              alt={logo.name} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            className="guide-info"
          >
            <span className="tag" style={{ color: logo.color }}>Charte CY</span>
            <h2>{logo.fullName}</h2>
            <p className="description">{logo.description}</p>
            <div className="feature-box">
              {logo.features.map(f => (
                <span key={f} className="feature-tag">{f}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="guide-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="grid-card glass"
          >
            <div className="section-header">
              <Palette size={24} style={{ color: logo.color }} />
              <h3>Signification & Palette</h3>
            </div>

            <div className="meaning-box" style={{ marginTop: '1.25rem', padding: '1.25rem', background: `${logo.color}10`, borderRadius: '1.25rem', border: `1px solid ${logo.color}20` }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: logo.color, padding: '0.6rem', borderRadius: '0.85rem', color: 'white' }}>
                  <ArrowRight size={16} />
                </div>
                <div>
                  <p style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 700, marginBottom: '0.4rem' }}>Psychologie de la couleur</p>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#475569' }}>{logo.meaning}</p>
                </div>
              </div>
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: logo.color }}>Émotions Clés</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, fontStyle: 'italic', color: '#1e293b' }}>{logo.emotion}</span>
              </div>
            </div>

            <div className="color-palette-horizontal" style={{ marginTop: '2rem' }}>
              {[
                { label: 'Primaire', value: logo.color },
                { label: 'Profond', value: logo.secondaryColor },
                { label: 'Neutre', value: '#FFFFFF', dark: true }
              ].map((c) => (
                <div
                  key={c.label}
                  className="color-ball"
                  style={{ backgroundColor: c.value, color: c.dark ? '#000' : '#fff' }}
                  onClick={() => {
                    navigator.clipboard.writeText(c.value);
                    showToast(`Copié : ${c.value}`);
                  }}
                >
                  <span style={{ fontSize: '0.95rem' }}>{c.label}</span>
                  <code style={{ fontSize: '0.75rem' }}>{c.value}</code>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="grid-card glass"
          >
            <div className="section-header">
              <Grid3X3 size={24} style={{ color: logo.color }} />
              <h3>Visualisation de Construction</h3>
            </div>
            <div className="construction-preview">
              <div className="grid-bg"></div>

              {/* Technical Lines */}
              <div className="technical-line horizontal" style={{ top: '35%', background: logo.color }}></div>
              <div className="technical-line horizontal" style={{ top: '65%', background: logo.color }}></div>
              <div className="technical-line vertical" style={{ left: '35%', background: logo.color }}></div>
              <div className="technical-line vertical" style={{ left: '65%', background: logo.color }}></div>

              <div className="analysis-annotations">
                <span className="annotation top-left" style={{ borderColor: logo.color }}>R: Variable</span>
                <span className="annotation bottom-right" style={{ borderColor: logo.color }}>Grid: 8px</span>
              </div>

              <img src={logo.logoUrl} alt="Grid" style={{ width: '130px', zIndex: 1, position: 'relative' }} />

              <div className="center-cross" style={{ background: logo.color }}></div>
            </div>

            <div className="analysis-text-box" style={{ marginTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '4px', height: '16px', background: logo.color, borderRadius: '4px' }}></div>
                <h4 style={{ fontSize: '0.9rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Analyse Géométrique</h4>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#64748b' }}>
                {logo.analysis}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [activeId, setActiveId] = useState('home');
  const [toast, setToast] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 40, damping: 25, restDelta: 0.001 });

  const homeRef = useRef(null);
  const homeInView = useInView(homeRef, { amount: 0.6 });

  useEffect(() => {
    if (homeInView) {
      setActiveId('home');
    }
  }, [homeInView]);

  const activeLogo = LOGOS.find(l => l.id === activeId);

  const themeColor = activeId === 'home' ? '#1e293b' : (activeLogo?.color || '#3B82F6');
  const glowColor = activeId === 'home' ? '#94a3b8' : (activeLogo?.color || '#3B82F6');

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', themeColor);
    document.documentElement.style.setProperty('--glow-color', glowColor);
  }, [themeColor, glowColor]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveId(id);
  };

  const particles = [
    { id: 1, className: 'p1', delay: 0, baseOpacity: 0.2 },
    { id: 2, className: 'p2', delay: 0.2, baseOpacity: 0.15 },
    { id: 3, className: 'p3', delay: 0.4, baseOpacity: 0.18 },
    { id: 4, className: 'p4', delay: 0.6, baseOpacity: 0.12 },
    { id: 5, className: 'p5', delay: 0.8, baseOpacity: 0.14 },
    { id: 6, className: 'p6', delay: 1.0, baseOpacity: 0.16 },
  ];

  return (
    <div className="app">
      <div className="particle-container">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              backgroundColor: glowColor,
              opacity: activeId === 'home' ? p.baseOpacity * 0.4 : p.baseOpacity
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`particle-glow ${p.className}`}
          />
        ))}
      </div>

      <motion.div className="progress-bar" style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: 4, background: themeColor, zIndex: 1000, transformOrigin: '0%' }} />

      <nav className="nav-container">
        <div className="nav-content">
          <div className="nav-brand" onClick={() => scrollTo('home')}>
            <span className="brand-dot" style={{ backgroundColor: themeColor, boxShadow: `0 0 15px ${themeColor}` }}></span>
            Charte CY
          </div>
          <div className="nav-links">
            {LOGOS.map((logo) => (
              <button
                key={logo.id}
                className={`nav-link ${activeId === logo.id ? 'active' : ''}`}
                onClick={() => scrollTo(logo.id)}
                style={{
                  '--primary': logo.color,
                  backgroundColor: activeId === logo.id ? logo.color : 'transparent'
                }}
              >
                {logo.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <section id="home" ref={homeRef} className="full-page-section" style={{ textAlign: 'center' }}>
          <div className="container">
            <header className="hero">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                Architecture de la <span className="text-gradient">Charte CY Tech</span>
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                className="hero-subtitle"
              >
                Cette <strong>charte graphique</strong> présente des logos suggérés pour les filières de <strong>CY Tech - Pau</strong>.<br />
                Réalisé par <strong>Abdellatif EL-MAHDAOUI</strong> dans le cadre du module <strong>IHM</strong>,<br />
                ce projet applique les connaissances acquises au cours afin de proposer une identité visuelle moderne.
              </motion.p>

              <motion.div
                onClick={() => scrollTo('icc')}
                className="explorer-trigger"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <p>DÉFILER POUR EXPLORER</p>
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="explorer-arrow">↓</motion.div>
              </motion.div>
            </header>
          </div>
        </section>

        {LOGOS.map((logo) => (
          <Section
            key={logo.id}
            logo={logo}
            setActiveId={setActiveId}
            showToast={showToast}
            onLogoClick={setSelectedLogo}
          />
        ))}
      </main>

      <Modal 
        isOpen={!!selectedLogo} 
        onClose={() => setSelectedLogo(null)} 
        logo={selectedLogo} 
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 50, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 50, opacity: 0, x: '-50%' }}
            className="copied-feedback"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="footer" style={{ background: 'transparent', padding: '4rem 0' }}>
        <div className="container">
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>© 2025-2026 Abdellatif EL-MAHDAOUI, ING3 ICC. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
