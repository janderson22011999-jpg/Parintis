import React from "react";
import { FormacaoInfo } from "../types";
import { SectionTitle } from "./FormIdentificacao";

interface Props {
  data: FormacaoInfo;
  onChange: (u: Partial<FormacaoInfo>) => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db",
  borderRadius: 9, fontSize: 13, color: "#111827", backgroundColor: "white",
  boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6,
};

export function FormFormacao({ data, onChange }: Props) {
  const hasPosGrad = data.posGraduacao !== "Nao";

  return (
    <div>
      <SectionTitle num="2" title="Formação Acadêmica" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "18px 24px", marginTop: 20 }}>
        <div style={{ gridColumn: "1/-1" }}>
          <label style={labelStyle}>Curso de Graduação <span style={{ color: "#dc2626" }}>*</span></label>
          <input
            value={data.cursoGraduacao}
            onChange={e => onChange({ cursoGraduacao: e.target.value })}
            placeholder="Ex.: Engenharia de Pesca, Biologia, Engenharia Ambiental..."
            style={inputStyle}
          />
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
            Áreas aceitas: Engenharia de Pesca, Biologia, Engenharia Ambiental, Ciências Agrárias ou afins.
          </p>
        </div>
        <div>
          <label style={labelStyle}>Instituição de Ensino Superior <span style={{ color: "#dc2626" }}>*</span></label>
          <input
            value={data.instituicaoGraduacao}
            onChange={e => onChange({ instituicaoGraduacao: e.target.value })}
            placeholder="Nome da universidade/faculdade"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Ano de Conclusão <span style={{ color: "#dc2626" }}>*</span></label>
          <input
            type="number"
            value={data.anoConclusaoGraduacao}
            onChange={e => onChange({ anoConclusaoGraduacao: e.target.value })}
            placeholder="Ex.: 2020"
            min={1990} max={2026}
            style={inputStyle}
          />
        </div>

        <div style={{ gridColumn: "1/-1", marginTop: 8 }}>
          <label style={labelStyle}>Pós-graduação</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {(["Nao", "Especializacao", "Mestrado", "Doutorado"] as const).map(opt => {
              const labels: Record<string, string> = { Nao: "Não possuo", Especializacao: "Especialização", Mestrado: "Mestrado", Doutorado: "Doutorado" };
              const active = data.posGraduacao === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange({ posGraduacao: opt })}
                  style={{
                    padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                    border: `2px solid ${active ? "#2d6a4f" : "#d1d5db"}`,
                    backgroundColor: active ? "#f0faf4" : "white",
                    color: active ? "#1a3d2b" : "#6b7280",
                  }}
                >
                  {labels[opt]}
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>
            Especialização = +8 pts · Mestrado = +12 pts na pontuação do TdR
          </p>
        </div>

        {hasPosGrad && (
          <>
            <div>
              <label style={labelStyle}>Área da Pós-graduação</label>
              <input
                value={data.areaPosGraduacao}
                onChange={e => onChange({ areaPosGraduacao: e.target.value })}
                placeholder="Ex.: Recursos Pesqueiros, Ecologia..."
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Instituição da Pós-graduação</label>
              <input
                value={data.instituicaoPosGraduacao}
                onChange={e => onChange({ instituicaoPosGraduacao: e.target.value })}
                placeholder="Nome da universidade"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Ano de Conclusão da Pós</label>
              <input
                type="number"
                value={data.anoConclusaoPosGraduacao}
                onChange={e => onChange({ anoConclusaoPosGraduacao: e.target.value })}
                placeholder="Ex.: 2023"
                min={1990} max={2026}
                style={inputStyle}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
