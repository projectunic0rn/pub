import * as React from 'react';
import { Layout, Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { SignInForm } from '../components/shared/form';

interface SignInPageProps {
  path?: string;
  location: {
    state: {
      message: string;
    };
  };
}

const SignInPage: React.FC<SignInPageProps> = ({ location }) => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Seo
        title={`Sign In`}
        description={`Sign In Page For ${siteMetadata.title}`}
        urlSlug="signin/"
      />
      <SignInForm location={location} />
    </Layout>
  );
};

export default SignInPage;
