import { useState } from 'react';
import type { CreditCard } from '../../types';
import { useWallet } from '../../hooks/useWallet';
import { CardItem } from './CardItem';
import { CustomCardForm } from '../onboarding/CustomCardForm';

export function WalletScreen() {
  const { cards, addCard, removeCard, updateCard } = useWallet();
  const [showAddForm, setShowAddForm] = useState(false);

  function handleAddCustom(card: CreditCard) {
    addCard(card);
    setShowAddForm(false);
  }

  return (
    <div className="px-5 pt-10 pb-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">My Wallet</h1>
        <p className="text-gray-400 text-sm mt-1">{cards.length} card{cards.length !== 1 ? 's' : ''} saved</p>
      </div>

      <div className="space-y-2">
        {cards.map(card => (
          <CardItem
            key={card.id}
            card={card}
            onRemove={removeCard}
            onUpdate={updateCard}
          />
        ))}
      </div>

      {showAddForm ? (
        <div className="mt-6">
          <h2 className="text-base font-medium text-gray-800 mb-4">Add custom card</h2>
          <CustomCardForm
            onSave={handleAddCustom}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-4 w-full py-3 rounded-xl border border-dashed border-gray-300 text-sm text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          + Add a custom card
        </button>
      )}
    </div>
  );
}
