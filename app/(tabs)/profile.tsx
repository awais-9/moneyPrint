import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { LevelCard } from "@/components/LevelCard";
import { StreakIndicator } from "@/components/StreakIndicator";
import { RankModal } from "@/components/RankModal";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/constants/colors";
import { fontSize, fontWeight, spacing, borderRadius } from "@/constants/theme";
import { 
  Bell, 
  Volume2, 
  Vibrate, 
  Moon, 
  Share2, 
  LogOut, 
  ChevronRight,
  Settings,
  Award,
  Flame
} from "lucide-react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, settings, updateSettings, logout, streak } = useAppStore();
  const [showRankModal, setShowRankModal] = useState(false);
  
  if (!user) {
    router.replace("/");
    return null;
  }

  const handleToggleSetting = (key: keyof typeof settings) => {
    updateSettings({ [key]: !settings[key] });
  };

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    isEnabled: boolean,
    onToggle: () => void
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        {icon}
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Switch
        value={isEnabled}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primaryDark }}
        thumbColor={isEnabled ? colors.primary : colors.textSecondary}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Profile",
          headerRight: () => (
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={20} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={() => setShowRankModal(true)}
          >
            <Text style={styles.avatarText}>
              {user.username.charAt(0).toUpperCase()}
            </Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{user.level}</Text>
            </View>
          </TouchableOpacity>
          
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.joinDate}>
            Member since {new Date(user.joinedAt).toLocaleDateString()}
          </Text>
          
          {streak.days > 0 && (
            <View style={styles.streakContainer}>
              <StreakIndicator days={streak.days} multiplier={streak.multiplier} />
            </View>
          )}
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${user.totalProfit.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Profit</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.xp}</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.badges.length}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>
        
        <LevelCard user={user} />
        
        <Card variant="default" style={styles.referralCard}>
          <Text style={styles.referralTitle}>Invite Friends</Text>
          <Text style={styles.referralDescription}>
            Share your referral code with friends and earn XP bonuses when they join
          </Text>
          
          <View style={styles.referralCodeContainer}>
            <Text style={styles.referralCode}>{user.referralCode}</Text>
            <TouchableOpacity style={styles.shareButton}>
              <Share2 size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.referralStats}>
            <Text style={styles.referralCount}>
              {user.referralCount} friends invited
            </Text>
            <Text style={styles.referralBonus}>
              +50 XP per referral
            </Text>
          </View>
        </Card>
        
        <View style={styles.badgesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Badges</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badgesList}
          >
            {user.badges.map((badge) => (
              <View key={badge.id} style={styles.badgeItem}>
                <View style={[styles.badgeIcon, styles[`${badge.rarity}Badge`]]}>
                  <Award size={24} color={colors.primary} />
                </View>
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            ))}
            
            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, styles.lockedBadge]}>
                <Award size={24} color={colors.textMuted} />
              </View>
              <Text style={styles.badgeName}>???</Text>
            </View>
          </ScrollView>
        </View>
        
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <Card variant="default" style={styles.settingsCard}>
            {renderSettingItem(
              <Bell size={20} color={colors.text} style={styles.settingIcon} />,
              "Notifications",
              settings.notifications,
              () => handleToggleSetting("notifications")
            )}
            
            {renderSettingItem(
              <Volume2 size={20} color={colors.text} style={styles.settingIcon} />,
              "Sound Effects",
              settings.soundEffects,
              () => handleToggleSetting("soundEffects")
            )}
            
            {renderSettingItem(
              <Vibrate size={20} color={colors.text} style={styles.settingIcon} />,
              "Vibration",
              settings.vibration,
              () => handleToggleSetting("vibration")
            )}
            
            {renderSettingItem(
              <Moon size={20} color={colors.text} style={styles.settingIcon} />,
              "Dark Mode",
              settings.darkMode,
              () => handleToggleSetting("darkMode")
            )}
          </Card>
        </View>
        
        <TouchableOpacity style={styles.botSettingsButton}>
          <Text style={styles.botSettingsText}>Bot Settings</Text>
          <ChevronRight size={20} color={colors.text} />
        </TouchableOpacity>
        
        <Button
          title="Log Out"
          onPress={logout}
          variant="outline"
          size="medium"
          fullWidth
          style={styles.logoutButton}
          icon={<LogOut size={20} color={colors.primary} />}
        />
      </ScrollView>
      
      <RankModal
        visible={showRankModal}
        onClose={() => setShowRankModal(false)}
        level={user.level}
        xp={user.xp}
        xpToNextLevel={user.xpToNextLevel}
        badges={user.badges}
      />
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
  settingsButton: {
    padding: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    position: 'relative',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.background,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: fontSize.sm,
    fontWeight: "700",
    color: colors.primary,
  },
  username: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  joinDate: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  streakContainer: {
    marginTop: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  referralCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  referralTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  referralDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardHighlight,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: 8,
  },
  referralCode: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
  },
  shareButton: {
    padding: 4,
  },
  referralStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  referralCount: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  referralBonus: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: "500",
  },
  badgesContainer: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
  },
  viewAllText: {
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  badgesList: {
    paddingBottom: spacing.sm,
  },
  badgeItem: {
    alignItems: 'center',
    marginRight: spacing.md,
    width: 70,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  commonBadge: {
    backgroundColor: 'rgba(158, 158, 158, 0.2)',
  },
  uncommonBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  rareBadge: {
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
  },
  epicBadge: {
    backgroundColor: 'rgba(156, 39, 176, 0.2)',
  },
  legendaryBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  lockedBadge: {
    backgroundColor: 'rgba(66, 66, 66, 0.2)',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  badgeName: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  settingsContainer: {
    marginBottom: spacing.lg,
  },
  settingsCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: spacing.md,
  },
  settingTitle: {
    fontSize: fontSize.md,
    color: colors.text,
  },
  botSettingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.xl,
  },
  botSettingsText: {
    fontSize: fontSize.md,
    fontWeight: "500",
    color: colors.text,
  },
  logoutButton: {
    marginBottom: spacing.xl,
  },
});