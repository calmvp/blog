import { MongoClient } from "mongodb";
import { ContentPost } from "@/components/posts/post";

export const getAllPosts = async() => {
  const { client, db } = await getClientDb();

  const posts = await db.collection('posts')
    .find()
    .sort( { _id: -1})
    .toArray();

  client.close();
  return posts
}

export const getFeaturedPosts = async() => {
  const { client, db } = await getClientDb();

  const posts = await db.collection('posts')
    .find( { isFeatured: true })
    .sort( { _id: -1})
    .toArray();

  client.close();

  return posts;
}

export const writePosts = async(posts: ContentPost[]) => {
  const { client, db } = await getClientDb();
  await db.collection('posts').insertMany(posts);
  client.close();
}

export const getClientDb = async () => {
  const { MONGO_BASE_URL, MONGOUSER, PASSWORD } = process.env;
  if (MONGO_BASE_URL && MONGOUSER && PASSWORD) {
    try {
      const endpoint = MONGO_BASE_URL.replace('<username>', MONGOUSER).replace('<password>', PASSWORD);
      const client = await MongoClient.connect(endpoint);

      return {
        client,
        db: client.db()
      };
    } catch(err) {
      throw new Error('Failed to connect to database');
    }
  } else {
    throw new Error('Missing db configuration');
  }
}