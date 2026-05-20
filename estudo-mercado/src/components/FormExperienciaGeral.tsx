import React from "react";
import { ExperienciaGeral } from "../types";
import { Briefcase, AlertCircle, CheckCircle2 } from "lucide-react";

interface Props {
  data: ExperienciaGeral;
  onChange: (updates: Partial<ExperienciaGeral>) => void;
}

export function FormExperienciaGeral({ data, onChange }: Props) {
  const totalMeses = data.totalMesesExperiencia === "" ? 0 : Number(data.totalMesesExperiencia);
  const isCompliant = totalMeses >= 24;

  return (
    <div className="space-y-6">
      <div className="border-b border-green-100 pb-3 mb-2">
        <h3 className="text-lg font-sans font-semibold text-green-950 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-green-700" />
          3. Experiência Profissional Geral
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          O TdR exige o mínimo de <strong>24 meses</strong> de experiência profissional comprovada desde a obtenção do diploma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="input-meses-geral" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Total de Meses de Experiência Profissional Geral <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number" id="input-meses-geral" min="0"
              value={data.totalMesesExperiencia}
              onChange={(e) => {
                const val = e.target.value;
                onChange({ totalMesesExperiencia: val === "" ? "" : Number(val) });
              }}
              placeholder="Ex: 36"
              className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-16 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-sans">meses</span>
          </div>
        </div>

        <div>
          <label htmlFor="input-obtencao-diploma" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Data de obtenção do diploma (Mês/Ano) <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="input-obtencao-diploma"
            value={data.dataObtencaoDiploma}
            onChange={(e) => onChange({ dataObtencaoDiploma: e.target.value })}
            placeholder="Ex: 08/2021"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>

        <div className="md:col-span-2">
          {data.totalMesesExperiencia !== "" && (
            <div className={`p-4 rounded-xl border flex gap-3 items-center ${isCompliant ? "bg-green-50 border-green-200 text-green-900" : "bg-red-50 border-red-200 text-red-800"}`} id="compliance-badge">
              {isCompliant ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-xs"><strong>Requisito Atendido!</strong> Você informou {totalMeses} meses, superando os 24 meses exigidos pelo Termo de Referência.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span className="text-xs"><strong>Abaixo do mínimo:</strong> Você preencheu {totalMeses} meses. O TdR exige no mínimo 24 meses de experiência profissional.</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="textarea-conformidade-geral" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Argumente como seu histórico profissional totaliza os meses informados <span className="text-red-500">*</span>
          </label>
          <textarea
            id="textarea-conformidade-geral"
            rows={4}
            value={data.conformidadeExperienciaGeral}
            onChange={(e) => onChange({ conformidadeExperienciaGeral: e.target.value })}
            placeholder="Ex: Minha carreira profissional acumula 4 anos (48 meses) desde a minha graduação em 2020, com atuação contínua em consultorias antropológicas e pesquisa acadêmica..."
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
