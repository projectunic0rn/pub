import React, { FC } from 'react';
import styled from 'styled-components';

import Card from './card';
import { Project } from '@api';

interface PanelProps {
  content: Project[];
  setError: Function;
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Panel: FC<PanelProps> = ({ content = [], setError }) => (
  <Wrapper>
    {content.map((v) => (
      <Card key={v.name} content={v} setError={setError} />
    ))}
  </Wrapper>
);

export default Panel;
