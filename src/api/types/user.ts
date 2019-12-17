import { Project } from './project';

export interface User {
  id?: string;
  username: string;
  profileImageUrl: string;
  bio: string;
  technologies: string[];
  projects: Project[];
}
