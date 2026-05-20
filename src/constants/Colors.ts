export const Colors = {
  light: {
    primary: '#2E7D32',       // Forest Green
    primaryLight: '#E8F5E9',  // Very Light Sage Green
    accent: '#4CAF50',        // Leaf Green
    accentLight: '#C8E6C9',   // Light Leaf Green
    secondary: '#8D6E63',     // Earthy Warm Brown
    secondaryLight: '#F5F5DC',// Light Warm Beige / Sand
    background: '#F7F9F6',    // Soft off-white green-ish background
    surface: '#FFFFFF',       // Pure white cards
    text: '#1B2E1C',          // Dark deep forest text
    textSecondary: '#546E7A', // Muted slate gray
    border: '#E0E0E0',        // Light gray border
    notification: '#D84315',  // Terracotta alert / Rust orange
    success: '#4CAF50',
    warning: '#FFA000',
    info: '#0288D1',
  },
  dark: {
    primary: '#81C784',       // Sage green for dark mode
    primaryLight: '#1B2E1C',
    accent: '#A5D6A7',
    accentLight: '#2E7D32',
    secondary: '#D7CCC8',
    secondaryLight: '#3E2723',
    background: '#121C14',    // Deep forest dark background
    surface: '#1E2B20',       // Dark green-ish card surface
    text: '#E8F5E9',
    textSecondary: '#90A4AE',
    border: '#2E3B30',
    notification: '#FF7043',
    success: '#81C784',
    warning: '#FFB74D',
    info: '#4FC3F7',
  }
};

export type ThemeColors = typeof Colors.light;
