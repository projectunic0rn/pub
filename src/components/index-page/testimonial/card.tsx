import React, { FC } from 'react';
import styled from 'styled-components';

import { Content } from './content';
import { defaultAvatarImage } from '../assets';

type CardProps = Content;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.baseinvert};
  border-radius: 0.375em;
  flex: 1;
  padding: 1.5625em;
  max-width: 25em;
  width: 100%;
  margin: 0 auto;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    width: 95%;
  }
`;

const Quote = styled.p`
  margin: 0 0 1.5em 0;
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 0.5em;
`;

const AvatarWrapper = styled.figure`
  margin: 0 1.125em 0 0.5625em;
`;

const Avatar = styled.img.attrs(() => ({ alt: '' }))`
  border-radius: 50%;
  display: block;
  height: 3.125em;
  margin: 0;
  width: 3.125em;
`;

const Text = styled.p`
  margin: 0;

  & span {
    display: block;
  }
`;

const Author = styled.span`
  font-weight: 800;
`;

const Title = styled.span`
  font-size: 0.9em;
`;

const Card: FC<CardProps> = ({
  author,
  avatar = defaultAvatarImage,
  quote,
  title,
}) => (
  <Wrapper>
    <Quote>{quote}</Quote>

    <Footer>
      <AvatarWrapper>
        <Avatar src={avatar} />
      </AvatarWrapper>

      <Text>
        <Author>{author}</Author>
        {title && <Title>{title}</Title>}
      </Text>
    </Footer>
  </Wrapper>
);

export default Card;
