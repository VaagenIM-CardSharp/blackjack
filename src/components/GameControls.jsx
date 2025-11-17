export default function GameControls({
  onHit,
  onStand,
  onDoubleDown,
  onNewRound,
  gamePhase,
  canDoubleDown,
  playerHandValue = 0
}) {
  if (gamePhase === 'gameOver') {
    return (
      <div className="flex gap-3 justify-center">
        <button
          onClick={onNewRound}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg shadow-lg"
        >
          New Round
        </button>
      </div>
    );
  }

  if (gamePhase === 'playing') {
    const canHit = playerHandValue < 21;

    return (
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onHit}
          disabled={!canHit}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Hit
        </button>

        <button
          onClick={onStand}
          className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-lg shadow-lg"
        >
          Stand
        </button>

        {canDoubleDown && (
          <button
            onClick={onDoubleDown}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg"
          >
            Double
          </button>
        )}
      </div>
    );
  }

  return null;
}
