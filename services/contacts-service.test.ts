import * as contactsService from './contacts-service';
import { Db, MongoClient } from 'mongodb';

describe('the contact service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('writeContact', () => {
    const mockContact = {
      name: 'Clint Bellagio',
      email: 'c.bellagio@gmail.com',
      message: 'I imagine this blog is wonderful, if only I could understand any of it.'
    };

    it('should call insertOne on the contacts collection', async () => {
      const mockInsertOne = jest.fn();
      const mockCollectionObj = {
        insertOne: mockInsertOne
      };

      const mockDb = ({ 
        collection: jest.fn().mockReturnValueOnce(mockCollectionObj)
      } as unknown) as Db;

      const mockClient = ({ close: jest.fn(), db: jest.fn().mockReturnValueOnce(mockDb) } as unknown) as MongoClient;
      
      const connectSpy = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce((mockClient));

      await contactsService.writeContact(mockContact);

      expect(mockDb.collection).toHaveBeenCalledTimes(1);
      expect(mockDb.collection).toHaveBeenCalledWith('contacts');
      expect(mockInsertOne).toHaveBeenCalledTimes(1);
      expect(mockInsertOne).toHaveBeenCalledWith(mockContact);
    });
  });
})