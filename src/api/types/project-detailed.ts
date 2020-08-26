import { ProjectTechnology } from './project-technology';
import { ProjectUserDetailed } from './project-user-detailed';

export interface ProjectDetailed {
  id?: string;
  name: string;
  description: string;
  extendedMarkdownDescription: string;
  repositoryUrl: string;
  communicationPlatformUrl: string;
  lookingForMembers: boolean;
  communicationPlatform: string;
  launchDate: Date;
  projectTechnologies: ProjectTechnology[];
  projectUsers: ProjectUserDetailed[];
}
