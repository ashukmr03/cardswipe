import type { RewardCategory } from '../../types';

const CATEGORIES: { key: RewardCategory; label: string; emoji: string }[] = [
  { key: 'food', label: 'Food', emoji: '🍽️' },
  { key: 'travel', label: 'Travel', emoji: '✈️' },
  { key: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { key: 'upi', label: 'UPI', emoji: '📱' },
  { key: 'major_purchases', label: 'Big Purchase', emoji: '💳' },
];

interface CategoryGridProps {
  selected: RewardCategory | null;
  onSelect: (cat: RewardCategory) => void;
}

export function CategoryGrid({ selected, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {CATEGORIES.map(({ key, label, emoji }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`flex flex-col items-center justify-center py-5 rounded-2xl border text-sm font-medium transition-colors ${
            selected === key
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
          }`}
        >
          <span className="text-2xl mb-1">{emoji}</span>
          {label}
        </button>
      ))}
    </div>
  );
}
