import { Link } from 'gatsby';
import * as React from 'react';

import styled from '@styled-components';
import { Layout, Seo } from '@components/shared';
import { Button } from '@components/app/shared';
import { useSiteMetadata } from '@hooks';
import Form, {
  FormLabel,
  FormInput,
  LinkWrapper,
  ButtonWrapper,
} from '@components/shared/form';
import { useState } from 'react';
import { AuthService } from '@/api/auth-service';

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

function handleClick() {
  const auth = new AuthService();
  const response = auth.login;
  console.log(response);
}

const SignInPage: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Layout>
      <Seo
        title={`Sign In`}
        description={`Sign In page for ${siteMetadata.title} website`}
        urlSlug="signin/"
      />
      <Wrapper>
        <Form heading={`Sign In To ${siteMetadata.title}`}>
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
            <Link to="/forgotpassword/">Forgot password?</Link>
          </LinkWrapper>

          <LinkWrapper>
            <Link to="/signup/">New member? Sign Up!</Link>
          </LinkWrapper>

          <ButtonWrapper>
            <Button onClick={handleClick} active={false}>
              Sign In
            </Button>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default SignInPage;
