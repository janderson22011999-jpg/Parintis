import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({ apiKey });
    console.log("Gemini API initialized successfully.");
  } else {
    console.warn("GEMINI_API_KEY not configured. AI assistance will be disabled.");
  }
} catch (error) {
  console.error("Failed to initialize Gemini API:", error);
}

app.post("/api/improve-text", async (req, res) => {
  if (!ai) {
    return res.status(503).json({ error: "Serviço de IA temporariamente indisponível (Chave de API não configurada)." });
  }

  const { text, field, contextInfo } = req.body;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "O texto original é obrigatório." });
  }

  let prompt = "";
  if (field === "formacao") {
    prompt = `Melhore e formalize o seguinte parágrafo que explica como a formação acadêmica do candidato atende aos requisitos do TdR (Diploma em Antropologia, Ciências Sociais ou áreas afins).
Requisitos: Diploma em Antropologia, Ciências Sociais ou áreas afins.
Texto original do candidato: "${text}"
Contexto acadêmico preenchido: ${JSON.stringify(contextInfo)}`;
  } else if (field === "experienciaGeral") {
    prompt = `Aprimore e formalize o seguinte texto justificando como a experiência profissional geral do candidato atende ao requisito mínimo de 24 meses do TdR.
Requisito: Experiência profissional geral mínima de 24 meses.
Texto original do candidato: "${text}"
Meses totais de experiência informados: ${contextInfo?.totalMeses || "Não informado"}`;
  } else if (field === "experienciaEspecifica") {
    prompt = `Aprimore e formate de maneira profissional a justificativa de como a experiência profissional específica do candidato atende ao requisito de 12 meses com povos indígenas ou comunidades tradicionais na Amazônia.
Requisito: Experiência específica mínima de 12 meses com povos indígenas ou comunidades tradicionais na Amazônia.
Texto original do candidato: "${text}"
Meses na Amazônia informados: ${contextInfo?.mesesAmazonia || "Não informado"}
Experiências destacadas: ${JSON.stringify(contextInfo?.experiencias || [])}`;
  } else {
    prompt = `Melhore a redação técnico-profissional do seguinte texto para uma pesquisa de mercado governamental/ONG. Torne-o formal, claro e focado em competências para atuar como antropólogo no projeto GEF Putumayo-Içá: "${text}"`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "Você é um consultor especializado em redação técnica de projetos sociais, governamentais e de cooperação internacional (Banco Mundial / GEF / Instituto NGUTAPA). Seu objetivo é ajudar um(a) Antropólogo(a) a aprimorar suas próprias justificativas de conformidade de maneira profissional, elegante, clara, coerente e formal, em português nativo de alta qualidade. ATENÇÃO: NÃO invente qualificações, diplomas, instituições, meses ou fatos que não estejam explícitos no texto do candidato. Melhore apenas a forma, gramática, clareza e vocabulário técnico acadêmico. Mantenha a resposta com o texto aprimorado direto, sem explicações extras.",
        temperature: 0.2,
      },
    });

    const resultText = response.text || "";
    return res.json({ refinedText: resultText.trim() });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({ error: "Erro ao processar o aprimoramento por IA: " + error.message });
  }
});

app.post("/api/generate-cover-letter", async (req, res) => {
  if (!ai) {
    return res.status(503).json({ error: "Serviço de IA indisponível." });
  }

  const { formData } = req.body;
  if (!formData) {
    return res.status(400).json({ error: "Dados do formulário são necessários." });
  }

  const prompt = `Gere uma breve carta de apresentação ou e-mail de encaminhamento formal baseado nas respostas do Estudo de Mercado preenchido pelo Antropólogo(a).
Dados do candidato:
- Nome: ${formData.identificacao?.nomeCompleto}
- Nacionalidade: ${formData.identificacao?.nacionalidade}
- Residência: ${formData.identificacao?.paisCidadeResidencia}
- Faturamento: ${formData.identificacao?.tipoPessoa === "PJ" ? "Pessoa Jurídica (CNPJ)" : "Pessoa Física"}
- Formação: ${formData.formacao?.cursoFormacao}, ${formData.formacao?.instituicaoEnsino} (${formData.formacao?.nivelMaisAlto})
- Experiência Geral: ${formData.experienciaGeral?.totalMesesExperiencia} meses.
- Experiência Específica na Amazônia: ${formData.experienciaEspecifica?.mesesExperienciaAmazonia} meses.
- Áreas com experiência: ${formData.outrosCriterios?.areasExperiencia?.join(", ") || "Nenhuma"}
- Proposta de Honorários Mensais: ${formData.honorarios?.valorMensalBRL} BRL (${formData.honorarios?.valorMensalUSD} USD)
- Validade Proposta: ${formData.honorarios?.prazoValidadeProposta}

A carta deve se dirigir ao 'Instituto de Etno Desenvolvimento NGUTAPA' referente ao projeto 'UTÜʼÜ Y ITCHÁ – O Encantado Içá'. O e-mail de destino é Institutongutapatikuna@gmail.com.
Escreva uma mensagem formal de e-mail pronta para ser copiada e enviada.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "Você é um assessor de redação técnica. Escreva uma mensagem de e-mail de encaminhamento formal, limpa, sem rodeios e no tom institucional adequado de comunicação com o Instituto de Etno Desenvolvimento NGUTAPA e Banco Mundial.",
        temperature: 0.5,
      },
    });

    const resultText = response.text || "";
    return res.json({ coverLetter: resultText.trim() });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({ error: "Erro ao gerar a carta: " + error.message });
  }
});

async function boot() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

boot().catch((err) => {
  console.error("Failed to boot server:", err);
});
