import { screen, render } from "@testing-library/react"
import { server } from "../test-utils/server";
import { getPostsHandlerException } from '../test-utils/server-handlers';
import { mockedFeaturedPosts } from "../__mocks__/mocks";
import HomePage, { getStaticProps } from './';

describe('HomePage', () => {
  test('it should render the hero component', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /hail, i am cicero/i })).toBeInTheDocument();
  });

  test('it should render posts, given posts prop', () => {
    render(<HomePage posts={mockedFeaturedPosts} />);
    const expectedPostCount = mockedFeaturedPosts.length;

    const actual = screen.getAllByRole('heading', { level: 3});

    expect(expectedPostCount).toBe(actual.length);
  });
  
  test('it should not render a Featured Posts component, given no empty posts array prop', () => {
    render(<HomePage posts={[]} />);
    const actual = screen.queryByRole('heading', { name: /featured posts/i });
    expect(actual).not.toBeInTheDocument();
  });

  test('it should render a "No Featured Posts" message, given no posts prop', () => {
    render(<HomePage posts={[]} />);

    const actual = screen.getByText(/no featured posts/i);

    expect(actual).toBeInTheDocument();
  });

  test('it should display an error message if given an error prop', () => {
    render(<HomePage error={true} />);

    const actual = screen.getByText(/error occurred/i);

    expect(actual).toBeInTheDocument();
  });

  describe('getStaticProps', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('it should return an object with props: posts where posts are the expected featured posts', async () => {
      const expectedPosts = mockedFeaturedPosts;
      const actual = await getStaticProps();
      expect(actual).toEqual(
        expect.objectContaining({
          props: {
            posts: expectedPosts
          }
        })
      );
    });
    test('it should return an object with an error prop if the request fails', async () => {
      server.use(getPostsHandlerException);
      const actual = await getStaticProps();
      expect(actual).toEqual(
        expect.objectContaining({
          props: {
            error: true
          }
        })
      );
    });
  })
});