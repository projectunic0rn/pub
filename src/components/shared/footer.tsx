import { Link } from 'gatsby';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import styled, { css } from 'styled-components';

import { Anchor } from '@components/shared';
import { Button } from '@components/shared/buttons';
import {
  puAlt,
  instagramIcon,
  twitterIcon,
  linkedinIcon,
  githubIcon,
} from '@images';
import { useSiteMetadata } from '@hooks';

const Wrapper = styled.footer`
  background: ${({ theme }) => theme.colors.base};
  color: ${({ theme }) => theme.colors.baseinvert};
  padding: ${({ theme }) => theme.boxes.padding.section.small};

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.medium}) {
    display: flex;
    padding: ${({ theme }) => theme.boxes.padding.section.medium};
  }
`;

const Col = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 25%;
  flex-direction: column;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    align-items: flex-start;
    margin-bottom: 1.25em;
  }
`;

const Logo = styled.img.attrs(() => ({ src: puAlt, alt: 'Project Unicorn' }))`
  align-self: flex-start;
  margin: 0;
  margin-bottom: 2em;
  width: 8em;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    min-width: 8em;
    width: 70%;
  }
`;

const Text = styled.p`
  margin-bottom: 0.9375em;
  width: 100%;
`;

const List = styled.ul`
  margin: 0;
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.9375em;
`;

const SocialWrapper = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    margin: 1.5625em auto 0 auto;
  }
`;

const IconWrapper = styled.span`
  display: inline-block;
  height: 2.7em;
  line-height: 2.7em;
  margin: 0 0.625em;
  text-align: center;
  width: 2em;
`;

const SocialIcon = styled.img.attrs(() => ({ alt: '' }))`
  margin: 0;
  width: 25px;
  height: 25px;
`;

const anchorStyles = css`
  background: none;
  color: ${({ theme }) => theme.colors.baseinvert};
  transition: 0.15s;

  &:visited {
    color: ${({ theme }) => theme.colors.baseinvert};
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.highlightLight};
    }
  }
`;

const StyledLink = styled(Link)`
  ${anchorStyles};
`;

const StyledAnchor = styled(Anchor)`
  ${anchorStyles};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    width: 100%;
  }
`;

const FormLabel = styled.label``;
const FormInput = styled.input`
  margin-bottom: 1rem;
`;

const AppVersion = styled.div`
  align-self: flex-end;
`;

/** Footer displays information about the web site. */
const Footer: FC = () => {
  const siteMetadata = useSiteMetadata();
  const [email, setEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const formResponse = formMsg ? (
    <div dangerouslySetInnerHTML={{ __html: formMsg }} />
  ) : (
    ''
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addToMailchimp(email).then((data) => {
      setFormMsg(data.msg);
      setEmail('');
    });
  };

  return (
    <Wrapper>
      <Col>
        <Logo />
        <Text>{siteMetadata.description}</Text>
      </Col>

      <Col>
        <List>
          <ListItem>
            <StyledLink to="/about" title={`${siteMetadata.title} about page`}>
              About Us
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink
              to="/sponsor"
              title={`${siteMetadata.title} sponsor page`}
            >
              Sponsor
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/blog" title={`${siteMetadata.title} blog`}>
              Blog
            </StyledLink>
          </ListItem>
        </List>
      </Col>

      <Col>
        <List>
          <ListItem>
            <StyledLink
              to="/contact"
              title={`${siteMetadata.title} contact page`}
            >
              Contact us
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink
              to="/terms"
              title={`${siteMetadata.title} terms and conditions`}
            >
              Terms
            </StyledLink>
          </ListItem>

          <ListItem>
            <StyledLink
              to="/privacy"
              title={`${siteMetadata.title} privacy policy`}
            >
              Privacy
            </StyledLink>
          </ListItem>
        </List>
      </Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <FormLabel htmlFor="email-mailing-list">
            Connect with like-minded developers, and discover new projects right
            from your inbox
          </FormLabel>
          <FormInput
            id="email-mailing-list"
            type="text"
            onChange={handleInputChange}
            value={email}
          />
          <Button>Subscribe</Button>
          {formResponse}
        </Form>
        <SocialWrapper>
          <IconWrapper>
            <StyledAnchor
              href={`//www.instagram.com/${siteMetadata.social.instagram}`}
              title={`Follow ${siteMetadata.title} on Instagram`}
            >
              <SocialIcon src={instagramIcon} />

              <span className="visually-hidden">
                {`Follow ${siteMetadata.title} on Instagram`}
              </span>
            </StyledAnchor>
          </IconWrapper>

          <IconWrapper>
            <StyledAnchor
              href={`//twitter.com/${siteMetadata.social.twitter}`}
              title={`Follow ${siteMetadata.title} on Twitter`}
            >
              <SocialIcon src={twitterIcon} />
            </StyledAnchor>
          </IconWrapper>

          <IconWrapper>
            <StyledAnchor
              href={`//www.linkedin.com/company/${siteMetadata.social.linkedin}/about`}
              title={`Follow ${siteMetadata.title} on LinkedIn`}
            >
              <SocialIcon src={linkedinIcon} />
            </StyledAnchor>
          </IconWrapper>

          <IconWrapper>
            <StyledAnchor
              href={`//github.com/${siteMetadata.social.github}`}
              title={`Follow ${siteMetadata.title} on GitHub`}
            >
              <SocialIcon src={githubIcon} />
            </StyledAnchor>
          </IconWrapper>
        </SocialWrapper>
        <AppVersion>v{siteMetadata.version}</AppVersion>
      </Col>
    </Wrapper>
  );
};

export default Footer;
