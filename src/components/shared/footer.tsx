import * as React from 'react';

import {
  puAlt,
  instagramIcon,
  twitterIcon,
  linkedinIcon,
  githubIcon,
} from '@images';
import { useSiteMetadata } from '@hooks';
import styled from '@styled-components';

const Wrapper = styled.footer`
  background: #121212;
  color: #fff;
  padding: 75px 55px;
  display: flex;

  @media screen and (max-width: 975px) {
    flex-direction: column;
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
          <FooterListItem>About Us</FooterListItem>
          <FooterListItem>Jobs</FooterListItem>
          <FooterListItem>Press</FooterListItem>
          <FooterListItem>Blog</FooterListItem>
        </FooterList>
      </FooterCol>

      <FooterCol>
        <FooterList>
          <FooterListItem>Contact Us</FooterListItem>
          <FooterListItem>Terms</FooterListItem>
          <FooterListItem>Privacy</FooterListItem>
        </FooterList>
      </FooterCol>

      <FooterCol>
        <FooterSocialWrapper>
          <FooterIconWrapper>
            <img src={instagramIcon} alt="" style={{ margin: 0 }} />
          </FooterIconWrapper>

          <FooterIconWrapper>
            <img src={twitterIcon} alt="" style={{ margin: 0 }} />
          </FooterIconWrapper>

          <FooterIconWrapper>
            <img src={linkedinIcon} alt="" style={{ margin: 0 }} />
          </FooterIconWrapper>

          <FooterIconWrapper>
            <img src={githubIcon} alt="" style={{ margin: 0 }} />
          </FooterIconWrapper>
        </FooterSocialWrapper>
      </FooterCol>
    </Wrapper>
  );
};

export default Footer;
