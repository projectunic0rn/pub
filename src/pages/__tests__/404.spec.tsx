import { render } from '@testing-library/react';
import React from 'react';

import NotFoundPage from '../404';

test('contains a link to go to home page', () => {
  const { getByText } = render(<NotFoundPage />);
  const link = getByText(/home/i);

  expect(link).toHaveAttribute('href', '/');
  expect(link).toHaveAttribute('title', 'Project Unicorn home page');
});
