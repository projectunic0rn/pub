import * as React from 'react';

import { Content } from './content';
import { defaultAvatarImage } from '@images';
import styled from '@styled-components';

type CardProps = Content;

const Quote = styled.p`
  font-style: italic;
  line-height: 1.7;
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

const Avatar = styled.img.attrs({ alt: '' })`
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

const Card: React.FC<CardProps> = ({ author, avatar, quote, title }) => (
  <React.Fragment>
    <Quote>{quote}</Quote>

    <Footer>
      <AvatarWrapper>
        <Avatar src={avatar || defaultAvatarImage} />
      </AvatarWrapper>

      <Text>
        <Author>{author}</Author>
        <Title>{title}</Title>
      </Text>
    </Footer>
  </React.Fragment>
);

export default Card;
