export const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
export const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const createDeck = () => {
  const deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({
        id: `${suit}-${rank}`,
        suit,
        rank,
        value: rank === 'A' ? 1 : rank === 'J' ? 11 : rank === 'Q' ? 12 : rank === 'K' ? 13 : parseInt(rank),
        color: suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black',
        faceUp: false
      });
    });
  });
  return deck;
};

export const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const canPlaceOnTableau = (card, targetCard) => {
  if (!targetCard) return card.value === 13;
  return card.color !== targetCard.color && card.value === targetCard.value - 1;
};

export const canPlaceOnFoundation = (card, foundationPile) => {
  if (foundationPile.length === 0) return card.value === 1;
  const topCard = foundationPile[foundationPile.length - 1];
  return card.suit === topCard.suit && card.value === topCard.value + 1;
};