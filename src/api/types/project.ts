import { ProjectTechnology } from './project-technology';
import { ProjectUser } from './project-user';

export interface Project {
  id?: string;
  name: string;
  description: string;
  launchDate: Date;
  projectType: string;
  repositoryUrl: string;
  communicationPlatformUrl: string;
  lookingForMembers: boolean;
  communicationPlatform: string;
  projectTechnologies: ProjectTechnology[];
  projectUsers: ProjectUser[];
}
