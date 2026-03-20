import { useState } from 'react';
import type { RewardCategory } from '../../types';
import { useWallet } from '../../hooks/useWallet';
import { recommend } from '../../engine/recommend';
import { CategoryGrid } from './CategoryGrid';
import { RecommendationResult } from './RecommendationResult';

export function RecommendationScreen() {
  const { cards } = useWallet();
  const [selectedCategory, setSelectedCategory] = useState<RewardCategory | null>(null);

  const result = selectedCategory ? recommend(cards, selectedCategory) : null;

  return (
    <div className="px-5 pt-10 pb-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">CardSwipe</h1>
        <p className="text-gray-400 text-sm mt-1">
          {selectedCategory ? 'Here\'s your best card' : 'What are you spending on?'}
        </p>
      </div>

      <CategoryGrid selected={selectedCategory} onSelect={setSelectedCategory} />

      {result && <RecommendationResult result={result} />}
    </div>
  );
}
