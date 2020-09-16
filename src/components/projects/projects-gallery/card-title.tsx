import { Link } from 'gatsby';
import React, { FC, Fragment } from 'react';
import styled from 'styled-components';

type CardTitleProps = {
  name: string;
  communicationPlatformUrl?: string;
  workspaceLogo: string;
  projectId: string;
  clickable?: boolean;
};

type IconProps = {
  clickable?: boolean;
};

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

const ProjectLink = styled(Link)`
  color: ${({ theme }) => theme.colors.base};
  text-decoration: underline;
  &:visited {
    color: ${({ theme }) => theme.colors.base};
  }
`;

const CardTitle: FC<CardTitleProps> = ({
  name,
  communicationPlatformUrl,
  workspaceLogo,
  clickable = false,
  projectId,
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
      <ProjectLink to={`/projects/${projectId}`}>{name}</ProjectLink>
      <IconWrapper>
        <Icon src={workspaceLogo} clickable={clickable} />
      </IconWrapper>
    </Wrapper>
  );
};

export default CardTitle;
