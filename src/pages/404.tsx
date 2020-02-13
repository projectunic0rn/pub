import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

import { Container, Layout, PageTitle, Seo } from '@components/shared';
import { notFound } from '@images';
import { useSiteMetadata } from '@hooks';

const Text = styled.p`
  text-align: center;
  line-height: 1.6;

  a {
    color: ${({ theme }) => theme.colors.base};
  }
`;

const Img = styled.img.attrs(() => ({ src: notFound, alt: '' }))`
  width: 100%;
  max-height: 100%;
`;

/** Displays a generic page for pages that are not found. */
const NotFoundPage: FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Seo title="Page not found" description="Page not found" />

      <Container>
        <PageTitle>Page Not Found</PageTitle>

        <Img />

        <Text>
          Please return{' '}
          <Link to="/" title={`${siteMetadata.title} home page`}>
            home
          </Link>{' '}
          or use the menu to navigate to a different page.
        </Text>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;
