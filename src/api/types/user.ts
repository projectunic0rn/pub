import { Project } from './project';

export interface User {
  id?: string;
  username: string;
  profilePictureUrl: string;
  bio: string;
  technologies: string[];
  projects: Project[];
}
