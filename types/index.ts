// User types
export interface User {
  id: string;
  username: string;
  walletAddress: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalProfit: number;
  dailyStreak: number;
  badges: Badge[];
  joinedAt: string;
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  friends: string[];
  team?: Team;
  streakMultiplier: number;
  lastActive: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  unlockedAt: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

// Trade types
export interface Trade {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  tokenLogo?: string;
  entryPrice: number;
  exitPrice?: number;
  amount: number;
  profit?: number;
  profitPercentage?: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  xpEarned?: number;
  shared?: boolean;
}

// Leaderboard types
export interface LeaderboardEntry {
  userId: string;
  username: string;
  rank: number;
  level: number;
  totalProfit: number;
  xp: number;
  badges: Badge[];
  dailyStreak: number;
  team?: string;
}

// Mission types
export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  completed: boolean;
  type: 'daily' | 'weekly' | 'achievement';
  icon: string;
  expiresAt?: string;
}

// Bot types
export interface BotStatus {
  isActive: boolean;
  startedAt?: string;
  scannedTokens: number;
  potentialSnipes: number;
  activeSnipes: number;
  completedSnipes: number;
}

// Wallet types
export interface Wallet {
  address: string;
  balance: number;
  tokens: Token[];
  connected: boolean;
}

export interface Token {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  logo?: string;
}

// App settings
export interface AppSettings {
  notifications: boolean;
  soundEffects: boolean;
  vibration: boolean;
  darkMode: boolean;
  botSettings: BotSettings;
}

export interface BotSettings {
  maxInvestmentPerTrade: number;
  takeProfit: number;
  stopLoss: number;
  maxConcurrentTrades: number;
  autoReinvest: boolean;
}

// Social types
export interface Team {
  id: string;
  name: string;
  members: string[];
  createdAt: string;
  weeklyProfit: number;
  totalProfit: number;
  rank: number;
  logo?: string;
}

export interface Challenge {
  id: string;
  challenger: string;
  challenged: string;
  startedAt: string;
  endsAt: string;
  challengerProfit: number;
  challengedProfit: number;
  status: 'pending' | 'active' | 'completed';
  stake: number;
  winner?: string;
}

export interface SocialPost {
  id: string;
  userId: string;
  username: string;
  userLevel: number;
  content: string;
  tradeId?: string;
  trade?: Trade;
  createdAt: string;
  likes: number;
  comments: number;
  likedBy: string[];
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
  likes: number;
}

// Streak types
export interface Streak {
  days: number;
  lastUpdated: string;
  multiplier: number;
  trades: number;
  profitableTrades: number;
}