import * as React from 'react';

import Card from './card';
import styled from 'styled-components';
import { Project } from '@/api/types/project';
import { ApiService } from '@/api/api-service';
import { MockApiService } from '@/mocks/mock-api-service';

interface PanelProps {
  content: Project[];
  setMessage: Function;
  api: ApiService | MockApiService;
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Panel: React.FC<PanelProps> = ({ content = [], setMessage, api }) => (
  <Wrapper>
    {content.map((v) => (
      <Card key={v.name} content={v} setMessage={setMessage} api={api} />
    ))}
  </Wrapper>
);

export default Panel;
