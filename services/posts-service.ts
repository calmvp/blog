import { MongoClient } from "mongodb";
import { ContentPost } from "@/components/posts/post";
import { getClientDb } from "./mongo-service";

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

export const getPostBySlug = async(slug: string) => {
  const { client, db } = await getClientDb();

  const post = await db.collection('posts')
    .findOne({ slug });
  
  client.close();

  return post;
}

export const writePosts = async(posts: ContentPost[]) => {
  const { client, db } = await getClientDb();
  await db.collection('posts').insertMany(posts);
  client.close();
}