// Theme Color Configuration
// Centralized color management for easy theme switching and maintenance

export type ThemeName = "tokyo-night" | "cyberpunk" | "ocean" | "forest";

export interface ColorPalette {
  // Primary Colors
  primary: string;
  secondary: string;
  accent: string;

  // Background Colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    card: string;
    overlay: string;
  };

  // Text Colors
  text: {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
    inverse: string;
  };

  // UI Element Colors
  border: {
    primary: string;
    secondary: string;
    accent: string;
    hover: string;
  };

  // Status Colors
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };

  // Interactive Colors
  interactive: {
    hover: string;
    focus: string;
    active: string;
    disabled: string;
  };

  // Gradient Combinations
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    rainbow: string;
  };

  // Social Platform Colors
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

// Tokyo Night Theme (Current)
const tokyoNightColors: ColorPalette = {
  // Primary Colors
  primary: "#7aa2f7",
  secondary: "#bb9af7",
  accent: "#9ece6a",

  // Background Colors
  background: {
    primary: "#1a1b26",
    secondary: "#24283b",
    tertiary: "#2d3142",
    card: "#24283b40",
    overlay: "#24283b60",
  },

  // Text Colors
  text: {
    primary: "#c0caf5",
    secondary: "#a9b1d6",
    muted: "#565f89",
    accent: "#7aa2f7",
    inverse: "#1a1b26",
  },

  // UI Element Colors
  border: {
    primary: "#565f89",
    secondary: "#565f8930",
    accent: "#7aa2f7",
    hover: "#7aa2f760",
  },

  // Status Colors
  status: {
    success: "#9ece6a",
    warning: "#e0af68",
    error: "#f7768e",
    info: "#7aa2f7",
  },

  // Interactive Colors
  interactive: {
    hover: "#7aa2f720",
    focus: "#7aa2f740",
    active: "#7aa2f760",
    disabled: "#565f8940",
  },

  // Gradient Combinations
  gradients: {
    primary: "linear-gradient(135deg, #7aa2f7, #bb9af7)",
    secondary: "linear-gradient(135deg, #bb9af7, #9ece6a)",
    accent: "linear-gradient(90deg, #7aa2f7, #bb9af7, #9ece6a)",
    rainbow:
      "linear-gradient(90deg, #7aa2f7, #bb9af7, #9ece6a, #bb9af7, #7aa2f7)",
  },

  // Social Platform Colors
  social: {
    twitter: "#1DA1F2",
    facebook: "#1877F2",
    linkedin: "#0A66C2",
    whatsapp: "#25D366",
    github: "#333333",
    youtube: "#FF0000",
    upwork: "#6fda44",
  },
};

// Future Theme Examples (Ready for implementation)
const cyberpunkColors: ColorPalette = {
  primary: "#ff0080",
  secondary: "#00ff80",
  accent: "#8000ff",

  background: {
    primary: "#0a0a0a",
    secondary: "#1a1a2e",
    tertiary: "#16213e",
    card: "#1a1a2e40",
    overlay: "#1a1a2e60",
  },

  text: {
    primary: "#ffffff",
    secondary: "#cccccc",
    muted: "#666666",
    accent: "#ff0080",
    inverse: "#0a0a0a",
  },

  border: {
    primary: "#333333",
    secondary: "#33333330",
    accent: "#ff0080",
    hover: "#ff008060",
  },

  status: {
    success: "#00ff80",
    warning: "#ffff00",
    error: "#ff0040",
    info: "#00ffff",
  },

  interactive: {
    hover: "#ff008020",
    focus: "#ff008040",
    active: "#ff008060",
    disabled: "#33333340",
  },

  gradients: {
    primary: "linear-gradient(135deg, #ff0080, #00ff80)",
    secondary: "linear-gradient(135deg, #00ff80, #8000ff)",
    accent: "linear-gradient(90deg, #ff0080, #00ff80, #8000ff)",
    rainbow:
      "linear-gradient(90deg, #ff0080, #00ff80, #8000ff, #00ff80, #ff0080)",
  },

  social: {
    twitter: "#1DA1F2",
    facebook: "#1877F2",
    linkedin: "#0A66C2",
    whatsapp: "#25D366",
    github: "#333333",
    youtube: "#FF0000",
    upwork: "#6fda44",
  },
};

// Theme Registry
const themes: Record<ThemeName, ColorPalette> = {
  "tokyo-night": tokyoNightColors,
  cyberpunk: cyberpunkColors,
  ocean: tokyoNightColors, // Placeholder - can be customized
  forest: tokyoNightColors, // Placeholder - can be customized
};

// Current active theme
export const CURRENT_THEME: ThemeName = "tokyo-night";

// Get current theme colors
export const colors = themes[CURRENT_THEME];

// Theme switching function for future use
export function getThemeColors(themeName: ThemeName): ColorPalette {
  return themes[themeName] || themes["tokyo-night"];
}

// CSS Custom Properties Generator
export function generateCSSVariables(palette: ColorPalette): string {
  return `
    :root {
      /* Primary Colors */
      --color-primary: ${palette.primary};
      --color-secondary: ${palette.secondary};
      --color-accent: ${palette.accent};
      
      /* Background Colors */
      --color-bg-primary: ${palette.background.primary};
      --color-bg-secondary: ${palette.background.secondary};
      --color-bg-tertiary: ${palette.background.tertiary};
      --color-bg-card: ${palette.background.card};
      --color-bg-overlay: ${palette.background.overlay};
      
      /* Text Colors */
      --color-text-primary: ${palette.text.primary};
      --color-text-secondary: ${palette.text.secondary};
      --color-text-muted: ${palette.text.muted};
      --color-text-accent: ${palette.text.accent};
      --color-text-inverse: ${palette.text.inverse};
      
      /* Border Colors */
      --color-border-primary: ${palette.border.primary};
      --color-border-secondary: ${palette.border.secondary};
      --color-border-accent: ${palette.border.accent};
      --color-border-hover: ${palette.border.hover};
      
      /* Status Colors */
      --color-success: ${palette.status.success};
      --color-warning: ${palette.status.warning};
      --color-error: ${palette.status.error};
      --color-info: ${palette.status.info};
      
      /* Interactive Colors */
      --color-hover: ${palette.interactive.hover};
      --color-focus: ${palette.interactive.focus};
      --color-active: ${palette.interactive.active};
      --color-disabled: ${palette.interactive.disabled};
      
      /* Gradients */
      --gradient-primary: ${palette.gradients.primary};
      --gradient-secondary: ${palette.gradients.secondary};
      --gradient-accent: ${palette.gradients.accent};
      --gradient-rainbow: ${palette.gradients.rainbow};
      
      /* Social Colors */
      --color-twitter: ${palette.social.twitter};
      --color-facebook: ${palette.social.facebook};
      --color-linkedin: ${palette.social.linkedin};
      --color-whatsapp: ${palette.social.whatsapp};
      --color-github: ${palette.social.github};
      --color-youtube: ${palette.social.youtube};
      --color-upwork: ${palette.social.upwork};
    }
  `;
}

// Tailwind Color Configuration Generator
export function generateTailwindColors(palette: ColorPalette) {
  return {
    // Custom color names for Tailwind
    "theme-primary": palette.primary,
    "theme-secondary": palette.secondary,
    "theme-accent": palette.accent,

    "theme-bg": {
      primary: palette.background.primary,
      secondary: palette.background.secondary,
      tertiary: palette.background.tertiary,
      card: palette.background.card,
      overlay: palette.background.overlay,
    },

    "theme-text": {
      primary: palette.text.primary,
      secondary: palette.text.secondary,
      muted: palette.text.muted,
      accent: palette.text.accent,
      inverse: palette.text.inverse,
    },

    "theme-border": {
      primary: palette.border.primary,
      secondary: palette.border.secondary,
      accent: palette.border.accent,
      hover: palette.border.hover,
    },

    "theme-status": {
      success: palette.status.success,
      warning: palette.status.warning,
      error: palette.status.error,
      info: palette.status.info,
    },

    "theme-social": {
      twitter: palette.social.twitter,
      facebook: palette.social.facebook,
      linkedin: palette.social.linkedin,
      whatsapp: palette.social.whatsapp,
      github: palette.social.github,
      youtube: palette.social.youtube,
      upwork: palette.social.upwork,
    },
  };
}

// Utility functions for common color operations
export const colorUtils = {
  // Add opacity to any color
  withOpacity: (color: string, opacity: number): string => {
    const opacityHex = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");
    return `${color}${opacityHex}`;
  },

  // Get RGB values from hex
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },

  // Create RGBA string
  rgba: (hex: string, alpha: number): string => {
    const rgb = colorUtils.hexToRgb(hex);
    return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : hex;
  },
};

// Export current theme colors for easy import
export default colors;
