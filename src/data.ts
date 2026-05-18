import jandersonImg from "./assets/108095.jpg";
import iraImg from "./assets/108089.jpg";
import gilvanaImg from "./assets/108093.jpg";
import rossyImg from "./assets/109943.jpg";
import autoBoiImg from "./assets/choso.jpg";
import artesanatoImg from "./assets/artesanato.jpg";
import toadaImg from "./assets/_MG_0628.jpg";
import dançaImg from "./assets/_MG_2206.jpg";
import mestreImg from "./assets/_MG_4306.jpg";
import poetaImg from "./assets/_MG_2777.jpg";
import ritualImg from "./assets/_MG_9261.jpg";

export { ritualImg };

export interface HeritageItem {
  id: string;
  title: string;
  category: "Ritual" | "Artesanato" | "Música" | "Dança";
  description: string;
  image: string;
  year: number;
  location: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  description: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export const heritageItems: HeritageItem[] = [
  {
    id: "1",
    title: "Auto do Boi-Bumbá",
    category: "Ritual",
    description: "A representação dramática da morte e ressurreição do boi, núcleo central do complexo cultural do Boi-Bumbá de Parintins.",
    image: autoBoiImg,
    year: 1913,
    location: "Parintins, AM"
  },
  {
    id: "2",
    title: "Toadas de Roda",
    category: "Música",
    description: "Cânticos ancestrais que narram as lendas da Amazônia e a vida ribeirinha, evoluindo para as toadas modernas dos bumbás.",
    image: toadaImg,
    year: 1966,
    location: "Baixa do São José"
  },
  {
    id: "3",
    title: "Artesanato em fibras de tucum",
    category: "Artesanato",
    description: "Técnicas tradicionais de tecelagem e escultura utilizando fibras naturais da palmeira de tucumã.",
    image: artesanatoImg,
    year: 1940,
    location: "Vila Amazônia"
  },
  {
    id: "4",
    title: "Dança dos Tuxauas",
    category: "Dança",
    description: "Dança ritualística que homenageia os grandes chefes indígenas, com indumentárias monumentais que chegam a 5 metros de altura.",
    image: dançaImg,
    year: 1975,
    location: "Bumbódromo"
  }
];

export const communityMembers: CommunityMember[] = [
  {
    id: "c1",
    name: "Mestre de Galpão",
    role: "Escultura",
    quote: "A madeira tem espírito; o entalhe é apenas o diálogo que temos para libertar a forma que já vive nela.",
    description: "Guardião da técnica de escultura em cedro, o Mestre dedica-se há cinco décadas à construção dos mecanismos que dão vida aos mitos da floresta.",
    image: mestreImg
  },
  {
    id: "c2",
    name: "Poeta da Toada",
    role: "Tradição Oral",
    quote: "O verso que eu canto não é meu; é o eco de todos os que vieram antes e a semente para os que ainda virão.",
    description: "Compõe versos que narram a cosmogonia local, garantindo que a memória coletiva permaneça vibrante através da rima e do ritmo ancestral.",
    image: poetaImg
  },
  {
    id: "c3",
    name: "Rossy Pontes",
    role: "Artista Plástica e Artesã",
    quote: "A arte cênica é a alma que dá vida ao boi; cada detalhe trabalhado no galpão é um pedaço da nossa história que se materializa na arena para o mundo ver.",
    description: "Integrante da equipe Cênica do Boi Caprichoso, Rossy é uma das muitas pessoas que dedicam seu talento e trabalho para que o espetáculo ganhe vida todos os anos.",
    image: rossyImg
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: "t1",
    name: "Janderson Sarmento",
    role: "Coordenador de Campanha",
    description: "Atua com incidência política e advocacy em processos de tomada de decisão, articulando o reconhecimento institucional da cultura parintinense.",
    image: jandersonImg
  },
  {
    id: "t2",
    name: "Ira Maraguá",
    role: "Ativista Comunicadora Digital",
    description: "Mobilizadora de engajamento social, utiliza as redes para amplificar as vozes da floresta e a resistência cultural do Boi-Bumbá.",
    image: iraImg
  },
  {
    id: "t3",
    name: "Gilvana Borari",
    role: "Gestão Administrativa Financeira",
    description: "Especialista em captação de recursos e membro do grupo Suraras do Tapajós, garantindo a sustentabilidade dos processos tradicionais.",
    image: gilvanaImg
  }
];
