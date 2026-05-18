import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { name, email, city } = req.body as { name?: string; email?: string; city?: string };

    if (!name?.trim() || !email?.trim() || !city?.trim()) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const existing = await prisma.signature.findUnique({ where: { email: email.trim() } });
      if (existing) {
        return res.status(409).json({ error: 'Este e-mail já assinou o manifesto' });
      }
      const signature = await prisma.signature.create({
        data: { name: name.trim(), email: email.trim(), city: city.trim() },
      });
      return res.status(201).json({ success: true, id: signature.id });
    } catch {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
