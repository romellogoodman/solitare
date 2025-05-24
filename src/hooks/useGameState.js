import { useState, useCallback } from 'react';
import { createDeck, shuffleDeck, canPlaceOnTableau, canPlaceOnFoundation } from '../utils/cards';

export const useGameState = () => {
  const [gameState, setGameState] = useState(() => initializeGame());

  function initializeGame() {
    const deck = shuffleDeck(createDeck());
    
    const tableau = Array(7).fill(null).map((_, colIndex) => {
      const cards = deck.splice(0, colIndex + 1);
      cards.forEach((card, index) => {
        if (index === cards.length - 1) {
          card.faceUp = true;
        }
      });
      return cards;
    });

    const stock = deck.map(card => ({ ...card, faceUp: false }));
    const waste = [];
    const foundation = [[], [], [], []];

    return {
      tableau,
      stock,
      waste,
      foundation,
      draggedCard: null,
      draggedFrom: null,
      isWon: false
    };
  }

  const drawFromStock = useCallback(() => {
    setGameState(prev => {
      if (prev.stock.length === 0) {
        if (prev.waste.length === 0) return prev;
        return {
          ...prev,
          stock: prev.waste.map(card => ({ ...card, faceUp: false })).reverse(),
          waste: []
        };
      }

      const newStock = [...prev.stock];
      const drawnCard = newStock.pop();
      drawnCard.faceUp = true;

      return {
        ...prev,
        stock: newStock,
        waste: [...prev.waste, drawnCard]
      };
    });
  }, []);

  const moveCard = useCallback((card, fromLocation, toLocation) => {
    setGameState(prev => {
      const newState = { 
        ...prev,
        tableau: prev.tableau.map(col => [...col]),
        foundation: prev.foundation.map(pile => [...pile]),
        waste: [...prev.waste],
        stock: [...prev.stock]
      };
      
      if (fromLocation.type === 'tableau') {
        const fromPile = newState.tableau[fromLocation.index];
        const cardIndex = fromPile.findIndex(c => c.id === card.id);
        const cardsToMove = fromPile.splice(cardIndex);
        
        if (fromPile.length > 0 && !fromPile[fromPile.length - 1].faceUp) {
          fromPile[fromPile.length - 1].faceUp = true;
        }
        
        if (toLocation.type === 'tableau') {
          newState.tableau[toLocation.index].push(...cardsToMove);
        } else if (toLocation.type === 'foundation') {
          newState.foundation[toLocation.index].push(card);
        }
      } else if (fromLocation.type === 'waste') {
        newState.waste.pop();
        
        if (toLocation.type === 'tableau') {
          newState.tableau[toLocation.index].push(card);
        } else if (toLocation.type === 'foundation') {
          newState.foundation[toLocation.index].push(card);
        }
      }

      const isWon = newState.foundation.every(pile => pile.length === 13);
      newState.isWon = isWon;

      return newState;
    });
  }, []);

  const canMoveCard = useCallback((card, toLocation) => {
    if (toLocation.type === 'tableau') {
      const targetPile = gameState.tableau[toLocation.index];
      const targetCard = targetPile.length > 0 ? targetPile[targetPile.length - 1] : null;
      return canPlaceOnTableau(card, targetCard);
    } else if (toLocation.type === 'foundation') {
      const foundationPile = gameState.foundation[toLocation.index];
      return canPlaceOnFoundation(card, foundationPile);
    }
    return false;
  }, [gameState]);

  const newGame = useCallback(() => {
    setGameState(initializeGame());
  }, []);

  return {
    gameState,
    drawFromStock,
    moveCard,
    canMoveCard,
    newGame
  };
};