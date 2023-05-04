import * as postsService from './posts-service';
import { Db, MongoClient } from 'mongodb';
import { mockedPosts } from '../__mocks__/mocks';

describe('the posts service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('getAllPosts', () => {
    it('should call db collection with "posts"', async () => {
      const mockDb = ({ 
        collection: jest.fn().mockReturnValueOnce({
          find: jest.fn().mockReturnValueOnce({
            sort: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValueOnce([])
            })
          })
        })
      } as unknown) as Db;

      const mockClient = ({ close: jest.fn(), db: jest.fn().mockReturnValueOnce(mockDb) } as unknown) as MongoClient;
      
      const connectSpy = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce((mockClient));
      
      await postsService.getAllPosts();

      expect(mockDb.collection).toHaveBeenCalledWith('posts');
    });

    it('should call find on the db collection, call sort with expected args and return expected array', async () => {
      const mockSort = jest.fn();
      const mockFind = jest.fn();
      const mockToArray = jest.fn();
      const mockCollectionObj = {
        find: mockFind.mockReturnValueOnce({
          sort: mockSort.mockReturnValueOnce({
            toArray: mockToArray.mockResolvedValueOnce(mockedPosts)
          })
        })
      };
      const mockDb = ({ 
        collection: jest.fn().mockReturnValueOnce(mockCollectionObj)
      } as unknown) as Db;

      const mockClient = ({ close: jest.fn(), db: jest.fn().mockReturnValueOnce(mockDb) } as unknown) as MongoClient;
      
      const connectSpy = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce((mockClient));
      
      const actual = await postsService.getAllPosts();

      expect(mockFind).toHaveBeenCalledTimes(1);
      expect(mockSort).toHaveBeenCalledWith({ _id: -1 });
      expect(actual).toEqual(mockedPosts);
    });
  });
  describe('getFeaturedPosts', () => {
    it('it should call find on the db posts collection with expected find object', async () => {
      const mockSort = jest.fn();
      const mockFind = jest.fn();
      const mockToArray = jest.fn();
      const mockCollectionObj = {
        find: mockFind.mockReturnValueOnce({
          sort: mockSort.mockReturnValueOnce({
            toArray: mockToArray.mockResolvedValueOnce([])
          })
        })
      };
      const mockDb = ({ 
        collection: jest.fn().mockReturnValueOnce(mockCollectionObj)
      } as unknown) as Db;

      const mockClient = ({ close: jest.fn(), db: jest.fn().mockReturnValueOnce(mockDb) } as unknown) as MongoClient;
      
      const connectSpy = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce((mockClient));
      
      const actual = await postsService.getFeaturedPosts();

      expect(mockFind).toHaveBeenCalledTimes(1);
      expect(mockFind).toHaveBeenCalledWith({ isFeatured: true });
      expect(mockSort).toHaveBeenCalledWith({ _id: -1 });
    });
  });
  describe('getPostBySlug', () => {
    it('it should call findOne on the db posts collection with expected find object', async () => {

      const mockFindOne = jest.fn();
      const expectedPost = mockedPosts[0];

      const mockCollectionObj = {
        findOne: mockFindOne.mockReturnValueOnce(expectedPost)
      };

      const mockDb = ({ 
        collection: jest.fn().mockReturnValueOnce(mockCollectionObj)
      } as unknown) as Db;

      const mockClient = ({ close: jest.fn(), db: jest.fn().mockReturnValueOnce(mockDb) } as unknown) as MongoClient;
      
      const connectSpy = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce((mockClient));
      
      const slug = expectedPost.slug;
      const actual = await postsService.getPostBySlug(slug);

      expect(mockDb.collection).toHaveBeenCalledWith('posts');
      expect(mockFindOne).toHaveBeenCalledTimes(1);
      expect(mockFindOne).toHaveBeenCalledWith({ slug });
      expect(expectedPost).toEqual(actual);
    });
  });
  describe('writePosts', () => {
    it('should call insertMany on the posts collection', async () => {
      const mockInsertMany = jest.fn();
      const mockCollectionObj = {
        insertMany: mockInsertMany
      };
      const mockDb = ({ 
        collection: jest.fn().mockReturnValueOnce(mockCollectionObj)
      } as unknown) as Db;

      const mockClient = ({ close: jest.fn(), db: jest.fn().mockReturnValueOnce(mockDb) } as unknown) as MongoClient;
      
      const connectSpy = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce((mockClient));
      
      await postsService.writePosts(mockedPosts);

      expect(mockDb.collection).toHaveBeenCalledTimes(1);
      expect(mockDb.collection).toHaveBeenCalledWith('posts');
      expect(mockInsertMany).toHaveBeenCalledTimes(1);
      expect(mockInsertMany).toHaveBeenCalledWith(mockedPosts);
    })
  });
});