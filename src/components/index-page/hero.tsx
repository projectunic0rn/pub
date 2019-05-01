import * as React from 'react';

import CtaButton from './cta-button';
import { connectedWorld } from '@images';
import styled from '@styled-components';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4.6875em 3.4375em;

  @media screen and (max-width: 975px) {
    flex-direction: column;
  }

  @media screen and (max-width: 41.6875em) {
    padding: 45px 25px;
  }
`;

const HeroText = styled.div`
  flex: 0 0 45%;

  @media screen and (max-width: 975px) {
    order: 2;
    text-align: center;
  }
`;

const HeroHeading = styled.h1`
  line-height: 1.3;
  font-size: 2.3em;

  @media screen and (max-width: 41.6875em) {
    font-size: 1.7em;
  }
`;

const HeroSubheading = styled.p`
  padding: 30px 0;
  font-size: 1.2em;
  line-height: 1.5;
`;
const HeroFormWrapper = styled.div``;

const HeroImageWrapper = styled.figure`
  flex: 0 0 45%;
  margin: 0;

  @media screen and (max-width: 975px) {
    order: 1;
    max-width: 400px;
    width: 90%;
  }
`;

const HeroImage = styled.img.attrs({ src: connectedWorld, alt: '' })`
  width: 100%;
`;

const Hero: React.FC = () => (
  <Wrapper>
    <HeroText>
      <HeroHeading>No more website clones, todo or weather apps.</HeroHeading>

      <HeroSubheading>
        Project Unicorn is an online community of software developers around the
        world working together to create and deploy meaningful applications.
      </HeroSubheading>

      <HeroFormWrapper>
        <CtaButton />
      </HeroFormWrapper>
    </HeroText>

    <HeroImageWrapper>
      <HeroImage />
    </HeroImageWrapper>
  </Wrapper>
);

export default Hero;
