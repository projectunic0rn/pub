import * as React from 'react';

import { Anchor } from '@components';
import { connectedWorld } from '@images';
import { useSiteMetadata } from '@hooks';
import styled from '@styled-components';

const Hero = styled.header`
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

const CtaButton = styled(Anchor)`
  font-weight: 700;
  padding: 15px 45px;
  border: 1px solid #5f8ddc;
  border-radius: 5px;

  @media screen and (max-width: 41.6875em) {
    display: block;
    width: 90%;
    margin: 0 auto;
  }

  background: #5f8ddc;
  color: #fff;
`;

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

const HeroV2: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Hero>
      <HeroText>
        <HeroHeading>No more website clones, todo or weather apps.</HeroHeading>

        <HeroSubheading>
          Project Unicorn is an online community of software developers around
          the world working together to create and deploy meaningful
          applications.
        </HeroSubheading>

        <HeroFormWrapper>
          <CtaButton
            href={`${siteMetadata.social.slackInvite}`}
            content="Join Slack"
            title={`${siteMetadata.title} Slack invite link`}
          />
        </HeroFormWrapper>
      </HeroText>

      <HeroImageWrapper>
        <HeroImage />
      </HeroImageWrapper>
    </Hero>
  );
};

export default HeroV2;
