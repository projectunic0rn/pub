import * as React from 'react';
import { Link } from 'gatsby';

import { Anchor, SocialIcon } from '@components';
import { useSiteMetadata } from '@hooks';
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

/** Displays information about the website. */
const Footer: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Wrapper>
      <Inner>
        <Row>
          <Heading>{siteMetadata.title}</Heading>
          <p>{siteMetadata.description}</p>
        </Row>

        <Row>
          <Heading>About</Heading>

          <List>
            <StyledLink to="/sitemap" title={`${siteMetadata.title} sitemap`}>
              Sitemap
            </StyledLink>

            <StyledLink
              to="/contact"
              title={`${siteMetadata.title} contact page`}
            >
              Contact Us
            </StyledLink>

            <StyledLink
              to="/terms"
              title={`${siteMetadata.title} terms and conditions`}
            >
              Terms and Conditions
            </StyledLink>

            <StyledLink
              to="/privacy"
              title={`${siteMetadata.title} privacy policy`}
            >
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
              href={`//github.com/${siteMetadata.social.github}/pub`}
              content="Pub"
              title={`${siteMetadata.title} blog repository`}
            />
          </List>
        </Row>

        <Row>
          <Heading>Follow us</Heading>

          <List direction="row">
            <SocialIcon
              link
              socialName="facebook"
              href={`//facebook.com/${siteMetadata.social.facebook}`}
              title={`Follow ${siteMetadata.title} on Facebook`}
            />

            <SocialIcon
              link
              socialName="instagram"
              href={`//www.instagram.com/${siteMetadata.social.instagram}`}
              title={`Follow ${siteMetadata.title} on Instagram`}
            />

            <SocialIcon
              link
              socialName="twitter"
              href={`//twitter.com/${siteMetadata.social.twitter}`}
              title={`Follow ${siteMetadata.title} on Twitter`}
            />

            <SocialIcon
              link
              socialName="linkedin"
              href={`//www.linkedin.com/company/${
                siteMetadata.social.linkedin
              }/about`}
              title={`Follow ${siteMetadata.title} on LinkedIn`}
            />

            <SocialIcon
              link
              socialName="reddit"
              href={`//www.reddit.com/r/${siteMetadata.social.reddit}`}
              title={`Follow ${siteMetadata.title} on Reddit`}
            />

            <SocialIcon
              link
              socialName="github"
              href={`//github.com/${siteMetadata.social.github}`}
              title={`Follow ${siteMetadata.title} on GitHub`}
            />
          </List>
        </Row>
      </Inner>

      <BottomText>
        <StyledAnchor
          href={`//github.com/${siteMetadata.social.github}/pub`}
          content="pub"
          title={`${siteMetadata.title} blog repository`}
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
};
export default Footer;
