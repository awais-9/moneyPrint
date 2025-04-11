import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Mission } from '@/types';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, spacing, borderRadius } from '@/constants/theme';
import { Clock, UserPlus, TrendingUp, Check } from 'lucide-react-native';

interface MissionCardProps {
  mission: Mission;
  compact?: boolean;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, compact = false }) => {
  const getIcon = () => {
    switch (mission.icon) {
      case 'Clock':
        return <Clock size={compact ? 16 : 20} color={colors.primary} />;
      case 'UserPlus':
        return <UserPlus size={compact ? 16 : 20} color={colors.primary} />;
      case 'TrendingUp':
        return <TrendingUp size={compact ? 16 : 20} color={colors.primary} />;
      default:
        return <Clock size={compact ? 16 : 20} color={colors.primary} />;
    }
  };

  const progressPercentage = (mission.progress / mission.target) * 100;
  
  if (compact) {
    return (
      <View style={[styles.compactCard, mission.completed && styles.completedCard]}>
        <View style={styles.compactHeader}>
          <View style={[styles.iconContainer, compact && styles.compactIconContainer]}>
            {mission.completed ? (
              <Check size={16} color={colors.success} />
            ) : (
              getIcon()
            )}
          </View>
          <Text style={styles.compactReward}>+{mission.xpReward} XP</Text>
        </View>
        
        <Text style={styles.compactTitle}>{mission.title}</Text>
        
        {!mission.completed && (
          <View style={styles.compactProgressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage}%` },
                ]} 
              />
            </View>
            <Text style={styles.compactProgressText}>
              {mission.progress}/{mission.target}
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <Card variant="outlined" style={styles.card}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          {mission.completed ? (
            <Check size={20} color={colors.success} />
          ) : (
            getIcon()
          )}
        </View>
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{mission.title}</Text>
            <Text style={styles.reward}>+{mission.xpReward} XP</Text>
          </View>
          
          <Text style={styles.description}>{mission.description}</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage}%` },
                  mission.completed && styles.progressComplete
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {mission.progress}/{mission.target}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  reward: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.primary,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressComplete: {
    backgroundColor: colors.success,
  },
  progressText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    minWidth: 36,
    textAlign: 'right',
  },
  // Compact styles
  compactCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  completedCard: {
    borderColor: colors.success,
    backgroundColor: 'rgba(0, 230, 118, 0.05)',
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  compactIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 0,
  },
  compactTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  compactReward: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.primary,
  },
  compactProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactProgressText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    minWidth: 30,
    textAlign: 'right',
    marginLeft: 4,
  },
});