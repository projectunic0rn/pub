import { Link } from 'gatsby';
import * as React from 'react';

import styled from '@styled-components';
import { truncate } from '@utils/string-utils';

interface PostLinksProps {
  previous: any;
  next: any;
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
    background: ${({ theme }) => theme.colors.base};
    color: white;
    padding: 1em;
    border-radius: 2px;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors.highlight};
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

const PostLinks: React.FunctionComponent<PostLinksProps> = ({
  previous,
  next,
}) => {
  return (
    <Wrapper>
      <Box>
        {previous && (
          <PreviousLink to={previous.fields.slug}>
            &#8592; {truncate(previous.frontmatter.title)}
          </PreviousLink>
        )}

        {next && (
          <NextLink to={next.fields.slug}>
            {truncate(next.frontmatter.title)} &#8594;
          </NextLink>
        )}
      </Box>
    </Wrapper>
  );
};

export default PostLinks;
