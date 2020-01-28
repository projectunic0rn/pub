import { render } from '@testing-library/react';
import React from 'react';

import NotFoundPage from '../404';
import { defaultPostImage, siteMetadata } from './fixtures';
import {
  useDefaultPostImage,
  useSiteMetadata,
  SiteMetadata,
  DefaultPostImage,
} from '@hooks';

jest.mock('@hooks');

test('contains a link to go to home page', () => {
  (useDefaultPostImage as jest.Mock<DefaultPostImage>).mockImplementation(
    () => defaultPostImage,
  );
  (useSiteMetadata as jest.Mock<SiteMetadata>).mockImplementation(
    () => siteMetadata,
  );

  const { getByText } = render(<NotFoundPage />);
  const link = getByText(/home/i);

  expect(link).toHaveAttribute('href', '/');
  expect(link).toHaveAttribute('title', 'Awesome Project home page');
});
