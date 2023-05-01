import * as postsService from './posts-service';
import { MongoClient } from 'mongodb';


describe('the posts service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getClientDb', () => {
    it('should call connect on the MongoClient with the expected endpoint uri', async () => {
      const client = { db: jest.fn().mockReturnThis(), collection: jest.fn() };
      const connectSpy = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce((client as unknown) as MongoClient);
      const { MONGO_BASE_URL, MONGOUSER, PASSWORD } = process.env;
      const expectedEndpoint= MONGO_BASE_URL!.replace('<username>', MONGOUSER!).replace('<password>', PASSWORD!);
  
      await postsService.getClientDb();
  
      expect(connectSpy).toHaveBeenCalledTimes(1);
      expect(connectSpy).toHaveBeenCalledWith(expectedEndpoint);
    });
  
    it('should throw an error if connecting to the client fails', async () => {
      const connectSpy = jest.spyOn(MongoClient, 'connect').mockRejectedValueOnce(new Error('failed'));

      await expect(postsService.getClientDb())
        .rejects
        .toThrow(/failed to connect to database/i);

      expect(connectSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('getAllPosts', () => {
    
  })
});
