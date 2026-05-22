import React, { useState } from "react";
import { CotacaoForm, LOTE_A_ITEMS, LOTE_B_ITEMS } from "../types";
import { formatToEmail, calcTotalBRL, calcTotalUSD, formatBRL } from "../utils";
import { Mail, Copy, Check, Printer } from "lucide-react";

interface Props { data: CotacaoForm; onClear: () => void; }

export function PainelEnvio({ data, onClear }: Props) {
  const [copied, setCopied] = useState(false);
  const items = data.lote === "A" ? LOTE_A_ITEMS : LOTE_B_ITEMS;
  const numero = data.lote === "A" ? "SDC-NGUTUPA-C1-011A-2026" : "SDC-NGUTUPA-C1-011B-2026";
  const texto = formatToEmail(data);
  const totalBRL = calcTotalBRL(data);
  const totalUSD = calcTotalUSD(data);

  const handleEmail = () => {
    const subject = `Cotação ${numero} — ${data.fornecedor.razaoSocial || "[Empresa]"}`;
    window.location.href = `mailto:Institutongutapatikuna@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(texto)}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div>
      <div style={{ borderBottom: "2px solid #e8f0ea", paddingBottom: 12, marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a3d2b", margin: 0 }}>4. Resumo e Envio</h2>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Revise o resumo da cotação e envie por e-mail ao NGUTAPA.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
        {/* Resumo */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ backgroundColor: "#f6faf7", border: "1.5px solid #e2ebe4", borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Resumo da Proposta</div>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>
              <div><strong>Processo:</strong> {numero}</div>
              <div><strong>Fornecedor:</strong> {data.fornecedor.razaoSocial || "—"}</div>
              <div><strong>Itens:</strong> {items.length} itens cotados</div>
              <div><strong>Prazo:</strong> {data.condicoes.prazoEntrega}</div>
              <div><strong>Validade:</strong> {data.condicoes.validadeProposta}</div>
            </div>
          </div>

          <div style={{ backgroundColor: "#1a3d2b", borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#a8d5b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Total da Proposta</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "white" }}>R$ {formatBRL(totalBRL)}</div>
            {totalUSD > 0 && <div style={{ fontSize: 13, color: "#a8d5b8", marginTop: 2 }}>US$ {formatBRL(totalUSD)}</div>}
            <div style={{ fontSize: 11, color: "#a8d5b8", marginTop: 8 }}>
              {data.condicoes.incluiImpostos ? "✓ Inclui impostos" : "✗ Impostos não inclusos"}
              <br />{data.condicoes.incluiFrete ? "✓ Inclui frete" : "✗ Frete não incluso"}
            </div>
          </div>

          <div style={{ backgroundColor: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Prazo Limite</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#92400e" }}>02/06/2026</div>
            <div style={{ fontSize: 11, color: "#b45309" }}>às 23h59 · Horário do Amazonas</div>
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ backgroundColor: "#1a3d2b", borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Mail size={18} color="#a8d5b8" />
              <span style={{ fontWeight: 700, color: "white", fontSize: 14 }}>Enviar ao Instituto NGUTAPA</span>
            </div>
            <p style={{ fontSize: 12, color: "#a8d5b8", marginBottom: 16, lineHeight: 1.5 }}>
              Destinatário: <strong style={{ color: "#d4a820" }}>Institutongutapatikuna@gmail.com</strong>
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" onClick={handleEmail}
                style={{ flex: 1, padding: "10px 16px", backgroundColor: "#2d6a4f", border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Mail size={14} /> Abrir E-mail
              </button>
              <button type="button" onClick={handleCopy}
                style={{ flex: 1, padding: "10px 16px", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                {copied ? <><Check size={14} /> Copiado!</> : <><Copy size={14} /> Copiar texto</>}
              </button>
              <button type="button" onClick={() => window.print()}
                style={{ padding: "10px 14px", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Printer size={14} /> PDF
              </button>
            </div>
          </div>

          <div style={{ border: "1.5px solid #e2ebe4", borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Pré-visualização do e-mail</div>
            <div style={{ backgroundColor: "#f8fafc", border: "1px solid #e2ebe4", borderRadius: 8, padding: 12, maxHeight: 240, overflowY: "auto", fontSize: 11, fontFamily: "monospace", color: "#374151", whiteSpace: "pre", lineHeight: 1.6 }}>
              {texto}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
