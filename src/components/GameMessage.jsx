export default function GameMessage({ message, type = 'info' }) {
  if (!message) return null;

  let bgColor = 'bg-blue-500/90';
  let borderColor = 'border-blue-400';

  if (type === 'success' || message.includes('win') || message.includes('BLACKJACK')) {
    bgColor = 'bg-green-500/90';
    borderColor = 'border-green-400';
  } else if (type === 'error' || message.includes('lose') || message.includes('BUST')) {
    bgColor = 'bg-red-500/90';
    borderColor = 'border-red-400';
  } else if (message.includes('Push') || message.includes('tie')) {
    bgColor = 'bg-yellow-500/90';
    borderColor = 'border-yellow-400';
  }

  return (
    <div className={`${bgColor} ${borderColor} px-6 py-3 rounded-lg border-2 shadow-xl text-white font-bold text-lg sm:text-xl text-center`}>
      {message}
    </div>
  );
}
