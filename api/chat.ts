import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const WHATSAPP_URL = 'https://wa.me/5592985002781';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const { messages, userMessage } = req.body as {
    messages: { role: string; content: string }[];
    userMessage: string;
  };

  if (!userMessage?.trim()) return res.status(400).json({ error: 'Mensagem vazia' });

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        ...(messages || []).map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
        { role: 'user', parts: [{ text: userMessage }] },
      ],
      config: {
        systemInstruction: `Seu nome é Tapiri e você é o assistente da campanha 'Bumbá Patrimônio Vivo'. Sua missão é ajudar usuários a navegar pelo site, fornecer informações sobre o Boi-Bumbá de Parintins (Garantido e Caprichoso) e engajá-los na petição pública para o reconhecimento oficial como Patrimônio Imaterial da Humanidade. O tom deve ser respeitoso, culturalmente sensível, porém argumentativo e firme sobre a importância deste título mundial para a Amazônia. Forneça o WhatsApp da campanha (${WHATSAPP_URL}) SOMENTE se o usuário pedir explicitamente para entrar em contato, falar com a equipe ou enviar mensagem direta — nunca de forma proativa. Responda em Português do Brasil.`,
      },
    });

    return res.status(200).json({ reply: response.text || 'Desculpe, não consegui processar sua solicitação agora.' });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
