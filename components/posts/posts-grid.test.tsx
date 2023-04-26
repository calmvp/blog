import { screen, render } from '@testing-library/react';
import PostsGrid from './posts-grid';
import { Post } from './post'

describe('PostGrid', () => {
  const testPosts = [
    {
      excerpt: 'my first test exceprt',
      title: 'test title 1',
      date: '',
      image:'test1img.jpg',
      slug: 'test1-slug'
    },
    {
      excerpt: 'my second test exceprt',
      title: 'test title 2',
      date: '',
      image:'test2img.jpg',
      slug: 'test2-slug'
    },
    {
      excerpt: 'my third test exceprt',
      title: 'test title 3',
      date: '',
      image:'test3img.jpg',
      slug: 'test3-slug'
    }
  ]
  test('renders post title for each element in posts', () => {
    render(<PostsGrid posts={testPosts} />);
    const actualTitles = screen.getAllByRole('heading');

    expect(actualTitles.length).toEqual(testPosts.length);
    testPosts.forEach((tp) => {
      const actualTitle = screen.getByRole('heading', { name: tp.title });
      expect(actualTitle).toBeInTheDocument();
    });
  });

  test('renders post exceprt for each element in posts', () => {
    render(<PostsGrid posts={testPosts} />);

    testPosts.forEach((tp) => {
      const excerpt = screen.getByText(tp.excerpt);
      expect(excerpt).toBeInTheDocument();
    });
  });
});