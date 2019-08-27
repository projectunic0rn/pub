import * as React from 'react';

import {
  Container,
  Layout,
  PageTitle,
  PageBody,
  Seo,
} from '@components/shared';
import { useSiteMetadata } from '@hooks';

/** Displays the Contact page for the website. */
const ContactPage: React.FC = () => {
  const siteMetadata = useSiteMetadata();
  console.log(siteMetadata);
  return (
    <Layout>
      <Seo
        title={`${siteMetadata.title} - Contact Us`}
        description={`Contact page for ${siteMetadata.title} website`}
        urlSlug="contact/"
      />

      <Container>
        <PageTitle>Contact Us</PageTitle>
        <PageBody>
          <p>
            If you have any questions or would like to share any feedback, write
            us an email at
            <a href="mailto:projectunicorn10@gmail.com">
              projectunicorn10@gmail.com
            </a>
            .
          </p>
        </PageBody>
      </Container>
    </Layout>
  );
};
export default ContactPage;
