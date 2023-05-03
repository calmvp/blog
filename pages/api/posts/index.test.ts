import { createMocks, createRequest, createResponse, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './index';
import * as postsService from  '../../../services/posts-service';
import { ContentPost } from '@/components/posts/post';
import { mockedPosts } from '../../../__mocks__/mocks';

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

jest.mock('../../../services/posts-service.ts');
const mockedPostsService = jest.mocked(postsService);

describe('/api/posts API Endpoint', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  function mockRequestResponse(method: RequestMethod = 'GET') {
    const { req, res }: { req: ApiRequest; res: ApiResponse} = createMocks({ method });
    req.headers =  {
      'Content-Type': 'application/json'
    };

    return { req, res};
  }

  it('should return a 405 if HTTP method is not GET or POST', async () => {
    const { req, res} = mockRequestResponse('PUT');
    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({
      err: 'Method not allowed'
    });
  });

  describe('GET request method', () => {
    it('should call the imported getAllPosts function if !featured query param and return 200', async () => {
      const { req, res} = mockRequestResponse('GET');

      await handler(req, res);

      expect(mockedPostsService.getAllPosts).toHaveBeenCalledTimes(1);
      expect(res.statusCode).toBe(200);
    });

    it('should call the imported getFeaturedPosts function if featured query param and return 200', async () => {
      const { req, res} = mockRequestResponse('GET');
      req.query = {
        featured: true
      };

      await handler(req, res);

      expect(mockedPostsService.getFeaturedPosts).toHaveBeenCalledTimes(1);
      expect(res.statusCode).toBe(200);
    });

    it('should return a 400 status code if the getAllPosts function rejects', async () => {
      const { req, res} = mockRequestResponse('GET');
      (mockedPostsService.getAllPosts).mockRejectedValueOnce(new Error('failed'));
      
      await handler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ err: 'Failed to retrieve posts' });
    });

    it('should return a 400 status code if the getAllPosts function rejects', async () => {
      const { req, res} = mockRequestResponse('GET');
      req.query = {
        featured: true
      };
      (mockedPostsService.getFeaturedPosts).mockRejectedValueOnce(new Error('failed'));
      
      await handler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ err: 'Failed to retrieve posts' });
    });
  });

  describe('POST request method', () => {
    it('should call the imported writePosts function with an array of posts from the request body and return a 201 status code', async () => {
      const { req, res } = mockRequestResponse('POST');
      req.body = {
        posts: mockedPosts
      }

      await handler(req, res);

      expect(mockedPostsService.writePosts).toHaveBeenCalledTimes(1);
      expect(mockedPostsService.writePosts).toHaveBeenCalledWith(mockedPosts);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({ message: 'Success!' });
    });

    it('should return a 400 status code if the writePosts function rejects', async () => {
      const { req, res } = mockRequestResponse('POST');
      req.body = {
        posts: mockedPosts
      }
      mockedPostsService.writePosts.mockRejectedValue(new Error('Failed'));

      await handler(req, res);

      expect(mockedPostsService.writePosts).toHaveBeenCalledTimes(1);
      expect(mockedPostsService.writePosts).toHaveBeenCalledWith(mockedPosts);
      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ err: 'Failed to write posts' });
    })
  });
});