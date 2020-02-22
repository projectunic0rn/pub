import { Link } from 'gatsby';
import React, { FC, Fragment } from 'react';
import styled from 'styled-components';

import { Container, PageTitle, Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';

const Text = styled.p`
  text-align: center;
  line-height: 1.6;

  a {
    color: ${({ theme }) => theme.colors.base};
  }
`;

const ErrorComponent: FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Fragment>
      <Seo
        title="Something bad happened"
        description="Something bad happened"
      />

      <Container>
        <PageTitle>Something bad happened</PageTitle>

        <Text>
          Please return{' '}
          <Link to="/" title={`${siteMetadata.title} home page`}>
            home
          </Link>{' '}
          or use the menu to navigate to a different page.
        </Text>
      </Container>
    </Fragment>
  );
};

export default ErrorComponent;
