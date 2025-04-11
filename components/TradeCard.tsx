import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from './Card';
import { Trade } from '@/types';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/theme';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react-native';

interface TradeCardProps {
  trade: Trade;
}

export const TradeCard: React.FC<TradeCardProps> = ({ trade }) => {
  const isActive = trade.status === 'active';
  const isProfit = trade.profit && trade.profit > 0;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.tokenInfo}>
          {trade.tokenLogo ? (
            <Image source={{ uri: trade.tokenLogo }} style={styles.tokenLogo} />
          ) : (
            <View style={styles.tokenLogoPlaceholder} />
          )}
          <View>
            <Text style={styles.tokenName}>{trade.tokenName}</Text>
            <Text style={styles.tokenSymbol}>{trade.tokenSymbol}</Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          {isActive ? (
            <View style={[styles.statusBadge, styles.activeBadge]}>
              <Clock size={12} color={colors.text} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          ) : (
            <View style={[
              styles.statusBadge, 
              isProfit ? styles.profitBadge : styles.lossBadge
            ]}>
              {isProfit ? (
                <TrendingUp size={12} color={colors.success} />
              ) : (
                <TrendingDown size={12} color={colors.error} />
              )}
              <Text style={[
                styles.statusText,
                isProfit ? styles.profitText : styles.lossText
              ]}>
                {isProfit ? 'Profit' : 'Loss'}
              </Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Entry Price</Text>
          <Text style={styles.detailValue}>${trade.entryPrice.toFixed(8)}</Text>
        </View>
        
        {trade.exitPrice && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Exit Price</Text>
            <Text style={styles.detailValue}>${trade.exitPrice.toFixed(8)}</Text>
          </View>
        )}
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>{trade.amount.toLocaleString()}</Text>
        </View>
        
        {trade.profit !== undefined && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Profit</Text>
            <Text style={[
              styles.detailValue,
              isProfit ? styles.profitText : styles.lossText
            ]}>
              {isProfit ? '+' : '-'}${Math.abs(trade.profit).toFixed(2)} ({trade.profitPercentage}%)
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          {isActive ? 'Started' : 'Completed'}: {formatDate(isActive ? trade.createdAt : trade.completedAt || trade.createdAt)}
        </Text>
        
        {trade.xpEarned && (
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+{trade.xpEarned} XP</Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  tokenLogoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    marginRight: 12,
  },
  tokenName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  tokenSymbol: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  activeBadge: {
    backgroundColor: colors.cardHighlight,
  },
  profitBadge: {
    backgroundColor: colors.primarySoft,
  },
  lossBadge: {
    backgroundColor: colors.errorSoft,
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  profitText: {
    color: colors.success,
  },
  lossText: {
    color: colors.error,
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  detailValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  timestamp: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  xpBadge: {
    backgroundColor: 'rgba(123, 97, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  xpText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.xpBase,
  },
});