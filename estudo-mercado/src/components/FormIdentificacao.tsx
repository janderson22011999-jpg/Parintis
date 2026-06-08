import React from "react";
import { IdentificacaoInfo } from "../types";

interface Props {
  data: IdentificacaoInfo;
  onChange: (u: Partial<IdentificacaoInfo>) => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db",
  borderRadius: 9, fontSize: 13, color: "#111827", backgroundColor: "white",
  boxSizing: "border-box", transition: "border-color .15s",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 700, color: "#374151",
  marginBottom: 6, letterSpacing: "0.01em",
};
const noteStyle: React.CSSProperties = { fontSize: 11, color: "#9ca3af", marginTop: 4 };

export function FormIdentificacao({ data, onChange }: Props) {
  const field = (
    key: keyof IdentificacaoInfo,
    label: string,
    type = "text",
    note?: string,
    required = true,
    placeholder = "",
  ) => (
    <div>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: "#dc2626" }}> *</span>}
      </label>
      <input
        type={type}
        value={data[key]}
        placeholder={placeholder}
        onChange={e => onChange({ [key]: e.target.value })}
        style={inputStyle}
      />
      {note && <p style={noteStyle}>{note}</p>}
    </div>
  );

  return (
    <div>
      <SectionTitle num="1" title="Identificação do Candidato" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "18px 24px", marginTop: 20 }}>
        {field("nomeCompleto", "Nome Completo", "text", "Como consta no documento de identificação", true, "Nome completo")}
        {field("cpf", "CPF", "text", undefined, true, "000.000.000-00")}
        {field("email", "E-mail", "email", "Será utilizado para comunicação sobre o processo seletivo", true, "seuemail@exemplo.com")}
        {field("telefone", "Telefone / WhatsApp", "text", "Com DDD", true, "(92) 9 0000-0000")}
        {field("cidadeEstado", "Cidade / Estado de Residência", "text", undefined, true, "Manaus – AM")}
        {field("linkedinLattes", "LinkedIn ou Currículo Lattes (URL)", "url", "Opcional — facilita a avaliação do perfil", false, "https://lattes.cnpq.br/...")}
      </div>
    </div>
  );
}

export function SectionTitle({ num, title }: { num: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 14, borderBottom: "2px solid #f0faf4" }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#1a3d2b", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
        {num}
      </div>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a3d2b", margin: 0 }}>{title}</h2>
    </div>
  );
}
