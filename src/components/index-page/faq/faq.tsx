import * as React from 'react';

import Accordion from './accordion';
import { qas } from './qas';
import styled from '@styled-components';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1em;
  justify-content: center;
  min-height: 100vh;
  padding: 3.125em 0;
`;

const Heading = styled.h2`
  text-align: center;
  padding: 1em;
`;

const Faq: React.FC = () => (
  <Wrapper>
    <Heading>Frequently Asked Questions</Heading>
    <Accordion qas={qas} />
  </Wrapper>
);

export default Faq;
