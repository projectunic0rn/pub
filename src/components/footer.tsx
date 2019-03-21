import * as React from 'react';
import { Link } from 'gatsby';

import styled, { css } from '@styled-components';
import facebook from '@images/facebook.svg';
import instagram from '@images/instagram.svg';
import twitter from '@images/twitter.svg';
import reddit from '@images/reddit.svg';
import linkedin from '@images/linkedin.svg';
import github from '@images/github.svg';

interface RowProps {
  flex?: number;
}

interface ListProps {
  direction?: 'column' | 'row';
}

interface SocialIconProps {
  icon: string;
  href: string;
}

const Wrapper = styled.div`
  background-color: #5f8ddc;
  color: hsla(0, 0%, 100%, 0.5);
  font-size: 0.8em;
  padding-bottom: 1em;
`;

const Inner = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 0 1.5em;

  @media screen and (min-width: 35em) {
    flex-direction: row;
  }
`;

const Row = styled.div<RowProps>`
  flex: ${({ flex = 1 }) => flex};
`;

const Heading = styled.h1`
  color: white;
  font-size: 1.1em;
`;

const List = styled.div.attrs({ role: 'list' })<ListProps>`
  display: flex;
  flex-direction: ${({ direction = 'column' }) => direction};
`;

const anchorStyles = css`
  color: hsla(0, 0%, 100%, 0.5);
  text-decoration: none;
  background-image: none;

  &:hover {
    color: white;
    cursor: pointer;
  }

  &:visited {
    color: hsla(0, 0%, 100%, 0.5);
  }
`;

const StyledAnchor = styled.a.attrs({
  role: 'listitem',
  rel: 'nofollow noopener noreferrer',
  target: '_blank',
})`
  ${anchorStyles};
`;

const StyledLink = styled(Link)`
  ${anchorStyles}
`;

const SocialIconImage = styled.img.attrs({ alt: '' })`
  width: 28px;
`;

const SocialIconLink = styled(StyledAnchor)`
  margin-right: 0.6em;

  &:last-child {
    margin-right: 0;
  }
`;

const BottomText = styled.div`
  text-align: center;
  padding-top: 4em;
`;

const SocialIcon: React.FunctionComponent<SocialIconProps> = ({
  icon,
  href,
}) => (
  <SocialIconLink href={href}>
    <SocialIconImage src={icon} />
  </SocialIconLink>
);

const Footer: React.FunctionComponent = () => (
  <Wrapper>
    <Inner>
      <Row>
        <Heading>Project Unicorn</Heading>

        <p>
          Project Unicorn is an online community that is focused on learning by
          building and shipping meaningful software.
        </p>
      </Row>

      <Row>
        <Heading>About</Heading>

        <List>
          <StyledLink to="/sitemap">Sitemap</StyledLink>
          <StyledLink to="/contact">Contact Us</StyledLink>
          <StyledLink to="/terms">Terms and Conditions</StyledLink>
          <StyledLink to="/privacy">Privacy Policy</StyledLink>
        </List>
      </Row>

      <Row>
        <Heading>Projects</Heading>

        <List>
          <StyledAnchor href="//www.mentrship.com/">Mentrship</StyledAnchor>

          <StyledAnchor href="//github.com/projectunic0rn/pub">
            Pub
          </StyledAnchor>
        </List>
      </Row>

      <Row>
        <Heading>Follow us</Heading>

        <List direction="row">
          <SocialIcon icon={facebook} href="//facebook.com/" />

          <SocialIcon
            icon={instagram}
            href="//www.instagram.com/projectunicornonthegram"
          />

          <SocialIcon icon={twitter} href="//twitter.com/ProjectUnicorn2" />

          <SocialIcon
            icon={linkedin}
            href="//www.linkedin.com/company/proj-unicorn/about"
          />

          <SocialIcon icon={reddit} href="//www.reddit.com/r/projectUnicorn" />
          <SocialIcon icon={github} href="//github.com/projectunic0rn" />
        </List>
      </Row>
    </Inner>

    <BottomText>
      <StyledAnchor href="//github.com/projectunic0rn/pub">pub</StyledAnchor> is
      maintained by{' '}
      <StyledAnchor href="//github.com/rmjordas">@rmjordas</StyledAnchor>
    </BottomText>
  </Wrapper>
);

export default Footer;
