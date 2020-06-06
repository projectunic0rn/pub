import React, { FC } from 'react';

import { Layout, Seo } from '@components/shared';
import { ForgotPasswordForm } from '@components/shared/form';
import { useSiteMetadata } from '@hooks';

const ForgotPasswordPage: FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Seo
        title="Forgot Password"
        description={`Forgot Password Page For ${siteMetadata.title}`}
        urlSlug="forgot-password/"
      />
      <ForgotPasswordForm />
    </Layout>
  );
};

export default ForgotPasswordPage;
