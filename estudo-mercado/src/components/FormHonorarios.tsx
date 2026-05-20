import React from "react";
import { Honorarios, INCLUSOS_OPCOES } from "../types";
import { DollarSign, Check, Info, Calculator } from "lucide-react";

interface Props {
  data: Honorarios;
  onChange: (updates: Partial<Honorarios>) => void;
}

export function FormHonorarios({ data, onChange }: Props) {
  const handleToggleIncluso = (item: string) => {
    const list = [...data.inclusos];
    const idx = list.indexOf(item);
    if (idx > -1) list.splice(idx, 1); else list.push(item);
    onChange({ inclusos: list });
  };

  const handleCalculateTotals = () => {
    const monthlyBRL = parseFloat(data.valorMensalBRL.replace(/[^\d.,]/g, "").replace(",", "."));
    const monthlyUSD = parseFloat(data.valorMensalUSD.replace(/[^\d.,]/g, "").replace(",", "."));
    const updates: Partial<Honorarios> = {};
    if (!isNaN(monthlyBRL) && monthlyBRL > 0) updates.valorTotalBRL = (monthlyBRL * 6).toFixed(2);
    if (!isNaN(monthlyUSD) && monthlyUSD > 0) updates.valorTotalUSD = (monthlyUSD * 6).toFixed(2);
    if (Object.keys(updates).length > 0) onChange(updates);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-green-100 pb-3 mb-2">
        <h3 className="text-lg font-sans font-semibold text-green-950 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-700" />
          6. Proposta de Honorários
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Esta é a informação central do estudo de mercado para estabelecer os limites de orçamento do Banco Mundial e NGUTAPA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label htmlFor="input-desc-servico" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Descrição do Serviço Ofertado conforme TdR <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="input-desc-servico"
            value={data.descricaoServico}
            onChange={(e) => onChange({ descricaoServico: e.target.value })}
            placeholder="Ex: Serviços de consultoria antropológica para o projeto UTÜʼÜ Y ITCHÁ"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>

        <div className="space-y-4 bg-green-50/50 p-4 rounded-xl border border-green-100">
          <h4 className="text-xs font-sans uppercase tracking-wider text-green-800 font-semibold border-b border-green-100 pb-1.5">
            Cotação em Reais (BRL) <span className="text-red-500">*</span>
          </h4>
          <div>
            <label htmlFor="input-mensal-brl" className="block text-xs text-slate-500 mb-1 font-semibold">Valor Mensal Pretendido</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-sans text-slate-400">R$</span>
              <input type="text" id="input-mensal-brl" value={data.valorMensalBRL} onChange={(e) => onChange({ valorMensalBRL: e.target.value })} placeholder="Ex: 8.500,00" className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-green-600" />
            </div>
          </div>
          <div>
            <label htmlFor="input-total-brl" className="block text-xs text-slate-500 mb-1 font-semibold">Valor Total para 6 Meses</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-sans text-slate-400">R$</span>
              <input type="text" id="input-total-brl" value={data.valorTotalBRL} onChange={(e) => onChange({ valorTotalBRL: e.target.value })} placeholder="Ex: 51.000,00" className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-green-600" />
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="text-xs font-sans uppercase tracking-wider text-slate-600 font-semibold border-b border-slate-200 pb-1.5">
            Referência em Dólar (USD) <span className="text-slate-400 font-normal lowercase">(opcional)</span>
          </h4>
          <div>
            <label htmlFor="input-mensal-usd" className="block text-xs text-slate-500 mb-1 font-semibold">Valor Mensal Pretendido</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-sans text-slate-400">US$</span>
              <input type="text" id="input-mensal-usd" value={data.valorMensalUSD} onChange={(e) => onChange({ valorMensalUSD: e.target.value })} placeholder="Ex: 1,600.00" className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-green-600" />
            </div>
          </div>
          <div>
            <label htmlFor="input-total-usd" className="block text-xs text-slate-500 mb-1 font-semibold">Valor Total para 6 Meses</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-sans text-slate-400">US$</span>
              <input type="text" id="input-total-usd" value={data.valorTotalUSD} onChange={(e) => onChange({ valorTotalUSD: e.target.value })} placeholder="Ex: 9,600.00" className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-green-600" />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button type="button" onClick={handleCalculateTotals}
            className="text-xs font-sans font-semibold text-green-700 hover:text-green-800 flex items-center gap-1.5 bg-green-50 hover:bg-green-100 border border-green-200 p-2 px-3 rounded-lg transition-all cursor-pointer"
            id="btn-auto-calc-totals"
          >
            <Calculator className="w-3.5 h-3.5" />
            Autocalcular Totais (Mensal × 6 meses)
          </button>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-2 font-semibold">
            O valor ofertado inclui os seguintes custos:
          </label>
          <div className="flex flex-wrap gap-2.5">
            {INCLUSOS_OPCOES.map((opcao) => {
              const isChecked = data.inclusos.includes(opcao);
              return (
                <button
                  type="button" key={opcao} id={`btn-inclui-${opcao}`}
                  onClick={() => handleToggleIncluso(opcao)}
                  className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isChecked ? "bg-green-800 border-green-900 text-white" : "bg-white border-slate-200 hover:border-green-300 text-slate-700"
                  }`}
                >
                  {isChecked ? <Check className="w-3.5 h-3.5" /> : <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>}
                  {opcao}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed flex gap-1 items-start">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>Declare se impostos retidos na fonte (IRRF / INSS) ou viagem de Manaus/Tabatinga para Santo Antônio do Içá já estão inclusos no seu cálculo.</span>
          </p>
        </div>

        <div>
          <label htmlFor="input-validade-prop" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Prazo de Validade Desta Proposta <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="input-validade-prop"
            value={data.prazoValidadeProposta}
            onChange={(e) => onChange({ prazoValidadeProposta: e.target.value })}
            placeholder="Ex: 60 dias"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
