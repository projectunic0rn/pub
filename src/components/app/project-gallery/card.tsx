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
import { SocialIcon } from '@components/shared';
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
    line-height: 2.5;
  }

  span svg {
    vertical-align: middle;
    margin-right: 0.3em;

    path {
      fill: ${({ theme }) => theme.colors.text};
    }
  }
`;

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
            <SocialIcon
              socialName={
                memberCount >= 3
                  ? 'userThree'
                  : memberCount === 2
                  ? 'userTwo'
                  : 'userOne'
              }
              href=""
              viewBox="0 0 640 512"
              fontSize="1em"
            />{' '}
            {content.projectUsers.length} Member{memberCount === 1 ? '' : 's'}
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
