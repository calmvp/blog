import { screen, render, within } from "@testing-library/react";
import AllPosts from "./all-posts";

describe('All Posts', () => {
  test('renders an "All Posts" header', () => {
    render(<AllPosts posts={[]} />);
    const expected = screen.getByRole('heading', { name: /all posts/i });
    expect(expected).toBeInTheDocument();
  });

  describe('renders a post grid', () => {
    const testPosts = [
      {
        excerpt: 'my first test exceprt',
        title: 'test title 1',
        date: '',
        image:'test1img.jpg',
        slug: 'test1-slug',
        isFeatured: true
      },
      {
        excerpt: 'my second test exceprt',
        title: 'test title 2',
        date: '',
        image:'test2img.jpg',
        slug: 'test2-slug',
        isFeatured: true
      },
      {
        excerpt: 'my third test exceprt',
        title: 'test title 3',
        date: '',
        image:'test3img.jpg',
        slug: 'test3-slug',
        isFeatured: true
      }
    ]
    test('renders post title for each element in posts', () => {
      render(<AllPosts posts={testPosts} />);
      const grid = document.getElementById('all-posts-grid');
      
      const actualTitles = within(grid!).getAllByRole('heading');
  
      expect(actualTitles.length).toEqual(testPosts.length);
      testPosts.forEach((tp) => {
        const actualTitle = within(grid!).getByRole('heading', { name: tp.title });
        expect(actualTitle).toBeInTheDocument();
      });
    });
  
    test('renders post exceprt for each element in posts', () => {
      render(<AllPosts posts={testPosts} />);
      const grid = document.getElementById('all-posts-grid');

      testPosts.forEach((tp) => {
        const excerpt = within(grid!).getByText(tp.excerpt);
        expect(excerpt).toBeInTheDocument();
      });
    });
  });
});