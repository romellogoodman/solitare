import './Card.scss';

const Card = ({ card, isDragging, onDragStart, onDragEnd, onClick }) => {
  const handleDragStart = (e) => {
    if (onDragStart) {
      onDragStart(e, card);
    }
  };

  const handleDragEnd = (e) => {
    if (onDragEnd) {
      onDragEnd(e);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(card);
    }
  };

  if (!card.faceUp) {
    return (
      <div 
        className="card card--face-down"
        onClick={handleClick}
      >
        <div className="card__back"></div>
      </div>
    );
  }

  return (
    <div
      className={`card card--${card.color} ${isDragging ? 'card--dragging' : ''}`}
      draggable={card.faceUp}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <div className="card__rank card__rank--top-left">{card.rank}</div>
      <div className="card__suit card__suit--top-left">{getSuitSymbol(card.suit)}</div>
      <div className="card__suit card__suit--center">{getSuitSymbol(card.suit)}</div>
      <div className="card__rank card__rank--bottom-right">{card.rank}</div>
      <div className="card__suit card__suit--bottom-right">{getSuitSymbol(card.suit)}</div>
    </div>
  );
};

const getSuitSymbol = (suit) => {
  const symbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };
  return symbols[suit];
};

export default Card;