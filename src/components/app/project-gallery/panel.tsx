import * as React from 'react';

import Card from './card';
import styled from '@styled-components';
import { Project } from '@/api/types/project';

interface PanelProps {
  content: Project[];
  setApiError: Function;
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Panel: React.FC<PanelProps> = ({ content = [], setApiError }) => (
  <Wrapper>
    {content.map((v) => (
      <Card key={v.name} content={v} setApiError={setApiError} />
    ))}
  </Wrapper>
);

export default Panel;
