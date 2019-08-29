import { Link } from 'gatsby';
import * as React from 'react';

import styled from '@styled-components';
import { Layout, Seo } from '@components/shared';
import CtaButton from '@components/index-page/cta-button';
import { useSiteMetadata } from '@hooks';
import Form, {
  FormLabel,
  FormInput,
  LinkWrapper,
  ButtonWrapper,
} from '@components/shared/form';
import { useState } from 'react';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.section};

  padding: ${({ theme }) => theme.boxes.padding.section.smallTop};

  @media screen and(max-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-direction: column;
  }

  @media screen and(max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

const SignUpPage: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <Layout>
      <Seo
        title={`Sign Up`}
        description={`Sign Up page for ${siteMetadata.title} website`}
        urlSlug="signup/"
      />
      <Wrapper>
        <Form heading="Sign Up For An Account">
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            name="email"
            type="email"
            placeholder="unicorn@projectunicorn.net"
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormLabel htmlFor="username">Username</FormLabel>
          <FormInput
            name="username"
            type="text"
            placeholder="unicorn21"
            onChange={(e) => setUsername(e.target.value)}
          />

          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            name="password1"
            type="password"
            placeholder="Your Password"
            onChange={(e) => setPassword1(e.target.value)}
          />

          <FormLabel htmlFor="password">Confirm Password</FormLabel>
          <FormInput
            name="password2"
            type="password"
            placeholder="Confirm Your Password"
            onChange={(e) => setPassword2(e.target.value)}
          />

          <LinkWrapper>
            <Link to="/signin">Sign In</Link>
          </LinkWrapper>

          <ButtonWrapper>
            <CtaButton
              title="Sign Up"
              href=""
              type="input"
              content="Sign Up"
              onClick={(e) => e.preventDefault()}
            />
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default SignUpPage;
