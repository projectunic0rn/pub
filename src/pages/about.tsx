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
            Project Unicorn is a virtual co-working space of software developers
            from around the world working together to create and deploy
            meaningful software.
          </p>
          <p>
            Our mission is to foster a community where creative individuals can
            collaborate together to build real world applications. By joining
            Project Unicorn we hope that we can help improve your technical,
            communication, management and leadership skills while working
            collaboratively with other members of the community. Project Unicorn
            encourages everyone regardless of skills or background to join our
            community and help build software they are passionate about with
            others.
          </p>
        </PageBody>
      </Container>
    </Layout>
  );
};
export default AboutPage;
