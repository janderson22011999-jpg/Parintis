import React, { useState } from "react";
import { ExternalLink, Share2, Check, Printer } from "lucide-react";
import { EDITAIS_CONFIG } from "../edital-config";

// v3 — design institucional limpo

interface Oportunidade {
  id: string;
  titulo: string;
  categoria: string;
  subprojeto: string;
  local: string;
  duracao: string;
  prazo: string;
  status: "aberto" | "encerrado" | "em_breve";
  descricao: string;
  temFormulario: boolean;
  linkTdr?: string;
}

const OPORTUNIDADES: Oportunidade[] = [
  {
    id: "eng-pesca-2026",
    titulo: "Engenheiro(a) de Pesca",
    categoria: "Consultoria Individual",
    subprojeto: "Guardiões dos Peixes do Rio Içá",
    local: "Santo Antônio do Içá – AM",
    duracao: "8 meses",
    prazo: "01/07/2026",
    status: "aberto",
    descricao: "Prestação de suporte técnico especializado para implementação do manejo pesqueiro sustentável e governança comunitária em 14 comunidades indígenas da bacia do Rio Içá.",
    temFormulario: true,
    linkTdr: "https://drive.google.com/file/d/13V2KXA4jS0KtPsZQvyiWP_yyTDrpf6KC/view?usp=sharing",
  },
  {
    id: "biologo-2026",
    titulo: "Biólogo(a)",
    categoria: "Consultoria Individual",
    subprojeto: "Guardiões dos Peixes do Rio Içá",
    local: "Santo Antônio do Içá – AM",
    duracao: "5 meses",
    prazo: "31/07/2026",
    status: "aberto",
    descricao: "Monitoramento biológico participativo das espécies pesqueiras prioritárias — pirarucu, aruanã, tambaqui e surubim — nas comunidades indígenas da bacia do rio Içá, com capacitação de monitores comunitários e suporte técnico ao Acordo de Pesca e ao Plano de Manejo Pesqueiro.",
    temFormulario: true,
    linkTdr: "https://drive.google.com/file/d/1-OkkIzCkOaFxTtUr1iPoMfgg7Gh6aR5l/view?usp=drive_link",
  },
  {
    id: "geografo-2026",
    titulo: "Geógrafo(a)",
    categoria: "Consultoria Individual",
    subprojeto: "UTÜ'Ü Y ITCHÁ – O Encantado Içá",
    local: "Santo Antônio do Içá – AM",
    duracao: "2 meses",
    prazo: "31/07/2026",
    status: "aberto",
    descricao: "Mapeamento territorial participativo e zoneamento cultural das áreas de uso tradicional, sítios culturais e zonas de proteção territorial das comunidades indígenas da bacia do Rio Içá, integrando técnicas de geoprocessamento ao conhecimento territorial dos povos Tikuna e Kokama.",
    temFormulario: true,
    linkTdr: "https://drive.google.com/file/d/1CZpDQ_I2KdfnYKObR3bOx4cECbo84UT8/view?usp=sharing",
  },
  {
    id: "antropologo-2026",
    titulo: "Antropólogo(a)",
    categoria: "Consultoria Individual",
    subprojeto: "UTÜ'Ü Y ITCHÁ – O Encantado Içá",
    local: "Santo Antônio do Içá – AM",
    duracao: "6 meses",
    prazo: "10/07/2026",
    status: "aberto",
    descricao: "Apoio ao registro e sistematização de saberes tradicionais, mapeamento participativo e fortalecimento da governança cultural e territorial dos povos Magüta/Tikuna e Kokama em 14 comunidades indígenas da bacia do Rio Içá.",
    temFormulario: true,
    linkTdr: "https://drive.google.com/file/d/111n7fe_TwdWKzRHhqXHS1c4GXSvPVf71/view?usp=sharing",
  },
];

// Returns the effective status, overriding "aberto" to "encerrado" when the
// deadline (prazo DD/MM/YYYY at 23:59 Amazonas = UTC-4) has passed.
function computeStatus(prazo: string, base: Oportunidade["status"]): "aberto" | "encerrado" | "em_breve" {
  if (base !== "aberto") return base;
  const parts = prazo.split("/");
  if (parts.length !== 3) return base;
  const [d, m, y] = parts.map(Number);
  if (isNaN(d) || isNaN(m) || isNaN(y)) return base;
  // 23:59 Amazonas (UTC-4) = next calendar day at 03:59 UTC
  const deadline = new Date(Date.UTC(y, m - 1, d + 1, 3, 59));
  return Date.now() > deadline.getTime() ? "encerrado" : "aberto";
}

function gerarPdfEdital(op: Oportunidade, efetivo: string) {
  const cfg = EDITAIS_CONFIG[op.id];
  const statusLabel  = efetivo === "encerrado" ? "Processo Encerrado" : efetivo === "em_breve" ? "Em Breve" : "Inscrições Abertas";
  const statusColor  = efetivo === "encerrado" ? "#6b7280" : efetivo === "em_breve" ? "#854d0e" : "#1a7c40";
  const statusBg     = efetivo === "encerrado" ? "#f3f4f6" : efetivo === "em_breve" ? "#fef9c3" : "#e8f7ef";
  const statusBorder = efetivo === "encerrado" ? "#d1d5db" : efetivo === "em_breve" ? "#fde68a" : "#96d4b5";

  const perfilHTML = cfg
    ? cfg.perfilMinimo.map(p => `
        <div style="background:#eaf7f1;border-left:3px solid #4aa07c;border-radius:5px;padding:9px 11px;break-inside:avoid;margin-bottom:0">
          <div style="font-size:9.5pt;font-weight:700;color:#2d6b4c;margin-bottom:3px">${p.title}</div>
          <div style="font-size:9pt;color:#374151;line-height:1.5">${p.text}</div>
        </div>`).join("")
    : "";

  const criteriosHTML = cfg
    ? cfg.criteriosPontuacao.map(c => `
        <tr>
          <td style="padding:7px 10px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#92400e;white-space:nowrap;font-size:9pt">${c.pts}</td>
          <td style="padding:7px 10px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#374151;font-size:9pt">${c.label}</td>
          <td style="padding:7px 10px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:8.5pt">${c.desc}</td>
        </tr>`).join("")
    : "";

  const processo = cfg?.processo ?? "";
  const emailPrefix = cfg?.emailAssuntoPrefix ?? op.titulo;

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>${op.titulo} — Edital NGUTAPA</title>
<style>
@page { margin: 16mm 20mm; size: A4 portrait; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Georgia, 'Times New Roman', serif; color: #111827; font-size: 10.5pt; line-height: 1.6; background: white; }
h1 { font-size: 20pt; font-weight: 700; color: #111; line-height: 1.2; margin-bottom: 12px; }
.badge { display: inline-block; font-family: system-ui, sans-serif; font-size: 8.5pt; font-weight: 700; letter-spacing: 0.06em; padding: 2px 10px; border-radius: 3px; border: 1px solid ${statusBorder}; background: ${statusBg}; color: ${statusColor}; }
.section-title { font-family: system-ui, sans-serif; font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: #2d6b4c; margin: 18px 0 10px; padding-bottom: 6px; border-bottom: 1.5px solid #2d6b4c; }
.meta-row { display: flex; flex-wrap: wrap; gap: 4px 24px; font-family: system-ui, sans-serif; font-size: 9.5pt; color: #555; margin-bottom: 6px; }
.meta-row strong { color: #222; }
.prazo { font-family: system-ui, sans-serif; font-size: 10pt; font-weight: 700; color: #b91c1c; margin-top: 4px; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 4px; }
.criteria-table { width: 100%; border-collapse: collapse; font-family: system-ui, sans-serif; }
.alert-box { background: #fffbeb; border: 1px solid #fde68a; border-radius: 5px; padding: 10px 14px; font-family: system-ui, sans-serif; font-size: 9pt; color: #78350f; line-height: 1.5; }
.header-bar { background: #2d6b4c; color: white; padding: 14px 20mm; margin: -16mm -20mm 20px; border-bottom: 3px solid #c8a01a; display: flex; justify-content: space-between; align-items: flex-end; }
.footer-bar { margin-top: 28px; padding-top: 10px; border-top: 1px solid #d1d5db; font-family: system-ui, sans-serif; font-size: 8pt; color: #9ca3af; display: flex; justify-content: space-between; }
.link { color: #2d6b4c; word-break: break-all; font-size: 9pt; }
@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head>
<body>
<div class="header-bar">
  <div>
    <div style="font-family:system-ui,sans-serif;font-size:8pt;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#b8e0c8;margin-bottom:2px">Instituto NGUTAPA</div>
    <div style="font-size:14pt;font-weight:400;letter-spacing:0.01em">Edital de Manifestação de Interesse</div>
  </div>
  <div style="text-align:right">
    <div style="font-family:system-ui,sans-serif;font-size:8pt;color:#b8e0c8">Cuenca Putumayo Içá</div>
    <div style="font-family:system-ui,sans-serif;font-size:8pt;color:#b8e0c8">Santo Antônio do Içá – AM</div>
  </div>
</div>

<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;font-family:system-ui,sans-serif">
  <span style="font-size:9.5pt;font-weight:700;color:#4aa07c;text-transform:uppercase;letter-spacing:0.14em">${op.categoria}</span>
  <span class="badge">${statusLabel}</span>
  ${processo ? `<span style="font-size:8.5pt;color:#9ca3af;margin-left:auto">Processo nº ${processo}</span>` : ""}
</div>

<h1>${op.titulo}</h1>

<p style="font-size:11pt;color:#374151;line-height:1.75;margin-bottom:14px">${op.descricao}</p>

<div class="meta-row">
  <span><strong>Subprojeto:</strong> ${op.subprojeto}</span>
  <span><strong>Local:</strong> ${op.local}</span>
  <span><strong>Duração:</strong> ${op.duracao}</span>
</div>
<div class="prazo">Prazo de inscrição: ${op.prazo} às 23h59 (Horário do Amazonas)</div>

${cfg ? `
<div class="section-title">Perfil Mínimo dos Candidatos</div>
<div class="grid-2">${perfilHTML}</div>

<div class="section-title">Critérios de Pontuação (100 pontos)</div>
<table class="criteria-table">
  <tbody>${criteriosHTML}</tbody>
</table>
` : ""}

<div class="section-title">Como Candidatar-se</div>
${efetivo === "encerrado"
  ? `<div class="alert-box">⚠ O prazo de inscrição para este processo seletivo foi encerrado em ${op.prazo} às 23h59 (Horário do Amazonas).</div>`
  : `<div style="font-family:system-ui,sans-serif;font-size:9.5pt;line-height:1.8">
      <div><strong>E-mail:</strong> Institutongutapatikuna@gmail.com</div>
      <div><strong>Assunto:</strong> TDR ${emailPrefix} – [Nome completo do candidato]</div>
      <div><strong>Prazo:</strong> ${op.prazo} às 23h59 (Horário do Amazonas)</div>
      <div style="margin-top:4px"><strong>Envio:</strong> Currículo atualizado com datas de início e término de cada experiência (dd/mm/aaaa).</div>
    </div>`
}

${op.linkTdr ? `<div style="margin-top:12px;font-family:system-ui,sans-serif;font-size:9pt"><strong>TdR completo:</strong> <a href="${op.linkTdr}" class="link">${op.linkTdr}</a></div>` : ""}

<div class="footer-bar">
  <span>© 2026 Instituto NGUTAPA · Cuenca Putumayo Içá · Santo Antônio do Içá – AM</span>
  <span>Institutongutapatikuna@gmail.com</span>
</div>
</body>
</html>`;

  const w = window.open("", "_blank");
  if (!w) { alert("Permita pop-ups para gerar o PDF."); return; }
  w.document.write(html);
  w.document.close();
  setTimeout(() => w.print(), 450);
}

interface Props {
  onAbrirFormulario: (id: string) => void;
}

function GefLogo() {
  return (
    <svg width="30" height="38" viewBox="0 0 80 100" fill="none">
      <line x1="28" y1="22" x2="14" y2="8" stroke="rgba(255,255,255,.6)" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="30" y1="20" x2="22" y2="5" stroke="rgba(255,255,255,.6)" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="33" y1="19" x2="28" y2="4" stroke="rgba(255,255,255,.6)" strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M 31,21 C 34,30 34,42 30,54 C 27,63 24,70 24,78 C 24,86 34,87 35,78 C 36,68 38,58 36,44 C 34,32 34,24 31,21 Z" stroke="rgba(255,255,255,.6)" strokeWidth="2.4" strokeLinejoin="round" fill="none"/>
      <circle cx="28" cy="78" r="2.8" fill="rgba(255,255,255,.6)"/>
      <circle cx="52" cy="22" r="2.8" fill="rgba(255,255,255,.6)"/>
      <path d="M 49,21 C 46,32 44,44 46,58 C 48,68 44,78 45,86 C 46,94 56,93 55,84 C 54,76 56,64 54,54 C 50,42 46,30 49,21 Z" stroke="rgba(255,255,255,.6)" strokeWidth="2.4" strokeLinejoin="round" fill="none"/>
      <line x1="49" y1="84" x2="38" y2="96" stroke="rgba(255,255,255,.6)" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="52" y1="86" x2="46" y2="98" stroke="rgba(255,255,255,.6)" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="55" y1="85" x2="52" y2="98" stroke="rgba(255,255,255,.6)" strokeWidth="2.8" strokeLinecap="round"/>
    </svg>
  );
}

export function HomePage({ onAbrirFormulario }: Props) {
  const abertas   = OPORTUNIDADES.filter(o => computeStatus(o.prazo, o.status) === "aberto");
  const restantes = OPORTUNIDADES.filter(o => computeStatus(o.prazo, o.status) !== "aberto");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f2efe9", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <style>{`
        .oport-card { transition: box-shadow .18s, border-color .18s; }
        .oport-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.08) !important; border-color: #b0aa9e !important; }
        .btn-borda { transition: background .15s, color .15s; }
        .btn-borda:hover { background: #2d6b4c !important; color: white !important; }
        .btn-fill { transition: background .15s; }
        .btn-fill:hover { background: #4aa07c !important; }
        .btn-share { transition: background .15s, border-color .15s; }
        .btn-share:hover { background: #e8f7ef !important; border-color: #96d4b5 !important; }
        .btn-pdf { transition: background .15s, border-color .15s; }
        .btn-pdf:hover { background: #f8fafc !important; border-color: #2d6b4c !important; color: #2d6b4c !important; }
      `}</style>

      {/* HEADER */}
      <header style={{ backgroundColor: "#2d6b4c", borderBottom: "3px solid #c8a01a" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img
              src="https://brasil.amazonteam.org/wp-content/uploads/2025/03/NGUTAPA-logo.png"
              alt="Instituto NGUTAPA"
              style={{ height: 50, width: "auto", filter: "brightness(0) invert(1)" }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div style={{ width: 1, height: 36, backgroundColor: "rgba(255,255,255,.2)" }}/>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <GefLogo/>
              <div>
                <div style={{ color: "#b8e0c8", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>Cuenca</div>
                <div style={{ color: "white", fontSize: 13, fontWeight: 700, fontFamily: "system-ui,sans-serif" }}>Putumayo Içá</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "white", fontSize: 22, fontWeight: 400, letterSpacing: "0.01em" }}>Editais e Oportunidades</div>
            <div style={{ color: "#b8e0c8", fontSize: 11, marginTop: 4, fontFamily: "system-ui,sans-serif", letterSpacing: "0.02em" }}>Instituto de Etnodesenvolvimento NGUTAPA · Santo Antônio do Içá – AM</div>
          </div>
        </div>
      </header>

      {/* FAIXA INFO */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #ddd9d0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "9px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <p style={{ color: "#555", fontSize: 12, margin: 0, fontFamily: "system-ui,sans-serif", lineHeight: 1.5 }}>
            Processos seletivos abertos e competitivos · <strong style={{ color: "#2d6b4c" }}>MANEJO INTEGRADO DA BACIA PUTUMAYO-IÇÁ</strong>
          </p>
          {abertas.length > 0 && (
            <span style={{ backgroundColor: "#e8f7ef", border: "1px solid #96d4b5", padding: "3px 12px", color: "#1a7c40", fontSize: 11, fontWeight: 700, fontFamily: "system-ui,sans-serif" }}>
              {abertas.length} vaga{abertas.length !== 1 ? "s" : ""} aberta{abertas.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* CONTEÚDO */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "44px 32px 80px" }}>

        {abertas.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 10, borderBottom: "2px solid #2d6b4c" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#4aa07c", display: "inline-block" }}/>
              <h2 style={{ fontSize: 11, fontWeight: 700, color: "#2d6b4c", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0, fontFamily: "system-ui,sans-serif" }}>
                Inscrições Abertas
              </h2>
            </div>
            {abertas.map((op, i) => (
              <Card
                key={op.id} op={op}
                statusEfetivo={computeStatus(op.prazo, op.status)}
                onAbrirFormulario={onAbrirFormulario}
                last={i === abertas.length - 1}
              />
            ))}
          </section>
        )}

        {restantes.length > 0 && (
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 10, borderBottom: "1px solid #ccc" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#bbb", display: "inline-block" }}/>
              <h2 style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0, fontFamily: "system-ui,sans-serif" }}>
                Editais Encerrados
              </h2>
            </div>
            {restantes.map((op, i) => (
              <Card
                key={op.id} op={op}
                statusEfetivo={computeStatus(op.prazo, op.status)}
                onAbrirFormulario={onAbrirFormulario}
                last={i === restantes.length - 1}
              />
            ))}
          </section>
        )}

        {/* Rodapé info */}
        <div style={{ marginTop: 60, paddingTop: 32, borderTop: "1px solid #ccc8bf", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "0 40px" }}>
          {[
            { t: "Processo Seletivo", d: "Segue os Regulamentos de Aquisições do Banco Mundial para Mutuários em Projetos de Investimento (edição 2020)." },
            { t: "Dúvidas", d: "Encaminhe para Institutongutapatikuna@gmail.com com o número do processo e seu nome no assunto." },
            { t: "Confidencialidade", d: "Informações obtidas no processo são confidenciais e não podem ser divulgadas sem autorização expressa do NGUTAPA." },
          ].map((item, i) => (
            <div key={item.t} style={{ paddingBottom: 16, borderLeft: i > 0 ? "1px solid #ccc8bf" : "none", paddingLeft: i > 0 ? 40 : 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#2d6b4c", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8, fontFamily: "system-ui,sans-serif" }}>{item.t}</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.75 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#2d6b4c", borderTop: "3px solid #c8a01a", padding: "18px 32px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ color: "#92c9ab", fontSize: 11, fontFamily: "system-ui,sans-serif" }}>© 2026 Instituto NGUTAPA · Cuenca Putumayo Içá</span>
          <span style={{ color: "#92c9ab", fontSize: 11, fontFamily: "system-ui,sans-serif" }}>Santo Antônio do Içá – AM · Institutongutapatikuna@gmail.com</span>
        </div>
      </footer>
    </div>
  );
}

function Card({ op, statusEfetivo, onAbrirFormulario, last }: {
  op: Oportunidade;
  statusEfetivo: "aberto" | "encerrado" | "em_breve";
  onAbrirFormulario: (id: string) => void;
  last: boolean;
}) {
  const [copiado, setCopiado] = useState(false);
  const encerrado = statusEfetivo === "encerrado";

  const copiarLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}?edital=${op.id}`;
    try { await navigator.clipboard.writeText(url); } catch {}
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const statusLabel:  Record<string, string> = { aberto: "Inscrições Abertas", encerrado: "Encerrado", em_breve: "Em Breve" };
  const statusColor:  Record<string, string> = { aberto: "#1a7c40", encerrado: "#6b7280", em_breve: "#854d0e" };
  const statusBg:     Record<string, string> = { aberto: "#e8f7ef",  encerrado: "#f3f4f6", em_breve: "#fef9c3" };
  const statusBorder: Record<string, string> = { aberto: "#96d4b5",  encerrado: "#e5e7eb", em_breve: "#fde68a" };

  return (
    <div className="oport-card" style={{
      backgroundColor: "white",
      border: "1px solid #d4cfc6",
      borderBottom: last ? "1px solid #d4cfc6" : "none",
      padding: "32px 36px",
      opacity: encerrado ? 0.65 : 1,
    }}>
      {/* Linha superior: categoria + status */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, fontFamily: "system-ui,sans-serif" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#4aa07c", textTransform: "uppercase", letterSpacing: "0.16em" }}>
          {op.categoria}
        </span>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
          color: statusColor[statusEfetivo], backgroundColor: statusBg[statusEfetivo],
          border: `1px solid ${statusBorder[statusEfetivo]}`,
          padding: "2px 10px",
        }}>
          {statusLabel[statusEfetivo]}
        </span>
      </div>

      {/* Título */}
      <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: "0 0 14px", lineHeight: 1.25 }}>
        {op.titulo}
      </h3>

      {/* Descrição */}
      <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, margin: "0 0 20px" }}>
        {op.descricao}
      </p>

      {/* Meta info */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 28px", fontSize: 12, color: "#666", fontFamily: "system-ui,sans-serif", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #ece8e0" }}>
        <span><strong style={{ color: "#333" }}>Subprojeto:</strong> {op.subprojeto}</span>
        <span><strong style={{ color: "#333" }}>Local:</strong> {op.local}</span>
        <span><strong style={{ color: "#333" }}>Duração:</strong> {op.duracao}</span>
        <span style={{ color: statusEfetivo === "aberto" ? "#b91c1c" : "#666", fontWeight: statusEfetivo === "aberto" ? 700 : 400 }}>
          <strong style={{ color: statusEfetivo === "aberto" ? "#b91c1c" : "#333" }}>Prazo:</strong> {op.prazo} às 23h59 (Horário do Amazonas)
        </span>
      </div>

      {/* Botões */}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        {op.linkTdr && (
          <a href={op.linkTdr} target="_blank" rel="noopener noreferrer" className="btn-borda"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 22px", border: "1.5px solid #2d6b4c", backgroundColor: "white", color: "#2d6b4c", fontSize: 12, fontWeight: 700, fontFamily: "system-ui,sans-serif", letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase" }}>
            <ExternalLink size={12}/> Ver TdR
          </a>
        )}

        {op.temFormulario && statusEfetivo === "aberto" && (
          <button type="button" onClick={() => onAbrirFormulario(op.id)} className="btn-fill"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 28px", border: "1.5px solid #2d6b4c", backgroundColor: "#2d6b4c", color: "white", fontSize: 12, fontWeight: 700, fontFamily: "system-ui,sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
            Inscrever-se
          </button>
        )}

        {encerrado && (
          <span style={{ fontSize: 12, color: "#aaa", fontFamily: "system-ui,sans-serif" }}>Inscrições encerradas</span>
        )}

        {/* PDF button */}
        <button type="button" onClick={() => gerarPdfEdital(op, statusEfetivo)} className="btn-pdf"
          title="Baixar edital em PDF"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", border: "1px solid #d4cfc6", backgroundColor: "white", color: "#888", fontSize: 11, fontWeight: 600, fontFamily: "system-ui,sans-serif", cursor: "pointer" }}>
          <Printer size={12}/> PDF
        </button>

        <button type="button" onClick={copiarLink} className="btn-share"
          title="Copiar link desta oportunidade"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", border: `1px solid ${copiado ? "#96d4b5" : "#d4cfc6"}`, backgroundColor: copiado ? "#e8f7ef" : "white", color: copiado ? "#1a7c40" : "#888", fontSize: 11, fontWeight: 600, fontFamily: "system-ui,sans-serif", cursor: "pointer" }}>
          {copiado ? <><Check size={12}/> Copiado!</> : <><Share2 size={12}/> Compartilhar</>}
        </button>
      </div>
    </div>
  );
}
