# Project Guidelines for Claude

## CSS Conventions

This project uses **BEM (Block Element Modifier)** CSS conventions for consistent and maintainable styling.

### BEM Structure

- **Block**: Standalone entity that is meaningful on its own (e.g., `card`, `button`, `header`)
- **Element**: Part of a block that has no standalone meaning (e.g., `card__title`, `button__icon`)
- **Modifier**: Flag on a block or element used to change appearance or behavior (e.g., `card--highlighted`, `button--disabled`)

### Naming Convention

```
block-name__element-name--modifier-name
```

### Examples

```scss
// Block
.card {
  background: white;
  border-radius: 8px;
}

// Element
.card__title {
  font-weight: bold;
  font-size: 1.2rem;
}

.card__content {
  padding: 16px;
}

// Modifier
.card--highlighted {
  border: 2px solid blue;
}

.card__title--large {
  font-size: 1.5rem;
}
```

### HTML Usage

```html
<div class="card card--highlighted">
  <h2 class="card__title card__title--large">Card Title</h2>
  <div class="card__content">Card content goes here</div>
</div>
```

## SCSS

This project uses SCSS for styling. CSS files should use the `.scss` extension and leverage SCSS features like nesting, variables, and mixins while maintaining BEM conventions.

## Documentation Updates

After each prompt/request that results in code changes, update the README.md file to reflect the current state of the project, including new features, components, or significant changes.