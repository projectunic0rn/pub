import * as React from 'react';

import { Data } from './content';
import Card from './card';
import styled from '@styled-components';

interface PanelProps {
  content: Data[];
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Panel: React.FC<PanelProps> = ({ content = [] }) => (
  <Wrapper>
    {content.map((v) => (
      <Card key={v.name} content={v} />
    ))}
  </Wrapper>
);

export default Panel;
