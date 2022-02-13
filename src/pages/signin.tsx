import React, { FC } from 'react';

import { SignInForm } from '@components/shared/form';
import { Layout, Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { UserAuthHelper } from '@helpers';

interface SignInPageProps {
  location: {
    state: {
      message: string;
    };
  };
}

const SignInPage: FC<SignInPageProps> = ({ location }) => {
  const siteMetadata = useSiteMetadata();
  const redirected = UserAuthHelper.redirectIfAuthenticated('/');
  if (redirected) {
    return null;
  }

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
