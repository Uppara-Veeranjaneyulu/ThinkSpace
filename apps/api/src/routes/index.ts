import { Router, type IRouter } from 'express';
import { healthRouter } from './health.js';

export const router: IRouter = Router();

// ─── Health ───────────────────────────────────────────────
router.use('/health', healthRouter);

// ─── Auth ─────────────────────────────────────────────────
// router.use('/auth', authRouter); // Phase 3

// ─── Users ────────────────────────────────────────────────
// router.use('/users', usersRouter); // Phase 4

// ─── Thoughts ─────────────────────────────────────────────
// router.use('/thoughts', thoughtsRouter); // Phase 5

// ─── Comments ─────────────────────────────────────────────
// router.use('/comments', commentsRouter); // Phase 7

// ─── Topics ───────────────────────────────────────────────
// router.use('/topics', topicsRouter); // Phase 8

// ─── Search ───────────────────────────────────────────────
// router.use('/search', searchRouter); // Phase 8

// ─── Notifications ────────────────────────────────────────
// router.use('/notifications', notificationsRouter); // Phase 9

// ─── Explore ──────────────────────────────────────────────
// router.use('/explore', exploreRouter); // Phase 8

// ─── Admin ────────────────────────────────────────────────
// router.use('/admin', adminRouter); // Phase 12
