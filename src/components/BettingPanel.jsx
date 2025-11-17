'use client';

import { useState } from 'react';
import { MIN_BET } from '../constants/gameSettings';

export default function BettingPanel({ balance, onPlaceBet, disabled = false }) {
  const [currentBet, setCurrentBet] = useState(MIN_BET);
  const chipValues = [5, 10, 25, 100, 200];

  const handleChipClick = (value) => {
    setCurrentBet(prev => Math.min(prev + value, balance));
  };

  const setBetHalf = () => {
    setCurrentBet(Math.floor(balance / 2));
  };

  const setBetDouble = () => {
    setCurrentBet(prev => Math.min(prev * 2, balance));
  };

  const setBetMax = () => {
    setCurrentBet(balance);
  };

  const clearBet = () => {
    setCurrentBet(MIN_BET);
  };

  const handleDeal = () => {
    if (currentBet >= MIN_BET && currentBet <= balance) {
      onPlaceBet(currentBet);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
      <div className="text-center">
        <p className="text-sm text-gray-400">Balance</p>
        <p className="text-2xl font-bold text-green-400">₪ {balance.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2 bg-gray-900 px-6 py-3 rounded-lg border border-gray-600">
        <span className="text-gray-400">Bet:</span>
        <span className="text-xl font-bold text-white">₪ {currentBet.toFixed(2)}</span>
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        {chipValues.map((value) => {
          const chipColors = {
            5: 'from-red-500 via-red-600 to-red-700',
            10: 'from-blue-500 via-blue-600 to-blue-700',
            25: 'from-green-500 via-green-600 to-green-700',
            100: 'from-gray-800 via-gray-900 to-black',
            200: 'from-purple-500 via-purple-600 to-purple-700'
          };

          return (
            <button
              key={value}
              onClick={() => handleChipClick(value)}
              disabled={disabled || currentBet + value > balance}
              className={`relative w-16 h-16 rounded-full font-bold text-white shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-br ${chipColors[value]} border-4 border-white/20`}
            >
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/30" style={{padding: '6px'}} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center leading-tight">
                  <div className="text-xs opacity-80">₪</div>
                  <div className="text-lg font-black">{value}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <button
          onClick={setBetHalf}
          disabled={disabled}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded disabled:opacity-50"
        >
          1/2
        </button>
        <button
          onClick={setBetDouble}
          disabled={disabled || currentBet * 2 > balance}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded disabled:opacity-50"
        >
          2x
        </button>
        <button
          onClick={setBetMax}
          disabled={disabled}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded disabled:opacity-50"
        >
          Max
        </button>
        <button
          onClick={clearBet}
          disabled={disabled}
          className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-sm rounded disabled:opacity-50"
        >
          Clear
        </button>
      </div>

      <button
        onClick={handleDeal}
        disabled={disabled || currentBet < MIN_BET || currentBet > balance}
        className="w-full px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Deal
      </button>
    </div>
  );
}
