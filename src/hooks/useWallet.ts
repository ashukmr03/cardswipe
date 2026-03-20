import { useState } from 'react';
import type { CreditCard } from '../types';

const STORAGE_KEY = 'cardswipe_wallet';

function loadCards(): CreditCard[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function persist(cards: CreditCard[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function useWallet() {
  const [cards, setCards] = useState<CreditCard[]>(loadCards);

  const hasCards = cards.length > 0;

  function addCard(card: CreditCard): void {
    setCards(prev => {
      const updated = [...prev, card];
      persist(updated);
      return updated;
    });
  }

  function removeCard(id: string): void {
    setCards(prev => {
      const updated = prev.filter(c => c.id !== id);
      persist(updated);
      return updated;
    });
  }

  function updateCard(id: string, updates: Partial<CreditCard>): void {
    setCards(prev => {
      const updated = prev.map(c => (c.id === id ? { ...c, ...updates } : c));
      persist(updated);
      return updated;
    });
  }

  return { cards, hasCards, addCard, removeCard, updateCard };
}
