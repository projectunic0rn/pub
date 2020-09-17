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
} from '@api';
import { useSiteMetadata } from '@hooks';
import styled from 'styled-components';
import CardTags from '../projects-gallery/card-tags';
import { gitIcon, defaultProfileImage } from '@images';
import { WorkspaceTypesContext } from '@contexts';
import { MultiTabMenu } from './multi-tab-menu';
import { ApiButton } from '@components/shared/buttons';
import { UserAuthHelper } from '@helpers';

interface ProjectWorkspaceProps {
  projectId?: string;
  path: string;
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
  flex-basis: 29%;
`;
const RightSide = styled.div`
  flex-basis: 65%;
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

  useEffect(() => {
    const api = ServiceResolver.apiResolver();
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

        if (projectOwner === undefined) {
          return;
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

      const projectUserIndex = project.projectUsers.findIndex(
        (p) => p.userId === authedUserId,
      );

      if (projectUserIndex === -1) {
        return;
      }

      (await api.leaveProject(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        project.projectUsers[projectUserIndex].id!,
      )) as ApiResponse<ProjectUser | ErrorResponse>;

      handleProjectUpdate();
      setMemberOnProject(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Fragment>
      <Seo
        title={`${project == undefined ? 'Project' : project.name} Workspace`}
        description={`Project Workspace for ${siteMetadata.title} website`}
      />

      <FeedbackForm />

      <Wrapper>
        <div style={{ color: '#E0311D' }}>
          Project workspace pages are a work in progress. Share feedback on{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://xd.adobe.com/spec/403111eb-671b-48f1-4aa1-a43996cf2370-3600/"
          >
            current design
          </a>
          .
        </div>

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
                  <a href={memberOnProject ? project.repositoryUrl : '#'}>
                    <Icon src={gitIcon} clickable={memberOnProject} />
                  </a>
                  <a
                    href={
                      memberOnProject ? project.communicationPlatformUrl : '#'
                    }
                  >
                    <Icon
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
                    <div>Workspace</div>
                  </MultiTabMenu>
                </MenuWrapper>
                <MenuWrapper>
                  <MultiTabMenu tabs={['Collaborator Suggestions']}>
                    <TabContentContainer>
                      {project.projectCollaboratorSuggestions.length > 0 ? (
                        <Fragment>
                          {project.projectCollaboratorSuggestions.map(
                            (user) => {
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
                            },
                          )}
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
