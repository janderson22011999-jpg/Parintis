import React from "react";
import { ItemDefinition, ItemCotacao } from "../types";
import { parseBRL, formatBRL } from "../utils";

interface Props {
  items: ItemDefinition[];
  cotacoes: ItemCotacao[];
  onChange: (index: number, updates: Partial<ItemCotacao>) => void;
}

export function TabelaItens({ items, cotacoes, onChange }: Props) {
  return (
    <div>
      <div style={{ borderBottom: "2px solid #e8f0ea", paddingBottom: 12, marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a3d2b", margin: 0 }}>2. Cotação por Item</h2>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
          Preencha marca/modelo, preço unitário e observações para cada item. Equipamentos com configurações superiores às especificadas são aceitos.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item, i) => {
          const cot = cotacoes[i] ?? { marcaModelo: "", precoUnitarioBRL: "", precoUnitarioUSD: "", observacoes: "" };
          const totalBRL = parseBRL(cot.precoUnitarioBRL) * item.quantidade;
          const totalUSD = parseBRL(cot.precoUnitarioUSD) * item.quantidade;

          return (
            <div key={item.id} style={{ border: "1.5px solid #e2ebe4", borderRadius: 14, overflow: "hidden" }}>
              {/* Item header */}
              <div style={{ backgroundColor: "#f6faf7", borderBottom: "1.5px solid #e2ebe4", padding: "12px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#2d6a4f", color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>
                  {String(item.id).padStart(2, "0")}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#1a3d2b" }}>{item.descricao}</span>
                    <span style={{ fontSize: 12, backgroundColor: "#1a3d2b", color: "white", borderRadius: 6, padding: "2px 10px", fontWeight: 600 }}>
                      Qtd: {item.quantidade} {item.unidade}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4, lineHeight: 1.55 }}>
                    <strong style={{ color: "#374151" }}>Especificação mínima:</strong> {item.especificacoes}
                  </p>
                </div>
              </div>

              {/* Input fields */}
              <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                {/* Marca/Modelo — full width */}
                <div style={{ gridColumn: "span 3" }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>
                    Marca / Modelo Ofertado <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input type="text" value={cot.marcaModelo}
                    onChange={e => onChange(i, { marcaModelo: e.target.value })}
                    placeholder="Ex: Dell Inspiron 15, Samsung Galaxy A54, DJI Mini 4 Pro..."
                    style={{ width: "100%", padding: "9px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14, color: "#1f2937", background: "white", boxSizing: "border-box" }} />
                </div>

                {/* Preço unitário BRL */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>
                    Preço Unitário (BRL) <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#9ca3af", fontWeight: 600 }}>R$</span>
                    <input type="text" value={cot.precoUnitarioBRL}
                      onChange={e => onChange(i, { precoUnitarioBRL: e.target.value })}
                      placeholder="0,00"
                      style={{ width: "100%", padding: "9px 14px 9px 36px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14, color: "#1f2937", background: "white", boxSizing: "border-box" }} />
                  </div>
                </div>

                {/* Preço unitário USD */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>
                    Preço Unitário (USD) <span style={{ color: "#9ca3af", fontWeight: 400 }}>opcional</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>US$</span>
                    <input type="text" value={cot.precoUnitarioUSD}
                      onChange={e => onChange(i, { precoUnitarioUSD: e.target.value })}
                      placeholder="0.00"
                      style={{ width: "100%", padding: "9px 14px 9px 40px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14, color: "#1f2937", background: "white", boxSizing: "border-box" }} />
                  </div>
                </div>

                {/* Total display */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>
                    Total (Qtd × Unitário)
                  </label>
                  <div style={{ padding: "9px 14px", border: "1.5px solid #e8f0ea", borderRadius: 8, backgroundColor: "#f6faf7", fontSize: 14, fontWeight: 700, color: totalBRL > 0 ? "#1a3d2b" : "#9ca3af" }}>
                    {totalBRL > 0 ? `R$ ${formatBRL(totalBRL)}` : "—"}
                    {totalUSD > 0 && <span style={{ display: "block", fontSize: 11, color: "#6b7280", fontWeight: 500 }}>US$ {formatBRL(totalUSD)}</span>}
                  </div>
                </div>

                {/* Observações */}
                <div style={{ gridColumn: "span 3" }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>
                    Observações sobre este item <span style={{ color: "#9ca3af", fontWeight: 400 }}>opcional</span>
                  </label>
                  <input type="text" value={cot.observacoes}
                    onChange={e => onChange(i, { observacoes: e.target.value })}
                    placeholder="Ex: inclui garantia de 12 meses, disponível em estoque, configuração superior..."
                    style={{ width: "100%", padding: "9px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14, color: "#1f2937", background: "white", boxSizing: "border-box" }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
