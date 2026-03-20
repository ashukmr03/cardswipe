import type { CreditCard, RewardCategory, RecommendationResult } from '../types';

// Generic card suggestions by category for the no-match fallback
const SUGGESTIONS: Record<RewardCategory, string> = {
  food: 'Cards like SBI Cashback offer 5% on online food orders.',
  travel: 'Cards like HDFC Regalia offer accelerated points on travel bookings.',
  shopping: 'Cards like Axis Flipkart offer 5% cashback on major shopping platforms.',
  upi: 'Most cards offer limited UPI rewards — SBI Cashback or Axis Flipkart offer 1%.',
  major_purchases: 'Cards like SBI Cashback offer 5% on large online purchases.',
};

export function recommend(
  cards: CreditCard[],
  category: RewardCategory
): RecommendationResult {
  if (cards.length === 0) throw new Error('No cards provided');

  // Sort by reward rate descending; cashback beats points on ties
  const sorted = [...cards].sort((a, b) => {
    const diff = b.rewards[category] - a.rewards[category];
    if (diff !== 0) return diff;
    // Tie-breaker: cashback > points
    if (a.type === 'cashback' && b.type !== 'cashback') return -1;
    if (b.type === 'cashback' && a.type !== 'cashback') return 1;
    return 0;
  });

  const best = sorted[0];
  const second = sorted[1];
  const isNoMatch = best.rewards[category] === 0;
  const isTie =
    !isNoMatch &&
    second !== undefined &&
    second.rewards[category] === best.rewards[category] &&
    best.type === second.type; // only a visible tie if tie-breaker didn't resolve it

  const reason = isNoMatch
    ? `None of your cards have special rewards for this category.`
    : `${best.name} gives you ${best.rewards[category]}% — the highest among your cards.`;

  return {
    bestCard: best,
    rewardRate: best.rewards[category],
    reason,
    isTie,
    tiedCard: isTie ? second : undefined,
    tieBreakReason:
      !isTie && second?.rewards[category] === best.rewards[category]
        ? `${best.name} wins because it offers direct cashback vs. reward points.`
        : undefined,
    isNoMatch,
    suggestion: isNoMatch ? SUGGESTIONS[category] : undefined,
  };
}
