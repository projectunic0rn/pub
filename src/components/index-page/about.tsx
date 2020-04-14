import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

import { useSiteMetadata } from '@hooks';
import { iconArrow, goodTeam, bgCurveDesktop, bgCurveMobile } from '@images';

const Wrapper = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.section};
  display: flex;
  margin-top: 12.5em;
  position: relative;
  padding: ${({ theme }) => theme.boxes.padding.section.medium};

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-direction: column;
  }

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }

  &:before {
    background-image: url("${bgCurveDesktop}");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    content: '';
    display: block;
    height: 7.125em;
    left: 0;
    position: absolute;
    top: -6.25em;
    width: 100%;

    @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
      background-image: url("${bgCurveMobile}");
      background-position: center;
      background-size: 150% 100%;
    }
  }
`;

const Text = styled.div`
  flex: 0 0 55%;
  order: 1;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    order: 2;
  }
`;

const Heading = styled.h2``;

const SubText = styled.p`
  font-size: 1.1em;
  line-height: 1.5;
  margin: 1.5625em 0;
  text-align: start;
  width: 80%;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  align-items: center;
  background: none;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.alternate};
  display: inline-flex;
  font-size: 1.1em;
  padding: 0.625em 0;
  text-decoration: none;

  &,
  &:visited {
    color: ${({ theme }) => theme.colors.alternate};
  }
`;

const LinkImage = styled.img.attrs(() => ({ src: iconArrow, alt: '' }))`
  display: inline-block;
  height: 1.4375em;
  margin: 0;
  padding: 0 0 0 0.4em;
`;

const ImageWrapper = styled.figure`
  flex: 0 0 45%;
  order: 2;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-basis: 90%;
    margin-bottom: 6.25em;
    order: 1;
  }
`;

const Image = styled.img.attrs(() => ({ src: goodTeam, alt: '' }))`
  width: 100%;
`;

/** About section details more information about the web site. */
const About: FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Wrapper>
      <Text>
        <Heading>Create awesome stuff, together</Heading>

        <SubText>
          Never let location be an issue when finding someone to work with on a
          project. Project Unicorn has a cool community of developers excited
          about working together.
        </SubText>

        <SubText>
          Work with awesome people from all parts of the world. Share, inspire,
          and build your ideas!
        </SubText>

        <StyledLink to="/projects" title={`${siteMetadata.title} projects`}>
          See projects by members
          <LinkImage />
        </StyledLink>
      </Text>

      <ImageWrapper>
        <Image />
      </ImageWrapper>
    </Wrapper>
  );
};

export default About;
