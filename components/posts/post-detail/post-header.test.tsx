import { screen, render } from "@testing-library/react";
import PostHeader from "./post-header";

describe('PostHeader', () => {
  test.each([
    { title: 'My Post Title' },
    { title: 'Another title' },
    { title: 'Whose title is this?' }
  ])('renders title header: $title', ({ title }) => {
    render(<PostHeader title={title} image='' />);
    const actualHeader = screen.getByRole('heading', { name: title });
    expect(actualHeader).toBeInTheDocument();
  });

  test.each([
    { image: '/test-image.jpg', title: 'Test post' },
    { image: '/my-pic.bmp', title: 'My Post' },
    { image: '/post-picture.jpg', title: 'This Post' }
  ])('renders image with src of $image and alt of $title', ({ image, title }) => {
    render(<PostHeader title={title} image={image} />);
    const expectedSrc = expect.stringContaining(encodeURIComponent(image));

    const actualImage = screen.getByRole('img');

    expect(actualImage).toHaveAttribute('src', expectedSrc);
    expect(actualImage).toHaveAttribute('alt', title);
  })
});