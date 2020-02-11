import { render } from '@testing-library/react';
import React from 'react';

import Message, { MessageVariant } from '../message';
import { MockThemeProvider } from '@mocks';
import { theme } from '@styles';

test('should have correct style depending on variant', () => {
  const message = (variant?: MessageVariant) => (
    <MockThemeProvider>
      <Message variant={variant} value="My Message" />
    </MockThemeProvider>
  );

  const { getByText, rerender } = render(message());

  expect(getByText('My Message')).toHaveStyle(`color: ${theme.colors.base}`);

  rerender(message('error'));
  expect(getByText('My Message')).toHaveStyle(`color: red`);

  rerender(message('success'));
  expect(getByText('My Message')).toHaveStyle(`color: green`);
});
