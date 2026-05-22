import React from "react";
import { FornecedorInfo } from "../types";

interface Props { data: FornecedorInfo; onChange: (u: Partial<FornecedorInfo>) => void; }

const inp = "width:100%;padding:9px 14px;border:1.5px solid #d1d5db;borderRadius:8px;fontSize:14px;color:#1f2937;background:white;boxSizing:border-box as any";

export function FormFornecedor({ data, onChange }: Props) {
  const field = (id: string, label: string, key: keyof FornecedorInfo, placeholder: string, required = true, type = "text", colSpan = 1) => (
    <div style={{ gridColumn: colSpan === 2 ? "span 2" : "span 1" }}>
      <label htmlFor={id} style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
        {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
      </label>
      <input id={id} type={type} value={data[key] as string}
        onChange={e => onChange({ [key]: e.target.value })}
        placeholder={placeholder}
        style={{ width: "100%", padding: "9px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14, color: "#1f2937", background: "white", boxSizing: "border-box" }} />
    </div>
  );

  return (
    <div>
      <div style={{ borderBottom: "2px solid #e8f0ea", paddingBottom: 12, marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a3d2b", margin: 0 }}>1. Identificação do Fornecedor</h2>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Informe os dados da empresa responsável pela cotação. Somente Pessoa Jurídica (CNPJ) é aceita.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {field("razao", "Razão Social", "razaoSocial", "Nome completo da empresa", true, "text", 2)}
        {field("cnpj", "CNPJ", "cnpj", "00.000.000/0000-00")}
        {field("resp", "Nome do Responsável", "responsavel", "Nome completo")}
        {field("email", "E-mail para Contato", "email", "contato@empresa.com.br", true, "email")}
        {field("tel", "Telefone / WhatsApp", "telefone", "(92) 99999-9999", false)}
        {field("cidade", "Cidade / Estado", "cidadeEstado", "Ex: Manaus – AM")}
        <div>
          <label htmlFor="datacot" style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
            Data da Cotação <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input id="datacot" type="date" value={data.dataCotacao} onChange={e => onChange({ dataCotacao: e.target.value })}
            style={{ width: "100%", padding: "9px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14, color: "#1f2937", background: "white", boxSizing: "border-box" }} />
        </div>
      </div>
    </div>
  );
}
