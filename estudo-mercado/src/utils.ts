import { EstudoMercadoForm } from "./types";

export const INITIAL_FORM_STATE: EstudoMercadoForm = {
  identificacao: {
    nomeCompleto: "",
    nacionalidade: "Brasileira",
    documentoIdentidade: "",
    paisCidadeResidencia: "",
    tipoPessoa: "",
    dataCotacao: new Date().toISOString().split("T")[0],
  },
  formacao: {
    cursoFormacao: "",
    instituicaoEnsino: "",
    nivelMaisAlto: "",
    conformidadeFormacao: "",
  },
  experienciaGeral: {
    totalMesesExperiencia: "",
    dataObtencaoDiploma: "",
    conformidadeExperienciaGeral: "",
  },
  experienciaEspecifica: {
    mesesExperienciaAmazonia: "",
    possuiExperienciaAmazonia: "",
    experiencia1: { entidade: "", periodo: "", funcao: "" },
    experiencia2: { entidade: "", periodo: "", funcao: "" },
    conformidadeExperienciaEspecifica: "",
  },
  outrosCriterios: {
    areasExperiencia: [],
    disponibilidadeDeslocamento: "",
    outrosCriteriosAdicionais: "",
    portfolioUrl: "",
    portfolioFileName: "",
    portfolioFileData: "",
  },
  honorarios: {
    descricaoServico: "Serviços de Antropologia para o Projeto GEF Putumayo-Içá conforme Termos de Referência.",
    valorMensalUSD: "",
    valorTotalUSD: "",
    valorMensalBRL: "",
    valorTotalBRL: "",
    inclusos: [],
    prazoValidadeProposta: "60 dias",
  },
  taxaAdministrativa: {
    taxaAdministrativa: "0",
    observacoesTaxa: "",
  },
  concordoDeclaracao: false,
};

export function validateSection(section: string, data: EstudoMercadoForm): string[] {
  const errors: string[] = [];

  if (section === "identificacao") {
    const id = data.identificacao;
    if (!id.nomeCompleto.trim()) errors.push("Nome completo é obrigatório.");
    if (!id.nacionalidade.trim()) errors.push("Nacionalidade é obrigatória.");
    if (!id.documentoIdentidade.trim()) errors.push("Documento de identidade (CPF ou Passaporte) é obrigatório.");
    if (!id.paisCidadeResidencia.trim()) errors.push("País e cidade de residência são obrigatórios.");
    if (!id.tipoPessoa) {
      errors.push("Tipo de pessoa para faturamento é obrigatório.");
    } else if (id.tipoPessoa === "PF") {
      errors.push("Pessoa Física (CPF) não é aceita para esta contratação (regra do TdR). É exigido Pessoa Jurídica.");
    }
    if (!id.dataCotacao) errors.push("Data da cotação é obrigatória.");
  }

  if (section === "formacao") {
    const f = data.formacao;
    if (!f.cursoFormacao.trim()) errors.push("Curso / área de formação é obrigatório.");
    if (!f.instituicaoEnsino.trim()) errors.push("Instituição de ensino é obrigatória.");
    if (!f.nivelMaisAlto) errors.push("Nível mais alto concluído é obrigatório.");
    if (!f.conformidadeFormacao.trim()) errors.push("Justificativa de conformidade da formação com o TdR é obrigatória.");
  }

  if (section === "experienciaGeral") {
    const eg = data.experienciaGeral;
    if (eg.totalMesesExperiencia === "" || Number(eg.totalMesesExperiencia) < 0) {
      errors.push("Total de meses de experiência profissional é obrigatório.");
    } else if (Number(eg.totalMesesExperiencia) < 24) {
      errors.push("Atenção: O TdR exige no mínimo 24 meses de experiência profissional geral.");
    }
    if (!eg.dataObtencaoDiploma.trim()) errors.push("Data de obtenção do diploma é obrigatória.");
    if (!eg.conformidadeExperienciaGeral.trim()) errors.push("Explicar como atende ao mínimo de 24 meses é obrigatório.");
  }

  if (section === "experienciaEspecifica") {
    const ee = data.experienciaEspecifica;
    if (!ee.possuiExperienciaAmazonia) {
      errors.push("Selecione se possui experiência com povos indígenas na Amazônia.");
    }
    if (ee.mesesExperienciaAmazonia === "" || Number(ee.mesesExperienciaAmazonia) < 0) {
      errors.push("Total de meses de experiência específica na Amazônia é obrigatório.");
    } else if (Number(ee.mesesExperienciaAmazonia) < 12) {
      errors.push("Atenção: O TdR exige no mínimo 12 meses de experiência específica com povos indígenas na Amazônia.");
    }
    if (!ee.experiencia1.entidade.trim() || !ee.experiencia1.funcao.trim() || !ee.experiencia1.periodo.trim()) {
      errors.push("A primeira experiência relevante deve ser preenchida (Entidade, Período e Função).");
    }
    if (!ee.conformidadeExperienciaEspecifica.trim()) errors.push("Explicar como atende ao mínimo de 12 meses de experiência específica é obrigatório.");
  }

  if (section === "outrosCriterios") {
    const oc = data.outrosCriterios;
    if (!oc.disponibilidadeDeslocamento) errors.push("Informe a disponibilidade para deslocamentos fluviais.");
  }

  if (section === "honorarios") {
    const h = data.honorarios;
    if (!h.descricaoServico.trim()) errors.push("Descrição do serviço ofertado é obrigatória.");
    if (!h.valorMensalUSD.trim()) errors.push("Valor mensal em USD é obrigatório (use 0 se cotar apenas em BRL).");
    if (!h.valorTotalUSD.trim()) errors.push("Valor total em USD é obrigatório (use 0 se cotar apenas em BRL).");
    if (!h.valorMensalBRL.trim()) errors.push("Valor mensal em BRL é obrigatório.");
    if (!h.valorTotalBRL.trim()) errors.push("Valor total para 6 meses em BRL é obrigatório.");
    if (!h.prazoValidadeProposta.trim()) errors.push("Prazo de validade da proposta é obrigatório.");
  }

  if (section === "taxa") {
    const t = data.taxaAdministrativa;
    if (!t.taxaAdministrativa.trim()) errors.push("Informe a taxa de administração (coloque 0 se não se aplicar).");
  }

  if (section === "declaracao") {
    if (!data.concordoDeclaracao) errors.push("É obrigatório manifestar concordância com a Declaração de Veracidade e faturamento.");
  }

  return errors;
}

export function formatFormToText(data: EstudoMercadoForm): string {
  const line = "=========================================================";
  return `ESTUDO DE MERCADO — ANTROPÓLOGO(A)
PROJETO GEF PUTUMAYO-IÇÁ
Instituto de Etno Desenvolvimento NGUTAPA
Vila Bethania SAI, Santo Antônio do Içá – AM

Sede do Cargo: Vila Bethania SAI, Santo Antônio do Içá – AM
Data de Referência da Cotação: ${data.identificacao.dataCotacao}

${line}
1. IDENTIFICAÇÃO DO(A) PROFISSIONAL
${line}
• Nome Completo: ${data.identificacao.nomeCompleto}
• Nacionalidade: ${data.identificacao.nacionalidade}
• CPF/Passaporte: ${data.identificacao.documentoIdentidade}
• País e Cidade de Residência: ${data.identificacao.paisCidadeResidencia}
• Tipo de Pessoa para Emissão de Fatura: ${data.identificacao.tipoPessoa === "PJ" ? "Pessoa Jurídica (Exigido pelo TdR)" : "Pessoa Física (Não aceito)"}
• Data da Cotação: ${data.identificacao.dataCotacao}

${line}
2. FORMAÇÃO ACADÊMICA
${line}
• Curso / Área de Formação: ${data.formacao.cursoFormacao}
• Instituição de Ensino: ${data.formacao.instituicaoEnsino}
• Nível Mais Alto Concluído: ${data.formacao.nivelMaisAlto}
• Justificativa de Conformidade (Formação):
  "${data.formacao.conformidadeFormacao}"

${line}
3. EXPERIÊNCIA GERAL
${line}
• Total de Meses de Experiência desde o Diploma: ${data.experienciaGeral.totalMesesExperiencia} meses
• Data da Colação de Grau / Diploma (mês/ano): ${data.experienciaGeral.dataObtencaoDiploma}
• Como atende ao requisito de no mínimo 24 meses gerais:
  "${data.experienciaGeral.conformidadeExperienciaGeral}"

${line}
4. EXPERIÊNCIA ESPECÍFICA (Povos Indígenas / Comunidades Tradicionais na Amazônia)
${line}
• Experiência com Povos Indígenas na Amazônia? ${data.experienciaEspecifica.possuiExperienciaAmazonia}
• Meses de Experiência Específica na Amazônia: ${data.experienciaEspecifica.mesesExperienciaAmazonia} meses (Mínimo TdR: 12 meses)
• Experiência Relevante 1:
  - Entidade: ${data.experienciaEspecifica.experiencia1.entidade}
  - Período: ${data.experienciaEspecifica.experiencia1.periodo}
  - Função: ${data.experienciaEspecifica.experiencia1.funcao}
${data.experienciaEspecifica.experiencia2.entidade ? `• Experiência Relevante 2:
  - Entidade: ${data.experienciaEspecifica.experiencia2.entidade}
  - Período: ${data.experienciaEspecifica.experiencia2.periodo}
  - Função: ${data.experienciaEspecifica.experiencia2.funcao}` : '• Experiência Relevante 2: Não informada'}
• Como atende ao requisito de no mínimo 12 meses específicos:
  "${data.experienciaEspecifica.conformidadeExperienciaEspecifica}"

${line}
5. OUTROS CRITÉRIOS (DESEJÁVEIS)
${line}
• Áreas de Experiência Comprovada: ${data.outrosCriterios.areasExperiencia.length > 0 ? data.outrosCriterios.areasExperiencia.join(", ") : "Nenhuma selecionada"}
• Disponibilidade para deslocamentos fluviais: ${data.outrosCriterios.disponibilidadeDeslocamento}
• Link de Portfólio / LinkedIn: ${data.outrosCriterios.portfolioUrl || "Não informado"}
• Arquivo PDF de Exemplos de Trabalho: ${data.outrosCriterios.portfolioFileName ? `${data.outrosCriterios.portfolioFileName} (Base64 codificado no formulário)` : "Não enviado"}
• Outros Critérios Adicionais / Observações:
  "${data.outrosCriterios.outrosCriteriosAdicionais || "Nenhum"}"

${line}
6. HONORÁRIOS (ESTUDO DE MERCADO)
${line}
• Descrição do serviço ofertado: ${data.honorarios.descricaoServico}
• Valor Mensal Pretendido (USD): ${data.honorarios.valorMensalUSD || "0.00"} USD
• Valor Total Pretendido para 6 meses (USD): ${data.honorarios.valorTotalUSD || "0.00"} USD
• Valor Mensal Pretendido (BRL): ${data.honorarios.valorMensalBRL || "0.00"} BRL
• Valor Total Pretendido para 6 meses (BRL): ${data.honorarios.valorTotalBRL || "0.00"} BRL
• O valor acima inclui: ${data.honorarios.inclusos.length > 0 ? data.honorarios.inclusos.join(", ") : "Nenhum dos itens assinalados (cotização limpa)"}
• Prazo de validade desta proposta: ${data.honorarios.prazoValidadeProposta}

${line}
7. TAXA ADMINISTRATIVA
${line}
• Taxa Administrativa Aplicada (%): ${data.taxaAdministrativa.taxaAdministrativa}%
• Observações sobre a taxa administrativa:
  "${data.taxaAdministrativa.observacoesTaxa || "Nenhuma"}"

${line}
DECLARAÇÃO DE VERACIDADE
${line}
Declaro que:
1. Todas as informações prestadas são verdadeiras e podem ser comprovadas mediante solicitação legal.
2. Os honorários propostos refletem minha prática habitual de mercado para o escopo descrito no TdR.
3. Compreendo que este formulário é utilizado estritamente para fins de pesquisa de mercado pelo Instituto de Etno Desenvolvimento NGUTAPA e NÃO constitui uma proposta ou contrato de trabalho direto.

Concordância manifestada eletronicamente: ${data.concordoDeclaracao ? "SIM (Manuscrito / Assinado Digitalmente)" : "NÃO"}
Gerado via Aplicativo Oficial de Pesquisa de Mercado de Antropologia - NGUTAPA.
`;
}
