import { useState, useEffect } from 'react';
import { guessPlayers } from '../data/guessPlayersData';

// Helper function to generate a valid game round
const generateRound = () => {
  // We need to find two teams that share at least one player
  let validPairs = [];
  
  for (let i = 0; i < guessPlayers.length; i++) {
    const player = guessPlayers[i];
    const teams = player.teams;
    if (teams.length >= 2) {
      // Add all pairs of teams for this player
      for (let j = 0; j < teams.length; j++) {
        for (let k = j + 1; k < teams.length; k++) {
          validPairs.push({
            team1: teams[j],
            team2: teams[k]
          });
        }
      }
    }
  }

  // Pick a random pair
  const randomPair = validPairs[Math.floor(Math.random() * validPairs.length)];
  return randomPair;
};

function GuessPlayerGame({ onBack }) {
  const [currentRound, setCurrentRound] = useState(null);
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [streak, setStreak] = useState(0);
  const [correctPlayers, setCorrectPlayers] = useState([]);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const round = generateRound();
    setCurrentRound(round);
    setGuess('');
    setStatus('playing');
    
    // Find all players who played for both teams
    const validPlayersForPair = guessPlayers.filter(p => 
      p.teams.includes(round.team1) && p.teams.includes(round.team2)
    );
    setCorrectPlayers(validPlayersForPair);
  };

  const handleGuess = (e) => {
    e.preventDefault();
    const normalizedGuess = guess.trim().toLowerCase();
    
    // Check if the guess matches ANY accepted name for ANY valid player
    const isCorrect = correctPlayers.some(player => 
      player.acceptedNames.includes(normalizedGuess)
    );

    if (isCorrect) {
      setStatus('won');
      setStreak(streak + 1);
    } else {
      // Flash red shake animation
      const input = document.getElementById('guess-input');
      input.classList.add('error-shake');
      setTimeout(() => input.classList.remove('error-shake'), 400);
    }
  };

  const handleGiveUp = () => {
    setStatus('lost');
    setStreak(0);
  };

  if (!currentRound) return null;

  return (
    <div className="glass-card" id="guess-player-screen" style={{ paddingTop: '4rem' }}>
      <button 
        type="button" 
        className="btn btn-outline" 
        onClick={onBack}
        style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem', marginBottom: 0 }}
      >
        <span className="icon" style={{ marginRight: '4px' }}>◀</span> Back
      </button>

      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--target-color)', textShadow: '0 0 10px rgba(251,191,36,0.5)' }}>
        🔥 Streak: {streak}
      </div>

      <h1><span className="icon">👕</span>Guess the Player</h1>
      <p>Name a player who has played for both of these clubs in their professional career!</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', margin: '3rem 0' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', flex: 1, textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
          {currentRound.team1}
        </div>
        <div style={{ fontSize: '2rem', color: 'var(--accent-pink)' }}>⚔️</div>
        <div style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', flex: 1, textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
          {currentRound.team2}
        </div>
      </div>
      
      {status === 'playing' && (
        <form onSubmit={handleGuess}>
          <div className="input-group">
            <input 
              id="guess-input"
              type="text" 
              className="input-field" 
              value={guess} 
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter player's shirt name..."
              required
              autoComplete="off"
            />
          </div>
          <div className="flex-row">
            <button type="submit" className="btn btn-primary pulse">
              <span className="icon">✓</span> Submit
            </button>
            <button type="button" className="btn btn-danger" onClick={handleGiveUp}>
              <span className="icon">🏳️</span> Give Up
            </button>
          </div>
        </form>
      )}

      {status === 'won' && (
        <div className="role-reveal-container" style={{ animation: 'zoomSpin 0.5s', padding: '1rem' }}>
          <h2 style={{ color: 'var(--crewmate-color)', fontSize: '2.5rem' }}>Correct! 🎉</h2>
          <p style={{ fontSize: '1.2rem' }}>You nailed it.</p>
          <button className="btn btn-primary" onClick={startNewRound} style={{ marginTop: '1rem' }}>
            Next Round ➔
          </button>
        </div>
      )}

      {status === 'lost' && (
        <div className="role-reveal-container" style={{ animation: 'slideUp 0.5s', padding: '1rem' }}>
          <h2 style={{ color: 'var(--impostor-color)' }}>Game Over! 💥</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Possible answers were:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
            {correctPlayers.map(p => (
              <div key={p.fullName} style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--target-color)' }}>
                {p.fullName}
              </div>
            ))}
          </div>
          <button className="btn btn-primary" onClick={startNewRound}>
            Try Again ➔
          </button>
        </div>
      )}
    </div>
  );
}

export default GuessPlayerGame;
