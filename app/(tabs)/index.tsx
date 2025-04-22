import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Button } from "@/components/Button";
import { MoneyPrinter } from "@/components/MoneyPrinter";
import { WalletCard } from "@/components/WalletCard";
import { MissionCard } from "@/components/MissionCard";
import { MissionsPanel } from "@/components/MissionsPanel";
import { RankBadge } from "@/components/RankBadge";
import { StreakIndicator } from "@/components/StreakIndicator";
import { RankModal } from "@/components/RankModal";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/constants/colors";
import { fontSize, fontWeight, spacing, getRankTitle } from "@/constants/theme";
import * as Haptics from "expo-haptics";
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';


export default function DashboardScreen() {
  const [uptime, setUptime] = useState({ hours: 3, minutes: 21 });
  const [trades, setTrades] = useState(21);
  const [profit, setProfit] = useState(32);

  // Simulate uptime increase
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => {
        let newMinutes = prev.minutes + 1;
        let newHours = prev.hours;

        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours += 1;
        }

        return { hours: newHours, minutes: newMinutes };
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);
  // old
  const {
    botStatus,
    toggleBot,
    updateBotStatus,
    wallet,
    isAuthenticated,
    user,
    missions,
    streak,
  } = useAppStore();

  const [showRankModal, setShowRankModal] = useState(false);

  // Simulate bot activity when active
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (botStatus.isActive) {
      interval = setInterval(() => {
        updateBotStatus({
          scannedTokens: botStatus.scannedTokens + Math.floor(Math.random() * 5) + 1,
          potentialSnipes: botStatus.potentialSnipes + (Math.random() > 0.7 ? 1 : 0),
        });

        // Update mission progress for "Print for 15 minutes"
        useAppStore.getState().updateMissionProgress("mission-1", 1);
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [botStatus.isActive]);

  const handleToggleBot = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    toggleBot();
  };



  if (!isAuthenticated || !wallet || !user) {
    return (
      <SafeAreaView style={styles.main}>
        <Stack.Screen options={{ title: "MoneyPrinter" }} />
        {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Money Printer</Text>
      </View> */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}


          {/* User Info */}
          <View style={styles.userInfo}>
            <View style={styles.levelCircle}>
              <Text style={styles.levelNumber}>3</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.userName}>Ahmed Hussain Mujtaba</Text>
            </View>
            <View style={styles.fireContainer}>
              <MaterialCommunityIcons name="fire" size={20} color="#ff7700" />
              <Text style={styles.fireCount}>3</Text>
            </View>
          </View>

          {/* Printer Status */}
          <View style={styles.printerStatus}>
            <MaterialIcons name="print" size={40} color="#777" />
            <Text style={styles.readyText}>Ready to Print</Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Scanned</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Potential</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Active</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
            </View>
          </View>

          {/* BOT Status Card */}
          <View style={styles.botCard}>
            <Text style={styles.cardTitle}>BOT Status Card</Text>

            <View style={styles.botStatusRow}>
              <View style={styles.botStatusColumn}>
                <Text style={styles.botStatusLabel}>Mode</Text>
                <Text style={styles.botStatusValue}>Turbo</Text>
              </View>
              <View style={styles.botStatusColumn}>
                <Text style={styles.botStatusLabel}>Uptime</Text>
                <Text style={styles.botStatusValue}>{uptime.hours}h {uptime.minutes}m</Text>
              </View>
            </View>

            <View style={styles.botStatusRow}>
              <View style={styles.botStatusColumn}>
                <Text style={styles.botStatusLabel}>Trades Executed</Text>
                <Text style={styles.botStatusValue}>{trades}</Text>
              </View>
              <View style={styles.botStatusColumn}>
                <Text style={styles.botStatusLabel}>Profit</Text>
                <Text style={styles.botStatusValue}>{profit}%</Text>
              </View>
            </View>
          </View>

          {/* Start Printing Button */}
          <TouchableOpacity style={styles.printButton}>
            <Text style={styles.printButtonText}>Start Printing</Text>
          </TouchableOpacity>

          {/* XP & Level */}
          <View style={styles.xpContainer}>
            <View style={styles.xpHeader}>
              <View style={styles.xpTitleContainer}>
                <Ionicons name="rocket" size={18} color="#8b5cf6" />
                <Text style={styles.xpTitle}>XP & Level</Text>
              </View>
              <View style={styles.levelContainer}>
                <MaterialCommunityIcons name="medal" size={18} color="#4ade80" />
                <Text style={styles.levelText}>Level 5</Text>
              </View>
            </View>

            <View style={styles.xpDetails}>
              <Text style={styles.xpText}>XP Current / XP Needed</Text>
              <Text style={styles.xpBonus}>+55 xp</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '64%' }]} />
            </View>

            <Text style={styles.xpNumbers}>3200 / 5000 XP to Level 6</Text>
          </View>

          {/* Live Alerts Panel */}
          <View style={styles.alertsContainer}>
            <View style={styles.alertsHeader}>
              <MaterialIcons name="notifications-active" size={18} color="#f87171" />
              <Text style={styles.alertsTitle}>Live Alerts Panel</Text>
            </View>

            <View style={styles.alertItem}>
              <FontAwesome5 name="exclamation-triangle" size={16} color="#f59e0b" />
              <View style={styles.alertContent}>
                <Text style={styles.alertText}>High slippage detected: 8%</Text>
                <Text style={styles.alertMeta}>1 min ago • Mode: YOLO</Text>
              </View>
            </View>

            <View style={styles.alertItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4ade80" />
              <View style={styles.alertContent}>
                <Text style={styles.alertText}>Trade closed: +$38.52 profit</Text>
                <Text style={styles.alertMeta}>3 min ago • Mode: Safe</Text>
              </View>
            </View>

            <View style={styles.alertItem}>
              <MaterialCommunityIcons name="pencil-box-outline" size={16} color="#a1a1aa" />
              <View style={styles.alertContent}>
                <Text style={styles.alertText}>Bought $SOL @ $140 (TP: $160)</Text>
                <Text style={styles.alertMeta}>5 min ago • Mode: Turbo</Text>
              </View>
            </View>
          </View>

          {/* Wallet */}
          <View style={styles.walletContainer}>
            <View style={styles.walletHeader}>
              <MaterialIcons name="account-balance-wallet" size={18} color="#4ade80" />
              <Text style={styles.walletTitle}>Wallet</Text>
            </View>

            <View style={styles.walletAddressRow}>
              <Text style={styles.walletAddress}>8xJU...</Text>
              <MaterialIcons name="content-copy" size={20} color="#777" />
            </View>

            <Text style={styles.balanceLabel}>Balance</Text>
            <View style={styles.balanceContainer}>
              <Text style={styles.mainBalance}>1.2400 SOL</Text>
              <Text style={styles.usdBalance}>$125.00 USD</Text>
            </View>

            <View style={styles.divider} />
            <Text style={styles.tokensLabel}>Tokens</Text>
            <View style={styles.tokenItem}>
              <Text style={styles.tokenName}>Bonk</Text>
              <View style={styles.tokenValueContainer}>
                <Text style={styles.tokenAmount}>5M</Text>
                <Text style={styles.tokenUsdValue}>$50.00</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "MoneyPrinter" }} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setShowRankModal(true)}>
              <RankBadge
                level={user.level}
                xp={user.xp}
                xpToNextLevel={user.xpToNextLevel}
                size="medium"
              />
            </TouchableOpacity>

            <View style={styles.headerInfo}>
              <Text style={styles.greeting}>Welcome back!</Text>
              <Text style={styles.rankTitle}>{getRankTitle(user.level)}</Text>
            </View>
          </View>

          {streak.days > 0 && (
            <StreakIndicator
              days={streak.days}
              multiplier={streak.multiplier}
              compact
            />
          )}
        </View>

        <MoneyPrinter
          isActive={botStatus.isActive}
          scannedTokens={botStatus.scannedTokens}
          potentialSnipes={botStatus.potentialSnipes}
          activeSnipes={botStatus.activeSnipes}
          completedSnipes={botStatus.completedSnipes}
        />

        <Button
          title={botStatus.isActive ? "Stop Printing" : "Start Printing"}
          onPress={handleToggleBot}
          variant={botStatus.isActive ? "danger" : "primary"}
          size="large"
          fullWidth
          gradient={!botStatus.isActive}
          style={styles.actionButton}
        />

        {streak.days > 0 && (
          <StreakIndicator
            days={streak.days}
            multiplier={streak.multiplier}
          />
        )}

        <MissionsPanel
          missions={missions}
          compact
          onViewAllPress={() => { }}
        />

        <WalletCard
          wallet={wallet}
          onCopyAddress={() => { }}
          onViewExplorer={() => { }}
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
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    marginTop: 30,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  levelCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4ade80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: {
    color: 'white',
    fontWeight: 'bold',
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  welcomeText: {
    color: '#a1a1aa',
    fontSize: 14,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fireContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fireCount: {
    color: 'white',
    marginLeft: 4,
  },
  printerStatus: {
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    marginBottom: 24,
    borderRadius: 26,
    padding: 16,
    // borderWidth:1
    // marginBottom: 16,
  },
  readyText: {
    color: '#a1a1aa',
    marginTop: 8,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#a1a1aa',
    fontSize: 12,
  },
  botCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#FFFFFF',
    marginBottom: 12,
    fontSize:15,

  },
  botStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  botStatusColumn: {
    flex: 1,
  },
  botStatusLabel: {
    color: '#a1a1aa',
    fontSize: 12,
  },
  botStatusValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  printButton: {
    backgroundColor: '#4ade80',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  printButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  xpContainer: {
    marginBottom: 24,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  xpTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpTitle: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    color: '#4ade80',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  xpDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  xpText: {
    color: '#a1a1aa',
    fontSize: 12,
  },
  xpBonus: {
    color: '#4ade80',
    fontSize: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ade80',
    borderRadius: 4,
  },
  xpNumbers: {
    color: '#a1a1aa',
    fontSize: 12,
    textAlign: 'center',
  },
  alertsContainer: {
    marginBottom: 24,
  },
  alertsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertsTitle: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  alertContent: {
    marginLeft: 12,
    flex: 1,
  },
  alertText: {
    color: 'white',
  },
  alertMeta: {
    color: '#a1a1aa',
    fontSize: 12,
    marginTop: 4,
  },
  walletContainer: {
    marginBottom: 24,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletTitle: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  walletAddressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletAddress: {
    color: '#a1a1aa',
  },
  balanceLabel: {
    color: '#a1a1aa',
    marginBottom: 4,
  },
  balanceContainer: {
    marginBottom: 16,
  },
  mainBalance: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  usdBalance: {
    color: '#a1a1aa',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 16,
  },
  tokensLabel: {
    color: '#a1a1aa',
    marginBottom: 12,
  },
  tokenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenName: {
    color: '#a1a1aa',
  },
  tokenValueContainer: {
    alignItems: 'flex-end',
  },
  tokenAmount: {
    color: 'white',
    fontWeight: 'bold',
  },
  tokenUsdValue: {
    color: '#a1a1aa',
  },

  main: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    // flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    marginLeft: spacing.md,
  },
  greeting: {
    fontSize: fontSize.md,
    fontWeight: "500" as const,
    color: colors.textSecondary,
  },
  rankTitle: {
    fontSize: fontSize.lg,
    fontWeight: "700" as const,
    color: colors.text,
  },
  actionButton: {
    marginVertical: spacing.lg,
  },
  // connectContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: spacing.xl,
  // },
  // connectTitle: {
  //   fontSize: fontSize.xxl,
  //   fontWeight: "700" as const,
  //   color: colors.text,
  //   marginBottom: spacing.md,
  //   textAlign: 'center',
  // },
  // connectDescription: {
  //   fontSize: fontSize.md,
  //   color: colors.textSecondary,
  //   textAlign: 'center',
  //   marginBottom: spacing.xl,
  // },
  // connectButton: {
  //   marginTop: spacing.lg,
  // },
});