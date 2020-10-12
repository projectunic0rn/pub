import { render } from '@testing-library/react';
import React from 'react';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';
import OauthPage from '../oauth';

function renderWithRouter(
  ui: JSX.Element,
  { route = '/', history = createHistory(createMemorySource(route)) } = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

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

test('flags invalid code param and show message', async () => {
  const { container } = renderWithRouter(<OauthPage />, {
    route: '/oauth/?state=1',
  });
  expect(container.innerHTML).toMatch(/Invalid code param/i);
});

test('flags invalid state and show message', async () => {
  const { container } = renderWithRouter(<OauthPage />, {
    route: '/oauth/?state=1&code=1',
  });
  expect(container.innerHTML).toMatch(/Invalid stored state/i);
});

test('permissions and guild id are assigned', async () => {
  const { container } = renderWithRouter(<OauthPage />, {
    route: '/oauth/?state=1&code=1&permissions=1&guild_id=1',
  });
  expect(container.innerHTML).toMatch(/Invalid stored state/i);
});
