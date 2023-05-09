import { RequestMethod } from 'node-mocks-http';
import { ObjectId } from 'mongodb';
import { writeContact } from "../../services/contacts-service";
import handler from "../../pages/api/contact";
import { mockRequestResponse } from '../../test-utils/mock-req-res';


jest.mock('../../services/contacts-service');
const mockedWriteContact = jest.mocked(writeContact);

describe('/api/contact API endpoint', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test.each([
    { method: 'GET' as RequestMethod },
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
  describe('POST request method', () => {
    const mockContact = {
      name: 'Clint Bellagio',
      email: 'c.bellagio@gmail.com',
      message: 'I imagine this blog is wonderful, if only I could understand any of it.'
    };
    it('should call the imported writePosts function with an array of posts from the request body and return a 201 status code', async () => {
      const { req, res } = mockRequestResponse('POST');
      req.body = {
        contact: mockContact
      }

      await handler(req, res);

      expect(mockedWriteContact).toHaveBeenCalledTimes(1);
      expect(mockedWriteContact).toHaveBeenCalledWith(mockContact);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({ message: 'Success' });
    });

    it('should return a 500 status code if the writePosts function rejects', async () => {
      const { req, res } = mockRequestResponse('POST');
      req.body = {
        contact: mockContact
      }
      mockedWriteContact.mockRejectedValue(new Error('Failed'));

      await handler(req, res);

      expect(mockedWriteContact).toHaveBeenCalledTimes(1);
      expect(mockedWriteContact).toHaveBeenCalledWith(mockContact);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ err: 'Failed to write contact' });
    });

    it('should return a 400 status code if the request body contact email is invalid', async () => {
      const invalidEmailContact = {
        name: 'Bad Actor',
        email: 'badactor',
        message: 'I am trying to post a contact without a legit email!'
      };
      const { req, res } = mockRequestResponse('POST');
      req.body = {
        contact: invalidEmailContact
      }
      mockedWriteContact.mockRejectedValue(new Error('Failed'));

      await handler(req, res);

      expect(mockedWriteContact).not.toHaveBeenCalled();
      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ err: 'Invalid email' })
    })
  });
})