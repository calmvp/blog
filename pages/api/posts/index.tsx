import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, MongoError } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const client = await getClient(res);

      if (!client) {
        res.status(404).json({ message: 'Could not connect to db' });
        return;
      }

      const db = client.db();
      const documents = await db.collection('posts')
        .find()
        .sort({ _id: -1 })
        .toArray();

      client.close();
      res.status(200).json({ posts: documents })
    } catch (err) {
      res.status(400).json({err: JSON.stringify(err)});
      return;
    }
  }
  if (req.method === 'POST') {
    try {
      const { posts } = req.body;
      
      const client = await getClient(res);

      if (!client) {
        res.status(404).json({ message: 'Could not connect to db' });
        return;
      }

      const db = client.db();
      await db.collection('posts').insertMany(posts);
      client.close();

      res.status(201).json({ message: 'Success!' });
      return;
    } catch (err) {
      res.status(400).json({err: JSON.stringify(err)});
      return;
    }
  };
}

const getClient = async (res: NextApiResponse) => {
  const { BASE_URL, MONGOUSER, PASSWORD } = process.env;
  if (BASE_URL && MONGOUSER && PASSWORD) {
    const endpoint = BASE_URL.replace('<username>', MONGOUSER).replace('<password>', PASSWORD);
    const client = await MongoClient.connect(endpoint);
    return client;
  } else {
    res.status(500).json({ err: 'Missing db configuration' });
    return;
  }
}

export default handler;