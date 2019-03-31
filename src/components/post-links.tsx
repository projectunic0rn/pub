import { Link } from 'gatsby';
import * as React from 'react';

import styled from '@styled-components';

interface PostNode {
  fields: { slug: string };
}

interface PostLinksProps {
  prefix: string;
  previous: PostNode;
  next: PostNode;
}

const Wrapper = styled.div`
  margin: -2em 0 0 0;
  padding: 0 1.5em 2em;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.maxWidthCentered};

  a {
    background: transparent;
    color: ${({ theme }) => theme.colors.base};
    padding: 1em;
    border-radius: 2px;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors.highlight};
      color: white;
    }
  }
`;

const PreviousLink = styled(Link)`
  margin-right: auto;
  order: 1;
`;

const NextLink = styled(Link)`
  margin-left: auto;
  order: 2;
`;

const PostLinks: React.FC<PostLinksProps> = ({ prefix, previous, next }) => {
  const linkPrefix = prefix ? `${prefix}/` : '';

  return (
    <Wrapper>
      <Box>
        {previous && (
          <PreviousLink
            to={`/${linkPrefix}${previous.fields.slug}/`}
            title={previous.fields.slug}
          >
            &#8592; Prev Post
          </PreviousLink>
        )}

        {next && (
          <NextLink
            to={`/${linkPrefix}${next.fields.slug}/`}
            title={next.fields.slug}
          >
            Next Post &#8594;
          </NextLink>
        )}
      </Box>
    </Wrapper>
  );
};

export default PostLinks;
