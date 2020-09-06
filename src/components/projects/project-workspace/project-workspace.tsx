import React, { FC, Fragment, useEffect, useState, useContext } from 'react';
import { Link } from 'gatsby';

import { Wrapper, Seo, Loader } from '@components/shared';
import { CloseButton, Ribbon } from '@components/shared/ribbons';
import { FeedbackForm } from '@components/shared/form';
import {
  ServiceResolver,
  ApiResponse,
  ErrorResponse,
  ProjectDetailed,
  ProjectUserDetailed,
} from '@api';
import { useSiteMetadata } from '@hooks';
import styled from 'styled-components';
import CardTags from '../projects-gallery/card-tags';
import { gitIcon, defaultProfileImage } from '@images';
import { WorkspaceTypesContext } from '@contexts';
import { MultiTabMenu } from './multi-tab-menu';
import { ApiButton } from '@components/shared/buttons';
import { noop } from 'lodash';

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
  flex-basis: 69%;
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

const Icon = styled.img`
  height: 1.5em;
  margin: 0.7em 1.2em 0.7em 0;
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
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProject();
  }, [props.projectId]);

  const handleEditClick = () => {
    setEditingDetails(true);
  };

  const handleSaveCHangesClick = () => {
    setEditingDetails(false);
  };

  return (
    <Fragment>
      <Seo
        title={`${project == undefined ? 'Project' : project.name} Workspace`}
        description={`Project Workspace for ${siteMetadata.title} website`}
      />

      <FeedbackForm page="project page" />

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
            <Title>
              {project.name} <DetailsTitleEditParen>(</DetailsTitleEditParen>
              <DetailsTitleEdit onClick={noop}>Manage</DetailsTitleEdit>
              <DetailsTitleEditParen>)</DetailsTitleEditParen>
            </Title>
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
                  <a href={project.repositoryUrl}>
                    <Icon src={gitIcon} />
                  </a>
                  <a href={project.communicationPlatformUrl}>
                    <Icon
                      src={
                        workspaceTypesContext.workspaceLogos[
                          project.communicationPlatform
                        ]
                      }
                    />
                  </a>
                </div>
                <Buttons>
                  <ButtonWrapper>
                    <ApiButton handleClick={noop} statusText="Joining...">
                      Join Team
                    </ApiButton>
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <ApiButton handleClick={noop} statusText="Fanning...">
                      Become Fan
                    </ApiButton>
                  </ButtonWrapper>
                </Buttons>
                <MenuWrapper>
                  <MultiTabMenu
                    tabs={['Team', 'Milestones', 'Fans', 'Workspace']}
                  >
                    <TabContentContainer>
                      {project.projectUsers.length > 0 ? (
                        <Fragment>
                          {project.projectUsers.map((user) => {
                            return (
                              <Link to={`/profile/${user.id}/`} key={user.id}>
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
                    <div>Milestones</div>
                    <div>Fans</div>
                    <div>Workspace</div>
                  </MultiTabMenu>
                </MenuWrapper>
                <MenuWrapper>
                  <MultiTabMenu tabs={['Collaborator Suggestions']}>
                    <div>Collaborator Suggestions</div>
                  </MultiTabMenu>
                </MenuWrapper>
              </LeftSide>
              <RightSide>
                <div>
                  <DetailsTitle>
                    Details <DetailsTitleEditParen>(</DetailsTitleEditParen>
                    {editingDetails ? (
                      <Fragment>
                        <DetailsTitleEdit onClick={noop}>
                          Preview
                        </DetailsTitleEdit>
                        ,{' '}
                        <DetailsTitleEdit onClick={handleSaveCHangesClick}>
                          Save Changes
                        </DetailsTitleEdit>
                      </Fragment>
                    ) : (
                      <DetailsTitleEdit onClick={handleEditClick}>
                        Edit
                      </DetailsTitleEdit>
                    )}
                    <DetailsTitleEditParen>)</DetailsTitleEditParen>
                  </DetailsTitle>
                </div>
                <div>Project Extended Details</div>
              </RightSide>
            </ContentWrapper>
          </Fragment>
        )}
      </Wrapper>
    </Fragment>
  );
};
