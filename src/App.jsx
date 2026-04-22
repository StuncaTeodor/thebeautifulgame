import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import SetupScreen from './components/SetupScreen';
import PassPlayScreen from './components/PassPlayScreen';
import DiscussionScreen from './components/DiscussionScreen';
import GuessPlayerGame from './components/GuessPlayerGame';
import { footballPlayers } from './data/footballPlayers';

function App() {
  const [selectedGame, setSelectedGame] = useState(null); // null, 'impostor'
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'discussion'
  const [players, setPlayers] = useState([]);
  const [playerNames, setPlayerNames] = useState(['', '', '']);
  const [playedFootballPlayers, setPlayedFootballPlayers] = useState([]);
  const [isChaosRound, setIsChaosRound] = useState(false);
  
  const startGame = (playerNamesArray, chaosModeEnabled) => {
    const impostorIndex = Math.floor(Math.random() * playerNamesArray.length);
    const isChaos = chaosModeEnabled && Math.random() < 0.1;
    setIsChaosRound(isChaos);
    
    if (isChaos) {
      // Pick N different football players
      let availableForChaos = footballPlayers.filter(p => !playedFootballPlayers.includes(p.name));
      if (availableForChaos.length < playerNamesArray.length) {
         availableForChaos = footballPlayers; 
         setPlayedFootballPlayers([]);
      }
      
      const shuffled = [...availableForChaos].sort(() => 0.5 - Math.random());
      const selectedPlayers = shuffled.slice(0, playerNamesArray.length);
      
      setPlayedFootballPlayers(prev => [...prev, ...selectedPlayers.map(p => p.name)]);
      
      const newPlayers = playerNamesArray.map((name, index) => {
        if (index === impostorIndex) {
          return {
            id: index + 1,
            name: name,
            role: 'Impostor',
            clue: selectedPlayers[index].clue,
            playerName: selectedPlayers[index].name
          };
        }
        return {
          id: index + 1,
          name: name,
          role: 'Crewmate',
          playerName: selectedPlayers[index].name
        };
      });
      setPlayers(newPlayers);
    } else {
      let availablePlayers = footballPlayers.filter(p => !playedFootballPlayers.includes(p.name));
      if (availablePlayers.length === 0) {
        availablePlayers = footballPlayers;
        setPlayedFootballPlayers([]);
      }
      
      const targetPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
      
      setPlayedFootballPlayers(prev => {
        if (prev.length >= footballPlayers.length) return [targetPlayer.name];
        return [...prev, targetPlayer.name];
      });
      
      const newPlayers = playerNamesArray.map((name, index) => {
        if (index === impostorIndex) {
          return {
            id: index + 1,
            name: name,
            role: 'Impostor',
            clue: targetPlayer.clue,
            playerName: targetPlayer.name
          };
        }
        return {
          id: index + 1,
          name: name,
          role: 'Crewmate',
          playerName: targetPlayer.name
        };
      });
      setPlayers(newPlayers);
    }
    setGameState('playing');
  };

  const finishRoles = () => {
    setGameState('discussion');
  };
  
  const resetGame = () => {
    setGameState('setup');
    setPlayers([]);
  };

  return (
    <>
      {!selectedGame && <HomeScreen onSelectGame={setSelectedGame} />}
      
      {selectedGame === 'impostor' && gameState === 'setup' && <SetupScreen playerNames={playerNames} setPlayerNames={setPlayerNames} onStart={startGame} onBack={() => setSelectedGame(null)} />}
      {selectedGame === 'impostor' && gameState === 'playing' && <PassPlayScreen players={players} onFinish={finishRoles} />}
      {selectedGame === 'impostor' && gameState === 'discussion' && <DiscussionScreen players={players} isChaosRound={isChaosRound} onReset={resetGame} />}

      {selectedGame === 'guess-player' && <GuessPlayerGame onBack={() => setSelectedGame(null)} />}
    </>
  );
}

export default App;
