import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/api/register' : '/api/login';
    try {
      const res = await axios.post(endpoint, { nickname, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao autenticar');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">STARS LEAGUE</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-80">
        <input
          type="text"
          placeholder="ID (nickname)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700"
          required
        />
        <button type="submit" className="w-full bg-yellow-500 py-2 rounded font-bold">
          {isRegister ? 'Cadastrar' : 'Entrar'}
        </button>
        <p
          className="mt-4 text-sm text-center cursor-pointer text-blue-400"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
        </p>
      </form>
    </div>
  );
}
