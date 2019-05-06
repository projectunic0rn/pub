import * as React from 'react';

import { avatarTestimonial, iconQuotes } from '@images';
import styled from '@styled-components';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.baseinvert};
  border-radius: 0.375em;
  box-shadow: 0 0.875em 1.75em ${({ theme }) => theme.colors.shadow};
  margin: 3.125em 0;
  padding: 1.5625em;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    max-width: 25em;
    width: 95%;
  }
`;

const Icon = styled.img.attrs({ src: iconQuotes, alt: '' })`
  height: 0.9375em;
  margin: 0 0 0.9375em;
`;

const Title = styled.p`
  font-style: italic;
  line-height: 2;
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

const Avatar = styled.img.attrs({ src: avatarTestimonial, alt: '' })`
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

const TextName = styled.span`
  font-weight: 800;
`;

const TextDescription = styled.span`
  font-size: 0.9em;
`;

const Card: React.FC = () => (
  <Wrapper>
    <Icon />

    <Title>
      Project Unicorn gave me an opportunity to contribute to interesting
      projects.
    </Title>

    <Footer>
      <AvatarWrapper>
        <Avatar />
      </AvatarWrapper>

      <Text>
        <TextName>Rodger Jordas</TextName>
        <TextDescription>Software developer</TextDescription>
      </Text>
    </Footer>
  </Wrapper>
);

export default Card;
