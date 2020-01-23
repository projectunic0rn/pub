import Img, { FluidObject, GatsbyImageProps } from 'gatsby-image';
import React, { FC } from 'react';
import styled from 'styled-components';

interface BgImgProps {
  /** A CSS `height` value. */
  height?: string;
  /** A CSS `object-fit` value. */
  fit?: string;
  /** A CSS `position` value. */
  position?: string;
}

interface HeroProps extends Pick<BgImgProps, 'height'> {
  /** Used by `gatsby-image` to display the properly-sized hero image. */
  fluid: FluidObject;
  /** Title of the blog post. */
  title: string;
}

const Wrapper = styled.section`
  position: relative;
  min-height: 300px;
`;

const BgImg = styled(Img)<BgImgProps & GatsbyImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  min-height: 300px;
  height: auto;

  @media (min-width: ${({ theme }) => theme.responsive.small}) {
    height: ${({ height }) => height || 'auto'};
  }

  & > img {
    object-fit: ${({ fit }) => fit || 'cover'} !important;
    object-position: ${({ position }) => position || '50% 50%'} !important;
  }

  &::before {
    content: '';
    background: rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
`;

const Title = styled.h1`
  font-size: 3em;
  text-transform: capitalize;
  font-weight: 600;
  position: absolute;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.width.maxCentered};
  padding: 0 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  margin-top: 0;
`;

/**
 * Displays the hero image as a background and the blog post title as the
 * foreground.
 */
const Hero: FC<HeroProps> = ({ height, fluid, title }) => (
  <Wrapper>
    <BgImg
      height={height}
      fluid={fluid}
      backgroundColor="#eeeeee"
      title={title}
      alt=""
    />
    <Title>{title}</Title>
  </Wrapper>
);

export default Hero;
