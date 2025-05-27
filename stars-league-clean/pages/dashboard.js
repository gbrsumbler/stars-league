import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    axios.get('/api/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setUser(res.data))
      .catch(() => router.push('/'));
  }, []);

  const handleCreateMatch = async () => {
    try {
      const res = await axios.post('/api/match', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      router.push(`/partida/${res.data.id}`);
    } catch (err) {
      alert('Erro ao criar partida');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Painel do Jogador</h1>
      {user && (
        <div className="mb-6">
          <p><strong>ID:</strong> {user.nickname}</p>
          <p><strong>K/D:</strong> {user.kd}</p>
          <p><strong>Pontos:</strong> {user.points}</p>
        </div>
      )}
      <button
        onClick={handleCreateMatch}
        className="bg-yellow-500 px-4 py-2 rounded font-bold"
      >
        Criar Partida
      </button>
    </div>
  );
}
