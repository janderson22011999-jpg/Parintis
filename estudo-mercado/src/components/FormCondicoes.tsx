import React from "react";
import { CondicoesCotacao } from "../types";

interface Props { data: CondicoesCotacao; onChange: (u: Partial<CondicoesCotacao>) => void; }

export function FormCondicoes({ data, onChange }: Props) {
  return (
    <div>
      <div style={{ borderBottom: "2px solid #e8f0ea", paddingBottom: 12, marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a3d2b", margin: 0 }}>3. Condições Comerciais</h2>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Prazo de entrega, validade e o que está incluso nos preços.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
            Prazo de Entrega <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input type="text" value={data.prazoEntrega} onChange={e => onChange({ prazoEntrega: e.target.value })}
            placeholder="Ex: 30 dias corridos após Ordem de Compra"
            style={{ width: "100%", padding: "9px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14, color: "#1f2937", background: "white", boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
            Validade da Proposta <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input type="text" value={data.validadeProposta} onChange={e => onChange({ validadeProposta: e.target.value })}
            placeholder="Ex: 60 dias"
            style={{ width: "100%", padding: "9px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14, color: "#1f2937", background: "white", boxSizing: "border-box" }} />
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
            Os preços cotados incluem:
          </label>
          <div style={{ display: "flex", gap: 16 }}>
            {([["incluiImpostos", "Impostos (NF)"], ["incluiFrete", "Frete até Vila Bethania SAI – AM"]] as const).map(([key, label]) => (
              <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "10px 16px", border: `1.5px solid ${data[key] ? "#2d6a4f" : "#d1d5db"}`, borderRadius: 10, backgroundColor: data[key] ? "#f0faf4" : "white", transition: "all 0.15s" }}>
                <input type="checkbox" checked={data[key]} onChange={e => onChange({ [key]: e.target.checked })}
                  style={{ width: 16, height: 16, accentColor: "#2d6a4f", cursor: "pointer" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: data[key] ? "#1a3d2b" : "#374151" }}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
            Observações Gerais <span style={{ color: "#9ca3af", fontWeight: 400 }}>opcional</span>
          </label>
          <textarea value={data.observacoesGerais} onChange={e => onChange({ observacoesGerais: e.target.value })}
            rows={3} placeholder="Informações adicionais sobre a proposta, condições especiais, garantias, assistência técnica..."
            style={{ width: "100%", padding: "9px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14, color: "#1f2937", background: "white", boxSizing: "border-box", resize: "vertical" }} />
        </div>
      </div>
    </div>
  );
}
