export interface ProjectUserDetailed {
  id?: string;
  projectId?: string;
  userId: string;
  isOwner: boolean;
  username?: string;
  timezone?: string;
  fullName?: string;
  profilePictureUrl?: string;
}
