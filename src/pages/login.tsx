import { Link } from 'gatsby';
import * as React from 'react';

import styled from '@styled-components';
import { Layout, Seo } from '@components/shared';
import CtaButton from '@components/index-page/cta-button';
import { useSiteMetadata } from '@hooks';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.section};

  padding: ${({ theme }) => theme.boxes.padding.section.medium};

  @media screen and(max-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-direction: column;
  }

  @media screen and(max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

const Heading = styled.h2``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-weight: 800;
  padding: 0.825em 0;
`;

const FormInput = styled.input`
  max-width: 400px;
  padding: 0.425em;
`;

const LinkWrapper = styled.div`
  margin: 0.625em 0.125em;
  display: flex;
  flex-direction: column;
  max-width: fit-content;
`;

const ButtonWrapper = styled.div`
  padding: 1.825em 0.125em;
`;

/** Displays the Login page for the website. */
const LoginPage: React.FC = () => {
  const siteMetadata = useSiteMetadata();
  console.log(siteMetadata);

  return (
    <Layout>
      <Seo
        title={`${siteMetadata.title} - Login`}
        description={`Login page for ${siteMetadata.title} website`}
        urlSlug="login/"
      />

      <Wrapper>
        <Heading>Sign In to Project Unicorn</Heading>
        <Form>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            id="email"
            type="text"
            placeholder="unicorn@projectunicorn.net"
          />

          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            id="password"
            type="password"
            placeholder="Your Password"
          />

          <LinkWrapper>
            <Link to="/forgotpassword/">Forgot password?</Link>
          </LinkWrapper>

          <LinkWrapper>
            <Link to="/register/">New member? Sign Up!</Link>
          </LinkWrapper>

          <ButtonWrapper>
            <CtaButton title="" href="" type="input" content="Sign In" />
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default LoginPage;
