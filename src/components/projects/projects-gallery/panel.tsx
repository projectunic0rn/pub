import React, { FC } from 'react';
import styled from 'styled-components';

import Card from './card';
import { Project } from '@api';

interface PanelProps {
  content?: Project[];
  workspaceLogos: { [name: string]: string };
  setError: Function;
}

const Wrapper = styled.div`
  display: grid;
  align-items: flex-start;
  grid-template-columns: repeat(1fr);
  grid-template-rows: 8fr;
  gap: 1.5em 1.5em;
  margin-bottom: 2em;
  justify-content: center;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.medium}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Panel: FC<PanelProps> = ({
  content = [],
  setError,
  workspaceLogos = {},
}) => (
  <Wrapper>
    {content.map((v) => (
      <Card
        key={v.name}
        content={v}
        workspaceLogo={workspaceLogos[v.communicationPlatform]}
        setError={setError}
      />
    ))}
  </Wrapper>
);

export default Panel;
