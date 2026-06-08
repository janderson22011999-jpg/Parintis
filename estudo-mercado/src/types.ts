export interface CandidatoForm {
  identificacao: IdentificacaoInfo;
  formacao: FormacaoInfo;
  experienciaGeral: ExperienciaGeralInfo;
  experienciaEspecifica: ExperienciaEspecificaInfo;
  requisitos: RequisitosInfo;
  declaracoes: DeclaracoesInfo;
}

export interface IdentificacaoInfo {
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  cidadeEstado: string;
  linkedinLattes: string;
}

export interface FormacaoInfo {
  cursoGraduacao: string;
  instituicaoGraduacao: string;
  anoConclusaoGraduacao: string;
  posGraduacao: "Nao" | "Especializacao" | "Mestrado" | "Doutorado";
  areaPosGraduacao: string;
  instituicaoPosGraduacao: string;
  anoConclusaoPosGraduacao: string;
}

export interface ExperienciaGeralInfo {
  totalMesesExperiencia: string;
  descricaoExperiencias: string;
}

export interface ExperienciaEspecificaInfo {
  possuiExperienciaEspecifica: "Sim" | "Nao" | "";
  totalMesesEspecifica: string;
  descricaoEspecifica: string;
  regiaoAtuacao: string;
}

export interface RequisitosInfo {
  disponibilidadeFluvial: boolean;
  dominioColetaDados: boolean;
  dominioOffice: boolean;
  coordenacaoEquipes: boolean;
  manuseioEquipamentos: boolean;
  observacoesAdicionais: string;
}

export interface DeclaracoesInfo {
  aceitaTermos: boolean;
  informacoesAutenticas: boolean;
  aceitaPoliticasFraude: boolean;
}

export const EMPTY_FORM: CandidatoForm = {
  identificacao: {
    nomeCompleto: "", cpf: "", email: "", telefone: "",
    cidadeEstado: "", linkedinLattes: "",
  },
  formacao: {
    cursoGraduacao: "", instituicaoGraduacao: "", anoConclusaoGraduacao: "",
    posGraduacao: "Nao", areaPosGraduacao: "",
    instituicaoPosGraduacao: "", anoConclusaoPosGraduacao: "",
  },
  experienciaGeral: {
    totalMesesExperiencia: "",
    descricaoExperiencias: "",
  },
  experienciaEspecifica: {
    possuiExperienciaEspecifica: "",
    totalMesesEspecifica: "",
    descricaoEspecifica: "",
    regiaoAtuacao: "",
  },
  requisitos: {
    disponibilidadeFluvial: false,
    dominioColetaDados: false,
    dominioOffice: false,
    coordenacaoEquipes: false,
    manuseioEquipamentos: false,
    observacoesAdicionais: "",
  },
  declaracoes: {
    aceitaTermos: false,
    informacoesAutenticas: false,
    aceitaPoliticasFraude: false,
  },
};
