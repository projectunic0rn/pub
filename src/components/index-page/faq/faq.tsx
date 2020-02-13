import React, { FC } from 'react';
import styled from 'styled-components';

import Accordion from './accordion';
import { qas } from './qas';

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

const Faq: FC = () => (
  <Wrapper>
    <Heading>Frequently Asked Questions</Heading>
    <Accordion qas={qas} />
  </Wrapper>
);

export default Faq;
