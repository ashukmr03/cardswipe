import { PRESET_CARDS } from '../../data/presetCards';

interface PresetCardListProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export function PresetCardList({ selected, onToggle }: PresetCardListProps) {
  return (
    <div className="space-y-2">
      {PRESET_CARDS.map(card => {
        const isSelected = selected.includes(card.id);
        return (
          <button
            key={card.id}
            onClick={() => onToggle(card.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${
              isSelected
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div>
              <p className={`font-medium text-sm ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                {card.name}
              </p>
              <p className="text-xs text-gray-400">{card.bank}</p>
            </div>
            {isSelected && (
              <span className="text-blue-500 text-lg">✓</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
