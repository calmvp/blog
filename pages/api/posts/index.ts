import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts, getFeaturedPosts, writePosts } from "../../../services/posts-service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET' && req.method !== 'POST')
  {
    res.status(405).json({ err: 'Method not allowed' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const { featured } = req.query;
      let posts;
      
      if (featured) {
        posts = await getFeaturedPosts();
      } else {
        posts = await getAllPosts();
      }
      
      res.status(200).json(posts)
    } catch (err) {
      res.status(400).json({err: 'Failed to retrieve posts'});
      return;
    }
  }
  if (req.method === 'POST') {
    try {
      const { posts } = req.body;
      await writePosts(posts);
      res.status(201).json({message: 'Success!'});
    } catch(err) {
      res.status(400).json({ err: 'Failed to write posts' });
      return;
    }
  };
}

export default handler;