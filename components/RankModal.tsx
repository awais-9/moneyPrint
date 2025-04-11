import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, spacing, borderRadius, shadows } from '@/constants/theme';
import { ProgressBar } from './ProgressBar';
import { getRankTitle } from '@/constants/theme';
import { X, Award, Trophy, Star, Crown } from 'lucide-react-native';

interface RankModalProps {
  visible: boolean;
  onClose: () => void;
  level: number;
  xp: number;
  xpToNextLevel: number;
  badges: Array<{
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    unlockedAt: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  }>;
}

export const RankModal: React.FC<RankModalProps> = ({
  visible,
  onClose,
  level,
  xp,
  xpToNextLevel,
  badges,
}) => {
  const currentRankTitle = getRankTitle(level);
  const nextRankTitle = getRankTitle(level + 1);
  
  const getBadgeIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return <Crown size={20} color="#FFD700" />;
      case 'epic':
        return <Trophy size={20} color="#9C27B0" />;
      case 'rare':
        return <Award size={20} color="#2196F3" />;
      case 'uncommon':
        return <Star size={20} color="#4CAF50" />;
      default:
        return <Award size={20} color="#9E9E9E" />;
    }
  };
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={colors.text} />
          </TouchableOpacity>
          
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <LinearGradient
                colors={[colors.primary, colors.gradientEnd]}
                style={styles.rankBadge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.rankNumber}>{level}</Text>
              </LinearGradient>
              
              <View style={styles.rankInfo}>
                <Text style={styles.rankTitle}>{currentRankTitle}</Text>
                <Text style={styles.xpText}>{xp} / {xpToNextLevel} XP</Text>
              </View>
            </View>
            
            <ProgressBar
              progress={xp}
              total={xpToNextLevel}
              label="Progress to next level"
              height={8}
              style={styles.progressBar}
            />
            
            <View style={styles.nextRankContainer}>
              <Text style={styles.nextRankLabel}>Next Rank:</Text>
              <Text style={styles.nextRankTitle}>{nextRankTitle}</Text>
            </View>
            
            <View style={styles.perksContainer}>
              <Text style={styles.sectionTitle}>Rank Perks</Text>
              
              <View style={styles.perkItem}>
                <View style={styles.perkIcon}>
                  <Trophy size={20} color={colors.primary} />
                </View>
                <View style={styles.perkInfo}>
                  <Text style={styles.perkTitle}>Leaderboard Visibility</Text>
                  <Text style={styles.perkDescription}>
                    Your rank is displayed on global leaderboards
                  </Text>
                </View>
              </View>
              
              <View style={styles.perkItem}>
                <View style={styles.perkIcon}>
                  <Star size={20} color={colors.primary} />
                </View>
                <View style={styles.perkInfo}>
                  <Text style={styles.perkTitle}>XP Multiplier</Text>
                  <Text style={styles.perkDescription}>
                    {(1 + level * 0.05).toFixed(2)}x XP from all activities
                  </Text>
                </View>
              </View>
              
              {level >= 5 && (
                <View style={styles.perkItem}>
                  <View style={styles.perkIcon}>
                    <Award size={20} color={colors.primary} />
                  </View>
                  <View style={styles.perkInfo}>
                    <Text style={styles.perkTitle}>Custom Profile Badge</Text>
                    <Text style={styles.perkDescription}>
                      Display your rank badge on your profile
                    </Text>
                  </View>
                </View>
              )}
              
              {level >= 10 && (
                <View style={styles.perkItem}>
                  <View style={styles.perkIcon}>
                    <Crown size={20} color={colors.primary} />
                  </View>
                  <View style={styles.perkInfo}>
                    <Text style={styles.perkTitle}>Priority Snipes</Text>
                    <Text style={styles.perkDescription}>
                      Your bot gets priority in high-volume situations
                    </Text>
                  </View>
                </View>
              )}
            </View>
            
            {badges.length > 0 && (
              <View style={styles.badgesContainer}>
                <Text style={styles.sectionTitle}>Your Badges</Text>
                
                {badges.map((badge) => (
                  <View key={badge.id} style={styles.badgeItem}>
                    <View style={[styles.badgeIcon, styles[`${badge.rarity}Badge`]]}>
                      {getBadgeIcon(badge.rarity)}
                    </View>
                    <View style={styles.badgeInfo}>
                      <Text style={styles.badgeTitle}>{badge.name}</Text>
                      <Text style={styles.badgeDescription}>{badge.description}</Text>
                      <Text style={styles.badgeDate}>
                        Unlocked: {new Date(badge.unlockedAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
            
            <View style={styles.xpGuideContainer}>
              <Text style={styles.sectionTitle}>How to Earn XP</Text>
              
              <View style={styles.xpGuideItem}>
                <Text style={styles.xpGuideAmount}>+10 XP</Text>
                <Text style={styles.xpGuideAction}>Complete a trade</Text>
              </View>
              
              <View style={styles.xpGuideItem}>
                <Text style={styles.xpGuideAmount}>+25 XP</Text>
                <Text style={styles.xpGuideAction}>Complete a profitable trade</Text>
              </View>
              
              <View style={styles.xpGuideItem}>
                <Text style={styles.xpGuideAmount}>+50-100 XP</Text>
                <Text style={styles.xpGuideAction}>Complete daily missions</Text>
              </View>
              
              <View style={styles.xpGuideItem}>
                <Text style={styles.xpGuideAmount}>+10 XP</Text>
                <Text style={styles.xpGuideAction}>Share a trade on social feed</Text>
              </View>
              
              <View style={styles.xpGuideItem}>
                <Text style={styles.xpGuideAmount}>+50 XP</Text>
                <Text style={styles.xpGuideAction}>Refer a friend</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    ...shadows.large,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  rankBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  rankNumber: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.background,
  },
  rankInfo: {
    flex: 1,
  },
  rankTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: 4,
  },
  xpText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  progressBar: {
    marginBottom: spacing.md,
  },
  nextRankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  nextRankLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  nextRankTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  perksContainer: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  perkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  perkInfo: {
    flex: 1,
  },
  perkTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: 2,
  },
  perkDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  badgesContainer: {
    marginBottom: spacing.lg,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.cardHighlight,
    borderRadius: borderRadius.md,
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
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
  badgeInfo: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: 2,
  },
  badgeDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  badgeDate: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  xpGuideContainer: {
    marginBottom: spacing.lg,
  },
  xpGuideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  xpGuideAmount: {
    width: 80,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  xpGuideAction: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
  },
});