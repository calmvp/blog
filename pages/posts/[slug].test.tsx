import { render, screen } from '@testing-library/react';
import PostDetailPage, { getServerSideProps } from './[slug]';
import { mockedPosts } from '../../__mocks__/mocks';
import { server } from "../../test-utils/server";
import { getPostsHandlerException } from '../../test-utils/server-handlers';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { GetServerSidePropsContext } from 'next';

describe('PostDetailPage', () => {
  test('given a post prop, it should render the header', () => {
    const mockPost = mockedPosts[0];
    render(<PostDetailPage post={mockPost} />);

    expect(screen.getByRole('heading', { name: mockPost.title })).toBeInTheDocument();
  });

  test('given a post prop, it should render an img with src and alt from the post', () => {
    const mockPost = mockedPosts[0];
    const expectedSrc = expect.stringContaining(encodeURIComponent(mockPost.image));

    render(<PostDetailPage post={mockPost} />);

    const actual = screen.getByRole('img');
    expect(actual).toHaveAttribute('src', expectedSrc);
    expect(actual).toHaveAttribute('alt', mockPost.title);
  });

  test('given a post prop, it should render the post content', () => {
    const mockPost = mockedPosts[0];
    const expectedContent = mockPost.content;

    render(<PostDetailPage post={mockPost} />);
    const actual = screen.getByText(expectedContent);

    expect(actual).toBeInTheDocument();
  });

  describe.only('getServerSideProps', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    test('it should return a props object with the expected post', async () => {
      const expectedPost = mockedPosts[0];
      const expectedSlug = expectedPost.slug;
      const context = {
        params: { slug: expectedSlug} as NextParsedUrlQuery
      };

      const actual = await getServerSideProps(context as GetServerSidePropsContext);

      expect(actual).toEqual(
        expect.objectContaining({
          props: {
            post: expectedPost
          }
        })
      );
    });

    test.only('it should return a props object with notFound if response status is 404', async () => {
      const context = {
        params: { slug: 'not-valid-slug' } as NextParsedUrlQuery
      };

      const actual = await getServerSideProps(context as GetServerSidePropsContext);

      expect(actual).toEqual(
        expect.objectContaining({
          props: {
            notFound: true
          }
        })
      );
    })
  });
});