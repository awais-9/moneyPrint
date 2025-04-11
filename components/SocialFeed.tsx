import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SocialPost, Trade } from '@/types';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight, spacing, borderRadius, shadows } from '@/constants/theme';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react-native';
import { RankBadge } from './RankBadge';

interface SocialFeedProps {
  posts: SocialPost[];
  currentUserId: string;
  onLikePost: (postId: string) => void;
  onCommentPost: (postId: string) => void;
  onSharePost: (postId: string) => void;
  onViewProfile: (userId: string) => void;
  onViewTrade: (tradeId: string) => void;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({
  posts,
  currentUserId,
  onLikePost,
  onCommentPost,
  onSharePost,
  onViewProfile,
  onViewTrade,
}) => {
  const renderTradeCard = (trade: Trade) => {
    if (!trade) return null;
    
    const isProfit = trade.profit && trade.profit > 0;
    
    return (
      <TouchableOpacity 
        style={styles.tradeCard}
        onPress={() => onViewTrade(trade.id)}
        activeOpacity={0.8}
      >
        <View style={styles.tradeHeader}>
          <Text style={styles.tradeSymbol}>{trade.tokenSymbol}</Text>
          {trade.status === 'completed' && (
            <Text style={[
              styles.tradeProfit,
              isProfit ? styles.profitText : styles.lossText
            ]}>
              {isProfit ? '+' : '-'}${Math.abs(trade.profit || 0).toFixed(2)} ({trade.profitPercentage}%)
            </Text>
          )}
        </View>
        
        <View style={styles.tradeDetails}>
          <Text style={styles.tradeLabel}>Entry:</Text>
          <Text style={styles.tradeValue}>${trade.entryPrice.toFixed(8)}</Text>
          
          {trade.exitPrice && (
            <>
              <Text style={styles.tradeLabel}>Exit:</Text>
              <Text style={styles.tradeValue}>${trade.exitPrice.toFixed(8)}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderPost = ({ item }: { item: SocialPost }) => {
    const isLiked = item.likedBy.includes(currentUserId);
    const formattedDate = new Date(item.createdAt).toLocaleString();
    
    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <TouchableOpacity 
            style={styles.userInfo}
            onPress={() => onViewProfile(item.userId)}
            activeOpacity={0.8}
          >
            <RankBadge 
              level={item.userLevel} 
              xp={0} 
              xpToNextLevel={100} 
              size="small"
              showProgress={false}
            />
            <Text style={styles.username}>{item.username}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.moreButton}>
            <MoreHorizontal size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.postContent}>{item.content}</Text>
        
        {item.trade && renderTradeCard(item.trade)}
        
        <View style={styles.postFooter}>
          <Text style={styles.timestamp}>{formattedDate}</Text>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => onLikePost(item.id)}
            >
              <Heart 
                size={18} 
                color={isLiked ? colors.error : colors.textSecondary}
                fill={isLiked ? colors.error : 'none'}
              />
              {item.likes > 0 && (
                <Text style={styles.actionCount}>{item.likes}</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => onCommentPost(item.id)}
            >
              <MessageCircle size={18} color={colors.textSecondary} />
              {item.comments > 0 && (
                <Text style={styles.actionCount}>{item.comments}</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => onSharePost(item.id)}
            >
              <Share2 size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  postContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.small,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    fontSize: fontSize.md,
    color: colors.text,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  tradeCard: {
    backgroundColor: colors.cardHighlight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  tradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  tradeSymbol: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  tradeProfit: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  profitText: {
    color: colors.success,
  },
  lossText: {
    color: colors.error,
  },
  tradeDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tradeLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    width: '20%',
    marginBottom: 2,
  },
  tradeValue: {
    fontSize: fontSize.sm,
    color: colors.text,
    width: '30%',
    marginBottom: 2,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  actionCount: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});