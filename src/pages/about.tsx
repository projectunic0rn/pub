import React, { FC } from 'react';

import {
  Container,
  Layout,
  PageTitle,
  PageBody,
  Seo,
} from '@components/shared';
import { useSiteMetadata } from '@hooks';

/** Displays the About page for the website. */
const AboutPage: FC = () => {
  const siteMetadata = useSiteMetadata();
  return (
    <Layout>
      <Seo
        title={`${siteMetadata.title} - About Us`}
        description={`About Us page for ${siteMetadata.title} website`}
        urlSlug="about/"
      />

      <Container>
        <PageTitle>About Us</PageTitle>
        <PageBody>
          <p>
            Project Unicorn is a community where developers come together to
            collaborate on software.
          </p>
          <p>
            Our mission is to foster a community where creative individuals can
            collaborate and build real world software. By joining Project
            Unicorn we hope that we can help improve your technical,
            communication, management and leadership skills while working
            collaboratively with other developers. We encourage everyone
            regardless of skills or background to join and help build software
            they are excited about.
          </p>
        </PageBody>
      </Container>
    </Layout>
  );
};
export default AboutPage;
