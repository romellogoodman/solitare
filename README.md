# Solitaire Game

A classic Klondike Solitaire game built with React and styled with SCSS using BEM conventions.

## Features

- **Classic Klondike Solitaire gameplay** with standard 52-card deck
- **Drag and drop functionality** for intuitive card movement
- **Double-click to auto-move** cards to foundation piles when valid
- **Smart stock pile** - draws up to 3 cards at a time, cycles when empty
- **Win detection** with congratulations modal and celebration
- **New Game** button for instant restart
- **Responsive design** with smooth card animations and hover effects
- **Visual feedback** for valid drop zones and card interactions

## How to Play

### Objective
Move all 52 cards to the four foundation piles, building each suit from Ace to King.

### Game Areas
- **Tableau**: 7 columns where main gameplay occurs
- **Foundation**: 4 piles (one per suit) for final card placement
- **Stock**: Draw pile for additional cards
- **Waste**: Shows up to 3 drawn cards from stock

### Rules
1. **Tableau building**: Place cards in descending order with alternating colors
   - Red cards go on black cards, black cards go on red cards
   - Only Kings can be placed on empty tableau columns
   - Multiple properly sequenced cards can be moved together

2. **Foundation building**: Build up by suit starting with Aces
   - Hearts: A → 2 → 3 → ... → K
   - Diamonds: A → 2 → 3 → ... → K  
   - Clubs: A → 2 → 3 → ... → K
   - Spades: A → 2 → 3 → ... → K

3. **Stock pile**: Click to draw cards (shows last 3 drawn)
   - When stock is empty, click to recycle waste pile back to stock

### Controls
- **Drag & Drop**: Move cards between valid locations
- **Double-click**: Auto-move face-up cards to foundation if possible
- **Click stock**: Draw new cards from deck
- **New Game**: Start fresh game with shuffled deck

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Start development server (port 8080)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── components/
│   ├── Card.jsx          # Card component with drag/drop and visual states
│   ├── Card.scss         # Card styling (suits, colors, animations)
│   ├── GameBoard.jsx     # Main game layout and interaction logic
│   └── GameBoard.scss    # Game board layout and responsive design
├── hooks/
│   └── useGameState.js   # Game state management and move validation
├── utils/
│   └── cards.js          # Deck creation, shuffling, and move logic
├── App.jsx               # Root application component
├── App.css              # Global app styles
├── main.jsx              # React application entry point
└── index.css            # Base CSS reset and global styles
```

### Key Components

#### Card (`src/components/Card.jsx`)
- Renders individual playing cards with rank and suit
- Handles drag events for card movement
- Supports face-up/face-down states
- Shows suit symbols (♠ ♥ ♦ ♣) with proper colors

#### GameBoard (`src/components/GameBoard.jsx`)
- Main game interface with tableau, foundation, and stock areas
- Manages drag and drop interactions between game areas
- Handles double-click auto-move to foundations
- Shows win state with celebration modal
- Implements game controls (new game, stock drawing)

#### useGameState Hook (`src/hooks/useGameState.js`)
- Manages complete game state (tableau, foundation, stock, waste)
- Handles card movement validation and execution
- Tracks drawn cards and cycling behavior
- Detects win conditions (all cards in foundation)
- Provides game reset functionality

#### Card Utilities (`src/utils/cards.js`)
- Creates standard 52-card deck with proper values and colors
- Implements Fisher-Yates shuffle algorithm
- Validates moves for tableau (alternating colors, descending)
- Validates moves for foundation (same suit, ascending)

### Technologies Used

- **React 19** - Latest React with improved performance
- **Vite 6** - Fast build tool and development server  
- **SCSS/Sass** - CSS preprocessor for advanced styling
- **ESLint** - Code linting with React-specific rules

### CSS Architecture

This project strictly follows **BEM (Block Element Modifier)** methodology:

#### Naming Convention
```scss
.block-name__element-name--modifier-name
```

#### Examples from Codebase
```scss
// Card component
.card                    // Block
.card__rank             // Element  
.card__suit             // Element
.card--red              // Modifier
.card--dragging         // Modifier

// Game board
.game-board             // Block
.game-board__header     // Element
.game-board__tableau    // Element
.foundation__pile       // Element
.tableau__column        // Element
```

See `CLAUDE.md` for complete BEM guidelines and implementation details.

### Game Logic Implementation

#### Initialization
- Creates shuffled 52-card deck using `createDeck()` and `shuffleDeck()`
- Deals 28 cards to 7 tableau columns (1-7 cards each, top card face-up)
- Remaining 24 cards form the stock pile (all face-down)
- Foundation starts empty (4 piles for each suit)

#### Move Validation
- **Tableau**: `canPlaceOnTableau()` checks alternating colors and descending rank
- **Foundation**: `canPlaceOnFoundation()` checks matching suit and ascending rank
- **Kings only**: Empty tableau columns only accept Kings
- **Aces only**: Empty foundation piles only accept Aces

#### Stock Management
- Tracks `drawnCount` to show last 3 drawn cards
- When stock exhausted, clicking resets `drawnCount` to 0 (recycles waste)
- Drawn cards become face-up and draggable from waste pile

#### Win Condition
- Automatically detects when all 4 foundation piles have 13 cards each
- Shows modal with congratulations and new game option
- Prevents further moves once game is won

### Performance Features
- Efficient state updates with proper React patterns
- Optimized re-renders using `useCallback` hooks
- Minimal DOM manipulation during card moves
- Smooth CSS transitions for professional feel
