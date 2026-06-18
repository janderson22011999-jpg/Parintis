import React, { useState, useEffect } from "react";
import { CandidatoForm } from "./types";
import { makeInitialState, validateForm } from "./utils";
import { FormIdentificacao } from "./components/FormIdentificacao";
import { FormFormacao } from "./components/FormFormacao";
import { FormExperiencia } from "./components/FormExperiencia";
import { FormRequisitos } from "./components/FormRequisitos";
import { PainelEnvio } from "./components/PainelEnvio";
import { HomePage } from "./components/HomePage";
import { AlertCircle, RotateCcw, ArrowLeft, Fish, MapPin, Clock, Users, Award, FileText, Download } from "lucide-react";

const STORAGE_KEY = "ngutapa_eng_pesca_2026_v2";

function NgutapaLogo() {
  return (
    <img
      src="https://brasil.amazonteam.org/wp-content/uploads/2025/03/NGUTAPA-logo.png"
      alt="Instituto NGUTAPA"
      style={{ height: 48, width: "auto", display: "block", filter: "brightness(0) invert(1)" }}
      onError={e => {
        const el = e.currentTarget as HTMLImageElement;
        el.style.display = "none";
        const parent = el.parentElement;
        if (parent) {
          parent.innerHTML = `<div style="line-height:1.15"><div style="color:#a8d5b8;font-size:8px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase">Instituto</div><div style="color:white;font-size:16px;font-weight:900;letter-spacing:0.04em">NGUTAPA</div></div>`;
        }
      }}
    />
  );
}

function ProjectLogo({ color = "white" }: { color?: string }) {
  return (
    <svg width="36" height="44" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="28" y1="22" x2="14" y2="8" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="30" y1="20" x2="22" y2="5" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="33" y1="19" x2="28" y2="4" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M 31,21 C 34,30 34,42 30,54 C 27,63 24,70 24,78 C 24,86 34,87 35,78 C 36,68 38,58 36,44 C 34,32 34,24 31,21 Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" fill="none"/>
      <circle cx="28" cy="78" r="2.8" fill={color}/>
      <circle cx="52" cy="22" r="2.8" fill={color}/>
      <path d="M 49,21 C 46,32 44,44 46,58 C 48,68 44,78 45,86 C 46,94 56,93 55,84 C 54,76 56,64 54,54 C 50,42 46,30 49,21 Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" fill="none"/>
      <line x1="49" y1="84" x2="38" y2="96" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="52" y1="86" x2="46" y2="98" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="55" y1="85" x2="52" y2="98" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
    </svg>
  );
}

type Pagina = "home" | "formulario";

function getInitialPage(): Pagina {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("edital")) return "formulario";
  } catch {}
  return "home";
}

export default function App() {
  const [pagina, setPagina] = useState<Pagina>(getInitialPage);
  const [form, setForm] = useState<CandidatoForm>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) return JSON.parse(s);
    } catch {}
    return makeInitialState();
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(form)); } catch {}
  }, [form]);

  const updateId   = (u: any) => setForm(f => ({ ...f, identificacao: { ...f.identificacao, ...u } }));
  const updateFo   = (u: any) => setForm(f => ({ ...f, formacao: { ...f.formacao, ...u } }));
  const updateEg   = (u: any) => setForm(f => ({ ...f, experienciaGeral: { ...f.experienciaGeral, ...u } }));
  const updateEe   = (u: any) => setForm(f => ({ ...f, experienciaEspecifica: { ...f.experienciaEspecifica, ...u } }));
  const updateReq  = (u: any) => setForm(f => ({ ...f, requisitos: { ...f.requisitos, ...u } }));
  const updateDecl = (u: any) => setForm(f => ({ ...f, declaracoes: { ...f.declaracoes, ...u } }));

  const handleSubmit = () => {
    const errs = validateForm(form);
    if (errs.length > 0) { setErrors(errs); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setErrors([]);
    setSubmitted(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleClear = () => {
    if (window.confirm("Limpar todos os dados do formulário?")) {
      setForm(makeInitialState());
      localStorage.removeItem(STORAGE_KEY);
      setErrors([]);
      setSubmitted(false);
    }
  };

  const handleVoltar = () => {
    setPagina("home");
    setErrors([]);
    window.history.pushState({}, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const decl = form.declaracoes;
  const allDecl = decl.aceitaTermos && decl.informacoesAutenticas && decl.aceitaPoliticasFraude;

  // ── PÁGINA INICIAL ──────────────────────────────────────────
  if (pagina === "home") {
    return <HomePage onAbrirFormulario={(id) => {
      window.history.pushState({}, "", `?edital=${id}`);
      setPagina("formulario");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}/>;
  }

  // ── FORMULÁRIO DE INSCRIÇÃO ──────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f0", fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <style>{`
        input:focus,textarea:focus,select:focus{outline:none;border-color:#2d6a4f!important;box-shadow:0 0 0 3px rgba(45,106,79,.13);}
        button:focus{outline:none;}
        @media print{#header-ban,#act-bar,#footer-bar,#btn-voltar{display:none!important;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .22s ease forwards}
      `}</style>

      {/* ══ HEADER ══ */}
      <header id="header-ban" style={{ backgroundColor: "#1a3d2b", position: "relative", overflow: "hidden" }}>
        <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none" }} viewBox="0 0 1200 220" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="rg" cx="75%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#2d6a4f" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#1a3d2b" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="220" fill="url(#rg)"/>
          <path d="M0,150 C200,60 450,190 700,90 C900,10 1050,130 1200,65 L1200,220 L0,220Z" fill="white" fillOpacity="0.03"/>
          <path d="M80,185 C280,85 530,195 780,95 C960,15 1080,140 1240,60" stroke="#d4a820" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
        </svg>
        <div style={{ position:"relative",zIndex:10,maxWidth:960,margin:"0 auto",padding:"24px 24px 22px",display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:20 }}>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <NgutapaLogo/>
            <div style={{ width:1,height:36,backgroundColor:"rgba(255,255,255,.2)" }}/>
            <div style={{ display:"flex",alignItems:"center",gap:10,backgroundColor:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:"8px 12px" }}>
              <ProjectLogo color="white"/>
              <div style={{ lineHeight:1.2 }}>
                <div style={{ color:"#a8d5b8",fontSize:9,fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase" }}>Projeto GEF</div>
                <div style={{ color:"white",fontSize:13,fontWeight:800 }}>Putumayo-Içá</div>
              </div>
            </div>
            <div>
              <div style={{ display:"inline-block",backgroundColor:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.14)",borderRadius:100,padding:"3px 12px",marginBottom:6 }}>
                <span style={{ color:"#a8d5b8",fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase" }}>Chamada Pública · Consultoria Individual</span>
              </div>
              <h1 style={{ color:"white",fontSize:20,fontWeight:800,margin:0,lineHeight:1.2 }}>Edital de Manifestação de Interesse</h1>
              <p style={{ color:"#a8d5b8",fontSize:12,margin:"4px 0 0",fontWeight:600 }}>Engenheiro(a) de Pesca — Guardiões dos Peixes do Rio Içá</p>
            </div>
          </div>
          <div style={{ backgroundColor:"rgba(212,168,32,.12)",border:"1px solid rgba(212,168,32,.3)",borderRadius:14,padding:"12px 18px",textAlign:"center" }}>
            <div style={{ color:"#d4a820",fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:3 }}>Prazo de Inscrição</div>
            <div style={{ color:"white",fontSize:20,fontWeight:800 }}>15/06/2026</div>
            <div style={{ color:"#a8d5b8",fontSize:11,marginTop:2 }}>às 23h59 · Horário do Amazonas</div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth:960,margin:"0 auto",padding:"20px 24px 60px" }}>

        {/* ══ BOTÃO VOLTAR + TdR LINK ══ */}
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20,flexWrap:"wrap" }}>
          <button id="btn-voltar" type="button" onClick={handleVoltar}
            style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",backgroundColor:"white",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:12,fontWeight:600,color:"#374151",cursor:"pointer" }}>
            <ArrowLeft size={13}/> Voltar às Oportunidades
          </button>
          <a href="https://drive.google.com/file/d/13V2KXA4jS0KtPsZQvyiWP_yyTDrpf6KC/view?usp=sharing" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex",alignItems:"center",gap:7,padding:"8px 16px",backgroundColor:"#1a3d2b",border:"none",borderRadius:8,fontSize:12,fontWeight:600,color:"white",textDecoration:"none",cursor:"pointer" }}>
            <FileText size={13} color="#d4a820"/> TdR Completo em PDF <Download size={11} color="#a8d5b8"/>
          </a>
        </div>

        {/* ══ EDITAL CARDS ══ */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:20 }}>
          {[
            { icon: <Clock size={15} color="#d4a820"/>, label:"Duração", value:"8 meses", sub:"Jul/2026 – Fev/2027" },
            { icon: <Users size={15} color="#d4a820"/>, label:"Tipo de Contrato", value:"Pessoa Física (CPF)", sub:"RPA · Seleção competitiva" },
            { icon: <MapPin size={15} color="#d4a820"/>, label:"Local de Execução", value:"Santo Antônio do Içá", sub:"Vila Betânia SAI – AM" },
            { icon: <Fish size={15} color="#d4a820"/>, label:"Comunidades", value:"14 comunidades", sub:"Bacia do Rio Içá" },
            { icon: <Award size={15} color="#d4a820"/>, label:"Financiamento", value:"GEF · Banco Mundial", sub:"Doação TF0B8254-6L" },
          ].map(c => (
            <div key={c.label} style={{ backgroundColor:"white",border:"1.5px solid #e2ebe4",borderRadius:12,padding:"12px 16px" }}>
              <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:5 }}>
                {c.icon}
                <span style={{ fontSize:10,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.08em" }}>{c.label}</span>
              </div>
              <div style={{ fontSize:13,fontWeight:800,color:"#1a3d2b" }}>{c.value}</div>
              <div style={{ fontSize:11,color:"#9ca3af",marginTop:2 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* ══ PERFIL MÍNIMO ══ */}
        <div style={{ backgroundColor:"white",border:"1.5px solid #e2ebe4",borderRadius:16,padding:"20px 24px",marginBottom:20 }}>
          <h2 style={{ fontSize:13,fontWeight:700,color:"#1a3d2b",margin:"0 0 14px",display:"flex",alignItems:"center",gap:8 }}>
            <span style={{ display:"inline-block",width:6,height:6,borderRadius:"50%",backgroundColor:"#d4a820",marginBottom:1 }}/>
            Perfil Mínimo dos Candidatos
          </h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10 }}>
            {[
              { title:"Formação Acadêmica", text:"Diploma em Engenharia de Pesca, Biologia, Engenharia Ambiental, Ciências Agrárias ou núcleos básicos afins." },
              { title:"Experiência Profissional", text:"Mínimo de 6 meses de experiência profissional, contados a partir da obtenção do diploma universitário." },
              { title:"Experiência Específica", text:"Mínimo de 6 meses em manejo participativo de Pirarucu (Arapaima gigas) e/ou manejo comunitário com povos indígenas na Amazônia." },
              { title:"Desejável", text:"Manuseio de equipamentos eletrônicos, deslocamentos fluviais em áreas remotas, coleta de dados em campo, pacote Office e coordenação de equipes." },
            ].map(r => (
              <div key={r.title} style={{ backgroundColor:"#f6faf7",borderRadius:9,padding:"12px 14px",borderLeft:"3px solid #2d6a4f" }}>
                <div style={{ fontSize:12,fontWeight:700,color:"#1a3d2b",marginBottom:4 }}>{r.title}</div>
                <div style={{ fontSize:12,color:"#4b5563",lineHeight:1.6 }}>{r.text}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:14,backgroundColor:"#fffbeb",border:"1.5px solid #fde68a",borderRadius:10,padding:"12px 16px" }}>
            <div style={{ fontSize:11,fontWeight:700,color:"#92400e",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em" }}>Critérios de Pontuação (100 pontos)</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:16 }}>
              {[
                { pts:"até 20 pts", label:"Formação adicional (pós-grad)", desc:"Especialização = 8 pts · Mestrado = 12 pts" },
                { pts:"até 70 pts", label:"Experiência específica acima do mínimo", desc:"Candidato com maior experiência recebe 70; demais proporcionalmente" },
                { pts:"1–10 pts",   label:"Entrevista", desc:"Convocados os melhores classificados na fase anterior" },
              ].map(c => (
                <div key={c.label} style={{ flex:"1 1 180px" }}>
                  <div style={{ fontSize:12,fontWeight:700,color:"#92400e" }}>{c.pts}</div>
                  <div style={{ fontSize:12,fontWeight:600,color:"#374151" }}>{c.label}</div>
                  <div style={{ fontSize:11,color:"#9ca3af" }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ ERROR BANNER ══ */}
        {errors.length > 0 && (
          <div className="fu" style={{ backgroundColor:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:12,padding:"14px 18px",marginBottom:20 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
              <AlertCircle size={16} color="#dc2626"/>
              <span style={{ fontWeight:700,color:"#dc2626",fontSize:13 }}>Corrija os itens abaixo antes de enviar:</span>
            </div>
            <ul style={{ margin:0,paddingLeft:20 }}>
              {errors.map((e,i) => <li key={i} style={{ fontSize:12,color:"#b91c1c",marginBottom:3 }}>{e}</li>)}
            </ul>
          </div>
        )}

        {/* ══ FORM ══ */}
        <div className="fu" style={{ backgroundColor:"white",border:"1.5px solid #e2ebe4",borderRadius:20,padding:"32px 36px",boxShadow:"0 2px 8px rgba(0,0,0,.05)",display:"flex",flexDirection:"column",gap:44 }}>

          <FormIdentificacao data={form.identificacao} onChange={updateId}/>

          <div style={{ borderTop:"1px solid #f0f4f0",paddingTop:36 }}>
            <FormFormacao data={form.formacao} onChange={updateFo}/>
          </div>

          <div style={{ borderTop:"1px solid #f0f4f0",paddingTop:36 }}>
            <FormExperiencia
              geral={form.experienciaGeral}
              especifica={form.experienciaEspecifica}
              onChangeGeral={updateEg}
              onChangeEspecifica={updateEe}
            />
          </div>

          <div style={{ borderTop:"1px solid #f0f4f0",paddingTop:36 }}>
            <FormRequisitos data={form.requisitos} onChange={updateReq}/>
          </div>

          {/* ══ DECLARAÇÕES ══ */}
          <div style={{ borderTop:"1px solid #f0f4f0",paddingTop:36 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,paddingBottom:14,borderBottom:"2px solid #f0faf4",marginBottom:20 }}>
              <div style={{ width:32,height:32,borderRadius:"50%",backgroundColor:"#1a3d2b",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,flexShrink:0 }}>6</div>
              <h2 style={{ fontSize:16,fontWeight:700,color:"#1a3d2b",margin:0 }}>Declarações</h2>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {[
                { key:"aceitaTermos" as const, label:"Aceito os Termos de Referência", desc:"Declaro que li e aceito as condições do Edital SDC-NGUTUPA-C2-ENG-01-2026, incluindo escopo, cronograma, forma de pagamento e critérios de seleção." },
                { key:"informacoesAutenticas" as const, label:"Informações autênticas e verificáveis", desc:"Declaro que todas as informações fornecidas são autênticas e que posso apresentar os comprovantes respectivos quando solicitado pelo NGUTAPA." },
                { key:"aceitaPoliticasFraude" as const, label:"Aceito as Políticas de Fraude e Corrupção do Banco Mundial (BIRD)", desc:"Declaro que me submeto às Políticas de Fraude e Corrupção do Banco Internacional de Reconstrução e Desenvolvimento aplicáveis a este processo." },
              ].map(d => {
                const checked = form.declaracoes[d.key];
                return (
                  <label key={d.key}
                    style={{ display:"flex",gap:14,padding:"14px 18px",cursor:"pointer",backgroundColor:checked?"#f0faf4":"#f9fafb",border:`2px solid ${checked?"#2d6a4f":"#e5e7eb"}`,borderRadius:12,transition:"all .15s" }}>
                    <input type="checkbox" checked={checked}
                      onChange={e => updateDecl({ [d.key]: e.target.checked })}
                      style={{ width:18,height:18,accentColor:"#2d6a4f",cursor:"pointer",flexShrink:0,marginTop:1 }}/>
                    <div>
                      <span style={{ fontSize:13,fontWeight:700,color:checked?"#1a3d2b":"#374151",display:"block" }}>{d.label} <span style={{ color:"#dc2626" }}>*</span></span>
                      <span style={{ fontSize:12,color:"#6b7280",lineHeight:1.6,display:"block",marginTop:3 }}>{d.desc}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {submitted
            ? (<div style={{ borderTop:"1px solid #f0f4f0",paddingTop:36 }}><PainelEnvio data={form} onClear={handleClear}/></div>)
            : (
              <div style={{ borderTop:"1px solid #f0f4f0",paddingTop:28,display:"flex",justifyContent:"flex-end",alignItems:"center",gap:16 }}>
                <p style={{ fontSize:12,color:"#9ca3af",margin:0 }}>Campos com <span style={{ color:"#dc2626" }}>*</span> são obrigatórios.</p>
                <button type="button" onClick={handleSubmit} disabled={!allDecl}
                  style={{ padding:"12px 32px",backgroundColor:allDecl?"#2d6a4f":"#9ca3af",border:"none",borderRadius:10,color:"white",fontSize:15,fontWeight:700,cursor:allDecl?"pointer":"not-allowed",boxShadow:allDecl?"0 3px 10px rgba(45,106,79,.3)":"none",letterSpacing:".01em",transition:"all .15s" }}>
                  Verificar e Preparar Candidatura →
                </button>
              </div>
            )
          }
        </div>

        {/* ══ FOOTER ══ */}
        <div id="footer-bar" style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:28,paddingTop:16,borderTop:"1px solid #e2ebe4" }}>
          <p style={{ fontSize:11,color:"#9ca3af",margin:0 }}>© 2026 Instituto NGUTAPA · Projeto GEF Putumayo-Içá · Banco Mundial (GEF TF0B8254-6L)</p>
          <button type="button" onClick={handleClear}
            style={{ display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#9ca3af",background:"none",border:"none",cursor:"pointer",padding:"4px 8px",borderRadius:6 }}
            onMouseOver={e=>(e.currentTarget as HTMLButtonElement).style.color="#ef4444"}
            onMouseOut={e=>(e.currentTarget as HTMLButtonElement).style.color="#9ca3af"}>
            <RotateCcw size={12}/> Limpar Formulário
          </button>
        </div>
      </div>
    </div>
  );
}
