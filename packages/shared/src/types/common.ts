// Common/shared types used across the application

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
  total?: number;
}

export interface ApiResponse<T = void> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export type UserRole = 'USER' | 'MODERATOR' | 'ADMIN';

export type ThoughtVisibility = 'PUBLIC' | 'FOLLOWERS' | 'PRIVATE';

export type ThoughtMood =
  | 'HAPPY'
  | 'SAD'
  | 'EXCITED'
  | 'CURIOUS'
  | 'ANGRY'
  | 'PEACEFUL'
  | 'CONFUSED'
  | 'MOTIVATED'
  | 'REFLECTIVE'
  | 'GRATEFUL';

export type NotificationType =
  | 'LIKE'
  | 'COMMENT'
  | 'REPLY'
  | 'FOLLOW'
  | 'REPOST'
  | 'MENTION';

export type ReportReason =
  | 'SPAM'
  | 'HARASSMENT'
  | 'HATE_SPEECH'
  | 'VIOLENCE'
  | 'SEXUAL_CONTENT'
  | 'MISINFORMATION'
  | 'IMPERSONATION'
  | 'OTHER';

export type ReportStatus = 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';

export type FeedFilter = 'for-you' | 'following' | 'latest' | 'trending';

export const MOOD_LABELS: Record<ThoughtMood, string> = {
  HAPPY: '😊 Happy',
  SAD: '😔 Sad',
  EXCITED: '🔥 Excited',
  CURIOUS: '🤔 Curious',
  ANGRY: '😠 Angry',
  PEACEFUL: '😌 Peaceful',
  CONFUSED: '😵 Confused',
  MOTIVATED: '💪 Motivated',
  REFLECTIVE: '💭 Reflective',
  GRATEFUL: '🙏 Grateful',
};

export const MOOD_EMOJIS: Record<ThoughtMood, string> = {
  HAPPY: '😊',
  SAD: '😔',
  EXCITED: '🔥',
  CURIOUS: '🤔',
  ANGRY: '😠',
  PEACEFUL: '😌',
  CONFUSED: '😵',
  MOTIVATED: '💪',
  REFLECTIVE: '💭',
  GRATEFUL: '🙏',
};

export const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  SPAM: 'Spam',
  HARASSMENT: 'Harassment',
  HATE_SPEECH: 'Hate Speech',
  VIOLENCE: 'Violence',
  SEXUAL_CONTENT: 'Sexual Content',
  MISINFORMATION: 'Misinformation',
  IMPERSONATION: 'Impersonation',
  OTHER: 'Other',
};

export const THOUGHT_MAX_LENGTH = 500;
export const BIO_MAX_LENGTH = 200;
export const DISPLAY_NAME_MAX_LENGTH = 50;
export const USERNAME_MAX_LENGTH = 30;
export const USERNAME_MIN_LENGTH = 3;
export const COMMENT_MAX_LENGTH = 300;
export const PASSWORD_MIN_LENGTH = 8;
