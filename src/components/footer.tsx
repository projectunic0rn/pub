import * as React from 'react';
import { Link } from 'gatsby';

import { Anchor, SocialIcon } from '@components';
import styled, { css } from '@styled-components';

interface RowProps {
  flex?: number;
}

interface ListProps {
  direction?: 'column' | 'row';
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

const Heading = styled.h3`
  color: white;
  font-size: 1.1em;
`;

const List = styled.div<ListProps>`
  display: flex;
  flex-direction: ${({ direction = 'column' }) => direction};
  align-items: flex-start;
`;

const anchorStyles = css`
  color: hsla(0, 0%, 100%, 0.5);
  text-decoration: none;
  background-image: none;
  transition: 0.2s;
  min-height: 3em;

  &:hover {
    color: white;
    cursor: pointer;
  }

  &:visited {
    color: hsla(0, 0%, 100%, 0.5);
  }
  @media (min-width: ${({ theme }) => theme.responsive.small}) {
    min-height: initial;
  }
`;

const StyledAnchor = styled(Anchor)`
  ${anchorStyles};
`;

const StyledLink = styled(Link)`
  ${anchorStyles}
`;

const BottomText = styled.div`
  text-align: center;
  padding-top: 4em;
`;

const Footer: React.FC = () => (
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
          <StyledLink to="/sitemap" title="Project Unicorn sitemap">
            Sitemap
          </StyledLink>

          <StyledLink to="/contact" title="Project Unicorn contact page">
            Contact Us
          </StyledLink>

          <StyledLink to="/terms" title="Project Unicorn terms and conditions">
            Terms and Conditions
          </StyledLink>

          <StyledLink to="/privacy" title="Project Unicorn privacy policy">
            Privacy Policy
          </StyledLink>
        </List>
      </Row>

      <Row>
        <Heading>Projects</Heading>

        <List>
          <StyledAnchor
            href="//www.mentrship.com/"
            content="Mentrship"
            title="Mentrship project website"
          />

          <StyledAnchor
            href="//github.com/projectunic0rn/pub"
            content="Pub"
            title="Project Unicorn blog repository"
          />
        </List>
      </Row>

      <Row>
        <Heading>Follow us</Heading>

        <List direction="row">
          <SocialIcon
            link
            socialName="facebook"
            href="//facebook.com"
            title="Follow Project Unicorn on Facebook"
          />

          <SocialIcon
            link
            socialName="instagram"
            href="//www.instagram.com/projectunicorn1"
            title="Follow Project Unicorn on Instagram"
          />

          <SocialIcon
            link
            socialName="twitter"
            href="//twitter.com/ProjectUnicorn2"
            title="Follow Project Unicorn on Twitter"
          />

          <SocialIcon
            link
            socialName="linkedin"
            href="//www.linkedin.com/company/proj-unicorn/about"
            title="Follow Project Unicorn on LinkedIn"
          />

          <SocialIcon
            link
            socialName="reddit"
            href="//www.reddit.com/r/projectUnicorn"
            title="Follow Project Unicorn on Reddit"
          />

          <SocialIcon
            link
            socialName="github"
            href="//github.com/projectunic0rn"
            title="Follow Project Unicorn on GitHub"
          />
        </List>
      </Row>
    </Inner>

    <BottomText>
      <StyledAnchor
        href="//github.com/projectunic0rn/pub"
        content="pub"
        title="Project Unicorn blog repository"
      />{' '}
      is maintained by{' '}
      <StyledAnchor
        href="//github.com/rmjordas"
        content="@rmjordas"
        title="Rodger Jordas on GitHub"
      />
    </BottomText>
  </Wrapper>
);

export default Footer;
