import { useState } from 'react';
import type { CreditCard, RewardCategory } from '../../types';

const CATEGORIES: { key: RewardCategory; label: string }[] = [
  { key: 'food', label: 'Food & Dining' },
  { key: 'travel', label: 'Travel' },
  { key: 'shopping', label: 'Shopping' },
  { key: 'upi', label: 'UPI' },
  { key: 'major_purchases', label: 'Major Purchases' },
];

interface CustomCardFormProps {
  onSave: (card: CreditCard) => void;
  onCancel: () => void;
}

export function CustomCardForm({ onSave, onCancel }: CustomCardFormProps) {
  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [rates, setRates] = useState<Record<RewardCategory, string>>({
    food: '0',
    travel: '0',
    shopping: '0',
    upi: '0',
    major_purchases: '0',
  });
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError('Card name is required.'); return; }
    const rewards = {} as Record<RewardCategory, number>;
    for (const { key } of CATEGORIES) {
      const val = parseFloat(rates[key]);
      if (isNaN(val) || val < 0 || val > 100) {
        setError(`Invalid rate for ${key}. Must be 0–100.`);
        return;
      }
      rewards[key] = val;
    }
    const card: CreditCard = {
      id: crypto.randomUUID(),
      name: name.trim(),
      bank: bank.trim() || 'Unknown Bank',
      type: 'cashback',
      rewards,
      isCustom: true,
    };
    onSave(card);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Card Name *</label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. ICICI Amazon Pay"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Bank</label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          value={bank}
          onChange={e => setBank(e.target.value)}
          placeholder="e.g. ICICI Bank"
        />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">Reward rates (%)</p>
        <div className="space-y-2">
          {CATEGORIES.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{label}</span>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm text-right focus:outline-none focus:border-blue-400"
                value={rates[key]}
                onChange={e => setRates(r => ({ ...r, [key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium"
        >
          Add Card
        </button>
      </div>
    </form>
  );
}
