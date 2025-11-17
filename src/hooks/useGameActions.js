'use client';

import { useCallback } from 'react';
import {
  initializeGame,
  dealInitialCards,
  hit as hitCard,
  playDealerTurn,
  determineWinner,
  canDoubleDown as checkCanDoubleDown
} from '../utils/game/gameLogic.js';
import {
  validateBet,
  calculateWinnings,
  updateBalance
} from '../utils/game/betting.js';
import { isBust, isBlackjack, calculateHandValue } from '../utils/game/hand.js';

function useGameActions(gameState) { // hver function er basically common sense og snakker for segselv
  const {
    balance,
    currentBet,
    deck,
    playerHand,
    dealerHand,
    setBalance,
    setCurrentBet,
    setDeck,
    setPlayerHand,
    setDealerHand,
    setGamePhase,
    setMessage,
    setHasDoubled,
    resetGame
  } = gameState;

  const placeBet = useCallback((betAmount) => {
    const validation = validateBet(betAmount, balance);

    if (!validation.isValid) {
      setMessage(validation.error);
      return false;
    }

    setCurrentBet(betAmount);
    setMessage('');

    const newDeck = initializeGame();
    const { playerHand: newPlayerHand, dealerHand: newDealerHand, deck: remainingDeck } = dealInitialCards(newDeck);

    setDeck(remainingDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);

    if (isBlackjack(newPlayerHand)) {
      if (isBlackjack(newDealerHand)) {
        setMessage('Push! Both have Blackjack');
        setGamePhase('gameOver');
        const winnings = calculateWinnings('push', betAmount);
        setBalance(updateBalance(balance, betAmount, winnings));
      } else {
        setMessage('BLACKJACK! You win!');
        setGamePhase('gameOver');
        const winnings = calculateWinnings('playerBlackjack', betAmount);
        setBalance(updateBalance(balance, betAmount, winnings));
      }
    } else if (isBlackjack(newDealerHand)) {
      setMessage('Dealer has Blackjack. You lose.');
      setGamePhase('gameOver');
      setBalance(updateBalance(balance, betAmount, 0));
    } else {
      setGamePhase('playing');
    }

    return true;
  }, [balance, setCurrentBet, setMessage, setDeck, setPlayerHand, setDealerHand, setGamePhase, setBalance]);

  const hit = useCallback(() => { 
    if (deck.length === 0) return;

    const { hand: newHand, deck: newDeck } = hitCard(playerHand, deck);
    setPlayerHand(newHand);
    setDeck(newDeck);

    if (isBust(newHand)) {
      setMessage('BUST! You lose.');
      setGamePhase('gameOver');
      setBalance(updateBalance(balance, currentBet, 0));
      return;
    }

    const { value } = calculateHandValue(newHand);
    if (value === 21) {
      setGamePhase('dealerTurn');

      const { dealerHand: newDealerHand, deck: finalDeck } = playDealerTurn(dealerHand, newDeck);
      setDealerHand(newDealerHand);
      setDeck(finalDeck);

      const outcome = determineWinner(newHand, newDealerHand);
      const winnings = calculateWinnings(outcome, currentBet);
      const newBalance = updateBalance(balance, currentBet, winnings);

      setBalance(newBalance);
      setGamePhase('gameOver');

      switch (outcome) {
        case 'playerWin':
          setMessage('You win!');
          break;
        case 'dealerWin':
          setMessage('Dealer wins.');
          break;
        case 'push':
          setMessage('Push! It\'s a tie.');
          break;
        default:
          setMessage('');
      }
    }
  }, [deck, playerHand, dealerHand, currentBet, balance, setPlayerHand, setDealerHand, setDeck, setMessage, setGamePhase, setBalance]);

  const stand = useCallback(() => {
    setGamePhase('dealerTurn');

    const { dealerHand: newDealerHand, deck: newDeck } = playDealerTurn(dealerHand, deck);
    setDealerHand(newDealerHand);
    setDeck(newDeck);

    const outcome = determineWinner(playerHand, newDealerHand);
    const winnings = calculateWinnings(outcome, currentBet);
    const newBalance = updateBalance(balance, currentBet, winnings);

    setBalance(newBalance);
    setGamePhase('gameOver');

    switch (outcome) {
      case 'playerBlackjack':
        setMessage('BLACKJACK! You win!');
        break;
      case 'player':
        setMessage('You win!');
        break;
      case 'dealer':
        setMessage(isBust(newDealerHand) ? 'Dealer busts! You win!' : 'Dealer wins.');
        break;
      case 'push':
        setMessage('Push! It\'s a tie.');
        break;
      default:
        setMessage('');
    }
  }, [dealerHand, deck, playerHand, currentBet, balance, setDealerHand, setDeck, setGamePhase, setBalance, setMessage]);

  const doubleDown = useCallback(() => {
    if (!checkCanDoubleDown(playerHand)) {
      setMessage('Can only double down on first two cards');
      return;
    }

    if (currentBet > balance) {
      setMessage('Insufficient balance to double down');
      return;
    }

    setHasDoubled(true);

    const newBet = currentBet * 2;
    setCurrentBet(newBet);

    const { hand: newHand, deck: newDeck } = hitCard(playerHand, deck);
    setPlayerHand(newHand);
    setDeck(newDeck);

    if (isBust(newHand)) {
      setMessage('BUST! You lose.');
      setGamePhase('gameOver');
      setBalance(updateBalance(balance, newBet, 0));
      return;
    }

    // automatisk stand etter double down
    const { dealerHand: newDealerHand, deck: finalDeck } = playDealerTurn(dealerHand, newDeck);
    setDealerHand(newDealerHand);
    setDeck(finalDeck);

    // bestem vinneren
    const outcome = determineWinner(newHand, newDealerHand);
    const winnings = calculateWinnings(outcome, newBet);
    const newBalance = updateBalance(balance, newBet, winnings);

    setBalance(newBalance);
    setGamePhase('gameOver');

    // melding
    switch (outcome) {
      case 'player':
        setMessage('You win!');
        break;
      case 'dealer':
        setMessage('Dealer wins.');
        break;
      case 'push':
        setMessage('Push! It\'s a tie.');
        break;
      default:
        setMessage('');
    }
  }, [playerHand, currentBet, balance, deck, dealerHand, setHasDoubled, setCurrentBet, setPlayerHand, setDeck, setDealerHand, setGamePhase, setBalance, setMessage]);

  const newRound = useCallback(() => {
    resetGame();
  }, [resetGame]);

  return {
    placeBet,
    hit,
    stand,
    doubleDown,
    newRound
  };
}

export default useGameActions;
