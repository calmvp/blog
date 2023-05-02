import { rest } from 'msw';
import { mockedPosts } from '../__mocks__/mocks'

const {BASE_URL} = process.env;

const getPostsPath = `${BASE_URL}/api/posts`;
const getPostsHandler = rest.get(getPostsPath, async (_req, res, ctx) => {
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

const handlers = [
  getPostsHandler
]

export { handlers }