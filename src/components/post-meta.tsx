import Img, { GatsbyImageProps } from 'gatsby-image';
import * as React from 'react';

import styled from '@styled-components';
import { Author } from '@templates/post';
import { Link } from 'gatsby';

interface AvatarProps {
  small?: boolean;
}

interface PostMetaProps {
  date: string;
  author: Author;
}

const Wrapper = styled.div`
  margin: 0 auto 2em;
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
  margin-right: 1em;
`;

const Body = styled.div`
  flex: 1;
  color: darkslategrey;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  font-size: 1.2em;
  margin: 0;
  color: ${({ theme }) => theme.colors.base};
  text-decoration: none;
  display: inline-block;
  transition: 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`;

const Bio = styled.p`
  margin: 0;
`;

const PostDate: React.FunctionComponent<PostMetaProps> = ({
  date,
  author: { avatar, bio, github, id, name },
}) => (
  <Wrapper>
    {avatar && <Avatar fluid={avatar.childImageSharp.fluid} />}

    <Body>
      <StyledLink to={`/author/${id}`}>{name} </StyledLink>
      <Bio>{bio}</Bio>
      Published on {date}
    </Body>
  </Wrapper>
);

export default PostDate;
