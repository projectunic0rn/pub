import { Link } from 'gatsby';
import * as React from 'react';

import { Anchor } from '@components';
import {
  puAlt,
  instagramIcon,
  twitterIcon,
  linkedinIcon,
  githubIcon,
} from '@images';
import { useSiteMetadata } from '@hooks';
import styled, { css } from '@styled-components';

const Wrapper = styled.footer`
  background: #121212;
  color: #fff;
  padding: 75px 55px;

  @media screen and (min-width: 975px) {
    display: flex;
  }
`;

const FooterCol = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  flex: 0 0 25%;

  @media screen and (max-width: 975px) {
    align-items: flex-start;
    margin-bottom: 20px;
  }
`;

const FooterLogo = styled.img.attrs({ src: puAlt, alt: 'Project Unicorn' })`
  width: 8em;
  margin: 0;
  margin-bottom: 32px;
  align-self: flex-start;

  path {
    fill: #fff;
  }

  @media screen and (max-width: 41.6875em) {
    height: 2.1875em;
    width: 100%;
    height: initial;
  }
`;

const FooterP = styled.p`
  align-self: flex-start;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const FooterList = styled.ul`
  margin: 0;
`;

const FooterListItem = styled.li`
  list-style: none;
  margin-bottom: 15px;
`;

const FooterSocialWrapper = styled.div`
  @media screen and (max-width: 975px) {
    margin: 25px auto 0 auto;
  }
`;

const FooterIconWrapper = styled.span`
  display: inline-block;
  height: 45px;
  width: 45px;
  line-height: 45px;
  text-align: center;
  border-radius: 50%;
  /* border: 1px solid #fff; */
  margin: 0 10px;
`;

const SocialIcon = styled.img.attrs({ alt: '' })`
  margin: 0;
`;

const anchorStyles = css`
  color: #fff;
  background: none;

  &:visited {
    color: #fff;
  }
`;

const StyledLink = styled(Link)`
  ${anchorStyles};
`;

const StyledAnchor = styled(Anchor)`
  ${anchorStyles};
`;

const Footer: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Wrapper>
      <FooterCol>
        <FooterLogo />

        <FooterP>{siteMetadata.description}</FooterP>
      </FooterCol>

      <FooterCol>
        <FooterList>
          <FooterListItem>
            <StyledLink to="/about">About Us</StyledLink>
          </FooterListItem>

          <FooterListItem>
            <StyledLink to="/jobs">Jobs</StyledLink>
          </FooterListItem>

          <FooterListItem>
            <StyledLink to="/press">Press</StyledLink>
          </FooterListItem>

          <FooterListItem>
            <StyledLink to="/blog">Blog</StyledLink>
          </FooterListItem>
        </FooterList>
      </FooterCol>

      <FooterCol>
        <FooterList>
          <FooterListItem>
            <StyledLink to="/contact">Contact us</StyledLink>
          </FooterListItem>

          <FooterListItem>
            <StyledLink to="/terms">Terms</StyledLink>
          </FooterListItem>

          <FooterListItem>
            <StyledLink to="/privacy">Privacy</StyledLink>
          </FooterListItem>
        </FooterList>
      </FooterCol>

      <FooterCol>
        <FooterSocialWrapper>
          <FooterIconWrapper>
            <StyledAnchor
              href={`//www.instagram.com/${siteMetadata.social.instagram}`}
              title={`Follow ${siteMetadata.title} on Instagram`}
            >
              <SocialIcon src={instagramIcon} />
            </StyledAnchor>
          </FooterIconWrapper>

          <FooterIconWrapper>
            <StyledAnchor
              href={`//twitter.com/${siteMetadata.social.twitter}`}
              title={`Follow ${siteMetadata.title} on Twitter`}
            >
              <SocialIcon src={twitterIcon} />
            </StyledAnchor>
          </FooterIconWrapper>

          <FooterIconWrapper>
            <StyledAnchor
              href={`//www.linkedin.com/company/${
                siteMetadata.social.linkedin
              }/about`}
              title={`Follow ${siteMetadata.title} on LinkedIn`}
            >
              <SocialIcon src={linkedinIcon} />
            </StyledAnchor>
          </FooterIconWrapper>

          <FooterIconWrapper>
            <StyledAnchor
              href={`//github.com/${siteMetadata.social.github}`}
              title={`Follow ${siteMetadata.title} on GitHub`}
            >
              <SocialIcon src={githubIcon} />
            </StyledAnchor>
          </FooterIconWrapper>
        </FooterSocialWrapper>
      </FooterCol>
    </Wrapper>
  );
};

export default Footer;
