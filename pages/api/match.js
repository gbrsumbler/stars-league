import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const match = await prisma.match.create({
      data: {
        creatorId: decoded.id,
        team1: [],
        team2: [],
        maps: []
      }
    });

    res.status(200).json({ id: match.id });
  } else {
    res.status(405).end();
  }
}
