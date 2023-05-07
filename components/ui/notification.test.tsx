import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Notification from './notification';

describe('Notification component', () => {

  it('renders with correct title, message, and success status', () => {
    const title = 'Success!';
    const message = 'This is a success message.';
    const status = 'success';

    const { getByText } = render(
      <Notification title={title} message={message} status={status} />
    );

    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();

    const messageElement = getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  it('renders with correct title, message, and error status', () => {
    const title = 'Error!';
    const message = 'This is an error message.';
    const status = 'error';

    const { getByText } = render(
      <Notification title={title} message={message} status={status} />
    );

    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();

    const messageElement = getByText(message);
    expect(messageElement).toBeInTheDocument();
  });
});