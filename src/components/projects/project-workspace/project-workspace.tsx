import { RouteComponentProps } from '@reach/router';
import React, { FC, Fragment, useEffect, useState, useContext } from 'react';

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
import { gitIcon } from '@images';
import { WorkspaceTypesContext } from '@contexts';
import { MultiTabMenu } from './multi-tab-menu';
import { ApiButton } from '@components/shared/buttons';
import { noop } from 'lodash';

interface ProjectWorkspaceParams {
  projectId?: string;
}

type ProjectWorkspaceProps = ProjectWorkspaceParams & RouteComponentProps;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.base};
  margin: 0.2em 0 0.2em;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const LeftSide = styled.div`
  flex-basis: 30%;
`;
const RightSide = styled.div`
  flex-basis: 70%;
`;

const Description = styled.p`
  margin: 0 0 1em;
  font-size: 1em;
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

export const ProjectWorkspace: FC<ProjectWorkspaceProps> = (props) => {
  const siteMetadata = useSiteMetadata();
  const workspaceTypesContext = useContext(WorkspaceTypesContext);
  const [project, setProject] = useState<ProjectDetailed | undefined>(
    undefined,
  );
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
                  />
                </MenuWrapper>
                <MenuWrapper>
                  <MultiTabMenu tabs={['Collaborator Suggestions']} />
                </MenuWrapper>
              </LeftSide>
              <RightSide>
                <div>Project Extended Details</div>
              </RightSide>
            </ContentWrapper>
          </Fragment>
        )}
      </Wrapper>
    </Fragment>
  );
};
