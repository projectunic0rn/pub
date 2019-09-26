export interface Project {
  id: string;
  name: string;
  description: string;
  projectType: string;
  technologies: string[];
  projectRepo: string;
  launchDate: Date;
  communicationPlatformUrl: string;
  members: string[];
}
