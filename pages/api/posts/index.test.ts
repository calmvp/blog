import { createMocks, createRequest, createResponse, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './index';
import mongodb, { MongoClient } from 'mongodb';

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

jest.mock('mongodb');
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

  it('should return a 500 on failure to connect to database', async () => {
    // arrange
    const { req, res }  = mockRequestResponse('GET');
    const connectSpy = jest.spyOn(MongoClient, 'connect').mockRejectedValueOnce(new Error('failed'));

    // act
    await handler(req, res);

    // assert
    expect(connectSpy).toHaveBeenCalled();
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({
      err: 'Failed to connect to database'
    });
  });
  describe('GET request method', () => {
    it('should call the .find on the database with no args if featured query param is falsey', async () => {
      // arrange
      const { req, res } = mockRequestResponse('GET');
      const client = { db: jest.fn().mockReturnThis() }
      const connectSpy = jest.spyOn(MongoClient, 'connect')
        .mockResolvedValueOnce(({ 
          db: jest.fn().mockReturnValue(
            {
              find: jest.fn().mockResolvedValueOnce([])
            }
          ),
          close: jest.fn()
        } as unknown) as MongoClient);
      
      // act
      await handler(req, res);

      // assert
      expect(connectSpy).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData).toEqual([]);
    });
  });
});