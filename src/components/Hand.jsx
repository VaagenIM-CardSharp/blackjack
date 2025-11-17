import Card from './Card';
import { getHandDisplayValue } from '../utils/game/hand';

export default function Hand({ cards, title, hideFirstCard = false, showValue = true }) {
  const handValue = showValue && !hideFirstCard ? getHandDisplayValue(cards) : '?';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{title}</h3>
        {showValue && (
          <div className="px-4 py-1 bg-gray-800/70 rounded-full border border-gray-600">
            <span className="text-sm sm:text-base font-semibold text-green-400">
              {handValue}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        {cards.map((card, index) => (
          <Card
            key={`${card.rank}-${card.suit}-${index}`}
            rank={card.rank}
            suit={card.suit}
            hidden={hideFirstCard && index === 0}
          />
        ))}
      </div>
    </div>
  );
}
