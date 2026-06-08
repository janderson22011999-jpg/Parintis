import React from "react";
import { ExperienciaGeralInfo, ExperienciaEspecificaInfo } from "../types";
import { SectionTitle } from "./FormIdentificacao";

interface Props {
  geral: ExperienciaGeralInfo;
  especifica: ExperienciaEspecificaInfo;
  onChangeGeral: (u: Partial<ExperienciaGeralInfo>) => void;
  onChangeEspecifica: (u: Partial<ExperienciaEspecificaInfo>) => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db",
  borderRadius: 9, fontSize: 13, color: "#111827", backgroundColor: "white",
  boxSizing: "border-box",
};
const textareaStyle: React.CSSProperties = {
  ...inputStyle, resize: "vertical", minHeight: 100, lineHeight: 1.6,
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6,
};

export function FormExperiencia({ geral, especifica, onChangeGeral, onChangeEspecifica }: Props) {
  const mesesGeral = Number(geral.totalMesesExperiencia) || 0;
  const mesesEsp   = Number(especifica.totalMesesEspecifica) || 0;
  const geralOk    = mesesGeral >= 6;
  const especificaOk = especifica.possuiExperienciaEspecifica === "Sim" && mesesEsp >= 6;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

      {/* Geral */}
      <div>
        <SectionTitle num="3" title="Experiência Profissional Geral" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "18px 24px", marginTop: 20 }}>
          <div>
            <label style={labelStyle}>
              Total de meses de experiência profissional (desde o diploma) <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <input
              type="number"
              value={geral.totalMesesExperiencia}
              onChange={e => onChangeGeral({ totalMesesExperiencia: e.target.value })}
              min={0} placeholder="Ex.: 18"
              style={{ ...inputStyle, borderColor: geral.totalMesesExperiencia && !geralOk ? "#f87171" : "#d1d5db" }}
            />
            <p style={{ fontSize: 11, marginTop: 4, color: geralOk ? "#16a34a" : "#9ca3af" }}>
              {geral.totalMesesExperiencia
                ? geralOk
                  ? `✓ ${mesesGeral} meses — requisito mínimo de 6 meses atendido.`
                  : `Abaixo do mínimo exigido (6 meses). Considere candidatar-se quando atingir o requisito.`
                : "Mínimo exigido: 6 meses contados a partir da obtenção do diploma."}
            </p>
          </div>

          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>
              Descrição das principais experiências profissionais <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <textarea
              value={geral.descricaoExperiencias}
              onChange={e => onChangeGeral({ descricaoExperiencias: e.target.value })}
              placeholder="Descreva cada experiência com: nome da instituição/empresa, cargo/função, período (dd/mm/aaaa a dd/mm/aaaa) e principais atividades realizadas. Comece pela experiência mais recente."
              style={textareaStyle}
            />
            <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
              Atenção: as datas (início e fim) devem estar presentes e serão verificadas com os comprovantes.
            </p>
          </div>
        </div>
      </div>

      {/* Específica */}
      <div>
        <SectionTitle num="4" title="Experiência Específica em Manejo Pesqueiro" />
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 20 }}>

          <div>
            <label style={labelStyle}>
              Possui experiência em manejo participativo de Pirarucu e/ou manejo comunitário de recursos pesqueiros com povos indígenas ou comunidades tradicionais na Amazônia? <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {(["Sim", "Nao"] as const).map(opt => {
                const active = especifica.possuiExperienciaEspecifica === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onChangeEspecifica({ possuiExperienciaEspecifica: opt })}
                    style={{
                      padding: "10px 32px", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer",
                      border: `2px solid ${active ? (opt === "Sim" ? "#2d6a4f" : "#f87171") : "#d1d5db"}`,
                      backgroundColor: active ? (opt === "Sim" ? "#f0faf4" : "#fef2f2") : "white",
                      color: active ? (opt === "Sim" ? "#1a3d2b" : "#b91c1c") : "#6b7280",
                    }}
                  >
                    {opt === "Sim" ? "Sim" : "Não"}
                  </button>
                );
              })}
            </div>
          </div>

          {especifica.possuiExperienciaEspecifica === "Sim" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "18px 24px" }}>
              <div>
                <label style={labelStyle}>
                  Total de meses de experiência específica <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="number"
                  value={especifica.totalMesesEspecifica}
                  onChange={e => onChangeEspecifica({ totalMesesEspecifica: e.target.value })}
                  min={0} placeholder="Ex.: 12"
                  style={{ ...inputStyle, borderColor: especifica.totalMesesEspecifica && !especificaOk ? "#f87171" : "#d1d5db" }}
                />
                <p style={{ fontSize: 11, marginTop: 4, color: especificaOk ? "#16a34a" : "#9ca3af" }}>
                  {especifica.totalMesesEspecifica
                    ? especificaOk
                      ? `✓ ${mesesEsp} meses — requisito mínimo de 6 meses atendido.`
                      : "Abaixo do mínimo exigido (6 meses)."
                    : "Mínimo exigido: 6 meses. Pode coincidir com o período de experiência geral."}
                </p>
              </div>

              <div>
                <label style={labelStyle}>Região / Município de Atuação</label>
                <input
                  value={especifica.regiaoAtuacao}
                  onChange={e => onChangeEspecifica({ regiaoAtuacao: e.target.value })}
                  placeholder="Ex.: Rio Içá, Santo Antônio do Içá – AM"
                  style={inputStyle}
                />
              </div>

              <div style={{ gridColumn: "1/-1" }}>
                <label style={labelStyle}>
                  Descrição da experiência específica <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <textarea
                  value={especifica.descricaoEspecifica}
                  onChange={e => onChangeEspecifica({ descricaoEspecifica: e.target.value })}
                  placeholder="Descreva: instituição, cargo, período (dd/mm/aaaa a dd/mm/aaaa), espécies manejadas (Pirarucu / outras), comunidades atendidas, metodologias utilizadas. Seja preciso — esta seção vale até 70 pontos na seleção."
                  style={{ ...textareaStyle, minHeight: 120 }}
                />
                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                  Esta seção corresponde a 70% da pontuação de qualificação do processo seletivo.
                </p>
              </div>
            </div>
          )}

          {especifica.possuiExperienciaEspecifica === "Nao" && (
            <div style={{ backgroundColor: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: 10, padding: "12px 16px" }}>
              <p style={{ fontSize: 12, color: "#92400e", margin: 0, lineHeight: 1.6 }}>
                <strong>Atenção:</strong> O TdR exige mínimo de 6 meses de experiência específica em manejo participativo de Pirarucu ou manejo comunitário de recursos pesqueiros com povos indígenas na Amazônia. Candidatos sem essa experiência não atendem ao perfil mínimo do processo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
