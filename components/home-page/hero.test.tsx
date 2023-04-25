import { screen, render } from "@testing-library/react";
import Hero from "./hero";

describe('Hero', () => { 
  test('displays a header with the name of the blog owner', () => {
    render(<Hero />);
    const header = screen.getByRole('heading');
    expect(header).toHaveTextContent(/cicero/i);
  });

  test('renders an image element with appropriate src', () => {
    render(<Hero />);
    const encodedUri = encodeURIComponent('/images/site/cicero.jpg');
    const expected = expect.stringContaining(encodedUri);
    const actual = screen.getByRole('img');

    expect(actual).toHaveAttribute('src', expected);
  });

  test('renders an image with appropriate alt text', () => {
    render(<Hero />);
    const actual = screen.getByRole('img');
    expect(actual).toHaveAttribute('alt', 'Cicero');
  });

  test('renders a blurb about the blog owner', () => {
    render(<Hero />);
    const expected = 'I am a Roman statesman and Philosopher. I "blog" about such topics here.'
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});