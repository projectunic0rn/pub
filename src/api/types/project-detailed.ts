import { ProjectCollaboratorSuggestion } from './project-collaborator-suggestion';
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
  workspaceAppInstalled: boolean;
  workspaceMemberName: string;
  workspaceRecentMessages: string[];
  workspaceProjectChannelName: string;
  projectTechnologies: ProjectTechnology[];
  projectUsers: ProjectUserDetailed[];
  projectCollaboratorSuggestions: ProjectCollaboratorSuggestion[];
}
