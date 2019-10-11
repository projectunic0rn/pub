import * as React from 'react';

import Card from './card';
import styled from 'styled-components';
import { Project } from '@/api/types/project';

interface PanelProps {
  content: Project[];
  setMessage: Function;
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Panel: React.FC<PanelProps> = ({ content = [], setMessage }) => (
  <Wrapper>
    {content.map((v) => (
      <Card key={v.name} content={v} setMessage={setMessage} />
    ))}
  </Wrapper>
);

export default Panel;
