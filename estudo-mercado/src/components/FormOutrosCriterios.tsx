import React from "react";
import { OutrosCriterios, AREAS_DESEJAVEIS } from "../types";
import { ShieldCheck, Anchor, Link as LinkIcon, FileText, UploadCloud, Trash2, Paperclip } from "lucide-react";

interface Props {
  data: OutrosCriterios;
  onChange: (updates: Partial<OutrosCriterios>) => void;
}

export function FormOutrosCriterios({ data, onChange }: Props) {
  const [fileError, setFileError] = React.useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") { setFileError("Por favor, selecione um arquivo em formato PDF."); return; }
    if (file.size > 10 * 1024 * 1024) { setFileError("O tamanho do arquivo excede o limite de 10MB."); return; }
    const reader = new FileReader();
    reader.onload = (event) => onChange({ portfolioFileName: file.name, portfolioFileData: event.target?.result as string });
    reader.onerror = () => setFileError("Erro ao ler o arquivo PDF.");
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileError("");
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") { setFileError("Por favor, envie um arquivo em formato PDF."); return; }
    if (file.size > 10 * 1024 * 1024) { setFileError("O tamanho do arquivo excede o limite de 10MB."); return; }
    const reader = new FileReader();
    reader.onload = (event) => onChange({ portfolioFileName: file.name, portfolioFileData: event.target?.result as string });
    reader.onerror = () => setFileError("Erro ao ler o arquivo PDF.");
    reader.readAsDataURL(file);
  };

  const handleToggleArea = (area: string) => {
    const list = [...data.areasExperiencia];
    const idx = list.indexOf(area);
    if (idx > -1) list.splice(idx, 1); else list.push(area);
    onChange({ areasExperiencia: list });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-green-100 pb-3 mb-2">
        <h3 className="text-lg font-sans font-semibold text-green-950 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-700" />
          5. Outros Critérios (Desejáveis)
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Assinale as competências desejáveis que valorizam suas qualificações para o cargo.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-2.5 font-semibold">
            Áreas com Experiência Comprovada <span className="text-slate-400 font-normal lowercase">(marque todas que se aplicam)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {AREAS_DESEJAVEIS.map((area) => {
              const isChecked = data.areasExperiencia.includes(area);
              return (
                <label
                  key={area}
                  htmlFor={`checkbox-area-${area.replace(/\s+/g, "-")}`}
                  className={`p-3.5 border rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                    isChecked ? "border-green-600 bg-green-50 text-green-900" : "border-slate-200 bg-white hover:border-green-200 text-slate-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`checkbox-area-${area.replace(/\s+/g, "-")}`}
                    checked={isChecked}
                    onChange={() => handleToggleArea(area)}
                    className="accent-green-600 h-4 w-4 rounded cursor-pointer"
                  />
                  <span className="text-sm font-sans">{area}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-2.5 font-semibold flex items-center gap-1.5">
            <Anchor className="w-3.5 h-3.5 text-green-700" />
            Disponibilidade para Deslocamentos Fluviais <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { val: "Sim, total", desc: "Total disponibilidade para subir rios e acampar em aldeias." },
              { val: "Sim, parcial", desc: "Disponibilidade com algumas restrições pontuais." },
              { val: "Não", desc: "Impossibilidade de realizar viagens longas de canoa/barco." },
            ].map(({ val, desc }) => (
              <label
                key={val}
                htmlFor={`deslocamento-${val.replace(/\s+/g, "-")}`}
                className={`p-4 border rounded-xl flex flex-col gap-2 transition-all cursor-pointer ${
                  data.disponibilidadeDeslocamento === val
                    ? "border-green-600 bg-green-50 ring-1 ring-green-600"
                    : "border-slate-200 bg-white hover:border-green-200"
                }`}
              >
                <input
                  type="radio" name="disponibilidadeDeslocamento"
                  id={`deslocamento-${val.replace(/\s+/g, "-")}`}
                  value={val}
                  checked={data.disponibilidadeDeslocamento === val}
                  onChange={() => onChange({ disponibilidadeDeslocamento: val as any })}
                  className="accent-green-600 h-4 w-4 cursor-pointer"
                />
                <div>
                  <span className={`text-sm font-semibold block ${data.disponibilidadeDeslocamento === val ? "text-green-900" : "text-slate-700"}`}>{val}</span>
                  <span className="text-xs text-slate-500 mt-0.5 block leading-relaxed">{desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <h4 className="text-xs font-sans uppercase tracking-wider text-slate-500 font-semibold mb-3 flex items-center gap-1.5">
            <Paperclip className="w-3.5 h-3.5 text-green-700" />
            Portfólio & Exemplos de Trabalho <span className="text-slate-400 font-normal lowercase">(Opcional)</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="input-portfolio-url" className="block text-xs font-sans uppercase tracking-wider text-slate-500 font-semibold">
                Link de Portfólio Online
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <LinkIcon className="w-4 h-4" />
                </span>
                <input
                  type="url" id="input-portfolio-url"
                  value={data.portfolioUrl || ""}
                  onChange={(e) => onChange({ portfolioUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/seu-perfil ou link de portfólio"
                  className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-sans uppercase tracking-wider text-slate-500 font-semibold">
                Exemplo de Trabalho Anterior (PDF)
              </label>
              {!data.portfolioFileName ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-green-400 hover:bg-green-50/30 transition-colors flex flex-col items-center justify-center min-h-[100px]"
                  onClick={() => document.getElementById("file-portfolio")?.click()}
                >
                  <input type="file" id="file-portfolio" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                  <UploadCloud className="w-7 h-7 text-slate-300 mb-1.5" />
                  <p className="text-xs font-sans font-medium text-slate-600">Clique ou arraste um PDF</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">PDF · máximo 10MB</p>
                </div>
              ) : (
                <div className="border border-green-200 rounded-xl p-3 bg-green-50/40 flex items-center justify-between min-h-[100px]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 bg-green-100 text-green-700 rounded-lg shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-sans font-semibold text-slate-800 truncate">{data.portfolioFileName}</p>
                      <p className="text-[10px] text-green-700 font-medium mt-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block animate-pulse"></span>
                        Documento anexado
                      </p>
                    </div>
                  </div>
                  <button type="button" onClick={() => onChange({ portfolioFileName: "", portfolioFileData: "" })}
                    className="p-1 px-2.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-all flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remover
                  </button>
                </div>
              )}
              {fileError && <p className="text-xs text-red-500 mt-1">{fileError}</p>}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="textarea-outros-criterios" className="block text-xs font-sans uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Outros critérios relevantes <span className="text-slate-400 font-normal lowercase">(Opcional)</span>
          </label>
          <textarea
            id="textarea-outros-criterios"
            rows={3}
            value={data.outrosCriteriosAdicionais}
            onChange={(e) => onChange({ outrosCriteriosAdicionais: e.target.value })}
            placeholder="Ex: Conhecimento intermediário da língua Tikuna, vivência prévia em comunidades ribeirinhas no Amazonas, etc."
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
