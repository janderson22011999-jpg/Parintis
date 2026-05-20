import React from "react";
import { Identizicao } from "../types";
import { AlertCircle, User, ShieldAlert, Check } from "lucide-react";

interface Props {
  data: Identizicao;
  onChange: (updates: Partial<Identizicao>) => void;
}

export function FormIdentificacao({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="border-b border-green-100 pb-3 mb-2">
        <h3 className="text-lg font-sans font-semibold text-green-950 flex items-center gap-2">
          <User className="w-5 h-5 text-green-700" />
          1. Identificação Profissional
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Forneça seus dados de contato e informações cadastrais.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label htmlFor="input-nome-completo" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Nome Completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="input-nome-completo"
            value={data.nomeCompleto}
            onChange={(e) => onChange({ nomeCompleto: e.target.value })}
            placeholder="Digite seu nome completo"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>

        <div>
          <label htmlFor="input-nacionalidade" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Nacionalidade <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="input-nacionalidade"
            value={data.nacionalidade}
            onChange={(e) => onChange({ nacionalidade: e.target.value })}
            placeholder="Ex: Brasileira"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>

        <div>
          <label htmlFor="input-documento-identidade" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Nº Documento Identidade (CPF ou Passaporte) <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="input-documento-identidade"
            value={data.documentoIdentidade}
            onChange={(e) => onChange({ documentoIdentidade: e.target.value })}
            placeholder="Ex: 000.000.000-00 ou passaporte"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>

        <div>
          <label htmlFor="input-pais-cidade" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            País e Cidade de Residência <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="input-pais-cidade"
            value={data.paisCidadeResidencia}
            onChange={(e) => onChange({ paisCidadeResidencia: e.target.value })}
            placeholder="Ex: Manaus, Brasil"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>

        <div>
          <label htmlFor="input-data-cotacao" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Data da Cotação <span className="text-red-500">*</span>
          </label>
          <input
            type="date" id="input-data-cotacao"
            value={data.dataCotacao}
            onChange={(e) => onChange({ dataCotacao: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>

        <div className="md:col-span-2 space-y-3">
          <label className="block text-xs font-sans uppercase tracking-wider text-slate-500 font-semibold">
            Tipo de pessoa para faturamento <span className="text-red-500">*</span>
          </label>

          <div className="flex flex-col md:flex-row gap-4">
            <label
              htmlFor="radio-tipo-pj"
              className={`flex-1 border p-4 rounded-xl flex items-start gap-3 cursor-pointer transition-all ${
                data.tipoPessoa === "PJ" ? "border-green-600 bg-green-50 ring-1 ring-green-600" : "border-slate-200 bg-white hover:border-green-300"
              }`}
            >
              <input type="radio" name="tipoPessoa" value="PJ" id="radio-tipo-pj"
                checked={data.tipoPessoa === "PJ"}
                onChange={() => onChange({ tipoPessoa: "PJ" })}
                className="mt-1 accent-green-600 cursor-pointer"
              />
              <div>
                <span className="text-sm font-sans font-semibold text-green-900 flex items-center gap-1.5">
                  Pessoa Jurídica — CNPJ
                  {data.tipoPessoa === "PJ" && <Check className="w-4 h-4 text-green-600" />}
                </span>
                <span className="block text-xs text-slate-500 mt-1">
                  Exigido pelas normas do Banco Mundial. Notas emitidas via empresa própria, cooperativa ou MEI.
                </span>
              </div>
            </label>

            <label
              htmlFor="radio-tipo-pf"
              className={`flex-1 border p-4 rounded-xl flex items-start gap-3 cursor-pointer transition-all ${
                data.tipoPessoa === "PF" ? "border-red-400 bg-red-50" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <input type="radio" name="tipoPessoa" value="PF" id="radio-tipo-pf"
                checked={data.tipoPessoa === "PF"}
                onChange={() => onChange({ tipoPessoa: "PF" })}
                className="mt-1 accent-red-500 cursor-pointer"
              />
              <div>
                <span className="text-sm font-sans font-semibold text-red-700 flex items-center gap-1">
                  Pessoa Física — CPF
                  {data.tipoPessoa === "PF" && <AlertCircle className="w-4 h-4" />}
                </span>
                <span className="block text-xs text-slate-500 mt-1">
                  Não aceito pelo edital. Necessário converter para CNPJ parceiro ou cooperativa.
                </span>
              </div>
            </label>
          </div>

          {data.tipoPessoa === "PF" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-800 flex gap-2 items-center" id="pf-disabled-warning">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>
                <strong>Atenção:</strong> O TdR veta expressamente a contratação como Pessoa Física pura sem CNPJ. Você pode preencher para fins estatísticos, mas a contratação requer CNPJ.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
