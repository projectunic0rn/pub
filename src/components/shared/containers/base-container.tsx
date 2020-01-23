import React, { FC } from 'react';
import styled from 'styled-components';

export const BaseContainerHtml = styled.div`
  display: flex;
  width: 60%;
  margin: 0 auto 50px auto;
`;

export const BaseContainer: FC = ({ children }) => {
  return <BaseContainerHtml>{children}</BaseContainerHtml>;
};
