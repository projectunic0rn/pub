import * as React from 'react';

import CardPill from './card-pill';
import styled from 'styled-components';
import { slackIcon, discordIcon } from '@images';
import { ProjectButton } from '../buttons';
import { Project } from '@/api/types/project';
import { ProjectTechnology } from '@/api/types/project-technology';
import { ProjectUser } from '@/api/types/project-user';
import { UserAuthHelper } from '@/helpers';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import { navigate } from 'gatsby';
import { MockApiService } from '@/mocks/mock-api-service';
import { ApiService } from '@/api/api-service';

interface CardProps {
  content: Project;
  setMessage: Function;
  api: ApiService | MockApiService;
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

const Tech = styled.span`
  background: white;
  color: black;
  border-radius: 0.3125em;
  font-size: 0.7em;
  display: inline-block;
  padding: 0.2em 0.625em;
  margin-right: 0.5em;

  :hover {
    cursor: default;
  }

  @media screen and (max-width: 480px) {
    margin-top: 5px;
  }
`;

const Break = styled.span`
  margin: 100px;
`;

const Card: React.FC<CardProps> = ({ content, setMessage, api }) => {
  const [hasMemberJoinedProject, setHasMemberJoinedProject] = React.useState(
    false,
  );
  const [hasRequestBeenMade, setHasRequestBeenMade] = React.useState<boolean>(
    false,
  );

  const userId = UserAuthHelper.isUserAuthenticated()
    ? UserAuthHelper.getUserId()
    : null;

  React.useEffect(() => {
    setHasMemberJoinedProject(
      content.projectUsers.find((u) => u.userId === userId) !== undefined,
    );
  }, [content.projectUsers, userId]);

  const getMembers = (members: ProjectUser[]) => {
    return {
      displayable: members.map((v, i) => {
        if (i < 5) return <CardPill key={i}>{v.username}</CardPill>;
      }),
      other: members.length > 5 && members.slice(5, members.length),
    };
  };

  const getTech = (tech: ProjectTechnology[]) => {
    return {
      displayable: tech.map((v, i) => {
        if (i < 5) return <Tech key={i}>{v.name}</Tech>;
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

  const leaveProject = async (project: Project) => {
    setHasRequestBeenMade(true);

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
      setMessage((response.data as ErrorResponse).message);
    }

    setHasRequestBeenMade(false);
  };

  const joinProject = async (project: Project) => {
    setHasRequestBeenMade(true);
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
      setMessage((response.data as ErrorResponse).message);
    }

    setHasRequestBeenMade(false);
  };

  const handleClick = async (project: Project) => {
    if (!UserAuthHelper.isUserAuthenticated()) {
      navigate('/signin', {
        state: { message: 'You need to be signed in to join a project' },
      });
      return;
    }

    if (!hasRequestBeenMade) {
      try {
        if (hasMemberJoinedProject) {
          leaveProject(project);
        } else {
          joinProject(project);
        }
      } catch (err) {
        setMessage('Unable to perform the requested action at this time');
      }
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
        <CardPill title={getMemberList(members.other)}>
          +{members.other.length}
        </CardPill>
      )}
      <Description>{content.description}</Description>
      {tech.displayable}
      {tech.other && (
        <Tech title={getTechList(tech.other)}>+{tech.other.length}</Tech>
      )}
      <Break>&nbsp;</Break>
      <br />
      <br />
      <ProjectButton
        onClick={() => handleClick(content)}
        active={hasMemberJoinedProject}
        disabled={hasRequestBeenMade}
      >
        {hasMemberJoinedProject ? 'Leave' : 'Join'}
      </ProjectButton>
    </Wrapper>
  );
};

export default Card;
