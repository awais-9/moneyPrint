import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from './Card';
import { LeaderboardEntry } from '@/types';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/theme';
import { Trophy, Medal, Award } from 'lucide-react-native';

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ 
  entry, 
  isCurrentUser = false 
}) => {
  const getRankIcon = () => {
    switch (entry.rank) {
      case 1:
        return <Trophy size={20} color="#FFD700" />;
      case 2:
        return <Medal size={20} color="#C0C0C0" />;
      case 3:
        return <Award size={20} color="#CD7F32" />;
      default:
        return <Text style={styles.rankText}>{entry.rank}</Text>;
    }
  };

  return (
    <Card 
      variant={isCurrentUser ? "highlighted" : "default"} 
      style={[styles.card, isCurrentUser && styles.currentUserCard]}
    >
      <View style={styles.container}>
        <View style={styles.rankContainer}>
          {getRankIcon()}
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.username}>{entry.username}</Text>
          <Text style={styles.level}>Level {entry.level}</Text>
        </View>
        
        <View style={styles.stats}>
          <Text style={styles.profit}>${entry.totalProfit.toFixed(2)}</Text>
          <Text style={styles.xp}>{entry.xp} XP</Text>
        </View>
      </View>
      
      {isCurrentUser && (
        <View style={styles.currentUserIndicator} />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 12,
  },
  currentUserCard: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  level: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  stats: {
    alignItems: 'flex-end',
  },
  profit: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.success,
  },
  xp: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  currentUserIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});