import React, { useState } from "react";
import { CandidatoForm } from "../types";
import { EditalConfig } from "../edital-config";
import { formatToEmail } from "../utils";
import { Mail, Copy, Check, Printer, CheckCircle2, AlertCircle, Paperclip } from "lucide-react";

interface Props {
  data: CandidatoForm;
  onClear: () => void;
  curriculoNome?: string;
  config: EditalConfig;
}

export function PainelEnvio({ data, onClear, curriculoNome, config }: Props) {
  const [copied, setCopied] = useState(false);
  const [emailAberto, setEmailAberto] = useState(false);
  const texto = formatToEmail(data, curriculoNome, config);

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
    {
      label: "Currículo selecionado",
      ok: !!curriculoNome,
      okMsg: curriculoNome || "",
      failMsg: "Nenhum arquivo selecionado. Lembre-se de anexar o currículo ao e-mail.",
    },
  ];

  const handleEmail = async () => {
    const subject = `TDR ${config.emailAssuntoPrefix} – ${data.identificacao.nomeCompleto || "[Nome]"}`;
    // mailto: has a ~2 000-char URL limit — put only the subject in the URL and copy
    // the full body to clipboard so the candidate can paste it into the email.
    await navigator.clipboard.writeText(texto).catch(() => {});
    window.open(`mailto:Institutongutapatikuna@gmail.com?subject=${encodeURIComponent(subject)}`, "_self");
    setEmailAberto(true);
    setTimeout(() => setEmailAberto(false), 8000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(texto).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div>
      <div style={{ borderBottom: "2px solid #dceee5", paddingBottom: 12, marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#2d6b4c", margin: 0 }}>Candidatura Pronta — Envio</h2>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
          Revise sua qualificação e utilize as opções abaixo para concluir a manifestação de interesse.
        </p>
      </div>

      {/* Lembrete currículo */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, backgroundColor: curriculoNome ? "#e8f7ef" : "#fffbeb", border: `1.5px solid ${curriculoNome ? "#96d4b5" : "#fde68a"}`, borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
        <Paperclip size={16} color={curriculoNome ? "#4aa07c" : "#92400e"} style={{ flexShrink: 0, marginTop: 1 }}/>
        <div>
          {curriculoNome
            ? <><span style={{ fontSize: 12, fontWeight: 700, color: "#1a7c40" }}>Currículo pronto para anexar: </span><span style={{ fontSize: 12, color: "#1a7c40" }}>{curriculoNome}</span><span style={{ fontSize: 11, color: "#4b5563", display: "block", marginTop: 2 }}>Lembre-se de anexar este arquivo ao e-mail antes de enviar.</span></>
            : <><span style={{ fontSize: 12, fontWeight: 700, color: "#92400e" }}>Atenção: nenhum currículo foi selecionado.</span><span style={{ fontSize: 11, color: "#78350f", display: "block", marginTop: 2 }}>Volte à seção 6 e selecione seu arquivo, depois anexe-o manualmente ao e-mail.</span></>
          }
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
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
          <div style={{ backgroundColor: "#2d6b4c", borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <Mail size={18} color="#b8e0c8" />
              <span style={{ fontWeight: 700, color: "white", fontSize: 14 }}>Enviar Manifestação de Interesse</span>
            </div>
            <p style={{ fontSize: 12, color: "#b8e0c8", marginBottom: 4, lineHeight: 1.5 }}>
              Destinatário oficial: <strong style={{ color: "#d4a820" }}>Institutongutapatikuna@gmail.com</strong>
            </p>
            <p style={{ fontSize: 11, color: "#7db898", marginBottom: 16 }}>
              Assunto gerado automaticamente: "TDR {config.emailAssuntoPrefix} – {data.identificacao.nomeCompleto || "[seu nome]"}"
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <button type="button" onClick={handleEmail}
                style={{ flex: 1, minWidth: 130, padding: "10px 16px", backgroundColor: "#4aa07c", border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Mail size={14} /> Abrir E-mail
              </button>
              <button type="button" onClick={handleCopy}
                style={{ flex: 1, minWidth: 130, padding: "10px 16px", backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                {copied ? <><Check size={14} /> Copiado!</> : <><Copy size={14} /> Copiar texto</>}
              </button>
              <button type="button" onClick={() => window.print()}
                style={{ padding: "10px 14px", backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Printer size={14} /> PDF
              </button>
            </div>
            {emailAberto && (
              <div style={{ marginTop: 12, backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "flex-start", gap: 8 }}>
                <Check size={15} color="#86efac" style={{ flexShrink: 0, marginTop: 1 }}/>
                <span style={{ fontSize: 12, color: "#d1fae5", lineHeight: 1.5 }}>
                  <strong>Texto copiado!</strong> O e-mail foi aberto com o assunto já preenchido. Cole o conteúdo no corpo do e-mail com <strong>Ctrl+V</strong> (ou ⌘V no Mac) e anexe seu currículo antes de enviar.
                </span>
              </div>
            )}
          </div>

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
