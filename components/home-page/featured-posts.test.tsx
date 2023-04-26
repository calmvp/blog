import { screen, render } from "@testing-library/react";
import FeaturedPosts from "./featured-posts";

describe('FeaturedPosts', () => {
  test('renders a "Featured Posts" header', () => {
    render(<FeaturedPosts />);
    const expected = screen.getByRole('heading', { name: /featured posts/i });
    expect(expected).toBeInTheDocument();
  })
})
