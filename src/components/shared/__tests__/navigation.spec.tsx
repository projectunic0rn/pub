import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navigation from '../navigation';
import Header from '../header';
import { StaticQuery } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles';

test('Header', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>,
  );
  // Assertion
  expect(getByTestId('header')).toHaveTextContent('header');
  // --> Test will pass
});

const navLinks = [
  {
    content: 'Projects',
    href: '/app/projects',
    title: `Project Unicorn projects`,
    requiresAuthentication: false,
    link: true,
  },
  {
    content: 'Projects',
    href: '/app/projects',
    title: `Project Unicorn projects`,
    requiresAuthentication: true,
    link: true,
  },
  {
    content: 'Sign In',
    href: '/signin',
    title: `Project Unicorn signin`,
    requiresAuthentication: false,
    button: true,
  },
  {
    content: 'Start Project',
    href: '/app/projects/create',
    title: `Project Unicorn Start Project`,
    requiresAuthentication: true,
    button: true,
  },
];

test('Displays the correct title', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Navigation navLinks={navLinks} />
    </ThemeProvider>,
  );
  // Assertion
  expect(getByTestId('nav')).toBeInTheDocument();
  // --> Test will pass
});
