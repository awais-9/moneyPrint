import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Challenge } from '@/types';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, spacing, borderRadius, shadows } from '@/constants/theme';
import { Swords, Clock, Trophy, AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ChallengeCardProps {
  challenge: Challenge;
  usernames: Record<string, string>;
  isCurrentUserChallenger: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  onPress?: () => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  usernames,
  isCurrentUserChallenger,
  onAccept,
  onDecline,
  onPress,
}) => {
  const getTimeRemaining = () => {
    const now = new Date();
    const end = new Date(challenge.endsAt);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };
  
  const renderStatusBadge = () => {
    switch (challenge.status) {
      case 'pending':
        return (
          <View style={[styles.statusBadge, styles.pendingBadge]}>
            <AlertCircle size={12} color={colors.warning} />
            <Text style={[styles.statusText, styles.pendingText]}>Pending</Text>
          </View>
        );
      case 'active':
        return (
          <View style={[styles.statusBadge, styles.activeBadge]}>
            <Clock size={12} color={colors.primary} />
            <Text style={[styles.statusText, styles.activeText]}>Active</Text>
          </View>
        );
      case 'completed':
        return (
          <View style={[styles.statusBadge, styles.completedBadge]}>
            <Trophy size={12} color={colors.success} />
            <Text style={[styles.statusText, styles.completedText]}>Completed</Text>
          </View>
        );
    }
  };
  
  const renderChallengeContent = () => (
    <>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Swords size={20} color={colors.primary} />
          <Text style={styles.title}>Trading Challenge</Text>
        </View>
        {renderStatusBadge()}
      </View>
      
      <View style={styles.vsContainer}>
        <View style={styles.playerContainer}>
          <Text style={styles.playerName}>{usernames[challenge.challenger] || 'Unknown'}</Text>
          <Text style={[styles.playerProfit, challenge.challengerProfit > 0 ? styles.profitText : styles.lossText]}>
            {challenge.challengerProfit > 0 ? '+' : ''}${challenge.challengerProfit.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.vsCircle}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        
        <View style={styles.playerContainer}>
          <Text style={styles.playerName}>{usernames[challenge.challenged] || 'Unknown'}</Text>
          <Text style={[styles.playerProfit, challenge.challengedProfit > 0 ? styles.profitText : styles.lossText]}>
            {challenge.challengedProfit > 0 ? '+' : ''}${challenge.challengedProfit.toFixed(2)}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <Text style={styles.stake}>Stake: {challenge.stake} SOL</Text>
          {challenge.status === 'active' && (
            <Text style={styles.timeRemaining}>{getTimeRemaining()}</Text>
          )}
          {challenge.status === 'completed' && challenge.winner && (
            <Text style={styles.winner}>
              Winner: {usernames[challenge.winner] || 'Unknown'}
            </Text>
          )}
        </View>
        
        {challenge.status === 'pending' && !isCurrentUserChallenger && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.declineButton]}
              onPress={onDecline}
            >
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.acceptButton]}
              onPress={onAccept}
            >
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
  
  if (onPress) {
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {renderChallengeContent()}
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={styles.container}>
      {renderChallengeContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  pendingBadge: {
    backgroundColor: 'rgba(255, 171, 0, 0.1)',
  },
  activeBadge: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
  },
  completedBadge: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  pendingText: {
    color: colors.warning,
  },
  activeText: {
    color: colors.primary,
  },
  completedText: {
    color: colors.success,
  },
  vsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  playerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  playerName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: 4,
  },
  playerProfit: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  profitText: {
    color: colors.success,
  },
  lossText: {
    color: colors.error,
  },
  vsCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.md,
  },
  vsText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  stake: {
    fontSize: fontSize.sm,
    color: colors.text,
    marginBottom: 2,
  },
  timeRemaining: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  winner: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.success,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
    marginLeft: spacing.sm,
  },
  declineButton: {
    backgroundColor: colors.cardHighlight,
  },
  acceptButton: {
    backgroundColor: colors.primary,
  },
  declineText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  acceptText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.background,
  },
});