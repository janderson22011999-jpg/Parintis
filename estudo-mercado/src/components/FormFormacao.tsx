import React from "react";
import { FormacaoAcademica } from "../types";
import { Award } from "lucide-react";

interface Props {
  data: FormacaoAcademica;
  onChange: (updates: Partial<FormacaoAcademica>) => void;
}

export function FormFormacao({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="border-b border-green-100 pb-3 mb-2">
        <h3 className="text-lg font-sans font-semibold text-green-950 flex items-center gap-2">
          <Award className="w-5 h-5 text-green-700" />
          2. Formação Acadêmica
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          O TdR exige diploma em Antropologia, Ciências Sociais ou áreas afins.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="input-curso" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Curso / Área de Formação <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="input-curso"
            value={data.cursoFormacao}
            onChange={(e) => onChange({ cursoFormacao: e.target.value })}
            placeholder="Ex: Bacharelado em Antropologia"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>

        <div>
          <label htmlFor="input-instituicao" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Instituição de Ensino <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="input-instituicao"
            value={data.instituicaoEnsino}
            onChange={(e) => onChange({ instituicaoEnsino: e.target.value })}
            placeholder="Ex: Universidade Federal do Amazonas (UFAM)"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-2.5 font-semibold">
            Nível Mais Alto Concluído <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Graduação", "Especialização", "Mestrado", "Doutorado"].map((nivel) => (
              <label
                key={nivel}
                htmlFor={`form-nivel-${nivel}`}
                className={`py-3 px-4 border rounded-xl flex items-center justify-center text-xs font-sans font-medium transition-all cursor-pointer ${
                  data.nivelMaisAlto === nivel
                    ? "bg-green-50 border-green-600 text-green-800 ring-1 ring-green-600"
                    : "bg-white border-slate-200 hover:border-green-300 text-slate-700"
                }`}
              >
                <input
                  type="radio" name="nivelMaisAlto" value={nivel}
                  id={`form-nivel-${nivel}`}
                  checked={data.nivelMaisAlto === nivel}
                  onChange={() => onChange({ nivelMaisAlto: nivel as any })}
                  className="sr-only"
                />
                <span>{nivel}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="textarea-conformidade-formacao" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Como sua formação atende ao requisito do TdR <span className="text-red-500">*</span>
          </label>
          <textarea
            id="textarea-conformidade-formacao"
            rows={4}
            value={data.conformidadeFormacao}
            onChange={(e) => onChange({ conformidadeFormacao: e.target.value })}
            placeholder="Ex: Sou graduado em Ciências Sociais com habilitação em Antropologia pela UFAM e mestre em Antropologia Social pela Unicamp. Minha formação contempla os fundamentos de pesquisa etnográfica exigidos pelo TdR."
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
