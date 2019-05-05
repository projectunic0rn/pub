import * as React from 'react';

import styled from '@styled-components';

const Wrapper = styled.section`
  margin: 0 auto auto;
  width: 100%;
  padding: ${({ theme }) => theme.boxes.padding.section.medium};
  flex-grow: 1;
`;

/** Display the main content of the page. */
const Container: React.FC = ({ children }) => <Wrapper>{children}</Wrapper>;

export default Container;
