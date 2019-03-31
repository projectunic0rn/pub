import { Link } from 'gatsby';
import Img, { GatsbyImageProps } from 'gatsby-image';
import * as React from 'react';

import styled from '@styled-components';
import { Author } from '@templates/post';
import { SocialIcon } from '@components';

interface AvatarProps {
  small?: boolean;
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
  margin-right: 1.6em;
`;

const Body = styled.div`
  flex: 1;
  color: rgba(0, 0, 0, 0.73);
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
      fill: rgba(0, 0, 0, 0.73);
      opacity: 0.7;
    }

    &:hover path {
      fill: ${({ theme }) => theme.colors.highlight};
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

const PostDate: React.FC<PostMetaProps> = ({
  date,
  author: { avatar, bio, id, name, github, twitter },
}) => (
  <Wrapper>
    {avatar && <Avatar fluid={avatar.childImageSharp.fluid} />}

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

export default PostDate;
