import { FeedbackForm } from '@components/shared/form';
import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MockThemeProvider } from '@mocks';

describe('feedback form', () => {
  test('got feedback text should be present', async () => {
    // Arrange
    const { getByText } = render(
      <MockThemeProvider>
        <FeedbackForm />
      </MockThemeProvider>,
    );
    // Act
    const feedbackText = getByText('💡 Got feedback?');
    // Assert
    expect(feedbackText).toBeVisible();
    expect(feedbackText).toBeDefined();
  });

  test('got feedback element should be button', async () => {
    // Arrange
    const { getByRole } = render(
      <MockThemeProvider>
        <FeedbackForm />
      </MockThemeProvider>,
    );
    // Act
    const feedback = getByRole('button');
    // Assert
    expect(feedback).toBeDefined();
  });

  test('textarea with placeholder (Feedback about this page?) should be hidden before clicking button', async () => {
    // Arrange
    const { queryByPlaceholderText } = render(
      <MockThemeProvider>
        <FeedbackForm />
      </MockThemeProvider>,
    );
    // Act
    const feedbackTextArea = queryByPlaceholderText(
      'Feedback about this page?',
    );
    // Assert
    expect(feedbackTextArea).toBeNull();
  });

  test('textarea with placeholder (Feedback about this page?) should be visible after clicking button', async () => {
    // Arrange
    const { getByText, queryByPlaceholderText } = render(
      <MockThemeProvider>
        <FeedbackForm />
      </MockThemeProvider>,
    );
    // Act
    const feedbackByButton = getByText('💡 Got feedback?');
    fireEvent.click(feedbackByButton);
    const feedbackTextArea = queryByPlaceholderText(
      'Feedback about this page?',
    );
    // Assert
    expect(feedbackTextArea).toBeDefined();
  });

  test('user should be notified of succesful feedback submission', async () => {
    // Arrange
    const { getByText, queryByPlaceholderText } = render(
      <MockThemeProvider>
        <FeedbackForm />
      </MockThemeProvider>,
    );
    // Act
    const feedbackByButton = getByText('💡 Got feedback?');
    fireEvent.click(feedbackByButton);
    const feedbackTextArea = queryByPlaceholderText(
      'Feedback about this page?',
    );
    // Assert
    expect(feedbackTextArea).toBeDefined();
  });

  test('feedback submission api called succesfully on feedback submission', async () => {
    // Arrange
    const { getByText, getByPlaceholderText } = render(
      <MockThemeProvider>
        <FeedbackForm />
      </MockThemeProvider>,
    );
    // Act
    const feedbackByButton = getByText('💡 Got feedback?');
    fireEvent.click(feedbackByButton);
    const feedbackTextArea = getByPlaceholderText('Feedback about this page?');
    fireEvent.change(feedbackTextArea, { target: { value: 'test feedback' } });
    const sendFeedbackButton = getByText('Send');
    fireEvent.click(sendFeedbackButton);
    const banner = await waitFor(() => getByText('Feedback sent successfully'));

    // Assert
    expect(banner).toBeDefined();
  });
});
