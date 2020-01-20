import { navigate } from 'gatsby';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  ApiResponse,
  ErrorResponse,
  ProjectTechnology,
  ProjectUser,
  Project,
  ServiceResolver,
} from '@api';
import { slackIcon, discordIcon } from '@images';
import { ProjectButton } from '@components/shared/buttons';
import { CardTechPill, CardUsernamePill } from '@components/shared';
import { UserAuthHelper } from '@helpers';

interface CardProps {
  content: Project;
  setError: Function;
}

const Wrapper = styled.div`
  flex-grow: 1;
  width: 95%;
  background-color: ${({ theme }) => theme.colors.section};
  margin: 1em;
  border-radius: 0.3125em;
  padding: 0 1.5em 1.5em 1.5em;
  position: relative;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    width: calc(33.3333% - 2em);
    max-width: calc(33.3333% - 2em);
  }
`;

const Title = styled.h3`
  margin: 0 0 1em;
`;

const Description = styled.p`
  margin: 1em 0 1em 0;
  font-size: 16px;
`;

const Break = styled.span`
  margin: 100px;
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

  const getMembers = (members: ProjectUser[]) => {
    return {
      displayable: members.map((v, i) => {
        if (i < 5)
          return <CardUsernamePill key={i}>{v.username}</CardUsernamePill>;
      }),
      other: members.length > 5 && members.slice(5, members.length),
    };
  };

  const getTech = (tech: ProjectTechnology[]) => {
    return {
      displayable: tech.map((v, i) => {
        if (i < 5) return <CardTechPill key={i}>{v.name}</CardTechPill>;
      }),
      other: tech.length > 5 && tech.slice(5, tech.length),
    };
  };

  const getMemberList = (members: ProjectUser[]) => {
    return members.map((m) => m.username).join(', ');
  };

  const getTechList = (tech: ProjectTechnology[]) => {
    return tech.map((t) => t.name).join(', ');
  };

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

  const communicationPlatforms = [
    {
      name: 'slack',
      icon: slackIcon,
    },
    {
      name: 'discord',
      icon: discordIcon,
    },
  ];
  const communicationPlatform = communicationPlatforms.find((p) =>
    content.communicationPlatformUrl.includes(p.name),
  );

  const members = getMembers(content.projectUsers);
  const tech = getTech(content.projectTechnologies);
  const CommunicationPlatformIcon = styled.img.attrs(() => ({
    src: communicationPlatform !== undefined && communicationPlatform.icon,
    alt: '',
  }))`
    position: relative;
    top: 35px;
    left: 15px;
  `;

  const CommunicationPlatformIconClickable = styled(CommunicationPlatformIcon)`
    :hover {
      cursor: pointer;
    }
  `;

  return (
    <Wrapper>
      <Title>
        {content.name}
        {hasMemberJoinedProject ? (
          <CommunicationPlatformIconClickable
            onClick={() =>
              window.open(content.communicationPlatformUrl, '_blank')
            }
          />
        ) : (
          <CommunicationPlatformIcon />
        )}
      </Title>
      {members.displayable}
      {members.other && (
        <CardUsernamePill title={getMemberList(members.other)}>
          +{members.other.length}
        </CardUsernamePill>
      )}
      <Description>{content.description}</Description>
      {tech.displayable}
      {tech.other && (
        <CardTechPill title={getTechList(tech.other)}>
          +{tech.other.length}
        </CardTechPill>
      )}
      <Break>&nbsp;</Break>
      <br />
      <br />

      <ProjectButton
        handleClick={() =>
          hasMemberJoinedProject ? leaveProject(content) : joinProject(content)
        }
        statusText={hasMemberJoinedProject ? 'Leaving...' : 'Joining...'}
        joined={hasMemberJoinedProject}
      >
        {hasMemberJoinedProject ? 'Leave' : 'Join'}
      </ProjectButton>
    </Wrapper>
  );
};

export default Card;
