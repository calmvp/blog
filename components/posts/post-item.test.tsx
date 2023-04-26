import { render, screen } from '@testing-library/react';
import PostItem from './post-item';

describe('PostItem', () => {
  test.each([
    { title: 'My Post Title' }, 
    { title: 'Different Post Title'},
    { title: 'Third post Title' }
  ])('renders post title: $title', ( { title } ) => {
    const post = {
      excerpt: '',
      title: title,
      date: '',
      image:'',
      slug: ''
    };
    render(<PostItem post={ post }/>);
    const expectedTitle = screen.getByRole('heading', { name: title });
    expect(expectedTitle).toBeInTheDocument();
  });

  test.each([
    { excerpt: 'Sample excerpt' },
    { excerpt: 'Sample excerpt2' },
    { excerpt: 'Sample excerpt3' }
  ])('renders post excerpt: $excerpt', ( { excerpt }) => {
    const post = {
      excerpt: excerpt,
      title: '',
      date: '',
      image: '',
      slug: ''
    };

    render(<PostItem post={post}/>);
    const expectedExcerpt = screen.getByText(excerpt);
    expect(expectedExcerpt).toBeInTheDocument();
  });

  test.each([
    { date: 'april 4 2020', expected: 'April 4, 2020' },
    { date: '01/16/1995', expected: 'January 16, 1995' },
    { date: 'Februry 9, 2021',  expected: 'February 9, 2021'}
  ])('renders post date as: $expected', ( { date, expected } ) => {
    const post = {
      date: date,
      excerpt: '',
      title: '',
      image: '',
      slug: ''
    };

    render(<PostItem post={post} />);
    const expectedDate = screen.getByText(expected);
    expect(expectedDate).toBeInTheDocument();
  });

  test.each([
    { image: "test-image.png", title: 'test image', slug: 'my-slug', expectedPath: `/images/posts/my-slug/test-image.png` },
    { image: "test2-image.png", title: 'test 2 image', slug: 'test-slug', expectedPath: `/images/posts/test-slug/test2-image.png` },
    { image: "my-img.png", title: 'my img', slug: 'this-slug', expectedPath: `/images/posts/this-slug/my-img.png` }
  ])('renders image with src: $image and alt: $title', ({ image, title, expectedPath, slug }) => {
    const post = {
      date: '',
      excerpt: '',
      title: title,
      image: image,
      slug: slug
    }

    render(<PostItem post={post} />);
    const encodedUri = encodeURIComponent(expectedPath);
    const expectedSrc = expect.stringContaining(encodedUri);
    
    const actualImage = screen.getByRole('img');
    
    expect(actualImage).toHaveAttribute('src', expectedSrc);
    expect(actualImage).toHaveAttribute('alt', title);
  })
});
