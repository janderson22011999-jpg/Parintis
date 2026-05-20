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
import { ChevronRight, ChevronLeft, RotateCcw, AlertCircle, Layers } from "lucide-react";

/* ── Logo vector matching the Cuenca Putumayo Içá brand ── */
function ProjectLogo({ className = "w-12 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left figure — tail at top, head at bottom */}
      {/* Tail rays */}
      <line x1="28" y1="22" x2="14" y2="8"  stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="30" y1="20" x2="22" y2="5"  stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="33" y1="19" x2="28" y2="4"  stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      {/* Body */}
      <path
        d="M 31,21 C 34,30 34,42 30,54 C 27,63 24,70 24,78 C 24,86 34,87 35,78 C 36,68 38,58 36,44 C 34,32 34,24 31,21 Z"
        stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" fill="none"
      />
      {/* Eye */}
      <circle cx="28" cy="78" r="2.8" fill="currentColor"/>

      {/* Right figure — head at top, tail at bottom */}
      {/* Eye */}
      <circle cx="52" cy="22" r="2.8" fill="currentColor"/>
      {/* Body */}
      <path
        d="M 49,21 C 46,32 44,44 46,58 C 48,68 44,78 45,86 C 46,94 56,93 55,84 C 54,76 56,64 54,54 C 50,42 46,30 49,21 Z"
        stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" fill="none"
      />
      {/* Tail rays */}
      <line x1="49" y1="84" x2="38" y2="96" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="52" y1="86" x2="46" y2="98" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="55" y1="85" x2="52" y2="98" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
    </svg>
  );
}

export default function App() {
  const [formData, setFormData] = useState<EstudoMercadoForm>(() => {
    try {
      const saved = localStorage.getItem("ngutapa_survey_data");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Falha ao recuperar dados do localStorage", e);
    }
    return INITIAL_FORM_STATE;
  });

  const [activeStep, setActiveStep] = useState(0);
  const [isSinglePage, setIsSinglePage] = useState(false);
  const [sectionErrors, setSectionErrors] = useState<string[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem("ngutapa_survey_data", JSON.stringify(formData));
    } catch (e) {
      console.error("Falha ao gravar no localStorage", e);
    }
  }, [formData]);

  const updateIdentificacao = (u: any) => setFormData(p => ({ ...p, identificacao: { ...p.identificacao, ...u } }));
  const updateFormacao = (u: any) => setFormData(p => ({ ...p, formacao: { ...p.formacao, ...u } }));
  const updateExperienciaGeral = (u: any) => setFormData(p => ({ ...p, experienciaGeral: { ...p.experienciaGeral, ...u } }));
  const updateExperienciaEspecifica = (u: any) => setFormData(p => ({ ...p, experienciaEspecifica: { ...p.experienciaEspecifica, ...u } }));
  const updateOutrosCriterios = (u: any) => setFormData(p => ({ ...p, outrosCriterios: { ...p.outrosCriterios, ...u } }));
  const updateHonorarios = (u: any) => setFormData(p => ({ ...p, honorarios: { ...p.honorarios, ...u } }));
  const updateTaxa = (u: any) => setFormData(p => ({ ...p, taxaAdministrativa: { ...p.taxaAdministrativa, ...u } }));

  const handleClearForm = () => {
    if (window.confirm("Deseja realmente limpar todos os campos e reiniciar o formulário?")) {
      setFormData(INITIAL_FORM_STATE);
      setActiveStep(0);
      setSectionErrors([]);
      localStorage.removeItem("ngutapa_survey_data");
    }
  };

  const stepsList = [
    { key: "identificacao", label: "Identificação" },
    { key: "formacao", label: "Formação" },
    { key: "experienciaGeral", label: "Exp. Geral" },
    { key: "experienciaEspecifica", label: "Exp. Específica" },
    { key: "outrosCriterios", label: "Outros Critérios" },
    { key: "honorarios", label: "Honorários" },
    { key: "taxa", label: "Taxa & Decl." },
    { key: "submission", label: "Enviar" },
  ];

  const handleNextStep = () => {
    const errors = validateSection(stepsList[activeStep].key, formData);
    if (errors.length > 0) { setSectionErrors(errors); return; }
    setSectionErrors([]);
    if (activeStep < stepsList.length - 1) setActiveStep(p => p + 1);
  };

  const handlePrevStep = () => {
    setSectionErrors([]);
    if (activeStep > 0) setActiveStep(p => p - 1);
  };

  const handleJumpToStep = (index: number) => {
    if (index < activeStep) { setSectionErrors([]); setActiveStep(index); return; }
    const errors = validateSection(stepsList[activeStep].key, formData);
    if (errors.length > 0) { setSectionErrors(errors); }
    else { setSectionErrors([]); setActiveStep(index); }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] text-slate-800 selection:bg-green-600/20" id="main-app-container">
      <style>{`
        @media print {
          body { background: white !important; padding: 0 !important; }
          #tdr-section, #nav-progress-bar, #controls-bar, #btn-auto-calc-totals,
          #pf-disabled-warning, #compliance-badge, #specific-compliance-badge,
          #view-toggle-bar, #header-banner, #clear-survey-wrapper,
          #print-hide { display: none !important; }
          #print-letterhead { display: block !important; }
          .bg-white, .bg-slate-50 { background: transparent !important; border: none !important; box-shadow: none !important; }
          input, textarea { border: none !important; border-bottom: 1px solid #ccc !important; background: transparent !important; font-size: 11px !important; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.22s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      {/* Print letterhead */}
      <div id="print-letterhead" className="hidden p-8">
        <div className="flex items-center justify-between border-b-2 border-green-950 pb-5 mb-6">
          <div className="space-y-1">
            <h1 className="text-base font-bold uppercase tracking-wide text-green-950">Instituto de Etno Desenvolvimento NGUTAPA</h1>
            <p className="text-xs text-slate-500 uppercase">Vila Bethania SAI, Santo Antônio do Içá – AM</p>
            <p className="text-sm font-bold text-slate-800 mt-2">PESQUISA DE MERCADO / COTAÇÃO — ANTROPÓLOGO(A)</p>
            <p className="text-[10px] text-slate-500">Projeto GEF Putumayo-Içá · Banco Mundial</p>
          </div>
          <div className="flex items-center gap-2.5 border border-slate-200 p-2.5 rounded-xl bg-slate-50">
            <ProjectLogo className="w-8 h-10 text-green-900" />
            <div className="flex flex-col leading-tight text-green-950">
              <span className="text-[8px] font-medium tracking-wide uppercase text-slate-500">Cuenca</span>
              <span className="text-xs font-extrabold">Putumayo</span>
              <span className="text-[10px] font-semibold text-green-700">Içá</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-6 print:max-w-none">

        {/* ── Header ── */}
        <header id="header-banner" className="relative bg-[#1a3d2b] rounded-2xl overflow-hidden shadow-lg">
          {/* Background wave */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 220" fill="none" preserveAspectRatio="none">
            <path d="M 0,160 C 180,60 360,200 560,80 C 700,-20 800,120 900,40 L 900,220 L 0,220 Z" fill="#ffffff" fillOpacity="0.03"/>
            <path d="M -20,180 C 180,50 400,200 600,70 C 730,-30 840,130 940,30" stroke="#d4a820" strokeWidth="1.5" strokeOpacity="0.35"/>
          </svg>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8">
            {/* Brand block */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15 select-none shrink-0">
                <ProjectLogo className="w-10 h-12 text-white" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-medium tracking-widest uppercase text-green-300">Cuenca</span>
                  <span className="text-sm font-extrabold tracking-tight text-white">Putumayo</span>
                  <span className="text-xs font-bold text-amber-400">Içá</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 bg-green-800/60 text-green-300 text-[10px] font-mono uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full border border-green-700/40">
                  Estudo de Mercado · Antropólogo(a)
                </div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                  Projeto GEF Putumayo-Içá
                </h1>
                <p className="text-green-200 text-xs leading-relaxed max-w-md">
                  <em>Utü'ü y Itchá</em> — O Encantado Içá: renovação da pesquisa e fortalecimento do conhecimento tradicional dos povos da floresta.
                </p>
                <p className="text-green-400/70 text-[10px] font-mono">
                  Instituto de Etno Desenvolvimento NGUTAPA · Santo Antônio do Içá – AM
                </p>
              </div>
            </div>

            {/* Deadline badge */}
            <div className="shrink-0 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4 text-center md:text-right">
              <p className="text-[10px] uppercase font-mono tracking-widest text-green-300 font-semibold mb-1">Prazo Limite</p>
              <p className="text-base font-bold text-white">05/06/2026</p>
              <p className="text-xs text-green-200 font-sans">às 23h59 · Horário do Amazonas</p>
            </div>
          </div>
        </header>

        {/* ── View Toggle ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white px-4 py-3 border border-green-100 rounded-xl gap-3 shadow-sm" id="view-toggle-bar">
          <div className="flex items-center gap-2 text-slate-600">
            <Layers className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-slate-600">Modo de Preenchimento:</span>
          </div>
          <div className="flex rounded-lg overflow-hidden border border-green-200 bg-green-50 shrink-0">
            <button
              onClick={() => { setIsSinglePage(false); setSectionErrors([]); }}
              className={`px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${!isSinglePage ? "bg-green-700 text-white" : "text-green-800 hover:text-green-950"}`}
            >
              Passo a Passo
            </button>
            <button
              onClick={() => { setIsSinglePage(true); setSectionErrors([]); }}
              className={`px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${isSinglePage ? "bg-green-700 text-white" : "text-green-800 hover:text-green-950"}`}
            >
              Página Única
            </button>
          </div>
        </div>

        {/* ── TdR ── */}
        <TermsOfReference />

        {/* ── Progress bar ── */}
        {!isSinglePage && (
          <div className="bg-white border border-green-100 rounded-xl px-5 py-4 shadow-sm" id="nav-progress-bar">
            {/* Desktop */}
            <div className="hidden md:flex justify-between items-start relative">
              <div className="absolute left-5 right-5 h-px bg-green-100 top-4 z-0" />
              {stepsList.map((step, index) => {
                const isCompleted = index < activeStep;
                const isActive = index === activeStep;
                return (
                  <button
                    key={step.key}
                    onClick={() => handleJumpToStep(index)}
                    className="flex flex-col items-center text-center relative z-10 group cursor-pointer focus:outline-none"
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all border-2 ${
                      isActive
                        ? "bg-green-700 text-white border-green-700 scale-110 shadow-md shadow-green-200"
                        : isCompleted
                        ? "bg-green-900 text-white border-green-900"
                        : "bg-white text-slate-400 border-slate-200 group-hover:border-green-300"
                    }`}>
                      {isCompleted ? "✓" : index + 1}
                    </span>
                    <span className={`text-[10px] font-semibold mt-1.5 tracking-tight leading-tight max-w-[60px] transition-colors ${
                      isActive ? "text-green-700" : "text-slate-400 group-hover:text-slate-700"
                    }`}>
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Mobile */}
            <div className="flex md:hidden justify-between items-center gap-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wide shrink-0">
                {activeStep + 1}/{stepsList.length}
              </span>
              <div className="flex-1 h-1.5 bg-green-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-700 transition-all duration-300" style={{ width: `${((activeStep + 1) / stepsList.length) * 100}%` }} />
              </div>
              <span className="text-xs font-semibold text-green-700 shrink-0">{stepsList[activeStep].label}</span>
            </div>
          </div>
        )}

        {/* ── Form body ── */}
        <div className="bg-white border border-green-100 rounded-2xl p-6 md:p-8 shadow-sm print:shadow-none print:border-none">
          {isSinglePage ? (
            <div className="space-y-12 select-text">
              <FormIdentificacao data={formData.identificacao} onChange={updateIdentificacao} />
              <div className="border-t border-green-50 pt-10"><FormFormacao data={formData.formacao} onChange={updateFormacao} /></div>
              <div className="border-t border-green-50 pt-10"><FormExperienciaGeral data={formData.experienciaGeral} onChange={updateExperienciaGeral} /></div>
              <div className="border-t border-green-50 pt-10"><FormExperienciaEspecifica data={formData.experienciaEspecifica} onChange={updateExperienciaEspecifica} /></div>
              <div className="border-t border-green-50 pt-10"><FormOutrosCriterios data={formData.outrosCriterios} onChange={updateOutrosCriterios} /></div>
              <div className="border-t border-green-50 pt-10"><FormHonorarios data={formData.honorarios} onChange={updateHonorarios} /></div>
              <div className="border-t border-green-50 pt-10"><FormTaxa data={formData.taxaAdministrativa} onChange={updateTaxa} /></div>

              {/* Declaration */}
              <div className="border-t border-green-50 pt-10 space-y-4">
                <h4 className="text-sm font-sans font-bold text-green-950 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-700 text-white flex items-center justify-center text-[10px]">✓</span>
                  Declaração de Veracidade
                </h4>
                <label htmlFor="checkbox-decl-single" className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl cursor-pointer hover:bg-green-100/50 transition-colors">
                  <input
                    type="checkbox" id="checkbox-decl-single"
                    checked={formData.concordoDeclaracao}
                    onChange={(e) => setFormData(p => ({ ...p, concordoDeclaracao: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 accent-green-600 cursor-pointer shrink-0"
                  />
                  <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                    <p className="font-semibold text-green-900">Ao assinalar, o(a) profissional declara que:</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500">
                      <li>Todas as informações prestadas são verdadeiras e podem ser comprovadas mediante solicitação.</li>
                      <li>Os honorários informados refletem coerentemente sua prática habitual de mercado para o escopo descrito no TdR.</li>
                      <li>Este formulário é utilizado exclusivamente para fins de pesquisa de mercado e <strong>não constitui proposta de contratação imediata</strong>.</li>
                    </ul>
                  </div>
                </label>
              </div>

              <div className="border-t border-green-50 pt-10">
                {formData.concordoDeclaracao ? (
                  <SubmissionPanel data={formData} onClear={handleClearForm} />
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                    <p className="text-xs font-semibold text-amber-800">Preencha as seções acima e marque a Declaração de Veracidade para desbloquear as opções de envio.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn">
              {activeStep === 0 && <FormIdentificacao data={formData.identificacao} onChange={updateIdentificacao} />}
              {activeStep === 1 && <FormFormacao data={formData.formacao} onChange={updateFormacao} />}
              {activeStep === 2 && <FormExperienciaGeral data={formData.experienciaGeral} onChange={updateExperienciaGeral} />}
              {activeStep === 3 && <FormExperienciaEspecifica data={formData.experienciaEspecifica} onChange={updateExperienciaEspecifica} />}
              {activeStep === 4 && <FormOutrosCriterios data={formData.outrosCriterios} onChange={updateOutrosCriterios} />}
              {activeStep === 5 && <FormHonorarios data={formData.honorarios} onChange={updateHonorarios} />}
              {activeStep === 6 && (
                <div className="space-y-6">
                  <FormTaxa data={formData.taxaAdministrativa} onChange={updateTaxa} />
                  <div className="border-t border-green-50 pt-6">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 font-semibold flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-green-700 text-white flex items-center justify-center text-[9px]">✓</span>
                      Declaração de Veracidade
                    </h4>
                    <label htmlFor="checkbox-decl-step" className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl cursor-pointer hover:bg-green-100/50 transition-colors">
                      <input
                        type="checkbox" id="checkbox-decl-step"
                        checked={formData.concordoDeclaracao}
                        onChange={(e) => setFormData(p => ({ ...p, concordoDeclaracao: e.target.checked }))}
                        className="mt-0.5 h-4 w-4 accent-green-600 cursor-pointer shrink-0"
                      />
                      <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                        <p className="font-semibold text-green-900">Ao assinalar, o(a) profissional declara que:</p>
                        <ul className="list-disc pl-4 space-y-1 text-slate-500">
                          <li>Todas as informações prestadas são verdadeiras e podem ser comprovadas a qualquer momento.</li>
                          <li>Os honorários propostos refletem as médias e a razoabilidade da minha prática profissional.</li>
                          <li>Compreendo que este envio é uma cotação informativa e não constitui contrato automático.</li>
                        </ul>
                      </div>
                    </label>
                  </div>
                </div>
              )}
              {activeStep === 7 && <SubmissionPanel data={formData} onClear={handleClearForm} />}
            </div>
          )}
        </div>

        {/* ── Navigation ── */}
        {!isSinglePage && (
          <div className="flex justify-between items-center" id="controls-bar">
            {activeStep > 0 ? (
              <button type="button" onClick={handlePrevStep}
                className="px-5 py-2.5 bg-white hover:bg-green-50 border border-green-200 rounded-xl text-xs font-semibold text-green-800 hover:text-green-950 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Voltar
              </button>
            ) : <div />}

            {sectionErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-xl max-w-xs flex gap-2 items-center text-xs animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-semibold">
                  {sectionErrors[0]}{sectionErrors.length > 1 ? ` (+${sectionErrors.length - 1})` : ""}
                </span>
              </div>
            )}

            {activeStep < stepsList.length - 1 ? (
              <button type="button" onClick={handleNextStep}
                className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shadow-green-200"
              >
                Avançar <ChevronRight className="w-4 h-4" />
              </button>
            ) : <div />}
          </div>
        )}

        {/* ── Footer ── */}
        <footer className="flex justify-between items-center text-slate-400 text-[11px] pt-4 border-t border-green-100" id="clear-survey-wrapper">
          <p>© 2026 Instituto NGUTAPA · Projeto GEF Putumayo-Içá · Banco Mundial</p>
          <button type="button" onClick={handleClearForm}
            className="text-slate-400 hover:text-red-600 transition-all font-semibold flex items-center gap-1.5 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-transparent hover:border-red-200 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Limpar Formulário
          </button>
        </footer>
      </div>
    </div>
  );
}
