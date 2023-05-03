import { rest } from 'msw';
import { mockedFeaturedPosts, mockedPosts } from '../__mocks__/mocks'

const {BASE_URL} = process.env;

const getPostsPath = `${BASE_URL}/api/posts`;
const getPostsHandler = rest.get(getPostsPath, async (req, res, ctx) => {
  const featured = req.url.searchParams.get('featured');
  if (featured) {
    return res(
      ctx.status(200),
      ctx.json(mockedFeaturedPosts)
    );
  }
  return res(
    ctx.status(200),
    ctx.json(mockedPosts)
  );
});

export const getPostsHandlerException = rest.get(
  getPostsPath,
  async (req, res, ctx) => 
    res(ctx.status(500), ctx.json({ message: 'Get posts exception' }))
);

const getPostHandler = rest.get(`${getPostsPath}/:slug`, async (req, res, ctx) => {
  const { slug } = req.params;
  const post = mockedPosts.find(m => m.slug === slug);
  if (post) {
    return res(
      ctx.status(200),
      ctx.json(post)
    );
  }

  return res(
    ctx.status(404),
    ctx.json({ message: 'Post not found'})
  );
});

export const getPostHandlerException = rest.get(
  `${getPostsPath}/:slug`, 
  async(req, res, ctx) => res(ctx.status(500), ctx.json({ message: 'Get post by slug exception'}))
);

const handlers = [
  getPostsHandler,
  getPostHandler
]

export { handlers }