import { navigate } from 'gatsby';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import CardButton from './card-button';
import CardTags from './card-tags';
import CardTitle from './card-title';
import {
  ApiResponse,
  ErrorResponse,
  ProjectUser,
  Project,
  ServiceResolver,
} from '@api';
import { SvgIcon } from '@components/shared';
import { UserAuthHelper } from '@helpers';

type CardProps = {
  content: Project;
  setError: Function;
};

const Wrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.section};
  border-radius: 0.3125em;
  padding: 1.5em;
  flex-direction: column;
  height: 100%;
  box-shadow: 1px 1px 2px ${({ theme }) => theme.colors.shadow};
`;

const Description = styled.p`
  margin: 0 0 1em;
  font-size: 1em;
`;

const Spacer = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  span {
    line-height: 2.47;
  }

  span svg {
    vertical-align: middle;
    margin-right: 0.3em;

    path {
      fill: ${({ theme }) => theme.colors.text};
    }
  }
`;

type UserIconProps = {
  d?: string;
};

const UserIcon: FC<UserIconProps> = ({ d }) => (
  <SvgIcon viewBox="0 0 640 512" fontSize="1em">
    <path fill="currentColor" d={d} />
  </SvgIcon>
);

const Card: FC<CardProps> = ({ content, setError }) => {
  const [hasMemberJoinedProject, setHasMemberJoinedProject] = useState(false);

  const userId = UserAuthHelper.isUserAuthenticated()
    ? UserAuthHelper.getUserId()
    : null;

  useEffect(() => {
    setHasMemberJoinedProject(
      content.projectUsers.find((u) => u.userId === userId) !== undefined,
    );
  }, [content.projectUsers, userId]);

  const redirectToSignIn = () => {
    navigate('/signin', {
      state: { message: 'You need to be signed in to join a project' },
    });
  };

  const leaveProject = async (project: Project) => {
    if (!UserAuthHelper.isUserAuthenticated()) {
      redirectToSignIn();
      return;
    }

    const api = ServiceResolver.apiResolver();

    const projectUser = project.projectUsers.find(
      (u) => u.userId === userId,
    ) as ProjectUser;

    const response = (await api.leaveProject(
      projectUser.id as string,
    )) as ApiResponse<ProjectUser | ErrorResponse>;

    if (response.ok) {
      const projectUserIndex = content.projectUsers.indexOf(projectUser);
      content.projectUsers.splice(projectUserIndex, 1);
    }

    if (response.ok) {
      setHasMemberJoinedProject(!hasMemberJoinedProject);
    } else {
      setError((response.data as ErrorResponse).message);
    }
  };

  const joinProject = async (project: Project) => {
    if (!UserAuthHelper.isUserAuthenticated()) {
      redirectToSignIn();
      return;
    }

    const api = ServiceResolver.apiResolver();
    const joinProjectResponseBody: ProjectUser = {
      projectId: project.id as string,
      isOwner: false,
      userId,
    };

    const response = (await api.joinProject(
      joinProjectResponseBody,
    )) as ApiResponse<ProjectUser | ErrorResponse>;

    if (response.ok) {
      joinProjectResponseBody.username = (response.data as ProjectUser).username;
      joinProjectResponseBody.id = (response.data as ProjectUser).id;
      content.projectUsers.push(joinProjectResponseBody);
    }

    if (response.ok) {
      setHasMemberJoinedProject(!hasMemberJoinedProject);
    } else {
      setError((response.data as ErrorResponse).message);
    }
  };

  const memberCount = content.projectUsers.length;

  return (
    <Wrapper>
      <CardTitle
        name={content.name}
        clickable={hasMemberJoinedProject}
        communicationPlatformUrl={content.communicationPlatformUrl}
      />

      <Description>{content.description}</Description>

      <CardTags
        items={content.projectTechnologies.map(({ projectId, name }) => ({
          key: `${projectId}-${name}-tag`,
          text: name,
        }))}
      />

      <Spacer />

      <Footer>
        {memberCount > 0 ? (
          <span>
            {memberCount >= 3 && (
              <UserIcon d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
            )}
            {memberCount === 2 && (
              <UserIcon d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z" />
            )}
            {memberCount === 1 && (
              <UserIcon d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
            )}
            {memberCount} Member{memberCount === 1 ? '' : 's'}
          </span>
        ) : (
          <Spacer />
        )}

        <CardButton
          onClick={() =>
            hasMemberJoinedProject
              ? leaveProject(content)
              : joinProject(content)
          }
          statusText={hasMemberJoinedProject ? 'Leaving...' : 'Joining...'}
          joined={hasMemberJoinedProject}
        >
          {hasMemberJoinedProject ? 'Leave' : 'Join'}
        </CardButton>
      </Footer>
    </Wrapper>
  );
};

export default Card;
