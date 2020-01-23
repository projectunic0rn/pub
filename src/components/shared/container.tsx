import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  margin: 0 auto auto;
  width: 100%;
  padding: ${({ theme }) => theme.boxes.padding.section.medium};
  flex-grow: 1;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

/** Display the main content of the page. */
const Container: FC = ({ children }) => <Wrapper>{children}</Wrapper>;

export default Container;
