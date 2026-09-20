import { z } from 'zod';
import { THOUGHT_MAX_LENGTH } from '../types/common.js';

const ThoughtMoodEnum = z.enum([
  'HAPPY', 'SAD', 'EXCITED', 'CURIOUS', 'ANGRY',
  'PEACEFUL', 'CONFUSED', 'MOTIVATED', 'REFLECTIVE', 'GRATEFUL',
]);

const ThoughtVisibilityEnum = z.enum(['PUBLIC', 'FOLLOWERS', 'PRIVATE']);

export const CreateThoughtSchema = z.object({
  content: z
    .string()
    .min(1, 'Thought cannot be empty')
    .max(THOUGHT_MAX_LENGTH, `Thought must be at most ${THOUGHT_MAX_LENGTH} characters`),
  mood: ThoughtMoodEnum.optional().nullable(),
  visibility: ThoughtVisibilityEnum.default('PUBLIC'),
  isAnonymous: z.boolean().default(false),
  topicSlugs: z
    .array(z.string())
    .max(5, 'Maximum 5 topics per thought')
    .default([]),
});

export const UpdateThoughtSchema = z.object({
  content: z
    .string()
    .min(1, 'Thought cannot be empty')
    .max(THOUGHT_MAX_LENGTH, `Thought must be at most ${THOUGHT_MAX_LENGTH} characters`)
    .optional(),
  mood: ThoughtMoodEnum.optional().nullable(),
  visibility: ThoughtVisibilityEnum.optional(),
  topicSlugs: z.array(z.string()).max(5).optional(),
});

export const FeedQuerySchema = z.object({
  filter: z.enum(['for-you', 'following', 'latest', 'trending']).default('for-you'),
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(20),
});

export type CreateThoughtInput = z.infer<typeof CreateThoughtSchema>;
export type UpdateThoughtInput = z.infer<typeof UpdateThoughtSchema>;
export type FeedQueryInput = z.infer<typeof FeedQuerySchema>;
