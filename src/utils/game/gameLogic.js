import { createDeck, shuffleDeck } from './deck.js';
import { calculateHandValue, isBlackjack, isBust } from './hand.js';
import { DEALER_HIT_THRESHOLD } from '../../constants/gameSettings.js';

function initializeGame() {
  const deck = createDeck();
  return shuffleDeck(deck);
}

function dealInitialCards(deck) {
  const newDeck = [...deck];
  const playerHand = [newDeck.pop(), newDeck.pop()];
  const dealerHand = [newDeck.pop(), newDeck.pop()];

  return {
    playerHand,
    dealerHand,
    deck: newDeck
  };
}

function hit(hand, deck) {
  const newDeck = [...deck];
  const newHand = [...hand, newDeck.pop()];

  return {
    hand: newHand,
    deck: newDeck
  };
}

function playDealerTurn(dealerHand, deck) {
  let currentHand = [...dealerHand];
  let currentDeck = [...deck];

  while (calculateHandValue(currentHand).value < DEALER_HIT_THRESHOLD) {
    const result = hit(currentHand, currentDeck);
    currentHand = result.hand;
    currentDeck = result.deck;
  }

  return {
    dealerHand: currentHand,
    deck: currentDeck
  };
}

function determineWinner(playerHand, dealerHand) {
  const playerValue = calculateHandValue(playerHand).value;
  const dealerValue = calculateHandValue(dealerHand).value;
  const playerHasBlackjack = isBlackjack(playerHand);
  const dealerHasBlackjack = isBlackjack(dealerHand);

  if (playerHasBlackjack && dealerHasBlackjack) {
    return 'push';
  }
  if (playerHasBlackjack) {
    return 'playerBlackjack';
  }
  if (dealerHasBlackjack) {
    return 'dealer';
  }

  if (isBust(playerHand)) {
    return 'dealer';
  }
  if (isBust(dealerHand)) {
    return 'player';
  }

  if (playerValue > dealerValue) {
    return 'player';
  } else if (dealerValue > playerValue) {
    return 'dealer';
  } else {
    return 'push';
  }
}

function canDoubleDown(hand) {
  return hand.length === 2;
}

function canOfferInsurance(dealerHand) {
  return dealerHand.length > 0 && dealerHand[0].rank === 'A';
}

export {
  initializeGame,
  dealInitialCards,
  hit,
  playDealerTurn,
  determineWinner,
  canDoubleDown,
  canOfferInsurance
};
