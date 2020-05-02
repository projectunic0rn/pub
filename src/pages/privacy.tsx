import React, { FC } from 'react';

import {
  Container,
  Layout,
  PageTitle,
  PageBody,
  Seo,
} from '@components/shared';
import { useSiteMetadata } from '@hooks';

/** Displays the Privacy Policy pages for the website. */
const PrivacyPage: FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Seo
        title="Privacy Policy"
        description={`Privacy Policy for the ${siteMetadata.title} website`}
        urlSlug="privacy/"
      />

      <Container>
        <PageTitle>Privacy Policy</PageTitle>
        <PageBody>
          <p>
            We do not share personal information with third-parties nor do we
            store information we collect about your visit to this web site for
            use other than to analyze content performance through the use of
            cookies, which you can turn off at any time by modifying your
            Internet browser&apos;s settings. We are not responsible for the
            republishing of the content found on this web site on other web
            sites or media without our permission. This privacy policy is
            subject to change without notice.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have any questions about this policy, please contact us at{' '}
            <a href={`mailto:${siteMetadata.contactEmail}`}>
              {siteMetadata.contactEmail}
            </a>
            .
          </p>
        </PageBody>
      </Container>
    </Layout>
  );
};
export default PrivacyPage;
