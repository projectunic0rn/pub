import { Link } from 'gatsby';
import * as React from 'react';

import { Container, Layout, PageTitle, Seo } from '@components';
import { useSiteMetadata } from '@hooks';
import styled from '@styled-components';

const Text = styled.p`
  text-align: center;
  line-height: 1.6;

  a {
    color: ${({ theme }) => theme.colors.base};
  }
`;

/** Displays a generic page for pages that are not found. */
const NotFoundPage: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Seo title="Page not found" description="Page not found" />

      <Container>
        <PageTitle>Page Not Found</PageTitle>

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
