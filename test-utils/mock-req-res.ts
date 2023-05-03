import { NextApiRequest, NextApiResponse } from 'next';
import { createRequest, createResponse, RequestMethod, createMocks } from 'node-mocks-http';

export type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
export type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;
export const mockRequestResponse = (method: RequestMethod = 'GET', query?: object) => {
  const { req, res }: { req: ApiRequest, res: ApiResponse } = createMocks({ method });
  req.headers = {
    'Content-Type': 'application/json'
  };

  if (query) {
    req.query = query
  };

  return { req, res };
}