import { useState } from 'react';

function SetupScreen({ playerNames, setPlayerNames, onStart, onBack }) {
  const [chaosMode, setChaosMode] = useState(false);
  const handleNameChange = (index, value) => {
    const newPlayers = [...playerNames];
    newPlayers[index] = value;
    setPlayerNames(newPlayers);
  };

  const addPlayer = () => {
    if (playerNames.length < 12) {
      setPlayerNames([...playerNames, '']);
    }
  };

  const removePlayer = () => {
    if (playerNames.length > 3) {
      const newPlayers = [...playerNames];
      newPlayers.pop();
      setPlayerNames(newPlayers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalPlayers = playerNames.map((name, i) => name.trim() || `Player ${i + 1}`);
    onStart(finalPlayers, chaosMode);
  };

  return (
    <div className="glass-card" id="setup-screen" style={{ paddingTop: '4rem' }}>
      <button 
        type="button" 
        className="btn btn-outline" 
        onClick={onBack}
        style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem', marginBottom: 0 }}
      >
        <span className="icon" style={{ marginRight: '4px' }}>◀</span> Back
      </button>

      <h1><span className="icon">⚽</span>The Impostor</h1>
      <p>Enter the names of the players to begin the ultimate game of deception.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-container">
            {playerNames.map((name, i) => (
              <input 
                key={i}
                type="text" 
                className="input-field" 
                value={name} 
                onChange={(e) => handleNameChange(i, e.target.value)}
                placeholder={`🕵️ Player ${i + 1} Name`}
                required
              />
            ))}
          </div>
        </div>
        
        <div className="flex-row">
          <button type="button" className="btn btn-outline" onClick={addPlayer} disabled={playerNames.length >= 12}>
            ➕ Add
          </button>
          <button type="button" className="btn btn-outline" onClick={removePlayer} disabled={playerNames.length <= 3}>
            ➖ Remove
          </button>
        </div>

        <div style={{ marginBottom: '1.5rem', textAlign: 'left', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={chaosMode} 
              onChange={() => setChaosMode(!chaosMode)} 
              style={{ marginRight: '10px', transform: 'scale(1.5)' }} 
            />
            <span style={{ fontSize: '1.1rem' }}>🌪️ Enable Chaos Mode</span>
          </label>
          <p style={{ fontSize: '0.85rem', marginTop: '8px', marginBottom: 0, color: 'var(--text-secondary)' }}>
            (Rare 10% chance: EVERY player receives a completely different football player!)
          </p>
        </div>

        <button type="submit" className="btn btn-primary pulse">
          <span className="icon">🎮</span> Start Game
        </button>
      </form>
    </div>
  );
}

export default SetupScreen;
