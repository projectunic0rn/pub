import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

import { Avatar } from '@components/blog';
import { SocialIcon } from '@components/shared';
import { Author } from '@templates/post';

interface PostMetaProps {
  /** The published date for a blog post. */
  date: string;
  /** Contains details for the author of the current blog post. */
  author: Author;
}

const Wrapper = styled.div`
  margin: 0 auto 2.4em;
  max-width: ${({ theme }) => theme.sizes.width.maxCentered};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
`;

const Header = styled.header`
  display: inline-flex;

  a {
    color: ${({ theme }) => theme.colors.base};
    display: inline-flex;
    align-items: center;
  }

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

const AuthorLink = styled(Link)`
  font-weight: 600;
  font-size: 1.2em;
  margin: 0 0.8em 0 0;
  text-decoration: none;
  display: inline-block;
  transition: 0.2s;
  background-image: none;

  && {
    color: ${({ theme }) => theme.colors.base};

    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
    }
  }
`;

const Bio = styled.p`
  margin: 0;
`;

/** Displays details about a blog post. */
const PostMeta: FC<PostMetaProps> = ({
  date,
  author: { avatar, bio, id, name, github, twitter },
}) => (
  <Wrapper>
    {avatar && (
      <Avatar fluid={avatar.childImageSharp.fluid} alt="" title={name} />
    )}

    <Body>
      <Header>
        <AuthorLink to={`/blog/author/${id}`} title={`Posts by ${name}`}>
          {name}
        </AuthorLink>

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
      </Header>
      <Bio>{bio}</Bio>
      Published on {date}
    </Body>
  </Wrapper>
);

export default PostMeta;
