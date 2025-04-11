import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Team } from '@/types';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, spacing, borderRadius, shadows } from '@/constants/theme';
import { Users, Trophy, TrendingUp } from 'lucide-react-native';

interface TeamCardProps {
  team: Team;
  usernames: Record<string, string>;
  isUserMember: boolean;
  onPress?: () => void;
  onJoin?: () => void;
  onLeave?: () => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  team,
  usernames,
  isUserMember,
  onPress,
  onJoin,
  onLeave,
}) => {
  const renderTeamContent = () => (
    <>
      <View style={styles.header}>
        {team.logo ? (
          <Image source={{ uri: team.logo }} style={styles.logo} />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Users size={24} color={colors.primary} />
          </View>
        )}
        
        <View style={styles.titleContainer}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.memberCount}>{team.members.length} members</Text>
        </View>
        
        <View style={styles.rankContainer}>
          <Trophy size={16} color={colors.primary} />
          <Text style={styles.rankText}>#{team.rank}</Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Weekly Profit</Text>
          <Text style={[styles.statValue, team.weeklyProfit > 0 ? styles.profitText : styles.lossText]}>
            {team.weeklyProfit > 0 ? '+' : ''}${team.weeklyProfit.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Profit</Text>
          <Text style={[styles.statValue, team.totalProfit > 0 ? styles.profitText : styles.lossText]}>
            {team.totalProfit > 0 ? '+' : ''}${team.totalProfit.toFixed(2)}
          </Text>
        </View>
      </View>
      
      <View style={styles.membersContainer}>
        <Text style={styles.membersTitle}>Top Members</Text>
        
        <View style={styles.membersList}>
          {team.members.slice(0, 3).map((memberId) => (
            <View key={memberId} style={styles.memberItem}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberInitial}>
                  {(usernames[memberId] || 'U').charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.memberName}>{usernames[memberId] || 'Unknown'}</Text>
            </View>
          ))}
          
          {team.members.length > 3 && (
            <View style={styles.memberItem}>
              <View style={[styles.memberAvatar, styles.moreAvatar]}>
                <Text style={styles.memberInitial}>+{team.members.length - 3}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      
      {isUserMember ? (
        <TouchableOpacity 
          style={[styles.actionButton, styles.leaveButton]}
          onPress={onLeave}
        >
          <Text style={styles.leaveText}>Leave Team</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={[styles.actionButton, styles.joinButton]}
          onPress={onJoin}
        >
          <Text style={styles.joinText}>Join Team</Text>
        </TouchableOpacity>
      )}
    </>
  );
  
  if (onPress) {
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {renderTeamContent()}
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={styles.container}>
      {renderTeamContent()}
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
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing.md,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  teamName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: 2,
  },
  memberCount: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rankText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  statItem: {
    flex: 1,
    backgroundColor: colors.cardHighlight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginRight: spacing.sm,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  profitText: {
    color: colors.success,
  },
  lossText: {
    color: colors.error,
  },
  membersContainer: {
    marginBottom: spacing.md,
  },
  membersTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  membersList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberItem: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  memberAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  moreAvatar: {
    backgroundColor: colors.border,
  },
  memberInitial: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  memberName: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  actionButton: {
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: colors.primary,
  },
  leaveButton: {
    backgroundColor: colors.cardHighlight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  joinText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.background,
  },
  leaveText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
});