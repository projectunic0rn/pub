import { Link, navigate } from 'gatsby';
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
import { Button } from '@components/app/shared';
import ServiceResolver from '@/api/service-resolver';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import { SessionStorageHelper } from '@/helpers';
import { JwtToken } from '@/api/types/jwt-token';
import { MockAuthService } from '@/mocks/mock-auth-service';
import { AuthService } from '@/api/auth-service';
import { theme } from '@styles';

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

interface SignInPageProps {
  location: {
    state: {
      message: string;
    };
  };
}

const SignInPage: React.FC<SignInPageProps> = ({ location }) => {
  const siteMetadata = useSiteMetadata();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  let auth: MockAuthService | AuthService;

  React.useEffect(() => {
    auth = new ServiceResolver().AuthResolver();

    if (location.state !== null) {
      setMessage(location.state.message);
    }
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setMessage('Invalid email/password');
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
          navigate('/app/projects');
          SessionStorageHelper.storeJwt(response.data as JwtToken);
        } else {
          setMessage((response.data as ErrorResponse).message);
        }
      } catch (err) {
        console.log(err);

        setMessage('Invalid email/password');
      }

      setIsSigningIn(false);
    }
  };

  return (
    <Layout>
      <Seo
        title={`Sign In`}
        description={`Sign In page for ${siteMetadata.title} website`}
        urlSlug="signin/"
      />
      <Wrapper>
        <Form
          heading={`Sign In To ${siteMetadata.title}`}
          handleSubmit={handleSubmit}
        >
          {message && <Error>{message}</Error>}
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            name="email"
            type="email"
            placeholder="unicorn@projectunicorn.net"
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormLabel htmlFor="password">Confirm Password</FormLabel>
          <FormInput
            name="password"
            type="password"
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
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
    </Layout>
  );
};

export default SignInPage;
