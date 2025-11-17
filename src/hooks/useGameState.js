'use client';

import { useState } from 'react';
import { INITIAL_BALANCE } from '../constants/gameSettings.js';

function useGameState() {  // håndterer spilltilstand (duh)
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [deck, setDeck] = useState([]);
  const [gamePhase, setGamePhase] = useState('betting');
  const [currentBet, setCurrentBet] = useState(0);
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [message, setMessage] = useState('');
  const [hasDoubled, setHasDoubled] = useState(false);
  const [insuranceBet, setInsuranceBet] = useState(0);

  const resetGame = () => { // reset!
    setPlayerHand([]);
    setDealerHand([]);
    setDeck([]);
    setGamePhase('betting');
    setCurrentBet(0);
    setMessage('');
    setHasDoubled(false);
    setInsuranceBet(0);
  };

  return {
    playerHand,
    dealerHand,
    deck,
    gamePhase,
    currentBet,
    balance,
    message,
    hasDoubled,
    insuranceBet,
    setPlayerHand,
    setDealerHand,
    setDeck,
    setGamePhase,
    setCurrentBet,
    setBalance,
    setMessage,
    setHasDoubled,
    setInsuranceBet,
    resetGame
  };
}

export default useGameState;
