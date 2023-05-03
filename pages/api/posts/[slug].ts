import { NextApiRequest, NextApiResponse } from "next";
import { getPostBySlug } from "../../../services/posts-service";

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ err: 'Method not allowed'});
    return;
  }

  if (typeof req.query.slug !== 'string') {
    res.status(400).json({ err: 'Invalid slug parameter' });
    return;
  }

  try {
    const { slug } = req.query;
    const post = await getPostBySlug(slug);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ err: 'No post found'});
    }
  } catch (err) {
    res.status(500).json({ err: 'Failed to fetch post'});
    return;
  }
}

export default handler;