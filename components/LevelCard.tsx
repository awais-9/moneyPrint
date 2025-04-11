import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { User } from '@/types';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/theme';
import { Award } from 'lucide-react-native';

interface LevelCardProps {
  user: User;
}

export const LevelCard: React.FC<LevelCardProps> = ({ user }) => {
  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.levelContainer}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{user.level}</Text>
          </View>
          <View>
            <Text style={styles.levelTitle}>Level {user.level}</Text>
            <Text style={styles.levelSubtitle}>
              {getLevelTitle(user.level)}
            </Text>
          </View>
        </View>
        
        <View style={styles.xpContainer}>
          <Text style={styles.xpValue}>{user.xp} XP</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={user.xp}
          total={user.xpToNextLevel}
          label={`${user.xpToNextLevel - user.xp} XP to Level ${user.level + 1}`}
          height={8}
        />
      </View>
      
      {user.badges.length > 0 && (
        <View style={styles.badgesContainer}>
          <Text style={styles.badgesTitle}>Badges</Text>
          
          <View style={styles.badgesList}>
            {user.badges.map((badge) => (
              <View key={badge.id} style={styles.badgeItem}>
                <View style={styles.badgeIcon}>
                  <Award size={16} color={colors.primary} />
                </View>
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Card>
  );
};

const getLevelTitle = (level: number): string => {
  if (level < 3) return 'Newbie Printer';
  if (level < 5) return 'Casual Printer';
  if (level < 10) return 'Regular Printer';
  if (level < 15) return 'Pro Printer';
  if (level < 20) return 'Master Printer';
  if (level < 30) return 'Elite Printer';
  return 'Legendary Whale';
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  levelText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.background,
  },
  levelTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  levelSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  xpContainer: {
    alignItems: 'flex-end',
  },
  xpValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  progressContainer: {
    marginBottom: 16,
  },
  badgesContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  badgesTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: 12,
  },
  badgesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardHighlight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeName: {
    fontSize: fontSize.xs,
    color: colors.text,
  },
});