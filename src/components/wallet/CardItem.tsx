import { useState } from 'react';
import type { CreditCard } from '../../types';
import { EditCardModal } from './EditCardModal';

interface CardItemProps {
  card: CreditCard;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<CreditCard>) => void;
}

export function CardItem({ card, onRemove, onUpdate }: CardItemProps) {
  const [showEdit, setShowEdit] = useState(false);

  function handleRemove() {
    if (window.confirm(`Remove ${card.name}?`)) {
      onRemove(card.id);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-white">
        <div>
          <p className="font-medium text-sm text-gray-800">{card.name}</p>
          <p className="text-xs text-gray-400">{card.bank}</p>
        </div>
        <div className="flex gap-2">
          {card.isCustom && (
            <button
              onClick={() => setShowEdit(true)}
              className="text-xs text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleRemove}
            className="text-xs text-red-400 px-2 py-1 rounded-lg hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      </div>

      {showEdit && (
        <EditCardModal
          card={card}
          onSave={(updates) => { onUpdate(card.id, updates); setShowEdit(false); }}
          onCancel={() => setShowEdit(false)}
        />
      )}
    </>
  );
}
