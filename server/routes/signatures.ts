import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/count', async (_req, res) => {
  try {
    const count = await prisma.signature.count();
    res.json({ count });
  } catch {
    res.status(500).json({ error: 'Erro ao buscar contagem' });
  }
});

router.post('/', async (req, res) => {
  const { name, email, city } = req.body as { name?: string; email?: string; city?: string };

  if (!name?.trim() || !email?.trim() || !city?.trim()) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    return;
  }

  try {
    const existing = await prisma.signature.findUnique({ where: { email: email.trim() } });
    if (existing) {
      res.status(409).json({ error: 'Este e-mail já assinou o manifesto' });
      return;
    }

    const signature = await prisma.signature.create({
      data: { name: name.trim(), email: email.trim(), city: city.trim() },
    });

    res.status(201).json({ success: true, id: signature.id });
  } catch {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
