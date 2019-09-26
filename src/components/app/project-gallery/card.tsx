import * as React from 'react';

import CardPill from './card-pill';
import styled from '@styled-components';
import { slackIcon, discordIcon } from '@images';
import { ProjectButton } from '../buttons';
import { Project } from '@/api/types/project';
import ServiceResolver from '@/api/service-resolver';
import { ApiResponse } from '@/api/types/api-response';

interface CardProps {
  content: Project;
  setApiError: Function;
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

const Error = styled.span`
  color: #cc0000;
  float: right;
  font-size: 14px;
  position: absolute;
  bottom: 5px;

  @media screen and (max-width: 750px) {
    bottom: 0;
    position: inherit;
    top: 20px;
    font-size: 12px;
  }

  @media screen and (max-width: 768px) {
    color: blue;
    margin-top: -1000px;
    bottom: 0;
  }
`;

const Break = styled.span`
  margin: 100px;
`;

const Card: React.FC<CardProps> = ({ content, setApiError }) => {
  const [hasMemberJoinedProject, setHasMemberJoinedProject] = React.useState(
    false,
  );
  const [isJoining, setIsJoining] = React.useState<boolean>(false);

  const getMembers = (members: string[]) => {
    return {
      displayable: members.map((v, i) => {
        if (i < 5) return <CardPill key={i}>{v}</CardPill>;
      }),
      other: members.length > 5 && members.slice(5, members.length),
    };
  };

  const getTech = (tech: string[]) => {
    return {
      displayable: tech.map((v, i) => {
        if (i < 5) return <Tech key={i}>{v}</Tech>;
      }),
      other: tech.length > 5 && tech.slice(5, tech.length),
    };
  };

  const handleClick = async (id: string) => {
    const api = new ServiceResolver().ApiResolver();

    try {
      setIsJoining(true);

      const response = hasMemberJoinedProject
        ? ((await api.leaveProject(id)) as ApiResponse)
        : ((await api.joinProject({
            projectId: id,
            userId: '',
            isOwner: false,
          })) as ApiResponse);

      if (response.ok) {
        setHasMemberJoinedProject(!hasMemberJoinedProject);
        setApiError(false, 'Failed to join the project');
      } else {
        setApiError(true, response.data as string);
      }
    } catch (err) {
      setApiError(true, err);
    }

    setIsJoining(false);
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

  const members = getMembers(content.members);
  const tech = getTech(content.technologies);
  const CommunicationPlatformIcon = styled.img.attrs({
    src: communicationPlatform !== undefined && communicationPlatform.icon,
    alt: '',
  })`
    position: relative;
    top: 35px;
    left: 15px;
  `;

  return (
    <Wrapper>
      <Title>
        {content.name}
        <CommunicationPlatformIcon />
      </Title>
      {members.displayable}
      {members.other && (
        <CardPill title={members.other.join(', ')}>
          +{members.other.length}
        </CardPill>
      )}
      <Description>{content.description}</Description>
      {tech.displayable}
      {tech.other && (
        <Tech title={tech.other.join(', ')}>+{tech.other.length}</Tech>
      )}
      <Break>&nbsp;</Break>
      <br />
      <br />
      <ProjectButton
        onClick={() => handleClick(content.id)}
        active={hasMemberJoinedProject}
        disabled={isJoining}
      >
        {hasMemberJoinedProject ? 'Leave' : 'Join'}
      </ProjectButton>
    </Wrapper>
  );
};

export default Card;
