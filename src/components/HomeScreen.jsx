function HomeScreen({ onSelectGame }) {
  return (
    <div className="glass-card" id="home-screen">
      <h1><span className="icon">⚽</span>The Beautiful Game</h1>
      <p>Welcome! Choose a minigame to play with your friends.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <button className="btn btn-primary pulse" onClick={() => onSelectGame('impostor')}>
          <span className="icon">🕵️</span> The Impostor
        </button>
        <button className="btn btn-primary pulse" onClick={() => onSelectGame('guess-player')}>
          <span className="icon">👕</span> Guess the Player
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;
