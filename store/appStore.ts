import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Trade, BotStatus, Wallet, AppSettings, Mission, Challenge, SocialPost, Team, Streak } from '@/types';
import { mockUser, mockTrades, mockBotStatus, mockWallet, mockMissions, mockChallenges, mockSocialPosts, mockTeams, mockStreak } from '@/mocks/data';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Bot state
  botStatus: BotStatus;
  
  // Wallet state
  wallet: Wallet | null;
  
  // Trades state
  trades: Trade[];
  
  // App settings
  settings: AppSettings;

  // Missions
  missions: Mission[];

  // Social
  challenges: Challenge[];
  socialPosts: SocialPost[];
  teams: Team[];

  // Streak
  streak: Streak;
  
  // Actions
  setUser: (user: User | null) => void;
  updateUserXP: (xp: number) => void;
  updateUserLevel: (level: number) => void;
  updateUserProfit: (profit: number) => void;
  updateUserStreak: (days: number) => void;
  
  toggleBot: () => void;
  updateBotStatus: (status: Partial<BotStatus>) => void;
  
  setWallet: (wallet: Wallet | null) => void;
  updateWalletBalance: (balance: number) => void;
  
  addTrade: (trade: Trade) => void;
  updateTrade: (tradeId: string, updates: Partial<Trade>) => void;
  
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Mission actions
  updateMissionProgress: (missionId: string, progress: number) => void;
  completeMission: (missionId: string) => void;
  resetDailyMissions: () => void;

  // Social actions
  addChallenge: (challenge: Challenge) => void;
  updateChallenge: (challengeId: string, updates: Partial<Challenge>) => void;
  addSocialPost: (post: SocialPost) => void;
  likeSocialPost: (postId: string, userId: string) => void;
  shareTrade: (tradeId: string) => void;
  joinTeam: (teamId: string) => void;
  leaveTeam: () => void;

  // Streak actions
  updateStreak: (updates: Partial<Streak>) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  
  // Auth actions
  login: (walletAddress: string) => void;
  logout: () => void;
}

// Default settings
const defaultSettings: AppSettings = {
  notifications: true,
  soundEffects: true,
  vibration: true,
  darkMode: true,
  botSettings: {
    maxInvestmentPerTrade: 0.1, // SOL
    takeProfit: 20, // %
    stopLoss: 10, // %
    maxConcurrentTrades: 3,
    autoReinvest: false,
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      botStatus: { ...mockBotStatus },
      wallet: null,
      trades: [],
      settings: { ...defaultSettings },
      missions: [],
      challenges: [],
      socialPosts: [],
      teams: [...mockTeams],
      streak: { ...mockStreak },
      
      // User actions
      setUser: (user) => set({ user }),
      updateUserXP: (xp) => {
        const user = get().user;
        if (user) {
          const newXP = user.xp + xp;
          let newLevel = user.level;
          let xpToNextLevel = user.xpToNextLevel;
          
          // Check if user leveled up
          if (newXP >= user.xpToNextLevel) {
            newLevel += 1;
            xpToNextLevel = Math.round(user.xpToNextLevel * 1.5);
          }
          
          set({ 
            user: { 
              ...user, 
              xp: newXP, 
              level: newLevel,
              xpToNextLevel: xpToNextLevel
            } 
          });
        }
      },
      updateUserLevel: (level) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, level } });
        }
      },
      updateUserProfit: (profit) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, totalProfit: user.totalProfit + profit } });
        }
      },
      updateUserStreak: (days) => {
        const user = get().user;
        if (user) {
          const multiplier = 1 + (days * 0.1); // 10% bonus per day
          set({ 
            user: { 
              ...user, 
              dailyStreak: days,
              streakMultiplier: multiplier
            } 
          });
        }
      },
      
      // Bot actions
      toggleBot: () => {
        const botStatus = get().botStatus;
        set({
          botStatus: {
            ...botStatus,
            isActive: !botStatus.isActive,
            startedAt: !botStatus.isActive ? new Date().toISOString() : botStatus.startedAt,
          },
        });

        // Update mission progress if bot is activated
        if (!botStatus.isActive) {
          get().updateMissionProgress("mission-1", 0); // Reset the bot running mission
        }
      },
      updateBotStatus: (status) => {
        set({ botStatus: { ...get().botStatus, ...status } });
      },
      
      // Wallet actions
      setWallet: (wallet) => set({ wallet }),
      updateWalletBalance: (balance) => {
        const wallet = get().wallet;
        if (wallet) {
          set({ wallet: { ...wallet, balance } });
        }
      },
      
      // Trade actions
      addTrade: (trade) => {
        set({ trades: [trade, ...get().trades] });
      },
      updateTrade: (tradeId, updates) => {
        const trades = get().trades.map((trade) =>
          trade.id === tradeId ? { ...trade, ...updates } : trade
        );
        set({ trades });
        
        // If trade completed with profit, update user profit
        if (updates.status === 'completed' && updates.profit) {
          get().updateUserProfit(updates.profit);
          
          // Apply streak multiplier to XP
          const xpBase = updates.xpEarned || 0;
          const multiplier = get().user?.streakMultiplier || 1;
          const xpWithBonus = Math.round(xpBase * multiplier);
          
          if (xpWithBonus > 0) {
            get().updateUserXP(xpWithBonus);
          }
          
          // Update mission progress
          if (updates.profit > 0) {
            get().updateMissionProgress("mission-3", updates.profit);
            
            // Check for 15% profit mission
            if (updates.profitPercentage && updates.profitPercentage >= 15) {
              get().completeMission("mission-4");
            }
          }
          
          // Increment streak
          get().incrementStreak();
        }
      },
      
      // Settings actions
      updateSettings: (settings) => {
        set({ settings: { ...get().settings, ...settings } });
      },
      
      // Mission actions
      updateMissionProgress: (missionId, progress) => {
        const missions = get().missions.map((mission) => {
          if (mission.id === missionId) {
            const newProgress = mission.progress + progress;
            const completed = newProgress >= mission.target;
            
            // If mission is completed, award XP
            if (completed && !mission.completed) {
              get().updateUserXP(mission.xpReward);
            }
            
            return {
              ...mission,
              progress: newProgress,
              completed: completed,
            };
          }
          return mission;
        });
        
        set({ missions });
      },
      completeMission: (missionId) => {
        const missions = get().missions.map((mission) => {
          if (mission.id === missionId && !mission.completed) {
            // Award XP for completing the mission
            get().updateUserXP(mission.xpReward);
            
            return {
              ...mission,
              progress: mission.target,
              completed: true,
            };
          }
          return mission;
        });
        
        set({ missions });
      },
      resetDailyMissions: () => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        
        const missions = get().missions.map((mission) => {
          if (mission.type === 'daily') {
            return {
              ...mission,
              progress: 0,
              completed: false,
              expiresAt: today.toISOString(),
            };
          }
          return mission;
        });
        
        set({ missions });
      },
      
      // Social actions
      addChallenge: (challenge) => {
        set({ challenges: [challenge, ...get().challenges] });
      },
      updateChallenge: (challengeId, updates) => {
        const challenges = get().challenges.map((challenge) =>
          challenge.id === challengeId ? { ...challenge, ...updates } : challenge
        );
        set({ challenges });
      },
      addSocialPost: (post) => {
        set({ socialPosts: [post, ...get().socialPosts] });
      },
      likeSocialPost: (postId, userId) => {
        const socialPosts = get().socialPosts.map((post) => {
          if (post.id === postId) {
            const alreadyLiked = post.likedBy.includes(userId);
            
            if (alreadyLiked) {
              return {
                ...post,
                likes: post.likes - 1,
                likedBy: post.likedBy.filter((id) => id !== userId),
              };
            } else {
              return {
                ...post,
                likes: post.likes + 1,
                likedBy: [...post.likedBy, userId],
              };
            }
          }
          return post;
        });
        
        set({ socialPosts });
      },
      shareTrade: (tradeId) => {
        // Find the trade
        const trade = get().trades.find((t) => t.id === tradeId);
        const user = get().user;
        
        if (trade && user) {
          // Mark trade as shared
          get().updateTrade(tradeId, { shared: true });
          
          // Create a social post
          const post: SocialPost = {
            id: `post-${Date.now()}`,
            userId: user.id,
            username: user.username,
            userLevel: user.level,
            content: `Just ${trade.status === 'completed' ? 'completed' : 'started'} a trade on ${trade.tokenName}! ${trade.profit && trade.profit > 0 ? `Made a ${trade.profitPercentage}% profit! 🚀` : ''}`,
            tradeId,
            trade,
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: 0,
            likedBy: [],
          };
          
          get().addSocialPost(post);
          
          // Award XP for sharing
          get().updateUserXP(10);
        }
      },
      joinTeam: (teamId) => {
        const user = get().user;
        const team = get().teams.find((t) => t.id === teamId);
        
        if (user && team) {
          // Add user to team
          const updatedTeam = {
            ...team,
            members: [...team.members, user.id],
          };
          
          // Update teams
          const teams = get().teams.map((t) =>
            t.id === teamId ? updatedTeam : t
          );
          
          // Update user
          set({
            user: { ...user, team: updatedTeam },
            teams,
          });
        }
      },
      leaveTeam: () => {
        const user = get().user;
        
        if (user && user.team) {
          const teamId = user.team.id;
          const team = get().teams.find((t) => t.id === teamId);
          
          if (team) {
            // Remove user from team
            const updatedTeam = {
              ...team,
              members: team.members.filter((id) => id !== user.id),
            };
            
            // Update teams
            const teams = get().teams.map((t) =>
              t.id === teamId ? updatedTeam : t
            );
            
            // Update user
            set({
              user: { ...user, team: undefined },
              teams,
            });
          }
        }
      },
      
      // Streak actions
      updateStreak: (updates) => {
        set({ streak: { ...get().streak, ...updates } });
      },
      incrementStreak: () => {
        const streak = get().streak;
        const lastUpdated = new Date(streak.lastUpdated);
        const today = new Date();
        
        // Check if last update was yesterday
        const isConsecutiveDay = 
          today.getDate() - lastUpdated.getDate() === 1 ||
          (today.getDate() === 1 && lastUpdated.getDate() === new Date(lastUpdated.getFullYear(), lastUpdated.getMonth() + 1, 0).getDate());
        
        if (isConsecutiveDay) {
          const newDays = streak.days + 1;
          const newMultiplier = 1 + (newDays * 0.1); // 10% bonus per day
          
          set({
            streak: {
              ...streak,
              days: newDays,
              multiplier: newMultiplier,
              lastUpdated: today.toISOString(),
              trades: streak.trades + 1,
              profitableTrades: streak.profitableTrades + 1,
            },
          });
          
          // Update user streak
          get().updateUserStreak(newDays);
        } else if (today.toDateString() !== lastUpdated.toDateString()) {
          // If it's a new day but not consecutive, reset streak to 1
          set({
            streak: {
              ...streak,
              days: 1,
              multiplier: 1.1,
              lastUpdated: today.toISOString(),
              trades: streak.trades + 1,
              profitableTrades: streak.profitableTrades + 1,
            },
          });
          
          // Update user streak
          get().updateUserStreak(1);
        } else {
          // Same day, just increment trades
          set({
            streak: {
              ...streak,
              trades: streak.trades + 1,
              profitableTrades: streak.profitableTrades + 1,
            },
          });
        }
      },
      resetStreak: () => {
        const today = new Date();
        
        set({
          streak: {
            days: 0,
            multiplier: 1,
            lastUpdated: today.toISOString(),
            trades: 0,
            profitableTrades: 0,
          },
        });
        
        // Update user streak
        get().updateUserStreak(0);
      },
      
      // Auth actions
      login: (walletAddress) => {
        // In a real app, this would make an API call
        // For now, we'll use mock data
        set({
          isAuthenticated: true,
          user: { ...mockUser, walletAddress },
          wallet: { ...mockWallet, address: walletAddress },
          trades: [...mockTrades],
          missions: [...mockMissions],
          challenges: [...mockChallenges],
          socialPosts: [...mockSocialPosts],
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          wallet: null,
          trades: [],
          botStatus: { ...mockBotStatus },
          missions: [],
          challenges: [],
          socialPosts: [],
          streak: {
            days: 0,
            multiplier: 1,
            lastUpdated: new Date().toISOString(),
            trades: 0,
            profitableTrades: 0,
          },
        });
      },
    }),
    {
      name: 'money-printer-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        wallet: state.wallet,
        trades: state.trades,
        settings: state.settings,
        streak: state.streak,
      }),
    }
  )
);