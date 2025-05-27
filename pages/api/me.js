import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).end();

  const token = auth.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) return res.status(404).end();

  res.status(200).json(user);
}
