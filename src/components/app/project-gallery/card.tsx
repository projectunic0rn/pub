import * as React from 'react';

import { Data } from './content';
import CardPill from './card-pill';
import styled from '@styled-components';
import { slackIcon, discordIcon } from '@images';
import { ProjectButton } from '../buttons';

interface CardProps {
  content: Data;
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

const Card: React.FC<CardProps> = ({ content }) => {
  const [hasMemberJoinedProject, setHasMemberJoinedProject] = React.useState(
    false,
  );

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

  const handleClick = () => {
    setHasMemberJoinedProject(!hasMemberJoinedProject);
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
      <br />
      <br />
      <ProjectButton onClick={handleClick} active={hasMemberJoinedProject}>
        {hasMemberJoinedProject ? 'Leave' : 'Join'}
      </ProjectButton>
    </Wrapper>
  );
};

export default Card;
