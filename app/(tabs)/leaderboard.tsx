import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { TeamCard } from "@/components/TeamCard";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/constants/colors";
import { fontSize, fontWeight, spacing } from "@/constants/theme";
import { mockLeaderboard } from "@/mocks/data";

type TimeFilter = 'daily' | 'weekly' | 'monthly' | 'all-time';
type LeaderboardTab = 'users' | 'teams';

export default function LeaderboardScreen() {
  const { user, teams } = useAppStore();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('weekly');
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('users');
  
  // Mock usernames for team display
  const usernames: Record<string, string> = {
    'user-1': 'cryptoprinter',
    'user-2': 'whale_master',
    'user-3': 'crypto_ninja',
    'user-4': 'moon_boy',
    'user-5': 'degen_trader',
    'user-6': 'solana_king',
    'user-7': 'memecoin_hunter',
    'user-8': 'profit_printer',
    'user-9': 'alpha_seeker',
    'user-10': 'token_sniper',
    'user-11': 'crypto_wizard',
    'user-12': 'money_maker',
  };
  
  const renderTimeFilter = () => {
    const filters: { label: string; value: TimeFilter }[] = [
      { label: 'Daily', value: 'daily' },
      { label: 'Weekly', value: 'weekly' },
      { label: 'Monthly', value: 'monthly' },
      { label: 'All Time', value: 'all-time' },
    ];
    
    return (
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.filterButton,
              timeFilter === filter.value && styles.filterButtonActive,
            ]}
            onPress={() => setTimeFilter(filter.value)}
          >
            <Text
              style={[
                styles.filterText,
                timeFilter === filter.value && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'users' && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab('users')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'users' && styles.activeTabText,
          ]}
        >
          Users
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'teams' && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab('teams')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'teams' && styles.activeTabText,
          ]}
        >
          Teams
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Leaderboard" }} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Top Printers</Text>
          <Text style={styles.subtitle}>
            See who's printing the most money
          </Text>
        </View>
        
        {renderTabs()}
        {renderTimeFilter()}
        
        {activeTab === 'users' ? (
          <View style={styles.leaderboardContainer}>
            {mockLeaderboard.map((entry) => (
              <LeaderboardCard
                key={entry.userId}
                entry={entry}
                isCurrentUser={user?.id === entry.userId}
              />
            ))}
          </View>
        ) : (
          <View style={styles.teamsContainer}>
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                usernames={usernames}
                isUserMember={user?.team?.id === team.id}
                onJoin={() => useAppStore.getState().joinTeam(team.id)}
                onLeave={() => useAppStore.getState().leaveTeam()}
              />
            ))}
          </View>
        )}
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How to Climb the Ranks</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>1</Text>
            <Text style={styles.infoText}>
              Run the bot consistently to snipe profitable tokens
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>2</Text>
            <Text style={styles.infoText}>
              Complete daily missions to earn bonus XP
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>3</Text>
            <Text style={styles.infoText}>
              Maintain your daily streak for XP multipliers
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>4</Text>
            <Text style={styles.infoText}>
              Join a team to combine forces and earn team bonuses
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: fontSize.sm,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.background,
  },
  leaderboardContainer: {
    marginBottom: spacing.xl,
  },
  teamsContainer: {
    marginBottom: spacing.xl,
  },
  infoContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  infoTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    color: colors.background,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: "700",
    marginRight: spacing.md,
  },
  infoText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
});