import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, getGradientByLevel } from '@/constants/colors';
import { fontSize, fontWeight, borderRadius, shadows } from '@/constants/theme';
import { getRankTitle } from '@/constants/theme';

interface RankBadgeProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  showProgress?: boolean;
}

export const RankBadge: React.FC<RankBadgeProps> = ({
  level,
  xp,
  xpToNextLevel,
  size = 'medium',
  onPress,
  showProgress = true,
}) => {
  const progress = (xp / xpToNextLevel) * 100;
  
  const getBadgeSize = () => {
    switch (size) {
      case 'small':
        return { width: 32, height: 32, fontSize: fontSize.xs };
      case 'large':
        return { width: 64, height: 64, fontSize: fontSize.xl };
      default:
        return { width: 48, height: 48, fontSize: fontSize.md };
    }
  };
  
  const { width, height, fontSize: badgeFontSize } = getBadgeSize();
  const gradientColors = getGradientByLevel(level);
  
  const renderBadge = () => (
    <View style={[styles.container, { width, height }]}>
      {showProgress && (
        <LinearGradient
          colors={gradientColors}
          style={[
            styles.progressRing,
            {
              width,
              height,
              borderRadius: width / 2,
              // Clip the gradient to show only the progress percentage
              // This is a simple approach - for a more accurate circular progress,
              // you would need a custom SVG or canvas implementation
              clipPath: `polygon(50% 50%, 50% 0%, ${progress > 25 ? '100% 0%' : `${50 + progress * 2}% 0%`}, ${
                progress > 50 ? '100% 100%' : progress > 25 ? `100% ${(progress - 25) * 4}%` : '50% 50%'
              }, ${
                progress > 75 ? '0% 100%' : progress > 50 ? `${100 - (progress - 50) * 4}% 100%` : '50% 50%'
              }, ${progress > 75 ? `0% ${100 - (progress - 75) * 4}%` : '50% 50%'}, 50% 50%)`,
            },
          ]}
        />
      )}
      
      <View style={[styles.innerCircle, { width: width - 4, height: height - 4 }]}>
        <Text style={[styles.levelText, { fontSize: badgeFontSize }]}>{level}</Text>
      </View>
    </View>
  );
  
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {renderBadge()}
      </TouchableOpacity>
    );
  }
  
  return renderBadge();
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  progressRing: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    backgroundColor: colors.background,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    color: colors.text,
    fontWeight: fontWeight.bold,
  },
});