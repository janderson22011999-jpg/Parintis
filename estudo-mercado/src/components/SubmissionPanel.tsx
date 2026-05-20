import React, { useState } from "react";
import { EstudoMercadoForm } from "../types";
import { formatFormToText } from "../utils";
import { Mail, Copy, Check, Printer, AlertCircle, CheckCircle2, FileCheck } from "lucide-react";

interface Props {
  data: EstudoMercadoForm;
  onClear: () => void;
}

export function SubmissionPanel({ data, onClear }: Props) {
  const [copied, setCopied] = useState(false);

  const formattedText = formatFormToText(data);

  const totalGeneralMonths = data.experienciaGeral.totalMesesExperiencia === "" ? 0 : Number(data.experienciaGeral.totalMesesExperiencia);
  const totalSpecificMonths = data.experienciaEspecifica.mesesExperienciaAmazonia === "" ? 0 : Number(data.experienciaEspecifica.mesesExperienciaAmazonia);
  const hasPJSelected = data.identificacao.tipoPessoa === "PJ";
  const hasConsent = data.concordoDeclaracao;
  const isGeneralCompliant = totalGeneralMonths >= 24;
  const isSpecificCompliant = totalSpecificMonths >= 12 && data.experienciaEspecifica.possuiExperienciaAmazonia === "Sim";

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEmail = () => {
    const subject = `Estudo de Mercado — Antropólogo · ${data.identificacao.nomeCompleto || "[Seu Nome]"}`;
    const emailTo = "Institutongutapatikuna@gmail.com";
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedText)}`;
  };

  const checks = [
    {
      label: "Faturamento via Pessoa Jurídica (PJ)",
      ok: hasPJSelected,
      okMsg: "CNPJ selecionado — requisito do Banco Mundial atendido.",
      failMsg: "Aviso: Selecionado Pessoa Física. O TdR veda o pagamento direto via CPF puro.",
    },
    {
      label: "Experiência Geral — mínimo 24 meses",
      ok: isGeneralCompliant,
      okMsg: `${totalGeneralMonths} meses declarados. Requisito atendido.`,
      failMsg: `${totalGeneralMonths} meses declarados. Abaixo do mínimo de 24 meses.`,
    },
    {
      label: "Experiência Específica — mínimo 12 meses",
      ok: isSpecificCompliant,
      okMsg: `${totalSpecificMonths} meses na Amazônia. Requisito atendido.`,
      failMsg: "Não atende ao mínimo de 12 meses de experiência na Amazônia.",
    },
    {
      label: "Declaração de Veracidade",
      ok: hasConsent,
      okMsg: "Declaração confirmada eletronicamente.",
      failMsg: "É necessário concordar com a declaração de veracidade.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-green-100 pb-3 mb-2">
        <h3 className="text-lg font-sans font-semibold text-green-950 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-green-700" />
          Proposta Pronta — Envio por E-mail
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Revise sua conformidade e utilize as opções abaixo para concluir a pesquisa de mercado.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h4 className="text-xs font-sans uppercase tracking-wider text-slate-500 font-bold pb-2 border-b border-slate-100">
            Análise de Qualificação TdR
          </h4>
          <ul className="space-y-3">
            {checks.map((c) => (
              <li key={c.label} className={`p-3.5 rounded-xl border flex gap-3 ${c.ok ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
                <div className="mt-0.5 shrink-0">
                  {c.ok
                    ? <CheckCircle2 className="w-4.5 h-4.5 text-green-600" />
                    : <AlertCircle className="w-4.5 h-4.5 text-red-500" />
                  }
                </div>
                <div>
                  <span className={`text-[11px] font-bold block ${c.ok ? "text-green-900" : "text-red-800"}`}>{c.label}</span>
                  <span className={`text-[10px] leading-relaxed block mt-0.5 ${c.ok ? "text-green-700" : "text-red-600"}`}>
                    {c.ok ? c.okMsg : c.failMsg}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-green-900 text-white p-4 rounded-xl space-y-1 mt-4">
            <p className="text-[10px] uppercase font-mono tracking-widest text-green-300 font-semibold">Prazo de Resposta</p>
            <p className="text-sm font-sans font-bold text-white">05/06/2026 às 23h59</p>
            <p className="text-[10px] text-green-300">(Horário Oficial do Amazonas)</p>
          </div>
        </div>

        {/* Action panel */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-green-950 text-white rounded-2xl p-6 shadow-md space-y-5">
            <div className="flex gap-3 items-start">
              <div className="p-2.5 bg-green-700 rounded-xl text-white shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-sans font-bold text-white">Enviar ao E-mail Oficial do Instituto</h4>
                <p className="text-xs text-green-300 mt-0.5 leading-relaxed">
                  Encaminhe suas respostas consolidadas diretamente para o processo:
                </p>
                <p className="text-sm font-bold text-amber-400 mt-1.5 font-sans">
                  Institutongutapatikuna@gmail.com
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={handleOpenEmail}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                id="btn-open-client-email"
              >
                <Mail className="w-4 h-4" /> Abrir Cliente de E-mail
              </button>

              <button type="button" onClick={handleCopyText}
                className="flex-1 bg-green-800/60 hover:bg-green-800 text-white py-2.5 px-4 border border-green-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="btn-copy-form-clipboard"
              >
                {copied ? (
                  <> <Check className="w-4 h-4 text-green-400" /> Copiado! </>
                ) : (
                  <> <Copy className="w-4 h-4" /> Copiar Respostas </>
                )}
              </button>

              <button type="button" onClick={() => window.print()}
                className="bg-green-800/60 hover:bg-green-800 text-white py-2.5 px-4 border border-green-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="btn-print-form"
              >
                <Printer className="w-4 h-4" /> Imprimir / PDF
              </button>
            </div>
          </div>

          {/* Formatted preview */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white">
            <h4 className="text-xs font-sans uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-100 pb-2 mb-4">
              Pré-visualização das Respostas Formatadas
            </h4>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl max-h-80 overflow-y-auto text-xs font-mono text-slate-600 whitespace-pre leading-relaxed select-text">
              {formattedText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
