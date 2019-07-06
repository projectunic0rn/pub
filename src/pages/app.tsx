import * as React from 'react';

import { Layout, Seo, Container } from '@components/shared';
import styled from '@styled-components';

const Heading = styled.h2`
  margin: 0;
  text-align: left;
`;

const App: React.FC = () => (
  <Layout>
    <Seo title="App" urlSlug="app/" />
    <Container>
      <Heading>Projects of the week</Heading>
    </Container>
  </Layout>
);

export default App;
