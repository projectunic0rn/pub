import * as React from 'react';

import CtaButton from './cta-button';
import { connectedWorld } from '@images';
import { useSiteMetadata } from '@hooks';
import styled from 'styled-components';

const Wrapper = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.boxes.padding.section.medium};

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-direction: column;
  }

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

const Text = styled.div`
  flex: 0 0 45%;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    order: 2;
    text-align: center;
  }
`;

const Heading = styled.h2`
  font-size: 2.3em;
  line-height: 1.3;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    font-size: 1.7em;
  }
`;

const SubHeading = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
  padding: 1.875em 0;
  text-align: start;
`;

const FormWrapper = styled.div``;

const ImageWrapper = styled.figure`
  flex: 0 0 45%;
  margin: 0;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    max-width: 25em;
    order: 1;
    width: 90%;
  }
`;

const Image = styled.img.attrs(() => ({ src: connectedWorld, alt: '' }))`
  width: 100%;
`;

/** Hero contains the web site's tag line and a call-to-action button. */
const Hero: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Wrapper>
      <Text>
        <Heading>{siteMetadata.tag}</Heading>
        <SubHeading>{siteMetadata.description}</SubHeading>

        <FormWrapper>
          <CtaButton content="Sign Up" href="/signup" target="" />
        </FormWrapper>
      </Text>

      <ImageWrapper>
        <Image />
      </ImageWrapper>
    </Wrapper>
  );
};

export default Hero;
