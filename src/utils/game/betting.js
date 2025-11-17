import {
  MIN_BET,
  BLACKJACK_PAYOUT,
  REGULAR_WIN_PAYOUT,
  INSURANCE_PAYOUT
} from '../../constants/gameSettings.js';

function validateBet(bet, balance) {
  if (bet < MIN_BET) {
    return {
      isValid: false,
      error: `Minimum bet is ${MIN_BET}`
    };
  }

  if (bet > balance) {
    return {
      isValid: false,
      error: 'Insufficient balance'
    };
  }

  return {
    isValid: true,
    error: null
  };
}

function calculateWinnings(outcome, bet) {
  switch (outcome) {
    case 'playerBlackjack':
      return bet + (bet * BLACKJACK_PAYOUT);
    case 'player':
      return bet + (bet * REGULAR_WIN_PAYOUT);
    case 'push':
      return bet;
    case 'dealer':
      return 0;
    default:
      return 0;
  }
}

function calculateInsuranceWinnings(dealerHasBlackjack, insuranceBet) {
  if (dealerHasBlackjack) {
    return insuranceBet * INSURANCE_PAYOUT;
  }
  return 0;
}

function updateBalance(currentBalance, bet, winnings) {
  return currentBalance - bet + winnings;
}

function getMaxBet(balance) {
  return balance;
}

function formatCurrency(amount) {
  return `₪ ${amount.toFixed(2)}`;
}

export {
  validateBet,
  calculateWinnings,
  calculateInsuranceWinnings,
  updateBalance,
  getMaxBet,
  formatCurrency
};
