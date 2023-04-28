import { createMocks, createRequest, createResponse, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './index';
import { MongoClient } from 'mongodb';

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

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

  it('should return a 405 is HTTP method is not GET or POST', async () => {
    const connectSpy = jest.spyOn(MongoClient, 'connect');
    const { req, res} = mockRequestResponse('PUT');

    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({
      err: 'Method not allowed'
    });
  })
});