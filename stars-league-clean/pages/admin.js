import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.data.role !== 'admin') router.push('/');
      });

    axios.get('/api/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data));

    axios.get('/api/matches', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMatches(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>

      <h2 className="text-xl font-semibold mb-2">Jogadores Cadastrados</h2>
      <table className="w-full mb-8">
        <thead>
          <tr className="text-yellow-500">
            <th className="p-2">ID</th>
            <th className="p-2">Nickname</th>
            <th className="p-2">Pontos</th>
            <th className="p-2">K/D</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-gray-700">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.nickname}</td>
              <td className="p-2">{u.points}</td>
              <td className="p-2">{u.kd}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2">Partidas Criadas</h2>
      <table className="w-full">
        <thead>
          <tr className="text-yellow-500">
            <th className="p-2">ID</th>
            <th className="p-2">Status</th>
            <th className="p-2">Vencedor</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m.id} className="border-t border-gray-700">
              <td className="p-2">{m.id}</td>
              <td className="p-2">{m.status}</td>
              <td className="p-2">{m.winner || 'A definir'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
