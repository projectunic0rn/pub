import * as React from 'react';

import styled from '@styled-components';

interface CardProps {
  i: number;
}

const Wrapper = styled.div`
  background: hsla(0, 100%, 100%, 0.65);
  border-radius: 0.375em;
  flex: 1;
  padding: 1.5625em;
  margin: 0 auto 1em;
  max-width: 25em;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    width: 95%;
  }

  img {
    border-radius: 0.3125em;
    margin: 0 auto;
    max-width: 100%;
    min-height: 300px;
  }
`;

const Card: React.FC<CardProps> = ({ i }) => (
  <Wrapper>
    <img src={`//picsum.photos/300?random=${i}`} alt="" />
  </Wrapper>
);

export default Card;
