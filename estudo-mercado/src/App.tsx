import React, { useState, useEffect } from "react";
import { TermsOfReference } from "./components/TermsOfReference";
import { FormIdentificacao } from "./components/FormIdentificacao";
import { FormFormacao } from "./components/FormFormacao";
import { FormExperienciaGeral } from "./components/FormExperienciaGeral";
import { FormExperienciaEspecifica } from "./components/FormExperienciaEspecifica";
import { FormOutrosCriterios } from "./components/FormOutrosCriterios";
import { FormHonorarios } from "./components/FormHonorarios";
import { FormTaxa } from "./components/FormTaxa";
import { SubmissionPanel } from "./components/SubmissionPanel";
import { EstudoMercadoForm } from "./types";
import { INITIAL_FORM_STATE, validateSection } from "./utils";
import { ChevronRight, ChevronLeft, RotateCcw, AlertCircle } from "lucide-react";

function ProjectLogo({ className = "w-12 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="28" y1="22" x2="14" y2="8"  stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="30" y1="20" x2="22" y2="5"  stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="33" y1="19" x2="28" y2="4"  stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M 31,21 C 34,30 34,42 30,54 C 27,63 24,70 24,78 C 24,86 34,87 35,78 C 36,68 38,58 36,44 C 34,32 34,24 31,21 Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" fill="none"/>
      <circle cx="28" cy="78" r="2.8" fill="currentColor"/>
      <circle cx="52" cy="22" r="2.8" fill="currentColor"/>
      <path d="M 49,21 C 46,32 44,44 46,58 C 48,68 44,78 45,86 C 46,94 56,93 55,84 C 54,76 56,64 54,54 C 50,42 46,30 49,21 Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" fill="none"/>
      <line x1="49" y1="84" x2="38" y2="96" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="52" y1="86" x2="46" y2="98" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="55" y1="85" x2="52" y2="98" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
    </svg>
  );
}

const STEPS = [
  { key: "identificacao",       label: "Identificação",       short: "01" },
  { key: "formacao",            label: "Formação",            short: "02" },
  { key: "experienciaGeral",    label: "Exp. Geral",          short: "03" },
  { key: "experienciaEspecifica", label: "Exp. Específica",   short: "04" },
  { key: "outrosCriterios",     label: "Critérios",           short: "05" },
  { key: "honorarios",          label: "Honorários",          short: "06" },
  { key: "taxa",                label: "Taxa & Declaração",   short: "07" },
  { key: "submission",          label: "Envio",               short: "08" },
];

export default function App() {
  const [formData, setFormData] = useState<EstudoMercadoForm>(() => {
    try {
      const saved = localStorage.getItem("ngutapa_survey_data");
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_FORM_STATE;
  });

  const [activeStep, setActiveStep] = useState(0);
  const [isSinglePage, setIsSinglePage] = useState(false);
  const [sectionErrors, setSectionErrors] = useState<string[]>([]);

  useEffect(() => {
    try { localStorage.setItem("ngutapa_survey_data", JSON.stringify(formData)); } catch {}
  }, [formData]);

  const upd = (key: keyof EstudoMercadoForm) => (u: any) =>
    setFormData(p => ({ ...p, [key]: { ...(p[key] as any), ...u } }));

  const handleClearForm = () => {
    if (window.confirm("Deseja realmente limpar todos os campos?")) {
      setFormData(INITIAL_FORM_STATE);
      setActiveStep(0);
      setSectionErrors([]);
      localStorage.removeItem("ngutapa_survey_data");
    }
  };

  const handleNext = () => {
    const errors = validateSection(STEPS[activeStep].key, formData);
    if (errors.length > 0) { setSectionErrors(errors); return; }
    setSectionErrors([]);
    if (activeStep < STEPS.length - 1) setActiveStep(p => p + 1);
  };

  const handlePrev = () => { setSectionErrors([]); if (activeStep > 0) setActiveStep(p => p - 1); };

  const handleJump = (i: number) => {
    if (i < activeStep) { setSectionErrors([]); setActiveStep(i); return; }
    const errors = validateSection(STEPS[activeStep].key, formData);
    if (errors.length > 0) setSectionErrors(errors);
    else { setSectionErrors([]); setActiveStep(i); }
  };

  const progress = ((activeStep + 1) / STEPS.length) * 100;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f0", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @media print {
          #header-banner, #nav-bar, #controls-bar, #view-toggle, #clear-btn { display: none !important; }
          #print-letterhead { display: block !important; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.25s ease forwards; }
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #2d6a4f !important;
          box-shadow: 0 0 0 3px rgba(45,106,79,0.12);
        }
        .step-btn:hover { background-color: rgba(255,255,255,0.12); }
      `}</style>

      {/* Print letterhead */}
      <div id="print-letterhead" style={{ display: "none", padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #1a3d2b", paddingBottom: 20, marginBottom: 24 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, textTransform: "uppercase", color: "#1a3d2b" }}>Instituto de Etno Desenvolvimento NGUTAPA</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>PESQUISA DE MERCADO / COTAÇÃO — ANTROPÓLOGO(A)</div>
            <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>Projeto GEF Putumayo-Içá · Banco Mundial</div>
          </div>
          <ProjectLogo className="w-10 h-12" />
        </div>
      </div>

      {/* ══ HEADER ══ */}
      <header id="header-banner" style={{ backgroundColor: "#1a3d2b", position: "relative", overflow: "hidden" }}>
        {/* Decorative background elements */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1200 280" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="glow" cx="80%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#2d6a4f" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#1a3d2b" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="280" fill="url(#glow)"/>
          <path d="M 0,200 C 200,80 450,240 700,120 C 900,20 1050,160 1200,80 L 1200,280 L 0,280 Z" fill="white" fillOpacity="0.03"/>
          <circle cx="950" cy="60" r="200" fill="white" fillOpacity="0.02"/>
          <path d="M 100,240 C 300,100 550,260 800,100 C 980,0 1100,140 1250,60" stroke="#d4a820" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
          <path d="M 0,260 C 200,160 400,280 600,180 C 750,100 900,200 1200,140" stroke="#d4a820" strokeWidth="0.8" strokeOpacity="0.15" fill="none"/>
        </svg>

        <div style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "0 auto", padding: "40px 24px 32px" }}>
          {/* Top label */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#d4a820", display: "inline-block" }}></span>
            <span style={{ color: "#a8d5b8", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Pesquisa de Mercado · Antropólogo(a)</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
            {/* Left: branding */}
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 20, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                <ProjectLogo className="w-10 h-12" style={{ color: "white" }} />
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ color: "#a8d5b8", fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Cuenca</div>
                  <div style={{ color: "white", fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>Putumayo</div>
                  <div style={{ color: "#d4a820", fontSize: 12, fontWeight: 700 }}>Içá</div>
                </div>
              </div>

              <div>
                <h1 style={{ color: "white", fontSize: 26, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }}>
                  Projeto GEF<br />Putumayo-Içá
                </h1>
                <p style={{ color: "#a8d5b8", fontSize: 12, marginTop: 6, lineHeight: 1.5, maxWidth: 340 }}>
                  <em>Utü'ü y Itchá</em> — O Encantado Içá: fortalecimento do conhecimento tradicional dos povos da floresta amazônica.
                </p>
                <p style={{ color: "rgba(168,213,184,0.55)", fontSize: 10, marginTop: 6 }}>
                  Instituto de Etno Desenvolvimento NGUTAPA · Santo Antônio do Içá – AM
                </p>
              </div>
            </div>

            {/* Right: deadline */}
            <div style={{ backgroundColor: "rgba(212,168,32,0.12)", border: "1px solid rgba(212,168,32,0.3)", borderRadius: 16, padding: "16px 24px", textAlign: "center", minWidth: 160 }}>
              <div style={{ color: "#d4a820", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Prazo Limite</div>
              <div style={{ color: "white", fontSize: 22, fontWeight: 800, lineHeight: 1 }}>05/06/2026</div>
              <div style={{ color: "#a8d5b8", fontSize: 11, marginTop: 4 }}>às 23h59 · Horário do Amazonas</div>
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* ══ TdR ══ */}
        <TermsOfReference />

        {/* ══ VIEW TOGGLE ══ */}
        <div id="view-toggle" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", border: "1px solid #e2ebe4", borderRadius: 12, padding: "10px 16px", marginTop: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>Modo de preenchimento</span>
          <div style={{ display: "flex", backgroundColor: "#f0f4f0", borderRadius: 8, padding: 3, gap: 2 }}>
            {[["Passo a Passo", false], ["Página Única", true]].map(([label, val]) => (
              <button key={String(label)} type="button" onClick={() => { setIsSinglePage(val as boolean); setSectionErrors([]); }}
                style={{ padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.15s",
                  backgroundColor: isSinglePage === val ? "#2d6a4f" : "transparent",
                  color: isSinglePage === val ? "white" : "#4b7a60" }}>
                {label as string}
              </button>
            ))}
          </div>
        </div>

        {/* ══ PROGRESS BAR (step mode) ══ */}
        {!isSinglePage && (
          <div id="nav-bar" style={{ marginTop: 20, backgroundColor: "white", border: "1px solid #e2ebe4", borderRadius: 16, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            {/* Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2d6a4f", minWidth: 60 }}>
                {activeStep + 1} / {STEPS.length}
              </span>
              <div style={{ flex: 1, height: 6, backgroundColor: "#e8f0ea", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, backgroundColor: "#2d6a4f", borderRadius: 99, transition: "width 0.4s ease" }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", minWidth: 80, textAlign: "right" }}>
                {STEPS[activeStep].label}
              </span>
            </div>
            {/* Step bubbles — desktop */}
            <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
              <div style={{ position: "absolute", left: 16, right: 16, top: 14, height: 1, backgroundColor: "#e8f0ea", zIndex: 0 }} />
              {STEPS.map((step, i) => {
                const done   = i < activeStep;
                const active = i === activeStep;
                return (
                  <button key={step.key} type="button" className="step-btn" onClick={() => handleJump(i)}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, position: "relative", zIndex: 1, background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, transition: "all 0.2s",
                      backgroundColor: active ? "#2d6a4f" : done ? "#1a3d2b" : "white",
                      color: active || done ? "white" : "#9ca3af",
                      border: active ? "2px solid #2d6a4f" : done ? "2px solid #1a3d2b" : "2px solid #d1d5db",
                      transform: active ? "scale(1.15)" : "scale(1)",
                      boxShadow: active ? "0 0 0 4px rgba(45,106,79,0.15)" : "none",
                    }}>{done ? "✓" : i + 1}</span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: active ? "#2d6a4f" : "#9ca3af", textAlign: "center", maxWidth: 52, lineHeight: 1.2 }}>
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ FORM CARD ══ */}
        <div style={{ marginTop: 20, backgroundColor: "white", border: "1px solid #e2ebe4", borderRadius: 20, padding: "36px 40px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          {isSinglePage ? (
            <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              <FormIdentificacao data={formData.identificacao} onChange={upd("identificacao")} />
              <div style={{ borderTop: "1px solid #f0f4f0", paddingTop: 40 }}><FormFormacao data={formData.formacao} onChange={upd("formacao")} /></div>
              <div style={{ borderTop: "1px solid #f0f4f0", paddingTop: 40 }}><FormExperienciaGeral data={formData.experienciaGeral} onChange={upd("experienciaGeral")} /></div>
              <div style={{ borderTop: "1px solid #f0f4f0", paddingTop: 40 }}><FormExperienciaEspecifica data={formData.experienciaEspecifica} onChange={upd("experienciaEspecifica")} /></div>
              <div style={{ borderTop: "1px solid #f0f4f0", paddingTop: 40 }}><FormOutrosCriterios data={formData.outrosCriterios} onChange={upd("outrosCriterios")} /></div>
              <div style={{ borderTop: "1px solid #f0f4f0", paddingTop: 40 }}><FormHonorarios data={formData.honorarios} onChange={upd("honorarios")} /></div>
              <div style={{ borderTop: "1px solid #f0f4f0", paddingTop: 40 }}><FormTaxa data={formData.taxaAdministrativa} onChange={upd("taxaAdministrativa")} /></div>

              <div style={{ borderTop: "1px solid #f0f4f0", paddingTop: 40 }}>
                <Declaration checked={formData.concordoDeclaracao} id="decl-single"
                  onChange={v => setFormData(p => ({ ...p, concordoDeclaracao: v }))} />
              </div>

              <div style={{ borderTop: "1px solid #f0f4f0", paddingTop: 40 }}>
                {formData.concordoDeclaracao
                  ? <SubmissionPanel data={formData} onClear={handleClearForm} />
                  : <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: 20, textAlign: "center" }}>
                      <p style={{ color: "#92400e", fontSize: 13, fontWeight: 600 }}>Preencha as seções acima e marque a Declaração de Veracidade para desbloquear o envio.</p>
                    </div>
                }
              </div>
            </div>
          ) : (
            <div className="fade-up">
              {activeStep === 0 && <FormIdentificacao data={formData.identificacao} onChange={upd("identificacao")} />}
              {activeStep === 1 && <FormFormacao data={formData.formacao} onChange={upd("formacao")} />}
              {activeStep === 2 && <FormExperienciaGeral data={formData.experienciaGeral} onChange={upd("experienciaGeral")} />}
              {activeStep === 3 && <FormExperienciaEspecifica data={formData.experienciaEspecifica} onChange={upd("experienciaEspecifica")} />}
              {activeStep === 4 && <FormOutrosCriterios data={formData.outrosCriterios} onChange={upd("outrosCriterios")} />}
              {activeStep === 5 && <FormHonorarios data={formData.honorarios} onChange={upd("honorarios")} />}
              {activeStep === 6 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  <FormTaxa data={formData.taxaAdministrativa} onChange={upd("taxaAdministrativa")} />
                  <div style={{ borderTop: "1px solid #f0f4f0", paddingTop: 28 }}>
                    <Declaration checked={formData.concordoDeclaracao} id="decl-step"
                      onChange={v => setFormData(p => ({ ...p, concordoDeclaracao: v }))} />
                  </div>
                </div>
              )}
              {activeStep === 7 && <SubmissionPanel data={formData} onClear={handleClearForm} />}
            </div>
          )}
        </div>

        {/* ══ NAVIGATION ══ */}
        {!isSinglePage && (
          <div id="controls-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
            {activeStep > 0
              ? <button type="button" onClick={handlePrev} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", backgroundColor: "white", border: "1px solid #d1d5db", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer" }}>
                  <ChevronLeft size={16} /> Voltar
                </button>
              : <div />
            }

            {sectionErrors.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "8px 14px", maxWidth: 340 }}>
                <AlertCircle size={15} color="#ef4444" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#b91c1c" }}>
                  {sectionErrors[0]}{sectionErrors.length > 1 ? ` (+${sectionErrors.length - 1})` : ""}
                </span>
              </div>
            )}

            {activeStep < STEPS.length - 1
              ? <button type="button" onClick={handleNext} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 24px", backgroundColor: "#2d6a4f", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer", boxShadow: "0 2px 8px rgba(45,106,79,0.3)" }}>
                  Avançar <ChevronRight size={16} />
                </button>
              : <div />
            }
          </div>
        )}

        {/* ══ FOOTER ══ */}
        <div id="clear-btn" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, paddingTop: 20, borderTop: "1px solid #e2ebe4" }}>
          <p style={{ fontSize: 11, color: "#9ca3af" }}>© 2026 Instituto NGUTAPA · Projeto GEF Putumayo-Içá · Banco Mundial</p>
          <button type="button" onClick={handleClearForm} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#9ca3af", background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 6 }}
            onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
            onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af"; }}>
            <RotateCcw size={12} /> Limpar Formulário
          </button>
        </div>
      </div>
    </div>
  );
}

function Declaration({ checked, id, onChange }: { checked: boolean; id: string; onChange: (v: boolean) => void }) {
  return (
    <div>
      <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1a3d2b", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#2d6a4f", color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✓</span>
        Declaração de Veracidade
      </h4>
      <label htmlFor={id} style={{ display: "flex", gap: 14, padding: "18px 20px", backgroundColor: "#f6faf7", border: `2px solid ${checked ? "#2d6a4f" : "#d1fae5"}`, borderRadius: 14, cursor: "pointer", transition: "all 0.15s" }}>
        <input type="checkbox" id={id} checked={checked} onChange={e => onChange(e.target.checked)}
          style={{ width: 18, height: 18, accentColor: "#2d6a4f", cursor: "pointer", flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
          <p style={{ fontWeight: 700, color: "#1a3d2b", marginBottom: 6 }}>Ao assinalar, o(a) profissional declara que:</p>
          <ul style={{ paddingLeft: 18, color: "#6b7280", display: "flex", flexDirection: "column", gap: 4 }}>
            <li>Todas as informações prestadas são verdadeiras e podem ser comprovadas mediante solicitação.</li>
            <li>Os honorários informados refletem coerentemente sua prática habitual de mercado para o escopo descrito no TdR.</li>
            <li>Este formulário é utilizado exclusivamente para fins de pesquisa de mercado e <strong style={{ color: "#374151" }}>não constitui proposta de contratação imediata</strong>.</li>
          </ul>
        </div>
      </label>
    </div>
  );
}
