import * as React from 'react';

import styled from '@styled-components';

interface PageBodyProps {
  body: string;
}

const Body = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.sizes.maxWidthCentered};

  h1,
  h2,
  h3 {
    text-transform: capitalize;
  }

  p {
    line-height: 1.5;
  }

  a {
    transition: 0.2s;
    color: ${({ theme }) => theme.colors.base};

    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
    }
  }

  em {
    font-style: italic;
  }

  ul {
    li {
      list-style: disc;
      list-style-position: inside;
      line-height: 1.25;

      &:last-child {
        margin: 0;
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

const PageBody: React.FunctionComponent<PageBodyProps> = ({ body }) => (
  <Body dangerouslySetInnerHTML={{ __html: body }} />
);

export default PageBody;
