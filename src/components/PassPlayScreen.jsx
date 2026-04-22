import { useState } from 'react';

function PassPlayScreen({ players, onFinish }) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  const currentPlayer = players[currentPlayerIndex];

  const handleReveal = () => setIsRevealed(true);
  const handleHide = () => {
    setIsRevealed(false);
    setIsPassed(true);
  };

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setIsPassed(false);
    } else {
      onFinish();
    }
  };

  return (
    <div className="glass-card" id="pass-play-screen">
      <h2><span className="icon">📱</span> {currentPlayer.name}&apos;s Turn</h2>
      
      {!isPassed ? (
        <>
          {!isRevealed ? (
            <>
              <p>Make sure nobody else is looking at the screen. You must keep your role an absolute secret!</p>
              <button className="btn btn-primary" onClick={handleReveal} style={{marginTop: '20px'}}>
                <span className="icon">👁️</span> Reveal Role
              </button>
            </>
          ) : (
            <div className="role-reveal-container">
              <div className={`role-reveal ${currentPlayer.role === 'Impostor' ? 'role-impostor' : 'role-crewmate'}`}>
                {currentPlayer.role === 'Impostor' ? 'Impostor' : 'Crewmate'}
              </div>
              
              {currentPlayer.role === 'Impostor' ? (
                <div className="role-clue">
                  Your clue is:
                  <span className="clue-highlight role-impostor">"{currentPlayer.clue}"</span>
                </div>
              ) : (
                <div className="role-clue">
                  The target player is:
                  <span className="clue-highlight player-target">{currentPlayer.playerName}</span>
                </div>
              )}
              
              <button className="btn btn-outline" onClick={handleHide}>
                <span className="icon">🔒</span> Hide Role
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <p style={{color: 'var(--crewmate-color)', fontWeight: 'bold'}}>Role successfully secured.</p>
          {currentPlayerIndex < players.length - 1 ? (
            <p>Please pass the device entirely to <strong>{players[currentPlayerIndex + 1].name}</strong>.</p>
          ) : (
            <p>Everyone has seen their roles. It is time to deliberate.</p>
          )}
          <button className="btn btn-primary pulse" onClick={handleNextPlayer} style={{marginTop: '20px'}}>
            {currentPlayerIndex < players.length - 1 ? 'Next Player Ready' : 'Start Discussion 🗣️'}
          </button>
        </>
      )}
    </div>
  );
}

export default PassPlayScreen;
