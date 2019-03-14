import { Link } from 'gatsby';
import Img, { GatsbyImageProps } from 'gatsby-image';
import * as React from 'react';

import styled from '@styled-components';
import { Author } from '@templates/post';

interface AvatarProps {
  small?: boolean;
}

interface SocialIconProps {
  href: string;
  type?: 'github' | 'twitter';
  title?: string;
}

interface PostMetaProps {
  date: string;
  author: Author;
}

const Wrapper = styled.div`
  margin: 0 auto 2.4em;
  max-width: ${({ theme }) => theme.sizes.maxWidthCentered};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled(Img).attrs({ small: false })<
  AvatarProps & GatsbyImageProps
>`
  min-height: 4em;
  max-height: 4em;
  min-width: 4em;
  max-width: 4em;
  border-radius: 50%;
  margin-right: 1.25em;
`;

const Body = styled.div`
  flex: 1;
  color: darkslategrey;
`;

const StyledLink = styled(Link)`
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

const SocialIconLink = styled.a.attrs({
  rel: 'nofollow noopener noreferrer',
  target: '_blank',
})`
  color: ${({ theme }) => theme.colors.base};
  text-decoration: none;
  background-image: none;
  display: inline-block;
  vertical-align: middle;

  &:hover {
    color: white;
    cursor: pointer;
  }

  &:visited {
    color: ${({ theme }) => theme.colors.base};
  }

  margin-right: 0.6em;

  &:last-child {
    margin-right: 0;
  }

  svg {
    width: 1em;

    & path {
      transition: 0.2s;
      fill: ${({ theme }) => theme.colors.base};
    }

    &:hover path {
      fill: ${({ theme }) => theme.colors.highlight};
    }
  }
`;

const Bio = styled.p`
  margin: 0;
`;

const SocialIcon: React.FunctionComponent<SocialIconProps> = ({
  href,
  title,
  type = 'github',
}) => (
  <SocialIconLink href={href}>
    {type === 'github' && (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {title && <title>{title}</title>}
        <path
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          fill="currentColor"
        />
      </svg>
    )}

    {type === 'twitter' && (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {title && <title>{title}</title>}
        <path
          d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"
          fill="currentColor"
        />
      </svg>
    )}
  </SocialIconLink>
);

const PostDate: React.FunctionComponent<PostMetaProps> = ({
  date,
  author: { avatar, bio, id, name, github, twitter },
}) => (
  <Wrapper>
    {avatar && <Avatar fluid={avatar.childImageSharp.fluid} />}

    <Body>
      <StyledLink to={`/blog/author/${id}`}>{name}</StyledLink>
      <SocialIcon
        href={`https://github.com/${github}`}
        title={`${name} on GitHub`}
      />
      {twitter && (
        <SocialIcon
          type="twitter"
          href={`https://twitter.com/${twitter}`}
          title={`${name} on Twitter`}
        />
      )}
      <Bio>{bio}</Bio>
      Published on {date}
    </Body>
  </Wrapper>
);

export default PostDate;
