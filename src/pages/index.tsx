import * as React from 'react';

import {
  SharedLayout,
  IndexPageHero,
  IndexPageAbout,
  IndexPageSignup,
} from '@components';

/** The website's landing page. */
const IndexPage: React.FC = () => (
  <SharedLayout>
    <IndexPageHero />
    <IndexPageAbout />
    <IndexPageSignup />
  </SharedLayout>
);

export default IndexPage;
