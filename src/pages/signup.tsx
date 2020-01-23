import React, { FC } from 'react';

import { Layout, Seo } from '@components/shared';
import { SignUpForm } from '@components/shared/form';
import { useSiteMetadata } from '@hooks';

const SignUpPage: FC = () => {
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
