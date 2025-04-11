// App color scheme
export const colors = {
  // Core Theme
  background: "#0B0B0F", // deep charcoal black with a hint of purple-blue
  card: "#121216", // soft matte black
  cardHighlight: "#1A1A1F", // slightly lighter card for emphasis
  border: "#1D1D21", // light divider grey for cards
  shadow: "rgba(0, 0, 0, 0.4)", // used sparingly for elevation
  overlay: "rgba(0, 0, 0, 0.7)", // modal overlays

  // Primary Accent (Profit/Action)
  primary: "#00FFA3", // CashApp neon green
  primaryDark: "#00CC8C", // Pressed accent
  primaryLight: "#00FFB3", // Lighter variant
  primarySoft: "rgba(0, 255, 163, 0.08)", // Soft background

  // Negative/Warning Accent (Loss/Stop)
  error: "#FF3B3B", // Red alert
  errorDark: "#991F1F", // Dark red
  errorSoft: "rgba(255, 59, 59, 0.08)", // Muted background

  // Text System
  text: "#FFFFFF", // Heading - strong contrast
  textSecondary: "#E1E1E1", // Body - soft light grey
  textMuted: "#A1A1AA", // Labels - low-key muted
  textDisabled: "#4B4B4B", // Very subtle grey

  // Status Colors
  success: "#00FF99", // Wallet gains
  warning: "#FFB800", // Warning state
  info: "#007AFF", // Blue tap/press feedback (iOS-native feel)

  // XP & Rank System Colors
  xpBase: "#7B61FF", // Level 1-3: light purple
  xpMid: "#00CFFF", // Level 4-7: aqua blue
  xpHigh: "#FFD700", // Level 8-10: soft gold

  // Misc
  transparent: "transparent",
  
  // Gradients
  gradientStart: "#00FFA3",
  gradientEnd: "#7B61FF",
  eliteGradientStart: "#FFD700",
  eliteGradientEnd: "#FF0080",
};

// UI element specific colors
export const uiColors = {
  button: colors.primary,
  buttonText: colors.background,
  tabBar: colors.background,
  tabBarActive: colors.primary,
  tabBarInactive: colors.textMuted,
  header: colors.background,
  headerText: colors.text,
  card: colors.card,
  cardText: colors.text,
  input: colors.card,
  inputText: colors.text,
  inputPlaceholder: colors.textMuted,
  divider: colors.border,
};

// Get XP color based on level
export const getXpColorByLevel = (level: number): string => {
  if (level >= 8) return colors.xpHigh;
  if (level >= 4) return colors.xpMid;
  return colors.xpBase;
};

// Get gradient colors based on level
export const getGradientByLevel = (level: number): string[] => {
  if (level >= 10) {
    return [colors.eliteGradientStart, colors.eliteGradientEnd];
  }
  if (level >= 8) {
    return [colors.xpHigh, colors.xpHigh];
  }
  if (level >= 4) {
    return [colors.xpMid, colors.xpMid];
  }
  return [colors.xpBase, colors.xpBase];
};

export default {
  light: {
    text: colors.text,
    background: colors.background,
    tint: colors.primary,
    tabIconDefault: colors.textMuted,
    tabIconSelected: colors.primary,
  },
};