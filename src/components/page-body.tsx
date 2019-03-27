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

  a {
    transition: 0.2s;
    color: ${({ theme }) => theme.colors.base};

    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
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

const PageBody: React.FC<PageBodyProps> = ({ body }) => (
  <Body dangerouslySetInnerHTML={{ __html: body }} />
);

export default PageBody;
