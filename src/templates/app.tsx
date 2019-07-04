import * as React from 'react';

import { NavigationLink } from '@components/shared/navigation';
import { Container, Layout, Seo } from '@components/shared';

const App: React.FC = () => {
  const navLinks: NavigationLink[] = [
    {
      content: 'Login',
      external: false,
      href: '/login',
      title: 'Member login',
    },
  ];

  return (
    <Layout navLinks={navLinks}>
      <Seo title="Projects" />

      <Container />
    </Layout>
  );
};

export default App;
