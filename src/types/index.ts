export type RewardCategory =
  | 'food'
  | 'travel'
  | 'shopping'
  | 'upi'
  | 'major_purchases';

export type CardType = 'cashback' | 'points';

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  type: CardType;
  rewards: Record<RewardCategory, number>; // percentage, e.g. 5 = 5%
  isCustom: boolean;
}

export interface RecommendationResult {
  bestCard: CreditCard;
  rewardRate: number;
  reason: string;
  isTie: boolean;
  tiedCard?: CreditCard;
  tieBreakReason?: string;
  isNoMatch: boolean;
  suggestion?: string;
}
