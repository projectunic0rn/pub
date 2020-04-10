import { Project } from './project';
import { UserTechnology } from './user-technology';

export interface User {
  id?: string;
  username: string;
  email?: string;
  lookingForProject?: boolean;
  profilePictureUrl?: string;
  gitHubUsername?: string;
  bio: string;
  technologies?: UserTechnology[];
  projects?: Project[];
}
