import React, { useState, useEffect } from "react";
import { CotacaoForm, Lote, LOTE_A_ITEMS, LOTE_B_ITEMS } from "./types";
import { makeInitialState, validateForm } from "./utils";
import { FormFornecedor } from "./components/FormFornecedor";
import { TabelaItens } from "./components/TabelaItens";
import { FormCondicoes } from "./components/FormCondicoes";
import { PainelEnvio } from "./components/PainelEnvio";
import { AlertCircle, RotateCcw } from "lucide-react";

function ProjectLogo({ color = "white" }: { color?: string }) {
  return (
    <svg width="40" height="50" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const STORAGE_KEY_A = "ngutapa_cotacao_A";
const STORAGE_KEY_B = "ngutapa_cotacao_B";
const storageKey = (lote: Lote) => lote === "A" ? STORAGE_KEY_A : STORAGE_KEY_B;

export default function App() {
  const [lote, setLote] = useState<Lote>("A");
  const [forms, setForms] = useState<Record<Lote, CotacaoForm>>(() => {
    const load = (l: Lote) => {
      try { const s = localStorage.getItem(storageKey(l)); if (s) return JSON.parse(s); } catch {}
      return makeInitialState(l);
    };
    return { A: load("A"), B: load("B") };
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const form = forms[lote];

  useEffect(() => {
    try { localStorage.setItem(storageKey(lote), JSON.stringify(form)); } catch {}
  }, [form, lote]);

  const update = (patch: Partial<CotacaoForm>) =>
    setForms(prev => ({ ...prev, [lote]: { ...prev[lote], ...patch } }));

  const updateFornecedor = (u: any) => update({ fornecedor: { ...form.fornecedor, ...u } });
  const updateCondicoes  = (u: any) => update({ condicoes: { ...form.condicoes, ...u } });
  const updateItem = (i: number, u: any) => {
    const newItens = [...form.itens];
    newItens[i] = { ...newItens[i], ...u };
    update({ itens: newItens });
  };

  const handleSwitchLote = (l: Lote) => { setLote(l); setErrors([]); setSubmitted(false); };

  const handleSubmitCheck = () => {
    const errs = validateForm(form);
    if (errs.length > 0) { setErrors(errs); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setErrors([]);
    setSubmitted(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleClear = () => {
    if (window.confirm("Limpar todos os dados deste formulário?")) {
      const fresh = makeInitialState(lote);
      setForms(prev => ({ ...prev, [lote]: fresh }));
      localStorage.removeItem(storageKey(lote));
      setErrors([]);
      setSubmitted(false);
    }
  };

  const itemsDef = lote === "A" ? LOTE_A_ITEMS : LOTE_B_ITEMS;
  const numero   = lote === "A" ? "SDC-NGUTUPA-C1-011A-2026" : "SDC-NGUTUPA-C1-011B-2026";
  const nomeLote = lote === "A" ? "Lote A — Informática, Comunicação e Energia" : "Lote B — Audiovisual, Iluminação e Segurança";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f0", fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <style>{`
        input:focus,textarea:focus{outline:none;border-color:#2d6a4f!important;box-shadow:0 0 0 3px rgba(45,106,79,.13);}
        @media print{#header-ban,#lot-sel,#act-bar,#footer-bar{display:none!important;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .22s ease forwards}
      `}</style>

      {/* ══ HEADER ══ */}
      <header id="header-ban" style={{ backgroundColor: "#1a3d2b", position: "relative", overflow: "hidden" }}>
        <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none" }} viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="rg" cx="75%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#2d6a4f" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#1a3d2b" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="200" fill="url(#rg)"/>
          <path d="M0,140 C200,50 450,180 700,80 C900,0 1050,120 1200,60 L1200,200 L0,200Z" fill="white" fillOpacity="0.03"/>
          <path d="M80,170 C280,70 530,190 780,90 C960,10 1080,130 1240,55" stroke="#d4a820" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
        </svg>
        <div style={{ position:"relative",zIndex:10,maxWidth:960,margin:"0 auto",padding:"28px 24px 24px",display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:24 }}>
          <div style={{ display:"flex",alignItems:"center",gap:16 }}>
            <div style={{ backgroundColor:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.14)",borderRadius:16,padding:"12px 16px",display:"flex",alignItems:"center",gap:12 }}>
              <ProjectLogo color="white"/>
              <div style={{ lineHeight:1.2 }}>
                <div style={{ color:"#a8d5b8",fontSize:9,fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase" }}>Cuenca</div>
                <div style={{ color:"white",fontSize:15,fontWeight:800 }}>Putumayo</div>
                <div style={{ color:"#d4a820",fontSize:12,fontWeight:700 }}>Içá</div>
              </div>
            </div>
            <div>
              <div style={{ display:"inline-block",backgroundColor:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.14)",borderRadius:100,padding:"3px 12px",marginBottom:8 }}>
                <span style={{ color:"#a8d5b8",fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase" }}>Pesquisa de Mercado · Equipamentos</span>
              </div>
              <h1 style={{ color:"white",fontSize:22,fontWeight:800,margin:0,lineHeight:1.2 }}>Projeto GEF Putumayo-Içá</h1>
              <p style={{ color:"#a8d5b8",fontSize:12,margin:"4px 0 0",lineHeight:1.5 }}>
                Instituto de Etno Desenvolvimento NGUTAPA · Santo Antônio do Içá – AM
              </p>
            </div>
          </div>
          <div style={{ backgroundColor:"rgba(212,168,32,.12)",border:"1px solid rgba(212,168,32,.3)",borderRadius:14,padding:"14px 20px",textAlign:"center" }}>
            <div style={{ color:"#d4a820",fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:3 }}>Prazo Limite</div>
            <div style={{ color:"white",fontSize:20,fontWeight:800 }}>02/06/2026</div>
            <div style={{ color:"#a8d5b8",fontSize:11,marginTop:2 }}>às 23h59 · Horário do Amazonas</div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth:960,margin:"0 auto",padding:"24px 24px 60px" }}>

        {/* ══ LOT SELECTOR ══ */}
        <div id="lot-sel" style={{ marginBottom:24 }}>
          <p style={{ fontSize:13,fontWeight:600,color:"#374151",marginBottom:12 }}>Selecione o lote para o qual deseja apresentar cotação:</p>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            {(["A","B"] as Lote[]).map(l => {
              const active = lote === l;
              const title  = l === "A" ? "Lote A" : "Lote B";
              const sub    = l === "A" ? "Informática, Comunicação e Energia" : "Audiovisual, Iluminação e Segurança";
              const num    = l === "A" ? "SDC-NGUTUPA-C1-011A-2026" : "SDC-NGUTUPA-C1-011B-2026";
              const count  = l === "A" ? "6 itens" : "8 itens";
              const budget = "Até USD 6.000";
              return (
                <button key={l} type="button" onClick={() => handleSwitchLote(l)}
                  style={{ textAlign:"left",padding:"18px 22px",border:`2px solid ${active?"#2d6a4f":"#d1d5db"}`,borderRadius:14,backgroundColor:active?"#f0faf4":"white",cursor:"pointer",transition:"all .15s",boxShadow:active?"0 0 0 3px rgba(45,106,79,.12)":"none" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                    <div>
                      <span style={{ fontSize:18,fontWeight:800,color:active?"#1a3d2b":"#374151" }}>{title}</span>
                      <span style={{ marginLeft:8,fontSize:11,backgroundColor:active?"#2d6a4f":"#e5e7eb",color:active?"white":"#6b7280",borderRadius:6,padding:"2px 8px",fontWeight:600 }}>{count}</span>
                    </div>
                    <div style={{ width:20,height:20,borderRadius:"50%",border:`2px solid ${active?"#2d6a4f":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      {active && <div style={{ width:10,height:10,borderRadius:"50%",backgroundColor:"#2d6a4f" }}/>}
                    </div>
                  </div>
                  <div style={{ fontSize:13,color:active?"#2d6a4f":"#6b7280",fontWeight:600,marginTop:4 }}>{sub}</div>
                  <div style={{ fontSize:11,color:"#9ca3af",marginTop:4 }}>{num} · {budget}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ PROCESS BADGE ══ */}
        <div style={{ backgroundColor:"#1a3d2b",borderRadius:12,padding:"12px 20px",marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8 }}>
          <div>
            <span style={{ color:"#a8d5b8",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em" }}>Processo · </span>
            <span style={{ color:"white",fontSize:13,fontWeight:700 }}>{numero}</span>
          </div>
          <span style={{ color:"#a8d5b8",fontSize:12 }}>{nomeLote} · {itemsDef.length} itens · Local: Vila Bethania SAI, Santo Antônio do Içá – AM</span>
        </div>

        {/* ══ ERROR BANNER ══ */}
        {errors.length > 0 && (
          <div className="fu" style={{ backgroundColor:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:12,padding:"14px 18px",marginBottom:20 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
              <AlertCircle size={16} color="#dc2626"/>
              <span style={{ fontWeight:700,color:"#dc2626",fontSize:13 }}>Corrija os itens abaixo antes de enviar:</span>
            </div>
            <ul style={{ margin:0,paddingLeft:20,display:"flex",flexDirection:"column",gap:4 }}>
              {errors.map((e,i) => <li key={i} style={{ fontSize:12,color:"#b91c1c" }}>{e}</li>)}
            </ul>
          </div>
        )}

        {/* ══ FORM SECTIONS ══ */}
        <div className="fu" style={{ backgroundColor:"white",border:"1.5px solid #e2ebe4",borderRadius:20,padding:"32px 36px",boxShadow:"0 2px 8px rgba(0,0,0,.05)",display:"flex",flexDirection:"column",gap:48 }}>
          <FormFornecedor data={form.fornecedor} onChange={updateFornecedor}/>
          <div style={{ borderTop:"1px solid #f0f4f0",paddingTop:36 }}>
            <TabelaItens items={itemsDef} cotacoes={form.itens} onChange={updateItem}/>
          </div>
          <div style={{ borderTop:"1px solid #f0f4f0",paddingTop:36 }}>
            <FormCondicoes data={form.condicoes} onChange={updateCondicoes}/>
          </div>

          {/* Declaration */}
          <div style={{ borderTop:"1px solid #f0f4f0",paddingTop:36 }}>
            <h2 style={{ fontSize:16,fontWeight:700,color:"#1a3d2b",margin:"0 0 16px" }}>Declaração de Veracidade</h2>
            <label htmlFor="decl" style={{ display:"flex",gap:14,padding:"18px 20px",backgroundColor:form.condicoes.concordaDeclaracao?"#f0faf4":"#f9fafb",border:`2px solid ${form.condicoes.concordaDeclaracao?"#2d6a4f":"#e5e7eb"}`,borderRadius:14,cursor:"pointer",transition:"all .15s" }}>
              <input type="checkbox" id="decl" checked={form.condicoes.concordaDeclaracao}
                onChange={e => updateCondicoes({ concordaDeclaracao: e.target.checked })}
                style={{ width:18,height:18,accentColor:"#2d6a4f",cursor:"pointer",flexShrink:0,marginTop:1 }}/>
              <div style={{ fontSize:13,color:"#374151",lineHeight:1.65 }}>
                <p style={{ fontWeight:700,color:"#1a3d2b",margin:"0 0 6px" }}>Ao assinalar, o fornecedor declara que:</p>
                <ul style={{ paddingLeft:18,color:"#6b7280",margin:0,display:"flex",flexDirection:"column",gap:4 }}>
                  <li>Os preços cotados refletem os valores reais praticados no mercado na data da proposta.</li>
                  <li>Os equipamentos ofertados atendem às especificações técnicas mínimas exigidas no processo.</li>
                  <li>A empresa está em situação regular com obrigações fiscais e emite Nota Fiscal com CNPJ.</li>
                  <li>Esta cotação é utilizada para fins de pesquisa de mercado pelo NGUTAPA e <strong>não constitui contrato de fornecimento</strong>.</li>
                </ul>
              </div>
            </label>
          </div>

          {/* Submit / Panel */}
          {submitted
            ? <div style={{ borderTop:"1px solid #f0f4f0",paddingTop:36 }}><PainelEnvio data={form} onClear={handleClear}/></div>
            : <div style={{ borderTop:"1px solid #f0f4f0",paddingTop:28,display:"flex",justifyContent:"flex-end" }}>
                <button type="button" onClick={handleSubmitCheck}
                  style={{ padding:"12px 32px",backgroundColor:"#2d6a4f",border:"none",borderRadius:10,color:"white",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 3px 10px rgba(45,106,79,.3)",letterSpacing:".01em" }}>
                  Verificar e Preparar Envio →
                </button>
              </div>
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
