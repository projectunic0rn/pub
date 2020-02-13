import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

import { PostNode } from '@templates/post';

interface PostLinksProps {
  /** The prefix for the paths to be used in the next and previous links. */
  prefix: string;
  /** Contains information about the previous blog post. */
  previous: PostNode;
  /** Contains information about the next blog post. */
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
  max-width: ${({ theme }) => theme.sizes.width.maxCentered};

  a {
    background: transparent;
    color: ${({ theme }) => theme.colors.base};
    padding: 1em;
    border-radius: 0.3125em;
    text-decoration: none;
    transition: 0.2s;

    @media (hover: hover) {
      &:hover {
        background: ${({ theme }) => theme.colors.highlight};
        color: white;
      }
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

/** Displays links to the next and previous blog post. */
const PostLinks: FC<PostLinksProps> = ({ prefix, previous, next }) => {
  const linkPrefix = prefix ? `${prefix}/` : '';

  return (
    <Wrapper>
      <Box>
        {previous && (
          <PreviousLink
            to={`/${linkPrefix}${previous.fields.slug}/`}
            title={previous.frontmatter.title}
          >
            &#8592; Prev Post
          </PreviousLink>
        )}

        {next && (
          <NextLink
            to={`/${linkPrefix}${next.fields.slug}/`}
            title={next.frontmatter.title}
          >
            Next Post &#8594;
          </NextLink>
        )}
      </Box>
    </Wrapper>
  );
};

export default PostLinks;
