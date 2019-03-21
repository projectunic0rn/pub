import * as React from 'react';
import { Link } from 'gatsby';

import { Anchor } from '@components';
import styled, { css } from '@styled-components';
import {
  facebookIcon,
  instagramIcon,
  twitterIcon,
  redditIcon,
  linkedinIcon,
  githubIcon,
} from '@images';

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

const StyledAnchor = styled(Anchor).attrs({ role: 'listitem' })`
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
          <StyledAnchor href="//www.mentrship.com/" content="Mentrship" />
          <StyledAnchor href="//github.com/projectunic0rn/pub" content="Pub" />
        </List>
      </Row>

      <Row>
        <Heading>Follow us</Heading>

        <List direction="row">
          <SocialIcon icon={facebookIcon} href="//facebook.com/" />

          <SocialIcon
            icon={instagramIcon}
            href="//www.instagram.com/projectunicornonthegram"
          />

          <SocialIcon icon={twitterIcon} href="//twitter.com/ProjectUnicorn2" />

          <SocialIcon
            icon={linkedinIcon}
            href="//www.linkedin.com/company/proj-unicorn/about"
          />

          <SocialIcon
            icon={redditIcon}
            href="//www.reddit.com/r/projectUnicorn"
          />

          <SocialIcon icon={githubIcon} href="//github.com/projectunic0rn" />
        </List>
      </Row>
    </Inner>

    <BottomText>
      <StyledAnchor href="//github.com/projectunic0rn/pub" content="pub" /> is
      maintained by{' '}
      <StyledAnchor href="//github.com/rmjordas" content="@rmjordas" />
    </BottomText>
  </Wrapper>
);

export default Footer;
