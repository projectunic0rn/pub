import React, { FC } from 'react';
import styled from 'styled-components';

interface TabsProps {
  tabTitles: string[];
  activeTab: number;
  handleTabOnClick: (title: number) => (event: React.MouseEvent) => void;
}

const Wrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TabItem = styled.li`
  color: ${({ theme }) => theme.colors.text};
  display: inline-block;
  margin-left: 0;
  padding: 0.625em;
  border-bottom: 0.125em solid ${({ theme }) => theme.colors.secondary};
  font-weight: 800;
  transition: 0.2s;
  cursor: pointer;

  &.selected {
    color: ${({ theme }) => theme.colors.highlightDark};
    border-bottom: 0.125em solid ${({ theme }) => theme.colors.highlightDark};
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
      border-bottom: 0.125em solid ${({ theme }) => theme.colors.highlightLight};
    }
  }
`;

const Tabs: FC<TabsProps> = ({ tabTitles, activeTab, handleTabOnClick }) => {
  return (
    <Wrapper>
      {tabTitles.map((v, i) => (
        <TabItem
          key={v}
          className={i === activeTab ? 'selected' : ''}
          onClick={handleTabOnClick(i)}
        >
          {v}
        </TabItem>
      ))}
    </Wrapper>
  );
};

export default Tabs;
