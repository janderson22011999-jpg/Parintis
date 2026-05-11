/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Search, Archive, Info, MapPin, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "./lib/utils";
import { heritageItems, HeritageItem, communityMembers, teamMembers } from "./data";
import { ChatBot } from "./components/ChatBot";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "O Patrimônio", path: "/arquivo" },
    { name: "Vozes", path: "/vozes" },
    { name: "Apoiadores", path: "/curadoria" },
    { name: "Assine", path: "/manifesto" },
    { name: "A Causa", path: "/sobre" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-full border border-heritage-ink flex items-center justify-center group-hover:bg-heritage-ink group-hover:text-heritage-cream transition-colors duration-500">
          <span className="font-serif text-xl font-bold">B</span>
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-lg font-bold leading-none tracking-tight text-heritage-ink">BUMBÁ</span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-60 text-heritage-ink">Patrimônio Vivo</span>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-100",
              location.pathname === link.path ? "opacity-100 border-b border-heritage-ink pb-1" : "opacity-40"
            )}
          >
            {link.name}
          </Link>
        ))}
        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-heritage-ink/20 hover:border-heritage-ink transition-colors">
          <Search size={14} />
        </button>
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-heritage-cream z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="font-serif text-4xl hover:italic transition-all"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="px-6 py-12 border-t border-heritage-ink/10 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-heritage-ink flex items-center justify-center">
            <span className="font-serif text-sm font-bold">B</span>
          </div>
          <span className="font-serif text-lg font-bold">Bumbá Patrimônio Vivo</span>
        </div>
        <p className="text-sm opacity-60 max-w-xs">
          Mobilização pela salvaguarda e reconhecimento do Boi-Bumbá como Patrimônio Imaterial da Humanidade.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Ação</span>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/manifesto" className="hover:underline text-heritage-red font-bold">Assine a Campanha</Link>
          <Link to="/sobre" className="hover:underline">A Causa</Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Realização</span>
        <p className="text-sm opacity-60">
          Comitê Pró-UNESCO Parintins<br />
          Amazonas, Brasil
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-heritage-ink/5 flex justify-between items-center text-[10px] uppercase tracking-widest opacity-40">
      <span>© 2024 Bumbá Patrimônio Vivo</span>
      <span>Patrimônio Imaterial da Humanidade</span>
    </div>
  </footer>
);

// --- Pages ---

const Home = () => {
  return (
    <div className="pt-32">
      <section className="min-h-[80vh] flex flex-col justify-center px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-6 block">Campanha Global</span>
          <h1 className="text-7xl md:text-[10rem] font-serif leading-[0.8] tracking-tighter mb-12">
            O <span className="serif-italic">Pulsar</span> de um <br />
            Patrimônio <span className="serif-italic">Vivo</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end gap-12">
            <p className="text-xl opacity-70 max-w-md leading-relaxed">
              Exigimos o reconhecimento da nossa ancestralidade. Junte-se ao movimento para elevar o Boi-Bumbá de Parintins ao status definitivo de Patrimônio Imaterial da Humanidade.
            </p>
            <Link to="/manifesto" className="inline-flex items-center gap-4 group mb-2">
              <div className="w-14 h-14 rounded-full border border-heritage-ink bg-heritage-ink text-white flex items-center justify-center group-hover:bg-heritage-red group-hover:border-heritage-red transition-all duration-500">
                <ArrowRight size={24} />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold">Assinar Manifesto</span>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mt-40 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-2 block">Nossa Reivindicação</span>
            <h2 className="text-5xl font-serif">Por que ser <span className="serif-italic">Patrimônio Imaterial da Humanidade</span>?</h2>
          </div>
          <Link to="/arquivo" className="text-xs uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity">Ver Tudo</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {heritageItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/arquivo/${item.id}`} className="group cursor-pointer block">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] text-white uppercase tracking-widest font-bold">
                    {item.category}
                  </div>
                </div>
                <h4 className="text-xl font-serif mb-1 group-hover:italic transition-all">{item.title}</h4>
                <p className="text-xs opacity-40 uppercase tracking-widest">{item.location}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ArchivePage = () => {
  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto">
      <div className="mb-20">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-4 block">Tesouros Culturais</span>
        <h1 className="text-7xl font-serif mb-8">Nossa <span className="serif-italic">Identidade</span></h1>
        <p className="text-xl opacity-60 max-w-2xl leading-relaxed">
          Estes são os pilares irrefutáveis que fundamentam nossa exigência junto à UNESCO. O Boi-Bumbá não pede licença; ele afirma seu lugar como Patrimônio Imaterial da Humanidade através de sua história e resistência.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {heritageItems.map((item) => (
          <Link key={item.id} to={`/arquivo/${item.id}`} className="group border-b border-heritage-ink/10 pb-12 block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square overflow-hidden rounded-2xl">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col justify-between py-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2 block">{item.category}</span>
                  <h3 className="text-3xl font-serif mb-4 group-hover:italic transition-all">{item.title}</h3>
                  <p className="text-sm opacity-60 leading-relaxed mb-6">{item.description}</p>
                </div>
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold opacity-40">
                  <span className="flex items-center gap-2"><MapPin size={12} /> {item.location}</span>
                  <span className="flex items-center gap-2"><Calendar size={12} /> {item.year}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-32 px-6 max-w-3xl mx-auto">
    <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-4 block">A Causa</span>
    <h1 className="text-7xl font-serif mb-12">Rumo ao Título <br /><span className="serif-italic">Mundial</span></h1>
    <div className="prose prose-heritage text-lg opacity-80 leading-relaxed space-y-8">
      <p>
        A campanha <strong>Bumbá Patrimônio Vivo</strong> é um manifesto de resistência. Confrontamos a negligência global e exigimos o reconhecimento irrevogável do Complexo Cultural do Boi-Bumbá como Patrimônio Imaterial da Humanidade.
      </p>
      <p>
        Ignorar Parintins é ignorar uma cosmogonia viva que sintetiza séculos de saberes ancestrais e a simbiose sagrada entre o homem e a Amazônia. Não aceitaremos menos que o status mundial que nos pertence por direito histórico.
      </p>
      <div className="py-12 border-y border-heritage-ink/10 my-12">
        <blockquote className="font-serif text-3xl italic text-center">
          "O Boi-Bumbá é a resistência da nossa existência."
        </blockquote>
      </div>
      <p>
        Este movimento mobiliza parintinenses, brasileiros e cidadãos do mundo para garantir que a salvaguarda dessa tradição seja um compromisso de toda a humanidade. Proteger Parintins é proteger o futuro da cultura amazônica.
      </p>
    </div>
  </div>
);

const VozesPage = () => (
  <div className="pt-32">
    <section className="px-6 max-w-7xl mx-auto mb-32">
      <span className="text-[10px] uppercase tracking-[0.4em] text-heritage-red mb-6 block">Vozes da Luta</span>
      <h1 className="text-8xl md:text-9xl leading-[0.9] font-serif tracking-tighter mb-8">Testemunho <br /><span className="serif-italic">Amazônico</span></h1>
      <p className="text-2xl italic font-light text-heritage-ink/60 max-w-2xl leading-relaxed">
        Relatos daqueles que vivem o Patrimônio Imaterial da Humanidade e exigem o seu reconhecimento.
      </p>
    </section>

    <section className="bg-heritage-ink/5 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-2xl font-serif leading-relaxed opacity-80">
          A história oral não constitui meramente um registro de eventos passados, mas o pilar central sobre o qual repousa o patrimônio imaterial das comunidades amazônicas. Nestes territórios, a memória é um ato contínuo de resistência e preservação.
        </p>
      </div>
    </section>

    <section className="py-32 px-6 max-w-7xl mx-auto space-y-48">
      {communityMembers.map((member, i) => (
        <div key={member.id} className={cn("grid grid-cols-1 md:grid-cols-12 gap-16 items-center", i % 2 !== 0 && "md:flex-row-reverse")}>
          <div className={cn("md:col-span-7 overflow-hidden rounded-3xl", i % 2 !== 0 && "md:order-2")}>
            <img src={member.image} alt={member.name} className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
          </div>
          <div className={cn("md:col-span-5", i % 2 !== 0 && "md:order-1 md:text-right")}>
            <span className="text-[12px] uppercase tracking-[0.3em] text-heritage-blue mb-4 block">{member.role}</span>
            <h2 className="text-4xl font-serif italic mb-8">"{member.quote}"</h2>
            <div className={cn("h-px w-24 bg-heritage-ink/10 mb-6", i % 2 !== 0 && "ml-auto")}></div>
            <p className="text-heritage-ink/60 leading-relaxed">{member.description}</p>
          </div>
        </div>
      ))}
    </section>
  </div>
);

const CuradoriaPage = () => (
  <div className="pt-32 px-6 max-w-7xl mx-auto">
    <header className="mb-32">
      <h1 className="font-serif italic text-7xl md:text-9xl tracking-tighter mb-12 leading-[0.9]">
        Corpo Técnico <br />& Curadoria
      </h1>
      <p className="text-xl md:text-2xl leading-loose text-heritage-ink/60 font-light max-w-2xl">
        Lideranças e especialistas dedicados a fundamentar a petição por nosso Patrimônio Imaterial da Humanidade. Garantimos que a luta seja pautada pela verdade técnica e pela paixão popular.
      </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
      {teamMembers.map((member) => (
        <div key={member.id} className="group">
          <div className="aspect-[4/5] bg-heritage-ink/5 overflow-hidden mb-8 rounded-2xl">
            <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-heritage-red mb-2 block">{member.role}</span>
          <h3 className="font-serif text-3xl italic mb-4">{member.name}</h3>
          <p className="text-sm text-heritage-ink/60 leading-relaxed">{member.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const ManifestoPage = () => (
  <div className="pt-32 px-6 max-w-4xl mx-auto pb-32">
    <div className="text-center mb-24">
      <p className="text-[10px] uppercase tracking-[0.4em] text-heritage-red mb-8 font-bold">Ação Política e Cultural</p>
      <h1 className="text-6xl md:text-8xl font-serif mb-6">Assine o Manifesto <br /><span className="serif-italic">Global</span></h1>
    </div>

    <div className="prose prose-heritage text-xl leading-relaxed opacity-80 space-y-12 mb-32">
      <p className="first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-2">
        Sua assinatura não é apenas um apoio; é um ato de pressão política e cultural. Exigimos que a UNESCO ouça a força do movimento popular que pulsa no coração da Amazônia. 
      </p>
      <p>
        O Boi-Bumbá de Parintins já é Patrimônio Imaterial da Humanidade em sua essência e prática. A formalização internacional é um dever das instituições globais perante a diversidade humana. Assine e faça parte desta convocação histórica.
      </p>
      <div className="py-12 border-y border-heritage-ink/10 text-center italic text-2xl">
        "Cada assinatura é um eco que viaja do coração da Amazônia até as salas da ONU."
      </div>
    </div>

    <section id="sign" className="bg-heritage-ink text-heritage-cream p-12 rounded-[2rem] shadow-2xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif mb-2">Petição Pública</h2>
        <p className="text-xs uppercase tracking-widest opacity-60">Reconhecimento como Patrimônio da Humanidade</p>
      </div>
      <form className="space-y-8" onSubmit={(e) => {
        e.preventDefault();
        alert('Obrigado pelo seu apoio! Sua assinatura foi registrada simbolicamente.');
      }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Nome Completo</label>
            <input type="text" required className="bg-transparent border-b border-heritage-cream/20 py-2 focus:border-heritage-cream outline-none transition-colors" placeholder="Nome completo" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">E-mail</label>
            <input type="email" required className="bg-transparent border-b border-heritage-cream/20 py-2 focus:border-heritage-cream outline-none transition-colors" placeholder="seuemail@exemplo.com" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Cidade / País</label>
          <input type="text" required className="bg-transparent border-b border-heritage-cream/20 py-2 focus:border-heritage-cream outline-none transition-colors" placeholder="Onde você está no mundo?" />
        </div>
        <button className="w-full py-6 bg-heritage-cream text-heritage-ink text-sm uppercase tracking-[0.3em] font-bold hover:bg-heritage-red hover:text-white transition-all duration-500 rounded-full">
          Assinar Agora
        </button>
      </form>
    </section>
  </div>
);

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const item = heritageItems.find((i) => i.id === id);

  if (!item) return <div className="pt-40 text-center">Item não encontrado.</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 px-6 max-w-7xl mx-auto"
    >
      <Link to="/arquivo" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 mb-12">
        <ArrowRight size={12} className="rotate-180" /> Voltar ao Arquivo
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-4 block">{item.category}</span>
          <h1 className="text-7xl font-serif mb-8">{item.title}</h1>
          <div className="flex gap-12 mb-12 pb-8 border-b border-heritage-ink/10">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Localização</span>
              <span className="text-sm font-medium">{item.location}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Registro Inicial</span>
              <span className="text-sm font-medium">{item.year}</span>
            </div>
          </div>
          <div className="prose prose-heritage text-lg opacity-70 leading-relaxed">
            <p>{item.description}</p>
            <p className="mt-6">
              Este elemento fundamenta a nossa candidatura internacional. É uma manifestação de alto valor simbólico que legitima o Boi-Bumbá como Patrimônio Imaterial da Humanidade.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-heritage-ink/5 rounded-2xl flex items-center justify-center">
              <Archive size={32} className="opacity-20" />
            </div>
            <div className="aspect-square bg-heritage-ink/5 rounded-2xl flex items-center justify-center">
              <Info size={32} className="opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/arquivo" element={<ArchivePage />} />
            <Route path="/arquivo/:id" element={<ItemDetail />} />
            <Route path="/vozes" element={<VozesPage />} />
            <Route path="/curadoria" element={<CuradoriaPage />} />
            <Route path="/manifesto" element={<ManifestoPage />} />
            <Route path="/sobre" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}
