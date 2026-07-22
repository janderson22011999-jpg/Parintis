import { RequisitosInfo } from "./types";

export interface EditalRequisitosItem {
  key: keyof RequisitosInfo;
  label: string;
  desc: string;
}

export interface EditalConfig {
  id: string;
  titulo: string;
  subprojeto: string;
  processo: string;
  prazo: string;
  duracao: string;
  periodoExecucao: string;
  linkTdr: string;
  storageKey: string;
  perfilMinimo: { title: string; text: string }[];
  criteriosPontuacao: { pts: string; label: string; desc: string }[];
  expEspecificaTitulo: string;
  expEspecificaPergunta: string;
  expEspecificaPlaceholder: string;
  expEspecificaAlerta: string;
  expEspecificaValidacaoMsg: string;
  expEspecificaDescMsg: string;
  expEspecificaSufixo: string;
  requisitosItems: EditalRequisitosItem[];
  declaracaoEditalDesc: string;
  emailAssuntoPrefix: string;
  emailVaga: string;
  emailSubprojeto: string;
  emailProcesso: string;
  emailSecaoEspecificaTitulo: string;
  emailEspecificaPerguntaLabel: string;
}

export const EDITAIS_CONFIG: Record<string, EditalConfig> = {
  "eng-pesca-2026": {
    id: "eng-pesca-2026",
    titulo: "Engenheiro(a) de Pesca",
    subprojeto: "Guardiões dos Peixes do Rio Içá",
    processo: "SDC-NGUTUPA-C2-ENG-01-2026",
    prazo: "01/07/2026",
    duracao: "8 meses",
    periodoExecucao: "Jul/2026 – Fev/2027",
    linkTdr: "https://drive.google.com/file/d/13V2KXA4jS0KtPsZQvyiWP_yyTDrpf6KC/view?usp=sharing",
    storageKey: "ngutapa_eng_pesca_2026_v2",
    perfilMinimo: [
      { title: "Formação Acadêmica", text: "Diploma em Engenharia de Pesca, Biologia, Engenharia Ambiental, Ciências Agrárias ou núcleos básicos afins." },
      { title: "Experiência Profissional", text: "Mínimo de 6 meses de experiência profissional, contados a partir da obtenção do diploma universitário." },
      { title: "Experiência Específica", text: "Mínimo de 6 meses em manejo participativo de Pirarucu (Arapaima gigas) e/ou manejo comunitário com povos indígenas na Amazônia." },
      { title: "Desejável", text: "Manuseio de equipamentos eletrônicos, deslocamentos fluviais em áreas remotas, coleta de dados em campo, pacote Office e coordenação de equipes." },
    ],
    criteriosPontuacao: [
      { pts: "até 20 pts", label: "Formação adicional (pós-grad)", desc: "Especialização = 8 pts · Mestrado = 12 pts" },
      { pts: "até 70 pts", label: "Experiência específica acima do mínimo", desc: "Candidato com maior experiência recebe 70; demais proporcionalmente" },
      { pts: "1–10 pts",   label: "Entrevista", desc: "Convocados os melhores classificados na fase anterior" },
    ],
    expEspecificaTitulo: "Experiência Específica em Manejo Pesqueiro",
    expEspecificaPergunta: "Possui experiência em manejo participativo de Pirarucu e/ou manejo comunitário de recursos pesqueiros com povos indígenas ou comunidades tradicionais na Amazônia?",
    expEspecificaPlaceholder: "Descreva: instituição, cargo, período (dd/mm/aaaa a dd/mm/aaaa), espécies manejadas (Pirarucu / outras), comunidades atendidas, metodologias utilizadas. Seja preciso — esta seção vale até 70 pontos na seleção.",
    expEspecificaAlerta: "Atenção: O TdR exige mínimo de 6 meses de experiência específica em manejo participativo de Pirarucu ou manejo comunitário de recursos pesqueiros com povos indígenas na Amazônia. Candidatos sem essa experiência não atendem ao perfil mínimo do processo.",
    expEspecificaValidacaoMsg: "Informe se possui experiência específica em manejo pesqueiro comunitário na Amazônia.",
    expEspecificaDescMsg: "Descreva sua experiência específica em manejo pesqueiro / Pirarucu.",
    expEspecificaSufixo: "meses em manejo pesqueiro comunitário",
    requisitosItems: [
      { key: "disponibilidadeFluvial", label: "Deslocamentos fluviais em áreas remotas", desc: "Disponibilidade e capacidade para viagens de barco em comunidades ribeirinhas de difícil acesso." },
      { key: "dominioColetaDados",     label: "Coleta de dados em campo", desc: "Domínio básico de ferramentas de coleta de dados em campo (fichas, GPS, apps de monitoramento)." },
      { key: "dominioOffice",          label: "Pacote Office", desc: "Conhecimento em Word, Excel e PowerPoint para elaboração de relatórios técnicos." },
      { key: "coordenacaoEquipes",     label: "Coordenação de equipes comunitárias", desc: "Experiência em facilitar processos participativos e coordenar grupos em comunidades indígenas ou tradicionais." },
      { key: "manuseioEquipamentos",   label: "Manuseio de equipamentos eletrônicos", desc: "Capacidade de operar equipamentos de monitoramento, câmeras e dispositivos de coleta de dados digitais." },
    ],
    declaracaoEditalDesc: "Declaro que li e aceito as condições do Edital SDC-NGUTUPA-C2-ENG-01-2026, incluindo escopo, cronograma, forma de pagamento e critérios de seleção.",
    emailAssuntoPrefix: "Engenheiro de Pesca",
    emailVaga: "Engenheiro(a) de Pesca",
    emailSubprojeto: "Guardiões dos Peixes do Rio Içá",
    emailProcesso: "SDC-NGUTUPA-C2-ENG-01-2026",
    emailSecaoEspecificaTitulo: "EXPERIÊNCIA ESPECÍFICA EM MANEJO PESQUEIRO",
    emailEspecificaPerguntaLabel: "Possui experiência em manejo de Pirarucu / pesca comunitária com povos indígenas na Amazônia",
  },

  "geografo-2026": {
    id: "geografo-2026",
    titulo: "Geógrafo(a)",
    subprojeto: "UTÜ'Ü Y ITCHÁ – O Encantado Içá",
    processo: "003/2026",
    prazo: "31/07/2026",
    duracao: "2 meses",
    periodoExecucao: "Jul/2026 – Ago/2026",
    linkTdr: "https://drive.google.com/file/d/1CZpDQ_I2KdfnYKObR3bOx4cECbo84UT8/view?usp=sharing",
    storageKey: "ngutapa_geografo_2026_v1",
    perfilMinimo: [
      { title: "Formação Acadêmica", text: "Diploma universitário em Geografia, Cartografia, Engenharia de Agrimensura, Ciências Ambientais ou núcleos básicos afins." },
      { title: "Experiência Profissional", text: "Mínimo de 6 meses de experiência profissional, contados a partir da obtenção do diploma universitário." },
      { title: "Experiência Específica", text: "Mínimo de 6 meses de experiência em mapeamento participativo, geoprocessamento e/ou cartografia social com comunidades tradicionais ou indígenas." },
      { title: "Desejável", text: "Manuseio de equipamentos eletrônicos (GPS, dispositivos de coleta de dados); domínio de ODK, KoboToolbox ou similares; disponibilidade para deslocamentos fluviais em áreas remotas. Candidaturas de pessoas pertencentes a povos indígenas ou com experiência comunitária equivalente são especialmente valorizadas." },
    ],
    criteriosPontuacao: [
      { pts: "até 20 pts", label: "Formação adicional (pós-grad)", desc: "Especialização = 8 pts · Mestrado = 12 pts" },
      { pts: "até 70 pts", label: "Experiência específica acima do mínimo", desc: "Candidato com maior experiência recebe 70; demais proporcionalmente" },
      { pts: "1–10 pts",   label: "Entrevista", desc: "Convocados os melhores classificados na fase anterior" },
    ],
    expEspecificaTitulo: "Experiência Específica em Mapeamento Participativo e Geoprocessamento",
    expEspecificaPergunta: "Possui experiência em mapeamento participativo, geoprocessamento e/ou cartografia social com comunidades tradicionais ou indígenas?",
    expEspecificaPlaceholder: "Descreva: instituição, cargo, período (dd/mm/aaaa a dd/mm/aaaa), tipo de mapeamento ou geoprocessamento realizado, comunidades atendidas, ferramentas utilizadas (QGIS, GPS, KoboToolbox, ODK ou similares). Seja preciso — esta seção vale até 70 pontos na seleção.",
    expEspecificaAlerta: "Atenção: O TdR exige mínimo de 6 meses de experiência em mapeamento participativo, geoprocessamento e/ou cartografia social com comunidades tradicionais ou indígenas. Candidatos sem essa experiência não atendem ao perfil mínimo do processo.",
    expEspecificaValidacaoMsg: "Informe se possui experiência específica em mapeamento participativo, geoprocessamento ou cartografia social com comunidades tradicionais ou indígenas.",
    expEspecificaDescMsg: "Descreva sua experiência específica em mapeamento participativo / geoprocessamento com comunidades tradicionais ou indígenas.",
    expEspecificaSufixo: "meses em mapeamento participativo / geoprocessamento",
    requisitosItems: [
      { key: "manuseioEquipamentos",   label: "Manuseio de equipamentos eletrônicos", desc: "Capacidade de operar GPS, câmeras, tablets e outros dispositivos utilizados em campo para coleta georreferenciada de dados." },
      { key: "dominioColetaDados",     label: "Domínio de ferramentas de coleta de dados (ODK, KoboToolbox ou similares)", desc: "Experiência com plataformas digitais de campo para formulários e registros georreferenciados durante as oficinas de mapeamento participativo." },
      { key: "disponibilidadeFluvial", label: "Disponibilidade para deslocamentos fluviais em áreas remotas", desc: "Disponibilidade e capacidade para viagens de barco e permanência prolongada em comunidades ribeirinhas de difícil acesso na bacia do Rio Içá." },
      { key: "coordenacaoEquipes",     label: "Pertencimento a povo indígena ou experiência comunitária equivalente", desc: "Candidaturas de pessoas pertencentes a povos indígenas ou com experiência comunitária equivalente à experiência profissional formal são especialmente valorizadas, com possibilidade de pontuação adicional." },
    ],
    declaracaoEditalDesc: "Declaro que li e aceito as condições do TdR Geógrafo(a) — Processo 003/2026 — Instituto NGUTAPA, incluindo escopo, cronograma, forma de pagamento e critérios de seleção.",
    emailAssuntoPrefix: "Geógrafo",
    emailVaga: "Geógrafo(a)",
    emailSubprojeto: "UTÜ'Ü Y ITCHÁ – O Encantado Içá",
    emailProcesso: "003/2026",
    emailSecaoEspecificaTitulo: "EXPERIÊNCIA ESPECÍFICA EM MAPEAMENTO PARTICIPATIVO E GEOPROCESSAMENTO",
    emailEspecificaPerguntaLabel: "Possui experiência em mapeamento participativo, geoprocessamento e/ou cartografia social com comunidades tradicionais ou indígenas",
  },

  "antropologo-2026": {
    id: "antropologo-2026",
    titulo: "Antropólogo(a)",
    subprojeto: "UTÜ'Ü Y ITCHÁ – O Encantado Içá",
    processo: "003/2026",
    prazo: "10/07/2026",
    duracao: "6 meses",
    periodoExecucao: "Jul/2026 – Dez/2026",
    linkTdr: "https://drive.google.com/file/d/111n7fe_TwdWKzRHhqXHS1c4GXSvPVf71/view?usp=sharing",
    storageKey: "ngutapa_antropologo_2026_v1",
    perfilMinimo: [
      { title: "Formação Acadêmica", text: "Diploma universitário em Antropologia, Ciências Sociais ou disciplinas afins." },
      { title: "Experiência Profissional", text: "Mínimo de 6 meses de experiência profissional, contados a partir da obtenção do diploma universitário." },
      { title: "Experiência Específica", text: "Mínimo de 6 meses em pesquisa de campo, diagnóstico participativo ou trabalho direto com povos indígenas, comunidades tradicionais ou organizações do terceiro setor na Amazônia." },
      { title: "Desejável", text: "Experiência em etnografia, mapeamento participativo ou registro de conhecimento tradicional com povos indígenas; domínio de ODK, KoboToolbox ou similares; disponibilidade para deslocamentos fluviais em áreas remotas." },
    ],
    criteriosPontuacao: [
      { pts: "até 20 pts", label: "Formação adicional (pós-grad)", desc: "Especialização = 8 pts · Mestrado = 12 pts" },
      { pts: "até 70 pts", label: "Experiência específica em pesquisa com povos indígenas", desc: "Candidato com maior experiência recebe 70; demais proporcionalmente" },
      { pts: "1–10 pts",   label: "Entrevista", desc: "Convocados os melhores classificados na fase anterior" },
    ],
    expEspecificaTitulo: "Experiência Específica com Povos Indígenas",
    expEspecificaPergunta: "Possui experiência em pesquisa de campo, diagnóstico participativo ou trabalho direto com povos indígenas, comunidades tradicionais ou organizações do terceiro setor na Amazônia?",
    expEspecificaPlaceholder: "Descreva: instituição, cargo, período (dd/mm/aaaa a dd/mm/aaaa), tipo de pesquisa ou diagnóstico realizado, povos/comunidades atendidos, metodologias utilizadas (etnografia, mapeamento participativo, etc.). Seja preciso — esta seção vale até 70 pontos na seleção.",
    expEspecificaAlerta: "Atenção: O TdR exige mínimo de 6 meses de experiência em pesquisa de campo, diagnóstico participativo ou trabalho com povos indígenas ou comunidades tradicionais na Amazônia. Candidatos sem essa experiência não atendem ao perfil mínimo do processo.",
    expEspecificaValidacaoMsg: "Informe se possui experiência específica em pesquisa de campo / diagnóstico participativo com povos indígenas na Amazônia.",
    expEspecificaDescMsg: "Descreva sua experiência específica em pesquisa de campo / trabalho com povos indígenas.",
    expEspecificaSufixo: "meses em pesquisa de campo com povos indígenas",
    requisitosItems: [
      { key: "disponibilidadeFluvial", label: "Deslocamentos fluviais em áreas remotas", desc: "Disponibilidade para viagens de barco em comunidades ribeirinhas de difícil acesso, com permanência prolongada em campo." },
      { key: "dominioColetaDados",     label: "Ferramentas digitais de campo (ODK, KoboToolbox ou similares)", desc: "Domínio de plataformas de coleta de dados para formulários e registros etnográficos em campo." },
      { key: "dominioOffice",          label: "Pacote Office e produção de relatórios", desc: "Conhecimento em Word, Excel e PowerPoint para elaboração de relatórios técnicos e sistematização de dados qualitativos." },
      { key: "coordenacaoEquipes",     label: "Etnografia, mapeamento participativo ou registro de saberes", desc: "Experiência em metodologias etnográficas, mapeamento participativo ou registro de conhecimento tradicional com povos indígenas." },
      { key: "manuseioEquipamentos",   label: "Produção fotográfica e audiovisual", desc: "Capacidade de registrar atividades culturais, rituais e histórias orais por meio de fotografia e vídeo digital." },
    ],
    declaracaoEditalDesc: "Declaro que li e aceito as condições do TdR Antropólogo(a) — Processo 003/2026 — Instituto NGUTAPA, incluindo escopo, cronograma, forma de pagamento e critérios de seleção.",
    emailAssuntoPrefix: "Antropólogo",
    emailVaga: "Antropólogo(a)",
    emailSubprojeto: "UTÜ'Ü Y ITCHÁ – O Encantado Içá",
    emailProcesso: "003/2026",
    emailSecaoEspecificaTitulo: "EXPERIÊNCIA ESPECÍFICA COM POVOS INDÍGENAS",
    emailEspecificaPerguntaLabel: "Possui experiência em pesquisa de campo / diagnóstico participativo com povos indígenas ou comunidades tradicionais na Amazônia",
  },
};

export const DEFAULT_CONFIG = EDITAIS_CONFIG["eng-pesca-2026"];
