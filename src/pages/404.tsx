import { Link } from 'gatsby';
import * as React from 'react';

import { Container, Layout, PageTitle, Seo } from '@components';
import styled from '@styled-components';

const Text = styled.p`
  text-align: center;
  line-height: 1.6;

  a {
    color: ${({ theme }) => theme.colors.base};
  }
`;

const NotFoundPage: React.FC = () => (
  <Layout>
    <Seo title="Page not found" description="Page not found" />

    <Container>
      <PageTitle>Page Not Found</PageTitle>

      <Text>
        Please return{' '}
        <Link to="/" title="Project Unicorn home page">
          home
        </Link>{' '}
        or use the menu to navigate to a different page.
      </Text>
    </Container>
  </Layout>
);

export default NotFoundPage;
