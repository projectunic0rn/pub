import * as React from 'react';

import { LayoutV2, HeroV2, AboutV2, SignupV2 } from '@components';

/** The website's landing page. */
const IndexPage: React.FC = () => (
  <LayoutV2>
    <HeroV2 />
    <AboutV2 />
    <SignupV2 />
  </LayoutV2>
);

export default IndexPage;
