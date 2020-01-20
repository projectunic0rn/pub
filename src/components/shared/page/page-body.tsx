import React, { FC } from 'react';
import styled from 'styled-components';

interface PageBodyProps {
  /** Content to be shown as the page body. */
  body?: string;
}

const Body = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.sizes.width.maxCentered};

  h1,
  h2,
  h3 {
    text-transform: capitalize;
  }

  a {
    transition: 0.2s;
    color: ${({ theme }) => theme.colors.base};

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }) => theme.colors.highlight};
      }
    }
  }

  pre {
    margin: 0 0 1.5em 0;
    border-radius: 2px;

    span {
      background: inherit !important;
    }
  }
`;

/** Wrapper for a blog post's main content. */
const PageBody: FC<PageBodyProps> = ({ body, children }) =>
  body ? (
    <Body dangerouslySetInnerHTML={{ __html: body }} />
  ) : (
    <Body>{children}</Body>
  );

export default PageBody;
