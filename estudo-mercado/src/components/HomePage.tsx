import React from "react";
import { Calendar, MapPin, Clock, ChevronRight, Fish, BookOpen, ExternalLink } from "lucide-react";

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

function ProjectLogo({ color = "white" }: { color?: string }) {
  return (
    <svg width="36" height="44" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const STATUS_CONFIG = {
  aberto:     { label: "Inscrições Abertas", bg: "#dcfce7", color: "#15803d", dot: "#16a34a" },
  encerrado:  { label: "Encerrado",          bg: "#f3f4f6", color: "#6b7280", dot: "#9ca3af" },
  em_breve:   { label: "Em Breve",           bg: "#fef9c3", color: "#854d0e", dot: "#ca8a04" },
};

const CATEGORIA_ICON: Record<string, React.ReactNode> = {
  "Consultoria Individual": <Fish size={15}/>,
  "Emprego":               <BookOpen size={15}/>,
};

export function HomePage({ onAbrirFormulario }: Props) {
  const abertas   = OPORTUNIDADES.filter(o => o.status === "aberto");
  const restantes = OPORTUNIDADES.filter(o => o.status !== "aberto");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f0", fontFamily: "system-ui,-apple-system,sans-serif" }}>

      {/* ══ HEADER ══ */}
      <header style={{ backgroundColor: "#1a3d2b", position: "relative", overflow: "hidden" }}>
        <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none" }} viewBox="0 0 1200 180" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="rg" cx="75%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#2d6a4f" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#1a3d2b" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="180" fill="url(#rg)"/>
          <path d="M0,120 C200,40 450,160 700,70 C900,0 1050,110 1200,50 L1200,180 L0,180Z" fill="white" fillOpacity="0.03"/>
          <path d="M80,155 C280,65 530,165 780,75 C960,5 1080,115 1240,45" stroke="#d4a820" strokeWidth="1.5" strokeOpacity="0.25" fill="none"/>
        </svg>
        <div style={{ position:"relative",zIndex:10,maxWidth:1060,margin:"0 auto",padding:"22px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,flexWrap:"wrap" }}>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            {/* Logo NGUTAPA */}
            <img
              src="https://brasil.amazonteam.org/wp-content/uploads/2025/03/NGUTAPA-logo.png"
              alt="Instituto NGUTAPA"
              style={{ height:48,width:"auto",filter:"brightness(0) invert(1)" }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display="none"; }}
            />
            <div style={{ width:1,height:36,backgroundColor:"rgba(255,255,255,.2)" }}/>
            <div style={{ display:"flex",alignItems:"center",gap:10,backgroundColor:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:"8px 12px" }}>
              <ProjectLogo color="white"/>
              <div style={{ lineHeight:1.2 }}>
                <div style={{ color:"#a8d5b8",fontSize:9,fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase" }}>Projeto GEF</div>
                <div style={{ color:"white",fontSize:13,fontWeight:800 }}>Putumayo-Içá</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ color:"white",fontSize:18,fontWeight:800,lineHeight:1.2 }}>Editais e Oportunidades</div>
            <div style={{ color:"#a8d5b8",fontSize:12,marginTop:3 }}>Instituto de Etno Desenvolvimento NGUTAPA · Santo Antônio do Içá – AM</div>
          </div>
        </div>
      </header>

      {/* ══ HERO BAND ══ */}
      <div style={{ backgroundColor:"#2d6a4f",padding:"14px 24px" }}>
        <div style={{ maxWidth:1060,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10 }}>
          <p style={{ color:"#c6e8d4",fontSize:12,margin:0,lineHeight:1.6 }}>
            Processos seletivos abertos e competitivos — financiados pelo <strong style={{ color:"white" }}>Fundo para o Meio Ambiente Global (GEF)</strong> via Banco Mundial · Doação TF0B8254-6L
          </p>
          <span style={{ backgroundColor:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:20,padding:"4px 14px",color:"white",fontSize:11,fontWeight:700,whiteSpace:"nowrap" }}>
            {abertas.length} vaga{abertas.length !== 1 ? "s" : ""} aberta{abertas.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div style={{ maxWidth:1060,margin:"0 auto",padding:"32px 24px 64px" }}>

        {/* Abertas */}
        {abertas.length > 0 && (
          <section style={{ marginBottom:40 }}>
            <h2 style={{ fontSize:13,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.12em",margin:"0 0 16px",display:"flex",alignItems:"center",gap:8 }}>
              <span style={{ display:"inline-block",width:8,height:8,borderRadius:"50%",backgroundColor:"#16a34a" }}/>
              Inscrições Abertas
            </h2>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))",gap:16 }}>
              {abertas.map(op => <CardOportunidade key={op.id} op={op} onAbrirFormulario={onAbrirFormulario}/>)}
            </div>
          </section>
        )}

        {/* Encerradas / Em breve */}
        {restantes.length > 0 && (
          <section>
            <h2 style={{ fontSize:13,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:"0.12em",margin:"0 0 16px",display:"flex",alignItems:"center",gap:8 }}>
              <span style={{ display:"inline-block",width:8,height:8,borderRadius:"50%",backgroundColor:"#d1d5db" }}/>
              Outras Oportunidades
            </h2>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))",gap:16 }}>
              {restantes.map(op => <CardOportunidade key={op.id} op={op} onAbrirFormulario={onAbrirFormulario}/>)}
            </div>
          </section>
        )}

        {/* Rodapé informativo */}
        <div style={{ marginTop:48,backgroundColor:"white",border:"1.5px solid #e2ebe4",borderRadius:16,padding:"22px 28px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20 }}>
          {[
            { titulo:"Processo Seletivo", texto:"Os processos seguem os Regulamentos de Aquisições do Banco Mundial para Mutuários em Projetos de Investimento (edição 2020)." },
            { titulo:"Dúvidas", texto:"Encaminhe para Institutongutapatikuna@gmail.com indicando no assunto o número do processo e seu nome." },
            { titulo:"Confidencialidade", texto:"Todas as informações obtidas no processo são consideradas confidenciais e não podem ser divulgadas sem autorização expressa do NGUTAPA." },
          ].map(i => (
            <div key={i.titulo}>
              <div style={{ fontSize:12,fontWeight:700,color:"#1a3d2b",marginBottom:6 }}>{i.titulo}</div>
              <div style={{ fontSize:12,color:"#6b7280",lineHeight:1.65 }}>{i.texto}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <footer style={{ backgroundColor:"#1a3d2b",padding:"20px 24px" }}>
        <div style={{ maxWidth:1060,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
          <p style={{ color:"#6b9e7e",fontSize:11,margin:0 }}>© 2026 Instituto NGUTAPA · Projeto GEF Putumayo-Içá · Banco Mundial (GEF TF0B8254-6L)</p>
          <p style={{ color:"#6b9e7e",fontSize:11,margin:0 }}>Santo Antônio do Içá – AM · Institutongutapatikuna@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}

function CardOportunidade({ op, onAbrirFormulario }: { op: Oportunidade; onAbrirFormulario: (id: string) => void }) {
  const st = STATUS_CONFIG[op.status];
  const encerrado = op.status === "encerrado";

  return (
    <div style={{ backgroundColor:"white",border:"1.5px solid #e2ebe4",borderRadius:16,overflow:"hidden",display:"flex",flexDirection:"column",opacity:encerrado ? 0.7 : 1,transition:"box-shadow .15s",boxShadow:"0 1px 4px rgba(0,0,0,.04)" }}
      onMouseOver={e => { if (!encerrado) (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,.09)"; }}
      onMouseOut={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,.04)"}
    >
      {/* Topo colorido */}
      <div style={{ backgroundColor:"#1a3d2b",padding:"16px 20px 14px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:8 }}>
          <span style={{ display:"inline-flex",alignItems:"center",gap:5,backgroundColor:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",borderRadius:20,padding:"3px 10px",fontSize:10,color:"#a8d5b8",fontWeight:600 }}>
            {CATEGORIA_ICON[op.categoria] ?? null}
            {op.categoria}
          </span>
          <span style={{ display:"inline-flex",alignItems:"center",gap:4,backgroundColor:st.bg,borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:700,color:st.color,flexShrink:0 }}>
            <span style={{ width:6,height:6,borderRadius:"50%",backgroundColor:st.dot,display:"inline-block" }}/>
            {st.label}
          </span>
        </div>
        <h3 style={{ color:"white",fontSize:17,fontWeight:800,margin:"0 0 4px",lineHeight:1.25 }}>{op.titulo}</h3>
        <p style={{ color:"#a8d5b8",fontSize:11,margin:0 }}>{op.processo}</p>
      </div>

      {/* Corpo */}
      <div style={{ padding:"16px 20px",flex:1,display:"flex",flexDirection:"column",gap:12 }}>
        <p style={{ fontSize:12,color:"#4b5563",lineHeight:1.65,margin:0 }}>{op.descricao}</p>

        <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
          <div style={{ display:"flex",alignItems:"center",gap:7 }}>
            <MapPin size={13} color="#9ca3af"/>
            <span style={{ fontSize:12,color:"#6b7280" }}>{op.local}</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:7 }}>
            <Clock size={13} color="#9ca3af"/>
            <span style={{ fontSize:12,color:"#6b7280" }}>Duração: {op.duracao}</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:7 }}>
            <Calendar size={13} color={op.status === "aberto" ? "#dc2626" : "#9ca3af"}/>
            <span style={{ fontSize:12,color:op.status === "aberto" ? "#dc2626" : "#6b7280",fontWeight:op.status === "aberto" ? 700 : 400 }}>
              Prazo: {op.prazo} às 23h59 (horário do Amazonas)
            </span>
          </div>
        </div>
      </div>

      {/* Ações */}
      <div style={{ padding:"12px 20px 16px",borderTop:"1px solid #f0f4f0",display:"flex",gap:8 }}>
        {op.linkTdr && (
          <a href={op.linkTdr} target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"8px 14px",border:"1.5px solid #d1d5db",borderRadius:8,fontSize:12,fontWeight:600,color:"#374151",textDecoration:"none",backgroundColor:"white" }}>
            <ExternalLink size={12}/> TdR
          </a>
        )}
        {op.temFormulario && op.status === "aberto" && (
          <button type="button" onClick={() => onAbrirFormulario(op.id)}
            style={{ flex:1,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,padding:"9px 16px",backgroundColor:"#2d6a4f",border:"none",borderRadius:8,fontSize:13,fontWeight:700,color:"white",cursor:"pointer",boxShadow:"0 2px 6px rgba(45,106,79,.25)" }}>
            Inscrever-se <ChevronRight size={14}/>
          </button>
        )}
        {!op.temFormulario && op.status === "aberto" && (
          <span style={{ flex:1,textAlign:"center",fontSize:12,color:"#9ca3af",padding:"9px 0" }}>Enviar CV por e-mail</span>
        )}
        {encerrado && (
          <span style={{ flex:1,textAlign:"center",fontSize:12,color:"#9ca3af",padding:"9px 0" }}>Processo encerrado</span>
        )}
      </div>
    </div>
  );
}
