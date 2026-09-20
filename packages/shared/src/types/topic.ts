export interface TopicDTO {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  thoughtsCount?: number;
  createdAt: string;
}
