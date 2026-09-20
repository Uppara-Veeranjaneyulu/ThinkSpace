import type { ThoughtMood, ThoughtVisibility } from './common.js';
import type { UserSummaryDTO } from './user.js';
import type { TopicDTO } from './topic.js';

export interface ThoughtDTO {
  id: string;
  content: string;
  mood: ThoughtMood | null;
  visibility: ThoughtVisibility;
  isAnonymous: boolean;
  // Author is null when isAnonymous=true (stripped by API)
  author: UserSummaryDTO | null;
  topics: TopicDTO[];
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  bookmarksCount: number;
  // Current user interaction state
  isLiked?: boolean;
  isBookmarked?: boolean;
  isReposted?: boolean;
  createdAt: string;
  updatedAt: string;
  // If this is a repost, original thought
  repostOf?: ThoughtDTO | null;
}
