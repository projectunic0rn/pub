import * as React from 'react';

import { CardV2 } from '@components';
import { iconArrow, goodTeam, bgCurveDesktop, bgCurveMobile } from '@images';
import styled, { css } from '@styled-components';

const pStyles = css`
  font-size: 1.1em;
  margin: 25px 0;
`;

const About = styled.section`
  position: relative;
  padding: 75px 55px;
  display: flex;
  align-items: center;
  background-color: hsl(240, 64%, 98%);
  margin-top: 200px;

  @media screen and (max-width: 975px) {
    flex-direction: column;
  }

  @media screen and (max-width: 41.6875em) {
    padding: 45px 25px;
  }

  &:before {
    content: '';
    position: absolute;
    display: block;
    top: -100px;
    left: 0;
    height: 114px;
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("${bgCurveDesktop}");

    @media screen and (max-width: 41.6875em) {
      background-image: url("${bgCurveMobile}");
      background-position: center;
      background-size: 150% 100%;
    }
  }
`;

const AboutText = styled.div`
  flex: 0 0 55%;

  @media screen and (max-width: 975px) {
    order: 2;
  }
`;

const AboutHeading = styled.h1``;

const AboutP = styled.p`
  ${pStyles};
  width: 80%;
  line-height: 1.5;

  @media screen and (max-width: 41.6875em) {
    width: 100%;
  }
`;

const AboutLink = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 1.1em;
  padding: 10px 0;
  text-decoration: none;
  border-bottom: 1px solid hsl(170, 45%, 43%);
  background: none;

  &,
  &:visited {
    color: hsl(170, 45%, 43%);
  }
`;

const AboutLinkImage = styled.img.attrs({ src: iconArrow, alt: '' })`
  display: inline-block;
  height: 23px;
  padding: 0 0.4em;
  margin: 0;
`;

const AboutImageWrapper = styled.figure`
  flex: 0 0 45%;

  @media screen and (max-width: 975px) {
    order: 1;
    flex-basis: 90%;
    margin-bottom: 100px;
  }
`;

const AboutImage = styled.img.attrs({ src: goodTeam, alt: '' })`
  width: 100%;
`;

const AboutV2: React.FC = () => {
  return (
    <About>
      <AboutText>
        <AboutHeading>Create awesome stuff, together</AboutHeading>

        <AboutP>
          Never let location be an issue when finding someone to work with on a
          project. The Project Unicorn community has members that are ready to
          help.
        </AboutP>

        <AboutP>
          Work with awesome people on all parts of the world. Share, inspire,
          and build your ideas!
        </AboutP>

        <AboutLink href="//projectunicorn.dev/projects">
          See projects by members
          <AboutLinkImage />
        </AboutLink>

        <CardV2 />
      </AboutText>

      <AboutImageWrapper>
        <AboutImage />
      </AboutImageWrapper>
    </About>
  );
};

export default AboutV2;
