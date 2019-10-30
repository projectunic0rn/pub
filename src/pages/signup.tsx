import * as React from 'react';
import { Layout, Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { SignUpForm } from '../components/shared/form';

const SignUpPage: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Seo
        title={`Sign Up`}
        description={`Sign Up Page For ${siteMetadata.title}`}
        urlSlug="signup/"
      />
      <SignUpForm />
    </Layout>
  );
};

export default SignUpPage;
