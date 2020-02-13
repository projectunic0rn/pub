import React, { FC } from 'react';

import {
  Container,
  Layout,
  PageTitle,
  PageBody,
  Seo,
} from '@components/shared';
import { useSiteMetadata } from '@hooks';

/** Displays the Terms and Conditions pages for the website. */
const TermsPage: FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Seo
        title="Terms and Conditions"
        description={`Terms and condition page for the ${siteMetadata.title} website`}
        urlSlug="terms/"
      />

      <Container>
        <PageTitle>Terms and Conditions</PageTitle>

        <PageBody>
          <p>
            All content provided on this website is for informational purposes
            only. The owner of this blog makes no representations as to the
            accuracy or completeness of any information on this site or found by
            following any link on this site. The owner will not be liable for
            any errors or omissions in this information nor for the availability
            of this information. The owner will not be liable for any losses,
            injuries, or damages from the display or use of this information.
            These terms and conditions of use are subject to change at any time
            and without notice.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have any questions about this terms and conditions, please
            contact us at{' '}
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

export default TermsPage;
