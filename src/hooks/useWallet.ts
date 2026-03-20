import { useState, useEffect } from 'react';
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

function saveCards(cards: CreditCard[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function useWallet() {
  const [cards, setCards] = useState<CreditCard[]>(loadCards);

  useEffect(() => {
    saveCards(cards);
  }, [cards]);

  const hasCards = cards.length > 0;

  function addCard(card: CreditCard): void {
    setCards(prev => [...prev, card]);
  }

  function removeCard(id: string): void {
    setCards(prev => prev.filter(c => c.id !== id));
  }

  function updateCard(id: string, updates: Partial<CreditCard>): void {
    setCards(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  }

  return { cards, hasCards, addCard, removeCard, updateCard };
}
