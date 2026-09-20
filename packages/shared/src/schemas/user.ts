import { z } from 'zod';
import { BIO_MAX_LENGTH, DISPLAY_NAME_MAX_LENGTH } from '../types/common.js';

export const UpdateProfileSchema = z.object({
  displayName: z
    .string()
    .min(1, 'Display name is required')
    .max(DISPLAY_NAME_MAX_LENGTH)
    .optional(),
  bio: z.string().max(BIO_MAX_LENGTH, `Bio must be at most ${BIO_MAX_LENGTH} characters`).optional(),
  isPrivate: z.boolean().optional(),
  avatarUrl: z.string().url().optional().nullable(),
  coverImageUrl: z.string().url().optional().nullable(),
});

export const UpdateNotificationPrefsSchema = z.object({
  notifyLikes: z.boolean(),
  notifyComments: z.boolean(),
  notifyFollows: z.boolean(),
  notifyMentions: z.boolean(),
  notifyReposts: z.boolean(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type UpdateNotificationPrefsInput = z.infer<typeof UpdateNotificationPrefsSchema>;
