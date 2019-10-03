export interface ProjectUser {
  id?: string;
  projectId?: string;
  userId: string;
  isOwner: boolean;
  username?: string;
}
