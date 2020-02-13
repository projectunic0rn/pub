import React, { FC } from 'react';
import styled from 'styled-components';

interface CardProps {
  i: number;
}

const Wrapper = styled.div`
  background: hsla(0, 100%, 100%, 0.65);
  border-radius: 0.375em;
  flex: 1;
  padding: 0;
  margin: 0 auto 1em;
  max-width: 25em;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    width: 95%;
    padding: 1.5625em;
  }
`;

const Inner = styled.div`
  min-height: 250px;
  max-height: 250px;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 0.3125em;
`;

const Preview = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Card: FC<CardProps> = ({ i }) => (
  <Wrapper>
    <Inner>
      <Preview src={`//picsum.photos/300?random=${i}`} alt="" />
    </Inner>
  </Wrapper>
);

export default Card;
