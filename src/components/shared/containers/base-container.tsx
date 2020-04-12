import React, { FC } from 'react';
import styled from 'styled-components';

export const BaseContainerHtml = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    border: 1px solid lightgray;
    flex-direction: row;
  }
`;

export const BaseContainer: FC = ({ children }) => (
  <BaseContainerHtml>{children}</BaseContainerHtml>
);
