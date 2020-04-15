import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { Hero, About, Signup, Faq, Testimonial } from '@components/index-page';
import { Layout } from '@components/shared';
import { useSiteMetadata } from '@hooks';

/** The website's landing page. */
const IndexPage: FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Helmet title={siteMetadata.title} titleTemplate="" />
      <h1 className="visually-hidden">Welcome</h1>
      <Hero />
      <About />
      <Testimonial />
      <Faq />
      <Signup />
    </Layout>
  );
};

export default IndexPage;
