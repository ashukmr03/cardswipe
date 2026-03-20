import { useState } from 'react';
import type { CreditCard, RewardCategory } from '../../types';

const CATEGORIES: { key: RewardCategory; label: string }[] = [
  { key: 'food', label: 'Food & Dining' },
  { key: 'travel', label: 'Travel' },
  { key: 'shopping', label: 'Shopping' },
  { key: 'upi', label: 'UPI' },
  { key: 'major_purchases', label: 'Major Purchases' },
];

interface EditCardModalProps {
  card: CreditCard;
  onSave: (updates: Partial<CreditCard>) => void;
  onCancel: () => void;
}

export function EditCardModal({ card, onSave, onCancel }: EditCardModalProps) {
  const [name, setName] = useState(card.name);
  const [bank, setBank] = useState(card.bank);
  const [rates, setRates] = useState<Record<RewardCategory, string>>(
    Object.fromEntries(
      CATEGORIES.map(({ key }) => [key, String(card.rewards[key])])
    ) as Record<RewardCategory, string>
  );
  const [error, setError] = useState('');

  function handleSave() {
    if (!name.trim()) { setError('Card name is required.'); return; }
    const rewards = {} as Record<RewardCategory, number>;
    for (const { key } of CATEGORIES) {
      const val = parseFloat(rates[key]);
      if (isNaN(val) || val < 0 || val > 100) {
        setError(`Invalid rate for ${key}.`);
        return;
      }
      rewards[key] = val;
    }
    onSave({ name: name.trim(), bank: bank.trim(), rewards });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end z-50" onClick={onCancel}>
      <div
        className="bg-white w-full rounded-t-2xl p-5 space-y-3 max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-gray-900">Edit card</h2>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Card Name *</label>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Bank</label>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            value={bank}
            onChange={e => setBank(e.target.value)}
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
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
