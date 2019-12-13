import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navigation from '../navigation';
import SignInPage from '../../../pages/signin';
import * as Gatsby from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles';

const navLinks = [
  {
    content: 'Blog',
    href: '/blog',
    title: `Project Unicorn blog`,
    requiresAuthentication: false,
    link: true,
  },
  {
    content: 'Blog',
    href: '/blog',
    title: `Project Unicorn blog`,
    requiresAuthentication: true,
    link: true,
  },
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

beforeEach(() => {
  /*
   ** "useStaticQuery" is mock data used for the <SignInPage> component.
   ** Inside the <SignInPage> component, it performs a graphql query that we need to mock or else the test will run with errors because there
   ** would be missing data.
   */
  const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
  useStaticQuery.mockImplementation(() => ({
    site: {
      siteMetadata: {
        title: 'Project Unicorn',
        tag: 'Build something awesome.',
        description:
          'Project Unicorn is a virtual co-working space of software developers around the world working together to create and deploy meaningful software.',
        siteUrl: 'https://projectunicorn.net',
        appUrl: 'https://projectunicorn.dev',
        social: {
          facebook: '',
          instagram: 'projectunicorn1',
          twitter: '@projectunicorn2',
          linkedin: 'proj-unicorn',
          reddit: 'projectUnicorn',
          github: 'projectunic0rn',
          slackInvite:
            '//join.slack.com/t/project-unic0rn/shared_invite/enQtNjM5MzkwMjE2Mzg5LTNkOWVkNDQ0NTE3NWE1MmYzYjg5YjhiZTE1NTU0MTc3NzdmNmI3YTE5ZjZhYjgzNTA0ZDUyZjFmOTJlNTg5MGQ',
        },
      },
    },
    file: {
      childImageSharp: {
        fluid: {
          src:
            '/static/dd9805a2c5ae79d6e0d37cabb592517b/fb184/default-post-image.jpg',
          srcSet:
            '/static/dd9805a2c5ae79d6e0d37cabb592517b/f709c/default-post-image.jpg 450w,\n/static/dd9805a2c5ae79d6e0d37cabb592517b/2b1a3/default-post-image.jpg 900w,\n/static/dd9805a2c5ae79d6e0d37cabb592517b/fb184/default-post-image.jpg 1800w,\n/static/dd9805a2c5ae79d6e0d37cabb592517b/b4a0b/default-post-image.jpg 2700w,\n/static/dd9805a2c5ae79d6e0d37cabb592517b/2a223/default-post-image.jpg 3600w,\n/static/dd9805a2c5ae79d6e0d37cabb592517b/e6902/default-post-image.jpg 4692w',
        },
      },
    },
  }));
});

describe('Navigation Bar', () => {
  test('Blog link is being rendered', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Navigation navLinks={navLinks} />
      </ThemeProvider>,
    );

    expect(getByTestId('Blog')).toHaveAttribute('href', '/blog');
  });

  test('Projects link is being rendered', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Navigation navLinks={navLinks} />
      </ThemeProvider>,
    );

    expect(getByTestId('Projects')).toHaveAttribute('href', '/app/projects');
  });

  test('Sign Out button is being rendered when user is authenticated', async () => {
    /*
     ** RUNNING OUR TESTS
     ** We will begin to write our tests in the code below
     */

    /*
    1. ARRANGE

    ** I am mounting the component that we want to test.
    ** I am using React-Testing-Library's query selectors (getByTestId, getByPlaceholderText, debug) to select our DOM elements.
    */

    const { getByTestId, getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <SignInPage location={{ state: { message: 'HELLO!' } }} />
      </ThemeProvider>,
    );

    // I am selecting the DOM elements that will be required to test our component
    const emailInput = getByPlaceholderText('unicorn@projectunicorn.net');
    const passwordInput = getByPlaceholderText('Your Password');
    const submitBtn = getByTestId('submit');
    const errorMessage = getByTestId('error-message');

    expect(getByTestId('signin')).toBeInTheDocument();

    /*
    2. ACT

    **  I am simulating onChange and onClick event handlers on the sign in form.
    */

    fireEvent.change(emailInput, {
      target: { value: 'rickywid123@hotmail.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'unicornUED7A0' },
    });

    fireEvent.click(submitBtn);

    /*
     **  We wait for the DOM to update with the Sign Out button. If the Sign Out button fails to render, the test will exit with errors.
     **  Once the Sign Out button has been rendered we can continue on with our testing.
     */
    await waitForElement(() => getByTestId('signout'));

    /*
    3. ASSERT

    **  We are executing our assertions.
    */

    expect(errorMessage).not.toBeInTheDocument();
    expect(getByTestId('signout')).toBeInTheDocument();
  });

  test('Sign In button is being rendered when user is not authenticated', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <SignInPage location={{ state: { message: 'HELLO!' } }} />
      </ThemeProvider>,
    );

    expect(getByTestId('signin')).toBeInTheDocument();
  });
});

/*
https://jestjs.io/docs
https://github.com/testing-library/jest-dom
https://github.com/testing-library/react-testing-library
*/
