import { Link, navigate } from 'gatsby';
import * as React from 'react';

import styled from 'styled-components';
import { useSiteMetadata } from '@hooks';
import {
  FormLabel,
  FormInput,
  LinkWrapper,
  ButtonWrapper,
} from '@components/shared/form/controls';
import { Form } from '@components/shared/form';
import { useState } from 'react';
import { Button } from '@components/app/shared';
import ServiceResolver from '@/api/service-resolver';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import { SessionStorageHelper } from '@/helpers';
import { JwtToken } from '@/api/types/jwt-token';

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

interface SignInFormProps {
  location: {
    state: {
      message: string;
    };
  };
}

export const SignInForm: React.FC<SignInFormProps> = ({ location }) => {
  const siteMetadata = useSiteMetadata();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  React.useEffect(() => {
    if (location.state !== null) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const auth = ServiceResolver.authResolver();

    if (email === '' || password === '') {
      setMessage('Invalid email or password');
      return;
    }

    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        const response = (await auth.signIn({
          email,
          password,
        })) as ApiResponse<JwtToken | ErrorResponse>;

        if (response.ok) {
          SessionStorageHelper.storeJwt(response.data as JwtToken);
          navigate('/app/projects/');
        } else {
          setMessage((response.data as ErrorResponse).message);
        }
      } catch (err) {
        setMessage('Invalid email or password');
      }

      setIsSigningIn(false);
    }
  };

  return (
    <Wrapper>
      <Form
        heading={`Sign In To ${siteMetadata.title}`}
        handleSubmit={handleSubmit}
      >
        {message && <Error>{message}</Error>}
        <FormLabel htmlFor="email-signin">Email</FormLabel>
        <FormInput
          name="email-signin"
          type="email"
          placeholder="unicorn@projectunicorn.net"
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage('');
          }}
        />

        <FormLabel htmlFor="password">Password</FormLabel>
        <FormInput
          name="password"
          type="password"
          placeholder="Your Password"
          onChange={(e) => {
            setPassword(e.target.value);
            setMessage('');
          }}
        />

        <LinkWrapper>
          <Link to="/signup/">New member? Sign Up!</Link>
        </LinkWrapper>

        <ButtonWrapper>
          <Button active={false} disabled={isSigningIn}>
            Sign In
          </Button>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};
