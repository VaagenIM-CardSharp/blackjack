export default function Card({ rank, suit, hidden = false }) { // ai genererte korte fordi det var helt dumt og  lage selv
  const getSuitSymbol = (s) => ({ '♠️': '♠', '♣️': '♣', '♥️': '♥', '♦️': '♦' }[s] || s);

  const isRed = suit === '♥️' || suit === '♦️';
  const color = isRed ? 'text-red-500' : 'text-black';
  const symbol = getSuitSymbol(suit);

  if (hidden) {
    return (
      <div className="w-28 h-40 sm:w-32 sm:h-48 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 shadow-xl border-4 border-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
          }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-8xl opacity-30">♠</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-28 h-40 sm:w-32 sm:h-48 rounded-lg bg-white shadow-xl border-4 border-gray-400 relative">
      <div className={`absolute top-1 left-2 ${color} font-bold leading-tight select-none`}>
        <div className="text-3xl sm:text-4xl">{rank}</div>
        <div className="text-xl sm:text-2xl -mt-1">{symbol}</div>
      </div>

      <div className={`absolute inset-0 flex items-center justify-center ${color} opacity-40`}>
        <div className="text-8xl sm:text-9xl">{symbol}</div>
      </div>

      <div className={`absolute bottom-1 right-2 ${color} font-bold leading-tight rotate-180 select-none`}>
        <div className="text-3xl sm:text-4xl">{rank}</div>
        <div className="text-xl sm:text-2xl -mt-1">{symbol}</div>
      </div>
    </div>
  );
}
