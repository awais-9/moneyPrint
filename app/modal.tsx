import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Button } from "@/components/Button";
import { colors } from "@/constants/colors";
import { fontSize, fontWeight, spacing } from "@/constants/theme";

export default function ModalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "About MoneyPrinter" }} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>How MoneyPrinter Works</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Automated Crypto Sniping</Text>
          <Text style={styles.sectionText}>
            MoneyPrinter uses advanced algorithms to detect and automatically snipe new viral tokens on the Solana blockchain. The bot monitors token launches, social media activity, and trading volume to identify potential opportunities.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Management</Text>
          <Text style={styles.sectionText}>
            The bot implements strict take-profit and stop-loss parameters to maximize gains while minimizing risk. You can customize these settings in your profile.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>XP & Leveling System</Text>
          <Text style={styles.sectionText}>
            Earn XP for every successful trade, completed mission, and referral. Level up to unlock new features, badges, and higher positions on the leaderboard.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription Benefits</Text>
          <Text style={styles.sectionText}>
            Premium subscribers get access to:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Unlimited bot usage</Text>
            <Text style={styles.bulletItem}>• Higher profit targets</Text>
            <Text style={styles.bulletItem}>• Priority token scanning</Text>
            <Text style={styles.bulletItem}>• Exclusive badges and rewards</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Disclaimer</Text>
          <Text style={styles.sectionText}>
            Cryptocurrency trading involves significant risk. Past performance is not indicative of future results. Only invest what you can afford to lose.
          </Text>
        </View>
        
        <Button
          title="Start Printing Money"
          onPress={() => {}}
          variant="primary"
          size="large"
          fullWidth
          gradient
          style={styles.button}
        />
      </ScrollView>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  bulletList: {
    marginTop: spacing.sm,
  },
  bulletItem: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: 4,
    lineHeight: 22,
  },
  button: {
    marginVertical: spacing.xl,
  },
});