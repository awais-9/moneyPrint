import { colors, getXpColorByLevel } from './colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  xxl: 32,
  round: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 40,
};

// Updated to use valid React Native fontWeight values
export const fontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  black: "900" as const,
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
  glow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
};

// Rank titles for different levels
export const rankTitles = {
  1: "Newbie Printer",
  2: "Paper Trader",
  3: "Tactical Degenerate",
  4: "Momentum Raider",
  5: "Profit Hunter",
  6: "Snipe Specialist",
  7: "Alpha Seeker",
  8: "Trend Surfer",
  9: "Whale Watcher",
  10: "Crypto Shark",
  15: "Market Manipulator",
  20: "Degen God",
  25: "Crypto Whale",
  30: "Legendary Printer"
};

// Get rank title based on level
export const getRankTitle = (level: number): string => {
  const ranks = Object.keys(rankTitles)
    .map(Number)
    .sort((a, b) => a - b);
  
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (level >= ranks[i]) {
      return rankTitles[ranks[i] as keyof typeof rankTitles];
    }
  }
  
  return rankTitles[1];
};

// Get rank color based on level
export const getRankColor = (level: number): string => {
  return getXpColorByLevel(level);
};