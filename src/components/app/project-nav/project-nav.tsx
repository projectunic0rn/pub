import * as React from 'react';

import Tabs from './tabs';
import Panel from './panel';
import { content, Content } from './content';
import styled from '@styled-components';

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.boxes.padding.section.medium};
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

const ProjectNav: React.FC = () => {
  const [state, setState] = React.useState<Content>({});
  const [activeTab, setActiveTab] = React.useState(0);

  React.useEffect(() => {
    async function mockFetchContent() {
      const response = await content;

      setState(response);
    }

    mockFetchContent();
  }, []);

  const tabTitles = Object.keys(state);
  const handleTabOnClick = (title: number) => () => setActiveTab(title);

  return (
    <Wrapper>
      <Tabs
        tabTitles={tabTitles}
        activeTab={activeTab}
        handleTabOnClick={handleTabOnClick}
      />
      <Panel content={state[tabTitles[activeTab]]} />
    </Wrapper>
  );
};

export default ProjectNav;
