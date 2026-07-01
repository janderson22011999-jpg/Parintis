import { CandidatoForm, EMPTY_FORM } from "./types";
import { EditalConfig, DEFAULT_CONFIG } from "./edital-config";

export function makeInitialState(): CandidatoForm {
  return JSON.parse(JSON.stringify(EMPTY_FORM));
}

export function validateForm(form: CandidatoForm, config?: EditalConfig): string[] {
  const cfg = config ?? DEFAULT_CONFIG;
  const errors: string[] = [];
  const id = form.identificacao;
  if (!id.nomeCompleto.trim()) errors.push("Nome completo é obrigatório.");
  if (!id.cpf.trim()) errors.push("CPF é obrigatório.");
  if (!id.email.trim()) errors.push("E-mail é obrigatório.");
  if (!id.telefone.trim()) errors.push("Telefone / WhatsApp é obrigatório.");
  if (!id.cidadeEstado.trim()) errors.push("Cidade/Estado de residência é obrigatório.");

  const fo = form.formacao;
  if (!fo.cursoGraduacao.trim()) errors.push("Curso de graduação é obrigatório.");
  if (!fo.instituicaoGraduacao.trim()) errors.push("Instituição de graduação é obrigatória.");
  if (!fo.anoConclusaoGraduacao.trim()) errors.push("Ano de conclusão da graduação é obrigatório.");

  const eg = form.experienciaGeral;
  if (!eg.totalMesesExperiencia.trim()) errors.push("Informe o total de meses de experiência profissional.");
  else if (Number(eg.totalMesesExperiencia) < 6) errors.push("É necessário ter pelo menos 6 meses de experiência profissional (mínimo do TdR).");
  if (!eg.descricaoExperiencias.trim()) errors.push("Descreva sua experiência profissional.");

  const ee = form.experienciaEspecifica;
  if (!ee.possuiExperienciaEspecifica) errors.push(cfg.expEspecificaValidacaoMsg);
  if (ee.possuiExperienciaEspecifica === "Sim") {
    if (!ee.totalMesesEspecifica.trim()) errors.push("Informe o total de meses de experiência específica.");
    if (!ee.descricaoEspecifica.trim()) errors.push(cfg.expEspecificaDescMsg);
  }

  const d = form.declaracoes;
  if (!d.aceitaTermos) errors.push("Você deve aceitar os Termos de Referência.");
  if (!d.informacoesAutenticas) errors.push("Você deve declarar que as informações são autênticas e verificáveis.");
  if (!d.aceitaPoliticasFraude) errors.push("Você deve aceitar as Políticas de Fraude e Corrupção do Banco Mundial.");

  return errors;
}

export function formatToEmail(form: CandidatoForm, curriculoNome?: string, config?: EditalConfig): string {
  const cfg = config ?? DEFAULT_CONFIG;
  const id = form.identificacao;
  const fo = form.formacao;
  const eg = form.experienciaGeral;
  const ee = form.experienciaEspecifica;
  const re = form.requisitos;
  const sep = "=".repeat(58);

  const posGradLabel: Record<string, string> = {
    Nao: "Não possui",
    Especializacao: "Especialização",
    Mestrado: "Mestrado",
    Doutorado: "Doutorado",
  };

  const checkMark = (v: boolean) => (v ? "Sim" : "Não");

  return `MANIFESTAÇÃO DE INTERESSE — NGUTAPA
Vaga: ${cfg.emailVaga}
Processo: ${cfg.emailProcesso}
Subprojeto: ${cfg.emailSubprojeto}

${sep}
IDENTIFICAÇÃO DO CANDIDATO
${sep}
Nome Completo: ${id.nomeCompleto}
CPF: ${id.cpf}
E-mail: ${id.email}
Telefone / WhatsApp: ${id.telefone}
Cidade / Estado de Residência: ${id.cidadeEstado}
${id.linkedinLattes ? `LinkedIn / Lattes: ${id.linkedinLattes}` : ""}

${sep}
FORMAÇÃO ACADÊMICA
${sep}
Curso de Graduação: ${fo.cursoGraduacao}
Instituição: ${fo.instituicaoGraduacao}
Ano de Conclusão: ${fo.anoConclusaoGraduacao}
Pós-graduação: ${posGradLabel[fo.posGraduacao] ?? fo.posGraduacao}
${fo.posGraduacao !== "Nao" ? `Área: ${fo.areaPosGraduacao}` : ""}
${fo.posGraduacao !== "Nao" ? `Instituição Pós: ${fo.instituicaoPosGraduacao}` : ""}
${fo.posGraduacao !== "Nao" && fo.anoConclusaoPosGraduacao ? `Ano Conclusão Pós: ${fo.anoConclusaoPosGraduacao}` : ""}

${sep}
EXPERIÊNCIA PROFISSIONAL GERAL
${sep}
Total de Meses de Experiência (desde diploma): ${eg.totalMesesExperiencia} meses
Descrição:
${eg.descricaoExperiencias}

${sep}
${cfg.emailSecaoEspecificaTitulo}
${sep}
${cfg.emailEspecificaPerguntaLabel}: ${ee.possuiExperienciaEspecifica === "Sim" ? "Sim" : "Não"}
${ee.possuiExperienciaEspecifica === "Sim" ? `Total de Meses de Experiência Específica: ${ee.totalMesesEspecifica} meses` : ""}
${ee.possuiExperienciaEspecifica === "Sim" && ee.regiaoAtuacao ? `Região de Atuação: ${ee.regiaoAtuacao}` : ""}
${ee.possuiExperienciaEspecifica === "Sim" ? `Descrição:\n${ee.descricaoEspecifica}` : ""}

${sep}
REQUISITOS ADICIONAIS
${sep}
${cfg.requisitosItems.map(item => `${item.label}: ${checkMark(re[item.key] as boolean)}`).join("\n")}
${re.observacoesAdicionais ? `Observações: ${re.observacoesAdicionais}` : ""}

${sep}
DECLARAÇÕES
${sep}
Aceita os Termos de Referência: Sim
Declara que as informações são autênticas: Sim
Aceita as Políticas de Fraude e Corrupção do Banco Mundial (BIRD): Sim

Com o envio desta manifestação, o(a) candidato(a) declara que todas as
informações fornecidas são autênticas e pode apresentar os comprovantes
respectivos, caso sejam solicitados.

${sep}
CURRÍCULO
${sep}
${curriculoNome
  ? `Arquivo: ${curriculoNome}\n⚠ ATENÇÃO: Anexar o arquivo de currículo a este e-mail antes de enviar.`
  : "Nenhum arquivo de currículo foi indicado neste formulário."}
`;
}
