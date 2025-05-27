import { useState } from "react";
import Card from "./Card";
import { useGameState } from "../hooks/useGameState";
import "./GameBoard.scss";

const GameBoard = () => {
  const {
    gameState,
    drawFromStock,
    moveCard,
    canMoveCard,
    newGame,
    getDisplayedCards,
  } = useGameState();
  const [draggedCard, setDraggedCard] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  const handleDragStart = (e, card) => {
    setDraggedCard(card);

    for (let i = 0; i < gameState.tableau.length; i++) {
      const cardIndex = gameState.tableau[i].findIndex((c) => c.id === card.id);
      if (cardIndex !== -1) {
        setDraggedFrom({ type: "tableau", index: i, cardIndex });
        return;
      }
    }

    const displayedCards = getDisplayedCards();
    const displayIndex = displayedCards.findIndex((c) => c.id === card.id);
    if (displayIndex !== -1) {
      setDraggedFrom({
        type: "stock",
        index: gameState.stock.findIndex((c) => c.id === card.id),
      });
    }
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
    setDraggedFrom(null);
  };

  const handleDrop = (e, dropLocation) => {
    e.preventDefault();
    if (draggedCard && draggedFrom && canMoveCard(draggedCard, dropLocation)) {
      moveCard(draggedCard, draggedFrom, dropLocation);
    }
    handleDragEnd();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDoubleClick = (card) => {
    for (let i = 0; i < 4; i++) {
      if (canMoveCard(card, { type: "foundation", index: i })) {
        const fromLocation = draggedFrom || findCardLocation(card);
        if (fromLocation) {
          moveCard(card, fromLocation, { type: "foundation", index: i });
          break;
        }
      }
    }
  };

  const findCardLocation = (card) => {
    for (let i = 0; i < gameState.tableau.length; i++) {
      const cardIndex = gameState.tableau[i].findIndex((c) => c.id === card.id);
      if (cardIndex !== -1) {
        return { type: "tableau", index: i, cardIndex };
      }
    }

    const displayedCards = getDisplayedCards();
    const displayIndex = displayedCards.findIndex((c) => c.id === card.id);
    if (displayIndex !== -1) {
      return {
        type: "stock",
        index: gameState.stock.findIndex((c) => c.id === card.id),
      };
    }

    return null;
  };

  return (
    <div className="game-board">
      <div className="game-board__header">
        <div className="game-board__stock-area">
          <div className="stock" onClick={drawFromStock}>
            {gameState.stock.length > gameState.drawnCount ? (
              <Card card={{ ...gameState.stock[0], faceUp: false }} />
            ) : (
              <div className="stock__empty">↻</div>
            )}
          </div>

          <div className="waste">
            {getDisplayedCards().map((card, index) => (
              <div
                key={card.id}
                className={`waste__card waste__card--${index}`}
              >
                <Card
                  card={card}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleDoubleClick(card)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="game-board__foundation">
          {gameState.foundation.map((pile, index) => {
            const suitSymbols = ["♠", "♥", "♦", "♣"];
            return (
              <div
                key={index}
                className="foundation__pile"
                onDrop={(e) => handleDrop(e, { type: "foundation", index })}
                onDragOver={handleDragOver}
              >
                {pile.length > 0 ? (
                  <Card card={pile[pile.length - 1]} />
                ) : (
                  <div className="foundation__empty"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="game-board__tableau">
        {gameState.tableau.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="tableau__column"
            onDrop={(e) =>
              handleDrop(e, { type: "tableau", index: columnIndex })
            }
            onDragOver={handleDragOver}
          >
            {column.length === 0 && <div className="tableau__empty-slot"></div>}
            {column.map((card, cardIndex) => (
              <Card
                key={card.id}
                card={card}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={() => card.faceUp && handleDoubleClick(card)}
                isDragging={draggedCard?.id === card.id}
              />
            ))}
          </div>
        ))}
      </div>

      {gameState.isWon && (
        <div className="game-board__win-message">
          <div className="win-message">
            <h2 className="win-message__title">Congratulations!</h2>
            <p className="win-message__text">You won!</p>
            <button className="win-message__button" onClick={newGame}>
              New Game
            </button>
          </div>
        </div>
      )}

      <div className="game-board__controls">
        <button className="controls__button" onClick={newGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
