import { render } from '@testing-library/react';
import React from 'react';
import { LocationProvider } from '@reach/router';

import OauthPage from '../oauth';

test('contains app installation message', () => {
  const { getByText } = render(
    <LocationProvider>
      <OauthPage />
    </LocationProvider>,
  );
  const message = getByText(/Finishing app install/i);

  expect(message).toBeVisible();
  expect(message).toBeInTheDocument();
});
