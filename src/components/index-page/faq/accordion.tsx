import * as React from 'react';

import Panel from './panel';
import { Qa } from './qa';
import styled from '@styled-components';

interface AccordionProps {
  qas: readonly Qa[];
}

const Wrapper = styled.div`
  max-width: 30em;
  width: 100%;
`;

const Accordion: React.FC<AccordionProps> = ({ qas }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const activateTab = (index: number) => () =>
    setActiveTab(activeTab === index ? -1 : index);

  return (
    <Wrapper role="tablist">
      {qas.map((qa, index) => (
        <Panel
          key={index}
          activeTab={activeTab}
          index={index}
          {...qa}
          activateTab={activateTab(index)}
        />
      ))}
    </Wrapper>
  );
};

export default Accordion;
