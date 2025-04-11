import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, borderRadius } from '@/constants/theme';
import { Flame } from 'lucide-react-native';

interface StreakIndicatorProps {
  days: number;
  multiplier: number;
  compact?: boolean;
}

export const StreakIndicator: React.FC<StreakIndicatorProps> = ({
  days,
  multiplier,
  compact = false,
}) => {
  if (days === 0) return null;
  
  const getFlameColor = () => {
    if (days < 3) return '#FF9800'; // Orange
    if (days < 7) return '#FF5722'; // Deep Orange
    if (days < 14) return '#FF3B3B'; // Red
    return '#FF0080'; // Pink
  };
  
  const flameColor = getFlameColor();
  
  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <Flame size={16} color={flameColor} />
        <Text style={styles.compactText}>{days}</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.flamesContainer}>
        {Array.from({ length: Math.min(days, 5) }).map((_, index) => (
          <Flame 
            key={index} 
            size={16} 
            color={flameColor}
            style={[
              styles.flame,
              { opacity: 0.6 + (index * 0.1) }
            ]} 
          />
        ))}
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.streakText}>{days}-Day Streak</Text>
        <Text style={styles.multiplierText}>{multiplier.toFixed(1)}x XP Bonus</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 59, 0.08)',
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  flamesContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  flame: {
    marginLeft: -6, // Overlap flames
  },
  textContainer: {
    flex: 1,
  },
  streakText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  multiplierText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 59, 0.08)',
    borderRadius: borderRadius.round,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  compactText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginLeft: 4,
  },
});