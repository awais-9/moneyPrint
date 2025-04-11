import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, shadows } from '@/constants/theme';
import { Printer } from 'lucide-react-native';

interface MoneyPrinterProps {
  isActive: boolean;
  scannedTokens: number;
  potentialSnipes: number;
  activeSnipes: number;
  completedSnipes: number;
}

export const MoneyPrinter: React.FC<MoneyPrinterProps> = ({
  isActive,
  scannedTokens,
  potentialSnipes,
  activeSnipes,
  completedSnipes,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let pulseAnimation: Animated.CompositeAnimation;
    let rotateAnimation: Animated.CompositeAnimation;
    let moveAnimation: Animated.CompositeAnimation;

    if (isActive) {
      // Pulse animation
      pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      );

      // Rotate animation
      rotateAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: Platform.OS !== 'web',
        })
      );

      // Move animation
      moveAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(moveAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(moveAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      );

      pulseAnimation.start();
      rotateAnimation.start();
      moveAnimation.start();
    } else {
      // Reset animations
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
      
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
      
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }

    return () => {
      if (pulseAnimation) pulseAnimation.stop();
      if (rotateAnimation) rotateAnimation.stop();
      if (moveAnimation) moveAnimation.stop();
    };
  }, [isActive]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const moveY = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          isActive ? colors.primarySoft : 'rgba(30, 30, 30, 0.5)',
          isActive ? 'rgba(123, 97, 255, 0.1)' : 'rgba(30, 30, 30, 0.2)',
        ]}
        style={styles.gradientContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          style={[
            styles.printerContainer,
            {
              transform: [
                { scale: pulseAnim },
              ],
            },
          ]}
        >
          <Printer
            size={64}
            color={isActive ? colors.primary : colors.textMuted}
          />
          
          {isActive && (
            <Animated.View
              style={[
                styles.moneyContainer,
                {
                  transform: [
                    { translateY: moveY },
                  ],
                },
              ]}
            >
              <Text style={styles.moneyText}>$</Text>
            </Animated.View>
          )}
        </Animated.View>

        <Text style={[styles.statusText, isActive && styles.activeStatusText]}>
          {isActive ? 'Printing Money...' : 'Ready to Print'}
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{scannedTokens}</Text>
            <Text style={styles.statLabel}>Scanned</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{potentialSnipes}</Text>
            <Text style={styles.statLabel}>Potential</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{activeSnipes}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completedSnipes}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  gradientContainer: {
    padding: 24,
    alignItems: 'center',
  },
  printerContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  moneyContainer: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
  },
  moneyText: {
    fontSize: 32,
    fontWeight: fontWeight.bold,
    color: colors.success,
  },
  statusText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    marginBottom: 16,
  },
  activeStatusText: {
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});