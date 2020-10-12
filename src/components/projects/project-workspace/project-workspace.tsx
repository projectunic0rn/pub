import React, { FC, Fragment, useEffect, useState, useContext } from 'react';
import { Link } from 'gatsby';
import MarkdownIt from 'markdown-it';

import { Wrapper, Seo, Loader } from '@components/shared';
import { CloseButton, Ribbon } from '@components/shared/ribbons';
import { FeedbackForm } from '@components/shared/form';
import {
  ServiceResolver,
  ApiResponse,
  ErrorResponse,
  ProjectDetailed,
  ProjectUserDetailed,
  PatchOperation,
  ProjectUser,
  WorkspaceInfo,
} from '@api';
import { useSiteMetadata } from '@hooks';
import styled from 'styled-components';
import CardTags from '../projects-gallery/card-tags';
import { gitIcon, defaultProfileImage } from '@images';
import { WorkspaceTypesContext } from '@contexts';
import { MultiTabMenu } from './multi-tab-menu';
import { ApiButton } from '@components/shared/buttons';
import { UserAuthHelper } from '@helpers';
import { isValidUrl } from '@utils/validation-utils';
import { setLocalStorage } from '@utils';

interface ProjectWorkspaceProps {
  projectId?: string;
  path: string;
}

export interface OauthState {
  projectId: string;
  redirectUrl: string;
  workspaceType: string;
}

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.base};
  margin: 0.2em 0 0.2em;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  flex-basis: 100%;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    flex-basis: 29%;
  }

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-basis: 29%;
  }
`;

const RightSide = styled.div`
  display: none;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    flex-basis: 65%;
    display: inline;
  }

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-basis: 65%;
    display: inline;
  }
`;

const Description = styled.p`
  margin: 0 0 1em;
  font-size: 1em;
`;

const DetailsTitle = styled.h4`
  margin: 0 0 1em;
  font-weight: 600;
`;

const DetailsTitleEditParen = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const DetailsTitleEdit = styled.span`
  margin: 0 0 1em;
  font-weight: 600;
  font-size: 16px;
  color: #5f8ddc;
  cursor: pointer;
`;

const Icon = styled.img<{ clickable: boolean }>`
  height: 1.5em;
  margin: 0.7em 1.2em 0.7em 0;
  filter: ${({ clickable = false }) =>
    clickable ? 'grayscale(0%)' : 'grayscale(100%)'};

  @media (hover: hover) {
    &:hover {
      cursor: ${({ clickable = false }) => (clickable ? 'pointer' : 'default')};
    }
  }
`;

const Buttons = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  margin: 0 2em 0 0;
`;

const MenuWrapper = styled.div`
  margin: 2em 0 0.7em 0;
`;

const TabContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ImageContainer = styled.div`
  border-radius: 50%;
  text-align: center;
  margin: 0 2em 0.5em 2em;
  text-decoration: underline;
`;

const CircularImage = styled.img`
  border-radius: 50%;
  height: 5em;
  width: 5em;
  margin-bottom: 0;
`;

const DescriptionContainer = styled.div`
  /* 
   TODO: There exists a global style that adds 
   margin to all h1-h6 elements. Consider changing
   this. For now recursively reset project font 
   and reset margin.
  */
  * {
    margin-top: 0;
  }
`;

const DescriptionTextArea = styled.textarea`
  width: 100%;
`;

// Nonce value used to validate redirect
// requests via oauth state param
const generateNonce = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
const nonce = generateNonce();

export const ProjectWorkspace: FC<ProjectWorkspaceProps> = (props) => {
  const siteMetadata = useSiteMetadata();
  const workspaceTypesContext = useContext(WorkspaceTypesContext);
  const [project, setProject] = useState<ProjectDetailed | undefined>(
    undefined,
  );
  const [editingDetails, setEditingDetails] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');
  const [projectOwner, setProjectOwner] = useState<
    ProjectUserDetailed | undefined
  >(undefined);
  const [markdownDescription, setMarkdownDescription] = useState('');
  // indicate if project belongs to viewing user
  const [selfProject, setSelfProject] = useState(false);
  const [memberOnProject, setMemberOnProject] = useState(false);
  const [activeEdits, setActiveEdits] = useState(false);
  const [workspaceInfo, setWorkspaceInfo] = useState<WorkspaceInfo>({
    name: '',
    installUrl: '',
    version: '',
  });

  useEffect(() => {
    const api = ServiceResolver.apiResolver();
    const workspaceService = ServiceResolver.workspaceServiceResolver();

    async function fetchProject() {
      try {
        if (props.projectId == undefined) {
          return;
        }
        const response = (await api.getProject(props.projectId)) as ApiResponse<
          ProjectDetailed | ErrorResponse
        >;

        const project = response.data as ProjectDetailed;
        const projectOwner = project.projectUsers.find((p) => p.isOwner);

        setProject(project);
        setProjectOwner(projectOwner);
        setMarkdownDescription(project.extendedMarkdownDescription);

        if (project.communicationPlatform !== 'other') {
          // workspace does not have associated workspace app if
          // project.communicationPlatform so don't execute this api
          // call
          const workspaceInfo = await workspaceService.getWorkspaceInfo(
            project.communicationPlatform,
          );
          setWorkspaceInfo(workspaceInfo);
        }

        if (!UserAuthHelper.isUserAuthenticated()) {
          return;
        }

        const authedUserId = UserAuthHelper.getUserId();

        const projectMember = project.projectUsers.find(
          (p) => p.userId === authedUserId,
        );

        if (projectMember) {
          setMemberOnProject(true);
        }

        if (projectOwner === undefined) {
          return;
        }

        if (authedUserId === projectOwner.userId) {
          setSelfProject(true);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProject();
  }, [props.projectId]);

  const handleEditClick = () => {
    setEditingDetails(true);
  };

  const handlePreviewClick = () => {
    setEditingDetails(false);
  };

  const handleSaveChangesClick = async () => {
    const api = ServiceResolver.apiResolver();
    if (project === undefined || project.id === undefined) {
      return;
    }

    const patch: PatchOperation[] = [
      {
        op: 'replace',
        path: '/extendedMarkdownDescription',
        value: markdownDescription,
      },
    ];

    try {
      const response = (await api.patchProject(
        project.id,
        patch,
      )) as ApiResponse<ProjectDetailed | ErrorResponse>;
      const updatedProject = response.data as ProjectDetailed;
      const projectOwner = updatedProject.projectUsers.find((p) => p.isOwner);
      setProject(updatedProject);
      setProjectOwner(projectOwner);
      setMarkdownDescription(updatedProject.extendedMarkdownDescription);
      setEditingDetails(false);
      setActiveEdits(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDescriptionChangesClick = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMarkdownDescription(event.target.value);
    setActiveEdits(true);
  };

  const parseMarkdown = (rawMarkdownDescription: string) => {
    if (rawMarkdownDescription === null) {
      return { __html: '<div></div>' };
    }

    const md = new MarkdownIt();
    const result = md.render(rawMarkdownDescription);
    return { __html: result };
  };

  const handleProjectUpdate = async () => {
    const api = ServiceResolver.apiResolver();

    if (!props.projectId) {
      return;
    }

    try {
      const response = (await api.getProject(props.projectId)) as ApiResponse<
        ProjectDetailed | ErrorResponse
      >;
      const project = response.data as ProjectDetailed;

      setProject(project);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleJoinProject = async () => {
    if (!UserAuthHelper.isUserAuthenticated()) {
      UserAuthHelper.redirectToSignIn();
      return;
    }

    if (project === undefined) {
      return;
    }

    const api = ServiceResolver.apiResolver();
    const projectUser: ProjectUser = {
      projectId: project.id,
      isOwner: false,
      userId: UserAuthHelper.getUserId(),
    };

    try {
      (await api.joinProject(projectUser)) as ApiResponse<
        ProjectUser | ErrorResponse
      >;

      handleProjectUpdate();
      setMemberOnProject(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLeaveProject = async () => {
    if (!UserAuthHelper.isUserAuthenticated()) {
      UserAuthHelper.redirectToSignIn();
      return;
    }

    if (project === undefined) {
      return;
    }

    const api = ServiceResolver.apiResolver();

    try {
      const authedUserId = UserAuthHelper.getUserId();

      (await api.leaveProject(authedUserId)) as ApiResponse<
        ProjectUser | ErrorResponse
      >;

      handleProjectUpdate();
      setMemberOnProject(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Tie app install to a project by storing
  // additional state
  const storeOauthState = (nonce: string) => {
    if (props.projectId === undefined) {
      return;
    }

    const oauthState: OauthState = {
      projectId: props.projectId,
      redirectUrl: `${window.location.pathname}`,
      workspaceType: workspaceInfo.name,
    };

    setLocalStorage(nonce, oauthState);
    return;
  };

  // TODO: check for workspaceAppInstalled
  // TOOD: check if a token already in local storage
  if (selfProject) {
    storeOauthState(nonce);
  }
  return (
    <Fragment>
      <Seo
        title={`${project == undefined ? 'Project' : project.name} Workspace`}
        description={`Project Workspace for ${siteMetadata.title} website`}
      />

      <FeedbackForm />

      <Wrapper>
        {error && (
          <Ribbon type="danger">
            {error}{' '}
            <CloseButton onClick={() => setError(null)}>&#10006;</CloseButton>
          </Ribbon>
        )}

        {project == undefined ? (
          // waiting for project api response
          <Loader />
        ) : (
          <Fragment>
            <Title>{project.name}</Title>
            <hr></hr>
            <ContentWrapper>
              <LeftSide>
                <Description>{project.description}</Description>
                <CardTags
                  items={project.projectTechnologies.map(
                    ({ projectId, name }) => ({
                      key: `${projectId}-${name}-tag`,
                      text: name,
                    }),
                  )}
                  limitItemsShown={false}
                />
                {projectOwner !== undefined &&
                  projectOwner.timezone !== undefined && (
                    <div>Timezone: {projectOwner?.timezone}</div>
                  )}
                <div>
                  {project.repositoryUrl !== '' && (
                    <a href={memberOnProject ? project.repositoryUrl : '#'}>
                      <Icon
                        data-testid="repo-icon"
                        src={gitIcon}
                        clickable={memberOnProject}
                      />
                    </a>
                  )}
                  <a
                    href={
                      memberOnProject ? project.communicationPlatformUrl : '#'
                    }
                  >
                    <Icon
                      data-testid="workspace-icon"
                      src={
                        workspaceTypesContext.workspaceLogos[
                          project.communicationPlatform
                        ]
                      }
                      clickable={memberOnProject}
                    />
                  </a>
                </div>
                <Buttons>
                  <ButtonWrapper>
                    <ApiButton
                      handleClick={
                        memberOnProject ? handleLeaveProject : handleJoinProject
                      }
                      statusText={memberOnProject ? 'Leaving...' : 'Joining...'}
                    >
                      {memberOnProject ? 'Leave Team' : 'Join Team'}
                    </ApiButton>
                  </ButtonWrapper>
                </Buttons>
                <MenuWrapper>
                  <MultiTabMenu tabs={['Team', 'Workspace']}>
                    <TabContentContainer>
                      {project.projectUsers.length > 0 ? (
                        <Fragment>
                          {project.projectUsers.map((user) => {
                            return (
                              <Link
                                to={`/profile/${user.userId}/`}
                                key={user.userId}
                              >
                                <ImageContainer>
                                  <CircularImage
                                    src={
                                      user.profilePictureUrl ||
                                      defaultProfileImage
                                    }
                                  />
                                  <div>{user.username}</div>
                                </ImageContainer>
                              </Link>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <div>Currently no members.</div>
                      )}
                    </TabContentContainer>
                    <TabContentContainer>
                      {selfProject ? (
                        <Fragment>
                          {workspaceInfo.name === '' ? (
                            <div>
                              This tab lets you share the conversations
                              happening inside your projects workspace. We
                              currently do not have a workspace app for{' '}
                              {isValidUrl(project.communicationPlatformUrl)
                                ? new URL(project.communicationPlatformUrl)
                                    .hostname
                                : 'your workspace'}
                              . Currently supported workspaces include{' '}
                              {Object.keys(workspaceTypesContext.workspaceLogos)
                                .join(', ')
                                .replace(', other', '')}
                              . Send us feedback if you would like to see
                              support.
                            </div>
                          ) : (
                            <div>
                              Connect the project to your workspace and recieve
                              new collaborator suggestions, notices if someone
                              joins your project, and let interested devs peer
                              into conversations in the workspace. Start by
                              installing the{' '}
                              <a
                                href={`${workspaceInfo?.installUrl}&state=${nonce}`}
                              >
                                {project.communicationPlatform} app
                              </a>
                              .
                            </div>
                          )}
                        </Fragment>
                      ) : (
                        <div>Currently no workspace activity to share.</div>
                      )}
                    </TabContentContainer>
                  </MultiTabMenu>
                </MenuWrapper>
                <MenuWrapper>
                  <MultiTabMenu tabs={['Collaborator Suggestions']}>
                    <TabContentContainer>
                      {project.projectCollaboratorSuggestions.length > 0 ? (
                        <Fragment>
                          {project.projectCollaboratorSuggestions
                            .reverse()
                            .slice(0, 10)
                            .map((user) => {
                              return (
                                <Link
                                  to={`/profile/${user.userId}/`}
                                  key={user.userId}
                                >
                                  <ImageContainer>
                                    <CircularImage
                                      src={
                                        user.profilePictureUrl ||
                                        defaultProfileImage
                                      }
                                    />
                                    <div>{user.username}</div>
                                  </ImageContainer>
                                </Link>
                              );
                            })}
                        </Fragment>
                      ) : (
                        <div>Currently no collaborator suggestions.</div>
                      )}
                    </TabContentContainer>
                  </MultiTabMenu>
                </MenuWrapper>
              </LeftSide>
              <RightSide>
                <div>
                  <DetailsTitle>
                    Details
                    {selfProject && (
                      <Fragment>
                        <DetailsTitleEditParen> (</DetailsTitleEditParen>
                        {editingDetails ? (
                          <Fragment>
                            <DetailsTitleEdit onClick={handlePreviewClick}>
                              Preview
                            </DetailsTitleEdit>
                            ,{' '}
                            <DetailsTitleEdit onClick={handleSaveChangesClick}>
                              Save Changes
                            </DetailsTitleEdit>
                          </Fragment>
                        ) : (
                          <DetailsTitleEdit onClick={handleEditClick}>
                            {activeEdits ? 'Continue Edits' : 'Edit'}
                          </DetailsTitleEdit>
                        )}
                        <DetailsTitleEditParen>)</DetailsTitleEditParen>
                      </Fragment>
                    )}
                  </DetailsTitle>
                </div>
                <DescriptionContainer>
                  {editingDetails ? (
                    <DescriptionTextArea
                      value={markdownDescription}
                      rows={20}
                      onChange={handleDescriptionChangesClick}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={parseMarkdown(
                        markdownDescription,
                      )}
                    />
                  )}
                </DescriptionContainer>
              </RightSide>
            </ContentWrapper>
          </Fragment>
        )}
      </Wrapper>
    </Fragment>
  );
};
