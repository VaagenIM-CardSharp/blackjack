'use client';

import useGameState from '../hooks/useGameState';
import useGameActions from '../hooks/useGameActions';
import Hand from './Hand';
import GameControls from './GameControls';
import BettingPanel from './BettingPanel';
import GameMessage from './GameMessage';
import Tutorial from './Tutorial';
import { canDoubleDown } from '../utils/game/gameLogic';
import { calculateHandValue } from '../utils/game/hand';

export default function GameBoard() {
  const gameState = useGameState();
  const { playerHand, dealerHand, balance, gamePhase, message } = gameState;

  const actions = useGameActions(gameState);
  const { placeBet, hit, stand, doubleDown, newRound } = actions;

  const canDouble = gamePhase === 'playing' && canDoubleDown(playerHand);
  const playerHandValue = playerHand.length > 0 ? calculateHandValue(playerHand).value : 0;

  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-between p-4 sm:p-8">
      <Tutorial />

      <header className="text-center mb-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
          Blackjack
        </h1>
        <div className="text-gray-400 text-sm">
          Blackjack pays 3:2 • Dealer stands on 17
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl flex flex-col justify-between gap-6">
        <div className="bg-green-800/40 rounded-xl p-4 sm:p-6 border border-green-700/50">
          {dealerHand.length > 0 ? (
            <Hand
              cards={dealerHand}
              title="Dealer"
              hideFirstCard={gamePhase === 'playing'}
              showValue={true}
            />
          ) : (
            <div className="text-center text-gray-500 py-8">
              Waiting...
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <GameMessage message={message} />
        </div>

        <div className="bg-green-800/40 rounded-xl p-4 sm:p-6 border border-green-700/50">
          {playerHand.length > 0 ? (
            <Hand
              cards={playerHand}
              title="You"
              hideFirstCard={false}
              showValue={true}
            />
          ) : (
            <div className="text-center text-gray-500 py-8">
              place bet plz
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {gamePhase === 'betting' && (
            <BettingPanel
              balance={balance}
              onPlaceBet={placeBet}
              disabled={gamePhase !== 'betting'}
            />
          )}

          {(gamePhase === 'playing' || gamePhase === 'gameOver') && (
            <div className="flex flex-col gap-4 items-center">
              <GameControls
                onHit={hit}
                onStand={stand}
                onDoubleDown={doubleDown}
                onNewRound={newRound}
                gamePhase={gamePhase}
                canDoubleDown={canDouble}
                playerHandValue={playerHandValue}
              />
              {gamePhase === 'playing' && (
                <div className="text-center">
                  <p className="text-sm text-gray-400">Current Bet</p>
                  <p className="text-xl font-bold text-green-400">₪ {gameState.currentBet.toFixed(2)}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="text-center mt-4">
        <div className="bg-slate-700 px-6 py-2 rounded-full">
          <span className="text-gray-400">Balance: </span>
          <span className="text-green-400 font-bold">₪ {balance.toFixed(2)}</span>
        </div>
      </footer>
    </div>
  );
}
