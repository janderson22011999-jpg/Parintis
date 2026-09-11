import React, { useState } from "react";
import { CandidatoForm } from "../types";
import { EditalConfig } from "../edital-config";
import { formatToEmail } from "../utils";
import { Mail, Copy, Check, Printer, CheckCircle2, AlertCircle, Paperclip } from "lucide-react";

interface Props {
  data: CandidatoForm;
  onClear: () => void;
  config: EditalConfig;
}

export function PainelEnvio({ data, onClear, config }: Props) {
  const [copied, setCopied] = useState(false);
  const texto = formatToEmail(data, undefined, config);

  const mesesGeral = Number(data.experienciaGeral.totalMesesExperiencia) || 0;
  const mesesEsp   = Number(data.experienciaEspecifica.totalMesesEspecifica) || 0;
  const temEsp     = data.experienciaEspecifica.possuiExperienciaEspecifica === "Sim";

  const checks = [
    {
      label: "Graduação na área exigida",
      ok: !!data.formacao.cursoGraduacao.trim(),
      okMsg: data.formacao.cursoGraduacao,
      failMsg: "Curso de graduação não informado.",
    },
    {
      label: "Experiência profissional mínima (6 meses)",
      ok: mesesGeral >= 6,
      okMsg: `${mesesGeral} meses declarados — requisito atendido.`,
      failMsg: `${mesesGeral} meses. Abaixo do mínimo de 6 meses.`,
    },
    {
      label: "Experiência específica mínima (6 meses)",
      ok: temEsp && mesesEsp >= 6,
      okMsg: `${mesesEsp} ${config.expEspecificaSufixo} — requisito atendido.`,
      failMsg: temEsp ? `${mesesEsp} meses. Abaixo do mínimo de 6 meses.` : "Candidato declarou não possuir experiência específica.",
    },
    {
      label: "Pós-graduação (pontuação extra)",
      ok: data.formacao.posGraduacao !== "Nao",
      okMsg: data.formacao.posGraduacao === "Mestrado" ? "Mestrado → +12 pontos" : data.formacao.posGraduacao === "Doutorado" ? "Doutorado → pontuação de mestrado" : "Especialização → +8 pontos",
      failMsg: "Sem pós-graduação. Não há pontuação extra neste critério.",
    },
  ];

  const subject = `TDR ${config.emailAssuntoPrefix} – ${data.identificacao.nomeCompleto || "[Nome]"}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(texto).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div>
      <style>{`
        @media (max-width: 640px) {
          .painel-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ borderBottom: "2px solid #dceee5", paddingBottom: 12, marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#2d6b4c", margin: 0 }}>Candidatura Pronta — Envio</h2>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
          Revise sua qualificação e siga os passos abaixo para enviar sua manifestação de interesse.
        </p>
      </div>

      <div className="painel-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
        {/* Sidebar de qualificação */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>
            Análise de Qualificação TdR
          </div>
          {checks.map(c => (
            <div
              key={c.label}
              style={{
                backgroundColor: c.ok ? "#e8f7ef" : "#fef2f2",
                border: `1.5px solid ${c.ok ? "#96d4b5" : "#fca5a5"}`,
                borderRadius: 10, padding: "10px 14px",
                display: "flex", gap: 10, alignItems: "flex-start",
              }}
            >
              <div style={{ marginTop: 1, flexShrink: 0 }}>
                {c.ok
                  ? <CheckCircle2 size={15} color="#22b857" />
                  : <AlertCircle size={15} color="#dc2626" />}
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.ok ? "#1d944a" : "#b91c1c", display: "block" }}>{c.label}</span>
                <span style={{ fontSize: 10, color: c.ok ? "#1a7c40" : "#991b1b", lineHeight: 1.5, display: "block", marginTop: 2 }}>
                  {c.ok ? c.okMsg : c.failMsg}
                </span>
              </div>
            </div>
          ))}

          <div style={{ backgroundColor: "#2d6b4c", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#b8e0c8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Prazo de Inscrição</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "white" }}>{config.prazo}</div>
            <div style={{ fontSize: 11, color: "#b8e0c8" }}>às 23h59 · Horário do Amazonas</div>
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Bloco de instruções de envio */}
          <div style={{ backgroundColor: "#2d6b4c", borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Mail size={18} color="#b8e0c8" />
              <span style={{ fontWeight: 700, color: "white", fontSize: 14 }}>Como enviar sua candidatura</span>
            </div>

            {/* Passo 1 */}
            <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", backgroundColor: "#4aa07c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white" }}>1</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "white", display: "block", marginBottom: 6 }}>Copie o texto da manifestação de interesse</span>
                <button type="button" onClick={handleCopy}
                  style={{ width: "100%", padding: "10px 16px", backgroundColor: copied ? "#22b857" : "#4aa07c", border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background-color 0.2s" }}>
                  {copied ? <><Check size={14} /> Texto copiado!</> : <><Copy size={14} /> Copiar texto</>}
                </button>
              </div>
            </div>

            {/* Passo 2 */}
            <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", backgroundColor: "#4aa07c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white" }}>2</div>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "white", display: "block", marginBottom: 3 }}>Abra seu e-mail e componha uma nova mensagem</span>
                <span style={{ fontSize: 11, color: "#b8e0c8", lineHeight: 1.6, display: "block" }}>
                  Para: <strong style={{ color: "#d4a820" }}>Institutongutapatikuna@gmail.com</strong><br/>
                  Assunto: <strong style={{ color: "#d4a820" }}>{subject}</strong><br/>
                  Cole o texto copiado no corpo do e-mail com <strong>Ctrl+V</strong> (ou ⌘V no Mac).
                </span>
              </div>
            </div>

            {/* Passo 3 */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", backgroundColor: "#4aa07c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white" }}>3</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <Paperclip size={14} color="#fde68a" style={{ flexShrink: 0, marginTop: 2 }}/>
                <span style={{ fontSize: 12, color: "#fef3c7", lineHeight: 1.6 }}>
                  <strong>Anexe seu currículo</strong> (PDF ou Word) antes de enviar. Candidatos sem currículo podem ser desclassificados na etapa de análise documental.
                </span>
              </div>
            </div>

            {/* Botão PDF */}
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
              <button type="button" onClick={() => window.print()}
                style={{ padding: "8px 14px", backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "white", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Printer size={13} /> Salvar como PDF
              </button>
            </div>
          </div>

          {/* Pré-visualização */}
          <div style={{ border: "1.5px solid #e2ebe4", borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Pré-visualização da Candidatura
            </div>
            <div style={{ backgroundColor: "#f8fafc", border: "1px solid #e2ebe4", borderRadius: 8, padding: 12, maxHeight: 260, overflowY: "auto", fontSize: 11, fontFamily: "monospace", color: "#374151", whiteSpace: "pre", lineHeight: 1.6 }}>
              {texto}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
