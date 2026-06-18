import React from "react";
import { ExternalLink } from "lucide-react";

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
];

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
  const abertas   = OPORTUNIDADES.filter(o => o.status === "aberto");
  const restantes = OPORTUNIDADES.filter(o => o.status !== "aberto");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f2efe9", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <style>{`
        .oport-card { transition: box-shadow .18s, border-color .18s; }
        .oport-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.08) !important; border-color: #b0aa9e !important; }
        .btn-borda { transition: background .15s, color .15s; }
        .btn-borda:hover { background: #1a3d2b !important; color: white !important; }
        .btn-fill { transition: background .15s; }
        .btn-fill:hover { background: #2d6a4f !important; }
        .btn-share { transition: background .15s, border-color .15s; }
        .btn-share:hover { background: #f0faf4 !important; border-color: #a7d4b8 !important; }
      `}</style>

      {/* HEADER */}
      <header style={{ backgroundColor: "#1a3d2b", borderBottom: "3px solid #c8a01a" }}>
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
                <div style={{ color: "#a8d5b8", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>Projeto GEF</div>
                <div style={{ color: "white", fontSize: 13, fontWeight: 700, fontFamily: "system-ui,sans-serif" }}>Putumayo-Içá</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "white", fontSize: 22, fontWeight: 400, letterSpacing: "0.01em" }}>Editais e Oportunidades</div>
            <div style={{ color: "#a8d5b8", fontSize: 11, marginTop: 4, fontFamily: "system-ui,sans-serif", letterSpacing: "0.02em" }}>Instituto de Etnodesenvolvimento NGUTAPA · Santo Antônio do Içá – AM</div>
          </div>
        </div>
      </header>

      {/* FAIXA INFO */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #ddd9d0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "9px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <p style={{ color: "#555", fontSize: 12, margin: 0, fontFamily: "system-ui,sans-serif", lineHeight: 1.5 }}>
            Processos seletivos abertos e competitivos · <strong style={{ color: "#1a3d2b" }}>Fundo para o Meio Ambiente Global (GEF)</strong> via Banco Mundial · Doação TF0B8254-6L
          </p>
          {abertas.length > 0 && (
            <span style={{ backgroundColor: "#f0faf4", border: "1px solid #a7d4b8", padding: "3px 12px", color: "#166534", fontSize: 11, fontWeight: 700, fontFamily: "system-ui,sans-serif" }}>
              {abertas.length} vaga{abertas.length !== 1 ? "s" : ""} aberta{abertas.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* CONTEÚDO */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "44px 32px 80px" }}>

        {abertas.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 10, borderBottom: "2px solid #1a3d2b" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#2d6a4f", display: "inline-block" }}/>
              <h2 style={{ fontSize: 11, fontWeight: 700, color: "#1a3d2b", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0, fontFamily: "system-ui,sans-serif" }}>
                Inscrições Abertas
              </h2>
            </div>
            {abertas.map((op, i) => (
              <Card key={op.id} op={op} onAbrirFormulario={onAbrirFormulario} last={i === abertas.length - 1}/>
            ))}
          </section>
        )}

        {restantes.length > 0 && (
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 10, borderBottom: "1px solid #ccc" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#bbb", display: "inline-block" }}/>
              <h2 style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0, fontFamily: "system-ui,sans-serif" }}>
                Outras Oportunidades
              </h2>
            </div>
            {restantes.map((op, i) => (
              <Card key={op.id} op={op} onAbrirFormulario={onAbrirFormulario} last={i === restantes.length - 1}/>
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
              <div style={{ fontSize: 10, fontWeight: 700, color: "#1a3d2b", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8, fontFamily: "system-ui,sans-serif" }}>{item.t}</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.75 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#1a3d2b", borderTop: "3px solid #c8a01a", padding: "18px 32px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ color: "#7ab898", fontSize: 11, fontFamily: "system-ui,sans-serif" }}>© 2026 Instituto NGUTAPA · Projeto GEF Putumayo-Içá · Banco Mundial TF0B8254-6L</span>
          <span style={{ color: "#7ab898", fontSize: 11, fontFamily: "system-ui,sans-serif" }}>Santo Antônio do Içá – AM · Institutongutapatikuna@gmail.com</span>
        </div>
      </footer>
    </div>
  );
}

function Card({ op, onAbrirFormulario, last }: { op: Oportunidade; onAbrirFormulario: (id: string) => void; last: boolean }) {
  const encerrado = op.status === "encerrado";

  const statusLabel: Record<string, string> = { aberto: "Inscrições Abertas", encerrado: "Encerrado", em_breve: "Em Breve" };
  const statusColor: Record<string, string> = { aberto: "#166534", encerrado: "#6b7280", em_breve: "#854d0e" };
  const statusBg:    Record<string, string> = { aberto: "#f0faf4",  encerrado: "#f3f4f6", em_breve: "#fef9c3" };
  const statusBorder:Record<string, string> = { aberto: "#a7d4b8",  encerrado: "#e5e7eb", em_breve: "#fde68a" };

  return (
    <div className="oport-card" style={{
      backgroundColor: "white",
      border: "1px solid #d4cfc6",
      borderBottom: last ? "1px solid #d4cfc6" : "none",
      padding: "32px 36px",
      opacity: encerrado ? 0.6 : 1,
    }}>
      {/* Linha superior: categoria + status */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, fontFamily: "system-ui,sans-serif" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#2d6a4f", textTransform: "uppercase", letterSpacing: "0.16em" }}>
          {op.categoria}
        </span>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
          color: statusColor[op.status], backgroundColor: statusBg[op.status],
          border: `1px solid ${statusBorder[op.status]}`,
          padding: "2px 10px",
        }}>
          {statusLabel[op.status]}
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
        <span style={{ color: op.status === "aberto" ? "#b91c1c" : "#666", fontWeight: op.status === "aberto" ? 700 : 400 }}>
          <strong style={{ color: op.status === "aberto" ? "#b91c1c" : "#333" }}>Prazo:</strong> {op.prazo} às 23h59 (Horário do Amazonas)
        </span>
      </div>

      {/* Botões */}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        {op.linkTdr && (
          <a href={op.linkTdr} target="_blank" rel="noopener noreferrer" className="btn-borda"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 22px", border: "1.5px solid #1a3d2b", backgroundColor: "white", color: "#1a3d2b", fontSize: 12, fontWeight: 700, fontFamily: "system-ui,sans-serif", letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase" }}>
            <ExternalLink size={12}/> Ver TdR
          </a>
        )}

        {op.temFormulario && op.status === "aberto" && (
          <button type="button" onClick={() => onAbrirFormulario(op.id)} className="btn-fill"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 28px", border: "1.5px solid #1a3d2b", backgroundColor: "#1a3d2b", color: "white", fontSize: 12, fontWeight: 700, fontFamily: "system-ui,sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
            Inscrever-se
          </button>
        )}

        {encerrado && (
          <span style={{ fontSize: 12, color: "#aaa", fontFamily: "system-ui,sans-serif" }}>Processo encerrado</span>
        )}
      </div>
    </div>
  );
}
