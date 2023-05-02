import { screen, render } from "@testing-library/react";
import AllPostsPage, { getStaticProps } from ".";
import { server } from "../../test-utils/server";
import { getPostsHandlerException } from '../../test-utils/server-handlers';
import { mockedPosts } from "../../__mocks__/mocks";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('AllPostsPage', () => {
  test('it should render an AllPosts component, given posts prop', () => {
    render(<AllPostsPage posts={mockedPosts} />);
    const actual = screen.getByRole('heading', { name: /all posts/i });
    expect(actual).toBeInTheDocument();
  });

  test('it should render a title for each post, given posts prop', () => {
    render(<AllPostsPage posts={mockedPosts} />)
    const expectedPostCount = mockedPosts.length;

    const actual = screen.getAllByRole('heading', { level: 3});

    expect(expectedPostCount).toBe(actual.length);
  });

  test('it should not render an AllPosts component, given no empty posts array prop', () => {
    render(<AllPostsPage posts={[]} />);
    const actual = screen.queryByRole('heading', { name: /all posts/i });
    expect(actual).not.toBeInTheDocument();
  });

  test('it should render a "No Posts Found" message, given no posts prop', () => {
    render(<AllPostsPage posts={[]} />);

    const actual = screen.getByText(/no posts found/i);

    expect(actual).toBeInTheDocument();
  });

  test('it should display an error message if given an error prop', () => {
    render(<AllPostsPage error={true} />);

    const actual = screen.getByText(/error occurred/i);

    expect(actual).toBeInTheDocument();
  });

  describe('getStaticProps', () => {
    test('it should return an object with a props key to an object containing expected posts', async () => {
      const expectedPosts = mockedPosts;
      const actual = await getStaticProps();
      expect(actual).toEqual(
        expect.objectContaining({
          props: {
            posts: expectedPosts
          }
        })
      );
    });

    test('given a server request failure, it should return an object with a props key to an object containing an error', async () => {
      server.use(getPostsHandlerException);
      
      const actual = await getStaticProps();

      expect(actual).toEqual(
        expect.objectContaining({
          props: {
            error: true
          }
        })
      );
    })
  });
});