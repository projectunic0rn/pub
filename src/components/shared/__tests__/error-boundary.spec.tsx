import React, { FC } from 'react';
import { render } from '@testing-library/react';

import ErrorBoundary from '../error-boundary';
import { noop } from '@utils';

const ErrorComponent: FC = () => <div>Oh noes!</div>;

const ThrowError = () => {
  throw new Error('test/error-code');
};

test('renders children if there are no exceptions', () => {
  const { getByText, queryByText } = render(
    <ErrorBoundary onError={jest.fn()} component={<ErrorComponent />}>
      yey!
    </ErrorBoundary>,
  );

  expect(getByText(/yey/i)).toBeInTheDocument();
  expect(queryByText(/oh noes/i)).toBeNull();
});

test('renders the error component when exceptions are caught', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(noop);
  const onErrorSpy = jest.fn(noop);

  const { getByText, queryByText } = render(
    <ErrorBoundary onError={onErrorSpy} component={<ErrorComponent />}>
      <ThrowError />
      yey!
    </ErrorBoundary>,
  );

  expect(getByText(/oh noes/i)).toBeInTheDocument();
  expect(queryByText(/yey/i)).toBeNull();
  expect(onErrorSpy).toHaveBeenCalledTimes(1);

  consoleErrorSpy.mockRestore();
});
