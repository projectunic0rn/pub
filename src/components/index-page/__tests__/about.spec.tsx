import { render } from '@testing-library/react';
import React from 'react';

import About from '../about';
import { MockThemeProvider } from '@mocks';

test('shows a link to projects page', () => {
  const { getByText } = render(
    <MockThemeProvider>
      <About />
    </MockThemeProvider>,
  );

  const link = getByText(/see projects by members/i);

  expect(link).toHaveAttribute('href', '/projects');
});
