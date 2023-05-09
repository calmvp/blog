import { RequestMethod } from 'node-mocks-http';
import { ObjectId } from 'mongodb';
import handler from '../../../pages/api/posts/[slug]';
import { getPostBySlug } from  '../../../services/posts-service';
import { mockedPosts } from '../../../__mocks__/mocks';
import { mockRequestResponse } from '../../../test-utils/mock-req-res';

jest.mock('../../../services/posts-service');
const mockedGetPostBySlug = jest.mocked(getPostBySlug);

describe('/api/posts/[slug] API Endpoint', () => {
  test.each([
    { method: 'POST' as RequestMethod },
    { method: 'PUT' as RequestMethod },
    { method: 'PATCH' as RequestMethod},
    { method: 'DELETE' as RequestMethod}
  ])('should return a 405 if HTTP method: $method is not GET', async ({ method }) => {
    const { req, res } = mockRequestResponse(method, { slug: 'my-slug'});

    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({
      err: 'Method not allowed'
    });
  });

  describe('GET request method', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    test('it should return a 400 if Slug is missing', async () => {
      const { req, res } = mockRequestResponse('GET');
  
      await handler(req, res);
  
      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({
        err: 'Invalid slug parameter'
      });
    });

    test('it should call the imported getPostBySlug function with [slug] as arg and return 200 if post found', async () =>{
      const expectedSlug = 'expected-slug';
      const expectedId = new ObjectId();
      const expectedPost = {_id: expectedId, ...mockedPosts[0]};
      mockedGetPostBySlug.mockResolvedValueOnce(expectedPost);

      const { req, res } = mockRequestResponse('GET', { slug: expectedSlug });

      await handler(req, res);

      expect(mockedGetPostBySlug).toHaveBeenCalledTimes(1);
      expect(mockedGetPostBySlug).toHaveBeenCalledWith(expectedSlug);
      expect(JSON.stringify(expectedPost)).toEqual(JSON.stringify(res._getJSONData()));
      expect(res.statusCode).toBe(200);
    });

    test('it should return a 404 if no post found for [slug]', async() => {
      const expectedSlug = 'expected-slug'
      mockedGetPostBySlug.mockResolvedValueOnce(null);

      const { req, res } = mockRequestResponse('GET', { slug: expectedSlug });

      await handler(req, res);

      expect(mockedGetPostBySlug).toHaveBeenCalledTimes(1);
      expect(mockedGetPostBySlug).toHaveBeenCalledWith(expectedSlug);
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({
        err: 'No post found'
      });
    });

    test('it should return a 500 if the getPostBySlug function throws an exception', async () => {
      const expectedSlug = 'expected-slug'
      mockedGetPostBySlug.mockRejectedValueOnce(new Error('failed'));

      const { req, res } = mockRequestResponse('GET', { slug: expectedSlug });

      await handler(req, res);

      expect(mockedGetPostBySlug).toHaveBeenCalledTimes(1);
      expect(mockedGetPostBySlug).toHaveBeenCalledWith(expectedSlug);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({
        err: 'Failed to fetch post'
      });
    })
  });
})