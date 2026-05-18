import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const count = await prisma.signature.count();
    return res.json({ count });
  } catch {
    return res.status(500).json({ error: 'Erro ao buscar contagem' });
  }
}
