import jwt from 'jsonwebtoken';

export function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth) throw new Error('Token não enviado');

  const token = auth.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}
