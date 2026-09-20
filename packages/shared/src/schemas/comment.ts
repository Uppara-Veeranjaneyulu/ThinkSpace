import { z } from 'zod';
import { COMMENT_MAX_LENGTH } from '../types/common.js';

export const CreateCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment cannot be empty')
    .max(COMMENT_MAX_LENGTH, `Comment must be at most ${COMMENT_MAX_LENGTH} characters`),
  parentCommentId: z.string().optional().nullable(),
});

export const UpdateCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment cannot be empty')
    .max(COMMENT_MAX_LENGTH, `Comment must be at most ${COMMENT_MAX_LENGTH} characters`),
});

export const ReportSchema = z.object({
  reason: z.enum([
    'SPAM', 'HARASSMENT', 'HATE_SPEECH', 'VIOLENCE',
    'SEXUAL_CONTENT', 'MISINFORMATION', 'IMPERSONATION', 'OTHER',
  ]),
  description: z.string().max(500).optional(),
});

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;
export type UpdateCommentInput = z.infer<typeof UpdateCommentSchema>;
export type ReportInput = z.infer<typeof ReportSchema>;
