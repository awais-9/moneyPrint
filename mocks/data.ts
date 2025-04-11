import { User, Trade, LeaderboardEntry, Mission, BotStatus, Wallet, Team, Challenge, SocialPost, Streak } from '@/types';
import { getRankTitle } from '@/constants/theme';

// Mock user data
export const mockUser: User = {
  id: "user-1",
  username: "cryptoprinter",
  walletAddress: "8xJU...",
  level: 3,
  xp: 350,
  xpToNextLevel: 500,
  totalProfit: 123.45,
  dailyStreak: 3,
  badges: [
    {
      id: "badge-1",
      name: "Early Adopter",
      description: "Joined during the beta phase",
      imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=64&h=64&fit=crop",
      unlockedAt: "2023-05-15T10:30:00Z",
      rarity: "uncommon"
    },
    {
      id: "badge-2",
      name: "First Profit",
      description: "Made your first profitable trade",
      imageUrl: "https://images.unsplash.com/photo-1621630854904-0ba933cb8ae8?w=64&h=64&fit=crop",
      unlockedAt: "2023-05-16T14:20:00Z",
      rarity: "common"
    },
  ],
  joinedAt: "2023-05-15T10:30:00Z",
  referralCode: "PRINT123",
  referralCount: 2,
  friends: ["user-2", "user-3"],
  streakMultiplier: 1.3,
  lastActive: new Date().toISOString(),
};

// Mock trades data
export const mockTrades: Trade[] = [
  {
    id: "trade-1",
    tokenName: "Solana Doge",
    tokenSymbol: "SOLDOGE",
    tokenLogo: "https://images.unsplash.com/photo-1616463169804-43ea9b666fed?w=64&h=64&fit=crop",
    entryPrice: 0.00001,
    exitPrice: 0.000015,
    amount: 10000000,
    profit: 50,
    profitPercentage: 50,
    status: "completed",
    createdAt: "2023-06-01T09:30:00Z",
    completedAt: "2023-06-01T10:15:00Z",
    xpEarned: 25,
    shared: true,
  },
  {
    id: "trade-2",
    tokenName: "Bonk",
    tokenSymbol: "BONK",
    tokenLogo: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=64&h=64&fit=crop",
    entryPrice: 0.0000002,
    exitPrice: 0.00000025,
    amount: 500000000,
    profit: 25,
    profitPercentage: 25,
    status: "completed",
    createdAt: "2023-06-02T14:20:00Z",
    completedAt: "2023-06-02T16:45:00Z",
    xpEarned: 15,
  },
  {
    id: "trade-3",
    tokenName: "Meme Coin",
    tokenSymbol: "MEME",
    tokenLogo: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=64&h=64&fit=crop",
    entryPrice: 0.0005,
    amount: 20000,
    status: "active",
    createdAt: "2023-06-03T11:10:00Z",
  },
];

// Mock leaderboard data
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: "user-2",
    username: "whale_master",
    rank: 1,
    level: 10,
    totalProfit: 5432.1,
    xp: 2500,
    badges: [
      {
        id: "badge-3",
        name: "Whale",
        description: "Made over $5000 in profit",
        imageUrl: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=64&h=64&fit=crop",
        unlockedAt: "2023-05-20T10:30:00Z",
        rarity: "rare"
      },
    ],
    dailyStreak: 7,
    team: "Alpha Hunters",
  },
  {
    userId: "user-3",
    username: "crypto_ninja",
    rank: 2,
    level: 8,
    totalProfit: 3210.5,
    xp: 1800,
    badges: [],
    dailyStreak: 5,
    team: "Alpha Hunters",
  },
  {
    userId: "user-4",
    username: "moon_boy",
    rank: 3,
    level: 7,
    totalProfit: 2345.67,
    xp: 1500,
    badges: [],
    dailyStreak: 3,
  },
  {
    userId: "user-1",
    username: "cryptoprinter",
    rank: 4,
    level: 3,
    totalProfit: 123.45,
    xp: 350,
    badges: [],
    dailyStreak: 3,
  },
];

// Mock missions data
export const mockMissions: Mission[] = [
  {
    id: "mission-1",
    title: "Print for 15 minutes",
    description: "Keep the bot running for at least 15 minutes",
    xpReward: 50,
    progress: 5,
    target: 15,
    completed: false,
    type: "daily",
    icon: "Clock",
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
  },
  {
    id: "mission-2",
    title: "Invite a friend",
    description: "Share your referral code with a friend",
    xpReward: 100,
    progress: 0,
    target: 1,
    completed: false,
    type: "daily",
    icon: "UserPlus",
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
  },
  {
    id: "mission-3",
    title: "Earn $10 profit today",
    description: "Make at least $10 in profit today",
    xpReward: 75,
    progress: 0,
    target: 10,
    completed: false,
    type: "daily",
    icon: "TrendingUp",
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
  },
  {
    id: "mission-4",
    title: "Close a trade above 15% profit",
    description: "Complete a trade with at least 15% profit",
    xpReward: 120,
    progress: 0,
    target: 1,
    completed: false,
    type: "daily",
    icon: "TrendingUp",
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
  },
  {
    id: "mission-5",
    title: "Stay in a trade 30+ minutes",
    description: "Hold a position for at least 30 minutes",
    xpReward: 80,
    progress: 0,
    target: 1,
    completed: false,
    type: "daily",
    icon: "Clock",
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
  },
];

// Mock bot status
export const mockBotStatus: BotStatus = {
  isActive: false,
  scannedTokens: 0,
  potentialSnipes: 0,
  activeSnipes: 0,
  completedSnipes: 0,
};

// Mock wallet data
export const mockWallet: Wallet = {
  address: "8xJU...",
  balance: 1.25,
  tokens: [
    {
      symbol: "SOL",
      name: "Solana",
      balance: 1.25,
      usdValue: 125.00,
      logo: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=64&h=64&fit=crop",
    },
    {
      symbol: "BONK",
      name: "Bonk",
      balance: 5000000,
      usdValue: 50.00,
      logo: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=64&h=64&fit=crop",
    },
  ],
  connected: true,
};

// Mock teams data
export const mockTeams: Team[] = [
  {
    id: "team-1",
    name: "Alpha Hunters",
    members: ["user-2", "user-3", "user-5"],
    createdAt: "2023-05-10T08:30:00Z",
    weeklyProfit: 432.5,
    totalProfit: 8765.4,
    rank: 1,
    logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=64&h=64&fit=crop",
  },
  {
    id: "team-2",
    name: "Degen Squad",
    members: ["user-6", "user-7", "user-8", "user-9"],
    createdAt: "2023-05-12T14:45:00Z",
    weeklyProfit: 321.8,
    totalProfit: 5432.1,
    rank: 2,
    logo: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=64&h=64&fit=crop",
  },
  {
    id: "team-3",
    name: "Profit Printers",
    members: ["user-10", "user-11", "user-12"],
    createdAt: "2023-05-15T11:20:00Z",
    weeklyProfit: 287.3,
    totalProfit: 3210.9,
    rank: 3,
    logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=64&h=64&fit=crop",
  },
];

// Mock challenges data
export const mockChallenges: Challenge[] = [
  {
    id: "challenge-1",
    challenger: "user-2",
    challenged: "user-1",
    startedAt: "2023-06-03T09:00:00Z",
    endsAt: "2023-06-04T09:00:00Z",
    challengerProfit: 45.2,
    challengedProfit: 32.8,
    status: "active",
    stake: 0.01,
  },
  {
    id: "challenge-2",
    challenger: "user-3",
    challenged: "user-4",
    startedAt: "2023-06-02T14:30:00Z",
    endsAt: "2023-06-03T14:30:00Z",
    challengerProfit: 28.5,
    challengedProfit: 37.2,
    status: "completed",
    stake: 0.02,
    winner: "user-4",
  },
];

// Mock social posts
export const mockSocialPosts: SocialPost[] = [
  {
    id: "post-1",
    userId: "user-2",
    username: "whale_master",
    userLevel: 10,
    content: "Just hit a 50% gain on this gem! The bot is printing money today. 🚀",
    tradeId: "trade-1",
    trade: mockTrades[0],
    createdAt: "2023-06-03T10:15:00Z",
    likes: 24,
    comments: 5,
    likedBy: ["user-3", "user-4", "user-1"],
  },
  {
    id: "post-2",
    userId: "user-3",
    username: "crypto_ninja",
    userLevel: 8,
    content: "The market is on fire today! My bot just sniped 3 tokens in the last hour. Who else is printing? 💰",
    createdAt: "2023-06-03T11:30:00Z",
    likes: 18,
    comments: 3,
    likedBy: ["user-2", "user-4"],
  },
  {
    id: "post-3",
    userId: "user-1",
    username: "cryptoprinter",
    userLevel: 3,
    content: "Just completed my first successful trade with MoneyPrinter! This is addictive. 🖨️",
    tradeId: "trade-2",
    trade: mockTrades[1],
    createdAt: "2023-06-02T16:50:00Z",
    likes: 12,
    comments: 2,
    likedBy: ["user-2"],
  },
];

// Mock streak data
export const mockStreak: Streak = {
  days: 3,
  lastUpdated: new Date().toISOString(),
  multiplier: 1.3,
  trades: 5,
  profitableTrades: 4,
};