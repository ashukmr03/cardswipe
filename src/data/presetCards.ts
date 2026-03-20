import type { CreditCard } from '../types';

export const PRESET_CARDS: CreditCard[] = [
  {
    id: 'hdfc-regalia',
    name: 'Regalia Credit Card',
    bank: 'HDFC Bank',
    type: 'points',
    isCustom: false,
    rewards: {
      food: 1.3,            // base: 4 pts/₹150, redeemed at ₹0.50/pt
      travel: 3.3,          // 5x via SmartBuy flights
      shopping: 3.3,        // 5x via SmartBuy (Amazon etc.)
      upi: 1.3,             // base rate, no UPI-specific multiplier
      major_purchases: 1.3, // base rate
    },
  },
  {
    id: 'sbi-cashback',
    name: 'Cashback Credit Card',
    bank: 'State Bank of India',
    type: 'cashback',
    isCustom: false,
    rewards: {
      food: 5,              // online orders (Zomato, Swiggy) count as online
      travel: 5,            // online bookings
      shopping: 5,          // all online merchants
      upi: 0,               // no cashback on UPI
      major_purchases: 5,   // online purchases; cap ₹2,000/month (from Apr 2026)
    },
  },
  {
    id: 'axis-flipkart',
    name: 'Flipkart Credit Card',
    bank: 'Axis Bank',
    type: 'cashback',
    isCustom: false,
    rewards: {
      food: 4,              // Swiggy; 1% on other food merchants
      travel: 5,            // Cleartrip; 1% on other travel
      shopping: 5,          // Flipkart; 7.5% on Myntra
      upi: 1,               // base rate
      major_purchases: 1,   // base rate
    },
  },
  {
    id: 'amex-mrcc',
    name: 'Membership Rewards Credit Card',
    bank: 'American Express',
    type: 'points',
    isCustom: false,
    rewards: {
      food: 0.8,            // 1 MR pt/₹50, redeemed at ~₹0.40/pt
      travel: 0.8,
      shopping: 0.8,        // 1.6% via Reward Multiplier portal (not modelled)
      upi: 0,               // no points on UPI
      major_purchases: 0.8,
    },
  },
];
