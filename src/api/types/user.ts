import { Project } from './project';
import { UserTechnology } from './user-technology';

export interface User {
  id?: string;
  username: string;
  profilePictureUrl: string;
  bio: string;
  technologies: UserTechnology[];
  projects: Project[];
}
