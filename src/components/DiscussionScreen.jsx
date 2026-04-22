import { useState } from 'react';

function DiscussionScreen({ players, isChaosRound, onReset }) {
  const [showImpostor, setShowImpostor] = useState(false);
  const impostor = players.find(p => p.role === 'Impostor');

  return (
    <div className="glass-card" id="discussion-screen">
      <h1><span className="icon">⚖️</span> Tribunal</h1>
      <p>Discuss the clues, question each other, and vote to eliminate the impostor!</p>
      
      {!showImpostor ? (
        <button className="btn btn-danger pulse" onClick={() => setShowImpostor(true)} style={{marginTop: '2rem'}}>
          <span className="icon">🚨</span> Reveal Impostor
        </button>
      ) : (
        <div className="role-reveal-container">
          {isChaosRound && (
            <div className="role-reveal role-impostor" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ff0000', textShadow: '0 0 10px #ff0000' }}>
              🌪️ CHAOS ROUND! 🌪️<br/>
              <span style={{fontSize: '1.2rem', color: '#fff', textTransform: 'none'}}>Everyone actually had a completely different player!</span>
            </div>
          )}
          <div className="role-reveal role-impostor">
            {impostor.name} was the Impostor!
          </div>
          {!isChaosRound && (
            <div className="role-clue">
              The target football player was:
              <span className="clue-highlight player-target">{players.find(p => p.role !== 'Impostor').playerName}</span>
            </div>
          )}
        </div>
      )}
      
      <div style={{marginTop: '2rem'}}>
        <button className="btn btn-primary" onClick={onReset}>
          <span className="icon">🔄</span> Play Again
        </button>
      </div>
    </div>
  );
}

export default DiscussionScreen;
