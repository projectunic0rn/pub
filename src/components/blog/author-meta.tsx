import React, { FC } from 'react';
import styled from 'styled-components';

import { Avatar } from '@components/blog';
import { SocialIcon } from '@components/shared';
import { Author } from '@templates/author';

interface AuthorMetaProps {
  /** The object containing details about an author. */
  author: Author;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;

  svg {
    width: 1em;
    font-size: 24px;

    & path {
      transition: 0.2s;
      fill: ${({ theme }) => theme.colors.text};
      opacity: 0.7;
    }

    @media (hover: hover) {
      &:hover path {
        fill: ${({ theme }) => theme.colors.highlight};
        opacity: 1;
      }
    }
  }
`;

const SocialAccounts = styled.div`
  display: flex;
`;

const Name = styled.h2`
  margin: 1em 0 0.5em;
`;

/** Displays details about an author. */
const AuthorMeta: FC<AuthorMetaProps> = ({
  author: { avatar, name, bio, github, twitter },
}) => (
  <Wrapper>
    {avatar && (
      <Avatar
        fluid={avatar.childImageSharp.fluid}
        alt=""
        title={name}
        alignment="vertical"
      />
    )}
    <Name>{name}</Name>
    <p>{bio}</p>

    <SocialAccounts>
      <SocialIcon
        link
        socialName="github"
        href={`https://github.com/${github}`}
        title={`${name} on GitHub`}
      />

      {twitter && (
        <SocialIcon
          link
          socialName="twitter"
          href={`https://twitter.com/${twitter}`}
          title={`${name} on Twitter`}
        />
      )}
    </SocialAccounts>
  </Wrapper>
);

export default AuthorMeta;
