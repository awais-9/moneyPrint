import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Mission } from '@/types';
import { MissionCard } from './MissionCard';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, spacing, borderRadius, shadows } from '@/constants/theme';
import { ChevronRight } from 'lucide-react-native';

interface MissionsPanelProps {
  missions: Mission[];
  onMissionPress?: (mission: Mission) => void;
  onViewAllPress?: () => void;
  compact?: boolean;
}

export const MissionsPanel: React.FC<MissionsPanelProps> = ({
  missions,
  onMissionPress,
  onViewAllPress,
  compact = false,
}) => {
  const completedMissions = missions.filter(mission => mission.completed);
  const activeMissions = missions.filter(mission => !mission.completed);
  
  const totalXP = missions.reduce((sum, mission) => sum + mission.xpReward, 0);
  const earnedXP = completedMissions.reduce((sum, mission) => sum + mission.xpReward, 0);
  
  if (compact) {
    return (
      <TouchableOpacity 
        style={styles.compactContainer}
        onPress={onViewAllPress}
        activeOpacity={0.8}
      >
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle}>Daily Missions</Text>
          <Text style={styles.compactProgress}>
            {completedMissions.length}/{missions.length} Completed
          </Text>
        </View>
        <ChevronRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Daily Missions</Text>
          <Text style={styles.subtitle}>
            Complete missions to earn XP and level up
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {completedMissions.length}/{missions.length}
          </Text>
          <Text style={styles.xpText}>{earnedXP}/{totalXP} XP</Text>
        </View>
      </View>
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.missionsContainer}
      >
        {activeMissions.map((mission) => (
          <TouchableOpacity 
            key={mission.id}
            style={styles.missionCardWrapper}
            onPress={() => onMissionPress && onMissionPress(mission)}
            activeOpacity={0.8}
          >
            <MissionCard mission={mission} compact />
          </TouchableOpacity>
        ))}
        
        {completedMissions.map((mission) => (
          <TouchableOpacity 
            key={mission.id}
            style={styles.missionCardWrapper}
            onPress={() => onMissionPress && onMissionPress(mission)}
            activeOpacity={0.8}
          >
            <MissionCard mission={mission} compact />
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {onViewAllPress && (
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={onViewAllPress}
          activeOpacity={0.8}
        >
          <Text style={styles.viewAllText}>View All Missions</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      )}
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
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  xpText: {
    fontSize: fontSize.xs,
    color: colors.primary,
  },
  missionsContainer: {
    paddingVertical: spacing.sm,
  },
  missionCardWrapper: {
    width: 200,
    marginRight: spacing.md,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  viewAllText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.primary,
    marginRight: spacing.xs,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  compactContent: {
    flex: 1,
  },
  compactTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: 2,
  },
  compactProgress: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
});