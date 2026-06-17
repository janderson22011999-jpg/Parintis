import React, { useState } from "react";
import { ExternalLink, Share2, Check } from "lucide-react";

interface Oportunidade {
  id: string;
  processo: string;
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
    processo: "SDC-NGUTUPA-C2-ENG-01-2026",
    titulo: "Engenheiro(a) de Pesca",
    categoria: "Consultoria Individual",
    subprojeto: "Guardiões dos Peixes do Rio Içá",
    local: "Santo Antônio do Içá – AM",
    duracao: "8 meses",
    prazo: "15/06/2026",
    status: "aberto",
    descricao: "Prestação de suporte técnico especializado para implementação do manejo pesqueiro sustentável e governança comunitária em 14 comunidades indígenas da bacia do Rio Içá.",
    temFormulario: true,
    linkTdr: "https://drive.google.com/file/d/11koVEbI9IYcyJvU0lkE5gLZpqnLDOOp4/view?usp=drive_link",
  },
];

interface Props {
  onAbrirFormulario: (id: string) => void;
}

function ProjectLogo({ color = "#1a3d2b" }: { color?: string }) {
  return (
    <svg width="32" height="40" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="28" y1="22" x2="14" y2="8" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="30" y1="20" x2="22" y2="5" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="33" y1="19" x2="28" y2="4" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M 31,21 C 34,30 34,42 30,54 C 27,63 24,70 24,78 C 24,86 34,87 35,78 C 36,68 38,58 36,44 C 34,32 34,24 31,21 Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" fill="none"/>
      <circle cx="28" cy="78" r="2.8" fill={color}/>
      <circle cx="52" cy="22" r="2.8" fill={color}/>
      <path d="M 49,21 C 46,32 44,44 46,58 C 48,68 44,78 45,86 C 46,94 56,93 55,84 C 54,76 56,64 54,54 C 50,42 46,30 49,21 Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" fill="none"/>
      <line x1="49" y1="84" x2="38" y2="96" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="52" y1="86" x2="46" y2="98" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="55" y1="85" x2="52" y2="98" stroke={color} strokeWidth="2.8" strokeLinecap="round"/>
    </svg>
  );
}

const STATUS_LABEL: Record<string, string> = {
  aberto:    "Inscrições Abertas",
  encerrado: "Encerrado",
  em_breve:  "Em Breve",
};

export function HomePage({ onAbrirFormulario }: Props) {
  const abertas   = OPORTUNIDADES.filter(o => o.status === "aberto");
  const restantes = OPORTUNIDADES.filter(o => o.status !== "aberto");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f3ef", fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* ══ HEADER ══ */}
      <header style={{ backgroundColor: "#1a3d2b", borderBottom: "4px solid #d4a820" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img
              src="https://brasil.amazonteam.org/wp-content/uploads/2025/03/NGUTAPA-logo.png"
              alt="Instituto NGUTAPA"
              style={{ height: 52, width: "auto", filter: "brightness(0) invert(1)" }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div style={{ width: 1, height: 40, backgroundColor: "rgba(255,255,255,.25)" }}/>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ProjectLogo color="rgba(255,255,255,.7)"/>
              <div>
                <div style={{ color: "#a8d5b8", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>Projeto GEF</div>
                <div style={{ color: "white", fontSize: 14, fontWeight: 700, fontFamily: "system-ui,sans-serif" }}>Putumayo-Içá</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "white", fontSize: 20, fontWeight: 700, letterSpacing: "0.01em" }}>Editais e Oportunidades</div>
            <div style={{ color: "#a8d5b8", fontSize: 12, marginTop: 4, fontFamily: "system-ui,sans-serif" }}>Instituto de Etnodesenvolvimento NGUTAPA · Santo Antônio do Içá – AM</div>
          </div>
        </div>
      </header>

      {/* ══ FAIXA GEF ══ */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0dbd0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "10px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <p style={{ color: "#6b6b6b", fontSize: 12, margin: 0, fontFamily: "system-ui,sans-serif", lineHeight: 1.6 }}>
            Processos seletivos abertos e competitivos financiados pelo <strong style={{ color: "#1a3d2b" }}>Fundo para o Meio Ambiente Global (GEF)</strong> via Banco Mundial · Doação TF0B8254-6L
          </p>
          <span style={{ backgroundColor: "#f0faf4", border: "1px solid #a7d4b8", borderRadius: 4, padding: "3px 12px", color: "#1a3d2b", fontSize: 11, fontWeight: 700, fontFamily: "system-ui,sans-serif", whiteSpace: "nowrap" }}>
            {abertas.length} vaga{abertas.length !== 1 ? "s" : ""} aberta{abertas.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ══ CONTEÚDO ══ */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 32px 80px" }}>

        {/* Abertas */}
        {abertas.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 12, borderBottom: "2px solid #1a3d2b" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#2d6a4f", display: "inline-block", flexShrink: 0 }}/>
              <h2 style={{ fontSize: 11, fontWeight: 700, color: "#1a3d2b", textTransform: "uppercase", letterSpacing: "0.18em", margin: 0, fontFamily: "system-ui,sans-serif" }}>
                Inscrições Abertas
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {abertas.map((op, i) => (
                <CardOportunidade key={op.id} op={op} onAbrirFormulario={onAbrirFormulario} last={i === abertas.length - 1}/>
              ))}
            </div>
          </section>
        )}

        {/* Encerradas */}
        {restantes.length > 0 && (
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 12, borderBottom: "1px solid #ccc" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ccc", display: "inline-block", flexShrink: 0 }}/>
              <h2 style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.18em", margin: 0, fontFamily: "system-ui,sans-serif" }}>
                Outras Oportunidades
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {restantes.map((op, i) => (
                <CardOportunidade key={op.id} op={op} onAbrirFormulario={onAbrirFormulario} last={i === restantes.length - 1}/>
              ))}
            </div>
          </section>
        )}

        {/* Informações */}
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 0, borderTop: "1px solid #d0ccc4", paddingTop: 32 }}>
          {[
            { titulo: "Processo Seletivo", texto: "Os processos seguem os Regulamentos de Aquisições do Banco Mundial para Mutuários em Projetos de Investimento (edição 2020)." },
            { titulo: "Dúvidas", texto: "Encaminhe para Institutongutapatikuna@gmail.com indicando o número do processo e seu nome completo no assunto." },
            { titulo: "Confidencialidade", texto: "As informações obtidas no processo são confidenciais e não podem ser divulgadas sem autorização expressa do NGUTAPA." },
          ].map((item, i) => (
            <div key={item.titulo} style={{ paddingRight: 32, paddingBottom: 8, borderLeft: i > 0 ? "1px solid #d0ccc4" : "none", paddingLeft: i > 0 ? 32 : 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#1a3d2b", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8, fontFamily: "system-ui,sans-serif" }}>{item.titulo}</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{item.texto}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <footer style={{ backgroundColor: "#1a3d2b", borderTop: "4px solid #d4a820", padding: "20px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "#7ab898", fontSize: 12, margin: 0, fontFamily: "system-ui,sans-serif" }}>
            © 2026 Instituto NGUTAPA · Projeto GEF Putumayo-Içá · Banco Mundial (GEF TF0B8254-6L)
          </p>
          <p style={{ color: "#7ab898", fontSize: 12, margin: 0, fontFamily: "system-ui,sans-serif" }}>
            Santo Antônio do Içá – AM · Institutongutapatikuna@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
}

function CardOportunidade({ op, onAbrirFormulario, last }: { op: Oportunidade; onAbrirFormulario: (id: string) => void; last: boolean }) {
  const [copiado, setCopiado] = useState(false);
  const encerrado = op.status === "encerrado";

  const handleCompartilhar = async () => {
    const url = `${window.location.origin}${window.location.pathname}?edital=${op.id}`;
    try { await navigator.clipboard.writeText(url); } catch { }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div style={{
      backgroundColor: "white",
      border: "1px solid #d8d4cc",
      borderBottom: last ? "1px solid #d8d4cc" : "none",
      padding: "28px 32px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      opacity: encerrado ? 0.65 : 1,
      transition: "background .15s",
    }}
      onMouseOver={e => { if (!encerrado) (e.currentTarget as HTMLDivElement).style.backgroundColor = "#fafaf8"; }}
      onMouseOut={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = "white"}
    >
      {/* Categoria */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#2d6a4f", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "system-ui,sans-serif", display: "flex", alignItems: "center", gap: 12 }}>
        {op.categoria}
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", fontFamily: "system-ui,sans-serif",
          color: op.status === "aberto" ? "#166534" : op.status === "em_breve" ? "#854d0e" : "#6b7280",
          backgroundColor: op.status === "aberto" ? "#f0faf4" : op.status === "em_breve" ? "#fef9c3" : "#f3f4f6",
          border: `1px solid ${op.status === "aberto" ? "#a7d4b8" : op.status === "em_breve" ? "#fde68a" : "#e5e7eb"}`,
          borderRadius: 3, padding: "2px 8px",
        }}>
          {STATUS_LABEL[op.status]}
        </span>
      </div>

      {/* Título */}
      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: 0, lineHeight: 1.3 }}>
        {op.titulo}
      </h3>

      {/* Descrição */}
      <p style={{ fontSize: 14, color: "#444", lineHeight: 1.75, margin: 0 }}>
        {op.descricao}
      </p>

      {/* Meta */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 24px", fontSize: 12, color: "#777", fontFamily: "system-ui,sans-serif" }}>
        <span><strong style={{ color: "#333" }}>Subprojeto:</strong> {op.subprojeto}</span>
        <span><strong style={{ color: "#333" }}>Local:</strong> {op.local}</span>
        <span><strong style={{ color: "#333" }}>Duração:</strong> {op.duracao}</span>
        <span style={{ color: op.status === "aberto" ? "#b91c1c" : "#777", fontWeight: op.status === "aberto" ? 700 : 400 }}>
          <strong style={{ color: op.status === "aberto" ? "#b91c1c" : "#333" }}>Prazo:</strong> {op.prazo} às 23h59 (Horário do Amazonas)
        </span>
      </div>

      {/* Botões */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
        {op.linkTdr && (
          <a href={op.linkTdr} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 20px", border: "1.5px solid #1a3d2b", backgroundColor: "white", color: "#1a3d2b", fontSize: 12, fontWeight: 700, fontFamily: "system-ui,sans-serif", letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", transition: "all .15s", cursor: "pointer" }}
            onMouseOver={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "#1a3d2b"; el.style.color = "white"; }}
            onMouseOut={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "white"; el.style.color = "#1a3d2b"; }}
          >
            <ExternalLink size={12}/> Ver TdR
          </a>
        )}
        {op.temFormulario && op.status === "aberto" && (
          <button type="button" onClick={() => onAbrirFormulario(op.id)}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 24px", border: "1.5px solid #1a3d2b", backgroundColor: "#1a3d2b", color: "white", fontSize: 12, fontWeight: 700, fontFamily: "system-ui,sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "all .15s" }}
            onMouseOver={e => { const el = e.currentTarget as HTMLButtonElement; el.style.backgroundColor = "#2d6a4f"; el.style.borderColor = "#2d6a4f"; }}
            onMouseOut={e => { const el = e.currentTarget as HTMLButtonElement; el.style.backgroundColor = "#1a3d2b"; el.style.borderColor = "#1a3d2b"; }}
          >
            Inscrever-se
          </button>
        )}
        {encerrado && (
          <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: "system-ui,sans-serif", padding: "9px 0" }}>Processo encerrado</span>
        )}

        {/* Compartilhar */}
        <button type="button" onClick={handleCompartilhar}
          title="Copiar link desta oportunidade"
          style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", border: "1px solid #d0ccc4", backgroundColor: "white", color: copiado ? "#166534" : "#777", fontSize: 11, fontWeight: 600, fontFamily: "system-ui,sans-serif", letterSpacing: "0.06em", cursor: "pointer", transition: "all .15s", borderColor: copiado ? "#a7d4b8" : "#d0ccc4", backgroundColor: copiado ? "#f0faf4" : "white" as any }}>
          {copiado ? <><Check size={12}/> Link copiado!</> : <><Share2 size={12}/> Compartilhar</>}
        </button>
      </div>
    </div>
  );
}
