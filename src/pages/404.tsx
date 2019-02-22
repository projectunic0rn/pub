import { Link } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';

import { Container, Layout, PageTitle, Seo } from '@components';
import styled from '@styled-components';

const Text = styled.p`
  text-align: center;
  line-height: 1.6;

  a {
    color: ${({ theme }) => theme.colors.base};
  }
`;

const NotFoundPage: React.FunctionComponent = () => (
  <Layout>
    <Seo title="Page not found" />
    <Helmet>
      <title>404 | Page Not Found</title>
      <meta name="description" content="Page not found" />
    </Helmet>

    <Container>
      <PageTitle>Page Not Found</PageTitle>

      <Text>
        Please return <Link to="/">home</Link> or use the menu to navigate to a
        different page.
      </Text>
    </Container>
  </Layout>
);

export default NotFoundPage;
