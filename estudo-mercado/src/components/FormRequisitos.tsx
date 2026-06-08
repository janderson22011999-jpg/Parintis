import React from "react";
import { RequisitosInfo } from "../types";
import { SectionTitle } from "./FormIdentificacao";

interface Props {
  data: RequisitosInfo;
  onChange: (u: Partial<RequisitosInfo>) => void;
}

interface CheckItem {
  key: keyof RequisitosInfo;
  label: string;
  desc: string;
}

const checkItems: CheckItem[] = [
  { key: "disponibilidadeFluvial", label: "Deslocamentos fluviais em áreas remotas", desc: "Disponibilidade e capacidade para viagens de barco em comunidades ribeirinhas de difícil acesso." },
  { key: "dominioColetaDados", label: "Coleta de dados em campo", desc: "Domínio básico de ferramentas de coleta de dados em campo (fichas, GPS, apps de monitoramento)." },
  { key: "dominioOffice", label: "Pacote Office", desc: "Conhecimento em Word, Excel e PowerPoint para elaboração de relatórios técnicos." },
  { key: "coordenacaoEquipes", label: "Coordenação de equipes comunitárias", desc: "Experiência em facilitar processos participativos e coordenar grupos em comunidades indígenas ou tradicionais." },
  { key: "manuseioEquipamentos", label: "Manuseio de equipamentos eletrônicos", desc: "Capacidade de operar equipamentos de monitoramento, câmeras e dispositivos de coleta de dados digitais." },
];

export function FormRequisitos({ data, onChange }: Props) {
  return (
    <div>
      <SectionTitle num="5" title="Requisitos e Competências Adicionais" />
      <p style={{ fontSize: 13, color: "#6b7280", marginTop: 14, marginBottom: 18 }}>
        Marque os requisitos que você atende. Estes itens são desejáveis pelo TdR e contribuem para a avaliação na entrevista.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {checkItems.map(item => {
          const checked = data[item.key] as boolean;
          return (
            <label
              key={String(item.key)}
              style={{
                display: "flex", gap: 14, padding: "14px 18px", cursor: "pointer",
                backgroundColor: checked ? "#f0faf4" : "#f9fafb",
                border: `1.5px solid ${checked ? "#a7d4b8" : "#e5e7eb"}`,
                borderRadius: 10, transition: "all .15s",
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={e => onChange({ [item.key]: e.target.checked })}
                style={{ width: 17, height: 17, accentColor: "#2d6a4f", cursor: "pointer", flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: checked ? "#1a3d2b" : "#374151", display: "block" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5, display: "block", marginTop: 2 }}>
                  {item.desc}
                </span>
              </div>
            </label>
          );
        })}
      </div>

      <div style={{ marginTop: 20 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
          Observações adicionais (opcional)
        </label>
        <textarea
          value={data.observacoesAdicionais}
          onChange={e => onChange({ observacoesAdicionais: e.target.value })}
          placeholder="Informações complementares que deseja destacar: idiomas, publicações, projetos relevantes..."
          style={{
            width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db",
            borderRadius: 9, fontSize: 13, color: "#111827", backgroundColor: "white",
            boxSizing: "border-box", resize: "vertical", minHeight: 80, lineHeight: 1.6,
          }}
        />
      </div>
    </div>
  );
}
