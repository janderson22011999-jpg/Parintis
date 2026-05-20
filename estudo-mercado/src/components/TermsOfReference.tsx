import React, { useState } from "react";
import { BookOpen, Calendar, MapPin, Briefcase, Award, CheckCircle, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { ATIVIDADES_PRINCIPAIS_TDR } from "../types";

export function TermsOfReference() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div id="tdr-section" className="bg-white border border-green-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 bg-green-50 border-b border-green-100">
        <div>
          <h2 className="text-base font-sans font-semibold text-green-950 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-green-700" />
            Termos de Referência (TdR) — Resumo do Cargo
          </h2>
          <p className="text-[11px] text-green-700/70 font-mono mt-0.5 uppercase tracking-wide">
            Requisitos e Atividades Previstas · Projeto GEF Putumayo-Içá
          </p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 px-3 text-xs font-medium text-green-800 hover:text-green-950 bg-white border border-green-200 hover:bg-green-50 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          id="toggle-tdr-btn"
        >
          {isOpen ? (
            <> Recolher <ChevronUp className="w-3.5 h-3.5" /> </>
          ) : (
            <> Ver Requisitos <ChevronDown className="w-3.5 h-3.5" /> </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="p-6 space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: Award, title: "Formação Exigida", text: "Diploma em Antropologia, Ciências Sociais ou áreas afins." },
              { icon: Briefcase, title: "Experiência Geral", text: "Mínimo de 24 meses de experiência profissional total comprovada." },
              { icon: Shield, title: "Experiência Específica", text: "Mínimo de 12 meses com povos indígenas ou comunidades tradicionais na Amazônia." },
              { icon: Calendar, title: "Contratação", text: "Duração de 6 meses. Pagamento mensal via Nota Fiscal (CNPJ), em BRL." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3">
                <div className="p-2 bg-green-100 rounded-lg shrink-0 text-green-700 h-9 w-9 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">{title}</h4>
                  <p className="text-sm font-sans text-slate-700 mt-1 leading-snug">{text}</p>
                </div>
              </div>
            ))}

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3 md:col-span-2 lg:col-span-2">
              <div className="p-2 bg-green-100 rounded-lg shrink-0 text-green-700 h-9 w-9 flex items-center justify-center">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Sede de Trabalho</h4>
                <p className="text-sm font-sans text-slate-700 mt-1 leading-snug">
                  Vila Bethania SAI, Santo Antônio do Içá – AM<br />
                  <span className="text-xs text-slate-500">Território com povos Tikuna/Magüta e Kokama</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <h3 className="text-xs font-sans font-semibold text-slate-700 mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <CheckCircle className="w-4 h-4 text-green-600" /> Atividades Principais Previstas no TdR
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-slate-600 text-xs">
              {ATIVIDADES_PRINCIPAIS_TDR.map((atividade, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="font-mono text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-semibold mt-0.5 shrink-0 select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed">{atividade}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
