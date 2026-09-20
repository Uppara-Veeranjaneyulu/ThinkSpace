import type { NotificationType } from './common.js';
import type { UserSummaryDTO } from './user.js';

export interface NotificationDTO {
  id: string;
  type: NotificationType;
  actor: UserSummaryDTO | null; // null for system notifications
  thoughtId: string | null;
  commentId: string | null;
  isRead: boolean;
  createdAt: string;
  // Preview text
  message: string;
}
