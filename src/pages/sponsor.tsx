import React, { FC } from 'react';

import {
  Container,
  Layout,
  PageTitle,
  PageBody,
  Seo,
} from '@components/shared';
import { useSiteMetadata } from '@hooks';

/** Displays the Sponsors page for the website. */
const SponsorPage: FC = () => {
  const siteMetadata = useSiteMetadata();
  return (
    <Layout>
      <Seo
        title={`${siteMetadata.title} - Sponsor`}
        description={`Sponsor page for ${siteMetadata.title} website`}
        urlSlug="sponsor/"
      />

      <Container>
        <PageTitle>Sponsor</PageTitle>
        <PageBody>
          <p>
            Hundreds of software engineers use Project Unicorn to meet and
            collaborate with like-minded developers who are interested in
            building meaningful software. We&apos;re a community of
            practitioners that build applications from idea to production with
            many of the developers experienced in working across the stack,
            developing for various platforms, and deploying to multiple cloud
            environments.
          </p>
          <p>
            If you would like to reach engineers with your product/service or
            hiring opportunity get in touch with me directly at&nbsp;
            <a href={`mailto:${siteMetadata.contactEmail}`}>
              {siteMetadata.contactEmail}
            </a>
            . Sponsorships are one of the ways Project Unicorn helps support
            operational costs while providing value to engineers with highly
            relevant opportunities.
          </p>
        </PageBody>
      </Container>
    </Layout>
  );
};
export default SponsorPage;
