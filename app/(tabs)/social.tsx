import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { SocialFeed } from "@/components/SocialFeed";
import { ChallengeCard } from "@/components/ChallengeCard";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/constants/colors";
import { fontSize, fontWeight, spacing, borderRadius, shadows } from "@/constants/theme";
import { Plus, Swords, MessageSquare } from "lucide-react-native";

export default function SocialScreen() {
  const { user, socialPosts, challenges } = useAppStore();
  const [showNewChallengeModal, setShowNewChallengeModal] = useState(false);
  
  // Mock usernames for challenge display
  const usernames: Record<string, string> = {
    'user-1': 'cryptoprinter',
    'user-2': 'whale_master',
    'user-3': 'crypto_ninja',
    'user-4': 'moon_boy',
  };
  
  const handleLikePost = (postId: string) => {
    if (user) {
      useAppStore.getState().likeSocialPost(postId, user.id);
    }
  };
  
  const handleShareTrade = (tradeId: string) => {
    useAppStore.getState().shareTrade(tradeId);
  };
  
  const renderNewChallengeModal = () => (
    <Modal
      visible={showNewChallengeModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowNewChallengeModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Challenge a Friend</Text>
          <Text style={styles.modalDescription}>
            Coming soon! Challenge your friends to a 24-hour trading competition.
          </Text>
          
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={() => setShowNewChallengeModal(false)}
          >
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Social",
          headerRight: () => (
            <TouchableOpacity 
              style={styles.newPostButton}
              onPress={() => {}}
            >
              <Plus size={20} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTabButton]}>
          <MessageSquare size={20} color={colors.primary} />
          <Text style={[styles.tabText, styles.activeTabText]}>Feed</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => setShowNewChallengeModal(true)}
        >
          <Swords size={20} color={colors.textSecondary} />
          <Text style={styles.tabText}>Challenges</Text>
        </TouchableOpacity>
      </View>
      
      {challenges.length > 0 && (
        <View style={styles.challengesContainer}>
          <Text style={styles.challengesTitle}>Active Challenges</Text>
          
          {challenges
            .filter(c => c.status === 'active' && (c.challenger === user?.id || c.challenged === user?.id))
            .map(challenge => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                usernames={usernames}
                isCurrentUserChallenger={challenge.challenger === user?.id}
              />
            ))}
        </View>
      )}
      
      <SocialFeed
        posts={socialPosts}
        currentUserId={user?.id || ''}
        onLikePost={handleLikePost}
        onCommentPost={() => {}}
        onSharePost={() => {}}
        onViewProfile={() => {}}
        onViewTrade={() => {}}
      />
      
      {renderNewChallengeModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  newPostButton: {
    padding: spacing.md,
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.md,
    borderRadius: borderRadius.md,
  },
  activeTabButton: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
  },
  tabText: {
    fontSize: fontSize.md,
    fontWeight: "500",
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  activeTabText: {
    color: colors.primary,
  },
  challengesContainer: {
    padding: spacing.md,
  },
  challengesTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.large,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.background,
  },
});