import * as React from 'react';

import Panel from './panel';
import { content, Data } from './content';
import styled from '@styled-components';

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.boxes.padding.section.smallTop};
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

const ProjectGallery: React.FC = () => {
  const [projects, setProjects] = React.useState<Data[]>([]);

  React.useEffect(() => {
    async function fetchMockContent() {
      const response = await content;

      setProjects(response);
    }

    fetchMockContent();
  }, []);

  return (
    <Wrapper>
      <Panel content={projects} />
    </Wrapper>
  );
};

export default ProjectGallery;
