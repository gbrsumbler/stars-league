import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { nickname, password } = req.body;

  if (req.method !== 'POST') return res.status(405).end();

  const user = await prisma.user.findUnique({ where: { nickname } });
  if (!user) return res.status(404).json({ message: 'ID não encontrado.' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Senha incorreta.' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.status(200).json({ token });
}
