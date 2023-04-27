import { render, screen } from "@testing-library/react";
import PostContent from "./post-content";

describe('PostContent', () => {
  test('renders an article', () => {
    const post = {
      date: '',
      excerpt: '',
      title: '',
      image: '',
      slug: '',
      content: '',
      isFeatured: true
    };
    render(<PostContent post={post} />);
    const actual = screen.getByRole('article');
    expect(actual).toBeInTheDocument();
  });

  test.each([
    { content: '# mY FIRST POST', expected: 'mY FIRST POST' },
    { content: '# my Second Post', expected: 'my Second Post' },
    { content: '# ANOTHA ONE', expected: 'ANOTHA ONE' }
  ])('renders post content: $content', ({ content, expected }) => {
    const post = {
      date: '',
      excerpt: '',
      title: '',
      image: '',
      slug: '',
      content: content,
      isFeatured: true
    };
    render(<PostContent post={post} />);
    const actual = screen.getByText(expected);
    expect(actual).toBeInTheDocument();
  });

  test('renders title in header', () => {
    const post = {
      date: '',
      excerpt: '',
      title: 'My Post Title',
      image: '',
      slug: '',
      content: '',
      isFeatured: true
    };
    render(<PostContent post={post} />);
    const actualHeader = screen.getByRole('heading', { name: post.title});
    expect(actualHeader).toBeInTheDocument();
  });

  test.each([
    { image: 'test-image.png', title: 'Test post', slug: 'my-slug', expectedPath: '/images/posts/my-slug/test-image.png' },
    { image: "test2-image.png", title: 'test 2 image', slug: 'test-slug', expectedPath: `/images/posts/test-slug/test2-image.png` },
    { image: "my-img.png", title: 'my img', slug: 'this-slug', expectedPath: `/images/posts/this-slug/my-img.png` }
  ])('given image: $image, title: $title, slug: $slug, renders img with src of $expectedPath and alt of $title', ({ image, title, slug, expectedPath }) => {
    const post = {
      date: '',
      excerpt: '',
      title: title,
      image: image,
      slug: slug,
      content: '',
      isFeatured: true
    };
    render(<PostContent post={post} />);
    const expectedSrc = expect.stringContaining(encodeURIComponent(expectedPath));

    const actualImage = screen.getByRole('img');

    expect(actualImage).toHaveAttribute('src', expectedSrc);
    expect(actualImage).toHaveAttribute('alt', title);
  })
})