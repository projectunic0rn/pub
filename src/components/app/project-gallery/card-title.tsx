import React, { FC, Fragment } from 'react';
import styled from 'styled-components';

import { slackIcon, discordIcon } from '@images';

type CardTitleProps = {
  name: string;
  communicationPlatformUrl?: string;
  clickable?: boolean;
};

type IconProps = {
  clickable?: boolean;
};

type CommunicationPlatform = {
  name: string;
  icon: string;
};

const communicationPlatforms: CommunicationPlatform[] = [
  {
    name: 'slack',
    icon: slackIcon,
  },
  {
    name: 'discord',
    icon: discordIcon,
  },
];

const Wrapper = styled.h3`
  color: ${({ theme }) => theme.colors.base};
  margin: 0.2em 0 0.8em;
`;

const Icon = styled.img.attrs(() => ({
  alt: '',
}))<IconProps>`
  filter: ${({ clickable = false }) =>
    clickable ? 'grayscale(0%)' : 'grayscale(100%)'};
  margin: 0 0 -0.06em;
  position: relative;
  left: 0.35em;
  height: 0.9em;
  user-select: none;
  transition: filter 0.2s ease-out;

  @media (hover: hover) {
    &:hover {
      cursor: ${({ clickable = false }) => (clickable ? 'pointer' : 'default')};
    }
  }
`;

const CardTitle: FC<CardTitleProps> = ({
  name,
  communicationPlatformUrl,
  clickable = false,
}) => {
  const IconWrapper: FC = ({ children }) =>
    clickable ? (
      <a
        href={communicationPlatformUrl}
        title={`Communication platform link for ${name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ) : (
      <Fragment>{children}</Fragment>
    );

  return (
    <Wrapper>
      {name}
      {communicationPlatformUrl ? (
        <IconWrapper>
          <Icon
            src={
              communicationPlatforms.find(({ name }) =>
                communicationPlatformUrl?.includes(name),
              )?.icon
            }
            clickable={clickable}
          />
        </IconWrapper>
      ) : null}
    </Wrapper>
  );
};

export default CardTitle;
