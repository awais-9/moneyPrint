import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { TradeCard } from "@/components/TradeCard";
import { StreakIndicator } from "@/components/StreakIndicator";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/constants/colors";
import { fontSize, fontWeight, spacing, borderRadius, shadows } from "@/constants/theme";
import { Filter, Share2 } from "lucide-react-native";

export default function ActivityScreen() {
  const { trades, streak, user } = useAppStore();
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const activeTrades = trades.filter(trade => trade.status === 'active');
  const completedTrades = trades.filter(trade => trade.status === 'completed');
  
  const totalProfit = completedTrades.reduce((sum, trade) => sum + (trade.profit || 0), 0);
  
  const handleShareTrade = () => {
    if (selectedTrade) {
      useAppStore.getState().shareTrade(selectedTrade);
      setShowShareModal(false);
      setSelectedTrade(null);
    }
  };
  
  const renderShareModal = () => (
    <Modal
      visible={showShareModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowShareModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Share Trade</Text>
          <Text style={styles.modalDescription}>
            Share this trade to the social feed and earn +10 XP
          </Text>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowShareModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.shareButton]}
              onPress={handleShareTrade}
            >
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Activity",
          headerRight: () => (
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{trades.length}</Text>
            <Text style={styles.summaryLabel}>Total Trades</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{activeTrades.length}</Text>
            <Text style={styles.summaryLabel}>Active</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={[
              styles.summaryValue,
              totalProfit >= 0 ? styles.profitText : styles.lossText
            ]}>
              {totalProfit >= 0 ? '+' : '-'}${Math.abs(totalProfit).toFixed(2)}
            </Text>
            <Text style={styles.summaryLabel}>Total Profit</Text>
          </View>
        </View>
        
        {streak.days > 0 && (
          <View style={styles.streakContainer}>
            <StreakIndicator days={streak.days} multiplier={streak.multiplier} />
          </View>
        )}
        
        {activeTrades.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Active Trades</Text>
            
            {activeTrades.map(trade => (
              <View key={trade.id} style={styles.tradeContainer}>
                <TradeCard trade={trade} />
                <TouchableOpacity 
                  style={styles.shareTradeButton}
                  onPress={() => {
                    setSelectedTrade(trade.id);
                    setShowShareModal(true);
                  }}
                >
                  <Share2 size={16} color={colors.textSecondary} />
                  <Text style={styles.shareTradeText}>Share</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Completed Trades</Text>
          
          {completedTrades.length > 0 ? (
            completedTrades.map(trade => (
              <View key={trade.id} style={styles.tradeContainer}>
                <TradeCard trade={trade} />
                <TouchableOpacity 
                  style={styles.shareTradeButton}
                  onPress={() => {
                    setSelectedTrade(trade.id);
                    setShowShareModal(true);
                  }}
                >
                  <Share2 size={16} color={colors.textSecondary} />
                  <Text style={styles.shareTradeText}>
                    {trade.shared ? 'Shared' : 'Share'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No completed trades yet</Text>
              <Text style={styles.emptySubtext}>
                Start the printer to begin sniping tokens
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      {renderShareModal()}
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
  filterButton: {
    padding: spacing.md,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  profitText: {
    color: colors.success,
  },
  lossText: {
    color: colors.error,
  },
  streakContainer: {
    marginBottom: spacing.lg,
  },
  sectionContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.md,
  },
  tradeContainer: {
    marginBottom: spacing.md,
  },
  shareTradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
    borderBottomLeftRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
    marginTop: -8,
  },
  shareTradeText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  emptyText: {
    fontSize: fontSize.md,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.large,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  cancelButton: {
    backgroundColor: colors.cardHighlight,
  },
  shareButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
  },
  shareButtonText: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.background,
  },
});