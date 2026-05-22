export type Lote = "A" | "B";

export interface ItemDefinition {
  id: number;
  descricao: string;
  quantidade: number;
  unidade: string;
  especificacoes: string;
}

export interface ItemCotacao {
  marcaModelo: string;
  precoUnitarioBRL: string;
  precoUnitarioUSD: string;
  observacoes: string;
}

export interface FornecedorInfo {
  razaoSocial: string;
  cnpj: string;
  responsavel: string;
  email: string;
  telefone: string;
  cidadeEstado: string;
  dataCotacao: string;
}

export interface CondicoesCotacao {
  prazoEntrega: string;
  validadeProposta: string;
  incluiImpostos: boolean;
  incluiFrete: boolean;
  observacoesGerais: string;
  concordaDeclaracao: boolean;
}

export interface CotacaoForm {
  lote: Lote;
  fornecedor: FornecedorInfo;
  itens: ItemCotacao[];
  condicoes: CondicoesCotacao;
}

export const LOTE_A_ITEMS: ItemDefinition[] = [
  { id: 1, descricao: "Notebook / Laptop", quantidade: 4, unidade: "Unidade",
    especificacoes: "Processador Intel Core i5 ou superior, 16 GB RAM, SSD 512 GB, tela 14\", Windows 11 Pro. Compatível com pacote Office e ferramentas de gestão de projetos." },
  { id: 2, descricao: "Impressora Multifuncional", quantidade: 2, unidade: "Unidade",
    especificacoes: "Jato de tinta colorida, cópia/scan/impressão, conectividade Wi-Fi, bandeja A4. Compatível com cartuchos recarregáveis (EcoTank ou similar)." },
  { id: 3, descricao: "Celular Institucional Smartphone", quantidade: 3, unidade: "Unidade",
    especificacoes: "Android 12 ou superior, câmera mínima de 48 MP, bateria 5000 mAh, 128 GB armazenamento interno. Resistência à umidade desejável." },
  { id: 4, descricao: "Microfone Condensador Direcional", quantidade: 2, unidade: "Unidade",
    especificacoes: "Conexão USB e P2 (3,5 mm), padrão cardioide, suporte de mesa incluso. Compatível com notebooks e câmeras para gravação de reuniões e registros audiovisuais." },
  { id: 5, descricao: "Antena de Internet (STARLINK)", quantidade: 2, unidade: "Kit",
    especificacoes: "Kit completo Starlink: antena, modem, roteador Wi-Fi, cabo. Banda mínima 100 Mbps. Suporte de instalação e fonte de alimentação inclusos." },
  { id: 6, descricao: "Kit de Placa Solar", quantidade: 1, unidade: "Kit",
    especificacoes: "Painel solar mín. 200 W, controladora de carga, bateria 12 V 100 Ah+, inversor, cabos e conectores. Autonomia mínima 8 h sem sol." },
];

export const LOTE_B_ITEMS: ItemDefinition[] = [
  { id: 1, descricao: "Projetor Multimídia", quantidade: 2, unidade: "Unidade",
    especificacoes: "Mín. 3.000 lúmens, HDMI e USB, resolução mínima HD (1280×720). Portátil com bolsa de transporte." },
  { id: 2, descricao: "Tela de Projeção Retrátil", quantidade: 2, unidade: "Unidade",
    especificacoes: "100 polegadas, suporte por tripé ou parede, superfície fosca branca. Fácil montagem e desmontagem para uso em campo." },
  { id: 3, descricao: "Tela de LED Portátil", quantidade: 1, unidade: "Unidade",
    especificacoes: "Mínimo 65 polegadas, Full HD (1920×1080), HDMI e USB, suporte incluso." },
  { id: 4, descricao: "Drone com Câmera", quantidade: 1, unidade: "Unidade",
    especificacoes: "Câmera 4K, estabilização gimbal, GPS com retorno automático, autonomia mín. 20 min/voo. 2 baterias e estojo de transporte inclusos." },
  { id: 5, descricao: "Câmera Fotográfica Semiprofissional", quantidade: 1, unidade: "Unidade",
    especificacoes: "DSLR ou mirrorless, mín. 24 MP, lente 18-55 mm inclusa, 2 baterias recarregáveis e estojo." },
  { id: 6, descricao: "Caixa de Som Amplificada Portátil", quantidade: 2, unidade: "Unidade",
    especificacoes: "Mín. 150 W RMS, Bluetooth e entrada P10, bateria interna recarregável, resistente à umidade." },
  { id: 7, descricao: "Refletor de LED", quantidade: 6, unidade: "Unidade",
    especificacoes: "100 W, IP65, 6500 K (luz branca). Para iluminação de eventos e espaços externos do Museu Tchirugüne." },
  { id: 8, descricao: "Câmera de Segurança IP", quantidade: 4, unidade: "Unidade",
    especificacoes: "Full HD 1080p, Wi-Fi, visão noturna IR, IP66, fonte de alimentação inclusa." },
];
