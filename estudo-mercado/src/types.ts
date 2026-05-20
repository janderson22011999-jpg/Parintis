export interface FormacaoAcademica {
  cursoFormacao: string;
  instituicaoEnsino: string;
  nivelMaisAlto: "Graduação" | "Especialização" | "Mestrado" | "Doutorado" | "";
  conformidadeFormacao: string;
}

export interface ExperienciaGeral {
  totalMesesExperiencia: number | "";
  dataObtencaoDiploma: string;
  conformidadeExperienciaGeral: string;
}

export interface ExperienciaItem {
  entidade: string;
  periodo: string;
  funcao: string;
}

export interface ExperienciaEspecifica {
  mesesExperienciaAmazonia: number | "";
  possuiExperienciaAmazonia: "Sim" | "Não" | "";
  experiencia1: ExperienciaItem;
  experiencia2: ExperienciaItem;
  conformidadeExperienciaEspecifica: string;
}

export interface OutrosCriterios {
  areasExperiencia: string[];
  disponibilidadeDeslocamento: "Sim, total" | "Sim, parcial" | "Não" | "";
  outrosCriteriosAdicionais: string;
  portfolioUrl?: string;
  portfolioFileName?: string;
  portfolioFileData?: string;
}

export interface Honorarios {
  descricaoServico: string;
  valorMensalUSD: string;
  valorTotalUSD: string;
  valorMensalBRL: string;
  valorTotalBRL: string;
  inclusos: string[];
  prazoValidadeProposta: string;
}

export interface TaxaAdministrativa {
  taxaAdministrativa: string;
  observacoesTaxa: string;
}

export interface Identizicao {
  nomeCompleto: string;
  nacionalidade: string;
  documentoIdentidade: string;
  paisCidadeResidencia: string;
  tipoPessoa: "PJ" | "PF" | "";
  dataCotacao: string;
}

export interface EstudoMercadoForm {
  identificacao: Identizicao;
  formacao: FormacaoAcademica;
  experienciaGeral: ExperienciaGeral;
  experienciaEspecifica: ExperienciaEspecifica;
  outrosCriterios: OutrosCriterios;
  honorarios: Honorarios;
  taxaAdministrativa: TaxaAdministrativa;
  concordoDeclaracao: boolean;
}

export const ATIVIDADES_PRINCIPAIS_TDR = [
  "Orientar atividades interculturais respeitando protocolos culturais dos povos Magüta/Tikuna e Kokama",
  "Registrar saberes tradicionais, histórias orais, rituais, línguas e expressões artísticas para o Museu Tchirugüne",
  "Apoiar a constituição dos Conselhos da Cultura das comunidades indígenas",
  "Ampliar atividades do Museu ao território com jovens, mulheres artesãs e pajés",
  "Acompanhar atividades interculturais de conhecimento tradicional (plantas medicinais, pajelança)",
  "Apoiar workshops intergeracionais envolvendo os povos Kokama, Witoto, Kaixana e Tikuna/Magüta",
  "Integrar conhecimento tradicional às estratégias dos Guardiões da Bacia",
  "Fortalecer o Museu Tchirugüne como área de pesquisa comunitária",
  "Participar das reuniões do NGUTAPA e entregar plano de trabalho inicial"
];

export const AREAS_DESEJAVEIS = [
  "Etnografia",
  "Mapeamento participativo",
  "Conhecimento tradicional",
  "Gestão cultural/museu",
  "Governança territorial",
  "Projetos GEF/Banco Mundial",
  "Registro audiovisual",
  "CLPI/consulta indígena"
];

export const INCLUSOS_OPCOES = [
  "INSS",
  "IRRF",
  "Deslocamento",
  "Alimentação",
  "Hospedagem"
];
