import type { UserRole } from './common.js';

// Safe user DTO — never includes passwordHash
export interface UserDTO {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  coverImageUrl: string | null;
  isVerified: boolean;
  isPrivate: boolean;
  role: UserRole;
  createdAt: string; // ISO date string
  updatedAt: string;
  // Computed fields (populated on specific endpoints)
  followersCount?: number;
  followingCount?: number;
  thoughtsCount?: number;
  isFollowing?: boolean; // is current user following this user?
  isFollowedBy?: boolean; // is this user following current user?
  isBlocked?: boolean;
}

// Minimal user for embedding in other DTOs
export interface UserSummaryDTO {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  isVerified: boolean;
  isPrivate: boolean;
}

export interface AuthUserDTO extends UserDTO {
  emailVerified: boolean;
}
