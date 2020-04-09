import React, { FC } from 'react';
import styled from 'styled-components';

export const BaseContainerHtml = styled.div`
  display: flex;
  border: none;
  margin: 0 auto;
  width: 90%;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    border: 1px solid lightgray;
    width: 60%;
  }
`;

export const BaseContainer: FC = ({ children }) => (
  <BaseContainerHtml>{children}</BaseContainerHtml>
);
