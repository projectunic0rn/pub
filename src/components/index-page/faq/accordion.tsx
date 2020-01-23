import React, { FC, useState } from 'react';
import styled from 'styled-components';

import Panel from './panel';
import { Qa } from './qas';

interface AccordionProps {
  qas: readonly Qa[];
}

const Wrapper = styled.div`
  max-width: 30em;
  width: 100%;
`;

const Accordion: FC<AccordionProps> = ({ qas }) => {
  const [activeTab, setActiveTab] = useState(0);

  const activateTab = (index: number) => () =>
    setActiveTab(activeTab === index ? -1 : index);

  return (
    <Wrapper role="tablist">
      {qas.map((v, i) => (
        <Panel
          key={i}
          activeTab={activeTab}
          index={i}
          qa={v}
          activateTab={activateTab(i)}
        />
      ))}
    </Wrapper>
  );
};

export default Accordion;
