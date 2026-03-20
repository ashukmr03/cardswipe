import { useState } from 'react';
import type { CreditCard } from '../../types';
import { PRESET_CARDS } from '../../data/presetCards';
import { PresetCardList } from './PresetCardList';
import { CustomCardForm } from './CustomCardForm';

interface OnboardingScreenProps {
  onAddCard: (card: CreditCard) => void;
}

export function OnboardingScreen({ onAddCard }: OnboardingScreenProps) {
  const addCard = onAddCard;
  const [selected, setSelected] = useState<string[]>([]);
  const [showCustomForm, setShowCustomForm] = useState(false);

  function handleToggle(id: string) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  }

  function handleContinue() {
    const cardsToAdd = PRESET_CARDS.filter(c => selected.includes(c.id));
    cardsToAdd.forEach(addCard);
  }

  function handleCustomSave(card: CreditCard) {
    addCard(card);
    setShowCustomForm(false);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-5 pt-12 pb-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">CardSwipe</h1>
        <p className="text-gray-500 text-sm">Add your credit cards to get started.</p>
      </div>

      {showCustomForm ? (
        <div>
          <h2 className="text-base font-medium text-gray-800 mb-4">Add custom card</h2>
          <CustomCardForm
            onSave={handleCustomSave}
            onCancel={() => setShowCustomForm(false)}
          />
        </div>
      ) : (
        <>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            Popular cards
          </h2>
          <PresetCardList selected={selected} onToggle={handleToggle} />

          <button
            onClick={() => setShowCustomForm(true)}
            className="mt-4 w-full py-3 rounded-xl border border-dashed border-gray-300 text-sm text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
          >
            + Add a custom card
          </button>

          <div className="mt-auto pt-6">
            <button
              onClick={handleContinue}
              disabled={selected.length === 0}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${
                selected.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
}
