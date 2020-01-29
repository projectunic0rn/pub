import { Project } from './project';

export interface User {
  id?: string;
  username: string;
  email?: string;
  lookingForProject?: boolean;
  profilePictureUrl?: string;
  gitHubUsername?: string;
  bio: string;
  technologies?: string[];
  projects?: Project[];
}
