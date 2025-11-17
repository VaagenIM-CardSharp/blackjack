'use client';

import { useState } from 'react';

export default function Tutorial() { // ai generert tutorial
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl font-bold"
        aria-label="Help"
      >
        ?
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border-2 border-gray-700">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">How to Play Blackjack</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 text-gray-200 space-y-4">
              <section>
                <h3 className="text-xl font-bold text-green-400 mb-2">Game Objective</h3>
                <p>
                  Get a hand closer to 21 than the dealer without going over 21 (bust).
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-green-400 mb-2">Card Values</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Number cards (2-10):</strong> Face value</li>
                  <li><strong>Face cards (J, Q, K):</strong> Worth 10 points</li>
                  <li><strong>Ace (A):</strong> Worth either 1 or 11 (whichever is best for the hand)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-green-400 mb-2">How to Play</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li><strong>Place bet:</strong> Select chips and click Deal</li>
                  <li><strong>Receive cards:</strong> You and the dealer each get 2 cards. One of the dealer's cards is hidden</li>
                  <li><strong>Your turn:</strong>
                    <ul className="list-disc list-inside ml-6 mt-1">
                      <li><strong>Hit:</strong> Take another card</li>
                      <li><strong>Stand:</strong> Keep your current hand</li>
                      <li><strong>Double:</strong> Double your bet, take one card, and stand automatically</li>
                    </ul>
                  </li>
                  <li><strong>Dealer's turn:</strong> Dealer draws cards until reaching 17 or higher</li>
                  <li><strong>Winner:</strong> Closest to 21 wins</li>
                </ol>
              </section>

              <section>
                <h3 className="text-xl font-bold text-green-400 mb-2">Payouts</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Blackjack (A + 10-value):</strong> 3:2 (bet × 2.5)</li>
                  <li><strong>Regular win:</strong> 1:1 (double bet)</li>
                  <li><strong>Push (tie):</strong> Get bet back</li>
                  <li><strong>Loss:</strong> Lose bet</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-green-400 mb-2">Tips</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Stand on 17 or higher (like the dealer)</li>
                  <li>Be careful when taking cards with 12-16</li>
                  <li>Double down on 10 or 11 if dealer shows a low card</li>
                  <li>Ace counts as 11 until you go over 21, then it counts as 1</li>
                </ul>
              </section>

              <section className="bg-gray-900 p-4 rounded-lg border border-gray-600">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Important Rules</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Dealer must draw to 17+</li>
                  <li>You can only double down on the first two cards</li>
                  <li>Blackjack always beats 21 with multiple cards</li>
                </ul>
              </section>
            </div>

            <div className="p-4 bg-gray-900 border-t border-gray-700">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg"
              >
                Close and Play
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
