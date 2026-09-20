import type { UserSummaryDTO } from './user.js';

export interface CommentDTO {
  id: string;
  thoughtId: string;
  content: string;
  author: UserSummaryDTO;
  parentCommentId: string | null;
  replies?: CommentDTO[];
  likesCount: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}
