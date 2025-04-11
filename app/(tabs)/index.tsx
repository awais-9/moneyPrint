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

export default function DashboardScreen() {
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
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: "MoneyPrinter" }} />
        <View style={styles.connectContainer}>
          <Text style={styles.connectTitle}>Connect Your Wallet</Text>
          <Text style={styles.connectDescription}>
            Connect your Phantom wallet to start printing money automatically.
          </Text>
          <Button 
            title="Connect Wallet" 
            onPress={() => useAppStore.getState().login("8xJU...")}
            gradient
            size="large"
            style={styles.connectButton}
          />
        </View>
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
          onViewAllPress={() => {}}
        />
        
        <WalletCard 
          wallet={wallet}
          onCopyAddress={() => {}}
          onViewExplorer={() => {}}
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
  connectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  connectTitle: {
    fontSize: fontSize.xxl,
    fontWeight: "700" as const,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  connectDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  connectButton: {
    marginTop: spacing.lg,
  },
});