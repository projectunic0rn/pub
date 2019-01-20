import * as React from 'react';

import styled from '@styled-components';

const Wrapper = styled.section`
  margin: 0 auto auto;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  padding: 3em 1.5em 2em;
  flex-grow: 1;
`;

const Container: React.FunctionComponent = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Container;
