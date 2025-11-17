import { cardValues } from '../../constants/cards.js';

function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;

  for (const card of hand) {
    if (card.rank === 'A') {
      aces++;
    } else {
      value += cardValues[card.rank];
    }
  }

  for (let i = 0; i < aces; i++) {
    if (value + 11 <= 21) {
      value += 11;
    } else {
      value += 1;
    }
  }

  const isSoft = aces > 0 && value <= 21 && value >= 11;
  return { value, isSoft };
}

function isBlackjack(hand) {
  if (hand.length !== 2) return false;
  const { value } = calculateHandValue(hand);
  return value === 21;
}

function isBust(hand) {
  const { value } = calculateHandValue(hand);
  return value > 21;
}

function getHandDisplayValue(hand) {
  const { value, isSoft } = calculateHandValue(hand);

  if (isBust(hand)) return 'BUST';
  if (isBlackjack(hand)) return 'BLACKJACK!';

  return isSoft && value !== 21 ? `Soft ${value}` : `${value}`;
}

export {
  calculateHandValue,
  isBlackjack,
  isBust,
  getHandDisplayValue
};
