import { render, screen } from "@testing-library/react";
import MainNavigation from "./main-navigation";
describe('MainNavigation', () => {
  test('it should render a link with href "/"', () => {
    render(<MainNavigation />)
    const actual = screen.getByRole('link', { name: /cicero's statecraft, philosophy, and towing/i });
    expect(actual).toHaveAttribute('href', '/');
  });

  test('it should render a link with href="/posts"', () => {
    render(<MainNavigation />)
    const actual = screen.getByRole('link', { name: /posts/i });
    expect(actual).toHaveAttribute('href', '/posts');
  });

  test('it should render a link with href="/contact"', () => {
    render(<MainNavigation />)
    const actual = screen.getByRole('link', { name: /contact/i });
    expect(actual).toHaveAttribute('href', '/contact');
  });
});