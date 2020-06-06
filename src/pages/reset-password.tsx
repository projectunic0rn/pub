import { useLocation } from '@reach/router';
import React, { FC } from 'react';

import { Layout, Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { ResetPasswordForm } from '@components/shared/form/reset-password';

const ResetPasswordPage: FC = () => {
  const siteMetadata = useSiteMetadata();
  const location = useLocation();
  return (
    <Layout>
      <Seo
        title={`${siteMetadata.title} - Reset Password`}
        description={`Reset Password page for ${siteMetadata.title} website`}
        urlSlug="reset-password/"
      />
      <ResetPasswordForm
        token={new URLSearchParams(location.search).get('token')}
      />
    </Layout>
  );
};
export default ResetPasswordPage;
