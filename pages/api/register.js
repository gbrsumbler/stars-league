import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { nickname, password } = req.body;

  if (req.method !== 'POST') return res.status(405).end();

  const exists = await prisma.user.findUnique({ where: { nickname } });
  if (exists) return res.status(400).json({ message: 'ID já cadastrado.' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      nickname,
      password: hashed
    }
  });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.status(200).json({ token });
}
