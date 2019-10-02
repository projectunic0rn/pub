import { Link } from 'gatsby';
import * as React from 'react';

import styled from '@styled-components';
import { Layout, Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import Form, {
  FormLabel,
  FormInput,
  LinkWrapper,
  ButtonWrapper,
} from '@components/shared/form';
import { useState } from 'react';
import ServiceResolver from '@/api/service-resolver';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import { Button } from '@components/app/shared';
import { JwtToken } from '@/api/types/jwt-token';
import { SessionStorageHelper } from '@/helpers';

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

const Error = styled.p`
  color: ${({ theme }) => theme.colors.alert.danger};
  margin-bottom: 0;
`;

const SignUpPage: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const auth = new ServiceResolver().AuthResolver();

    try {
      const locale =
        typeof window.navigator !== 'undefined'
          ? window.navigator.language
          : 'en';
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = (await auth.signUp({
        username,
        email,
        password,
        passwordConfirmation,
        locale,
        timezone,
      })) as ApiResponse<JwtToken | ErrorResponse>;

      if (response.ok) {
        // TODO: redirect
        SessionStorageHelper.storeJwt(response.data as JwtToken);
        setMessage('Signed Up');
      } else {
        setMessage((response.data as ErrorResponse).message);
      }
    } catch (err) {
      setMessage('Invalid email/password');
    }
  };

  return (
    <Layout>
      <Seo
        title={`Sign Up`}
        description={`Sign Up page for ${siteMetadata.title} website`}
        urlSlug="signup/"
      />
      <Wrapper>
        <Form heading={`Sign Up To Join ${siteMetadata.title}`}>
          {message && <Error>{message}</Error>}
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
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormLabel htmlFor="password">Confirm Password</FormLabel>
          <FormInput
            name="password2"
            type="password"
            placeholder="Confirm Your Password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />

          <LinkWrapper>
            <Link to="/signin">Sign In</Link>
          </LinkWrapper>

          <ButtonWrapper>
            <Button onClick={handleClick} active={false}>
              Sign Up
            </Button>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default SignUpPage;
