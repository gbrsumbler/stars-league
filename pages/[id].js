import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { maps } from '../../data/maps';

export default function Partida() {
  const router = useRouter();
  const { id } = router.query;

  const [match, setMatch] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [vetoMaps, setVetoMaps] = useState([]);
  const [currentCaptain, setCurrentCaptain] = useState('team1');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }

    axios.get(`/api/match/${id}`).then((res) => {
      setMatch({
        ...res.data,
        jogadoresDisponiveis: res.data.jogadoresDisponiveis || [],
      });
    });

  }, [id]);

  const handleSelectPlayer = (nickname) => {
    if (selectedPlayers.includes(nickname)) return;
    setSelectedPlayers([...selectedPlayers, nickname]);
    setCurrentCaptain(currentCaptain === 'team1' ? 'team2' : 'team1');
  };

  const handleVeto = (map) => {
    if (vetoMaps.includes(map)) return;
    setVetoMaps([...vetoMaps, map]);
  };

  const handleSetWinner = async (winnerTeam) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para definir o vencedor.');
      return;
    }
    try {
      const res = await axios.post(`/api/match/${id}/set-winner`, { winnerTeam }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message);
      if (res.data.updatedMatch) {
          setMatch(res.data.updatedMatch);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Erro ao definir o vencedor.');
    }
  };

  const renderImparPar = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Ímpar ou Par</h2>
      <p className="mb-4">Capitães jogam ímpar/par para decidir quem começa escolhendo.</p>
      <button onClick={() => setStep(2)} className="bg-yellow-500 px-4 py-2 rounded">
        Continuar
      </button>
    </div>
  );

  const renderSelecao = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Escolha de Jogadores</h2>
      <div className="grid grid-cols-2 gap-4">
        {match?.jogadoresDisponiveis.map((j) => (
          <button
            key={j.nickname}
            onClick={() => handleSelectPlayer(j.nickname)}
            className={`p-2 rounded border ${selectedPlayers.includes(j.nickname) ? 'bg-gray-700' : 'bg-gray-800'}`}
          >
            {j.nickname}
          </button>
        ))}
      </div>
      {selectedPlayers.length >= 10 && (
        <button onClick={() => setStep(3)} className="mt-4 bg-green-600 px-4 py-2 rounded">
          Ir para veto
        </button>
      )}
    </div>
  );

  const renderVeto = () => {
    const mapsRestantes = maps.map((m) => m.name).filter((m) => !vetoMaps.includes(m));
    const mapaFinal = mapsRestantes.length === 1 ? mapsRestantes[0] : null;

    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Veto de Mapas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mapsRestantes.map((map) => (
            <button
              key={map}
              onClick={() => handleVeto(map)}
              className="p-3 bg-gray-700 rounded hover:bg-red-700"
            >
              {map}
            </button>
          ))}
        </div>
        {mapaFinal && (
          <div className="mt-6">
            <h3 className="text-green-400 text-lg font-bold">
              Mapa final para desempate: {mapaFinal}
            </h3>
          </div>
        )}
      </div>
    );
  };

  const renderSetWinner = () => {
    const isCreator = user && match && user.id === match.creatorId;
    const winnerNotSet = match && !match.winner;

    if (!isCreator || !winnerNotSet) return null;

    return (
      <div className="mt-8 p-6 bg-gray-800 rounded">
        <h2 className="text-xl font-bold mb-4">Definir Vencedor</h2>
        <button
          onClick={() => handleSetWinner('team1')}
          className="bg-blue-600 px-4 py-2 rounded font-bold mr-4"
        >
          Time 1 Venceu
        </button>
        <button
          onClick={() => handleSetWinner('team2')}
          className="bg-red-600 px-4 py-2 rounded font-bold"
        >
          Time 2 Venceu
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Partida #{id}</h1>
      {step === 1 && renderImparPar()}
      {step === 2 && renderSelecao()}
      {step === 3 && renderVeto()}

      {match && renderSetWinner()}

    </div>
  );
}
