import { ContentPost } from '@/components/posts/post';
import * as postsService from './posts-service';
import { Db, MongoClient } from 'mongodb';


describe('the posts service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getClientDb', () => {
    it('should call connect on the MongoClient with the expected endpoint uri', async () => {
      const client = { db: jest.fn().mockReturnThis() };
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
    const expectedPosts: ContentPost[] = [
      {
        title: 'my title',
        excerpt: 'test ex',
        date: '2022-04-05',
        image: 'test-image.jpg',
        slug: 'my-title',
        isFeatured: false,
        content: 'mock content'
      },
      {
        title: 'here is a title',
        excerpt: 'test excerpt here',
        date: '2023-01-02',
        image: 'test-my-image.jpg',
        slug: 'here-is-a-slug',
        isFeatured: true,
        content: 'more mock content'
      }
    ];

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
            toArray: mockToArray.mockResolvedValueOnce(expectedPosts)
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
      expect(actual).toEqual(expectedPosts);
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
  describe('writePosts', () => {
    const expectedPosts: ContentPost[] = [
      {
        title: 'my title',
        excerpt: 'test ex',
        date: '2022-04-05',
        image: 'test-image.jpg',
        slug: 'my-title',
        isFeatured: false,
        content: 'mock content'
      },
      {
        title: 'here is a title',
        excerpt: 'test excerpt here',
        date: '2023-01-02',
        image: 'test-my-image.jpg',
        slug: 'here-is-a-slug',
        isFeatured: true,
        content: 'more mock content'
      }
    ];
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
      
      await postsService.writePosts(expectedPosts);

      expect(mockDb.collection).toHaveBeenCalledTimes(1);
      expect(mockDb.collection).toHaveBeenCalledWith('posts');
      expect(mockInsertMany).toHaveBeenCalledTimes(1);
      expect(mockInsertMany).toHaveBeenCalledWith(expectedPosts);
    })
  });
});