# Centralized Theme Color Management

This directory contains the centralized color management system that allows you to manage all theme colors in one place and easily switch between different themes.

## 📁 Files Overview

- `colors.ts` - Main color configuration file with theme definitions
- `README.md` - This documentation file

## 🎨 How to Use

### 1. Importing Colors in React Components

```tsx
import { colors } from "../config/theme/colors";
import { useTheme, useThemeColors } from "../hooks/useTheme";

// Option 1: Direct import (static)
const MyComponent = () => {
  return <div style={{ color: colors.primary }}>Hello World</div>;
};

// Option 2: Using hooks (dynamic)
const MyComponent = () => {
  const { colors } = useTheme();
  const themeColors = useThemeColors();

  return <div style={{ color: themeColors.primary }}>Hello World</div>;
};
```

### 2. Using CSS Variables

CSS variables are automatically available throughout the application:

```css
.my-component {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-accent);
}

.my-gradient {
  background: var(--gradient-primary);
}
```

### 3. Using Tailwind Classes

Theme colors are integrated into Tailwind CSS:

```tsx
const MyComponent = () => {
  return (
    <div className="border-theme-secondary bg-theme-primary text-theme-accent">
      <h1 className="text-gradient-primary">Gradient Text</h1>
      <button className="bg-theme-social-twitter">Twitter Button</button>
    </div>
  );
};
```

### 4. Available Tailwind Classes

#### Background Colors

- `bg-theme-primary`
- `bg-theme-secondary`
- `bg-theme-accent`
- `bg-theme-bg-primary`
- `bg-theme-bg-secondary`
- `bg-theme-bg-card`

#### Text Colors

- `text-theme-primary`
- `text-theme-secondary`
- `text-theme-accent`
- `text-theme-text-primary`
- `text-theme-text-muted`

#### Border Colors

- `border-theme-primary`
- `border-theme-accent`
- `border-theme-hover`

#### Social Colors

- `text-theme-social-twitter`
- `text-theme-social-facebook`
- `text-theme-social-linkedin`
- `text-theme-social-whatsapp`
- `text-theme-social-github`

### 5. Global CSS Classes

Pre-built utility classes are available:

```html
<!-- Background Classes -->
<div class="bg-theme-card">Card background</div>
<div class="bg-gradient-primary">Primary gradient</div>

<!-- Text Classes -->
<p class="text-theme-muted">Muted text</p>
<h1 class="text-gradient-accent">Gradient text</h1>

<!-- Component Classes -->
<button class="btn-primary">Primary button</button>
<input class="input-theme" placeholder="Themed input" />
<div class="card-glassmorphism">Glass card</div>
```

## 🔧 Theme Management

### Current Themes

1. **Tokyo Night** (Default)
   - Primary: `#7aa2f7` (Blue)
   - Secondary: `#bb9af7` (Purple)
   - Accent: `#9ece6a` (Green)

2. **Cyberpunk** (Available)
   - Primary: `#ff0080` (Pink)
   - Secondary: `#00ff80` (Green)
   - Accent: `#8000ff` (Purple)

3. **Ocean** (Coming Soon)
4. **Forest** (Coming Soon)

### Switching Themes

To change the current theme, simply update the `CURRENT_THEME` variable in `colors.ts`:

```typescript
// In src/config/theme/colors.ts
export const CURRENT_THEME: ThemeName = "cyberpunk"; // Change this
```

Or use the theme hook:

```tsx
import { useTheme } from "../hooks/useTheme";

const ThemeSelector = () => {
  const { currentTheme, switchTheme } = useTheme();

  return (
    <select onChange={(e) => switchTheme(e.target.value as ThemeName)}>
      <option value="tokyo-night">Tokyo Night</option>
      <option value="cyberpunk">Cyberpunk</option>
    </select>
  );
};
```

### Using the Theme Manager Component

```tsx
import ThemeManager from "../components/ReactComponent/layout/ThemeManager/ThemeManager";

const Layout = () => {
  return (
    <div>
      <header>
        <ThemeManager showLabel={true} />
      </header>
    </div>
  );
};
```

## 🆕 Creating New Themes

### 1. Add Theme Definition

In `colors.ts`, add a new theme:

```typescript
const oceanColors: ColorPalette = {
  primary: "#4a90e2",
  secondary: "#6bb6ff",
  accent: "#87ceeb",

  background: {
    primary: "#0f1929",
    secondary: "#1a2332",
    tertiary: "#253241",
    card: "#1a233240",
    overlay: "#1a233260",
  },

  text: {
    primary: "#e1f5fe",
    secondary: "#b3e5fc",
    muted: "#546e7a",
    accent: "#4a90e2",
    inverse: "#0f1929",
  },

  // ... rest of the color palette
};
```

### 2. Register Theme

Add to the themes registry:

```typescript
const themes: Record<ThemeName, ColorPalette> = {
  "tokyo-night": tokyoNightColors,
  cyberpunk: cyberpunkColors,
  ocean: oceanColors, // Add your new theme
  forest: forestColors,
};
```

### 3. Update Type Definition

Add to the ThemeName type:

```typescript
export type ThemeName =
  | "tokyo-night"
  | "cyberpunk"
  | "ocean"
  | "forest"
  | "your-new-theme";
```

## 🚀 Quick Theme Change

To change your website theme right now:

1. Open `src/config/theme/colors.ts`
2. Find this line: `export const CURRENT_THEME: ThemeName = 'tokyo-night';`
3. Change it to: `export const CURRENT_THEME: ThemeName = 'cyberpunk';`
4. Save the file and refresh your website

That's it! Your entire website will now use the Cyberpunk theme colors.

## 📝 Available CSS Variables

All these variables are automatically available in your CSS:

```css
/* Primary Colors */
--color-primary
--color-secondary
--color-accent

/* Backgrounds */
--color-bg-primary
--color-bg-secondary
--color-bg-card

/* Text */
--color-text-primary
--color-text-secondary
--color-text-muted

/* Borders */
--color-border-primary
--color-border-accent

/* Gradients */
--gradient-primary
--gradient-accent
--gradient-rainbow

/* Social Colors */
--color-twitter
--color-whatsapp
--color-github
/* ... and more */
```

## 🔄 Migration Guide

### Replacing Hardcoded Colors

#### Before (Hardcoded)

```tsx
const styles = {
  background: "#7aa2f7",
  color: "#c0caf5",
  border: "1px solid #565f89",
};
```

#### After (Theme Variables)

```tsx
import { useThemeColors } from "../hooks/useTheme";

const MyComponent = () => {
  const colors = useThemeColors();

  const styles = {
    background: colors.primary,
    color: colors.textPrimary,
    border: `1px solid ${colors.border.primary}`,
  };
};
```

#### Or Using CSS Variables

```tsx
const styles = {
  background: "var(--color-primary)",
  color: "var(--color-text-primary)",
  border: "1px solid var(--color-border-primary)",
};
```

#### Or Using Tailwind Classes

```tsx
<div className="border border-theme-border-primary bg-theme-primary text-theme-text-primary">
  Content
</div>
```

## 📝 Color Palette Structure

Each theme must include:

```typescript
interface ColorPalette {
  // Primary brand colors
  primary: string;
  secondary: string;
  accent: string;

  // Background variations
  background: {
    primary: string; // Main background
    secondary: string; // Card/panel background
    tertiary: string; // Subtle background
    card: string; // Glassmorphism cards
    overlay: string; // Modal overlays
  };

  // Text hierarchy
  text: {
    primary: string; // Main text
    secondary: string; // Secondary text
    muted: string; // Subtle text
    accent: string; // Accent text
    inverse: string; // Inverse text (for dark backgrounds)
  };

  // Border styles
  border: {
    primary: string; // Default borders
    secondary: string; // Subtle borders
    accent: string; // Accent borders
    hover: string; // Hover state borders
  };

  // Status indicators
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };

  // Interactive states
  interactive: {
    hover: string;
    focus: string;
    active: string;
    disabled: string;
  };

  // Gradient combinations
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    rainbow: string;
  };

  // Social platform colors
  social: {
    twitter: string;
    facebook: string;
    linkedin: string;
    whatsapp: string;
    github: string;
    youtube: string;
    upwork: string;
  };
}
```

## 🚀 Best Practices

### 1. **Always Use Theme Variables**

- ✅ `var(--color-primary)`
- ✅ `colors.primary`
- ❌ `#7aa2f7`

### 2. **Prefer CSS Variables for Performance**

- Use CSS variables in stylesheets
- Use hooks only when you need JavaScript access

### 3. **Use Semantic Names**

- ✅ `text-theme-muted`
- ❌ `text-gray-500`

### 4. **Test All Themes**

- Ensure your components work with all available themes
- Test theme switching functionality

### 5. **Maintain Consistency**

- Follow the existing color palette structure
- Use the same naming conventions

## 🔍 Debugging

### Check if Theme Variables are Loaded

```javascript
// In browser console
console.log(
  getComputedStyle(document.documentElement).getPropertyValue(
    "--color-primary",
  ),
);
```

### Verify Theme Switching

```typescript
import { getThemeColors } from "../config/theme/colors";

// Test theme colors
console.log("Tokyo Night:", getThemeColors("tokyo-night"));
console.log("Cyberpunk:", getThemeColors("cyberpunk"));
```

## 🎯 Future Enhancements

- [ ] Light mode variants for each theme
- [ ] System theme detection
- [ ] Theme preview functionality
- [ ] Color accessibility scoring
- [ ] Theme export/import functionality
- [ ] Custom theme builder UI
