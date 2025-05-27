import prisma from '../../../../lib/prisma';
import { verifyToken } from '../../../../lib/auth'; // Importar a função de verificação de token

export default async function handler(req, res) {
  const { id } = req.query; // ID da partida

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // Verificar autenticação e obter dados do usuário logado
  let decoded;
  try {
    decoded = verifyToken(req); // Use a função existente para verificar o token
  } catch (error) {
    return res.status(401).json({ message: error.message }); // Token inválido ou ausente
  }

  const { winnerTeam } = req.body; // Espera receber { winnerTeam: 'team1' } ou { winnerTeam: 'team2' }

  if (!winnerTeam || (winnerTeam !== 'team1' && winnerTeam !== 'team2')) {
    return res.status(400).json({ message: 'Time vencedor inválido.' });
  }

  try {
    // Buscar a partida
    const match = await prisma.match.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!match) {
      return res.status(404).json({ message: 'Partida não encontrada.' });
    }

    // Verificar se o usuário logado é o criador da partida (o capitão)
    if (match.creatorId !== decoded.id) {
      return res.status(403).json({ message: 'Apenas o criador da partida pode definir o vencedor.' });
    }

    // Verificar se o vencedor já foi definido
    if (match.winner) {
        return res.status(400).json({ message: 'O vencedor para esta partida já foi definido.' });
    }

    // Atualizar a partida com o time vencedor
    const updatedMatch = await prisma.match.update({
      where: {
        id: String(id),
      },
      data: {
        winner: winnerTeam,
        status: 'completed', // Opcional: Marcar partida como completa
      },
    });

    // TODO: Adicionar lógica para atualizar pontos/KD dos jogadores no banco aqui, se necessário, com base no vencedor.
    // Isso exigiria saber quais jogadores estavam em cada time, o que não está no modelo Match atualmente.

    res.status(200).json({ message: 'Vencedor da partida definido com sucesso.', updatedMatch });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao definir o vencedor.' });
  }
} 