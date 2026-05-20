import React from "react";
import { ExperienciaEspecifica } from "../types";
import { ShieldAlert, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

interface Props {
  data: ExperienciaEspecifica;
  onChange: (updates: Partial<ExperienciaEspecifica>) => void;
}

export function FormExperienciaEspecifica({ data, onChange }: Props) {
  const totalMeses = data.mesesExperienciaAmazonia === "" ? 0 : Number(data.mesesExperienciaAmazonia);
  const isCompliant = totalMeses >= 12;

  const handleExp1Change = (field: string, value: string) => {
    onChange({ experiencia1: { ...data.experiencia1, [field]: value } });
  };

  const handleExp2Change = (field: string, value: string) => {
    onChange({ experiencia2: { ...data.experiencia2, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-green-100 pb-3 mb-2">
        <h3 className="text-lg font-sans font-semibold text-green-950 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-green-700" />
          4. Experiência Específica na Amazônia
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          O TdR exige no mínimo <strong>12 meses</strong> de atuação direta com povos indígenas ou comunidades tradicionais na Amazônia Legal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-2 font-semibold">
            Possui experiência com povos indígenas na Amazônia? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {["Sim", "Não"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="radio" name="possuiExperienciaAmazonia" value={opt}
                  checked={data.possuiExperienciaAmazonia === opt}
                  onChange={() => onChange({ possuiExperienciaAmazonia: opt as any })}
                  className="accent-green-600 scale-110 cursor-pointer"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="input-meses-especifica" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Total de Meses de Experiência Específica na Amazônia <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number" id="input-meses-especifica" min="0"
              value={data.mesesExperienciaAmazonia}
              onChange={(e) => {
                const val = e.target.value;
                onChange({ mesesExperienciaAmazonia: val === "" ? "" : Number(val) });
              }}
              placeholder="Ex: 18"
              className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-16 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-sans">meses</span>
          </div>
        </div>

        <div className="md:col-span-2">
          {data.mesesExperienciaAmazonia !== "" && (
            <div
              className={`p-4 rounded-xl border flex gap-3 items-center ${isCompliant && data.possuiExperienciaAmazonia === "Sim" ? "bg-green-50 border-green-200 text-green-900" : "bg-red-50 border-red-200 text-red-800"}`}
              id="specific-compliance-badge"
            >
              {isCompliant && data.possuiExperienciaAmazonia === "Sim" ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-xs"><strong>Requisito Atendido!</strong> Seus {totalMeses} meses de experiência qualificam sua proposta dentro da malha exigida pelo Banco Mundial.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span className="text-xs"><strong>Requisito Crítico abaixo do TdR:</strong> É necessário pelo menos 12 meses de experiência ativa com povos indígenas na Amazônia.</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-sans uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-100 pb-1 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            Liste as 02 experiências específicas mais relevantes
          </h4>

          <div className="bg-green-50/40 p-4 rounded-xl border border-green-100 space-y-3">
            <p className="text-xs font-semibold text-green-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-green-700 text-white flex items-center justify-center font-sans text-[10px] shrink-0">1</span>
              Experiência 1 <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor="input-exp1-entidade" className="block text-[10px] font-sans text-slate-500 mb-1 font-semibold uppercase tracking-wide">Entidade / Organização</label>
                <input type="text" id="input-exp1-entidade" value={data.experiencia1.entidade} onChange={(e) => handleExp1Change("entidade", e.target.value)} placeholder="Ex: FUNAI ou ISA" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green-600" />
              </div>
              <div>
                <label htmlFor="input-exp1-periodo" className="block text-[10px] font-sans text-slate-500 mb-1 font-semibold uppercase tracking-wide">Período (Início - Fim)</label>
                <input type="text" id="input-exp1-periodo" value={data.experiencia1.periodo} onChange={(e) => handleExp1Change("periodo", e.target.value)} placeholder="Ex: Jan/2022 - Mar/2023" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green-600" />
              </div>
              <div>
                <label htmlFor="input-exp1-funcao" className="block text-[10px] font-sans text-slate-500 mb-1 font-semibold uppercase tracking-wide">Sua Função</label>
                <input type="text" id="input-exp1-funcao" value={data.experiencia1.funcao} onChange={(e) => handleExp1Change("funcao", e.target.value)} placeholder="Ex: Antropólogo Consultor" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-400 text-white flex items-center justify-center font-sans text-[10px] shrink-0">2</span>
              Experiência 2 (Opcional)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor="input-exp2-entidade" className="block text-[10px] font-sans text-slate-500 mb-1 font-semibold uppercase tracking-wide">Entidade / Organização</label>
                <input type="text" id="input-exp2-entidade" value={data.experiencia2.entidade} onChange={(e) => handleExp2Change("entidade", e.target.value)} placeholder="Ex: Instituto Socioambiental" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green-600" />
              </div>
              <div>
                <label htmlFor="input-exp2-periodo" className="block text-[10px] font-sans text-slate-500 mb-1 font-semibold uppercase tracking-wide">Período (Início - Fim)</label>
                <input type="text" id="input-exp2-periodo" value={data.experiencia2.periodo} onChange={(e) => handleExp2Change("periodo", e.target.value)} placeholder="Ex: Jun/2023 - Atualmente" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green-600" />
              </div>
              <div>
                <label htmlFor="input-exp2-funcao" className="block text-[10px] font-sans text-slate-500 mb-1 font-semibold uppercase tracking-wide">Sua Função</label>
                <input type="text" id="input-exp2-funcao" value={data.experiencia2.funcao} onChange={(e) => handleExp2Change("funcao", e.target.value)} placeholder="Ex: Coordenador Etnográfico" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="textarea-conformidade-especifica" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Descreva detalhadamente como atendeu ao mínimo de 12 meses específicos <span className="text-red-500">*</span>
          </label>
          <textarea
            id="textarea-conformidade-especifica"
            rows={4}
            value={data.conformidadeExperienciaEspecifica}
            onChange={(e) => onChange({ conformidadeExperienciaEspecifica: e.target.value })}
            placeholder="Ex: Minha experiência engloba 18 meses ativos no Alto Rio Solimões liderando mapeamentos de terras junto ao povo Tikuna, com registros etnográficos e participação em consultas de CLPI..."
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
          <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
            Mencione os povos (ex: Kokama, Tikuna/Magüta, Witoto) e as atividades que você coordenou diretamente.
          </p>
        </div>
      </div>
    </div>
  );
}
