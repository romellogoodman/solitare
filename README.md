# Solitaire Game

A classic Klondike Solitaire game built with React and styled with SCSS using BEM conventions.

## Features

- **Classic Klondike Solitaire gameplay**
- **Drag and drop functionality** for moving cards
- **Double-click to auto-move** cards to foundation piles
- **Stock pile cycling** - click to draw cards, auto-reset when empty
- **Win detection** with congratulations message
- **New Game** functionality to restart
- **Responsive design** with clean card animations

## How to Play

1. **Goal**: Move all cards to the four foundation piles, sorted by suit from Ace to King
2. **Tableau**: Build down by alternating colors (red on black, black on red)
3. **Foundation**: Build up by suit starting with Aces
4. **Stock**: Click to draw cards to the waste pile
5. **Moving Cards**: 
   - Drag and drop cards between valid locations
   - Double-click face-up cards to auto-move to foundation if possible
   - Move sequences of properly ordered cards together in tableau

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
src/
├── components/
│   ├── Card.jsx          # Individual card component
│   ├── Card.scss         # Card styling with BEM conventions
│   ├── GameBoard.jsx     # Main game board and layout
│   └── GameBoard.scss    # Game board styling
├── hooks/
│   └── useGameState.js   # Game state management hook
├── utils/
│   └── cards.js          # Card utilities and game logic
├── App.jsx               # Main application component
├── main.jsx              # Application entry point
└── index.css             # Global styles
```

### Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **SCSS** - CSS preprocessor
- **BEM** - CSS naming convention

### CSS Architecture

This project follows BEM (Block Element Modifier) naming conventions:

- **Blocks**: `.card`, `.game-board`, `.foundation`
- **Elements**: `.card__rank`, `.game-board__header`
- **Modifiers**: `.card--red`, `.card--dragging`

See `CLAUDE.md` for detailed BEM guidelines and examples.

### Game Logic

The game implements standard Klondike Solitaire rules:

- **Tableau placement**: Cards must be placed in descending order with alternating colors
- **Foundation placement**: Cards must be placed in ascending order by suit
- **Multiple card moves**: Properly sequenced cards can be moved together
- **Auto-reveal**: Face-down cards are automatically revealed when exposed
- **Win condition**: All 52 cards successfully placed in foundation piles
