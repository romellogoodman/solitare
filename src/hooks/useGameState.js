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
    const foundation = [[], [], [], []];

    return {
      tableau,
      stock,
      foundation,
      drawnCount: 0, // Track how many cards have been drawn
      draggedCard: null,
      draggedFrom: null,
      isWon: false
    };
  }

  const drawFromStock = useCallback(() => {
    setGameState(prev => {
      // If we've drawn all cards, reset
      if (prev.drawnCount >= prev.stock.length) {
        return {
          ...prev,
          drawnCount: 0
        };
      }

      // Otherwise, increment the drawn count
      return {
        ...prev,
        drawnCount: prev.drawnCount + 1
      };
    });
  }, []);

  const moveCard = useCallback((card, fromLocation, toLocation) => {
    setGameState(prev => {
      const newState = {
        ...prev,
        tableau: prev.tableau.map(col => [...col]),
        foundation: prev.foundation.map(pile => [...pile]),
        stock: [...prev.stock],
        drawnCount: prev.drawnCount
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
      } else if (fromLocation.type === 'stock') {
        // Remove card from stock
        const stockIndex = newState.stock.findIndex(c => c.id === card.id);
        if (stockIndex !== -1) {
          newState.stock.splice(stockIndex, 1);

          // Adjust drawnCount if needed
          if (stockIndex < newState.drawnCount) {
            newState.drawnCount = Math.max(0, newState.drawnCount - 1);
          }
        }

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

  // Get the last 3 drawn cards from stock
  const getDisplayedCards = useCallback(() => {
    if (gameState.drawnCount === 0) return [];

    const startIndex = Math.max(0, gameState.drawnCount - 3);
    const endIndex = gameState.drawnCount;

    return gameState.stock.slice(startIndex, endIndex).map(card => ({
      ...card,
      faceUp: true
    }));
  }, [gameState.stock, gameState.drawnCount]);

  return {
    gameState,
    drawFromStock,
    moveCard,
    canMoveCard,
    newGame,
    getDisplayedCards
  };
};