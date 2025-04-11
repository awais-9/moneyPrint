import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { Wallet } from '@/types';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/theme';
import { Wallet as WalletIcon, Copy, ExternalLink } from 'lucide-react-native';

interface WalletCardProps {
  wallet: Wallet;
  onCopyAddress?: () => void;
  onViewExplorer?: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  wallet,
  onCopyAddress,
  onViewExplorer,
}) => {
  const formatAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <WalletIcon size={20} color={colors.primary} />
          <Text style={styles.title}>Wallet</Text>
        </View>
        
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{formatAddress(wallet.address)}</Text>
          
          <View style={styles.actions}>
            {onCopyAddress && (
              <TouchableOpacity onPress={onCopyAddress} style={styles.actionButton}>
                <Copy size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
            
            {onViewExplorer && (
              <TouchableOpacity onPress={onViewExplorer} style={styles.actionButton}>
                <ExternalLink size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>{wallet.balance.toFixed(4)} SOL</Text>
        <Text style={styles.balanceUsd}>
          ${(wallet.balance * 100).toFixed(2)} USD
        </Text>
      </View>
      
      {wallet.tokens.length > 1 && (
        <View style={styles.tokensContainer}>
          <Text style={styles.tokensTitle}>Tokens</Text>
          
          {wallet.tokens.filter(token => token.symbol !== 'SOL').map((token, index) => (
            <View key={token.symbol} style={styles.tokenItem}>
              <Text style={styles.tokenName}>{token.name}</Text>
              <View style={styles.tokenValues}>
                <Text style={styles.tokenBalance}>
                  {token.balance.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    notation: 'compact',
                  })}
                </Text>
                <Text style={styles.tokenValue}>${token.usdValue.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginLeft: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  address: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  balanceContainer: {
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  balanceUsd: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  tokensContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  tokensTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: 12,
  },
  tokenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tokenName: {
    fontSize: fontSize.sm,
    color: colors.text,
  },
  tokenValues: {
    alignItems: 'flex-end',
  },
  tokenBalance: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  tokenValue: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
});