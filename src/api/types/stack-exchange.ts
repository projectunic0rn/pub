export interface Tag {
  items: Item[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}
export interface Item {
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  count: number;
  name: string;
}
