import React from "react";
import { TaxaAdministrativa } from "../types";
import { Percent, Info } from "lucide-react";

interface Props {
  data: TaxaAdministrativa;
  onChange: (updates: Partial<TaxaAdministrativa>) => void;
}

export function FormTaxa({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="border-b border-green-100 pb-3 mb-2">
        <h3 className="text-lg font-sans font-semibold text-green-950 flex items-center gap-2">
          <Percent className="w-5 h-5 text-green-700" />
          7. Taxa Administrativa
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Informe se há incidência de taxas adicionais para gerenciamento contratual corporativo/CNPJ.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="input-taxa-admin" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Taxa Administrativa Aplicada (%) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text" id="input-taxa-admin"
              value={data.taxaAdministrativa}
              onChange={(e) => onChange({ taxaAdministrativa: e.target.value })}
              placeholder="Ex: 0 ou 5"
              className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-12 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-sans">%</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="textarea-observacao-taxa" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Observações sobre a Taxa Administrativa
          </label>
          <textarea
            id="textarea-observacao-taxa"
            rows={3}
            value={data.observacoesTaxa}
            onChange={(e) => onChange({ observacoesTaxa: e.target.value })}
            placeholder="Ex: Isento caso o faturamento ocorra via MEI limpo. Caso utilize cooperativa, aplica-se taxa operacional de 5%..."
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed flex gap-1 items-start">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>Caso não aplique taxa administrativa, mantenha o valor em 0.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
