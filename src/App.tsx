/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './components/Logo';
import logoPath from './assets/logo-vt.png';
import cahoraBassaImg from './assets/cahora-bassa.jpeg';
import cbMap1 from './assets/cb-map-1.jpeg';
import cbMap2 from './assets/cb-map-2.jpeg';
import cbMap3 from './assets/cb-map-3.jpeg';
import mgMap1 from './assets/mg-map-1.jpeg';
import mgMap2 from './assets/mg-map-2.jpeg';
import mgMap3 from './assets/mg-map-3.jpeg';
import zmbMap1 from './assets/zmb-map-1.jpeg';

// Smart Image Component that falls back to SVG Logo on error
const ScalableLogo: React.FC<{ className?: string, scrolled: boolean }> = ({ className, scrolled }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={className}>
      {!imgError ? (
        <img 
          src={logoPath} 
          alt="Vocação Técnica"
          className="h-full w-auto object-contain transition-transform hover:scale-105"
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <Logo className={`h-full w-auto transition-all duration-300 ${scrolled ? 'text-vt-dark' : 'text-white'}`} />
      )}
    </div>
  );
};
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ChevronRight, 
  Building2, 
  Map as MapIcon, 
  Users, 
  Compass, 
  ArrowRight,
  UserCheck,
  Target,
  Lightbulb,
  ShieldCheck,
  FileText,
  Scale,
  Map as MapIconMap
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet icon issue
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Map Controller to handle panning
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
};

// --- Components ---

const Modal = ({ isOpen, onClose, title, content }: { isOpen: boolean, onClose: () => void, title: string, content: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-vt-dark/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="text-2xl font-display font-bold text-vt-dark">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-vt-orange">
              <X size={24} />
            </button>
          </div>
          <div className="p-8 max-h-[60vh] overflow-y-auto text-gray-600 leading-relaxed space-y-4">
            {content}
          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-100 text-right">
            <button onClick={onClose} className="bg-vt-dark text-white px-8 py-2 rounded-full font-bold hover:bg-vt-orange transition-colors">
              Fechar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const ImageCarousel = ({ images }: { images: { src: string, caption?: string }[] | string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const currentImg = typeof images[currentIndex] === 'string' ? { src: images[currentIndex] as string, caption: '' } : images[currentIndex] as { src: string, caption?: string };

  return (
    <div className="relative mb-6 rounded-2xl overflow-hidden shadow-sm group bg-gray-100 flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={currentImg.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-auto max-h-[500px] object-contain"
          alt={currentImg.caption || "Cenário"}
        />
      </AnimatePresence>
      {currentImg.caption && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm text-xs font-bold text-vt-dark z-10 max-w-[80%] border border-gray-100">
          {currentImg.caption}
        </div>
      )}
      
      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur text-vt-dark rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-vt-orange hover:text-white z-10"
          >
            <ChevronRight className="rotate-180" size={20} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur text-vt-dark rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-vt-orange hover:text-white z-10"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Navbar = ({ setView, currentView }: { setView: (v: 'home' | 'portfolio') => void, currentView: 'home' | 'portfolio' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (currentView === 'portfolio') {
      e.preventDefault();
      setView('home');
      // Wait for view change then scroll
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Processo', href: '#processo' },
    { name: 'Portfólio', href: '#portfolio', isPortfolioBtn: true },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => { setView('home'); window.scrollTo(0,0); }}
          className="flex items-center cursor-pointer h-16 md:h-20"
        >
          <ScalableLogo scrolled={scrolled} className="h-full" />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => {
                if (link.isPortfolioBtn) {
                  e.preventDefault();
                  setView('portfolio');
                  window.scrollTo(0,0);
                } else {
                  handleNavClick(e, link.href);
                }
              }}
              className={`text-sm font-medium hover:text-vt-orange transition-colors ${scrolled ? 'text-vt-dark' : 'text-white/90'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contacto" 
            onClick={(e) => handleNavClick(e, '#contacto')}
            className="bg-vt-orange text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-vt-dark hover:shadow-lg transition-all"
          >
            Fale Connosco
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-vt-orange">
          {isOpen ? <X size={28} /> : <Menu size={28} className={!scrolled && !isOpen ? 'text-white' : 'text-vt-orange'} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 flex flex-col items-center gap-6 md:hidden border-t border-gray-100"
          >
          {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                  if (link.isPortfolioBtn) {
                    e.preventDefault();
                    setView('portfolio');
                    window.scrollTo(0,0);
                    setIsOpen(false);
                  } else {
                    handleNavClick(e, link.href);
                  }
                }}
                className="text-lg font-medium text-vt-dark hover:text-vt-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mb-16 space-y-4">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`font-display text-4xl md:text-5xl font-bold tracking-tight ${light ? 'text-white' : 'text-vt-dark'}`}
    >
      {children}
      <div className="h-1.5 w-24 bg-vt-orange mt-4"></div>
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`max-w-2xl text-lg ${light ? 'text-white/70' : 'text-gray-500'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ServiceCard = ({ icon: Icon, title, items }: { icon: any, title: string, items: string[] }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group rounded-2xl"
  >
    <div className="w-16 h-16 bg-orange-50 text-vt-orange flex items-center justify-center rounded-2xl mb-6 group-hover:bg-vt-orange group-hover:text-white transition-colors">
      <Icon size={32} />
    </div>
    <h3 className="font-display text-2xl font-bold mb-4">{title}</h3>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-gray-500 group-hover:text-gray-600 transition-colors">
          <ChevronRight size={18} className="text-vt-orange mt-1 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const ProjectCard = ({ category, title, client, location, year, onSeeDetails }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white overflow-hidden border border-gray-100 group shadow-sm hover:shadow-2xl rounded-3xl"
  >
    <div className="h-64 bg-gray-100 relative overflow-hidden flex items-center justify-center">
      {/* Blurred background content */}
      <div className="absolute inset-0 transition-all duration-500 group-hover:blur-md group-hover:scale-105 flex flex-col items-center justify-center p-8">
        <div className="absolute inset-0 map-pattern opacity-40"></div>
        <Building2 className="text-vt-orange/50 mb-4 relative z-10" size={48} />
        <span className="text-xs font-bold uppercase tracking-widest text-vt-orange bg-orange-50 px-3 py-1 rounded-full mb-2 relative z-10">{category}</span>
        <h4 className="font-display text-xl font-bold text-gray-800 line-clamp-2 relative z-10">{title}</h4>
      </div>

      {/* revealed overlay */}
      <div className="absolute inset-0 bg-vt-dark/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6 text-white translate-y-4 group-hover:translate-y-0">
        <div className="text-center space-y-4 w-full">
          <div className="space-y-1">
            <p className="text-[10px] text-white/50 uppercase tracking-widest">Cliente</p>
            <p className="font-bold text-sm leading-tight text-vt-orange">{client}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="text-left">
              <p className="text-[10px] text-white/50 uppercase tracking-widest">Local</p>
              <p className="font-bold text-xs truncate">{location}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/50 uppercase tracking-widest">Prazo</p>
              <p className="font-bold text-xs">{year}</p>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onSeeDetails?.(); }}
            className="mt-4 w-full py-2 bg-vt-orange text-white text-[10px] font-bold rounded-full hover:bg-white hover:text-vt-dark transition-colors border border-vt-orange cursor-pointer"
          >
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const LocationTag: React.FC<{ 
  name: string, 
  active?: boolean, 
  onClick?: () => void 
}> = ({ name, active, onClick }) => {
  const [province, district] = name.split(' - ');
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl shadow-sm flex items-center gap-2 group cursor-pointer transition-all border ${
        active ? 'bg-vt-orange border-vt-orange text-white shadow-vt-orange/40' : 'bg-white border-gray-100 text-gray-600 hover:border-vt-orange/30'
      }`}
    >
      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? 'bg-white animate-pulse' : 'bg-vt-orange group-hover:animate-ping'}`}></div>
      <div className="flex flex-col items-start leading-tight">
        {district ? (
          <>
            <span className={`text-[10px] uppercase font-bold tracking-wider ${active ? 'text-white/70' : 'text-gray-400'}`}>{province}</span>
            <span className="text-sm font-medium">{district}</span>
          </>
        ) : (
          <span className="text-sm font-medium">{name}</span>
        )}
      </div>
    </motion.div>
  );
};

const locationsData = [
  { name: "Maputo - Cidade de Maputo", coords: [-25.9692, 32.5732] as [number, number], projects: ["Edifício Misto Bairro Central", "Projecto Residencial Matola Rio", "Capacitação APIEX"] },
  { name: "Nampula - Nampula", coords: [-15.1165, 39.2662] as [number, number], projects: ["Sede Vocação Técnica", "Modelo Territorial de Mucuache", "PLANO DE PORMENOR SUOPG-01"] },
  { name: "Manica - Sussundenga", coords: [-19.4128, 33.2842] as [number, number], projects: ["PDUTS Sussundenga", "PEU Sussundenga", "Requalificação SUOPG-04"] },
  { name: "Zambézia - Alto-Molócue", coords: [-15.6322, 37.6897] as [number, number], projects: ["PEU Alto-Molócue", "Assentamentos Humanos"] },
  { name: "Zambézia - Gurúè", coords: [-15.4678, 36.9844] as [number, number], projects: ["PEU Gurúè", "Modelo Territorial Urbano"] },
  { name: "Zambézia - Milange", coords: [-16.1042, 35.7725] as [number, number], projects: ["PEU Milange", "Infraestrutura Urbana"] },
  { name: "Sofala - Nhamatanda", coords: [-19.2667, 34.2167] as [number, number], projects: ["PEU Nhamatanda", "Drenagem Pluvial"] },
  { name: "Maputo - Boane", coords: [-26.0469, 32.3275] as [number, number], projects: ["PEU Boane", "Planta Modelo Territorial"] },
  { name: "Nampula - Ilha de Moçambique", coords: [-15.0347, 40.7358] as [number, number], projects: ["PGU Lumbo", "Abordagem Participativa de Saneamento"] },
  { name: "Nampula - Nacala", coords: [-14.5422, 40.6722] as [number, number], projects: ["Plano Interdistrital", "Nacala-à-Velha e Nacala-Porto"] },
  { name: "Nampula - Rapale", coords: [-15.1333, 39.1167] as [number, number], projects: ["Monografia Vila Sede", "Obras Hidráulicas"] },
  { name: "Cabo Delgado - Mocímboa da Praia", coords: [-11.3500, 40.3500] as [number, number], projects: ["Assistência PDA", "Capacitação Liderança"] },
  { name: "Gaza - Mandlakazi", coords: [-24.7121, 33.8824] as [number, number], projects: ["Plano de Estrutura Urbana (PEUVM)", "Projecto de Drenagem Integrada", "Expansão Urbana Ligaguene"] },
  { name: "Sofala - Beira", coords: [-19.8333, 34.8500] as [number, number], projects: ["Plano Director de Mobilidade Urbana", "Diagnóstico de Situação Actual", "Integração UN-Habitat"] },
  { name: "Tete - Mágoè e Cahora Bassa", coords: [-15.8000, 32.7000] as [number, number], projects: ["PDUT de Mágoè e Cahora Bassa"] }
];

const StepCard = ({ number, title, desc }: any) => (
  <div className="relative flex flex-col gap-4 p-8 bg-white border border-gray-100 rounded-3xl group transition-all hover:bg-vt-orange/5">
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-vt-orange text-white flex items-center justify-center rounded-2xl font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
      {number}
    </div>
    <h3 className="font-display text-xl font-bold mt-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'portfolio'>('home');
  const [selectedLoc, setSelectedLoc] = useState(locationsData[0]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [modalState, setModalState] = useState<{ isOpen: boolean, title: string, content: React.ReactNode }>({
    isOpen: false,
    title: '',
    content: null
  });

  const openPrivacy = () => setModalState({
    isOpen: true,
    title: 'Política de Privacidade',
    content: (
      <div className="space-y-4">
        <p className="font-bold text-vt-dark">Compromisso com a Proteção de Dados</p>
        <p>A Vocação Técnica, Lda respeita a sua privacidade. Todos os dados recolhidos através deste site ou em processos de consulta pública são tratados com a máxima confidencialidade e utilizados estritamente para os fins previstos.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Não partilhamos informações pessoais com terceiros sem consentimento explícito.</li>
          <li>Os dados de contacto são utilizados apenas para comunicações profissionais e institucionais.</li>
          <li>Implementamos medidas técnicas rigorosas para proteger os dados contra acesso não autorizado.</li>
        </ul>
        <p className="text-sm italic">Última actualização: Maio 2026</p>
      </div>
    )
  });

  const openTerms = () => setModalState({
    isOpen: true,
    title: 'Termos de Uso',
    content: (
      <div className="space-y-4">
        <p>Ao aceder ao site da Vocação Técnica, Lda, o utilizador concorda com os seguintes termos:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><span className="font-bold text-vt-dark">Propriedade Intelectual:</span> Todo o conteúdo técnico, mapas, projectos e textos são propriedade intelectual da empresa, não podendo ser reproduzidos sem autorização.</li>
          <li><span className="font-bold text-vt-dark">Uso de Informação:</span> A informação disponibilizada tem carácter informativo. Projectos oficiais devem ser consultados através dos canais institucionais.</li>
          <li><span className="font-bold text-vt-dark">Responsabilidade:</span> A empresa não se responsabiliza por interpretações incorrectas de dados técnicos disponibilizados para visualização geral.</li>
        </ol>
      </div>
    )
  });

  const openCompliance = () => setModalState({
    isOpen: true,
    title: 'Compliance & Ética',
    content: (
      <div className="space-y-4">
        <p className="font-bold text-vt-dark">Integridade Técnica e Governação</p>
        <p>Operamos sob os mais altos padrões de ética profissional moçambicanos e internacionais. O nosso programa de compliance foca em:</p>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-4 p-4 bg-orange-50 rounded-2xl">
            <Scale className="text-vt-orange shrink-0" />
            <p className="text-sm">Transparência total em concursos públicos e processos de aquisição.</p>
          </div>
          <div className="flex gap-4 p-4 bg-orange-50 rounded-2xl">
            <ShieldCheck className="text-vt-orange shrink-0" />
            <p className="text-sm">Riguroso controle de qualidade técnica e verificação de normas legais.</p>
          </div>
          <div className="flex gap-4 p-4 bg-orange-50 rounded-2xl">
            <FileText className="text-vt-orange shrink-0" />
            <p className="text-sm">Adesão estrita ao Regulamento de Licenciamento de Actividade Comercial e Ambiental.</p>
          </div>
        </div>
      </div>
    )
  });

  const detailedProjects = [
    {
      category: "Planeamento",
      title: "PDUT de Mágoè e Cahora Bassa",
      client: "Ministério da Terra e Ambiente / FNDS / Projecto PERS",
      partner: "TSPA",
      location: "Distritos de Mágoè e Cahora Bassa, Tete",
      year: "2024",
      description: "Elaboração do Plano Distrital de Uso da Terra de Mágoè e Revisão do Plano Distrital de Uso da Terra de Cahora Bassa. O projecto visa orientar o desenvolvimento socioeconómico sustentável dos distritos nos próximos 20 anos, assegurando a protecção ambiental, resiliência climática e a conservação de recursos naturais e ecossistemas (incluindo o Parque Nacional de Mágoè).",
      stats: ["Planeamento Integrado", "Conservação Ambiental", "Resiliência Climática"],
      events: [
        {
          date: "Julho 2024",
          title: "Relatório Inicial (Inception Report)",
          location: "Tete",
          summary: "Fase de desencadeamento com análise e definição de abordagens sensíveis ao clima, planeamento incremental e multinível, focando nas áreas de conservação e inclusão comunitária.",
          highlights: ["Abordagem Participativa", "Planeamento Incremental", "Responsividade ao Clima"]
        },
        {
          date: "Etapa 2 & 3",
          title: "Diagnóstico & Análise da Situação Actual",
          location: "Mágoè e Cahora Bassa",
          summary: "Sistematização de dados biofísicos, socioeconómicos e infra-estruturais, incluindo análises de risco ambiental e vulnerabilidade climática.",
          highlights: ["Análise de Vulnerabilidade", "Recursos Hídricos", "Dinâmicas Sócio-Demográficas"]
        },
        {
          date: "Etapa 5",
          title: "Workshop de Cenários (em parceria com TSPA)",
          location: "Tete",
          image: cahoraBassaImg,
          summary: "Desenvolvimento participativo de cenários alinhados ao PNDT e PEOT Zambeze, estabelecendo o modelo de ordenamento para alocação de uso sustentável. Realizado em parceria com a TSPA.",
          highlights: ["Consulta Pública", "Desenho Participativo", "Validação"]
        },
        {
          date: "Etapa 6",
          title: "Proposta do Plano: Cenários de Desenvolvimento",
          location: "Cahora Bassa, Mágoè e Zumbo",
          images: [
            { src: cbMap1, caption: "Cahora Bassa: Cenário Turístico" },
            { src: cbMap2, caption: "Cahora Bassa: Cenário Agropecuário" },
            { src: cbMap3, caption: "Cahora Bassa: Cenário Pesqueiro" },
            { src: mgMap1, caption: "Mágoè: Cenário Turístico" },
            { src: mgMap2, caption: "Mágoè: Cenário Pesqueiro" },
            { src: mgMap3, caption: "Mágoè: Cenário Agropecuário" },
            { src: zmbMap1, caption: "Zumbo-Sede: Cenário Pesqueiro" }
          ],
          summary: "Mapas de propostas de desenvolvimento focado nos sectores Turístico, Agropecuário e Pesqueiro.",
          highlights: ["Turístico", "Agropecuário", "Pesqueiro"]
        }
      ]
    },
    {
      category: "Planeamento & Resiliência",
      title: "PEUCP - Plano de Estrutura Urbana de Pemba",
      client: "Conselho Autárquico da Cidade de Pemba / Alto Comissariado Britânico",
      location: "Cidade de Pemba, Cabo Delgado",
      year: "2023 - 2024 (Concluído)",
      description: "Plano estratégico integrado focado na gestão do crescimento urbano acelerado, resiliência a eventos climáticos extremos e integração da economia de gás offshore.",
      stats: ["Visão Grande Pemba", "Liderança em Clima", "Integração Regional"],
      pillars: [
        { title: "Drenagem & Resiliência", desc: "Sistema integrado para toda a península visando mitigar inundações e erosão costeira." },
        { title: "Nós Urbanos", desc: "Criação de novas centralidades dinâmicas em Metula, Chuiba e Mahate para descentralizar serviços." },
        { title: "Indústria & Logística", desc: "Apoio on-shore ao sector de gás e optimização do Porto de Pemba e Aeródromo." },
        { title: "Building Back Better", desc: "Abordagem holística para reconstrução resiliente e reordenamento de assentamentos informais." }
      ],
      events: [
        {
          title: "Publicação do Volume IV: Execução e Implementação",
          date: "Novembro de 2023",
          location: "Cidade de Pemba",
          summary: "Entrega da versão final do roteiro operacional com projecções de expansão habitacional em 3 fases até 2053.",
          highlights: ["Fase 1: Consolidação do tecido existente", "Projecto da Circular Este de Pemba", "Regularização fundiária massiva"]
        }
      ]
    },
    {
      category: "Planeamento & Logística",
      title: "PEUCN - Plano de Estrutura Urbana de Nacala",
      client: "Conselho Municipal da Cidade de Nacala",
      location: "Cidade de Nacala, Nampula",
      year: "2025 - 2026 (Em Execução)",
      description: "Plano estratégico para a maior cidade portuária do norte de Moçambique. O projecto foca na modernização logística, gestão de resíduos industriais e soluções integradas para a erosão costeira e de encostas.",
      stats: ["Hub Logístico Regional", "Gestão Ambiental 20 anos", "Foco em Transição Informal"],
      pillars: [
        { title: "Porto & Logística", desc: "Integração do Porto de Nacala com corredores ferroviários e rodoviários para o mercado regional." },
        { title: "Resiliência Costeira", desc: "Sistemas de drenagem e barreiras naturais para mitigar a erosão e o avanço das ravinas." },
        { title: "Habitação Resiliente", desc: "Regularização fundiária massiva e fomento de habitação social no bairro Bloco I e arredores." },
        { title: "Inovação Industrial", desc: "Criação de parques industriais planeados e infraestruturas para a economia azul." }
      ],
      events: [
        {
          title: "Publicação do Volume IV: Plano de Execução",
          date: "Outubro de 2025",
          location: "Cidade de Nacala",
          summary: "Estruturação das Unidades Operativas de Planeamento e Gestão (UOPG) para operacionalizar os investimentos prioritários.",
          highlights: ["Lançamento da estratégia Building Back Better (BBB)", "Definição do modelo de porto duplo", "Digitalização do cadastro territorial"]
        }
      ]
    },
    {
      category: "Planeamento Territorial",
      title: "PEU - Planos de Estrutura Urbana Autárquica",
      client: "Ministério da Terra, Ambiente e Desenvolvimento Rural",
      location: "Sussundenga, Alto Molócuè, Gurúè, Milange, Nhamatanda e Boane",
      year: "2017 - 2019",
      description: "Elaboração de planos estratégicos visando o ordenamento territorial sustentável para 6 autarquias em expansão. Foco em crescimento compacto e infraestruturas resilientes.",
      stats: ["15 Membros de Equipa", "72.8M MT Orçamento", "8 Etapas de Implementação"]
    },
    {
      category: "Ordenamento Rural",
      title: "PDUTS - Plano Distrital de Uso de Terra",
      client: "Fundo Nacional de Desenvolvimento Sustentável (FNDS)",
      location: "Distrito de Sussundenga",
      year: "2020 - 2021",
      description: "Serviços de consultoria para a elaboração do plano director de uso de terra, integrando componentes socioambientais, biofísicos e económicos.",
      stats: ["11 Membros de Equipa", "14.8M MT Orçamento", "7 Meses de Prazo"]
    },
    {
      category: "Arquitectura & Obras",
      title: "Edifício Misto Bairro Central (12 Pisos)",
      client: "Grupo Loja das Damas",
      location: "Maputo, Moçambique",
      year: "Junho 2018 (Início)",
      description: "Projecto executivo e arquitectura para edifício de alta densidade no coração histórico de Maputo, respeitando as características patrimoniais da zona.",
      stats: ["7 Membros de Equipa", "7.8M MT Orçamento", "24 Meses de Prazo"]
    },
    {
      category: "Planeamento Urbano",
      title: "Modelo Territorial de Mucuache",
      client: "Conselho Municipal da Cidade de Nampula",
      location: "Nampula, Moçambique",
      year: "Maio 2015 (Início)",
      description: "Desenvolvimento de planos urbanos de pormenor para a unidade comunal de Mucuache, visando a regularização urbanística e melhoria de infraestruturas.",
      stats: ["7 Membros de Equipa", "1.4M MT Orçamento", "8 Meses de Prazo"]
    },
    {
      category: "Planeamento & Infraestrutura",
      title: "PEUVM - Plano de Estrutura Urbana de Mandlakazi",
      client: "Conselho Municipal da Vila de Mandlakazi (CMCN) / PDUL",
      location: "Vila de Mandlakazi, Gaza",
      year: "2024 - 2025 (Concluído)",
      description: "Plano mestre focado em resiliência climática e Soluções Baseadas na Natureza (SbN). O projecto estabelece um roteiro operacional para transformar a Vila num polo logístico regional sustentável.",
      stats: ["217.5M USD Investimento", "4 Horizontes Temporais", "7 Unidades UOPG"],
      pillars: [
        { title: "Resiliência Climática", desc: "Gestão de ravinas e erosão costeira com infraestruturas verdes e azuis." },
        { title: "Expansão Planeada", desc: "Criação de novas centralidades habitacionais e regularização fundiária massiva." },
        { title: "Polo Logístico", desc: "Fortalecimento do sistema industrial e corredores de transporte regional." },
        { title: "Gestão & Monitoria", desc: "Capacitação institucional com foco em SIG e digitalização de processos." }
      ],
      events: [
        {
          title: "Horizonte 2030: Estabilização Territorial",
          date: "Fase 1",
          location: "Todo o Território",
          summary: "Foco na redução de riscos imediatos, drenagem e mobilidade básica nos bairros consolidados.",
          highlights: ["Regularização fundiária prioritária", "Gestão de ravinas em áreas críticas", "Obras de saneamento e iluminação"]
        },
        {
          title: "Horizonte 2045: Consolidação Urbana",
          date: "Fase Final",
          location: "Polo Metropolitano",
          summary: "Maturidade do modelo territorial com plena integração económica e infraestrutura verde contínua.",
          highlights: ["Centralidades autónomas", "Mobilidade regional estruturada", "Receitas municipais auto-sustentáveis"]
        }
      ]
    },
    {
      category: "Reordenamento Urbano",
      title: "Plano de Melhoramento de Macurrungo-Miquejo",
      client: "Conselho Municipal da Beira / GCIP (UK Gov)",
      location: "Bairro de Macurrungo, Beira",
      year: "2025 - 2026 (Em Execução)",
      description: "Projecto de requalificação de zona informal com foco em melhoramento integrado, regularização fundiária e resiliência ambiental. Redesenho viário e criação de infraestruturas verdes.",
      stats: ["4 Eixos Estratégicos", "Soluções Participativas", "Infraestrutura Verde"],
      pillars: [
        { title: "Rede Viária & Drenagem", desc: "Via estruturante de 12m ligando a Vala A0 ao terminal de Manganhe, com redes de drenagem integradas." },
        { title: "Equipamentos Sociais", desc: "Implementação de postos de apoio social e segurança (Modelo COMPAZ) e escolas acessíveis." },
        { title: "Economia Local", desc: "Requalificação estratégica de bancas informais para dinamizar o comércio e garantir salubridade." },
        { title: "Habitação Vertical", desc: "Modelos de habitação substitutiva planaeda para realocação de famílias em zonas de risco." }
      ],
      events: [
        {
          title: "1ª Audiência Pública de Validação",
          date: "27 de Março de 2025",
          location: "Sede do Bairro de Macurrungo",
          summary: "Apresentação e validação do diagnóstico com 163 participantes. Foco em drenagem, iluminação e modelos de compensação justa.",
          highlights: [
            "Participação de 163 líderes e moradores",
            "Discussão sobre valas secundárias e terciárias",
            "Necessidade de reordenamento de mercados",
            "Compromisso com impactos mínimos de deslocamento"
          ]
        },
        {
          title: "Workshop de Propostas de Desenhos Participativos",
          date: "27 de Junho de 2025",
          location: "Conselho Municipal da Beira",
          summary: "Apresentação de cenários de intervenção. Seleccionado o cenário de Melhoramento Integrado com Regularização Fundiária.",
          highlights: [
            "Eixo I: Rede Viária e Drenagem (Via Estruturante 12m)",
            "Eixo II: Equipamentos e Espaços Públicos (Unidade COMPAZ)",
            "Eixo III: Requalificação de Actividades Económicas",
            "Eixo IV: Habitação Vertical Substitutiva"
          ]
        }
      ]
    },
    {
      category: "Mobilidade Urbana",
      title: "Plano Director Municipal de Mobilidade Urbana (PDMMU) - Beira",
      client: "Conselho Municipal da Beira / PDUL",
      location: "Cidade da Beira, Sofala",
      year: "2024 - 2026 (Implementação)",
      description: "Elaboração de diagnóstico e plano director visando a eficiência da circulação de pessoas e bens, diversificação modal e redução de congestionamentos crónicos.",
      stats: ["6 Fases Sequenciais", "Foco em Diversificação Modal", "Integração com Saneamento"],
      events: [
        {
          title: "Acta da Apresentação do Diagnóstico da Situação Actual",
          date: "31 de Julho de 2025",
          location: "Salão Nobre do Edifício do Conselho Municipal da Beira",
          summary: "Sessão participativa com 51 convidados para validação do diagnóstico. Discussão focada em pontos de congestionamento, reordenamento de mercados informais e necessidade de vias alternativas.",
          highlights: [
            "Requalificação da Rua Alfredo Lawley (Sentido Único)",
            "Transferência de mercados informais das bermas da N6",
            "Estudo de capacidade viária e parques de estacionamento",
            "Integração com projectos de saneamento do UN-Habitat"
          ]
        }
      ]
    },
    {
      category: "Arquitectura",
      title: "Projecto Residencial Matola Rio",
      client: "Cliente Particular",
      location: "Província de Maputo",
      year: "24 Meses",
      description: "Projecto arquitectónico completo para um complexo residencial privado, integrando sustentabilidade ambiental e eficiência energética.",
      stats: ["Design Moderno", "Sustentabilidade", "Eficiência Energética"]
    },
    {
      category: "Especial",
      title: "Plano Geral de Urbanização - Lumbo",
      client: "ATOZ, Consultoria e Serviços",
      location: "Ilha de Moçambique",
      year: "3 Meses",
      description: "Desenvolvimento de um plano geral de urbanização rápido focado na expansão sustentável e preservação histórica.",
      stats: ["Rápida Execução", "Património Histórico", "Expansão Sustentável"]
    },
    {
      category: "Capacitação",
      title: "Capacitação Institucional APIEX",
      client: "APIEX Moçambique",
      location: "Maputo",
      year: "2023",
      description: "Programa intensivo de capacitação técnica para técnicos em gestão territorial, sistemas SIG e planeamento estratégico.",
      stats: ["Formação SIG", "Gestão Territorial", "Planeamento Estratégico"]
    },
    {
      category: "Saneamento",
      title: "Abordagem Participativa de Saneamento",
      client: "Conselho Municipal da Ilha de Moçambique",
      location: "Ilha de Moçambique",
      year: "2022",
      description: "Desenho e facilitação de formação comunitária sobre práticas sustentáveis de saneamento do meio urbano.",
      stats: ["Participação Comunitária", "Saneamento Básico", "Saúde Pública"]
    }
  ];

  const handleOpenProject = (keyword: string) => {
    const proj = detailedProjects.find(p => p.title.includes(keyword) || p.description.includes(keyword) || p.location.includes(keyword) || p.client.includes(keyword));
    setView('portfolio');
    if (proj) {
      setTimeout(() => setSelectedProject(proj), 100);
    }
    window.scrollTo(0, 0);
  };

  if (view === 'portfolio') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar setView={setView} currentView={view} />
        
        {/* Portfolio Hero Header */}
        <header className="bg-vt-dark pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 map-pattern pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
            >
              <div className="space-y-4">
                <button 
                  onClick={() => { setView('home'); window.scrollTo(0,0); }}
                  className="text-vt-orange font-bold flex items-center gap-2 mb-4 hover:gap-3 transition-all cursor-pointer"
                >
                  <ArrowRight className="rotate-180" /> Voltar ao Início
                </button>
                <h1 className="font-display text-5xl font-bold text-white tracking-tight">
                  Portfólio <span className="text-vt-orange font-light italic">Detalhado</span>
                </h1>
                <p className="text-white/50 max-w-lg text-lg">
                  Uma visão técnica aprofundada sobre os nossos projectos de maior impacto no desenvolvimento sustentável de Moçambique.
                </p>
              </div>
            </motion.div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="space-y-24">
            {[
              { 
                title: "Planeamento Territorial e Urbanismo", 
                projects: detailedProjects.filter(p => ['Planeamento', 'Urbano', 'Resiliência', 'Ordenamento', 'Logística', 'Mobilidade', 'Especial', 'Reordenamento'].some(c => p.category.includes(c))) 
              },
              { 
                title: "Arquitetura e Fiscalização", 
                projects: detailedProjects.filter(p => ['Arquitectura', 'Arquitetura', 'Edificações'].some(c => p.category.includes(c))) 
              },
              { 
                title: "Capacitação Institucional", 
                projects: detailedProjects.filter(p => ['Capacitação', 'Saneamento'].some(c => p.category.includes(c))) 
              }
            ].map((section, sIdx) => (
              <div key={sIdx}>
                <h2 className="text-3xl font-display font-bold text-vt-dark mb-10 border-b-2 border-gray-100 pb-4">{section.title}</h2>
                <div className="grid gap-12">
                  {section.projects.map((project, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 grid lg:grid-cols-3 gap-12"
                    >
                      <div className="lg:col-span-2 space-y-6">
                        <div className="flex gap-3">
                          <span className="px-4 py-1 bg-orange-50 text-vt-orange rounded-full text-xs font-bold uppercase tracking-widest">{project.category}</span>
                          <span className="px-4 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold uppercase tracking-widest">{project.year}</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold leading-tight">{project.title}</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">{project.description}</p>
                        
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="flex items-center gap-2 text-vt-orange font-bold hover:gap-3 transition-all cursor-pointer bg-orange-50 px-6 py-2 rounded-full w-fit mt-2"
                        >
                          Saiba Mais <ArrowRight size={18} />
                        </button>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                          {project.stats.map(stat => (
                            <div key={stat} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                              <p className="text-vt-dark font-bold text-sm">{stat}</p>
                            </div>
                          ))}
                        </div>

                        {project.events && (
                          <div className="mt-8 space-y-6">
                            <h4 className="font-display font-bold text-xl flex items-center gap-2">
                              <FileText className="text-vt-orange" /> Documentação & Eventos
                            </h4>
                            <div className="space-y-4">
                              {project.events.map((event: any, eIdx: number) => (
                                <div key={eIdx} className="bg-orange-50/50 p-6 rounded-[2rem] border border-orange-100/50">
                                  {event.images && event.images.length > 0 ? (
                                    <ImageCarousel images={event.images} />
                                  ) : event.image ? (
                                    <div className="mb-6 rounded-2xl overflow-hidden shadow-sm">
                                      <img src={event.image} alt={event.title} className="w-full h-auto max-h-64 object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                  ) : null}
                                  <div className="flex justify-between items-start mb-4 gap-4 flex-wrap">
                                    <div>
                                      <p className="text-xs font-bold text-vt-orange uppercase tracking-widest">{event.date}</p>
                                      <h5 className="font-bold text-lg">{event.title}</h5>
                                    </div>
                                    <div className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-gray-400 border border-gray-100 flex items-center gap-1">
                                      <MapPin size={10} /> {event.location}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-4">{event.summary}</p>
                                  <div className="grid md:grid-cols-2 gap-2">
                                    {event.highlights.map((highlight: string) => (
                                      <div key={highlight} className="flex items-center gap-2 text-xs text-gray-500 bg-white p-2 rounded-lg border border-gray-50">
                                        <ChevronRight size={12} className="text-vt-orange" />
                                        {highlight}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6 border-l border-gray-100 pl-8 hidden lg:block">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Cliente</p>
                          <p className="font-bold text-gray-800">{project.client}</p>
                        </div>
                        {project.partner && (
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Parceiro(s)</p>
                            <p className="font-bold text-gray-800">{project.partner}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Localização</p>
                          <p className="font-bold text-gray-800 flex items-center gap-2">
                            <MapPin size={16} className="text-vt-orange" /> {project.location}
                          </p>
                        </div>
                        <div className="pt-8">
                          <div className="w-full h-32 bg-gray-50 rounded-3xl map-pattern opacity-50 flex items-center justify-center">
                            <Compass className="text-vt-orange" size={32} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Project Detail Modal */}
        <Modal 
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.title || ''}
          content={
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-100 text-vt-orange rounded-full text-[10px] font-bold uppercase tracking-wider">{selectedProject?.category}</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-wider">{selectedProject?.year}</span>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-vt-dark flex items-center gap-2 border-b border-gray-100 pb-2">
                  <Target size={18} className="text-vt-orange" /> Objectivo do Projecto
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProject?.description}
                </p>
              </div>

              {selectedProject?.pillars && (
                <div className="space-y-4">
                  <h4 className="font-bold text-vt-dark flex items-center gap-2 border-b border-gray-100 pb-2">
                    <Building2 size={18} className="text-vt-orange" /> Eixos de Intervenção
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {selectedProject.pillars.map((pillar: any) => (
                      <div key={pillar.title} className="bg-orange-50/30 p-3 rounded-xl border border-orange-100/50">
                        <p className="font-bold text-xs text-vt-dark mb-1">{pillar.title}</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-vt-dark flex items-center gap-2 border-b border-gray-100 pb-2">
                    <Users size={18} className="text-vt-orange" /> Detalhes Técnicos
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject?.stats.map((stat: string) => (
                      <li key={stat} className="flex items-center gap-2 text-sm text-gray-600">
                        <ChevronRight size={14} className="text-vt-orange" />
                        {stat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-vt-dark flex items-center gap-2 border-b border-gray-100 pb-2">
                    <MapPin size={18} className="text-vt-orange" /> Localização & Cliente
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400 font-medium">Cliente:</span> <span className="text-gray-700 font-bold">{selectedProject?.client}</span></p>
                    <p><span className="text-gray-400 font-medium">Local:</span> <span className="text-gray-700 font-bold">{selectedProject?.location}</span></p>
                  </div>
                </div>
              </div>

              {selectedProject?.events && (
                <div className="space-y-4">
                  <h4 className="font-bold text-vt-dark flex items-center gap-2 border-b border-gray-100 pb-2">
                    <FileText size={18} className="text-vt-orange" /> Marco de Implementação
                  </h4>
                  {selectedProject.events.map((event: any, eIdx: number) => (
                    <div key={eIdx} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      {event.images && event.images.length > 0 ? (
                        <ImageCarousel images={event.images} />
                      ) : event.image ? (
                        <div className="mb-4 rounded-xl overflow-hidden shadow-sm">
                          <img src={event.image} alt={event.title} className="w-full h-auto max-h-48 object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : null}
                      <p className="text-[10px] font-bold text-vt-orange uppercase">{event.date}</p>
                      <p className="font-bold text-gray-800 text-sm mb-2">{event.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{event.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          }
        />

        <footer className="mt-24 bg-vt-dark text-white py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
             <p className="text-white/50 text-sm">© 2026 VOCAÇÃO TÉCNICA, LDA - Moçambique</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar setView={setView} currentView={view} />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-vt-dark z-0">
          {/* Stylized Map Underlay */}
          <div className="absolute inset-0 opacity-15 overflow-hidden">
             <div className="absolute top-0 right-0 w-[800px] h-full rotate-12 -mr-40 pointer-events-none">
              <div className="grid grid-cols-12 gap-1 h-full w-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-white/20"></div>
                ))}
              </div>
             </div>
          </div>
          {/* Radical Gradients */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-vt-orange/30 to-transparent blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-vt-orange/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white/80 text-sm font-medium tracking-wide"
            >
              <div className="h-2 w-2 bg-vt-orange rounded-full animate-pulse"></div>
              Assistência Técnica Profissional
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9]"
            >
              VOCAÇÃO <br />
              <span className="text-vt-orange italic">TÉCNICA</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
            >
              Potencializamos o desenvolvimento local através de soluções inovadoras em Planeamento Territorial, Arquitectura e Governação Participativa em Moçambique.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => { setView('portfolio'); window.scrollTo(0,0); }}
                className="vt-gradient text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,107,43,0.4)] transition-all flex items-center gap-2 group"
              >
                Ver Portfólio <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#sobre" className="bg-white/5 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                A Nossa Missão
              </a>
            </motion.div>

            {/* Hero Quick Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-stats pt-12 border-t border-white/10"
            >
              <div>
                <p className="text-vt-orange font-display text-3xl font-bold">14+ Anos</p>
                <p className="text-white/50 text-sm">Experiência Profissional</p>
              </div>
              <div>
                <p className="text-vt-orange font-display text-3xl font-bold">50+ Projetos</p>
                <p className="text-white/50 text-sm">Concluídos com Sucesso</p>
              </div>
              <div className="hidden md:block">
                <p className="text-vt-orange font-display text-3xl font-bold">100%</p>
                <p className="text-white/50 text-sm">Capital Moçambicano</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="hidden lg:block relative"
          >
            <div className="w-[450px] h-[550px] bg-gradient-to-tr from-vt-orange/20 to-transparent border-2 border-white/20 rounded-[4rem] relative overflow-hidden group">
              <div className="absolute inset-4 border border-white/10 rounded-[3.5rem] overflow-hidden">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xs flex items-center justify-center p-12 text-center flex-col gap-6">
                   <div className="w-24 h-24 bg-vt-orange rounded-3xl flex items-center justify-center text-white rotate-12">
                      <Compass size={56} />
                   </div>
                   <h3 className="text-white font-display text-2xl font-bold">Inovação e Qualidade Técnica</h3>
                   <p className="text-white/50 text-sm">Equipa multidisciplinar composta por profissionais de alto padrão internacional.</p>
                </div>
              </div>
              {/* Radar Element */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-vt-orange/30 rounded-full animate-[ping_3s_linear_infinite]"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guia Rápido do Site */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-vt-orange uppercase tracking-widest mb-3">Bem-vindo</p>
          <h2 className="text-3xl font-display font-bold text-vt-dark mb-10">Como explorar o nosso site</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-orange-50 text-vt-orange flex items-center justify-center rounded-xl mb-4 mx-auto">
                <Compass size={20} />
              </div>
              <p className="font-bold text-vt-dark mb-2">Sobre & Missão</p>
              <p className="text-gray-500 text-sm">Conheça a nossa história e o nosso compromisso com Moçambique.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-orange-50 text-vt-orange flex items-center justify-center rounded-xl mb-4 mx-auto">
                <Building2 size={20} />
              </div>
              <p className="font-bold text-vt-dark mb-2">Nossos Serviços</p>
              <p className="text-gray-500 text-sm">Explore as áreas de Planeamento, Arquitectura e Engenharias.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 cursor-pointer" onClick={() => { setView('portfolio'); window.scrollTo(0,0); }}>
              <div className="w-10 h-10 bg-orange-50 text-vt-orange flex items-center justify-center rounded-xl mb-4 mx-auto">
                <FileText size={20} />
              </div>
              <p className="font-bold text-vt-dark mb-2">Portfólio Detalhado</p>
              <p className="text-gray-500 text-sm">Estudos de caso e impacto real dos nossos principais projectos.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 cursor-pointer" onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-orange-50 text-vt-orange flex items-center justify-center rounded-xl mb-4 mx-auto">
                <Phone size={20} />
              </div>
              <p className="font-bold text-vt-dark mb-2">Contacto Direto</p>
              <p className="text-gray-500 text-sm">Localização da sede e canais de comunicação disponíveis.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-100"
      >
        <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10">Colaboramos com Parceiros de Referência</p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          {["UK Government", "World Bank", "UN-Habitat", "JICA", "ENABEL", "PDUL"].map((partner) => (
            <span key={partner} className="text-sm md:text-base font-display font-black text-vt-dark whitespace-nowrap">{partner}</span>
          ))}
        </div>
      </motion.div>

      {/* Quote / Intro Section */}
      <section id="sobre" className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 text-vt-orange opacity-40">
                <Users size={120} />
              </div>
              <div className="relative z-10 bg-white p-12 rounded-[3rem] shadow-2xl space-y-6 border border-orange-100">
                <span className="text-vt-orange text-8xl font-serif line-clamp-none leading-none select-none">“</span>
                <p className="text-2xl font-light text-vt-dark leading-relaxed">
                  Vocação Técnica, Lda é uma empresa moçambicana de excelência, especialista em Planeamento Físico, Infraestruturas e Governação Urbana. Lideramos com Soluções Baseadas na Natureza (SbN) para construir cidades resilientes.
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-vt-orange">
                    <UserCheck size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Msc. Roberto Bernardo</h4>
                    <p className="text-gray-500 text-sm uppercase tracking-widest">Sócio-Administrador</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-12">
              <SectionHeading subtitle="Conheça os pilares que sustentam a nossa excelência técnica.">
                A nossa <span className="text-vt-orange">Identidade</span>
              </SectionHeading>

              <div className="grid gap-8">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex gap-6 items-start"
                >
                  <div className="shrink-0 w-14 h-14 bg-vt-orange text-white flex items-center justify-center rounded-2xl shadow-lg">
                    <Target size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">A Nossa Missão</h4>
                    <p className="text-gray-500 leading-relaxed">
                      Transformar positivamente o contexto da governação local e de resolução de problemas específicos de desenvolvimento local sustentável, por meio de prestação de assistência técnica-profissional.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex gap-6 items-start"
                >
                  <div className="shrink-0 w-14 h-14 bg-vt-dark text-white flex items-center justify-center rounded-2xl shadow-lg">
                    <Lightbulb size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">A Nossa Visão</h4>
                    <p className="text-gray-500 leading-relaxed">
                      Promover iniciativas que melhorem o contexto técnico-profissional a nível local (distritos e municípios), para garantir o exercício efectivo da governação participativa.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-vt-orange/[0.02] -skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading subtitle="Soluções integradas para os desafios do desenvolvimento contemporâneo.">
            Áreas de <span className="text-vt-orange">Actuação</span>
          </SectionHeading>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={MapIcon}
              title="Planeamento Territorial e urbanismo"
              items={[
                "Planos de Estrutura Urbana (PEU)",
                "Planos de Pormenor e Reordenamento",
                "Soluções Baseadas na Natureza (SbN)",
                "Estratégias de Resiliência Climática",
                "Zoneamento e Cadastro Digital"
              ]}
            />
            <ServiceCard 
              icon={Building2}
              title="Arquitetura e fiscalização"
              items={[
                "Projectos Executivos Habitacionais",
                "Acompanhamento e Fiscalização",
                "Projectos de Infraestruturas",
                "Projectos Arquitectónicos",
                "Instalações Hidráulicas e Eléctricas"
              ]}
            />
            <ServiceCard 
              icon={Users}
              title="Capacitação Institucional"
              items={[
                "Capacitação em Instrumentos de Planeamento",
                "Treinamento em Liderança Participativa",
                "Assistência Técnica a Municípios",
                "Processos de Audiências Públicas",
                "Incentivo à Produtividade Local"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="processo" className="py-24 bg-vt-dark text-white relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-6 h-full w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-r border-white"></div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading light subtitle="A nossa abordagem científica garante resultados sustentáveis e realistas.">
            O Nosso <span className="text-vt-orange">Processo</span>
          </SectionHeading>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-12">
            <StepCard number="01" title="Diagnóstico & Perfil" desc="Levantamento exaustivo dos valores locais, biofísicos e socioeconómicos para entender a situação actual." />
            <StepCard number="02" title="Visão & Estratégia" desc="Definição do cenário desejado e dos motores de desenvolvimento em conjunto com a comunidade local." />
            <StepCard number="03" title="Quadro Regulamentar" desc="Estabelecimento de normas, parâmetros e condicionantes urbanas para garantir o uso ordenado do solo." />
            <StepCard number="04" title="Plano de Execução" desc="Estruturação de acções calendarizadas, estimativas de custos e estratégias de financiamento sustentável." />
            <StepCard number="05" title="Gestão & Monitoria" desc="Acompanhamento contínuo através de indicadores de desempenho e ajuste dinâmico às transformações urbanas." />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-20 p-12 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-display font-bold">Rede de <span className="text-vt-orange">Trabalho</span></h3>
                <p className="text-white/60 leading-relaxed">
                  Trabalhamos em estreita colaboração com o Governo Central, Municípios, Empresas de Consultoria e Profissionais Independentes para entregar soluções multidisciplinares.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Sustentável', 'Realista', 'Pragmático', 'Participativo'].map(tag => (
                    <span key={tag} className="px-4 py-1.5 border border-vt-orange/50 text-vt-orange rounded-full text-xs font-bold uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-6 rounded-3xl">
                    <h5 className="font-bold mb-2">Governo</h5>
                    <p className="text-xs text-white/50">Planos de estrutura urbana e pormenor.</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-3xl">
                    <h5 className="font-bold mb-2">Comunidade</h5>
                    <p className="text-xs text-white/50">Audiências públicas e validação participativa.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Alguns dos trabalhos que impactaram comunidades e transformaram o ordenamento territorial.">
            Trabalhos de <span className="text-vt-orange">Referência</span>
          </SectionHeading>

          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-display font-bold text-vt-dark mb-8 border-b border-gray-100 pb-3 flex items-center gap-3">
                <MapPin className="text-vt-orange" size={24} /> Planeamento Territorial e Urbanismo
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard 
                  category="Planeamento"
                  title="PDUT de Mágoè e Cahora Bassa"
                  client="MTA / FNDS / Projecto PERS"
                  location="Distritos de Mágoè e Cahora Bassa"
                  year="2024"
                  onSeeDetails={() => handleOpenProject('Cahora Bassa')}
                />
                <ProjectCard 
                  category="Resiliência"
                  title="PEU - Cidade de Pemba"
                  client="Conselho Municipal de Pemba"
                  location="Pemba, Cabo Delgado"
                  year="2023 - 2024"
                  onSeeDetails={() => handleOpenProject('Pemba')}
                />
                <ProjectCard 
                  category="Logística"
                  title="PEUCN - Cidade de Nacala"
                  client="Conselho Municipal de Nacala"
                  location="Nacala, Nampula"
                  year="2025 - 2026"
                  onSeeDetails={() => handleOpenProject('Nacala')}
                />
                <ProjectCard 
                  category="Mobilidade"
                  title="PDMMU - Cidade da Beira"
                  client="Conselho Municipal da Beira"
                  location="Beira, Sofala"
                  year="2026 (Em Execução)"
                  onSeeDetails={() => handleOpenProject('PDMMU')}
                />
                <ProjectCard 
                  category="Reordenamento"
                  title="PPU - Macurrungo-Miquejo"
                  client="Conselho Municipal da Beira"
                  location="Bairro Macurrungo, Beira"
                  year="2025 - 2026"
                  onSeeDetails={() => handleOpenProject('Macurrungo')}
                />
                <ProjectCard 
                  category="Planeamento"
                  title="PEU - Mandlakazi"
                  client="Conselho Municipal de Mandlakazi"
                  location="Mandlakazi, Gaza"
                  year="2024 - 2025 (Concluído)"
                  onSeeDetails={() => handleOpenProject('Mandlakazi')}
                />
                <ProjectCard 
                  category="Ordenamento"
                  title="PDUTS - Distrito de Sussundenga"
                  client="Fundo Nacional de Desenvolvimento Sustentável"
                  location="Província de Manica"
                  year="2020 - 2021"
                  onSeeDetails={() => handleOpenProject('Sussundenga')}
                />
                <ProjectCard 
                  category="Urbano"
                  title="Modelo Territorial de Mucuache"
                  client="Conselho Municipal de Nampula"
                  location="Cidade de Nampula"
                  year="8 Meses"
                  onSeeDetails={() => handleOpenProject('Mucuache')}
                />
                <ProjectCard 
                  category="Especial"
                  title="Plano Geral de Urbanização - Lumbo"
                  client="ATOZ, Consultoria e Serviços"
                  location="Ilha de Moçambique"
                  year="3 Meses"
                  onSeeDetails={() => handleOpenProject('Lumbo')}
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-vt-dark mb-8 border-b border-gray-100 pb-3 flex items-center gap-3">
                <Building2 className="text-vt-orange" size={24} /> Arquitetura e Fiscalização
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard 
                  category="Arquitectura"
                  title="Projecto Residencial Matola Rio"
                  client="Cliente Particular"
                  location="Província de Maputo"
                  year="24 Meses"
                  onSeeDetails={() => handleOpenProject('Matola')}
                />
                <ProjectCard 
                  category="Edificações"
                  title="Edifício Misto Central (12 Pisos)"
                  client="Grupo Loja das Damas"
                  location="Maputo, Bairro Central"
                  year="24 Meses"
                  onSeeDetails={() => handleOpenProject('Misto')}
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-vt-dark mb-8 border-b border-gray-100 pb-3 flex items-center gap-3">
                <Compass className="text-vt-orange" size={24} /> Capacitação Institucional
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard 
                  category="Capacitação"
                  title="Capacitação Institucional APIEX"
                  client="APIEX Moçambique"
                  location="Maputo"
                  year="2023"
                  onSeeDetails={() => handleOpenProject('APIEX')}
                />
                <ProjectCard 
                  category="Saneamento"
                  title="Abordagem Participativa de Saneamento"
                  client="Conselho Municipal da Ilha de Moçambique"
                  location="Ilha de Moçambique"
                  year="2022"
                  onSeeDetails={() => handleOpenProject('Abordagem Participativa')}
                />
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={() => { setView('portfolio'); window.scrollTo(0,0); }}
              className="inline-flex items-center gap-2 text-vt-dark font-bold text-lg hover:text-vt-orange transition-colors group"
            >
              Explorar Todos os Projetos Detalhados <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <SectionHeading subtitle="Presença estratégica em centros urbanos e distritais de Moçambique. Escolha um local para ver projectos realizados.">
                Onde <span className="text-vt-orange">Trabalhamos</span>
              </SectionHeading>
              <div className="flex flex-wrap gap-3">
                {locationsData.map(loc => (
                  <LocationTag 
                    key={loc.name} 
                    name={loc.name} 
                    active={selectedLoc.name === loc.name}
                    onClick={() => setSelectedLoc(loc)}
                  />
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedLoc.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-8 bg-orange-50 rounded-[2rem] border border-orange-100"
                >
                  <h4 className="font-display font-bold text-xl mb-4 flex items-center gap-2 text-vt-orange">
                    <MapPin size={20} /> Projectos em {selectedLoc.name.split(' - ')[1] || selectedLoc.name}
                  </h4>
                  <ul className="space-y-3">
                    {selectedLoc.projects.map(proj => (
                      <li key={proj} className="flex items-center gap-3 text-sm text-gray-700 bg-white/60 p-3 rounded-xl border border-white">
                        <ChevronRight size={14} className="text-vt-orange" />
                        {proj}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setView('portfolio')}
                    className="mt-6 text-vt-orange font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Ver detalhes no portfólio <ArrowRight size={16} />
                  </button>
                </motion.div>
              </AnimatePresence>

              <p className="text-gray-500 italic text-sm">
                * Delegações permanentes em Nampula e Maputo, com equipas móveis em todas as zonas de intervenção.
              </p>
            </div>
            <div className="relative">
              <div className="h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 z-10 relative">
                <MapContainer 
                  center={[-18.6657, 35.5296]} 
                  zoom={5} 
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                  />
                  <MapController center={selectedLoc.coords} />
                  {locationsData.map(loc => (
                    <Marker 
                      key={loc.name} 
                      position={loc.coords} 
                      icon={customIcon}
                      eventHandlers={{
                        click: () => setSelectedLoc(loc),
                      }}
                    >
                      <Popup>
                        <div className="p-1 font-sans">
                          {loc.name.includes(' - ') ? (
                            <>
                              <p className="text-[9px] uppercase font-bold text-gray-400 leading-none">{loc.name.split(' - ')[0]}</p>
                              <p className="font-bold text-vt-orange">{loc.name.split(' - ')[1]}</p>
                            </>
                          ) : (
                            <p className="font-bold text-vt-orange">{loc.name}</p>
                          )}
                          <p className="text-xs text-gray-500">{loc.projects.length} projectos</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              {/* Decorative background circle */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-vt-orange/10 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 map-pattern opacity-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Estamos presentes em todo o país. Fale connosco hoje mesmo.">
            Nossos <span className="text-vt-orange">Contactos</span>
          </SectionHeading>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Nampula Office */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-orange-50 text-vt-orange flex items-center justify-center rounded-2xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-vt-orange text-xs">Delegação</h4>
                  <p className="text-2xl font-display font-bold">Nampula</p>
                </div>
              </div>
              <p className="text-gray-500 mb-6 flex items-start gap-3">
                 Av. Eduardo mondlane, nº 1234, 1º <br /> Andar Esquerdo
              </p>
              <div className="space-y-4 pt-6 border-t border-gray-50">
                <a href="tel:+258843128808" className="flex items-center gap-3 text-vt-dark hover:text-vt-orange transition-colors">
                  <Phone size={18} /> +258 843 128 808
                </a>
              </div>
            </motion.div>

            {/* Maputo Office */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-orange-50 text-vt-orange flex items-center justify-center rounded-2xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-vt-orange text-xs">Sede</h4>
                  <p className="text-2xl font-display font-bold">Maputo</p>
                </div>
              </div>
              <p className="text-gray-500 mb-6">
                Av. da Malhangale, rua da Manica, nº 1361, casa nº 188, 1º Andar Direito
              </p>
              <div className="space-y-4 pt-6 border-t border-gray-50">
                <a href="tel:+258843128807" className="flex items-center gap-3 text-vt-dark hover:text-vt-orange transition-colors">
                  <Phone size={18} /> +258 843 128 807
                </a>
              </div>
            </motion.div>

            {/* Digital Channels */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-vt-dark p-10 rounded-[3rem] shadow-xl text-white"
            >
              <div className="flex items-center gap-4 mb-8 text-vt-orange">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-2xl">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-vt-orange text-xs">Online</h4>
                  <p className="text-2xl font-display font-bold text-white">Digital</p>
                </div>
              </div>
              <div className="space-y-6">
                <a href="mailto:geral@vt.co.mz" className="group block">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">E-mail Comercial</p>
                  <p className="text-lg font-medium group-hover:text-vt-orange transition-colors flex items-center gap-2">
                    <Mail size={18} /> geral@vt.co.mz
                  </p>
                </a>
                <a href="http://www.vt.co.mz" className="group block">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Website Oficial</p>
                  <p className="text-lg font-medium group-hover:text-vt-orange transition-colors flex items-center gap-2">
                    <Globe size={18} /> www.vt.co.mz
                  </p>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
             <div className="h-16">
               <ScalableLogo scrolled={true} className="h-full" />
             </div>
             <div className="border-l border-gray-100 pl-6">
                <p className="font-bold text-sm text-vt-dark uppercase tracking-tighter">VOCAÇÃO TÉCNICA, LDA</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">© 2026 Reservados todos os direitos</p>
             </div>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <button onClick={openPrivacy} className="hover:text-vt-orange transition-colors cursor-pointer">Privacidade</button>
            <button onClick={openTerms} className="hover:text-vt-orange transition-colors cursor-pointer">Termos de Uso</button>
            <button onClick={openCompliance} className="hover:text-vt-orange transition-colors cursor-pointer">Compliance</button>
          </div>

          <p className="text-xs text-gray-400 max-w-xs text-center md:text-right italic">
            "Transformar positivamente o contexto da governação local e sustentável."
          </p>
        </div>
      </footer>

      <Modal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ ...modalState, isOpen: false })} 
        title={modalState.title} 
        content={modalState.content} 
      />
    </div>
  );
}

