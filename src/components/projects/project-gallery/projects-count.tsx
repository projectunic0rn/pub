import React, { FC } from 'react';
import styled from 'styled-components';

const Header = styled.p`
  font-weight: bold;
`;

interface PanelProps {
  count: number;
}

const ProjectCount: FC<PanelProps> = ({ count }) => (
  <div> {count ? <Header>{count} projects found</Header> : ''}</div>
);

export default ProjectCount;
