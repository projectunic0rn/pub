import React, { FC } from 'react';

import { Layout, Seo } from '@components/shared';
import { SignUpForm } from '@components/shared/form';
import { useSiteMetadata } from '@hooks';
import { UserAuthHelper } from '@helpers';

const SignUpPage: FC = () => {
  const siteMetadata = useSiteMetadata();
  const redirected = UserAuthHelper.redirectIfAuthenticated('/');
  if (redirected) {
    return null;
  }
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
