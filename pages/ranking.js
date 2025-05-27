import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Ranking() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('/api/ranking')
      .then(res => setPlayers(res.data))
      .catch(() => alert('Erro ao carregar ranking'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Ranking</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-yellow-500 border-b border-gray-600">
            <th className="p-2">#</th>
            <th className="p-2">Jogador</th>
            <th className="p-2">K/D</th>
            <th className="p-2">Pontos</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, idx) => (
            <tr key={player.id} className="border-b border-gray-700">
              <td className="p-2">{idx + 1}</td>
              <td className="p-2">{player.nickname}</td>
              <td className="p-2">{player.kd.toFixed(2)}</td>
              <td className="p-2">{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
