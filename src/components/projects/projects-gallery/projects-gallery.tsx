import { RouteComponentProps } from '@reach/router';
import React, { FC, Fragment, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Panel from './panel';
import { ApiResponse, ErrorResponse, Project, ServiceResolver } from '@api';
import { FeedbackForm } from '@components/shared/form';
import { CloseButton, Ribbon } from '@components/shared/ribbons';
import { Loader, Seo, Wrapper } from '@components/shared';
import { WorkspaceTypesContext } from '@contexts';
import { RecentDev } from '@api/types/recent-dev';

type OwnProps = {};
type ProjectsGalleryProps = OwnProps & RouteComponentProps;

const ProjectsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LeftSide = styled.div`
  flex-basis: 100%;
  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    flex-basis: 84%;
  }

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-basis: 84%;
  }
`;

const RightSide = styled.div`
  display: none;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    margin-left: 1em;
    flex-basis: 14%;
    display: inline;
  }

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.medium}) {
    margin-left: 1em;
    flex-basis: 14%;
    display: inline;
  }
`;

const DevWrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.section};
  border-radius: 0.3125em;
  padding: 0.5em;
  flex-direction: column;
  height: 6em;
  box-shadow: 1px 1px 2px ${({ theme }) => theme.colors.shadow};
  height: auto;
  margin-bottom: 1em;
`;

const Title = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5em;
`;

const DevDate = styled.div`
  align-self: flex-end;
  font-size: 0.8em;
`;

const DevInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileLink = styled(Link)`
  align-self: flex-end;
  font-size: 0.8em;
`;

const DevAbout = styled.div`
  font-size: 0.8em;
`;

export const ProjectsGallery: FC<ProjectsGalleryProps> = () => {
  const workspaceTypesContext = useContext(WorkspaceTypesContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentDevs, setRecentDevs] = useState<RecentDev[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [success, setSuccess] = useState<string | null>('');

  useEffect(() => {
    const api = ServiceResolver.apiResolver();
    async function fetchProjects() {
      try {
        const projectsResponse = (await api.getProjects()) as ApiResponse<
          Project[] | ErrorResponse
        >;
        const recentDevsResponse = (await api.getRecentDevs()) as ApiResponse<
          RecentDev[] | ErrorResponse
        >;
        const projects = projectsResponse.data as Project[];
        const recentDevs = recentDevsResponse.data as RecentDev[];
        setProjects(projects);
        setRecentDevs(recentDevs);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    }

    fetchProjects();
  }, []);

  const getDaysAgoMessage = (devDate: Date): string => {
    const singleDay = 24 * 60 * 60 * 1000;
    const devDateTime = new Date(devDate).getTime();
    const todayTime = new Date().getTime();

    const daysAgo = Math.round(Math.abs((todayTime - devDateTime) / singleDay));
    if (daysAgo === 0) {
      return 'Today';
    } else if (daysAgo === 1) {
      return `1 day ago`;
    } else {
      return `${daysAgo} days ago`;
    }
  };

  return (
    <Fragment>
      <Seo title="Projects" />

      <FeedbackForm page="/projects" />

      <Wrapper>
        {success && (
          <Ribbon type="success">
            {success}{' '}
            <CloseButton onClick={() => setSuccess(null)}>&#10006;</CloseButton>
          </Ribbon>
        )}

        {error && (
          <Ribbon type="danger">
            {error}{' '}
            <CloseButton onClick={() => setError(null)}>&#10006;</CloseButton>
          </Ribbon>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <ProjectsWrapper>
            <LeftSide>
              <Panel
                content={projects}
                workspaceLogos={workspaceTypesContext.workspaceLogos}
                setError={setError}
              />
            </LeftSide>
            <RightSide>
              <Title>Recent Devs</Title>
              {recentDevs.map((dev) => {
                return (
                  <DevWrapper key={dev.id}>
                    <DevDate>{getDaysAgoMessage(dev.updatedAt)}</DevDate>
                    <DevInfoContainer>
                      <DevAbout>{dev.bio}</DevAbout>
                    </DevInfoContainer>
                    <ProfileLink to={`/profile/${dev.id}`}>Profile</ProfileLink>
                  </DevWrapper>
                );
              })}
            </RightSide>
          </ProjectsWrapper>
        )}
      </Wrapper>
    </Fragment>
  );
};
