import * as React from 'react';

import { Data } from './content';
import CardPill from './card-pill';
import styled from '@styled-components';

interface CardProps {
  content: Data;
}

const Wrapper = styled.div`
  flex-grow: 1;
  width: 95%;
  background-color: ${({ theme }) => theme.colors.section};
  margin: 1em;
  border-radius: 0.3125em;
  padding: 1.5em;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    width: calc(33.3333% - 2em);
    max-width: calc(33.3333% - 2em);
  }
`;

const Inner = styled.div`
  height: 0;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 0.3125em;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    max-height: 200px;
    min-height: 200px;
    margin: 0 auto 1.5em;
  }
`;

const Preview = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Title = styled.h3`
  margin: 0 0 1em;
`;

const Description = styled.p`
  margin: 1em 0 0;
`;

const Card: React.FC<CardProps> = ({ content }) => (
  <Wrapper>
    <Inner>
      <Preview
        src={`//picsum.photos/300?random=${Math.ceil(Math.random() * 10)}`}
        alt=""
      />
    </Inner>
    <Title>{content.name}</Title>
    {content.tags.map((v) => (
      <CardPill key={v}>{v}</CardPill>
    ))}

    <Description>{content.description}</Description>
  </Wrapper>
);

export default Card;
